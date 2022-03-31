// @ts-ignore
/* eslint-disable */
// @ts-ignore
import * as Objects from "./objects";
// @ts-ignore

// @ts-ignore
export interface AccountChangePasswordResponse {
// @ts-ignore
    /**
// @ts-ignore
     * New token
// @ts-ignore
     */
// @ts-ignore
    token: string;
// @ts-ignore
    /**
// @ts-ignore
     * New secret
// @ts-ignore
     */
// @ts-ignore
    secret: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountGetActiveOffersResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.AccountOffer[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AccountGetAppPermissionsResponse = number;
// @ts-ignore

// @ts-ignore
export interface AccountGetBannedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: number[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroup[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AccountGetCountersResponse = Objects.AccountAccountCounters;
// @ts-ignore

// @ts-ignore
export type AccountGetInfoResponse = Objects.AccountInfo;
// @ts-ignore

// @ts-ignore
export type AccountGetProfileInfoResponse = Objects.AccountUserSettings;
// @ts-ignore

// @ts-ignore
export type AccountGetPushSettingsResponse = Objects.AccountPushSettings;
// @ts-ignore

// @ts-ignore
export interface AccountSaveProfileInfoResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AdsAddOfficeUsersResponse = boolean | number;
// @ts-ignore

// @ts-ignore
export type AdsCheckLinkResponse = Objects.AdsLinkStatus;
// @ts-ignore

// @ts-ignore
export type AdsCreateAdsResponse = Objects.AdsCreateAdStatus[];
// @ts-ignore

// @ts-ignore
export type AdsCreateCampaignsResponse = Objects.AdsCreateCampaignStatus[];
// @ts-ignore

// @ts-ignore
export type AdsCreateClientsResponse = number[];
// @ts-ignore

// @ts-ignore
export interface AdsCreateTargetGroupResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Group ID
// @ts-ignore
     */
// @ts-ignore
    id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Pixel code
// @ts-ignore
     */
// @ts-ignore
    pixel: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AdsDeleteAdsResponse = number[];
// @ts-ignore

// @ts-ignore
export type AdsDeleteCampaignsResponse = number[];
// @ts-ignore

// @ts-ignore
export type AdsDeleteClientsResponse = number[];
// @ts-ignore

// @ts-ignore
export type AdsGetAccountsResponse = Objects.AdsAccount[];
// @ts-ignore

// @ts-ignore
export type AdsGetAdsLayoutResponse = Objects.AdsAdLayout[];
// @ts-ignore

// @ts-ignore
export type AdsGetAdsTargetingResponse = Objects.AdsTargSettings[];
// @ts-ignore

// @ts-ignore
export type AdsGetAdsResponse = Objects.AdsAd[];
// @ts-ignore

// @ts-ignore
export type AdsGetBudgetResponse = number;
// @ts-ignore

// @ts-ignore
export type AdsGetCampaignsResponse = Objects.AdsCampaign[];
// @ts-ignore

// @ts-ignore
export interface AdsGetCategoriesResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    v1: Objects.AdsCategory[];
// @ts-ignore
    v2: Objects.AdsCategory[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AdsGetClientsResponse = Objects.AdsClient[];
// @ts-ignore

// @ts-ignore
export type AdsGetDemographicsResponse = Objects.AdsDemoStats[];
// @ts-ignore

// @ts-ignore
export type AdsGetFloodStatsResponse = Objects.AdsFloodStats;
// @ts-ignore

// @ts-ignore
export interface AdsGetLookalikeRequestsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total count of found lookalike requests
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.AdsLookalikeRequest[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetMusiciansResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.AdsMusician[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AdsGetOfficeUsersResponse = Objects.AdsUsers[];
// @ts-ignore

// @ts-ignore
export type AdsGetPostsReachResponse = Objects.AdsPromotedPostReach[];
// @ts-ignore

// @ts-ignore
export type AdsGetRejectionReasonResponse = Objects.AdsRejectReason;
// @ts-ignore

// @ts-ignore
export type AdsGetStatisticsResponse = Objects.AdsStats[];
// @ts-ignore

// @ts-ignore
export type AdsGetSuggestionsCitiesResponse = Objects.AdsTargSuggestionsCities[];
// @ts-ignore

// @ts-ignore
export type AdsGetSuggestionsRegionsResponse = Objects.AdsTargSuggestionsRegions[];
// @ts-ignore

// @ts-ignore
export type AdsGetSuggestionsResponse = Objects.AdsTargSuggestions[];
// @ts-ignore

// @ts-ignore
export type AdsGetSuggestionsSchoolsResponse = Objects.AdsTargSuggestionsSchools[];
// @ts-ignore

// @ts-ignore
export type AdsGetTargetGroupsResponse = Objects.AdsTargetGroup[];
// @ts-ignore

// @ts-ignore
export type AdsGetTargetingStatsResponse = Objects.AdsTargStats;
// @ts-ignore

// @ts-ignore
export type AdsGetUploadURLResponse = string;
// @ts-ignore

// @ts-ignore
export type AdsGetVideoUploadURLResponse = string;
// @ts-ignore

// @ts-ignore
export type AdsImportTargetContactsResponse = number;
// @ts-ignore

// @ts-ignore
export type AdsRemoveOfficeUsersResponse = boolean | number;
// @ts-ignore

// @ts-ignore
export type AdsUpdateAdsResponse = number[];
// @ts-ignore

// @ts-ignore
export type AdsUpdateCampaignsResponse = number;
// @ts-ignore

// @ts-ignore
export type AdsUpdateClientsResponse = number;
// @ts-ignore

// @ts-ignore
export type AdsUpdateOfficeUsersResponse = Objects.AdsUpdateOfficeUsersResult[];
// @ts-ignore

// @ts-ignore
export interface AdswebGetAdCategoriesResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    categories: Objects.AdswebGetAdCategoriesResponseCategoriesCategory[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdswebGetAdUnitCodeResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    html: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdswebGetAdUnitsResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    count: number;
// @ts-ignore
    ad_units: Objects.AdswebGetAdUnitsResponseAdUnitsAdUnit[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdswebGetFraudHistoryResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    count: number;
// @ts-ignore
    entries: Objects.AdswebGetFraudHistoryResponseEntriesEntry[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdswebGetSitesResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    count: number;
// @ts-ignore
    sites: Objects.AdswebGetSitesResponseSitesSite[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdswebGetStatisticsResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    next_page_id: string;
// @ts-ignore
    items: Objects.AdswebGetStatisticsResponseItemsItem[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppWidgetsGetAppImageUploadServerResponse {
// @ts-ignore
    /**
// @ts-ignore
     * To upload an image, generate POST-request to upload_url with a file in photo field. Then call appWidgets.saveAppImage method
// @ts-ignore
     */
// @ts-ignore
    upload_url: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AppWidgetsGetAppImagesResponse = Objects.AppWidgetsPhotos;
// @ts-ignore

// @ts-ignore
export interface AppWidgetsGetGroupImageUploadServerResponse {
// @ts-ignore
    /**
// @ts-ignore
     * To upload an image, generate POST-request to upload_url with a file in photo field. Then call appWidgets.saveAppImage method
// @ts-ignore
     */
// @ts-ignore
    upload_url: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AppWidgetsGetGroupImagesResponse = Objects.AppWidgetsPhotos;
// @ts-ignore

// @ts-ignore
export type AppWidgetsGetImagesByIdResponse = Objects.AppWidgetsPhoto[];
// @ts-ignore

// @ts-ignore
export type AppWidgetsSaveAppImageResponse = Objects.AppWidgetsPhoto;
// @ts-ignore

// @ts-ignore
export type AppWidgetsSaveGroupImageResponse = Objects.AppWidgetsPhoto;
// @ts-ignore

// @ts-ignore
export type AppsGetCatalogResponse = Objects.AppsCatalogList;
// @ts-ignore

// @ts-ignore
export interface AppsGetFriendsListExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.UsersUserFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppsGetFriendsListResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: number[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppsGetLeaderboardExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.AppsLeaderboard[];
// @ts-ignore
    profiles: Objects.UsersUser[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppsGetLeaderboardResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.AppsLeaderboard[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppsGetMiniAppPoliciesResponse {
// @ts-ignore
    /**
// @ts-ignore
     * URL of the app's privacy policy
// @ts-ignore
     */
// @ts-ignore
    privacy_policy: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the app's terms
// @ts-ignore
     */
// @ts-ignore
    terms: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppsGetScopesResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.AppsScope[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AppsGetScoreResponse = number;
// @ts-ignore

// @ts-ignore
export interface AppsGetResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number of applications
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.AppsApp[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppsImageUploadResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Uploading hash
// @ts-ignore
     */
// @ts-ignore
    hash: string;
// @ts-ignore
    /**
// @ts-ignore
     * Uploaded photo data
// @ts-ignore
     */
// @ts-ignore
    image: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AppsSendRequestResponse = number;
// @ts-ignore

// @ts-ignore
export interface AuthRestoreResponse {
// @ts-ignore
    /**
// @ts-ignore
     * 1 if success
// @ts-ignore
     */
// @ts-ignore
    success: 1;
// @ts-ignore
    /**
// @ts-ignore
     * Parameter needed to grant access by code
// @ts-ignore
     */
// @ts-ignore
    sid: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type BaseBoolResponse = Objects.BaseBoolInt;
// @ts-ignore

// @ts-ignore
export type BaseGetUploadServerResponse = Objects.BaseUploadServer;
// @ts-ignore

// @ts-ignore
export type BaseOkResponse = 1;
// @ts-ignore

// @ts-ignore
export type BoardAddTopicResponse = number;
// @ts-ignore

// @ts-ignore
export type BoardCreateCommentResponse = number;
// @ts-ignore

// @ts-ignore
export interface BoardGetCommentsExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset of comment
// @ts-ignore
     */
// @ts-ignore
    real_offset: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.BoardTopicComment[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BoardGetCommentsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset of comment
// @ts-ignore
     */
// @ts-ignore
    real_offset: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.BoardTopicComment[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BoardGetTopicsExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.BoardTopic[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BoardGetTopicsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.BoardTopic[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DatabaseGetChairsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.BaseObject[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type DatabaseGetCitiesByIdResponse = Objects.DatabaseCityById[];
// @ts-ignore

// @ts-ignore
export interface DatabaseGetCitiesResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.DatabaseCity[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type DatabaseGetCountriesByIdResponse = Objects.BaseCountry[];
// @ts-ignore

// @ts-ignore
export interface DatabaseGetCountriesResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.BaseCountry[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DatabaseGetFacultiesResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.DatabaseFaculty[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type DatabaseGetMetroStationsByIdResponse = Objects.DatabaseStation[];
// @ts-ignore

// @ts-ignore
export interface DatabaseGetMetroStationsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.DatabaseStation[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DatabaseGetRegionsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.DatabaseRegion[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type DatabaseGetSchoolClassesResponse = any[][];
// @ts-ignore

// @ts-ignore
export interface DatabaseGetSchoolsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.DatabaseSchool[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DatabaseGetUniversitiesResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.DatabaseUniversity[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type DocsAddResponse = number;
// @ts-ignore

// @ts-ignore
export interface DocsDocUploadResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Uploaded file data
// @ts-ignore
     */
// @ts-ignore
    file: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type DocsGetByIdResponse = Objects.DocsDoc[];
// @ts-ignore

// @ts-ignore
export interface DocsGetTypesResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.DocsDocTypes[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type DocsGetUploadServerResponse = Objects.BaseUploadServer;
// @ts-ignore

// @ts-ignore
export interface DocsGetResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.DocsDoc[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DocsSaveResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DocsSearchResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.DocsDoc[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type DonutGetSubscriptionResponse = Objects.DonutDonatorSubscriptionInfo;
// @ts-ignore

// @ts-ignore
export interface DonutGetSubscriptionsResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    subscriptions: Objects.DonutDonatorSubscriptionInfo[];
// @ts-ignore
    count: number;
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DownloadedGamesPaidStatusResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Game has been paid
// @ts-ignore
     */
// @ts-ignore
    is_paid: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type FaveAddTagResponse = Objects.FaveTag;
// @ts-ignore

// @ts-ignore
export interface FaveGetPagesResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    count: number;
// @ts-ignore
    items: Objects.FavePage[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveGetTagsResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    count: number;
// @ts-ignore
    items: Objects.FaveTag[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveGetExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.FaveBookmark[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroup[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveGetResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.FaveBookmark[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsAddListResponse {
// @ts-ignore
    /**
// @ts-ignore
     * List ID
// @ts-ignore
     */
// @ts-ignore
    list_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type FriendsAddResponse = 1 | 2 | 4;
// @ts-ignore

// @ts-ignore
export type FriendsAreFriendsExtendedResponse = Objects.FriendsFriendExtendedStatus[];
// @ts-ignore

// @ts-ignore
export type FriendsAreFriendsResponse = Objects.FriendsFriendStatus[];
// @ts-ignore

// @ts-ignore
export interface FriendsDeleteResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Returns 1 if friend has been deleted
// @ts-ignore
     */
// @ts-ignore
    friend_deleted: 1;
// @ts-ignore
    /**
// @ts-ignore
     * Returns 1 if out request has been canceled
// @ts-ignore
     */
// @ts-ignore
    out_request_deleted: 1;
// @ts-ignore
    /**
// @ts-ignore
     * Returns 1 if incoming request has been declined
// @ts-ignore
     */
// @ts-ignore
    in_request_deleted: 1;
// @ts-ignore
    /**
// @ts-ignore
     * Returns 1 if suggestion has been declined
// @ts-ignore
     */
// @ts-ignore
    suggestion_deleted: 1;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    success: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type FriendsGetAppUsersResponse = number[];
// @ts-ignore

// @ts-ignore
export type FriendsGetByPhonesResponse = Objects.FriendsUserXtrPhone[];
// @ts-ignore

// @ts-ignore
export interface FriendsGetListsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number of friends lists
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.FriendsFriendsList[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type FriendsGetMutualResponse = number[];
// @ts-ignore

// @ts-ignore
export type FriendsGetMutualTargetUidsResponse = Objects.FriendsMutualFriend[];
// @ts-ignore

// @ts-ignore
export interface FriendsGetOnlineOnlineMobileResponse {
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    online: number[];
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    online_mobile: number[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type FriendsGetOnlineResponse = number[];
// @ts-ignore

// @ts-ignore
export type FriendsGetRecentResponse = number[];
// @ts-ignore

// @ts-ignore
export interface FriendsGetRequestsExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total requests number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.FriendsRequestsXtrMessage[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsGetRequestsNeedMutualResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total requests number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.FriendsRequests[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsGetRequestsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total requests number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    items: number[];
// @ts-ignore
    /**
// @ts-ignore
     * Total unread requests number
// @ts-ignore
     */
// @ts-ignore
    count_unread: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsGetSuggestionsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total results number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.UsersUserFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsGetFieldsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total friends number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.UsersUserFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsGetResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total friends number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    items: number[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsSearchResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.UsersUserFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GiftsGetResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.GiftsGift[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsAddAddressResponse = Objects.GroupsAddress;
// @ts-ignore

// @ts-ignore
export interface GroupsAddCallbackServerResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    server_id: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsAddLinkResponse = Objects.GroupsLinksItem;
// @ts-ignore

// @ts-ignore
export type GroupsCreateResponse = Objects.GroupsGroup;
// @ts-ignore

// @ts-ignore
export type GroupsEditAddressResponse = Objects.GroupsAddress;
// @ts-ignore

// @ts-ignore
export interface GroupsGetAddressesResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total count of addresses
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.GroupsAddress[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetBannedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total users number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.GroupsBannedItem[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsGetByIdObjectLegacyResponse = Objects.GroupsGroupFull[];
// @ts-ignore

// @ts-ignore
export interface GroupsGetCallbackConfirmationCodeResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Confirmation code
// @ts-ignore
     */
// @ts-ignore
    code: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetCallbackServersResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    count: number;
// @ts-ignore
    items: Objects.GroupsCallbackServer[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsGetCallbackSettingsResponse = Objects.GroupsCallbackSettings;
// @ts-ignore

// @ts-ignore
export interface GroupsGetCatalogInfoExtendedResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    categories: Objects.GroupsGroupCategoryFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetCatalogInfoResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    categories: Objects.GroupsGroupCategory[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetCatalogResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total communities number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.GroupsGroup[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetInvitedUsersResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total communities number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.UsersUserFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetInvitesExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total communities number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.GroupsGroupFull[];
// @ts-ignore
    profiles: Objects.UsersUserMin[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetInvitesResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total communities number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsGetLongPollServerResponse = Objects.GroupsLongPollServer;
// @ts-ignore

// @ts-ignore
export type GroupsGetLongPollSettingsResponse = Objects.GroupsLongPollSettings;
// @ts-ignore

// @ts-ignore
export interface GroupsGetMembersFieldsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total members number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.GroupsUserXtrRole[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetMembersFilterResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total members number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.GroupsMemberRole[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetMembersResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total members number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    items: number[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetRequestsFieldsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total communities number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.UsersUserFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetRequestsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total communities number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    items: number[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetSettingsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Community's page domain
// @ts-ignore
     */
// @ts-ignore
    address: string;
// @ts-ignore
    /**
// @ts-ignore
     * Articles settings
// @ts-ignore
     */
// @ts-ignore
    articles: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo suggests setting
// @ts-ignore
     */
// @ts-ignore
    recognize_photo: number;
// @ts-ignore
    /**
// @ts-ignore
     * City id of group
// @ts-ignore
     */
// @ts-ignore
    city_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * City name of group
// @ts-ignore
     */
// @ts-ignore
    city_name: string;
// @ts-ignore
    /**
// @ts-ignore
     * Country id of group
// @ts-ignore
     */
// @ts-ignore
    country_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Country name of group
// @ts-ignore
     */
// @ts-ignore
    country_name: string;
// @ts-ignore
    /**
// @ts-ignore
     * Community description
// @ts-ignore
     */
// @ts-ignore
    description: string;
// @ts-ignore
    /**
// @ts-ignore
     * Information about the group category
// @ts-ignore
     */
// @ts-ignore
    public_category: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information about the group subcategory
// @ts-ignore
     */
// @ts-ignore
    public_subcategory: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the RSS feed
// @ts-ignore
     */
// @ts-ignore
    rss: string;
// @ts-ignore
    /**
// @ts-ignore
     * Start date
// @ts-ignore
     */
// @ts-ignore
    start_date: number;
// @ts-ignore
    /**
// @ts-ignore
     * Finish date in Unix-time format
// @ts-ignore
     */
// @ts-ignore
    finish_date: number;
// @ts-ignore
    /**
// @ts-ignore
     * Community subject ID
// @ts-ignore
     */
// @ts-ignore
    subject: number;
// @ts-ignore
    /**
// @ts-ignore
     * Community title
// @ts-ignore
     */
// @ts-ignore
    title: string;
// @ts-ignore
    /**
// @ts-ignore
     * Community website
// @ts-ignore
     */
// @ts-ignore
    website: string;
// @ts-ignore
    /**
// @ts-ignore
     * Community phone
// @ts-ignore
     */
// @ts-ignore
    phone: string;
// @ts-ignore
    /**
// @ts-ignore
     * Community email
// @ts-ignore
     */
// @ts-ignore
    email: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    sections_list: Objects.GroupsSectionsListItem[];
// @ts-ignore
    obscene_words: string[];
// @ts-ignore
    event_group_id: number;
// @ts-ignore
    public_category_list: Objects.GroupsGroupPublicCategoryList[];
// @ts-ignore
    public_date: string;
// @ts-ignore
    public_date_label: string;
// @ts-ignore
    subject_list: Objects.GroupsSubjectItem[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsGetTagListResponse = Objects.GroupsGroupTag[];
// @ts-ignore

// @ts-ignore
export interface GroupsGetTokenPermissionsResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    mask: number;
// @ts-ignore
    permissions: Objects.GroupsTokenPermissionSetting[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetObjectExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total communities number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total communities number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Community ID
// @ts-ignore
     */
// @ts-ignore
    items: number[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsIsMemberExtendedResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsIsMemberResponse = Objects.BaseBoolInt;
// @ts-ignore

// @ts-ignore
export type GroupsIsMemberUserIdsExtendedResponse = Objects.GroupsMemberStatusFull[];
// @ts-ignore

// @ts-ignore
export type GroupsIsMemberUserIdsResponse = Objects.GroupsMemberStatus[];
// @ts-ignore

// @ts-ignore
export interface GroupsSearchResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total communities number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.GroupsGroup[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LeadFormsCreateResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    form_id: number;
// @ts-ignore
    url: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LeadFormsDeleteResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    form_id: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LeadFormsGetLeadsResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    leads: Objects.LeadFormsLead[];
// @ts-ignore
    next_page_token: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type LeadFormsGetResponse = Objects.LeadFormsForm;
// @ts-ignore

// @ts-ignore
export type LeadFormsListResponse = Objects.LeadFormsForm[];
// @ts-ignore

// @ts-ignore
export type LeadFormsUploadUrlResponse = string;
// @ts-ignore

// @ts-ignore
export interface LikesAddResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total likes number
// @ts-ignore
     */
// @ts-ignore
    likes: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LikesDeleteResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total likes number
// @ts-ignore
     */
// @ts-ignore
    likes: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LikesGetListExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.UsersUserMin[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LikesGetListResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    items: number[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LikesIsLikedResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketAddAlbumResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Album ID
// @ts-ignore
     */
// @ts-ignore
    market_album_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Albums count
// @ts-ignore
     */
// @ts-ignore
    albums_count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketAddResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Item ID
// @ts-ignore
     */
// @ts-ignore
    market_item_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MarketCreateCommentResponse = number;
// @ts-ignore

// @ts-ignore
export type MarketDeleteCommentResponse = Objects.BaseBoolInt;
// @ts-ignore

// @ts-ignore
export interface MarketGetAlbumByIdResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MarketMarketAlbum[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetAlbumsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MarketMarketAlbum[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetByIdExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MarketMarketItemFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetByIdResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MarketMarketItem[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetCategoriesNewResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MarketMarketCategoryTree[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetCategoriesResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MarketMarketCategory[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetCommentsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallComment[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetGroupOrdersResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MarketOrder[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetOrderByIdResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetOrderItemsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MarketOrderItem[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetOrdersExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MarketOrder[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetOrdersResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MarketOrder[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MarketMarketItemFull[];
// @ts-ignore
    variants: Objects.MarketMarketItemFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MarketMarketItem[];
// @ts-ignore
    variants: Objects.MarketMarketItem[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MarketRestoreCommentResponse = Objects.BaseBoolInt;
// @ts-ignore

// @ts-ignore
export interface MarketSearchExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MarketMarketItemFull[];
// @ts-ignore
    variants: Objects.MarketMarketItemFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketSearchResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MarketMarketItem[];
// @ts-ignore
    variants: Objects.MarketMarketItem[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessagesCreateChatResponse = number;
// @ts-ignore

// @ts-ignore
export interface MessagesDeleteChatPhotoResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Service message ID
// @ts-ignore
     */
// @ts-ignore
    message_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesDeleteConversationResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Id of the last message, that was deleted
// @ts-ignore
     */
// @ts-ignore
    last_deleted_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessagesDeleteResponse = any;
// @ts-ignore

// @ts-ignore
export type MessagesEditResponse = Objects.BaseBoolInt;
// @ts-ignore

// @ts-ignore
export interface MessagesGetByConversationMessageIdExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MessagesMessage[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetByConversationMessageIdResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MessagesMessage[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetByIdExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MessagesMessage[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetByIdResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MessagesMessage[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetChatPreviewResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessagesGetChatChatIdsFieldsResponse = Objects.MessagesChatFull[];
// @ts-ignore

// @ts-ignore
export type MessagesGetChatChatIdsResponse = Objects.MessagesChat[];
// @ts-ignore

// @ts-ignore
export type MessagesGetChatFieldsResponse = Objects.MessagesChatFull;
// @ts-ignore

// @ts-ignore
export type MessagesGetChatResponse = Objects.MessagesChat;
// @ts-ignore

// @ts-ignore
export type MessagesGetConversationMembersResponse = Objects.MessagesGetConversationMembers;
// @ts-ignore

// @ts-ignore
export type MessagesGetConversationsByIdExtendedResponse = Objects.MessagesGetConversationByIdExtended;
// @ts-ignore

// @ts-ignore
export type MessagesGetConversationsByIdResponse = Objects.MessagesGetConversationById;
// @ts-ignore

// @ts-ignore
export interface MessagesGetConversationsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Unread dialogs number
// @ts-ignore
     */
// @ts-ignore
    unread_count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MessagesConversationWithMessage[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetHistoryAttachmentsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Value for pagination
// @ts-ignore
     */
// @ts-ignore
    next_from: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MessagesHistoryAttachment[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetHistoryExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MessagesMessage[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
    conversations: Objects.MessagesConversation[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetHistoryResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MessagesMessage[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetImportantMessagesExtendedResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
    conversations: Objects.MessagesConversation[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetImportantMessagesResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    profiles: Objects.UsersUser[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
    conversations: Objects.MessagesConversation[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetIntentUsersResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    count: number;
// @ts-ignore
    items: number[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetInviteLinkResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    link: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessagesGetLastActivityResponse = Objects.MessagesLastActivity;
// @ts-ignore

// @ts-ignore
export interface MessagesGetLongPollHistoryResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Longpoll event value
// @ts-ignore
     */
// @ts-ignore
    history: number[][];
// @ts-ignore
    /**
// @ts-ignore
     * Persistence timestamp
// @ts-ignore
     */
// @ts-ignore
    new_pts: number;
// @ts-ignore
    /**
// @ts-ignore
     * Has more
// @ts-ignore
     */
// @ts-ignore
    more: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
    chats: Objects.MessagesChat[];
// @ts-ignore
    from_pts: number;
// @ts-ignore
    conversations: Objects.MessagesConversation[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessagesGetLongPollServerResponse = Objects.MessagesLongpollParams;
// @ts-ignore

// @ts-ignore
export interface MessagesIsMessagesFromGroupAllowedResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesJoinChatByInviteLinkResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    chat_id: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessagesMarkAsImportantResponse = number[];
// @ts-ignore

// @ts-ignore
export type MessagesPinResponse = Objects.MessagesPinnedMessage;
// @ts-ignore

// @ts-ignore
export interface MessagesSearchConversationsExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total results number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MessagesConversation[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesSearchConversationsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total results number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MessagesConversation[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesSearchExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MessagesMessage[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
    conversations: Objects.MessagesConversation[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesSearchResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.MessagesMessage[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessagesSendResponse = number;
// @ts-ignore

// @ts-ignore
export type MessagesSendUserIdsResponse = Objects.MessagesSendUserIdsResponseItem[];
// @ts-ignore

// @ts-ignore
export interface MessagesSetChatPhotoResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Service message ID
// @ts-ignore
     */
// @ts-ignore
    message_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedGenericResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.NewsfeedNewsfeedItem[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
    new_returned_news_items_count: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedGetBannedExtendedResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedGetBannedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID
// @ts-ignore
     */
// @ts-ignore
    groups: number[];
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    members: number[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedGetCommentsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Next from value
// @ts-ignore
     */
// @ts-ignore
    next_from: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.NewsfeedNewsfeedItem[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedGetListsExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.NewsfeedListFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedGetListsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.NewsfeedList[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedGetMentionsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallpostToId[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedGetSuggestedSourcesResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.UsersSubscriptionsItem[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedIgnoreItemResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    status: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type NewsfeedSaveListResponse = number;
// @ts-ignore

// @ts-ignore
export interface NewsfeedSearchExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Filtered number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    total_count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallpostFull[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
    suggested_queries: string[];
// @ts-ignore
    next_from: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedSearchResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Filtered number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    total_count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallpostFull[];
// @ts-ignore
    suggested_queries: string[];
// @ts-ignore
    next_from: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type NotesAddResponse = number;
// @ts-ignore

// @ts-ignore
export type NotesCreateCommentResponse = number;
// @ts-ignore

// @ts-ignore
export type NotesGetByIdResponse = Objects.NotesNote;
// @ts-ignore

// @ts-ignore
export interface NotesGetCommentsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.NotesNoteComment[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotesGetResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.NotesNote[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotificationsGetResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Time when user has been checked notifications last time
// @ts-ignore
     */
// @ts-ignore
    last_viewed: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.NotificationsNotificationItem[];
// @ts-ignore
    profiles: Objects.UsersUser[];
// @ts-ignore
    groups: Objects.GroupsGroup[];
// @ts-ignore
    photos: Objects.PhotosPhoto[];
// @ts-ignore
    videos: Objects.VideoVideo[];
// @ts-ignore
    apps: Objects.AppsApp[];
// @ts-ignore
    next_from: string;
// @ts-ignore
    ttl: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type NotificationsMarkAsViewedResponse = Objects.BaseBoolInt;
// @ts-ignore

// @ts-ignore
export type NotificationsSendMessageResponse = Objects.NotificationsSendMessageItem[];
// @ts-ignore

// @ts-ignore
export type OrdersCancelSubscriptionResponse = Objects.BaseBoolInt;
// @ts-ignore

// @ts-ignore
export type OrdersChangeStateResponse = string;
// @ts-ignore

// @ts-ignore
export type OrdersGetAmountResponse = Objects.OrdersAmount[];
// @ts-ignore

// @ts-ignore
export type OrdersGetByIdResponse = Objects.OrdersOrder[];
// @ts-ignore

// @ts-ignore
export type OrdersGetUserSubscriptionByIdResponse = Objects.OrdersSubscription;
// @ts-ignore

// @ts-ignore
export interface OrdersGetUserSubscriptionsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.OrdersSubscription[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type OrdersGetResponse = Objects.OrdersOrder[];
// @ts-ignore

// @ts-ignore
export type OrdersUpdateSubscriptionResponse = Objects.BaseBoolInt;
// @ts-ignore

// @ts-ignore
export type PagesGetHistoryResponse = Objects.PagesWikipageHistory[];
// @ts-ignore

// @ts-ignore
export type PagesGetTitlesResponse = Objects.PagesWikipage[];
// @ts-ignore

// @ts-ignore
export type PagesGetVersionResponse = Objects.PagesWikipageFull;
// @ts-ignore

// @ts-ignore
export type PagesGetResponse = Objects.PagesWikipageFull;
// @ts-ignore

// @ts-ignore
export type PagesParseWikiResponse = string;
// @ts-ignore

// @ts-ignore
export type PagesSaveAccessResponse = number;
// @ts-ignore

// @ts-ignore
export type PagesSaveResponse = number;
// @ts-ignore

// @ts-ignore
export type PhotosCopyResponse = number;
// @ts-ignore

// @ts-ignore
export type PhotosCreateAlbumResponse = Objects.PhotosPhotoAlbumFull;
// @ts-ignore

// @ts-ignore
export type PhotosCreateCommentResponse = number;
// @ts-ignore

// @ts-ignore
export type PhotosDeleteCommentResponse = Objects.BaseBoolInt;
// @ts-ignore

// @ts-ignore
export type PhotosGetAlbumsCountResponse = number;
// @ts-ignore

// @ts-ignore
export interface PhotosGetAlbumsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.PhotosPhotoAlbumFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetAllCommentsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallComment[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetAllExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.PhotosPhotoFullXtrRealOffset[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetAllResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.PhotosPhotoXtrRealOffset[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type PhotosGetByIdResponse = Objects.PhotosPhoto[];
// @ts-ignore

// @ts-ignore
export interface PhotosGetCommentsExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Real offset of the comments
// @ts-ignore
     */
// @ts-ignore
    real_offset: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallComment[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetCommentsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Real offset of the comments
// @ts-ignore
     */
// @ts-ignore
    real_offset: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallComment[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type PhotosGetMarketUploadServerResponse = Objects.BaseUploadServer;
// @ts-ignore

// @ts-ignore
export type PhotosGetMessagesUploadServerResponse = Objects.PhotosPhotoUpload;
// @ts-ignore

// @ts-ignore
export interface PhotosGetNewTagsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.PhotosPhotoXtrTagInfo[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type PhotosGetTagsResponse = Objects.PhotosPhotoTag[];
// @ts-ignore

// @ts-ignore
export type PhotosGetUploadServerResponse = Objects.PhotosPhotoUpload;
// @ts-ignore

// @ts-ignore
export interface PhotosGetUserPhotosResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.PhotosPhoto[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type PhotosGetWallUploadServerResponse = Objects.PhotosPhotoUpload;
// @ts-ignore

// @ts-ignore
export interface PhotosGetResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.PhotosPhoto[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosMarketAlbumUploadResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID
// @ts-ignore
     */
// @ts-ignore
    gid: number;
// @ts-ignore
    /**
// @ts-ignore
     * Uploading hash
// @ts-ignore
     */
// @ts-ignore
    hash: string;
// @ts-ignore
    /**
// @ts-ignore
     * Uploaded photo data
// @ts-ignore
     */
// @ts-ignore
    photo: string;
// @ts-ignore
    /**
// @ts-ignore
     * Upload server number
// @ts-ignore
     */
// @ts-ignore
    server: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosMarketUploadResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Crop data
// @ts-ignore
     */
// @ts-ignore
    crop_data: string;
// @ts-ignore
    /**
// @ts-ignore
     * Crop hash
// @ts-ignore
     */
// @ts-ignore
    crop_hash: string;
// @ts-ignore
    /**
// @ts-ignore
     * Community ID
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Uploading hash
// @ts-ignore
     */
// @ts-ignore
    hash: string;
// @ts-ignore
    /**
// @ts-ignore
     * Uploaded photo data
// @ts-ignore
     */
// @ts-ignore
    photo: string;
// @ts-ignore
    /**
// @ts-ignore
     * Upload server number
// @ts-ignore
     */
// @ts-ignore
    server: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosMessageUploadResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Uploading hash
// @ts-ignore
     */
// @ts-ignore
    hash: string;
// @ts-ignore
    /**
// @ts-ignore
     * Uploaded photo data
// @ts-ignore
     */
// @ts-ignore
    photo: string;
// @ts-ignore
    /**
// @ts-ignore
     * Upload server number
// @ts-ignore
     */
// @ts-ignore
    server: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosOwnerCoverUploadResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Uploading hash
// @ts-ignore
     */
// @ts-ignore
    hash: string;
// @ts-ignore
    /**
// @ts-ignore
     * Uploaded photo data
// @ts-ignore
     */
// @ts-ignore
    photo: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosOwnerUploadResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Uploading hash
// @ts-ignore
     */
// @ts-ignore
    hash: string;
// @ts-ignore
    /**
// @ts-ignore
     * Uploaded photo data
// @ts-ignore
     */
// @ts-ignore
    photo: string;
// @ts-ignore
    /**
// @ts-ignore
     * Upload server number
// @ts-ignore
     */
// @ts-ignore
    server: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosPhotoUploadResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Album ID
// @ts-ignore
     */
// @ts-ignore
    aid: number;
// @ts-ignore
    /**
// @ts-ignore
     * Uploading hash
// @ts-ignore
     */
// @ts-ignore
    hash: string;
// @ts-ignore
    /**
// @ts-ignore
     * Uploaded photo data
// @ts-ignore
     */
// @ts-ignore
    photo: string;
// @ts-ignore
    /**
// @ts-ignore
     * Uploaded photos data
// @ts-ignore
     */
// @ts-ignore
    photos_list: string;
// @ts-ignore
    /**
// @ts-ignore
     * Upload server number
// @ts-ignore
     */
// @ts-ignore
    server: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type PhotosPutTagResponse = number;
// @ts-ignore

// @ts-ignore
export type PhotosRestoreCommentResponse = Objects.BaseBoolInt;
// @ts-ignore

// @ts-ignore
export type PhotosSaveMarketAlbumPhotoResponse = Objects.PhotosPhoto[];
// @ts-ignore

// @ts-ignore
export type PhotosSaveMarketPhotoResponse = Objects.PhotosPhoto[];
// @ts-ignore

// @ts-ignore
export type PhotosSaveMessagesPhotoResponse = Objects.PhotosPhoto[];
// @ts-ignore

// @ts-ignore
export interface PhotosSaveOwnerCoverPhotoResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    images: Objects.BaseImage[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosSaveOwnerPhotoResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Photo hash
// @ts-ignore
     */
// @ts-ignore
    photo_hash: string;
// @ts-ignore
    /**
// @ts-ignore
     * Uploaded image url
// @ts-ignore
     */
// @ts-ignore
    photo_src: string;
// @ts-ignore
    /**
// @ts-ignore
     * Uploaded image url
// @ts-ignore
     */
// @ts-ignore
    photo_src_big: string;
// @ts-ignore
    /**
// @ts-ignore
     * Uploaded image url
// @ts-ignore
     */
// @ts-ignore
    photo_src_small: string;
// @ts-ignore
    /**
// @ts-ignore
     * Returns 1 if profile photo is saved
// @ts-ignore
     */
// @ts-ignore
    saved: number;
// @ts-ignore
    /**
// @ts-ignore
     * Created post ID
// @ts-ignore
     */
// @ts-ignore
    post_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type PhotosSaveWallPhotoResponse = Objects.PhotosPhoto[];
// @ts-ignore

// @ts-ignore
export type PhotosSaveResponse = Objects.PhotosPhoto[];
// @ts-ignore

// @ts-ignore
export interface PhotosSearchResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.PhotosPhoto[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosWallUploadResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Uploading hash
// @ts-ignore
     */
// @ts-ignore
    hash: string;
// @ts-ignore
    /**
// @ts-ignore
     * Uploaded photo data
// @ts-ignore
     */
// @ts-ignore
    photo: string;
// @ts-ignore
    /**
// @ts-ignore
     * Upload server number
// @ts-ignore
     */
// @ts-ignore
    server: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PodcastsSearchPodcastResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total amount of found results
// @ts-ignore
     */
// @ts-ignore
    results_total: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    podcasts: Objects.PodcastExternalData[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type PollsAddVoteResponse = Objects.BaseBoolInt;
// @ts-ignore

// @ts-ignore
export type PollsCreateResponse = Objects.PollsPoll;
// @ts-ignore

// @ts-ignore
export type PollsDeleteVoteResponse = Objects.BaseBoolInt;
// @ts-ignore

// @ts-ignore
export type PollsGetBackgroundsResponse = Objects.PollsBackground[];
// @ts-ignore

// @ts-ignore
export type PollsGetByIdResponse = Objects.PollsPoll;
// @ts-ignore

// @ts-ignore
export type PollsGetVotersResponse = Objects.PollsVoters[];
// @ts-ignore

// @ts-ignore
export type PollsSavePhotoResponse = Objects.PollsBackground;
// @ts-ignore

// @ts-ignore
export interface PrettyCardsCreateResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Owner ID of created pretty card
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Card ID of created pretty card
// @ts-ignore
     */
// @ts-ignore
    card_id: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PrettyCardsDeleteResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Owner ID of deleted pretty card
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Card ID of deleted pretty card
// @ts-ignore
     */
// @ts-ignore
    card_id: string;
// @ts-ignore
    /**
// @ts-ignore
     * Error reason if error happened
// @ts-ignore
     */
// @ts-ignore
    error: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PrettyCardsEditResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Owner ID of edited pretty card
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Card ID of edited pretty card
// @ts-ignore
     */
// @ts-ignore
    card_id: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type PrettyCardsGetByIdResponse = Objects.PrettyCardsPrettyCardOrError[];
// @ts-ignore

// @ts-ignore
export type PrettyCardsGetUploadURLResponse = string;
// @ts-ignore

// @ts-ignore
export interface PrettyCardsGetResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.PrettyCardsPrettyCard[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface SearchGetHintsResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    count: number;
// @ts-ignore
    items: Objects.SearchHint[];
// @ts-ignore
    suggested_queries: string[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type SecureCheckTokenResponse = Objects.SecureTokenChecked;
// @ts-ignore

// @ts-ignore
export type SecureGetAppBalanceResponse = number;
// @ts-ignore

// @ts-ignore
export type SecureGetSmsHistoryResponse = Objects.SecureSmsNotification[];
// @ts-ignore

// @ts-ignore
export type SecureGetTransactionsHistoryResponse = Objects.SecureTransaction[];
// @ts-ignore

// @ts-ignore
export type SecureGetUserLevelResponse = Objects.SecureLevel[];
// @ts-ignore

// @ts-ignore
export type SecureGiveEventStickerResponse = Objects.SecureGiveEventStickerItem[];
// @ts-ignore

// @ts-ignore
export type SecureSendNotificationResponse = number[];
// @ts-ignore

// @ts-ignore
export type SecureSetCounterArrayResponse = Objects.SecureSetCounterItem[];
// @ts-ignore

// @ts-ignore
export type StatsGetPostReachResponse = Objects.StatsWallpostStat[];
// @ts-ignore

// @ts-ignore
export type StatsGetResponse = Objects.StatsPeriod[];
// @ts-ignore

// @ts-ignore
export type StatusGetResponse = Objects.StatusStatus;
// @ts-ignore

// @ts-ignore
export type StorageGetKeysResponse = string[];
// @ts-ignore

// @ts-ignore
export type StorageGetResponse = Objects.StorageValue[];
// @ts-ignore

// @ts-ignore
export type StoreGetFavoriteStickersResponse = Objects.BaseSticker[];
// @ts-ignore

// @ts-ignore
export type StoreGetProductsResponse = Objects.StoreProduct[];
// @ts-ignore

// @ts-ignore
export interface StoreGetStickersKeywordsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total count of chunks to load
// @ts-ignore
     */
// @ts-ignore
    chunks_count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Chunks version hash
// @ts-ignore
     */
// @ts-ignore
    chunks_hash: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    count: number;
// @ts-ignore
    dictionary: Objects.StoreStickersKeyword[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesGetBannedExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Stories count
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Owner ID
// @ts-ignore
     */
// @ts-ignore
    items: number[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesGetBannedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Stories count
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Owner ID
// @ts-ignore
     */
// @ts-ignore
    items: number[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesGetByIdExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Stories count
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.StoriesStory[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesGetPhotoUploadServerResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Upload URL
// @ts-ignore
     */
// @ts-ignore
    upload_url: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    user_ids: number[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type StoriesGetStatsResponse = Objects.StoriesStoryStats;
// @ts-ignore

// @ts-ignore
export interface StoriesGetVideoUploadServerResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Upload URL
// @ts-ignore
     */
// @ts-ignore
    upload_url: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    user_ids: number[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesGetViewersExtendedV5115Response {
// @ts-ignore
    /**
// @ts-ignore
     * Viewers count
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.StoriesViewersItem[];
// @ts-ignore
    hidden_reason: string;
// @ts-ignore
    next_from: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesGetViewersExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Viewers count
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.UsersUserFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesGetV5113Response {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    count: number;
// @ts-ignore
    items: Objects.StoriesFeedItem[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroup[];
// @ts-ignore
    need_upload_screen: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesGetResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Stories count
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.StoriesStory[][];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroup[];
// @ts-ignore
    need_upload_screen: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesSaveResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    count: number;
// @ts-ignore
    items: Objects.StoriesStory[];
// @ts-ignore
    profiles: Objects.UsersUser[];
// @ts-ignore
    groups: Objects.GroupsGroup[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesUploadResponse {
// @ts-ignore
    /**
// @ts-ignore
     * A string hash that is used in the stories.save method
// @ts-ignore
     */
// @ts-ignore
    upload_result: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StreamingGetServerUrlResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Server host
// @ts-ignore
     */
// @ts-ignore
    endpoint: string;
// @ts-ignore
    /**
// @ts-ignore
     * Access key
// @ts-ignore
     */
// @ts-ignore
    key: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UsersGetFollowersFieldsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number of available results
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.UsersUserFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UsersGetFollowersResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total friends number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    items: number[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UsersGetSubscriptionsExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number of available results
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.UsersSubscriptionsItem[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UsersGetSubscriptionsResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type UsersGetResponse = Objects.UsersUserFull[];
// @ts-ignore

// @ts-ignore
export interface UsersSearchResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number of available results
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.UsersUserFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type UtilsCheckLinkResponse = Objects.UtilsLinkChecked;
// @ts-ignore

// @ts-ignore
export interface UtilsGetLastShortenedLinksResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number of available results
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.UtilsLastShortenedLink[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type UtilsGetLinkStatsExtendedResponse = Objects.UtilsLinkStatsExtended;
// @ts-ignore

// @ts-ignore
export type UtilsGetLinkStatsResponse = Objects.UtilsLinkStats;
// @ts-ignore

// @ts-ignore
export type UtilsGetServerTimeResponse = number;
// @ts-ignore

// @ts-ignore
export type UtilsGetShortLinkResponse = Objects.UtilsShortLink;
// @ts-ignore

// @ts-ignore
export type UtilsResolveScreenNameResponse = Objects.UtilsDomainResolved;
// @ts-ignore

// @ts-ignore
export interface VideoAddAlbumResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Created album ID
// @ts-ignore
     */
// @ts-ignore
    album_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type VideoChangeVideoAlbumsResponse = number[];
// @ts-ignore

// @ts-ignore
export type VideoCreateCommentResponse = number;
// @ts-ignore

// @ts-ignore
export type VideoGetAlbumByIdResponse = Objects.VideoVideoAlbumFull;
// @ts-ignore

// @ts-ignore
export interface VideoGetAlbumsByVideoExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.VideoVideoAlbumFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type VideoGetAlbumsByVideoResponse = number[];
// @ts-ignore

// @ts-ignore
export interface VideoGetAlbumsExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.VideoVideoAlbumFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoGetAlbumsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.VideoVideoAlbum[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoGetCommentsExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Count of replies of current level
// @ts-ignore
     */
// @ts-ignore
    current_level_count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether current user can comment the post
// @ts-ignore
     */
// @ts-ignore
    can_post: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether groups can comment the post
// @ts-ignore
     */
// @ts-ignore
    groups_can_post: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallComment[];
// @ts-ignore
    profiles: Objects.UsersUser[];
// @ts-ignore
    groups: Objects.GroupsGroup[];
// @ts-ignore
    show_reply_button: boolean | number;
// @ts-ignore
    real_offset: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoGetCommentsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Count of replies of current level
// @ts-ignore
     */
// @ts-ignore
    current_level_count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether current user can comment the post
// @ts-ignore
     */
// @ts-ignore
    can_post: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether groups can comment the post
// @ts-ignore
     */
// @ts-ignore
    groups_can_post: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallComment[];
// @ts-ignore
    show_reply_button: boolean | number;
// @ts-ignore
    real_offset: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoGetResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.VideoVideoFull[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type VideoRestoreCommentResponse = Objects.BaseBoolInt;
// @ts-ignore

// @ts-ignore
export type VideoSaveResponse = Objects.VideoSaveResult;
// @ts-ignore

// @ts-ignore
export interface VideoSearchExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.VideoVideoFull[];
// @ts-ignore
    profiles: Objects.UsersUser[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoSearchResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.VideoVideoFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoUploadResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Video size
// @ts-ignore
     */
// @ts-ignore
    size: number;
// @ts-ignore
    /**
// @ts-ignore
     * Video ID
// @ts-ignore
     */
// @ts-ignore
    video_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallCreateCommentResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Created comment ID
// @ts-ignore
     */
// @ts-ignore
    comment_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallEditResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Edited post ID
// @ts-ignore
     */
// @ts-ignore
    post_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallGetByIdExtendedResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallpostFull[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type WallGetByIdLegacyResponse = Objects.WallWallpostFull[];
// @ts-ignore

// @ts-ignore
export interface WallGetByIdResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallpostFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallGetCommentExtendedResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallComment[];
// @ts-ignore
    profiles: Objects.UsersUser[];
// @ts-ignore
    groups: Objects.GroupsGroup[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallGetCommentResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallComment[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallGetCommentsExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Count of replies of current level
// @ts-ignore
     */
// @ts-ignore
    current_level_count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether current user can comment the post
// @ts-ignore
     */
// @ts-ignore
    can_post: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether groups can comment the post
// @ts-ignore
     */
// @ts-ignore
    groups_can_post: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallComment[];
// @ts-ignore
    profiles: Objects.UsersUser[];
// @ts-ignore
    groups: Objects.GroupsGroup[];
// @ts-ignore
    show_reply_button: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallGetCommentsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Count of replies of current level
// @ts-ignore
     */
// @ts-ignore
    current_level_count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether current user can comment the post
// @ts-ignore
     */
// @ts-ignore
    can_post: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether groups can comment the post
// @ts-ignore
     */
// @ts-ignore
    groups_can_post: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallComment[];
// @ts-ignore
    show_reply_button: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallGetRepostsResponse {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallpostFull[];
// @ts-ignore
    profiles: Objects.UsersUser[];
// @ts-ignore
    groups: Objects.GroupsGroup[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallGetExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallpostFull[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallGetResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallpostFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallPostAdsStealthResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Created post ID
// @ts-ignore
     */
// @ts-ignore
    post_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallPostResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Created post ID
// @ts-ignore
     */
// @ts-ignore
    post_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallRepostResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Created post ID
// @ts-ignore
     */
// @ts-ignore
    post_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Reposts number
// @ts-ignore
     */
// @ts-ignore
    reposts_count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Reposts to wall number
// @ts-ignore
     */
// @ts-ignore
    wall_repost_count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Reposts to mail number
// @ts-ignore
     */
// @ts-ignore
    mail_repost_count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Reposts number
// @ts-ignore
     */
// @ts-ignore
    likes_count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    success: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallSearchExtendedResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallpostFull[];
// @ts-ignore
    profiles: Objects.UsersUserFull[];
// @ts-ignore
    groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallSearchResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items: Objects.WallWallpostFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WidgetsGetCommentsResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    posts: Objects.WidgetsWidgetComment[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WidgetsGetPagesResponse {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    pages: Objects.WidgetsWidgetPage[];
// @ts-ignore
}
// @ts-ignore

