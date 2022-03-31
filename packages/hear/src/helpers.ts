// @ts-ignore
export const splitPath = (path: string): string[] => (
// @ts-ignore
	path
// @ts-ignore
		.replace(/\[([^[\]]*)\]/g, '.$1.')
// @ts-ignore
		.split('.')
// @ts-ignore
		.filter(Boolean)
// @ts-ignore
);
// @ts-ignore

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
export const getObjectValue = (source: Record<string, any>, selectors: string[]): any => {
// @ts-ignore
	let link = source;
// @ts-ignore

// @ts-ignore
	for (const selector of selectors) {
// @ts-ignore
		if (!link[selector]) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		link = link[selector];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return link;
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
export const unifyCondition = (condition: unknown): Function => {
// @ts-ignore
	if (typeof condition === 'function') {
// @ts-ignore
		return condition;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	if (condition instanceof RegExp) {
// @ts-ignore
		return (text: string | undefined): boolean => (
// @ts-ignore
			condition.test(text!)
// @ts-ignore
		);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	if (Array.isArray(condition)) {
// @ts-ignore
		const arrayConditions = condition.map(unifyCondition);
// @ts-ignore

// @ts-ignore
		return (value: string | undefined): boolean => (
// @ts-ignore
			Array.isArray(value)
// @ts-ignore
				? arrayConditions.every((cond): boolean => (
// @ts-ignore
					value.some((val): boolean => cond(val))
// @ts-ignore
				))
// @ts-ignore
				: arrayConditions.some((cond): boolean => (
// @ts-ignore
					cond(value)
// @ts-ignore
				))
// @ts-ignore
		);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return (value: string | undefined): boolean => value === condition;
// @ts-ignore
};
