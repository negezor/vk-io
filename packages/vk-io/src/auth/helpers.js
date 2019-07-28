import nodeUrl from 'url';

import { userScopes, groupScopes } from '../utils/constants';

const { URL } = nodeUrl;

/**
 * Returns the entire permission bit mask
 *
 * @return {number}
 */
export const getAllUsersPermissions = () => (
	Array.from(userScopes.values()).reduce((previous, current) => (
		previous + current
	), 0)
);

/**
 * Returns the entire permission bit mask
 *
 * @return {number}
 */
export const getAllGroupsPermissions = () => (
	Array.from(groupScopes.values()).reduce((previous, current) => (
		previous + current
	), 0)
);

/**
 * Returns the bit mask of the user permission by name
 *
 * @param {Array|string} scope
 *
 * @return {number}
 */
export const getUsersPermissionsByName = (rawScope) => {
	const scope = !Array.isArray(rawScope)
		? rawScope.split(/,\s{0,}/)
		: rawScope;

	let bitMask = 0;

	for (const name of scope) {
		if (userScopes.has(name)) {
			bitMask += userScopes.get(name);
		}
	}

	return bitMask;
};

/**
 * Returns the bit mask of the group permission by name
 *
 * @param {Array|string} scope
 *
 * @return {number}
 */
export const getGroupsPermissionsByName = (rawScope) => {
	const scope = !Array.isArray(rawScope)
		? rawScope.split(/,\s{0,}/)
		: rawScope;

	let bitMask = 0;

	for (const name of scope) {
		if (groupScopes.has(name)) {
			bitMask += groupScopes.get(name);
		}
	}

	return bitMask;
};

/**
 * Parse form
 *
 * @param {Cheerio} $
 *
 * @return {Object}
 */
export const parseFormField = ($) => {
	const $form = $('form[action][method]');

	const fields = {};

	for (const { name, value } of $form.serializeArray()) {
		fields[name] = value;
	}

	return {
		action: $form.attr('action'),
		fields
	};
};

/**
 * Returns full URL use Response
 *
 * @param {string}   action
 * @param {Response} response
 *
 * @type {URL}
 */
export const getFullURL = (action, { url }) => {
	if (action.startsWith('https://')) {
		return new URL(action);
	}

	const { protocol, host } = new URL(url);

	return new URL(action, `${protocol}//${host}`);
};
