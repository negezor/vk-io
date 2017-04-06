'use strict';

/**
 * Собирает прикрипление из переданных значений
 *
 * @param {string} type
 * @param {mixed}  attachment
 *
 * @return {string}
 */
exports.getAttachment = (type,attachment) => {
	return type+attachment.owner_id+'_'+attachment.id;
};

/**
 * Возвращает ссылку на маленькую фотографию
 *
 * @param {Object} photo
 *
 * @return {string}
 */
const getSmallPhoto = (photo) => {
	return photo.photo_130 || photo.photo_75;
};

exports.getSmallPhoto = getSmallPhoto;

/**
 * Возвращает ссылку на среднюю фотографию
 *
 * @param {Object} photo
 *
 * @return {string}
 */
const getMediumPhoto = (photo) => {
	return photo.photo_807 || photo.photo_604 || getSmallPhoto(photo);
};

exports.getMediumPhoto = getMediumPhoto;

/**
 * Возвращает ссылку на большую фотографию
 *
 * @param {Object} photo
 *
 * @return {string}
 */
exports.getLargePhoto = (photo) => {
	return photo.photo_2560 || photo.photo_1280 || getMediumPhoto(photo);
};
