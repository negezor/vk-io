import { API } from '../../api';

import { Attachment } from './attachment';

import { AttachmentType } from '../../utils/constants';

const { MARKET } = AttachmentType;

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

export class MarketAttachment extends Attachment<IMarketAttachmentPayload> {
	/**
	 * Constructor
	 */
	public constructor(payload: IMarketAttachmentPayload, api?: API) {
		super(MARKET, payload.owner_id, payload.id, payload.access_key);

		// @ts-expect-error
		this.api = api;
		this.payload = payload;

		this.$filled = payload.title !== undefined && payload.date !== undefined;
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		// @ts-expect-error
		const [market] = await this.api.market.getById({
			item_ids: `${this.ownerId}_${this.id}`,
			extended: 0
		});

		this.payload = market;

		if (this.payload.access_key) {
			this.accessKey = this.payload.access_key;
		}

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
