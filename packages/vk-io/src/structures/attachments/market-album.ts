import { Attachment, AttachmentFactoryOptions } from './attachment';

import { AttachmentType } from '../../utils/constants';
import { PhotoAttachment, IPhotoAttachmentPayload } from './photo';

export interface IMarketAlbumAttachmentPayload {
	id: number;
	owner_id: number;
	access_key?: string;

	title?: string;
	photo?: IPhotoAttachmentPayload;
	count?: number;
	updated_time?: number;
}
export type MarketAlbumAttachmentOptions =
	AttachmentFactoryOptions<IMarketAlbumAttachmentPayload>;

export class MarketAlbumAttachment
	extends Attachment<IMarketAlbumAttachmentPayload, AttachmentType.MARKET_ALBUM | 'market_album'> {
	public photo?: PhotoAttachment;

	/**
	 * Constructor
	 */
	public constructor(options: MarketAlbumAttachmentOptions) {
		super({
			...options,

			type: AttachmentType.MARKET_ALBUM
		});

		this.$filled = this.payload.title !== undefined && this.payload.updated_time !== undefined;

		this.applyPayload(options.payload);
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

		this.$filled = true;

		this.applyPayload(items![0] as IMarketAlbumAttachmentPayload);
	}

	/**
	 * Returns album title
	 */
	get title(): string | undefined {
		return this.payload.title;
	}

	/**
	 * Returns count of products in the album
	 */
	get count(): number | undefined {
		return this.payload.count;
	}

	/**
	 * Returns the date when this album was updated
	 */
	get updatedAt(): number | undefined {
		return this.payload.updated_time;
	}

	/**
	 * Applies the payload
	 */
	private applyPayload(payload: IMarketAlbumAttachmentPayload): void {
		this.payload = payload;

		if (this.payload.photo) {
			this.photo = new PhotoAttachment({
				api: this.api,
				payload: this.payload.photo
			});
		}
	}
}
