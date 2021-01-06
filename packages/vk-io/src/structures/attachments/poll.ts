import { Attachment, AttachmentFactoryOptions } from './attachment';

import { pickProperties } from '../../utils/helpers';
import { AttachmentType, kSerializeData } from '../../utils/constants';
import { PhotoAttachment, IPhotoAttachmentPayload } from './photo';

export interface IPollAttachmentPayload {
	id: number;
	owner_id: number;
	access_key?: string;

	anonymous?: number;
	multiple?: number;
	closed?: number;
	is_board?: number;
	can_edit?: number;
	can_vote?: number;
	can_report?: number;
	can_share?: number;
	author_id?: number;
	question?: string;
	created?: number;
	end_date?: number;
	votes?: number;
	answer_ids?: number[];
	friends?: number[];
	answers?: {
		id: number;
		text: string;
		votes: number;
		rate: number;
	}[];
	background?: {
		id: number;
		type: 'gradient' | 'tile';
		angle: number;
		color: string;
		width: number;
		height: number;
		images: IPhotoAttachmentPayload['sizes'];
		points: {
			position: number;
			color: string;
		}[];
	};
	photo?: IPhotoAttachmentPayload;
}

export type PollAttachmentOptions =
	AttachmentFactoryOptions<IPollAttachmentPayload>;

export class PollAttachment extends Attachment<IPollAttachmentPayload, AttachmentType.POLL | 'poll'> {
	public photo?: PhotoAttachment;

	/**
	 * Constructor
	 */
	public constructor(options: PollAttachmentOptions) {
		super({
			...options,

			type: AttachmentType.POLL
		});

		this.$filled = this.payload.answers !== undefined;

		if (this.payload.photo) {
			this.photo = new PhotoAttachment({
				api: this.api,
				payload: this.payload.photo
			});
		}
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		const poll = await this.api.polls.getById({
			poll_id: this.id,
			owner_id: this.ownerId
		});

		this.payload = (poll as unknown) as IPollAttachmentPayload;

		this.$filled = true;
	}

	/**
	 * Checks whether the poll is anonymous
	 */
	public get isAnonymous(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.anonymous);
	}

	/**
	 * Checks whether the poll allows multiple choice of answers
	 */
	public get isMultiple(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.multiple);
	}

	/**
	 * Checks whether the poll is complete
	 */
	public get isClosed(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.closed);
	}

	/**
	 * Check whether questions are attached to the discussion
	 */
	public get isBoard(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.is_board);
	}

	/**
	 * Check if can edit the poll
	 */
	public get isCanEdit(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.can_edit);
	}

	/**
	 * Check if can vote in the survey
	 */
	public get isCanVote(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.can_vote);
	}

	/**
	 * Check if can complain about the poll
	 */
	public get isCanReport(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.can_report);
	}

	/**
	 * Check if can share a survey
	 */
	public get isCanShare(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.can_share);
	}

	/**
	 * Returns the ID of the poll author
	 */
	public get authorId(): number | undefined {
		return this.payload.author_id;
	}

	/**
	 * Returns the question text
	 */
	public get question(): string | undefined {
		return this.payload.question;
	}

	/**
	 * Returns the date when this poll was created
	 */
	public get createdAt(): number | undefined {
		return this.payload.created;
	}

	/**
	 * Returns the end date of the poll in Unixtime. 0, if the poll is unlimited
	 */
	public get endedAt(): number | undefined {
		return this.payload.end_date;
	}

	/**
	 * Returns the number of votes
	 */
	public get votes(): number | undefined {
		return this.payload.votes;
	}

	/**
	 * Returns the identifiers of the response options selected by the current user
	 */
	public get answerIds(): number[] | undefined {
		return this.payload.answer_ids;
	}

	/**
	 * Returns the identifiers of 3 friends who voted in the poll
	 */
	public get friends(): number[] | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return this.payload.friends || [];
	}

	/**
	 * Returns the information about the options for the answer
	 */
	public get answers(): IPollAttachmentPayload['answers'] | undefined {
		return this.payload.answers;
	}

	/**
	 * Returns the poll snippet background
	 */
	public get background(): IPollAttachmentPayload['background'] | undefined {
		return this.payload.background;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'authorId',
			'question',
			'createdAt',
			'endedAt',
			'votes',
			'answerIds',
			'friends',
			'answers',
			'background',
			'photo'
		]);
	}
}
