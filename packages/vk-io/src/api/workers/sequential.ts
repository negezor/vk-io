import API from '../api';

export default function sequential(api: API, next: Function): void {
	// @ts-ignore
	api.callMethod(api.queue.shift());

	next();
}
