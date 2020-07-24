import { API } from '../../api';

import { Attachment } from './attachment';

import { AttachmentType } from '../../utils/constants';

const { MARKET_ALBUM } = AttachmentType;

export interface IMarketAlbumAttachmentPayload {
	id: number;
	owner_id: number;
	access_key?: string;

	title?: string;
	photo?: object;
	count?: number;
	updated_time?: number;
}

export class MarketAlbumAttachment extends Attachment<IMarketAlbumAttachmentPayload> {
	/**
	 * Constructor
	 */
	public constructor(payload: IMarketAlbumAttachmentPayload, api?: API) {
		super(MARKET_ALBUM, payload.owner_id, payload.id, payload.access_key);

		// @ts-expect-error
		this.api = api;
		this.payload = payload;

		this.$filled = payload.title !== undefined && payload.updated_time !== undefined;
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		// @ts-expect-error
		const [album] = await this.api.market.getAlbumById({
			owner_id: this.ownerId,
			album_ids: this.id
		});

		this.payload = album;

		if (this.payload.access_key) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}
}
