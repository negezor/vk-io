// @ts-ignore
import WebSocket from 'ws';
// @ts-ignore
import createDebug from 'debug';
// @ts-ignore
import { inspectable } from 'inspectable';
// @ts-ignore

// @ts-ignore
import { API, Updates, UpdateSource } from 'vk-io';
// @ts-ignore

// @ts-ignore
import { Agent, globalAgent } from 'https';
// @ts-ignore
import { URL, URLSearchParams } from 'url';
// @ts-ignore

// @ts-ignore
import { fetch } from './fetch';
// @ts-ignore
import { StreamingRuleError } from './errors';
// @ts-ignore
import { StreamingContext, IStreamingContextPayload } from './contexts';
// @ts-ignore

// @ts-ignore
const debug = createDebug('vk-io:streaming');
// @ts-ignore

// @ts-ignore
export interface IStreamingRule {
// @ts-ignore
	value: string;
// @ts-ignore
	tag: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IStreamingAPI {
// @ts-ignore
	api: API;
// @ts-ignore

// @ts-ignore
	updates: Updates;
// @ts-ignore

// @ts-ignore
	agent: Agent;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export class StreamingAPI {
// @ts-ignore
	protected socket?: WebSocket;
// @ts-ignore

// @ts-ignore
	protected key?: string;
// @ts-ignore

// @ts-ignore
	protected endpoint?: URL;
// @ts-ignore

// @ts-ignore
	protected started = false;
// @ts-ignore

// @ts-ignore
	private api: API;
// @ts-ignore

// @ts-ignore
	private updates: Updates;
// @ts-ignore

// @ts-ignore
	private options: Omit<IStreamingAPI, 'api' | 'updates'>;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor({
// @ts-ignore
		api,
// @ts-ignore
		updates,
// @ts-ignore
		...options
// @ts-ignore
	}: Partial<IStreamingAPI> & { api: API; updates: Updates }) {
// @ts-ignore
		this.api = api;
// @ts-ignore

// @ts-ignore
		this.updates = updates;
// @ts-ignore

// @ts-ignore
		this.options = {
// @ts-ignore
			agent: globalAgent,
// @ts-ignore

// @ts-ignore
			...options
// @ts-ignore
		};
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns custom tag
// @ts-ignore
	 */
// @ts-ignore
	public get [Symbol.toStringTag](): string {
// @ts-ignore
		return this.constructor.name;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Starts websocket
// @ts-ignore
	 */
// @ts-ignore
	public async startWebSocket(): Promise<void> {
// @ts-ignore
		this.started = true;
// @ts-ignore

// @ts-ignore
		try {
// @ts-ignore
			const { key, endpoint } = await this.api.streaming.getServerUrl({});
// @ts-ignore

// @ts-ignore
			this.key = key!;
// @ts-ignore
			this.endpoint = new URL(`https://${endpoint}`);
// @ts-ignore

// @ts-ignore
			const search = new URLSearchParams({ key: key! });
// @ts-ignore

// @ts-ignore
			const { agent } = this.options;
// @ts-ignore

// @ts-ignore
			this.socket = new WebSocket(`wss://${endpoint}/stream?${search}`, { agent });
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

// @ts-ignore
		const { socket } = this;
// @ts-ignore

// @ts-ignore
		socket.on('message', async (data: string) => {
// @ts-ignore
			let message;
// @ts-ignore

// @ts-ignore
			try {
// @ts-ignore
				message = JSON.parse(data);
// @ts-ignore
			} catch (error) {
// @ts-ignore
				debug('JSON parse failed', error);
// @ts-ignore

// @ts-ignore
				return;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			const { code } = message;
// @ts-ignore

// @ts-ignore
			try {
// @ts-ignore
				switch (code) {
// @ts-ignore
					case 100: {
// @ts-ignore
						await this.handleEvent(message.event);
// @ts-ignore

// @ts-ignore
						break;
// @ts-ignore
					}
// @ts-ignore

// @ts-ignore
					case 300: {
// @ts-ignore
						await this.handleServiceMessage(message.service_message);
// @ts-ignore

// @ts-ignore
						break;
// @ts-ignore
					}
// @ts-ignore

// @ts-ignore
					default: {
// @ts-ignore
						debug(`Unsupported message code: ${code}`);
// @ts-ignore
					}
// @ts-ignore
				}
// @ts-ignore
			} catch (error) {
// @ts-ignore
				// eslint-disable-next-line no-console
// @ts-ignore
				console.log('Handle event error', error);
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		socket.on('error', (error: Error) => {
// @ts-ignore
			debug('WebSocket error', error);
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Stop all connection
// @ts-ignore
	 */
// @ts-ignore
	public async stop(): Promise<void> {
// @ts-ignore
		if (!this.started) {
// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		this.socket!.close();
// @ts-ignore

// @ts-ignore
		this.started = false;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Processes server messages
// @ts-ignore
	 */
// @ts-ignore
	public async handleServiceMessage(
// @ts-ignore
		{ service_code: code }: { service_code: number }
// @ts-ignore
	): Promise<void> {
// @ts-ignore
		if ([3000, 3001].includes(code)) {
// @ts-ignore
			await this.stop();
// @ts-ignore
			await this.startWebSocket();
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Handles events
// @ts-ignore
	 */
// @ts-ignore
	private async handleEvent(event: IStreamingContextPayload): Promise<void> {
// @ts-ignore
		const context = new StreamingContext({
// @ts-ignore
			api: this.api,
// @ts-ignore
			// @ts-expect-error
// @ts-ignore
			upload: this.updates.upload,
// @ts-ignore
			payload: event,
// @ts-ignore

// @ts-ignore
			state: {},
// @ts-ignore

// @ts-ignore
			updateType: 'publication',
// @ts-ignore
			source: UpdateSource.WEBSOCKET
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		await this.updates.dispatchMiddleware(context);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Executes the HTTP request for rules
// @ts-ignore
	 */
// @ts-ignore
	private async fetchRules<T = never>(method: string, payload: object = {}): Promise<T> {
// @ts-ignore
		const { agent } = this.options;
// @ts-ignore

// @ts-ignore
		const url = new URL('/rules', this.endpoint!);
// @ts-ignore
		url.searchParams.set('key', this.key!);
// @ts-ignore

// @ts-ignore
		let body;
// @ts-ignore
		if (method !== 'GET') {
// @ts-ignore
			body = JSON.stringify(payload);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const response = await fetch(url, {
// @ts-ignore
			agent,
// @ts-ignore
			method,
// @ts-ignore
			body,
// @ts-ignore
			headers: {
// @ts-ignore
				'content-type': 'application/json'
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
		const result = await response.json() as any;
// @ts-ignore

// @ts-ignore
		if (result.error !== undefined) {
// @ts-ignore
			throw new StreamingRuleError(result.error);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return result;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns a list of rules
// @ts-ignore
	 */
// @ts-ignore
	public async getRules(): Promise<IStreamingRule[]> {
// @ts-ignore
		const { rules } = await this.fetchRules<{ rules: IStreamingRule[] | null }>('GET');
// @ts-ignore

// @ts-ignore
		return rules || [];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Adds a rule
// @ts-ignore
	 */
// @ts-ignore
	public async addRule(rule: IStreamingRule): Promise<void> {
// @ts-ignore
		await this.fetchRules('POST', { rule });
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Removes the rule
// @ts-ignore
	 */
// @ts-ignore
	public async deleteRule(tag: string): Promise<void> {
// @ts-ignore
		await this.fetchRules('DELETE', { tag });
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Adds a list of rules
// @ts-ignore
	 */
// @ts-ignore
	public async addRules(rules: IStreamingRule[]): Promise<void> {
// @ts-ignore
		await Promise.all(rules.map(rule => (
// @ts-ignore
			this.addRule(rule)
// @ts-ignore
		)));
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Removes all rules
// @ts-ignore
	 */
// @ts-ignore
	public async deleteRules(): Promise<void> {
// @ts-ignore
		const rules = await this.getRules();
// @ts-ignore

// @ts-ignore
		await Promise.all(rules.map(({ tag }) => (
// @ts-ignore
			this.deleteRule(tag)
// @ts-ignore
		)));
// @ts-ignore
	}
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
inspectable(StreamingAPI, {
// @ts-ignore
	// @ts-expect-error
// @ts-ignore
	serialize: ({ started }) => ({
// @ts-ignore
		started
// @ts-ignore
	})
// @ts-ignore
});
