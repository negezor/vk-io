import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

import nodePath from 'path';

import pkg from './packages/vk-io/package.json';

const PACKAGE_DIR = nodePath.join(__dirname, 'packages/vk-io');

export default [
	{
		input: nodePath.join(PACKAGE_DIR, 'src/index.mjs'),
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
				file: nodePath.join(PACKAGE_DIR, `${pkg.main}.js`),
				format: 'cjs',
				exports: 'named'
			},
			{
				file: nodePath.join(PACKAGE_DIR, `${pkg.main}.mjs`),
				format: 'esm'
			}
		]
	}
];
