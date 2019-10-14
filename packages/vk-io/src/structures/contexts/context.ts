import { inspect } from 'util';

import VK from '../../vk';
import { inspectCustomData, UpdateSource } from '../../utils/constants';

export interface IContextOptions<P, S> {
	vk: VK;

	type: string;
	subTypes: string[];

	payload: P;
	state?: S;

	source: UpdateSource;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	updateType: any;

	groupId?: number;
}

export default class Context<P = {}, S = {}> {
	public type: string;

	public subTypes: string[];

	public state: S;

	public vk: VK;

	public $groupId?: number;

	protected payload: P;

	/**
	 * Constructor
	 */
	public constructor(options: IContextOptions<P, S>) {
		this.vk = options.vk;

		this.type = options.type;
		this.subTypes = options.subTypes;

		this.payload = options.payload;
		// @ts-ignore
		this.state = options.state || {};


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
	public is(rawTypes: string | string[]): boolean {
		const types = !Array.isArray(rawTypes)
			? [rawTypes]
			: rawTypes;

		return [this.type, ...this.subTypes].some((type): boolean => (
			types.includes(type)
		));
	}

	/**
	 * Returns data for JSON
	 */
	public toJSON(): object {
		return {
			...this[inspectCustomData](),

			type: this.type,
			subTypes: this.subTypes,
			state: this.state
		};
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { vk, ...payload } = this;

		return payload;
	}

	/**
	 * Custom inspect object
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public [inspect.custom](depth: number, options: Record<string, any>): string {
		const { name } = this.constructor;

		const customData = {
			...this[inspectCustomData](),

			type: this.type,
			subTypes: this.subTypes,
			state: this.state
		};

		const payload = inspect(customData, { ...options, compact: false });

		return `${options.stylize(name, 'special')} ${payload}`;
	}
}
