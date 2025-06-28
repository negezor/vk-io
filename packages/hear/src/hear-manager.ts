import { type Middleware, type MiddlewareReturn, type NextMiddleware, skipMiddleware } from 'middleware-io';

import { Composer, type Context } from 'vk-io';

import type { HearConditions, HearFunctionCondition } from './types';

import { getObjectValue, splitPath, unifyCondition } from './helpers';

export class HearManager<C extends Context> {
    private composer = Composer.builder<C>();

    private fallbackHandler: Middleware<C> = skipMiddleware;
    private composed!: Middleware<C>;

    public constructor() {
        this.recompose();
    }

    public get length(): number {
        return this.composer.length;
    }
    public get middleware(): Middleware<C> {
        return (context: C, next: NextMiddleware): unknown => this.composed(context, next);
    }

    public hear<T = object>(hearConditions: HearConditions<C & T>, handler: Middleware<C & T>): this {
        const rawConditions = !Array.isArray(hearConditions) ? [hearConditions] : hearConditions;

        const hasConditions = rawConditions.every(Boolean);

        if (!hasConditions) {
            throw new Error('Condition should be not empty');
        }

        if (typeof handler !== 'function') {
            throw new TypeError('Handler must be a function');
        }

        let textCondition = false;
        let functionCondtion = false;
        const conditions = rawConditions.map((condition): HearFunctionCondition<C & T, unknown> => {
            if (typeof condition === 'object' && !(condition instanceof RegExp)) {
                functionCondtion = true;

                const entries = Object.entries(condition).map(
                    ([path, value]): [string[], HearFunctionCondition<C & T, unknown>] => [
                        splitPath(path),
                        unifyCondition(value),
                    ],
                );

                return (_text, context) =>
                    entries.every(([selectors, callback]): boolean => {
                        const value = getObjectValue(context, selectors);

                        return callback(value, context);
                    });
            }

            if (typeof condition === 'function') {
                functionCondtion = true;

                return condition as HearFunctionCondition<C & T, unknown>;
            }

            textCondition = true;

            if (condition instanceof RegExp) {
                return (text, context): boolean => {
                    const passed = condition.test(text as string);

                    if (passed) {
                        // @ts-expect-error
                        // biome-ignore lint/style/noNonNullAssertion: we already check by test regex pattern
                        context.$match = (text as string).match(condition)!;
                    }

                    return passed;
                };
            }

            const stringCondition = String(condition);

            return text => text === stringCondition;
        });

        const needText = textCondition && functionCondtion === false;

        this.composer.use((context: C & T, next: NextMiddleware): MiddlewareReturn => {
            const { text } = context;

            if (needText && text === undefined) {
                return next();
            }

            const hasSome = conditions.some((condition): boolean => condition(text, context));

            return hasSome ? handler(context, next) : next();
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
        this.composed = this.composer.clone().use(this.fallbackHandler).compose();
    }
}
