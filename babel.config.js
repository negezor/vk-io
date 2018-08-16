const { engines } = require('./package.json');

const isTest = process.env.BABEL_ENV === 'test';

module.exports = {
	presets: [
		['@babel/env', {
			targets: {
				// Strip `>=`
				node: engines.node.substring(2)
			},
			useBuiltIns: 'usage',
			modules: isTest
				? 'cjs'
				: false
		}]
	],
	comments: false,
	exclude: isTest
		? /node_modules\/(?!(node-fetch|middleware-io)\/).*/
		: /node_modules\/.*/,
};
