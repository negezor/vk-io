'use strict';

import fetch from 'node-fetch';

import { randomBytes } from 'crypto';
import { createReadStream } from 'fs';

import UploadError from '../errors/upload';
import MultipartStream from './multipart-stream';
import { isStream, copyParams } from './helpers';
import { defaultExtensions } from '../util/constants';

const isLink = /^https?:\/\//i;

export default class Upload {
	/**
	 * Constructor
	 *
	 * @param {VK} vk
	 */
	constructor (vk) {
		this.vk = vk;
	}

	/**
	 * Uploading photos to an album
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	photoAlbum (params) {
		return this._conduct({
			field: 'file',
			params,

			getServer: this.vk.api.photos.getUploadServer,
			serverParams: ['album_id', 'group_id'],

			saveFiles: this.vk.api.photos.save,
			saveParams: ['album_id', 'group_id', 'latitude', 'longitude', 'caption'],

			maxFiles: 5,
			attachmentType: 'photo'
		});

		// [{
		// 	id: 456260572,
		// 	album_id: 247223193,
		// 	owner_id: 195624402,
		// 	photo_75: 'https://pp.userapi.com/c639421/v639421114/459d2/YeSnSuSSXaU.jpg',
		// 	photo_130: 'https://pp.userapi.com/c639421/v639421114/459d3/dT5VG8VHtwI.jpg',
		// 	photo_604: 'https://pp.userapi.com/c639421/v639421114/459d4/PjSwLfkLKK4.jpg',
		// 	photo_807: 'https://pp.userapi.com/c639421/v639421114/459d5/AAJKTDWh3OU.jpg',
		// 	photo_1280: 'https://pp.userapi.com/c639421/v639421114/459d6/1abuczPSwVA.jpg',
		// 	photo_2560: 'https://pp.userapi.com/c639421/v639421114/459d7/950zJQtoAO4.jpg',
		// 	width: 1159,
		// 	height: 1500,
		// 	text: 'Upload #3',
		// 	date: 1505449398
		// }]
	}

	/**
	 * Uploading photos to the wall
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	wallPhoto (params) {
		return this._conduct({
			field: 'photo',
			params,

			getServer: this.vk.api.photos.getWallUploadServer,
			serverParams: ['group_id'],

			saveFiles: this.vk.api.photos.saveWallPhoto,
			saveParams: ['user_id', 'group_id', 'latitude', 'longitude', 'caption'],

			maxFiles: 1,
			attachmentType: 'photo'
		});

		// [{
		// 	id: 456260571,
		// 	album_id: -14,
		// 	owner_id: 195624402,
		// 	photo_75: 'https://pp.userapi.com/c639621/v639621114/424f3/LX-U9n2q_Dg.jpg',
		// 	photo_130: 'https://pp.userapi.com/c639621/v639621114/424f4/a8Ji8Mt3Ft8.jpg',
		// 	photo_604: 'https://pp.userapi.com/c639621/v639621114/424f5/Y94idjILhxo.jpg',
		// 	photo_807: 'https://pp.userapi.com/c639621/v639621114/424f6/0sR8l2TgttU.jpg',
		// 	photo_1280: 'https://pp.userapi.com/c639621/v639621114/424f7/_Tsmg5lLRwc.jpg',
		// 	photo_2560: 'https://pp.userapi.com/c639621/v639621114/424f8/pg0m1QbK_jg.jpg',
		// 	width: 1159,
		// 	height: 1500,
		// 	text: 'Upload #3',
		// 	date: 1505449358,
		// 	access_key: '9b0b9e9602b6fbd652'
		// }]
	}

	/**
	 * Uploading the main photo of a user or community
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	ownerPhoto (params) {
		return this._conduct({
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
	 * @return {Promise<Object>}
	 */
	messagePhoto (params) {
		return this._conduct({
			field: 'photo',
			params,

			getServer: this.vk.api.photos.getMessagesUploadServer,
			serverParams: ['peer_id'],

			saveFiles: this.vk.api.photos.saveMessagesPhoto,

			maxFiles: 1,
			attachmentType: 'photo'
		});

		// [{
		// 	id: 456260573,
		// 	album_id: -3,
		// 	owner_id: 195624402,
		// 	photo_75: 'https://pp.userapi.com/c837525/v837525114/61c17/9Y7T2MQjJiM.jpg',
		// 	photo_130: 'https://pp.userapi.com/c837525/v837525114/61c18/F9rP-74Z7Os.jpg',
		// 	photo_604: 'https://pp.userapi.com/c837525/v837525114/61c19/aBUTeSvf_aQ.jpg',
		// 	photo_807: 'https://pp.userapi.com/c837525/v837525114/61c1a/Z06mXP8eYWY.jpg',
		// 	photo_1280: 'https://pp.userapi.com/c837525/v837525114/61c1b/c9a2JSuyd9c.jpg',
		// 	photo_2560: 'https://pp.userapi.com/c837525/v837525114/61c1c/4dQuTAhA8AU.jpg',
		// 	width: 1159,
		// 	height: 1500,
		// 	text: '',
		// 	date: 1505449438
		// }]
	}

