/* eslint-disable */
import * as Params from "./params.d";

import * as Responses from "./responses.d";

/**
 * The API account group
 */
export interface APIAccount {
    ban(params: Params.AccountBanParams): Promise<Responses.OkResponse>;
    /**
     * Changes a user password after access is successfully restored with the [vk.com/dev/auth.restore|auth.restore] method.
     */
    changePassword(params: Params.AccountChangePasswordParams): Promise<Responses.AccountChangePasswordResponse>;
    /**
     * Returns a list of active ads (offers) which executed by the user will bring him/her respective number of votes to his balance in the application.
     */
    getActiveOffers(params: Params.AccountGetActiveOffersParams): Promise<Responses.AccountGetActiveOffersResponse>;
    /**
     * Gets settings of the user in this application.
     */
    getAppPermissions(params: Params.AccountGetAppPermissionsParams): Promise<Responses.AccountGetAppPermissionsResponse>;
    /**
     * Returns a user's blacklist.
     */
    getBanned(params: Params.AccountGetBannedParams): Promise<Responses.AccountGetBannedResponse>;
    /**
     * Returns non-null values of user counters.
     */
    getCounters(params: Params.AccountGetCountersParams): Promise<Responses.AccountGetCountersResponse>;
    /**
     * Returns current account info.
     */
    getInfo(params: Params.AccountGetInfoParams): Promise<Responses.AccountGetInfoResponse>;
    /**
     * Returns the current account info.
     */
    getProfileInfo(params: Params.AccountGetProfileInfoParams): Promise<Responses.AccountGetProfileInfoResponse>;
    /**
     * Gets settings of push notifications.
     */
    getPushSettings(params: Params.AccountGetPushSettingsParams): Promise<Responses.AccountGetPushSettingsResponse>;
    /**
     * Subscribes an iOS/Android/Windows Phone-based device to receive push notifications
     */
    registerDevice(params: Params.AccountRegisterDeviceParams): Promise<Responses.OkResponse>;
    /**
     * Edits current profile info.
     */
    saveProfileInfo(params: Params.AccountSaveProfileInfoParams): Promise<Responses.AccountSaveProfileInfoResponse>;
    /**
     * Allows to edit the current account info.
     */
    setInfo(params: Params.AccountSetInfoParams): Promise<Responses.OkResponse>;
    /**
     * Sets an application screen name (up to 17 characters), that is shown to the user in the left menu.
     */
    setNameInMenu(params: Params.AccountSetNameInMenuParams): Promise<Responses.OkResponse>;
    /**
     * Marks a current user as offline.
     */
    setOffline(params: Params.AccountSetOfflineParams): Promise<Responses.OkResponse>;
    /**
     * Marks the current user as online for 15 minutes.
     */
    setOnline(params: Params.AccountSetOnlineParams): Promise<Responses.OkResponse>;
    /**
     * Change push settings.
     */
    setPushSettings(params: Params.AccountSetPushSettingsParams): Promise<Responses.OkResponse>;
    /**
     * Mutes push notifications for the set period of time.
     */
    setSilenceMode(params: Params.AccountSetSilenceModeParams): Promise<Responses.OkResponse>;
    unban(params: Params.AccountUnbanParams): Promise<Responses.OkResponse>;
    /**
     * Unsubscribes a device from push notifications.
     */
    unregisterDevice(params: Params.AccountUnregisterDeviceParams): Promise<Responses.OkResponse>;
}

/**
 * The API ads group
 */
