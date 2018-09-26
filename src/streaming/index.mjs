import WebSocket from 'ws';
import fetch from 'node-fetch';
import createDebug from 'debug';

import nodeUrl from 'url';
import nodeUtil from 'util';

import { StreamingRuleError } from '../errors';
import { StreamingContext } from '../structures/contexts';

const { URL, URLSearchParams } = nodeUrl;
const { inspect, promisify } = nodeUtil;

const debug = createDebug('vk-io:streaming');

export default class StreamingAPI {
	/**
	 * Constructor
	 *
	 * @param {VK} vk
	 */
	constructor(vk) {
		this.vk = vk;

		this.key = null;
		this.socket = null;
		this.endpoint = null;

		this.started = null;
		this.handlers = [];
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag]() {
		return 'StreamingAPI';
	}

	/**
	 * Starts websocket
	 *
	 * @return {Promise}
	 */
	async startWebSocket() {
		this.started = 'websocket';

		try {
			const { key, endpoint } = await this.vk.api.streaming.getServerUrl();

			this.key = key;
			this.endPoint = new URL(`https://${endpoint}`);

			const search = new URLSearchParams({ key });

			const { agent } = this.vk.options;

			this.socket = new WebSocket(`wss://${endpoint}/stream?${search}`, { agent });
		} catch (error) {
			this.started = null;

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

				default:
					debug(`Unsupported message code: ${code}`);
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
	 *
	 * @return {Promise}
	 */
	async stop() {
		if (this.started === null) {
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
	 *
	 * @param {Object} serviceMessage
	 *
	 * @return {Promise}
	 */
	async handleServiceMessage({ service_code: code }) {
		if ([3000, 3001].includes(code)) {
			await this.stop();
			await this.start();
		}
	}

	/**
	 * Handles events
	 *
	 * @param {Object} event
	 *
	 * @return {Promise}
	 */
	handleEvent(event) {
		const context = new StreamingContext(this.vk, event);

		return this.vk.updates.dispatchMiddleware(context);
	}

	/**
	 * Executes the HTTP request for rules
	 *
	 * @param {string} method
	 * @param {Object} options
	 *
	 * @return {Promise<Object>}
	 */
	async fetchRules(method, payload = {}) {
		const { agent } = this.vk.options;

		const url = new URL('/rules', this.endPoint);
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
	async getRules() {
		const { rules = [] } = await this.fetchRules('GET');

		return rules;
	}

	/**
	 * Adds a rule
	 *
	 * @param {Object} rule
	 *
	 * @return {Promise}
	 */
	addRule(rule) {
		return this.fetchRules('POST', { rule });
	}

	/**
	 * Removes the rule
	 *
	 * @param {string} tag
	 *
	 * @return {Promise}
	 */
	deleteRule(tag) {
		return this.fetchRules('DELETE', { tag });
	}

	/**
	 * Adds a list of rules
	 *
	 * @param {Array} rules
	 *
	 * @return {Promise}
	 */
	addRules(rules) {
		return Promise.all(rules.map(rule => (
			this.addRule(rule)
		)));
	}

	/**
	 * Removes all rules
	 *
	 * @return {Promise}
	 */
	async deleteRules() {
		const rules = await this.getRules();

		const response = await Promise.all(rules.map(({ tag }) => (
			this.deleteRule(tag)
		)));

		return response;
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

		const { started, handlers } = this;

		const payload = { started, handlers };

		return `${options.stylize(name, 'special')} ${inspect(payload, options)}`;
	}
}
