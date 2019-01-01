import { VKError } from '../../errors';

import Button from './button';
import TextButton from './text-button';

const {
	DEFAULT_COLOR,
	PRIMARY_COLOR,
	NEGATIVE_COLOR,
	POSITIVE_COLOR
} = Button;

const kOneTime = Symbol('oneTime');

export default class Keyboard {
	/**
	 * Constructor
	 *
	 * @param {Object} options
	 */
	constructor({ oneTime = false } = {}) {
		this[kOneTime] = oneTime;

		this.buttons = [];
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag]() {
		return 'Keyboard';
	}

	/**
	 * Returns the default color
	 *
	 * @type {string}
	 */
	static get DEFAULT_COLOR() {
		return DEFAULT_COLOR;
	}

	/**
	 * Returns the primary color
	 *
	 * @return {string}
	 */
	static get PRIMARY_COLOR() {
		return PRIMARY_COLOR;
	}

	/**
	 * Returns the negative color
	 *
	 * @return {string}
	 */
	static get NEGATIVE_COLOR() {
		return NEGATIVE_COLOR;
	}

	/**
	 * Returns the positive color
	 *
	 * @return {string}
	 */
	static get POSITIVE_COLOR() {
		return POSITIVE_COLOR;
	}

	/**
	 * Return keyboard
	 *
	 * @param {Array}  rows
	 * @param {Object} options
	 *
	 * @return {Keyboard}
	 */
	static keyboard(rows, options) {
		if (rows.length > 10) {
			throw new VKError({
				message: 'Max count of keyboard rows 10'
			});
		}

		const keyboard = new Keyboard(options);

		for (const buttons of rows) {
			keyboard.addButtonsRow(buttons);
		}

		return keyboard;
	}

	/**
	 * Returns the text button
	 *
	 * @param {Object} options
	 *
	 * @return {TextButton}
	 */
	static textButton(options) {
		return new TextButton(options);
	}

	/**
	 * Checks is a one time
	 *
	 * @return {boolean}
	 */
	get isOneTime() {
		return this[kOneTime];
	}

	/**
	 * The keyboard will open only once
	 *
	 * @param {boolean} enabled
	 *
	 * @return {this}
	 */
	oneTime(enabled = true) {
		this[kOneTime] = enabled;

		return this;
	}

	/**
	 * Add buttons row
	 *
	 * @param {Button[]} buttons
	 */
	addButtonsRow(buttons) {
		if (!Array.isArray(buttons)) {
			buttons = [buttons];
		}

		if (buttons.length > 4) {
			throw new VKError({
				message: 'Max count of buttons at columns 4'
			});
		}

		this.buttons.push(buttons);

		return this;
	}

	/**
	 * Returns a string to keyboard a VK
	 *
	 * @return {string}
	 */
	toString() {
		const buttons = this.buttons.map(buttonRow => (
			buttonRow.map(button => button.toJSON())
		));

		return JSON.stringify({
			one_time: this[kOneTime],
			buttons
		});
	}
}
