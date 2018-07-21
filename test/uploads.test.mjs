import {
	VK,
	PhotoAttachment,
	VideoAttachment,
} from '..';
import fetch from 'node-fetch';

const { TOKEN = null } = process.env;

const vk = new VK({ token: TOKEN });

describe('Uploads', () => {
	describe('basicUploading', () => {
		if (TOKEN === null) {
			it('the test is skipped because there is no token', () => {});
			return;
		}

		it('should upload image to wall from url', async () => {
			const photo = await vk.upload.wallPhoto({
				source: 'https://avatars2.githubusercontent.com/u/9392723?s=400&v=4'
			});

			expect(photo).toBeInstanceOf(PhotoAttachment);
			expect(photo.id).toBeGreaterThan(0);
			expect(photo.owner_id).not.toEqual(0);
		});
		it('should not upload image to wall from url', async () => {
			await expect(vk.upload.wallPhoto({
				source: 'https://someurlhere.url/asdasd'
			})).rejects.not.toBeNull();
		});

		it('should upload image to wall from bytes', async () => {
			const response = await fetch('https://avatars2.githubusercontent.com/u/9392723?s=400&v=4');
			const photo = await vk.upload.wallPhoto({
				source: await response.buffer()
			});

			expect(photo).toBeInstanceOf(PhotoAttachment);
			expect(photo.id).toBeGreaterThan(0);
			expect(photo.owner_id).not.toEqual(0);
		});

		it('should upload image to wall from stream', async () => {
			const response = await fetch('https://avatars2.githubusercontent.com/u/9392723?s=400&v=4');
			const photo = await vk.upload.wallPhoto({
				source: response.body
			});

			expect(photo).toBeInstanceOf(PhotoAttachment);
			expect(photo.id).toBeGreaterThan(0);
			expect(photo.owner_id).not.toEqual(0);
		});

		it('should upload video from bytes', async () => {
			const response = await fetch('https://img-9gag-fun.9cache.com/photo/aR3NRm7_460svvp9.webm');
			const video = await vk.upload.video({
				source: response.body
			});

			expect(video).toBeInstanceOf(VideoAttachment);
			expect(video.id).toBeGreaterThan(0);
			expect(video.owner_id).not.toEqual(0);
		});
	});
});
