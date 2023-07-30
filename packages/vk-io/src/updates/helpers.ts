import { IncomingMessage } from 'http';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseRequestJSON = async (req: IncomingMessage): Promise<Record<string, any>> => {
    const chunks: Buffer[] = [];
    let totalSize = 0;

    for await (const chunk of req) {
        totalSize += (chunk as Buffer).length;

        chunks.push(chunk as Buffer);
    }

    return JSON.parse(
        Buffer.concat(chunks, totalSize).toString('utf8'),
    );
};
