import { Stream, Readable } from 'stream';

/**
 * Check object is stream
 */
export const isStream = (source: Readable | Buffer | string): boolean => (
	typeof source === 'object' && source instanceof Stream
);

/**
 * Copies object params to new object
 */
export const copyParams = <
	T,
	K extends keyof T
>(params: T, properties: K[]): Pick<T, K> => {
	// @ts-ignore
	const copies: Pick<T, K> = {};

	for (const property of properties) {
		if (property in params) {
			copies[property] = params[property];
		}
	}

	return copies;
};

/**
 * Returns buffer from stream in Promise
 */
export const streamToBuffer = (stream: Readable): Promise<Buffer> => (
	new Promise((resolve, reject): void => {
		const accum: Buffer[] = [];

		stream.on('error', reject);

		stream.on('end', (): void => {
			resolve(Buffer.concat(accum));
		});

		stream.on('data', (chunk): void => {
			accum.push(chunk);
		});
	})
);
