import { describe, it } from 'node:test';
import { strictEqual, notStrictEqual, ok } from 'node:assert';

import {
    VK,

    UploadError,
    UploadErrorCode,

    PhotoAttachment
} from '..';

import { fetch } from '../src/utils/fetch';

const { TOKEN } = process.env;

const vk = new VK({ token: TOKEN! });

const IMAGE_URL = 'https://picsum.photos/200/300/?image=1';

describe('Uploads', { timeout: 30_000 }, (): void => {
    const { upload } = vk;

    it('should throw an error if there are no parameters', async (): Promise<void> => {
        try {
            // @ts-expect-error
            await upload.messagePhoto();
        } catch (error) {
            ok(error instanceof UploadError);
            strictEqual((error as UploadError).code, UploadErrorCode.MISSING_PARAMETERS);
        }

        try {
            // @ts-expect-error
            await upload.messagePhoto({});
        } catch (error) {
            ok(error instanceof UploadError);
            strictEqual((error as UploadError).code, UploadErrorCode.MISSING_PARAMETERS);
        }
    });

    it('should throw in the absence of source', async (): Promise<void> => {
        try {
            await upload.messagePhoto({
                source: {
                    values: []
                }
            });
        } catch (error) {
            ok(error instanceof UploadError);
            strictEqual((error as UploadError).code, UploadErrorCode.NO_FILES_TO_UPLOAD);
        }
    });

    it('should cause an error with more uploads', async (): Promise<void> => {
        try {
            await upload.messagePhoto({
                source: {
                    values: [
                        {
                            value: IMAGE_URL
                        },
                        {
                            value: IMAGE_URL
                        }
                    ]
                }
            });
        } catch (error) {
            ok(error instanceof UploadError);
            strictEqual((error as UploadError).code, UploadErrorCode.EXCEEDED_MAX_FILES);
        }
    });

    const skip = TOKEN === undefined
        ? 'not set env TOKEN=<token>'
        : undefined;

    it('should upload image to message from url', { skip }, async (): Promise<void> => {
        const photo = await upload.messagePhoto({
            source: {
                value: IMAGE_URL
            }
        });

        ok(photo instanceof PhotoAttachment);
        notStrictEqual(photo.id, 0);
        notStrictEqual(photo.ownerId, 0);
    });

    it('should upload image to message from buffer', { skip }, async (): Promise<void> => {
        const response = await fetch(IMAGE_URL);
        const buffer = Buffer.from(await response.arrayBuffer());

        const photo = await upload.messagePhoto({
            source: {
                value: buffer
            }
        });

        ok(photo instanceof PhotoAttachment);
        notStrictEqual(photo.id, 0);
        notStrictEqual(photo.ownerId, 0);
    });

    it('should upload image to message from stream', { skip }, async (): Promise<void> => {
        const response = await fetch(IMAGE_URL);

        const photo = await upload.messagePhoto({
            source: {
                value: response.body!,
                // @ts-expect-error
                contentLength: response.headers.get('content-length')
            }
        });

        ok(photo instanceof PhotoAttachment);
        notStrictEqual(photo.id, 0);
        notStrictEqual(photo.ownerId, 0);
    });
});
