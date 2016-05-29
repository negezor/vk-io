'use strict';

/* Список разрешений (полный) */
exports._authScope = [
	'notify',
	'friends',
	'photos',
	'audio',
	'video',
	'docs',
	'notes',
	'pages',
	'left_menu',
	'status',
	'offers',
	'questions',
	'wall',
	'groups',
	'messages',
	'email',
	'notifications',
	'stats',
	'ads',
	'market',
	'offline'
];

exports.auth = function(){
	/* Возвращаем promise */
	return new this.promise((resolve,reject) => {
		var
		/* Алиас настроек */
		set = this.settings,
		/* Хранилища cookie */
		jar = this.request.jar(),
		/* Настраиваем объект request */
		request = this.request.defaults({
			/* Метод отправки */
			method: 'POST',
			/* Проходить по ридеректам */
			followAllRedirects: true,
			/* Установка хранилища cookie */
			jar: jar,
			/* Время ожидания */
			timeout: 6000,
			/* Заголовок */
			headers: {
				/* Ставим user agent */
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36'
			}
		});

		/* Парсирить токен и возвращает */
		var response = (resp) => {
			/* Получаем токен */
			var token = require('querystring').parse(resp.request.uri.hash)['#access_token'];

			/* Устанавливаем токен в конфиг */
			set.token = token;

			/* Возвращаем токен */
			resolve(token);
		};

		/* Ищет ссылку на разрешение */
		var aceptAccess = ($) => {
			/* Получаем текст скрипта */
			var script = $('script[type="text/javascript"][language="javascript"]').text();
			/* Ищем ссылку через регулярку */
			var grantAccess = script.match(/location\.href = \"(.*)\";/)[1].replace('&cancel=1','');

			/* Отправляем на получение токена */
			return request({
				/* Ссылка на получение токена */
				uri: grantAccess,
				/* Метод отправки */
				method: 'POST',
				/* Вернёт полный ответ */
				resolveWithFullResponse: true
			})
			.then(response)
			.catch(() => {
				aceptAccess($);
			});
		};

		/* Собирает данные формы и ставит свои данные */
		var formCompile = ($) => {
			/* Ищем форму */
			var $form = $('form[action][method="POST"]');
			/* Ищем input-ы */
			var $inputs = $form.find('input[name]');

			/* Параметры на запрос */
			var qs = {};

			/* Переводим input в объекты */
			$inputs.each(function(){
				/* Текущий элемент */
				var $elem = $(this);

				/* Добавляем в параметры */
				qs[$elem.attr('name')] = $elem.attr('value');
			});

			/* Установка email/логин/телефон */
			qs.email = set.email;
			/* Установка пароля */
			qs.pass = set.pass;

			/* Запрашиваем страницу с получения доступа */
			request({
				/* Путь отправки формы */
				uri: $form.attr('action'),
				/* Метод отправки */
				method: 'POST',
				/* Параметры */
				qs: qs,
				/* Возвращаем объект cheerio */
				transform: (page) => {
					/* Загрузка cheerio */
					return this.cheerio.load(page);
				}
			})
			.then(aceptAccess)
			.catch(() => {
				/* Повторяем запрос */
				formCompile($);
			});
		};

		/* Получаем страницу авторизации */
		request({
			uri: 'https://oauth.vk.com/authorize',
			/* Метод отправки */
			method: 'GET',
			/* Параметры */
			qs: {
				/* ID приложения */
				client_id: set.app,
				/* Редирект */
				redirect_uri: 'https://oauth.vk.com/blank.html',
				/* Список разрешений */
				scope: this._authScope.join(','),
				/* Версия api */
				v: set.version,
				/* Тип ответа VK */
				response_type: 'token',
				/* Страница запроса */
				display: 'page'
			},
			/* Возвращаем объект cheerio */
			transform: (page) => {
				/* Загрузка cheerio */
				return this.cheerio.load(page);
			}
		})
		.then(formCompile)
		.catch((error) => {
			console.log(error);
		});
	});
};
