'use strict';

const { inspect } = require('util');

const { SHEAR_CHAT_PEER } = require('../util/constants');
const {
	parseFlags,
	parseAttachments,
	parseFwds,
	unescape
} = require('./helpers');

/**
 * Заменяет тег <br> на \n
 */
const brReplace = /<br>/g;

/**
 * Базовай класс сообщений ВКонтакте
 *
 * @private
 */
class BaseMessage {
	/**
	 * Конструктор
	 *
	 * @param {VK}    vk
	 * @param {Array} message
	 */
	constructor (vk, message) {
		this.vk = vk;

		this.id = +message[1];

		this.date = +message[4];
		this.peer = +message[3];
	}

	/**
	 * Отправляет сообщение
	 *
	 * @param {mixed}  text
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	send (text, params = {}) {
		if (typeof text === 'object') {
			params = text;
		} else {
			params.message = text;
		}

		params.peer_id = this.peer;

		return this.vk.api.messages.send(params);
	}

	/**
	 * Отправляет стикер в текущий диалог
	 *
	 * @param {number} id
	 *
	 * @return {Promise}
	 */
	sendSticker (id) {
		return this.send({
			sticker_id: id
		});
	}

	/**
	 * Отправляет фотографию в диалог
	 *
	 * @param {mixed}  source
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	sendPhoto (source, params = {}) {
		return this.vk.upload.message({
			source
		})
		.then((photo) => (
			this.vk.getAttachment('photo', photo)
		))
		.then((attachment) => (
			this.send(Object.assign(params, { attachment }))
		));
	}

	/**
	 * Изменяет статус набора текста пользователем в диалоге
	 *
	 * @param {Promise}
	 */
	setActivity () {
		return this.vk.api.messages.setActivity({
			type: 'typing',
			peer_id: this.peer
		});
	}

	/**
	 * Возвращает свойства которые нужно вывести
	 *
	 * @param {number} depth
	 * @param {Object} options
	 *
	 * @return {Object}
	 */
	inspect (depth, options) {
		return {
			id: this.id,
			date: this.date,
			peer: this.peer
		};
	}
}

/**
 * Базовый класс для всех событий чата
 *
 * @private
 */
class ChatEvent extends BaseMessage {
	/**
	 * Конструктор
	 *
	 * @param {VK}    vk
	 * @param {Array} message
	 */
	constructor (vk, message) {
		super(vk, message);

		this.user = +message[7].from;
		this.chat = this.peer - SHEAR_CHAT_PEER;
		this.title = unescape(message[5]);
	}

	/**
	 * Возвращает свойства которые нужно вывести
	 *
	 * @param  {number} depth
	 * @param  {Object} options
	 *
	 * @return {Object}
	 */
	inspect (depth, options) {
		return Object.assign(super.inspect(depth, options), {
			user: this.user,
			chat: this.chat,
			title: this.title
		});
	}
}

/**
 * Сообщение
 *
 * @public
 */
class Message extends BaseMessage {
	/**
	 * Конструктор
	 *
	 * @param {VK}     vk
	 * @param {Object} message
	 */
	constructor (vk, message) {
		super(vk, message);

		this.chat = null;

		const attachments = message[7];

		if (this.peer > SHEAR_CHAT_PEER) {
			this.user = +attachments.from;
			this.title = unescape(message[5]);

			this.chat = this.peer - SHEAR_CHAT_PEER;

			this.from = 'chat';
		} else if (this.peer < 0) {
			this.user = null;
			this.title = null;

			this.admin = +attachments.from_admin;

			this.from = 'group';
		} else {
			this.user = this.peer;
			this.title = null;

			this.from = 'dialog';
		}

		if (message[6].length !== 0) {
			this.text = unescape(message[6]).replace(brReplace, '\n');
		} else {
			this.text = null;
		}

		this.flags = parseFlags(message[2], this.isGroup());
		this.attachments = parseAttachments(attachments);

		this.hasEmoji = 'emoji' in attachments;

		if ('geo' in attachments) {
			this.attachments.geo = {
				id: attachments.geo,
				provider: +attachments.geo_provider
			};
		}

		this._fwd = attachments.fwd || null;
	}

