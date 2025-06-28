import { Context, type ContextDefaultState, type ContextFactoryOptions } from './context';

import { kSerializeData } from '../../utils/constants';

import { pickProperties } from '../../utils/helpers';

export type DonutWithdrawContextType = 'donut_withdraw';

export type DonutWithdrawContextSubType = 'donut_money_withdraw' | 'donut_money_withdraw_error';

export interface IDonutWithdrawContextPayload {
    reason?: string;

    amount?: number;
    amount_without_fee?: number;
}

export type DonutWithdrawContextOptions<S> = ContextFactoryOptions<IDonutWithdrawContextPayload, S>;

export class DonutWithdrawContext<S = ContextDefaultState> extends Context<
    IDonutWithdrawContextPayload,
    S,
    DonutWithdrawContextType,
    DonutWithdrawContextSubType
> {
    public constructor(options: DonutWithdrawContextOptions<S>) {
        super({
            ...options,

            type: 'donut_withdraw',
            subTypes: [options.updateType as DonutWithdrawContextSubType],
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
        // biome-ignore lint/style/noNonNullAssertion: always present
        return this.payload.amount!;
    }

    /**
     * Returns the amount without fee
     */
    public get amountWithoutFee(): number {
        // biome-ignore lint/style/noNonNullAssertion: always present
        return this.payload.amount_without_fee!;
    }

    /**
     * Returns the reason for the error
     */
    public get reason(): string | undefined {
        return this.payload.reason;
    }

    /**
     * Returns the custom data
     */
    public [kSerializeData](): object {
        return pickProperties(this, ['isError', 'amount', 'amountWithoutFee', 'reason']);
    }
}
