// @ts-ignore
import {
// @ts-ignore
	Attachment,
// @ts-ignore
	ExternalAttachment,
// @ts-ignore

// @ts-ignore
	PollAttachment,
// @ts-ignore
	GiftAttachment,
// @ts-ignore
	WallAttachment,
// @ts-ignore
	LinkAttachment,
// @ts-ignore
	PhotoAttachment,
// @ts-ignore
	AudioAttachment,
// @ts-ignore
	StoryAttachment,
// @ts-ignore
	VideoAttachment,
// @ts-ignore
	MarketAttachment,
// @ts-ignore
	StickerAttachment,
// @ts-ignore
	GraffitiAttachment,
// @ts-ignore
	DocumentAttachment,
// @ts-ignore
	WallReplyAttachment,
// @ts-ignore
	MarketAlbumAttachment,
// @ts-ignore
	AudioMessageAttachment
// @ts-ignore
} from '.';
// @ts-ignore

// @ts-ignore
import { API } from '../../api';
// @ts-ignore
import { AttachmentType } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
const attachmentsTypes = {
// @ts-ignore
	[AttachmentType.ALBUM]: undefined,
// @ts-ignore

// @ts-ignore
	[AttachmentType.POLL]: (): typeof PollAttachment => PollAttachment,
// @ts-ignore
	[AttachmentType.GIFT]: (): typeof GiftAttachment => GiftAttachment,
// @ts-ignore
	[AttachmentType.WALL]: (): typeof WallAttachment => WallAttachment,
// @ts-ignore
	[AttachmentType.LINK]: (): typeof LinkAttachment => LinkAttachment,
// @ts-ignore
	[AttachmentType.PHOTO]: (): typeof PhotoAttachment => PhotoAttachment,
// @ts-ignore
	[AttachmentType.AUDIO]: (): typeof AudioAttachment => AudioAttachment,
// @ts-ignore
	[AttachmentType.STORY]: (): typeof StoryAttachment => StoryAttachment,
// @ts-ignore
	[AttachmentType.VIDEO]: (): typeof VideoAttachment => VideoAttachment,
// @ts-ignore
	[AttachmentType.DOCUMENT]: (): typeof DocumentAttachment => DocumentAttachment,
// @ts-ignore
	[AttachmentType.MARKET]: (): typeof MarketAttachment => MarketAttachment,
// @ts-ignore
	[AttachmentType.STICKER]: (): typeof StickerAttachment => StickerAttachment,
// @ts-ignore
	[AttachmentType.GRAFFITI]: (): typeof GraffitiAttachment => GraffitiAttachment,
// @ts-ignore
	[AttachmentType.WALL_REPLY]: (): typeof WallReplyAttachment => WallReplyAttachment,
// @ts-ignore
	[AttachmentType.MARKET_ALBUM]: (): typeof MarketAlbumAttachment => MarketAlbumAttachment,
// @ts-ignore
	[AttachmentType.AUDIO_MESSAGE]: (): typeof AudioMessageAttachment => AudioMessageAttachment
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Transform raw attachments to wrapper
// @ts-ignore
 */
// @ts-ignore
export const transformAttachments = (
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	rawAttachments: any[],
// @ts-ignore
	api: API
// @ts-ignore
// eslint-disable-next-line function-paren-newline
// @ts-ignore
): (Attachment | ExternalAttachment)[] => {
// @ts-ignore
	const attachments: (Attachment | ExternalAttachment)[] = [];
// @ts-ignore

// @ts-ignore
	for (const rawAttachment of rawAttachments) {
// @ts-ignore
		const type = rawAttachment.type as AttachmentType;
// @ts-ignore

// @ts-ignore
		const attachmentFactory = attachmentsTypes[type];
// @ts-ignore

// @ts-ignore
		if (attachmentFactory === undefined) {
// @ts-ignore
			continue;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const AttachmentConstructor = attachmentFactory();
// @ts-ignore

// @ts-ignore
		attachments.push(
// @ts-ignore
			new AttachmentConstructor({
// @ts-ignore
				api,
// @ts-ignore
				payload: rawAttachment[type]
// @ts-ignore
			})
// @ts-ignore
		);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return attachments;
// @ts-ignore
};
