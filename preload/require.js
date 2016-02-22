'use strict';

/* Работа с "обещаниями" */
exports.promise = require('bluebird');

/* Работа с http */
exports.request = require('request-promise');

/* Набор асинхронных утилит */
exports.async = require('async');

/* Работа с html */
exports.cheerio = require('cheerio');

/* Декодировщик html сущностей */
exports.entities = new (require('html-entities').AllHtmlEntities);