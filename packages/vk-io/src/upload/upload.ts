import fetch from 'node-fetch';
import FormData from 'form-data';
import { AbortController } from 'abort-controller';

import { inspectable } from 'inspectable';

import { URL } from 'url';
import { promisify } from 'util';
import { createReadStream } from 'fs';
import { globalAgent } from 'https';

import { API } from '../api';
import { UploadError, UploadErrorCode } from '../errors';
import { DefaultExtension, DefaultContentType } from '../utils/constants';
import {
	IUploadOptions,
	IUploadParams,
	IUploadSourceMedia,
	IUploadConduct
} from './types';
import {
	isStream,

	normalizeSource,
	pickExistingProperties,
	streamToBuffer
} from './helpers';

import {
	StoryAttachment,
	PhotoAttachment,
	AudioAttachment,
	VideoAttachment,
	DocumentAttachment,
	GraffitiAttachment,
	AudioMessageAttachment
} from '../structures/attachments';

const {
	MISSING_PARAMETERS,
	NO_FILES_TO_UPLOAD,
	EXCEEDED_MAX_FILES,
	UNSUPPORTED_SOURCE_TYPE
} = UploadErrorCode;

const isURL = /^https?:\/\//i;

const DocumentTypes: Record<string, typeof DocumentAttachment
| typeof GraffitiAttachment
| typeof AudioMessageAttachment> = {
	doc: DocumentAttachment,
	graffiti: GraffitiAttachment,
	audio_message: AudioMessageAttachment
};

export class Upload {
	private api: API;

	protected options: Required<Omit<IUploadOptions, 'api'>>;

	/**
	 * Constructor
	 */
	constructor({ api, ...options }: IUploadOptions) {
		this.api = api;

		this.options = {
			// 20 ms
			agent: globalAgent,
			uploadTimeout: 20_000,

			...options
		};
	}

	/**
	 * Returns custom tag
	 */
	get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Uploading photos to an album
	 */
	async photoAlbum(
		params: IUploadParams & {
			album_id: number;
			group_id?: number;

			caption?: string;
			latitude?: number;
			longitude?: number;
		}
	): Promise<PhotoAttachment[]> {
		const photos = await this.conduct({
			field: 'file',
			params,

			getServer: this.api.photos.getUploadServer,
			serverParams: ['album_id', 'group_id'],

			saveFiles: this.api.photos.save,
			saveParams: ['album_id', 'group_id', 'latitude', 'longitude', 'caption'],

			maxFiles: 5,
			attachmentType: 'photo'
		}) as PhotoAttachment['payload'][];

		return photos.map(photo => (
			new PhotoAttachment({
				api: this.api,
				payload: photo
			})
		));
	}

	/**
	 * Uploading photos to the wall
	 */
	async wallPhoto(
		params: IUploadParams & {
			user_id?: number;
			group_id?: number;

			caption?: string;
			latitude?: number;
			longitude?: number;
		}
	): Promise<PhotoAttachment> {
		const [photo] = await this.conduct({
			field: 'photo',
			params,

			getServer: this.api.photos.getWallUploadServer,
			serverParams: ['group_id'],

			saveFiles: this.api.photos.saveWallPhoto,
			saveParams: ['user_id', 'group_id', 'latitude', 'longitude', 'caption'],

			maxFiles: 1,
			attachmentType: 'photo'
		});

		return new PhotoAttachment({
			api: this.api,
			payload: photo
		});
	}

	/**
	 * Uploading the main photo of a user or community
	 */
	ownerPhoto(
		params: IUploadParams & {
			owner_id?: number;
		}
	): Promise<{
			photo_hash: string;
			photo_src: string;
			photo_src_big: string;
			photo_src_small: string;
			saved: number;
			post_id: number;
		}> {
		return this.conduct({
			field: 'photo',
			params,

			getServer: this.api.photos.getOwnerPhotoUploadServer,
			serverParams: ['owner_id'],

			saveFiles: this.api.photos.saveOwnerPhoto,

			maxFiles: 1,
			attachmentType: 'photo'
		});

		// {
		//   photo_hash: 'c8d43da5e1281b7aed6bb8f0c4f3ad69',
		//   photo_src: 'https://pp.userapi.com/c836429/v836429114/673f6/5VJB8GXtK88.jpg',
		//   photo_src_big: 'https://pp.userapi.com/c836429/v836429114/673f7/7fGvrJ1wOx0.jpg',
		//   photo_src_small: 'https://pp.userapi.com/c836429/v836429114/673f5/l5d1ASgyuxk.jpg',
		//   saved: 1,
		//   post_id: 3331
		// }
	}

