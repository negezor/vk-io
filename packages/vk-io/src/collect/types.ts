import { ExecuteError } from '../errors';

export interface IExecutesPayload {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	response: any[];
	errors: ExecuteError[];
}
