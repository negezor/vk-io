import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties } from '../../utils/helpers';
import { platforms, inspectCustomData } from '../../utils/constants';

export type UserOnlineContextType = 'user_active';

export type UserOnlineContextSubType =
'user_online'
| 'user_offline';

const subTypes: Record<number, UserOnlineContextSubType> = {
	8: 'user_online',
	9: 'user_offline'
};

export interface IUserOnlineContextPayload {
	user_id: number;
	date: number;
	extra: number;
}

export type UserOnlineContextOptions<S> =
	ContextFactoryOptions<[number, number, number, number], S>;

export class UserOnlineContext<S = ContextDefaultState>
	extends Context<
	IUserOnlineContextPayload,
	S,
	UserOnlineContextType,
	UserOnlineContextSubType
	> {
	public constructor(options: UserOnlineContextOptions<S>) {
		const [eventId, userId, extra, date] = options.payload;

		super({
			...options,

			type: 'user_active',
			subTypes: [
				subTypes[eventId]
			],

			payload: {
				user_id: -userId,
				extra,
				date
			}
		});
	}

	/**
	 * Checks that the user is online
	 */
	public get isUserOnline(): boolean {
		return this.subTypes.includes('user_online');
	}

	/**
	 * Checks that the user is online
	 */
	public get isUserOffline(): boolean {
		return this.subTypes.includes('user_offline');
	}

	/**
	 * Checks that the user has logged out of the network himself
	 */
	public get isSelfExit(): boolean {
		return this.isUserOffline && !this.payload.extra;
	}

	/**
	 * Checks that the user logged out a timeout
	 */
	public get isTimeoutExit(): boolean {
		return this.isUserOffline && Boolean(this.payload.extra);
	}

	/**
	 * Returns the user id
	 */
	public get userId(): number | undefined {
		return this.payload.user_id;
	}

	/**
	 * Returns the date when this event was created
	 */
	public get createdAt(): number {
		return this.payload.date;
	}

	/**
	 * Returns the name of the platform from which the user entered
	 */
	public get platformName(): string {
		return platforms.get(this.payload.extra)!;
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		return pickProperties(this, [
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
