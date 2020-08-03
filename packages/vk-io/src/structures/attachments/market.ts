import { Attachment, AttachmentFactoryOptions } from './attachment';

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
	};
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
	photos?: object[];
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
	/**
	 * Constructor
	 */
	public constructor(options: MarketAttachmentOptions) {
		super({
			...options,

			type: AttachmentType.MARKET
		});

		this.$filled = this.payload.title !== undefined && this.payload.date !== undefined;
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

		this.payload = items![0] as IMarketAttachmentPayload;

		this.$filled = true;
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
}
