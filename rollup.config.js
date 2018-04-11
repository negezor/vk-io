import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

import pkg from './package.json';

const dependencies = Object.keys(pkg.dependencies);

export default [
	{
		input: 'src/index.mjs',
		external: [
			...dependencies,
			'crypto',
			'stream',
			'https',
			'http',
			'util',
			'url',
			'fs'
		],
		plugins: [
			resolve({
				extensions: ['.mjs', '.js'],
				preferBuiltins: true,
			}),
			json(),
			babel({
				exclude: [
					'node_modules/**'
				],
			}),
			commonjs()
		],
		output: [
			{
				file: pkg.main,
				format: 'cjs',
				exports: 'named'
			},
			{
				file: pkg.module,
				format: 'es'
			}
		]
	}
];
