'use strict';

const assert = require('assert');

const VK = require('../index');

describe('Init', () => {
	const params = {
		id: 12345678,
		app: 12345,
		key: 'QWERTY-ASDFH'
	};

	it('pass parameters to the constructor equivalents settings', () => {
		const vk = new VK(params);

		assert.strictEqual(params.id, vk.options.id);
		assert.strictEqual(params.app, vk.options.app);
		assert.strictEqual(params.key, vk.options.key);
	});

	it('the parameters passed to .setOptions() must be equivalent', () => {
		const vk = new VK;

		vk.setOptions(params);

		assert.strictEqual(params.id, vk.options.id);
		assert.strictEqual(params.app, vk.options.app);
		assert.strictEqual(params.key, vk.options.key);
	});

	it('the parameters passed to .setOptions() must be parsed', () => {
		const vk = new VK;

		vk.setOptions({
			id: '12345',
			scope: [
				'notify',
				'friends'
			]
		});

		assert.strictEqual(12345, vk.options.id);
		assert.strictEqual('notify,friends', vk.options.scope);
	});

	it('installed .setToken() token must be equivalent', () => {
		const vk = new VK;

		const token = '1234567890-qwertyuiop';

		vk.setToken(token);

		assert.strictEqual(token, vk.getToken());
	});
});

describe('Errors', () => {
	const {
		VKError,
		ApiError,
		AuthError,
		UploadError,
		RequestError,
		ExecuteError
	} = require('../errors');

	it('should parse error ApiError 14', () => {
		const apiError = {
			error_code: 14,
			error_msg: 'It is required to enter the code from the picture',
			request_params: [],
			captcha_sid: '239633676097',
			captcha_img: 'http://api.vk.com/captcha.php?sid=239633676097&s=1'
		};
		const error = new ApiError(apiError);

		assert.strictEqual(14, error.code);
		assert.strictEqual(apiError.error_msg, error.message);
		assert.strictEqual(apiError.request_params, error.params);

		assert.strictEqual(239633676097, error.captchaSid);
		assert.strictEqual(apiError.captcha_img, error.captchaImg);
	});

	it('should parse error ApiError 17', () => {
		const apiError = {
			error_code: '17',
			error_msg: 'User validation is required.',
			request_params: [],
			redirect_uri: 'https://m.vk.com/login?act=security_check&api_hash=234307691'
		};
		const error = new ApiError(apiError);

		assert.strictEqual(17, error.code);
		assert.strictEqual(apiError.error_msg, error.message);
		assert.strictEqual(apiError.request_params, error.params);

		assert.strictEqual(apiError.redirect_uri, error.redirectUri);
	});

	it('should parse error ApiError 100', () => {
		const apiError = {
			error_code: '100',
			error_msg: 'One of the parameters specified was missing or invalid',
			request_params: []
		};
		const error = new ApiError(apiError);

		assert.strictEqual(100, error.code);
		assert.strictEqual(apiError.error_msg, error.message);
		assert.strictEqual(apiError.request_params, error.params);
	});
});

const vk = new VK;

describe('Util', () => {
	it('should return string attachment .getAttachment()', () => {
		assert.strictEqual('photo1234_5678', vk.getAttachment('photo', {
			id: 5678,
			owner_id: 1234
		}));
	});

	it('should return array attachments .getAttachment()', () => {
		const attachments = [
			'photo1234_5678',
			'photo9012_3456',
			'photo7890_1234'
		];

		assert.deepStrictEqual(attachments, vk.getAttachment('photo', [
			{
				id: 5678,
				owner_id: 1234
			},
			{
				id: 3456,
				owner_id: 9012
			},
			{
				id: 1234,
				owner_id: 7890
			},
		]));
	});

	it('check parse link user profile', () => (
		vk.parseLink('https://vk.com/id195624402')
		.then((link) => {
			assert.deepStrictEqual(
				{
					id: 195624402,
					type: 'user'
				},
				link
			);
		})
	));

	it('check parse link user photo', () => (
		vk.parseLink('https://vk.com/id195624402?z=photo195624402_408795472/album195624402_0/rev')
		.then((link) => {
			assert.deepStrictEqual(
				{
					id: 408795472,
					peer: 195624402,
					type: 'photo'
				},
				link
			);
		})
	));

	it('check parse link id', () => (
		vk.parseLink('195624402')
		.then((link) => {
			assert.deepStrictEqual(
				{
					id: 195624402,
					type: 'user'
				},
				link
			);
		})
	));
});

describe('#api.isMethod()', () => {
	it('should return TRUE for existing method', () => {
		assert(vk.api.isMethod('users.get'));
	});

	it('should return FALSE for non-existing method', () => {
		assert(!vk.api.isMethod('users.getNice'));
	});
});
