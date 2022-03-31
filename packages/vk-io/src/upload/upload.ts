// @ts-ignore
// eslint-disable-next-line import/extensions
// @ts-ignore
import { FormData, File } from 'formdata-node';
// @ts-ignore
import { FormDataEncoder } from 'form-data-encoder';
// @ts-ignore
import { AbortController } from 'abort-controller';
// @ts-ignore

// @ts-ignore
import { inspectable } from 'inspectable';
// @ts-ignore

// @ts-ignore
import { URL } from 'url';
// @ts-ignore
import { createReadStream } from 'fs';
// @ts-ignore
import { stat as fileStat } from 'fs/promises';
// @ts-ignore
import { globalAgent } from 'https';
// @ts-ignore
import { Readable } from 'stream';
// @ts-ignore

// @ts-ignore
import { API } from '../api';
// @ts-ignore
import { fetch } from '../utils/fetch';
// @ts-ignore
import { UploadError, UploadErrorCode } from '../errors';
// @ts-ignore
import { DefaultExtension, DefaultContentType } from '../utils/constants';
// @ts-ignore
import {
// @ts-ignore
	IUploadOptions,
// @ts-ignore
	IUploadParams,
// @ts-ignore
	IUploadSourceMedia,
// @ts-ignore
	IUploadConduct
// @ts-ignore
} from './types';
// @ts-ignore
import {
// @ts-ignore
	isStream,
// @ts-ignore

// @ts-ignore
	streamToBuffer,
// @ts-ignore
	normalizeSource,
// @ts-ignore
	pickExistingProperties
// @ts-ignore
} from './helpers';
// @ts-ignore

// @ts-ignore
import {
// @ts-ignore
	StoryAttachment,
// @ts-ignore
	PhotoAttachment,
// @ts-ignore
	AudioAttachment,
// @ts-ignore
	VideoAttachment,
// @ts-ignore
	DocumentAttachment,
// @ts-ignore
	GraffitiAttachment,
// @ts-ignore
	AudioMessageAttachment
// @ts-ignore
} from '../structures/attachments';
// @ts-ignore

// @ts-ignore
const {
// @ts-ignore
	MISSING_PARAMETERS,
// @ts-ignore
	NO_FILES_TO_UPLOAD,
// @ts-ignore
	EXCEEDED_MAX_FILES,
// @ts-ignore
	UNSUPPORTED_SOURCE_TYPE
// @ts-ignore
} = UploadErrorCode;
// @ts-ignore

// @ts-ignore
const isURL = /^https?:\/\//i;
// @ts-ignore

