import { parseFwds } from './helpers';
import { CHAT_PEER } from '../utils/constants';

/**
 * Special attachments in one message
 *
 * @type {Object}
 */
const specialAttachments = {
	sticker: raw => ({
		type: 'sticker',
		sticker: {
			sticker_id: Number(raw.attach1),
			product_id: Number(raw.attach1_product_id)
		}
	}),
	money_transfer: raw => ({
		type: 'money_transfer',
		money_transfer: {
			data: raw.attach1,
			amount: Number(raw.attach1_amount),
			currency: Number(raw.attach1_currency)
		}
	}),
	gift: raw => ({
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
// eslint-disable-next-line import/prefer-default-export
export default function transformMessage([, id, flags, peer, date, body, extra, attachments]) {
	const message = {
		id,
		date,
		body,
		flags,
		geo: 'geo' in attachments
			? {}
			: null,
		random_id: extra.random_id || null,
		out: Number((flags & 2) === 2),
		deleted: Number((flags & 128) === 128),
		read_state: Number((flags & 1) === 1),
		emoji: Number(Boolean(extra.emoji)),
		payload: extra.payload
			? extra.payload
			: null
	};

	const isGroup = peer < 0;
	const isChat = peer > CHAT_PEER;

	if (isGroup) {
		message.out = Number((flags & 2) === 0);
		message.important = Number((flags & 1) !== 0);
	} else {
		message.out = Number((flags & 2) !== 0);
		message.important = Number((flags & 8) !== 0);
	}

	if (isChat) {
		message.user_id = Number(extra.from);
		message.chat_id = peer - CHAT_PEER;

		message.title = extra.title;

		if ('source_act' in extra) {
			message.action = extra.source_act;
			message.action_mid = extra.source_mid;
			message.action_text = extra.source_text;
		}
	} else {
		message.user_id = peer;
	}

	if (attachments.attach1_type in specialAttachments) {
		message.attachments = [
			specialAttachments[attachments.attach1_type](attachments)
		];
	} else {
		message.attachments = [];

		for (let i = 1, key = 'attach1'; key in attachments; i += 1, key = `attach${i}`) {
			const type = attachments[`${key}_type`];

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

				if (attachments[photoKey]) {
					const [owner, attachmentId] = attachments[photoKey].split('_');

					attachment.link.photo = {
						id: Number(attachmentId),
						owner_id: Number(owner)
					};
				}

				message.attachments.push(attachment);

				continue;
			}

			const [owner, attachmentId] = attachments[key].split('_');

			const attachment = {
				type,
				[type]: {
					id: Number(attachmentId),
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
}
