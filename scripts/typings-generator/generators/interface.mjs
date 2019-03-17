import ts from 'typescript';

import TypesGenerator from './types';

export default class InterfaceGenerator {
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

		required = false
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
			undefined
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

		modifiers = undefined,
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
		let iterfaceDeclaration = ts.createInterfaceDeclaration(
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
			iterfaceDeclaration = TypesGenerator.declarationExport(
				iterfaceDeclaration
			);
		}

		if (this.description) {
			iterfaceDeclaration = ts.addSyntheticLeadingComment(
				iterfaceDeclaration,
				ts.SyntaxKind.MultiLineCommentTrivia,
				this.description,
				true
			);
		}

		return iterfaceDeclaration;
	}
}
