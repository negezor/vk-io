import { messageSources, CHAT_PEER } from '../../utils/constants';

/**
 * Returns peer id type
 *
 * @param {number} id
 *
 * @return {string}
 */
// eslint-disable-next-line import/prefer-default-export
export const getPeerType = (id) => {
	if (CHAT_PEER < id) {
		return messageSources.CHAT;
	}

	if (id < 0) {
		return messageSources.GROUP;
	}

	return messageSources.USER;
};
