'use strict';

/**
 * Chat peer ID
 *
 * @type {number}
 */
const CHAT_PEER = 2e9;

/**
 * Special attachments in one message
 *
 * @type {Object}
 */
const specialAttachments = {
	sticker: (raw) => ({
		type: 'sticker',
		sticker: {
			id: Number(raw.attach1),
			product_id: Number(raw.attach1_product_id)
		}
	}),
	money_transfer: (raw) => ({
		type: 'money_transfer',
		money_transfer: {
			data: raw.attach1,
			amount: Number(raw.attach1_amount),
			currency: Number(raw.attach1_currency)
		}
	}),
	gift: (raw) => ({
		type: 'gift',
		gift: {
			id: Number(raw.attach1)
		}
	})
};

/**
 * Transform message to Object
 *
 * @param {Array} update
 *
 * @return {Object}
 */
export const transformMessage = ([, id, flags, peer, date, body, attachments, random]) => {
	const message = {
		id,
		peer,
		date,
		body,
		flags,
		random_id: random,
		out: Number((flags & 1) !== 0),
		deleted: Number((flags & 128) !== 0),
		read_state: Number((flags & 1) !== 0),
		emoji: Number(attachments.emoji === 1),
	};

	const isGroup = peer > 0;

	if (isGroup) {
		message.out = Number((flags & 2) === 0);
		message.important = Number((flags & 1) !== 0);
	} else {
		message.out = Number((flags & 2) !== 0);
		message.important = Number((flags & 8) !== 0);
	}

	if (peer > CHAT_PEER) {
		message.user_id = Number(attachments.from);
		message.chat_id = peer - CHAT_PEER;

		message.title = attachments.title;

		message.action = attachments.source_act;
		message.action_mid = attachments.source_mid;
		message.action_text = attachments.source_text;
	} else {
		message.user_id = peer;
	}

	if ('attach1' in attachments && attachments.attach1_type in specialAttachments) {
		message.attachments = [
			specialAttachments[attachments.attach1_type](attachments)
		];
	} else {
		message.attachments = [];

		for (let i = 1, key = 'attach1'; key in attachments; ++i, key = `attach${i}`) {
			let type = attachments[`${key}_type`];

			if (type === 'link') {
				const attachment = {
					type: 'link',
					link: {
						url: attachments[`${key}_url`],
						title: attachments[`${key}_title`],
						description: attachments[`${key}_desc`]
					}
				};

				const photoKey = `${key}_photo`;

				if (!!attachments[photoKey]) {
					/* jscs: disable disallowArrayDestructuringReturn */
					const [owner, id] = attachments[photoKey].split('_');

					attachment.link.photo = {
						id: Number(id),
						owner_id: Number(owner)
					};
				}

				message.attachments.push(attachment);

				continue;
			}

			const [owner, id] = attachments[key].split('_');

			const attachment = {
				type,
				[type]: {
					id: Number(id),
					owner_id: Number(owner)
				}
			};

			const kindKey = `${key}_kind`;

			if (type === 'doc' && kindKey in attachments) {
				attachment[type].kind = attachments[kindKey];
			}

			message.attachments.push(attachment);
		}
	}

	if ('fwd' in attachments) {
		message.fwd_messages = parseFwds(attachments.fwd);
	}

	return message;
};

/**
 * Checks the has brackets
 *
 * @type {RegExp}
 */
const fwdHasBrackets = /(\(.*\))/;

/**
 * Parse the sent forwards messages
 *
 * @param {string} raw
 *
 * @return {Array}
 */
function parseFwds(raw) {
	const out = [];

	for (const block of splitFwdDelimiter(raw, ',')) {
		const pair = splitFwdDelimiter(block, ':');

		if (pair.length === 0) {
			continue;
		}

		const [owner, id] = pair[0].split('_');

		const fwd = {
			id: Number(id),
			user_id: Number(owner),
			fwd_messages: []
		};

		if (pair.length !== 2) {
			out.push(fwd);

			continue;
		}

		fwd.fwd_messages = parseFwds(pair[1].substring(1, pair[1].length - 1));

		out.push(fwd);
	}

	return out;
}

/**
 * Separates a string through a separator
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
