'use strict';

/**
 * Устанавливает настройки модуля
 * @param {object} object настройки
 * @returns {object} текущий объект
 */
exports.setting = function(object){
	this.settings = this.extend(this.settings,object);

	return this;
};
