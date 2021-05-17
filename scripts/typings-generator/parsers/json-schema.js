// eslint-disable-next-line import/no-extraneous-dependencies
const ts = require('typescript');

const { TypesGenerator, InterfaceGenerator } = require('../generators');

const { formatTSComments, toPascalCase } = require('../utils/helpers');

const MATCH_REF_RE = /^([^#]+)?#\/definitions\/(.+)/;

const jsonSchemaTypes = {
	array({ type, namespace, arrayUnion = false }) {
		const { items } = type;

		if (items && items.type in jsonSchemaTypes) {
			const {
				type: arrayType,
				description,
				required
			} = jsonSchemaTypes[items.type]({
				namespace,
				type: items
			});

			return {
				description,
				required,

				kind: 'type',
				// Just array in VK that string (N, N, ...)
				type: arrayUnion
					? TypesGenerator.union([
						TypesGenerator.array(arrayType),
						arrayType
					])
					: TypesGenerator.array(arrayType)
			};
		}

		if (items && items.$ref) {
			const [, group, refName] = items.$ref.match(MATCH_REF_RE);

			const refIdentifierName = ts.factory.createIdentifier(
				toPascalCase(refName)
			);

			const refIdentifier = group !== '' && namespace
				? ts.factory.createQualifiedName(
					namespace,
					refIdentifierName
				)
				: refIdentifierName;

			return {
				type: TypesGenerator.array(refIdentifier)
			};
		}

		return {
			kind: type,
			type: TypesGenerator.array(
				ts.factory.createKeywordTypeNode(
					ts.SyntaxKind.AnyKeyword
				)
			)
		};
	},

	string: ({ type }) => ({
		kind: 'type',
		description: type.description && formatTSComments(
			type.description
		),
		type: 'enum' in type
			? TypesGenerator.union(
				type.enum.map(enumName => (
					ts.factory.createStringLiteral(String(enumName))
				))
			)
			: TypesGenerator.string,
		required: typeof type.required === 'boolean'
			? type.required
			: false

	}),
	integer: ({ type }) => ({
		kind: 'type',
		description: type.description && formatTSComments(
			type.description
		),
		type: 'enum' in type
			? TypesGenerator.union(
				type.enum.map(enumName => (
					ts.factory.createNumericLiteral(String(enumName))
				))
			)
			: TypesGenerator.number,
		required: typeof type.required === 'boolean'
			? type.required
			: false
	}),
	boolean: ({ type }) => ({
		kind: 'type',
		description: type.description && formatTSComments(
			type.description
		),
		type: TypesGenerator.union([
			TypesGenerator.boolean,
			TypesGenerator.number
		]),
		required: typeof type.required === 'boolean'
			? type.required
			: false
	}),
	number: payload => jsonSchemaTypes.integer(payload),

	any: ({ type }) => ({
		kind: 'type',
		description: type.description && formatTSComments(
			type.description
		),
		type: TypesGenerator.any,
		required: typeof type.required === 'boolean'
			? type.required
			: false
	})
};

function parseJSONObject(name, type, payload = {}) {
	if (type.$ref) {
		const [, group, refName] = type.$ref.match(MATCH_REF_RE);

		const refIdentifierName = ts.factory.createIdentifier(
			toPascalCase(refName)
		);

		const refIdentifier = group !== '' && payload.namespace
			? ts.factory.createQualifiedName(
				payload.namespace,
				refIdentifierName
			)
			: refIdentifierName;

		return {
			name,
			type: refIdentifier
		};
	}

	if (type.allOf && Array.isArray(type.allOf)) {
		const allOf = [];
		const exportedNodes = [];

		let interfacesCount = 0;
		for (const obj of type.allOf) {
			if (obj.$ref) {
				const [, group, refName] = obj.$ref.match(MATCH_REF_RE);

				const refIdentifierName = ts.factory.createIdentifier(
					toPascalCase(refName)
				);

				const refIdentifier = group !== '' && payload.namespace
					? ts.factory.createQualifiedName(
						payload.namespace,
						refIdentifierName
					)
					: refIdentifierName;

				allOf.push(refIdentifier);

				continue;
			}

			if (obj.properties) {
				interfacesCount += 1;

				const interfaceType = new InterfaceGenerator({
					name: toPascalCase(name + interfacesCount),
					description: type.description
				});

				for (const [propertyName, propertyValue] of Object.entries(obj.properties)) {
					if (propertyValue.$ref) {
						const [, group, refName] = propertyValue.$ref.match(MATCH_REF_RE);

						const refIdentifierName = ts.factory.createIdentifier(
							toPascalCase(refName)
						);

						const refIdentifier = group !== '' && payload.namespace
							? ts.factory.createQualifiedName(
								payload.namespace,
								refIdentifierName
							)
							: refIdentifierName;

						interfaceType.addProperty({
							name: propertyName,

							type: refIdentifier,
							required: false
						});

						continue;
					}

					if (propertyValue.type in jsonSchemaTypes) {
						const { type: nodeType, description } = jsonSchemaTypes[propertyValue.type]({
							...payload,
							type: propertyValue
						});

						interfaceType.addProperty({
							description,
							name: propertyName,

							type: nodeType,
							required: false
						});
					}
				}

				allOf.push(interfaceType.name);

				exportedNodes.push(
					interfaceType.toASTNode({
						exported: true
					})
				);
			}
		}

		if (allOf.length !== 0) {
			return {
				exportedNodes,

				name: toPascalCase(name),
				kind: 'type',
				type: ts.factory.createIntersectionTypeNode(allOf)
			};
		}
	}

	if (type.type !== 'object') {
		return {
			name,
			...jsonSchemaTypes[type.type]({
				...payload,

				type
			})
		};
	}

	if (!type.properties) {
		return {
			name,
			type: ts.factory.createKeywordTypeNode(
				ts.SyntaxKind.AnyKeyword
			)
		};
	}

	const interfaceType = new InterfaceGenerator({
		name: toPascalCase(name),
		description: type.description
	});

	interfaceType.methods.push(
		ts.factory.createIndexSignature(
			undefined,
			undefined,
			[ts.factory.createParameterDeclaration(
				undefined,
				undefined,
				undefined,
				'key',
				undefined,
				ts.factory.createKeywordTypeNode(
					ts.SyntaxKind.StringKeyword
				)
			)],
			ts.factory.createKeywordTypeNode(
				ts.SyntaxKind.AnyKeyword
			)
		)
	);

	if (type.allOf || type.oneOf || type.anyOf) {
		return {
			name: interfaceType.name,
			kind: 'interface',
			type: interfaceType
		};
	}

	const { required = [] } = type;

	for (const [propertyName, propertyValue] of Object.entries(type.properties)) {
		if (propertyValue.type in jsonSchemaTypes) {
			const { type: nodeType, description } = jsonSchemaTypes[propertyValue.type]({
				...payload,
				type: propertyValue
			});

			interfaceType.addProperty({
				description,
				name: propertyName,

				type: nodeType,
				required: required.includes(propertyName)
			});
		}
	}

	return {
		name: interfaceType.name,
		kind: 'interface',
		type: interfaceType
	};
}

function parseJSONSchema(schema, payload) {
	return Object.entries(schema)
		.map(([key, value]) => (
			parseJSONObject(key, value, payload)
		));
}

module.exports = {
	parseJSONSchema,
	parseJSONObject
};
