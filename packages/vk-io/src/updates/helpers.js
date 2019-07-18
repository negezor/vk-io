export const splitPath = (path) => (
	path
		.replace(/\[([^[\]]*)\]/g, '.$1.')
		.split('.')
		.filter(Boolean)
);

export const getObjectValue = (source, selectors) => {
	let link = source;

	for (const selector of selectors) {
		if (!link[selector]) {
			return undefined;
		}

		link = link[selector];
	}

	return link;
};

export const unifyCondition = (condition) => {
	if (typeof condition === 'function') {
		return condition;
	}

	if (condition instanceof RegExp) {
		return text => (
			condition.test(text)
		);
	}

	if (Array.isArray(condition)) {
		const arrayConditions = condition.map(unifyCondition);

		return value => (
			Array.isArray(value)
				? arrayConditions.every(cond => (
					value.some(val => cond(val))
				))
				: arrayConditions.some(cond => (
					cond(value)
				))
		);
	}

	return value => value === condition;
};

export const parseRequestJSON = (req, res) => (
	new Promise((resolve, reject) => {
		let body = '';

		req.on('error', reject);
		req.on('data', (chunk) => {
			if (body.length > 1e6) {
				body = null;

				res.writeHead(413);
				res.end();

				req.connection.destroy();

				reject();

				return;
			}

			body += String(chunk);
		});

		req.on('end', () => {
			try {
				const json = JSON.parse(body);

				resolve(json);
			} catch (e) {
				reject(e);
			}
		});
	})
);
