import VK from '../../vk';

import Attachment from './attachment';

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

export default class MarketAttachment extends Attachment<IMarketAttachmentPayload> {
	/**
	 * Constructor
	 */
	public constructor(payload: IMarketAttachmentPayload, vk?: VK) {
		super(MARKET, payload.owner_id, payload.id, payload.access_key);

		// @ts-ignore
		this.vk = vk;
		this.payload = payload;

		this.$filled = 'title' in payload && 'date' in payload;
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		// @ts-ignore
		const [market] = await this.vk.api.market.getById({
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
	public get isFavorited(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.is_favorite);
	}
}
