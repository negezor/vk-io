import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

export type DonutSubscriptionPriceContextType = 'donut_subscription_price';

export type DonutSubscriptionPriceContextSubType = 'donut_subscription_price_changed';

export interface IDonutSubscriptionPriceContextPayload {
	user_id: number;

	amount_old: number;
	amount_new: number;
	amount_diff: number;
	amount_diff_without_fee: number;
}

export type DonutSubscriptionPriceContextOptions<S> =
	ContextFactoryOptions<IDonutSubscriptionPriceContextPayload, S>;

export class DonutSubscriptionPriceContext<S = ContextDefaultState>
	extends Context<
	IDonutSubscriptionPriceContextPayload,
	S,
	DonutSubscriptionPriceContextType,
	DonutSubscriptionPriceContextSubType
	> {
	public constructor(options: DonutSubscriptionPriceContextOptions<S>) {
		super({
			...options,

			type: 'donut_subscription_price',
			subTypes: [
				options.updateType as DonutSubscriptionPriceContextSubType
			]
		});
	}

	/**
	 * Checks if subscription changed
	 */
	public get isChanged(): boolean {
		return this.is(['donut_subscription_price_changed']);
	}

	/**
	 * Returns the id of the user who interacts with the vk donut
	 */
	public get userId(): number {
		return this.payload.user_id;
	}

	/**
	 * Returns the old amount
	 */
	public get oldAmount(): number {
		return this.payload.amount_old;
	}

	/**
	 * Returns the new amount
	 */
	public get newAmount(): number {
		return this.payload.amount_new;
	}

	/**
	 * Returns the diff amount
	 */
	public get diffAmount(): number {
		return this.payload.amount_diff;
	}

	/**
	 * Returns the diff amount without fee
	 */
	public get diffAmountWithoutFee(): number {
		return this.payload.amount_diff_without_fee;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'isChanged',
			'userId',
			'oldAmount',
			'newAmount',
			'diffAmount',
			'diffAmountWithoutFee'
		]);
	}
}
