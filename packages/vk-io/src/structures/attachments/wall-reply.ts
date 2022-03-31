// @ts-ignore
import { Attachment } from './attachment';
// @ts-ignore
import { ExternalAttachment, ExternalAttachmentFactoryOptions } from './external';
// @ts-ignore

// @ts-ignore
import { AttachmentType } from '../../utils/constants';
// @ts-ignore
import { transformAttachments } from './helpers';
// @ts-ignore

// @ts-ignore
export interface IWallReplyAttachmentPayload {
// @ts-ignore
	id: number;
// @ts-ignore

// @ts-ignore
	owner_id: number;
// @ts-ignore
	post_id: number;
// @ts-ignore

// @ts-ignore
	from_id: number;
// @ts-ignore
	date: number;
// @ts-ignore
	text: string;
// @ts-ignore
	reply_to_user: number;
// @ts-ignore
	reply_to_comment: number;
// @ts-ignore
	parents_stack: number[];
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	attachments: any[];
// @ts-ignore
	thread: {
// @ts-ignore
		count: number;
// @ts-ignore
		items: IWallReplyAttachmentPayload[];
// @ts-ignore
		can_post: boolean;
// @ts-ignore
		show_reply_button: boolean;
// @ts-ignore
		groups_can_post: boolean;
// @ts-ignore
	};
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
export type WallReplyAttachmentOptions =
// @ts-ignore
	ExternalAttachmentFactoryOptions<IWallReplyAttachmentPayload>;
// @ts-ignore

// @ts-ignore
export class WallReplyAttachment extends ExternalAttachment<IWallReplyAttachmentPayload, AttachmentType.WALL_REPLY | 'wall_reply'> {
// @ts-ignore
	public attachments: (Attachment | ExternalAttachment)[];
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: WallReplyAttachmentOptions) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: AttachmentType.WALL_REPLY
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.attachments = transformAttachments(options.payload.attachments || [], this.api);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the comment id
// @ts-ignore
	 */
// @ts-ignore
	public get id(): number {
// @ts-ignore
		return this.payload.id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the comment owner id
// @ts-ignore
	 */
// @ts-ignore
	public get ownerId(): number {
// @ts-ignore
		return this.payload.owner_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the comment post id
// @ts-ignore
	 */
// @ts-ignore
	public get postId(): number {
// @ts-ignore
		return this.payload.owner_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier of the user or community to which the current comment was posted
// @ts-ignore
	 */
// @ts-ignore
	public get replyToUserId(): number {
// @ts-ignore
		return this.payload.reply_to_user;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier of the comment, in response to which the current is left
// @ts-ignore
	 */
// @ts-ignore
	public get replyToCommentId(): number {
// @ts-ignore
		return this.payload.reply_to_comment;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the array of parent comment identifiers
// @ts-ignore
	 */
// @ts-ignore
	public get parentCommentIds(): number[] {
// @ts-ignore
		return this.payload.parents_stack;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the post text
// @ts-ignore
	 */
// @ts-ignore
	public get text(): string | undefined {
// @ts-ignore
		return this.payload.text;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the date when this post was created
// @ts-ignore
	 */
// @ts-ignore
	public get createdAt(): number | undefined {
// @ts-ignore
		return this.payload.date;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns information about a nested comment branch, an object with fields
// @ts-ignore
	 */
// @ts-ignore
	public get thread(): IWallReplyAttachmentPayload['thread'] | undefined {
// @ts-ignore
		return this.payload.thread;
// @ts-ignore
	}
// @ts-ignore
}
