import VK from '../../vk';

import Attachment from './attachment';

import { copyParams } from '../../utils/helpers';
import { AttachmentType, inspectCustomData } from '../../utils/constants';

const { POLL } = AttachmentType;

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
	background?: object[];
	photo?: object;
}

export default class PollAttachment extends Attachment<IPollAttachmentPayload> {
	/**
	 * Constructor
	 */
	public constructor(payload: IPollAttachmentPayload, vk?: VK) {
		super(POLL, payload.owner_id, payload.id, payload.access_key);

		// @ts-ignore
		this.vk = vk;
		this.payload = payload;

		this.$filled = 'answers' in payload;
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		// @ts-ignore
		const [poll] = await this.vk.api.polls.getById({
			poll_id: this.id,
			owner_id: this.ownerId
		});

		this.payload = poll;

		if (this.payload.access_key) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}

	/**
	 * Checks whether the poll is anonymous
	 */
	public get isAnonymous(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.anonymous);
	}

	/**
	 * Checks whether the poll allows multiple choice of answers
	 */
	public get isMultiple(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.multiple);
	}

	/**
	 * Checks whether the poll is complete
	 */
	public get isClosed(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.closed);
	}

	/**
	 * Check whether questions are attached to the discussion
	 */
	public get isBoard(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.is_board);
	}

	/**
	 * Check if can edit the poll
	 */
	public get isCanEdit(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.can_edit);
	}

	/**
	 * Check if can vote in the survey
	 */
	public get isCanVote(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.can_vote);
	}

	/**
	 * Check if can complain about the poll
	 */
	public get isCanReport(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.can_report);
	}

	/**
	 * Check if can share a survey
	 */
	public get isCanShare(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.can_share);
	}

	/**
	 * Returns the ID of the poll author
	 */
	public get authorId(): number | null {
		return this.payload.author_id || null;
	}

	/**
	 * Returns the question text
	 */
	public get question(): string | null {
		return this.payload.question || null;
	}

	/**
	 * Returns the date when this poll was created
	 */
	public get createdAt(): number | null {
		return this.payload.created || null;
	}

	/**
	 * Returns the end date of the poll in Unixtime. 0, if the poll is unlimited
	 */
	public get endedAt(): number | null {
		if (!this.$filled) {
			return null;
		}

		return this.payload.end_date!;
	}

	/**
	 * Returns the number of votes
	 */
	public get votes(): number | null {
		return this.payload.votes || null;
	}

	/**
	 * Returns the identifiers of the response options selected by the current user
	 */
	public get answerIds(): number[] | null {
		return this.payload.answer_ids || null;
	}

	/**
	 * Returns the identifiers of 3 friends who voted in the poll
	 */
	public get friends(): number[] | null {
		if (!this.$filled) {
			return null;
		}

		return this.payload.friends || [];
	}

	/**
	 * Returns the information about the options for the answer
	 */
	public get answers(): object[] | null {
		return this.payload.answers || null;
	}

	/**
	 * Returns the poll snippet background
	 */
	public get background(): object[] | null {
		return this.payload.background || null;
	}

	/**
	 * Returns a photo - the poll snippet background
	 */
	public get photo(): object | null {
		return this.payload.photo || null;
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		return copyParams(this, [
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
