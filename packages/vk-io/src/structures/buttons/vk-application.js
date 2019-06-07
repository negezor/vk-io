import Button from './button';

export default class VKApplicationButton extends Button {
	/**
	 * Constructor
	 *
	 * @param {Object} options
	 */
	constructor({
		label,
		appId,
		ownerId,
		payload
	}) {
		super({
			action: {
				type: 'open_app',
				app_id: appId,
				owner_id: ownerId,
				label,
				payload
			}
		});
	}
}
