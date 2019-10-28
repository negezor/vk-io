/* eslint-disable @typescript-eslint/camelcase */

/**
 * Special attachments in one message
 */
const specialAttachments: Record<string, Function> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	sticker: (raw: any): object => ({
		type: 'sticker',
		sticker: {
			sticker_id: Number(raw.attach1),
			product_id: Number(raw.attach1_product_id)
		}
	}),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	money_transfer: (raw: any): object => ({
		type: 'money_transfer',
		money_transfer: {
			data: raw.attach1,
			amount: Number(raw.attach1_amount),
			currency: Number(raw.attach1_currency)
		}
	}),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	gift: (raw: any): object => ({
		type: 'gift',
		gift: {
			id: Number(raw.attach1)
		}
	})
};

/**
 * Transform message to Object
 */
export default function transformMessage({
	1: id,
	2: flags,
	3: peer,
	4: date,
	5: text,
	6: extra,
	7: attachments
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: [
	number,
	number,
	number,
	number,
	number,
	number,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Record<string, any>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Record<string, any>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
]): Record<string, any> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const message: Record<string, any> = {
		id,
		date,
		text,
		flags,
		geo: 'geo' in attachments
			? {}
			: null,
		random_id: extra.random_id || null,
		payload: extra.payload
			? extra.payload
			: null
	};

	message.peer_id = peer;

	if ('from' in extra) {
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

	if ('source_act' in extra) {
		message.action = {
			type: extra.source_act,
			text: extra.source_text,
			member_id: extra.source_mid
		};
	}

	if (attachments.attach1_type in specialAttachments) {
		message.attachments = [
			specialAttachments[attachments.attach1_type](attachments)
		];
	} else {
		const messageAttachments = [];

		for (let i = 1, key = 'attach1'; key in attachments; i += 1, key = `attach${i}`) {
			const type = attachments[`${key}_type`];

			if (type === 'link') {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const attachment: Record<string, any> = {
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

				messageAttachments.push(attachment);

				continue;
			}

			const [owner, attachmentId] = attachments[key].split('_');

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const attachment: Record<string, any> = {
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

			messageAttachments.push(attachment);
		}

		message.attachments = messageAttachments;
	}

	let { fwd = null } = attachments;

	// Now long poll receive such forward messages 0_0,0_0
	if (fwd !== null) {
		const indexColon = fwd.indexOf(':');
		if (indexColon !== -1) {
			fwd = fwd.substring(0, indexColon);
		}

		message.fwd_messages = fwd
			.split(',')
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.map((attachment: any): object => {
				const [owner] = attachment.split('_');

				return {
					date: 0,
					from_id: Number(owner),
					text: '',
					fwd_messages: [],
					attachments: [],
					update_time: 0
				};
			});
	}

	return message;
}
