'use strict';

/**
 * Список флагов сообщения
 *
 * unread - сообщение не прочитано
 * outbox - исходящее сообщение
 * replied - на сообщение был создан ответ
 * important - помеченное сообщение
 * chat - сообщение отправлено через чат
 * friends - сообщение отправлено другом
 * spam - сообщение помечено как "Спам"
 * delеtеd - сообщение удалено (в корзине)
 * fixed - сообщение проверено пользователем на спам
 * media - сообщение содержит медиаконтент
 */
const dialogFlags = {
	1: 'unread',
	2: 'outbox',
	4: 'replied',
	8: 'important',
	16: 'chat',
	32: 'friends',
	64: 'spam',
	128: 'delеtеd',
	256: 'fixed',
	512: 'media'
};

/**
 * Список флагов сообщества
 *
 * important - важный диалог
 * answered - диалог с ответом от сообщества
 * ... наследование сообщений диалогов
 */
const groupFlags = Object.assign({}, dialogFlags, {
	1: 'important',
	2: 'answered'
});

/**
 * Парсирит longpoll флаги
 *
 * @return {Array}
 */
function parseFlags(sum, type = false) {
	const list = type ? groupFlags : dialogFlags;

	const flags = [];

	for (let i = 0, bit = 1; i < 10; ++i, bit *= 2) {
		if ((sum & bit) !== 0) {
			flags.push(list[bit]);
		}
	}

	return flags;
}

exports.parseFlags = parseFlags;

/**
 * Уникальные прикрипления к сообщениям
 */
const attachmentOne = {
	/* Отправлен стикер */
	sticker: (raw) => ({
		sticker: {
			id: +raw.attach1,
			product: +raw.attach1_product_id
		}
	}),

	/* Передача денег */
	money_transfer: (raw) => ({
		money: {
			data: raw.attach1 || null,
			amount: +raw.attach1_amount,
			currency: raw.attach1_currency
		}
	}),

	/* Отправлен подарок */
	gift: (raw) => ({
		gift: {
			id: +raw.attach1
		}
	})
};

/**
 * Парсирит прикрипления
 *
 * @param  {Object} raw
 *
 * @return {Object}
 */
function parseAttachments(raw) {
	if ('attach1' in raw && raw.attach1_type in attachmentOne) {
		return attachmentOne[raw.attach1_type](raw);
	}

	const attachments = {};

	for (let i = 1, key = 'attach1'; key in raw; ++i, key = 'attach' + i) {
		let type = raw[key + '_type'];

		if (!(type in attachments)) {
			attachments[type] = [];
		}

		if (type === 'link') {
			const attachment = {
				url: raw[key + '_url'],
				title: raw[key + '_title'],
				description: raw[key + '_desc']
			};

			const photoKey = key + '_photo';

			if (photoKey in raw && raw[photoKey] !== '') {
				const [owner, id] = raw[photoKey].split('_');

				attachment.photo = {
					id: +id,
					owner: +owner
				};
			} else {
				attachment.photo = null;
			}

			attachments[type].push(attachment);

			continue;
		}

		const [owner, id] = raw[key].split('_');

		const attachment = {
			id: +id,
			owner: +owner
		};

		if (type === 'doc' && key + '_kind' in raw) {
			attachment.type = raw[key + '_kind'];
		}

		attachments[type].push(attachment);
	}

	return attachments;
}

exports.parseAttachments = parseAttachments;

/**
 * Проверяет наличие скобок
 */
const fwdHasBrackets = /(\(.*\))/;

/**
 * Парсирит пересланные сообщения
 *
 * @param {string} raw
 *
 * @return {Array}
 */
function parseFwds(raw) {
	if (fwdHasBrackets.test(raw)) {
		raw = raw.substring(1, raw.length - 1);
	}

	const out = [];

	for (const block of splitFwdDelimiter(raw, ',')) {
		const pair = splitFwdDelimiter(block, ':');

		if (pair.length === 0) {
			continue;
		}

		const [owner, id] = pair[0].split('_');

		const fwd = {
			id: +id,
			owner: +owner,
			fwd: []
		};

		if (pair.length !== 2) {
			out.push(fwd);

			continue;
		}

		fwd.fwd = parseFwds(pair[1]);

		out.push(fwd);
	}

	return out;
}

/**
 * Разделяет строку через разделитель
 *
 * @param {string} raw
 * @param {string} delimiter
 *
 * @return {Array}
 */
function splitFwdDelimiter(raw, delimiter) {
	const out = [];

	let tmp = '';
	let left = 0;
	let right = 0;

	const keepResult = () => {
		out.push(tmp);
		tmp = '';
	};

	for (const sign of raw) {
		switch (sign) {
			case delimiter:
				if (left === right) {
					left = right = 0;

					keepResult();

					continue;
				}

				break;
			case '(':
				++left;

				break;
			case ')':
				++right;
		}

		tmp += sign;
	}

	keepResult();

	return out;
}

exports.parseFwds = parseFwds;

/**
 * Кэш регулярных выражений
 */
const lt = /&lt;/g;
const qt = /&gt;/g;
const quot = /&quot;/g;
const amp = /&amp;/g;
const br = /<br>/g;

/**
 * Декодирует HTML сущности
 *
 * @param {string} str
 *
 * @return {string}
 */
function unescape(str) {
	return str
	.replace(lt, '<')
	.replace(qt, '>')
	.replace(quot, '"')
	.replace(amp, '&');
}

exports.unescape = unescape;
