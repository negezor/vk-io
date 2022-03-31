// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export type DonutSubscriptionContextType = 'donut_subscription';
// @ts-ignore

// @ts-ignore
export type DonutSubscriptionContextSubType =
// @ts-ignore
'donut_subscription_create'
// @ts-ignore
| 'donut_subscription_prolonged'
// @ts-ignore
| 'donut_subscription_expired'
// @ts-ignore
| 'donut_subscription_cancelled';
// @ts-ignore

// @ts-ignore
export interface IDonutSubscriptionContextPayload {
// @ts-ignore
	user_id: number;
// @ts-ignore

// @ts-ignore
	amount?: number;
// @ts-ignore
	amount_without_fee?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type DonutSubscriptionContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<IDonutSubscriptionContextPayload, S>;
// @ts-ignore

// @ts-ignore
export class DonutSubscriptionContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	IDonutSubscriptionContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	DonutSubscriptionContextType,
// @ts-ignore
	DonutSubscriptionContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public constructor(options: DonutSubscriptionContextOptions<S>) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'donut_subscription',
// @ts-ignore
			subTypes: [
// @ts-ignore
				options.updateType as DonutSubscriptionContextSubType
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
	 * Checks if subscription created
// @ts-ignore
	 */
// @ts-ignore
	public get isCreated(): boolean {
// @ts-ignore
		return this.is(['donut_subscription_create']);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if subscription prolonged
// @ts-ignore
	 */
// @ts-ignore
	public get isProlonged(): boolean {
// @ts-ignore
		return this.is(['donut_subscription_prolonged']);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if subscription expired
// @ts-ignore
	 */
// @ts-ignore
	public get isExpired(): boolean {
// @ts-ignore
		return this.is(['donut_subscription_expired']);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if subscription cancelled
// @ts-ignore
	 */
// @ts-ignore
	public get isCancelled(): boolean {
// @ts-ignore
		return this.is(['donut_subscription_cancelled']);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the id of the user who interacts with the vk donut
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
	 * Returns the amount
// @ts-ignore
	 */
// @ts-ignore
	public get amount(): number {
// @ts-ignore
		return this.payload.amount!;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the amount without fee
// @ts-ignore
	 */
// @ts-ignore
	public get amountWithoutFee(): number {
// @ts-ignore
		return this.payload.amount_without_fee!;
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
			'isCreated',
// @ts-ignore
			'isProlonged',
// @ts-ignore
			'isExpired',
// @ts-ignore
			'isCancelled',
// @ts-ignore
			'userId',
// @ts-ignore
			'amount',
// @ts-ignore
			'amountWithoutFee'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
