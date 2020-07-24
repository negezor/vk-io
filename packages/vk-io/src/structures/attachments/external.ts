import { inspectable } from 'inspectable';

import { API } from '../../api';
import { kSerializeData } from '../../utils/constants';

export class ExternalAttachment<P = {}> {
	public type: string;

	protected $filled: boolean;

	protected api!: API;

	protected payload: P;

	/**
	 * Constructor
	 */
	public constructor(type: string, payload: P) {
		this.type = type;
		this.payload = payload;

		this.$filled = false;
	}

	/**
	 * Returns custom tag
	 */
	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
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
	// eslint-disable-next-line class-methods-use-this
	public get canBeAttached(): boolean {
		return false;
	}

	/**
	 * Returns data for JSON
	 */
	public toJSON(): object {
		return this[kSerializeData]();
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return {
			payload: this.payload
		};
	}
}

inspectable(ExternalAttachment, {
	serialize: instance => instance.toJSON()
});
