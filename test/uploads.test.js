import fetch from 'node-fetch';

import {
	VK,

	UploadError,
	uploadErrors,

	PhotoAttachment,
	// VideoAttachment
} from '..';

const { TOKEN = null } = process.env;

const vk = new VK({ token: TOKEN });

const IMAGE_URL = 'https://picsum.photos/200/300/?image=1';

describe('Uploads', () => {
	const { upload } = vk;

	it('should throw an error if there are no parameters', async () => {
		try {
			await upload.messagePhoto();
		} catch (error) {
			expect(error).toBeInstanceOf(UploadError);
			expect(error.code).toEqual(uploadErrors.MISSING_PARAMETERS);
		}

		try {
			await upload.messagePhoto({});
		} catch (error) {
			expect(error).toBeInstanceOf(UploadError);
			expect(error.code).toEqual(uploadErrors.MISSING_PARAMETERS);
		}
	});

	it('should throw in the absence of source', async () => {
		try {
			await upload.messagePhoto({
				source: []
			});
		} catch (error) {
			expect(error).toBeInstanceOf(UploadError);
			expect(error.code).toEqual(uploadErrors.NO_FILES_TO_UPLOAD);
		}
	});

	it('should cause an error with more uploads', async () => {
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
			expect(error.code).toEqual(uploadErrors.EXCEEDED_MAX_FILES);
		}
	});

	if (TOKEN === null) {
		it('the test is skipped because there is no token', () => {});

		return;
	}

	it('should upload image to wall from url', async () => {
		const photo = await upload.messagePhoto({
			source: IMAGE_URL
		});

		expect(photo).toBeInstanceOf(PhotoAttachment);
		expect(photo.id).toBeGreaterThan(0);
		expect(photo.owner_id).not.toEqual(0);
	});

	it('should upload image to wall from buffer', async () => {
		const response = await fetch(IMAGE_URL);
		const buffer = await response.buffer();

		const photo = await upload.messagePhoto({
			source: buffer
		});

		expect(photo).toBeInstanceOf(PhotoAttachment);
		expect(photo.id).toBeGreaterThan(0);
		expect(photo.owner_id).not.toEqual(0);
	});

	it('should upload image to wall from stream', async () => {
		const response = await fetch(IMAGE_URL);

		const photo = await upload.messagePhoto({
			source: response.body
		});

		expect(photo).toBeInstanceOf(PhotoAttachment);
		expect(photo.id).toBeGreaterThan(0);
		expect(photo.owner_id).not.toEqual(0);
	});
});
