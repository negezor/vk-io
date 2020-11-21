import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

export type DonutWithdrawContextType = 'donut_withdraw';

export type DonutWithdrawContextSubType =
'donut_money_withdraw'
| 'donut_money_withdraw_error';

export interface IDonutWithdrawContextPayload {
	reason?: string;

	amount?: number;
	amount_without_fee?: number;
}

export type DonutWithdrawContextOptions<S> =
	ContextFactoryOptions<IDonutWithdrawContextPayload, S>;

export class DonutWithdrawContext<S = ContextDefaultState>
	extends Context<
	IDonutWithdrawContextPayload,
	S,
	DonutWithdrawContextType,
	DonutWithdrawContextSubType
	> {
	public constructor(options: DonutWithdrawContextOptions<S>) {
		super({
			...options,

			type: 'donut_withdraw',
			subTypes: [
				options.updateType as DonutWithdrawContextSubType
			]
		});
	}

	/**
	 * Checks if error for withdraw
	 */
	public get isError(): boolean {
		return this.is(['donut_money_withdraw_error']);
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
	 * Returns the reason for the error
	 */
	public get reason(): string {
		return this.payload.reason!;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'isError',
			'amount',
			'amountWithoutFee',
			'reason'
		]);
	}
}