export interface APIAds {
    /**
     * Adds managers and/or supervisors to advertising account.
     */
    addOfficeUsers(params: Params.AdsAddOfficeUsersParams): Promise<Responses.AdsAddOfficeUsersResponse>;
    /**
     * Allows to check the ad link.
     */
    checkLink(params: Params.AdsCheckLinkParams): Promise<Responses.AdsCheckLinkResponse>;
    /**
     * Creates ads.
     */
    createAds(params: Params.AdsCreateAdsParams): Promise<Responses.AdsCreateAdsResponse>;
    /**
     * Creates advertising campaigns.
     */
    createCampaigns(params: Params.AdsCreateCampaignsParams): Promise<Responses.AdsCreateCampaignsResponse>;
    /**
     * Creates clients of an advertising agency.
     */
    createClients(params: Params.AdsCreateClientsParams): Promise<Responses.AdsCreateClientsResponse>;
    /**
     * Creates a group to re-target ads for users who visited advertiser's site (viewed information about the product, registered, etc.).
     */
    createTargetGroup(params: Params.AdsCreateTargetGroupParams): Promise<Responses.AdsCreateTargetGroupResponse>;
    /**
     * Archives ads.
     */
    deleteAds(params: Params.AdsDeleteAdsParams): Promise<Responses.AdsDeleteAdsResponse>;
    /**
     * Archives advertising campaigns.
     */
    deleteCampaigns(params: Params.AdsDeleteCampaignsParams): Promise<Responses.AdsDeleteCampaignsResponse>;
    /**
     * Archives clients of an advertising agency.
     */
    deleteClients(params: Params.AdsDeleteClientsParams): Promise<Responses.AdsDeleteClientsResponse>;
    /**
     * Deletes a retarget group.
     */
    deleteTargetGroup(params: Params.AdsDeleteTargetGroupParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of advertising accounts.
     */
    getAccounts(params: Params.AdsGetAccountsParams): Promise<Responses.AdsGetAccountsResponse>;
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
     * Returns current budget of the advertising account.
     */
    getBudget(params: Params.AdsGetBudgetParams): Promise<Responses.AdsGetBudgetResponse>;
    /**
     * Returns a list of campaigns in an advertising account.
     */
    getCampaigns(params: Params.AdsGetCampaignsParams): Promise<Responses.AdsGetCampaignsResponse>;
    /**
     * Returns a list of possible ad categories.
     */
    getCategories(params: Params.AdsGetCategoriesParams): Promise<Responses.AdsGetCategoriesResponse>;
    /**
     * Returns a list of advertising agency's clients.
     */
    getClients(params: Params.AdsGetClientsParams): Promise<Responses.AdsGetClientsResponse>;
    /**
     * Returns demographics for ads or campaigns.
     */
    getDemographics(params: Params.AdsGetDemographicsParams): Promise<Responses.AdsGetDemographicsResponse>;
    /**
     * Returns information about current state of a counter — number of remaining runs of methods and time to the next counter nulling in seconds.
     */
    getFloodStats(params: Params.AdsGetFloodStatsParams): Promise<Responses.AdsGetFloodStatsResponse>;
    /**
     * Returns a list of managers and supervisors of advertising account.
     */
    getOfficeUsers(params: Params.AdsGetOfficeUsersParams): Promise<Responses.AdsGetOfficeUsersResponse>;
    /**
     * Returns detailed statistics of promoted posts reach from campaigns and ads.
     */
    getPostsReach(params: Params.AdsGetPostsReachParams): Promise<Responses.AdsGetPostsReachResponse>;
    /**
     * Returns a reason of ad rejection for pre-moderation.
     */
    getRejectionReason(params: Params.AdsGetRejectionReasonParams): Promise<Responses.AdsGetRejectionReasonResponse>;
    /**
     * Returns statistics of performance indicators for ads, campaigns, clients or the whole account.
     */
    getStatistics(params: Params.AdsGetStatisticsParams): Promise<Responses.AdsGetStatisticsResponse>;
    /**
     * Returns a set of auto-suggestions for various targeting parameters.
     */
    getSuggestions(params: Params.AdsGetSuggestionsParams): Promise<Responses.AdsGetSuggestionsResponse>;
    /**
     * Returns a list of target groups.
     */
    getTargetGroups(params: Params.AdsGetTargetGroupsParams): Promise<Responses.AdsGetTargetGroupsResponse>;
    /**
     * Returns the size of targeting audience, and also recommended values for CPC and CPM.
     */
    getTargetingStats(params: Params.AdsGetTargetingStatsParams): Promise<Responses.AdsGetTargetingStatsResponse>;
    /**
     * Returns URL to upload an ad photo to.
     */
    getUploadURL(params: Params.AdsGetUploadURLParams): Promise<Responses.AdsGetUploadURLResponse>;
    /**
     * Returns URL to upload an ad video to.
     */
    getVideoUploadURL(params: Params.AdsGetVideoUploadURLParams): Promise<Responses.AdsGetVideoUploadURLResponse>;
    /**
     * Imports a list of advertiser's contacts to count VK registered users against the target group.
     */
    importTargetContacts(params: Params.AdsImportTargetContactsParams): Promise<Responses.AdsImportTargetContactsResponse>;
    /**
     * Removes managers and/or supervisors from advertising account.
     */
    removeOfficeUsers(params: Params.AdsRemoveOfficeUsersParams): Promise<Responses.AdsRemoveOfficeUsersResponse>;
    /**
     * Edits ads.
     */
    updateAds(params: Params.AdsUpdateAdsParams): Promise<Responses.AdsUpdateAdsResponse>;
    /**
     * Edits advertising campaigns.
     */
    updateCampaigns(params: Params.AdsUpdateCampaignsParams): Promise<Responses.AdsUpdateCampaignsResponse>;
    /**
     * Edits clients of an advertising agency.
     */
    updateClients(params: Params.AdsUpdateClientsParams): Promise<Responses.AdsUpdateClientsResponse>;
    /**
     * Edits a retarget group.
     */
    updateTargetGroup(params: Params.AdsUpdateTargetGroupParams): Promise<Responses.OkResponse>;
}

/**
 * The API apps group
 */
export interface APIApps {
    /**
     * Deletes all request notifications from the current app.
     */
    deleteAppRequests(params: Params.AppsDeleteAppRequestsParams): Promise<Responses.OkResponse>;
    /**
     * Returns applications data.
     */
    get(params: Params.AppsGetParams): Promise<Responses.AppsGetResponse>;
    /**
     * Returns a list of applications (apps) available to users in the App Catalog.
     */
    getCatalog(params: Params.AppsGetCatalogParams): Promise<Responses.AppsGetCatalogResponse>;
    /**
     * Creates friends list for requests and invites in current app.
     */
    getFriendsList(params: Params.AppsGetFriendsListParams): Promise<Responses.AppsGetFriendsListResponse>;
    /**
     * Returns players rating in the game.
     */
    getLeaderboard(params: Params.AppsGetLeaderboardParams): Promise<Responses.AppsGetLeaderboardResponse>;
    /**
     * Returns scopes for auth
     */
    getScopes(params: Params.AppsGetScopesParams): Promise<Responses.AppsGetScopesResponse>;
    /**
     * Returns user score in app
     */
    getScore(params: Params.AppsGetScoreParams): Promise<Responses.AppsGetScoreResponse>;
    /**
     * Sends a request to another user in an app that uses VK authorization.
     */
    sendRequest(params: Params.AppsSendRequestParams): Promise<Responses.AppsSendRequestResponse>;
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
     * Allows to restore account access using a code received via SMS. " This method is only available for apps with [vk.com/dev/auth_direct|Direct authorization] access. "
     */
    restore(params: Params.AuthRestoreParams): Promise<Responses.AuthRestoreResponse>;
}

/**
 * The API board group
 */
export interface APIBoard {
    /**
     * Creates a new topic on a community's discussion board.
     */
    addTopic(params: Params.BoardAddTopicParams): Promise<Responses.BoardAddTopicResponse>;
    /**
     * Closes a topic on a community's discussion board so that comments cannot be posted.
     */
    closeTopic(params: Params.BoardCloseTopicParams): Promise<Responses.OkResponse>;
    /**
     * Adds a comment on a topic on a community's discussion board.
     */
    createComment(params: Params.BoardCreateCommentParams): Promise<Responses.BoardCreateCommentResponse>;
    /**
     * Deletes a comment on a topic on a community's discussion board.
     */
    deleteComment(params: Params.BoardDeleteCommentParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a topic from a community's discussion board.
     */
    deleteTopic(params: Params.BoardDeleteTopicParams): Promise<Responses.OkResponse>;
    /**
     * Edits a comment on a topic on a community's discussion board.
     */
    editComment(params: Params.BoardEditCommentParams): Promise<Responses.OkResponse>;
    /**
     * Edits the title of a topic on a community's discussion board.
     */
    editTopic(params: Params.BoardEditTopicParams): Promise<Responses.OkResponse>;
    /**
     * Pins a topic (fixes its place) to the top of a community's discussion board.
     */
    fixTopic(params: Params.BoardFixTopicParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of comments on a topic on a community's discussion board.
     */
    getComments(params: Params.BoardGetCommentsParams): Promise<Responses.BoardGetCommentsResponse>;
    /**
     * Returns a list of topics on a community's discussion board.
     */
    getTopics(params: Params.BoardGetTopicsParams): Promise<Responses.BoardGetTopicsResponse>;
    /**
     * Re-opens a previously closed topic on a community's discussion board.
     */
    openTopic(params: Params.BoardOpenTopicParams): Promise<Responses.OkResponse>;
    /**
     * Restores a comment deleted from a topic on a community's discussion board.
     */
    restoreComment(params: Params.BoardRestoreCommentParams): Promise<Responses.OkResponse>;
    /**
     * Unpins a pinned topic from the top of a community's discussion board.
     */
    unfixTopic(params: Params.BoardUnfixTopicParams): Promise<Responses.OkResponse>;
}

/**
 * The API database group
 */
export interface APIDatabase {
    /**
     * Returns list of chairs on a specified faculty.
     */
    getChairs(params: Params.DatabaseGetChairsParams): Promise<Responses.DatabaseGetChairsResponse>;
    /**
     * Returns a list of cities.
     */
    getCities(params: Params.DatabaseGetCitiesParams): Promise<Responses.DatabaseGetCitiesResponse>;
    /**
     * Returns information about cities by their IDs.
     */
    getCitiesById(params: Params.DatabaseGetCitiesByIdParams): Promise<Responses.DatabaseGetCitiesByIdResponse>;
    /**
     * Returns a list of countries.
     */
    getCountries(params: Params.DatabaseGetCountriesParams): Promise<Responses.DatabaseGetCountriesResponse>;
    /**
     * Returns information about countries by their IDs.
     */
    getCountriesById(params: Params.DatabaseGetCountriesByIdParams): Promise<Responses.DatabaseGetCountriesByIdResponse>;
    /**
     * Returns a list of faculties (i.e., university departments).
     */
    getFaculties(params: Params.DatabaseGetFacultiesParams): Promise<Responses.DatabaseGetFacultiesResponse>;
    /**
     * Get metro stations by city
     */
    getMetroStations(params: Params.DatabaseGetMetroStationsParams): Promise<Responses.DatabaseGetMetroStationsResponse>;
    /**
     * Get metro station by his id
     */
    getMetroStationsById(params: Params.DatabaseGetMetroStationsByIdParams): Promise<Responses.DatabaseGetMetroStationsByIdResponse>;
    /**
     * Returns a list of regions.
     */
    getRegions(params: Params.DatabaseGetRegionsParams): Promise<Responses.DatabaseGetRegionsResponse>;
    /**
     * Returns a list of school classes specified for the country.
     */
    getSchoolClasses(params: Params.DatabaseGetSchoolClassesParams): Promise<Responses.DatabaseGetSchoolClassesResponse>;
    /**
     * Returns a list of schools.
     */
    getSchools(params: Params.DatabaseGetSchoolsParams): Promise<Responses.DatabaseGetSchoolsResponse>;
    /**
     * Returns a list of higher education institutions.
     */
    getUniversities(params: Params.DatabaseGetUniversitiesParams): Promise<Responses.DatabaseGetUniversitiesResponse>;
}

/**
 * The API docs group
 */
export interface APIDocs {
    /**
     * Copies a document to a user's or community's document list.
     */
    add(params: Params.DocsAddParams): Promise<Responses.DocsAddResponse>;
    /**
     * Deletes a user or community document.
     */
    delete(params: Params.DocsDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Edits a document.
     */
    edit(params: Params.DocsEditParams): Promise<Responses.OkResponse>;
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
    getMessagesUploadServer(params: Params.DocsGetMessagesUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
    /**
     * Returns documents types available for current user.
     */
    getTypes(params: Params.DocsGetTypesParams): Promise<Responses.DocsGetTypesResponse>;
    /**
     * Returns the server address for document upload.
     */
    getUploadServer(params: Params.DocsGetUploadServerParams): Promise<Responses.DocsGetUploadServer>;
    /**
     * Returns the server address for document upload onto a user's or community's wall.
     */
    getWallUploadServer(params: Params.DocsGetWallUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
    /**
     * Saves a document after [vk.com/dev/upload_files_2|uploading it to a server].
     */
    save(params: Params.DocsSaveParams): Promise<Responses.DocsSaveResponse>;
    /**
     * Returns a list of documents matching the search criteria.
     */
    search(params: Params.DocsSearchParams): Promise<Responses.DocsSearchResponse>;
}

/**
 * The API fave group
 */
export interface APIFave {
    /**
     * Adds a community to user faves.
     */
    addGroup(params: Params.FaveAddGroupParams): Promise<Responses.OkResponse>;
    /**
     * Adds a link to user faves.
     */
    addLink(params: Params.FaveAddLinkParams): Promise<Responses.OkResponse>;
    /**
     * Adds a profile to user faves.
     */
    addUser(params: Params.FaveAddUserParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of links that the current user has bookmarked.
     */
    getLinks(params: Params.FaveGetLinksParams): Promise<Responses.FaveGetLinksResponse>;
    /**
     * Returns market items bookmarked by current user.
     */
    getMarketItems(params: Params.FaveGetMarketItemsParams): Promise<Responses.FaveGetMarketItemsResponse>;
    /**
     * Returns a list of photos that the current user has liked.
     */
    getPhotos(params: Params.FaveGetPhotosParams): Promise<Responses.FaveGetPhotosResponse>;
    /**
     * Returns a list of wall posts that the current user has liked.
     */
    getPosts(params: Params.FaveGetPostsParams): Promise<Responses.FaveGetPostsResponse>;
    /**
     * Returns a list of users whom the current user has bookmarked.
     */
    getUsers(params: Params.FaveGetUsersParams): Promise<Responses.FaveGetUsersResponse>;
    /**
     * Returns a list of videos that the current user has liked.
     */
    getVideos(params: Params.FaveGetVideosParams): Promise<Responses.FaveGetVideosResponse>;
    /**
     * Removes a community from user faves.
     */
    removeGroup(params: Params.FaveRemoveGroupParams): Promise<Responses.OkResponse>;
    /**
     * Removes link from the user's faves.
     */
    removeLink(params: Params.FaveRemoveLinkParams): Promise<Responses.OkResponse>;
    /**
     * Removes a profile from user faves.
     */
    removeUser(params: Params.FaveRemoveUserParams): Promise<Responses.OkResponse>;
}

/**
 * The API friends group
 */
export interface APIFriends {
    /**
     * Approves or creates a friend request.
     */
    add(params: Params.FriendsAddParams): Promise<Responses.FriendsAddResponse>;
    /**
     * Creates a new friend list for the current user.
     */
    addList(params: Params.FriendsAddListParams): Promise<Responses.FriendsAddListResponse>;
    /**
     * Checks the current user's friendship status with other specified users.
     */
    areFriends(params: Params.FriendsAreFriendsParams): Promise<Responses.FriendsAreFriendsResponse>;
    /**
     * Declines a friend request or deletes a user from the current user's friend list.
     */
    delete(params: Params.FriendsDeleteParams): Promise<Responses.FriendsDeleteResponse>;
    /**
     * Marks all incoming friend requests as viewed.
     */
    deleteAllRequests(params: Params.FriendsDeleteAllRequestsParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a friend list of the current user.
     */
    deleteList(params: Params.FriendsDeleteListParams): Promise<Responses.OkResponse>;
    /**
     * Edits the friend lists of the selected user.
     */
    edit(params: Params.FriendsEditParams): Promise<Responses.OkResponse>;
    /**
     * Edits a friend list of the current user.
     */
    editList(params: Params.FriendsEditListParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of user IDs or detailed information about a user's friends.
     */
    get(params: Params.FriendsGetParams): Promise<Responses.FriendsGetResponse>;
    /**
     * Returns a list of IDs of the current user's friends who installed the application.
     */
    getAppUsers(params: Params.FriendsGetAppUsersParams): Promise<Responses.FriendsGetAppUsersResponse>;
    /**
     * Returns a list of the current user's friends whose phone numbers, validated or specified in a profile, are in a given list.
     */
    getByPhones(params: Params.FriendsGetByPhonesParams): Promise<Responses.FriendsGetByPhonesResponse>;
    /**
     * Returns a list of the user's friend lists.
     */
    getLists(params: Params.FriendsGetListsParams): Promise<Responses.FriendsGetListsResponse>;
    /**
     * Returns a list of user IDs of the mutual friends of two users.
     */
    getMutual(params: Params.FriendsGetMutualParams): Promise<Responses.FriendsGetMutualResponse>;
    /**
     * Returns a list of user IDs of a user's friends who are online.
     */
    getOnline(params: Params.FriendsGetOnlineParams): Promise<Responses.FriendsGetOnlineResponse>;
    /**
     * Returns a list of user IDs of the current user's recently added friends.
     */
    getRecent(params: Params.FriendsGetRecentParams): Promise<Responses.FriendsGetRecentResponse>;
    /**
     * Returns information about the current user's incoming and outgoing friend requests.
     */
    getRequests(params: Params.FriendsGetRequestsParams): Promise<Responses.FriendsGetRequestsResponse>;
    /**
     * Returns a list of profiles of users whom the current user may know.
     */
    getSuggestions(params: Params.FriendsGetSuggestionsParams): Promise<Responses.FriendsGetSuggestionsResponse>;
    /**
     * Returns a list of friends matching the search criteria.
     */
    search(params: Params.FriendsSearchParams): Promise<Responses.FriendsSearchResponse>;
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
 * The API groups group
 */
export interface APIGroups {
    addAddress(params: Params.GroupsAddAddressParams): Promise<Responses.GroupsAddAddressResponse>;
    addCallbackServer(params: Params.GroupsAddCallbackServerParams): Promise<Responses.GroupsAddCallbackServerResponse>;
    /**
     * Allows to add a link to the community.
     */
    addLink(params: Params.GroupsAddLinkParams): Promise<Responses.GroupsAddLinkResponse>;
    /**
     * Allows to approve join request to the community.
     */
    approveRequest(params: Params.GroupsApproveRequestParams): Promise<Responses.OkResponse>;
    ban(params: Params.GroupsBanParams): Promise<Responses.OkResponse>;
    /**
     * Creates a new community.
     */
    create(params: Params.GroupsCreateParams): Promise<Responses.GroupsCreateResponse>;
    deleteCallbackServer(params: Params.GroupsDeleteCallbackServerParams): Promise<Responses.OkResponse>;
    /**
     * Allows to delete a link from the community.
     */
    deleteLink(params: Params.GroupsDeleteLinkParams): Promise<Responses.OkResponse>;
    disableOnline(params: Params.GroupsDisableOnlineParams): Promise<Responses.OkResponse>;
    /**
     * Edits a community.
     */
    edit(params: Params.GroupsEditParams): Promise<Responses.OkResponse>;
    editAddress(params: Params.GroupsEditAddressParams): Promise<Responses.GroupsEditAddressResponse>;
    editCallbackServer(params: Params.GroupsEditCallbackServerParams): Promise<Responses.OkResponse>;
    /**
     * Allows to edit a link in the community.
     */
    editLink(params: Params.GroupsEditLinkParams): Promise<Responses.OkResponse>;
    /**
     * Allows to add, remove or edit the community manager.
     */
    editManager(params: Params.GroupsEditManagerParams): Promise<Responses.OkResponse>;
    enableOnline(params: Params.GroupsEnableOnlineParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of the communities to which a user belongs.
     */
    get(params: Params.GroupsGetParams): Promise<Responses.GroupsGetResponse>;
    /**
     * Returns a list of community addresses.
     */
    getAddresses(params: Params.GroupsGetAddressesParams): Promise<Responses.GroupsGetAddressesResponse>;
    /**
     * Returns a list of users on a community blacklist.
     */
    getBanned(params: Params.GroupsGetBannedParams): Promise<Responses.GroupsGetBannedResponse>;
    /**
     * Returns information about communities by their IDs.
     */
    getById(params: Params.GroupsGetByIdParams): Promise<Responses.GroupsGetByIdResponse>;
    /**
     * Returns Callback API confirmation code for the community.
     */
    getCallbackConfirmationCode(params: Params.GroupsGetCallbackConfirmationCodeParams): Promise<Responses.GroupsGetCallbackConfirmationCodeResponse>;
    getCallbackServers(params: Params.GroupsGetCallbackServersParams): Promise<Responses.GroupsGetCallbackServersResponse>;
    /**
     * Returns [vk.com/dev/callback_api|Callback API] notifications settings.
     */
    getCallbackSettings(params: Params.GroupsGetCallbackSettingsParams): Promise<Responses.GroupsGetCallbackSettingsResponse>;
    /**
     * Returns communities list for a catalog category.
     */
    getCatalog(params: Params.GroupsGetCatalogParams): Promise<Responses.GroupsGetCatalogResponse>;
    /**
     * Returns categories list for communities catalog
     */
    getCatalogInfo(params: Params.GroupsGetCatalogInfoParams): Promise<Responses.GroupsGetCatalogInfoResponse>;
    /**
     * Returns invited users list of a community
     */
    getInvitedUsers(params: Params.GroupsGetInvitedUsersParams): Promise<Responses.GroupsGetInvitedUsersResponse>;
    /**
     * Returns a list of invitations to join communities and events.
     */
    getInvites(params: Params.GroupsGetInvitesParams): Promise<Responses.GroupsGetInvitesResponse>;
    /**
     * Returns the data needed to query a Long Poll server for events
     */
    getLongPollServer(params: Params.GroupsGetLongPollServerParams): Promise<Responses.GroupsGetLongPollServerResponse>;
    /**
     * Returns Long Poll notification settings
     */
    getLongPollSettings(params: Params.GroupsGetLongPollSettingsParams): Promise<Responses.GroupsGetLongPollSettingsResponse>;
    /**
     * Returns a list of community members.
     */
    getMembers(params: Params.GroupsGetMembersParams): Promise<Responses.GroupsGetMembersResponse>;
    /**
     * Returns a list of requests to the community.
     */
    getRequests(params: Params.GroupsGetRequestsParams): Promise<Responses.GroupsGetRequestsResponse>;
    /**
     * Returns community settings.
     */
    getSettings(params: Params.GroupsGetSettingsParams): Promise<Responses.GroupsGetSettingsResponse>;
    getTokenPermissions(params: Params.GroupsGetTokenPermissionsParams): Promise<Responses.GroupsGetTokenPermissionsResponse>;
    /**
     * Allows to invite friends to the community.
     */
    invite(params: Params.GroupsInviteParams): Promise<Responses.OkResponse>;
    /**
     * Returns information specifying whether a user is a member of a community.
     */
    isMember(params: Params.GroupsIsMemberParams): Promise<Responses.GroupsIsMemberResponse>;
    /**
     * With this method you can join the group or public page, and also confirm your participation in an event.
     */
    join(params: Params.GroupsJoinParams): Promise<Responses.OkResponse>;
    /**
     * With this method you can leave a group, public page, or event.
     */
    leave(params: Params.GroupsLeaveParams): Promise<Responses.OkResponse>;
    /**
     * Removes a user from the community.
     */
    removeUser(params: Params.GroupsRemoveUserParams): Promise<Responses.OkResponse>;
    /**
     * Allows to reorder links in the community.
     */
    reorderLink(params: Params.GroupsReorderLinkParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of communities matching the search criteria.
     */
    search(params: Params.GroupsSearchParams): Promise<Responses.GroupsSearchResponse>;
    /**
     * Allow to set notifications settings for group.
     */
    setCallbackSettings(params: Params.GroupsSetCallbackSettingsParams): Promise<Responses.OkResponse>;
    /**
     * Sets Long Poll notification settings
     */
    setLongPollSettings(params: Params.GroupsSetLongPollSettingsParams): Promise<Responses.OkResponse>;
    unban(params: Params.GroupsUnbanParams): Promise<Responses.OkResponse>;
}

/**
 * The API leads group
 */
export interface APILeads {
    /**
     * Checks if the user can start the lead.
     */
    checkUser(params: Params.LeadsCheckUserParams): Promise<Responses.LeadsCheckUserResponse>;
    /**
     * Completes the lead started by user.
     */
    complete(params: Params.LeadsCompleteParams): Promise<Responses.LeadsCompleteResponse>;
    /**
     * Returns lead stats data.
     */
    getStats(params: Params.LeadsGetStatsParams): Promise<Responses.LeadsGetStatsResponse>;
    /**
     * Returns a list of last user actions for the offer.
     */
    getUsers(params: Params.LeadsGetUsersParams): Promise<Responses.LeadsGetUsersResponse>;
    /**
     * Counts the metric event.
     */
    metricHit(params: Params.LeadsMetricHitParams): Promise<Responses.LeadsMetricHitResponse>;
    /**
     * Creates new session for the user passing the offer.
     */
    start(params: Params.LeadsStartParams): Promise<Responses.LeadsStartResponse>;
}

/**
 * The API likes group
 */
export interface APILikes {
    /**
     * Adds the specified object to the 'Likes' list of the current user.
     */
    add(params: Params.LikesAddParams): Promise<Responses.LikesAddResponse>;
    /**
     * Deletes the specified object from the 'Likes' list of the current user.
     */
    delete(params: Params.LikesDeleteParams): Promise<Responses.LikesDeleteResponse>;
    /**
     * Returns a list of IDs of users who added the specified object to their 'Likes' list.
     */
    getList(params: Params.LikesGetListParams): Promise<Responses.LikesGetListResponse>;
    /**
     * Checks for the object in the 'Likes' list of the specified user.
     */
    isLiked(params: Params.LikesIsLikedParams): Promise<Responses.LikesIsLikedResponse>;
}

/**
 * The API market group
 */
export interface APIMarket {
    /**
     * Ads a new item to the market.
     */
    add(params: Params.MarketAddParams): Promise<Responses.MarketAddResponse>;
    /**
     * Creates new collection of items
     */
    addAlbum(params: Params.MarketAddAlbumParams): Promise<Responses.MarketAddAlbumResponse>;
    /**
     * Adds an item to one or multiple collections.
     */
    addToAlbum(params: Params.MarketAddToAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Creates a new comment for an item.
     */
    createComment(params: Params.MarketCreateCommentParams): Promise<Responses.MarketCreateCommentResponse>;
    /**
     * Deletes an item.
     */
    delete(params: Params.MarketDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a collection of items.
     */
    deleteAlbum(params: Params.MarketDeleteAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Deletes an item's comment
     */
    deleteComment(params: Params.MarketDeleteCommentParams): Promise<Responses.MarketDeleteCommentResponse>;
    /**
     * Edits an item.
     */
    edit(params: Params.MarketEditParams): Promise<Responses.OkResponse>;
    /**
     * Edits a collection of items
     */
    editAlbum(params: Params.MarketEditAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Chages item comment's text
     */
    editComment(params: Params.MarketEditCommentParams): Promise<Responses.OkResponse>;
    /**
     * Returns items list for a community.
     */
    get(params: Params.MarketGetParams): Promise<Responses.MarketGetResponse>;
    /**
     * Returns items album's data
     */
    getAlbumById(params: Params.MarketGetAlbumByIdParams): Promise<Responses.MarketGetAlbumByIdResponse>;
    /**
     * Returns community's collections list.
     */
    getAlbums(params: Params.MarketGetAlbumsParams): Promise<Responses.MarketGetAlbumsResponse>;
    /**
     * Returns information about market items by their ids.
     */
    getById(params: Params.MarketGetByIdParams): Promise<Responses.MarketGetByIdResponse>;
    /**
     * Returns a list of market categories.
     */
    getCategories(params: Params.MarketGetCategoriesParams): Promise<Responses.MarketGetCategoriesResponse>;
    /**
     * Returns comments list for an item.
     */
    getComments(params: Params.MarketGetCommentsParams): Promise<Responses.MarketGetCommentsResponse>;
    /**
     * Removes an item from one or multiple collections.
     */
    removeFromAlbum(params: Params.MarketRemoveFromAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Reorders the collections list.
     */
    reorderAlbums(params: Params.MarketReorderAlbumsParams): Promise<Responses.OkResponse>;
    /**
     * Changes item place in a collection.
     */
    reorderItems(params: Params.MarketReorderItemsParams): Promise<Responses.OkResponse>;
    /**
     * Sends a complaint to the item.
     */
    report(params: Params.MarketReportParams): Promise<Responses.OkResponse>;
    /**
     * Sends a complaint to the item's comment.
     */
    reportComment(params: Params.MarketReportCommentParams): Promise<Responses.OkResponse>;
    /**
     * Restores recently deleted item
     */
    restore(params: Params.MarketRestoreParams): Promise<Responses.OkResponse>;
    /**
     * Restores a recently deleted comment
     */
    restoreComment(params: Params.MarketRestoreCommentParams): Promise<Responses.MarketRestoreCommentResponse>;
    /**
     * Searches market items in a community's catalog
     */
    search(params: Params.MarketSearchParams): Promise<Responses.MarketSearchResponse>;
}

/**
 * The API messages group
 */
export interface APIMessages {
    /**
     * Adds a new user to a chat.
     */
    addChatUser(params: Params.MessagesAddChatUserParams): Promise<Responses.OkResponse>;
    /**
     * Allows sending messages from community to the current user.
     */
    allowMessagesFromGroup(params: Params.MessagesAllowMessagesFromGroupParams): Promise<Responses.OkResponse>;
    /**
     * Creates a chat with several participants.
     */
    createChat(params: Params.MessagesCreateChatParams): Promise<Responses.MessagesCreateChatResponse>;
    /**
     * Deletes one or more messages.
     */
    delete(params: Params.MessagesDeleteParams): Promise<Responses.MessagesDeleteResponse>;
    /**
     * Deletes a chat's cover picture.
     */
    deleteChatPhoto(params: Params.MessagesDeleteChatPhotoParams): Promise<Responses.MessagesDeleteChatPhotoResponse>;
    /**
     * Deletes all private messages in a conversation.
     */
    deleteConversation(params: Params.MessagesDeleteConversationParams): Promise<Responses.MessagesDeleteConversationResponse>;
    /**
     * Denies sending message from community to the current user.
     */
    denyMessagesFromGroup(params: Params.MessagesDenyMessagesFromGroupParams): Promise<Responses.OkResponse>;
    /**
     * Edits the message.
     */
    edit(params: Params.MessagesEditParams): Promise<Responses.MessagesEditResponse>;
    /**
     * Edits the title of a chat.
     */
    editChat(params: Params.MessagesEditChatParams): Promise<Responses.OkResponse>;
    /**
     * Returns messages by their IDs within the conversation.
     */
    getByConversationMessageId(params: Params.MessagesGetByConversationMessageIdParams): Promise<Responses.MessagesGetByConversationMessageIdResponse>;
    /**
     * Returns messages by their IDs.
     */
    getById(params: Params.MessagesGetByIdParams): Promise<Responses.MessagesGetByIdResponse>;
    getChatPreview(params: Params.MessagesGetChatPreviewParams): Promise<Responses.MessagesGetChatPreviewResponse>;
    /**
     * Returns a list of IDs of users participating in a chat.
     */
    getConversationMembers(params: Params.MessagesGetConversationMembersParams): Promise<Responses.MessagesGetConversationMembersResponse>;
    /**
     * Returns a list of the current user's conversations.
     */
    getConversations(params: Params.MessagesGetConversationsParams): Promise<Responses.MessagesGetConversationsResponse>;
    /**
     * Returns conversations by their IDs
     */
    getConversationsById(params: Params.MessagesGetConversationsByIdParams): Promise<Responses.MessagesGetConversationsByIdResponse>;
    /**
     * Returns message history for the specified user or group chat.
     */
    getHistory(params: Params.MessagesGetHistoryParams): Promise<Responses.MessagesGetHistoryResponse>;
    /**
     * Returns media files from the dialog or group chat.
     */
    getHistoryAttachments(params: Params.MessagesGetHistoryAttachmentsParams): Promise<Responses.MessagesGetHistoryAttachmentsResponse>;
    getInviteLink(params: Params.MessagesGetInviteLinkParams): Promise<Responses.MessagesGetInviteLinkResponse>;
    /**
     * Returns a user's current status and date of last activity.
     */
    getLastActivity(params: Params.MessagesGetLastActivityParams): Promise<Responses.MessagesGetLastActivityResponse>;
    /**
     * Returns updates in user's private messages.
     */
    getLongPollHistory(params: Params.MessagesGetLongPollHistoryParams): Promise<Responses.MessagesGetLongPollHistoryResponse>;
    /**
     * Returns data required for connection to a Long Poll server.
     */
    getLongPollServer(params: Params.MessagesGetLongPollServerParams): Promise<Responses.MessagesGetLongPollServerResponse>;
    /**
     * Returns information whether sending messages from the community to current user is allowed.
     */
    isMessagesFromGroupAllowed(params: Params.MessagesIsMessagesFromGroupAllowedParams): Promise<Responses.MessagesIsMessagesFromGroupAllowedResponse>;
    joinChatByInviteLink(params: Params.MessagesJoinChatByInviteLinkParams): Promise<Responses.MessagesJoinChatByInviteLinkResponse>;
    /**
     * Marks and unmarks conversations as unanswered.
     */
    markAsAnsweredConversation(params: Params.MessagesMarkAsAnsweredConversationParams): Promise<Responses.OkResponse>;
    /**
     * Marks and unmarks messages as important (starred).
     */
    markAsImportant(params: Params.MessagesMarkAsImportantParams): Promise<Responses.MessagesMarkAsImportantResponse>;
    /**
     * Marks and unmarks conversations as important.
     */
    markAsImportantConversation(params: Params.MessagesMarkAsImportantConversationParams): Promise<Responses.OkResponse>;
    /**
     * Marks messages as read.
     */
    markAsRead(params: Params.MessagesMarkAsReadParams): Promise<Responses.OkResponse>;
    /**
     * Pin a message.
     */
    pin(params: Params.MessagesPinParams): Promise<Responses.MessagesPinResponse>;
    /**
     * Allows the current user to leave a chat or, if the current user started the chat, allows the user to remove another user from the chat.
     */
    removeChatUser(params: Params.MessagesRemoveChatUserParams): Promise<Responses.OkResponse>;
    /**
     * Restores a deleted message.
     */
    restore(params: Params.MessagesRestoreParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of the current user's private messages that match search criteria.
     */
    search(params: Params.MessagesSearchParams): Promise<Responses.MessagesSearchResponse>;
    /**
     * Returns a list of the current user's conversations that match search criteria.
     */
    searchConversations(params: Params.MessagesSearchConversationsParams): Promise<Responses.MessagesSearchConversationsResponse>;
    /**
     * Sends a message.
     */
    send(params: Params.MessagesSendParams): Promise<Responses.MessagesSendResponse>;
    /**
     * Changes the status of a user as typing in a conversation.
     */
    setActivity(params: Params.MessagesSetActivityParams): Promise<Responses.OkResponse>;
    /**
     * Sets a previously-uploaded picture as the cover picture of a chat.
     */
    setChatPhoto(params: Params.MessagesSetChatPhotoParams): Promise<Responses.MessagesSetChatPhotoResponse>;
    unpin(params: Params.MessagesUnpinParams): Promise<Responses.OkResponse>;
}

/**
 * The API newsfeed group
 */
export interface APINewsfeed {
    /**
     * Prevents news from specified users and communities from appearing in the current user's newsfeed.
     */
    addBan(params: Params.NewsfeedAddBanParams): Promise<Responses.OkResponse>;
    /**
     * Allows news from previously banned users and communities to be shown in the current user's newsfeed.
     */
    deleteBan(params: Params.NewsfeedDeleteBanParams): Promise<Responses.OkResponse>;
    deleteList(params: Params.NewsfeedDeleteListParams): Promise<Responses.OkResponse>;
    /**
     * Returns data required to show newsfeed for the current user.
     */
    get(params: Params.NewsfeedGetParams): Promise<Responses.NewsfeedGetResponse>;
    /**
     * Returns a list of users and communities banned from the current user's newsfeed.
     */
    getBanned(params: Params.NewsfeedGetBannedParams): Promise<Responses.NewsfeedGetBannedResponse>;
    /**
     * Returns a list of comments in the current user's newsfeed.
     */
    getComments(params: Params.NewsfeedGetCommentsParams): Promise<Responses.NewsfeedGetCommentsResponse>;
    /**
     * Returns a list of newsfeeds followed by the current user.
     */
    getLists(params: Params.NewsfeedGetListsParams): Promise<Responses.NewsfeedGetListsResponse>;
    /**
     * Returns a list of posts on user walls in which the current user is mentioned.
     */
    getMentions(params: Params.NewsfeedGetMentionsParams): Promise<Responses.NewsfeedGetMentionsResponse>;
    /**
     * , Returns a list of newsfeeds recommended to the current user.
     */
    getRecommended(params: Params.NewsfeedGetRecommendedParams): Promise<Responses.NewsfeedGetRecommendedResponse>;
    /**
     * Returns communities and users that current user is suggested to follow.
     */
    getSuggestedSources(params: Params.NewsfeedGetSuggestedSourcesParams): Promise<Responses.NewsfeedGetSuggestedSourcesResponse>;
    /**
     * Hides an item from the newsfeed.
     */
    ignoreItem(params: Params.NewsfeedIgnoreItemParams): Promise<Responses.OkResponse>;
    /**
     * Creates and edits user newsfeed lists
     */
    saveList(params: Params.NewsfeedSaveListParams): Promise<Responses.NewsfeedSaveListResponse>;
    /**
     * Returns search results by statuses.
     */
    search(params: Params.NewsfeedSearchParams): Promise<Responses.NewsfeedSearchResponse>;
    /**
     * Returns a hidden item to the newsfeed.
     */
    unignoreItem(params: Params.NewsfeedUnignoreItemParams): Promise<Responses.OkResponse>;
    /**
     * Unsubscribes the current user from specified newsfeeds.
     */
    unsubscribe(params: Params.NewsfeedUnsubscribeParams): Promise<Responses.OkResponse>;
}

/**
 * The API notes group
 */
export interface APINotes {
    /**
     * Creates a new note for the current user.
     */
    add(params: Params.NotesAddParams): Promise<Responses.NotesAddResponse>;
    /**
     * Adds a new comment on a note.
     */
    createComment(params: Params.NotesCreateCommentParams): Promise<Responses.NotesCreateCommentResponse>;
    /**
     * Deletes a note of the current user.
     */
    delete(params: Params.NotesDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a comment on a note.
     */
    deleteComment(params: Params.NotesDeleteCommentParams): Promise<Responses.OkResponse>;
    /**
     * Edits a note of the current user.
     */
    edit(params: Params.NotesEditParams): Promise<Responses.OkResponse>;
    /**
     * Edits a comment on a note.
     */
    editComment(params: Params.NotesEditCommentParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of notes created by a user.
     */
    get(params: Params.NotesGetParams): Promise<Responses.NotesGetResponse>;
    /**
     * Returns a note by its ID.
     */
    getById(params: Params.NotesGetByIdParams): Promise<Responses.NotesGetByIdResponse>;
    /**
     * Returns a list of comments on a note.
     */
    getComments(params: Params.NotesGetCommentsParams): Promise<Responses.NotesGetCommentsResponse>;
    /**
     * Restores a deleted comment on a note.
     */
    restoreComment(params: Params.NotesRestoreCommentParams): Promise<Responses.OkResponse>;
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
 * The API orders group
 */
export interface APIOrders {
    cancelSubscription(params: Params.OrdersCancelSubscriptionParams): Promise<Responses.OrdersCancelSubscriptionResponse>;
    /**
     * Changes order status.
     */
    changeState(params: Params.OrdersChangeStateParams): Promise<Responses.OrdersChangeStateResponse>;
    /**
     * Returns a list of orders.
     */
    get(params: Params.OrdersGetParams): Promise<Responses.OrdersGetResponse>;
    getAmount(params: Params.OrdersGetAmountParams): Promise<Responses.OrdersGetAmountResponse>;
    /**
     * Returns information about orders by their IDs.
     */
    getById(params: Params.OrdersGetByIdParams): Promise<Responses.OrdersGetByIdResponse>;
    getUserSubscriptionById(params: Params.OrdersGetUserSubscriptionByIdParams): Promise<Responses.OrdersGetUserSubscriptionByIdResponse>;
    getUserSubscriptions(params: Params.OrdersGetUserSubscriptionsParams): Promise<Responses.OrdersGetUserSubscriptionsResponse>;
    updateSubscription(params: Params.OrdersUpdateSubscriptionParams): Promise<Responses.OrdersUpdateSubscriptionResponse>;
}

/**
 * The API pages group
 */
export interface APIPages {
    /**
     * Allows to clear the cache of particular 'external' pages which may be attached to VK posts.
     */
    clearCache(params: Params.PagesClearCacheParams): Promise<Responses.OkResponse>;
    /**
     * Returns information about a wiki page.
     */
    get(params: Params.PagesGetParams): Promise<Responses.PagesGetResponse>;
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
     * Saves the text of a wiki page.
     */
    save(params: Params.PagesSaveParams): Promise<Responses.PagesSaveResponse>;
    /**
     * Saves modified read and edit access settings for a wiki page.
     */
    saveAccess(params: Params.PagesSaveAccessParams): Promise<Responses.PagesSaveAccessResponse>;
}

/**
 * The API photos group
 */
export interface APIPhotos {
    /**
     * Confirms a tag on a photo.
     */
    confirmTag(params: Params.PhotosConfirmTagParams): Promise<Responses.OkResponse>;
    /**
     * Allows to copy a photo to the "Saved photos" album
     */
    copy(params: Params.PhotosCopyParams): Promise<Responses.PhotosCopyResponse>;
    /**
     * Creates an empty photo album.
     */
    createAlbum(params: Params.PhotosCreateAlbumParams): Promise<Responses.PhotosCreateAlbumResponse>;
    /**
     * Adds a new comment on the photo.
     */
    createComment(params: Params.PhotosCreateCommentParams): Promise<Responses.PhotosCreateCommentResponse>;
    /**
     * Deletes a photo.
     */
    delete(params: Params.PhotosDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a photo album belonging to the current user.
     */
    deleteAlbum(params: Params.PhotosDeleteAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a comment on the photo.
     */
    deleteComment(params: Params.PhotosDeleteCommentParams): Promise<Responses.PhotosDeleteCommentResponse>;
    /**
     * Edits the caption of a photo.
     */
    edit(params: Params.PhotosEditParams): Promise<Responses.OkResponse>;
    /**
     * Edits information about a photo album.
     */
    editAlbum(params: Params.PhotosEditAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Edits a comment on a photo.
     */
    editComment(params: Params.PhotosEditCommentParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of a user's or community's photos.
     */
    get(params: Params.PhotosGetParams): Promise<Responses.PhotosGetResponse>;
    /**
     * Returns a list of a user's or community's photo albums.
     */
    getAlbums(params: Params.PhotosGetAlbumsParams): Promise<Responses.PhotosGetAlbumsResponse>;
    /**
     * Returns the number of photo albums belonging to a user or community.
     */
    getAlbumsCount(params: Params.PhotosGetAlbumsCountParams): Promise<Responses.PhotosGetAlbumsCountResponse>;
    /**
     * Returns a list of photos belonging to a user or community, in reverse chronological order.
     */
    getAll(params: Params.PhotosGetAllParams): Promise<Responses.PhotosGetAllResponse>;
    /**
     * Returns a list of comments on a specific photo album or all albums of the user sorted in reverse chronological order.
     */
    getAllComments(params: Params.PhotosGetAllCommentsParams): Promise<Responses.PhotosGetAllCommentsResponse>;
    /**
     * Returns information about photos by their IDs.
     */
    getById(params: Params.PhotosGetByIdParams): Promise<Responses.PhotosGetByIdResponse>;
    /**
     * Returns an upload link for chat cover pictures.
     */
    getChatUploadServer(params: Params.PhotosGetChatUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
    /**
     * Returns a list of comments on a photo.
     */
    getComments(params: Params.PhotosGetCommentsParams): Promise<Responses.PhotosGetCommentsResponse>;
    /**
     * Returns the server address for market album photo upload.
     */
    getMarketAlbumUploadServer(params: Params.PhotosGetMarketAlbumUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
    /**
     * Returns the server address for market photo upload.
     */
    getMarketUploadServer(params: Params.PhotosGetMarketUploadServerParams): Promise<Responses.PhotosGetMarketUploadServerResponse>;
    /**
     * Returns the server address for photo upload in a private message for a user.
     */
    getMessagesUploadServer(params: Params.PhotosGetMessagesUploadServerParams): Promise<Responses.PhotosGetMessagesUploadServerResponse>;
    /**
     * Returns a list of photos with tags that have not been viewed.
     */
    getNewTags(params: Params.PhotosGetNewTagsParams): Promise<Responses.PhotosGetNewTagsResponse>;
    /**
     * Returns the server address for owner cover upload.
     */
    getOwnerCoverPhotoUploadServer(params: Params.PhotosGetOwnerCoverPhotoUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
    /**
     * Returns an upload server address for a profile or community photo.
     */
    getOwnerPhotoUploadServer(params: Params.PhotosGetOwnerPhotoUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
    /**
     * Returns a list of tags on a photo.
     */
    getTags(params: Params.PhotosGetTagsParams): Promise<Responses.PhotosGetTagsResponse>;
    /**
     * Returns the server address for photo upload.
     */
    getUploadServer(params: Params.PhotosGetUploadServerParams): Promise<Responses.PhotosGetUploadServerResponse>;
    /**
     * Returns a list of photos in which a user is tagged.
     */
    getUserPhotos(params: Params.PhotosGetUserPhotosParams): Promise<Responses.PhotosGetUserPhotosResponse>;
    /**
     * Returns the server address for photo upload onto a user's wall.
     */
    getWallUploadServer(params: Params.PhotosGetWallUploadServerParams): Promise<Responses.PhotosGetWallUploadServerResponse>;
    /**
     * Makes a photo into an album cover.
     */
    makeCover(params: Params.PhotosMakeCoverParams): Promise<Responses.OkResponse>;
    /**
     * Moves a photo from one album to another.
     */
    move(params: Params.PhotosMoveParams): Promise<Responses.OkResponse>;
    /**
     * Adds a tag on the photo.
     */
    putTag(params: Params.PhotosPutTagParams): Promise<Responses.PhotosPutTagResponse>;
    /**
     * Removes a tag from a photo.
     */
    removeTag(params: Params.PhotosRemoveTagParams): Promise<Responses.OkResponse>;
    /**
     * Reorders the album in the list of user albums.
     */
    reorderAlbums(params: Params.PhotosReorderAlbumsParams): Promise<Responses.OkResponse>;
    /**
     * Reorders the photo in the list of photos of the user album.
     */
    reorderPhotos(params: Params.PhotosReorderPhotosParams): Promise<Responses.OkResponse>;
    /**
     * Reports (submits a complaint about) a photo.
     */
    report(params: Params.PhotosReportParams): Promise<Responses.OkResponse>;
    /**
     * Reports (submits a complaint about) a comment on a photo.
     */
    reportComment(params: Params.PhotosReportCommentParams): Promise<Responses.OkResponse>;
    /**
     * Restores a deleted photo.
     */
    restore(params: Params.PhotosRestoreParams): Promise<Responses.OkResponse>;
    /**
     * Restores a deleted comment on a photo.
     */
    restoreComment(params: Params.PhotosRestoreCommentParams): Promise<Responses.PhotosRestoreCommentResponse>;
    /**
     * Saves photos after successful uploading.
     */
    save(params: Params.PhotosSaveParams): Promise<Responses.PhotosSaveResponse>;
    /**
     * Saves market album photos after successful uploading.
     */
    saveMarketAlbumPhoto(params: Params.PhotosSaveMarketAlbumPhotoParams): Promise<Responses.PhotosSaveMarketAlbumPhotoResponse>;
    /**
     * Saves market photos after successful uploading.
     */
    saveMarketPhoto(params: Params.PhotosSaveMarketPhotoParams): Promise<Responses.PhotosSaveMarketPhotoResponse>;
    /**
     * Saves a photo after being successfully uploaded. URL obtained with [vk.com/dev/photos.getMessagesUploadServer|photos.getMessagesUploadServer] method.
     */
    saveMessagesPhoto(params: Params.PhotosSaveMessagesPhotoParams): Promise<Responses.PhotosSaveMessagesPhotoResponse>;
    /**
     * Saves cover photo after successful uploading.
     */
    saveOwnerCoverPhoto(params: Params.PhotosSaveOwnerCoverPhotoParams): Promise<Responses.PhotosSaveOwnerCoverPhotoResponse>;
    /**
     * Saves a profile or community photo. Upload URL can be got with the [vk.com/dev/photos.getOwnerPhotoUploadServer|photos.getOwnerPhotoUploadServer] method.
     */
    saveOwnerPhoto(params: Params.PhotosSaveOwnerPhotoParams): Promise<Responses.PhotosSaveOwnerPhotoResponse>;
    /**
     * Saves a photo to a user's or community's wall after being uploaded.
     */
    saveWallPhoto(params: Params.PhotosSaveWallPhotoParams): Promise<Responses.PhotosSaveWallPhotoResponse>;
    /**
     * Returns a list of photos.
     */
    search(params: Params.PhotosSearchParams): Promise<Responses.PhotosSearchResponse>;
}

/**
 * The API polls group
 */
export interface APIPolls {
    /**
     * Adds the current user's vote to the selected answer in the poll.
     */
    addVote(params: Params.PollsAddVoteParams): Promise<Responses.PollsAddVoteResponse>;
    /**
     * Creates polls that can be attached to the users' or communities' posts.
     */
    create(params: Params.PollsCreateParams): Promise<Responses.PollsCreateResponse>;
    /**
     * Deletes the current user's vote from the selected answer in the poll.
     */
    deleteVote(params: Params.PollsDeleteVoteParams): Promise<Responses.PollsDeleteVoteResponse>;
    /**
     * Edits created polls
     */
    edit(params: Params.PollsEditParams): Promise<Responses.OkResponse>;
    /**
     * Returns detailed information about a poll by its ID.
     */
    getById(params: Params.PollsGetByIdParams): Promise<Responses.PollsGetByIdResponse>;
    /**
     * Returns a list of IDs of users who selected specific answers in the poll.
     */
    getVoters(params: Params.PollsGetVotersParams): Promise<Responses.PollsGetVotersResponse>;
}

/**
 * The API prettyCards group
 */
export interface APIPrettyCards {
    create(params: Params.PrettyCardsCreateParams): Promise<Responses.PrettyCardsCreateResponse>;
    delete(params: Params.PrettyCardsDeleteParams): Promise<Responses.PrettyCardsDeleteResponse>;
    edit(params: Params.PrettyCardsEditParams): Promise<Responses.PrettyCardsEditResponse>;
    get(params: Params.PrettyCardsGetParams): Promise<Responses.PrettyCardsGetResponse>;
    getById(params: Params.PrettyCardsGetByIdParams): Promise<Responses.PrettyCardsGetByIdResponse>;
    getUploadURL(params: Params.PrettyCardsGetUploadURLParams): Promise<Responses.PrettyCardsGetUploadURLResponse>;
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
 * The API secure group
 */
export interface APISecure {
    /**
     * Adds user activity information to an application
     */
    addAppEvent(params: Params.SecureAddAppEventParams): Promise<Responses.OkResponse>;
    /**
     * Checks the user authentication in 'IFrame' and 'Flash' apps using the 'access_token' parameter.
     */
    checkToken(params: Params.SecureCheckTokenParams): Promise<Responses.SecureCheckTokenResponse>;
    /**
     * Returns payment balance of the application in hundredth of a vote.
     */
    getAppBalance(params: Params.SecureGetAppBalanceParams): Promise<Responses.SecureGetAppBalanceResponse>;
    /**
     * Shows a list of SMS notifications sent by the application using [vk.com/dev/secure.sendSMSNotification|secure.sendSMSNotification] method.
     */
    getSMSHistory(params: Params.SecureGetSMSHistoryParams): Promise<Responses.SecureGetSmsHistoryResponse>;
    /**
     * Shows history of votes transaction between users and the application.
     */
    getTransactionsHistory(params: Params.SecureGetTransactionsHistoryParams): Promise<Responses.SecureGetTransactionsHistoryResponse>;
    /**
     * Returns one of the previously set game levels of one or more users in the application.
     */
    getUserLevel(params: Params.SecureGetUserLevelParams): Promise<Responses.SecureGetUserLevelResponse>;
    /**
     * Opens the game achievement and gives the user a sticker
     */
    giveEventSticker(params: Params.SecureGiveEventStickerParams): Promise<Responses.SecureGiveEventStickerResponse>;
    /**
     * Sends notification to the user.
     */
    sendNotification(params: Params.SecureSendNotificationParams): Promise<Responses.SecureSendNotificationResponse>;
    /**
     * Sends 'SMS' notification to a user's mobile device.
     */
    sendSMSNotification(params: Params.SecureSendSMSNotificationParams): Promise<Responses.OkResponse>;
    /**
     * Sets a counter which is shown to the user in bold in the left menu.
     */
    setCounter(params: Params.SecureSetCounterParams): Promise<Responses.OkResponse>;
}

/**
 * The API stats group
 */
export interface APIStats {
    /**
     * Returns statistics of a community or an application.
     */
    get(params: Params.StatsGetParams): Promise<Responses.StatsGetResponse>;
    /**
     * Returns stats for a wall post.
     */
    getPostReach(params: Params.StatsGetPostReachParams): Promise<Responses.StatsGetPostReachResponse>;
    trackVisitor(params: Params.StatsTrackVisitorParams): Promise<Responses.OkResponse>;
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
 * The API storage group
 */
export interface APIStorage {
    /**
     * Returns a value of variable with the name set by key parameter.
     */
    get(params: Params.StorageGetParams): Promise<Responses.StorageGetResponse>;
    /**
     * Returns the names of all variables.
     */
    getKeys(params: Params.StorageGetKeysParams): Promise<Responses.StorageGetKeysResponse>;
    /**
     * Saves a value of variable with the name set by 'key' parameter.
     */
    set(params: Params.StorageSetParams): Promise<Responses.OkResponse>;
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
 * The API streaming group
 */
export interface APIStreaming {
    /**
     * Allows to receive data for the connection to Streaming API.
     */
    getServerUrl(params: Params.StreamingGetServerUrlParams): Promise<Responses.StreamingGetServerUrlResponse>;
    setSettings(params: Params.StreamingSetSettingsParams): Promise<Responses.OkResponse>;
}

/**
 * The API users group
 */
export interface APIUsers {
    /**
     * Returns detailed information on users.
     */
    get(params: Params.UsersGetParams): Promise<Responses.UsersGetResponse>;
    /**
     * Returns a list of IDs of followers of the user in question, sorted by date added, most recent first.
     */
    getFollowers(params: Params.UsersGetFollowersParams): Promise<Responses.UsersGetFollowersResponse>;
    /**
     * Returns a list of IDs of users and communities followed by the user.
     */
    getSubscriptions(params: Params.UsersGetSubscriptionsParams): Promise<Responses.UsersGetSubscriptionsResponse>;
    /**
     * Returns information whether a user installed the application.
     */
    isAppUser(params: Params.UsersIsAppUserParams): Promise<Responses.UsersIsAppUserResponse>;
    /**
     * Reports (submits a complain about) a user.
     */
    report(params: Params.UsersReportParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of users matching the search criteria.
     */
    search(params: Params.UsersSearchParams): Promise<Responses.UsersSearchResponse>;
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
     * Returns the current time of the VK server.
     */
    getServerTime(params: Params.UtilsGetServerTimeParams): Promise<Responses.UtilsGetServerTimeResponse>;
    /**
     * Allows to receive a link shortened via vk.cc.
     */
    getShortLink(params: Params.UtilsGetShortLinkParams): Promise<Responses.UtilsGetShortLinkResponse>;
    /**
     * Detects a type of object (e.g., user, community, application) and its ID by screen name.
     */
    resolveScreenName(params: Params.UtilsResolveScreenNameParams): Promise<Responses.UtilsResolveScreenNameResponse>;
}

/**
 * The API video group
 */
export interface APIVideo {
    /**
     * Adds a video to a user or community page.
     */
    add(params: Params.VideoAddParams): Promise<Responses.OkResponse>;
    /**
     * Creates an empty album for videos.
     */
    addAlbum(params: Params.VideoAddAlbumParams): Promise<Responses.VideoAddAlbumResponse>;
    addToAlbum(params: Params.VideoAddToAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Adds a new comment on a video.
     */
    createComment(params: Params.VideoCreateCommentParams): Promise<Responses.VideoCreateCommentResponse>;
    /**
     * Deletes a video from a user or community page.
     */
    delete(params: Params.VideoDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a video album.
     */
    deleteAlbum(params: Params.VideoDeleteAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a comment on a video.
     */
    deleteComment(params: Params.VideoDeleteCommentParams): Promise<Responses.OkResponse>;
    /**
     * Edits information about a video on a user or community page.
     */
    edit(params: Params.VideoEditParams): Promise<Responses.OkResponse>;
    /**
     * Edits the title of a video album.
     */
    editAlbum(params: Params.VideoEditAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Edits the text of a comment on a video.
     */
    editComment(params: Params.VideoEditCommentParams): Promise<Responses.OkResponse>;
    /**
     * Returns detailed information about videos.
     */
    get(params: Params.VideoGetParams): Promise<Responses.VideoGetResponse>;
    /**
     * Returns video album info
     */
    getAlbumById(params: Params.VideoGetAlbumByIdParams): Promise<Responses.VideoGetAlbumByIdResponse>;
    /**
     * Returns a list of video albums owned by a user or community.
     */
    getAlbums(params: Params.VideoGetAlbumsParams): Promise<Responses.VideoGetAlbumsResponse>;
    getAlbumsByVideo(params: Params.VideoGetAlbumsByVideoParams): Promise<Responses.VideoGetAlbumsByVideoResponse>;
    /**
     * Returns a list of comments on a video.
     */
    getComments(params: Params.VideoGetCommentsParams): Promise<Responses.VideoGetCommentsResponse>;
    removeFromAlbum(params: Params.VideoRemoveFromAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Reorders the album in the list of user video albums.
     */
    reorderAlbums(params: Params.VideoReorderAlbumsParams): Promise<Responses.OkResponse>;
    /**
     * Reorders the video in the video album.
     */
    reorderVideos(params: Params.VideoReorderVideosParams): Promise<Responses.OkResponse>;
    /**
     * Reports (submits a complaint about) a video.
     */
    report(params: Params.VideoReportParams): Promise<Responses.OkResponse>;
    /**
     * Reports (submits a complaint about) a comment on a video.
     */
    reportComment(params: Params.VideoReportCommentParams): Promise<Responses.OkResponse>;
    /**
     * Restores a previously deleted video.
     */
    restore(params: Params.VideoRestoreParams): Promise<Responses.OkResponse>;
    /**
     * Restores a previously deleted comment on a video.
     */
    restoreComment(params: Params.VideoRestoreCommentParams): Promise<Responses.VideoRestoreCommentResponse>;
    /**
     * Returns a server address (required for upload) and video data.
     */
    save(params: Params.VideoSaveParams): Promise<Responses.VideoSaveResponse>;
    /**
     * Returns a list of videos under the set search criterion.
     */
    search(params: Params.VideoSearchParams): Promise<Responses.VideoSearchResponse>;
}

/**
 * The API wall group
 */
export interface APIWall {
    closeComments(params: Params.WallCloseCommentsParams): Promise<Responses.BaseBoolResponse>;
    /**
     * Adds a comment to a post on a user wall or community wall.
     */
    createComment(params: Params.WallCreateCommentParams): Promise<Responses.WallCreateCommentResponse>;
    /**
     * Deletes a post from a user wall or community wall.
     */
    delete(params: Params.WallDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a comment on a post on a user wall or community wall.
     */
    deleteComment(params: Params.WallDeleteCommentParams): Promise<Responses.OkResponse>;
    /**
     * Edits a post on a user wall or community wall.
     */
    edit(params: Params.WallEditParams): Promise<Responses.OkResponse>;
    /**
     * Allows to edit hidden post.
     */
    editAdsStealth(params: Params.WallEditAdsStealthParams): Promise<Responses.OkResponse>;
    /**
     * Edits a comment on a user wall or community wall.
     */
    editComment(params: Params.WallEditCommentParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of posts on a user wall or community wall.
     */
    get(params: Params.WallGetParams): Promise<Responses.WallGetResponse>;
    /**
     * Returns a list of posts from user or community walls by their IDs.
     */
    getById(params: Params.WallGetByIdParams): Promise<Responses.WallGetByIdResponse>;
    /**
     * Returns a list of comments on a post on a user wall or community wall.
     */
    getComments(params: Params.WallGetCommentsParams): Promise<Responses.WallGetCommentsResponse>;
    /**
     * Returns information about reposts of a post on user wall or community wall.
     */
    getReposts(params: Params.WallGetRepostsParams): Promise<Responses.WallGetRepostsResponse>;
    openComments(params: Params.WallOpenCommentsParams): Promise<Responses.BaseBoolResponse>;
    /**
     * Pins the post on wall.
     */
    pin(params: Params.WallPinParams): Promise<Responses.OkResponse>;
    /**
     * Adds a new post on a user wall or community wall. Can also be used to publish suggested or scheduled posts.
     */
    post(params: Params.WallPostParams): Promise<Responses.WallPostResponse>;
    /**
     * Allows to create hidden post which will not be shown on the community's wall and can be used for creating an ad with type "Community post".
     */
    postAdsStealth(params: Params.WallPostAdsStealthParams): Promise<Responses.WallPostAdsStealthResponse>;
    /**
     * Reports (submits a complaint about) a comment on a post on a user wall or community wall.
     */
    reportComment(params: Params.WallReportCommentParams): Promise<Responses.OkResponse>;
    /**
     * Reports (submits a complaint about) a post on a user wall or community wall.
     */
    reportPost(params: Params.WallReportPostParams): Promise<Responses.OkResponse>;
    /**
     * Reposts (copies) an object to a user wall or community wall.
     */
    repost(params: Params.WallRepostParams): Promise<Responses.WallRepostResponse>;
    /**
     * Restores a post deleted from a user wall or community wall.
     */
    restore(params: Params.WallRestoreParams): Promise<Responses.OkResponse>;
    /**
     * Restores a comment deleted from a user wall or community wall.
     */
    restoreComment(params: Params.WallRestoreCommentParams): Promise<Responses.OkResponse>;
    /**
     * Allows to search posts on user or community walls.
     */
    search(params: Params.WallSearchParams): Promise<Responses.WallSearchResponse>;
    /**
     * Unpins the post on wall.
     */
    unpin(params: Params.WallUnpinParams): Promise<Responses.OkResponse>;
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

export class APIMethods {
    /**
     * The API account group
     */
    account: APIAccount;
    /**
     * The API ads group
     */
    ads: APIAds;
    /**
     * The API apps group
     */
    apps: APIApps;
    /**
     * The API auth group
     */
    auth: APIAuth;
    /**
     * The API board group
     */
    board: APIBoard;
    /**
     * The API database group
     */
    database: APIDatabase;
    /**
     * The API docs group
     */
    docs: APIDocs;
    /**
     * The API fave group
     */
    fave: APIFave;
    /**
     * The API friends group
     */
    friends: APIFriends;
    /**
     * The API gifts group
     */
    gifts: APIGifts;
    /**
     * The API groups group
     */
    groups: APIGroups;
    /**
     * The API leads group
     */
    leads: APILeads;
    /**
     * The API likes group
     */
    likes: APILikes;
    /**
     * The API market group
     */
    market: APIMarket;
    /**
     * The API messages group
     */
    messages: APIMessages;
    /**
     * The API newsfeed group
     */
    newsfeed: APINewsfeed;
    /**
     * The API notes group
     */
    notes: APINotes;
    /**
     * The API notifications group
     */
    notifications: APINotifications;
    /**
     * The API orders group
     */
    orders: APIOrders;
    /**
     * The API pages group
     */
    pages: APIPages;
    /**
     * The API photos group
     */
    photos: APIPhotos;
    /**
     * The API polls group
     */
    polls: APIPolls;
    /**
     * The API prettyCards group
     */
    prettyCards: APIPrettyCards;
    /**
     * The API search group
     */
    search: APISearch;
    /**
     * The API secure group
     */
    secure: APISecure;
    /**
     * The API stats group
     */
    stats: APIStats;
    /**
     * The API status group
     */
    status: APIStatus;
    /**
     * The API storage group
     */
    storage: APIStorage;
    /**
     * The API stories group
     */
    stories: APIStories;
    /**
     * The API streaming group
     */
    streaming: APIStreaming;
    /**
     * The API users group
     */
    users: APIUsers;
    /**
     * The API utils group
     */
    utils: APIUtils;
    /**
     * The API video group
     */
    video: APIVideo;
    /**
     * The API wall group
     */
    wall: APIWall;
    /**
     * The API widgets group
     */
    widgets: APIWidgets;
}