	/**
	 * Uploading a photo to a private message
	 */
	async messagePhoto(
		params: IUploadParams & {
			peer_id?: number;
		}
	): Promise<PhotoAttachment> {
		const [photo] = await this.conduct({
			field: 'photo',
			params,

			getServer: this.api.photos.getMessagesUploadServer,
			serverParams: ['peer_id'],

			saveFiles: this.api.photos.saveMessagesPhoto,

			maxFiles: 1,
			attachmentType: 'photo'
		});

		return new PhotoAttachment({
			api: this.api,
			payload: photo
		});
	}

	/**
	 * Uploading the main photo for a chat
	 */
	chatPhoto(
		params: IUploadParams & {
			chat_id: number;

			crop_x?: number;
			crop_y?: number;
			crop_width?: number;
		}
	): Promise<{
			message_id: number;
			chat: object;
		}> {
		return this.conduct({
			field: 'file',
			params,

			getServer: this.api.photos.getChatUploadServer,
			serverParams: ['chat_id', 'crop_x', 'crop_y', 'crop_width'],

			saveFiles: file => (
				this.api.messages.setChatPhoto({ file })
			),

			maxFiles: 1,
			attachmentType: 'photo'
		});

		// {
		//   message_id: 3745390,
		//   chat: {
		//    id: 152,
		//    type: 'chat',
		//    title: '<Titile name>',
		//    admin_id: 335447860,
		//    users: [335447860,
		//      140192020,
		//      153711615,
		//      314650825,
		//      218747758,
		//      155944103,
		//      159737827,
		//      64299368,
		//      157534541,
		//      153608064,
		//      335540121,
		//      349609849,
		//      344184938,
		//      341178526,
		//      198210835,
		//      135446999,
		//      163850606,
		//      123640861,
		//      316216798,
		//      359118107,
		//      241235369,
		//      160213445,
		//      126624591,
		//      390221395,
		//      195624402,
		//      94955334,
		//      167302501,
		//      17516523,
		//      294583792,
		//      294869767,
		//      114281676,
		//      137762280,
		//      406076540,
		//      410605840,
		//      395646590,
		//      421554042,
		//      331599090,
		//      342269712
		//    ],
		//    photo_50: 'https://pp.userapi.com/c837624/v837624114/5d495/gLgv-JrVmkk.jpg',
		//    photo_100: 'https://pp.userapi.com/c837624/v837624114/5d494/VNp61I1yuCk.jpg',
		//    photo_200: 'https://pp.userapi.com/c837624/v837624114/5d492/lAoc_fAai2Q.jpg'
		//   }
		// }
	}

	/**
	 * Uploading a photo for a product
	 */
	async marketPhoto(
		params: IUploadParams & {
			group_id: number;

			main_photo?: number;

			crop_x?: number;
			crop_y?: number;
			crop_width?: number;
		}
	): Promise<PhotoAttachment> {
		const [photo] = await this.conduct({
			field: 'file',
			params,

			getServer: this.api.photos.getMarketUploadServer,
			serverParams: ['group_id', 'main_photo', 'crop_x', 'crop_y', 'crop_width'],

			saveFiles: this.api.photos.saveMarketPhoto,
			saveParams: ['group_id'],

			maxFiles: 1,
			attachmentType: 'photo'
		});

		return new PhotoAttachment({
			api: this.api,
			payload: photo
		});
	}

	/**
	 * Uploads a photo for the selection of goods
	 */
	async marketAlbumPhoto(
		params: IUploadParams & {
			group_id: number;
		}
	): Promise<PhotoAttachment> {
		const [photo] = await this.conduct({
			field: 'file',
			params,

			getServer: this.api.photos.getMarketAlbumUploadServer,
			serverParams: ['group_id'],

			saveFiles: this.api.photos.saveMarketAlbumPhoto,
			saveParams: ['group_id'],

			maxFiles: 1,
			attachmentType: 'photo'
		});

		return new PhotoAttachment({
			api: this.api,
			payload: photo
		});
	}

	/**
	 * Uploads audio
	 */
	async audio(
		params: IUploadParams & {
			title?: string;
			artist?: string;
		}
	): Promise<AudioAttachment> {
		const audio = await this.conduct({
			field: 'file',
			params,

			// @ts-expect-error
			getServer: this.api.audio.getUploadServer,

			// @ts-expect-error
			saveFiles: this.api.audio.save,
			saveParams: ['title', 'artist'],

			maxFiles: 1,
			attachmentType: 'audio'
		});

		return new AudioAttachment({
			api: this.api,
			payload: audio
		});
	}

