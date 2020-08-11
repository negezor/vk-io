import { Attachment, AttachmentFactoryOptions } from './attachment';

import { IPhotoAttachmentPayload, PhotoAttachment } from './photo';

import { AttachmentType } from '../../utils/constants';

export interface IMarketAttachmentPayload {
	id: number;
	owner_id: number;
	access_key?: string;

	title?: string;
	description?: string;
	price?: {
		amount: number;
		currency: {
			id: number;
			name: string;
		};
		old_amount?: string;
		text: string;
	};
	dimensions?: {
		width: number;
		height: number;
		length: number;
	};
	weight?: number;
	category?: {
		id: number;
		name: string;
		section: {
			id: number;
			name: string;
		};
	};
	thumb_photo?: string;
	date?: number;
	availability?: 0 | 1 | 2;
	is_favorite?: number;
	photos?: IPhotoAttachmentPayload[];
	can_comment?: number;
	can_repost?: number;
	likes?: {
		user_likes: number;
		count: number;
	};
	url?: string;
	button_title?: string;
}

export type MarketAttachmentOptions =
	AttachmentFactoryOptions<IMarketAttachmentPayload>;

export class MarketAttachment
	extends Attachment<IMarketAttachmentPayload, AttachmentType.MARKET | 'market'> {
	public photos?: PhotoAttachment[];

	/**
	 * Constructor
	 */
	public constructor(options: MarketAttachmentOptions) {
		super({
			...options,

			type: AttachmentType.MARKET
		});

		this.$filled = this.payload.title !== undefined && this.payload.date !== undefined;

		this.applyPayload(options.payload);
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		const { items } = await this.api.market.getById({
			item_ids: `${this.ownerId}_${this.id}`,
			extended: 0
		});

		this.$filled = true;

		this.applyPayload(items![0] as IMarketAttachmentPayload);
	}

	/**
	 * Checks is bookmarked current user
	 */
	public get isFavorited(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.is_favorite);
	}

	/**
	 * Checks is can comment for current user
	 */
	public get canComment(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.can_comment);
	}

	/**
	 * Checks is can repost for current user
	 */
	public get canRepost(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.can_repost);
	}

	/**
	 * Returns product title
	 */
	get title(): string | undefined {
		return this.payload.title;
	}

	/**
	 * Returns product description
	 */
	get description(): string | undefined {
		return this.payload.description;
	}

	/**
	 * Returns product price
	 */
	get price(): IMarketAttachmentPayload['price'] | undefined {
		return this.payload.price;
	}

	/**
	 * Returns product dimensions
	 */
	get dimensions(): IMarketAttachmentPayload['dimensions'] | undefined {
		return this.payload.dimensions;
	}

	/**
	 * Returns product dimensions
	 */
	get weight(): number | undefined {
		return this.payload.weight;
	}

	/**
	 * Returns product category
	 */
	get category(): IMarketAttachmentPayload['category'] | undefined {
		return this.payload.category;
	}

	/**
	 * Returns product thumbnail url
	 */
	get thumbnailUrl(): string | undefined {
		return this.payload.thumb_photo;
	}

	/**
	 * Returns the date when this product was created
	 */
	get createdAt(): number | undefined {
		return this.payload.date;
	}

	/**
	 * Returns product availability
	 *
	 * **0** - the product is available
	 *
	 * **1** - the item has been deleted
	 *
	 * **2** - the product is not available
	 */
	get availability(): IMarketAttachmentPayload['availability'] | undefined {
		return this.payload.availability;
	}

	/**
	 * Returns product likes
	 */
	get likes(): IMarketAttachmentPayload['likes'] | undefined {
		return this.payload.likes;
	}

	/**
	 * Returns product url
	 */
	get url(): string | undefined {
		return this.payload.url;
	}

	/**
	 * Returns product button title
	 */
	get buttonTitle(): string | undefined {
		return this.payload.button_title;
	}

	/**
	 * Applies the payload
	 */
	private applyPayload(payload: IMarketAttachmentPayload): void {
		this.payload = payload;

		if (this.payload.photos) {
			this.photos = this.payload.photos.map(photo => (
				new PhotoAttachment({
					api: this.api,
					payload: photo
				})
			));
		}
	}
}
