import Button from './button';

export default class LocationRequestButton extends Button {
	/**
	 * Constructor
	 *
	 * @param {Object} options
	 */
	constructor({ payload }) {
		super({
			action: {
				type: 'location',
				payload
			}
		});
	}
}
