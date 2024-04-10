import { describe, it } from 'node:test';
import { strictEqual, throws } from 'node:assert';

import {
    VK,
    Attachment,

    WallAttachment,
    PhotoAttachment,
    AudioAttachment,
    StoryAttachment,
    VideoAttachment,
    MarketAttachment,
    DocumentAttachment,
    MarketAlbumAttachment
} from '..';

const vk = new VK({
    token: process.env.TOKEN!
});

describe('Attachments', (): void => {
    it('the main class must be equivalent to a string', (): void => {
        const attachment = new Attachment({
            api: vk.api,
            type: 'photo',
            payload: {
                id: 5678,
                owner_id: 1234
            }
        });

        strictEqual(String(attachment), 'photo1234_5678');
    });

    it('the main class must be equivalent to a string with access_key', (): void => {
        const attachment = new Attachment({
            api: vk.api,
            type: 'photo',
            payload: {
                id: 5678,
                owner_id: 1234,
                access_key: 'ACCESS_KEY'
            }
        });

        strictEqual(String(attachment), 'photo1234_5678_ACCESS_KEY');
    });

    describe('the #fromString() should be correct working', (): void => {
        it('should be throw an exception if wrong', (): void => {
            throws((): Attachment => Attachment.fromString('ascbas_baasd', vk.api));
            throws((): Attachment => Attachment.fromString('12345/@%$%', vk.api));
            throws((): Attachment => Attachment.fromString('Incorrect', vk.api));
            throws((): Attachment => Attachment.fromString('1234_', vk.api));
        });

        it('should be correct parse', (): void => {
            const photo1 = Attachment.fromString('photo1234_5678', vk.api);

            strictEqual(photo1.type,  'photo');
            strictEqual(photo1.ownerId,  1234);
            strictEqual(photo1.id,  5678);
            strictEqual(photo1.accessKey,  undefined);

            const photo2 = Attachment.fromString('photo1234_5678_ACCESS_KEY', vk.api);

            strictEqual(photo2.type,  'photo');
            strictEqual(photo2.ownerId,  1234);
            strictEqual(photo2.id,  5678);
            strictEqual(photo2.accessKey,  'ACCESS_KEY');
        });
    });

    describe('the #equals() should be correct working', (): void => {
        it('should be throw an exception if wrong', (): void => {
            const attachment = new Attachment({
                api: vk.api,
                type: 'photo',
                payload: {
                    id: 5678,
                    owner_id: 1234
                }
            });

            throws((): boolean => attachment.equals('ascbas_baasd'));
            throws((): boolean => attachment.equals('inccorect'));
            throws((): boolean => attachment.equals('1234_'));
        });

        it('should be return false', (): void => {
            const attachment = new Attachment({
                api: vk.api,
                type: 'photo',
                payload: {
                    id: 5678,
                    owner_id: 1234
                }
            });

            strictEqual(attachment.equals('photo1234_1234'), false);

            strictEqual(attachment.equals(
                new Attachment({
                    api: vk.api,
                    type: 'photo',
                    payload: {
                        id: 1234,
                        owner_id: 1234
                    }
                })
            ), false);

            strictEqual(attachment.equals(
                new Attachment({
                    api: vk.api,
                    type: 'photo',
                    payload: {
                        id: 1234,
                        owner_id: 1234,
                        access_key: 'ACCESS_KEY'
                    }
                })
            ), false);
        });

        it('should be return true', (): void => {
            const attachment = new Attachment({
                api: vk.api,
                type: 'photo',
                payload: {
                    id: 5678,
                    owner_id: 1234
                }
            });

            strictEqual(attachment.equals('photo1234_5678'), true);

            strictEqual(attachment.equals(
                new Attachment({
                    api: vk.api,
                    type: 'photo',
                    payload: {
                        id: 5678,
                        owner_id: 1234
                    }
                })
            ), true);

            strictEqual(attachment.equals(
                new Attachment({
                    api: vk.api,
                    type: 'photo',
                    payload: {
                        id: 5678,
                        owner_id: 1234,
                        access_key: 'ACCESS_KEY'
                    }
                })
            ), true);
        });
    });

    describe('should equivalent to attaching to a string', (): void => {
        it('wall', (): void => {
            const attachment = new WallAttachment({
                api: vk.api,
                payload: {
                    id: 4567,
                    owner_id: 1234
                }
            });

            strictEqual(String(attachment), 'wall1234_4567');
        });

        it('photo', (): void => {
            const attachment = new PhotoAttachment({
                api: vk.api,
                payload: {
                    id: 4567,
                    owner_id: 1234
                }
            });

            strictEqual(String(attachment), 'photo1234_4567');
        });

        it('audio', (): void => {
            const attachment = new AudioAttachment({
                api: vk.api,
                payload: {
                    id: 4567,
                    owner_id: 1234
                }
            });

            strictEqual(String(attachment), 'audio1234_4567');
        });

        it('story', (): void => {
            const attachment = new StoryAttachment({
                api: vk.api,
                payload: {
                    id: 4567,
                    owner_id: 1234
                }
            });

            strictEqual(String(attachment), 'story1234_4567');
        });

        it('video', (): void => {
            const attachment = new VideoAttachment({
                api: vk.api,
                payload: {
                    id: 4567,
                    owner_id: 1234
                }
            });

            strictEqual(String(attachment), 'video1234_4567');
        });

        it('market', (): void => {
            const attachment = new MarketAttachment({
                api: vk.api,
                payload: {
                    id: 4567,
                    owner_id: 1234
                }
            });

            strictEqual(String(attachment), 'market1234_4567');
        });

        it('document', (): void => {
            const attachment = new DocumentAttachment({
                api: vk.api,
                payload: {
                    id: 4567,
                    owner_id: 1234
                }
            });

            strictEqual(String(attachment), 'doc1234_4567');
        });

        it('market album', (): void => {
            const attachment = new MarketAlbumAttachment({
                api: vk.api,
                payload: {
                    id: 4567,
                    owner_id: 1234
                }
            });

            strictEqual(String(attachment), 'market_album1234_4567');
        });
    });
});
