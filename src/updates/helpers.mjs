const lt = /&lt;/g;
const qt = /&gt;/g;
const br = /<br>/g;
const amp = /&amp;/g;
const quot = /&quot;/g;

/**
 * Decodes HTML entities
 *
 * @param {string} text
 *
 * @return {string}
 */
export const unescapeHTML = text => (
	text
		.replace(lt, '<')
		.replace(qt, '>')
		.replace(br, '\n')
		.replace(amp, '&')
		.replace(quot, '"')
);

/**
 * Separates a string through a separator
 *
 * @param {string} raw
 * @param {string} delimiter
 *
 * @return {Object[]}
 */
export const splitFwdDelimiter = (raw, delimiter) => {
	const out = [];

	let tmp = '';
	let left = 0;
	let right = 0;

	const keepResult = () => {
		out.push(tmp);
		tmp = '';
	};

	for (const sign of raw) {
		// eslint-disable-next-line default-case
		switch (sign) {
		case delimiter:
			if (left === right) {
				left = 0;
				right = 0;

				keepResult();

				continue;
			}

			break;
		case '(':
			left += 1;

			break;
		case ')':
			right += 1;
		}

		tmp += sign;
	}

	keepResult();

	return out;
};

/**
 * Parse the sent forwards messages
 *
 * @param {string} raw
 *
 * @return {Array}
 */
export const parseFwds = (raw) => {
	const out = [];

	for (const block of splitFwdDelimiter(raw, ',')) {
		const pair = splitFwdDelimiter(block, ':');

		if (pair.length === 0) {
			continue;
		}

		const [owner, id] = pair[0].split('_');

		const fwd = {
			id: Number(id),
			user_id: Number(owner),
			fwd_messages: []
		};

		if (pair.length !== 2) {
			out.push(fwd);

			continue;
		}

		fwd.fwd_messages = parseFwds(pair[1].substring(1, pair[1].length - 1));

		out.push(fwd);
	}

	return out;
};
