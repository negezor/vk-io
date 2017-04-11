'use strict';

const request = require('request');

const { Stream } = require('stream');
const { createReadStream } = require('fs');

/**
 * Возвращает форму для отправки
 *
 * @param {string} field
 * @param {mixed}  sources
 *
 * @return {Object}
 */
function getForm(field, sources) {
	if (!Array.isArray(sources)) {
		return {
			[field]: getSource(sources)
		};
	}

	const form = {};

	let i = 0;

	for (const source of sources) {
		form[field + (++i)] = getSource(source);
	}

	return form;
}

exports.getForm = getForm;

/**
 * Извлекает опции из параметров
 *
 * @param {Object} params
 *
 * @return {Object}
 */
function extractUploadOptions(params) {
	const options = {
		source: params.source
	};
	delete params.source;

	if ('timeout' in params) {
		options.timeout = params.timeout;
		delete params.timeout;
	}

	if ('qs' in params) {
		options.qs = params.qs;
		delete params.timeout;
	}

	if ('uploadUrl' in params) {
		options.uploadUrl = params.uploadUrl;
		delete params.uploadUrl;
	}

	return options;
}

exports.extractUploadOptions = extractUploadOptions;

/**
 * Копирует параметры
 *
 * @param {Object} params
 * @param {Object} save
 * @param {Array}  list
 */
function copyParams(params, save, list) {
	for (const name of list) {
		if (name in params) {
			save[name] = params[name];
		}
	}
}

exports.copyParams = copyParams;

/**
 * Проверяет наличие ссылки
 *
 * @type {Boolean}
 */
const isLink = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.?)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

/**
 * Возвращает исходник для отправки
 *
 * @param {mixed} source
 *
 * @return {mixed}
 */
function getSource(source) {
	if (typeof source !== 'object') {
		if (isLink.test(source)) {
			return request(source);
		}

		return createReadStream(source);
	}

	if ('value' in source) {
		source.value = getSource(source.value);

		return source;
	}

	if (isStream(source) || Buffer.isBuffer(source) || 'httpModule' in source) {
		return source;
	}
}

/**
 * Проверяет является ли объект стримом
 *
 * @param {mixed} source
 *
 * @return {Boolean}
 */
function isStream(source) {
	return source instanceof Stream;
}
