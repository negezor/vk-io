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

/**
 * Возвращает ссылку на маленькую фотографию
 *
 * @param object photo
 *
 * @return string
 */
const getSmallPhoto = (photo) => {
	return photo.photo_130 || photo.photo_75;
};

exports.getSmallPhoto = getSmallPhoto;

/**
 * Возвращает ссылку на среднюю фотографию
 *
 * @param object photo
 *
 * @return string
 */
const getMediumPhoto = (photo) => {
	return photo.photo_807 || photo.photo_604 || getSmallPhoto(photo);
};

exports.getMediumPhoto = getMediumPhoto;

/**
 * Возвращает ссылку на большую фотографию
 *
 * @param object photo
 *
 * @return string
 */
exports.getLargePhoto = (photo) => {
	return photo.photo_2560 || photo.photo_1280 || getMediumPhoto(photo);
};

/**
 * Собирает прикрипление из переданных значений
 *
 * @param string type
 *
 * @return mixed
 */
const getAttachment = (type,object) => {
	return type+object.owner_id+'_'+object.id;
};

exports.getAttachment = (type,objects) => {
	type = type.toLowerCase();

	if (Array.isArray(objects)) {
		return objects.map((object) => {
			return getAttachment(type,object);
		});
	}

	return getAttachment(type,objects);
};
