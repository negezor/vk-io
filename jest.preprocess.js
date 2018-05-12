// eslint-disable-next-line import/no-extraneous-dependencies
const babelJest = require('babel-jest');

const babelrc = require('./.babelrc');

module.exports = babelJest.createTransformer(babelrc);
