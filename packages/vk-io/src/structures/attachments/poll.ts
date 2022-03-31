// @ts-ignore
import { Attachment, AttachmentFactoryOptions } from './attachment';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { AttachmentType, kSerializeData } from '../../utils/constants';
// @ts-ignore
import { PhotoAttachment, IPhotoAttachmentPayload } from './photo';
// @ts-ignore

// @ts-ignore
export interface IPollAttachmentPayload {
// @ts-ignore
	id: number;
// @ts-ignore
	owner_id: number;
// @ts-ignore
	access_key?: string;
// @ts-ignore

// @ts-ignore
	anonymous?: number;
// @ts-ignore
	multiple?: number;
// @ts-ignore
	closed?: number;
// @ts-ignore
	is_board?: number;
// @ts-ignore
	can_edit?: number;
// @ts-ignore
	can_vote?: number;
// @ts-ignore
	can_report?: number;
// @ts-ignore
	can_share?: number;
// @ts-ignore
	author_id?: number;
// @ts-ignore
	question?: string;
// @ts-ignore
	created?: number;
// @ts-ignore
	end_date?: number;
// @ts-ignore
	votes?: number;
// @ts-ignore
	answer_ids?: number[];
// @ts-ignore
	friends?: number[];
// @ts-ignore
	answers?: {
// @ts-ignore
		id: number;
// @ts-ignore
		text: string;
// @ts-ignore
		votes: number;
// @ts-ignore
		rate: number;
// @ts-ignore
	}[];
// @ts-ignore
	background?: {
// @ts-ignore
		id: number;
// @ts-ignore
		type: 'gradient' | 'tile';
// @ts-ignore
		angle: number;
// @ts-ignore
		color: string;
// @ts-ignore
		width: number;
// @ts-ignore
		height: number;
// @ts-ignore
		images: IPhotoAttachmentPayload['sizes'];
// @ts-ignore
		points: {
// @ts-ignore
			position: number;
// @ts-ignore
			color: string;
// @ts-ignore
		}[];
// @ts-ignore
	};
// @ts-ignore
	photo?: IPhotoAttachmentPayload;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type PollAttachmentOptions =
// @ts-ignore
	AttachmentFactoryOptions<IPollAttachmentPayload>;
// @ts-ignore

// @ts-ignore
export class PollAttachment extends Attachment<IPollAttachmentPayload, AttachmentType.POLL | 'poll'> {
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
	public constructor(options: PollAttachmentOptions) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: AttachmentType.POLL
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.$filled = this.payload.answers !== undefined;
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
		const poll = await this.api.polls.getById({
// @ts-ignore
			poll_id: this.id,
// @ts-ignore
			owner_id: this.ownerId
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.payload = (poll as unknown) as IPollAttachmentPayload;
// @ts-ignore

// @ts-ignore
		this.$filled = true;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks whether the poll is anonymous
// @ts-ignore
	 */
// @ts-ignore
	public get isAnonymous(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.anonymous);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks whether the poll allows multiple choice of answers
// @ts-ignore
	 */
// @ts-ignore
	public get isMultiple(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.multiple);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks whether the poll is complete
// @ts-ignore
	 */
// @ts-ignore
	public get isClosed(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.closed);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Check whether questions are attached to the discussion
// @ts-ignore
	 */
// @ts-ignore
	public get isBoard(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.is_board);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Check if can edit the poll
// @ts-ignore
	 */
// @ts-ignore
	public get isCanEdit(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.can_edit);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Check if can vote in the survey
// @ts-ignore
	 */
// @ts-ignore
	public get isCanVote(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.can_vote);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Check if can complain about the poll
// @ts-ignore
	 */
// @ts-ignore
	public get isCanReport(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.can_report);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Check if can share a survey
// @ts-ignore
	 */
// @ts-ignore
	public get isCanShare(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.can_share);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the ID of the poll author
// @ts-ignore
	 */
// @ts-ignore
	public get authorId(): number | undefined {
// @ts-ignore
		return this.payload.author_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the question text
// @ts-ignore
	 */
// @ts-ignore
	public get question(): string | undefined {
// @ts-ignore
		return this.payload.question;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the date when this poll was created
// @ts-ignore
	 */
// @ts-ignore
	public get createdAt(): number | undefined {
// @ts-ignore
		return this.payload.created;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the end date of the poll in Unixtime. 0, if the poll is unlimited
// @ts-ignore
	 */
// @ts-ignore
	public get endedAt(): number | undefined {
// @ts-ignore
		return this.payload.end_date;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the number of votes
// @ts-ignore
	 */
// @ts-ignore
	public get votes(): number | undefined {
// @ts-ignore
		return this.payload.votes;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifiers of the response options selected by the current user
// @ts-ignore
	 */
// @ts-ignore
	public get answerIds(): number[] | undefined {
// @ts-ignore
		return this.payload.answer_ids;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifiers of 3 friends who voted in the poll
// @ts-ignore
	 */
// @ts-ignore
	public get friends(): number[] | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.payload.friends || [];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the information about the options for the answer
// @ts-ignore
	 */
// @ts-ignore
	public get answers(): IPollAttachmentPayload['answers'] | undefined {
// @ts-ignore
		return this.payload.answers;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the poll snippet background
// @ts-ignore
	 */
// @ts-ignore
	public get background(): IPollAttachmentPayload['background'] | undefined {
// @ts-ignore
		return this.payload.background;
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
			'authorId',
// @ts-ignore
			'question',
// @ts-ignore
			'createdAt',
// @ts-ignore
			'endedAt',
// @ts-ignore
			'votes',
// @ts-ignore
			'answerIds',
// @ts-ignore
			'friends',
// @ts-ignore
			'answers',
// @ts-ignore
			'background',
// @ts-ignore
			'photo'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
