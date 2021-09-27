import { createHash } from 'crypto';

export const getDataHash = (data: string): string => (
	createHash('shake256', {
		outputLength: 2
	})
		.update(data)
		.digest('hex')
);
