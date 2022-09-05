#!/usr/bin/env sh

set -e

npx vuepress build docs

for modulePath in ./packages/*; do
	module=`(basename $modulePath)`;

	echo $module

	npx typedoc --out docs/.vuepress/dist/references/$module --readme none packages/$module/src/index.ts
done

cd docs/.vuepress/dist

git init
git add -A
git commit -m 'docs: regenerate docs'

git push -f git@github.com:negezor/vk-io.git master:gh-pages

cd -
