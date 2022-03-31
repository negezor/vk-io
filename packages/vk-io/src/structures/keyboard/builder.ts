// @ts-ignore
import { URLSearchParams } from 'url';
// @ts-ignore

// @ts-ignore
import {
// @ts-ignore
	ButtonColor,
// @ts-ignore
	ButtonPayload,
// @ts-ignore
	KeyboardButton,
// @ts-ignore

// @ts-ignore
	IKeyboardTextButtonOptions,
// @ts-ignore
	IKeyboardURLButtonOptions,
// @ts-ignore
	IKeyboardLocationRequestButtonOptions,
// @ts-ignore
	IKeyboardVKPayButtonOptions,
// @ts-ignore
	IKeyboardApplicationButtonOptions,
// @ts-ignore
	IKeyboardCallbackButtonOptions
// @ts-ignore
} from './types';
// @ts-ignore

// @ts-ignore
const serializePayload = (rawPayload: ButtonPayload): string => {
// @ts-ignore
	const payload = JSON.stringify(rawPayload);
// @ts-ignore

// @ts-ignore
	if (payload.length > 255) {
// @ts-ignore
		throw new RangeError('Maximum length of payload 255 characters');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return payload;
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
export class KeyboardBuilder {
// @ts-ignore
	/**
// @ts-ignore
	 * Does the keyboard close after pressing the button
// @ts-ignore
	 */
// @ts-ignore
	public isOneTime = false;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * The keyboard must be attached to the message
// @ts-ignore
	 */
// @ts-ignore
	public isInline = false;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Rows with all buttons
// @ts-ignore
	 */
// @ts-ignore
	protected rows: KeyboardButton[][] = [];
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Current row of buttons
// @ts-ignore
	 */
// @ts-ignore
	protected currentRow: KeyboardButton[] = [];
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns custom tag
// @ts-ignore
	 */
// @ts-ignore
	public get [Symbol.toStringTag](): string {
// @ts-ignore
		return this.constructor.name;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Text button, can be colored
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * builder.textButton({
// @ts-ignore
	 *  label: 'Buy a coffee',
// @ts-ignore
	 *  payload: {
// @ts-ignore
	 *   command: 'buy',
// @ts-ignore
	 *   item: 'coffee'
// @ts-ignore
	 *  },
// @ts-ignore
	 *  color: Keyboard.POSITIVE_COLOR
// @ts-ignore
	 * });
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	public textButton({
// @ts-ignore
		label,
// @ts-ignore
		payload: rawPayload = {},
// @ts-ignore
		color = ButtonColor.SECONDARY
// @ts-ignore
	}: IKeyboardTextButtonOptions): this {
// @ts-ignore
		if (label.length > 40) {
// @ts-ignore
			throw new RangeError('Maximum length of label 40 characters');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const payload = serializePayload(rawPayload);
// @ts-ignore

// @ts-ignore
		return this.addButton({
// @ts-ignore
			color,
// @ts-ignore
			action: {
// @ts-ignore
				label,
// @ts-ignore
				payload,
// @ts-ignore

// @ts-ignore
				type: 'text'
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * URL button
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * builder.urlButton({
// @ts-ignore
	 *  label: 'Buy a coffee',
// @ts-ignore
	 *  url: 'https://coffee.mania/buy'
// @ts-ignore
	 * });
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	public urlButton({
// @ts-ignore
		label,
// @ts-ignore
		url,
// @ts-ignore
		payload: rawPayload = {}
// @ts-ignore
	}: IKeyboardURLButtonOptions): this {
// @ts-ignore
		if (label.length > 40) {
// @ts-ignore
			throw new RangeError('Maximum length of label 40 characters');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const payload = serializePayload(rawPayload);
// @ts-ignore

// @ts-ignore
		return this.addWideButton({
// @ts-ignore
			action: {
// @ts-ignore
				label,
// @ts-ignore
				payload,
// @ts-ignore

// @ts-ignore
				link: url,
// @ts-ignore
				type: 'open_link'
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * User location request button, occupies the entire keyboard width
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * builder.locationRequestButton({
// @ts-ignore
	 *  payload: {
// @ts-ignore
	 *   command: 'order_delivery'
// @ts-ignore
	 *  }
// @ts-ignore
	 * })
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	public locationRequestButton({
// @ts-ignore
		payload: rawPayload = {}
// @ts-ignore
	}: IKeyboardLocationRequestButtonOptions): this {
// @ts-ignore
		const payload = serializePayload(rawPayload);
// @ts-ignore

// @ts-ignore
		return this.addWideButton({
// @ts-ignore
			action: {
// @ts-ignore
				payload,
// @ts-ignore

// @ts-ignore
				type: 'location'
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * VK Pay button, occupies the entire keyboard width
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * builder.payButton({
// @ts-ignore
	 *  hash: {
// @ts-ignore
	 *   action: 'transfer-to-group',
// @ts-ignore
	 *   group_id: 1,
// @ts-ignore
	 *   aid: 10
// @ts-ignore
	 *  }
// @ts-ignore
	 * })
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	public payButton({ hash: rawHash }: IKeyboardVKPayButtonOptions): this {
// @ts-ignore
		const hash = typeof rawHash === 'object'
// @ts-ignore
			? String(new URLSearchParams(Object.entries(rawHash)))
// @ts-ignore
			: rawHash;
// @ts-ignore

// @ts-ignore
		return this.addWideButton({
// @ts-ignore
			action: {
// @ts-ignore
				hash,
// @ts-ignore

// @ts-ignore
				type: 'vkpay'
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * VK Apps button, occupies the entire keyboard width
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * builder.applicationButton({
// @ts-ignore
	 *  label: 'LiveWidget',
// @ts-ignore
	 *  appId: 6232540,
// @ts-ignore
	 *  ownerId: -157525928
// @ts-ignore
	 * })
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	public applicationButton({
// @ts-ignore
		label,
// @ts-ignore
		appId,
// @ts-ignore
		ownerId,
// @ts-ignore
		hash
// @ts-ignore
	}: IKeyboardApplicationButtonOptions): this {
// @ts-ignore
		if (label.length > 40) {
// @ts-ignore
			throw new RangeError('Maximum length of label 40 characters');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.addWideButton({
// @ts-ignore
			action: {
// @ts-ignore
				label,
// @ts-ignore
				hash,
// @ts-ignore

// @ts-ignore
				app_id: appId,
// @ts-ignore
				owner_id: ownerId,
// @ts-ignore

// @ts-ignore
				type: 'open_app'
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Allows without sending a message from the user
// @ts-ignore
	 * to receive a notification of a button click and perform the necessary action
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * builder.callbackButton({
// @ts-ignore
	 *  label: 'Buy a coffee',
// @ts-ignore
	 *  payload: {
// @ts-ignore
	 *   command: 'buy',
// @ts-ignore
	 *   item: 'coffee'
// @ts-ignore
	 *  }
// @ts-ignore
	 * });
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	public callbackButton({
// @ts-ignore
		label,
// @ts-ignore
		payload: rawPayload = {},
// @ts-ignore
		color = ButtonColor.SECONDARY
// @ts-ignore
	}: IKeyboardCallbackButtonOptions): this {
// @ts-ignore
		if (label.length > 40) {
// @ts-ignore
			throw new RangeError('Maximum length of label 40 characters');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const payload = serializePayload(rawPayload);
// @ts-ignore

// @ts-ignore
		return this.addButton({
// @ts-ignore
			color,
// @ts-ignore
			action: {
// @ts-ignore
				label,
// @ts-ignore
				payload,
// @ts-ignore

// @ts-ignore
				type: 'callback'
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Saves the current row of buttons in the general rows
// @ts-ignore
	 */
// @ts-ignore
	public row(): this {
// @ts-ignore
		if (this.currentRow.length === 0) {
// @ts-ignore
			return this;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (this.currentRow.length > 5) {
// @ts-ignore
			throw new RangeError('Max count of buttons at columns 5');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		this.rows.push(this.currentRow);
// @ts-ignore

// @ts-ignore
		this.currentRow = [];
// @ts-ignore

// @ts-ignore
		return this;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Sets the keyboard to close after pressing
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 *  builder.oneTime();
// @ts-ignore
	 *
// @ts-ignore
	 *  builder.oneTime(false);
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	public oneTime(enabled = true): this {
// @ts-ignore
		this.isOneTime = enabled;
// @ts-ignore

// @ts-ignore
		return this;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Sets the keyboard inline
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 *  builder.inline();
// @ts-ignore
	 *
// @ts-ignore
	 *  builder.inline(false);
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	public inline(enabled = true): this {
// @ts-ignore
		this.isInline = enabled;
// @ts-ignore

// @ts-ignore
		return this;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Clones the builder with all the settings
// @ts-ignore
	 */
// @ts-ignore
	public clone(): KeyboardBuilder {
// @ts-ignore
		const builder = new KeyboardBuilder();
// @ts-ignore

// @ts-ignore
		builder.oneTime(this.isOneTime);
// @ts-ignore
		builder.inline(this.isInline);
// @ts-ignore

// @ts-ignore
		builder.rows = [...this.rows];
// @ts-ignore
		builder.currentRow = [...this.currentRow];
// @ts-ignore

// @ts-ignore
		return builder;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns a string to keyboard a VK
// @ts-ignore
	 */
// @ts-ignore
	public toString(): string {
// @ts-ignore
		const maxRowsLength = this.isInline
// @ts-ignore
			? 6
// @ts-ignore
			: 10;
// @ts-ignore

// @ts-ignore
		if (this.rows.length > maxRowsLength) {
// @ts-ignore
			throw new RangeError(`Max count of keyboard rows ${maxRowsLength}`);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const buttons = this.currentRow.length !== 0
// @ts-ignore
			? [...this.rows, this.currentRow]
// @ts-ignore
			: this.rows;
// @ts-ignore

// @ts-ignore
		return JSON.stringify(
// @ts-ignore
			this.isInline
// @ts-ignore
				? {
// @ts-ignore
					buttons,
// @ts-ignore
					inline: true
// @ts-ignore
				}
// @ts-ignore
				: {
// @ts-ignore
					buttons,
// @ts-ignore
					one_time: this.isOneTime
// @ts-ignore
				}
// @ts-ignore
		);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Adds a button to the current row
// @ts-ignore
	 */
// @ts-ignore
	protected addButton(button: KeyboardButton): this {
// @ts-ignore
		this.currentRow.push(button);
// @ts-ignore

// @ts-ignore
		return this;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Adds a wide button to the new row
// @ts-ignore
	 */
// @ts-ignore
	protected addWideButton(button: KeyboardButton): this {
// @ts-ignore
		if (this.currentRow.length >= 2) {
// @ts-ignore
			this.row();
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		this.addButton(button);
// @ts-ignore

// @ts-ignore
		if (this.currentRow.length === 2) {
// @ts-ignore
			this.row();
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this;
// @ts-ignore
	}
// @ts-ignore
}
