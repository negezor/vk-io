// @ts-ignore
/**
// @ts-ignore
 * Basic button interface
// @ts-ignore
 */
// @ts-ignore
export interface IButton {
// @ts-ignore
	action: {
// @ts-ignore
		type: string;
// @ts-ignore
	};
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Button payload, no more than 255 characters in JSON stringified
// @ts-ignore
 */
// @ts-ignore
export type ButtonPayload = object | string;
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Primary colors used in the text button
// @ts-ignore
 */
// @ts-ignore
export enum ButtonColor {
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
	SECONDARY = 'secondary',
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
	PRIMARY = 'primary',
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
	NEGATIVE = 'negative',
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
	POSITIVE = 'positive'
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type ButtonColorUnion =
// @ts-ignore
	'secondary'
// @ts-ignore
	| 'primary'
// @ts-ignore
	| 'negative'
// @ts-ignore
	| 'positive';
// @ts-ignore

// @ts-ignore
export interface ITextButton extends IButton {
// @ts-ignore
	/**
// @ts-ignore
	 * Button color, default is secondary
// @ts-ignore
	 */
// @ts-ignore
	color: ButtonColor | ButtonColorUnion;
// @ts-ignore

// @ts-ignore
	action: {
// @ts-ignore
		type: 'text';
// @ts-ignore

// @ts-ignore
		/**
// @ts-ignore
		 * Button label, no more than 40 characters
// @ts-ignore
		 */
// @ts-ignore
		label: string;
// @ts-ignore

// @ts-ignore
		/**
// @ts-ignore
		 * Payload, preferably use object
// @ts-ignore
		 */
// @ts-ignore
		payload: ButtonPayload;
// @ts-ignore
	};
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IURLButton extends IButton {
// @ts-ignore
	action: {
// @ts-ignore
		type: 'open_link';
// @ts-ignore

// @ts-ignore
		/**
// @ts-ignore
		 * Button label, no more than 40 characters
// @ts-ignore
		 */
// @ts-ignore
		label: string;
// @ts-ignore

// @ts-ignore
		/**
// @ts-ignore
		 * The link that will be opened when clicked
// @ts-ignore
		 */
// @ts-ignore
		link: string;
// @ts-ignore

// @ts-ignore
		/**
// @ts-ignore
		 * Payload, preferably use object
// @ts-ignore
		 */
// @ts-ignore
		payload: ButtonPayload;
// @ts-ignore
	};
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface ILocationButton extends IButton {
// @ts-ignore
	action: {
// @ts-ignore
		type: 'location';
// @ts-ignore

// @ts-ignore
		/**
// @ts-ignore
		 * Payload, preferably use object
// @ts-ignore
		 */
// @ts-ignore
		payload: ButtonPayload;
// @ts-ignore
	};
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IVKPayButton extends IButton {
// @ts-ignore
	action: {
// @ts-ignore
		type: 'vkpay';
// @ts-ignore

// @ts-ignore
		/**
// @ts-ignore
		 * line containing VK Pay payment parameters
// @ts-ignore
		 * and application ID in the aid parameter, separated by &.
// @ts-ignore
		 * ```
// @ts-ignore
		 * action=transfer-to-group&group_id=1&aid=10
// @ts-ignore
		 * ```
// @ts-ignore
		 */
// @ts-ignore
		hash: string;
// @ts-ignore
	};
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IVKApplicationButton extends IButton {
// @ts-ignore
	action: {
// @ts-ignore
		type: 'open_app';
// @ts-ignore

// @ts-ignore
		/**
// @ts-ignore
		 * Application label, no more than 40 characters
// @ts-ignore
		 */
// @ts-ignore
		label: string;
// @ts-ignore

// @ts-ignore
		/**
// @ts-ignore
		 * The identifier of the called application with type VK Apps
// @ts-ignore
		 */
// @ts-ignore
		app_id: number;
// @ts-ignore

// @ts-ignore
		/**
// @ts-ignore
		 * ID of the community in which the application is installed,
// @ts-ignore
		 * if you want to open it in the context of the community
// @ts-ignore
		 */
// @ts-ignore
		owner_id?: number;
// @ts-ignore

// @ts-ignore
		/**
// @ts-ignore
		 * The hash for navigation in the application
// @ts-ignore
		 * will be transmitted in the start parameters line after the # character
// @ts-ignore
		 */
// @ts-ignore
		hash?: string;
// @ts-ignore
	};
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface ICallbackButton extends IButton {
// @ts-ignore
	/**
// @ts-ignore
	 * Button color, default is secondary
// @ts-ignore
	 */
// @ts-ignore
	color: ButtonColor | ButtonColorUnion;
// @ts-ignore

// @ts-ignore
	action: {
// @ts-ignore
		type: 'callback';
// @ts-ignore

// @ts-ignore
		/**
// @ts-ignore
		 * Button label, no more than 40 characters
// @ts-ignore
		 */
// @ts-ignore
		label: string;
// @ts-ignore

// @ts-ignore
		/**
// @ts-ignore
		 * Payload, preferably use object
// @ts-ignore
		 */
// @ts-ignore
		payload: ButtonPayload;
// @ts-ignore
	};
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type KeyboardButton =
// @ts-ignore
	ITextButton
// @ts-ignore
	| IURLButton
// @ts-ignore
	| ILocationButton
// @ts-ignore
	| IVKPayButton
// @ts-ignore
	| IVKApplicationButton
// @ts-ignore
	| ICallbackButton;
// @ts-ignore

// @ts-ignore
export interface IKeyboardTextButtonOptions {
// @ts-ignore
	/**
// @ts-ignore
	 * Button color, default is secondary
// @ts-ignore
	 */
// @ts-ignore
	color?: ButtonColor | ButtonColorUnion;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Button label, no more than 40 characters
// @ts-ignore
	 */
// @ts-ignore
	label: string;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Payload, preferably use object
// @ts-ignore
	 *
// @ts-ignore
	 * No more than 255 characters in JSON stringified
// @ts-ignore
	 */
// @ts-ignore
	payload?: ButtonPayload;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IKeyboardURLButtonOptions {
// @ts-ignore
	/**
// @ts-ignore
	 * Button label, no more than 40 characters
// @ts-ignore
	 */
// @ts-ignore
	label: string;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * The link that will be opened when clicked
// @ts-ignore
	 */
// @ts-ignore
	url: string;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Payload, preferably use object
// @ts-ignore
	 *
// @ts-ignore
	 * No more than 255 characters in JSON stringified
// @ts-ignore
	 */
// @ts-ignore
	payload?: ButtonPayload;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IKeyboardLocationRequestButtonOptions {
// @ts-ignore
	/**
// @ts-ignore
	 * Payload, preferably use object
// @ts-ignore
	 *
// @ts-ignore
	 * No more than 255 characters in JSON stringified
// @ts-ignore
	 */
// @ts-ignore
	payload?: ButtonPayload;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Payment in favor of the group with a given amount
// @ts-ignore
 */
// @ts-ignore
export interface IVKPayPayToGroup {
// @ts-ignore
	action: 'pay-to-group';
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Group ID to which the payment will be transferred
// @ts-ignore
	 */
// @ts-ignore
	group_id: number;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Payment amount in rubles. The minimum value is 1
// @ts-ignore
	 */
// @ts-ignore
	amount: number;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Payment description
// @ts-ignore
	 */
// @ts-ignore
	description?: string;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Arbitrary payload
// @ts-ignore
	 */
// @ts-ignore
	data?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Payment in favor of the user with a given amount
// @ts-ignore
 */
// @ts-ignore
export interface IVKPayPayToUser {
// @ts-ignore
	action: 'pay-to-user';
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * User ID to which the payment will be transferred
// @ts-ignore
	 */
// @ts-ignore
	user_id: number;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Payment amount in rubles. The minimum value is 1
// @ts-ignore
	 */
// @ts-ignore
	amount: number;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Payment description
// @ts-ignore
	 */
// @ts-ignore
	description?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Transfer to a group of arbitrary amount
// @ts-ignore
 */
// @ts-ignore
export interface IVKPayTransferToGroup {
// @ts-ignore
	action: 'transfer-to-group';
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Group ID to which the payment will be transferred
// @ts-ignore
	 */
// @ts-ignore
	group_id: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Transfer to a user of arbitrary amount
// @ts-ignore
 */
// @ts-ignore
export interface IVKPayTransferToUser {
// @ts-ignore
	action: 'transfer-to-user';
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * User ID to which the payment will be transferred
// @ts-ignore
	 */
// @ts-ignore
	user_id: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type KeyboardVKPayHash =
// @ts-ignore
	(IVKPayPayToGroup
// @ts-ignore
	| IVKPayPayToUser
// @ts-ignore
	| IVKPayTransferToGroup
// @ts-ignore
	| IVKPayTransferToUser) & {
// @ts-ignore
		/**
// @ts-ignore
		 * Application id
// @ts-ignore
		 */
// @ts-ignore
		aid: string | number;
// @ts-ignore
	};
// @ts-ignore

// @ts-ignore
export interface IKeyboardVKPayButtonOptions {
// @ts-ignore
	/**
// @ts-ignore
	 * line containing VK Pay payment parameters
// @ts-ignore
	 * and application ID in the aid parameter, separated by &.
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * {
// @ts-ignore
	 *  action: 'transfer-to-group',
// @ts-ignore
	 *  group_id: 1,
// @ts-ignore
	 *  aid: 10
// @ts-ignore
	 * }
// @ts-ignore
	 * ```
// @ts-ignore
	 *
// @ts-ignore
	 * Or write the string
// @ts-ignore
	 *
// @ts-ignore
	 * ```
// @ts-ignore
	 * action=transfer-to-group&group_id=1&aid=10
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	hash: KeyboardVKPayHash | string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IKeyboardApplicationButtonOptions {
// @ts-ignore
	/**
// @ts-ignore
	 * Application label, no more than 40 characters
// @ts-ignore
	 */
// @ts-ignore
	label: string;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * The identifier of the called application with type VK Apps
// @ts-ignore
	 */
// @ts-ignore
	appId: number;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * ID of the community in which the application is installed,
// @ts-ignore
	 * if you want to open it in the context of the community
// @ts-ignore
	 */
// @ts-ignore
	ownerId?: number;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * The hash for navigation in the application
// @ts-ignore
	 * will be transmitted in the start parameters line after the # character
// @ts-ignore
	 */
// @ts-ignore
	hash?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IKeyboardCallbackButtonOptions {
// @ts-ignore
	/**
// @ts-ignore
	 * Button color, default is secondary
// @ts-ignore
	 */
// @ts-ignore
	color?: ButtonColor | ButtonColorUnion;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Button label, no more than 40 characters
// @ts-ignore
	 */
// @ts-ignore
	label: string;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Payload, preferably use object
// @ts-ignore
	 *
// @ts-ignore
	 * No more than 255 characters in JSON stringified
// @ts-ignore
	 */
// @ts-ignore
	payload?: ButtonPayload;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IKeyboardProxyButton {
// @ts-ignore
	options: (
// @ts-ignore
		IKeyboardTextButtonOptions
// @ts-ignore
		| IKeyboardURLButtonOptions
// @ts-ignore
		| IKeyboardLocationRequestButtonOptions
// @ts-ignore
		| IKeyboardVKPayButtonOptions
// @ts-ignore
		| IKeyboardApplicationButtonOptions
// @ts-ignore
		| IKeyboardCallbackButtonOptions
// @ts-ignore
	);
// @ts-ignore

// @ts-ignore
	kind: 'text' | 'url' | 'location_request' | 'vk_pay' | 'vk_application' | 'callback';
// @ts-ignore
}
