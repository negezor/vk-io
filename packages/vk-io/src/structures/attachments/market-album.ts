// @ts-ignore
import { Attachment, AttachmentFactoryOptions } from './attachment';
// @ts-ignore

// @ts-ignore
import { AttachmentType } from '../../utils/constants';
// @ts-ignore
import { PhotoAttachment, IPhotoAttachmentPayload } from './photo';
// @ts-ignore

// @ts-ignore
export interface IMarketAlbumAttachmentPayload {
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
	photo?: IPhotoAttachmentPayload;
// @ts-ignore
	count?: number;
// @ts-ignore
	updated_time?: number;
// @ts-ignore
}
// @ts-ignore
export type MarketAlbumAttachmentOptions =
// @ts-ignore
	AttachmentFactoryOptions<IMarketAlbumAttachmentPayload>;
// @ts-ignore

// @ts-ignore
export class MarketAlbumAttachment
// @ts-ignore
	extends Attachment<IMarketAlbumAttachmentPayload, AttachmentType.MARKET_ALBUM | 'market_album'> {
// @ts-ignore
	public photo?: PhotoAttachment;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: MarketAlbumAttachmentOptions) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: AttachmentType.MARKET_ALBUM
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.$filled = this.payload.title !== undefined && this.payload.updated_time !== undefined;
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
		const { items } = await this.api.market.getAlbumById({
// @ts-ignore
			owner_id: this.ownerId,
// @ts-ignore
			album_ids: this.id
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.$filled = true;
// @ts-ignore

// @ts-ignore
		this.applyPayload(items![0] as IMarketAlbumAttachmentPayload);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns album title
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
	 * Returns count of products in the album
// @ts-ignore
	 */
// @ts-ignore
	get count(): number | undefined {
// @ts-ignore
		return this.payload.count;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the date when this album was updated
// @ts-ignore
	 */
// @ts-ignore
	get updatedAt(): number | undefined {
// @ts-ignore
		return this.payload.updated_time;
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
	private applyPayload(payload: IMarketAlbumAttachmentPayload): void {
// @ts-ignore
		this.payload = payload;
// @ts-ignore

// @ts-ignore
		if (this.payload.photo) {
// @ts-ignore
			this.photo = new PhotoAttachment({
// @ts-ignore
				api: this.api,
// @ts-ignore
				payload: this.payload.photo
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore
}
