import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

export type DonutSubscriptionContextType = 'donut_subscription';

export type DonutSubscriptionContextSubType =
'donut_subscription_create'
| 'donut_subscription_prolonged'
| 'donut_subscription_expired'
| 'donut_subscription_cancelled';

export interface IDonutSubscriptionContextPayload {
	user_id: number;

	amount?: number;
	amount_without_fee?: number;
}

export type DonutSubscriptionContextOptions<S> =
	ContextFactoryOptions<IDonutSubscriptionContextPayload, S>;

export class DonutSubscriptionContext<S = ContextDefaultState>
	extends Context<
	IDonutSubscriptionContextPayload,
	S,
	DonutSubscriptionContextType,
	DonutSubscriptionContextSubType
	> {
	public constructor(options: DonutSubscriptionContextOptions<S>) {
		super({
			...options,

			type: 'donut_subscription',
			subTypes: [
				options.updateType as DonutSubscriptionContextSubType
			]
		});
	}

	/**
	 * Checks if subscription created
	 */
	public get isCreated(): boolean {
		return this.is(['donut_subscription_create']);
	}

	/**
	 * Checks if subscription prolonged
	 */
	public get isProlonged(): boolean {
		return this.is(['donut_subscription_prolonged']);
	}

	/**
	 * Checks if subscription expired
	 */
	public get isExpired(): boolean {
		return this.is(['donut_subscription_expired']);
	}

	/**
	 * Checks if subscription cancelled
	 */
	public get isCancelled(): boolean {
		return this.is(['donut_subscription_cancelled']);
	}

	/**
	 * Returns the id of the user who interacts with the vk donut
	 */
	public get userId(): number {
		return this.payload.user_id;
	}

	/**
	 * Returns the amount
	 */
	public get amount(): number {
		return this.payload.amount!;
	}

	/**
	 * Returns the amount without fee
	 */
	public get amountWithoutFee(): number {
		return this.payload.amount_without_fee!;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'isCreated',
			'isProlonged',
			'isExpired',
			'isCancelled',
			'userId',
			'amount',
			'amountWithoutFee'
		]);
	}
}
