// eslint-disable-next-line import/no-extraneous-dependencies
const ts = require('typescript');

module.exports = class TypesGenerator {
	static get any() {
		return ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
	}

	static get string() {
		return ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
	}

	static get number() {
		return ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
	}

	static get boolean() {
		return ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
	}

	static array(type) {
		return ts.factory.createArrayTypeNode(type);
	}

	static union(types) {
		return ts.factory.createUnionTypeNode(types);
	}

	static type(name, type) {
		return ts.factory.createTypeAliasDeclaration(
			undefined,
			undefined,
			name,
			undefined,
			type
		);
	}

	static genericType(name, types) {
		return ts.factory.createTypeReferenceNode(
			name,
			types
		);
	}

	static promiseType(type) {
		return TypesGenerator.genericType(
			'Promise',
			[type]
		);
	}

	static parameter({ name, type, required = false }) {
		return ts.factory.createParameterDeclaration(
			undefined,
			undefined,
			undefined,
			name,
			!required
				? ts.factory.createKeywordTypeNode(
					ts.SyntaxKind.QuestionToken
				)
				: undefined,
			type
		);
	}

	static declarationExport(exportClause) {
		return ts.factory.createExportDeclaration(
			undefined,
			undefined,
			false,
			exportClause
		);
	}
};
