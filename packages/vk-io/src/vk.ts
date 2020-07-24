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

	public api: API;

	public upload: Upload;

	public collect = new Collect(this);

	public updates = new Updates(this);

	public callbackService = new CallbackService();

	/**
	 * Constructor
	 */
	public constructor(options: Partial<IVKOptions> = {}) {
		Object.assign(this.options, options);

		this.api = new API({
			...options
		});

		this.upload = new Upload({
			api: this.api,

			...this.options
		});
	}

	/**
	 * Returns custom tag
	 */
	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
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
