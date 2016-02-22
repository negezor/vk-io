'use strict';

/* Основные настройки */
exports.settings = {
	/* Идентификатор пользователя */
	id: null,
	/* Email/логин/телефон от аккаунта */
	email: null,
	/* Пароль от аккаунта */
	pass: null,
	/* Токен */
	token: null,
	/* Приложения для авторизации */
	app: null,
	/* Секретный ключ приложения */
	key: null,
	/* Версия vk api */
	version: 5.45,
	/* Лимит запросов в секунду */
	limit: 3
};

/**
 * Устанавливает настройки модуля
 * @param {object} object настройки
 * @returns {object} текущий объект
 */
exports.setting = function(object){
	/* Наследуем конфиг */
	Object.assign(this.settings,object);

	return this;
};