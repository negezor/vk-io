'use strict';

/**
 * Собирает прикрипление из переданных значений
 *
 * @param {string} type
 * @param {mixed}  attachment
 *
 * @return {string}
 */
exports.getAttachment = (type, attachment) => (
	type + (attachment.owner_id===undefined?attachment.owner:attachment.owner_id) + '_' + attachment.id
);

/**
 * Возвращает ссылку на маленькую фотографию
 *
 * @param {Object} photo
 *
 * @return {string}
 */
const getSmallPhoto = (photo) => (
	photo.photo_130 || photo.photo_75 || photo.sizes.find(x => x.type == "s").url
);

exports.getSmallPhoto = getSmallPhoto;

/**
 * Возвращает ссылку на среднюю фотографию
 *
 * @param {Object} photo
 *
 * @return {string}
 */
const getMediumPhoto = (photo) => (
	photo.photo_807 || photo.photo_604 || photo.sizes.find(x => x.type == "m").url || getSmallPhoto(photo)
);

exports.getMediumPhoto = getMediumPhoto;

/**
 * Возвращает ссылку на большую фотографию
 *
 * @param {Object} photo
 *
 * @return {string}
 */
exports.getLargePhoto = (photo) => (
	photo.photo_2560 || photo.photo_1280 || photo.sizes.find(x => x.type == "r").url || photo.sizes.find(x => x.type == "x").url || getMediumPhoto(photo)
);
