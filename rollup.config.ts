/* eslint-disable import/no-extraneous-dependencies */
import jsonPlugin from 'rollup-plugin-json';
import commonjsPlugin from 'rollup-plugin-commonjs';
import typescriptPlugin from 'rollup-plugin-typescript2';
import nodeResolvePlugin from 'rollup-plugin-node-resolve';
/* eslint-enable import/no-extraneous-dependencies */

import { tmpdir } from 'os';
// @ts-ignore
import { builtinModules } from 'module';
import { join as pathJoin } from 'path';

const MODULES = [
	'vk-io',
	'session',
	'scenes'
];

const coreModules = builtinModules.filter(name => (
	!/(^_|\/)/.test(name)
));

const cacheRoot = pathJoin(tmpdir(), '.rpt2_cache');

const getModulePath = path => (
	pathJoin(__dirname, 'packages', path)
);

export default async function () {
	return Promise.all(
		MODULES
			.map(getModulePath)
			.map(async (modulePath) => {
				const modulePkg = await import(
					pathJoin(modulePath, 'package.json')
				);

				const src = pathJoin(modulePath, 'src');
				const lib = pathJoin(modulePath, 'lib');

				return {
					input: pathJoin(src, 'index.ts'),
					plugins: [
						nodeResolvePlugin(),
						commonjsPlugin(),
						jsonPlugin(),
						typescriptPlugin({
							cacheRoot,

							rollupCommonJSResolveHack: true,
							useTsconfigDeclarationDir: false,

							tsconfigOverride: {
								outDir: lib,
								rootDir: src,
								include: [src]
							}
						})
					],
					external: [
						...Object.keys(modulePkg.dependencies || {}),
						...Object.keys(modulePkg.peerDependencies || {}),
						...coreModules
					],
					output: [
						{
							file: pathJoin(modulePath, `${modulePkg.main}.js`),
							format: 'cjs',
							exports: 'named'
						},
						{
							file: pathJoin(modulePath, `${modulePkg.main}.mjs`),
							format: 'esm'
						}
					]
				};
			})
	);
}
