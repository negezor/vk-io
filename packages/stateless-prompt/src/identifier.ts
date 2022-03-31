// @ts-ignore
import { createHash } from 'crypto';
// @ts-ignore

// @ts-ignore
export const getDataHash = (data: string): string => (
// @ts-ignore
	createHash('shake256', {
// @ts-ignore
		outputLength: 2
// @ts-ignore
	})
// @ts-ignore
		.update(data)
// @ts-ignore
		.digest('hex')
// @ts-ignore
);
