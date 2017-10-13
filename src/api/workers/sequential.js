export default function sequential(next) {
	this.callMethod(this.queue.shift());

	next();
}
