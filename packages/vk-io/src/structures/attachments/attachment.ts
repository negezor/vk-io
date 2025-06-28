import { inspectable } from 'inspectable';

import type { API } from '../../api';

import { type AttachmentType, kSerializeData } from '../../utils/constants';

/**
 * Parse attachments
 */
export const parseAttachmentRe = /^([a-z_]+)(-?\d+)_(\d+)_?(\w+)?$/;

export interface ISharedAttachmentPayload {
    id: number;
    owner_id: number;
    access_key?: string;
}

export interface IAttachmentOptions<P, Type extends string = string> {
    api: API;

    type: Type;
    payload: Partial<ISharedAttachmentPayload> & P;
}

export type AttachmentFactoryOptions<P> = Omit<IAttachmentOptions<P>, 'type'>;

export class Attachment<P = object, Type extends string | AttachmentType = string> {
    public type: Type;

    protected $filled: boolean;

    protected api!: API;

    protected payload!: ISharedAttachmentPayload & P;

    /**
     * Constructor
     */
    public constructor(options: IAttachmentOptions<P, Type>) {
        this.api = options.api;

        this.type = options.type;

        // @ts-expect-error very hard types...
        this.payload = options.payload;

        this.$filled = false;
    }

    public get id(): number {
        return this.payload.id;
    }

    public get ownerId(): number {
        return this.payload.owner_id;
    }

    public get accessKey(): string | undefined {
        return this.payload.access_key;
    }

    /**
     * Returns custom tag
     */
    public get [Symbol.toStringTag](): string {
        return this.constructor.name;
    }

    /**
     * Parse attachment with string
     */
    public static fromString(attachment: string, api: API): Attachment {
        if (!parseAttachmentRe.test(attachment)) {
            throw new TypeError('Incorrect attachment');
        }

        // biome-ignore lint/style/noNonNullAssertion: we already check by test pattern
        const [, type, ownerId, id, accessKey] = attachment.match(parseAttachmentRe)!;

        return new Attachment({
            api,
            type,
            payload: {
                id: Number(id),
                owner_id: Number(ownerId),
                access_key: accessKey,
            },
        });
    }

    /**
     * Returns whether the attachment is filled
     */
    public get isFilled(): boolean {
        return this.$filled;
    }

    /**
     * Can be attached via string representation
     */
    public get canBeAttached(): boolean {
        return true;
    }

    /**
     * Checks that the attachment is equivalent with object
     */
    public equals(attachment: Attachment | string): boolean {
        const target = typeof attachment === 'string' ? Attachment.fromString(attachment, this.api) : attachment;

        return this.type === target.type && this.ownerId === target.ownerId && this.id === target.id;
    }

    /**
     * Returns a string to attach a VK
     */
    public toString(): string {
        const accessKey = this.accessKey !== undefined ? `_${this.accessKey}` : '';

        return `${this.type}${this.ownerId}_${this.id}${accessKey}`;
    }

    /**
     * Returns data for JSON
     */
    public toJSON(): object {
        return {
            id: this.id,
            ownerId: this.ownerId,
            accessKey: this.accessKey,

            ...this[kSerializeData](),
        };
    }

    /**
     * Returns the custom data
     */
    public [kSerializeData](): object {
        return {
            payload: this.payload,
        };
    }
}

inspectable(Attachment, {
    serialize: instance => instance.toJSON(),
    stringify: (instance, payload, context): string =>
        `${context.stylize(instance.constructor.name, 'special')} <${context.stylize(
            String(instance),
            'string',
        )}> ${context.inspect(payload)}`,
});
