import ts from 'typescript';

import nodeFs from 'fs';
import nodePath from 'path';

// HACK!!!
const REPLACE_MULTI_SEMICOLON_RE = /;{2,}/g;

export default function createPrinter(path) {
	const filename = nodePath.basename(path);

	const methodsFile = ts.createSourceFile(
		filename,
		'',
		ts.ScriptTarget.ESNext,
		false,
		ts.ScriptKind.TS
	);

	const printer = ts.createPrinter({
		newLine: ts.NewLineKind.LineFeed
	});

	const output = nodeFs.createWriteStream(path, {
		start: 0
	});

	return {
		end() {
			output.end();
		},
		write(text) {
			output.write(text);
		},
		writeNode(node) {
			const result = printer.printNode(
				ts.EmitHint.Unspecified,
				node,
				methodsFile
			);

			output.write(`${result.replace(REPLACE_MULTI_SEMICOLON_RE, ';')}\n\n`);
		}
	};
}
