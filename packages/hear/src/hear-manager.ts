// @ts-ignore
import { Context, Composer } from 'vk-io';
// @ts-ignore
import {
// @ts-ignore
	Middleware,
// @ts-ignore
	MiddlewareReturn,
// @ts-ignore
	NextMiddleware,
// @ts-ignore
	skipMiddleware
// @ts-ignore
} from 'middleware-io';
// @ts-ignore

// @ts-ignore
import { HearConditions } from './types';
// @ts-ignore

// @ts-ignore
import { splitPath, unifyCondition, getObjectValue } from './helpers';
// @ts-ignore

// @ts-ignore
export class HearManager<C extends Context> {
// @ts-ignore
	private composer = Composer.builder<C>();
// @ts-ignore

// @ts-ignore
	private fallbackHandler: Middleware<C> = skipMiddleware;
// @ts-ignore

// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	private composed!: Middleware<C>;
// @ts-ignore

// @ts-ignore
	public constructor() {
// @ts-ignore
		this.recompose();
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public get length(): number {
// @ts-ignore
		return this.composer.length;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	public get middleware(): Middleware<C> {
// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
		return (context: C, next: NextMiddleware): unknown => (
// @ts-ignore
			this.composed(context, next)
// @ts-ignore
		);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public hear<T = {}>(
// @ts-ignore
		hearConditions: HearConditions<C & T>,
// @ts-ignore
		handler: Middleware<C & T>
// @ts-ignore
	): this {
// @ts-ignore
		const rawConditions = !Array.isArray(hearConditions)
// @ts-ignore
			? [hearConditions]
// @ts-ignore
			: hearConditions;
// @ts-ignore

// @ts-ignore
		const hasConditions = rawConditions.every(Boolean);
// @ts-ignore

// @ts-ignore
		if (!hasConditions) {
// @ts-ignore
			throw new Error('Condition should be not empty');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (typeof handler !== 'function') {
// @ts-ignore
			throw new TypeError('Handler must be a function');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		let textCondition = false;
// @ts-ignore
		let functionCondtion = false;
// @ts-ignore
		const conditions = rawConditions.map((condition): Function => {
// @ts-ignore
			if (typeof condition === 'object' && !(condition instanceof RegExp)) {
// @ts-ignore
				functionCondtion = true;
// @ts-ignore

// @ts-ignore
				const entries = Object.entries(condition).map(([path, value]): [string[], Function] => (
// @ts-ignore
					[splitPath(path), unifyCondition(value)]
// @ts-ignore
				));
// @ts-ignore

// @ts-ignore
				return (text: string | undefined, context: C): boolean => (
// @ts-ignore
					entries.every(([selectors, callback]): boolean => {
// @ts-ignore
						const value = getObjectValue(context, selectors);
// @ts-ignore

// @ts-ignore
						return callback(value, context);
// @ts-ignore
					})
// @ts-ignore
				);
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			if (typeof condition === 'function') {
// @ts-ignore
				functionCondtion = true;
// @ts-ignore

// @ts-ignore
				return condition;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			textCondition = true;
// @ts-ignore

// @ts-ignore
			if (condition instanceof RegExp) {
// @ts-ignore
				return (text: string | undefined, context: C): boolean => {
// @ts-ignore
					const passed = condition.test(text!);
// @ts-ignore

// @ts-ignore
					if (passed) {
// @ts-ignore
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
						// @ts-expect-error
// @ts-ignore
						context.$match = text!.match(condition)!;
// @ts-ignore
					}
// @ts-ignore

// @ts-ignore
					return passed;
// @ts-ignore
				};
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			const stringCondition = String(condition);
// @ts-ignore

// @ts-ignore
			return (text: string | undefined): boolean => text === stringCondition;
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		const needText = textCondition && functionCondtion === false;
// @ts-ignore

// @ts-ignore
		this.composer.use((context: C & T, next: NextMiddleware): MiddlewareReturn => {
// @ts-ignore
			const { text } = context;
// @ts-ignore

// @ts-ignore
			if (needText && text === undefined) {
// @ts-ignore
				return next();
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			const hasSome = conditions.some((condition): boolean => (
// @ts-ignore
				condition(text, context)
// @ts-ignore
			));
// @ts-ignore

// @ts-ignore
			return hasSome
// @ts-ignore
				? handler(context, next)
// @ts-ignore
				: next();
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.recompose();
// @ts-ignore

// @ts-ignore
		return this;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * A handler that is called when handlers are not found
// @ts-ignore
	 */
// @ts-ignore
	public onFallback(handler: Middleware<C>): this {
// @ts-ignore
		this.fallbackHandler = handler;
// @ts-ignore

// @ts-ignore
		this.recompose();
// @ts-ignore

// @ts-ignore
		return this;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	private recompose(): void {
// @ts-ignore
		this.composed = this.composer.clone()
// @ts-ignore
			.use(this.fallbackHandler)
// @ts-ignore
			.compose();
// @ts-ignore
	}
// @ts-ignore
}
