import { IncomingMessage } from 'http';

export const parseRequestJSON = async (req: IncomingMessage): Promise<object> => {
	const chunks = [];
	let totalSize = 0;

	for await (const chunk of req) {
		totalSize += chunk.length;

		chunks.push(chunk);
	}

	return JSON.parse(
		Buffer.concat(chunks, totalSize).toString('utf8')
	);
};
