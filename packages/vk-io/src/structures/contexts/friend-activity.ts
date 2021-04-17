import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

export type FriendActivityContextType = 'friend_activity';

export type FriendActivityContextSubType =
'friend_online'
| 'friend_offline'
| 'friend_invisible';

const subTypes: Record<number, FriendActivityContextSubType> = {
	8: 'friend_online',
	9: 'friend_offline',
	81: 'friend_invisible'
};

export interface IFriendActivityContextPayload {
	user_id: number;
	date: number;
	extra: number;
	app_id: number;
}

export type FriendActivityContextOptions<S> =
	ContextFactoryOptions<[number, number, number, number, number], S>;

export class FriendActivityContext<S = ContextDefaultState>
	extends Context<
	IFriendActivityContextPayload,
	S,
	FriendActivityContextType,
	FriendActivityContextSubType
	> {
	public constructor(options: FriendActivityContextOptions<S>) {
		const [eventId, userId, extra, date, appId] = options.payload;

		super({
			...options,

			type: 'friend_activity',
			subTypes: [
				subTypes[eventId]
			],

			payload: {
				user_id: -userId,
				extra,
				date,
				app_id: appId
			}
		});
	}

	/**
	 * Checks that the user is online
	 */
	public get isOnline(): boolean {
		return this.subTypes.includes('friend_online');
	}

	/**
	 * Checks that the user is online
	 */
	public get isOffline(): boolean {
		return this.subTypes.includes('friend_offline');
	}

	/**
	 * Checks that the user is invisible
	 */
	public get isInvisible(): boolean {
		return this.subTypes.includes('friend_invisible')
			? Boolean(this.payload.extra)
			: false;
	}

	/**
	 * Checks that the user has logged out of the network himself
	 */
	public get isSelfLeave(): boolean {
		return this.isOffline && !this.payload.extra;
	}

	/**
	 * Checks that the user logged out a timeout
	 */
	public get isTimeoutLeave(): boolean {
		return this.isOffline && Boolean(this.payload.extra);
	}

	/**
	 * Returns the friend id
	 */
	public get userId(): number | undefined {
		return this.payload.user_id;
	}

	/**
	 * Returns the identifier of the application from which the friend was online
	 */
	public get applicationId(): number {
		return this.payload.app_id;
	}

	/**
	 * Returns the date when this event was created
	 */
	public get eventAt(): number {
		return this.payload.date;
	}

	/**
	 * Returns the platform from which the user entered
	 *
	 * - `1` - m.vk.com or other unknown application
	 * - `2` - iPhone
	 * - `3` - iPad
	 * - `4` - Android
	 * - `5` - Windows Phone
	 * - `6` - Windows
	 * - `7` - vk.com or other unknown application
	 */
	public get platform(): number | undefined {
		const { extra } = this.payload;

		return extra !== -1
			? extra
			: undefined;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'userId',
			'eventAt',
			'platform',
			'isSelfLeave',
			'isTimeoutLeave',
			'isOnline',
			'isOffline',
			'isInvisible'
		]);
	}
}
