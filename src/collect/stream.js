import createDebug from 'debug';

import { inspect } from 'util';
import { Readable } from 'stream';

import { CollectError } from '../errors';

import Request from '../api/request';
import getExecuteCode from './execute-code';

const debug = createDebug('vk-io:collect:stream');

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

		if (parallelCount < 1) {
			throw new RangeError('The minimum number of parallel calls can be 1');
		} else if (parallelCount > 25) {
			throw new RangeError('The maximum number of parallel calls can be 25');
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

		this.promise = null;
		this.supportExecute = true;

		this.code = getExecuteCode({ method, params, parallelCount });
	}

	/**
	 * Promise based
	 *
	 * @param {Function} thenFn
	 * @param {Function} catchFn
	 *
	 * @return {Promise<Object>}
	 */
	then(thenFn, catchFn) {
		if (this.promise === null) {
			let collect = [];

			this.promise = new Promise((resolve, reject) => {
				this
					.on('error', reject)
					.on('end', () => resolve(collect))
					.on('data', ({ items }) => {
						collect = [...collect, ...items];
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
	async _read() {
		const isNotFirst = this.total !== null && this.received !== 0;

		if (isNotFirst && (this.total - this.skipOffset) <= this.received) {
			this.push(null);

			return;
		}

		let items;

		if (!this.supportExecute || this.parallelCount === 1) {
			const request = new Request(this.method, {
				...this.params,

				offset: this.offset
			});

			const { count, items: collect } = await this.vk.api.resolveExecuteTask(request);

			if (this.total === null || this.total > count) {
				this.total = count;
			}

			items = collect;
		} else {
			const { response, errors } = await this.vk.api.execute({
				code: this.code,
				offset: this.offset,
				total: this.total || 0,
				received: this.received,
			});

			if (errors.length > 0) {
				/* FIXME: Adds code error and set normal message */
				throw new CollectError({
					message: 'Execute error',
					code: 'METHOD_ERROR',
					errors
				});
			}

			const { total, items: collect } = response;

			this.total = total;

			items = collect;
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
			items
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
