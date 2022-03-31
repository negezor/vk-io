// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export type FriendActivityContextType = 'friend_activity';
// @ts-ignore

// @ts-ignore
export type FriendActivityContextSubType =
// @ts-ignore
'friend_online'
// @ts-ignore
| 'friend_offline'
// @ts-ignore
| 'friend_invisible';
// @ts-ignore

// @ts-ignore
const subTypes: Record<number, FriendActivityContextSubType> = {
// @ts-ignore
	8: 'friend_online',
// @ts-ignore
	9: 'friend_offline',
// @ts-ignore
	81: 'friend_invisible'
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
export interface IFriendActivityContextPayload {
// @ts-ignore
	user_id: number;
// @ts-ignore
	date: number;
// @ts-ignore
	extra: number;
// @ts-ignore
	app_id: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type FriendActivityContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<[number, number, number, number, number], S>;
// @ts-ignore

// @ts-ignore
export class FriendActivityContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	IFriendActivityContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	FriendActivityContextType,
// @ts-ignore
	FriendActivityContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public constructor(options: FriendActivityContextOptions<S>) {
// @ts-ignore
		const [eventId, userId, extra, date, appId] = options.payload;
// @ts-ignore

// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'friend_activity',
// @ts-ignore
			subTypes: [
// @ts-ignore
				subTypes[eventId]
// @ts-ignore
			],
// @ts-ignore

// @ts-ignore
			payload: {
// @ts-ignore
				user_id: -userId,
// @ts-ignore
				extra,
// @ts-ignore
				date,
// @ts-ignore
				app_id: appId
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks that the user is online
// @ts-ignore
	 */
// @ts-ignore
	public get isOnline(): boolean {
// @ts-ignore
		return this.subTypes.includes('friend_online');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks that the user is online
// @ts-ignore
	 */
// @ts-ignore
	public get isOffline(): boolean {
// @ts-ignore
		return this.subTypes.includes('friend_offline');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks that the user is invisible
// @ts-ignore
	 */
// @ts-ignore
	public get isInvisible(): boolean {
// @ts-ignore
		return this.subTypes.includes('friend_invisible')
// @ts-ignore
			? Boolean(this.payload.extra)
// @ts-ignore
			: false;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks that the user has logged out of the network himself
// @ts-ignore
	 */
// @ts-ignore
	public get isSelfLeave(): boolean {
// @ts-ignore
		return this.isOffline && !this.payload.extra;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks that the user logged out a timeout
// @ts-ignore
	 */
// @ts-ignore
	public get isTimeoutLeave(): boolean {
// @ts-ignore
		return this.isOffline && Boolean(this.payload.extra);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the friend id
// @ts-ignore
	 */
// @ts-ignore
	public get userId(): number | undefined {
// @ts-ignore
		return this.payload.user_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier of the application from which the friend was online
// @ts-ignore
	 */
// @ts-ignore
	public get applicationId(): number {
// @ts-ignore
		return this.payload.app_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the date when this event was created
// @ts-ignore
	 */
// @ts-ignore
	public get eventAt(): number {
// @ts-ignore
		return this.payload.date;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the platform from which the user entered
// @ts-ignore
	 *
// @ts-ignore
	 * - `1` - m.vk.com or other unknown application
// @ts-ignore
	 * - `2` - iPhone
// @ts-ignore
	 * - `3` - iPad
// @ts-ignore
	 * - `4` - Android
// @ts-ignore
	 * - `5` - Windows Phone
// @ts-ignore
	 * - `6` - Windows
// @ts-ignore
	 * - `7` - vk.com or other unknown application
// @ts-ignore
	 */
// @ts-ignore
	public get platform(): number | undefined {
// @ts-ignore
		const { extra } = this.payload;
// @ts-ignore

// @ts-ignore
		return extra !== -1
// @ts-ignore
			? extra
// @ts-ignore
			: undefined;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the custom data
// @ts-ignore
	 */
// @ts-ignore
	public [kSerializeData](): object {
// @ts-ignore
		return pickProperties(this, [
// @ts-ignore
			'userId',
// @ts-ignore
			'eventAt',
// @ts-ignore
			'platform',
// @ts-ignore
			'isSelfLeave',
// @ts-ignore
			'isTimeoutLeave',
// @ts-ignore
			'isOnline',
// @ts-ignore
			'isOffline',
// @ts-ignore
			'isInvisible'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