	/**
	 * Отвечает на сообщение
	 *
	 * @param {mixed}  text
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	reply (text, params = {}) {
		if (typeof text === 'object') {
			params = text;
		} else {
			params.message = text;
		}

		params.forward_messages = this.id;

		return this.send(params);
	}

	/**
	 * Проверяет наличие флага
	 *
	 * @param {string} name
	 *
	 * @return {boolean}
	 */
	hasFlag (name) {
		return this.flags.includes(name);
	}

	/**
	 * Проверяет наличие прикриплений
	 *
	 * @return {boolean}
	 */
	hasAttachments () {
		return Object.keys(this.attachments).length > 0;
	}

	/**
	 * Проверяет наличие прикрипления
	 *
	 * @param {string} name
	 *
	 * @return {boolean}
	 */
	hasAttachment (name) {
		return name in this.attachments;
	}

	/**
	 * Проверяет наличие пересылаемых сообщений
	 *
	 * @return {boolean}
	 */
	hasFwd () {
		return this._fwd !== null;
	}

	/**
	 * Сообщение из диалога
	 *
	 * @return {boolean}
	 */
	isDialog () {
		return this.from === 'dialog';
	}

	/**
	 * Сообщение из беседы
	 *
	 * @return {boolean}
	 */
	isChat () {
		return this.from === 'chat';
	}

	/**
	 * Сообщения из сообщества
	 *
	 * @return {boolean}
	 */
	isGroup () {
		return this.from === 'group';
	}

	/**
	 * Возвращает пересылаемые сообщения
	 *
	 * @return {Array}
	 */
	getFwd () {
		if (!this.hasFwd()) {
			return [];
		}

		if (Array.isArray(this._fwd)) {
			return this._fwd;
		}

		this._fwd = parseFwds(this._fwd);

		return this._fwd;
	}

	/**
	 * Возвращает свойства которые нужно вывести
	 *
	 * @return object
	 */
	inspect (depth, options) {
		const print = Object.assign(super.inspect(depth, options), {
			user: this.user,
			chat: this.chat,
			title: this.title,
			text: this.text,
			from: this.from,
			hasEmoji: this.hasEmoji,
			flags: this.flags,
			attachments: this.attachments
		});

		return this.constructor.name + ' ' + inspect(print, options);
	}
}

exports.Message = Message;

/**
 * Создание чата
 *
 * @public
 */
class ChatCreate extends ChatEvent {
	/**
	 * Конструктор
	 *
	 * @param {VK}    vk
	 * @param {Array} message
	 */
	constructor (vk, message) {
		super(vk, message);

		this.title = unescape(message[7].source_text);
	}

	/**
	 * Возвращает свойства которые нужно вывести
	 *
	 * @param  {number} depth
	 * @param  {Object} options
	 *
	 * @return {Object}
	 */
	inspect (depth, options) {
		return this.constructor.name + ' ' + inspect(
			super.inspect(depth, options),
			options
		);
	}
}

/**
 * Обновлено название беседы
 *
 * @public
 */
class TitleUpdate extends ChatEvent {
	/**
	 * Конструктор
	 *
	 * @param {VK}    vk
	 * @param {Array} message
	 */
	constructor (vk, message) {
		super(vk, message);

		this.title = unescape(message[7].source_text);
	}

	/**
	 * Обновляет название беседы
	 *
	 * @param {string} title
	 *
	 * @return {Promise}
	 */
	rename (title) {
		return this.vk.api.messages.editChat({
			chat_id: this.chat,
			title: title
		});
	}

	/**
	 * Возвращает свойства которые нужно вывести
	 *
	 * @param {number} depth
	 * @param {Object} options
	 *
	 * @return {Object}
	 */
	inspect (depth, options) {
		return this.constructor.name + ' ' + inspect(
			super.inspect(depth, options),
			options
		);
	}
}

/**
 * Обновлена фотография беседы
 *
 * @public
 */
