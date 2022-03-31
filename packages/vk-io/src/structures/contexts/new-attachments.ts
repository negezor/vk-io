// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { VKError } from '../../errors';
// @ts-ignore

// @ts-ignore
import {
// @ts-ignore
	AudioAttachment,
// @ts-ignore
	PhotoAttachment,
// @ts-ignore
	VideoAttachment
// @ts-ignore
} from '../attachments';
// @ts-ignore
import { Attachmentable } from '../shared/attachmentable';
// @ts-ignore

// @ts-ignore
import { pickProperties, applyMixins } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData, AttachmentType } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export type NewAttachmentsContextType = 'new_attachment';
// @ts-ignore

// @ts-ignore
export type NewAttachmentsContextSubType =
// @ts-ignore
'photo_new'
// @ts-ignore
| 'video_new'
// @ts-ignore
| 'audio_new';
// @ts-ignore

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
const subAttachmentTypes: Record<string, any> = {
// @ts-ignore
	photo_new: PhotoAttachment,
// @ts-ignore
	video_new: VideoAttachment,
// @ts-ignore
	audio_new: AudioAttachment
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
export interface INewAttachmentsContextPayload {
// @ts-ignore
	id: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type NewAttachmentsContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<INewAttachmentsContextPayload, S>;
// @ts-ignore

// @ts-ignore
class NewAttachmentsContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	INewAttachmentsContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	NewAttachmentsContextType,
// @ts-ignore
	NewAttachmentsContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public constructor(options: NewAttachmentsContextOptions<S>) {
// @ts-ignore
		const PayloadAttachment = subAttachmentTypes[options.updateType];
// @ts-ignore

// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'new_attachment',
// @ts-ignore
			subTypes: [
// @ts-ignore
				options.updateType as NewAttachmentsContextSubType
// @ts-ignore
			]
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.attachments = [new PayloadAttachment(this.payload, this.api)];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is attachment photo
// @ts-ignore
	 */
// @ts-ignore
	public get isPhoto(): boolean {
// @ts-ignore
		return this.subTypes.includes('photo_new');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is attachment video
// @ts-ignore
	 */
// @ts-ignore
	public get isVideo(): boolean {
// @ts-ignore
		return this.subTypes.includes('video_new');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is attachment audio
// @ts-ignore
	 */
// @ts-ignore
	public get isAudio(): boolean {
// @ts-ignore
		return this.subTypes.includes('audio_new');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Removes the attachment
// @ts-ignore
	 */
// @ts-ignore
	public deleteAttachment(): Promise<number> {
// @ts-ignore
		if (this.isPhoto) {
// @ts-ignore
			const [photo] = this.getAttachments(AttachmentType.PHOTO);
// @ts-ignore

// @ts-ignore
			return this.api.photos.delete({
// @ts-ignore
				owner_id: photo.ownerId,
// @ts-ignore
				photo_id: photo.id
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (this.isVideo) {
// @ts-ignore
			const [video] = this.getAttachments(AttachmentType.VIDEO);
// @ts-ignore

// @ts-ignore
			return this.api.video.delete({
// @ts-ignore
				owner_id: video.ownerId,
// @ts-ignore
				video_id: video.id
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (this.isAudio) {
// @ts-ignore
			const [audio] = this.getAttachments(AttachmentType.AUDIO);
// @ts-ignore

// @ts-ignore
			// @ts-expect-error
// @ts-ignore
			return this.api.audio.delete({
// @ts-ignore
				owner_id: audio.ownerId,
// @ts-ignore
				audio_id: audio.id
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Promise.reject(new VKError({
// @ts-ignore
			message: 'Unsupported event for deleting attachment',
// @ts-ignore
			code: 'UNSUPPORTED_EVENT'
// @ts-ignore
		}));
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the custom data
// @ts-ignore
	 */
// @ts-ignore
	public [kSerializeData](): object {
// @ts-ignore
		return pickProperties(this, [
// @ts-ignore
			'attachments',
// @ts-ignore
			'isPhoto',
// @ts-ignore
			'isVideo',
// @ts-ignore
			'isAudio'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
// eslint-disable-next-line
// @ts-ignore
interface NewAttachmentsContext extends Attachmentable {}
// @ts-ignore
applyMixins(NewAttachmentsContext, [Attachmentable]);
// @ts-ignore

// @ts-ignore
export { NewAttachmentsContext };
