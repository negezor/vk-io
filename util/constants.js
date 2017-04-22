'use strict';

/**
 * Версия ВКонтакте API
 *
 * @type {string}
 */
exports.API_VERSION = '5.63';

/**
 * Адрес API методов
 *
 * @type {string}
 */
exports.API_URI = 'https://api.vk.com/method/';

/**
 * User-Agent пользователя
 *
 * @type {string}
 */
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
+ ' (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36';

exports.USER_AGENT = USER_AGENT;

/**
 * Получение ID чата из peer
 *
 * @type {number}
 */
exports.SHEAR_CHAT_PEER = 2e9;

/**
 * Полный список разрешений авторизации
 *
 * @type {Array}
 */
const MAX_SCOPE = [
	'notify',
	'friends',
	'photos',
	'audio',
	'video',
	'pages',
	'status',
	'notes',
	'messages',
	'wall',
	'ads',
	'offline',
	'docs',
	'groups',
	'notifications',
	'stats',
	'email',
	'market'
];

exports.MAX_SCOPE = MAX_SCOPE;

/**
 * Список ошибок авторизации
 *
 * @type {Object}
 */
const AUTH_ERRORS = {
	PAGE_BLOCKED: 'PAGE_BLOCKED',
	MISSING_CAPTCHA: 'MISSING_CAPTCHA',
	INVALID_PHONE_NUMBER: 'INVALID_PHONE_NUMBER',
	AUTHORIZATION_FAILED: 'AUTHORIZATION_FAILED',
};

exports.AUTH_ERRORS = AUTH_ERRORS;

/**
 * Список ограничений на методы
 *
 * @type {Array}
 */
exports.METHODS_LIMIT = [
	/**
	 * Account
	 */
	['account.getActiveOffers', 100],
	['account.getBanned', 200],

	/**
	 * Ads
	 */
	['ads.getAds', 100, 2000],
	['ads.getAdsLayout', 100, 2000],
	['ads.getAdsTargeting', 100, 2000],

	/**
	 * Apps
	 */
	['apps.getCatalog', 100],
	['apps.getFriendsList', 5000],

	/**
	 * Audio
	 */
	['audio.get', 6000],
	['audio.search', 300, 1000],
	['audio.getAlbums', 100],
	['audio.getRecommendations', 1000],
	['audio.getPopular', 1000],

	/**
	 * Board
	 */
	['board.getComments', 100],
	['board.getTopics', 100],

	/**
	 * Database
	 */
	['database.getChairs', 10000],
	['database.getCities', 1000],
	['database.getCountries', 1000],
	['database.getFaculties', 10000],
	['database.getRegions', 1000],
	['database.getSchools', 10000],
	['database.getUniversities', 10000],

	/**
	 * Docs
	 */
	['docs.get', 2000, 2000],
	['docs.search', 1000, 1000],

	/**
	 * Fave
	 */
	['fave.getLinks', 100],
	['fave.getMarketItems', 100],
	['fave.getPhotos', 100],
	['fave.getUsers', 100],
	['fave.getVideos', 100],

	/**
	 * Friends
	 */
	['friends.get', 1000],
	['friends.getMutual', 1000],
	['friends.getMutual', 1000],
	['friends.getOnline', 1000],
	['friends.getRecent', 1000],
	['friends.getRequests', 1000],
	['friends.getSuggestions', 500],
	['friends.search', 1000],

	/**
	 * Gifts
	 */
	['gifts.get', 100],

	/**
	 * Groups
	 */
	['groups.get', 1000],
	['groups.getBanned', 200],
	['groups.getInvitedUsers', 100],
	['groups.getInvites', 100],
	['groups.getMembers', 1000],
	['groups.getRequests', 200],

	/**
	 * Leads
	 */
	['leads.getUsers', 1000],

	/**
	 * Likes
	 */
	['likes.getList', 100],

	/**
	 * Market
	 */
	['market.get', 200],
	['market.getAlbums', 100],
	['market.getCategories', 1000],
	['market.getComments', 100],
	['market.search', 200],

	/**
	 * messages
	 */
	['messages.get', 200],
	['messages.getDialogs', 200],
	['messages.getHistory', 200],
	['messages.search', 100],

	/**
	 * Newsfeed
	 * TODO: Сделать остальные методы
	 */
	['newsfeed.getMentions', 50],
	['newsfeed.getSuggestedSources', 1000],

	/**
	 * Notification
	 * TODO: Сделать методы
	 */

	/**
	 * Notes
	 */
	['notes.get', 100],
	['notes.getComments', 100],

	/**
	 * Orders
	 */
	['orders.get', 1000],

	/**
	 * Photos
	 */
	['photos.get', 1000],
	['photos.getAlbums', 100],
	['photos.getAll', 200],
	['photos.getAllComments', 100],
	['photos.getComments', 100],
	['photos.getNewTags', 100],
	['photos.getUserPhotos', 1000],
	['photos.search', 1000],

	/**
	 * Places
	 */
	['places.getCheckins', 100],
	['places.search', 1000],

	/**
	 * Polls
	 */
	['polls.getVoters', 100],

	/**
	 * Storage
	 */
	['storage.getKeys', 1000],

	/**
	 * Users
	 */
	['users.getFollowers', 1000],
	['users.getSubscriptions', 200],
	['users.search', 1000, 1000],

	/**
	 * Utils
	 */
	['utils.getLastShortenedLinks', 50],

	/**
	 * Video
	 */
	['video.get', 200],
	['video.getAlbums', 100],
	['video.getComments', 100],
	['video.search', 1000, 1000],

	/**
	 * Wall
	 */
	['wall.get', 100],
	['wall.getComments', 100],
	['wall.getReposts', 1000],
	['wall.search', 100],

	/**
	 * Widgets
	 */
	['widgets.getComments', 200],
	['widgets.getPages', 200]
];

/**
 * Основные опции
 *
 * @typedef {Object} MainOptions
 *
 * @property {?number} [id] Идентификатор пользователя
 *
 * @property {?string} [login] Email/телефон от аккаунта
 * @property {?number} [phone] Номер телефона
 * @property {?string} [pass]  Пароль от аккаунта
 *
 * @property {?string} [token] Токен
 *
 * @property {?number} [app]   Приложение
 * @property {?string} [key]   Секретный ключ приложения
 * @property {string}  [scope] Список разрешений
 *
 * @property {string}  [lang]      Язык на котором возвращаются данные
 * @property {string}  [call]      Режим вызова методов
 * @property {number}  [limit]     Максимальное количество запросов в секунду
 * @property {number}  [timeout]   Время сброса соединения на API
 * @property {number}  [callCount] Максимальное количество вызовов методов в execute за раз
 *
 * @property {?number} [authCaptcha]  Количество попыток пройти капчу
 * 
 * @property {number} [longpollCount] Количество попыток перезапуска longpoll
 * @property {number} [longpollWait]  Время ожидания перезапуска
 *
 * @property {boolean} [restartError] Перезапускать ли при ошибках запрос
 * @property {number}  [restartCount] Количество попыток перезапуска
 * @property {number}  [restartWait]  Время ожидания перезапуска
 */
exports.defaultMainOptions = {
	id: null,

	login: null,
	phone: null,
	pass: null,

	token: null,

	app: null,
	key: null,
	scope: MAX_SCOPE.join(','),

	lang: null,
	call: 'api',
	limit: 3,
	timeout: 6e3,
	callCount: 25,

	authCaptcha: 3,

	longpollCount: 6,
	longpollWait: 6e3,

	restartError: true,
	restartCount: 3,
	restartWait: 3e3
};
