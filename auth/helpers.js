'use strict';

const cheerio = require('cheerio').load;
const { decode: decodeCp1251 } = require('iconv-lite');

const AuthError = require('../errors/auth');

/**
 * Парсирит форму
 *
 * @param {Cheerio} $
 *
 * @return {Object}
 */
function parseForm($) {
	const $form = $('form[action][method]');

	const fields = {};

	for (const { name, value } of $form.serializeArray()) {
		fields[name] = value;
	}

	return {
		action: $form.attr('action'),
		fields
	};
}

exports.parseForm = parseForm;

/**
 * Разбирает форму безопасности
 *
 * @param {Object}  response
 * @param {Object}  options
 * @param {cheerio} $
 *
 * @return {Object}
 */
function parseSecurityForm(response, { login, phone }, $ = cheerio(response.body)) {
	let number;

	if (phone !== null) {
		number = phone;
	} else if (login !== null && !login.includes('@')) {
		number = login;
	} else {
		throw new AuthError({
			message: 'Missing phone number in the phone or login field'
		});
	}

	if (typeof number === 'string') {
		number = number.trim().replace(/^(\+|00)/, '');
	}

	const $field = $('.field_prefix');

	const prefix = $field.first().text().trim().replace('+', '').length;
	const postfix  = $field.last().text().trim().length;

	number = number.toString();

	let { action, fields } = parseForm($);

	fields.code = number.slice(prefix, number.length - postfix);

	if (!action.startsWith('https://')) {
		action = 'https://' + response.request.uri.host + action;
	}

	return {
		action,
		fields
	};
}

exports.parseSecurityForm = parseSecurityForm;

/**
 * Конвентирует CP1251 в UTF-8
 *
 * @param {string} str
 *
 * @return {string}
 */
exports.decodeCp1251 = (str) => (
	decodeCp1251(Buffer.from(str, 'binary'), 'win1251')
);
