import { userScopes } from '../util/constants';

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
 * Returns the bit mask of the permission by name
 *
 * @param {Array|string} scope
 *
 * @return {number}
 */
export const getUsersPermissionsByName = (scope) => {
	if (!Array.isArray(scope)) {
		scope = scope.split(/,\s{0,}/);
	}

	let bitMask = 0;

	for (const name of scope) {
		if (userScopes.has(name)) {
			bitMask += userScopes.get(name);
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
