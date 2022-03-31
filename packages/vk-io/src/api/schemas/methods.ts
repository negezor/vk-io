// @ts-ignore
/* eslint-disable */
// @ts-ignore
import * as Params from "./params";
// @ts-ignore

// @ts-ignore
import * as Responses from "./responses";
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API account group
// @ts-ignore
 */
// @ts-ignore
export interface APIAccount {
// @ts-ignore
    ban(params: Params.AccountBanParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Changes a user password after access is successfully restored with the [vk.com/dev/auth.restore|auth.restore] method.
// @ts-ignore
     */
// @ts-ignore
    changePassword(params: Params.AccountChangePasswordParams): Promise<Responses.AccountChangePasswordResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of active ads (offers) which executed by the user will bring him/her respective number of votes to his balance in the application.
// @ts-ignore
     */
// @ts-ignore
    getActiveOffers(params: Params.AccountGetActiveOffersParams): Promise<Responses.AccountGetActiveOffersResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Gets settings of the user in this application.
// @ts-ignore
     */
// @ts-ignore
    getAppPermissions(params: Params.AccountGetAppPermissionsParams): Promise<Responses.AccountGetAppPermissionsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a user's blacklist.
// @ts-ignore
     */
// @ts-ignore
    getBanned(params: Params.AccountGetBannedParams): Promise<Responses.AccountGetBannedResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns non-null values of user counters.
// @ts-ignore
     */
// @ts-ignore
    getCounters(params: Params.AccountGetCountersParams): Promise<Responses.AccountGetCountersResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns current account info.
// @ts-ignore
     */
// @ts-ignore
    getInfo(params: Params.AccountGetInfoParams): Promise<Responses.AccountGetInfoResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns the current account info.
// @ts-ignore
     */
// @ts-ignore
    getProfileInfo(params: Params.AccountGetProfileInfoParams): Promise<Responses.AccountGetProfileInfoResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Gets settings of push notifications.
// @ts-ignore
     */
// @ts-ignore
    getPushSettings(params: Params.AccountGetPushSettingsParams): Promise<Responses.AccountGetPushSettingsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Subscribes an iOS/Android/Windows Phone-based device to receive push notifications
// @ts-ignore
     */
// @ts-ignore
    registerDevice(params: Params.AccountRegisterDeviceParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits current profile info.
// @ts-ignore
     */
// @ts-ignore
    saveProfileInfo(params: Params.AccountSaveProfileInfoParams): Promise<Responses.AccountSaveProfileInfoResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to edit the current account info.
// @ts-ignore
     */
// @ts-ignore
    setInfo(params: Params.AccountSetInfoParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Marks a current user as offline.
// @ts-ignore
     */
// @ts-ignore
    setOffline(params: Params.AccountSetOfflineParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Marks the current user as online for 15 minutes.
// @ts-ignore
     */
// @ts-ignore
    setOnline(params: Params.AccountSetOnlineParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Change push settings.
// @ts-ignore
     */
// @ts-ignore
    setPushSettings(params: Params.AccountSetPushSettingsParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Mutes push notifications for the set period of time.
// @ts-ignore
     */
// @ts-ignore
    setSilenceMode(params: Params.AccountSetSilenceModeParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    unban(params: Params.AccountUnbanParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Unsubscribes a device from push notifications.
// @ts-ignore
     */
// @ts-ignore
    unregisterDevice(params: Params.AccountUnregisterDeviceParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API ads group
// @ts-ignore
 */
// @ts-ignore
export interface APIAds {
// @ts-ignore
    /**
// @ts-ignore
     * Adds managers and/or supervisors to advertising account.
// @ts-ignore
     */
// @ts-ignore
    addOfficeUsers(params: Params.AdsAddOfficeUsersParams): Promise<Responses.AdsAddOfficeUsersResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to check the ad link.
// @ts-ignore
     */
// @ts-ignore
    checkLink(params: Params.AdsCheckLinkParams): Promise<Responses.AdsCheckLinkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Creates ads.
// @ts-ignore
     */
// @ts-ignore
    createAds(params: Params.AdsCreateAdsParams): Promise<Responses.AdsCreateAdsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Creates advertising campaigns.
// @ts-ignore
     */
// @ts-ignore
    createCampaigns(params: Params.AdsCreateCampaignsParams): Promise<Responses.AdsCreateCampaignsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Creates clients of an advertising agency.
// @ts-ignore
     */
// @ts-ignore
    createClients(params: Params.AdsCreateClientsParams): Promise<Responses.AdsCreateClientsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Creates a group to re-target ads for users who visited advertiser's site (viewed information about the product, registered, etc.).
// @ts-ignore
     */
// @ts-ignore
    createTargetGroup(params: Params.AdsCreateTargetGroupParams): Promise<Responses.AdsCreateTargetGroupResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Archives ads.
// @ts-ignore
     */
// @ts-ignore
    deleteAds(params: Params.AdsDeleteAdsParams): Promise<Responses.AdsDeleteAdsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Archives advertising campaigns.
// @ts-ignore
     */
// @ts-ignore
    deleteCampaigns(params: Params.AdsDeleteCampaignsParams): Promise<Responses.AdsDeleteCampaignsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Archives clients of an advertising agency.
// @ts-ignore
     */
// @ts-ignore
    deleteClients(params: Params.AdsDeleteClientsParams): Promise<Responses.AdsDeleteClientsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes a retarget group.
// @ts-ignore
     */
// @ts-ignore
    deleteTargetGroup(params: Params.AdsDeleteTargetGroupParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of advertising accounts.
// @ts-ignore
     */
// @ts-ignore
    getAccounts(params: Params.AdsGetAccountsParams): Promise<Responses.AdsGetAccountsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns number of ads.
// @ts-ignore
     */
// @ts-ignore
    getAds(params: Params.AdsGetAdsParams): Promise<Responses.AdsGetAdsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns descriptions of ad layouts.
// @ts-ignore
     */
// @ts-ignore
    getAdsLayout(params: Params.AdsGetAdsLayoutParams): Promise<Responses.AdsGetAdsLayoutResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns ad targeting parameters.
// @ts-ignore
     */
// @ts-ignore
    getAdsTargeting(params: Params.AdsGetAdsTargetingParams): Promise<Responses.AdsGetAdsTargetingResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns current budget of the advertising account.
// @ts-ignore
     */
// @ts-ignore
    getBudget(params: Params.AdsGetBudgetParams): Promise<Responses.AdsGetBudgetResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of campaigns in an advertising account.
// @ts-ignore
     */
// @ts-ignore
    getCampaigns(params: Params.AdsGetCampaignsParams): Promise<Responses.AdsGetCampaignsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of possible ad categories.
// @ts-ignore
     */
// @ts-ignore
    getCategories(params: Params.AdsGetCategoriesParams): Promise<Responses.AdsGetCategoriesResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of advertising agency's clients.
// @ts-ignore
     */
// @ts-ignore
    getClients(params: Params.AdsGetClientsParams): Promise<Responses.AdsGetClientsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns demographics for ads or campaigns.
// @ts-ignore
     */
// @ts-ignore
    getDemographics(params: Params.AdsGetDemographicsParams): Promise<Responses.AdsGetDemographicsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns information about current state of a counter — number of remaining runs of methods and time to the next counter nulling in seconds.
// @ts-ignore
     */
// @ts-ignore
    getFloodStats(params: Params.AdsGetFloodStatsParams): Promise<Responses.AdsGetFloodStatsResponse>;
// @ts-ignore
    getLookalikeRequests(params: Params.AdsGetLookalikeRequestsParams): Promise<Responses.AdsGetLookalikeRequestsResponse>;
// @ts-ignore
    getMusicians(params: Params.AdsGetMusiciansParams): Promise<Responses.AdsGetMusiciansResponse>;
// @ts-ignore
    getMusiciansByIds(params: Params.AdsGetMusiciansByIdsParams): Promise<Responses.AdsGetMusiciansResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of managers and supervisors of advertising account.
// @ts-ignore
     */
// @ts-ignore
    getOfficeUsers(params: Params.AdsGetOfficeUsersParams): Promise<Responses.AdsGetOfficeUsersResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns detailed statistics of promoted posts reach from campaigns and ads.
// @ts-ignore
     */
// @ts-ignore
    getPostsReach(params: Params.AdsGetPostsReachParams): Promise<Responses.AdsGetPostsReachResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a reason of ad rejection for pre-moderation.
// @ts-ignore
     */
// @ts-ignore
    getRejectionReason(params: Params.AdsGetRejectionReasonParams): Promise<Responses.AdsGetRejectionReasonResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns statistics of performance indicators for ads, campaigns, clients or the whole account.
// @ts-ignore
     */
// @ts-ignore
    getStatistics(params: Params.AdsGetStatisticsParams): Promise<Responses.AdsGetStatisticsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a set of auto-suggestions for various targeting parameters.
// @ts-ignore
     */
// @ts-ignore
    getSuggestions(params: Params.AdsGetSuggestionsParams): Promise<Responses.AdsGetSuggestionsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of target groups.
// @ts-ignore
     */
// @ts-ignore
    getTargetGroups(params: Params.AdsGetTargetGroupsParams): Promise<Responses.AdsGetTargetGroupsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns the size of targeting audience, and also recommended values for CPC and CPM.
// @ts-ignore
     */
// @ts-ignore
    getTargetingStats(params: Params.AdsGetTargetingStatsParams): Promise<Responses.AdsGetTargetingStatsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns URL to upload an ad photo to.
// @ts-ignore
     */
// @ts-ignore
    getUploadURL(params: Params.AdsGetUploadURLParams): Promise<Responses.AdsGetUploadURLResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns URL to upload an ad video to.
// @ts-ignore
     */
// @ts-ignore
    getVideoUploadURL(params: Params.AdsGetVideoUploadURLParams): Promise<Responses.AdsGetVideoUploadURLResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Imports a list of advertiser's contacts to count VK registered users against the target group.
// @ts-ignore
     */
// @ts-ignore
    importTargetContacts(params: Params.AdsImportTargetContactsParams): Promise<Responses.AdsImportTargetContactsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Removes managers and/or supervisors from advertising account.
// @ts-ignore
     */
// @ts-ignore
    removeOfficeUsers(params: Params.AdsRemoveOfficeUsersParams): Promise<Responses.AdsRemoveOfficeUsersResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits ads.
// @ts-ignore
     */
// @ts-ignore
    updateAds(params: Params.AdsUpdateAdsParams): Promise<Responses.AdsUpdateAdsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits advertising campaigns.
// @ts-ignore
     */
// @ts-ignore
    updateCampaigns(params: Params.AdsUpdateCampaignsParams): Promise<Responses.AdsUpdateCampaignsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits clients of an advertising agency.
// @ts-ignore
     */
// @ts-ignore
    updateClients(params: Params.AdsUpdateClientsParams): Promise<Responses.AdsUpdateClientsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Adds managers and/or supervisors to advertising account.
// @ts-ignore
     */
// @ts-ignore
    updateOfficeUsers(params: Params.AdsUpdateOfficeUsersParams): Promise<Responses.AdsUpdateOfficeUsersResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits a retarget group.
// @ts-ignore
     */
// @ts-ignore
    updateTargetGroup(params: Params.AdsUpdateTargetGroupParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API adsweb group
// @ts-ignore
 */
// @ts-ignore
export interface APIAdsweb {
// @ts-ignore
    getAdCategories(params: Params.AdswebGetAdCategoriesParams): Promise<Responses.AdswebGetAdCategoriesResponse>;
// @ts-ignore
    getAdUnitCode(params: Params.AdswebGetAdUnitCodeParams): Promise<Responses.AdswebGetAdUnitCodeResponse>;
// @ts-ignore
    getAdUnits(params: Params.AdswebGetAdUnitsParams): Promise<Responses.AdswebGetAdUnitsResponse>;
// @ts-ignore
    getFraudHistory(params: Params.AdswebGetFraudHistoryParams): Promise<Responses.AdswebGetFraudHistoryResponse>;
// @ts-ignore
    getSites(params: Params.AdswebGetSitesParams): Promise<Responses.AdswebGetSitesResponse>;
// @ts-ignore
    getStatistics(params: Params.AdswebGetStatisticsParams): Promise<Responses.AdswebGetStatisticsResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API appWidgets group
// @ts-ignore
 */
// @ts-ignore
export interface APIAppWidgets {
// @ts-ignore
    /**
// @ts-ignore
     * Returns a URL for uploading a photo to the community collection for community app widgets
// @ts-ignore
     */
// @ts-ignore
    getAppImageUploadServer(params: Params.AppWidgetsGetAppImageUploadServerParams): Promise<Responses.AppWidgetsGetAppImageUploadServerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns an app collection of images for community app widgets
// @ts-ignore
     */
// @ts-ignore
    getAppImages(params: Params.AppWidgetsGetAppImagesParams): Promise<Responses.AppWidgetsGetAppImagesResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a URL for uploading a photo to the community collection for community app widgets
// @ts-ignore
     */
// @ts-ignore
    getGroupImageUploadServer(params: Params.AppWidgetsGetGroupImageUploadServerParams): Promise<Responses.AppWidgetsGetGroupImageUploadServerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a community collection of images for community app widgets
// @ts-ignore
     */
// @ts-ignore
    getGroupImages(params: Params.AppWidgetsGetGroupImagesParams): Promise<Responses.AppWidgetsGetGroupImagesResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns an image for community app widgets by its ID
// @ts-ignore
     */
// @ts-ignore
    getImagesById(params: Params.AppWidgetsGetImagesByIdParams): Promise<Responses.AppWidgetsGetImagesByIdResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to save image into app collection for community app widgets
// @ts-ignore
     */
// @ts-ignore
    saveAppImage(params: Params.AppWidgetsSaveAppImageParams): Promise<Responses.AppWidgetsSaveAppImageResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to save image into community collection for community app widgets
// @ts-ignore
     */
// @ts-ignore
    saveGroupImage(params: Params.AppWidgetsSaveGroupImageParams): Promise<Responses.AppWidgetsSaveGroupImageResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to update community app widget
// @ts-ignore
     */
// @ts-ignore
    update(params: Params.AppWidgetsUpdateParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API apps group
// @ts-ignore
 */
// @ts-ignore
export interface APIApps {
// @ts-ignore
    /**
// @ts-ignore
     * Deletes all request notifications from the current app.
// @ts-ignore
     */
// @ts-ignore
    deleteAppRequests(params: Params.AppsDeleteAppRequestsParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns applications data.
// @ts-ignore
     */
// @ts-ignore
    get(params: Params.AppsGetParams): Promise<Responses.AppsGetResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of applications (apps) available to users in the App Catalog.
// @ts-ignore
     */
// @ts-ignore
    getCatalog(params: Params.AppsGetCatalogParams): Promise<Responses.AppsGetCatalogResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Creates friends list for requests and invites in current app.
// @ts-ignore
     */
// @ts-ignore
    getFriendsList(params: Params.AppsGetFriendsListParams): Promise<Responses.AppsGetFriendsListResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns players rating in the game.
// @ts-ignore
     */
// @ts-ignore
    getLeaderboard(params: Params.AppsGetLeaderboardParams): Promise<Responses.AppsGetLeaderboardResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns policies and terms given to a mini app.
// @ts-ignore
     */
// @ts-ignore
    getMiniAppPolicies(params: Params.AppsGetMiniAppPoliciesParams): Promise<Responses.AppsGetMiniAppPoliciesResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns scopes for auth
// @ts-ignore
     */
// @ts-ignore
    getScopes(params: Params.AppsGetScopesParams): Promise<Responses.AppsGetScopesResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns user score in app
// @ts-ignore
     */
// @ts-ignore
    getScore(params: Params.AppsGetScoreParams): Promise<Responses.AppsGetScoreResponse>;
// @ts-ignore
    promoHasActiveGift(params: Params.AppsPromoHasActiveGiftParams): Promise<Responses.BaseBoolResponse>;
// @ts-ignore
    promoUseGift(params: Params.AppsPromoUseGiftParams): Promise<Responses.BaseBoolResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Sends a request to another user in an app that uses VK authorization.
// @ts-ignore
     */
// @ts-ignore
    sendRequest(params: Params.AppsSendRequestParams): Promise<Responses.AppsSendRequestResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API auth group
// @ts-ignore
 */
// @ts-ignore
export interface APIAuth {
// @ts-ignore
    /**
// @ts-ignore
     * Allows to restore account access using a code received via SMS. " This method is only available for apps with [vk.com/dev/auth_direct|Direct authorization] access. "
// @ts-ignore
     */
// @ts-ignore
    restore(params: Params.AuthRestoreParams): Promise<Responses.AuthRestoreResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API board group
// @ts-ignore
 */
// @ts-ignore
export interface APIBoard {
// @ts-ignore
    /**
// @ts-ignore
     * Creates a new topic on a community's discussion board.
// @ts-ignore
     */
// @ts-ignore
    addTopic(params: Params.BoardAddTopicParams): Promise<Responses.BoardAddTopicResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Closes a topic on a community's discussion board so that comments cannot be posted.
// @ts-ignore
     */
// @ts-ignore
    closeTopic(params: Params.BoardCloseTopicParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Adds a comment on a topic on a community's discussion board.
// @ts-ignore
     */
// @ts-ignore
    createComment(params: Params.BoardCreateCommentParams): Promise<Responses.BoardCreateCommentResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes a comment on a topic on a community's discussion board.
// @ts-ignore
     */
// @ts-ignore
    deleteComment(params: Params.BoardDeleteCommentParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes a topic from a community's discussion board.
// @ts-ignore
     */
// @ts-ignore
    deleteTopic(params: Params.BoardDeleteTopicParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits a comment on a topic on a community's discussion board.
// @ts-ignore
     */
// @ts-ignore
    editComment(params: Params.BoardEditCommentParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits the title of a topic on a community's discussion board.
// @ts-ignore
     */
// @ts-ignore
    editTopic(params: Params.BoardEditTopicParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Pins a topic (fixes its place) to the top of a community's discussion board.
// @ts-ignore
     */
// @ts-ignore
    fixTopic(params: Params.BoardFixTopicParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of comments on a topic on a community's discussion board.
// @ts-ignore
     */
// @ts-ignore
    getComments(params: Params.BoardGetCommentsParams): Promise<Responses.BoardGetCommentsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of topics on a community's discussion board.
// @ts-ignore
     */
// @ts-ignore
    getTopics(params: Params.BoardGetTopicsParams): Promise<Responses.BoardGetTopicsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Re-opens a previously closed topic on a community's discussion board.
// @ts-ignore
     */
// @ts-ignore
    openTopic(params: Params.BoardOpenTopicParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Restores a comment deleted from a topic on a community's discussion board.
// @ts-ignore
     */
// @ts-ignore
    restoreComment(params: Params.BoardRestoreCommentParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Unpins a pinned topic from the top of a community's discussion board.
// @ts-ignore
     */
// @ts-ignore
    unfixTopic(params: Params.BoardUnfixTopicParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API database group
// @ts-ignore
 */
// @ts-ignore
export interface APIDatabase {
// @ts-ignore
    /**
// @ts-ignore
     * Returns list of chairs on a specified faculty.
// @ts-ignore
     */
// @ts-ignore
    getChairs(params: Params.DatabaseGetChairsParams): Promise<Responses.DatabaseGetChairsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of cities.
// @ts-ignore
     */
// @ts-ignore
    getCities(params: Params.DatabaseGetCitiesParams): Promise<Responses.DatabaseGetCitiesResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns information about cities by their IDs.
// @ts-ignore
     */
// @ts-ignore
    getCitiesById(params: Params.DatabaseGetCitiesByIdParams): Promise<Responses.DatabaseGetCitiesByIdResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of countries.
// @ts-ignore
     */
// @ts-ignore
    getCountries(params: Params.DatabaseGetCountriesParams): Promise<Responses.DatabaseGetCountriesResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns information about countries by their IDs.
// @ts-ignore
     */
// @ts-ignore
    getCountriesById(params: Params.DatabaseGetCountriesByIdParams): Promise<Responses.DatabaseGetCountriesByIdResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of faculties (i.e., university departments).
// @ts-ignore
     */
// @ts-ignore
    getFaculties(params: Params.DatabaseGetFacultiesParams): Promise<Responses.DatabaseGetFacultiesResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Get metro stations by city
// @ts-ignore
     */
// @ts-ignore
    getMetroStations(params: Params.DatabaseGetMetroStationsParams): Promise<Responses.DatabaseGetMetroStationsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Get metro station by his id
// @ts-ignore
     */
// @ts-ignore
    getMetroStationsById(params: Params.DatabaseGetMetroStationsByIdParams): Promise<Responses.DatabaseGetMetroStationsByIdResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of regions.
// @ts-ignore
     */
// @ts-ignore
    getRegions(params: Params.DatabaseGetRegionsParams): Promise<Responses.DatabaseGetRegionsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of school classes specified for the country.
// @ts-ignore
     */
// @ts-ignore
    getSchoolClasses(params: Params.DatabaseGetSchoolClassesParams): Promise<Responses.DatabaseGetSchoolClassesResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of schools.
// @ts-ignore
     */
// @ts-ignore
    getSchools(params: Params.DatabaseGetSchoolsParams): Promise<Responses.DatabaseGetSchoolsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of higher education institutions.
// @ts-ignore
     */
// @ts-ignore
    getUniversities(params: Params.DatabaseGetUniversitiesParams): Promise<Responses.DatabaseGetUniversitiesResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API docs group
// @ts-ignore
 */
// @ts-ignore
export interface APIDocs {
// @ts-ignore
    /**
// @ts-ignore
     * Copies a document to a user's or community's document list.
// @ts-ignore
     */
// @ts-ignore
    add(params: Params.DocsAddParams): Promise<Responses.DocsAddResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes a user or community document.
// @ts-ignore
     */
// @ts-ignore
    delete(params: Params.DocsDeleteParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits a document.
// @ts-ignore
     */
// @ts-ignore
    edit(params: Params.DocsEditParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns detailed information about user or community documents.
// @ts-ignore
     */
// @ts-ignore
    get(params: Params.DocsGetParams): Promise<Responses.DocsGetResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns information about documents by their IDs.
// @ts-ignore
     */
// @ts-ignore
    getById(params: Params.DocsGetByIdParams): Promise<Responses.DocsGetByIdResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns the server address for document upload.
// @ts-ignore
     */
// @ts-ignore
    getMessagesUploadServer(params: Params.DocsGetMessagesUploadServerParams): Promise<Responses.DocsGetUploadServerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns documents types available for current user.
// @ts-ignore
     */
// @ts-ignore
    getTypes(params: Params.DocsGetTypesParams): Promise<Responses.DocsGetTypesResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns the server address for document upload.
// @ts-ignore
     */
// @ts-ignore
    getUploadServer(params: Params.DocsGetUploadServerParams): Promise<Responses.DocsGetUploadServerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns the server address for document upload onto a user's or community's wall.
// @ts-ignore
     */
// @ts-ignore
    getWallUploadServer(params: Params.DocsGetWallUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Saves a document after [vk.com/dev/upload_files_2|uploading it to a server].
// @ts-ignore
     */
// @ts-ignore
    save(params: Params.DocsSaveParams): Promise<Responses.DocsSaveResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of documents matching the search criteria.
// @ts-ignore
     */
// @ts-ignore
    search(params: Params.DocsSearchParams): Promise<Responses.DocsSearchResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API donut group
// @ts-ignore
 */
// @ts-ignore
export interface APIDonut {
// @ts-ignore
    getFriends(params: Params.DonutGetFriendsParams): Promise<Responses.GroupsGetMembersFieldsResponse>;
// @ts-ignore
    getSubscription(params: Params.DonutGetSubscriptionParams): Promise<Responses.DonutGetSubscriptionResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of user's VK Donut subscriptions.
// @ts-ignore
     */
// @ts-ignore
    getSubscriptions(params: Params.DonutGetSubscriptionsParams): Promise<Responses.DonutGetSubscriptionsResponse>;
// @ts-ignore
    isDon(params: Params.DonutIsDonParams): Promise<Responses.BaseBoolResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API downloadedGames group
// @ts-ignore
 */
// @ts-ignore
export interface APIDownloadedGames {
// @ts-ignore
    getPaidStatus(params: Params.DownloadedGamesGetPaidStatusParams): Promise<Responses.DownloadedGamesPaidStatusResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API fave group
// @ts-ignore
 */
// @ts-ignore
export interface APIFave {
// @ts-ignore
    addArticle(params: Params.FaveAddArticleParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Adds a link to user faves.
// @ts-ignore
     */
// @ts-ignore
    addLink(params: Params.FaveAddLinkParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    addPage(params: Params.FaveAddPageParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    addPost(params: Params.FaveAddPostParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    addProduct(params: Params.FaveAddProductParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    addTag(params: Params.FaveAddTagParams): Promise<Responses.FaveAddTagResponse>;
// @ts-ignore
    addVideo(params: Params.FaveAddVideoParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    editTag(params: Params.FaveEditTagParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    get(params: Params.FaveGetParams): Promise<Responses.FaveGetResponse>;
// @ts-ignore
    getPages(params: Params.FaveGetPagesParams): Promise<Responses.FaveGetPagesResponse>;
// @ts-ignore
    getTags(params: Params.FaveGetTagsParams): Promise<Responses.FaveGetTagsResponse>;
// @ts-ignore
    markSeen(params: Params.FaveMarkSeenParams): Promise<Responses.BaseBoolResponse>;
// @ts-ignore
    removeArticle(params: Params.FaveRemoveArticleParams): Promise<Responses.BaseBoolResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Removes link from the user's faves.
// @ts-ignore
     */
// @ts-ignore
    removeLink(params: Params.FaveRemoveLinkParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    removePage(params: Params.FaveRemovePageParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    removePost(params: Params.FaveRemovePostParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    removeProduct(params: Params.FaveRemoveProductParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    removeTag(params: Params.FaveRemoveTagParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    removeVideo(params: Params.FaveRemoveVideoParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    reorderTags(params: Params.FaveReorderTagsParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    setPageTags(params: Params.FaveSetPageTagsParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    setTags(params: Params.FaveSetTagsParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    trackPageInteraction(params: Params.FaveTrackPageInteractionParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API friends group
// @ts-ignore
 */
// @ts-ignore
export interface APIFriends {
// @ts-ignore
    /**
// @ts-ignore
     * Approves or creates a friend request.
// @ts-ignore
     */
// @ts-ignore
    add(params: Params.FriendsAddParams): Promise<Responses.FriendsAddResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Creates a new friend list for the current user.
// @ts-ignore
     */
// @ts-ignore
    addList(params: Params.FriendsAddListParams): Promise<Responses.FriendsAddListResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Checks the current user's friendship status with other specified users.
// @ts-ignore
     */
// @ts-ignore
    areFriends(params: Params.FriendsAreFriendsParams): Promise<Responses.FriendsAreFriendsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Declines a friend request or deletes a user from the current user's friend list.
// @ts-ignore
     */
// @ts-ignore
    delete(params: Params.FriendsDeleteParams): Promise<Responses.FriendsDeleteResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Marks all incoming friend requests as viewed.
// @ts-ignore
     */
// @ts-ignore
    deleteAllRequests(params: Params.FriendsDeleteAllRequestsParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes a friend list of the current user.
// @ts-ignore
     */
// @ts-ignore
    deleteList(params: Params.FriendsDeleteListParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits the friend lists of the selected user.
// @ts-ignore
     */
// @ts-ignore
    edit(params: Params.FriendsEditParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits a friend list of the current user.
// @ts-ignore
     */
// @ts-ignore
    editList(params: Params.FriendsEditListParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of user IDs or detailed information about a user's friends.
// @ts-ignore
     */
// @ts-ignore
    get(params: Params.FriendsGetParams): Promise<Responses.FriendsGetResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of IDs of the current user's friends who installed the application.
// @ts-ignore
     */
// @ts-ignore
    getAppUsers(params: Params.FriendsGetAppUsersParams): Promise<Responses.FriendsGetAppUsersResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of the current user's friends whose phone numbers, validated or specified in a profile, are in a given list.
// @ts-ignore
     */
// @ts-ignore
    getByPhones(params: Params.FriendsGetByPhonesParams): Promise<Responses.FriendsGetByPhonesResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of the user's friend lists.
// @ts-ignore
     */
// @ts-ignore
    getLists(params: Params.FriendsGetListsParams): Promise<Responses.FriendsGetListsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of user IDs of the mutual friends of two users.
// @ts-ignore
     */
// @ts-ignore
    getMutual(params: Params.FriendsGetMutualParams): Promise<Responses.FriendsGetMutualResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of user IDs of a user's friends who are online.
// @ts-ignore
     */
// @ts-ignore
    getOnline(params: Params.FriendsGetOnlineParams): Promise<Responses.FriendsGetOnlineResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of user IDs of the current user's recently added friends.
// @ts-ignore
     */
// @ts-ignore
    getRecent(params: Params.FriendsGetRecentParams): Promise<Responses.FriendsGetRecentResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns information about the current user's incoming and outgoing friend requests.
// @ts-ignore
     */
// @ts-ignore
    getRequests(params: Params.FriendsGetRequestsParams): Promise<Responses.FriendsGetRequestsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of profiles of users whom the current user may know.
// @ts-ignore
     */
// @ts-ignore
    getSuggestions(params: Params.FriendsGetSuggestionsParams): Promise<Responses.FriendsGetSuggestionsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of friends matching the search criteria.
// @ts-ignore
     */
// @ts-ignore
    search(params: Params.FriendsSearchParams): Promise<Responses.FriendsSearchResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API gifts group
// @ts-ignore
 */
// @ts-ignore
export interface APIGifts {
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of user gifts.
// @ts-ignore
     */
// @ts-ignore
    get(params: Params.GiftsGetParams): Promise<Responses.GiftsGetResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API groups group
// @ts-ignore
 */
// @ts-ignore
export interface APIGroups {
// @ts-ignore
    addAddress(params: Params.GroupsAddAddressParams): Promise<Responses.GroupsAddAddressResponse>;
// @ts-ignore
    addCallbackServer(params: Params.GroupsAddCallbackServerParams): Promise<Responses.GroupsAddCallbackServerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to add a link to the community.
// @ts-ignore
     */
// @ts-ignore
    addLink(params: Params.GroupsAddLinkParams): Promise<Responses.GroupsAddLinkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to approve join request to the community.
// @ts-ignore
     */
// @ts-ignore
    approveRequest(params: Params.GroupsApproveRequestParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    ban(params: Params.GroupsBanParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Creates a new community.
// @ts-ignore
     */
// @ts-ignore
    create(params: Params.GroupsCreateParams): Promise<Responses.GroupsCreateResponse>;
// @ts-ignore
    deleteAddress(params: Params.GroupsDeleteAddressParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    deleteCallbackServer(params: Params.GroupsDeleteCallbackServerParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to delete a link from the community.
// @ts-ignore
     */
// @ts-ignore
    deleteLink(params: Params.GroupsDeleteLinkParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    disableOnline(params: Params.GroupsDisableOnlineParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits a community.
// @ts-ignore
     */
// @ts-ignore
    edit(params: Params.GroupsEditParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    editAddress(params: Params.GroupsEditAddressParams): Promise<Responses.GroupsEditAddressResponse>;
// @ts-ignore
    editCallbackServer(params: Params.GroupsEditCallbackServerParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to edit a link in the community.
// @ts-ignore
     */
// @ts-ignore
    editLink(params: Params.GroupsEditLinkParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to add, remove or edit the community manager.
// @ts-ignore
     */
// @ts-ignore
    editManager(params: Params.GroupsEditManagerParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    enableOnline(params: Params.GroupsEnableOnlineParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of the communities to which a user belongs.
// @ts-ignore
     */
// @ts-ignore
    get(params: Params.GroupsGetParams): Promise<Responses.GroupsGetResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of community addresses.
// @ts-ignore
     */
// @ts-ignore
    getAddresses(params: Params.GroupsGetAddressesParams): Promise<Responses.GroupsGetAddressesResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of users on a community blacklist.
// @ts-ignore
     */
// @ts-ignore
    getBanned(params: Params.GroupsGetBannedParams): Promise<Responses.GroupsGetBannedResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns information about communities by their IDs.
// @ts-ignore
     */
// @ts-ignore
    getById(params: Params.GroupsGetByIdParams): Promise<Responses.GroupsGetByIdObjectLegacyResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns Callback API confirmation code for the community.
// @ts-ignore
     */
// @ts-ignore
    getCallbackConfirmationCode(params: Params.GroupsGetCallbackConfirmationCodeParams): Promise<Responses.GroupsGetCallbackConfirmationCodeResponse>;
// @ts-ignore
    getCallbackServers(params: Params.GroupsGetCallbackServersParams): Promise<Responses.GroupsGetCallbackServersResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns [vk.com/dev/callback_api|Callback API] notifications settings.
// @ts-ignore
     */
// @ts-ignore
    getCallbackSettings(params: Params.GroupsGetCallbackSettingsParams): Promise<Responses.GroupsGetCallbackSettingsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns communities list for a catalog category.
// @ts-ignore
     */
// @ts-ignore
    getCatalog(params: Params.GroupsGetCatalogParams): Promise<Responses.GroupsGetCatalogResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns categories list for communities catalog
// @ts-ignore
     */
// @ts-ignore
    getCatalogInfo(params: Params.GroupsGetCatalogInfoParams): Promise<Responses.GroupsGetCatalogInfoResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns invited users list of a community
// @ts-ignore
     */
// @ts-ignore
    getInvitedUsers(params: Params.GroupsGetInvitedUsersParams): Promise<Responses.GroupsGetInvitedUsersResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of invitations to join communities and events.
// @ts-ignore
     */
// @ts-ignore
    getInvites(params: Params.GroupsGetInvitesParams): Promise<Responses.GroupsGetInvitesResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns the data needed to query a Long Poll server for events
// @ts-ignore
     */
// @ts-ignore
    getLongPollServer(params: Params.GroupsGetLongPollServerParams): Promise<Responses.GroupsGetLongPollServerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns Long Poll notification settings
// @ts-ignore
     */
// @ts-ignore
    getLongPollSettings(params: Params.GroupsGetLongPollSettingsParams): Promise<Responses.GroupsGetLongPollSettingsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of community members.
// @ts-ignore
     */
// @ts-ignore
    getMembers(params: Params.GroupsGetMembersParams): Promise<Responses.GroupsGetMembersResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of requests to the community.
// @ts-ignore
     */
// @ts-ignore
    getRequests(params: Params.GroupsGetRequestsParams): Promise<Responses.GroupsGetRequestsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns community settings.
// @ts-ignore
     */
// @ts-ignore
    getSettings(params: Params.GroupsGetSettingsParams): Promise<Responses.GroupsGetSettingsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * List of group's tags
// @ts-ignore
     */
// @ts-ignore
    getTagList(params: Params.GroupsGetTagListParams): Promise<Responses.GroupsGetTagListResponse>;
// @ts-ignore
    getTokenPermissions(params: Params.GroupsGetTokenPermissionsParams): Promise<Responses.GroupsGetTokenPermissionsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to invite friends to the community.
// @ts-ignore
     */
// @ts-ignore
    invite(params: Params.GroupsInviteParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns information specifying whether a user is a member of a community.
// @ts-ignore
     */
// @ts-ignore
    isMember(params: Params.GroupsIsMemberParams): Promise<Responses.GroupsIsMemberResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * With this method you can join the group or public page, and also confirm your participation in an event.
// @ts-ignore
     */
// @ts-ignore
    join(params: Params.GroupsJoinParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * With this method you can leave a group, public page, or event.
// @ts-ignore
     */
// @ts-ignore
    leave(params: Params.GroupsLeaveParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Removes a user from the community.
// @ts-ignore
     */
// @ts-ignore
    removeUser(params: Params.GroupsRemoveUserParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to reorder links in the community.
// @ts-ignore
     */
// @ts-ignore
    reorderLink(params: Params.GroupsReorderLinkParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of communities matching the search criteria.
// @ts-ignore
     */
// @ts-ignore
    search(params: Params.GroupsSearchParams): Promise<Responses.GroupsSearchResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allow to set notifications settings for group.
// @ts-ignore
     */
// @ts-ignore
    setCallbackSettings(params: Params.GroupsSetCallbackSettingsParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Sets Long Poll notification settings
// @ts-ignore
     */
// @ts-ignore
    setLongPollSettings(params: Params.GroupsSetLongPollSettingsParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    setSettings(params: Params.GroupsSetSettingsParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * In order to save note about group participant
// @ts-ignore
     */
// @ts-ignore
    setUserNote(params: Params.GroupsSetUserNoteParams): Promise<Responses.BaseBoolResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Add new group's tag
// @ts-ignore
     */
// @ts-ignore
    tagAdd(params: Params.GroupsTagAddParams): Promise<Responses.BaseBoolResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Bind or unbind group's tag to user
// @ts-ignore
     */
// @ts-ignore
    tagBind(params: Params.GroupsTagBindParams): Promise<Responses.BaseBoolResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Delete group's tag
// @ts-ignore
     */
// @ts-ignore
    tagDelete(params: Params.GroupsTagDeleteParams): Promise<Responses.BaseBoolResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Update group's tag
// @ts-ignore
     */
// @ts-ignore
    tagUpdate(params: Params.GroupsTagUpdateParams): Promise<Responses.BaseBoolResponse>;
// @ts-ignore
    toggleMarket(params: Params.GroupsToggleMarketParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    unban(params: Params.GroupsUnbanParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API leadForms group
// @ts-ignore
 */
// @ts-ignore
export interface APILeadForms {
// @ts-ignore
    create(params: Params.LeadFormsCreateParams): Promise<Responses.LeadFormsCreateResponse>;
// @ts-ignore
    delete(params: Params.LeadFormsDeleteParams): Promise<Responses.LeadFormsDeleteResponse>;
// @ts-ignore
    get(params: Params.LeadFormsGetParams): Promise<Responses.LeadFormsGetResponse>;
// @ts-ignore
    getLeads(params: Params.LeadFormsGetLeadsParams): Promise<Responses.LeadFormsGetLeadsResponse>;
// @ts-ignore
    getUploadURL(params: Params.LeadFormsGetUploadURLParams): Promise<Responses.LeadFormsUploadUrlResponse>;
// @ts-ignore
    list(params: Params.LeadFormsListParams): Promise<Responses.LeadFormsListResponse>;
// @ts-ignore
    update(params: Params.LeadFormsUpdateParams): Promise<Responses.LeadFormsCreateResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API likes group
// @ts-ignore
 */
// @ts-ignore
export interface APILikes {
// @ts-ignore
    /**
// @ts-ignore
     * Adds the specified object to the 'Likes' list of the current user.
// @ts-ignore
     */
// @ts-ignore
    add(params: Params.LikesAddParams): Promise<Responses.LikesAddResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes the specified object from the 'Likes' list of the current user.
// @ts-ignore
     */
// @ts-ignore
    delete(params: Params.LikesDeleteParams): Promise<Responses.LikesDeleteResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of IDs of users who added the specified object to their 'Likes' list.
// @ts-ignore
     */
// @ts-ignore
    getList(params: Params.LikesGetListParams): Promise<Responses.LikesGetListResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Checks for the object in the 'Likes' list of the specified user.
// @ts-ignore
     */
// @ts-ignore
    isLiked(params: Params.LikesIsLikedParams): Promise<Responses.LikesIsLikedResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API market group
// @ts-ignore
 */
// @ts-ignore
export interface APIMarket {
// @ts-ignore
    /**
// @ts-ignore
     * Ads a new item to the market.
// @ts-ignore
     */
// @ts-ignore
    add(params: Params.MarketAddParams): Promise<Responses.MarketAddResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Creates new collection of items
// @ts-ignore
     */
// @ts-ignore
    addAlbum(params: Params.MarketAddAlbumParams): Promise<Responses.MarketAddAlbumResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Adds an item to one or multiple collections.
// @ts-ignore
     */
// @ts-ignore
    addToAlbum(params: Params.MarketAddToAlbumParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Creates a new comment for an item.
// @ts-ignore
     */
// @ts-ignore
    createComment(params: Params.MarketCreateCommentParams): Promise<Responses.MarketCreateCommentResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes an item.
// @ts-ignore
     */
// @ts-ignore
    delete(params: Params.MarketDeleteParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes a collection of items.
// @ts-ignore
     */
// @ts-ignore
    deleteAlbum(params: Params.MarketDeleteAlbumParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes an item's comment
// @ts-ignore
     */
// @ts-ignore
    deleteComment(params: Params.MarketDeleteCommentParams): Promise<Responses.MarketDeleteCommentResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits an item.
// @ts-ignore
     */
// @ts-ignore
    edit(params: Params.MarketEditParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits a collection of items
// @ts-ignore
     */
// @ts-ignore
    editAlbum(params: Params.MarketEditAlbumParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Chages item comment's text
// @ts-ignore
     */
// @ts-ignore
    editComment(params: Params.MarketEditCommentParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edit order
// @ts-ignore
     */
// @ts-ignore
    editOrder(params: Params.MarketEditOrderParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns items list for a community.
// @ts-ignore
     */
// @ts-ignore
    get(params: Params.MarketGetParams): Promise<Responses.MarketGetResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns items album's data
// @ts-ignore
     */
// @ts-ignore
    getAlbumById(params: Params.MarketGetAlbumByIdParams): Promise<Responses.MarketGetAlbumByIdResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns community's market collections list.
// @ts-ignore
     */
// @ts-ignore
    getAlbums(params: Params.MarketGetAlbumsParams): Promise<Responses.MarketGetAlbumsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns information about market items by their ids.
// @ts-ignore
     */
// @ts-ignore
    getById(params: Params.MarketGetByIdParams): Promise<Responses.MarketGetByIdResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of market categories.
// @ts-ignore
     */
// @ts-ignore
    getCategories(params: Params.MarketGetCategoriesParams): Promise<Responses.MarketGetCategoriesResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns comments list for an item.
// @ts-ignore
     */
// @ts-ignore
    getComments(params: Params.MarketGetCommentsParams): Promise<Responses.MarketGetCommentsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Get market orders
// @ts-ignore
     */
// @ts-ignore
    getGroupOrders(params: Params.MarketGetGroupOrdersParams): Promise<Responses.MarketGetGroupOrdersResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Get order
// @ts-ignore
     */
// @ts-ignore
    getOrderById(params: Params.MarketGetOrderByIdParams): Promise<Responses.MarketGetOrderByIdResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Get market items in the order
// @ts-ignore
     */
// @ts-ignore
    getOrderItems(params: Params.MarketGetOrderItemsParams): Promise<Responses.MarketGetOrderItemsResponse>;
// @ts-ignore
    getOrders(params: Params.MarketGetOrdersParams): Promise<Responses.MarketGetOrdersResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Removes an item from one or multiple collections.
// @ts-ignore
     */
// @ts-ignore
    removeFromAlbum(params: Params.MarketRemoveFromAlbumParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Reorders the collections list.
// @ts-ignore
     */
// @ts-ignore
    reorderAlbums(params: Params.MarketReorderAlbumsParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Changes item place in a collection.
// @ts-ignore
     */
// @ts-ignore
    reorderItems(params: Params.MarketReorderItemsParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Sends a complaint to the item.
// @ts-ignore
     */
// @ts-ignore
    report(params: Params.MarketReportParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Sends a complaint to the item's comment.
// @ts-ignore
     */
// @ts-ignore
    reportComment(params: Params.MarketReportCommentParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Restores recently deleted item
// @ts-ignore
     */
// @ts-ignore
    restore(params: Params.MarketRestoreParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Restores a recently deleted comment
// @ts-ignore
     */
// @ts-ignore
    restoreComment(params: Params.MarketRestoreCommentParams): Promise<Responses.MarketRestoreCommentResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Searches market items in a community's catalog
// @ts-ignore
     */
// @ts-ignore
    search(params: Params.MarketSearchParams): Promise<Responses.MarketSearchResponse>;
// @ts-ignore
    searchItems(params: Params.MarketSearchItemsParams): Promise<Responses.MarketSearchResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API messages group
// @ts-ignore
 */
// @ts-ignore
export interface APIMessages {
// @ts-ignore
    /**
// @ts-ignore
     * Adds a new user to a chat.
// @ts-ignore
     */
// @ts-ignore
    addChatUser(params: Params.MessagesAddChatUserParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows sending messages from community to the current user.
// @ts-ignore
     */
// @ts-ignore
    allowMessagesFromGroup(params: Params.MessagesAllowMessagesFromGroupParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Creates a chat with several participants.
// @ts-ignore
     */
// @ts-ignore
    createChat(params: Params.MessagesCreateChatParams): Promise<Responses.MessagesCreateChatResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes one or more messages.
// @ts-ignore
     */
// @ts-ignore
    delete(params: Params.MessagesDeleteParams): Promise<Responses.MessagesDeleteResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes a chat's cover picture.
// @ts-ignore
     */
// @ts-ignore
    deleteChatPhoto(params: Params.MessagesDeleteChatPhotoParams): Promise<Responses.MessagesDeleteChatPhotoResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes all private messages in a conversation.
// @ts-ignore
     */
// @ts-ignore
    deleteConversation(params: Params.MessagesDeleteConversationParams): Promise<Responses.MessagesDeleteConversationResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Denies sending message from community to the current user.
// @ts-ignore
     */
// @ts-ignore
    denyMessagesFromGroup(params: Params.MessagesDenyMessagesFromGroupParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits the message.
// @ts-ignore
     */
// @ts-ignore
    edit(params: Params.MessagesEditParams): Promise<Responses.MessagesEditResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits the title of a chat.
// @ts-ignore
     */
// @ts-ignore
    editChat(params: Params.MessagesEditChatParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns messages by their IDs within the conversation.
// @ts-ignore
     */
// @ts-ignore
    getByConversationMessageId(params: Params.MessagesGetByConversationMessageIdParams): Promise<Responses.MessagesGetByConversationMessageIdResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns messages by their IDs.
// @ts-ignore
     */
// @ts-ignore
    getById(params: Params.MessagesGetByIdParams): Promise<Responses.MessagesGetByIdResponse>;
// @ts-ignore
    getChatPreview(params: Params.MessagesGetChatPreviewParams): Promise<Responses.MessagesGetChatPreviewResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of IDs of users participating in a chat.
// @ts-ignore
     */
// @ts-ignore
    getConversationMembers(params: Params.MessagesGetConversationMembersParams): Promise<Responses.MessagesGetConversationMembersResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of the current user's conversations.
// @ts-ignore
     */
// @ts-ignore
    getConversations(params: Params.MessagesGetConversationsParams): Promise<Responses.MessagesGetConversationsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns conversations by their IDs
// @ts-ignore
     */
// @ts-ignore
    getConversationsById(params: Params.MessagesGetConversationsByIdParams): Promise<Responses.MessagesGetConversationsByIdResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns message history for the specified user or group chat.
// @ts-ignore
     */
// @ts-ignore
    getHistory(params: Params.MessagesGetHistoryParams): Promise<Responses.MessagesGetHistoryResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns media files from the dialog or group chat.
// @ts-ignore
     */
// @ts-ignore
    getHistoryAttachments(params: Params.MessagesGetHistoryAttachmentsParams): Promise<Responses.MessagesGetHistoryAttachmentsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of user's important messages.
// @ts-ignore
     */
// @ts-ignore
    getImportantMessages(params: Params.MessagesGetImportantMessagesParams): Promise<Responses.MessagesGetImportantMessagesResponse>;
// @ts-ignore
    getIntentUsers(params: Params.MessagesGetIntentUsersParams): Promise<Responses.MessagesGetIntentUsersResponse>;
// @ts-ignore
    getInviteLink(params: Params.MessagesGetInviteLinkParams): Promise<Responses.MessagesGetInviteLinkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a user's current status and date of last activity.
// @ts-ignore
     */
// @ts-ignore
    getLastActivity(params: Params.MessagesGetLastActivityParams): Promise<Responses.MessagesGetLastActivityResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns updates in user's private messages.
// @ts-ignore
     */
// @ts-ignore
    getLongPollHistory(params: Params.MessagesGetLongPollHistoryParams): Promise<Responses.MessagesGetLongPollHistoryResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns data required for connection to a Long Poll server.
// @ts-ignore
     */
// @ts-ignore
    getLongPollServer(params: Params.MessagesGetLongPollServerParams): Promise<Responses.MessagesGetLongPollServerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns information whether sending messages from the community to current user is allowed.
// @ts-ignore
     */
// @ts-ignore
    isMessagesFromGroupAllowed(params: Params.MessagesIsMessagesFromGroupAllowedParams): Promise<Responses.MessagesIsMessagesFromGroupAllowedResponse>;
// @ts-ignore
    joinChatByInviteLink(params: Params.MessagesJoinChatByInviteLinkParams): Promise<Responses.MessagesJoinChatByInviteLinkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Marks and unmarks conversations as unanswered.
// @ts-ignore
     */
// @ts-ignore
    markAsAnsweredConversation(params: Params.MessagesMarkAsAnsweredConversationParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Marks and unmarks messages as important (starred).
// @ts-ignore
     */
// @ts-ignore
    markAsImportant(params: Params.MessagesMarkAsImportantParams): Promise<Responses.MessagesMarkAsImportantResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Marks and unmarks conversations as important.
// @ts-ignore
     */
// @ts-ignore
    markAsImportantConversation(params: Params.MessagesMarkAsImportantConversationParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Marks messages as read.
// @ts-ignore
     */
// @ts-ignore
    markAsRead(params: Params.MessagesMarkAsReadParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Pin a message.
// @ts-ignore
     */
// @ts-ignore
    pin(params: Params.MessagesPinParams): Promise<Responses.MessagesPinResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows the current user to leave a chat or, if the current user started the chat, allows the user to remove another user from the chat.
// @ts-ignore
     */
// @ts-ignore
    removeChatUser(params: Params.MessagesRemoveChatUserParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Restores a deleted message.
// @ts-ignore
     */
// @ts-ignore
    restore(params: Params.MessagesRestoreParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of the current user's private messages that match search criteria.
// @ts-ignore
     */
// @ts-ignore
    search(params: Params.MessagesSearchParams): Promise<Responses.MessagesSearchResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of the current user's conversations that match search criteria.
// @ts-ignore
     */
// @ts-ignore
    searchConversations(params: Params.MessagesSearchConversationsParams): Promise<Responses.MessagesSearchConversationsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Sends a message.
// @ts-ignore
     */
// @ts-ignore
    send(params: Params.MessagesSendParams): Promise<Responses.MessagesSendResponse>;
// @ts-ignore
    sendMessageEventAnswer(params: Params.MessagesSendMessageEventAnswerParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Changes the status of a user as typing in a conversation.
// @ts-ignore
     */
// @ts-ignore
    setActivity(params: Params.MessagesSetActivityParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Sets a previously-uploaded picture as the cover picture of a chat.
// @ts-ignore
     */
// @ts-ignore
    setChatPhoto(params: Params.MessagesSetChatPhotoParams): Promise<Responses.MessagesSetChatPhotoResponse>;
// @ts-ignore
    unpin(params: Params.MessagesUnpinParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API newsfeed group
// @ts-ignore
 */
// @ts-ignore
export interface APINewsfeed {
// @ts-ignore
    /**
// @ts-ignore
     * Prevents news from specified users and communities from appearing in the current user's newsfeed.
// @ts-ignore
     */
// @ts-ignore
    addBan(params: Params.NewsfeedAddBanParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows news from previously banned users and communities to be shown in the current user's newsfeed.
// @ts-ignore
     */
// @ts-ignore
    deleteBan(params: Params.NewsfeedDeleteBanParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    deleteList(params: Params.NewsfeedDeleteListParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns data required to show newsfeed for the current user.
// @ts-ignore
     */
// @ts-ignore
    get(params: Params.NewsfeedGetParams): Promise<Responses.NewsfeedGenericResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of users and communities banned from the current user's newsfeed.
// @ts-ignore
     */
// @ts-ignore
    getBanned(params: Params.NewsfeedGetBannedParams): Promise<Responses.NewsfeedGetBannedResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of comments in the current user's newsfeed.
// @ts-ignore
     */
// @ts-ignore
    getComments(params: Params.NewsfeedGetCommentsParams): Promise<Responses.NewsfeedGetCommentsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of newsfeeds followed by the current user.
// @ts-ignore
     */
// @ts-ignore
    getLists(params: Params.NewsfeedGetListsParams): Promise<Responses.NewsfeedGetListsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of posts on user walls in which the current user is mentioned.
// @ts-ignore
     */
// @ts-ignore
    getMentions(params: Params.NewsfeedGetMentionsParams): Promise<Responses.NewsfeedGetMentionsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * , Returns a list of newsfeeds recommended to the current user.
// @ts-ignore
     */
// @ts-ignore
    getRecommended(params: Params.NewsfeedGetRecommendedParams): Promise<Responses.NewsfeedGenericResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns communities and users that current user is suggested to follow.
// @ts-ignore
     */
// @ts-ignore
    getSuggestedSources(params: Params.NewsfeedGetSuggestedSourcesParams): Promise<Responses.NewsfeedGetSuggestedSourcesResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Hides an item from the newsfeed.
// @ts-ignore
     */
// @ts-ignore
    ignoreItem(params: Params.NewsfeedIgnoreItemParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Creates and edits user newsfeed lists
// @ts-ignore
     */
// @ts-ignore
    saveList(params: Params.NewsfeedSaveListParams): Promise<Responses.NewsfeedSaveListResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns search results by statuses.
// @ts-ignore
     */
// @ts-ignore
    search(params: Params.NewsfeedSearchParams): Promise<Responses.NewsfeedSearchResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a hidden item to the newsfeed.
// @ts-ignore
     */
// @ts-ignore
    unignoreItem(params: Params.NewsfeedUnignoreItemParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Unsubscribes the current user from specified newsfeeds.
// @ts-ignore
     */
// @ts-ignore
    unsubscribe(params: Params.NewsfeedUnsubscribeParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API notes group
// @ts-ignore
 */
// @ts-ignore
export interface APINotes {
// @ts-ignore
    /**
// @ts-ignore
     * Creates a new note for the current user.
// @ts-ignore
     */
// @ts-ignore
    add(params: Params.NotesAddParams): Promise<Responses.NotesAddResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Adds a new comment on a note.
// @ts-ignore
     */
// @ts-ignore
    createComment(params: Params.NotesCreateCommentParams): Promise<Responses.NotesCreateCommentResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes a note of the current user.
// @ts-ignore
     */
// @ts-ignore
    delete(params: Params.NotesDeleteParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes a comment on a note.
// @ts-ignore
     */
// @ts-ignore
    deleteComment(params: Params.NotesDeleteCommentParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits a note of the current user.
// @ts-ignore
     */
// @ts-ignore
    edit(params: Params.NotesEditParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits a comment on a note.
// @ts-ignore
     */
// @ts-ignore
    editComment(params: Params.NotesEditCommentParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of notes created by a user.
// @ts-ignore
     */
// @ts-ignore
    get(params: Params.NotesGetParams): Promise<Responses.NotesGetResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a note by its ID.
// @ts-ignore
     */
// @ts-ignore
    getById(params: Params.NotesGetByIdParams): Promise<Responses.NotesGetByIdResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of comments on a note.
// @ts-ignore
     */
// @ts-ignore
    getComments(params: Params.NotesGetCommentsParams): Promise<Responses.NotesGetCommentsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Restores a deleted comment on a note.
// @ts-ignore
     */
// @ts-ignore
    restoreComment(params: Params.NotesRestoreCommentParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API notifications group
// @ts-ignore
 */
// @ts-ignore
export interface APINotifications {
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of notifications about other users' feedback to the current user's wall posts.
// @ts-ignore
     */
// @ts-ignore
    get(params: Params.NotificationsGetParams): Promise<Responses.NotificationsGetResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Resets the counter of new notifications about other users' feedback to the current user's wall posts.
// @ts-ignore
     */
// @ts-ignore
    markAsViewed(params: Params.NotificationsMarkAsViewedParams): Promise<Responses.NotificationsMarkAsViewedResponse>;
// @ts-ignore
    sendMessage(params: Params.NotificationsSendMessageParams): Promise<Responses.NotificationsSendMessageResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API orders group
// @ts-ignore
 */
// @ts-ignore
export interface APIOrders {
// @ts-ignore
    cancelSubscription(params: Params.OrdersCancelSubscriptionParams): Promise<Responses.OrdersCancelSubscriptionResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Changes order status.
// @ts-ignore
     */
// @ts-ignore
    changeState(params: Params.OrdersChangeStateParams): Promise<Responses.OrdersChangeStateResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of orders.
// @ts-ignore
     */
// @ts-ignore
    get(params: Params.OrdersGetParams): Promise<Responses.OrdersGetResponse>;
// @ts-ignore
    getAmount(params: Params.OrdersGetAmountParams): Promise<Responses.OrdersGetAmountResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns information about orders by their IDs.
// @ts-ignore
     */
// @ts-ignore
    getById(params: Params.OrdersGetByIdParams): Promise<Responses.OrdersGetByIdResponse>;
// @ts-ignore
    getUserSubscriptionById(params: Params.OrdersGetUserSubscriptionByIdParams): Promise<Responses.OrdersGetUserSubscriptionByIdResponse>;
// @ts-ignore
    getUserSubscriptions(params: Params.OrdersGetUserSubscriptionsParams): Promise<Responses.OrdersGetUserSubscriptionsResponse>;
// @ts-ignore
    updateSubscription(params: Params.OrdersUpdateSubscriptionParams): Promise<Responses.OrdersUpdateSubscriptionResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API pages group
// @ts-ignore
 */
// @ts-ignore
export interface APIPages {
// @ts-ignore
    /**
// @ts-ignore
     * Allows to clear the cache of particular 'external' pages which may be attached to VK posts.
// @ts-ignore
     */
// @ts-ignore
    clearCache(params: Params.PagesClearCacheParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns information about a wiki page.
// @ts-ignore
     */
// @ts-ignore
    get(params: Params.PagesGetParams): Promise<Responses.PagesGetResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of all previous versions of a wiki page.
// @ts-ignore
     */
// @ts-ignore
    getHistory(params: Params.PagesGetHistoryParams): Promise<Responses.PagesGetHistoryResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of wiki pages in a group.
// @ts-ignore
     */
// @ts-ignore
    getTitles(params: Params.PagesGetTitlesParams): Promise<Responses.PagesGetTitlesResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns the text of one of the previous versions of a wiki page.
// @ts-ignore
     */
// @ts-ignore
    getVersion(params: Params.PagesGetVersionParams): Promise<Responses.PagesGetVersionResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns HTML representation of the wiki markup.
// @ts-ignore
     */
// @ts-ignore
    parseWiki(params: Params.PagesParseWikiParams): Promise<Responses.PagesParseWikiResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Saves the text of a wiki page.
// @ts-ignore
     */
// @ts-ignore
    save(params: Params.PagesSaveParams): Promise<Responses.PagesSaveResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Saves modified read and edit access settings for a wiki page.
// @ts-ignore
     */
// @ts-ignore
    saveAccess(params: Params.PagesSaveAccessParams): Promise<Responses.PagesSaveAccessResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API photos group
// @ts-ignore
 */
// @ts-ignore
export interface APIPhotos {
// @ts-ignore
    /**
// @ts-ignore
     * Confirms a tag on a photo.
// @ts-ignore
     */
// @ts-ignore
    confirmTag(params: Params.PhotosConfirmTagParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to copy a photo to the "Saved photos" album
// @ts-ignore
     */
// @ts-ignore
    copy(params: Params.PhotosCopyParams): Promise<Responses.PhotosCopyResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Creates an empty photo album.
// @ts-ignore
     */
// @ts-ignore
    createAlbum(params: Params.PhotosCreateAlbumParams): Promise<Responses.PhotosCreateAlbumResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Adds a new comment on the photo.
// @ts-ignore
     */
// @ts-ignore
    createComment(params: Params.PhotosCreateCommentParams): Promise<Responses.PhotosCreateCommentResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes a photo.
// @ts-ignore
     */
// @ts-ignore
    delete(params: Params.PhotosDeleteParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes a photo album belonging to the current user.
// @ts-ignore
     */
// @ts-ignore
    deleteAlbum(params: Params.PhotosDeleteAlbumParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes a comment on the photo.
// @ts-ignore
     */
// @ts-ignore
    deleteComment(params: Params.PhotosDeleteCommentParams): Promise<Responses.PhotosDeleteCommentResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits the caption of a photo.
// @ts-ignore
     */
// @ts-ignore
    edit(params: Params.PhotosEditParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits information about a photo album.
// @ts-ignore
     */
// @ts-ignore
    editAlbum(params: Params.PhotosEditAlbumParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits a comment on a photo.
// @ts-ignore
     */
// @ts-ignore
    editComment(params: Params.PhotosEditCommentParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of a user's or community's photos.
// @ts-ignore
     */
// @ts-ignore
    get(params: Params.PhotosGetParams): Promise<Responses.PhotosGetResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of a user's or community's photo albums.
// @ts-ignore
     */
// @ts-ignore
    getAlbums(params: Params.PhotosGetAlbumsParams): Promise<Responses.PhotosGetAlbumsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns the number of photo albums belonging to a user or community.
// @ts-ignore
     */
// @ts-ignore
    getAlbumsCount(params: Params.PhotosGetAlbumsCountParams): Promise<Responses.PhotosGetAlbumsCountResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of photos belonging to a user or community, in reverse chronological order.
// @ts-ignore
     */
// @ts-ignore
    getAll(params: Params.PhotosGetAllParams): Promise<Responses.PhotosGetAllResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of comments on a specific photo album or all albums of the user sorted in reverse chronological order.
// @ts-ignore
     */
// @ts-ignore
    getAllComments(params: Params.PhotosGetAllCommentsParams): Promise<Responses.PhotosGetAllCommentsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns information about photos by their IDs.
// @ts-ignore
     */
// @ts-ignore
    getById(params: Params.PhotosGetByIdParams): Promise<Responses.PhotosGetByIdResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns an upload link for chat cover pictures.
// @ts-ignore
     */
// @ts-ignore
    getChatUploadServer(params: Params.PhotosGetChatUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of comments on a photo.
// @ts-ignore
     */
// @ts-ignore
    getComments(params: Params.PhotosGetCommentsParams): Promise<Responses.PhotosGetCommentsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns the server address for market album photo upload.
// @ts-ignore
     */
// @ts-ignore
    getMarketAlbumUploadServer(params: Params.PhotosGetMarketAlbumUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns the server address for market photo upload.
// @ts-ignore
     */
// @ts-ignore
    getMarketUploadServer(params: Params.PhotosGetMarketUploadServerParams): Promise<Responses.PhotosGetMarketUploadServerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns the server address for photo upload in a private message for a user.
// @ts-ignore
     */
// @ts-ignore
    getMessagesUploadServer(params: Params.PhotosGetMessagesUploadServerParams): Promise<Responses.PhotosGetMessagesUploadServerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of photos with tags that have not been viewed.
// @ts-ignore
     */
// @ts-ignore
    getNewTags(params: Params.PhotosGetNewTagsParams): Promise<Responses.PhotosGetNewTagsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns the server address for owner cover upload.
// @ts-ignore
     */
// @ts-ignore
    getOwnerCoverPhotoUploadServer(params: Params.PhotosGetOwnerCoverPhotoUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns an upload server address for a profile or community photo.
// @ts-ignore
     */
// @ts-ignore
    getOwnerPhotoUploadServer(params: Params.PhotosGetOwnerPhotoUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of tags on a photo.
// @ts-ignore
     */
// @ts-ignore
    getTags(params: Params.PhotosGetTagsParams): Promise<Responses.PhotosGetTagsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns the server address for photo upload.
// @ts-ignore
     */
// @ts-ignore
    getUploadServer(params: Params.PhotosGetUploadServerParams): Promise<Responses.PhotosGetUploadServerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of photos in which a user is tagged.
// @ts-ignore
     */
// @ts-ignore
    getUserPhotos(params: Params.PhotosGetUserPhotosParams): Promise<Responses.PhotosGetUserPhotosResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns the server address for photo upload onto a user's wall.
// @ts-ignore
     */
// @ts-ignore
    getWallUploadServer(params: Params.PhotosGetWallUploadServerParams): Promise<Responses.PhotosGetWallUploadServerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Makes a photo into an album cover.
// @ts-ignore
     */
// @ts-ignore
    makeCover(params: Params.PhotosMakeCoverParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Moves a photo from one album to another.
// @ts-ignore
     */
// @ts-ignore
    move(params: Params.PhotosMoveParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Adds a tag on the photo.
// @ts-ignore
     */
// @ts-ignore
    putTag(params: Params.PhotosPutTagParams): Promise<Responses.PhotosPutTagResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Removes a tag from a photo.
// @ts-ignore
     */
// @ts-ignore
    removeTag(params: Params.PhotosRemoveTagParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Reorders the album in the list of user albums.
// @ts-ignore
     */
// @ts-ignore
    reorderAlbums(params: Params.PhotosReorderAlbumsParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Reorders the photo in the list of photos of the user album.
// @ts-ignore
     */
// @ts-ignore
    reorderPhotos(params: Params.PhotosReorderPhotosParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Reports (submits a complaint about) a photo.
// @ts-ignore
     */
// @ts-ignore
    report(params: Params.PhotosReportParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Reports (submits a complaint about) a comment on a photo.
// @ts-ignore
     */
// @ts-ignore
    reportComment(params: Params.PhotosReportCommentParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Restores a deleted photo.
// @ts-ignore
     */
// @ts-ignore
    restore(params: Params.PhotosRestoreParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Restores a deleted comment on a photo.
// @ts-ignore
     */
// @ts-ignore
    restoreComment(params: Params.PhotosRestoreCommentParams): Promise<Responses.PhotosRestoreCommentResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Saves photos after successful uploading.
// @ts-ignore
     */
// @ts-ignore
    save(params: Params.PhotosSaveParams): Promise<Responses.PhotosSaveResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Saves market album photos after successful uploading.
// @ts-ignore
     */
// @ts-ignore
    saveMarketAlbumPhoto(params: Params.PhotosSaveMarketAlbumPhotoParams): Promise<Responses.PhotosSaveMarketAlbumPhotoResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Saves market photos after successful uploading.
// @ts-ignore
     */
// @ts-ignore
    saveMarketPhoto(params: Params.PhotosSaveMarketPhotoParams): Promise<Responses.PhotosSaveMarketPhotoResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Saves a photo after being successfully uploaded. URL obtained with [vk.com/dev/photos.getMessagesUploadServer|photos.getMessagesUploadServer] method.
// @ts-ignore
     */
// @ts-ignore
    saveMessagesPhoto(params: Params.PhotosSaveMessagesPhotoParams): Promise<Responses.PhotosSaveMessagesPhotoResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Saves cover photo after successful uploading.
// @ts-ignore
     */
// @ts-ignore
    saveOwnerCoverPhoto(params: Params.PhotosSaveOwnerCoverPhotoParams): Promise<Responses.PhotosSaveOwnerCoverPhotoResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Saves a profile or community photo. Upload URL can be got with the [vk.com/dev/photos.getOwnerPhotoUploadServer|photos.getOwnerPhotoUploadServer] method.
// @ts-ignore
     */
// @ts-ignore
    saveOwnerPhoto(params: Params.PhotosSaveOwnerPhotoParams): Promise<Responses.PhotosSaveOwnerPhotoResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Saves a photo to a user's or community's wall after being uploaded.
// @ts-ignore
     */
// @ts-ignore
    saveWallPhoto(params: Params.PhotosSaveWallPhotoParams): Promise<Responses.PhotosSaveWallPhotoResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of photos.
// @ts-ignore
     */
// @ts-ignore
    search(params: Params.PhotosSearchParams): Promise<Responses.PhotosSearchResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API podcasts group
// @ts-ignore
 */
// @ts-ignore
export interface APIPodcasts {
// @ts-ignore
    searchPodcast(params: Params.PodcastsSearchPodcastParams): Promise<Responses.PodcastsSearchPodcastResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API polls group
// @ts-ignore
 */
// @ts-ignore
export interface APIPolls {
// @ts-ignore
    /**
// @ts-ignore
     * Adds the current user's vote to the selected answer in the poll.
// @ts-ignore
     */
// @ts-ignore
    addVote(params: Params.PollsAddVoteParams): Promise<Responses.PollsAddVoteResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Creates polls that can be attached to the users' or communities' posts.
// @ts-ignore
     */
// @ts-ignore
    create(params: Params.PollsCreateParams): Promise<Responses.PollsCreateResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes the current user's vote from the selected answer in the poll.
// @ts-ignore
     */
// @ts-ignore
    deleteVote(params: Params.PollsDeleteVoteParams): Promise<Responses.PollsDeleteVoteResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits created polls
// @ts-ignore
     */
// @ts-ignore
    edit(params: Params.PollsEditParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    getBackgrounds(params: Params.PollsGetBackgroundsParams): Promise<Responses.PollsGetBackgroundsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns detailed information about a poll by its ID.
// @ts-ignore
     */
// @ts-ignore
    getById(params: Params.PollsGetByIdParams): Promise<Responses.PollsGetByIdResponse>;
// @ts-ignore
    getPhotoUploadServer(params: Params.PollsGetPhotoUploadServerParams): Promise<Responses.BaseGetUploadServerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of IDs of users who selected specific answers in the poll.
// @ts-ignore
     */
// @ts-ignore
    getVoters(params: Params.PollsGetVotersParams): Promise<Responses.PollsGetVotersResponse>;
// @ts-ignore
    savePhoto(params: Params.PollsSavePhotoParams): Promise<Responses.PollsSavePhotoResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API prettyCards group
// @ts-ignore
 */
// @ts-ignore
export interface APIPrettyCards {
// @ts-ignore
    create(params: Params.PrettyCardsCreateParams): Promise<Responses.PrettyCardsCreateResponse>;
// @ts-ignore
    delete(params: Params.PrettyCardsDeleteParams): Promise<Responses.PrettyCardsDeleteResponse>;
// @ts-ignore
    edit(params: Params.PrettyCardsEditParams): Promise<Responses.PrettyCardsEditResponse>;
// @ts-ignore
    get(params: Params.PrettyCardsGetParams): Promise<Responses.PrettyCardsGetResponse>;
// @ts-ignore
    getById(params: Params.PrettyCardsGetByIdParams): Promise<Responses.PrettyCardsGetByIdResponse>;
// @ts-ignore
    getUploadURL(params: Params.PrettyCardsGetUploadURLParams): Promise<Responses.PrettyCardsGetUploadURLResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API search group
// @ts-ignore
 */
// @ts-ignore
export interface APISearch {
// @ts-ignore
    /**
// @ts-ignore
     * Allows the programmer to do a quick search for any substring.
// @ts-ignore
     */
// @ts-ignore
    getHints(params: Params.SearchGetHintsParams): Promise<Responses.SearchGetHintsResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API secure group
// @ts-ignore
 */
// @ts-ignore
export interface APISecure {
// @ts-ignore
    /**
// @ts-ignore
     * Adds user activity information to an application
// @ts-ignore
     */
// @ts-ignore
    addAppEvent(params: Params.SecureAddAppEventParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Checks the user authentication in 'IFrame' and 'Flash' apps using the 'access_token' parameter.
// @ts-ignore
     */
// @ts-ignore
    checkToken(params: Params.SecureCheckTokenParams): Promise<Responses.SecureCheckTokenResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns payment balance of the application in hundredth of a vote.
// @ts-ignore
     */
// @ts-ignore
    getAppBalance(params: Params.SecureGetAppBalanceParams): Promise<Responses.SecureGetAppBalanceResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Shows a list of SMS notifications sent by the application using [vk.com/dev/secure.sendSMSNotification|secure.sendSMSNotification] method.
// @ts-ignore
     */
// @ts-ignore
    getSMSHistory(params: Params.SecureGetSMSHistoryParams): Promise<Responses.SecureGetSmsHistoryResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Shows history of votes transaction between users and the application.
// @ts-ignore
     */
// @ts-ignore
    getTransactionsHistory(params: Params.SecureGetTransactionsHistoryParams): Promise<Responses.SecureGetTransactionsHistoryResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns one of the previously set game levels of one or more users in the application.
// @ts-ignore
     */
// @ts-ignore
    getUserLevel(params: Params.SecureGetUserLevelParams): Promise<Responses.SecureGetUserLevelResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Opens the game achievement and gives the user a sticker
// @ts-ignore
     */
// @ts-ignore
    giveEventSticker(params: Params.SecureGiveEventStickerParams): Promise<Responses.SecureGiveEventStickerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Sends notification to the user.
// @ts-ignore
     */
// @ts-ignore
    sendNotification(params: Params.SecureSendNotificationParams): Promise<Responses.SecureSendNotificationResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Sends 'SMS' notification to a user's mobile device.
// @ts-ignore
     */
// @ts-ignore
    sendSMSNotification(params: Params.SecureSendSMSNotificationParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Sets a counter which is shown to the user in bold in the left menu.
// @ts-ignore
     */
// @ts-ignore
    setCounter(params: Params.SecureSetCounterParams): Promise<Responses.BaseBoolResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API stats group
// @ts-ignore
 */
// @ts-ignore
export interface APIStats {
// @ts-ignore
    /**
// @ts-ignore
     * Returns statistics of a community or an application.
// @ts-ignore
     */
// @ts-ignore
    get(params: Params.StatsGetParams): Promise<Responses.StatsGetResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns stats for a wall post.
// @ts-ignore
     */
// @ts-ignore
    getPostReach(params: Params.StatsGetPostReachParams): Promise<Responses.StatsGetPostReachResponse>;
// @ts-ignore
    trackVisitor(params: Params.StatsTrackVisitorParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API status group
// @ts-ignore
 */
// @ts-ignore
export interface APIStatus {
// @ts-ignore
    /**
// @ts-ignore
     * Returns data required to show the status of a user or community.
// @ts-ignore
     */
// @ts-ignore
    get(params: Params.StatusGetParams): Promise<Responses.StatusGetResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Sets a new status for the current user.
// @ts-ignore
     */
// @ts-ignore
    set(params: Params.StatusSetParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API storage group
// @ts-ignore
 */
// @ts-ignore
export interface APIStorage {
// @ts-ignore
    /**
// @ts-ignore
     * Returns a value of variable with the name set by key parameter.
// @ts-ignore
     */
// @ts-ignore
    get(params: Params.StorageGetParams): Promise<Responses.StorageGetResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns the names of all variables.
// @ts-ignore
     */
// @ts-ignore
    getKeys(params: Params.StorageGetKeysParams): Promise<Responses.StorageGetKeysResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Saves a value of variable with the name set by 'key' parameter.
// @ts-ignore
     */
// @ts-ignore
    set(params: Params.StorageSetParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API store group
// @ts-ignore
 */
// @ts-ignore
export interface APIStore {
// @ts-ignore
    /**
// @ts-ignore
     * Adds given sticker IDs to the list of user's favorite stickers
// @ts-ignore
     */
// @ts-ignore
    addStickersToFavorite(params: Params.StoreAddStickersToFavoriteParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    getFavoriteStickers(params: Params.StoreGetFavoriteStickersParams): Promise<Responses.StoreGetFavoriteStickersResponse>;
// @ts-ignore
    getProducts(params: Params.StoreGetProductsParams): Promise<Responses.StoreGetProductsResponse>;
// @ts-ignore
    getStickersKeywords(params: Params.StoreGetStickersKeywordsParams): Promise<Responses.StoreGetStickersKeywordsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Removes given sticker IDs from the list of user's favorite stickers
// @ts-ignore
     */
// @ts-ignore
    removeStickersFromFavorite(params: Params.StoreRemoveStickersFromFavoriteParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API stories group
// @ts-ignore
 */
// @ts-ignore
export interface APIStories {
// @ts-ignore
    /**
// @ts-ignore
     * Allows to hide stories from chosen sources from current user's feed.
// @ts-ignore
     */
// @ts-ignore
    banOwner(params: Params.StoriesBanOwnerParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to delete story.
// @ts-ignore
     */
// @ts-ignore
    delete(params: Params.StoriesDeleteParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns stories available for current user.
// @ts-ignore
     */
// @ts-ignore
    get(params: Params.StoriesGetParams): Promise<Responses.StoriesGetV5113Response>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns list of sources hidden from current user's feed.
// @ts-ignore
     */
// @ts-ignore
    getBanned(params: Params.StoriesGetBannedParams): Promise<Responses.StoriesGetBannedResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns story by its ID.
// @ts-ignore
     */
// @ts-ignore
    getById(params: Params.StoriesGetByIdParams): Promise<Responses.StoriesGetByIdExtendedResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns URL for uploading a story with photo.
// @ts-ignore
     */
// @ts-ignore
    getPhotoUploadServer(params: Params.StoriesGetPhotoUploadServerParams): Promise<Responses.StoriesGetPhotoUploadServerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns replies to the story.
// @ts-ignore
     */
// @ts-ignore
    getReplies(params: Params.StoriesGetRepliesParams): Promise<Responses.StoriesGetV5113Response>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns stories available for current user.
// @ts-ignore
     */
// @ts-ignore
    getStats(params: Params.StoriesGetStatsParams): Promise<Responses.StoriesGetStatsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to receive URL for uploading story with video.
// @ts-ignore
     */
// @ts-ignore
    getVideoUploadServer(params: Params.StoriesGetVideoUploadServerParams): Promise<Responses.StoriesGetVideoUploadServerResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of story viewers.
// @ts-ignore
     */
// @ts-ignore
    getViewers(params: Params.StoriesGetViewersParams): Promise<Responses.StoriesGetViewersExtendedV5115Response>;
// @ts-ignore
    /**
// @ts-ignore
     * Hides all replies in the last 24 hours from the user to current user's stories.
// @ts-ignore
     */
// @ts-ignore
    hideAllReplies(params: Params.StoriesHideAllRepliesParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Hides the reply to the current user's story.
// @ts-ignore
     */
// @ts-ignore
    hideReply(params: Params.StoriesHideReplyParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    save(params: Params.StoriesSaveParams): Promise<Responses.StoriesSaveResponse>;
// @ts-ignore
    search(params: Params.StoriesSearchParams): Promise<Responses.StoriesGetV5113Response>;
// @ts-ignore
    sendInteraction(params: Params.StoriesSendInteractionParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to show stories from hidden sources in current user's feed.
// @ts-ignore
     */
// @ts-ignore
    unbanOwner(params: Params.StoriesUnbanOwnerParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API streaming group
// @ts-ignore
 */
// @ts-ignore
export interface APIStreaming {
// @ts-ignore
    /**
// @ts-ignore
     * Allows to receive data for the connection to Streaming API.
// @ts-ignore
     */
// @ts-ignore
    getServerUrl(params: Params.StreamingGetServerUrlParams): Promise<Responses.StreamingGetServerUrlResponse>;
// @ts-ignore
    setSettings(params: Params.StreamingSetSettingsParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API users group
// @ts-ignore
 */
// @ts-ignore
export interface APIUsers {
// @ts-ignore
    /**
// @ts-ignore
     * Returns detailed information on users.
// @ts-ignore
     */
// @ts-ignore
    get(params: Params.UsersGetParams): Promise<Responses.UsersGetResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of IDs of followers of the user in question, sorted by date added, most recent first.
// @ts-ignore
     */
// @ts-ignore
    getFollowers(params: Params.UsersGetFollowersParams): Promise<Responses.UsersGetFollowersResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of IDs of users and communities followed by the user.
// @ts-ignore
     */
// @ts-ignore
    getSubscriptions(params: Params.UsersGetSubscriptionsParams): Promise<Responses.UsersGetSubscriptionsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Reports (submits a complain about) a user.
// @ts-ignore
     */
// @ts-ignore
    report(params: Params.UsersReportParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of users matching the search criteria.
// @ts-ignore
     */
// @ts-ignore
    search(params: Params.UsersSearchParams): Promise<Responses.UsersSearchResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API utils group
// @ts-ignore
 */
// @ts-ignore
export interface APIUtils {
// @ts-ignore
    /**
// @ts-ignore
     * Checks whether a link is blocked in VK.
// @ts-ignore
     */
// @ts-ignore
    checkLink(params: Params.UtilsCheckLinkParams): Promise<Responses.UtilsCheckLinkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes shortened link from user's list.
// @ts-ignore
     */
// @ts-ignore
    deleteFromLastShortened(params: Params.UtilsDeleteFromLastShortenedParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of user's shortened links.
// @ts-ignore
     */
// @ts-ignore
    getLastShortenedLinks(params: Params.UtilsGetLastShortenedLinksParams): Promise<Responses.UtilsGetLastShortenedLinksResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns stats data for shortened link.
// @ts-ignore
     */
// @ts-ignore
    getLinkStats(params: Params.UtilsGetLinkStatsParams): Promise<Responses.UtilsGetLinkStatsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns the current time of the VK server.
// @ts-ignore
     */
// @ts-ignore
    getServerTime(params: Params.UtilsGetServerTimeParams): Promise<Responses.UtilsGetServerTimeResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to receive a link shortened via vk.cc.
// @ts-ignore
     */
// @ts-ignore
    getShortLink(params: Params.UtilsGetShortLinkParams): Promise<Responses.UtilsGetShortLinkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Detects a type of object (e.g., user, community, application) and its ID by screen name.
// @ts-ignore
     */
// @ts-ignore
    resolveScreenName(params: Params.UtilsResolveScreenNameParams): Promise<Responses.UtilsResolveScreenNameResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API video group
// @ts-ignore
 */
// @ts-ignore
export interface APIVideo {
// @ts-ignore
    /**
// @ts-ignore
     * Adds a video to a user or community page.
// @ts-ignore
     */
// @ts-ignore
    add(params: Params.VideoAddParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Creates an empty album for videos.
// @ts-ignore
     */
// @ts-ignore
    addAlbum(params: Params.VideoAddAlbumParams): Promise<Responses.VideoAddAlbumResponse>;
// @ts-ignore
    addToAlbum(params: Params.VideoAddToAlbumParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Adds a new comment on a video.
// @ts-ignore
     */
// @ts-ignore
    createComment(params: Params.VideoCreateCommentParams): Promise<Responses.VideoCreateCommentResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes a video from a user or community page.
// @ts-ignore
     */
// @ts-ignore
    delete(params: Params.VideoDeleteParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes a video album.
// @ts-ignore
     */
// @ts-ignore
    deleteAlbum(params: Params.VideoDeleteAlbumParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes a comment on a video.
// @ts-ignore
     */
// @ts-ignore
    deleteComment(params: Params.VideoDeleteCommentParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits information about a video on a user or community page.
// @ts-ignore
     */
// @ts-ignore
    edit(params: Params.VideoEditParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits the title of a video album.
// @ts-ignore
     */
// @ts-ignore
    editAlbum(params: Params.VideoEditAlbumParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits the text of a comment on a video.
// @ts-ignore
     */
// @ts-ignore
    editComment(params: Params.VideoEditCommentParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns detailed information about videos.
// @ts-ignore
     */
// @ts-ignore
    get(params: Params.VideoGetParams): Promise<Responses.VideoGetResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns video album info
// @ts-ignore
     */
// @ts-ignore
    getAlbumById(params: Params.VideoGetAlbumByIdParams): Promise<Responses.VideoGetAlbumByIdResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of video albums owned by a user or community.
// @ts-ignore
     */
// @ts-ignore
    getAlbums(params: Params.VideoGetAlbumsParams): Promise<Responses.VideoGetAlbumsResponse>;
// @ts-ignore
    getAlbumsByVideo(params: Params.VideoGetAlbumsByVideoParams): Promise<Responses.VideoGetAlbumsByVideoResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of comments on a video.
// @ts-ignore
     */
// @ts-ignore
    getComments(params: Params.VideoGetCommentsParams): Promise<Responses.VideoGetCommentsResponse>;
// @ts-ignore
    removeFromAlbum(params: Params.VideoRemoveFromAlbumParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Reorders the album in the list of user video albums.
// @ts-ignore
     */
// @ts-ignore
    reorderAlbums(params: Params.VideoReorderAlbumsParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Reorders the video in the video album.
// @ts-ignore
     */
// @ts-ignore
    reorderVideos(params: Params.VideoReorderVideosParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Reports (submits a complaint about) a video.
// @ts-ignore
     */
// @ts-ignore
    report(params: Params.VideoReportParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Reports (submits a complaint about) a comment on a video.
// @ts-ignore
     */
// @ts-ignore
    reportComment(params: Params.VideoReportCommentParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Restores a previously deleted video.
// @ts-ignore
     */
// @ts-ignore
    restore(params: Params.VideoRestoreParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Restores a previously deleted comment on a video.
// @ts-ignore
     */
// @ts-ignore
    restoreComment(params: Params.VideoRestoreCommentParams): Promise<Responses.VideoRestoreCommentResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a server address (required for upload) and video data.
// @ts-ignore
     */
// @ts-ignore
    save(params: Params.VideoSaveParams): Promise<Responses.VideoSaveResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of videos under the set search criterion.
// @ts-ignore
     */
// @ts-ignore
    search(params: Params.VideoSearchParams): Promise<Responses.VideoSearchResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API wall group
// @ts-ignore
 */
// @ts-ignore
export interface APIWall {
// @ts-ignore
    checkCopyrightLink(params: Params.WallCheckCopyrightLinkParams): Promise<Responses.BaseBoolResponse>;
// @ts-ignore
    closeComments(params: Params.WallCloseCommentsParams): Promise<Responses.BaseBoolResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Adds a comment to a post on a user wall or community wall.
// @ts-ignore
     */
// @ts-ignore
    createComment(params: Params.WallCreateCommentParams): Promise<Responses.WallCreateCommentResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes a post from a user wall or community wall.
// @ts-ignore
     */
// @ts-ignore
    delete(params: Params.WallDeleteParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Deletes a comment on a post on a user wall or community wall.
// @ts-ignore
     */
// @ts-ignore
    deleteComment(params: Params.WallDeleteCommentParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits a post on a user wall or community wall.
// @ts-ignore
     */
// @ts-ignore
    edit(params: Params.WallEditParams): Promise<Responses.WallEditResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to edit hidden post.
// @ts-ignore
     */
// @ts-ignore
    editAdsStealth(params: Params.WallEditAdsStealthParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Edits a comment on a user wall or community wall.
// @ts-ignore
     */
// @ts-ignore
    editComment(params: Params.WallEditCommentParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of posts on a user wall or community wall.
// @ts-ignore
     */
// @ts-ignore
    get(params: Params.WallGetParams): Promise<Responses.WallGetResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of posts from user or community walls by their IDs.
// @ts-ignore
     */
// @ts-ignore
    getById(params: Params.WallGetByIdParams): Promise<Responses.WallGetByIdLegacyResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a comment on a post on a user wall or community wall.
// @ts-ignore
     */
// @ts-ignore
    getComment(params: Params.WallGetCommentParams): Promise<Responses.WallGetCommentResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns a list of comments on a post on a user wall or community wall.
// @ts-ignore
     */
// @ts-ignore
    getComments(params: Params.WallGetCommentsParams): Promise<Responses.WallGetCommentsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Returns information about reposts of a post on user wall or community wall.
// @ts-ignore
     */
// @ts-ignore
    getReposts(params: Params.WallGetRepostsParams): Promise<Responses.WallGetRepostsResponse>;
// @ts-ignore
    openComments(params: Params.WallOpenCommentsParams): Promise<Responses.BaseBoolResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Pins the post on wall.
// @ts-ignore
     */
// @ts-ignore
    pin(params: Params.WallPinParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Adds a new post on a user wall or community wall. Can also be used to publish suggested or scheduled posts.
// @ts-ignore
     */
// @ts-ignore
    post(params: Params.WallPostParams): Promise<Responses.WallPostResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to create hidden post which will not be shown on the community's wall and can be used for creating an ad with type "Community post".
// @ts-ignore
     */
// @ts-ignore
    postAdsStealth(params: Params.WallPostAdsStealthParams): Promise<Responses.WallPostAdsStealthResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Reports (submits a complaint about) a comment on a post on a user wall or community wall.
// @ts-ignore
     */
// @ts-ignore
    reportComment(params: Params.WallReportCommentParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Reports (submits a complaint about) a post on a user wall or community wall.
// @ts-ignore
     */
// @ts-ignore
    reportPost(params: Params.WallReportPostParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Reposts (copies) an object to a user wall or community wall.
// @ts-ignore
     */
// @ts-ignore
    repost(params: Params.WallRepostParams): Promise<Responses.WallRepostResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Restores a post deleted from a user wall or community wall.
// @ts-ignore
     */
// @ts-ignore
    restore(params: Params.WallRestoreParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Restores a comment deleted from a user wall or community wall.
// @ts-ignore
     */
// @ts-ignore
    restoreComment(params: Params.WallRestoreCommentParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Allows to search posts on user or community walls.
// @ts-ignore
     */
// @ts-ignore
    search(params: Params.WallSearchParams): Promise<Responses.WallSearchResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Unpins the post on wall.
// @ts-ignore
     */
// @ts-ignore
    unpin(params: Params.WallUnpinParams): Promise<Responses.BaseOkResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The API widgets group
// @ts-ignore
 */
// @ts-ignore
export interface APIWidgets {
// @ts-ignore
    /**
// @ts-ignore
     * Gets a list of comments for the page added through the [vk.com/dev/Comments|Comments widget].
// @ts-ignore
     */
// @ts-ignore
    getComments(params: Params.WidgetsGetCommentsParams): Promise<Responses.WidgetsGetCommentsResponse>;
// @ts-ignore
    /**
// @ts-ignore
     * Gets a list of application/site pages where the [vk.com/dev/Comments|Comments widget] or [vk.com/dev/Like|Like widget] is installed.
// @ts-ignore
     */
// @ts-ignore
    getPages(params: Params.WidgetsGetPagesParams): Promise<Responses.WidgetsGetPagesResponse>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface APIMethods {
// @ts-ignore
    /**
// @ts-ignore
     * The API account group
// @ts-ignore
     */
// @ts-ignore
    account: APIAccount;
// @ts-ignore
    /**
// @ts-ignore
     * The API ads group
// @ts-ignore
     */
// @ts-ignore
    ads: APIAds;
// @ts-ignore
    /**
// @ts-ignore
     * The API adsweb group
// @ts-ignore
     */
// @ts-ignore
    adsweb: APIAdsweb;
// @ts-ignore
    /**
// @ts-ignore
     * The API appWidgets group
// @ts-ignore
     */
// @ts-ignore
    appWidgets: APIAppWidgets;
// @ts-ignore
    /**
// @ts-ignore
     * The API apps group
// @ts-ignore
     */
// @ts-ignore
    apps: APIApps;
// @ts-ignore
    /**
// @ts-ignore
     * The API auth group
// @ts-ignore
     */
// @ts-ignore
    auth: APIAuth;
// @ts-ignore
    /**
// @ts-ignore
     * The API board group
// @ts-ignore
     */
// @ts-ignore
    board: APIBoard;
// @ts-ignore
    /**
// @ts-ignore
     * The API database group
// @ts-ignore
     */
// @ts-ignore
    database: APIDatabase;
// @ts-ignore
    /**
// @ts-ignore
     * The API docs group
// @ts-ignore
     */
// @ts-ignore
    docs: APIDocs;
// @ts-ignore
    /**
// @ts-ignore
     * The API donut group
// @ts-ignore
     */
// @ts-ignore
    donut: APIDonut;
// @ts-ignore
    /**
// @ts-ignore
     * The API downloadedGames group
// @ts-ignore
     */
// @ts-ignore
    downloadedGames: APIDownloadedGames;
// @ts-ignore
    /**
// @ts-ignore
     * The API fave group
// @ts-ignore
     */
// @ts-ignore
    fave: APIFave;
// @ts-ignore
    /**
// @ts-ignore
     * The API friends group
// @ts-ignore
     */
// @ts-ignore
    friends: APIFriends;
// @ts-ignore
    /**
// @ts-ignore
     * The API gifts group
// @ts-ignore
     */
// @ts-ignore
    gifts: APIGifts;
// @ts-ignore
    /**
// @ts-ignore
     * The API groups group
// @ts-ignore
     */
// @ts-ignore
    groups: APIGroups;
// @ts-ignore
    /**
// @ts-ignore
     * The API leadForms group
// @ts-ignore
     */
// @ts-ignore
    leadForms: APILeadForms;
// @ts-ignore
    /**
// @ts-ignore
     * The API likes group
// @ts-ignore
     */
// @ts-ignore
    likes: APILikes;
// @ts-ignore
    /**
// @ts-ignore
     * The API market group
// @ts-ignore
     */
// @ts-ignore
    market: APIMarket;
// @ts-ignore
    /**
// @ts-ignore
     * The API messages group
// @ts-ignore
     */
// @ts-ignore
    messages: APIMessages;
// @ts-ignore
    /**
// @ts-ignore
     * The API newsfeed group
// @ts-ignore
     */
// @ts-ignore
    newsfeed: APINewsfeed;
// @ts-ignore
    /**
// @ts-ignore
     * The API notes group
// @ts-ignore
     */
// @ts-ignore
    notes: APINotes;
// @ts-ignore
    /**
// @ts-ignore
     * The API notifications group
// @ts-ignore
     */
// @ts-ignore
    notifications: APINotifications;
// @ts-ignore
    /**
// @ts-ignore
     * The API orders group
// @ts-ignore
     */
// @ts-ignore
    orders: APIOrders;
// @ts-ignore
    /**
// @ts-ignore
     * The API pages group
// @ts-ignore
     */
// @ts-ignore
    pages: APIPages;
// @ts-ignore
    /**
// @ts-ignore
     * The API photos group
// @ts-ignore
     */
// @ts-ignore
    photos: APIPhotos;
// @ts-ignore
    /**
// @ts-ignore
     * The API podcasts group
// @ts-ignore
     */
// @ts-ignore
    podcasts: APIPodcasts;
// @ts-ignore
    /**
// @ts-ignore
     * The API polls group
// @ts-ignore
     */
// @ts-ignore
    polls: APIPolls;
// @ts-ignore
    /**
// @ts-ignore
     * The API prettyCards group
// @ts-ignore
     */
// @ts-ignore
    prettyCards: APIPrettyCards;
// @ts-ignore
    /**
// @ts-ignore
     * The API search group
// @ts-ignore
     */
// @ts-ignore
    search: APISearch;
// @ts-ignore
    /**
// @ts-ignore
     * The API secure group
// @ts-ignore
     */
// @ts-ignore
    secure: APISecure;
// @ts-ignore
    /**
// @ts-ignore
     * The API stats group
// @ts-ignore
     */
// @ts-ignore
    stats: APIStats;
// @ts-ignore
    /**
// @ts-ignore
     * The API status group
// @ts-ignore
     */
// @ts-ignore
    status: APIStatus;
// @ts-ignore
    /**
// @ts-ignore
     * The API storage group
// @ts-ignore
     */
// @ts-ignore
    storage: APIStorage;
// @ts-ignore
    /**
// @ts-ignore
     * The API store group
// @ts-ignore
     */
// @ts-ignore
    store: APIStore;
// @ts-ignore
    /**
// @ts-ignore
     * The API stories group
// @ts-ignore
     */
// @ts-ignore
    stories: APIStories;
// @ts-ignore
    /**
// @ts-ignore
     * The API streaming group
// @ts-ignore
     */
// @ts-ignore
    streaming: APIStreaming;
// @ts-ignore
    /**
// @ts-ignore
     * The API users group
// @ts-ignore
     */
// @ts-ignore
    users: APIUsers;
// @ts-ignore
    /**
// @ts-ignore
     * The API utils group
// @ts-ignore
     */
// @ts-ignore
    utils: APIUtils;
// @ts-ignore
    /**
// @ts-ignore
     * The API video group
// @ts-ignore
     */
// @ts-ignore
    video: APIVideo;
// @ts-ignore
    /**
// @ts-ignore
     * The API wall group
// @ts-ignore
     */
// @ts-ignore
    wall: APIWall;
// @ts-ignore
    /**
// @ts-ignore
     * The API widgets group
// @ts-ignore
     */
// @ts-ignore
    widgets: APIWidgets;
// @ts-ignore
}
// @ts-ignore

