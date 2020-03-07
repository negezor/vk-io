import { ParallelWorker } from './parallel';

export class ParallelSelectedWorker extends ParallelWorker {
	protected skipMethod(method: string): boolean {
		return !this.vk.options.apiExecuteMethods.includes(method);
	}
}
