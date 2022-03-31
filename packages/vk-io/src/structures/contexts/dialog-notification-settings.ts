// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export type DialogNotificationSettingsContextType = 'dialog_notification_settings';
// @ts-ignore

// @ts-ignore
export type DialogNotificationSettingsContextSubType =
// @ts-ignore
	'dialog_notification_settings_subscribe'
// @ts-ignore
	| 'dialog_notification_settings_unsubscribe';
// @ts-ignore

// @ts-ignore
export interface IDialogNotificationSettingsContextPayload {
// @ts-ignore
	peer_id: number;
// @ts-ignore
	sound: 0 | 1;
// @ts-ignore
	disabled_until: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type DialogNotificationSettingsContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<[number, IDialogNotificationSettingsContextPayload], S>;
// @ts-ignore

// @ts-ignore
export class DialogNotificationSettingsContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
		IDialogNotificationSettingsContextPayload,
// @ts-ignore
		S,
// @ts-ignore
		DialogNotificationSettingsContextType,
// @ts-ignore
		DialogNotificationSettingsContextSubType
// @ts-ignore
		> {
// @ts-ignore
	public constructor(options: DialogNotificationSettingsContextOptions<S>) {
// @ts-ignore
		const [, payload] = options.payload;
// @ts-ignore

// @ts-ignore
		const { disabled_until } = payload;
// @ts-ignore

// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'dialog_notification_settings',
// @ts-ignore
			subTypes: [
// @ts-ignore
				disabled_until === 0
// @ts-ignore
					? 'dialog_notification_settings_subscribe'
// @ts-ignore
					: 'dialog_notification_settings_unsubscribe'
// @ts-ignore
			],
// @ts-ignore

// @ts-ignore
			payload: payload
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the peer identifier
// @ts-ignore
	 */
// @ts-ignore
	public get peerId(): number {
// @ts-ignore
		return this.payload.peer_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns time until that notifications are disabled in seconds
// @ts-ignore
	 */
// @ts-ignore
	public get disabledUntil(): number {
// @ts-ignore
		return this.payload.disabled_until;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks that the notifications have sound
// @ts-ignore
	 */
// @ts-ignore
	public get hasSound(): boolean {
// @ts-ignore
		return Boolean(this.payload.sound);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks that the user has subscribed to dialog
// @ts-ignore
	 */
// @ts-ignore
	public get isSubscribed(): boolean {
// @ts-ignore
		return this.subTypes.includes('dialog_notification_settings_subscribe');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks that the user has unsubscribed to dialog
// @ts-ignore
	 */
// @ts-ignore
	public get isUnsubscribed(): boolean {
// @ts-ignore
		return this.subTypes.includes('dialog_notification_settings_unsubscribe');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the custom data
// @ts-ignore
	 */
// @ts-ignore
	public [kSerializeData](): object {
// @ts-ignore
		return pickProperties(this, [
// @ts-ignore
			'peerId',
// @ts-ignore
			'hasSound',
// @ts-ignore
			'disabledUntil',
// @ts-ignore
			'isSubscribed',
// @ts-ignore
			'isUnsubscribed'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
