'use strict';

/**
 * Список методов ВКонтакте
 * Последнее обновление 25.03.2017
 *
 * @type {Array}
 */
module.exports = [
	/**
	 * Account
	 * Методы для работы с аккаунтом
	 */
	'account.banUser',
	'account.changePassword',
	'account.getActiveOffers',
	'account.getAppPermissions',
	'account.getBanned',
	'account.getCounters',
	'account.getInfo',
	'account.getProfileInfo',
	'account.getPushSettings',
	'account.lookupContacts',
	'account.registerDevice',
	'account.saveProfileInfo',
	'account.setInfo',
	'account.setNameInMenu',
	'account.setOffline',
	'account.setOnline',
	'account.setPushSettings',
	'account.setSilenceMode',
	'account.unbanUser',
	'account.unregisterDevice',

	/**
	 * Ads
	 * API для работы с рекламным кабинетом ВКонтакт
	 */
	'ads.addOfficeUsers',
	'ads.checkLink',
	'ads.createAds',
	'ads.createCampaigns',
	'ads.createClients',
	'ads.createTargetGroup',
	'ads.deleteAds',
	'ads.deleteCampaigns',
	'ads.deleteClients',
	'ads.deleteTargetGroup',
	'ads.getAccounts',
	'ads.getAds',
	'ads.getAdsLayout',
	'ads.getAdsTargeting',
	'ads.getBudget',
	'ads.getCampaigns',
	'ads.getCategories',
	'ads.getClients',
	'ads.getDemographics',
	'ads.getFloodStats',
	'ads.getOfficeUsers',
	'ads.getPostsReach',
	'ads.getRejectionReason',
	'ads.getStatistics',
	'ads.getSuggestions',
	'ads.getTargetGroups',
	'ads.getTargetingStats',
	'ads.getUploadURL',
	'ads.getVideoUploadURL',
	'ads.importTargetContacts',
	'ads.removeOfficeUsers',
	'ads.updateAds',
	'ads.updateCampaigns',
	'ads.updateClients',
	'ads.updateTargetGroup',

	/**
	 * Apps
	 * Методы для работы с приложениями
	 */
	'apps.deleteAppRequests',
	'apps.get',
	'apps.getCatalog',
	'apps.getFriendsList',
	'apps.getLeaderboard',
	'apps.getScore',
	'apps.sendRequest',

	/**
	 * Audio
	 * Методы для работы с аудиозаписями
	 */
	'audio.get',
	'audio.getById',
	'audio.getLyrics',
	'audio.search',
	'audio.getUploadServer',
	'audio.save',
	'audio.add',
	'audio.delete',
	'audio.edit',
	'audio.reorder',
	'audio.restore',
	'audio.getAlbums',
	'audio.addAlbum',
	'audio.editAlbum',
	'audio.deleteAlbum',
	'audio.moveToAlbum',
	'audio.setBroadcast',
	'audio.getBroadcastList',
	'audio.getRecommendations',
	'audio.getPopular',
	'audio.getCount',

	/**
	 * Auth
	 * Методы для работы с авторизацией
	 */
	'auth.checkPhone',
	'auth.confirm',
	'auth.restore',
	'auth.signup',

	/**
	 * Board
	 * Методы для работы с обсуждениями
	 */
	'board.addTopic',
	'board.closeTopic',
	'board.createComment',
	'board.deleteComment',
	'board.deleteTopic',
	'board.editComment',
	'board.editTopic',
	'board.fixTopic',
	'board.getComments',
	'board.getTopics',
	'board.openTopic',
	'board.restoreComment',
	'board.unfixTopic',

	/**
	 * Database
	 * Доступ к базе данных учебных заведений ВКонтакте
	 */
	'database.getChairs',
	'database.getCities',
	'database.getCitiesById',
	'database.getCountries',
	'database.getCountriesById',
	'database.getFaculties',
	'database.getRegions',
	'database.getSchoolClasses',
	'database.getSchools',
	'database.getStreetsById',
	'database.getUniversities',

	/**
	 * Docs
	 * Методы для работы с документами
	 */
	'docs.add',
	'docs.delete',
	'docs.edit',
	'docs.get',
	'docs.getById',
	'docs.getTypes',
	'docs.getUploadServer',
	'docs.getWallUploadServer',
	'docs.save',
	'docs.search',

	/**
	 * Fave
	 * Методы для работы с закладками
	 */
	'fave.addGroup',
	'fave.addLink',
	'fave.addUser',
	'fave.getLinks',
	'fave.getMarketItems',
	'fave.getPhotos',
	'fave.getPosts',
	'fave.getUsers',
	'fave.getVideos',
	'fave.removeGroup',
	'fave.removeLink',
	'fave.removeUser',

	/**
	 * Friends
	 * Методы для работы с друзьями
	 */
	'friends.add',
	'friends.addList',
	'friends.areFriends',
	'friends.delete',
	'friends.deleteAllRequests',
	'friends.deleteList',
	'friends.edit',
	'friends.editList',
	'friends.get',
	'friends.getAppUsers',
	'friends.getByPhones',
	'friends.getLists',
	'friends.getMutual',
	'friends.getOnline',
	'friends.getRecent',
	'friends.getRequests',
	'friends.getSuggestions',
	'friends.search',

	/**
	 * Gifts
	 * Методы для работы с подарками
	 */
	'gifts.get',
	/* Неофициально */
	'gifts.send',
	'gifts.getCatalog',

	/**
	 * Groups
	 * Методы для работы с сообществами
	 */
	'groups.addLink',
	'groups.approveRequest',
	'groups.banUser',
	'groups.create',
	'groups.deleteLink',
	'groups.edit',
	'groups.editLink',
	'groups.editManager',
	'groups.editPlace',
	'groups.get',
	'groups.getBanned',
	'groups.getById',
	'groups.getCallbackConfirmationCode',
	'groups.getCallbackServerSettings',
	'groups.getCallbackSettings',
	'groups.getCatalog',
	'groups.getCatalogInfo',
	'groups.getInvitedUsers',
	'groups.getInvites',
	'groups.getMembers',
	'groups.getRequests',
	'groups.getSettings',
	'groups.invite',
	'groups.isMember',
	'groups.join',
	'groups.leave',
	'groups.removeUser',
	'groups.reorderLink',
	'groups.search',
	'groups.setCallbackServer',
	'groups.setCallbackServerSettings',
	'groups.setCallbackSettings',
	'groups.unbanUser',

	/**
	 * Leads
	 * Управления рекламными акциями (офферами).
	 */
	'leads.checkUser',
	'leads.complete',
	'leads.getStats',
	'leads.getUsers',
	'leads.metricHit',
	'leads.start',

	/**
	 * Likes
	 * Методы для работы с отметками «Мне нравится»
	 */
	'likes.add',
	'likes.delete',
	'likes.getList',
	'likes.isLiked',

	/**
	 * Market
	 * Методы market позволяют работать с товарами в сообществах
	 */
	'market.add',
	'market.addAlbum',
	'market.addToAlbum',
	'market.createComment',
	'market.delete',
	'market.deleteAlbum',
	'market.deleteComment',
	'market.edit',
	'market.editAlbum',
	'market.editComment',
	'market.get',
	'market.getAlbumById',
	'market.getAlbums',
	'market.getById',
	'market.getCategories',
	'market.getComments',
	'market.removeFromAlbum',
	'market.reorderAlbums',
	'market.reorderItems',
	'market.report',
	'market.reportComment',
	'market.restore',
	'market.restoreComment',
	'market.search',

	/**
	 * Messages
	 * Методы для работы с личными сообщениями
	 */
	'messages.addChatUser',
	'messages.allowMessagesFromGroup',
	'messages.createChat',
	'messages.delete',
	'messages.deleteChatPhoto',
	'messages.deleteDialog',
	'messages.denyMessagesFromGroup',
	'messages.editChat',
	'messages.get',
	'messages.getById',
	'messages.getChat',
	'messages.getChatUsers',
	'messages.getDialogs',
	'messages.getHistory',
	'messages.getHistoryAttachments',
	'messages.getLastActivity',
	'messages.getLongPollHistory',
	'messages.getLongPollServer',
	'messages.isMessagesFromGroupAllowed',
	'messages.markAsAnsweredDialog',
	'messages.markAsImportant',
	'messages.markAsImportantDialog',
	'messages.markAsRead',
	'messages.removeChatUser',
	'messages.restore',
	'messages.search',
	'messages.searchDialogs',
	'messages.send',
	'messages.setActivity',
	'messages.setChatPhoto',

	/**
	 * Newsfeed
	 * Методы для работы с новостной лентой пользователя
	 */
	'newsfeed.addBan',
	'newsfeed.deleteBan',
	'newsfeed.deleteList',
	'newsfeed.get',
	'newsfeed.getBanned',
	'newsfeed.getComments',
	'newsfeed.getLists',
	'newsfeed.getMentions',
	'newsfeed.getRecommended',
	'newsfeed.getSuggestedSources',
	'newsfeed.ignoreItem',
	'newsfeed.saveList',
	'newsfeed.search',
	'newsfeed.unignoreItem',
	'newsfeed.unsubscribe',

	/**
	 * Notes
	 * Методы для работы с заметками.
	 */
	'notes.add',
	'notes.createComment',
	'notes.delete',
	'notes.deleteComment',
	'notes.edit',
	'notes.editComment',
	'notes.get',
	'notes.getById',
	'notes.getComments',
	'notes.restoreComment',

	/**
	 * Notifications
	 * Методы для работы с оповещениями
	 */
	'notifications.get',
	'notifications.markAsViewed',

	/**
	 * Orders
	 * Управление заказми совершённые в приложениях
	 */
	'orders.changeState',
	'orders.get',
	'orders.getAmount',
	'orders.getById',

	/**
	 * Pages
	 * Методы для работы с вики-страницами
	 */
	'pages.clearCache',
	'pages.get',
	'pages.getHistory',
	'pages.getTitles',
	'pages.getVersion',
	'pages.parseWiki',
	'pages.save',
	'pages.saveAccess',

	/**
	 * Photos
	 * Методы для работы с фотографиями
	 */
	'photos.confirmTag',
	'photos.copy',
	'photos.createAlbum',
	'photos.createComment',
	'photos.delete',
	'photos.deleteAlbum',
	'photos.deleteComment',
	'photos.edit',
	'photos.editAlbum',
	'photos.editComment',
	'photos.get',
	'photos.getAlbums',
	'photos.getAlbumsCount',
	'photos.getAll',
	'photos.getAllComments',
	'photos.getById',
	'photos.getChatUploadServer',
	'photos.getComments',
	'photos.getMarketAlbumUploadServer',
	'photos.getMarketUploadServer',
	'photos.getMessagesUploadServer',
	'photos.getNewTags',
	'photos.getOwnerCoverPhotoUploadServer',
	'photos.getOwnerPhotoUploadServer',
	'photos.getTags',
	'photos.getUploadServer',
	'photos.getUserPhotos',
	'photos.getWallUploadServer',
	'photos.makeCover',
	'photos.move',
	'photos.putTag',
	'photos.removeTag',
	'photos.reorderAlbums',
	'photos.reorderPhotos',
	'photos.report',
	'photos.reportComment',
	'photos.restore',
	'photos.restoreComment',
	'photos.save',
	'photos.saveMarketAlbumPhoto',
	'photos.saveMarketPhoto',
	'photos.saveMessagesPhoto',
	'photos.saveOwnerCoverPhoto',
	'photos.saveOwnerPhoto',
	'photos.saveWallPhoto',
	'photos.search',

	/**
	 * Places
	 * Методы для работы с местами
	 */
	'places.add',
	'places.checkin',
	'places.getById',
	'places.getCheckins',
	'places.getTypes',
	'places.search',

	/**
	 * Polls
	 * Методы для работы с опросами.
	 */
	'polls.addVote',
	'polls.create',
	'polls.deleteVote',
	'polls.edit',
	'polls.getById',
	'polls.getVoters',

	/**
	 * Search
	 * Методы для работы с поиском
	 */
	'search.getHints',

	/**
	 * Secure
	 * Административные методы
	 */
	'secure.addAppEvent',
	'secure.checkToken',
	'secure.getAppBalance',
	'secure.getSMSHistory',
	'secure.getTransactionsHistory',
	'secure.getUserLevel',
	'secure.sendNotification',
	'secure.sendSMSNotification',
	'secure.setCounter',
	'secure.setUserLevel',

	/**
	 * Stats
	 * Методы для работы со статистикой
	 */
	'stats.get',
	'stats.getPostReach',
	'stats.trackVisitor',

	/**
	 * Status
	 * Методы для работы со статусом
	 */
	'status.get',
	'status.set',

	/**
	 * Storage
	 * Методы для работы с переменными в приложении
	 */
	'storage.get',
	'storage.getKeys',
	'storage.set',

	/**
	 * Users
	 * Методы для работы с данными пользователей
	 */
	'users.get',
	'users.getFollowers',
	'users.getNearby',
	'users.getSubscriptions',
	'users.isAppUser',
	'users.report',
	'users.search',

	/**
	 * Utils
	 * Служебные методы
	 */
	'utils.checkLink',
	'utils.deleteFromLastShortened',
	'utils.getLastShortenedLinks',
	'utils.getLinkStats',
	'utils.getServerTime',
	'utils.getShortLink',
	'utils.resolveScreenName',

	/**
	 * Video
	 * Методы для работы с видеозаписями
	 */
	'video.add',
	'video.addAlbum',
	'video.addToAlbum',
	'video.createComment',
	'video.delete',
	'video.deleteAlbum',
	'video.deleteComment',
	'video.edit',
	'video.editAlbum',
	'video.editComment',
	'video.get',
	'video.getAlbumById',
	'video.getAlbums',
	'video.getAlbumsByVideo',
	'video.getCatalog',
	'video.getCatalogSection',
	'video.getComments',
	'video.hideCatalogSection',
	'video.removeFromAlbum',
	'video.reorderAlbums',
	'video.reorderVideos',
	'video.report',
	'video.reportComment',
	'video.restore',
	'video.restoreComment',
	'video.save',
	'video.search',
	/* Неофициально */
	'video.getRecommendedLiveVideos',

	/**
	 * Wall
	 * Методы для работы с записями на стене
	 */
	'wall.createComment',
	'wall.delete',
	'wall.deleteComment',
	'wall.edit',
	'wall.editAdsStealth',
	'wall.editComment',
	'wall.get',
	'wall.getById',
	'wall.getComments',
	'wall.getReposts',
	'wall.pin',
	'wall.post',
	'wall.postAdsStealth',
	'wall.reportComment',
	'wall.reportPost',
	'wall.repost',
	'wall.restore',
	'wall.restoreComment',
	'wall.search',
	'wall.unpin',

	/**
	 * Widgets
	 * Методы для работы с виджетами на внешних сайтах
	 */
	'widgets.getComments',
	'widgets.getPages'
];
