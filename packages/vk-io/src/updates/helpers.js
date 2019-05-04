// eslint-disable-next-line import/prefer-default-export
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