	/**
	 * Uploading the main photo for a chat
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	chatPhoto (params) {
		return this._conduct({
			field: 'file',
			params,

			getServer: this.vk.api.photos.getChatUploadServer,
			serverParams: ['chat_id', 'crop_x', 'crop_y', 'crop_width'],

			saveFiles: (file) => (
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
		// 		title: 'михаил Илтк | кал топ',
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
	 * Uploading the main photo for a chat
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	marketPhoto (params) {
		return this._conduct({
			field: 'file',
			params,

			getServer: this.vk.api.photos.getMarketUploadServer,
			serverParams: ['group_id', 'main_photo', 'crop_x', 'crop_y', 'crop_width'],

			saveFiles: this.vk.api.photos.saveMarketPhoto,
			saveParams: ['group_id'],

			maxFiles: 1,
			attachmentType: 'photo'
		});

		// [{
		// 	id: 456239041,
		// 	album_id: -53,
		// 	owner_id: -139876267,
		// 	user_id: 195624402,
		// 	photo_75: 'https://pp.userapi.com/c837630/v837630114/60404/HGUmUYRZLDY.jpg',
		// 	photo_130: 'https://pp.userapi.com/c837630/v837630114/60405/84a-drjp37M.jpg',
		// 	photo_604: 'https://pp.userapi.com/c837630/v837630114/60406/4W1UMTde1vc.jpg',
		// 	photo_807: 'https://pp.userapi.com/c837630/v837630114/60407/Q0r3_gf0vSs.jpg',
		// 	photo_1280: 'https://pp.userapi.com/c837630/v837630114/60408/7LeT57quqYE.jpg',
		// 	photo_2560: 'https://pp.userapi.com/c837630/v837630114/60409/GqvpRZBbFTU.jpg',
		// 	width: 1159,
		// 	height: 1500,
		// 	text: '',
		// 	date: 1505450850
		// }]
	}

	/**
	 * Uploads a photo for the selection of goods
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	marketAlbumPhoto (params) {
		return this._conduct({
			field: 'file',
			params,

			getServer: this.vk.api.photos.getMarketAlbumUploadServer,
			serverParams: ['group_id'],

			saveFiles: this.vk.api.photos.saveMarketAlbumPhoto,
			saveParams: ['group_id'],

			maxFiles: 1,
			attachmentType: 'photo'
		});

		// [{
		// 	id: 456239043,
		// 	album_id: -53,
		// 	owner_id: -139876267,
		// 	user_id: 195624402,
		// 	photo_75: 'https://pp.userapi.com/c840534/v840534474/63c4/59ZTpqb0Q-Q.jpg',
		// 	photo_130: 'https://pp.userapi.com/c840534/v840534474/63c5/wIZB1ZbiTOg.jpg',
		// 	photo_604: 'https://pp.userapi.com/c840534/v840534474/63c6/Az9DGYeZaJs.jpg',
		// 	photo_807: 'https://pp.userapi.com/c840534/v840534474/63c7/EZI-mtWsrqI.jpg',
		// 	width: 1138,
		// 	height: 640,
		// 	text: '',
		// 	date: 1505451096
		// }]
	}

	/**
	 * Uploads audio
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	audio (params) {
		return this._conduct({
			field: 'file',
			params,

			getServer: this.vk.api.audio.getUploadServer,

			saveFiles: this.vk.api.audio.save,
			saveParams: ['artist', 'title'],

			maxFiles: 1,
			attachmentType: 'audio'
		});

		// {
		// 	id: 456239074,
		// 	owner_id: 195624402,
		// 	artist: 'PH Electro',
		// 	title: 'Englishman In New York',
		// 	duration: 294,
		// 	date: 1505451289,
		// 	url: 'https://psv4.userapi.com/c815120/u195624402/audios/eac0f7d3136e.mp3?extra=A81zpX_f_FVSLqSJjkGSnEiUzGL_73XCGV0aw21xWljLDXS0vcIsXgEEJNZlPKm3A7HucbX9l07xrYMbFWYVGl3XMQgSGpZ4ARxWP8rtmZLv50YEvnCKVnAMyuaalcSUqkc8DLfVn_L5xaI',
		// 	is_hq: false
		// }
	}

	/**
	 * Uploads video
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	async video (params) {
		/* FIXME: 400 Bad Request */
		const save = await this.vk.api.video.save(
			copyParams(params, [
				'name',
				'description',
				'is_private',
				'wallpost',
				'link',
				'group_id',
				'album_id',
				'privacy_view',
				'privacy_comment',
				'no_comments',
				'repeat'
			])
		);

