// eslint-disable-next-line import/no-extraneous-dependencies
const ts = require('typescript');

const nodeFs = require('fs');
const nodePath = require('path');

// HACK!!!
const REPLACE_MULTI_SEMICOLON_RE = /;{2,}/;
const REPLACE_EXPORT_SEMICOLON_RE = /};/;

module.exports = function createPrinter(path) {
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

	output.write('/* eslint-disable */\n');

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

			const hacked = result
				.replace(REPLACE_MULTI_SEMICOLON_RE, ';')
				.replace(REPLACE_EXPORT_SEMICOLON_RE, '}');

			output.write(`${hacked}\n\n`);
		}
	};
};
