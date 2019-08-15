import Context, { IContextOptions } from './context';

import { copyParams } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

export interface IVKPayTransactionPayload {
	from_id: number;
	amount: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	description: string;
	date: number;
}

export type VKPayTransactionContextOptions<S> =
	Omit<IContextOptions<IVKPayTransactionPayload, S>, 'type' | 'subTypes'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class VKPayTransactionContext<S = Record<string, any>>
	extends Context<IVKPayTransactionPayload, S> {
	public constructor(options: VKPayTransactionContextOptions<S>) {
		super({
			...options,

			type: 'vk_pay_transaction',
			subTypes: ['vk_pay_transfer']
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
	public [inspectCustomData](): object {
		return copyParams(this, [
			'fromId',
			'amount',
			'description',
			'createdAt'
		]);
	}
}
