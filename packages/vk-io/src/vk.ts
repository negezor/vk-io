import { inspectable } from 'inspectable';

import { Agent } from 'https';
import { EventEmitter } from 'events';

import { API } from './api';
import { Upload } from './upload';
import { Collect } from './collect';
import { Updates } from './updates';
import { CallbackService } from './utils/callback-service';

import { IVKOptions } from './types';

import { defaultOptions } from './utils/constants';

/**
 * Main class
 */
export class VK {
	public options: IVKOptions = {
		...defaultOptions,

		agent: new Agent({
			keepAlive: true,

			keepAliveMsecs: 10000
		})
	};

	public internalHooks = new EventEmitter();

	public api = new API(this);

	public upload = new Upload(this);

	public collect = new Collect(this);

	public updates = new Updates(this);

	public callbackService = new CallbackService();

	/**
	 * Constructor
	 */
	public constructor(options: Partial<IVKOptions> = {}) {
		this.setOptions(options);
	}

	/**
	 * Returns custom tag
	 */
	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Sets options
	 */
	public setOptions(options: Partial<IVKOptions>): this {
		Object.assign(this.options, options);

		this.internalHooks.emit('update_options', {
			keys: Object.keys(options)
		});

		return this;
	}
}

inspectable(VK, {
	serialize: ({
		api,
		updates,
		options
	}) => ({
		options: {
			appId: options.appId,
			token: options.token
				? '[set]'
				: '[none]'
		},
		api,
		updates
	})
});
