// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export type VKPayTransactionContextType = 'vk_pay_transaction';
// @ts-ignore

// @ts-ignore
export type VKPayTransactionContextSubType = 'vkpay_transaction';
// @ts-ignore

// @ts-ignore
export interface IVKPayTransactionPayload {
// @ts-ignore
	from_id: number;
// @ts-ignore
	amount: number;
// @ts-ignore
	description: string;
// @ts-ignore
	date: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type VKPayTransactionContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<IVKPayTransactionPayload, S>;
// @ts-ignore

// @ts-ignore
export class VKPayTransactionContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	IVKPayTransactionPayload,
// @ts-ignore
	S,
// @ts-ignore
	VKPayTransactionContextType,
// @ts-ignore
	VKPayTransactionContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public constructor(options: VKPayTransactionContextOptions<S>) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'vk_pay_transaction',
// @ts-ignore
			subTypes: [
// @ts-ignore
				options.updateType as VKPayTransactionContextSubType
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
	 * Returns the identifier transfer sender
// @ts-ignore
	 */
// @ts-ignore
	public get fromId(): number {
// @ts-ignore
		return this.payload.from_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the transfer amount in thousandths of a ruble
// @ts-ignore
	 */
// @ts-ignore
	public get amount(): number {
// @ts-ignore
		return this.payload.amount;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the description on the translation
// @ts-ignore
	 */
// @ts-ignore
	public get description(): string {
// @ts-ignore
		return this.payload.description;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the unixtime transfer time
// @ts-ignore
	 */
// @ts-ignore
	public get createdAt(): number {
// @ts-ignore
		return this.payload.date;
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
			'fromId',
// @ts-ignore
			'amount',
// @ts-ignore
			'description',
// @ts-ignore
			'createdAt'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
