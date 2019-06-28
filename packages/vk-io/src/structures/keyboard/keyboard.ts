import KeyboardBuilder from './builder';
import {
	IKeyboardProxyButton,
	IKeyboardTextButtonOptions,
	IKeyboardLocationRequestButtonOptions,
	IKeyboardVKPayButtonOptions,
	IKeyboardApplicationButtonOptions,
	ButtonColor
} from './types';

export default class Keyboard {
	/**
	 * Returns custom tag
	 */
	get [Symbol.toStringTag](): string {
		return 'Keyboard';
	}

	/**
	 * @deprecated Use Keyboard.SECONDARY_COLOR instead
	 */
	static get DEFAULT_COLOR(): ButtonColor.SECONDARY {
		// eslint-disable-next-line no-console
		console.log('Keyboard.DEFAULT_COLOR deprecated, use Keyboard.SECONDARY_COLOR instead');

		return ButtonColor.SECONDARY;
	}

	/**
	 * The white button, indicates secondary action
	 *
	 * Hex color #FFFFFF
	 */
	static get SECONDARY_COLOR(): ButtonColor.SECONDARY {
		return ButtonColor.SECONDARY;
	}

	/**
	 * The blue button, indicates the main action
	 *
	 * Hex color #5181B8
	 */
	static get PRIMARY_COLOR(): ButtonColor.PRIMARY {
		return ButtonColor.PRIMARY;
	}

	/**
	 * The red button, indicates a dangerous or a negative action (reject, delete, etc...)
	 *
	 * Hex color #E64646
	 */
	static get NEGATIVE_COLOR(): ButtonColor.NEGATIVE {
		return ButtonColor.NEGATIVE;
	}

	/**
	 * The green button, indicates a agree, confirm, ...etc
	 *
	 * Hex color #4BB34B
	 */
	static get POSITIVE_COLOR(): ButtonColor.POSITIVE {
		return ButtonColor.POSITIVE;
	}

	/**
	 * Returns keyboard builder
	 */
	static builder(): KeyboardBuilder {
		return new KeyboardBuilder();
	}

	/**
	 * Assembles a builder of buttons
	 */
	static keyboard(rows: (IKeyboardProxyButton | IKeyboardProxyButton[])[]): KeyboardBuilder {
		const builder = new KeyboardBuilder();

		for (const row of rows) {
			const buttons = Array.isArray(row)
				? row
				: [row];

			for (const { kind, options } of buttons) {
				if (kind === 'text') {
					builder.textButton(options as IKeyboardTextButtonOptions);

					continue;
				}

				if (kind === 'location_request') {
					builder.locationRequestButton(options as IKeyboardLocationRequestButtonOptions);

					continue;
				}

				if (kind === 'vk_pay') {
					builder.payButton(options as IKeyboardVKPayButtonOptions);

					continue;
				}

				if (kind === 'vk_application') {
					builder.applicationButton(options as IKeyboardApplicationButtonOptions);

					continue;
				}

				throw new TypeError('Unsupported type button');
			}

			builder.row();
		}

		return builder;
	}

	/**
	 * Text button, can be colored
	 */
	static textButton(
		options: IKeyboardTextButtonOptions
	): IKeyboardProxyButton {
		return { options, kind: 'text' };
	}

	/**
	 * User location request button, occupies the entire keyboard width
	 */
	static locationRequestButton(
		options: IKeyboardLocationRequestButtonOptions
	): IKeyboardProxyButton {
		return { options, kind: 'location_request' };
	}

	/**
	 * VK Pay button, occupies the entire keyboard width
	 */
	static payButton(
		options: IKeyboardVKPayButtonOptions
	): IKeyboardProxyButton {
		return { options, kind: 'vk_pay' };
	}

	/**
	 * VK Apps button, occupies the entire keyboard width
	 */
	static applicationButton(
		options: IKeyboardApplicationButtonOptions
	): IKeyboardProxyButton {
		return { options, kind: 'vk_application' };
	}
}
