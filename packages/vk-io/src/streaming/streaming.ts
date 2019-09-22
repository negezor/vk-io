import WebSocket from 'ws';
import fetch from 'node-fetch';
import createDebug from 'debug';

import { URL, URLSearchParams } from 'url';
import { inspect, promisify } from 'util';

import VK from '../vk';
import { StreamingRuleError } from '../errors';
import { StreamingContext } from '../structures/contexts';

const debug = createDebug('vk-io:streaming');

export interface IStreamingRule {
	value: string;
	tag: string;
}

export default class StreamingAPI {
	protected socket: WebSocket = null;

	protected key: string = null;

	protected endpoint: URL = null;

	protected started = false;

	private vk: VK;

	private close: () => Promise<void> = null;

	/**
	 * Constructor
	 */
	public constructor(vk: VK) {
		this.vk = vk;
	}

	/**
	 * Returns custom tag
	 */
	// eslint-disable-next-line class-methods-use-this
	public get [Symbol.toStringTag](): string {
		return 'StreamingAPI';
	}

	/**
	 * Starts websocket
	 */
	public async startWebSocket(): Promise<void> {
		this.started = true;

		try {
			// @ts-ignore
			const { key, endpoint } = await this.vk.api.streaming.getServerUrl();

			this.key = key;
			this.endpoint = new URL(`https://${endpoint}`);

			const search = new URLSearchParams({ key });

			const { agent } = this.vk.options;

			this.socket = new WebSocket(`wss://${endpoint}/stream?${search}`, { agent });
		} catch (error) {
			this.started = false;

			throw error;
		}

		const { socket } = this;

		this.close = promisify(socket.close).bind(socket);

		socket.on('message', async (data) => {
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

		socket.on('error', (error) => {
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

		await this.close();

		this.started = null;

		this.key = null;
		this.socket = null;
		this.endpoint = null;
	}

	/**
	 * Processes server messages
	 */
	public async handleServiceMessage({ service_code: code }): Promise<void> {
		if ([3000, 3001].includes(code)) {
			await this.stop();
			await this.startWebSocket();
		}
	}

	/**
	 * Handles events
	 */
	private handleEvent(event: object): Promise<void> {
		const context = new StreamingContext({
			vk: this.vk,
			// @ts-ignore
			payload: event
		});

		return this.vk.updates.dispatchMiddleware(context);
	}

	/**
	 * Executes the HTTP request for rules
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private async fetchRules(method: string, payload: object = {}): Promise<Record<string, any>> {
		const { agent } = this.vk.options;

		const url = new URL('/rules', this.endpoint);
		url.searchParams.set('key', this.key);

		let body;
		if (method !== 'GET') {
			body = JSON.stringify(payload);
		}

		let response = await fetch(url, {
			agent,
			method,
			body,
			headers: {
				'content-type': 'application/json'
			}
		});
		response = await response.json();

		if ('error' in response) {
			throw new StreamingRuleError(response.error);
		}

		return response;
	}

	/**
	 * Returns a list of rules
	 *
	 * @return {Promise<Array>}
	 */
	public async getRules(): Promise<IStreamingRule[]> {
		const { rules = [] } = await this.fetchRules('GET');

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
