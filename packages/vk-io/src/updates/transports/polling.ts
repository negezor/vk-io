import fetch from 'node-fetch';
import createDebug from 'debug';
import { AbortController } from 'abort-controller';

import { URL, URLSearchParams } from 'url';

import { API } from '../../api';
import { delay } from '../../utils/helpers';
import { UpdatesError, UpdatesErrorCode } from '../../errors';
import { IUpdatesOptions } from '../updates';

const { NEED_RESTART, POLLING_REQUEST_FAILED } = UpdatesErrorCode;

const debug = createDebug('vk-io:updates');

/**
 * Version polling
 */
const POLLING_VERSION = 10;

export class PollingTransport {
	public started = false;

	/**
	 * 2 -  Attachments
	 * 8 -  Extended events
	 * 64 - Online user platform ID
	 * 128 - Return random_id
	 */
	// eslint-disable-next-line no-bitwise
	public mode = 2 | 8 | 64 | 128;

	public pollingHandler!: Function;

	protected api: API;

	protected ts: string | number = 0;

	protected pts = 0;

	protected restarted = 0;

	protected url!: URL;

	private options: Omit<IUpdatesOptions, 'api' | 'upload'>;

	public constructor({ api, ...options }: Omit<IUpdatesOptions, 'upload'>) {
		this.api = api;

		this.options = options;
	}

	public async start(): Promise<void> {
		if (this.started) {
			throw new Error('Polling updates already started');
		}

		if (!this.pollingHandler) {
			throw new Error('You didn\'t subscribe to updates');
		}

		this.started = true;

		try {
			const { pollingGroupId } = this.options;

			const isGroup = pollingGroupId !== undefined;

			const { server, key, ts } = isGroup
				? await this.api.groups.getLongPollServer({
					group_id: pollingGroupId!
				})
				: await this.api.messages.getLongPollServer({
					lp_version: POLLING_VERSION
				});

			if (this.ts === 0) {
				this.ts = ts!;
			}

			const pollingURL = isGroup
				? server
				: `https://${server}`;

			this.url = new URL(pollingURL!);
			this.url.search = String(new URLSearchParams({
				key,
				act: 'a_check',
				wait: '25',
				mode: String(this.mode),
				version: String(POLLING_VERSION)
			}));

			this.startFetchLoop();

			debug(`${isGroup ? 'Bot' : 'User'} Polling started`);
		} catch (error) {
			this.started = false;

			throw error;
		}
	}

	/**
	 * Stopping gets updates
	 */
	public async stop(): Promise<void> {
		this.started = false;

		this.restarted = 0;
	}

	/**
	 * Starts forever fetch updates  loop
	 */
	protected async startFetchLoop(): Promise<void> {
		try {
			while (this.started) {
				await this.fetchUpdates();
			}
		} catch (error) {
			debug('longpoll error', error);

			const { pollingWait, pollingRetryLimit } = this.options;

			if (error.code !== NEED_RESTART && this.restarted !== pollingRetryLimit) {
				this.restarted += 1;

				debug('longpoll restart request');

				await delay(3e3);

				this.startFetchLoop();

				return;
			}

			while (this.started) {
				try {
					await this.stop();
					await this.start();

					break;
				} catch (restartError) {
					debug('longpoll restarted error', restartError);

					this.started = true;

					await delay(pollingWait);
				}
			}
		}
	}

	/**
	 * Gets updates
	 */
	public async fetchUpdates(): Promise<void> {
		this.url.searchParams.set('ts', String(this.ts));

		debug('http -->');

		const controller = new AbortController();

		const interval = setTimeout(() => controller.abort(), 30e3);

		let result;
		try {
			const response = await fetch(this.url, {
				agent: this.options.agent,
				method: 'GET',
				compress: false,
				signal: controller.signal,
				headers: {
					connection: 'keep-alive'
				}
			});

			debug(`http <-- ${response.status}`);

			if (!response.ok) {
				throw new UpdatesError({
					code: POLLING_REQUEST_FAILED,
					message: 'Polling request failed'
				});
			}

			result = await response.json();
		} finally {
			clearTimeout(interval);
		}

		if (result.failed !== undefined) {
			if (result.failed === 1) {
				this.ts = result.ts;

				return;
			}

			this.ts = 0;

			throw new UpdatesError({
				code: NEED_RESTART,
				message: 'The server has failed'
			});
		}

		this.restarted = 0;
		this.ts = result.ts;

		if (result.pts) {
			this.pts = Number(result.pts);
		}

		/* Async handle updates */
		for (const update of result.updates) {
			this.pollingHandler(update);
		}
	}

	public subscribe(handler: Function): void {
		this.pollingHandler = handler;
	}
}
