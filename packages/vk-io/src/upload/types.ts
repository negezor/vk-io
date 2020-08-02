import { AllowArray } from '../types';

/**
 * Stream, buffer, url or file path
 */
export type UploadSourceValue = NodeJS.ReadableStream | Buffer | string;

export interface IUploadSourceMedia {
	value: UploadSourceValue;

	filename?: string;
	contentType?: string;
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
