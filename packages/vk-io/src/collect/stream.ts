import createDebug from 'debug';

import { inspect } from 'util';
import { Readable } from 'stream';

import VK from '../vk';
import { UsersUserFull, GroupsGroupFull } from '../api/schemas/objects';
import { CollectError, APIErrorCode, CollectErrorCode } from '../errors';

import Request from '../api/request';
import getExecuteCode from './execute-code';

const debug = createDebug('vk-io:collect:stream');

const { APP_TOKEN_NOT_VALID, RESPONSE_SIZE_TOO_BIG } = APIErrorCode;

const { EXECUTE_ERROR } = CollectErrorCode;

export interface ICollectStreamOptions {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	options: Record<string, any> & {
		parallelCount?: number;
		count?: number;
		offset?: number;
	};
	method: string;
	limit: number;
	max?: number;
}

export interface ICollectStreamResult<T> {
	items: T[];
	profiles: UsersUserFull[];
	groups: GroupsGroupFull[];
}

export interface ICollectChunkData<T> {
	received: number;
	percent: number;
	total: number;
	items: T[];
	profiles: UsersUserFull[];
	groups: GroupsGroupFull[];
}

export default class CollectStream<T> extends Readable {
	protected vk: VK;

	protected method: string;

	protected code: string;

	protected parallelCount: number;

	protected total: number | undefined;

	protected offset: number;

	protected skipOffset: number;

	protected received: number;

	protected attempts: number;

	protected supportExecute: boolean;

	protected promise: Promise<ICollectStreamResult<T>> | null;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected params: Record<string, any>;

	/**
	 * Constructor
	 */
	public constructor(vk: VK, {
		options,
		method,
		limit,
		max
	}: ICollectStreamOptions) {
		super({
			objectMode: true
		});

		this.vk = vk;

		const {
			parallelCount = 25,
			offset = 0,
			count,
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

		const hasMax = max !== undefined;
		const hasCount = count !== undefined;

		// @ts-ignore
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
	 */
	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Promise based
	 */
	public then(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		thenFn: (result: ICollectStreamResult<T>) => any,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		catchFn?: (error: Error) => any
	): Promise<ICollectStreamResult<T>> {
		if (this.promise === null) {
			const collectItems: T[] = [];
			const collectProfiles: UsersUserFull[] = [];
			const collectGroups: GroupsGroupFull[] = [];

			this.promise = new Promise((resolve, reject): void => {
				this
					.on('error', reject)
					.on('end', () => resolve({
						items: collectItems,
						profiles: collectProfiles,
						groups: collectGroups
					}))
					.on('data', ({ items, profiles, groups }) => {
						collectItems.push(...items);
						collectProfiles.push(...profiles);
						collectGroups.push(...groups);
					});
			});
		}

		return Promise.resolve(this.promise).then(thenFn, catchFn);
	}

	/**
	 * Fetch data
	 */
	// eslint-disable-next-line no-underscore-dangle
	public async _read(): Promise<void> {
		const isNotFirst = this.total !== undefined && this.received !== 0;

		if (isNotFirst && (this.total! - this.skipOffset) <= this.received) {
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

			const { count } = result;

			if (this.total === undefined || this.total > count) {
				this.total = count;
			}

			items = result.items;
			profiles = result.profiles;
			groups = result.groups;
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

			this.total = response.total;

			items = response.items;
			profiles = response.profiles;
			groups = response.groups;
		}

		const { length } = items;

		if (length === 0) {
			this.push(null);

			return;
		}

		this.offset += length;
		this.received += length;

		const { total, received } = this;

		let percent = Math.round((received / total!) * 100);

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
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public [inspect.custom](depth: number, options: Record<string, any>): string {
		const { name } = this.constructor;
		const { total, offset, received } = this;

		const payload = {
			total,
			offset,
			received
		};

		return `${options.stylize(name, 'special')} ${inspect(payload, options)}`;
	}

	public on(event: 'close', listener: () => void): this;

	public on(event: 'data', listener: (chunk: ICollectChunkData<T>) => void): this;

	public on(event: 'end', listener: () => void): this;

	public on(event: 'readable', listener: () => void): this;

	public on(event: 'error', listener: (err: Error) => void): this;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public on(event: string | symbol, listener: (...args: any[]) => void): this {
		return super.on(event, listener);
	}

	public [Symbol.asyncIterator](): AsyncIterableIterator<ICollectChunkData<T>> {
		return this[Symbol.asyncIterator]();
	}
}
