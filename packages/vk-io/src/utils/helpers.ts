// @ts-ignore
import { MessageSource, PEER_CHAT_ID_OFFSET } from './constants';
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Returns params for execute
// @ts-ignore
 */
// @ts-ignore
export const getExecuteParams = (params: Record<string, object | string>): string => (
// @ts-ignore
	JSON.stringify(params, (key, value) => (
// @ts-ignore
		typeof value === 'object' && value !== params
// @ts-ignore
			? String(value)
// @ts-ignore
			: value
// @ts-ignore
	))
// @ts-ignore
);
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Returns method for execute
// @ts-ignore
 */
// @ts-ignore
export const getExecuteMethod = (
// @ts-ignore
	method: string,
// @ts-ignore
	params: Record<string, object | string> = {}
// @ts-ignore
): string => (
// @ts-ignore
	`API.${method}(${getExecuteParams(params)})`
// @ts-ignore
);
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Returns chain for execute
// @ts-ignore
 */
// @ts-ignore
export const getChainReturn = (methods: string[]): string => (
// @ts-ignore
	`return [${methods.join(',')}];`
// @ts-ignore
);
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Resolve task
// @ts-ignore
 */
// @ts-ignore
export const resolveExecuteTask = (
// @ts-ignore
	tasks: {
// @ts-ignore
		resolve: Function;
// @ts-ignore
		reject: Function;
// @ts-ignore
	}[],
// @ts-ignore
	result: {
// @ts-ignore
		errors: object[];
// @ts-ignore
		response: (object | false)[];
// @ts-ignore
	}
// @ts-ignore
): void => {
// @ts-ignore
	let errors = 0;
// @ts-ignore

// @ts-ignore
	result.response.forEach((response, i): void => {
// @ts-ignore
		if (response !== false) {
// @ts-ignore
			tasks[i].resolve(response);
// @ts-ignore

// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		tasks[i].reject(result.errors[errors]);
// @ts-ignore

// @ts-ignore
		errors += 1;
// @ts-ignore
	});
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Returns random ID
// @ts-ignore
 */
// @ts-ignore
export const getRandomId = (): number => (
// @ts-ignore
	Math.floor(Math.random() * 10_000) * Date.now()
// @ts-ignore
);
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Delay N-ms
// @ts-ignore
 */
// @ts-ignore
export const delay = (delayed: number): Promise<void> => (
// @ts-ignore
	new Promise((resolve): void => {
// @ts-ignore
		setTimeout(resolve, delayed);
// @ts-ignore
	})
// @ts-ignore
);
// @ts-ignore

// @ts-ignore
const lt = /&lt;/g;
// @ts-ignore
const qt = /&gt;/g;
// @ts-ignore
const br = /<br>/g;
// @ts-ignore
const amp = /&amp;/g;
// @ts-ignore
const quot = /&quot;/g;
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Decodes HTML entities
// @ts-ignore
 */
// @ts-ignore
export const unescapeHTML = (text: string): string => (
// @ts-ignore
	text
// @ts-ignore
		.replace(lt, '<')
// @ts-ignore
		.replace(qt, '>')
// @ts-ignore
		.replace(br, '\n')
// @ts-ignore
		.replace(amp, '&')
// @ts-ignore
		.replace(quot, '"')
// @ts-ignore
);
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Copies object params to new object
// @ts-ignore
 */
// @ts-ignore
export const pickProperties = <
// @ts-ignore
	T,
// @ts-ignore
	K extends keyof T
// @ts-ignore
>(params: T, properties: K[]): Pick<T, K> => {
// @ts-ignore
	const copies: Pick<T, K> = {} as Pick<T, K>;
// @ts-ignore

// @ts-ignore
	for (const property of properties) {
// @ts-ignore
		copies[property] = params[property];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return copies;
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Returns peer id type
// @ts-ignore
 */
// @ts-ignore
export const getPeerType = (id: number): string => {
// @ts-ignore
	if (PEER_CHAT_ID_OFFSET < id) {
// @ts-ignore
		return MessageSource.CHAT;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	if (id < 0) {
// @ts-ignore
		return MessageSource.GROUP;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return MessageSource.USER;
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Displays deprecated message
// @ts-ignore
 */
// @ts-ignore
export const showDeprecatedMessage = (message: string): void => {
// @ts-ignore
	// eslint-disable-next-line no-console
// @ts-ignore
	console.log(' \u001b[31mDeprecated:\u001b[39m', message);
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
// eslint-disable-next-line max-len
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
// @ts-ignore
export const applyMixins = (derivedCtor: any, baseCtors: any[]): void => {
// @ts-ignore
	for (const baseCtor of baseCtors) {
// @ts-ignore
		for (const name of Object.getOwnPropertyNames(baseCtor.prototype)) {
// @ts-ignore
			if (name === 'constructor') {
// @ts-ignore
				continue;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			Object.defineProperty(
// @ts-ignore
				derivedCtor.prototype,
// @ts-ignore
				name,
// @ts-ignore
				Object.getOwnPropertyDescriptor(baseCtor.prototype, name)!
// @ts-ignore
			);
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore
};
