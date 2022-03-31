// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { IMarketAttachmentPayload, MarketAttachment } from '../attachments';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export type MarketOrderContextType = 'market_order';
// @ts-ignore

// @ts-ignore
export type MarketOrderContextSubType = 'market_order_new' | 'market_order_edit';
// @ts-ignore

// @ts-ignore
export interface IMarketOrderContextPayload {
// @ts-ignore
	id: number;
// @ts-ignore

// @ts-ignore
	group_id: number;
// @ts-ignore
	user_id: number;
// @ts-ignore

// @ts-ignore
	display_order_id: number;
// @ts-ignore
	variants_grouping_id: number;
// @ts-ignore

// @ts-ignore
	is_main_variant: boolean;
// @ts-ignore
	property_values: {
// @ts-ignore
		variant_id: number;
// @ts-ignore
		variant_name: string;
// @ts-ignore
		property_name : string;
// @ts-ignore
	}[];
// @ts-ignore
	cart_quantity: number;
// @ts-ignore
	status: 0 | 1 | 2 | 3 | 4 | 5 | 6;
// @ts-ignore
	total_price: {
// @ts-ignore
		amount: string;
// @ts-ignore
		currency: {
// @ts-ignore
			id: number;
// @ts-ignore
			name: string;
// @ts-ignore
		};
// @ts-ignore
		text: string;
// @ts-ignore
	};
// @ts-ignore
	comment: string;
// @ts-ignore
	preview_order_items: IMarketAttachmentPayload[];
// @ts-ignore
	delivery: {
// @ts-ignore
		address: string;
// @ts-ignore
		type: string;
// @ts-ignore
		track_number: string;
// @ts-ignore
		track_link: string;
// @ts-ignore
		delivery_point: {};
// @ts-ignore
	};
// @ts-ignore
	recipient: {
// @ts-ignore
		name: string;
// @ts-ignore
		phone: string;
// @ts-ignore
		display_text : string;
// @ts-ignore
	};
// @ts-ignore
	date: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MarketOrderContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<IMarketOrderContextPayload, S>;
// @ts-ignore

// @ts-ignore
export class MarketOrderContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	IMarketOrderContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	MarketOrderContextType,
// @ts-ignore
	MarketOrderContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public previewOrderItems: MarketAttachment[];
// @ts-ignore

// @ts-ignore
	public constructor(options: MarketOrderContextOptions<S>) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'market_order',
// @ts-ignore
			subTypes: [
// @ts-ignore
				options.updateType as MarketOrderContextSubType
// @ts-ignore
			]
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.previewOrderItems = this.payload.preview_order_items.map(market => (
// @ts-ignore
			new MarketAttachment({
// @ts-ignore
				api: this.api,
// @ts-ignore
				payload: market
// @ts-ignore
			})
// @ts-ignore
		));
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if the variation is the primary one.
// @ts-ignore
	 */
// @ts-ignore
	public get isMainVariant(): boolean {
// @ts-ignore
		return Boolean(this.payload.is_main_variant);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the order identifier
// @ts-ignore
	 */
// @ts-ignore
	public get id(): number {
// @ts-ignore
		return this.payload.id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the group identifier
// @ts-ignore
	 */
// @ts-ignore
	public get groupId(): number {
// @ts-ignore
		return this.payload.group_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the user identifier
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
	 * Returns the order number consisting of the customer identifier and the order identifier.
// @ts-ignore
	 */
// @ts-ignore
	public get displayOrderId(): number {
// @ts-ignore
		return this.payload.display_order_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier of the variation group
// @ts-ignore
	 */
// @ts-ignore
	public get variantsGroupingId(): number {
// @ts-ignore
		return this.payload.variants_grouping_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the properties of a variant
// @ts-ignore
	 */
// @ts-ignore
	public get propertyValues(): IMarketOrderContextPayload['property_values'] {
// @ts-ignore
		return this.payload.property_values;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the number of items in the cart
// @ts-ignore
	 */
// @ts-ignore
	public get cartQuantity(): number {
// @ts-ignore
		return this.payload.cart_quantity;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns order status
// @ts-ignore
	 *
// @ts-ignore
	 * `0` - New
// @ts-ignore
	 *
// @ts-ignore
     * `1` - Agreed
// @ts-ignore
	 *
// @ts-ignore
     * `2` - Going
// @ts-ignore
	 *
// @ts-ignore
     * `3` - Delivered
// @ts-ignore
	 *
// @ts-ignore
     * `4` - Completed
// @ts-ignore
	 *
// @ts-ignore
     * `5` - Canceled
// @ts-ignore
	 *
// @ts-ignore
     * `6` - Returned
// @ts-ignore
	 */
// @ts-ignore
	public get status(): number {
// @ts-ignore
		return this.payload.status;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the total order value.
// @ts-ignore
	 */
// @ts-ignore
	public get totalPrice(): IMarketOrderContextPayload['total_price'] {
// @ts-ignore
		return this.payload.total_price;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns a comment for the order
// @ts-ignore
	 */
// @ts-ignore
	public get commentText(): string {
// @ts-ignore
		return this.payload.comment;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns shipping information
// @ts-ignore
	 */
// @ts-ignore
	public get delivery(): IMarketOrderContextPayload['delivery'] {
// @ts-ignore
		return this.payload.delivery;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns customer information
// @ts-ignore
	 */
// @ts-ignore
	public get recipient(): IMarketOrderContextPayload['recipient'] {
// @ts-ignore
		return this.payload.recipient;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the date when this order was created
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
			'id',
// @ts-ignore
			'groupId',
// @ts-ignore
			'userId',
// @ts-ignore
			'displayOrderId',
// @ts-ignore
			'variantsGroupingId',
// @ts-ignore
			'propertyValues',
// @ts-ignore
			'cartQuantity',
// @ts-ignore
			'status',
// @ts-ignore
			'totalPrice',
// @ts-ignore
			'commentText',
// @ts-ignore
			'previewOrderItems',
// @ts-ignore
			'delivery',
// @ts-ignore
			'recipient',
// @ts-ignore
			'createdAt'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
