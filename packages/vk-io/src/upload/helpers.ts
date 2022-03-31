// @ts-ignore
import { Stream, PassThrough } from 'stream';
// @ts-ignore
import { UploadNormalizedSourceOptions, UploadAllowedSource } from './types';
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Check object is stream
// @ts-ignore
 */
// @ts-ignore
export const isStream = (source: NodeJS.ReadableStream | Buffer | string): boolean => (
// @ts-ignore
	typeof source === 'object' && source instanceof Stream
// @ts-ignore
);
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Copies object params to new object
// @ts-ignore
 */
// @ts-ignore
export const pickExistingProperties = <
// @ts-ignore
	T,
// @ts-ignore
	K extends keyof T
// @ts-ignore
>(params: T, properties: K[]): Pick<T, K> => {
// @ts-ignore
	const copies: Pick<T, K> = {} as Pick<T, K>;
// @ts-ignore

// @ts-ignore
	for (const property of properties) {
// @ts-ignore
		if (params[property] !== undefined) {
// @ts-ignore
			copies[property] = params[property];
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return copies;
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
export const normalizeSource = (rawSource: UploadAllowedSource): UploadNormalizedSourceOptions => {
// @ts-ignore
	if ('value' in rawSource) {
// @ts-ignore
		return {
// @ts-ignore
			values: [rawSource]
// @ts-ignore
		};
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return {
// @ts-ignore
		...rawSource,
// @ts-ignore

// @ts-ignore
		values: Array.isArray(rawSource.values)
// @ts-ignore
			? rawSource.values
// @ts-ignore
			: [rawSource.values]
// @ts-ignore
	};
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
export const streamToBuffer = async (rawStream: NodeJS.ReadableStream): Promise<Buffer> => {
// @ts-ignore
	const stream = new PassThrough();
// @ts-ignore

// @ts-ignore
	rawStream.pipe(stream);
// @ts-ignore

// @ts-ignore
	const chunks: Buffer[] = [];
// @ts-ignore
	let totalSize = 0;
// @ts-ignore

// @ts-ignore
	for await (const chunk of stream) {
// @ts-ignore
		totalSize += chunk.length;
// @ts-ignore

// @ts-ignore
		chunks.push(chunk as Buffer);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return Buffer.concat(chunks, totalSize);
// @ts-ignore
};
