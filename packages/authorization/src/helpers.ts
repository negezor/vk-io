// @ts-ignore
import { load as cheerioLoad } from 'cheerio';
// @ts-ignore

// @ts-ignore
import { URL } from 'url';
// @ts-ignore

// @ts-ignore
import { Response } from './fetch-cookie';
// @ts-ignore
import { userScopes, groupScopes } from './constants';
// @ts-ignore

// @ts-ignore
export type CheerioStatic = ReturnType<typeof cheerioLoad>;
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Returns the bit mask of the user permission by name
// @ts-ignore
 */
// @ts-ignore
export const getUserPermissionsByName = (rawScope: string | string[]): number => {
// @ts-ignore
	const scope = !Array.isArray(rawScope)
// @ts-ignore
		? rawScope.split(/,\s*/)
// @ts-ignore
		: rawScope;
// @ts-ignore

// @ts-ignore
	let bitMask = 0;
// @ts-ignore

// @ts-ignore
	for (const name of scope) {
// @ts-ignore
		const scopeBit = userScopes.get(name);
// @ts-ignore

// @ts-ignore
		if (scopeBit) {
// @ts-ignore
			bitMask += scopeBit;
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return bitMask;
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Returns the bit mask of the group permission by name
// @ts-ignore
 */
// @ts-ignore
export const getGroupPermissionsByName = (rawScope: string | string[]): number => {
// @ts-ignore
	const scope = !Array.isArray(rawScope)
// @ts-ignore
		? rawScope.split(/,\s*/)
// @ts-ignore
		: rawScope;
// @ts-ignore

// @ts-ignore
	let bitMask = 0;
// @ts-ignore

// @ts-ignore
	for (const name of scope) {
// @ts-ignore
		const scopeBit = groupScopes.get(name);
// @ts-ignore

// @ts-ignore
		if (scopeBit) {
// @ts-ignore
			bitMask += scopeBit;
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return bitMask;
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
export const getAllUserPermissions = (): number => (
// @ts-ignore
	getUserPermissionsByName([...userScopes.keys()])
// @ts-ignore
);
// @ts-ignore

// @ts-ignore
export const getAllGroupPermissions = (): number => (
// @ts-ignore
	getGroupPermissionsByName([...groupScopes.keys()])
// @ts-ignore
);
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Parse form
// @ts-ignore
 */
// @ts-ignore
export const parseFormField = ($: unknown): {
// @ts-ignore
	action: string;
// @ts-ignore
	fields: Record<string, string>;
// @ts-ignore
} => {
// @ts-ignore
	const $form = ($ as CheerioStatic)('form[action][method]');
// @ts-ignore

// @ts-ignore
	const fields: Record<string, string> = {};
// @ts-ignore

// @ts-ignore
	for (const { name, value } of $form.serializeArray()) {
// @ts-ignore
		fields[name] = value;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return {
// @ts-ignore
		action: $form.attr('action')!,
// @ts-ignore
		fields
// @ts-ignore
	};
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Returns full URL use Response
// @ts-ignore
 */
// @ts-ignore
export const getFullURL = (action: string, { url }: Response): URL => {
// @ts-ignore
	if (action.startsWith('https://')) {
// @ts-ignore
		return new URL(action);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	const { protocol, host } = new URL(url);
// @ts-ignore

// @ts-ignore
	return new URL(action, `${protocol}//${host}`);
// @ts-ignore
};
