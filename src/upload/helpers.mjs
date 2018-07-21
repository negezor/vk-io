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
 * Copies stream to buffer
 * Source - https://github.com/bitinn/node-fetch/blob/5bc23d81cf7ebb97b0a7310b2c88c13cdaa706dc/src/body.js
 * @param {Stream} s
 * @param {Object} Options
 * @property [timeout]  timeout for conversion
 * @property [size]     max size to read
 *
 * @return {Object}
 */
export const streamToBuffer = (s, { timeout, size } = {
	timeout: 3000,
	size: 0
}) => {
	// body is null
	if (s === null) {
		return Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	const accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Promise((resolve, reject) => {
		let resTimeout;

		// allow timeout on slow response
		if (timeout) {
			resTimeout = setTimeout(() => {
				abort = true;
				reject(new Error(`Response timeout while trying to convert stream (over ${timeout}ms)`, 'body-timeout'));
			}, timeout);
		}

		// handle stream error, such as incorrect content-encoding
		s.on('error', (err) => {
			reject(new Error(`Invalid response body while trying to convert: ${err.message}`, 'system', err));
		});

		s.on('data', (chunk) => {
			if (abort || chunk === null) {
				return;
			}

			if (size && accumBytes + chunk.length > size) {
				abort = true;
				reject(new Error(`content size at over limit: ${size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		s.on('end', () => {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new Error(`Could not create Buffer from stream: ${err.message}`, 'system', err));
			}
		});
	});
};