	/**
	 * Uploads video
	 */
	async video(
		params: IUploadParams & {
			album_id?: number;
			group_id?: number;

			link?: string;
			name?: string;
			description?: string;
			is_private?: number;
			wallpost?: number;
			privacy_view?: string;
			privacy_comment?: string;
			no_comments?: number;
			repeat?: number;
			compression?: number;
		}
	): Promise<VideoAttachment> {
		const save = await this.api.video.save(pickExistingProperties(params, [
			'group_id',
			'album_id',
			'link',
			'name',
			'description',
			'is_private',
			'wallpost',
			'privacy_view',
			'privacy_comment',
			'no_comments',
			'repeat',
			'compression'
		]));

		save.id = save.video_id;

		if (params.link !== undefined) {
			const response = await fetch(save.upload_url!, {
				agent: this.options.agent
			});

			await response.json();

			return new VideoAttachment({
				api: this.api,
				payload: save as VideoAttachment['payload']
			});
		}

		const source = normalizeSource(params.source);

		const formData = await this.buildPayload({
			maxFiles: 1,
			field: 'video_file',
			attachmentType: 'video',
			values: source.values
		});

		const video = await this.upload(save.upload_url!, {
			formData,
			timeout: source.timeout!
		});

		return new VideoAttachment({
			api: this.api,
			payload: { ...save, ...video }
		});
	}

	/**
	 * Uploads document
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async conductDocument(params: IUploadParams & { type?: string }, { attachmentType = 'doc' } = {}): Promise<any> {
		const response = await this.conduct({
			field: 'file',
			params,

			getServer: this.api.docs.getUploadServer,
			serverParams: ['type', 'group_id'],

			saveFiles: this.api.docs.save,
			saveParams: ['title', 'tags'],

			maxFiles: 1,
			attachmentType
		});

		const ConductAttachment = DocumentTypes[response.type] || DocumentTypes.doc;

		return new ConductAttachment({
			api: this.api,
			payload: response[response.type]
		});
	}

	/**
	 * Uploads document
	 */
	document(
		params: IUploadParams & {
			group_id?: number;

			title?: string;
			tags?: string;
		}
	): Promise<DocumentAttachment> {
		return this.conductDocument(params, {
			attachmentType: 'doc'
		});
	}

	/**
	 * Uploads wall document
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async conductWallDocument(params: IUploadParams & { type?: string }, { attachmentType = 'doc' } = {}): Promise<any> {
		const response = await this.conduct({
			field: 'file',
			params,

			getServer: this.api.docs.getWallUploadServer,
			serverParams: ['type', 'group_id'],

			saveFiles: this.api.docs.save,
			saveParams: ['title', 'tags'],

			maxFiles: 1,
			attachmentType
		});

		const ConductAttachment = DocumentTypes[response.type] || DocumentTypes.doc;

		return new ConductAttachment({
			api: this.api,
			payload: response[response.type]
		});
	}

	/**
	 * Uploads wall document
	 */
	wallDocument(
		params: IUploadParams & {
			group_id?: number;
			// type?: string;

			title?: string;
			tags?: string;
		}
	): Promise<DocumentAttachment> {
		return this.conductWallDocument(params, {
			attachmentType: 'doc'
		});
	}

	/**
	 * Uploads wall document
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async conductMessageDocument(params: IUploadParams & { type?: string }, { attachmentType = 'doc' } = {}): Promise<any> {
		const response = await this.conduct({
			field: 'file',
			params,

			getServer: this.api.docs.getMessagesUploadServer,
			serverParams: ['type', 'peer_id'],

			saveFiles: this.api.docs.save,
			saveParams: ['title', 'tags'],

			maxFiles: 1,
			attachmentType
		});

		const ConductAttachment = DocumentTypes[response.type] || DocumentTypes.doc;

		return new ConductAttachment({
			api: this.api,
			payload: response[response.type]
		});
	}

	/**
	 * Uploads message document
	 */
	messageDocument(
		params: IUploadParams & {
			peer_id?: number;

			title?: string;
			tags?: string;
		}
	): Promise<DocumentAttachment> {
		return this.conductMessageDocument(
			{
				...params,
				type: 'doc'
			},
			{
				attachmentType: 'doc'
			}
		);
	}

	/**
	 * Uploads audio message
	 */
	audioMessage(
		params: IUploadParams & {
			peer_id?: number;

			title?: string;
			tags?: string;
		}
	): Promise<AudioMessageAttachment> {
		return this.conductMessageDocument(
			{
				...params,
				type: 'audio_message'
			},
			{
				attachmentType: 'audioMessage'
			}
		);

		// { type: 'audio_message',
		// audio_message: {
		//   id: 484017542,
		//   owner_id: 195624402,
		//   duration: 48,
		//   waveform: [...],
		//   link_ogg:
		//   'https://psv4.userapi.com/c805324//u195624402/audiomsg/15734aa6bb.ogg',
		//   link_mp3:
		//   'https://psv4.userapi.com/c805324//u195624402/audiomsg/15734aa6bb.mp3',
		//   access_key: '295cc90411e6222db0' } }
	}

