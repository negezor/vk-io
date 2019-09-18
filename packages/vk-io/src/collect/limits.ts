/**
 * List limits VK
 * Last updated 09.10.2017
 */
export default [
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
	['fave.getPosts', 100],
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
	['messages.getHistory', 200],
	['messages.search', 100],
	['messages.getConversations', 200],

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
] as [string, number, number?][];
