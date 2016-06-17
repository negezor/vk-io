'use strict';

/**
 * Выполняет задачи из очереди
 */
exports._apiWorker = function(){
	var tasks = this.status.tasks;

	tasks.launched = true;

	var timer = 1133/this.settings.limit;

	/**
	 * Проверяет очередь на выполнения задачи
	 */
	var worker = () => {
		if (tasks.queue.length != 0) {
			this._apiExecute.apply(this,tasks.queue.shift());

			tasks.id = setTimeout(worker,timer);
		} else {
			clearTimeout(tasks.id);

			tasks.launched = false;
		}
	};

	worker();
};
