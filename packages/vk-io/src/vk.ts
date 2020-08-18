import { inspectable } from 'inspectable';

import { API } from './api';
import { Upload } from './upload';
import { Updates } from './updates';
import { CallbackService } from './utils/callback-service';

import { VKOptions } from './types';

/**
 * Main class
 */
export class VK {
	public api: API;

	public upload: Upload;

	public updates: Updates;

	public callbackService: CallbackService;

	/**
	 * Constructor
	 */
	public constructor(options: Partial<VKOptions> & { token: string }) {
		this.callbackService = options.callbackService
			|| new CallbackService();

		this.api = new API({
			...options,

			callbackService: this.callbackService
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
