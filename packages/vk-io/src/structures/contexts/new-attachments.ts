import Context, { IContextOptions } from './context';

import { VKError } from '../../errors';

import {
	Attachment,

	AudioAttachment,
	PhotoAttachment,
	VideoAttachment
} from '../attachments';
import Attachmentable from '../shared/attachmentable';

import { inspectCustomData } from '../../utils/constants';
import { copyParams, applyMixins } from '../../utils/helpers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const subTypes: Record<string, [string, any]> = {
	photo_new: ['new_photo_attachment', PhotoAttachment],
	video_new: ['new_video_attachment', VideoAttachment],
	audio_new: ['new_audio_attachment', AudioAttachment]
};

export interface INewAttachmentsContextPayload {
	id: number;
}

export type NewAttachmentsContextOptions<S> =
	Omit<IContextOptions<INewAttachmentsContextPayload, S>, 'type' | 'subTypes'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class NewAttachmentsContext<S = Record<string, any>>
	extends Context<INewAttachmentsContextPayload, S> {
	public attachments: Attachment[];

	public constructor(options: NewAttachmentsContextOptions<S>) {
		const [subType, PayloadAttachment] = subTypes[options.updateType];

		super({
			...options,

			type: 'new_attachment',
			subTypes: [
				subType
			]
		});

		this.attachments = [new PayloadAttachment(this.payload, this.vk)];
	}

	/**
	 * Checks is attachment photo
	 */
	public get isPhoto(): boolean {
		return this.subTypes.includes('new_photo_attachment');
	}

	/**
	 * Checks is attachment video
	 */
	public get isVideo(): boolean {
		return this.subTypes.includes('new_video_attachment');
	}

	/**
	 * Checks is attachment audio
	 */
	public get isAudio(): boolean {
		return this.subTypes.includes('new_audio_attachment');
	}

	/**
	 * Removes the attachment
	 */
	public deleteAttachment(): Promise<number> {
		if (this.isPhoto) {
			const [photo] = this.getAttachments('photo');

			return this.vk.api.photos.delete({
				owner_id: photo.ownerId,
				photo_id: photo.id
			});
		}

		if (this.isVideo) {
			const [video] = this.getAttachments('video');

			return this.vk.api.video.delete({
				owner_id: video.ownerId,
				video_id: video.id
			});
		}

		if (this.isAudio) {
			const [audio] = this.getAttachments('audio');

			// @ts-ignore
			return this.vk.api.audio.delete({
				owner_id: audio.ownerId,
				audio_id: audio.id
			});
		}

		return Promise.reject(new VKError({
			message: 'Unsupported event for deleting attachment',
			code: 'UNSUPPORTED_EVENT'
		}));
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		return copyParams(this, [
			'attachments',
			'isPhoto',
			'isVideo',
			'isAudio'
		]);
	}
}

// eslint-disable-next-line
interface NewAttachmentsContext extends Attachmentable {}
applyMixins(NewAttachmentsContext, [Attachmentable]);

export default NewAttachmentsContext;