		if ('link' in params) {
			const response = await fetch(save.upload_url);

			await response.json();

			return save;
		}

		if (!Array.isArray(params.source)) {
			params.source = [params.source];
		}

		const formData = await this._buildPayload({
			maxFiles: 1,
			field: 'video_file',
			attachmentType: 'video',
			sources: params.source
		});

		const uploaded = await this._upload(save.upload_url, formData);

		delete save.upload_url;

		return { ...save, ...uploaded };
	}

	/**
	 * Uploads doc
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	doc (params) {
		return this._conduct({
			field: 'file',
			params,

			getServer: this.vk.api.docs.getUploadServer,
			serverParams: ['type', 'group_id'],

			saveFiles: this.vk.api.docs.save,
			saveParams: ['title', 'tags'],

			maxFiles: 1,
			attachmentType: 'doc'
		});

		// [{
		// 	id: 450653982,
		// 	owner_id: 195624402,
		// 	title: 'file0.dat',
		// 	size: 383631,
		// 	ext: 'dat',
		// 	url: 'https://vk.com/doc195624402_450653982?hash=383e2969b07c7a0893&dl=GE4TKNRSGQ2DAMQ:1505453288:2c6cda2d6feb8cab35&api=1&no_preview=1',
		// 	date: 1505453288,
		// 	type: 1
		// }]
	}

	/**
	 * Uploads wall doc
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	wallDoc (params) {
		return this._conduct({
			field: 'file',
			params,

			getServer: this.vk.api.docs.getWallUploadServer,
			serverParams: ['type', 'group_id'],

			saveFiles: this.vk.api.docs.save,
			saveParams: ['title', 'tags'],

			maxFiles: 1,
			attachmentType: 'doc'
		});

		// [{
		// 	id: 450654029,
		// 	owner_id: 195624402,
		// 	title: 'file0.dat',
		// 	size: 383631,
		// 	ext: 'dat',
		// 	url: 'https://vk.com/doc195624402_450654029?hash=dd1d0735ece19c6530&dl=GE4TKNRSGQ2DAMQ:1505453419:8e9b458e27e264c546&api=1&no_preview=1',
		// 	date: 1505453419,
		// 	type: 1
		// }]
	}

	/**
	 * Uploads message doc
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	messageDoc (params) {
		return this._conduct({
			field: 'file',
			params,

			getServer: this.vk.api.docs.getMessagesUploadServer,
			serverParams: ['type', 'peer_id'],

			saveFiles: this.vk.api.docs.save,
			saveParams: ['title', 'tags'],

			maxFiles: 1,
			attachmentType: 'doc'
		});

		// [{
		// 	id: 450654051,
		// 	owner_id: 195624402,
		// 	title: 'file0.dat',
		// 	size: 383631,
		// 	ext: 'dat',
		// 	url: 'https://vk.com/doc195624402_450654051?hash=a62475ac3fc60c086c&dl=GE4TKNRSGQ2DAMQ:1505453498:4adbe8dfaf889498b7&api=1&no_preview=1',
		// 	date: 1505453498,
		// 	type: 1
		// }]
	}

	/**
	 * Uploads audio message
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	voice (params) {
		params.type = 'audio_message';

		return this.messageDoc(params);

		// [{
		// 	id: 450654090,
		// 	owner_id: 195624402,
		// 	title: 'file0.dat',
		// 	size: 6893689,
		// 	ext: 'ogg',
		// 	url: 'https://vk.com/doc195624402_450654090?hash=4885f0597af540ea3c&dl=GE4TKNRSGQ2DAMQ:1505453671:d23a533d7c485e7426&api=1&no_preview=1',
		// 	date: 1505453671,
		// 	type: 5,
		// 	preview: {
		// 		audio_msg: {
		// 			duration: 243,
		// 			waveform: [5,
		// 				6,
		// 				5,
		// 				5,
		// 				4,
		// 				3,
		// 				4,
		// 				2,
		// 				4,
		// 				3,
		// 				4,
		// 				4,
		// 				3,
		// 				2,
		// 				1,
		// 				1,
		// 				2,
		// 				3,
		// 				4,
		// 				4,
		// 				6,
		// 				8,
		// 				13,
		// 				13,
		// 				11,
		// 				6,
		// 				5,
		// 				4,
		// 				3,
		// 				3,
		// 				1,
		// 				2,
		// 				1,
		// 				2,
		// 				1,
		// 				4,
		// 				8,
		// 				10,
		// 				12,
		// 				10,
		// 				13,
		// 				12,
		// 				14,
		// 				16,
		// 				16,
		// 				17,
		// 				11,
		// 				9,
		// 				8,
		// 				9,
		// 				10,
		// 				10,
		// 				7,
		// 				1,
		// 				3,
		// 				1,
		// 				2,
		// 				5,
		// 				8,
		// 				10,
		// 				10,
		// 				11,
		// 				13,
		// 				14,
		// 				18,
		// 				19,
		// 				20,
		// 				22,
		// 				20,
		// 				22,
		// 				24,
		// 				25,
		// 				27,
		// 				25,
		// 				21,
		// 				20,
		// 				18,
		// 				15,
		// 				12,
		// 				6,
		// 				3,
		// 				4,
		// 				6,
		// 				10,
		// 				13,
		// 				10,
		// 				9,
		// 				8,
		// 				5,
		// 				3,
		// 				2,
		// 				3,
		// 				8,
		// 				11,
		// 				10,
		// 				2,
		// 				2,
		// 				9,
		// 				12,
		// 				19,
		// 				...23 more items
		// 			],
		// 			link_ogg: 'https://cs540101.userapi.com/c807320/u195624402/audio/440482857b.ogg',
		// 			link_mp3: 'https://cs540101.userapi.com/c807320/u195624402/audio/440482857b.mp3'
		// 		}
		// 	}
		// }]
	}

	/**
	 * Uploads graffiti
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	graffiti (params) {
		/* FIXME: One of the parameters specified was missing or invalid: file is undefined */
		params.type = 'graffiti';

		return this.doc(params);
	}

	/**
	 * Uploads community cover
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	groupCover (params) {
		return this._conduct({
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
	storiesPhoto (params) {
		return Promise.reject('Not yet');
	}

	/**
	 * Uploads video stories
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	storiesVideo (params) {
		return Promise.reject('Not yet');
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
	async _conduct ({
		field,
		params,

		getServer,
		serverParams = [],

		saveFiles,
		saveParams = [],

		maxFiles = 1,
		attachmentType
	}) {
		if (!Array.isArray(params.source)) {
			params.source = [params.source];
		}

		if (params.source.length > maxFiles) {
			throw new Error('The number of files uploaded has exceeded');
		}

		const [{ upload_url: url }, formData] = await Promise.all([
			getServer(
				copyParams(params, serverParams)
			),
			this._buildPayload({
				field,
				maxFiles,
				attachmentType,
				sources: params.source
			})
		]);

		const uploaded = await this._upload(url, formData, params);

		if (typeof uploaded !== 'object') {
			return await saveFiles(uploaded);
		}

		return await saveFiles({
			...copyParams(params, saveParams),
			...uploaded
		});
	}

	/**
	 * Building form data
	 *
	 * @param {Object} payload
	 *
	 * @return {Promise}
	 */
	async _buildPayload ({ field, sources, maxFiles, attachmentType }) {
		const boundary = randomBytes(30).toString('hex');
		const formData = new MultipartStream(boundary);

		const isMultipart = maxFiles > 1;

		const tasks = sources
		.map((source) => {
			if (typeof source === 'object' && 'source' in source) {
				return source;
			}

			return { source };
		})
		.map(async ({ source, filename }, i) => {
			if (typeof source === 'string') {
				if (isLink.test(source)) {
					const response = await fetch(source);

					source = response.body;
				} else {
					source = createReadStream(source);
				}
			}

			if (!filename) {
				filename = `file${i}.${defaultExtensions[attachmentType] || 'dat'}`;
			}

			if (isStream(source) || Buffer.isBuffer(source)) {
				const name = isMultipart
					? field + (i + 1)
					: field;

				return formData.append(name, source, { filename });
			}

			throw new Error('Unsupported source type');
		});

		await Promise.all(tasks);

		return formData;
	}

	/**
	 * Upload form data
	 *
	 * @param {URL|string}      url
	 * @param {MultipartStream} formData
	 * @param {Object}          options
	 *
	 * @return {Promise<Object>}
	 */
	async _upload (url, formData, { timeout } = {}) {
		const { agent, uploadTimeout } = this.vk.options;

		let response = await fetch(url, {
			agent,
			method: 'POST',
			timeout: timeout || uploadTimeout,
			headers: {
				connection: 'keep-alive',
				'content-type': `multipart/form-data; boundary=${formData.getBoundary()}`
			},
			body: formData
		});

		if (response.status !== 200) {
			throw new Error(response.statusText);
		}

		response = await response.json();

		if ('response' in response) {
			return response.response;
		}

		return response;
	}
}
