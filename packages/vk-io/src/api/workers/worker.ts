// @ts-ignore
import { API } from '../api';
// @ts-ignore
import { APIRequest } from '../request';
// @ts-ignore
import { MINIMUM_TIME_INTERVAL_API } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export abstract class APIWorker {
// @ts-ignore
	public busy = false;
// @ts-ignore

// @ts-ignore
	public paused = false;
// @ts-ignore

// @ts-ignore
	protected queue: APIRequest[] = [];
// @ts-ignore

// @ts-ignore
	protected api: API;
// @ts-ignore

// @ts-ignore
	protected intervalPerRequests: number;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(api: API) {
// @ts-ignore
		this.api = api;
// @ts-ignore

// @ts-ignore
		this.intervalPerRequests = Math.ceil(MINIMUM_TIME_INTERVAL_API / this.api.options.apiLimit);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public enqueue(request: APIRequest): void {
// @ts-ignore
		this.queue.push(request);
// @ts-ignore

// @ts-ignore
		this.immediateHeat();
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public requeue(request: APIRequest): void {
// @ts-ignore
		this.queue.unshift(request);
// @ts-ignore

// @ts-ignore
		this.immediateHeat();
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public pause(): void {
// @ts-ignore
		this.paused = true;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public resume(): void {
// @ts-ignore
		this.paused = false;
// @ts-ignore

// @ts-ignore
		this.immediateHeat();
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public heat(): void {
// @ts-ignore
		if (this.paused || this.busy || this.queue.length === 0) {
// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		this.busy = true;
// @ts-ignore

// @ts-ignore
		if (this.api.options.apiRequestMode === 'sequential') {
// @ts-ignore
			this.execute();
// @ts-ignore

// @ts-ignore
			setTimeout(
// @ts-ignore
				() => {
// @ts-ignore
					this.busy = false;
// @ts-ignore

// @ts-ignore
					this.immediateHeat();
// @ts-ignore
				},
// @ts-ignore
				this.intervalPerRequests
// @ts-ignore
			);
// @ts-ignore

// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		// Burst mode
// @ts-ignore

// @ts-ignore
		const limit = Math.min(this.api.options.apiLimit, this.queue.length);
// @ts-ignore

// @ts-ignore
		for (let i = 0; i < limit && this.queue.length !== 0; i += 1) {
// @ts-ignore
			this.execute();
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const interval = Math.ceil(MINIMUM_TIME_INTERVAL_API - (limit * this.intervalPerRequests));
// @ts-ignore

// @ts-ignore
		setTimeout(
// @ts-ignore
			() => {
// @ts-ignore
				this.busy = false;
// @ts-ignore

// @ts-ignore
				this.immediateHeat();
// @ts-ignore
			},
// @ts-ignore
			interval <= 0
// @ts-ignore
				? MINIMUM_TIME_INTERVAL_API
// @ts-ignore
				: interval
// @ts-ignore
		);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	protected immediateHeat(): void {
// @ts-ignore
		// Wait next end loop, saves one request or more
// @ts-ignore
		setImmediate(() => this.heat());
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	protected abstract execute(request?: APIRequest): unknown;
// @ts-ignore
}
