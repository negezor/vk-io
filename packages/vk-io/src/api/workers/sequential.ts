export default function sequential(next: Function) {
	// @ts-ignore
	this.callMethod(this.queue.shift());

	next();
}
