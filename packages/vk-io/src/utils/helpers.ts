import { MessageSource, CHAT_PEER } from './constants';

/**
 * Returns method for execute
 */
export const getExecuteMethod = (
	method: string,
	params: Record<string, object | string> = {}
): string => {
	const options: Record<string, string> = {};

	for (const [key, value] of Object.entries(params)) {
		options[key] = typeof value === 'object'
			? String(value)
			: value;
	}

	return `API.${method}(${JSON.stringify(options)})`;
};

/**
 * Returns chain for execute
 */
export const getChainReturn = (methods: string[]): string => (
	`return [${methods.join(',')}];`
);

/**
 * Resolve task
 */
export const resolveExecuteTask = (
	tasks: {
		resolve: Function;
		reject: Function;
	}[],
	result: {
		errors: object[];
		response: (object | false)[];
	}
): void => {
	let errors = 0;

	result.response.forEach((response, i): void => {
		if (response !== false) {
			tasks[i].resolve(response);

			return;
		}

		tasks[i].reject(result.errors[errors]);

		errors += 1;
	});
};

/**
 * Returns random ID
 */
export const getRandomId = (): string => (
	`${Math.floor(Math.random() * 1e4)}${Date.now()}`
);

/**
 * Delay N-ms
 */
export const delay = (delayed: number): Promise<void> => (
	new Promise((resolve): void => {
		setTimeout(resolve, delayed);
	})
);

const lt = /&lt;/g;
const qt = /&gt;/g;
const br = /<br>/g;
const amp = /&amp;/g;
const quot = /&quot;/g;

/**
 * Decodes HTML entities
 */
export const unescapeHTML = (text: string): string => (
	text
		.replace(lt, '<')
		.replace(qt, '>')
		.replace(br, '\n')
		.replace(amp, '&')
		.replace(quot, '"')
);

/**
 * Copies object params to new object
 */
export const copyParams = <
	T,
	K extends keyof T
>(params: T, properties: K[]): Pick<T, K> => {
	// @ts-ignore
	const copies: Pick<T, K> = {};

	for (const property of properties) {
		copies[property] = params[property];
	}

	return copies;
};

/**
 * Returns peer id type
 */
export const getPeerType = (id: number): string => {
	if (CHAT_PEER < id) {
		return MessageSource.CHAT;
	}

	if (id < 0) {
		return MessageSource.GROUP;
	}

	return MessageSource.USER;
};


/**
 * Displays deprecated message
 */
export const showDeprecatedMessage = (message: string): void => {
	// eslint-disable-next-line no-console
	console.log(' \u001b[31mDeprecated:\u001b[39m', message);
};
