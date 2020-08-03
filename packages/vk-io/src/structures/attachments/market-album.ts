import { Attachment, AttachmentFactoryOptions } from './attachment';

import { AttachmentType } from '../../utils/constants';

export interface IMarketAlbumAttachmentPayload {
	id: number;
	owner_id: number;
	access_key?: string;

	title?: string;
	photo?: object;
	count?: number;
	updated_time?: number;
}
export type MarketAlbumAttachmentOptions =
	AttachmentFactoryOptions<IMarketAlbumAttachmentPayload>;

export class MarketAlbumAttachment
	extends Attachment<IMarketAlbumAttachmentPayload, AttachmentType.MARKET_ALBUM | 'market_album'> {
	/**
	 * Constructor
	 */
	public constructor(options: MarketAlbumAttachmentOptions) {
		super({
			...options,

			type: AttachmentType.MARKET_ALBUM
		});

		this.$filled = this.payload.title !== undefined && this.payload.updated_time !== undefined;
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		const { items } = await this.api.market.getAlbumById({
			owner_id: this.ownerId,
			album_ids: this.id
		});

		this.payload = items![0] as IMarketAlbumAttachmentPayload;

		this.$filled = true;
	}
}
