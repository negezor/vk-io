import { inspectable } from 'inspectable';

import { API } from '../../api';
import { Upload } from '../../upload';
import { kSerializeData, UpdateSource } from '../../utils/constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ContextDefaultState = Record<string, any>;

export interface IContextOptions<
	P,
	S,
	Type extends string = string,
	SubType extends string = string
> {
	api: API;
	upload: Upload;

	type: Type;
	subTypes: SubType[];

	payload: P;
	state?: S;

	source: UpdateSource;
	updateType: string | number;

	groupId?: number;
}

export type ContextFactoryOptions<P, S> =
	Omit<IContextOptions<P, S>, 'type' | 'subTypes'>;

export class Context<
	P = {},
	S = ContextDefaultState,
	Type extends string = string,
	SubType extends string = string
> {
	public type: Type;

	public subTypes: SubType[];

	public state: S;

	protected api: API;

	protected upload: Upload;

	public $groupId?: number;

	protected payload: P;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;

	/**
	 * Constructor
	 */
	public constructor(options: IContextOptions<P, S, Type, SubType>) {
		this.api = options.api;
		this.upload = options.upload;

		this.type = options.type;
		this.subTypes = options.subTypes;

		this.payload = options.payload;
		this.state = options.state || {} as S;

		this.$groupId = options.groupId;
	}

	/**
	 * Returns custom tag
	 */
	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Checks whether the context of some of these types
	 */
	public is(rawTypes: (Type | SubType)[]): boolean {
		const types = !Array.isArray(rawTypes)
			? [rawTypes]
			: rawTypes;

		if (types.includes(this.type)) {
			return true;
		}

		return this.subTypes.some((type): boolean => (
			types.includes(type)
		));
	}

	/**
	 * Returns data for JSON
	 */
	public toJSON(): object {
		return {
			...this[kSerializeData](),

			type: this.type,
			subTypes: this.subTypes,
			state: this.state
		};
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { api, upload, ...payload } = this;

		return payload;
	}
}

inspectable(Context, {
	serialize: instance => instance.toJSON(),
	stringify: (instance, payload, context): string => (
		`${context.stylize(instance.constructor.name, 'special')} ${context.inspect(payload)}`
	)
});
