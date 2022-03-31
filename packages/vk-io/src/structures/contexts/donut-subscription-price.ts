// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export type DonutSubscriptionPriceContextType = 'donut_subscription_price';
// @ts-ignore

// @ts-ignore
export type DonutSubscriptionPriceContextSubType = 'donut_subscription_price_changed';
// @ts-ignore

// @ts-ignore
export interface IDonutSubscriptionPriceContextPayload {
// @ts-ignore
	user_id: number;
// @ts-ignore

// @ts-ignore
	amount_old: number;
// @ts-ignore
	amount_new: number;
// @ts-ignore
	amount_diff: number;
// @ts-ignore
	amount_diff_without_fee: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type DonutSubscriptionPriceContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<IDonutSubscriptionPriceContextPayload, S>;
// @ts-ignore

// @ts-ignore
export class DonutSubscriptionPriceContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	IDonutSubscriptionPriceContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	DonutSubscriptionPriceContextType,
// @ts-ignore
	DonutSubscriptionPriceContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public constructor(options: DonutSubscriptionPriceContextOptions<S>) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'donut_subscription_price',
// @ts-ignore
			subTypes: [
// @ts-ignore
				options.updateType as DonutSubscriptionPriceContextSubType
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
	 * Checks if subscription changed
// @ts-ignore
	 */
// @ts-ignore
	public get isChanged(): boolean {
// @ts-ignore
		return this.is(['donut_subscription_price_changed']);
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
	 * Returns the old amount
// @ts-ignore
	 */
// @ts-ignore
	public get oldAmount(): number {
// @ts-ignore
		return this.payload.amount_old;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the new amount
// @ts-ignore
	 */
// @ts-ignore
	public get newAmount(): number {
// @ts-ignore
		return this.payload.amount_new;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the diff amount
// @ts-ignore
	 */
// @ts-ignore
	public get diffAmount(): number {
// @ts-ignore
		return this.payload.amount_diff;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the diff amount without fee
// @ts-ignore
	 */
// @ts-ignore
	public get diffAmountWithoutFee(): number {
// @ts-ignore
		return this.payload.amount_diff_without_fee;
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
			'isChanged',
// @ts-ignore
			'userId',
// @ts-ignore
			'oldAmount',
// @ts-ignore
			'newAmount',
// @ts-ignore
			'diffAmount',
// @ts-ignore
			'diffAmountWithoutFee'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
