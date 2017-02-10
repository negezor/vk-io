'use strict';

const assert = require('assert');

const VK = require('../');

/**
 * Paste you full token extend test
 */
const tokenExtendTest = null;

describe('Init',() => {
	const params = {
		id: 12345678,
		app: 12345,
		key: 'QWERTY-ASDFH'
	};

	it('pass parameters to the constructor equivalents settings',() => {
		const vk = new VK(params);

		assert.strictEqual(params.id,vk.settings.id);
		assert.strictEqual(params.app,vk.settings.app);
		assert.strictEqual(params.key,vk.settings.key);
	});

	it('the parameters passed to .setting() must be equivalent',() => {
		const vk = new VK;

		vk.setting(params);

		assert.strictEqual(params.id,vk.settings.id);
		assert.strictEqual(params.app,vk.settings.app);
		assert.strictEqual(params.key,vk.settings.key);
	});

	it('installed .setToken() token must be equivalent',() => {
		const vk = new VK;

		const token = '1234567890-qwertyuiop';

		vk.setToken(token);

		assert.strictEqual(token,vk.getToken());
	});
});

const vk = new VK;

describe('Api calls',() => {
	it('make a request and check the data',() => {
		const id = 195624402;

		return vk.api.users.get({
			user_id: id
		})
		.then(([user]) => {
			assert.equal(id,user.id);
		});
	});
});

describe('Errors',() => {
	it('should return TRUE for RequestError error class .isRequestError()',() => {
		assert.strictEqual(true,vk.isRequestError(new vk.RequestError(new Error('Empty error'))));
	});

	it('should return TRUE for UnknownError error class .isUnknownError()',() => {
		assert.strictEqual(true,vk.isUnknownError(new vk.UnknownError(new Error('Empty error'))));
	});

	it('should return TRUE for AuthError error class .isAuthError()',() => {
		assert.strictEqual(true,vk.isAuthError(new vk.AuthError('Empty auth error')));
	});

	it('should return TRUE for ApiError error class .isApiError()',() => {
		assert.strictEqual(true,vk.isApiError(new vk.ApiError({
			error_code: 1,
			error_msg: 'Empty error',
			request_params: []
		})));
	});

	it('should return TRUE for any error VK class .isError()',() => {
		assert.strictEqual(true,vk.isError(new vk.ApiError({
			error_code: 1,
			error_msg: 'Empty error',
			request_params: []
		})));
	});

	it('should return FALSE for any error class .isError()',() => {
		assert.strictEqual(true,!vk.isError(new Error('Empty error')));
	});
});

describe('Util',() => {
	it('should return string attachment .getAttachment()',() => {
		assert.strictEqual('photo1234_5678',vk.getAttachment('photo',{
			id: 5678,
			owner_id: 1234
		}));
	});

	it('should return array attachments .getAttachment()',() => {
		const attachments = [
			'photo1234_5678',
			'photo9012_3456',
			'photo7890_1234'
		];

		assert.deepStrictEqual(attachments,vk.getAttachment('photo',[
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

	it('check parse link user domain',() => {
		return vk.parseLink('https://vk.com/negezor')
		.then((link) => {
			assert.deepStrictEqual(
				{
					id: 195624402,
					type: 'user'
				},
				link
			);
		});
	});

	it('check parse link user profile',() => {
		return vk.parseLink('https://vk.com/id195624402')
		.then((link) => {
			assert.deepStrictEqual(
				{
					id: 195624402,
					type: 'user'
				},
				link
			);
		});
	});

	it('check parse link user photo',() => {
		return vk.parseLink('https://vk.com/id195624402?z=photo195624402_408795472/album195624402_0/rev')
		.then((link) => {
			assert.deepStrictEqual(
				{
					id: 408795472,
					peer: 195624402,
					type: 'photo'
				},
				link
			);
		});
	});

	it('check parse link id',() => {
		return vk.parseLink('195624402')
		.then((link) => {
			assert.deepStrictEqual(
				{
					id: 195624402,
					type: 'user'
				},
				link
			);
		});
	});
});

describe('#isMethod()',() => {
	it('should return TRUE for existing method',() => {
		assert(vk.isMethod('users.get'));
	});

	it('should return FALSE for non-existing method',() => {
		assert(!vk.isMethod('users.getNice'));
	});
});

if (tokenExtendTest === null) {
	return console.log('Extended test off, check description https://github.com/negezor/vk-io#Тесты');
}

vk.setToken(tokenExtendTest);

/**
 * Extended test
 */
describe('Extended test',(suite) => {
	it('upload image from message group',function(){
		this.timeout(1000 * 60);

		return vk.upload.message({
			file: 'https://pp.vk.me/c638819/v638819402/6bf5/YTMHXsUJGqA.jpg'
		})
		.then((photo) => {
			return vk.getAttachment('photo',photo);
		})
		.then((attachment) => {
			return vk.api.messages.send({
				peer_id: -139876267,
				attachment
			});
		});
	});

	it('upload image document from message group',function(){
		this.timeout(1000 * 60);

		return vk.upload.doc({
			group_id: 139876267,
			file: 'https://pp.vk.me/c638819/v638819402/6bf5/YTMHXsUJGqA.jpg'
		})
		.then((photo) => {
			return vk.getAttachment('doc',photo);
		})
		.then((attachment) => {
			return vk.api.messages.send({
				peer_id: -139876267,
				attachment
			})
			.then(() => attachment);
		});
	});

	it('stream fetch all post and find one',() => {
		this.timeout(1000 * 60);

		return vk.stream.wall.get({
			owner_id: -139876267
		})
		.then((posts) => {
			if (!Array.isArray(posts)) {
				throw new TypeError('The result should be array!');
			}

			return posts.find((post) => {
				return post.text === '3bd89d64-8010-4e14-a2e9-78f5da3fd7c9';
			});
		})
		.then((result) => {
			if (result !== undefined) {
				return result;
			}

			throw new Error('Could not find post!');
		})
		.then((post) => {
			return vk.api.messages.send({
				peer_id: -139876267,
				attachment: vk.getAttachment('wall',post)
			});
		});
	});
});
