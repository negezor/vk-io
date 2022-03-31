// @ts-ignore
// import { MessagesMessage } from '../api/schemas/objects';
// @ts-ignore
import { IMessageContextPayload, MessageContextPayloadEventType } from '../message';
// @ts-ignore

// @ts-ignore
import { AttachmentType } from '../../../utils/constants';
// @ts-ignore

// @ts-ignore
const DocumentKind: Record<string, AttachmentType> = {
// @ts-ignore
	audiomsg: AttachmentType.AUDIO_MESSAGE,
// @ts-ignore
	graffiti: AttachmentType.GRAFFITI // I know what is stupid
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
const idToAttachmentPayload = (key: string): { id: number; owner_id: number } => {
// @ts-ignore
	const delimiterIndex = key.indexOf('_');
// @ts-ignore

// @ts-ignore
	return {
// @ts-ignore
		id: Number(key.substring(delimiterIndex + 1)),
// @ts-ignore
		owner_id: Number(key.substring(0, delimiterIndex))
// @ts-ignore
	};
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
const attachmentHandlers = {
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	sticker: (raw: any, key: string): object => ({
// @ts-ignore
		type: 'sticker',
// @ts-ignore
		sticker: {
// @ts-ignore
			sticker_id: Number(raw[key]),
// @ts-ignore
			product_id: Number(raw[`${key}_product_id`])
// @ts-ignore
		}
// @ts-ignore
	}),
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	money_transfer: (raw: any, key: string): object => ({
// @ts-ignore
		type: 'money_transfer',
// @ts-ignore
		money_transfer: {
// @ts-ignore
			data: raw[key],
// @ts-ignore
			amount: Number(raw[`${key}_amount`]),
// @ts-ignore
			currency: Number(raw[`${key}_currency`])
// @ts-ignore
		}
// @ts-ignore
	}),
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	gift: (raw: any, key: string): object => ({
// @ts-ignore
		type: 'gift',
// @ts-ignore
		gift: {
// @ts-ignore
			id: Number(raw[key])
// @ts-ignore
		}
// @ts-ignore
	}),
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	link: (raw: any, key: string): object => {
// @ts-ignore
		const photoId = raw[`${key}_photo`];
// @ts-ignore

// @ts-ignore
		return {
// @ts-ignore
			type: 'link',
// @ts-ignore
			link: {
// @ts-ignore
				url: raw[`${key}_url`],
// @ts-ignore
				title: raw[`${key}_title`],
// @ts-ignore
				description: raw[`${key}_desc`],
// @ts-ignore
				photo: photoId !== undefined
// @ts-ignore
					? idToAttachmentPayload(photoId)
// @ts-ignore
					: undefined
// @ts-ignore
			}
// @ts-ignore
		};
// @ts-ignore
	},
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	doc: (raw: any, key: string, _: string, index: number): object => {
// @ts-ignore
		const type = DocumentKind[raw[`${key}_kind`]] || AttachmentType.DOCUMENT;
// @ts-ignore

// @ts-ignore
		if (type in DocumentKind) {
// @ts-ignore
			return JSON.parse(raw.attachments)[index - 1];
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return {
// @ts-ignore
			type,
// @ts-ignore
			[type]: idToAttachmentPayload(raw[key])
// @ts-ignore
		};
// @ts-ignore
	},
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	default: (raw: any, key: string, type: string): object => ({
// @ts-ignore
		type,
// @ts-ignore
		[type]: idToAttachmentPayload(raw[key])
// @ts-ignore
	})
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Transform message to Object
// @ts-ignore
 */
// @ts-ignore
export function transformMessage({
// @ts-ignore
	1: id,
// @ts-ignore
	2: flags,
// @ts-ignore
	3: peer_id,
// @ts-ignore
	4: date,
// @ts-ignore
	5: text,
// @ts-ignore
	6: extra,
// @ts-ignore
	7: attachments,
// @ts-ignore
	8: random_id,
// @ts-ignore
	9: conversation_message_id,
// @ts-ignore
	10: update_time
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
}: [
// @ts-ignore
	number,
// @ts-ignore
	number,
// @ts-ignore
	number,
// @ts-ignore
	number,
// @ts-ignore
	number,
// @ts-ignore
	string,
// @ts-ignore
	{
// @ts-ignore
		title?: string;
// @ts-ignore
		from?: string;
// @ts-ignore

// @ts-ignore
		emoji?: '1';
// @ts-ignore
		has_template?: '1';
// @ts-ignore
		is_expired?: '1';
// @ts-ignore

// @ts-ignore
		source_act?: MessageContextPayloadEventType;
// @ts-ignore
		source_mid?: string;
// @ts-ignore
		source_message?: string;
// @ts-ignore
		source_chat_local_id?: string;
// @ts-ignore

// @ts-ignore
		payload?: string;
// @ts-ignore
	},
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	Record<string, any> & {
// @ts-ignore
		fwd?: string;
// @ts-ignore
		reply?: string;
// @ts-ignore
	},
// @ts-ignore
	number,
// @ts-ignore
	number,
// @ts-ignore
	number
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any,
// @ts-ignore
]): IMessageContextPayload['message'] {
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	const message = {
// @ts-ignore
		id,
// @ts-ignore
		conversation_message_id,
// @ts-ignore
		peer_id,
// @ts-ignore
		date,
// @ts-ignore
		update_time,
// @ts-ignore
		text,
// @ts-ignore
		random_id,
// @ts-ignore
		geo: attachments.geo !== undefined
// @ts-ignore
			? {}
// @ts-ignore
			: undefined,
// @ts-ignore
		payload: extra.payload
// @ts-ignore
	} as IMessageContextPayload['message'];
// @ts-ignore

// @ts-ignore
	if (extra.from !== undefined) {
// @ts-ignore
		message.from_id = Number(extra.from);
// @ts-ignore
	} else {
// @ts-ignore
		message.from_id = peer_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	if (peer_id < 0 && message.peer_id !== message.from_id) {
// @ts-ignore
		// eslint-disable-next-line no-bitwise
// @ts-ignore
		message.out = Number((flags & 2) === 0);
// @ts-ignore
		// eslint-disable-next-line no-bitwise
// @ts-ignore
		message.important = (flags & 1) !== 0;
// @ts-ignore
	} else {
// @ts-ignore
		// eslint-disable-next-line no-bitwise
// @ts-ignore
		message.out = Number((flags & 2) !== 0);
// @ts-ignore
		// eslint-disable-next-line no-bitwise
// @ts-ignore
		message.important = (flags & 8) !== 0;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	if (extra.source_act !== undefined) {
// @ts-ignore
		message.action = {
// @ts-ignore
			type: extra.source_act,
// @ts-ignore
			text: extra.source_message,
// @ts-ignore

// @ts-ignore
			member_id: extra.source_mid
// @ts-ignore
				? Number(extra.source_mid)
// @ts-ignore
				: undefined
// @ts-ignore
		};
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	message.attachments = [];
// @ts-ignore

// @ts-ignore
	for (let i = 1, key = 'attach1'; attachments[key] !== undefined; i += 1, key = `attach${i}`) {
// @ts-ignore
		const type = attachments[`${key}_type`];
// @ts-ignore

// @ts-ignore
		const handler = attachmentHandlers[type as keyof typeof attachmentHandlers]
// @ts-ignore
			|| attachmentHandlers.default;
// @ts-ignore

// @ts-ignore
		message.attachments.push(
// @ts-ignore
			handler(
// @ts-ignore
				attachments,
// @ts-ignore
				key,
// @ts-ignore
				type,
// @ts-ignore
				i
// @ts-ignore
			)
// @ts-ignore
		);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	if (attachments.reply !== undefined) {
// @ts-ignore
		const reply = JSON.parse(attachments.reply);
// @ts-ignore

// @ts-ignore
		message.reply_message = {
// @ts-ignore
			id: 0,
// @ts-ignore
			conversation_message_id: reply.conversation_message_id,
// @ts-ignore
			date: 0,
// @ts-ignore
			update_time: 0,
// @ts-ignore
			from_id: 0,
// @ts-ignore
			peer_id: 0,
// @ts-ignore
			out: 0,
// @ts-ignore
			text: '',
// @ts-ignore
			fwd_messages: [],
// @ts-ignore
			attachments: [],
// @ts-ignore
			random_id: 0,
// @ts-ignore
			important: false
// @ts-ignore
		};
// @ts-ignore
	} else if (attachments.fwd !== undefined) {
// @ts-ignore
		message.fwd_messages = [{
// @ts-ignore
			id: 0,
// @ts-ignore
			conversation_message_id: 0,
// @ts-ignore
			date: 0,
// @ts-ignore
			update_time: 0,
// @ts-ignore
			from_id: 0,
// @ts-ignore
			peer_id: 0,
// @ts-ignore
			out: 0,
// @ts-ignore
			text: '',
// @ts-ignore
			fwd_messages: [],
// @ts-ignore
			attachments: [],
// @ts-ignore
			random_id: 0,
// @ts-ignore
			important: false
// @ts-ignore
		}];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return message;
// @ts-ignore
}
