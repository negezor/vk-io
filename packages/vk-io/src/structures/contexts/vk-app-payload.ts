import Context, { IContextOptions } from './context';

import { copyParams } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

export interface IVKAppPayloadPayload {
	user_id: number;
	app_id: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload: any;
	group_id: number;
}

export type VKAppPayloadContextOptions<S> =
	Omit<IContextOptions<IVKAppPayloadPayload, S>, 'type' | 'subTypes'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class VKAppPayloadContext<S = Record<string, any>>
	extends Context<IVKAppPayloadPayload, S> {
	public constructor(options: VKAppPayloadContextOptions<S>) {
		super({
			...options,

			type: 'vk_app_event',
			subTypes: ['vk_app_payload']
		});
	}

	/**
	 * Returns the identifier of the user whose action the event was sent to in the application
	 */
	public get userId(): number {
		return this.payload.user_id;
	}

	/**
	 * Returns the identifier of the application from which the event was sent
	 */
	public get appId(): number {
		return this.payload.app_id;
	}

	/**
	 * Returns the identifier of the community to which the notification was sent
	 */
	public get groupId(): number {
		return this.payload.group_id;
	}

	/**
	 * Returns the transferred useful data
	 */
	public get eventPayload(): number {
		return this.payload.payload;
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		return copyParams(this, [
			'userId',
			'appId',
			'groupId',
			'eventPayload'
		]);
	}
}
