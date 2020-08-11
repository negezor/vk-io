import { Agent } from 'https';

import { AllowArray } from '../types';
import { API } from '../api';

/**
 * Stream, buffer, url or file path
 */
export type UploadSourceValue = NodeJS.ReadableStream | Buffer | string;

export interface IUploadSourceMedia {
	value: UploadSourceValue;

	filename?: string;
	contentType?: string;
	contentLength?: number;
}

export interface IUploadSourceOptions {
	values: AllowArray<IUploadSourceMedia>;

	uploadUrl?: string;
	timeout?: number;
}

export type UploadNormalizedSourceOptions = IUploadSourceOptions & {
	values: IUploadSourceMedia[];
};

export type UploadAllowedSource = IUploadSourceOptions | IUploadSourceMedia;

export interface IUploadParams {
	source: UploadAllowedSource;
}

export interface IUploadConduct {
	/**
	 * Field name
	 */
	field: string;
	/**
	 * Upload params
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params: IUploadParams & Record<string, any>;

	/**
	 * Get server functions
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getServer: (params: any) => Promise<{ upload_url: string }>;
	/**
	 * Copies server params
	 */
	serverParams?: string[];

	/**
	 * Save files functions
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	saveFiles: (params: any) => Promise<any>;
	/**
	 * Copies save params
	 */
	saveParams?: string[];

	/**
	 * Max uploaded files for one request
	 */
	maxFiles: number;
	/**
	 * Attachment type
	 */
	attachmentType?: string;
}

export interface IUploadOptions {
	api: API;

	agent?: Agent;
	uploadTimeout?: number;
}