class PhotoUpdate extends ChatEvent {
	/**
	 * Конструктор
	 *
	 * @param {VK}    vk
	 * @param {Array} message
	 */
	constructor (vk, message) {
		super(vk, message);

		const [onwer, id] = message[7].attach1.split('_');

		this.photo = {
			id: +id,
			owner: +onwer
		};
	}

	/**
	 * Удаляет фотографию беседы
	 *
	 * @return {Promise}
	 */
	remove () {
		return this.vk.api.messages.deleteChatPhoto({
			chat_id: this.chat
		});
	}

	/**
	 * Возвращает свойства которые нужно вывести
	 *
	 * @param {number} depth
	 * @param {Object} options
	 *
	 * @return {Object}
	 */
	inspect (depth, options) {
		const print = Object.assign(super.inspect(depth, options), {
			photo: this.photo
		});

		return this.constructor.name + ' ' + inspect(print, options);
	}
}

/**
 * Удаление фотографии беседы
 */
class PhotoRemove extends ChatEvent {
	/**
	 * Возвращает свойства которые нужно вывести
	 *
	 * @param {number} depth
	 * @param {Object} options
	 *
	 * @return {string}
	 */
	inspect (depth, options) {
		return this.constructor.name + ' ' + inspect(
			super.inspect(depth, options),
			options
		);
	}
}

/**
 * Добавлен пользователь в беседу
 */
class InviteUser extends ChatEvent {
	/**
	 * Конструктор
	 *
	 * @param {VK}    vk
	 * @param {Array} message
	 */
	constructor (vk, message) {
		super(vk, message);

		this.invite = +message[7].source_mid;
	}

	/**
	 * Исключает пользователя
	 *
	 * @param {number} id
	 *
	 * @return {Promise}
	 */
	kick (id = this.invite) {
		return this.vk.api.messages.removeChatUser({
			chat_id: this.chat,
			user_id: id
		});
	}

	/**
	 * Возвращает свойства которые нужно вывести
	 *
	 * @param {number} depth
	 * @param {Object} options
	 *
	 * @return {Object}
	 */
	inspect (depth, options) {
		const print = Object.assign(super.inspect(depth, options), {
			invite: this.invite
		});

		return this.constructor.name + ' ' + inspect(print, options);
	}
}

/**
 * Исключен пользователь из беседы
 */
class KickUser extends ChatEvent {
	/**
	 * Конструктор
	 *
	 * @param {VK}    vk
	 * @param {Array} message
	 */
	constructor (vk, message) {
		super(vk, message);

		this.kick = +message[7].source_mid;
	}

	/**
	 * Приглашает пользователя обратко
	 *
	 * @param {number} id
	 *
	 * @return {Promise}
	 */
	invite (id = this.kick) {
		return this.vk.api.messages.addChatUser({
			chat_id: this.chat,
			user_id: id
		});
	}

	/**
	 * Возвращает свойства которые нужно вывести
	 *
	 * @param {number} depth
	 * @param {Object} options
	 *
	 * @return {Object}
	 */
	inspect (depth, options) {
		const print = Object.assign(super.inspect(depth, options), {
			kick: this.kick
		});

		return this.constructor.name + ' ' + inspect(print, options);
	}
}

/**
 * Обработчики событий чата
 */
exports.actions = {
	chat_create: (vk, message) => (
		[new ChatCreate(vk, message), 'chat.create']
	),

	chat_title_update: (vk, message) => (
		[new TitleUpdate(vk, message), 'chat.rename']
	),

	chat_photo_update: (vk, message) => (
		[new PhotoUpdate(vk, message), 'chat.photo.update']
	),
	/* Это не стандартизировано */
	chat_photo_remove: (vk, message) => (
		[new PhotoRemove(vk, message), 'chat.photo.remove']
	),

	chat_invite_user: (vk, message) => (
		[new InviteUser(vk, message), 'chat.invite']
	),

	chat_kick_user: (vk, message) => (
		[new KickUser(vk, message), 'chat.kick']
	)
};
