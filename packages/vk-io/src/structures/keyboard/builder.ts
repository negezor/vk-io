import {
	ButtonColor,
	KeyboardButton,

	IKeyboardTextButtonOptions,
	IKeyboardLocationRequestButtonOptions,
	IKeyboardVKPayButtonOptions,
	IKeyboardApplicationButtonOptions
} from './types';

export default class KeyboardBuilder {
	/**
	 * Does the keyboard close after pressing the button
	 */
	protected isOneTime: boolean = false;

	/**
	 * Rows with all buttons
	 */
	protected rows: KeyboardButton[][] = [];

	/**
	 * Current row of buttons
	 */
	protected currentRow: KeyboardButton[] = [];

	/**
	 * Returns custom tag
	 */
	get [Symbol.toStringTag](): string {
		return 'KeyboardBuilder';
	}


	/**
	 * Text button, can be colored
	 */
	textButton({
		label,
		payload: rawPayload = {},
		color = ButtonColor.SECONDARY
	}: IKeyboardTextButtonOptions): this {
		if (label.length > 40) {
			throw new RangeError('Maximum length of label 40 characters');
		}

		const payload = JSON.stringify(rawPayload);

		if (payload.length > 255) {
			throw new RangeError('Maximum length of payload 255 characters');
		}

		return this.addButton({
			color,
			action: {
				label,
				payload,

				type: 'text'
			}
		});
	}

	/**
	 * User location request button, occupies the entire keyboard width
	 */
	locationRequestButton({ payload: rawPayload = {} }: IKeyboardLocationRequestButtonOptions): this {
		const payload = JSON.stringify(rawPayload);

		if (payload.length > 255) {
			throw new RangeError('Maximum length of payload 255 characters');
		}

		return this.addWideButton({
			action: {
				payload,

				type: 'location'
			}
		});
	}

	/**
	 * VK Pay button, occupies the entire keyboard width
	 */
	payButton({ hash }: IKeyboardVKPayButtonOptions): this {
		return this.addWideButton({
			action: {
				hash,

				type: 'vkpay'
			}
		});
	}

	/**
	 * VK Apps button, occupies the entire keyboard width
	 */
	applicationButton({
		label,
		appId,
		ownerId,
		hash
	}: IKeyboardApplicationButtonOptions): this {
		if (label.length > 40) {
			throw new RangeError('Maximum length of label 40 characters');
		}

		return this.addWideButton({
			action: {
				label,
				hash,

				app_id: appId,
				owner_id: ownerId,

				type: 'open_app'
			}
		});
	}

	/**
	 * Saves the current row of buttons in the general rows
	 */
	row(): this {
		if (this.currentRow.length === 0) {
			return this;
		}

		if (this.currentRow.length > 4) {
			throw new RangeError('Max count of buttons at columns 4');
		}

		this.rows.push(this.currentRow);

		this.currentRow = [];

		return this;
	}

	/**
	 * Sets the keyboard to close after pressing
	 *
	 * ```ts
	 *  builder.oneTime();
	 *
	 *  builder.oneTime(false);
	 * ```
	 */
	oneTime(enabled: boolean = true): this {
		this.isOneTime = enabled;

		return this;
	}

	/**
	 * Returns a string to keyboard a VK
	 */
	toString(): string {
		if (this.rows.length > 10) {
			throw new RangeError('Max count of keyboard rows 10');
		}

		return JSON.stringify({
			one_time: this.isOneTime,
			buttons: this.rows
		});
	}

	/**
	 * Adds a button to the current row
	 */
	protected addButton(button: KeyboardButton): this {
		this.currentRow.push(button);

		return this;
	}

	/**
	 * Adds a wide button to the new row
	 */
	protected addWideButton(button: KeyboardButton): this {
		if (this.currentRow.length !== 0) {
			this.row();
		}

		this.addButton(button);

		return this.row();
	}
}
