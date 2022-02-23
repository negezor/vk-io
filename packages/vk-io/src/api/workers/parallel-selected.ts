import { ParallelWorker } from './parallel';

export class ParallelSelectedWorker extends ParallelWorker {
	protected skipMethod(method: string): boolean {
		return super.skipMethod(method)
			|| !this.api.options.apiExecuteMethods.includes(method);
	}
}
