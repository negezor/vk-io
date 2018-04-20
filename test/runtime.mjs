require('@babel/register')({
	presets: [
		['@babel/env', {
			targets: {
				node: 'current'
			},
			modules: 'cjs',
			useBuiltIns: 'usage'
		}]
	],
	plugins: [
		'@babel/proposal-object-rest-spread'
	]
});
