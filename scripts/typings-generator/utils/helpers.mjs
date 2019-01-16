import nodeFs from 'fs';
import nodePath from 'path';
import nodeUtil from 'util';

export const readFile = nodeUtil.promisify(nodeFs.readFile).bind(nodeUtil);

export const writeFile = nodeUtil.promisify(nodeFs.writeFile).bind(nodeUtil);

export const getDirname = url => (
	nodePath.dirname(
		(new URL(url)).pathname
	)
		.replace(/^\//, '')
);

export const upperFirstLetter = str => (
	str[0].toUpperCase() + str.substring(1)
);

export const toPascalCase = (str) => {
	const s = str
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
		.map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
		.join('');

	return upperFirstLetter(s);
};

export const readJSONFile = async (path) => {
	const content = await readFile(path, 'utf-8');

	return JSON.parse(content);
};

const NEW_LINE_RE = /\n/;

export const formatTSComments = (text) => {
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