// @ts-ignore
const DocumentTypes: Record<string, typeof DocumentAttachment
// @ts-ignore
| typeof GraffitiAttachment
// @ts-ignore
| typeof AudioMessageAttachment> = {
// @ts-ignore
	doc: DocumentAttachment,
// @ts-ignore
	graffiti: GraffitiAttachment,
// @ts-ignore
	audio_message: AudioMessageAttachment
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
export class Upload {
// @ts-ignore
	private api: API;
// @ts-ignore

// @ts-ignore
	protected options: Required<Omit<IUploadOptions, 'api'>>;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	constructor({ api, ...options }: IUploadOptions) {
// @ts-ignore
		this.api = api;
// @ts-ignore

// @ts-ignore
		this.options = {
// @ts-ignore
			// 20 ms
// @ts-ignore
			agent: globalAgent,
// @ts-ignore
			uploadTimeout: 20_000,
// @ts-ignore

// @ts-ignore
			...options
// @ts-ignore
		};
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns custom tag
// @ts-ignore
	 */
// @ts-ignore
	get [Symbol.toStringTag](): string {
// @ts-ignore
		return this.constructor.name;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploading photos to an album
// @ts-ignore
	 */
// @ts-ignore
	async photoAlbum(
// @ts-ignore
		params: IUploadParams & {
// @ts-ignore
			album_id: number;
// @ts-ignore
			group_id?: number;
// @ts-ignore

// @ts-ignore
			caption?: string;
// @ts-ignore
			latitude?: number;
// @ts-ignore
			longitude?: number;
// @ts-ignore
		}
// @ts-ignore
	): Promise<PhotoAttachment[]> {
// @ts-ignore
		const photos = await this.conduct({
// @ts-ignore
			field: 'file',
// @ts-ignore
			params,
// @ts-ignore

// @ts-ignore
			getServer: this.api.photos.getUploadServer,
// @ts-ignore
			serverParams: ['album_id', 'group_id'],
// @ts-ignore

// @ts-ignore
			saveFiles: this.api.photos.save,
// @ts-ignore
			saveParams: ['album_id', 'group_id', 'latitude', 'longitude', 'caption'],
// @ts-ignore

// @ts-ignore
			maxFiles: 5,
// @ts-ignore
			attachmentType: 'photo'
// @ts-ignore
		}) as PhotoAttachment['payload'][];
// @ts-ignore

// @ts-ignore
		return photos.map(photo => (
// @ts-ignore
			new PhotoAttachment({
// @ts-ignore
				api: this.api,
// @ts-ignore
				payload: photo
// @ts-ignore
			})
// @ts-ignore
		));
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploading photos to the wall
// @ts-ignore
	 */
// @ts-ignore
	async wallPhoto(
// @ts-ignore
		params: IUploadParams & {
// @ts-ignore
			user_id?: number;
// @ts-ignore
			group_id?: number;
// @ts-ignore

// @ts-ignore
			caption?: string;
// @ts-ignore
			latitude?: number;
// @ts-ignore
			longitude?: number;
// @ts-ignore
		}
// @ts-ignore
	): Promise<PhotoAttachment> {
// @ts-ignore
		const [photo] = await this.conduct({
// @ts-ignore
			field: 'photo',
// @ts-ignore
			params,
// @ts-ignore

// @ts-ignore
			getServer: this.api.photos.getWallUploadServer,
// @ts-ignore
			serverParams: ['group_id'],
// @ts-ignore

// @ts-ignore
			saveFiles: this.api.photos.saveWallPhoto,
// @ts-ignore
			saveParams: ['user_id', 'group_id', 'latitude', 'longitude', 'caption'],
// @ts-ignore

// @ts-ignore
			maxFiles: 1,
// @ts-ignore
			attachmentType: 'photo'
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		return new PhotoAttachment({
// @ts-ignore
			api: this.api,
// @ts-ignore
			payload: photo
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploading the main photo of a user or community
// @ts-ignore
	 */
// @ts-ignore
	ownerPhoto(
// @ts-ignore
		params: IUploadParams & {
// @ts-ignore
			owner_id?: number;
// @ts-ignore
		}
// @ts-ignore
	): Promise<{
// @ts-ignore
			photo_hash: string;
// @ts-ignore
			photo_src: string;
// @ts-ignore
			photo_src_big: string;
// @ts-ignore
			photo_src_small: string;
// @ts-ignore
			saved: number;
// @ts-ignore
			post_id: number;
// @ts-ignore
		}> {
// @ts-ignore
		return this.conduct({
// @ts-ignore
			field: 'photo',
// @ts-ignore
			params,
// @ts-ignore

// @ts-ignore
			getServer: this.api.photos.getOwnerPhotoUploadServer,
// @ts-ignore
			serverParams: ['owner_id'],
// @ts-ignore

// @ts-ignore
			saveFiles: this.api.photos.saveOwnerPhoto,
// @ts-ignore

// @ts-ignore
			maxFiles: 1,
// @ts-ignore
			attachmentType: 'photo'
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		// {
// @ts-ignore
		//   photo_hash: 'c8d43da5e1281b7aed6bb8f0c4f3ad69',
// @ts-ignore
		//   photo_src: 'https://pp.userapi.com/c836429/v836429114/673f6/5VJB8GXtK88.jpg',
// @ts-ignore
		//   photo_src_big: 'https://pp.userapi.com/c836429/v836429114/673f7/7fGvrJ1wOx0.jpg',
// @ts-ignore
		//   photo_src_small: 'https://pp.userapi.com/c836429/v836429114/673f5/l5d1ASgyuxk.jpg',
// @ts-ignore
		//   saved: 1,
// @ts-ignore
		//   post_id: 3331
// @ts-ignore
		// }
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploading a photo to a private message
// @ts-ignore
	 */
// @ts-ignore
	async messagePhoto(
// @ts-ignore
		params: IUploadParams & {
// @ts-ignore
			peer_id?: number;
// @ts-ignore
		}
// @ts-ignore
	): Promise<PhotoAttachment> {
// @ts-ignore
		const [photo] = await this.conduct({
// @ts-ignore
			field: 'photo',
// @ts-ignore
			params,
// @ts-ignore

// @ts-ignore
			getServer: this.api.photos.getMessagesUploadServer,
// @ts-ignore
			serverParams: ['peer_id'],
// @ts-ignore

// @ts-ignore
			saveFiles: this.api.photos.saveMessagesPhoto,
// @ts-ignore

// @ts-ignore
			maxFiles: 1,
// @ts-ignore
			attachmentType: 'photo'
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		return new PhotoAttachment({
// @ts-ignore
			api: this.api,
// @ts-ignore
			payload: photo
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploading the main photo for a chat
// @ts-ignore
	 */
// @ts-ignore
	chatPhoto(
// @ts-ignore
		params: IUploadParams & {
// @ts-ignore
			chat_id: number;
// @ts-ignore

// @ts-ignore
			crop_x?: number;
// @ts-ignore
			crop_y?: number;
// @ts-ignore
			crop_width?: number;
// @ts-ignore
		}
// @ts-ignore
	): Promise<{
// @ts-ignore
			message_id: number;
// @ts-ignore
			chat: object;
// @ts-ignore
		}> {
// @ts-ignore
		return this.conduct({
// @ts-ignore
			field: 'file',
// @ts-ignore
			params,
// @ts-ignore

// @ts-ignore
			getServer: this.api.photos.getChatUploadServer,
// @ts-ignore
			serverParams: ['chat_id', 'crop_x', 'crop_y', 'crop_width'],
// @ts-ignore

// @ts-ignore
			saveFiles: file => (
// @ts-ignore
				this.api.messages.setChatPhoto({ file })
// @ts-ignore
			),
// @ts-ignore

// @ts-ignore
			maxFiles: 1,
// @ts-ignore
			attachmentType: 'photo'
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		// {
// @ts-ignore
		//   message_id: 3745390,
// @ts-ignore
		//   chat: {
// @ts-ignore
		//    id: 152,
// @ts-ignore
		//    type: 'chat',
// @ts-ignore
		//    title: '<Titile name>',
// @ts-ignore
		//    admin_id: 335447860,
// @ts-ignore
		//    users: [335447860,
// @ts-ignore
		//      140192020,
// @ts-ignore
		//      153711615,
// @ts-ignore
		//      314650825,
// @ts-ignore
		//      218747758,
// @ts-ignore
		//      155944103,
// @ts-ignore
		//      159737827,
// @ts-ignore
		//      64299368,
// @ts-ignore
		//      157534541,
// @ts-ignore
		//      153608064,
// @ts-ignore
		//      335540121,
// @ts-ignore
		//      349609849,
// @ts-ignore
		//      344184938,
// @ts-ignore
		//      341178526,
// @ts-ignore
		//      198210835,
// @ts-ignore
		//      135446999,
// @ts-ignore
		//      163850606,
// @ts-ignore
		//      123640861,
// @ts-ignore
		//      316216798,
// @ts-ignore
		//      359118107,
// @ts-ignore
		//      241235369,
// @ts-ignore
		//      160213445,
// @ts-ignore
		//      126624591,
// @ts-ignore
		//      390221395,
// @ts-ignore
		//      195624402,
// @ts-ignore
		//      94955334,
// @ts-ignore
		//      167302501,
// @ts-ignore
		//      17516523,
// @ts-ignore
		//      294583792,
// @ts-ignore
		//      294869767,
// @ts-ignore
		//      114281676,
// @ts-ignore
		//      137762280,
// @ts-ignore
		//      406076540,
// @ts-ignore
		//      410605840,
// @ts-ignore
		//      395646590,
// @ts-ignore
		//      421554042,
// @ts-ignore
		//      331599090,
// @ts-ignore
		//      342269712
// @ts-ignore
		//    ],
// @ts-ignore
		//    photo_50: 'https://pp.userapi.com/c837624/v837624114/5d495/gLgv-JrVmkk.jpg',
// @ts-ignore
		//    photo_100: 'https://pp.userapi.com/c837624/v837624114/5d494/VNp61I1yuCk.jpg',
// @ts-ignore
		//    photo_200: 'https://pp.userapi.com/c837624/v837624114/5d492/lAoc_fAai2Q.jpg'
// @ts-ignore
		//   }
// @ts-ignore
		// }
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploading a photo for a product
// @ts-ignore
	 */
// @ts-ignore
	async marketPhoto(
// @ts-ignore
		params: IUploadParams & {
// @ts-ignore
			group_id: number;
// @ts-ignore

// @ts-ignore
			main_photo?: number;
// @ts-ignore

// @ts-ignore
			crop_x?: number;
// @ts-ignore
			crop_y?: number;
// @ts-ignore
			crop_width?: number;
// @ts-ignore
		}
// @ts-ignore
	): Promise<PhotoAttachment> {
// @ts-ignore
		const [photo] = await this.conduct({
// @ts-ignore
			field: 'file',
// @ts-ignore
			params,
// @ts-ignore

// @ts-ignore
			getServer: this.api.photos.getMarketUploadServer,
// @ts-ignore
			serverParams: ['group_id', 'main_photo', 'crop_x', 'crop_y', 'crop_width'],
// @ts-ignore

// @ts-ignore
			saveFiles: this.api.photos.saveMarketPhoto,
// @ts-ignore
			saveParams: ['group_id'],
// @ts-ignore

// @ts-ignore
			maxFiles: 1,
// @ts-ignore
			attachmentType: 'photo'
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		return new PhotoAttachment({
// @ts-ignore
			api: this.api,
// @ts-ignore
			payload: photo
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploads a photo for the selection of goods
// @ts-ignore
	 */
// @ts-ignore
	async marketAlbumPhoto(
// @ts-ignore
		params: IUploadParams & {
// @ts-ignore
			group_id: number;
// @ts-ignore
		}
// @ts-ignore
	): Promise<PhotoAttachment> {
// @ts-ignore
		const [photo] = await this.conduct({
// @ts-ignore
			field: 'file',
// @ts-ignore
			params,
// @ts-ignore

// @ts-ignore
			getServer: this.api.photos.getMarketAlbumUploadServer,
// @ts-ignore
			serverParams: ['group_id'],
// @ts-ignore

// @ts-ignore
			saveFiles: this.api.photos.saveMarketAlbumPhoto,
// @ts-ignore
			saveParams: ['group_id'],
// @ts-ignore

// @ts-ignore
			maxFiles: 1,
// @ts-ignore
			attachmentType: 'photo'
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		return new PhotoAttachment({
// @ts-ignore
			api: this.api,
// @ts-ignore
			payload: photo
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploads audio
// @ts-ignore
	 */
// @ts-ignore
	async audio(
// @ts-ignore
		params: IUploadParams & {
// @ts-ignore
			title?: string;
// @ts-ignore
			artist?: string;
// @ts-ignore
		}
// @ts-ignore
	): Promise<AudioAttachment> {
// @ts-ignore
		const audio = await this.conduct({
// @ts-ignore
			field: 'file',
// @ts-ignore
			params,
// @ts-ignore

// @ts-ignore
			// @ts-expect-error
// @ts-ignore
			getServer: this.api.audio.getUploadServer,
// @ts-ignore

// @ts-ignore
			// @ts-expect-error
// @ts-ignore
			saveFiles: this.api.audio.save,
// @ts-ignore
			saveParams: ['title', 'artist'],
// @ts-ignore

// @ts-ignore
			maxFiles: 1,
// @ts-ignore
			attachmentType: 'audio'
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		return new AudioAttachment({
// @ts-ignore
			api: this.api,
// @ts-ignore
			payload: audio
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploads video
// @ts-ignore
	 */
// @ts-ignore
	async video(
// @ts-ignore
		params: IUploadParams & {
// @ts-ignore
			album_id?: number;
// @ts-ignore
			group_id?: number;
// @ts-ignore

// @ts-ignore
			link?: string;
// @ts-ignore
			name?: string;
// @ts-ignore
			description?: string;
// @ts-ignore
			is_private?: number;
// @ts-ignore
			wallpost?: number;
// @ts-ignore
			privacy_view?: string;
// @ts-ignore
			privacy_comment?: string;
// @ts-ignore
			no_comments?: number;
// @ts-ignore
			repeat?: number;
// @ts-ignore
			compression?: number;
// @ts-ignore
		}
// @ts-ignore
	): Promise<VideoAttachment> {
// @ts-ignore
		const save = await this.api.video.save(pickExistingProperties(params, [
// @ts-ignore
			'group_id',
// @ts-ignore
			'album_id',
// @ts-ignore
			'link',
// @ts-ignore
			'name',
// @ts-ignore
			'description',
// @ts-ignore
			'is_private',
// @ts-ignore
			'wallpost',
// @ts-ignore
			'privacy_view',
// @ts-ignore
			'privacy_comment',
// @ts-ignore
			'no_comments',
// @ts-ignore
			'repeat',
// @ts-ignore
			'compression'
// @ts-ignore
		]));
// @ts-ignore

// @ts-ignore
		save.id = save.video_id;
// @ts-ignore

// @ts-ignore
		if (params.link !== undefined) {
// @ts-ignore
			const response = await fetch(save.upload_url!, {
// @ts-ignore
				agent: this.options.agent
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			await response.json();
// @ts-ignore

// @ts-ignore
			return new VideoAttachment({
// @ts-ignore
				api: this.api,
// @ts-ignore
				payload: save as unknown as VideoAttachment['payload']
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const source = normalizeSource(params.source);
// @ts-ignore

// @ts-ignore
		const formData = await this.buildPayload({
// @ts-ignore
			maxFiles: 1,
// @ts-ignore
			field: 'video_file',
// @ts-ignore
			attachmentType: 'video',
// @ts-ignore
			values: source.values
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		const video = await this.upload(save.upload_url!, {
// @ts-ignore
			formData,
// @ts-ignore
			timeout: source.timeout!,
// @ts-ignore
			forceBuffer: true
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		return new VideoAttachment({
// @ts-ignore
			api: this.api,
// @ts-ignore
			payload: { ...save, ...video }
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploads document
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	async conductDocument(params: IUploadParams & { type?: string }, { attachmentType = 'doc' } = {}): Promise<any> {
// @ts-ignore
		const response = await this.conduct({
// @ts-ignore
			field: 'file',
// @ts-ignore
			params,
// @ts-ignore

// @ts-ignore
			getServer: this.api.docs.getUploadServer,
// @ts-ignore
			serverParams: ['type', 'group_id'],
// @ts-ignore

// @ts-ignore
			saveFiles: this.api.docs.save,
// @ts-ignore
			saveParams: ['title', 'tags'],
// @ts-ignore

// @ts-ignore
			maxFiles: 1,
// @ts-ignore
			attachmentType
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		const ConductAttachment = DocumentTypes[response.type] || DocumentTypes.doc;
// @ts-ignore

// @ts-ignore
		return new ConductAttachment({
// @ts-ignore
			api: this.api,
// @ts-ignore
			payload: response[response.type]
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploads document
// @ts-ignore
	 */
// @ts-ignore
	document(
// @ts-ignore
		params: IUploadParams & {
// @ts-ignore
			group_id?: number;
// @ts-ignore

// @ts-ignore
			title?: string;
// @ts-ignore
			tags?: string;
// @ts-ignore
		}
// @ts-ignore
	): Promise<DocumentAttachment> {
// @ts-ignore
		return this.conductDocument(params, {
// @ts-ignore
			attachmentType: 'doc'
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploads wall document
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	async conductWallDocument(params: IUploadParams & { type?: string }, { attachmentType = 'doc' } = {}): Promise<any> {
// @ts-ignore
		const response = await this.conduct({
// @ts-ignore
			field: 'file',
// @ts-ignore
			params,
// @ts-ignore

// @ts-ignore
			getServer: this.api.docs.getWallUploadServer,
// @ts-ignore
			serverParams: ['type', 'group_id'],
// @ts-ignore

// @ts-ignore
			saveFiles: this.api.docs.save,
// @ts-ignore
			saveParams: ['title', 'tags'],
// @ts-ignore

// @ts-ignore
			maxFiles: 1,
// @ts-ignore
			attachmentType
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		const ConductAttachment = DocumentTypes[response.type] || DocumentTypes.doc;
// @ts-ignore

// @ts-ignore
		return new ConductAttachment({
// @ts-ignore
			api: this.api,
// @ts-ignore
			payload: response[response.type]
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploads wall document
// @ts-ignore
	 */
// @ts-ignore
	wallDocument(
// @ts-ignore
		params: IUploadParams & {
// @ts-ignore
			group_id?: number;
// @ts-ignore
			// type?: string;
// @ts-ignore

// @ts-ignore
			title?: string;
// @ts-ignore
			tags?: string;
// @ts-ignore
		}
// @ts-ignore
	): Promise<DocumentAttachment> {
// @ts-ignore
		return this.conductWallDocument(params, {
// @ts-ignore
			attachmentType: 'doc'
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploads wall document
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	async conductMessageDocument(params: IUploadParams & { type?: string }, { attachmentType = 'doc' } = {}): Promise<any> {
// @ts-ignore
		const response = await this.conduct({
// @ts-ignore
			field: 'file',
// @ts-ignore
			params,
// @ts-ignore

// @ts-ignore
			getServer: this.api.docs.getMessagesUploadServer,
// @ts-ignore
			serverParams: ['type', 'peer_id'],
// @ts-ignore

// @ts-ignore
			saveFiles: this.api.docs.save,
// @ts-ignore
			saveParams: ['title', 'tags'],
// @ts-ignore

// @ts-ignore
			maxFiles: 1,
// @ts-ignore
			attachmentType
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		const ConductAttachment = DocumentTypes[response.type] || DocumentTypes.doc;
// @ts-ignore

// @ts-ignore
		return new ConductAttachment({
// @ts-ignore
			api: this.api,
// @ts-ignore
			payload: response[response.type]
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploads message document
// @ts-ignore
	 */
// @ts-ignore
	messageDocument(
// @ts-ignore
		params: IUploadParams & {
// @ts-ignore
			peer_id?: number;
// @ts-ignore

// @ts-ignore
			title?: string;
// @ts-ignore
			tags?: string;
// @ts-ignore
		}
// @ts-ignore
	): Promise<DocumentAttachment> {
// @ts-ignore
		return this.conductMessageDocument(
// @ts-ignore
			{
// @ts-ignore
				...params,
// @ts-ignore
				type: 'doc'
// @ts-ignore
			},
// @ts-ignore
			{
// @ts-ignore
				attachmentType: 'doc'
// @ts-ignore
			}
// @ts-ignore
		);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploads audio message
// @ts-ignore
	 */
// @ts-ignore
	audioMessage(
// @ts-ignore
		params: IUploadParams & {
// @ts-ignore
			peer_id?: number;
// @ts-ignore

// @ts-ignore
			title?: string;
// @ts-ignore
			tags?: string;
// @ts-ignore
		}
// @ts-ignore
	): Promise<AudioMessageAttachment> {
// @ts-ignore
		return this.conductMessageDocument(
// @ts-ignore
			{
// @ts-ignore
				...params,
// @ts-ignore
				type: 'audio_message'
// @ts-ignore
			},
// @ts-ignore
			{
// @ts-ignore
				attachmentType: 'audioMessage'
// @ts-ignore
			}
// @ts-ignore
		);
// @ts-ignore

// @ts-ignore
		// { type: 'audio_message',
// @ts-ignore
		// audio_message: {
// @ts-ignore
		//   id: 484017542,
// @ts-ignore
		//   owner_id: 195624402,
// @ts-ignore
		//   duration: 48,
// @ts-ignore
		//   waveform: [...],
// @ts-ignore
		//   link_ogg:
// @ts-ignore
		//   'https://psv4.userapi.com/c805324//u195624402/audiomsg/15734aa6bb.ogg',
// @ts-ignore
		//   link_mp3:
// @ts-ignore
		//   'https://psv4.userapi.com/c805324//u195624402/audiomsg/15734aa6bb.mp3',
// @ts-ignore
		//   access_key: '295cc90411e6222db0' } }
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploads graffiti in documents
// @ts-ignore
	 */
// @ts-ignore
	documentGraffiti(
// @ts-ignore
		params: IUploadParams & {
// @ts-ignore
			group_id?: number;
// @ts-ignore
		}
// @ts-ignore
	): Promise<GraffitiAttachment> {
// @ts-ignore
		return this.conductDocument(
// @ts-ignore
			{
// @ts-ignore
				...params,
// @ts-ignore
				type: 'graffiti'
// @ts-ignore
			},
// @ts-ignore
			{
// @ts-ignore
				attachmentType: 'graffiti'
// @ts-ignore
			}
// @ts-ignore
		);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploads graffiti in messages
// @ts-ignore
	 */
// @ts-ignore
	messageGraffiti(
// @ts-ignore
		params: IUploadParams & {
// @ts-ignore
			peer_id?: number;
// @ts-ignore
		}
// @ts-ignore
	): Promise<GraffitiAttachment> {
// @ts-ignore
		return this.conductMessageDocument(
// @ts-ignore
			{
// @ts-ignore
				...params,
// @ts-ignore
				type: 'graffiti'
// @ts-ignore
			},
// @ts-ignore
			{
// @ts-ignore
				attachmentType: 'graffiti'
// @ts-ignore
			}
// @ts-ignore
		);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploads community cover
// @ts-ignore
	 */
// @ts-ignore
	groupCover(
// @ts-ignore
		params: IUploadParams & {
// @ts-ignore
			group_id: number;
// @ts-ignore

// @ts-ignore
			crop_x?: number;
// @ts-ignore
			crop_y?: number;
// @ts-ignore
			crop_x2?: number;
// @ts-ignore
			crop_y2?: number;
// @ts-ignore
		}
// @ts-ignore
	): Promise<{
// @ts-ignore
			images: {
// @ts-ignore
				url: string;
// @ts-ignore
				width: number;
// @ts-ignore
				height: number;
// @ts-ignore
			}[];
// @ts-ignore
		}> {
// @ts-ignore
		return this.conduct({
// @ts-ignore
			field: 'photo',
// @ts-ignore
			params,
// @ts-ignore

// @ts-ignore
			getServer: this.api.photos.getOwnerCoverPhotoUploadServer,
// @ts-ignore
			serverParams: ['group_id', 'crop_x', 'crop_y', 'crop_x2', 'crop_y2'],
// @ts-ignore

// @ts-ignore
			saveFiles: this.api.photos.saveOwnerCoverPhoto,
// @ts-ignore

// @ts-ignore
			maxFiles: 1,
// @ts-ignore
			attachmentType: 'photo'
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		// {
// @ts-ignore
		//  images: [
// @ts-ignore
		//    {
// @ts-ignore
		//      url: 'https://cs7056.userapi.com/c639526/v639526192/46404/r-1Nhr-Dktc.jpg',
// @ts-ignore
		//      width: 200,
// @ts-ignore
		//      height: 50
// @ts-ignore
		//    },
// @ts-ignore
		//    {
// @ts-ignore
		//      url: 'https://cs7056.userapi.com/c639526/v639526192/46403/oDB9tAgtUrQ.jpg',
// @ts-ignore
		//      width: 400,
// @ts-ignore
		//      height: 101
// @ts-ignore
		//    },
// @ts-ignore
		//    {
// @ts-ignore
		//      url: 'https://cs7056.userapi.com/c639526/v639526192/46400/gLwCTmDEPXY.jpg',
// @ts-ignore
		//      width: 795,
// @ts-ignore
		//      height: 200
// @ts-ignore
		//    },
// @ts-ignore
		//    {
// @ts-ignore
		//      url: 'https://cs7056.userapi.com/c639526/v639526192/46402/w2ucyq8zwF8.jpg',
// @ts-ignore
		//      width: 1080,
// @ts-ignore
		//      height: 272
// @ts-ignore
		//    },
// @ts-ignore
		//    {
// @ts-ignore
		//      url: 'https://cs7056.userapi.com/c639526/v639526192/46401/YTmN89yMaU0.jpg',
// @ts-ignore
		//      width: 1590,
// @ts-ignore
		//      height: 400
// @ts-ignore
		//    }
// @ts-ignore
		//  ]
// @ts-ignore
		// }
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploads photo stories
// @ts-ignore
	 */
// @ts-ignore
	async storiesPhoto(
// @ts-ignore
		params: IUploadParams & {
// @ts-ignore
			group_id?: number;
// @ts-ignore
			add_to_news?: number;
// @ts-ignore
			user_ids?: string[] | string;
// @ts-ignore
			reply_to_story?: string;
// @ts-ignore
			link_text: string;
// @ts-ignore
			link_url: string;
// @ts-ignore
		}
// @ts-ignore
	): Promise<StoryAttachment> {
// @ts-ignore
		const { items: [story] } = await this.conduct({
// @ts-ignore
			field: 'file',
// @ts-ignore
			params,
// @ts-ignore

// @ts-ignore
			getServer: this.api.stories.getPhotoUploadServer,
// @ts-ignore
			serverParams: [
// @ts-ignore
				'add_to_news',
// @ts-ignore
				'user_ids',
// @ts-ignore
				'reply_to_story',
// @ts-ignore
				'link_text',
// @ts-ignore
				'link_url',
// @ts-ignore
				'group_id',
// @ts-ignore
				'attach_access_key'
// @ts-ignore
			],
// @ts-ignore

// @ts-ignore
			saveFiles: file => (
// @ts-ignore
				this.api.stories.save({
// @ts-ignore
					upload_results: file.upload_result
// @ts-ignore
				})
// @ts-ignore
			),
// @ts-ignore

// @ts-ignore
			maxFiles: 1,
// @ts-ignore
			attachmentType: 'photo'
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		return new StoryAttachment({
// @ts-ignore
			api: this.api,
// @ts-ignore
			payload: story
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploads video stories
// @ts-ignore
	 */
// @ts-ignore
	async storiesVideo(
// @ts-ignore
		params: IUploadParams & {
// @ts-ignore
			group_id?: number;
// @ts-ignore
			add_to_news?: number;
// @ts-ignore
			user_ids?: string[] | string;
// @ts-ignore
			reply_to_story?: string;
// @ts-ignore
			link_text: string;
// @ts-ignore
			link_url: string;
// @ts-ignore
		}
// @ts-ignore
	): Promise<StoryAttachment> {
// @ts-ignore
		const { items: [story] } = await this.conduct({
// @ts-ignore
			field: 'video_file',
// @ts-ignore
			params,
// @ts-ignore

// @ts-ignore
			getServer: this.api.stories.getVideoUploadServer,
// @ts-ignore
			serverParams: [
// @ts-ignore
				'add_to_news',
// @ts-ignore
				'user_ids',
// @ts-ignore
				'reply_to_story',
// @ts-ignore
				'link_text',
// @ts-ignore
				'link_url',
// @ts-ignore
				'group_id'
// @ts-ignore
			],
// @ts-ignore

// @ts-ignore
			saveFiles: file => (
// @ts-ignore
				this.api.stories.save({
// @ts-ignore
					upload_results: file.upload_result
// @ts-ignore
				})
// @ts-ignore
			),
// @ts-ignore

// @ts-ignore
			maxFiles: 1,
// @ts-ignore
			attachmentType: 'video'
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		return new StoryAttachment({
// @ts-ignore
			api: this.api,
// @ts-ignore
			payload: story
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Uploads poll photo
// @ts-ignore
	 */
// @ts-ignore
	pollPhoto(
// @ts-ignore
		params: IUploadParams & {
// @ts-ignore
			owner_id?: number;
// @ts-ignore
		}
// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	): Promise<Record<string, any>> {
// @ts-ignore
		return this.conduct({
// @ts-ignore
			field: 'file',
// @ts-ignore
			params,
// @ts-ignore

// @ts-ignore
			getServer: this.api.polls.getPhotoUploadServer,
// @ts-ignore
			serverParams: ['owner_id'],
// @ts-ignore

// @ts-ignore
			saveFiles: this.api.polls.savePhoto,
// @ts-ignore

// @ts-ignore
			maxFiles: 1,
// @ts-ignore
			attachmentType: 'photo'
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Behavior for the upload method
// @ts-ignore
	 */
// @ts-ignore
	async conduct({
// @ts-ignore
		field,
// @ts-ignore
		params,
// @ts-ignore

// @ts-ignore
		getServer,
// @ts-ignore
		serverParams = [],
// @ts-ignore

// @ts-ignore
		saveFiles,
// @ts-ignore
		saveParams = [],
// @ts-ignore

// @ts-ignore
		maxFiles = 1,
// @ts-ignore
		attachmentType
// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	}: IUploadConduct): Promise<any> {
// @ts-ignore
		if (!params || !params.source) {
// @ts-ignore
			throw new UploadError({
// @ts-ignore
				message: 'Missing upload params',
// @ts-ignore
				code: MISSING_PARAMETERS
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const source = normalizeSource(params.source);
// @ts-ignore

// @ts-ignore
		if (source.uploadUrl !== undefined) {
// @ts-ignore
			// eslint-disable-next-line no-param-reassign
// @ts-ignore
			getServer = (): Promise<{ upload_url: string }> => Promise.resolve({
// @ts-ignore
				upload_url: source.uploadUrl!
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const { length: valuesLength } = source.values;
// @ts-ignore

// @ts-ignore
		if (valuesLength === 0) {
// @ts-ignore
			throw new UploadError({
// @ts-ignore
				message: 'No files to upload',
// @ts-ignore
				code: NO_FILES_TO_UPLOAD
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (valuesLength > maxFiles) {
// @ts-ignore
			throw new UploadError({
// @ts-ignore
				message: 'The number of files uploaded has exceeded',
// @ts-ignore
				code: EXCEEDED_MAX_FILES
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const [{ upload_url: url }, formData] = await Promise.all([
// @ts-ignore
			getServer(pickExistingProperties(params, serverParams)),
// @ts-ignore
			this.buildPayload({
// @ts-ignore
				field,
// @ts-ignore
				values: source.values,
// @ts-ignore
				maxFiles,
// @ts-ignore
				attachmentType
// @ts-ignore
			})
// @ts-ignore
		]);
// @ts-ignore

// @ts-ignore
		const uploaded = await this.upload(url, {
// @ts-ignore
			formData,
// @ts-ignore
			timeout: source.timeout!
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		if (typeof uploaded !== 'object') {
// @ts-ignore
			const response = await saveFiles(uploaded);
// @ts-ignore

// @ts-ignore
			return response;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const response = await saveFiles({
// @ts-ignore
			...pickExistingProperties(params, saveParams),
// @ts-ignore
			...uploaded
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		return response;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Building form data
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line class-methods-use-this
// @ts-ignore
	async buildPayload({
// @ts-ignore
		field,
// @ts-ignore
		values,
// @ts-ignore
		maxFiles,
// @ts-ignore
		attachmentType
// @ts-ignore
	}: {
// @ts-ignore
		field: string;
// @ts-ignore
		values: IUploadSourceMedia[];
// @ts-ignore
		maxFiles: number;
// @ts-ignore
		attachmentType?: string;
// @ts-ignore
	}): Promise<FormData> {
// @ts-ignore
		const formData = new FormData();
// @ts-ignore

// @ts-ignore
		const isMultipart = maxFiles > 1;
// @ts-ignore

// @ts-ignore
		const tasks = values.map(async (media, i) => {
// @ts-ignore
			let { value, filename, contentLength = 0 } = media;
// @ts-ignore

// @ts-ignore
			if (typeof value === 'string') {
// @ts-ignore
				if (isURL.test(value)) {
// @ts-ignore
					const response = await fetch(value);
// @ts-ignore

// @ts-ignore
					// @ts-expect-error
// @ts-ignore
					value = response.body;
// @ts-ignore

// @ts-ignore
					const length = response.headers.get('content-length');
// @ts-ignore

// @ts-ignore
					if (length !== null) {
// @ts-ignore
						contentLength = Number(length);
// @ts-ignore
					}
// @ts-ignore
				} else {
// @ts-ignore
					const stats = await fileStat(value);
// @ts-ignore

// @ts-ignore
					contentLength = stats.size;
// @ts-ignore

// @ts-ignore
					value = createReadStream(value);
// @ts-ignore
				}
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			if (filename === undefined) {
// @ts-ignore
				filename = `file${i}.${DefaultExtension[attachmentType as keyof typeof DefaultExtension] || 'dat'}`;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			const isBuffer = Buffer.isBuffer(value);
// @ts-ignore

// @ts-ignore
			if (isStream(value) || isBuffer) {
// @ts-ignore
				const name = isMultipart
// @ts-ignore
					? field + (i + 1)
// @ts-ignore
					: field;
// @ts-ignore

// @ts-ignore
				const { contentType } = media;
// @ts-ignore

// @ts-ignore
				const fileContentType = contentType
// @ts-ignore
					|| DefaultContentType[attachmentType as keyof typeof DefaultContentType];
// @ts-ignore

// @ts-ignore
				const file = isBuffer
// @ts-ignore
					? new File([value as Buffer], filename, {
// @ts-ignore
						type: fileContentType
// @ts-ignore
					})
// @ts-ignore
					// Workground for NodeJS streams: https://github.com/octet-stream/form-data/issues/32
// @ts-ignore
					: {
// @ts-ignore
						name: filename,
// @ts-ignore
						size: contentLength,
// @ts-ignore
						type: fileContentType,
// @ts-ignore
						stream: () => (
// @ts-ignore
							value
// @ts-ignore
						),
// @ts-ignore
						[Symbol.toStringTag]: 'File'
// @ts-ignore
					};
// @ts-ignore

// @ts-ignore
				formData.append(name, file);
// @ts-ignore

// @ts-ignore
				return;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			throw new UploadError({
// @ts-ignore
				message: 'Unsupported source type',
// @ts-ignore
				code: UNSUPPORTED_SOURCE_TYPE
// @ts-ignore
			});
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		await Promise.all(tasks);
// @ts-ignore

// @ts-ignore
		return formData;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Upload form data
// @ts-ignore
	 */
// @ts-ignore
	async upload(url: URL | string, { formData, timeout, forceBuffer = false }: {
// @ts-ignore
		formData: FormData;
// @ts-ignore
		timeout: number;
// @ts-ignore
		forceBuffer?: boolean;
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	}): Promise<any> {
// @ts-ignore
		const { agent, uploadTimeout } = this.options;
// @ts-ignore

// @ts-ignore
		const encoder = new FormDataEncoder(formData);
// @ts-ignore

// @ts-ignore
		const rawBody = Readable.from(encoder.encode());
// @ts-ignore

// @ts-ignore
		const controller = new AbortController();
// @ts-ignore

// @ts-ignore
		const interval = setTimeout(() => controller.abort(), timeout || uploadTimeout);
// @ts-ignore

// @ts-ignore
		const headers: Record<string, string> = {
// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/naming-convention
// @ts-ignore
			Connection: 'keep-alive',
// @ts-ignore

// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/naming-convention
// @ts-ignore
			'Content-Type': encoder.headers['Content-Type']
// @ts-ignore
		};
// @ts-ignore
		const body = forceBuffer
// @ts-ignore
			? await streamToBuffer(rawBody)
// @ts-ignore
			: rawBody;
// @ts-ignore

// @ts-ignore
		if (forceBuffer) {
// @ts-ignore
			headers['Content-Length'] = String((body as Buffer).length);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		try {
// @ts-ignore
			const response = await fetch(url, {
// @ts-ignore
				agent,
// @ts-ignore
				compress: false,
// @ts-ignore
				method: 'POST',
// @ts-ignore
				signal: controller.signal,
// @ts-ignore
				headers,
// @ts-ignore
				body
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			if (!response.ok) {
// @ts-ignore
				throw new Error(response.statusText);
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
			const result = await response.json() as any;
// @ts-ignore

// @ts-ignore
			return result.response !== undefined
// @ts-ignore
				? result.response
// @ts-ignore
				: result;
// @ts-ignore
		} finally {
// @ts-ignore
			clearTimeout(interval);
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
inspectable(Upload);
