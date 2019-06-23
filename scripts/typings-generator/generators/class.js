// eslint-disable-next-line import/no-extraneous-dependencies
const ts = require('typescript');

const TypesGenerator = require('./types');

module.exports = class ClassGenerator {
	/**
	 * Constructor
	 */
	constructor({ name, description }) {
		this.name = ts.createIdentifier(name);
		this.description = description;

		this.properties = [];
		this.methods = [];
	}

	addProperty({
		name,
		description,

		type,

		required = false,
		initializer = undefined
	}) {
		const property = ts.createProperty(
			undefined,
			undefined,
			name,
			!required
				? ts.createKeywordTypeNode(
					ts.SyntaxKind.QuestionToken
				)
				: undefined,
			type,
			initializer
		);

		if (!description) {
			this.methods.push(property);

			return;
		}

		this.properties.push(
			ts.addSyntheticLeadingComment(
				property,
				ts.SyntaxKind.MultiLineCommentTrivia,
				description,
				true
			)
		);
	}

	addMethod({
		name,
		description,

		parameters,
		result,

		modifiers = undefined
	}) {
		const method = ts.createMethod(
			undefined,
			modifiers,
			undefined,
			name,
			undefined,
			undefined,
			parameters,
			result
		);

		if (!description) {
			this.methods.push(method);

			return;
		}

		this.methods.push(
			ts.addSyntheticLeadingComment(
				method,
				ts.SyntaxKind.MultiLineCommentTrivia,
				description,
				true
			)
		);
	}

	toASTNode({ exported = false } = {}) {
		let classDeclaration = ts.createClassDeclaration(
			undefined,
			undefined,
			this.name,
			undefined,
			undefined,
			[
				...this.properties,
				...this.methods
			]
		);

		if (exported) {
			classDeclaration = TypesGenerator.declarationExport(
				classDeclaration
			);
		}

		if (this.description) {
			classDeclaration = ts.addSyntheticLeadingComment(
				classDeclaration,
				ts.SyntaxKind.MultiLineCommentTrivia,
				this.description,
				true
			);
		}

		return classDeclaration;
	}
};
