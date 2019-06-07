import Button from './button';

export default class VKPayButton extends Button {
	/**
	 * Constructor
	 *
	 * @param {Object} options
	 */
	constructor({ hash, payload }) {
		super({
			action: {
				type: 'vkpay',
				hash,
				payload
			}
		});
	}
}
