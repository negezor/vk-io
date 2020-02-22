import fetch from 'node-fetch';
import createDebug from 'debug';
import * as WebSocket from 'ws';

import { VK, UpdateSource } from 'vk-io';

import { inspect } from 'util';
import { URL, URLSearchParams } from 'url';

import { StreamingRuleError } from './errors';
import { StreamingContext, IStreamingContextPayload } from './contexts';

const debug = createDebug('vk-io:streaming');

export interface IStreamingRule {
	value: string;
	tag: string;
}

export class StreamingAPI {
	protected socket?: WebSocket;

	protected key?: string;

	protected endpoint?: URL;

	protected started = false;

	private vk: VK;

	/**
	 * Constructor
	 */
	public constructor(vk: VK) {
		this.vk = vk;
	}

	/**
	 * Returns custom tag
	 */
	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Starts websocket
	 */
	public async startWebSocket(): Promise<void> {
		this.started = true;

		try {
			const { key, endpoint } = await this.vk.api.streaming.getServerUrl({});

			this.key = key!;
			this.endpoint = new URL(`https://${endpoint}`);

			const search = new URLSearchParams({ key });

			const { agent } = this.vk.options;

			this.socket = new WebSocket(`wss://${endpoint}/stream?${search}`, { agent });
		} catch (error) {
			this.started = false;

			throw error;
		}

		const { socket } = this;

		socket.on('message', async (data: string) => {
			let message;

			try {
				message = JSON.parse(data);
			} catch (error) {
				debug('JSON parse failed', error);

				return;
			}

			const { code } = message;

			try {
				switch (code) {
					case 100: {
						await this.handleEvent(message.event);

						break;
					}

					case 300: {
						await this.handleServiceMessage(message.service_message);

						break;
					}

					default: {
						debug(`Unsupported message code: ${code}`);
					}
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.log('Handle event error', error);
			}
		});

		socket.on('error', (error: Error) => {
			debug('WebSocket error', error);
		});
	}

	/**
	 * Stop all connection
	 */
	public async stop(): Promise<void> {
		if (!this.started) {
			return;
		}

		this.socket!.close();

		this.started = false;
	}

	/**
	 * Processes server messages
	 */
	public async handleServiceMessage(
		{ service_code: code }: { service_code: number }
	): Promise<void> {
		if ([3000, 3001].includes(code)) {
			await this.stop();
			await this.startWebSocket();
		}
	}

	/**
	 * Handles events
	 */
	private async handleEvent(event: IStreamingContextPayload): Promise<void> {
		const context = new StreamingContext({
			vk: this.vk,
			payload: event,

			state: {},

			updateType: 'publication',
			source: UpdateSource.WEBSOCKET
		});

		await this.vk.updates.dispatchMiddleware(context);
	}

	/**
	 * Executes the HTTP request for rules
	 */
	private async fetchRules<T = never>(method: string, payload: object = {}): Promise<T> {
		const { agent } = this.vk.options;

		const url = new URL('/rules', this.endpoint!);
		url.searchParams.set('key', this.key!);

		let body;
		if (method !== 'GET') {
			body = JSON.stringify(payload);
		}

		const response = await fetch(url, {
			agent,
			method,
			body,
			headers: {
				'content-type': 'application/json'
			}
		});

		const result = await response.json();

		if (result.error !== undefined) {
			throw new StreamingRuleError(result.error);
		}

		return result;
	}

	/**
	 * Returns a list of rules
	 */
	public async getRules(): Promise<IStreamingRule[]> {
		const { rules = [] } = await this.fetchRules<{ rules?: IStreamingRule[] }>('GET');

		return rules;
	}

	/**
	 * Adds a rule
	 */
	public async addRule(rule: IStreamingRule): Promise<void> {
		await this.fetchRules('POST', { rule });
	}

	/**
	 * Removes the rule
	 */
	public async deleteRule(tag: string): Promise<void> {
		await this.fetchRules('DELETE', { tag });
	}

	/**
	 * Adds a list of rules
	 */
	public async addRules(rules: IStreamingRule[]): Promise<void> {
		await Promise.all(rules.map(rule => (
			this.addRule(rule)
		)));
	}

	/**
	 * Removes all rules
	 */
	public async deleteRules(): Promise<void> {
		const rules = await this.getRules();

		await Promise.all(rules.map(({ tag }) => (
			this.deleteRule(tag)
		)));
	}

	/**
	 * Custom inspect object
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public [inspect.custom](depth: number, options: Record<string, any>): string {
		const { name } = this.constructor;

		const { started } = this;

		const payload = { started };

		return `${options.stylize(name, 'special')} ${inspect(payload, options)}`;
	}
}
