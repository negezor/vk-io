// @ts-ignore
import { inspectable } from 'inspectable';
// @ts-ignore

// @ts-ignore
import { API } from './api';
// @ts-ignore
import { Upload } from './upload';
// @ts-ignore
import { Updates } from './updates';
// @ts-ignore
import { CallbackService } from './utils/callback-service';
// @ts-ignore

// @ts-ignore
import { VKOptions } from './types';
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Main class
// @ts-ignore
 */
// @ts-ignore
export class VK {
// @ts-ignore
	public api: API;
// @ts-ignore

// @ts-ignore
	public upload: Upload;
// @ts-ignore

// @ts-ignore
	public updates: Updates;
// @ts-ignore

// @ts-ignore
	public callbackService: CallbackService;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: Partial<VKOptions> & { token: string }) {
// @ts-ignore
		this.callbackService = options.callbackService
// @ts-ignore
			|| new CallbackService();
// @ts-ignore

// @ts-ignore
		this.api = new API({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			callbackService: this.callbackService
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.upload = new Upload({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			api: this.api
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.updates = new Updates({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			api: this.api,
// @ts-ignore
			upload: this.upload
// @ts-ignore
		});
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
}
// @ts-ignore

// @ts-ignore
inspectable(VK, {
// @ts-ignore
	serialize: ({ api, updates }) => ({ api, updates })
// @ts-ignore
});
