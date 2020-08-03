import { IncomingMessage } from 'http';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseRequestJSON = async (req: IncomingMessage): Promise<Record<string, any>> => {
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
