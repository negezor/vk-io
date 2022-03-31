// @ts-ignore
import { IncomingMessage } from 'http';
// @ts-ignore

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
export const parseRequestJSON = async (req: IncomingMessage): Promise<Record<string, any>> => {
// @ts-ignore
	const chunks = [];
// @ts-ignore
	let totalSize = 0;
// @ts-ignore

// @ts-ignore
	for await (const chunk of req) {
// @ts-ignore
		totalSize += chunk.length;
// @ts-ignore

// @ts-ignore
		chunks.push(chunk);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return JSON.parse(
// @ts-ignore
		Buffer.concat(chunks, totalSize).toString('utf8')
// @ts-ignore
	);
// @ts-ignore
};
