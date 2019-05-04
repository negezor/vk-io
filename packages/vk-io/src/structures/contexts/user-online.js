import Context from './context';

import { copyParams } from '../../utils/helpers';
import { platforms, inspectCustomData } from '../../utils/constants';

const subTypes = {
	8: 'user_online',
	9: 'user_offline'
};

export default class UserOnlineContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}     vk
	 * @param {Array}  payload
	 * @param {Object} options
	 */
	constructor(vk, [eventId, userId, extra, date]) {
		super(vk);

		this.payload = {
			user_id: -userId,
			extra,
			date
		};

		this.type = 'user_active';
		this.subTypes = [
			subTypes[eventId]
		];
	}

	/**
	 * Checks that the user is online
	 *
	 * @return {boolean}
	 */
	get isUserOnline() {
		return this.subTypes.includes('user_online');
	}

	/**
	 * Checks that the user is online
	 *
	 * @return {boolean}
	 */
	get isUserOffline() {
		return this.subTypes.includes('user_offline');
	}

	/**
	 * Checks that the user has logged out of the network himself
	 *
	 * @return {boolean}
	 */
	get isSelfExit() {
		return this.isUserOffline && !this.payload.extra;
	}

	/**
	 * Checks that the user logged out a timeout
	 *
	 * @return {boolean}
	 */
	get isTimeoutExit() {
		return this.isUserOffline && Boolean(this.payload.extra);
	}

	/**
	 * Returns the user id
	 *
	 * @return {?number}
	 */
	get userId() {
		return this.payload.user_id || null;
	}

	/**
	 * Returns the date when this event was created
	 *
	 * @return {number}
	 */
	get createdAt() {
		return this.payload.date;
	}

	/**
	 * Returns the name of the platform from which the user entered
	 *
	 * @return {?string}
	 */
	get platformName() {
		return platforms.get(this.payload.extra);
	}

	/**
	 * Returns the custom data
	 *
	 * @type {Object}
	 */
	[inspectCustomData]() {
		return copyParams(this, [
			'userId',
			'createdAt',
			'platformName',
			'isSelfExit',
			'isTimeoutExit',
			'isUserOnline',
			'isUserOffline'
		]);
	}
}