	/**
	 * Uploads graffiti in documents
	 */
	documentGraffiti(
		params: IUploadParams & {
			group_id?: number;
		}
	): Promise<GraffitiAttachment> {
		return this.conductDocument(
			{
				...params,
				type: 'graffiti'
			},
			{
				attachmentType: 'graffiti'
			}
		);
	}

	/**
	 * Uploads graffiti in messages
	 */
	messageGraffiti(
		params: IUploadParams & {
			peer_id?: number;
		}
	): Promise<GraffitiAttachment> {
		return this.conductMessageDocument(
			{
				...params,
				type: 'graffiti'
			},
			{
				attachmentType: 'graffiti'
			}
		);
	}

	/**
	 * Uploads community cover
	 */
	groupCover(
		params: IUploadParams & {
			group_id: number;

			crop_x?: number;
			crop_y?: number;
			crop_x2?: number;
			crop_y2?: number;
		}
	): Promise<{
			images: {
				url: string;
				width: number;
				height: number;
			}[];
		}> {
		return this.conduct({
			field: 'photo',
			params,

			getServer: this.api.photos.getOwnerCoverPhotoUploadServer,
			serverParams: ['group_id', 'crop_x', 'crop_y', 'crop_x2', 'crop_y2'],

			saveFiles: this.api.photos.saveOwnerCoverPhoto,

			maxFiles: 1,
			attachmentType: 'photo'
		});

		// {
		//  images: [
		//    {
		//      url: 'https://cs7056.userapi.com/c639526/v639526192/46404/r-1Nhr-Dktc.jpg',
		//      width: 200,
		//      height: 50
		//    },
		//    {
		//      url: 'https://cs7056.userapi.com/c639526/v639526192/46403/oDB9tAgtUrQ.jpg',
		//      width: 400,
		//      height: 101
		//    },
		//    {
		//      url: 'https://cs7056.userapi.com/c639526/v639526192/46400/gLwCTmDEPXY.jpg',
		//      width: 795,
		//      height: 200
		//    },
		//    {
		//      url: 'https://cs7056.userapi.com/c639526/v639526192/46402/w2ucyq8zwF8.jpg',
		//      width: 1080,
		//      height: 272
		//    },
		//    {
		//      url: 'https://cs7056.userapi.com/c639526/v639526192/46401/YTmN89yMaU0.jpg',
		//      width: 1590,
		//      height: 400
		//    }
		//  ]
		// }
	}

	/**
	 * Uploads photo stories
	 */
	async storiesPhoto(
		params: IUploadParams & {
			group_id?: number;
			add_to_news?: number;
			user_ids?: string[] | string;
			reply_to_story?: string;
			link_text: string;
			link_url: string;
		}
	): Promise<StoryAttachment> {
		const story = await this.conduct({
			field: 'file',
			params,

			getServer: this.api.stories.getPhotoUploadServer,
			serverParams: [
				'add_to_news',
				'user_ids',
				'reply_to_story',
				'link_text',
				'link_url',
				'group_id',
				'attach_access_key'
			],

			saveFiles: this.api.stories.save,

			maxFiles: 1,
			attachmentType: 'photo'
		});

		return new StoryAttachment({
			api: this.api,
			payload: story
		});
	}

	/**
	 * Uploads video stories
	 */
	async storiesVideo(
		params: IUploadParams & {
			group_id?: number;
			add_to_news?: number;
			user_ids?: string[] | string;
			reply_to_story?: string;
			link_text: string;
			link_url: string;
		}
	): Promise<StoryAttachment> {
		const story = await this.conduct({
			field: 'video_file',
			params,

			getServer: this.api.stories.getVideoUploadServer,
			serverParams: [
				'add_to_news',
				'user_ids',
				'reply_to_story',
				'link_text',
				'link_url',
				'group_id'
			],

			saveFiles: this.api.stories.save,

			maxFiles: 1,
			attachmentType: 'video'
		});

		return new StoryAttachment({
			api: this.api,
			payload: story
		});
	}

