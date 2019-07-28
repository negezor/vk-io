import fetch from 'node-fetch';
import createDebug from 'debug';

import { URL, URLSearchParams } from 'url';

import VK from '../../vk';
import { delay } from '../../utils/helpers';
import { UpdatesError, updatesErrors } from '../../errors';

const { NEED_RESTART, POLLING_REQUEST_FAILED } = updatesErrors;

const debug = createDebug('vk-io:updates');

/**
 * Version polling
 */
const POLLING_VERSION = '3';

export default class PollingTransport {
	public started: boolean = false;

	/**
	 * 2 -  Attachments
	 * 8 -  Extended events
	 * 64 - Online user platform ID
	 */
	// eslint-disable-next-line no-bitwise
	public mode: number = 2 | 8 | 64;

	public pollingHandler: Function;

	protected vk: VK;

	protected ts: number = 0;

	protected pts: number = 0;

	protected restarted: number = 0;

	protected url?: URL;

	public constructor(vk: VK) {
		this.vk = vk;
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
			const { pollingGroupId } = this.vk.options;

			const isGroup = pollingGroupId !== null;

			const { server, key, ts } = isGroup
				// @ts-ignore
				? await this.vk.api.groups.getLongPollServer({
					group_id: pollingGroupId
				})
				// @ts-ignore
				: await this.vk.api.messages.getLongPollServer({
					lp_version: POLLING_VERSION
				});

			if (this.ts === 0) {
				this.ts = ts;
			}

			const pollingURL = isGroup
				? server
				: `https://${server}`;

			this.url = new URL(pollingURL);
			this.url.search = String(new URLSearchParams({
				key,
				act: 'a_check',
				wait: '25',
				mode: String(this.mode),
				version: POLLING_VERSION
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

			const { pollingWait, pollingAttempts } = this.vk.options;

			if (error.code !== NEED_RESTART && this.restarted < pollingAttempts) {
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

		let response = await fetch(this.url, {
			agent: this.vk.options.agent,
			method: 'GET',
			timeout: 30e3,
			compress: false,
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

		response = await response.json();

		if ('failed' in response) {
			if (response.failed === 1) {
				this.ts = response.ts;

				return;
			}

			this.ts = 0;

			throw new UpdatesError({
				code: NEED_RESTART,
				message: 'The server has failed'
			});
		}

		this.restarted = 0;
		this.ts = response.ts;

		if ('pts' in response) {
			this.pts = Number(response.pts);
		}

		/* Async handle updates */
		response.updates.forEach(async (update): Promise<void> => {
			try {
				await this.pollingHandler(update);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error('Handle polling update error:', error);
			}
		});
	}

	public subscribe(handler: Function): void {
		this.pollingHandler = handler;
	}
}
