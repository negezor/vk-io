import { VK } from '../../vk';
import { APIRequest } from '../request';
import { MINIMUM_TIME_INTERVAL_API } from '../../utils/constants';

export abstract class APIWorker {
	public busy = false;

	public paused = false;

	protected queue: APIRequest[] = [];

	protected vk: VK;

	protected intervalPerRequests: number;

	/**
	 * Constructor
	 */
	public constructor(vk: VK) {
		this.vk = vk;

		this.intervalPerRequests = Math.ceil(MINIMUM_TIME_INTERVAL_API / this.vk.options.apiLimit);
	}

	public enqueue(request: APIRequest): void {
		this.queue.push(request);

		this.immediateHeat();
	}

	public requeue(request: APIRequest): void {
		this.queue.unshift(request);

		this.immediateHeat();
	}

	public pause(): void {
		this.paused = true;
	}

	public resume(): void {
		this.paused = false;

		this.immediateHeat();
	}

	public heat(): void {
		if (this.paused || this.busy || this.queue.length === 0) {
			return;
		}

		this.busy = true;

		if (this.vk.options.apiRequestMode === 'sequential') {
			this.execute();

			setTimeout(
				() => {
					this.busy = false;

					this.immediateHeat();
				},
				this.intervalPerRequests
			);

			return;
		}

		// Burst mode

		const limit = Math.min(this.vk.options.apiLimit, this.queue.length);

		for (let i = 0; i < limit && this.queue.length !== 0; i += 1) {
			this.execute();
		}

		const interval = Math.ceil(MINIMUM_TIME_INTERVAL_API - (limit * this.intervalPerRequests));

		setTimeout(
			() => {
				this.busy = false;

				this.immediateHeat();
			},
			interval <= 0
				? MINIMUM_TIME_INTERVAL_API
				: interval
		);
	}

	protected immediateHeat(): void {
		// Wait next end loop, saves one request or more
		setImmediate(() => this.heat());
	}

	protected abstract execute(request?: APIRequest): unknown;
}
