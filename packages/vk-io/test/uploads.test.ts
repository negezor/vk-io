// @ts-ignore
import fetch from 'node-fetch';

import {
	VK,

	UploadError,
	UploadErrorCode,

	PhotoAttachment
} from '..';

const { TOKEN = null } = process.env;

const vk = new VK({ token: TOKEN });

const IMAGE_URL = 'https://picsum.photos/200/300/?image=1';

describe('Uploads', (): void => {
	const { upload } = vk;

	it('should throw an error if there are no parameters', async (): Promise<void> => {
		try {
			// @ts-ignore
			await upload.messagePhoto();
		} catch (error) {
			expect(error).toBeInstanceOf(UploadError);
			expect(error.code).toEqual(UploadErrorCode.MISSING_PARAMETERS);
		}

		try {
			// @ts-ignore
			await upload.messagePhoto({});
		} catch (error) {
			expect(error).toBeInstanceOf(UploadError);
			expect(error.code).toEqual(UploadErrorCode.MISSING_PARAMETERS);
		}
	});

	it('should throw in the absence of source', async (): Promise<void> => {
		try {
			await upload.messagePhoto({
				source: []
			});
		} catch (error) {
			expect(error).toBeInstanceOf(UploadError);
			expect(error.code).toEqual(UploadErrorCode.NO_FILES_TO_UPLOAD);
		}
	});

	it('should cause an error with more uploads', async (): Promise<void> => {
		try {
			await upload.messagePhoto({
				source: {
					values: [
						IMAGE_URL,
						IMAGE_URL
					]
				}
			});
		} catch (error) {
			expect(error).toBeInstanceOf(UploadError);
			expect(error.code).toEqual(UploadErrorCode.EXCEEDED_MAX_FILES);
		}
	});

	if (TOKEN === null) {
		it('the test is skipped because there is no token', (): void => {});

		return;
	}

	it('should upload image to wall from url', async (): Promise<void> => {
		const photo = await upload.messagePhoto({
			source: IMAGE_URL
		});

		expect(photo).toBeInstanceOf(PhotoAttachment);
		expect(photo.id).toBeGreaterThan(0);
		expect(photo.ownerId).not.toEqual(0);
	});

	it('should upload image to wall from buffer', async (): Promise<void> => {
		const response = await fetch(IMAGE_URL);
		const buffer = await response.buffer();

		const photo = await upload.messagePhoto({
			source: buffer
		});

		expect(photo).toBeInstanceOf(PhotoAttachment);
		expect(photo.id).toBeGreaterThan(0);
		expect(photo.ownerId).not.toEqual(0);
	});

	it('should upload image to wall from stream', async (): Promise<void> => {
		const response = await fetch(IMAGE_URL);

		const photo = await upload.messagePhoto({
			source: response.body
		});

		expect(photo).toBeInstanceOf(PhotoAttachment);
		expect(photo.id).toBeGreaterThan(0);
		expect(photo.ownerId).not.toEqual(0);
	});
});
