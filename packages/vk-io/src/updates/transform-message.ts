// import { MessagesMessage } from '../api/schemas/objects';
import { IMessageContextPayload } from '../structures/contexts/message';
import { AttachmentType } from '../utils/constants';

/* eslint-disable @typescript-eslint/camelcase */

const DocumentKind: Record<string, AttachmentType> = {
	audiomsg: AttachmentType.AUDIO_MESSAGE,
	graffiti: AttachmentType.GRAFFITI // I know what is stupid
};

const idToAttachmentPayload = (key: string): { id: number; owner_id: number } => {
	const delimiterIndex = key.indexOf('_');

	return {
		id: Number(key.substring(delimiterIndex + 1)),
		owner_id: Number(key.substring(0, delimiterIndex))
	};
};

const attachmentHandlers = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	sticker: (raw: any, key: string): object => ({
		type: 'sticker',
		sticker: {
			sticker_id: Number(raw[key]),
			product_id: Number(raw[`${key}_product_id`])
		}
	}),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	money_transfer: (raw: any, key: string): object => ({
		type: 'money_transfer',
		money_transfer: {
			data: raw[key],
			amount: Number(raw[`${key}_amount`]),
			currency: Number(raw[`${key}_currency`])
		}
	}),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	gift: (raw: any, key: string): object => ({
		type: 'gift',
		gift: {
			id: Number(raw[key])
		}
	}),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	link: (raw: any, key: string): object => {
		const photoId = raw[`${key}_photo`];

		return {
			type: 'link',
			link: {
				url: raw[`${key}_url`],
				title: raw[`${key}_title`],
				description: raw[`${key}_desc`],
				photo: photoId !== undefined
					? idToAttachmentPayload(photoId)
					: undefined
			}
		};
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	doc: (raw: any, key: string): object => {
		const type = DocumentKind[raw[`${key}_kind`]] || AttachmentType.DOCUMENT;

		return {
			type,
			[type]: idToAttachmentPayload(raw[key])
		};
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	default: (raw: any, key: string, type: string): object => ({
		type,
		[type]: idToAttachmentPayload(raw[key])
	})
};

/**
 * Transform message to Object
 */
export function transformMessage({
	1: id,
	2: flags,
	3: peer,
	4: date,
	5: text,
	6: extra,
	7: attachments,
	8: random_id
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: [
	number,
	number,
	number,
	number,
	number,
	string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Record<string, any>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Record<string, any>,
	number
	// eslint-disable-next-line @typescript-eslint/no-explicit-any,
]): IMessageContextPayload['message'] {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const message = {
		id,
		date,
		text,
		random_id,
		geo: attachments.geo !== undefined
			? {}
			: undefined,
		payload: extra.payload
	} as IMessageContextPayload['message'];

	message.peer_id = peer;

	if (extra.from !== undefined) {
		message.from_id = Number(extra.from);
	} else {
		message.from_id = peer;
	}

	if (peer < 0 && message.peer_id !== message.from_id) {
		// eslint-disable-next-line no-bitwise
		message.out = Number((flags & 2) === 0);
		// eslint-disable-next-line no-bitwise
		message.important = (flags & 1) !== 0;
	} else {
		// eslint-disable-next-line no-bitwise
		message.out = Number((flags & 2) !== 0);
		// eslint-disable-next-line no-bitwise
		message.important = (flags & 8) !== 0;
	}

	if (extra.source_act !== undefined) {
		message.action = {
			type: extra.source_act,
			text: extra.source_text,
			member_id: extra.source_mid
		};
	}

	message.attachments = [];

	for (let i = 1, key = 'attach1'; attachments[key] !== undefined; i += 1, key = `attach${i}`) {
		const type = attachments[`${key}_type`];

		// @ts-ignore
		const handler = attachmentHandlers[type] || attachmentHandlers.default;

		message.attachments.push(
			handler(
				attachments,
				key,
				type
			)
		);
	}

	let { fwd } = attachments;

	// Now long poll receive such forward messages 0_0,0_0
	// Only for checking the presence of a sent message
	if (fwd !== undefined) {
		const indexColon = fwd.indexOf(':');
		if (indexColon !== -1) {
			fwd = fwd.substring(0, indexColon);
		}

		message.fwd_messages = fwd
			.split(',')
			.map((attachment: string): object => ({
				date: 0,
				from_id: Number(
					attachment.substring(0, attachment.indexOf('_'))
				),
				text: '',
				fwd_messages: [],
				attachments: [],
				update_time: 0
			}));
	}

	return message;
}
