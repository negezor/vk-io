import Context, { IContextOptions } from './context';

import { copyParams } from '../../utils/helpers';
import { platforms, inspectCustomData } from '../../utils/constants';

const subTypes: Record<number, string> = {
	8: 'user_online',
	9: 'user_offline'
};

export interface IUserOnlineContextPayload {
	user_id: number;
	date: number;
	extra: number;
}

export type UserOnlineContextOptions<S> =
	Omit<IContextOptions<[number, number, number, number], S>, 'type' | 'subTypes'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class UserOnlineContext<S = Record<string, any>>
	extends Context<IUserOnlineContextPayload, S> {
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
	public get userId(): number | null {
		return this.payload.user_id || null;
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
