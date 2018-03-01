/**
 * List methods VK
 * Last updated 21.02.2018
 *
 * @type {Array}
 */
export default [
	/**
	 * Account
	 * Methods for working with your account
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
	 * API for working with an advertising cabinet VK
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
	 * Methods for working with applications
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
	 * Methods for working with audio
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
	 * Methods for working with authorization
	 */
	'auth.checkPhone',
	'auth.confirm',
	'auth.restore',
	'auth.signup',

	/**
	 * Board
	 * Methods for working with discussions
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
	 * Access to the database of educational institutions VK
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
	 * Methods for working with documents
	 */
	'docs.add',
	'docs.delete',
	'docs.edit',
	'docs.get',
	'docs.getById',
	'docs.getTypes',
	'docs.getUploadServer',
	'docs.getMessagesUploadServer',
	'docs.getWallUploadServer',
	'docs.save',
	'docs.search',

	/**
	 * Fave
	 * Methods for working with bookmarks
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
	 * Methods for working with friends
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
	 * Methods for working with gifts
	 */
	'gifts.get',
	/* Unofficially */
	'gifts.send',
	'gifts.getCatalog',

	/**
	 * Groups
	 * Methods for working with communities
	 */
	'groups.addCallbackServer',
	'groups.addLink',
	'groups.approveRequest',
	'groups.banUser',
	'groups.create',
	'groups.deleteCallbackServer',
	'groups.deleteLink',
	'groups.disableOnline',
	'groups.edit',
	'groups.editLink',
	'groups.editManager',
	'groups.editPlace',
	'groups.enableOnline',
	'groups.get',
	'groups.getBanned',
	'groups.getById',
	'groups.getCallbackConfirmationCode',
	'groups.getCallbackSettings',
	'groups.getCatalog',
	'groups.getCatalogInfo',
	'groups.getInvitedUsers',
	'groups.getInvites',
	'groups.getLongPollServer',
	'groups.getLongPollSettings',
	'groups.getMembers',
	'groups.getOnlineStatus',
	'groups.getRequests',
	'groups.getSettings',
	'groups.getTokenPermissions',
	'groups.invite',
	'groups.isMember',
	'groups.join',
	'groups.leave',
	'groups.removeUser',
	'groups.reorderLink',
	'groups.search',
	'groups.setCallbackSettings',
	'groups.setLongPollSettings',
	'groups.unbanUser',

	/**
	 * Leads
	 * Management of advertising actions (offers)
	 */
	'leads.checkUser',
	'leads.complete',
	'leads.getStats',
	'leads.getUsers',
	'leads.metricHit',
	'leads.start',

	/**
	 * Likes
	 * Methods for working with the "I like"
	 */
	'likes.add',
	'likes.delete',
	'likes.getList',
	'likes.isLiked',

	/**
	 * Market
	 * Market methods allow you to work with products in communities
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
	 * Methods for working with personal messages
	 */
	'messages.addChatUser',
	'messages.allowMessagesFromGroup',
	'messages.createChat',
	'messages.delete',
	'messages.deleteChatPhoto',
	'messages.deleteDialog',
	'messages.denyMessagesFromGroup',
	'messages.edit',
	'messages.editChat',
	'messages.get',
	'messages.getById',
	'messages.getChat',
	'messages.getChatUsers',
	'messages.getDialogs',
	'messages.getHistory',
	'messages.getHistoryAttachments',
	'messages.getInviteLink',
	'messages.getLastActivity',
	'messages.getLongPollHistory',
	'messages.getLongPollServer',
	'messages.pin',
	'messages.isMessagesFromGroupAllowed',
	'messages.joinChatByInviteLink',
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
	'messages.unpin',

	/**
	 * Newsfeed
	 * Methods for working with the user's news feed
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
	 * Methods for working with notes
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
	 * Methods for working with notifications
	 */
	'notifications.get',
	'notifications.markAsViewed',

	/**
	 * Orders
	 * Order management completed in applications
	 */
	'orders.changeState',
	'orders.get',
	'orders.getAmount',
	'orders.getById',

	/**
	 * Pages
	 * Methods for working with wiki pages
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
	 * Methods for working with photos
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
	 * Methods for working with places
	 */
	'places.add',
	'places.checkin',
	'places.getById',
	'places.getCheckins',
	'places.getTypes',
	'places.search',

	/**
	 * Polls
	 * Methods for working with polls
	 */
	'polls.addVote',
	'polls.create',
	'polls.deleteVote',
	'polls.edit',
	'polls.getById',
	'polls.getVoters',

	/**
	 * Search
	 * Methods for working with search
	 */
	'search.getHints',

	/**
	 * Secure
	 * Administrative Methods
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
	 * Methods for working with statistics
	 */
	'stats.get',
	'stats.getPostReach',
	'stats.trackVisitor',

	/**
	 * Status
	 * Methods for working with status
	 */
	'status.get',
	'status.set',

	/**
	 * Storage
	 * Methods for working with variables in an application
	 */
	'storage.get',
	'storage.getKeys',
	'storage.set',

	/**
	 * Stories
	 * Methods for working with stories
	 */
	'stories.banOwner',
	'stories.delete',
	'stories.get',
	'stories.getBanned',
	'stories.getById',
	'stories.getPhotoUploadServer',
	'stories.getReplies',
	'stories.getStats',
	'stories.getVideoUploadServer',
	'stories.getViewers',
	'stories.hideAllReplies',
	'stories.hideReply',
	'stories.unbanOwner',

	/**
	 * Streaming
	 * Methods for working with the Streaming API
	 */
	'streaming.getServerUrl',
	'streaming.getSettings',
	'streaming.getStats',
	'streaming.setSettings',

	/**
	 * Users
	 * Methods for working with user data
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
	 * Service methods
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
	 * Methods for working with videos
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
	/* Unofficially */
	'video.getRecommendedLiveVideos',

	/**
	 * Wall
	 * Methods for working with posts on the wall
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
	 * Methods for working with widgets on external sites
	 */
	'widgets.getComments',
	'widgets.getPages'
];
