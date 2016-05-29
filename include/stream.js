'use strict';

/* Utility */
var util = require('util');

/* Список обработчиков потоков */
exports._streamHandlers = [];

/* Добавляет обработчик */
var add = function(path,handler){
	/* Добавляем объект */
	exports._streamHandlers.push({
		/* Путь до метода */
		way: path,
		/* Обработчик */
		handler: handler
	});
};

/**
 * Генератор стримов
 *
 * @param   {object}   gen настройки функции
 *
 * @returns {function} готовая функция
 */
var generator = function(gen){
	/* Использование метода */
	var use = gen.method.split('.');

	/* Добавляем метод */
	add(gen.method,function(params){
		return new this.promise((resolve,reject) => {
			/* Параметры */
			params = params || {};

			/* Ставим параметры */
			var query = util._extend({},params);

			/* Если на задано кол-вол */
			params.count = params.count || gen.max;

			/* Смещение */
			query.offset = 0;
			/* Кол-вы выборки */
			query.count = params.count > gen.count?gen.count:params.count;

			/* Данные на вывод */
			var container = [];

			/* Загружает данные */
			var fetch = () => {
				/* Ищем по параметрам */
				this.api[use[0]][use[1]](query)
				.then((data) => {
					/* Если кол-во привышает */
					if (params.count > data.count) {
						params.count = data.count;
					}

					/* Совмещаем данные */
					container = container.concat(data.items);

					/* Кол-во полученные элементов */
					var length = container.length;

					/* Длина */
					if (length >= params.count) {
						/* Возвращаем данные */
						resolve(container);
					} else {
						/* Кол-во осташихся элементов */
						var count = params.count - length;

						/* Устанавливаем смещение */
						query.offset = length;
						/* Установка кол-во элементов */
						query.count = count > gen.count?gen.count:count;

						/* Повторяем выборку */
						fetch();
					}
					return null;
				})
				.catch(reject);
			};

			/* Делаем первую выборку */
			fetch();
		});
	});
};

/* Возвращает список пользователей в соответствии с заданным критерием поиска. */
generator({
	method: 'users.search',
	count: 1000,
	max: 10000
});

/* Возвращает список идентификаторов пользователей и сообществ, которые входят в список подписок пользователя. */
generator({
	method: 'users.getSubscriptions',
	count: 200,
	max: 1000
});

/* Возвращает список идентификаторов пользователей, которые являются подписчиками пользователя. */
generator({
	method: 'users.getFollowers',
	count: 1000,
	max: 10000
});

/* Возвращает список записей со стены пользователя или сообщества. */
generator({
	method: 'wall.get',
	count: 100,
	max: 1000
});

/* Метод, позволяющий осуществлять поиск по стенам пользователей. */
generator({
	method: 'wall.search',
	count: 100,
	max: 1000
});

/* Возвращает список комментариев к записи на стене. */
generator({
	method: 'wall.getComments',
	count: 100,
	max: 1000
});

/* Возвращает список альбомов пользователя или сообщества. */
generator({
	method: 'photos.getAlbums',
	count: 100,
	max: 1000
});

/* Возвращает список фотографий в альбоме. */
generator({
	method: 'photos.get',
	count: 1000,
	max: 5000
});

/* Осуществляет поиск изображений по местоположению или описанию. */
generator({
	method: 'photos.search',
	count: 1000,
	max: 10000
});

/* Возвращает все фотографии пользователя или сообщества в антихронологическом порядке. */
generator({
	method: 'photos.getAll',
	count: 200,
	max: 1000
});

/* Возвращает список фотографий, на которых отмечен пользователь. */
generator({
	method: 'photos.getUserPhotos',
	count: 1000,
	max: 10000
});

/* Возвращает список комментариев к фотографии. */
generator({
	method: 'photos.getComments',
	count: 100,
	max: 1000
});

/* Возвращает отсортированный в антихронологическом порядке список всех комментариев к конкретному альбому или ко всем альбомам пользователя. */
generator({
	method: 'photos.getAllComments',
	count: 100,
	max: 1000
});

/* Возвращает список фотографий, на которых есть непросмотренные отметки. */
generator({
	method: 'photos.getNewTags',
	count: 100,
	max: 1000
});

/* Возвращает список идентификаторов друзей пользователя, находящихся на сайте. */
generator({
	method: 'friends.getOnline',
	count: 1000,
	max: 10000
});

/* Возвращает список идентификаторов общих друзей между парой пользователей. */
generator({
	method: 'friends.getMutual',
	count: 1000,
	max: 10000
});

/* Возвращает информацию о полученных или отправленных заявках на добавление в друзья для текущего пользователя. */
generator({
	method: 'friends.getRequests',
	count: 1000,
	max: 10000
});

