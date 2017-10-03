import { scopes } from '../util/constants';

/**
 * Returns the entire permission bit mask
 *
 * @return {number}
 */
export const getAllPermissionsBitMask = () => (
	Array.from(scopes.values()).reduce((previous, current) => (
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
export const getPermissionsBitMaskByName = (scope) => {
	if (!Array.isArray(scope)) {
		scope = scope.split(/,\s{0,}/);
	}

	let bitMask = 0;

	for (const name of scope) {
		if (scopes.has(name)) {
			bitMask += scopes.get(name);
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
// eslint-disable-next-line import/prefer-default-export
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
