import fetch from 'node-fetch';

import nodeFs from 'fs';
import nodeUtil from 'util';
import nodeCrypto from 'crypto';

import MultipartStream from './multipart-stream';
import { isStream, copyParams } from './helpers';
import { UploadError, uploadErrors } from '../errors';
import { defaultExtensions, defaultContentTypes } from '../utils/constants';

import {
	PhotoAttachment,
	AudioAttachment,
	VideoAttachment,
	DocumentAttachment,
	GraffitiAttachment,
	AudioMessageAttachment
} from '../structures/attachments';

const { createReadStream } = nodeFs;
const { randomBytes } = nodeCrypto;
const { inspect } = nodeUtil;

const {
	MISSING_PARAMETERS,
	NO_FILES_TO_UPLOAD,
	EXCEEDED_MAX_FILES,
	UNSUPPORTED_SOURCE_TYPE
} = uploadErrors;

const isURL = /^https?:\/\//i;

export default class Upload {
	/**
	 * Constructor
	 *
	 * @param {VK} vk
	 */
	constructor(vk) {
		this.vk = vk;
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag]() {
		return 'Upload';
	}

	/**
	 * Uploading photos to an album
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<PhotoAttachment[]>}
	 */
	async photoAlbum(params) {
		const photos = await this.conduct({
			field: 'file',
			params,

			getServer: this.vk.api.photos.getUploadServer,
			serverParams: ['album_id', 'group_id'],

			saveFiles: this.vk.api.photos.save,
			saveParams: ['album_id', 'group_id', 'latitude', 'longitude', 'caption'],

			maxFiles: 5,
			attachmentType: 'photo'
		});

		return photos.map(photo => (
			new PhotoAttachment(photo, this.vk)
		));
	}

	/**
	 * Uploading photos to the wall
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<PhotoAttachment>}
	 */
	async wallPhoto(params) {
		const [photo] = await this.conduct({
			field: 'photo',
			params,

			getServer: this.vk.api.photos.getWallUploadServer,
			serverParams: ['group_id'],

			saveFiles: this.vk.api.photos.saveWallPhoto,
			saveParams: ['user_id', 'group_id', 'latitude', 'longitude', 'caption'],

			maxFiles: 1,
			attachmentType: 'photo'
		});

		return new PhotoAttachment(photo, this.vk);
	}

	/**
	 * Uploading the main photo of a user or community
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	ownerPhoto(params) {
		return this.conduct({
			field: 'photo',
			params,

			getServer: this.vk.api.photos.getOwnerPhotoUploadServer,
			serverParams: ['owner_id'],

			saveFiles: this.vk.api.photos.saveOwnerPhoto,

			maxFiles: 1,
			attachmentType: 'photo'
		});

		// {
		// 	photo_hash: 'c8d43da5e1281b7aed6bb8f0c4f3ad69',
		// 	photo_src: 'https://pp.userapi.com/c836429/v836429114/673f6/5VJB8GXtK88.jpg',
		// 	photo_src_big: 'https://pp.userapi.com/c836429/v836429114/673f7/7fGvrJ1wOx0.jpg',
		// 	photo_src_small: 'https://pp.userapi.com/c836429/v836429114/673f5/l5d1ASgyuxk.jpg',
		// 	saved: 1,
		// 	post_id: 3331
		// }
	}

	/**
	 * Uploading a photo to a private message
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<PhotoAttachment>}
	 */
	async messagePhoto(params) {
		const [photo] = await this.conduct({
			field: 'photo',
			params,

			getServer: this.vk.api.photos.getMessagesUploadServer,
			serverParams: ['peer_id'],

			saveFiles: this.vk.api.photos.saveMessagesPhoto,

			maxFiles: 1,
			attachmentType: 'photo'
		});

		return new PhotoAttachment(photo, this.vk);
	}

