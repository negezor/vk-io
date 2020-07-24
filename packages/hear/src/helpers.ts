export const splitPath = (path: string): string[] => (
	path
		.replace(/\[([^[\]]*)\]/g, '.$1.')
		.split('.')
		.filter(Boolean)
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const unifyCondition = (condition: unknown): Function => {
	if (typeof condition === 'function') {
		return condition;
	}

	if (condition instanceof RegExp) {
		return (text: string | undefined): boolean => (
			condition.test(text!)
		);
	}

	if (Array.isArray(condition)) {
		const arrayConditions = condition.map(unifyCondition);

		return (value: string | undefined): boolean => (
			Array.isArray(value)
				? arrayConditions.every((cond): boolean => (
					value.some((val): boolean => cond(val))
				))
				: arrayConditions.some((cond): boolean => (
					cond(value)
				))
		);
	}

	return (value: string | undefined): boolean => value === condition;
};
