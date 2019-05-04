import { VKError } from '../../errors';

import Button from './button';

export default class TextButton extends Button {
	/**
	 * Constructor
	 *
	 * @param {Object} options
	 */
	constructor({ color, label, payload }) {
		if (label.length > 40) {
			throw new VKError({
				message: 'Maximum length of label 40 characters'
			});
		}

		super({
			color,
			action: {
				type: 'text',
				label,
				payload
			}
		});
	}
}
