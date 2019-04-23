import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

import pkg from './package.json';

export default [
	{
		input: 'src/index.mjs',
		external: [
			...Object.keys(pkg.dependencies),
			'crypto',
			'stream',
			'https',
			'http',
			'util',
			'url',
			'fs'
		],
		plugins: [
			json(),
			resolve({
				preferBuiltins: true,
			}),
			babel(),
			commonjs()
		],
		output: [
			{
				file: `${pkg.main}.js`,
				format: 'cjs',
				exports: 'named'
			},
			{
				file: `${pkg.main}.mjs`,
				format: 'esm'
			}
		]
	}
];
