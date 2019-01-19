/* tslint:disable */
import * as Params from "./params.d";

import * as Responses from "./responses.d";

/**
 * The API users group
 */
export interface APIUsers {
    /**
     * Returns detailed information on users.
     */
    get(params: Params.UsersGetParams): Promise<Responses.UsersGetResponse>;
    /**
     * Returns a list of users matching the search criteria.
     */
    search(params: Params.UsersSearchParams): Promise<Responses.UsersSearchResponse>;
    /**
     * Returns information whether a user installed the application.
     */
    isAppUser(params: Params.UsersIsAppUserParams): Promise<Responses.UsersIsAppUserResponse>;
    /**
     * Returns a list of IDs of users and communities followed by the user.
     */
    getSubscriptions(params: Params.UsersGetSubscriptionsParams): Promise<Responses.UsersGetSubscriptionsResponse>;
    /**
     * Returns a list of IDs of followers of the user in question, sorted by date added, most recent first.
     */
    getFollowers(params: Params.UsersGetFollowersParams): Promise<Responses.UsersGetFollowersResponse>;
    /**
     * Reports (submits a complain about) a user.
     */
    report(params: Params.UsersReportParams): Promise<Responses.OkResponse>;
    /**
     * Indexes current user location and returns nearby users.
     */
    getNearby(params: Params.UsersGetNearbyParams): Promise<Responses.UsersGetNearbyResponse>;
}

/**
 * The API auth group
 */
export interface APIAuth {
    /**
     * Checks a user's phone number for correctness.
     */
    checkPhone(params: Params.AuthCheckPhoneParams): Promise<Responses.OkResponse>;
    /**
     * Registers a new user by phone number.
     */
    signup(params: Params.AuthSignupParams): Promise<Responses.AuthSignupResponse>;
    /**
     * Completes a user's registration (begun with the [vk.com/dev/auth.signup|auth.signup] method) using an authorization code.
     */
    confirm(params: Params.AuthConfirmParams): Promise<Responses.AuthConfirmResponse>;
    /**
     * Allows to restore account access using a code received via SMS. " This method is only available for apps with [vk.com/dev/auth_direct|Direct authorization] access. "
     */
    restore(params: Params.AuthRestoreParams): Promise<Responses.AuthRestoreResponse>;
}

/**
 * The API wall group
 */
