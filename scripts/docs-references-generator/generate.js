// eslint-disable-next-line import/no-extraneous-dependencies
const { Application } = require('typedoc');

const { join: pathJoin } = require('path');

const ROOT_DIR = pathJoin(__dirname, '../../');

const DOCS_DIR = pathJoin(ROOT_DIR, 'docs');
const PACKAGES_DIR = pathJoin(ROOT_DIR, 'packages');

const API_REFERENCES = pathJoin(DOCS_DIR, 'references');

const MODULES = [
	'vk-io',
	'scenes',
	'session',
	'streaming',
	'authorization'
];

for (const moduleName of MODULES) {
	const sourceDir = pathJoin(PACKAGES_DIR, moduleName, 'src');

	const app = new Application({
		mode: 'modules',
		// logger: 'none',
		target: 'es6',
		readme: 'none',
		module: 'CommonJS',
		excludeNotExported: true
	});

	const project = app.convert(
		app.expandInputFiles([
			sourceDir
		])
	);

	if (project) {
		app.generateDocs(
			project,
			pathJoin(API_REFERENCES, moduleName)
		);
	}
}
