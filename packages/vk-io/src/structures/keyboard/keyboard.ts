// @ts-ignore
import { KeyboardBuilder } from './builder';
// @ts-ignore
import {
// @ts-ignore
	IKeyboardProxyButton,
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
	IKeyboardCallbackButtonOptions,
// @ts-ignore

// @ts-ignore
	ButtonColor
// @ts-ignore
} from './types';
// @ts-ignore

// @ts-ignore
export class Keyboard {
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
	 * The white button, indicates secondary action
// @ts-ignore
	 *
// @ts-ignore
	 * Hex color #FFFFFF
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line class-methods-use-this
// @ts-ignore
	public static get SECONDARY_COLOR(): ButtonColor.SECONDARY {
// @ts-ignore
		return ButtonColor.SECONDARY;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * The blue button, indicates the main action
// @ts-ignore
	 *
// @ts-ignore
	 * Hex color #5181B8
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line class-methods-use-this
// @ts-ignore
	public static get PRIMARY_COLOR(): ButtonColor.PRIMARY {
// @ts-ignore
		return ButtonColor.PRIMARY;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * The red button, indicates a dangerous or a negative action (reject, delete, etc...)
// @ts-ignore
	 *
// @ts-ignore
	 * Hex color #E64646
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line class-methods-use-this
// @ts-ignore
	public static get NEGATIVE_COLOR(): ButtonColor.NEGATIVE {
// @ts-ignore
		return ButtonColor.NEGATIVE;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * The green button, indicates a agree, confirm, ...etc
// @ts-ignore
	 *
// @ts-ignore
	 * Hex color #4BB34B
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line class-methods-use-this
// @ts-ignore
	public static get POSITIVE_COLOR(): ButtonColor.POSITIVE {
// @ts-ignore
		return ButtonColor.POSITIVE;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns keyboard builder
// @ts-ignore
	 */
// @ts-ignore
	public static builder(): KeyboardBuilder {
// @ts-ignore
		return new KeyboardBuilder();
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Assembles a builder of buttons
// @ts-ignore
	 */
// @ts-ignore
	public static keyboard(rows: (IKeyboardProxyButton | IKeyboardProxyButton[])[]): KeyboardBuilder {
// @ts-ignore
		const builder = new KeyboardBuilder();
// @ts-ignore

// @ts-ignore
		for (const row of rows) {
// @ts-ignore
			const buttons = Array.isArray(row)
// @ts-ignore
				? row
// @ts-ignore
				: [row];
// @ts-ignore

// @ts-ignore
			for (const { kind, options } of buttons) {
// @ts-ignore
				if (kind === 'text') {
// @ts-ignore
					builder.textButton(options as IKeyboardTextButtonOptions);
// @ts-ignore

// @ts-ignore
					continue;
// @ts-ignore
				}
// @ts-ignore

// @ts-ignore
				if (kind === 'url') {
// @ts-ignore
					builder.urlButton(options as IKeyboardURLButtonOptions);
// @ts-ignore

// @ts-ignore
					continue;
// @ts-ignore
				}
// @ts-ignore

// @ts-ignore
				if (kind === 'location_request') {
// @ts-ignore
					builder.locationRequestButton(options as IKeyboardLocationRequestButtonOptions);
// @ts-ignore

// @ts-ignore
					continue;
// @ts-ignore
				}
// @ts-ignore

// @ts-ignore
				if (kind === 'vk_pay') {
// @ts-ignore
					builder.payButton(options as IKeyboardVKPayButtonOptions);
// @ts-ignore

// @ts-ignore
					continue;
// @ts-ignore
				}
// @ts-ignore

// @ts-ignore
				if (kind === 'vk_application') {
// @ts-ignore
					builder.applicationButton(options as IKeyboardApplicationButtonOptions);
// @ts-ignore

// @ts-ignore
					continue;
// @ts-ignore
				}
// @ts-ignore

// @ts-ignore
				if (kind === 'callback') {
// @ts-ignore
					builder.callbackButton(options as IKeyboardCallbackButtonOptions);
// @ts-ignore

// @ts-ignore
					continue;
// @ts-ignore
				}
// @ts-ignore

// @ts-ignore
				throw new TypeError('Unsupported type button');
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			builder.row();
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return builder;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Text button, can be colored
// @ts-ignore
	 */
// @ts-ignore
	public static textButton(
// @ts-ignore
		options: IKeyboardTextButtonOptions
// @ts-ignore
	): IKeyboardProxyButton {
// @ts-ignore
		return { options, kind: 'text' };
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * URL button
// @ts-ignore
	 */
// @ts-ignore
	public static urlButton(
// @ts-ignore
		options: IKeyboardURLButtonOptions
// @ts-ignore
	): IKeyboardProxyButton {
// @ts-ignore
		return { options, kind: 'url' };
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * User location request button, occupies the entire keyboard width
// @ts-ignore
	 */
// @ts-ignore
	public static locationRequestButton(
// @ts-ignore
		options: IKeyboardLocationRequestButtonOptions
// @ts-ignore
	): IKeyboardProxyButton {
// @ts-ignore
		return { options, kind: 'location_request' };
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * VK Pay button, occupies the entire keyboard width
// @ts-ignore
	 */
// @ts-ignore
	public static payButton(
// @ts-ignore
		options: IKeyboardVKPayButtonOptions
// @ts-ignore
	): IKeyboardProxyButton {
// @ts-ignore
		return { options, kind: 'vk_pay' };
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * VK Apps button, occupies the entire keyboard width
// @ts-ignore
	 */
// @ts-ignore
	public static applicationButton(
// @ts-ignore
		options: IKeyboardApplicationButtonOptions
// @ts-ignore
	): IKeyboardProxyButton {
// @ts-ignore
		return { options, kind: 'vk_application' };
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
	 */
// @ts-ignore
	public static callbackButton(
// @ts-ignore
		options: IKeyboardCallbackButtonOptions
// @ts-ignore
	): IKeyboardProxyButton {
// @ts-ignore
		return { options, kind: 'callback' };
// @ts-ignore
	}
// @ts-ignore
}
