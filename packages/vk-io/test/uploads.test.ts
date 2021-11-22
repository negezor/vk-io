// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from '@jest/globals';

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

jest.setTimeout(30000);

describe('Uploads', (): void => {
	const { upload } = vk;

	it('should throw an error if there are no parameters', async (): Promise<void> => {
		try {
			// @ts-expect-error
			await upload.messagePhoto();
		} catch (error) {
			expect(error).toBeInstanceOf(UploadError);
			expect((error as UploadError).code).toEqual(UploadErrorCode.MISSING_PARAMETERS);
		}

		try {
			// @ts-expect-error
			await upload.messagePhoto({});
		} catch (error) {
			expect(error).toBeInstanceOf(UploadError);
			expect((error as UploadError).code).toEqual(UploadErrorCode.MISSING_PARAMETERS);
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
			expect(error).toBeInstanceOf(UploadError);
			expect((error as UploadError).code).toEqual(UploadErrorCode.NO_FILES_TO_UPLOAD);
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
			expect(error).toBeInstanceOf(UploadError);
			expect((error as UploadError).code).toEqual(UploadErrorCode.EXCEEDED_MAX_FILES);
		}
	});

	if (TOKEN === undefined) {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		it('the test is skipped because there is no token', (): void => {});

		return;
	}

	it('should upload image to message from url', async (): Promise<void> => {
		const photo = await upload.messagePhoto({
			source: {
				value: IMAGE_URL
			}
		});

		expect(photo).toBeInstanceOf(PhotoAttachment);
		expect(photo.id).toBeGreaterThan(0);
		expect(photo.ownerId).not.toEqual(0);
	});

	it('should upload image to message from buffer', async (): Promise<void> => {
		const response = await fetch(IMAGE_URL);
		const buffer = Buffer.from(await response.arrayBuffer());

		const photo = await upload.messagePhoto({
			source: {
				value: buffer
			}
		});

		expect(photo).toBeInstanceOf(PhotoAttachment);
		expect(photo.id).toBeGreaterThan(0);
		expect(photo.ownerId).not.toEqual(0);
	});

	it('should upload image to message from stream', async (): Promise<void> => {
		const response = await fetch(IMAGE_URL);

		const photo = await upload.messagePhoto({
			source: {
				value: response.body!,
				// @ts-expect-error
				contentLength: response.headers.get('content-length')
			}
		});

		expect(photo).toBeInstanceOf(PhotoAttachment);
		expect(photo.id).toBeGreaterThan(0);
		expect(photo.ownerId).not.toEqual(0);
	});
});
