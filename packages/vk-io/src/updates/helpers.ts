import { IncomingMessage, ServerResponse } from 'http';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const unifyCondition = (condition: any): Function => {
	if (typeof condition === 'function') {
		return condition;
	}

	if (condition instanceof RegExp) {
		return (text: string | null): boolean => (
			condition.test(text!)
		);
	}

	if (Array.isArray(condition)) {
		const arrayConditions = condition.map(unifyCondition);

		return (value: string | null): boolean => (
			Array.isArray(value)
				? arrayConditions.every((cond): boolean => (
					value.some((val): boolean => cond(val))
				))
				: arrayConditions.some((cond): boolean => (
					cond(value)
				))
		);
	}

	return (value: string | null): boolean => value === condition;
};

export const parseRequestJSON = (req: IncomingMessage, res: ServerResponse): Promise<object> => (
	new Promise((resolve, reject): void => {
		let body = '';

		req.on('error', reject);
		req.on('data', (chunk): void => {
			if (body.length > 1e6) {
				res.writeHead(413);
				res.end();

				req.connection.destroy();

				reject();

				return;
			}

			body += String(chunk);
		});

		req.on('end', (): void => {
			try {
				const json = JSON.parse(body);

				resolve(json);
			} catch (e) {
				reject(e);
			}
		});
	})
);
