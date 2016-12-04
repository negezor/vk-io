'use strict';

/* Обработчики stream */
exports._streamHandlers = [];

/**
 * Формирует метод для вызова
 *
 * @param string method
 * @param object params
 *
 * @return this
 */
exports._getExecuteMethod = (method,params = {}) => {
	return 'API.'+method+'('+JSON.stringify(params)+')';
};

/**
 * Добавляет обработчик в vk.stream
 *
 * @param string   way     Путь
 * @param function handler Обработчик
 */
const add = (way,handler) => {
	exports._streamHandlers.push({
		way: way,
		handler: handler
	});
};

/**
 * Возвращает код для vk execute
 *
 * @param object query Данные запроса
 *
 * @return promise
 */
const streamGetCode = function(query){
	return 'var a='+query.limit+',b='+(query.task || 0)+',c='+query.container.length+',d='+query.offset+',f=[],i=0,j,g,h=b==0||c<b;while(i<25&&h){j='+query.execute+';f=f+j.items;if(b==0||b>j.count)b=j.count;c=c+j.items.length;d=d+j.items.length;g=b-c;if(g<a)a=g;h=c<b;i=i+1;}return {task:b,items:f.splice(0,b)};';
};

/**
 * Заменяет строки на переменные
 */
const replaceParams = /\"(count|offset)\":\"(\w+)\"/g;

/**
 * Добавляет обработчик c API
 *
 * @param string  method Название метода
 * @param integer limit  Максмальное кол-во записе за раз
 * @param integer max    Максимальное кол-во возможный записей
 */
function generator (method,limit,max) {
	add(method,function(params = {}){
		return new this.promise((resolve,reject) => {
			var query = {
				/* Смещение выборки */
				offset: parseInt(params.offset || 0),
				/* Сколько нужно вытащить записей */
				task: params.count || null,
				/* Результат выборки */
				container: [],
				/* Записей за раз */
				limit: limit
			};

			this.logger.log('Start stream fetch');

			if (max && (!query.task || query.task && query.task > max)) {
				query.task = max;
			}

			if (query.offset > 0) {
				query.skip = query.offset;
			}

			params.count = 'a';
			params.offset = 'd';

			query.execute = this._getExecuteMethod(method,params)
			.replace(replaceParams,'"$1":$2');

			this._streamPreparation(query,resolve,reject);
		});
	});
};

/**
 * Подготавливает данные
 *
 * @param object   query   Данные запроса
 * @param function resolve
 * @param function reject
 */
exports._streamPreparation = function(query,resolve,reject){
	const fetch = () => {
		this.api.execute({
			code: streamGetCode(query)
		})
		.then((data) => {
			query.task = data.task;
			query.container = query.container.concat(data.items);

			if ('skip' in query) {
				query.task -= query.skip;
			}

			query.offset += data.items.length;

			const length = query.container.length;

			/* Stream task: 500 / 1000 [50%] */
			this.logger.debug(
				'Stream task:',length,'/',query.task,
				'['+Math.round(length/query.task*100)+'%]'
			);

			if (query.task <= length) {
				return resolve(query.container);
			}

			fetch();

			return null;
		})
		.catch(reject);
	};

	fetch();
};

/**
 * Возвращает список пользователей в соответствии с заданным критерием поиска.
 */
generator('users.search',1000,1000);

/**
 * Возвращает список идентификаторов пользователей и сообществ, которые входят в список подписок пользователя.
 */
generator('users.getSubscriptions',200);

/**
 * Возвращает список идентификаторов пользователей, которые являются подписчиками пользователя.
 */
generator('users.getFollowers',1000);

/**
 * Возвращает список записей со стены пользователя или сообщества.
 */
generator('wall.get',100);

/**
 * Позволяет искать записи на стене в соответствии с заданными критериями.
 */
generator('wall.search',100);

/**
 * Позволяет получать список репостов заданной записи.
 */
generator('wall.getReposts',1000);

/**
 * Возвращает список комментариев к записи на стене.
 */
generator('wall.getComments',100);

/**
 * Возвращает список фотоальбомов пользователя или сообщества.
 */
generator('photos.getAlbums',100);

/**
 * Возвращает список фотографий в альбоме.
 */
generator('photos.get',1000);

/**
 * Осуществляет поиск изображений по местоположению или описанию.
 */
generator('photos.search',1000);

/**
 * Возвращает все фотографии пользователя или сообщества в антихронологическом порядке.
 */
generator('photos.getAll',200);

