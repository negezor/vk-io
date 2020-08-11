import { Attachment } from './attachment';
import { ExternalAttachment, ExternalAttachmentFactoryOptions } from './external';

import { AttachmentType } from '../../utils/constants';
import { transformAttachments } from './helpers';

export interface IWallReplyAttachmentPayload {
	id: number;

	owner_id: number;
	post_id: number;

	from_id: number;
	date: number;
	text: string;
	reply_to_user: number;
	reply_to_comment: number;
	parents_stack: number[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	attachments: any[];
	thread: {
		count: number;
		items: IWallReplyAttachmentPayload[];
		can_post: boolean;
		show_reply_button: boolean;
		groups_can_post: boolean;
	};
};

export type WallReplyAttachmentOptions =
	ExternalAttachmentFactoryOptions<IWallReplyAttachmentPayload>;

export class WallReplyAttachment extends ExternalAttachment<IWallReplyAttachmentPayload, AttachmentType.WALL_REPLY | 'wall_reply'> {
	public attachments: (Attachment | ExternalAttachment)[];

	/**
	 * Constructor
	 */
	public constructor(options: WallReplyAttachmentOptions) {
		super({
			...options,

			type: AttachmentType.WALL_REPLY
		});

		this.attachments = transformAttachments(options.payload.attachments || [], this.api);
	}

	/**
	 * Returns the comment id
	 */
	public get id(): number {
		return this.payload.id;
	}

	/**
	 * Returns the comment owner id
	 */
	public get ownerId(): number {
		return this.payload.owner_id;
	}

	/**
	 * Returns the comment post id
	 */
	public get postId(): number {
		return this.payload.owner_id;
	}

	/**
	 * Returns the identifier of the user or community to which the current comment was posted
	 */
	public get replyToUserId(): number {
		return this.payload.reply_to_user;
	}

	/**
	 * Returns the identifier of the comment, in response to which the current is left
	 */
	public get replyToCommentId(): number {
		return this.payload.reply_to_comment;
	}

	/**
	 * Returns the array of parent comment identifiers
	 */
	public get parentCommentIds(): number[] {
		return this.payload.parents_stack;
	}

	/**
	 * Returns the post text
	 */
	public get text(): string | undefined {
		return this.payload.text;
	}

	/**
	 * Returns the date when this post was created
	 */
	public get createdAt(): number | undefined {
		return this.payload.date;
	}

	/**
	 * Returns information about a nested comment branch, an object with fields
	 */
	public get thread(): IWallReplyAttachmentPayload['thread'] | undefined {
		return this.payload.thread;
	}
}
