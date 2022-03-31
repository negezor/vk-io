// @ts-ignore
import createDebug from 'debug';
// @ts-ignore
import { AbortController } from 'abort-controller';
// @ts-ignore

// @ts-ignore
import { URL, URLSearchParams } from 'url';
// @ts-ignore

// @ts-ignore
import { API } from '../../api';
// @ts-ignore
import { fetch } from '../../utils/fetch';
// @ts-ignore
import { delay } from '../../utils/helpers';
// @ts-ignore
import { UpdatesError, UpdatesErrorCode } from '../../errors';
// @ts-ignore
import { IUpdatesOptions } from '../updates';
// @ts-ignore

// @ts-ignore
const { NEED_RESTART, POLLING_REQUEST_FAILED } = UpdatesErrorCode;
// @ts-ignore

// @ts-ignore
const debug = createDebug('vk-io:updates');
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Version polling
// @ts-ignore
 */
// @ts-ignore
const POLLING_VERSION = 10;
// @ts-ignore

// @ts-ignore
export class PollingTransport {
// @ts-ignore
	public started = false;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * 2 -  Attachments
// @ts-ignore
	 * 8 -  Extended events
// @ts-ignore
	 * 64 - Online user platform ID
// @ts-ignore
	 * 128 - Return random_id
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line no-bitwise
// @ts-ignore
	public mode = 2 | 8 | 64 | 128;
// @ts-ignore

// @ts-ignore
	public pollingHandler!: Function;
// @ts-ignore

// @ts-ignore
	protected api: API;
// @ts-ignore

// @ts-ignore
	protected ts: string | number = 0;
// @ts-ignore

// @ts-ignore
	protected pts = 0;
// @ts-ignore

// @ts-ignore
	protected restarted = 0;
// @ts-ignore

// @ts-ignore
	protected url!: URL;
// @ts-ignore

// @ts-ignore
	private options: Omit<IUpdatesOptions, 'api' | 'upload'>;
// @ts-ignore

// @ts-ignore
	public constructor({ api, ...options }: Omit<IUpdatesOptions, 'upload'>) {
// @ts-ignore
		this.api = api;
// @ts-ignore

// @ts-ignore
		this.options = options;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public async start(): Promise<void> {
// @ts-ignore
		if (this.started) {
// @ts-ignore
			throw new Error('Polling updates already started');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (!this.pollingHandler) {
// @ts-ignore
			throw new Error('You didn\'t subscribe to updates');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		this.started = true;
// @ts-ignore

// @ts-ignore
		try {
// @ts-ignore
			const { pollingGroupId } = this.options;
// @ts-ignore

// @ts-ignore
			const isGroup = pollingGroupId !== undefined;
// @ts-ignore

// @ts-ignore
			const { server, key, ts } = isGroup
// @ts-ignore
				? await this.api.groups.getLongPollServer({
// @ts-ignore
					group_id: pollingGroupId!
// @ts-ignore
				})
// @ts-ignore
				: await this.api.messages.getLongPollServer({
// @ts-ignore
					lp_version: POLLING_VERSION
// @ts-ignore
				});
// @ts-ignore

// @ts-ignore
			if (this.ts === 0) {
// @ts-ignore
				this.ts = ts!;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			const pollingURL = isGroup
// @ts-ignore
				? server
// @ts-ignore
				: `https://${server}`;
// @ts-ignore

// @ts-ignore
			this.url = new URL(pollingURL!);
// @ts-ignore
			this.url.search = String(new URLSearchParams({
// @ts-ignore
				key,
// @ts-ignore
				act: 'a_check',
// @ts-ignore
				wait: '25',
// @ts-ignore
				mode: String(this.mode),
// @ts-ignore
				version: String(POLLING_VERSION)
// @ts-ignore
			}));
// @ts-ignore

// @ts-ignore
			this.startFetchLoop();
// @ts-ignore

// @ts-ignore
			debug(`${isGroup ? 'Bot' : 'User'} Polling started`);
// @ts-ignore
		} catch (error) {
// @ts-ignore
			this.started = false;
// @ts-ignore

// @ts-ignore
			throw error;
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Stopping gets updates
// @ts-ignore
	 */
// @ts-ignore
	public async stop(): Promise<void> {
// @ts-ignore
		this.started = false;
// @ts-ignore

// @ts-ignore
		this.restarted = 0;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Starts forever fetch updates  loop
// @ts-ignore
	 */
// @ts-ignore
	protected async startFetchLoop(): Promise<void> {
// @ts-ignore
		try {
// @ts-ignore
			while (this.started) {
// @ts-ignore
				await this.fetchUpdates();
// @ts-ignore
			}
// @ts-ignore
		} catch (error) {
// @ts-ignore
			debug('longpoll error', error);
// @ts-ignore

// @ts-ignore
			const { pollingWait, pollingRetryLimit } = this.options;
// @ts-ignore

// @ts-ignore
			if ((error as UpdatesError).code !== NEED_RESTART && this.restarted !== pollingRetryLimit) {
// @ts-ignore
				this.restarted += 1;
// @ts-ignore

// @ts-ignore
				debug('longpoll restart request');
// @ts-ignore

// @ts-ignore
				await delay(3e3);
// @ts-ignore

// @ts-ignore
				this.startFetchLoop();
// @ts-ignore

// @ts-ignore
				return;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			while (this.started) {
// @ts-ignore
				try {
// @ts-ignore
					await this.stop();
// @ts-ignore
					await this.start();
// @ts-ignore

// @ts-ignore
					break;
// @ts-ignore
				} catch (restartError) {
// @ts-ignore
					debug('longpoll restarted error', restartError);
// @ts-ignore

// @ts-ignore
					this.started = true;
// @ts-ignore

// @ts-ignore
					await delay(pollingWait);
// @ts-ignore
				}
// @ts-ignore
			}
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Gets updates
// @ts-ignore
	 */
// @ts-ignore
	public async fetchUpdates(): Promise<void> {
// @ts-ignore
		this.url.searchParams.set('ts', String(this.ts));
// @ts-ignore

// @ts-ignore
		debug('http -->');
// @ts-ignore

// @ts-ignore
		const controller = new AbortController();
// @ts-ignore

// @ts-ignore
		const interval = setTimeout(() => controller.abort(), 30e3);
// @ts-ignore

// @ts-ignore
		let result;
// @ts-ignore
		try {
// @ts-ignore
			const response = await fetch(this.url, {
// @ts-ignore
				agent: this.options.agent,
// @ts-ignore
				method: 'GET',
// @ts-ignore
				compress: false,
// @ts-ignore
				signal: controller.signal,
// @ts-ignore
				headers: {
// @ts-ignore
					connection: 'keep-alive'
// @ts-ignore
				}
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			debug(`http <-- ${response.status}`);
// @ts-ignore

// @ts-ignore
			if (!response.ok) {
// @ts-ignore
				throw new UpdatesError({
// @ts-ignore
					code: POLLING_REQUEST_FAILED,
// @ts-ignore
					message: 'Polling request failed'
// @ts-ignore
				});
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
			result = await response.json() as any;
// @ts-ignore
		} finally {
// @ts-ignore
			clearTimeout(interval);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (result.failed !== undefined) {
// @ts-ignore
			if (result.failed === 1) {
// @ts-ignore
				this.ts = result.ts;
// @ts-ignore

// @ts-ignore
				return;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			this.ts = 0;
// @ts-ignore

// @ts-ignore
			throw new UpdatesError({
// @ts-ignore
				code: NEED_RESTART,
// @ts-ignore
				message: 'The server has failed'
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		this.restarted = 0;
// @ts-ignore
		this.ts = result.ts;
// @ts-ignore

// @ts-ignore
		if (result.pts) {
// @ts-ignore
			this.pts = Number(result.pts);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		/* Async handle updates */
// @ts-ignore
		for (const update of result.updates) {
// @ts-ignore
			this.pollingHandler(update);
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public subscribe(handler: Function): void {
// @ts-ignore
		this.pollingHandler = handler;
// @ts-ignore
	}
// @ts-ignore
}
