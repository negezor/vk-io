'use strict';

const mainTypes = /(photo|video|doc|album|topic|wall|page)([\d-]+)_(\d+)/i;

const otherTypes = /(app(?:lication)?|id|club)(\d+)/i;

const replaceNotUri = /https?:\/\/(?:m)?.?vk\.com\//i;

const aliasOtherType = {
	id: 'user',
	club: 'group',
	app: 'application'
};

/**
 * Парсирит ссылку со вконтакта
 *
 * @param string link
 *
 * @return promise
 */
exports.parseLink = function(link){
	return new this.promise((resolve,reject) => {
		if (mainTypes.test(link)) {
			var match = link.match(mainTypes);

			return resolve({
				id: parseInt(match[3]),
				peer: parseInt(match[2]),
				type: match[1].toLowerCase()
			});
		}

		if (otherTypes.test(link)) {
			var match = link.match(otherTypes);

			var type = match[1].toLowerCase();

			if (type in aliasOtherType) {
				type = aliasOtherType[type];
			}

			return resolve({
				id: parseInt(match[2]),
				type: type
			});
		}

		if (/^\d+$/.test(link)) {
			return resolve({
				id: parseInt(link),
				type: 'user'
			});
		}

		this.api.utils.resolveScreenName({
			screen_name: link.replace(replaceNotUri,'')
		})
		.then((screen) => {
			if (Array.isArray(screen)) {
				return reject(new Error('Ссылка недействительная!'));
			}

			resolve({
				id: parseInt(screen.object_id),
				type: screen.type
			});
		})
		.catch(reject);
	});
};
