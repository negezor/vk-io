import { URLSearchParams } from 'url';

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
	 *
	 * ```ts
	 * builder.textButton({
	 *  label: 'Buy a coffee',
	 *  payload: {
	 *   command: 'buy',
	 *   item: 'coffee'
	 *  },
	 *  color: Keyboard.POSITIVE_COLOR
	 * });
	 * ```
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
	 *
	 * ```ts
	 * builder.locationRequestButton({
	 *  payload: {
	 *   command: 'order_delivery'
	 *  }
	 * })
	 * ```
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
	 *
	 * ```ts
	 * builder.payButton({
	 *  hash: {
	 *   action: 'transfer-to-group',
	 *   group_id: 1,
	 *   aid: 10
	 *  }
	 * })
	 * ```
	 */
	payButton({ hash: rawHash }: IKeyboardVKPayButtonOptions): this {
		const hash = typeof rawHash === 'object'
			? String(new URLSearchParams(Object.entries(rawHash)))
			: rawHash;

		return this.addWideButton({
			action: {
				hash,

				type: 'vkpay'
			}
		});
	}

	/**
	 * VK Apps button, occupies the entire keyboard width
	 *
	 * ```ts
	 * builder.applicationButton({
	 *  label: 'LiveWidget',
	 *  appId: 6232540,
	 *  ownerId: -157525928
	 * })
	 * ```
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
	 * Clones the builder with all the settings
	 */
	clone(): KeyboardBuilder {
		const builder = new KeyboardBuilder();

		builder.oneTime(this.isOneTime);

		builder.rows = [...this.rows];
		builder.currentRow = [...this.currentRow];

		return builder;
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
