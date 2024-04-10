import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { VKError } from '../../errors';

import {
    AudioAttachment,
    PhotoAttachment,
    VideoAttachment,
} from '../attachments';
import { Attachmentable } from '../shared/attachmentable';

import { pickProperties, applyMixins } from '../../utils/helpers';
import { kSerializeData, AttachmentType } from '../../utils/constants';

export type NewAttachmentsContextType = 'new_attachment';

export type NewAttachmentsContextSubType =
'photo_new'
| 'video_new'
| 'audio_new';

const subAttachmentTypes = {
    photo_new: PhotoAttachment,
    video_new: VideoAttachment,
    audio_new: AudioAttachment,
};

export interface INewAttachmentsContextPayload {
    id: number;
}

export type NewAttachmentsContextOptions<S> =
    ContextFactoryOptions<INewAttachmentsContextPayload, S>;

class NewAttachmentsContext<S = ContextDefaultState>
    extends Context<
    INewAttachmentsContextPayload,
    S,
    NewAttachmentsContextType,
    NewAttachmentsContextSubType
    > {
    public constructor(options: NewAttachmentsContextOptions<S>) {
        const PayloadAttachment = subAttachmentTypes[options.updateType as keyof typeof subAttachmentTypes];

        super({
            ...options,

            type: 'new_attachment',
            subTypes: [
                options.updateType as NewAttachmentsContextSubType,
            ],
        });

        this.attachments = [new PayloadAttachment({
            api: this.api,
            payload: this.payload as InstanceType<typeof PayloadAttachment>['payload'],
        })];
    }

    /**
     * Checks is attachment photo
     */
    public get isPhoto(): boolean {
        return this.subTypes.includes('photo_new');
    }

    /**
     * Checks is attachment video
     */
    public get isVideo(): boolean {
        return this.subTypes.includes('video_new');
    }

    /**
     * Checks is attachment audio
     */
    public get isAudio(): boolean {
        return this.subTypes.includes('audio_new');
    }

    /**
     * Removes the attachment
     */
    public deleteAttachment(): Promise<number> {
        if (this.isPhoto) {
            const [photo] = this.getAttachments(AttachmentType.PHOTO);

            return this.api.photos.delete({
                owner_id: photo.ownerId,
                photo_id: photo.id,
            });
        }

        if (this.isVideo) {
            const [video] = this.getAttachments(AttachmentType.VIDEO);

            return this.api.video.delete({
                owner_id: video.ownerId,
                video_id: video.id,
            });
        }

        if (this.isAudio) {
            const [audio] = this.getAttachments(AttachmentType.AUDIO);

            // @ts-expect-error no audio types
            return this.api.audio.delete({
                owner_id: audio.ownerId,
                audio_id: audio.id,
            });
        }

        return Promise.reject(new VKError({
            message: 'Unsupported event for deleting attachment',
            code: 'UNSUPPORTED_EVENT',
        }));
    }

    /**
     * Returns the custom data
     */
    public [kSerializeData](): object {
        return pickProperties(this, [
            'attachments',
            'isPhoto',
            'isVideo',
            'isAudio',
        ]);
    }
}

interface NewAttachmentsContext extends Attachmentable {}
applyMixins(NewAttachmentsContext, [Attachmentable]);

export { NewAttachmentsContext };
