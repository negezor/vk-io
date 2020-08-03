import { Context, Composer } from 'vk-io';
import {
	Middleware,
	MiddlewareReturn,
	NextMiddleware,
	skipMiddleware
} from 'middleware-io';

import { HearConditions } from './types';

import { splitPath, unifyCondition, getObjectValue } from './helpers';

export class HearManager<C extends Context> {
	private composer = Composer.builder<C>();

	private fallbackHandler: Middleware<C> = skipMiddleware;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private composed!: Middleware<C>;

	public constructor() {
		this.recompose();
	}

	public get length(): number {
		return this.composer.length;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public get middleware(): Middleware<C> {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return (context: C, next: NextMiddleware): unknown => (
			this.composed(context, next)
		);
	}

	public hear<T = {}>(
		hearConditions: HearConditions<C & T>,
		handler: Middleware<C & T>
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

				return (text: string | undefined, context: C): boolean => (
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
				return (text: string | undefined, context: C): boolean => {
					const passed = condition.test(text!);

					if (passed) {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-expect-error
						context.$match = text!.match(condition)!;
					}

					return passed;
				};
			}

			const stringCondition = String(condition);

			return (text: string | undefined): boolean => text === stringCondition;
		});

		const needText = textCondition && functionCondtion === false;

		this.composer.use((context: C & T, next: NextMiddleware): MiddlewareReturn => {
			const { text } = context;

			if (needText && text === undefined) {
				return next();
			}

			const hasSome = conditions.some((condition): boolean => (
				condition(text, context)
			));

			return hasSome
				? handler(context, next)
				: next();
		});

		this.recompose();

		return this;
	}

	/**
	 * A handler that is called when handlers are not found
	 */
	public onFallback(handler: Middleware<C>): this {
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