/**
 * Возвращает список фотографий, на которых отмечен пользователь.
 */
generator('photos.getUserPhotos',1000);

/**
 * Возвращает список комментариев к фотографии.
 */
generator('photos.getComments',100);

/**
 * Возвращает отсортированный в антихронологическом порядке список всех комментариев к конкретному альбому или ко всем альбомам пользователя.
 */
generator('photos.getAllComments',100);

/**
 * Возвращает список фотографий, на которых есть непросмотренные отметки.
 */
generator('photos.getNewTags',100);

/**
 * Возвращает список идентификаторов друзей пользователя или расширенную информацию о друзьях пользователя (при использовании параметра fields).
 */
generator('friends.get',5000);

/**
 * Возвращает список идентификаторов друзей пользователя, находящихся на сайте.
 */
generator('friends.getOnline',5000);

/**
 * Возвращает список идентификаторов общих друзей между парой пользователей.
 */
generator('friends.getMutual',5000);

/**
 * Возвращает информацию о полученных или отправленных заявках на добавление в друзья для текущего пользователя.
 */
generator('friends.getRequests',1000);

/**
 * Возвращает список профилей пользователей, которые могут быть друзьями текущего пользователя.
 */
generator('friends.getSuggestions',500);

/**
 * Позволяет искать по списку друзей пользователей.
 */
generator('friends.search',1000);

/**
 * Получает список комментариев к странице, оставленных через Виджет комментариев.
 */
generator('widgets.getComments',200);

/**
 * Получает список страниц приложения/сайта, на которых установлен Виджет комментариев или «Мне нравится».
 */
generator('widgets.getPages',200);

/**
 * Возвращает названия всех переменных.
 */
generator('storage.getKeys',1000);

/**
 * Возвращает список аудиозаписей пользователя или сообщества.
 */
generator('audio.get',6000);

/**
 * Возвращает список аудиозаписей в соответствии с заданным критерием поиска.
 */
generator('audio.search',300,1000);

/**
 * Возвращает список альбомов аудиозаписей пользователя или группы.
 */
generator('audio.getAlbums',100);

/**
 * Возвращает список рекомендуемых аудиозаписей на основе списка воспроизведения заданного пользователя или на основе одной выбранной аудиозаписи.
 */
generator('audio.getRecommendations',1000);

/**
 * Возвращает список аудиозаписей из раздела "Популярное".
 */
generator('audio.getPopular',1000);

/**
 * Возвращает список сообществ указанного пользователя.
 */
generator('groups.get',1000);

/**
 * Возвращает список участников сообщества.
 */
generator('groups.getMembers',1000);

/**
 * Осуществляет поиск сообществ по заданной подстроке.
 */
generator('groups.search',1000,1000);

/**
 * Данный метод возвращает список приглашений в сообщества и встречи текущего пользователя.
 */
generator('groups.getInvites',20);

/**
 * Возвращает список пользователей, которые были приглашены в группу.
 */
generator('groups.getInvitedUsers',20);

/**
 * Возвращает список забаненных пользователей в сообществе.
 */
generator('groups.getBanned',200);

/**
 * Возвращает список заявок на вступление в сообщество.
 */
generator('groups.getRequests',200);

/**
 * Возвращает список тем в обсуждениях указанной группы.
 */
generator('board.getTopics',100);

/**
 * Возвращает список сообщений в указанной теме.
 */
generator('board.getComments',100);

/**
 * Возвращает информацию о видеозаписях.
 */
generator('video.get',200);

/**
 * Возвращает список видеозаписей в соответствии с заданным критерием поиска.
 */
generator('video.search',200,1000);

/**
 * Возвращает список видеозаписей, на которых отмечен пользователь.
 */
generator('video.getUserVideos',100);

/**
 * Возвращает список альбомов видеозаписей пользователя или сообщества.
 */
generator('video.getAlbums',100);

/**
 * Возвращает список комментариев к видеозаписи.
 */
generator('video.getComments',100);

/**
 * Возвращает список видеозаписей, на которых есть непросмотренные отметки.
 */
generator('video.getNewTags',100);

/**
 * Возвращает список заметок, созданных пользователем.
 */
generator('notes.get',100);

/**
 * Возвращает список комментариев к заметке.
 */
generator('notes.getComments',100);

/**
 * Возвращает список мест, найденных по заданным условиям поиска.
 */
generator('places.search',1000);

/**
 * Возвращает список отметок пользователей в местах согласно заданным параметрам.
 */
