// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
// @ts-ignore
import { jest } from '@jest/globals';
// @ts-ignore

// @ts-ignore
import {
// @ts-ignore
	VK,
// @ts-ignore

// @ts-ignore
	UploadError,
// @ts-ignore
	UploadErrorCode,
// @ts-ignore

// @ts-ignore
	PhotoAttachment
// @ts-ignore
} from '..';
// @ts-ignore

// @ts-ignore
import { fetch } from '../src/utils/fetch';
// @ts-ignore

// @ts-ignore
const { TOKEN } = process.env;
// @ts-ignore

// @ts-ignore
const vk = new VK({ token: TOKEN! });
// @ts-ignore

// @ts-ignore
const IMAGE_URL = 'https://picsum.photos/200/300/?image=1';
// @ts-ignore

// @ts-ignore
jest.setTimeout(30000);
// @ts-ignore

// @ts-ignore
describe('Uploads', (): void => {
// @ts-ignore
	const { upload } = vk;
// @ts-ignore

// @ts-ignore
	it('should throw an error if there are no parameters', async (): Promise<void> => {
// @ts-ignore
		try {
// @ts-ignore
			// @ts-expect-error
// @ts-ignore
			await upload.messagePhoto();
// @ts-ignore
		} catch (error) {
// @ts-ignore
			expect(error).toBeInstanceOf(UploadError);
// @ts-ignore
			expect((error as UploadError).code).toEqual(UploadErrorCode.MISSING_PARAMETERS);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		try {
// @ts-ignore
			// @ts-expect-error
// @ts-ignore
			await upload.messagePhoto({});
// @ts-ignore
		} catch (error) {
// @ts-ignore
			expect(error).toBeInstanceOf(UploadError);
// @ts-ignore
			expect((error as UploadError).code).toEqual(UploadErrorCode.MISSING_PARAMETERS);
// @ts-ignore
		}
// @ts-ignore
	});
// @ts-ignore

// @ts-ignore
	it('should throw in the absence of source', async (): Promise<void> => {
// @ts-ignore
		try {
// @ts-ignore
			await upload.messagePhoto({
// @ts-ignore
				source: {
// @ts-ignore
					values: []
// @ts-ignore
				}
// @ts-ignore
			});
// @ts-ignore
		} catch (error) {
// @ts-ignore
			expect(error).toBeInstanceOf(UploadError);
// @ts-ignore
			expect((error as UploadError).code).toEqual(UploadErrorCode.NO_FILES_TO_UPLOAD);
// @ts-ignore
		}
// @ts-ignore
	});
// @ts-ignore

// @ts-ignore
	it('should cause an error with more uploads', async (): Promise<void> => {
// @ts-ignore
		try {
// @ts-ignore
			await upload.messagePhoto({
// @ts-ignore
				source: {
// @ts-ignore
					values: [
// @ts-ignore
						{
// @ts-ignore
							value: IMAGE_URL
// @ts-ignore
						},
// @ts-ignore
						{
// @ts-ignore
							value: IMAGE_URL
// @ts-ignore
						}
// @ts-ignore
					]
// @ts-ignore
				}
// @ts-ignore
			});
// @ts-ignore
		} catch (error) {
// @ts-ignore
			expect(error).toBeInstanceOf(UploadError);
// @ts-ignore
			expect((error as UploadError).code).toEqual(UploadErrorCode.EXCEEDED_MAX_FILES);
// @ts-ignore
		}
// @ts-ignore
	});
// @ts-ignore

// @ts-ignore
	if (TOKEN === undefined) {
// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-empty-function
// @ts-ignore
		it('the test is skipped because there is no token', (): void => {});
// @ts-ignore

// @ts-ignore
		return;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	it('should upload image to message from url', async (): Promise<void> => {
// @ts-ignore
		const photo = await upload.messagePhoto({
// @ts-ignore
			source: {
// @ts-ignore
				value: IMAGE_URL
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		expect(photo).toBeInstanceOf(PhotoAttachment);
// @ts-ignore
		expect(photo.id).toBeGreaterThan(0);
// @ts-ignore
		expect(photo.ownerId).not.toEqual(0);
// @ts-ignore
	});
// @ts-ignore

// @ts-ignore
	it('should upload image to message from buffer', async (): Promise<void> => {
// @ts-ignore
		const response = await fetch(IMAGE_URL);
// @ts-ignore
		const buffer = Buffer.from(await response.arrayBuffer());
// @ts-ignore

// @ts-ignore
		const photo = await upload.messagePhoto({
// @ts-ignore
			source: {
// @ts-ignore
				value: buffer
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		expect(photo).toBeInstanceOf(PhotoAttachment);
// @ts-ignore
		expect(photo.id).toBeGreaterThan(0);
// @ts-ignore
		expect(photo.ownerId).not.toEqual(0);
// @ts-ignore
	});
// @ts-ignore

// @ts-ignore
	it('should upload image to message from stream', async (): Promise<void> => {
// @ts-ignore
		const response = await fetch(IMAGE_URL);
// @ts-ignore

// @ts-ignore
		const photo = await upload.messagePhoto({
// @ts-ignore
			source: {
// @ts-ignore
				value: response.body!,
// @ts-ignore
				// @ts-expect-error
// @ts-ignore
				contentLength: response.headers.get('content-length')
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		expect(photo).toBeInstanceOf(PhotoAttachment);
// @ts-ignore
		expect(photo.id).toBeGreaterThan(0);
// @ts-ignore
		expect(photo.ownerId).not.toEqual(0);
// @ts-ignore
	});
// @ts-ignore
});
