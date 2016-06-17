'use strict';

exports.promise = require('bluebird');

exports.request = require('request-promise');

exports.extend = Object.assign.bind(Object);

exports.async = require('async');

exports.cheerio = require('cheerio');

exports.entities = new (require('html-entities').AllHtmlEntities);
