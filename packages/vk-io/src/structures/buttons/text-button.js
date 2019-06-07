import { VKError } from '../../errors';

import Button from './button';

export default class TextButton extends Button {
	/**
	 * Constructor
	 *
	 * @param {Object} options
	 */
	constructor({ color = Button.DEFAULT_COLOR, label, payload }) {
		if (label.length > 40) {
			throw new VKError({
				message: 'Maximum length of label 40 characters'
			});
		}

		super({
			action: {
				type: 'text',
				label,
				payload
			}
		});

		this.color = color;
	}

	/**
	 * Returns to JSON
	 *
	 * @return {Object}
	 */
	toJSON() {
		return {
			color: this.color,
			action: this.action
		};
	}
}