	/**
	 * Uploading the main photo for a chat
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	chatPhoto(params) {
		return this.conduct({
			field: 'file',
			params,

			getServer: this.vk.api.photos.getChatUploadServer,
			serverParams: ['chat_id', 'crop_x', 'crop_y', 'crop_width'],

			saveFiles: file => (
				this.vk.api.messages.setChatPhoto({ file })
			),

			maxFiles: 1,
			attachmentType: 'photo'
		});

		// {
		// 	message_id: 3745390,
		// 	chat: {
		// 		id: 152,
		// 		type: 'chat',
		// 		title: '<Titile name>',
		// 		admin_id: 335447860,
		// 		users: [335447860,
		// 			140192020,
		// 			153711615,
		// 			314650825,
		// 			218747758,
		// 			155944103,
		// 			159737827,
		// 			64299368,
		// 			157534541,
		// 			153608064,
		// 			335540121,
		// 			349609849,
		// 			344184938,
		// 			341178526,
		// 			198210835,
		// 			135446999,
		// 			163850606,
		// 			123640861,
		// 			316216798,
		// 			359118107,
		// 			241235369,
		// 			160213445,
		// 			126624591,
		// 			390221395,
		// 			195624402,
		// 			94955334,
		// 			167302501,
		// 			17516523,
		// 			294583792,
		// 			294869767,
		// 			114281676,
		// 			137762280,
		// 			406076540,
		// 			410605840,
		// 			395646590,
		// 			421554042,
		// 			331599090,
		// 			342269712
		// 		],
		// 		photo_50: 'https://pp.userapi.com/c837624/v837624114/5d495/gLgv-JrVmkk.jpg',
		// 		photo_100: 'https://pp.userapi.com/c837624/v837624114/5d494/VNp61I1yuCk.jpg',
		// 		photo_200: 'https://pp.userapi.com/c837624/v837624114/5d492/lAoc_fAai2Q.jpg'
		// 	}
		// }
	}

	/**
	 * Uploading a photo for a product
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<PhotoAttachment>}
	 */
	async marketPhoto(params) {
		const [photo] = await this.conduct({
			field: 'file',
			params,

			getServer: this.vk.api.photos.getMarketUploadServer,
			serverParams: ['group_id', 'main_photo', 'crop_x', 'crop_y', 'crop_width'],

			saveFiles: this.vk.api.photos.saveMarketPhoto,
			saveParams: ['group_id'],

			maxFiles: 1,
			attachmentType: 'photo'
		});

		return new PhotoAttachment(photo, this.vk);
	}

	/**
	 * Uploads a photo for the selection of goods
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<PhotoAttachment>}
	 */
	async marketAlbumPhoto(params) {
		const [photo] = await this.conduct({
			field: 'file',
			params,

			getServer: this.vk.api.photos.getMarketAlbumUploadServer,
			serverParams: ['group_id'],

			saveFiles: this.vk.api.photos.saveMarketAlbumPhoto,
			saveParams: ['group_id'],

			maxFiles: 1,
			attachmentType: 'photo'
		});

		return new PhotoAttachment(photo, this.vk);
	}

	/**
	 * Uploads audio
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<AudioAttachment>}
	 */
	async audio(params) {
		const audio = await this.conduct({
			field: 'file',
			params,

			getServer: this.vk.api.audio.getUploadServer,

			saveFiles: this.vk.api.audio.save,
			saveParams: ['title', 'artist'],

			maxFiles: 1,
			attachmentType: 'audio'
		});

		return new AudioAttachment(audio, this.vk);
	}

	/**
	 * Uploads video
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<VideoAttachment>}
	 */
	async video(params) {
		/* FIXME: 400 Bad Request */
		const save = await this.vk.api.video.save(copyParams(params, [
			'group_id',
			'album_id',
			'name',
			'description',
			'link',
			'is_private',
			'wallpost',
			'privacy_view',
			'privacy_comment',
			'no_comments',
			'repeat'
		]));

		save.id = save.video_id;

		if ('link' in params) {
			const response = await fetch(save.upload_url, {
				agent: this.vk.options.agent
			});

			await response.json();

			return new VideoAttachment(save, this.vk);
		}

		let { source } = params;

		if (typeof source !== 'object' || source.constructor !== Object) {
			source = {
				values: source
			};
		}

		if (!Array.isArray(source.values)) {
			source.values = [source.values];
		}

		const formData = await this.buildPayload({
			maxFiles: 1,
			field: 'video_file',
			attachmentType: 'video',
			values: source.values
		});

		const video = await this.upload(save.upload_url, {
			formData,
			timeout: source.timeout
		});

		return new VideoAttachment({ ...save, ...video }, this.vk);
	}

	/**
	 * Uploads document
	 *
	 * @param {Object} params
	 * @param {Object} options
	 *
	 * @return {Promise<Object>}
	 */
	async conductDocument(params, { attachmentType = 'doc' }) {
		return this.conduct({
			field: 'file',
			params,

			getServer: this.vk.api.docs.getUploadServer,
			serverParams: ['type', 'group_id'],

			saveFiles: this.vk.api.docs.save,
			saveParams: ['title', 'tags'],

			maxFiles: 1,
			attachmentType
		});
	}

	/**
	 * Uploads document
	 *
	 * @param {Object} params
	 * @param {Object} options
	 *
	 * @return {Promise<DocumentAttachment>}
	 */
	async document(params) {
		const { doc: document } = await this.conductDocument(params, {
			attachmentType: 'doc'
		});

		return new DocumentAttachment(document, this.vk);
	}

