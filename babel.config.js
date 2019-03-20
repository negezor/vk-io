const { engines } = require('./package.json');

const isTest = process.env.BABEL_ENV === 'test';

module.exports = {
	presets: [
		['@babel/env', {
			targets: {
				// Strip `>=`
				node: engines.node.substring(2)
			},
			loose: true,
			useBuiltIns: false,
			modules: isTest
				? 'cjs'
				: false
		}]
	],
	comments: false,
	exclude: /node_modules\/.*/
};
