import {
	Attachment,

	WallAttachment,
	PhotoAttachment,
	AudioAttachment,
	VideoAttachment,
	MarketAttachment,
	DocumentAttachment,
	MarketAlbumAttachment
} from '..';

describe('Attachments', () => {
	it('the main class must be equivalent to a string', () => {
		const attachment = new Attachment('photo', 1234, 5678);

		expect(String(attachment)).toBe('photo1234_5678');
	});

	it('the main class must be equivalent to a string with access_key', () => {
		const attachment = new Attachment('photo', 1234, 5678, 'ACCESS_KEY');

		expect(String(attachment)).toBe('photo1234_5678_ACCESS_KEY');
	});

	describe('the #fromString() should be correct working', () => {
		it('should be throw an exception if wrong', () => {
			expect(() => Attachment.fromString('ascbas_baasd')).toThrow();
			expect(() => Attachment.fromString('12345/@%$%')).toThrow();
			expect(() => Attachment.fromString('Incorrect')).toThrow();
			expect(() => Attachment.fromString('1234_')).toThrow();
		});

		it('should be correct parse', () => {
			expect(Attachment.fromString('photo1234_5678')).toMatchObject({
				type: 'photo',
				ownerId: 1234,
				id: 5678,
				accessKey: null
			});

			expect(Attachment.fromString('photo1234_5678_ACCESS_KEY')).toMatchObject({
				type: 'photo',
				ownerId: 1234,
				id: 5678,
				accessKey: 'ACCESS_KEY'
			});
		});
	});

	describe('the #equals() should be correct working', () => {
		it('should be throw an exception if wrong', () => {
			const attachment = new Attachment('photo', 1234, 5678);

			expect(() => attachment.equals('ascbas_baasd')).toThrow();
			expect(() => attachment.equals('inccorect')).toThrow();
			expect(() => attachment.equals('1234_')).toThrow();
		});

		it('should be return false', () => {
			const attachment = new Attachment('photo', 1234, 5678);

			expect(attachment.equals('photo1234_1234')).toBe(false);
			expect(attachment.equals(new Attachment('photo', 1234, 1234))).toBe(false);
			expect(attachment.equals(new Attachment('photo', 1234, 1234, 'ACCESS_KEY'))).toBe(false);
		});

		it('should be return true', () => {
			const attachment = new Attachment('photo', 1234, 5678);

			expect(attachment.equals('photo1234_5678')).toBe(true);
			expect(attachment.equals(new Attachment('photo', 1234, 5678))).toBe(true);
			expect(attachment.equals(new Attachment('photo', 1234, 5678, 'ACCESS_KEY'))).toBe(true);
		});
	});

	describe('should equivalent to attaching to a string', () => {
		it('wall', () => {
			const attachment = new WallAttachment({
				id: 4567,
				owner_id: 1234
			});

			expect(String(attachment)).toBe('wall1234_4567');
		});

		it('photo', () => {
			const attachment = new PhotoAttachment({
				id: 4567,
				owner_id: 1234
			});

			expect(String(attachment)).toBe('photo1234_4567');
		});

		it('audio', () => {
			const attachment = new AudioAttachment({
				id: 4567,
				owner_id: 1234
			});

			expect(String(attachment)).toBe('audio1234_4567');
		});

		it('video', () => {
			const attachment = new VideoAttachment({
				id: 4567,
				owner_id: 1234
			});

			expect(String(attachment)).toBe('video1234_4567');
		});

		it('market', () => {
			const attachment = new MarketAttachment({
				id: 4567,
				owner_id: 1234
			});

			expect(String(attachment)).toBe('market1234_4567');
		});

		it('document', () => {
			const attachment = new DocumentAttachment({
				id: 4567,
				owner_id: 1234
			});

			expect(String(attachment)).toBe('doc1234_4567');
		});

		it('market album', () => {
			const attachment = new MarketAlbumAttachment({
				id: 4567,
				owner_id: 1234
			});

			expect(String(attachment)).toBe('market_album1234_4567');
		});
	});
});
