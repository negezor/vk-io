import {
	Middleware,

	skipMiddleware,

	NextMiddleware
} from 'middleware-io';

import { MessageContext } from '../structures/contexts';
import { Composer } from '../structures/shared/composer';
import { AllowArray } from '../types';

import { splitPath, unifyCondition, getObjectValue } from './helpers';

export type HearFunctionCondition<T, U> = (value: T, context: U) => boolean;

export type HearCondition<T, U> = HearFunctionCondition<T, U> | RegExp | string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HearObjectCondition<T extends Record<string, any>> = {
	[P in keyof T]: AllowArray<HearCondition<T[P], T>>;
};

export type HearConditions<T> = (
	AllowArray<HearCondition<string | undefined, T & MessageContext>>
	| AllowArray<HearObjectCondition<T & MessageContext>>
);

export class Hears {
	private composer = Composer.builder<MessageContext>();

	private fallbackHandler: Middleware<MessageContext> = skipMiddleware;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private composed!: Middleware<MessageContext<Record<string, any>>>;

	public constructor() {
		this.recompose();
	}

	public get length(): number {
		return this.composer.length;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public get middleware(): Middleware<MessageContext<Record<string, any>>> {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return (context: MessageContext<Record<string, any>>, next: NextMiddleware): unknown => (
			this.composed(context, next)
		);
	}

	public hear<T = {}>(
		hearConditions: HearConditions<T>,
		handler: Middleware<MessageContext & T>
	): this {
		const rawConditions = !Array.isArray(hearConditions)
			? [hearConditions]
			: hearConditions;

		const hasConditions = rawConditions.every(Boolean);

		if (!hasConditions) {
			throw new Error('Condition should be not empty');
		}

		if (typeof handler !== 'function') {
			throw new TypeError('Handler must be a function');
		}

		let textCondition = false;
		let functionCondtion = false;
		const conditions = rawConditions.map((condition): Function => {
			if (typeof condition === 'object' && !(condition instanceof RegExp)) {
				functionCondtion = true;

				const entries = Object.entries(condition).map(([path, value]): [string[], Function] => (
					[splitPath(path), unifyCondition(value)]
				));

				return (text: string | undefined, context: MessageContext): boolean => (
					entries.every(([selectors, callback]): boolean => {
						const value = getObjectValue(context, selectors);

						return callback(value, context);
					})
				);
			}

			if (typeof condition === 'function') {
				functionCondtion = true;

				return condition;
			}

			textCondition = true;

			if (condition instanceof RegExp) {
				return (text: string | undefined, context: MessageContext): boolean => {
					const passed = condition.test(text!);

					if (passed) {
						context.$match = text!.match(condition)!;
					}

					return passed;
				};
			}

			const stringCondition = String(condition);

			return (text: string | undefined): boolean => text === stringCondition;
		});

		const needText = textCondition && functionCondtion === false;

		this.composer.use((context: MessageContext, next: Function): Promise<void> => {
			const { text } = context;

			if (needText && text === undefined) {
				return next();
			}

			const hasSome = conditions.some((condition): boolean => (
				condition(text, context)
			));

			return hasSome
				// @ts-ignore
				? handler(context, next)
				: next();
		});

		this.recompose();

		return this;
	}

	/**
	 * A handler that is called when handlers are not found
	 */
	public onFallback<T = {}>(handler: Middleware<MessageContext & T>): this {
		// @ts-ignore
		this.fallbackHandler = handler;

		this.recompose();

		return this;
	}

	private recompose(): void {
		this.composed = this.composer.clone()
			.use(this.fallbackHandler)
			.compose();
	}
}