/* Возвращает список профилей пользователей, которые могут быть друзьями текущего пользователя. */
generator({
	method: 'friends.getSuggestions',
	count: 500,
	max: 1000
});

/* Позволяет искать по списку друзей пользователей. */
generator({
	method: 'friends.search',
	count: 1000,
	max: 10000
});

/* Возвращает список аудиозаписей пользователя или сообщества. */
generator({
	method: 'audio.get',
	count: 6000,
	max: 12000
});

/* Возвращает список аудиозаписей в соответствии с заданным критерием поиска. */
generator({
	method: 'audio.search',
	count: 300,
	max: 900
});

/* Возвращает список альбомов аудиозаписей пользователя или группы. */
generator({
	method: 'audio.getAlbums',
	count: 100,
	max: 1000
});

/* Возвращает список рекомендуемых аудиозаписей на основе списка воспроизведения заданного пользователя или на основе одной выбранной аудиозаписи. */
generator({
	method: 'audio.getRecommendations',
	count: 1000,
	max: 10000
});

/* Возвращает список аудиозаписей из раздела "Популярное". */
generator({
	method: 'audio.getPopular',
	count: 1000,
	max: 10000
});

/* Возвращает список сообществ указанного пользователя. */
generator({
	method: 'groups.get',
	count: 1000,
	max: 10000
});

/* Возвращает список участников сообщества. */
generator({
	method: 'groups.getMembers',
	count: 1000,
	max: 10000
});

/* Осуществляет поиск сообществ по заданной подстроке. */
generator({
	method: 'groups.search',
	count: 1000,
	max: 1000
});

/* Данный метод возвращает список приглашений в сообщества и встречи текущего пользователя. */
generator({
	method: 'groups.getInvites',
	count: 100,
	max: 1000
});

/* Возвращает список пользователей, которые были приглашены в группу. */
generator({
	method: 'groups.getInvitedUsers',
	count: 100,
	max: 1000
});

/* Возвращает список забаненных пользователей в сообществе. */
generator({
	method: 'groups.getBanned',
	count: 200,
	max: 1000
});

/* Возвращает список заявок на вступление в сообщество. */
generator({
	method: 'groups.getRequests',
	count: 200,
	max: 1000
});

/* Возвращает список тем в обсуждениях указанной группы. */
generator({
	method: 'board.getTopics',
	count: 100,
	max: 1000
});

/* Возвращает информацию о видеозаписях. */
generator({
	method: 'video.get',
	count: 200,
	max: 1000
});

/* Возвращает список видеозаписей, на которых отмечен пользователь. */
generator({
	method: 'video.getUserVideos',
	count: 100,
	max: 1000
});

/* Возвращает список альбомов видеозаписей пользователя или сообщества. */
generator({
	method: 'video.getAlbums',
	count: 100,
	max: 1000
});

/*  */
generator({
	method: 'video.getComments',
	count: 100,
	max: 1000
});

/* Возвращает список комментариев к видеозаписи. */
generator({
	method: '',
	count: 100,
	max: 1000
});

/* Возвращает список заметок, созданных пользователем. */
generator({
	method: 'notes.get',
	count: 100,
	max: 1000
});

/* Возвращает список комментариев к заметке. */
generator({
	method: 'notes.getComments',
	count: 100,
	max: 1000
});

/* Возвращает список пользователей, находящихся в черном списке. */
generator({
	method: 'account.getBanned',
	count: 100,
	max: 1000
});

/* Получает список идентификаторов пользователей, которые добавили заданный объект в свой список Мне нравится. */
generator({
	method: 'likes.getList',
	count: 100,
	max: 1000
});

/* Получает список идентификаторов пользователей, которые выбрали определенные варианты ответа в опросе. */
generator({
	method: 'polls.getVoters',
	count: 100,
	max: 1000
});

/* Возвращает расширенную информацию о документах пользователя или сообщества. */
generator({
	method: 'docs.get',
	count: 200,
	max: 1000
});

/* Возвращает результаты поиска по документам. */
generator({
	method: 'docs.search',
	count: 100,
	max: 1000
});

/* Возвращает список входящих либо исходящих личных сообщений текущего пользователя. */
generator({
	method: 'messages.get',
	count: 200,
	max: 1000
});

/* Возвращает список диалогов текущего пользователя. */
generator({
	method: 'messages.getDialogs',
	count: 100,
	max: 1000
});

/* Возвращает список найденных личных сообщений текущего пользователя по введенной строке поиска. */
generator({
	method: 'messages.search',
	count: 100,
	max: 1000
});

/* Возвращает данные, необходимые для показа списка новостей для текущего пользователя. */
generator({
	method: 'newsfeed.get',
	count: 100,
	max: 1000
});

/* Возвращает список записей пользователей на своих стенах, в которых упоминается указанный пользователь. */
generator({
	method: 'newsfeed.getMentions',
	count: 100,
	max: 1000
});
