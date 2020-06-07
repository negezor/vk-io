import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

export type VKPayTransactionContextType = 'vk_pay_transaction';

export type VKPayTransactionContextSubType = 'vkpay_transaction';

export interface IVKPayTransactionPayload {
	from_id: number;
	amount: number;
	description: string;
	date: number;
}

export type VKPayTransactionContextOptions<S> =
	ContextFactoryOptions<IVKPayTransactionPayload, S>;

export class VKPayTransactionContext<S = ContextDefaultState>
	extends Context<
	IVKPayTransactionPayload,
	S,
	VKPayTransactionContextType,
	VKPayTransactionContextSubType
	> {
	public constructor(options: VKPayTransactionContextOptions<S>) {
		super({
			...options,

			type: 'vk_pay_transaction',
			subTypes: [
				options.updateType as VKPayTransactionContextSubType
			]
		});
	}

	/**
	 * Returns the identifier transfer sender
	 */
	public get fromId(): number {
		return this.payload.from_id;
	}

	/**
	 * Returns the transfer amount in thousandths of a ruble
	 */
	public get amount(): number {
		return this.payload.amount;
	}

	/**
	 * Returns the description on the translation
	 */
	public get description(): string {
		return this.payload.description;
	}

	/**
	 * Returns the unixtime transfer time
	 */
	public get createdAt(): number {
		return this.payload.date;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'fromId',
			'amount',
			'description',
			'createdAt'
		]);
	}
}
