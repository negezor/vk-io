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

export const parsePhoneNumber = () => {};
