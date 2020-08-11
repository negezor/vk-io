import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { IMarketAttachmentPayload, MarketAttachment } from '../attachments';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

export type MarketOrderContextType = 'market_order';

export type MarketOrderContextSubType = 'market_order_new' | 'market_order_edit';

export interface IMarketOrderContextPayload {
	id: number;

	group_id: number;
	user_id: number;

	display_order_id: number;
	variants_grouping_id: number;

	is_main_variant: boolean;
	property_values: {
		variant_id: number;
		variant_name: string;
		property_name : string;
	}[];
	cart_quantity: number;
	status: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	total_price: {
		amount: string;
		currency: {
			id: number;
			name: string;
		};
		text: string;
	};
	comment: string;
	preview_order_items: IMarketAttachmentPayload[];
	delivery: {
		address: string;
		type: string;
		track_number: string;
		track_link: string;
		delivery_point: {};
	};
	recipient: {
		name: string;
		phone: string;
		display_text : string;
	};
	date: number;
}

export type MarketOrderContextOptions<S> =
	ContextFactoryOptions<IMarketOrderContextPayload, S>;

export class MarketOrderContext<S = ContextDefaultState>
	extends Context<
	IMarketOrderContextPayload,
	S,
	MarketOrderContextType,
	MarketOrderContextSubType
	> {
	public previewOrderItems: MarketAttachment[];

	public constructor(options: MarketOrderContextOptions<S>) {
		super({
			...options,

			type: 'market_order',
			subTypes: [
				options.updateType as MarketOrderContextSubType
			]
		});

		this.previewOrderItems = this.payload.preview_order_items.map(market => (
			new MarketAttachment({
				api: this.api,
				payload: market
			})
		));
	}

	/**
	 * Checks if the variation is the primary one.
	 */
	public get isMainVariant(): boolean {
		return Boolean(this.payload.is_main_variant);
	}

	/**
	 * Returns the order identifier
	 */
	public get id(): number {
		return this.payload.id;
	}

	/**
	 * Returns the group identifier
	 */
	public get groupId(): number {
		return this.payload.group_id;
	}

	/**
	 * Returns the user identifier
	 */
	public get userId(): number {
		return this.payload.user_id;
	}

	/**
	 * Returns the order number consisting of the customer identifier and the order identifier.
	 */
	public get displayOrderId(): number {
		return this.payload.display_order_id;
	}

	/**
	 * Returns the identifier of the variation group
	 */
	public get variantsGroupingId(): number {
		return this.payload.variants_grouping_id;
	}

	/**
	 * Returns the properties of a variant
	 */
	public get propertyValues(): IMarketOrderContextPayload['property_values'] {
		return this.payload.property_values;
	}

	/**
	 * Returns the number of items in the cart
	 */
	public get cartQuantity(): number {
		return this.payload.cart_quantity;
	}

	/**
	 * Returns order status
	 *
	 * `0` - New
	 *
     * `1` - Agreed
	 *
     * `2` - Going
	 *
     * `3` - Delivered
	 *
     * `4` - Completed
	 *
     * `5` - Canceled
	 *
     * `6` - Returned
	 */
	public get status(): number {
		return this.payload.status;
	}

	/**
	 * Returns the total order value.
	 */
	public get totalPrice(): IMarketOrderContextPayload['total_price'] {
		return this.payload.total_price;
	}

	/**
	 * Returns a comment for the order
	 */
	public get commentText(): string {
		return this.payload.comment;
	}

	/**
	 * Returns shipping information
	 */
	public get delivery(): IMarketOrderContextPayload['delivery'] {
		return this.payload.delivery;
	}

	/**
	 * Returns customer information
	 */
	public get recipient(): IMarketOrderContextPayload['recipient'] {
		return this.payload.recipient;
	}

	/**
	 * Returns the date when this order was created
	 */
	public get createdAt(): number {
		return this.payload.date;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'id',
			'groupId',
			'userId',
			'displayOrderId',
			'variantsGroupingId',
			'propertyValues',
			'cartQuantity',
			'status',
			'totalPrice',
			'commentText',
			'previewOrderItems',
			'delivery',
			'recipient',
			'createdAt'
		]);
	}
}
