// @ts-ignore
import {
// @ts-ignore
	Context,
// @ts-ignore
	ContextFactoryOptions,
// @ts-ignore

// @ts-ignore
	Attachmentable,
// @ts-ignore

// @ts-ignore
	transformAttachments,
// @ts-ignore
	kSerializeData,
// @ts-ignore

// @ts-ignore
	applyMixins,
// @ts-ignore
	ContextDefaultState
// @ts-ignore
} from 'vk-io';
// @ts-ignore

// @ts-ignore
import { copyParams } from '../helpers';
// @ts-ignore

// @ts-ignore
export interface IStreamingContextPayload {
// @ts-ignore
	event_type: 'post' | 'comment' | 'share' | 'topic_post';
// @ts-ignore
	event_id: {
// @ts-ignore
		post_owner_id?: number;
// @ts-ignore
		post_id?: number;
// @ts-ignore
		comment_id?: number;
// @ts-ignore
		shared_post_id?: number;
// @ts-ignore
		topic_owner_id?: number;
// @ts-ignore
		topic_id?: number;
// @ts-ignore
		topic_post_id?: number;
// @ts-ignore
	};
// @ts-ignore
	event_url: string;
// @ts-ignore
	text?: string;
// @ts-ignore
	action: 'new' | 'update' | 'delete' | 'restore';
// @ts-ignore
	action_time: number;
// @ts-ignore
	creation_time: number;
// @ts-ignore
	attachments: object[];
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	geo: Record<string, any>;
// @ts-ignore
	shared_post_text?: string;
// @ts-ignore
	shared_post_creation_time?: number;
// @ts-ignore
	signer_id: number;
// @ts-ignore
	tags: string[];
// @ts-ignore
	author: {
// @ts-ignore
		id: number;
// @ts-ignore
		author_url: string;
// @ts-ignore
		shared_post_author_id?: number;
// @ts-ignore
		shared_post_author_url?: string;
// @ts-ignore
		platform?: number;
// @ts-ignore
	};
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type StreamingContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<IStreamingContextPayload, S>;
// @ts-ignore

// @ts-ignore
class StreamingContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<IStreamingContextPayload, S> {
// @ts-ignore
	public constructor(options: StreamingContextOptions<S>) {
// @ts-ignore
		const { action, event_type: type } = options.payload;
// @ts-ignore

// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'publication',
// @ts-ignore
			subTypes: [
// @ts-ignore
				`publication_${type}`,
// @ts-ignore
				`${action}_publication`,
// @ts-ignore
				`${action}_publication_${type}`
// @ts-ignore
			]
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.attachments = transformAttachments(this.payload.attachments || [], this.api);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is new object
// @ts-ignore
	 */
// @ts-ignore
	public get isNew(): boolean {
// @ts-ignore
		return this.actionType === 'new';
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is update object
// @ts-ignore
	 */
// @ts-ignore
	public get isUpdate(): boolean {
// @ts-ignore
		return this.actionType === 'update';
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is delete object
// @ts-ignore
	 */
// @ts-ignore
	public get isDelete(): boolean {
// @ts-ignore
		return this.actionType === 'delete';
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is restore object
// @ts-ignore
	 */
// @ts-ignore
	public get isRestore(): boolean {
// @ts-ignore
		return this.actionType === 'restore';
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is post event
// @ts-ignore
	 */
// @ts-ignore
	public get isPost(): boolean {
// @ts-ignore
		return this.eventType === 'post';
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is share event
// @ts-ignore
	 */
// @ts-ignore
	public get isShare(): boolean {
// @ts-ignore
		return this.eventType === 'share';
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is comment event
// @ts-ignore
	 */
// @ts-ignore
	public get isComment(): boolean {
// @ts-ignore
		return this.eventType === 'comment';
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the event URL
// @ts-ignore
	 */
// @ts-ignore
	public get url(): string {
// @ts-ignore
		return this.payload.event_url;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the creation time
// @ts-ignore
	 */
// @ts-ignore
	public get createdAt(): number {
// @ts-ignore
		return this.payload.creation_time;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the text of the post
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
	 * Returns the text of the shared post
// @ts-ignore
	 */
// @ts-ignore
	public get sharedText(): string | undefined {
// @ts-ignore
		return this.payload.shared_post_text;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the creation time from original post
// @ts-ignore
	 */
// @ts-ignore
	public get sharedAt(): number | undefined {
// @ts-ignore
		return this.payload.shared_post_creation_time;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the action type
// @ts-ignore
	 */
// @ts-ignore
	public get actionType(): string {
// @ts-ignore
		return this.payload.action;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the event type
// @ts-ignore
	 */
// @ts-ignore
	public get eventType(): string {
// @ts-ignore
		return this.payload.event_type;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the creation time from
// @ts-ignore
	 */
// @ts-ignore
	public get actionAt(): number {
// @ts-ignore
		return this.payload.action_time;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the geo location
// @ts-ignore
	 */
// @ts-ignore
	public get geo(): object {
// @ts-ignore
		return this.payload.geo;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the rule tags
// @ts-ignore
	 */
// @ts-ignore
	public get tags(): string[] {
// @ts-ignore
		return this.payload.tags;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier signer user
// @ts-ignore
	 */
// @ts-ignore
	public get signerId(): number {
// @ts-ignore
		return this.payload.signer_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the information of author
// @ts-ignore
	 */
// @ts-ignore
	public get author(): IStreamingContextPayload['author'] {
// @ts-ignore
		return this.payload.author;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier author
// @ts-ignore
	 */
// @ts-ignore
	public get authorId(): number {
// @ts-ignore
		return this.payload.author.id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the author url
// @ts-ignore
	 */
// @ts-ignore
	public get authorUrl(): string {
// @ts-ignore
		return this.payload.author.author_url;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier of the author of the original post
// @ts-ignore
	 */
// @ts-ignore
	public get sharedAuthorId(): number | undefined {
// @ts-ignore
		return this.payload.author.shared_post_author_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the author url of the original post
// @ts-ignore
	 */
// @ts-ignore
	public get sharedAuthorUrl(): string | undefined {
// @ts-ignore
		return this.payload.author.shared_post_author_url;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the author platform
// @ts-ignore
	 *
// @ts-ignore
	 * - `1` - m.vk.com or other unknown application
// @ts-ignore
	 * - `2` - iPhone
// @ts-ignore
	 * - `3` - iPad
// @ts-ignore
	 * - `4` - Android
// @ts-ignore
	 * - `5` - Windows Phone
// @ts-ignore
	 * - `6` - Windows
// @ts-ignore
	 * - `7` - vk.com or other unknown application
// @ts-ignore
	 */
// @ts-ignore
	public get authorPlatform(): number | undefined {
// @ts-ignore
		return this.payload.author.platform;
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
		const properties = [
// @ts-ignore
			'url',
// @ts-ignore
			'created',
// @ts-ignore
			'text',
// @ts-ignore
			'sharedText',
// @ts-ignore
			'sharedAt',
// @ts-ignore
			'actionType',
// @ts-ignore
			'eventType',
// @ts-ignore
			'actionAt',
// @ts-ignore
			'geo',
// @ts-ignore
			'tags',
// @ts-ignore
			'signerId',
// @ts-ignore
			'author',
// @ts-ignore
			'authorId',
// @ts-ignore
			'authorUrl',
// @ts-ignore
			'sharedAuthorId',
// @ts-ignore
			'sharedAuthorUrl',
// @ts-ignore
			'authorPlatform',
// @ts-ignore
			'isNew',
// @ts-ignore
			'isUpdate',
// @ts-ignore
			'isDelete',
// @ts-ignore
			'isRestore',
// @ts-ignore
			'isPost',
// @ts-ignore
			'isShare',
// @ts-ignore
			'isComment'
// @ts-ignore
		];
// @ts-ignore

// @ts-ignore
		const filtredEmptyProperties = properties.filter(property => (
// @ts-ignore
			this[property] !== undefined
// @ts-ignore
		)) as (keyof this)[];
// @ts-ignore

// @ts-ignore
		return copyParams(this, filtredEmptyProperties);
// @ts-ignore
	}
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
// eslint-disable-next-line
// @ts-ignore
interface StreamingContext extends Attachmentable {}
// @ts-ignore
applyMixins(StreamingContext, [
// @ts-ignore
	Attachmentable
// @ts-ignore
]);
// @ts-ignore

// @ts-ignore
export { StreamingContext };
