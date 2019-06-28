/**
 * Basic button interface
 */
export interface IButton {
	action: {
		type: string;
	};
}

/**
 * Button payload, no more than 255 characters in JSON stringified
 */
export type ButtonPayload = object | string;

/**
 * Primary colors used in the text button
 */
export enum ButtonColor {
	/**
	 * The white button, indicates secondary action
	 *
	 * Hex color #FFFFFF
	 */
	SECONDARY = 'secondary',

	/**
	 * The blue button, indicates the main action
	 *
	 * Hex color #5181B8
	 */
	PRIMARY = 'primary',

	/**
	 * The red button, indicates a dangerous or a negative action (reject, delete, etc...)
	 *
	 * Hex color #E64646
	 */
	NEGATIVE = 'negative',

	/**
	 * The green button, indicates a agree, confirm, ...etc
	 *
	 * Hex color #4BB34B
	 */
	POSITIVE = 'positive'
}

export type ButtonColorUnion =
	'secondary'
	| 'primary'
	| 'negative'
	| 'positive';

export interface ITextButton extends IButton {
	/**
	 * Button color, default is secondary
	 */
	color: ButtonColor | ButtonColorUnion;

	action: {
		type: 'text';

		/**
		 * Button label, no more than 40 characters
		 */
		label: string;

		/**
		 * Payload, preferably use object
		 */
		payload: ButtonPayload;
	};
}

export interface ILocationButton extends IButton {
	action: {
		type: 'location';

		/**
		 * Payload, preferably use object
		 */
		payload: ButtonPayload;
	};
}

export interface IVKPayButton extends IButton {
	action: {
		type: 'vkpay';

		/**
		 * line containing VK Pay payment parameters
		 * and application ID in the aid parameter, separated by &.
		 * ```
		 * action=transfer-to-group&group_id=1&aid=10
		 * ```
		 */
		hash: string;
	};
}

export interface IVKApplicationButton extends IButton {
	action: {
		type: 'open_app';

		/**
		 * Application label, no more than 40 characters
		 */
		label: string;

		/**
		 * The identifier of the called application with type VK Apps
		 */
		app_id: number;

		/**
		 * ID of the community in which the application is installed,
		 * if you want to open it in the context of the community
		 */
		owner_id?: number;

		/**
		 * The hash for navigation in the application
		 * will be transmitted in the start parameters line after the # character
		 */
		hash?: string;
	};
}

export type KeyboardButton =
	ITextButton
	| ILocationButton
	| IVKPayButton
	| IVKApplicationButton;


export interface IKeyboardTextButtonOptions {
	/**
	 * Button color, default is secondary
	 */
	color?: ButtonColor | ButtonColorUnion;

	/**
	 * Button label, no more than 40 characters
	 */
	label: string;

	/**
	 * Payload, preferably use object
	 *
	 * No more than 255 characters in JSON stringified
	 */
	payload?: ButtonPayload;
}

export interface IKeyboardLocationRequestButtonOptions {
	/**
	 * Payload, preferably use object
	 *
	 * No more than 255 characters in JSON stringified
	 */
	payload?: ButtonPayload;
}

export interface IKeyboardVKPayButtonOptions {
	/**
	 * line containing VK Pay payment parameters
	 * and application ID in the aid parameter, separated by &.
	 * ```
	 * action=transfer-to-group&group_id=1&aid=10
	 * ```
	 */
	hash: string;
}

export interface IKeyboardApplicationButtonOptions {
	/**
	 * Application label, no more than 40 characters
	 */
	label: string;

	/**
	 * The identifier of the called application with type VK Apps
	 */
	appId: number;

	/**
	 * ID of the community in which the application is installed,
	 * if you want to open it in the context of the community
	 */
	ownerId?: number;

	/**
	 * The hash for navigation in the application
	 * will be transmitted in the start parameters line after the # character
	 */
	hash?: string;
}

export interface IKeyboardProxyButton {
	options: (
		IKeyboardTextButtonOptions
		| IKeyboardLocationRequestButtonOptions
		| IKeyboardVKPayButtonOptions
		| IKeyboardApplicationButtonOptions
	);

	kind: 'text' | 'location_request' | 'vk_pay' | 'vk_application';
}
