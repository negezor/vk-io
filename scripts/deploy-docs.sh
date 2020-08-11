#!/usr/bin/env sh

set -e

yarn vuepress build docs

for modulePath in ./packages/*; do
	module=`(basename $modulePath)`;

	echo $module

	yarn typedoc --out docs/.vuepress/dist/references/$module --target es6 --readme none --mode file packages/$module/src
done

cd docs/.vuepress/dist

git init
git add -A
git commit -m 'docs: regenerate docs'

git push -f git@github.com:negezor/vk-io.git master:gh-pages

cd -
