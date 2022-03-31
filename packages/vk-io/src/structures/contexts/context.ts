// @ts-ignore
import { inspectable } from 'inspectable';
// @ts-ignore

// @ts-ignore
import { API } from '../../api';
// @ts-ignore
import { Upload } from '../../upload';
// @ts-ignore
import { kSerializeData, UpdateSource } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
export type ContextDefaultState = Record<string, any>;
// @ts-ignore

// @ts-ignore
export interface IContextOptions<
// @ts-ignore
	P,
// @ts-ignore
	S,
// @ts-ignore
	Type extends string = string,
// @ts-ignore
	SubType extends string = string
// @ts-ignore
> {
// @ts-ignore
	api: API;
// @ts-ignore
	upload: Upload;
// @ts-ignore

// @ts-ignore
	type: Type;
// @ts-ignore
	subTypes: SubType[];
// @ts-ignore

// @ts-ignore
	payload: P;
// @ts-ignore
	state?: S;
// @ts-ignore

// @ts-ignore
	source: UpdateSource;
// @ts-ignore
	updateType: string | number;
// @ts-ignore

// @ts-ignore
	groupId?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type ContextFactoryOptions<P, S> =
// @ts-ignore
	Omit<IContextOptions<P, S>, 'type' | 'subTypes'>;
// @ts-ignore

// @ts-ignore
export class Context<
// @ts-ignore
	P = {},
// @ts-ignore
	S = ContextDefaultState,
// @ts-ignore
	Type extends string = string,
// @ts-ignore
	SubType extends string = string
// @ts-ignore
> {
// @ts-ignore
	public type: Type;
// @ts-ignore

// @ts-ignore
	public subTypes: SubType[];
// @ts-ignore

// @ts-ignore
	public state: S;
// @ts-ignore

// @ts-ignore
	protected api: API;
// @ts-ignore

// @ts-ignore
	protected upload: Upload;
// @ts-ignore

// @ts-ignore
	public $groupId?: number;
// @ts-ignore

// @ts-ignore
	protected payload: P;
// @ts-ignore

// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	[key: string]: any;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: IContextOptions<P, S, Type, SubType>) {
// @ts-ignore
		this.api = options.api;
// @ts-ignore
		this.upload = options.upload;
// @ts-ignore

// @ts-ignore
		this.type = options.type;
// @ts-ignore
		this.subTypes = options.subTypes;
// @ts-ignore

// @ts-ignore
		this.payload = options.payload;
// @ts-ignore
		this.state = options.state || {} as S;
// @ts-ignore

// @ts-ignore
		this.$groupId = options.groupId;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns custom tag
// @ts-ignore
	 */
// @ts-ignore
	public get [Symbol.toStringTag](): string {
// @ts-ignore
		return this.constructor.name;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks whether the context of some of these types
// @ts-ignore
	 */
// @ts-ignore
	public is(rawTypes: (Type | SubType)[]): boolean {
// @ts-ignore
		const types = !Array.isArray(rawTypes)
// @ts-ignore
			? [rawTypes]
// @ts-ignore
			: rawTypes;
// @ts-ignore

// @ts-ignore
		if (types.includes(this.type)) {
// @ts-ignore
			return true;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.subTypes.some((type): boolean => (
// @ts-ignore
			types.includes(type)
// @ts-ignore
		));
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns data for JSON
// @ts-ignore
	 */
// @ts-ignore
	public toJSON(): object {
// @ts-ignore
		return {
// @ts-ignore
			...this[kSerializeData](),
// @ts-ignore

// @ts-ignore
			type: this.type,
// @ts-ignore
			subTypes: this.subTypes,
// @ts-ignore
			state: this.state
// @ts-ignore
		};
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
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
		const { api, upload, ...payload } = this;
// @ts-ignore

// @ts-ignore
		return payload;
// @ts-ignore
	}
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
inspectable(Context, {
// @ts-ignore
	serialize: instance => instance.toJSON(),
// @ts-ignore
	stringify: (instance, payload, context): string => (
// @ts-ignore
		`${context.stylize(instance.constructor.name, 'special')} ${context.inspect(payload)}`
// @ts-ignore
	)
// @ts-ignore
});