	/**
	 * Uploads poll photo
	 */
	pollPhoto(
		params: IUploadParams & {
			owner_id?: number;
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	): Promise<Record<string, any>> {
		return this.conduct({
			field: 'file',
			params,

			getServer: this.api.polls.getPhotoUploadServer,
			serverParams: ['owner_id'],

			saveFiles: this.api.polls.savePhoto,

			maxFiles: 1,
			attachmentType: 'photo'
		});
	}

	/**
	 * Behavior for the upload method
	 */
	async conduct({
		field,
		params,

		getServer,
		serverParams = [],

		saveFiles,
		saveParams = [],

		maxFiles = 1,
		attachmentType
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	}: IUploadConduct): Promise<any> {
		if (!params || !params.source) {
			throw new UploadError({
				message: 'Missing upload params',
				code: MISSING_PARAMETERS
			});
		}

		const source = normalizeSource(params.source);

		if (source.uploadUrl !== undefined) {
			// eslint-disable-next-line no-param-reassign
			getServer = (): Promise<{ upload_url: string }> => Promise.resolve({
				upload_url: source.uploadUrl!
			});
		}

		const { length: valuesLength } = source.values;

		if (valuesLength === 0) {
			throw new UploadError({
				message: 'No files to upload',
				code: NO_FILES_TO_UPLOAD
			});
		}

		if (valuesLength > maxFiles) {
			throw new UploadError({
				message: 'The number of files uploaded has exceeded',
				code: EXCEEDED_MAX_FILES
			});
		}

		const [{ upload_url: url }, formData] = await Promise.all([
			getServer(pickExistingProperties(params, serverParams)),
			this.buildPayload({
				field,
				values: source.values,
				maxFiles,
				attachmentType
			})
		]);

		const uploaded = await this.upload(url, {
			formData,
			timeout: source.timeout!
		});

		if (typeof uploaded !== 'object') {
			const response = await saveFiles(uploaded);

			return response;
		}

		const response = await saveFiles({
			...pickExistingProperties(params, saveParams),
			...uploaded
		});

		return response;
	}

	/**
	 * Building form data
	 */
	// eslint-disable-next-line class-methods-use-this
	async buildPayload({
		field,
		values,
		maxFiles,
		attachmentType
	}: {
		field: string;
		values: IUploadSourceMedia[];
		maxFiles: number;
		attachmentType?: string;
	}): Promise<FormData> {
		const formData = new FormData();

		const isMultipart = maxFiles > 1;

		const tasks = values.map(async (media, i) => {
			let { value, filename, contentLength } = media;

			if (typeof value === 'string') {
				if (isURL.test(value)) {
					const response = await fetch(value);

					value = response.body;

					const length = response.headers.get('content-length');

					if (length !== null) {
						contentLength = Number(length);
					}
				} else {
					value = createReadStream(value);
				}
			}

			if (filename === undefined) {
				filename = `file${i}.${DefaultExtension[attachmentType as keyof typeof DefaultExtension] || 'dat'}`;
			}

			if (isStream(value) || Buffer.isBuffer(value)) {
				const name = isMultipart
					? field + (i + 1)
					: field;

				const { contentType } = media;

				const headers = {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'Content-Type': contentType
						|| DefaultContentType[attachmentType as keyof typeof DefaultContentType]
				};

				return formData.append(name, value, {
					filename,
					header: headers,
					knownLength: contentLength
				});
			}

			throw new UploadError({
				message: 'Unsupported source type',
				code: UNSUPPORTED_SOURCE_TYPE
			});
		});

		await Promise.all(tasks);

		return formData;
	}

	/**
	 * Upload form data
	 */
	async upload(url: URL | string, { formData, timeout }: {
		formData: FormData;
		timeout: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	}): Promise<any> {
		const { agent, uploadTimeout } = this.options;

		// @ts-expect-error
		// eslint-disable-next-line no-underscore-dangle
		const metaLength = formData._overheadLength + formData._lastBoundary().length;

		const formDataLength = await promisify(formData.getLength).call(formData);

		const hasKnownLength = metaLength !== formDataLength;

		const body = !hasKnownLength
			? await streamToBuffer(formData)
			: formData;

		const length = hasKnownLength
			? formDataLength
			: (body as Buffer).length;

		const controller = new AbortController();

		const interval = setTimeout(() => controller.abort(), timeout || uploadTimeout);

		try {
			const response = await fetch(url, {
				agent,
				compress: false,
				method: 'POST',
				signal: controller.signal,
				headers: {
					...formData.getHeaders(),

					// eslint-disable-next-line @typescript-eslint/naming-convention
					Connection: 'keep-alive',
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'Content-Length': String(length)
				},
				body
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			const result = await response.json();

			return result.response !== undefined
				? result.response
				: result;
		} finally {
			clearTimeout(interval);
		}
	}
}

inspectable(Upload);
