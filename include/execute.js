'use strict';

/**
 * Выполняет хранимую процедуру на сервере
 * @param   {string} name   название процедуры
 * @param   {object} params параметры
 * @returns {object} promise
 */
exports.execute = function(name,params){
	return this._api('execute.'+name,params);
};