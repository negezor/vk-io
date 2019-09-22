export default function sequential(next: Function): void {
	// @ts-ignore
	this.callMethod(this.queue.shift());

	next();
}
