const nodeFs = require('fs');
const nodePath = require('path');
const nodeUtil = require('util');

const readFile = nodeUtil.promisify(nodeFs.readFile).bind(nodeUtil);

const writeFile = nodeUtil.promisify(nodeFs.writeFile).bind(nodeUtil);

const getDirname = url => (
	nodePath.dirname(
		(new URL(url)).pathname
	)
		.replace(/^\//, '')
);

const upperFirstLetter = str => (
	str[0].toUpperCase() + str.substring(1)
);

const toPascalCase = (str) => {
	const s = str
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
		.map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
		.join('');

	return upperFirstLetter(s);
};

const readJSONFile = async (path) => {
	const content = await readFile(path, 'utf-8');

	return JSON.parse(content);
};

const NEW_LINE_RE = /\n/;

const formatTSComments = (text) => {
	let template = '*\n';

	const lines = text
		.trim('\n')
		.split(NEW_LINE_RE)
		.map(str => str.trim());

	for (const line of lines) {
		template += ` *${line !== '' ? ` ${line}` : ''}\n`;
	}

	template += ' ';

	return template;
};

module.exports = {
	readFile,
	writeFile,
	getDirname,
	upperFirstLetter,
	toPascalCase,
	readJSONFile,
	formatTSComments
};
