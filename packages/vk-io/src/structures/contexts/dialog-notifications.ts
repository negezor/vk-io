import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

export type DialogNotificationsContextType = 'dialog_notifications';

export type DialogNotificationsContextSubType =
	'dialog_notifications_subscribe'
	| 'dialog_notifications_unsubscribe';

export interface IDialogNotificationsContextPayload {
	peer_id: number;
	sound: 0 | 1;
	disabled_until: number;
}

export type DialogNotificationsContextOptions<S> =
	ContextFactoryOptions<[number, IDialogNotificationsContextPayload], S>;

export class DialogNotificationsContext<S = ContextDefaultState>
	extends Context<
		IDialogNotificationsContextPayload,
		S,
		DialogNotificationsContextType,
		DialogNotificationsContextSubType
		> {
	public constructor(options: DialogNotificationsContextOptions<S>) {
		const [, payload] = options.payload;

		const { disabled_until } = payload;

		super({
			...options,

			type: 'dialog_notifications',
			subTypes: [
				disabled_until === 0
					? 'dialog_notifications_subscribe'
					: 'dialog_notifications_unsubscribe'
			],

			payload: payload
		});
	}

	/**
	 * Returns the peer identifier
	 */
	public get peerId(): number {
		return this.payload.peer_id;
	}

	/**
	 * Returns time until that notifications are disabled in seconds
	 */
	public get disabledUntil(): number {
		return this.payload.disabled_until;
	}

	/**
	 * Checks that the notifications have sound
	 */
	public get hasSound(): boolean {
		return Boolean(this.payload.sound);
	}

	/**
	 * Checks that the user has subscribed to dialog
	 */
	public get isSubscribed(): boolean {
		return this.subTypes.includes('dialog_notifications_subscribe');
	}

	/**
	 * Checks that the user has unsubscribed to dialog
	 */
	public get isUnsubscribed(): boolean {
		return this.subTypes.includes('dialog_notifications_unsubscribe');
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'peerId',
			'hasSound',
			'disabledUntil',
			'isSubscribed',
			'isUnsubscribed'
		]);
	}
}
