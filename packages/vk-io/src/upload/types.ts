// @ts-ignore
import { Agent } from 'https';
// @ts-ignore

// @ts-ignore
import { AllowArray } from '../types';
// @ts-ignore
import { API } from '../api';
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Stream, buffer, url or file path
// @ts-ignore
 */
// @ts-ignore
export type UploadSourceValue = NodeJS.ReadableStream | Buffer | string;
// @ts-ignore

// @ts-ignore
export interface IUploadSourceMedia {
// @ts-ignore
	value: UploadSourceValue;
// @ts-ignore

// @ts-ignore
	filename?: string;
// @ts-ignore
	contentType?: string;
// @ts-ignore
	contentLength?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IUploadSourceOptions {
// @ts-ignore
	values: AllowArray<IUploadSourceMedia>;
// @ts-ignore

// @ts-ignore
	uploadUrl?: string;
// @ts-ignore
	timeout?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type UploadNormalizedSourceOptions = IUploadSourceOptions & {
// @ts-ignore
	values: IUploadSourceMedia[];
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
export type UploadAllowedSource = IUploadSourceOptions | IUploadSourceMedia;
// @ts-ignore

// @ts-ignore
export interface IUploadParams {
// @ts-ignore
	source: UploadAllowedSource;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IUploadConduct {
// @ts-ignore
	/**
// @ts-ignore
	 * Field name
// @ts-ignore
	 */
// @ts-ignore
	field: string;
// @ts-ignore
	/**
// @ts-ignore
	 * Upload params
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	params: IUploadParams & Record<string, any>;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Get server functions
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	getServer: (params: any) => Promise<{ upload_url: string }>;
// @ts-ignore
	/**
// @ts-ignore
	 * Copies server params
// @ts-ignore
	 */
// @ts-ignore
	serverParams?: string[];
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Save files functions
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	saveFiles: (params: any) => Promise<any>;
// @ts-ignore
	/**
// @ts-ignore
	 * Copies save params
// @ts-ignore
	 */
// @ts-ignore
	saveParams?: string[];
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Max uploaded files for one request
// @ts-ignore
	 */
// @ts-ignore
	maxFiles: number;
// @ts-ignore
	/**
// @ts-ignore
	 * Attachment type
// @ts-ignore
	 */
// @ts-ignore
	attachmentType?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IUploadOptions {
// @ts-ignore
	api: API;
// @ts-ignore

// @ts-ignore
	agent?: Agent;
// @ts-ignore
	uploadTimeout?: number;
// @ts-ignore
}
