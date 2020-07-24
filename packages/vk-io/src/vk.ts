import { inspectable } from 'inspectable';

import { API } from './api';
import { Upload } from './upload';
import { Collect } from './collect';
import { Updates } from './updates';
import { CallbackService } from './utils/callback-service';

import { VKOptions } from './types';

/**
 * Main class
 */
export class VK {
	public api: API;

	public upload: Upload;

	public collect: Collect;

	public updates: Updates;

	public callbackService = new CallbackService();

	/**
	 * Constructor
	 */
	public constructor(options: Partial<VKOptions> & { token: string }) {
		this.api = new API({
			...options,

			callbackService: this.callbackService
		});

		this.collect = new Collect({
			api: this.api
		});

		this.upload = new Upload({
			...options,

			api: this.api
		});

		this.updates = new Updates({
			...options,

			api: this.api,
			upload: this.upload
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
	serialize: ({ api, updates }) => ({ api, updates })
});