export interface APIWall {
    /**
     * Returns a list of posts on a user wall or community wall.
     */
    get(params: Params.WallGetParams): Promise<Responses.WallGetResponse>;
    /**
     * Allows to search posts on user or community walls.
     */
    search(params: Params.WallSearchParams): Promise<Responses.WallSearchResponse>;
    /**
     * Returns a list of posts from user or community walls by their IDs.
     */
    getById(params: Params.WallGetByIdParams): Promise<Responses.WallGetByIdResponse>;
    /**
     * Adds a new post on a user wall or community wall. Can also be used to publish suggested or scheduled posts.
     */
    post(params: Params.WallPostParams): Promise<Responses.WallPostResponse>;
    /**
     * Allows to create hidden post which will not be shown on the community's wall and can be used for creating an ad with type "Community post".
     */
    postAdsStealth(params: Params.WallPostAdsStealthParams): Promise<Responses.WallPostAdsStealthResponse>;
    /**
     * Reposts (copies) an object to a user wall or community wall.
     */
    repost(params: Params.WallRepostParams): Promise<Responses.WallRepostResponse>;
    /**
     * Returns information about reposts of a post on user wall or community wall.
     */
    getReposts(params: Params.WallGetRepostsParams): Promise<Responses.WallGetRepostsResponse>;
    /**
     * Edits a post on a user wall or community wall.
     */
    edit(params: Params.WallEditParams): Promise<Responses.OkResponse>;
    /**
     * Allows to edit hidden post.
     */
    editAdsStealth(params: Params.WallEditAdsStealthParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a post from a user wall or community wall.
     */
    delete(params: Params.WallDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Restores a post deleted from a user wall or community wall.
     */
    restore(params: Params.WallRestoreParams): Promise<Responses.OkResponse>;
    /**
     * Pins the post on wall.
     */
    pin(params: Params.WallPinParams): Promise<Responses.OkResponse>;
    /**
     * Unpins the post on wall.
     */
    unpin(params: Params.WallUnpinParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of comments on a post on a user wall or community wall.
     */
    getComments(params: Params.WallGetCommentsParams): Promise<Responses.WallGetCommentsResponse>;
    /**
     * Adds a comment to a post on a user wall or community wall.
     */
    createComment(params: Params.WallCreateCommentParams): Promise<Responses.WallCreateCommentResponse>;
    /**
     * Edits a comment on a user wall or community wall.
     */
    editComment(params: Params.WallEditCommentParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a comment on a post on a user wall or community wall.
     */
    deleteComment(params: Params.WallDeleteCommentParams): Promise<Responses.OkResponse>;
    /**
     * Restores a comment deleted from a user wall or community wall.
     */
    restoreComment(params: Params.WallRestoreCommentParams): Promise<Responses.OkResponse>;
    /**
     * Reports (submits a complaint about) a post on a user wall or community wall.
     */
    reportPost(params: Params.WallReportPostParams): Promise<Responses.OkResponse>;
    /**
     * Reports (submits a complaint about) a comment on a post on a user wall or community wall.
     */
    reportComment(params: Params.WallReportCommentParams): Promise<Responses.OkResponse>;
}

/**
 * The API photos group
 */
export interface APIPhotos {
    /**
     * Creates an empty photo album.
     */
    createAlbum(params: Params.PhotosCreateAlbumParams): Promise<Responses.PhotosCreateAlbumResponse>;
    /**
     * Edits information about a photo album.
     */
    editAlbum(params: Params.PhotosEditAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of a user's or community's photo albums.
     */
    getAlbums(params: Params.PhotosGetAlbumsParams): Promise<Responses.PhotosGetAlbumsResponse>;
    /**
     * Returns a list of a user's or community's photos.
     */
    get(params: Params.PhotosGetParams): Promise<Responses.PhotosGetResponse>;
    /**
     * Returns the number of photo albums belonging to a user or community.
     */
    getAlbumsCount(params: Params.PhotosGetAlbumsCountParams): Promise<Responses.PhotosGetAlbumsCountResponse>;
    /**
     * Returns information about photos by their IDs.
     */
    getById(params: Params.PhotosGetByIdParams): Promise<Responses.PhotosGetByIdResponse>;
    /**
     * Returns the server address for photo upload.
     */
    getUploadServer(params: Params.PhotosGetUploadServerParams): Promise<Responses.PhotosGetUploadServerResponse>;
    /**
     * Returns the server address for owner cover upload.
     */
    getOwnerCoverPhotoUploadServer(params: Params.PhotosGetOwnerCoverPhotoUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
    /**
     * Returns an upload server address for a profile or community photo.
     */
    getOwnerPhotoUploadServer(params: Params.PhotosGetOwnerPhotoUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
    /**
     * Returns an upload link for chat cover pictures.
     */
    getChatUploadServer(params: Params.PhotosGetChatUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
    /**
     * Returns the server address for market photo upload.
     */
    getMarketUploadServer(params: Params.PhotosGetMarketUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
    /**
     * Returns the server address for market album photo upload.
     */
    getMarketAlbumUploadServer(params: Params.PhotosGetMarketAlbumUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
    /**
     * Saves market photos after successful uploading.
     */
    saveMarketPhoto(params: Params.PhotosSaveMarketPhotoParams): Promise<Responses.PhotosSaveMarketPhotoResponse>;
    /**
     * Saves cover photo after successful uploading.
     */
    saveOwnerCoverPhoto(params: Params.PhotosSaveOwnerCoverPhotoParams): Promise<Responses.PhotosSaveOwnerCoverPhotoResponse>;
    /**
     * Saves market album photos after successful uploading.
     */
    saveMarketAlbumPhoto(params: Params.PhotosSaveMarketAlbumPhotoParams): Promise<Responses.PhotosSaveMarketAlbumPhotoResponse>;
    /**
     * Saves a profile or community photo. Upload URL can be got with the [vk.com/dev/photos.getOwnerPhotoUploadServer|photos.getOwnerPhotoUploadServer] method.
     */
    saveOwnerPhoto(params: Params.PhotosSaveOwnerPhotoParams): Promise<Responses.PhotosSaveOwnerPhotoResponse>;
    /**
     * Saves a photo to a user's or community's wall after being uploaded.
     */
    saveWallPhoto(params: Params.PhotosSaveWallPhotoParams): Promise<Responses.PhotosSaveWallPhotoResponse>;
    /**
     * Returns the server address for photo upload onto a user's wall.
     */
    getWallUploadServer(params: Params.PhotosGetWallUploadServerParams): Promise<Responses.PhotosGetWallUploadServerResponse>;
    /**
     * Returns the server address for photo upload in a private message for a user.
     */
    getMessagesUploadServer(params: Params.PhotosGetMessagesUploadServerParams): Promise<Responses.PhotosGetMessagesUploadServerResponse>;
    /**
     * Saves a photo after being successfully uploaded. URL obtained with [vk.com/dev/photos.getMessagesUploadServer|photos.getMessagesUploadServer] method.
     */
    saveMessagesPhoto(params: Params.PhotosSaveMessagesPhotoParams): Promise<Responses.PhotosSaveMessagesPhotoResponse>;
    /**
     * Reports (submits a complaint about) a photo.
     */
    report(params: Params.PhotosReportParams): Promise<Responses.OkResponse>;
    /**
     * Reports (submits a complaint about) a comment on a photo.
     */
    reportComment(params: Params.PhotosReportCommentParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of photos.
     */
    search(params: Params.PhotosSearchParams): Promise<Responses.PhotosSearchResponse>;
    /**
     * Saves photos after successful uploading.
     */
    save(params: Params.PhotosSaveParams): Promise<Responses.PhotosSaveResponse>;
    /**
     * Allows to copy a photo to the "Saved photos" album
     */
    copy(params: Params.PhotosCopyParams): Promise<Responses.PhotosCopyResponse>;
    /**
     * Edits the caption of a photo.
     */
    edit(params: Params.PhotosEditParams): Promise<Responses.OkResponse>;
    /**
     * Moves a photo from one album to another.
     */
    move(params: Params.PhotosMoveParams): Promise<Responses.OkResponse>;
    /**
     * Makes a photo into an album cover.
     */
    makeCover(params: Params.PhotosMakeCoverParams): Promise<Responses.OkResponse>;
    /**
     * Reorders the album in the list of user albums.
     */
    reorderAlbums(params: Params.PhotosReorderAlbumsParams): Promise<Responses.OkResponse>;
    /**
     * Reorders the photo in the list of photos of the user album.
     */
    reorderPhotos(params: Params.PhotosReorderPhotosParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of photos belonging to a user or community, in reverse chronological order.
     */
    getAll(params: Params.PhotosGetAllParams): Promise<Responses.PhotosGetAllResponse>;
    /**
     * Returns a list of photos in which a user is tagged.
     */
    getUserPhotos(params: Params.PhotosGetUserPhotosParams): Promise<Responses.PhotosGetUserPhotosResponse>;
    /**
     * Deletes a photo album belonging to the current user.
     */
    deleteAlbum(params: Params.PhotosDeleteAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a photo.
     */
    delete(params: Params.PhotosDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Restores a deleted photo.
     */
    restore(params: Params.PhotosRestoreParams): Promise<Responses.OkResponse>;
    /**
     * Confirms a tag on a photo.
     */
    confirmTag(params: Params.PhotosConfirmTagParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of comments on a photo.
     */
    getComments(params: Params.PhotosGetCommentsParams): Promise<Responses.PhotosGetCommentsResponse>;
    /**
     * Returns a list of comments on a specific photo album or all albums of the user sorted in reverse chronological order.
     */
    getAllComments(params: Params.PhotosGetAllCommentsParams): Promise<Responses.PhotosGetAllCommentsResponse>;
    /**
     * Adds a new comment on the photo.
     */
    createComment(params: Params.PhotosCreateCommentParams): Promise<Responses.PhotosCreateCommentResponse>;
    /**
     * Deletes a comment on the photo.
     */
    deleteComment(params: Params.PhotosDeleteCommentParams): Promise<Responses.PhotosDeleteCommentResponse>;
    /**
     * Restores a deleted comment on a photo.
     */
    restoreComment(params: Params.PhotosRestoreCommentParams): Promise<Responses.PhotosRestoreCommentResponse>;
    /**
     * Edits a comment on a photo.
     */
    editComment(params: Params.PhotosEditCommentParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of tags on a photo.
     */
    getTags(params: Params.PhotosGetTagsParams): Promise<Responses.PhotosGetTagsResponse>;
    /**
     * Adds a tag on the photo.
     */
    putTag(params: Params.PhotosPutTagParams): Promise<Responses.PhotosPutTagResponse>;
    /**
     * Removes a tag from a photo.
     */
    removeTag(params: Params.PhotosRemoveTagParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of photos with tags that have not been viewed.
     */
    getNewTags(params: Params.PhotosGetNewTagsParams): Promise<Responses.PhotosGetNewTagsResponse>;
}

/**
 * The API friends group
 */
export interface APIFriends {
    /**
     * Returns a list of user IDs or detailed information about a user's friends.
     */
    get(params: Params.FriendsGetParams): Promise<Responses.FriendsGetResponse>;
    /**
     * Returns a list of user IDs of a user's friends who are online.
     */
    getOnline(params: Params.FriendsGetOnlineParams): Promise<Responses.FriendsGetOnlineResponse>;
    /**
     * Returns a list of user IDs of the mutual friends of two users.
     */
    getMutual(params: Params.FriendsGetMutualParams): Promise<Responses.FriendsGetMutualResponse>;
    /**
     * Returns a list of user IDs of the current user's recently added friends.
     */
    getRecent(params: Params.FriendsGetRecentParams): Promise<Responses.FriendsGetRecentResponse>;
    /**
     * Returns information about the current user's incoming and outgoing friend requests.
     */
    getRequests(params: Params.FriendsGetRequestsParams): Promise<Responses.FriendsGetRequestsResponse>;
    /**
     * Approves or creates a friend request.
     */
    add(params: Params.FriendsAddParams): Promise<Responses.FriendsAddResponse>;
    /**
     * Edits the friend lists of the selected user.
     */
    edit(params: Params.FriendsEditParams): Promise<Responses.OkResponse>;
    /**
     * Declines a friend request or deletes a user from the current user's friend list.
     */
    delete(params: Params.FriendsDeleteParams): Promise<Responses.FriendsDeleteResponse>;
    /**
     * Returns a list of the user's friend lists.
     */
    getLists(params: Params.FriendsGetListsParams): Promise<Responses.FriendsGetListsResponse>;
    /**
     * Creates a new friend list for the current user.
     */
    addList(params: Params.FriendsAddListParams): Promise<Responses.FriendsAddListResponse>;
    /**
     * Edits a friend list of the current user.
     */
    editList(params: Params.FriendsEditListParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a friend list of the current user.
     */
    deleteList(params: Params.FriendsDeleteListParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of IDs of the current user's friends who installed the application.
     */
    getAppUsers(params: Params.FriendsGetAppUsersParams): Promise<Responses.FriendsGetAppUsersResponse>;
    /**
     * Returns a list of the current user's friends whose phone numbers, validated or specified in a profile, are in a given list.
     */
    getByPhones(params: Params.FriendsGetByPhonesParams): Promise<Responses.FriendsGetByPhonesResponse>;
    /**
     * Marks all incoming friend requests as viewed.
     */
    deleteAllRequests(params: Params.FriendsDeleteAllRequestsParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of profiles of users whom the current user may know.
     */
    getSuggestions(params: Params.FriendsGetSuggestionsParams): Promise<Responses.FriendsGetSuggestionsResponse>;
    /**
     * Checks the current user's friendship status with other specified users.
     */
    areFriends(params: Params.FriendsAreFriendsParams): Promise<Responses.FriendsAreFriendsResponse>;
    /**
     * Returns a list of friends who can be called by the current user.
     */
    getAvailableForCall(params: Params.FriendsGetAvailableForCallParams): Promise<Responses.FriendsGetAvailableForCallResponse>;
    /**
     * Returns a list of friends matching the search criteria.
     */
    search(params: Params.FriendsSearchParams): Promise<Responses.FriendsSearchResponse>;
}

/**
 * The API widgets group
 */
export interface APIWidgets {
    /**
     * Gets a list of comments for the page added through the [vk.com/dev/Comments|Comments widget].
     */
    getComments(params: Params.WidgetsGetCommentsParams): Promise<Responses.WidgetsGetCommentsResponse>;
    /**
     * Gets a list of application/site pages where the [vk.com/dev/Comments|Comments widget] or [vk.com/dev/Like|Like widget] is installed.
     */
    getPages(params: Params.WidgetsGetPagesParams): Promise<Responses.WidgetsGetPagesResponse>;
}

/**
 * The API stories group
 */
export interface APIStories {
    /**
     * Allows to hide stories from chosen sources from current user's feed.
     */
    banOwner(params: Params.StoriesBanOwnerParams): Promise<Responses.OkResponse>;
    /**
     * Allows to delete story.
     */
    delete(params: Params.StoriesDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Returns stories available for current user.
     */
    get(params: Params.StoriesGetParams): Promise<Responses.StoriesGetResponse>;
    /**
     * Returns list of sources hidden from current user's feed.
     */
    getBanned(params: Params.StoriesGetBannedParams): Promise<Responses.StoriesGetBannedResponse>;
    /**
     * Returns story by its ID.
     */
    getById(params: Params.StoriesGetByIdParams): Promise<Responses.StoriesGetByIdResponse>;
    /**
     * Returns URL for uploading a story with photo.
     */
    getPhotoUploadServer(params: Params.StoriesGetPhotoUploadServerParams): Promise<Responses.StoriesGetPhotoUploadServerResponse>;
    /**
     * Returns replies to the story.
     */
    getReplies(params: Params.StoriesGetRepliesParams): Promise<Responses.StoriesGetRepliesResponse>;
    /**
     * Returns stories available for current user.
     */
    getStats(params: Params.StoriesGetStatsParams): Promise<Responses.StoriesGetStatsResponse>;
    /**
     * Allows to receive URL for uploading story with video.
     */
    getVideoUploadServer(params: Params.StoriesGetVideoUploadServerParams): Promise<Responses.StoriesGetVideoUploadServerResponse>;
    /**
     * Returns a list of story viewers.
     */
    getViewers(params: Params.StoriesGetViewersParams): Promise<Responses.StoriesGetViewersResponse>;
    /**
     * Hides all replies in the last 24 hours from the user to current user's stories.
     */
    hideAllReplies(params: Params.StoriesHideAllRepliesParams): Promise<Responses.OkResponse>;
    /**
     * Hides the reply to the current user's story.
     */
    hideReply(params: Params.StoriesHideReplyParams): Promise<Responses.OkResponse>;
    /**
     * Allows to show stories from hidden sources in current user's feed.
     */
    unbanOwner(params: Params.StoriesUnbanOwnerParams): Promise<Responses.OkResponse>;
}

/**
 * The API secure group
 */
export interface APISecure {
    /**
     * Returns payment balance of the application in hundredth of a vote.
     */
    getAppBalance(params: Params.SecureGetAppBalanceParams): Promise<Responses.SecureGetAppBalanceResponse>;
    /**
     * Shows history of votes transaction between users and the application.
     */
    getTransactionsHistory(params: Params.SecureGetTransactionsHistoryParams): Promise<Responses.SecureGetTransactionsHistoryResponse>;
    /**
     * Shows a list of SMS notifications sent by the application using [vk.com/dev/secure.sendSMSNotification|secure.sendSMSNotification] method.
     */
    getSMSHistory(params: Params.SecureGetSMSHistoryParams): Promise<Responses.SecureGetSmsHistoryResponse>;
    /**
     * Sends 'SMS' notification to a user's mobile device.
     */
    sendSMSNotification(params: Params.SecureSendSMSNotificationParams): Promise<Responses.OkResponse>;
    /**
     * Sends notification to the user.
     */
    sendNotification(params: Params.SecureSendNotificationParams): Promise<Responses.SecureSendNotificationResponse>;
    /**
     * Sets a counter which is shown to the user in bold in the left menu.
     */
    setCounter(params: Params.SecureSetCounterParams): Promise<Responses.OkResponse>;
    /**
     * Sets user game level in the application which can be seen by his/her friends.
     */
    setUserLevel(params: Params.SecureSetUserLevelParams): Promise<Responses.OkResponse>;
    /**
     * Returns one of the previously set game levels of one or more users in the application.
     */
    getUserLevel(params: Params.SecureGetUserLevelParams): Promise<Responses.SecureGetUserLevelResponse>;
    /**
     * Adds user activity information to an application
     */
    addAppEvent(params: Params.SecureAddAppEventParams): Promise<Responses.OkResponse>;
    /**
     * Checks the user authentication in 'IFrame' and 'Flash' apps using the 'access_token' parameter.
     */
    checkToken(params: Params.SecureCheckTokenParams): Promise<Responses.SecureCheckTokenResponse>;
}

/**
 * The API streaming group
 */
export interface APIStreaming {
    /**
     * Allows to receive data for the connection to Streaming API.
     */
    getServerUrl(params: Params.StreamingGetServerUrlParams): Promise<Responses.StreamingGetServerUrlResponse>;
}

/**
 * The API storage group
 */
export interface APIStorage {
    /**
     * Returns a value of variable with the name set by key parameter.
     */
    get(params: Params.StorageGetParams): Promise<Responses.StorageGetResponse>;
    /**
     * Saves a value of variable with the name set by 'key' parameter.
     */
    set(params: Params.StorageSetParams): Promise<Responses.OkResponse>;
    /**
     * Returns the names of all variables.
     */
    getKeys(params: Params.StorageGetKeysParams): Promise<Responses.StorageGetKeysResponse>;
}

/**
 * The API orders group
 */
export interface APIOrders {
    /**
     * Returns a list of orders.
     */
    get(params: Params.OrdersGetParams): Promise<Responses.OrdersGetResponse>;
    /**
     * Returns information about orders by their IDs.
     */
    getById(params: Params.OrdersGetByIdParams): Promise<Responses.OrdersGetByIdResponse>;
    /**
     * Changes order status.
     */
    changeState(params: Params.OrdersChangeStateParams): Promise<Responses.OrdersChangeStateResponse>;
    getAmount(params: Params.OrdersGetAmountParams): Promise<Responses.OrdersGetAmountResponse>;
}

/**
 * The API status group
 */
export interface APIStatus {
    /**
     * Returns data required to show the status of a user or community.
     */
    get(params: Params.StatusGetParams): Promise<Responses.StatusGetResponse>;
    /**
     * Sets a new status for the current user.
     */
    set(params: Params.StatusSetParams): Promise<Responses.OkResponse>;
}

/**
 * The API leads group
 */
export interface APILeads {
    /**
     * Completes the lead started by user.
     */
    complete(params: Params.LeadsCompleteParams): Promise<Responses.LeadsCompleteResponse>;
    /**
     * Creates new session for the user passing the offer.
     */
    start(params: Params.LeadsStartParams): Promise<Responses.LeadsStartResponse>;
    /**
     * Returns lead stats data.
     */
    getStats(params: Params.LeadsGetStatsParams): Promise<Responses.LeadsGetStatsResponse>;
    /**
     * Returns a list of last user actions for the offer.
     */
    getUsers(params: Params.LeadsGetUsersParams): Promise<Responses.LeadsGetUsersResponse>;
    /**
     * Checks if the user can start the lead.
     */
    checkUser(params: Params.LeadsCheckUserParams): Promise<Responses.LeadsCheckUserResponse>;
    /**
     * Counts the metric event.
     */
    metricHit(params: Params.LeadsMetricHitParams): Promise<Responses.LeadsMetricHitResponse>;
}

/**
 * The API pages group
 */
export interface APIPages {
    /**
     * Returns information about a wiki page.
     */
    get(params: Params.PagesGetParams): Promise<Responses.PagesGetResponse>;
    /**
     * Saves the text of a wiki page.
     */
    save(params: Params.PagesSaveParams): Promise<Responses.PagesSaveResponse>;
    /**
     * Saves modified read and edit access settings for a wiki page.
     */
    saveAccess(params: Params.PagesSaveAccessParams): Promise<Responses.PagesSaveAccessResponse>;
    /**
     * Returns a list of all previous versions of a wiki page.
     */
    getHistory(params: Params.PagesGetHistoryParams): Promise<Responses.PagesGetHistoryResponse>;
    /**
     * Returns a list of wiki pages in a group.
     */
    getTitles(params: Params.PagesGetTitlesParams): Promise<Responses.PagesGetTitlesResponse>;
    /**
     * Returns the text of one of the previous versions of a wiki page.
     */
    getVersion(params: Params.PagesGetVersionParams): Promise<Responses.PagesGetVersionResponse>;
    /**
     * Returns HTML representation of the wiki markup.
     */
    parseWiki(params: Params.PagesParseWikiParams): Promise<Responses.PagesParseWikiResponse>;
    /**
     * Allows to clear the cache of particular 'external' pages which may be attached to VK posts.
     */
    clearCache(params: Params.PagesClearCacheParams): Promise<Responses.OkResponse>;
}

/**
 * The API groups group
 */
export interface APIGroups {
    /**
     * Returns information specifying whether a user is a member of a community.
     */
    isMember(params: Params.GroupsIsMemberParams): Promise<Responses.GroupsIsMemberResponse>;
    /**
     * Returns information about communities by their IDs.
     */
    getById(params: Params.GroupsGetByIdParams): Promise<Responses.GroupsGetByIdResponse>;
    /**
     * Returns a list of the communities to which a user belongs.
     */
    get(params: Params.GroupsGetParams): Promise<Responses.GroupsGetResponse>;
    /**
     * Returns a list of community members.
     */
    getMembers(params: Params.GroupsGetMembersParams): Promise<Responses.GroupsGetMembersResponse>;
    /**
     * With this method you can join the group or public page, and also confirm your participation in an event.
     */
    join(params: Params.GroupsJoinParams): Promise<Responses.OkResponse>;
    /**
     * With this method you can leave a group, public page, or event.
     */
    leave(params: Params.GroupsLeaveParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of communities matching the search criteria.
     */
    search(params: Params.GroupsSearchParams): Promise<Responses.GroupsSearchResponse>;
    /**
     * Returns communities list for a catalog category.
     */
    getCatalog(params: Params.GroupsGetCatalogParams): Promise<Responses.GroupsGetCatalogResponse>;
    /**
     * Returns categories list for communities catalog
     */
    getCatalogInfo(params: Params.GroupsGetCatalogInfoParams): Promise<Responses.GroupsGetCatalogInfoResponse>;
    /**
     * Returns a list of invitations to join communities and events.
     */
    getInvites(params: Params.GroupsGetInvitesParams): Promise<Responses.GroupsGetInvitesResponse>;
    /**
     * Returns invited users list of a community
     */
    getInvitedUsers(params: Params.GroupsGetInvitedUsersParams): Promise<Responses.GroupsGetInvitedUsersResponse>;
    /**
     * Adds a user to a community blacklist.
     */
    banUser(params: Params.GroupsBanUserParams): Promise<Responses.OkResponse>;
    /**
     * Removes a user from a community blacklist.
     */
    unbanUser(params: Params.GroupsUnbanUserParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of users on a community blacklist.
     */
    getBanned(params: Params.GroupsGetBannedParams): Promise<Responses.GroupsGetBannedResponse>;
    /**
     * Creates a new community.
     */
    create(params: Params.GroupsCreateParams): Promise<Responses.GroupsCreateResponse>;
    /**
     * Edits a community.
     */
    edit(params: Params.GroupsEditParams): Promise<Responses.OkResponse>;
    /**
     * Edits the place in community.
     */
    editPlace(params: Params.GroupsEditPlaceParams): Promise<Responses.GroupsEditPlaceResponse>;
    /**
     * Returns community settings.
     */
    getSettings(params: Params.GroupsGetSettingsParams): Promise<Responses.GroupsGetSettingsResponse>;
    /**
     * Returns a list of requests to the community.
     */
    getRequests(params: Params.GroupsGetRequestsParams): Promise<Responses.GroupsGetRequestsResponse>;
    /**
     * Allows to add, remove or edit the community manager.
     */
    editManager(params: Params.GroupsEditManagerParams): Promise<Responses.OkResponse>;
    /**
     * Allows to invite friends to the community.
     */
    invite(params: Params.GroupsInviteParams): Promise<Responses.OkResponse>;
    /**
     * Allows to add a link to the community.
     */
    addLink(params: Params.GroupsAddLinkParams): Promise<Responses.OkResponse>;
    /**
     * Allows to delete a link from the community.
     */
    deleteLink(params: Params.GroupsDeleteLinkParams): Promise<Responses.OkResponse>;
    /**
     * Allows to edit a link in the community.
     */
    editLink(params: Params.GroupsEditLinkParams): Promise<Responses.OkResponse>;
    /**
     * Allows to reorder links in the community.
     */
    reorderLink(params: Params.GroupsReorderLinkParams): Promise<Responses.OkResponse>;
    /**
     * Removes a user from the community.
     */
    removeUser(params: Params.GroupsRemoveUserParams): Promise<Responses.OkResponse>;
    /**
     * Allows to approve join request to the community.
     */
    approveRequest(params: Params.GroupsApproveRequestParams): Promise<Responses.OkResponse>;
    /**
     * Returns Callback API confirmation code for the community.
     */
    getCallbackConfirmationCode(params: Params.GroupsGetCallbackConfirmationCodeParams): Promise<Responses.GroupsGetCallbackConfirmationCodeResponse>;
    /**
     * Returns [vk.com/dev/callback_api|Callback API] notifications settings.
     */
    getCallbackSettings(params: Params.GroupsGetCallbackSettingsParams): Promise<Responses.GroupsGetCallbackSettingsResponse>;
    /**
     * Allow to set notifications settings for group.
     */
    setCallbackSettings(params: Params.GroupsSetCallbackSettingsParams): Promise<Responses.OkResponse>;
    /**
     * Returns the data needed to query a Long Poll server for events
     */
    getLongPollServer(params: Params.GroupsGetLongPollServerParams): Promise<Responses.GroupsGetLongPollServerResponse>;
    /**
     * Returns Long Poll notification settings
     */
    getLongPollSettings(params: Params.GroupsGetLongPollSettingsParams): Promise<Responses.GroupsGetLongPollSettingsResponse>;
    /**
     * Sets Long Poll notification settings
     */
    setLongPollSettings(params: Params.GroupsSetLongPollSettingsParams): Promise<Responses.OkResponse>;
}

/**
 * The API board group
 */
export interface APIBoard {
    /**
     * Returns a list of topics on a community's discussion board.
     */
    getTopics(params: Params.BoardGetTopicsParams): Promise<Responses.BoardGetTopicsResponse>;
    /**
     * Returns a list of comments on a topic on a community's discussion board.
     */
    getComments(params: Params.BoardGetCommentsParams): Promise<Responses.BoardGetCommentsResponse>;
    /**
     * Creates a new topic on a community's discussion board.
     */
    addTopic(params: Params.BoardAddTopicParams): Promise<Responses.BoardAddTopicResponse>;
    /**
     * Adds a comment on a topic on a community's discussion board.
     */
    createComment(params: Params.BoardCreateCommentParams): Promise<Responses.BoardCreateCommentResponse>;
    /**
     * Deletes a topic from a community's discussion board.
     */
    deleteTopic(params: Params.BoardDeleteTopicParams): Promise<Responses.OkResponse>;
    /**
     * Edits the title of a topic on a community's discussion board.
     */
    editTopic(params: Params.BoardEditTopicParams): Promise<Responses.OkResponse>;
    /**
     * Edits a comment on a topic on a community's discussion board.
     */
    editComment(params: Params.BoardEditCommentParams): Promise<Responses.OkResponse>;
    /**
     * Restores a comment deleted from a topic on a community's discussion board.
     */
    restoreComment(params: Params.BoardRestoreCommentParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a comment on a topic on a community's discussion board.
     */
    deleteComment(params: Params.BoardDeleteCommentParams): Promise<Responses.OkResponse>;
    /**
     * Re-opens a previously closed topic on a community's discussion board.
     */
    openTopic(params: Params.BoardOpenTopicParams): Promise<Responses.OkResponse>;
    /**
     * Closes a topic on a community's discussion board so that comments cannot be posted.
     */
    closeTopic(params: Params.BoardCloseTopicParams): Promise<Responses.OkResponse>;
    /**
     * Pins a topic (fixes its place) to the top of a community's discussion board.
     */
    fixTopic(params: Params.BoardFixTopicParams): Promise<Responses.OkResponse>;
    /**
     * Unpins a pinned topic from the top of a community's discussion board.
     */
    unfixTopic(params: Params.BoardUnfixTopicParams): Promise<Responses.OkResponse>;
}

/**
 * The API video group
 */
export interface APIVideo {
    /**
     * Returns detailed information about videos.
     */
    get(params: Params.VideoGetParams): Promise<Responses.VideoGetResponse>;
    /**
     * Edits information about a video on a user or community page.
     */
    edit(params: Params.VideoEditParams): Promise<Responses.OkResponse>;
    /**
     * Adds a video to a user or community page.
     */
    add(params: Params.VideoAddParams): Promise<Responses.OkResponse>;
    /**
     * Returns a server address (required for upload) and video data.
     */
    save(params: Params.VideoSaveParams): Promise<Responses.VideoSaveResponse>;
    /**
     * Deletes a video from a user or community page.
     */
    delete(params: Params.VideoDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Restores a previously deleted video.
     */
    restore(params: Params.VideoRestoreParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of videos under the set search criterion.
     */
    search(params: Params.VideoSearchParams): Promise<Responses.VideoSearchResponse>;
    /**
     * Returns list of videos in which the user is tagged.
     */
    getUserVideos(params: Params.VideoGetUserVideosParams): Promise<Responses.VideoGetUserVideosResponse>;
    /**
     * Returns a list of video albums owned by a user or community.
     */
    getAlbums(params: Params.VideoGetAlbumsParams): Promise<Responses.VideoGetAlbumsResponse>;
    /**
     * Returns video album info
     */
    getAlbumById(params: Params.VideoGetAlbumByIdParams): Promise<Responses.VideoGetAlbumByIdResponse>;
    /**
     * Creates an empty album for videos.
     */
    addAlbum(params: Params.VideoAddAlbumParams): Promise<Responses.VideoAddAlbumResponse>;
    /**
     * Edits the title of a video album.
     */
    editAlbum(params: Params.VideoEditAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a video album.
     */
    deleteAlbum(params: Params.VideoDeleteAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Reorders the album in the list of user video albums.
     */
    reorderAlbums(params: Params.VideoReorderAlbumsParams): Promise<Responses.OkResponse>;
    /**
     * Reorders the video in the video album.
     */
    reorderVideos(params: Params.VideoReorderVideosParams): Promise<Responses.OkResponse>;
    addToAlbum(params: Params.VideoAddToAlbumParams): Promise<Responses.OkResponse>;
    removeFromAlbum(params: Params.VideoRemoveFromAlbumParams): Promise<Responses.OkResponse>;
    getAlbumsByVideo(params: Params.VideoGetAlbumsByVideoParams): Promise<Responses.VideoGetAlbumsByVideoResponse>;
    /**
     * Returns a list of comments on a video.
     */
    getComments(params: Params.VideoGetCommentsParams): Promise<Responses.VideoGetCommentsResponse>;
    /**
     * Adds a new comment on a video.
     */
    createComment(params: Params.VideoCreateCommentParams): Promise<Responses.VideoCreateCommentResponse>;
    /**
     * Deletes a comment on a video.
     */
    deleteComment(params: Params.VideoDeleteCommentParams): Promise<Responses.OkResponse>;
    /**
     * Restores a previously deleted comment on a video.
     */
    restoreComment(params: Params.VideoRestoreCommentParams): Promise<Responses.VideoRestoreCommentResponse>;
    /**
     * Edits the text of a comment on a video.
     */
    editComment(params: Params.VideoEditCommentParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of tags on a video.
     */
    getTags(params: Params.VideoGetTagsParams): Promise<Responses.VideoGetTagsResponse>;
    /**
     * Adds a tag on a video.
     */
    putTag(params: Params.VideoPutTagParams): Promise<Responses.VideoPutTagResponse>;
    /**
     * Removes a tag from a video.
     */
    removeTag(params: Params.VideoRemoveTagParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of videos with tags that have not been viewed.
     */
    getNewTags(params: Params.VideoGetNewTagsParams): Promise<Responses.VideoGetNewTagsResponse>;
    /**
     * Reports (submits a complaint about) a video.
     */
    report(params: Params.VideoReportParams): Promise<Responses.OkResponse>;
    /**
     * Reports (submits a complaint about) a comment on a video.
     */
    reportComment(params: Params.VideoReportCommentParams): Promise<Responses.OkResponse>;
    /**
     * Returns video catalog
     */
    getCatalog(params: Params.VideoGetCatalogParams): Promise<Responses.VideoGetCatalogResponse>;
    /**
     * Returns a separate catalog section
     */
    getCatalogSection(params: Params.VideoGetCatalogSectionParams): Promise<Responses.VideoGetCatalogSectionResponse>;
    /**
     * Hides a video catalog section from a user.
     */
    hideCatalogSection(params: Params.VideoHideCatalogSectionParams): Promise<Responses.OkResponse>;
}

/**
 * The API notes group
 */
export interface APINotes {
    /**
     * Returns a list of notes created by a user.
     */
    get(params: Params.NotesGetParams): Promise<Responses.NotesGetResponse>;
    /**
     * Returns a note by its ID.
     */
    getById(params: Params.NotesGetByIdParams): Promise<Responses.NotesGetByIdResponse>;
    /**
     * Creates a new note for the current user.
     */
    add(params: Params.NotesAddParams): Promise<Responses.NotesAddResponse>;
    /**
     * Edits a note of the current user.
     */
    edit(params: Params.NotesEditParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a note of the current user.
     */
    delete(params: Params.NotesDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of comments on a note.
     */
    getComments(params: Params.NotesGetCommentsParams): Promise<Responses.NotesGetCommentsResponse>;
    /**
     * Adds a new comment on a note.
     */
    createComment(params: Params.NotesCreateCommentParams): Promise<Responses.NotesCreateCommentResponse>;
    /**
     * Edits a comment on a note.
     */
    editComment(params: Params.NotesEditCommentParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a comment on a note.
     */
    deleteComment(params: Params.NotesDeleteCommentParams): Promise<Responses.OkResponse>;
    /**
     * Restores a deleted comment on a note.
     */
    restoreComment(params: Params.NotesRestoreCommentParams): Promise<Responses.OkResponse>;
}

/**
 * The API places group
 */
export interface APIPlaces {
    /**
     * Adds a new location to the location database.
     */
    add(params: Params.PlacesAddParams): Promise<Responses.PlacesAddResponse>;
    /**
     * Returns information about locations by their IDs.
     */
    getById(params: Params.PlacesGetByIdParams): Promise<Responses.PlacesGetByIdResponse>;
    /**
     * Returns a list of locations that match the search criteria.
     */
    search(params: Params.PlacesSearchParams): Promise<Responses.PlacesSearchResponse>;
    /**
     * Checks a user in at the specified location.
     */
    checkin(params: Params.PlacesCheckinParams): Promise<Responses.PlacesCheckinResponse>;
    /**
     * Returns a list of user check-ins at locations according to the set parameters.
     */
    getCheckins(params: Params.PlacesGetCheckinsParams): Promise<Responses.PlacesGetCheckinsResponse>;
    /**
     * Returns a list of all types of locations.
     */
    getTypes(params: Params.PlacesGetTypesParams): Promise<Responses.PlacesGetTypesResponse>;
}

/**
 * The API account group
 */
export interface APIAccount {
    /**
     * Returns non-null values of user counters.
     */
    getCounters(params: Params.AccountGetCountersParams): Promise<Responses.AccountGetCountersResponse>;
    /**
     * Sets an application screen name (up to 17 characters), that is shown to the user in the left menu.
     */
    setNameInMenu(params: Params.AccountSetNameInMenuParams): Promise<Responses.OkResponse>;
    /**
     * Marks the current user as online for 15 minutes.
     */
    setOnline(params: Params.AccountSetOnlineParams): Promise<Responses.OkResponse>;
    /**
     * Marks a current user as offline.
     */
    setOffline(params: Params.AccountSetOfflineParams): Promise<Responses.OkResponse>;
    /**
     * Allows to search the VK users using phone numbers, e-mail addresses and user IDs on other services.
     */
    lookupContacts(params: Params.AccountLookupContactsParams): Promise<Responses.AccountLookupContactsResponse>;
    /**
     * Subscribes an iOS/Android/Windows Phone-based device to receive push notifications
     */
    registerDevice(params: Params.AccountRegisterDeviceParams): Promise<Responses.OkResponse>;
    /**
     * Unsubscribes a device from push notifications.
     */
    unregisterDevice(params: Params.AccountUnregisterDeviceParams): Promise<Responses.OkResponse>;
    /**
     * Mutes push notifications for the set period of time.
     */
    setSilenceMode(params: Params.AccountSetSilenceModeParams): Promise<Responses.OkResponse>;
    /**
     * Gets settings of push notifications.
     */
    getPushSettings(params: Params.AccountGetPushSettingsParams): Promise<Responses.AccountGetPushSettingsResponse>;
    /**
     * Change push settings.
     */
    setPushSettings(params: Params.AccountSetPushSettingsParams): Promise<Responses.OkResponse>;
    /**
     * Gets settings of the user in this application.
     */
    getAppPermissions(params: Params.AccountGetAppPermissionsParams): Promise<Responses.AccountGetAppPermissionsResponse>;
    /**
     * Returns a list of active ads (offers) which executed by the user will bring him/her respective number of votes to his balance in the application.
     */
    getActiveOffers(params: Params.AccountGetActiveOffersParams): Promise<Responses.AccountGetActiveOffersResponse>;
    /**
     * Adds user to the banlist.
     */
    banUser(params: Params.AccountBanUserParams): Promise<Responses.OkResponse>;
    /**
     * Deletes user from the blacklist.
     */
    unbanUser(params: Params.AccountUnbanUserParams): Promise<Responses.OkResponse>;
    /**
     * Returns a user's blacklist.
     */
    getBanned(params: Params.AccountGetBannedParams): Promise<Responses.AccountGetBannedResponse>;
    /**
     * Returns current account info.
     */
    getInfo(params: Params.AccountGetInfoParams): Promise<Responses.AccountGetInfoResponse>;
    /**
     * Allows to edit the current account info.
     */
    setInfo(params: Params.AccountSetInfoParams): Promise<Responses.OkResponse>;
    /**
     * Changes a user password after access is successfully restored with the [vk.com/dev/auth.restore|auth.restore] method.
     */
    changePassword(params: Params.AccountChangePasswordParams): Promise<Responses.AccountChangePasswordResponse>;
    /**
     * Returns the current account info.
     */
    getProfileInfo(params: Params.AccountGetProfileInfoParams): Promise<Responses.AccountGetProfileInfoResponse>;
    /**
     * Edits current profile info.
     */
    saveProfileInfo(params: Params.AccountSaveProfileInfoParams): Promise<Responses.AccountSaveProfileInfoResponse>;
}

/**
 * The API messages group
 */
export interface APIMessages {
    /**
     * Returns a list of the current user's conversations.
     */
    getConversations(params: Params.MessagesGetConversationsParams): Promise<Responses.MessagesGetConversationsResponse>;
    /**
     * Returns conversations by their IDs
     */
    getConversationsById(params: Params.MessagesGetConversationsByIdParams): Promise<Responses.MessagesGetConversationsByIdResponse>;
    /**
     * Returns messages by their IDs.
     */
    getById(params: Params.MessagesGetByIdParams): Promise<Responses.MessagesGetByIdResponse>;
    /**
     * Returns messages by their IDs within the conversation.
     */
    getByConversationMessageId(params: Params.MessagesGetByConversationMessageIdParams): Promise<Responses.MessagesGetByConversationMessageIdResponse>;
    /**
     * Returns a list of the current user's private messages that match search criteria.
     */
    search(params: Params.MessagesSearchParams): Promise<Responses.MessagesSearchResponse>;
    /**
     * Returns message history for the specified user or group chat.
     */
    getHistory(params: Params.MessagesGetHistoryParams): Promise<Responses.MessagesGetHistoryResponse>;
    /**
     * Returns media files from the dialog or group chat.
     */
    getHistoryAttachments(params: Params.MessagesGetHistoryAttachmentsParams): Promise<Responses.MessagesGetHistoryAttachmentsResponse>;
    /**
     * Sends a message.
     */
    send(params: Params.MessagesSendParams): Promise<Responses.MessagesSendResponse>;
    /**
     * Edits the message.
     */
    edit(params: Params.MessagesEditParams): Promise<Responses.MessagesEditResponse>;
    /**
     * Deletes one or more messages.
     */
    delete(params: Params.MessagesDeleteParams): Promise<Responses.MessagesDeleteResponse>;
    /**
     * Deletes all private messages in a conversation.
     */
    deleteConversation(params: Params.MessagesDeleteConversationParams): Promise<Responses.OkResponse>;
    /**
     * Restores a deleted message.
     */
    restore(params: Params.MessagesRestoreParams): Promise<Responses.OkResponse>;
    /**
     * Marks messages as read.
     */
    markAsRead(params: Params.MessagesMarkAsReadParams): Promise<Responses.OkResponse>;
    /**
     * Marks and unmarks messages as important (starred).
     */
    markAsImportant(params: Params.MessagesMarkAsImportantParams): Promise<Responses.MessagesMarkAsImportantResponse>;
    /**
     * Marks and unmarks conversations as important.
     */
    markAsImportantConversation(params: Params.MessagesMarkAsImportantConversationParams): Promise<Responses.OkResponse>;
    /**
     * Marks and unmarks conversations as unanswered.
     */
    markAsAnsweredConversation(params: Params.MessagesMarkAsAnsweredConversationParams): Promise<Responses.OkResponse>;
    /**
     * Returns data required for connection to a Long Poll server.
     */
    getLongPollServer(params: Params.MessagesGetLongPollServerParams): Promise<Responses.MessagesGetLongPollServerResponse>;
    /**
     * Returns updates in user's private messages.
     */
    getLongPollHistory(params: Params.MessagesGetLongPollHistoryParams): Promise<Responses.MessagesGetLongPollHistoryResponse>;
    /**
     * Creates a chat with several participants.
     */
    createChat(params: Params.MessagesCreateChatParams): Promise<Responses.MessagesCreateChatResponse>;
    /**
     * Edits the title of a chat.
     */
    editChat(params: Params.MessagesEditChatParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of IDs of users participating in a chat.
     */
    getConversationMembers(params: Params.MessagesGetConversationMembersParams): Promise<Responses.MessagesGetConversationMembersResponse>;
    /**
     * Changes the status of a user as typing in a conversation.
     */
    setActivity(params: Params.MessagesSetActivityParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of the current user's conversations that match search criteria.
     */
    searchConversations(params: Params.MessagesSearchConversationsParams): Promise<Responses.MessagesSearchConversationsResponse>;
    /**
     * Adds a new user to a chat.
     */
    addChatUser(params: Params.MessagesAddChatUserParams): Promise<Responses.OkResponse>;
    /**
     * Allows the current user to leave a chat or, if the current user started the chat, allows the user to remove another user from the chat.
     */
    removeChatUser(params: Params.MessagesRemoveChatUserParams): Promise<Responses.OkResponse>;
    /**
     * Returns a user's current status and date of last activity.
     */
    getLastActivity(params: Params.MessagesGetLastActivityParams): Promise<Responses.MessagesGetLastActivityResponse>;
    /**
     * Sets a previously-uploaded picture as the cover picture of a chat.
     */
    setChatPhoto(params: Params.MessagesSetChatPhotoParams): Promise<Responses.MessagesSetChatPhotoResponse>;
    /**
     * Deletes a chat's cover picture.
     */
    deleteChatPhoto(params: Params.MessagesDeleteChatPhotoParams): Promise<Responses.MessagesDeleteChatPhotoResponse>;
    /**
     * Denies sending message from community to the current user.
     */
    denyMessagesFromGroup(params: Params.MessagesDenyMessagesFromGroupParams): Promise<Responses.OkResponse>;
    /**
     * Allows sending messages from community to the current user.
     */
    allowMessagesFromGroup(params: Params.MessagesAllowMessagesFromGroupParams): Promise<Responses.OkResponse>;
    /**
     * Returns information whether sending messages from the community to current user is allowed.
     */
    isMessagesFromGroupAllowed(params: Params.MessagesIsMessagesFromGroupAllowedParams): Promise<Responses.MessagesIsMessagesFromGroupAllowedResponse>;
}

/**
 * The API newsfeed group
 */
export interface APINewsfeed {
    /**
     * Returns data required to show newsfeed for the current user.
     */
    get(params: Params.NewsfeedGetParams): Promise<Responses.NewsfeedGetResponse>;
    /**
     * , Returns a list of newsfeeds recommended to the current user.
     */
    getRecommended(params: Params.NewsfeedGetRecommendedParams): Promise<Responses.NewsfeedGetRecommendedResponse>;
    /**
     * Returns a list of comments in the current user's newsfeed.
     */
    getComments(params: Params.NewsfeedGetCommentsParams): Promise<Responses.NewsfeedGetCommentsResponse>;
    /**
     * Returns a list of posts on user walls in which the current user is mentioned.
     */
    getMentions(params: Params.NewsfeedGetMentionsParams): Promise<Responses.NewsfeedGetMentionsResponse>;
    /**
     * Returns a list of users and communities banned from the current user's newsfeed.
     */
    getBanned(params: Params.NewsfeedGetBannedParams): Promise<Responses.NewsfeedGetBannedResponse>;
    /**
     * Prevents news from specified users and communities from appearing in the current user's newsfeed.
     */
    addBan(params: Params.NewsfeedAddBanParams): Promise<Responses.OkResponse>;
    /**
     * Allows news from previously banned users and communities to be shown in the current user's newsfeed.
     */
    deleteBan(params: Params.NewsfeedDeleteBanParams): Promise<Responses.OkResponse>;
    /**
     * Hides an item from the newsfeed.
     */
    ignoreItem(params: Params.NewsfeedIgnoreItemParams): Promise<Responses.OkResponse>;
    /**
     * Returns a hidden item to the newsfeed.
     */
    unignoreItem(params: Params.NewsfeedUnignoreItemParams): Promise<Responses.OkResponse>;
    /**
     * Returns search results by statuses.
     */
    search(params: Params.NewsfeedSearchParams): Promise<Responses.NewsfeedSearchResponse>;
    /**
     * Returns a list of newsfeeds followed by the current user.
     */
    getLists(params: Params.NewsfeedGetListsParams): Promise<Responses.NewsfeedGetListsResponse>;
    /**
     * Creates and edits user newsfeed lists
     */
    saveList(params: Params.NewsfeedSaveListParams): Promise<Responses.NewsfeedSaveListResponse>;
    deleteList(params: Params.NewsfeedDeleteListParams): Promise<Responses.OkResponse>;
    /**
     * Unsubscribes the current user from specified newsfeeds.
     */
    unsubscribe(params: Params.NewsfeedUnsubscribeParams): Promise<Responses.OkResponse>;
    /**
     * Returns communities and users that current user is suggested to follow.
     */
    getSuggestedSources(params: Params.NewsfeedGetSuggestedSourcesParams): Promise<Responses.NewsfeedGetSuggestedSourcesResponse>;
}

/**
 * The API likes group
 */
export interface APILikes {
    /**
     * Returns a list of IDs of users who added the specified object to their 'Likes' list.
     */
    getList(params: Params.LikesGetListParams): Promise<Responses.LikesGetListResponse>;
    /**
     * Adds the specified object to the 'Likes' list of the current user.
     */
    add(params: Params.LikesAddParams): Promise<Responses.LikesAddResponse>;
    /**
     * Deletes the specified object from the 'Likes' list of the current user.
     */
    delete(params: Params.LikesDeleteParams): Promise<Responses.LikesDeleteResponse>;
    /**
     * Checks for the object in the 'Likes' list of the specified user.
     */
    isLiked(params: Params.LikesIsLikedParams): Promise<Responses.LikesIsLikedResponse>;
}

/**
 * The API polls group
 */
export interface APIPolls {
    /**
     * Returns detailed information about a poll by its ID.
     */
    getById(params: Params.PollsGetByIdParams): Promise<Responses.PollsGetByIdResponse>;
    /**
     * Adds the current user's vote to the selected answer in the poll.
     */
    addVote(params: Params.PollsAddVoteParams): Promise<Responses.PollsAddVoteResponse>;
    /**
     * Deletes the current user's vote from the selected answer in the poll.
     */
    deleteVote(params: Params.PollsDeleteVoteParams): Promise<Responses.PollsDeleteVoteResponse>;
    /**
     * Returns a list of IDs of users who selected specific answers in the poll.
     */
    getVoters(params: Params.PollsGetVotersParams): Promise<Responses.PollsGetVotersResponse>;
    /**
     * Creates polls that can be attached to the users' or communities' posts.
     */
    create(params: Params.PollsCreateParams): Promise<Responses.PollsCreateResponse>;
    /**
     * Edits created polls
     */
    edit(params: Params.PollsEditParams): Promise<Responses.OkResponse>;
}

/**
 * The API docs group
 */
export interface APIDocs {
    /**
     * Returns detailed information about user or community documents.
     */
    get(params: Params.DocsGetParams): Promise<Responses.DocsGetResponse>;
    /**
     * Returns information about documents by their IDs.
     */
    getById(params: Params.DocsGetByIdParams): Promise<Responses.DocsGetByIdResponse>;
    /**
     * Returns the server address for document upload.
     */
    getUploadServer(params: Params.DocsGetUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
    /**
     * Returns the server address for document upload onto a user's or community's wall.
     */
    getWallUploadServer(params: Params.DocsGetWallUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
    /**
     * Returns the server address for document upload.
     */
    getMessagesUploadServer(params: Params.DocsGetMessagesUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
    /**
     * Saves a document after [vk.com/dev/upload_files_2|uploading it to a server].
     */
    save(params: Params.DocsSaveParams): Promise<Responses.DocsSaveResponse>;
    /**
     * Deletes a user or community document.
     */
    delete(params: Params.DocsDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Copies a document to a user's or community's document list.
     */
    add(params: Params.DocsAddParams): Promise<Responses.DocsAddResponse>;
    /**
     * Returns documents types available for current user.
     */
    getTypes(params: Params.DocsGetTypesParams): Promise<Responses.DocsGetTypesResponse>;
    /**
     * Returns a list of documents matching the search criteria.
     */
    search(params: Params.DocsSearchParams): Promise<Responses.DocsSearchResponse>;
    /**
     * Edits a document.
     */
    edit(params: Params.DocsEditParams): Promise<Responses.OkResponse>;
}

/**
 * The API fave group
 */
export interface APIFave {
    /**
     * Returns a list of users whom the current user has bookmarked.
     */
    getUsers(params: Params.FaveGetUsersParams): Promise<Responses.FaveGetUsersResponse>;
    /**
     * Returns a list of photos that the current user has liked.
     */
    getPhotos(params: Params.FaveGetPhotosParams): Promise<Responses.FaveGetPhotosResponse>;
    /**
     * Returns a list of wall posts that the current user has liked.
     */
    getPosts(params: Params.FaveGetPostsParams): Promise<Responses.FaveGetPostsResponse>;
    /**
     * Returns a list of videos that the current user has liked.
     */
    getVideos(params: Params.FaveGetVideosParams): Promise<Responses.FaveGetVideosResponse>;
    /**
     * Returns a list of links that the current user has bookmarked.
     */
    getLinks(params: Params.FaveGetLinksParams): Promise<Responses.FaveGetLinksResponse>;
    /**
     * Returns market items bookmarked by current user.
     */
    getMarketItems(params: Params.FaveGetMarketItemsParams): Promise<Responses.FaveGetMarketItemsResponse>;
    /**
     * Adds a profile to user faves.
     */
    addUser(params: Params.FaveAddUserParams): Promise<Responses.OkResponse>;
    /**
     * Removes a profile from user faves.
     */
    removeUser(params: Params.FaveRemoveUserParams): Promise<Responses.OkResponse>;
    /**
     * Adds a community to user faves.
     */
    addGroup(params: Params.FaveAddGroupParams): Promise<Responses.OkResponse>;
    /**
     * Removes a community from user faves.
     */
    removeGroup(params: Params.FaveRemoveGroupParams): Promise<Responses.OkResponse>;
    /**
     * Adds a link to user faves.
     */
    addLink(params: Params.FaveAddLinkParams): Promise<Responses.OkResponse>;
    /**
     * Removes link from the user's faves.
     */
    removeLink(params: Params.FaveRemoveLinkParams): Promise<Responses.OkResponse>;
}

/**
 * The API notifications group
 */
export interface APINotifications {
    /**
     * Returns a list of notifications about other users' feedback to the current user's wall posts.
     */
    get(params: Params.NotificationsGetParams): Promise<Responses.NotificationsGetResponse>;
    /**
     * Resets the counter of new notifications about other users' feedback to the current user's wall posts.
     */
    markAsViewed(params: Params.NotificationsMarkAsViewedParams): Promise<Responses.NotificationsMarkAsViewedResponse>;
}

/**
 * The API stats group
 */
export interface APIStats {
    /**
     * Returns statistics of a community or an application.
     */
    get(params: Params.StatsGetParams): Promise<Responses.StatsGetResponse>;
    trackVisitor(params: Params.StatsTrackVisitorParams): Promise<Responses.OkResponse>;
    /**
     * Returns stats for a wall post.
     */
    getPostReach(params: Params.StatsGetPostReachParams): Promise<Responses.StatsGetPostReachResponse>;
}

/**
 * The API search group
 */
export interface APISearch {
    /**
     * Allows the programmer to do a quick search for any substring.
     */
    getHints(params: Params.SearchGetHintsParams): Promise<Responses.SearchGetHintsResponse>;
}

/**
 * The API apps group
 */
export interface APIApps {
    /**
     * Returns a list of applications (apps) available to users in the App Catalog.
     */
    getCatalog(params: Params.AppsGetCatalogParams): Promise<Responses.AppsGetCatalogResponse>;
    /**
     * Returns applications data.
     */
    get(params: Params.AppsGetParams): Promise<Responses.AppsGetResponse>;
    /**
     * Sends a request to another user in an app that uses VK authorization.
     */
    sendRequest(params: Params.AppsSendRequestParams): Promise<Responses.AppsSendRequestResponse>;
    /**
     * Deletes all request notifications from the current app.
     */
    deleteAppRequests(params: Params.AppsDeleteAppRequestsParams): Promise<Responses.OkResponse>;
    /**
     * Creates friends list for requests and invites in current app.
     */
    getFriendsList(params: Params.AppsGetFriendsListParams): Promise<Responses.AppsGetFriendsListResponse>;
    /**
     * Returns players rating in the game.
     */
    getLeaderboard(params: Params.AppsGetLeaderboardParams): Promise<Responses.AppsGetLeaderboardResponse>;
    /**
     * Returns user score in app
     */
    getScore(params: Params.AppsGetScoreParams): Promise<Responses.AppsGetScoreResponse>;
}

/**
 * The API utils group
 */
export interface APIUtils {
    /**
     * Checks whether a link is blocked in VK.
     */
    checkLink(params: Params.UtilsCheckLinkParams): Promise<Responses.UtilsCheckLinkResponse>;
    /**
     * Deletes shortened link from user's list.
     */
    deleteFromLastShortened(params: Params.UtilsDeleteFromLastShortenedParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of user's shortened links.
     */
    getLastShortenedLinks(params: Params.UtilsGetLastShortenedLinksParams): Promise<Responses.UtilsGetLastShortenedLinksResponse>;
    /**
     * Returns stats data for shortened link.
     */
    getLinkStats(params: Params.UtilsGetLinkStatsParams): Promise<Responses.UtilsGetLinkStatsResponse>;
    /**
     * Allows to receive a link shortened via vk.cc.
     */
    getShortLink(params: Params.UtilsGetShortLinkParams): Promise<Responses.UtilsGetShortLinkResponse>;
    /**
     * Detects a type of object (e.g., user, community, application) and its ID by screen name.
     */
    resolveScreenName(params: Params.UtilsResolveScreenNameParams): Promise<Responses.UtilsResolveScreenNameResponse>;
    /**
     * Returns the current time of the VK server.
     */
    getServerTime(params: Params.UtilsGetServerTimeParams): Promise<Responses.UtilsGetServerTimeResponse>;
}

/**
 * The API database group
 */
export interface APIDatabase {
    /**
     * Returns a list of countries.
     */
    getCountries(params: Params.DatabaseGetCountriesParams): Promise<Responses.DatabaseGetCountriesResponse>;
    /**
     * Returns a list of regions.
     */
    getRegions(params: Params.DatabaseGetRegionsParams): Promise<Responses.DatabaseGetRegionsResponse>;
    /**
     * Returns information about streets by their IDs.
     */
    getStreetsById(params: Params.DatabaseGetStreetsByIdParams): Promise<Responses.DatabaseGetStreetsByIdResponse>;
    /**
     * Returns information about countries by their IDs.
     */
    getCountriesById(params: Params.DatabaseGetCountriesByIdParams): Promise<Responses.DatabaseGetCountriesByIdResponse>;
    /**
     * Returns a list of cities.
     */
    getCities(params: Params.DatabaseGetCitiesParams): Promise<Responses.DatabaseGetCitiesResponse>;
    /**
     * Returns information about cities by their IDs.
     */
    getCitiesById(params: Params.DatabaseGetCitiesByIdParams): Promise<Responses.DatabaseGetCitiesByIdResponse>;
    /**
     * Returns a list of higher education institutions.
     */
    getUniversities(params: Params.DatabaseGetUniversitiesParams): Promise<Responses.DatabaseGetUniversitiesResponse>;
    /**
     * Returns a list of schools.
     */
    getSchools(params: Params.DatabaseGetSchoolsParams): Promise<Responses.DatabaseGetSchoolsResponse>;
    /**
     * Returns a list of school classes specified for the country.
     */
    getSchoolClasses(params: Params.DatabaseGetSchoolClassesParams): Promise<Responses.DatabaseGetSchoolClassesResponse>;
    /**
     * Returns a list of faculties (i.e., university departments).
     */
    getFaculties(params: Params.DatabaseGetFacultiesParams): Promise<Responses.DatabaseGetFacultiesResponse>;
    /**
     * Returns list of chairs on a specified faculty.
     */
    getChairs(params: Params.DatabaseGetChairsParams): Promise<Responses.DatabaseGetChairsResponse>;
}

/**
 * The API gifts group
 */
export interface APIGifts {
    /**
     * Returns a list of user gifts.
     */
    get(params: Params.GiftsGetParams): Promise<Responses.GiftsGetResponse>;
}

/**
 * The API ads group
 */
export interface APIAds {
    /**
     * Returns a list of advertising accounts.
     */
    getAccounts(params: Params.AdsGetAccountsParams): Promise<Responses.AdsGetAccountsResponse>;
    /**
     * Returns a list of advertising agency's clients.
     */
    getClients(params: Params.AdsGetClientsParams): Promise<Responses.AdsGetClientsResponse>;
    /**
     * Creates clients of an advertising agency.
     */
    createClients(params: Params.AdsCreateClientsParams): Promise<Responses.AdsCreateClientsResponse>;
    /**
     * Edits clients of an advertising agency.
     */
    updateClients(params: Params.AdsUpdateClientsParams): Promise<Responses.AdsUpdateClientsResponse>;
    /**
     * Archives clients of an advertising agency.
     */
    deleteClients(params: Params.AdsDeleteClientsParams): Promise<Responses.AdsDeleteClientsResponse>;
    /**
     * Returns a list of campaigns in an advertising account.
     */
    getCampaigns(params: Params.AdsGetCampaignsParams): Promise<Responses.AdsGetCampaignsResponse>;
    /**
     * Creates advertising campaigns.
     */
    createCampaigns(params: Params.AdsCreateCampaignsParams): Promise<Responses.AdsCreateCampaignsResponse>;
    /**
     * Edits advertising campaigns.
     */
    updateCampaigns(params: Params.AdsUpdateCampaignsParams): Promise<Responses.AdsUpdateCampaignsResponse>;
    /**
     * Archives advertising campaigns.
     */
    deleteCampaigns(params: Params.AdsDeleteCampaignsParams): Promise<Responses.AdsDeleteCampaignsResponse>;
    /**
     * Returns number of ads.
     */
    getAds(params: Params.AdsGetAdsParams): Promise<Responses.AdsGetAdsResponse>;
    /**
     * Returns descriptions of ad layouts.
     */
    getAdsLayout(params: Params.AdsGetAdsLayoutParams): Promise<Responses.AdsGetAdsLayoutResponse>;
    /**
     * Returns ad targeting parameters.
     */
    getAdsTargeting(params: Params.AdsGetAdsTargetingParams): Promise<Responses.AdsGetAdsTargetingResponse>;
    /**
     * Creates ads.
     */
    createAds(params: Params.AdsCreateAdsParams): Promise<Responses.AdsCreateAdsResponse>;
    /**
     * Edits ads.
     */
    updateAds(params: Params.AdsUpdateAdsParams): Promise<Responses.AdsUpdateAdsResponse>;
    /**
     * Archives ads.
     */
    deleteAds(params: Params.AdsDeleteAdsParams): Promise<Responses.AdsDeleteAdsResponse>;
    /**
     * Allows to check the ad link.
     */
    checkLink(params: Params.AdsCheckLinkParams): Promise<Responses.AdsCheckLinkResponse>;
    /**
     * Returns statistics of performance indicators for ads, campaigns, clients or the whole account.
     */
    getStatistics(params: Params.AdsGetStatisticsParams): Promise<Responses.AdsGetStatisticsResponse>;
    /**
     * Returns demographics for ads or campaigns.
     */
    getDemographics(params: Params.AdsGetDemographicsParams): Promise<Responses.AdsGetDemographicsResponse>;
    /**
     * Allows to get detailed information about the ad post reach.
     */
    getAdsPostsReach(params: Params.AdsGetAdsPostsReachParams): Promise<Responses.AdsGetAdsPostsReachResponse>;
    /**
     * Returns current budget of the advertising account.
     */
    getBudget(params: Params.AdsGetBudgetParams): Promise<Responses.AdsGetBudgetResponse>;
    /**
     * Returns a list of managers and supervisors of advertising account.
     */
    getOfficeUsers(params: Params.AdsGetOfficeUsersParams): Promise<Responses.AdsGetOfficeUsersResponse>;
    /**
     * Adds managers and/or supervisors to advertising account.
     */
    addOfficeUsers(params: Params.AdsAddOfficeUsersParams): Promise<Responses.AdsAddOfficeUsersResponse>;
    /**
     * Removes managers and/or supervisors from advertising account.
     */
    removeOfficeUsers(params: Params.AdsRemoveOfficeUsersParams): Promise<Responses.AdsRemoveOfficeUsersResponse>;
    /**
     * Returns the size of targeting audience, and also recommended values for CPC and CPM.
     */
    getTargetingStats(params: Params.AdsGetTargetingStatsParams): Promise<Responses.AdsGetTargetingStatsResponse>;
    /**
     * Returns a set of auto-suggestions for various targeting parameters.
     */
    getSuggestions(params: Params.AdsGetSuggestionsParams): Promise<Responses.AdsGetSuggestionsResponse>;
    /**
     * Returns a list of possible ad categories.
     */
    getCategories(params: Params.AdsGetCategoriesParams): Promise<Responses.AdsGetCategoriesResponse>;
    /**
     * Returns URL to upload an ad photo to.
     */
    getUploadURL(params: Params.AdsGetUploadURLParams): Promise<Responses.AdsGetUploadURLResponse>;
    /**
     * Returns URL to upload an ad video to.
     */
    getVideoUploadURL(params: Params.AdsGetVideoUploadURLParams): Promise<Responses.AdsGetVideoUploadURLResponse>;
    /**
     * Returns information about current state of a counter — number of remaining runs of methods and time to the next counter nulling in seconds.
     */
    getFloodStats(params: Params.AdsGetFloodStatsParams): Promise<Responses.AdsGetFloodStatsResponse>;
    /**
     * Returns a reason of ad rejection for pre-moderation.
     */
    getRejectionReason(params: Params.AdsGetRejectionReasonParams): Promise<Responses.AdsGetRejectionReasonResponse>;
    /**
     * Creates a group to re-target ads for users who visited advertiser's site (viewed information about the product, registered, etc.).
     */
    createTargetGroup(params: Params.AdsCreateTargetGroupParams): Promise<Responses.AdsCreateTargetGroupResponse>;
    /**
     * Edits a retarget group.
     */
    updateTargetGroup(params: Params.AdsUpdateTargetGroupParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a retarget group.
     */
    deleteTargetGroup(params: Params.AdsDeleteTargetGroupParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of target groups.
     */
    getTargetGroups(params: Params.AdsGetTargetGroupsParams): Promise<Responses.AdsGetTargetGroupsResponse>;
    /**
     * Imports a list of advertiser's contacts to count VK registered users against the target group.
     */
    importTargetContacts(params: Params.AdsImportTargetContactsParams): Promise<Responses.AdsImportTargetContactsResponse>;
}

/**
 * The API market group
 */
export interface APIMarket {
    /**
     * Returns items list for a community.
     */
    get(params: Params.MarketGetParams): Promise<Responses.MarketGetResponse>;
    /**
     * Returns information about market items by their ids.
     */
    getById(params: Params.MarketGetByIdParams): Promise<Responses.MarketGetByIdResponse>;
    /**
     * Searches market items in a community's catalog
     */
    search(params: Params.MarketSearchParams): Promise<Responses.MarketSearchResponse>;
    /**
     * Returns community's collections list.
     */
    getAlbums(params: Params.MarketGetAlbumsParams): Promise<Responses.MarketGetAlbumsResponse>;
    /**
     * Returns items album's data
     */
    getAlbumById(params: Params.MarketGetAlbumByIdParams): Promise<Responses.MarketGetAlbumByIdResponse>;
    /**
     * Creates a new comment for an item.
     */
    createComment(params: Params.MarketCreateCommentParams): Promise<Responses.MarketCreateCommentResponse>;
    /**
     * Returns comments list for an item.
     */
    getComments(params: Params.MarketGetCommentsParams): Promise<Responses.MarketGetCommentsResponse>;
    /**
     * Deletes an item's comment
     */
    deleteComment(params: Params.MarketDeleteCommentParams): Promise<Responses.MarketDeleteCommentResponse>;
    /**
     * Restores a recently deleted comment
     */
    restoreComment(params: Params.MarketRestoreCommentParams): Promise<Responses.MarketRestoreCommentResponse>;
    /**
     * Chages item comment's text
     */
    editComment(params: Params.MarketEditCommentParams): Promise<Responses.OkResponse>;
    /**
     * Sends a complaint to the item's comment.
     */
    reportComment(params: Params.MarketReportCommentParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of market categories.
     */
    getCategories(params: Params.MarketGetCategoriesParams): Promise<Responses.MarketGetCategoriesResponse>;
    /**
     * Sends a complaint to the item.
     */
    report(params: Params.MarketReportParams): Promise<Responses.OkResponse>;
    /**
     * Ads a new item to the market.
     */
    add(params: Params.MarketAddParams): Promise<Responses.MarketAddResponse>;
    /**
     * Edits an item.
     */
    edit(params: Params.MarketEditParams): Promise<Responses.OkResponse>;
    /**
     * Deletes an item.
     */
    delete(params: Params.MarketDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Restores recently deleted item
     */
    restore(params: Params.MarketRestoreParams): Promise<Responses.OkResponse>;
    /**
     * Changes item place in a collection.
     */
    reorderItems(params: Params.MarketReorderItemsParams): Promise<Responses.OkResponse>;
    /**
     * Reorders the collections list.
     */
    reorderAlbums(params: Params.MarketReorderAlbumsParams): Promise<Responses.OkResponse>;
    /**
     * Creates new collection of items
     */
    addAlbum(params: Params.MarketAddAlbumParams): Promise<Responses.MarketAddAlbumResponse>;
    /**
     * Edits a collection of items
     */
    editAlbum(params: Params.MarketEditAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a collection of items.
     */
    deleteAlbum(params: Params.MarketDeleteAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Removes an item from one or multiple collections.
     */
    removeFromAlbum(params: Params.MarketRemoveFromAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Adds an item to one or multiple collections.
     */
    addToAlbum(params: Params.MarketAddToAlbumParams): Promise<Responses.OkResponse>;
}

export class APIMethods {
    /**
     * The API users group
     */
    users: APIUsers;
    /**
     * The API auth group
     */
    auth: APIAuth;
    /**
     * The API wall group
     */
    wall: APIWall;
    /**
     * The API photos group
     */
    photos: APIPhotos;
    /**
     * The API friends group
     */
    friends: APIFriends;
    /**
     * The API widgets group
     */
    widgets: APIWidgets;
    /**
     * The API stories group
     */
    stories: APIStories;
    /**
     * The API secure group
     */
    secure: APISecure;
    /**
     * The API streaming group
     */
    streaming: APIStreaming;
    /**
     * The API storage group
     */
    storage: APIStorage;
    /**
     * The API orders group
     */
    orders: APIOrders;
    /**
     * The API status group
     */
    status: APIStatus;
    /**
     * The API leads group
     */
    leads: APILeads;
    /**
     * The API pages group
     */
    pages: APIPages;
    /**
     * The API groups group
     */
    groups: APIGroups;
    /**
     * The API board group
     */
    board: APIBoard;
    /**
     * The API video group
     */
    video: APIVideo;
    /**
     * The API notes group
     */
    notes: APINotes;
    /**
     * The API places group
     */
    places: APIPlaces;
    /**
     * The API account group
     */
    account: APIAccount;
    /**
     * The API messages group
     */
    messages: APIMessages;
    /**
     * The API newsfeed group
     */
    newsfeed: APINewsfeed;
    /**
     * The API likes group
     */
    likes: APILikes;
    /**
     * The API polls group
     */
    polls: APIPolls;
    /**
     * The API docs group
     */
    docs: APIDocs;
    /**
     * The API fave group
     */
    fave: APIFave;
    /**
     * The API notifications group
     */
    notifications: APINotifications;
    /**
     * The API stats group
     */
    stats: APIStats;
    /**
     * The API search group
     */
    search: APISearch;
    /**
     * The API apps group
     */
    apps: APIApps;
    /**
     * The API utils group
     */
    utils: APIUtils;
    /**
     * The API database group
     */
    database: APIDatabase;
    /**
     * The API gifts group
     */
    gifts: APIGifts;
    /**
     * The API ads group
     */
    ads: APIAds;
    /**
     * The API market group
     */
    market: APIMarket;
}

