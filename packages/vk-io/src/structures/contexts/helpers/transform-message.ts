// import { MessagesMessage } from '../api/schemas/objects';
import { IMessageContextPayload, MessageContextPayloadEventType } from '../message';

import { AttachmentType } from '../../../utils/constants';

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
	doc: (raw: any, key: string, _: string, index: number): object => {
		const type = DocumentKind[raw[`${key}_kind`]] || AttachmentType.DOCUMENT;

		if (type in DocumentKind) {
			return JSON.parse(raw.attachments)[index - 1];
		}

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
	3: peer_id,
	4: date,
	5: text,
	6: extra,
	7: attachments,
	8: random_id,
	9: conversation_message_id,
	10: update_time
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: [
	number,
	number,
	number,
	number,
	number,
	string,
	{
		title?: string;
		from?: string;

		emoji?: '1';
		has_template?: '1';
		is_expired?: '1';

		source_act?: MessageContextPayloadEventType;
		source_mid?: string;
		source_message?: string;
		source_chat_local_id?: string;

		payload?: string;
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Record<string, any> & {
		fwd?: string;
		reply?: string;
	},
	number,
	number,
	number
	// eslint-disable-next-line @typescript-eslint/no-explicit-any,
]): IMessageContextPayload['message'] {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const message = {
		id,
		conversation_message_id,
		peer_id,
		date,
		update_time,
		text,
		random_id,
		geo: attachments.geo !== undefined
			? {}
			: undefined,
		payload: extra.payload
	} as IMessageContextPayload['message'];

	if (extra.from !== undefined) {
		message.from_id = Number(extra.from);
	} else {
		message.from_id = peer_id;
	}

	if (peer_id < 0 && message.peer_id !== message.from_id) {
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
			text: extra.source_message,

			member_id: extra.source_mid
				? Number(extra.source_mid)
				: undefined
		};
	}

	message.attachments = [];

	for (let i = 1, key = 'attach1'; attachments[key] !== undefined; i += 1, key = `attach${i}`) {
		const type = attachments[`${key}_type`];

		const handler = attachmentHandlers[type as keyof typeof attachmentHandlers]
			|| attachmentHandlers.default;

		message.attachments.push(
			handler(
				attachments,
				key,
				type,
				i
			)
		);
	}

	if (attachments.reply !== undefined) {
		const reply = JSON.parse(attachments.reply);

		message.reply_message = {
			id: 0,
			conversation_message_id: reply.conversation_message_id,
			date: 0,
			update_time: 0,
			from_id: 0,
			peer_id: 0,
			out: 0,
			text: '',
			fwd_messages: [],
			attachments: [],
			random_id: 0,
			important: false
		};
	} else if (attachments.fwd !== undefined) {
		message.fwd_messages = [{
			id: 0,
			conversation_message_id: 0,
			date: 0,
			update_time: 0,
			from_id: 0,
			peer_id: 0,
			out: 0,
			text: '',
			fwd_messages: [],
			attachments: [],
			random_id: 0,
			important: false
		}];
	}

	return message;
}
