// @ts-ignore
import { Attachment, AttachmentFactoryOptions } from './attachment';
// @ts-ignore

// @ts-ignore
import { IPhotoAttachmentPayload, PhotoAttachment } from './photo';
// @ts-ignore

// @ts-ignore
import { AttachmentType } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export interface IMarketAttachmentPayload {
// @ts-ignore
	id: number;
// @ts-ignore
	owner_id: number;
// @ts-ignore
	access_key?: string;
// @ts-ignore

// @ts-ignore
	title?: string;
// @ts-ignore
	description?: string;
// @ts-ignore
	price?: {
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
		old_amount?: string;
// @ts-ignore
		text: string;
// @ts-ignore
	};
// @ts-ignore
	dimensions?: {
// @ts-ignore
		width: number;
// @ts-ignore
		height: number;
// @ts-ignore
		length: number;
// @ts-ignore
	};
// @ts-ignore
	weight?: number;
// @ts-ignore
	category?: {
// @ts-ignore
		id: number;
// @ts-ignore
		name: string;
// @ts-ignore
		section: {
// @ts-ignore
			id: number;
// @ts-ignore
			name: string;
// @ts-ignore
		};
// @ts-ignore
	};
// @ts-ignore
	thumb_photo?: string;
// @ts-ignore
	date?: number;
// @ts-ignore
	availability?: 0 | 1 | 2;
// @ts-ignore
	is_favorite?: number;
// @ts-ignore
	photos?: IPhotoAttachmentPayload[];
// @ts-ignore
	can_comment?: number;
// @ts-ignore
	can_repost?: number;
// @ts-ignore
	likes?: {
// @ts-ignore
		user_likes: number;
// @ts-ignore
		count: number;
// @ts-ignore
	};
// @ts-ignore
	url?: string;
// @ts-ignore
	button_title?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MarketAttachmentOptions =
// @ts-ignore
	AttachmentFactoryOptions<IMarketAttachmentPayload>;
// @ts-ignore

// @ts-ignore
export class MarketAttachment
// @ts-ignore
	extends Attachment<IMarketAttachmentPayload, AttachmentType.MARKET | 'market'> {
// @ts-ignore
	public photos?: PhotoAttachment[];
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: MarketAttachmentOptions) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: AttachmentType.MARKET
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.$filled = this.payload.title !== undefined && this.payload.date !== undefined;
// @ts-ignore

// @ts-ignore
		this.applyPayload(options.payload);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Load attachment payload
// @ts-ignore
	 */
// @ts-ignore
	public async loadAttachmentPayload(): Promise<void> {
// @ts-ignore
		if (this.$filled) {
// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const { items } = await this.api.market.getById({
// @ts-ignore
			item_ids: `${this.ownerId}_${this.id}`,
// @ts-ignore
			extended: 0
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.$filled = true;
// @ts-ignore

// @ts-ignore
		this.applyPayload(items![0] as IMarketAttachmentPayload);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is bookmarked current user
// @ts-ignore
	 */
// @ts-ignore
	public get isFavorited(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.is_favorite);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is can comment for current user
// @ts-ignore
	 */
// @ts-ignore
	public get canComment(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.can_comment);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is can repost for current user
// @ts-ignore
	 */
// @ts-ignore
	public get canRepost(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.can_repost);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns product title
// @ts-ignore
	 */
// @ts-ignore
	get title(): string | undefined {
// @ts-ignore
		return this.payload.title;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns product description
// @ts-ignore
	 */
// @ts-ignore
	get description(): string | undefined {
// @ts-ignore
		return this.payload.description;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns product price
// @ts-ignore
	 */
// @ts-ignore
	get price(): IMarketAttachmentPayload['price'] | undefined {
// @ts-ignore
		return this.payload.price;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns product dimensions
// @ts-ignore
	 */
// @ts-ignore
	get dimensions(): IMarketAttachmentPayload['dimensions'] | undefined {
// @ts-ignore
		return this.payload.dimensions;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns product dimensions
// @ts-ignore
	 */
// @ts-ignore
	get weight(): number | undefined {
// @ts-ignore
		return this.payload.weight;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns product category
// @ts-ignore
	 */
// @ts-ignore
	get category(): IMarketAttachmentPayload['category'] | undefined {
// @ts-ignore
		return this.payload.category;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns product thumbnail url
// @ts-ignore
	 */
// @ts-ignore
	get thumbnailUrl(): string | undefined {
// @ts-ignore
		return this.payload.thumb_photo;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the date when this product was created
// @ts-ignore
	 */
// @ts-ignore
	get createdAt(): number | undefined {
// @ts-ignore
		return this.payload.date;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns product availability
// @ts-ignore
	 *
// @ts-ignore
	 * **0** - the product is available
// @ts-ignore
	 *
// @ts-ignore
	 * **1** - the item has been deleted
// @ts-ignore
	 *
// @ts-ignore
	 * **2** - the product is not available
// @ts-ignore
	 */
// @ts-ignore
	get availability(): IMarketAttachmentPayload['availability'] | undefined {
// @ts-ignore
		return this.payload.availability;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns product likes
// @ts-ignore
	 */
// @ts-ignore
	get likes(): IMarketAttachmentPayload['likes'] | undefined {
// @ts-ignore
		return this.payload.likes;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns product url
// @ts-ignore
	 */
// @ts-ignore
	get url(): string | undefined {
// @ts-ignore
		return this.payload.url;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns product button title
// @ts-ignore
	 */
// @ts-ignore
	get buttonTitle(): string | undefined {
// @ts-ignore
		return this.payload.button_title;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Applies the payload
// @ts-ignore
	 */
// @ts-ignore
	private applyPayload(payload: IMarketAttachmentPayload): void {
// @ts-ignore
		this.payload = payload;
// @ts-ignore

// @ts-ignore
		if (this.payload.photos) {
// @ts-ignore
			this.photos = this.payload.photos.map(photo => (
// @ts-ignore
				new PhotoAttachment({
// @ts-ignore
					api: this.api,
// @ts-ignore
					payload: photo
// @ts-ignore
				})
// @ts-ignore
			));
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore
}
