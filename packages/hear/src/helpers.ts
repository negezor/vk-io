import type { HearFunctionCondition } from './types';

export const splitPath = (path: string): string[] =>
    path
        .replace(/\[([^[\]]*)\]/g, '.$1.')
        .split('.')
        .filter(Boolean);

export const getObjectValue = (source: Record<string, any>, selectors: string[]): any => {
    let link = source;

    for (const selector of selectors) {
        if (!link[selector]) {
            return undefined;
        }

        link = link[selector];
    }

    return link;
};

export const unifyCondition = <V, C>(condition: unknown): HearFunctionCondition<C, V> => {
    if (typeof condition === 'function') {
        return condition as HearFunctionCondition<C, V>;
    }

    if (condition instanceof RegExp) {
        return text => condition.test(text as string);
    }

    if (Array.isArray(condition)) {
        const arrayConditions = condition.map(unifyCondition);

        return (value, context) =>
            Array.isArray(value)
                ? arrayConditions.every((cond): boolean => value.some((val): boolean => cond(val, context)))
                : arrayConditions.some((cond): boolean => cond(value, context));
    }

    return value => value === condition;
};
