import { inspectable } from 'inspectable';

import { Agent } from 'https';

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

	public collect: Collect;

	public updates: Updates;

	public callbackService = new CallbackService();

	/**
	 * Constructor
	 */
	public constructor(options: Partial<IVKOptions> & { token: string }) {
		Object.assign(this.options, options);

		this.api = new API({
			...options,

			callbackService: this.callbackService
		});

		this.collect = new Collect({
			api: this.api
		});

		this.upload = new Upload({
			api: this.api,

			...this.options
		});

		this.updates = new Updates({
			api: this.api,
			upload: this.upload,

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
