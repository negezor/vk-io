// @ts-ignore
import { ParallelWorker } from './parallel';
// @ts-ignore

// @ts-ignore
export class ParallelSelectedWorker extends ParallelWorker {
// @ts-ignore
	protected skipMethod(method: string): boolean {
// @ts-ignore
		return super.skipMethod(method)
// @ts-ignore
			|| !this.api.options.apiExecuteMethods.includes(method);
// @ts-ignore
	}
// @ts-ignore
}
