// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export type VKAppPayloadContextType = 'vk_app_event';
// @ts-ignore

// @ts-ignore
export type VKAppPayloadContextSubType = 'app_payload';
// @ts-ignore

// @ts-ignore
export interface IVKAppPayloadPayload {
// @ts-ignore
	user_id: number;
// @ts-ignore
	app_id: number;
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	payload: any;
// @ts-ignore
	group_id: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type VKAppPayloadContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<IVKAppPayloadPayload, S>;
// @ts-ignore

// @ts-ignore
export class VKAppPayloadContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	IVKAppPayloadPayload,
// @ts-ignore
	S,
// @ts-ignore
	VKAppPayloadContextType,
// @ts-ignore
	VKAppPayloadContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public constructor(options: VKAppPayloadContextOptions<S>) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'vk_app_event',
// @ts-ignore
			subTypes: [
// @ts-ignore
				options.updateType as VKAppPayloadContextSubType
// @ts-ignore
			]
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier of the user whose action the event was sent to in the application
// @ts-ignore
	 */
// @ts-ignore
	public get userId(): number {
// @ts-ignore
		return this.payload.user_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier of the application from which the event was sent
// @ts-ignore
	 */
// @ts-ignore
	public get appId(): number {
// @ts-ignore
		return this.payload.app_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier of the community to which the notification was sent
// @ts-ignore
	 */
// @ts-ignore
	public get groupId(): number {
// @ts-ignore
		return this.payload.group_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the transferred useful data
// @ts-ignore
	 */
// @ts-ignore
	public get eventPayload(): number {
// @ts-ignore
		return this.payload.payload;
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
			'appId',
// @ts-ignore
			'groupId',
// @ts-ignore
			'eventPayload'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
