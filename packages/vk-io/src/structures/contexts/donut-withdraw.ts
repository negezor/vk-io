// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export type DonutWithdrawContextType = 'donut_withdraw';
// @ts-ignore

// @ts-ignore
export type DonutWithdrawContextSubType =
// @ts-ignore
'donut_money_withdraw'
// @ts-ignore
| 'donut_money_withdraw_error';
// @ts-ignore

// @ts-ignore
export interface IDonutWithdrawContextPayload {
// @ts-ignore
	reason?: string;
// @ts-ignore

// @ts-ignore
	amount?: number;
// @ts-ignore
	amount_without_fee?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type DonutWithdrawContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<IDonutWithdrawContextPayload, S>;
// @ts-ignore

// @ts-ignore
export class DonutWithdrawContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	IDonutWithdrawContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	DonutWithdrawContextType,
// @ts-ignore
	DonutWithdrawContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public constructor(options: DonutWithdrawContextOptions<S>) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'donut_withdraw',
// @ts-ignore
			subTypes: [
// @ts-ignore
				options.updateType as DonutWithdrawContextSubType
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
	 * Checks if error for withdraw
// @ts-ignore
	 */
// @ts-ignore
	public get isError(): boolean {
// @ts-ignore
		return this.is(['donut_money_withdraw_error']);
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
	 * Returns the reason for the error
// @ts-ignore
	 */
// @ts-ignore
	public get reason(): string {
// @ts-ignore
		return this.payload.reason!;
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
			'isError',
// @ts-ignore
			'amount',
// @ts-ignore
			'amountWithoutFee',
// @ts-ignore
			'reason'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
