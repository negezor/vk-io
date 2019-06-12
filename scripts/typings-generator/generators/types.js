// eslint-disable-next-line import/no-extraneous-dependencies
const ts = require('typescript');

module.exports = class TypesGenerator {
	static get any() {
		return ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
	}

	static get string() {
		return ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
	}

	static get number() {
		return ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
	}

	static get boolean() {
		return ts.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
	}

	static array(type) {
		return ts.createArrayTypeNode(type);
	}

	static union(types) {
		return ts.createUnionTypeNode(types);
	}

	static type(name, type) {
		return ts.createTypeAliasDeclaration(
			undefined,
			undefined,
			name,
			undefined,
			type
		);
	}

	static genericType(name, types) {
		return ts.createTypeReferenceNode(
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
		return ts.createParameter(
			undefined,
			undefined,
			undefined,
			name,
			!required
				? ts.createKeywordTypeNode(
					ts.SyntaxKind.QuestionToken
				)
				: undefined,
			type
		);
	}

	static declarationExport(exportClause) {
		return ts.createExportDeclaration(
			undefined,
			undefined,
			exportClause
		);
	}
};
