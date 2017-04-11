'use strict';

const Promise = require('bluebird');

const mainTypes = /(photo|video|doc|album|topic|wall|page)([\d-]+)_(\d+)/i;

const otherTypes = /(app(?:lication)?|id|club|public)(\d+)/i;

const replaceNotUri = /https?:\/\/(?:m)?.?vk\.com\//i;

const aliasOtherType = {
	id: 'user',
	club: 'group',
	application: 'app',
	public: 'group'
};

/**
 * Парсирит ссылку ВКонтакте
 *
 * @param {Api}    api
 * @param {string} uri
 *
 * @return {Promise}
 */
module.exports = (api, uri) => {
	if (mainTypes.test(uri)) {
		const [, type, peer, id] = uri.match(mainTypes);

		return Promise.resolve({
			id: +id,
			peer: +peer,
			type: type.toLowerCase()
		});
	}

	if (otherTypes.test(uri)) {
		const match = uri.match(otherTypes);

		let type = match[1].toLowerCase();

		if (type in aliasOtherType) {
			type = aliasOtherType[type];
		}

		return Promise.resolve({
			id: +match[2],
			type
		});
	}

	if (/^\d+$/.test(uri)) {
		return Promise.resolve({
			id: +uri,
			type: 'user'
		});
	}

	return api.utils.resolveScreenName({
		screen_name: uri.replace(replaceNotUri, '')
	})
	.then((screen) => {
		if (Array.isArray(screen)) {
			throw new Error('This link is not valid');
		}

		return {
			id: +screen.object_id,
			type: screen.type
		};
	});
};
