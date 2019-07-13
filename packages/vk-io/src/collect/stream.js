import createDebug from 'debug';

import nodeUtil from 'util';
import nodeStream from 'stream';

import { CollectError, apiErrors, collectErrors } from '../errors';

import Request from '../api/request';
import getExecuteCode from './execute-code';

const { inspect } = nodeUtil;
const { Readable } = nodeStream;

const debug = createDebug('vk-io:collect:stream');

const { APP_TOKEN_NOT_VALID, RESPONSE_SIZE_TOO_BIG } = apiErrors;

const { EXECUTE_ERROR } = collectErrors;

export default class CollectStream extends Readable {
	/**
	 * Constructor
	 *
	 * @param {VK} vk
	 */
	constructor(vk, {
		options,
		method,
		limit,
		max = null
	}) {
		super({
			objectMode: true
		});

		this.vk = vk;

		const {
			parallelCount = 25,
			count = null,
			offset = 0,
			...params
		} = options;

		this.method = method;
		this.params = {
			...params,

			count: limit
		};

		if (parallelCount < 1 || parallelCount > 25) {
			throw new RangeError('The number of parallel calls can be between 1 and 25');
		}

		this.parallelCount = parallelCount;

		const hasMax = max !== null;
		const hasCount = count !== null;

		if ((hasCount && hasMax && count > max) || (hasMax && !hasCount)) {
			this.total = max;
		} else {
			this.total = count;
		}

		this.offset = offset;
		this.skipOffset = offset;

		this.received = 0;

		this.attempts = 0;
		this.promise = null;
		this.supportExecute = true;

		this.code = getExecuteCode({
			params: this.params,
			parallelCount,
			method
		});
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag]() {
		return 'CollectStream';
	}

	/**
	 * Promise based
	 *
	 * @param {Function} thenFn
	 * @param {Function} catchFn
	 *
	 * @return {Promise<Object[]>}
	 */
	then(thenFn, catchFn) {
		if (this.promise === null) {
			let collectItems = [];
			let collectProfiles = [];
			let collectGroups = [];

			this.promise = new Promise((resolve, reject) => {
				this
					.on('error', reject)
					.on('end', () => resolve({
						items: collectItems,
						profiles: collectProfiles,
						groups: collectGroups
					}))
					.on('data', ({ items, profiles, groups }) => {
						collectItems = [...collectItems, ...items];
						collectProfiles = [...collectProfiles, ...profiles];
						collectGroups = [...collectGroups, ...groups];
					});
			});
		}

		return Promise.resolve(this.promise).then(thenFn, catchFn);
	}

	/**
	 * Fetch data
	 *
	 * @return {Promise}
	 */
	// eslint-disable-next-line no-underscore-dangle
	async _read() {
		const isNotFirst = this.total !== null && this.received !== 0;

		if (isNotFirst && (this.total - this.skipOffset) <= this.received) {
			this.push(null);

			return;
		}

		let items;
		let profiles;
		let groups;

		if (!this.supportExecute || this.parallelCount === 1) {
			const request = new Request(this.method, {
				...this.params,

				offset: this.offset
			});

			let result;
			try {
				result = await this.vk.api.callWithRequest(request);
			} catch (error) {
				const { collectAttempts } = this.vk.options;

				if (this.attempts >= collectAttempts) {
					this.emit('error', error);

					return;
				}

				this.attempts += 1;

				// eslint-disable-next-line no-underscore-dangle
				this._read();

				return;
			}

			const {
				count,
				items: collectItems,
				profiles: collectProfiles,
				groups: collectGroups
			} = result;

			if (this.total === null || this.total > count) {
				this.total = count;
			}

			[items, profiles, groups] = [collectItems, collectProfiles, collectGroups];
		} else {
			let result;
			try {
				result = await this.vk.api.execute({
					code: this.code,
					total: this.total,
					offset: this.offset,
					received: this.received
				});
			} catch (error) {
				if (error.code === APP_TOKEN_NOT_VALID) {
					this.supportExecute = false;

					debug('execute not supported in token');

					// eslint-disable-next-line no-underscore-dangle
					this._read();

					return;
				}

				if (error.code === RESPONSE_SIZE_TOO_BIG) {
					this.parallelCount -= 1;

					this.code = getExecuteCode({
						parallelCount: this.parallelCount,
						params: this.params,
						method: this.method
					});

					// eslint-disable-next-line no-underscore-dangle
					this._read();

					return;
				}

				const { collectAttempts } = this.vk.options;

				if (this.attempts >= collectAttempts) {
					this.emit('error', error);

					return;
				}

				this.attempts += 1;

				// eslint-disable-next-line no-underscore-dangle
				this._read();

				return;
			}

			const { response, errors } = result;

			if (errors.length > 0) {
				this.emit('error', new CollectError({
					message: 'Execute error',
					code: EXECUTE_ERROR,
					errors
				}));

				return;
			}

			const {
				total,
				items: collectItems,
				profiles: collectProfiles,
				groups: collectGroups
			} = response;

			this.total = total;

			[items, profiles, groups] = [collectItems, collectProfiles, collectGroups];
		}

		const { length } = items;

		if (length === 0) {
			this.push(null);

			return;
		}

		this.offset += length;
		this.received += length;

		const { total, received } = this;

		let percent = Math.round((received / total) * 100);

		if (Number.isNaN(percent)) {
			percent = 100;
		}

		this.push({
			received,
			percent,
			total,
			items,
			profiles,
			groups
		});
	}

	/**
	 * Custom inspect object
	 *
	 * @param {?number} depth
	 * @param {Object}  options
	 *
	 * @return {string}
	 */
	[inspect.custom](depth, options) {
		const { name } = this.constructor;
		const { total, offset, received } = this;

		const payload = {
			total,
			offset,
			received
		};

		return `${options.stylize(name, 'special')} ${inspect(payload, options)}`;
	}
}
