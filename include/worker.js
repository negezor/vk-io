'use strict';

/**
 * Выполняет задачи из очереди
 */
exports._apiWorker = function(){
	/* Получаем алиас заданий */
	var tasks = this.status.tasks;

	/* Устанавливаем статус работника */
	tasks.launched = true;

	/* Получаем промежуток времени для таймера */
	var timer = 1133/this.settings.limit;

	/**
	 * Проверяет очередь на выполнения задачи
	 */
	var worker = () => {
		/* Проверяем на наличие заданий */
		if (tasks.queue.length != 0) {
			/* Выполняем задание */
			this._apiExecute.apply(this,tasks.queue.shift());

			/* Ставим новый таймер */
			tasks.id = setTimeout(worker,timer);
		} else {
			/* Убераем таймер */
			clearTimeout(tasks.id);

			/* Устанавливаем статус работника */
			tasks.launched = false;
		}
	};

	/* Запускаем */
	worker();
};