	/**
	 * Uploads wall document
	 *
	 * @param {Object} params
	 * @param {Object} options
	 *
	 * @return {Promise<Object>}
	 */
	async conductWallDocument(params, { attachmentType = 'doc' } = {}) {
		return this.conduct({
			field: 'file',
			params,

			getServer: this.vk.api.docs.getWallUploadServer,
			serverParams: ['type', 'group_id'],

			saveFiles: this.vk.api.docs.save,
			saveParams: ['title', 'tags'],

			maxFiles: 1,
			attachmentType
		});
	}

	/**
	 * Uploads wall document
	 *
	 * @param {Object} params
	 * @param {Object} options
	 *
	 * @return {Promise<DocumentAttachment>}
	 */
	async wallDocument(params) {
		const { doc: document } = await this.conductWallDocument(params, {
			attachmentType: 'doc'
		});

		return new DocumentAttachment(document, this.vk);
	}

	/**
	 * Uploads wall document
	 *
	 * @param {Object} params
	 * @param {Object} options
	 *
	 * @return {Promise<Object>}
	 */
	async conductMessageDocument(params, { attachmentType = 'doc' } = {}) {
		return this.conduct({
			field: 'file',
			params,

			getServer: this.vk.api.docs.getMessagesUploadServer,
			serverParams: ['type', 'peer_id'],

			saveFiles: this.vk.api.docs.save,
			saveParams: ['title', 'tags'],

			maxFiles: 1,
			attachmentType
		});
	}

	/**
	 * Uploads message document
	 *
	 * @param {Object} params
	 * @param {Object} options
	 *
	 * @return {Promise<DocumentAttachment>}
	 */
	async messageDocument(params) {
		const { doc: document } = await this.conductMessageDocument(params, {
			attachmentType: 'doc'
		});

		return new DocumentAttachment(document, this.vk);
	}

	/**
	 * Uploads audio message
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<AudioMessageAttachment>}
	 */
	async audioMessage(params) {
		const { audio_message: audioMessage } = await this.conductMessageDocument(
			{
				...params,
				type: 'audio_message'
			},
			{
				attachmentType: 'audioMessage'
			}
		);

		const audioMessageAttachment = new AudioMessageAttachment(audioMessage, this.vk);

		return audioMessageAttachment;

		// { type: 'audio_message',
		// audio_message: {
		// id: 484017542,
		// 	owner_id: 195624402,
		// 	duration: 48,
		// 	waveform: [...],
		// 	link_ogg:
		// 	'https://psv4.userapi.com/c805324//u195624402/audiomsg/15734aa6bb.ogg',
		// 	link_mp3:
		// 	'https://psv4.userapi.com/c805324//u195624402/audiomsg/15734aa6bb.mp3',
		// 	access_key: '295cc90411e6222db0' } }
	}

	/**
	 * Uploads graffiti
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<GraffitiAttachment>}
	 */
	async graffiti(params) {
		const { graffiti } = await this.conductMessageDocument(
			{
				...params,
				type: 'graffiti'
			},
			{
				attachmentType: 'graffiti'
			}
		);

		const graffitiAttachment = new GraffitiAttachment(graffiti, this.vk);

		return graffitiAttachment;
	}

	/**
	 * Uploads community cover
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	groupCover(params) {
		return this.conduct({
			field: 'photo',
			params,

			getServer: this.vk.api.photos.getOwnerCoverPhotoUploadServer,
			serverParams: ['group_id', 'crop_x', 'crop_y', 'crop_x2', 'crop_y2'],

			saveFiles: this.vk.api.photos.saveOwnerCoverPhoto,

			maxFiles: 1,
			attachmentType: 'photo'
		});

		// {
		// 	images: [
		// 		{
		// 			url: 'https://cs7056.userapi.com/c639526/v639526192/46404/r-1Nhr-Dktc.jpg',
		// 			width: 200,
		// 			height: 50
		// 		},
		// 		{
		// 			url: 'https://cs7056.userapi.com/c639526/v639526192/46403/oDB9tAgtUrQ.jpg',
		// 			width: 400,
		// 			height: 101
		// 		},
		// 		{
		// 			url: 'https://cs7056.userapi.com/c639526/v639526192/46400/gLwCTmDEPXY.jpg',
		// 			width: 795,
		// 			height: 200
		// 		},
		// 		{
		// 			url: 'https://cs7056.userapi.com/c639526/v639526192/46402/w2ucyq8zwF8.jpg',
		// 			width: 1080,
		// 			height: 272
		// 		},
		// 		{
		// 			url: 'https://cs7056.userapi.com/c639526/v639526192/46401/YTmN89yMaU0.jpg',
		// 			width: 1590,
		// 			height: 400
		// 		}
		// 	]
		// }
	}

	/**
	 * Uploads photo stories
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	storiesPhoto(params) {
		return this.conduct({
			field: 'file',
			params,

			getServer: this.vk.api.stories.getPhotoUploadServer,
			serverParams: [
				'add_to_news',
				'user_ids',
				'reply_to_story',
				'link_text',
				'link_url',
				'group_id',
				'attach_access_key'
			],

			saveFiles: save => save,

			maxFiles: 1,
			attachmentType: 'photo'
		});
	}

	/**
	 * Uploads video stories
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	storiesVideo(params) {
		return this.conduct({
			field: 'video_file',
			params,

			getServer: this.vk.api.stories.getVideoUploadServer,
			serverParams: [
				'add_to_news',
				'user_ids',
				'reply_to_story',
				'link_text',
				'link_url',
				'group_id'
			],

			saveFiles: save => save,

			maxFiles: 1,
			attachmentType: 'video'
		});
	}

	/**
	 * Uploads poll photo
	 *
	 * @param {Object}
	 *
	 * @return {Promise<Object>}
	 */
	pollPhoto(params) {
		return this.conduct({
			field: 'file',
			params,

			getServer: this.vk.api.polls.getPhotoUploadServer,
			serverParams: ['owner_id'],

			saveFiles: this.vk.api.polls.savePhoto,

			maxFiles: 1,
			attachmentType: 'photo'
		});
	}

