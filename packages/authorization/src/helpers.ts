import { load as cheerioLoad } from 'cheerio';

import { URL } from 'url';

import { Response } from './fetch-cookie';
import { userScopes, groupScopes } from './constants';

export type CheerioStatic = ReturnType<typeof cheerioLoad>;

/**
 * Returns the bit mask of the user permission by name
 */
export const getUserPermissionsByName = (rawScope: string | string[]): number => {
	const scope = !Array.isArray(rawScope)
		? rawScope.split(/,\s*/)
		: rawScope;

	let bitMask = 0;

	for (const name of scope) {
		const scopeBit = userScopes.get(name);

		if (scopeBit) {
			bitMask += scopeBit;
		}
	}

	return bitMask;
};

/**
 * Returns the bit mask of the group permission by name
 */
export const getGroupPermissionsByName = (rawScope: string | string[]): number => {
	const scope = !Array.isArray(rawScope)
		? rawScope.split(/,\s*/)
		: rawScope;

	let bitMask = 0;

	for (const name of scope) {
		const scopeBit = groupScopes.get(name);

		if (scopeBit) {
			bitMask += scopeBit;
		}
	}

	return bitMask;
};

export const getAllUserPermissions = (): number => (
	getUserPermissionsByName([...userScopes.keys()])
);

export const getAllGroupPermissions = (): number => (
	getGroupPermissionsByName([...groupScopes.keys()])
);

/**
 * Parse form
 */
export const parseFormField = ($: unknown): {
	action: string;
	fields: Record<string, string>;
} => {
	const $form = ($ as CheerioStatic)('form[action][method]');

	const fields: Record<string, string> = {};

	for (const { name, value } of $form.serializeArray()) {
		fields[name] = value;
	}

	return {
		action: $form.attr('action')!,
		fields
	};
};

/**
 * Returns full URL use Response
 */
export const getFullURL = (action: string, { url }: Response): URL => {
	if (action.startsWith('https://')) {
		return new URL(action);
	}

	const { protocol, host } = new URL(url);

	return new URL(action, `${protocol}//${host}`);
};