generator('places.getCheckins',100);

/**
 * Возвращает список активных рекламных предложений (офферов), выполнив которые пользователь сможет получить соответствующее количество голосов на свой счёт внутри приложения.
 */
generator('account.getActiveOffers',100);


/**
 * Возвращает список пользователей, находящихся в черном списке.
 */
generator('account.getBanned',200);

/**
 * Возвращает список входящих либо исходящих личных сообщений текущего пользователя/сообщества.
 */
generator('messages.get',200);

/**
 * Возвращает список диалогов текущего пользователя.
 */
generator('messages.getDialogs',200);

/**
 * Возвращает список найденных личных сообщений текущего пользователя по введенной строке поиска.
 */
generator('messages.search',100);

/**
 * Возвращает историю сообщений для указанного диалога.
 */
generator('messages.getHistory',200);

/**
 * Возвращает данные, необходимые для показа списка новостей для текущего пользователя.
 */
generator('newsfeed.get',100);

/**
 * Получает список новостей, рекомендованных пользователю.
 */
generator('newsfeed.getRecommended',100);

/**
 * Возвращает список записей пользователей на своих стенах, в которых упоминается указанный пользователь.
 */
generator('newsfeed.getMentions',50);

/**
 * Возвращает результаты поиска по статусам. Новости возвращаются в порядке от более новых к более старым.
 */
generator('newsfeed.search',200,1000);

/**
 * Возвращает сообщества и пользователей, на которые текущему пользователю рекомендуется подписаться.
 */
generator('newsfeed.getSuggestedSources',100);

/**
 * Получает список идентификаторов пользователей, которые добавили заданный объект в свой список Мне нравится.
 */
generator('likes.getList',1000);

/**
 * Получает список идентификаторов пользователей, которые выбрали определенные варианты ответа в опросе.
 */
generator('polls.getVoters',1000);

/**
 * Возвращает список пользователей, добавленных текущим пользователем в закладки.
 */
generator('fave.getUsers',100);

/**
 * Возвращает фотографии, на которых текущий пользователь поставил отметку «Мне нравится».
 */
generator('fave.getPhotos',100);

/**
 * Возвращает записи, на которых текущий пользователь поставил отметку «Мне нравится».
 */
generator('fave.getPosts',100);

/**
 * Возвращает список видеозаписей, на которых текущий пользователь поставил отметку «Мне нравится».
 */
generator('fave.getVideos',100);

/**
 * Возвращает ссылки, добавленные в закладки текущим пользователем.
 */
generator('fave.getLinks',100);

/**
 * Возвращает товары, добавленные в закладки текущим пользователем.
 */
generator('fave.getMarketItems',100);

/**
 * Возвращает расширенную информацию о документах пользователя или сообщества.
 */
generator('docs.get',100);

/**
 * Возвращает результаты поиска по документам.
 */
generator('docs.search',100);

/**
 * Возвращает список оповещений об ответах других пользователей на записи текущего пользователя.
 */
generator('notifications.get',100);

/**
 * Возвращает список приложений, доступных для пользователей сайта через каталог приложений.
 */
generator('apps.getCatalog',100);

/**
 * Создает список друзей, который будет использоваться при отправке пользователем приглашений в приложение и игровых запросов.
 */
generator('apps.getFriendsList',5000);

/**
 * Возвращает список полученных подарков пользователя.
 */
generator('gifts.get',200);

/**
 * Возвращает список товаров в сообществе.
 */
generator('market.get',200);

/**
 * Ищет товары в каталоге сообщества.
 */
generator('market.search',200);

/**
 * Возвращает список подборок с товарами.
 */
generator('market.getAlbums',100);

/**
 * Возвращает список комментариев к товару.
 */
generator('market.getComments',100);

/**
 * Возвращает список категорий для товаров.
 */
generator('market.getCategories',1000);

/**
 * Возвращает список стран.
 */
generator('database.getCountries',1000);

/**
 * Возвращает список регионов.
 */
generator('database.getRegions',1000);

/**
 * Возвращает список городов.
 */
generator('database.getCities',1000);

/**
 * Возвращает список высших учебных заведений.
 */
generator('database.getUniversities',10000);

/**
 * Возвращает список школ.
 */
generator('database.getSchools',10000);

/**
 * Возвращает список факультетов.
 */
generator('database.getFaculties',10000);

/**
 * Возвращает список кафедр университета по указанному факультету.
 */
generator('database.getChairs',10000);