	/**
	 * Behavior for the upload method
	 *
	 * @param {Object} conduct
	 * @property [field]          Field name
	 * @property [params]         Upload params
	 *
	 * @property [getServer]      Get server functions
	 * @property [serverParams]   Copies server params
	 *
	 * @property [saveFiles]      Save files functions
	 * @property [saveParams]     Copies save params
	 *
	 * @property [maxFiles]       Max uploaded files for one request
	 * @property [attachmentType] Attachment type
	 *
	 * @return {Promise<Object>}
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
	}) {
		if (!params || !params.source) {
			throw new UploadError({
				message: 'Missing upload params',
				code: MISSING_PARAMETERS
			});
		}

		let { source } = params;

		if (typeof source !== 'object' || source.constructor !== Object) {
			source = {
				values: source
			};
		}

		if (!Array.isArray(source.values)) {
			source.values = [source.values];
		}

		if ('uploadUrl' in source) {
			getServer = () => ({
				upload_url: source.uploadUrl
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
			getServer(copyParams(params, serverParams)),
			this.buildPayload({
				field,
				values: source.values,
				maxFiles,
				attachmentType
			})
		]);

		const uploaded = await this.upload(url, {
			formData,
			timeout: source.timeout
		});

		if (typeof uploaded !== 'object') {
			const response = await saveFiles(uploaded);

			return response;
		}

		const response = await saveFiles({
			...copyParams(params, saveParams),
			...uploaded
		});

		return response;
	}

	/**
	 * Building form data
	 *
	 * @param {Object} payload
	 *
	 * @return {Promise}
	 */
	async buildPayload({
		field,
		values,
		maxFiles,
		attachmentType
	}) {
		const boundary = randomBytes(32).toString('hex');
		const formData = new MultipartStream(boundary);

		const isMultipart = maxFiles > 1;

		const tasks = values
			.map(value => (
				typeof value === 'object' && value.constructor === Object
					? value
					: { value }
			))
			.map(async (
				{
					value,
					filename,
					contentType = null
				},
				i
			) => {
				if (typeof value === 'string') {
					if (isURL.test(value)) {
						const response = await fetch(value);

						value = response.body;
					} else {
						value = createReadStream(value);
					}
				}

				if (!filename) {
					filename = `file${i}.${defaultExtensions[attachmentType] || 'dat'}`;
				}

				if (isStream(value) || Buffer.isBuffer(value)) {
					const name = isMultipart
						? field + (i + 1)
						: field;

					const headers = {
						'Content-Type': contentType === null
							? defaultContentTypes[attachmentType]
							: contentType
					};

					return formData.append(name, value, { filename, headers });
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
	 *
	 * @param {URL|string} url
	 * @param {Object}     options
	 *
	 * @return {Promise<Object>}
	 */
	async upload(url, { formData, timeout }) {
		const { agent, uploadTimeout } = this.vk.options;

		let response = await fetch(url, {
			agent,
			compress: false,
			method: 'POST',
			timeout: timeout || uploadTimeout,
			headers: {
				Connection: 'keep-alive',
				'Content-Type': `multipart/form-data; boundary=${formData.boundary}`
			},
			body: formData
		});

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		response = await response.json();

		return 'response' in response
			? response.response
			: response;
	}

	/**
	 * Custom inspect object
	 *
	 * @param {?number} depth
	 * @param {Object}  options
	 *
	 * @return {string}
	 */
	[inspect.custom](depth, options) {
		const { name } = this.constructor;

		return `${options.stylize(name, 'special')} {}`;
	}
}
