import nodeStream from 'stream';

const { Stream } = nodeStream;

/**
 * Check object is stream
 *
 * @param {Object} source
 *
 * @return {boolean}
 */
export const isStream = source => (
	typeof source === 'object' && source instanceof Stream
);

/**
 * Copies object params to new object
 *
 * @param {Object} params
 * @param {Array}  properties
 *
 * @return {Object}
 */
export const copyParams = (params, properties) => {
	const copies = {};

	for (const property of properties) {
		if (property in params) {
			copies[property] = params[property];
		}
	}

	return copies;
};

/**
 * Returns buffer from stream in Promise
 *
 * @param {Stream} stream
 *
 * @returns {Promise<Buffer>}
 */
export const streamToBuffer = stream => (
	new Promise((resolve, reject) => {
		const accum = [];

		stream.on('error', reject);

		stream.on('end', () => {
			resolve(Buffer.concat(accum));
		});

		stream.on('data', (chunk) => {
			accum.push(chunk);
		});
	})
);
