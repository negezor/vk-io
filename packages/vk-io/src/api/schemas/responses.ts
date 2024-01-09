/* eslint-disable */
import * as Objects from "./objects";

export interface AccountChangePasswordResponse {
    /**
     * New token
     */
    token: string;
    /**
     * New secret
     */
    secret: string;
    [key: string]: any;
}

export interface AccountGetActiveOffersResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.AccountOffer[];
}

export declare type AccountGetAppPermissionsResponse = number;

export interface AccountGetBannedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: number[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroup[];
}

export declare type AccountGetCountersResponse = Objects.AccountAccountCounters;

export declare type AccountGetInfoResponse = Objects.AccountInfo;

export declare type AccountGetProfileInfoResponse = Objects.AccountUserSettings;

export declare type AccountGetPushSettingsResponse = Objects.AccountPushSettings;

export interface AccountSaveProfileInfoResponse {
    [key: string]: any;
}

export declare type AdsAddOfficeUsersResponse = (boolean | number)[];

export declare type AdsCheckLinkResponse = Objects.AdsLinkStatus;

export declare type AdsCreateAdsResponse = Objects.AdsCreateAdStatus[];

export declare type AdsCreateCampaignsResponse = Objects.AdsCreateCampaignStatus[];

export declare type AdsCreateClientsResponse = Objects.AdsCreateClientsStatus[];

export interface AdsCreateLookalikeRequestResponse {
    /**
     * Request ID
     */
    request_id: number;
    [key: string]: any;
}

export interface AdsCreateTargetGroupResponse {
    /**
     * Group ID
     */
    id: number;
    /**
     * Pixel code
     */
    pixel: string;
    [key: string]: any;
}

export interface AdsCreateTargetPixelResponse {
    /**
     * Pixel ID
     */
    id: number;
    /**
     * Pixel code
     */
    pixel: string;
    [key: string]: any;
}

export declare type AdsDeleteAdsResponse = number[];

export declare type AdsDeleteCampaignsResponse = number[];

export declare type AdsDeleteClientsResponse = number[];

export declare type AdsGetAccountsResponse = Objects.AdsAccount[];

export declare type AdsGetAdsLayoutResponse = Objects.AdsAdLayout[];

export declare type AdsGetAdsTargetingResponse = Objects.AdsTargSettings[];

export declare type AdsGetAdsResponse = Objects.AdsAd[];

export declare type AdsGetBudgetResponse = string;

export declare type AdsGetCampaignsResponse = Objects.AdsCampaign[];

export interface AdsGetCategoriesResponse {
    [key: string]: any;
    v1: Objects.AdsCategory[];
    v2: Objects.AdsCategory[];
}

export declare type AdsGetClientsResponse = Objects.AdsClient[];

export declare type AdsGetDemographicsResponse = Objects.AdsDemoStats[];

export declare type AdsGetFloodStatsResponse = Objects.AdsFloodStats;

export interface AdsGetLookalikeRequestsResponse {
    /**
     * Total count of found lookalike requests
     */
    count: number;
    [key: string]: any;
    items: Objects.AdsLookalikeRequest[];
}

export interface AdsGetMusiciansResponse {
    [key: string]: any;
    items: Objects.AdsMusician[];
}

export declare type AdsGetOfficeUsersResponse = Objects.AdsUsers[];

export declare type AdsGetPostsReachResponse = Objects.AdsPromotedPostReach[];

export declare type AdsGetRejectionReasonResponse = Objects.AdsRejectReason;

export declare type AdsGetStatisticsResponse = Objects.AdsStats[];

export declare type AdsGetSuggestionsCitiesResponse = Objects.AdsTargSuggestionsCities[];

export declare type AdsGetSuggestionsRegionsResponse = Objects.AdsTargSuggestionsRegions[];

export declare type AdsGetSuggestionsResponse = Objects.AdsTargSuggestions[];

export declare type AdsGetSuggestionsSchoolsResponse = Objects.AdsTargSuggestionsSchools[];

export declare type AdsGetTargetGroupsResponse = Objects.AdsTargetGroup[];

export declare type AdsGetTargetPixelsResponse = Objects.AdsTargetPixelInfo[];

export declare type AdsGetTargetingStatsResponse = Objects.AdsTargStats;

export declare type AdsGetUploadURLResponse = string;

export declare type AdsGetVideoUploadURLResponse = string;

export declare type AdsImportTargetContactsResponse = number;

export declare type AdsRemoveOfficeUsersResponse = (boolean | number)[];

export interface AdsRemoveTargetContactsResponse {
    /**
     * Operation result
     */
    result: 1;
    [key: string]: any;
}

export interface AdsSaveLookalikeRequestResultResponse {
    /**
     * Retargeting group ID
     */
    retargeting_group_id: number;
    /**
     * Audience count
     */
    audience_count: number;
    [key: string]: any;
}

export interface AdsShareTargetGroupResponse {
    /**
     * Group ID
     */
    id: number;
    [key: string]: any;
}

export declare type AdsUpdateAdsResponse = Objects.AdsUpdateAdsStatus[];

export declare type AdsUpdateCampaignsResponse = Objects.AdsCreateCampaignStatus[];

export declare type AdsUpdateClientsResponse = Objects.AdsUpdateClientsStatus[];

export declare type AdsUpdateOfficeUsersResponse = Objects.AdsUpdateOfficeUsersResult[];

export interface AdswebGetAdCategoriesResponse {
    [key: string]: any;
    categories: Objects.AdswebGetAdCategoriesResponseCategoriesCategory[];
}

export interface AdswebGetAdUnitCodeResponse {
    [key: string]: any;
    html: string;
}

export interface AdswebGetAdUnitsResponse {
    [key: string]: any;
    count: number;
    ad_units: Objects.AdswebGetAdUnitsResponseAdUnitsAdUnit[];
}

export interface AdswebGetFraudHistoryResponse {
    [key: string]: any;
    count: number;
    entries: Objects.AdswebGetFraudHistoryResponseEntriesEntry[];
}

export interface AdswebGetSitesResponse {
    [key: string]: any;
    count: number;
    sites: Objects.AdswebGetSitesResponseSitesSite[];
}

export interface AdswebGetStatisticsResponse {
    [key: string]: any;
    next_page_id: string;
    items: Objects.AdswebGetStatisticsResponseItemsItem[];
}

export interface AppsCreatedGroupResponse {
    [key: string]: any;
    group_id: number;
}

export declare type AppsGetCatalogResponse = Objects.AppsCatalogList;

export interface AppsGetFriendsListExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.UsersUserFull[];
}

export interface AppsGetFriendsListResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: number[];
}

export interface AppsGetLeaderboardExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.AppsLeaderboard[];
    profiles: Objects.UsersUser[];
}

export interface AppsGetLeaderboardResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.AppsLeaderboard[];
}

export interface AppsGetMiniAppPoliciesResponse {
    /**
     * URL of the app's privacy policy
     */
    privacy_policy: string;
    /**
     * URL of the app's terms
     */
    terms: string;
    [key: string]: any;
}

export interface AppsGetScopesResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.AppsScope[];
}

export declare type AppsGetScoreResponse = number;

export declare type AppsGetTestingGroupsResponse = Objects.AppsTestingGroup[];

export interface AppsGetLastUploadedVersionResponse {
    /**
     * Last uploaded version
     */
    version: string;
    [key: string]: any;
}

export interface AppsGetResponse {
    /**
     * Total number of applications
     */
    count: number;
    [key: string]: any;
    items: Objects.AppsApp[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface AppsImageUploadResponse {
    /**
     * Uploading hash
     */
    hash: string;
    /**
     * Uploaded photo data
     */
    image: string;
    [key: string]: any;
}

export interface AppsIsNotificationsAllowedResponse {
    /**
     * Whether notifications are allowed for current user from concrete app or not
     */
    is_allowed: boolean | number;
    [key: string]: any;
}

export declare type AppsSendRequestResponse = number;

export interface AppWidgetsGetAppImageUploadServerResponse {
    /**
     * To upload an image, generate POST-request to upload_url with a file in photo field. Then call appWidgets.saveAppImage method
     */
    upload_url: string;
    [key: string]: any;
}

export declare type AppWidgetsGetAppImagesResponse = Objects.AppWidgetsPhotos;

export interface AppWidgetsGetGroupImageUploadServerResponse {
    /**
     * To upload an image, generate POST-request to upload_url with a file in photo field. Then call appWidgets.saveAppImage method
     */
    upload_url: string;
    [key: string]: any;
}

export declare type AppWidgetsGetGroupImagesResponse = Objects.AppWidgetsPhotos;

export declare type AppWidgetsGetImagesByIdResponse = Objects.AppWidgetsPhoto[];

export declare type AppWidgetsSaveAppImageResponse = Objects.AppWidgetsPhoto;

export declare type AppWidgetsSaveGroupImageResponse = Objects.AppWidgetsPhoto;

export declare type AsrCheckStatusResponse = Objects.AsrTask;

export interface AsrProcessResponse {
    /**
     * ID of created task in UUID format.
     */
    task_id: string;
    [key: string]: any;
}

export interface AuthRestoreResponse {
    /**
     * 1 if success
     */
    success: 1;
    /**
     * Parameter needed to grant access by code
     */
    sid: string;
    [key: string]: any;
}

export declare type BaseBoolResponse = Objects.BaseBoolInt;

export declare type BaseGetUploadServerResponse = Objects.BaseUploadServer;

export declare type BaseOkResponse = 1;

export declare type BaseUndefinedResponse = any;

export declare type BoardAddTopicResponse = number;

export declare type BoardCreateCommentResponse = number;

export interface BoardGetCommentsExtendedResponse {
    /**
     * Total number
     */
    count: number;
    /**
     * Offset of comment
     */
    real_offset: number;
    [key: string]: any;
    items: Objects.BoardTopicComment[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface BoardGetCommentsResponse {
    /**
     * Total number
     */
    count: number;
    /**
     * Offset of comment
     */
    real_offset: number;
    [key: string]: any;
    items: Objects.BoardTopicComment[];
}

export interface BoardGetTopicsExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.BoardTopic[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface BoardGetTopicsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.BoardTopic[];
}

export interface BugtrackerAddCompanyGroupsMembersResponse {
    [key: string]: any;
    errors: Objects.BugtrackerAddCompanyGroupsMembersError[];
}

export interface BugtrackerAddCompanyMembersResponse {
    [key: string]: any;
    errors: string[];
}

export interface BugtrackerCreateCommentResponse {
    [key: string]: any;
    comment_flood: boolean | number;
}

export interface BugtrackerGetCompanyGroupMembersResponse {
    [key: string]: any;
    user_ids: number[];
    profiles: Objects.UsersUserFull[];
}

export interface BugtrackerGetCompanyMembersResponse {
    [key: string]: any;
    company_members: Objects.BugtrackerCompanyMember[];
    count: number;
    profiles: Objects.UsersUserFull[];
}

export interface BugtrackerGetDownloadVersionUrlResponse {
    [key: string]: any;
    url: string;
    app_title: string;
    bundle_name: string;
    build_id: number;
    build_title: string;
}

export interface CallsStartResponse {
    /**
     * Call id
     */
    call_id: string;
    /**
     * Join link
     */
    join_link: string;
    /**
     * video id for link
     */
    broadcast_video_id: string;
    /**
     * video id for streaming
     */
    broadcast_ov_id: string;
    [key: string]: any;
}

export interface DatabaseGetChairsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.BaseObject[];
}

export declare type DatabaseGetCitiesByIdResponse = Objects.DatabaseCityById[];

export interface DatabaseGetCitiesResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.DatabaseCity[];
}

export declare type DatabaseGetCountriesByIdResponse = Objects.BaseCountry[];

export interface DatabaseGetCountriesResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.BaseCountry[];
}

export interface DatabaseGetFacultiesResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.DatabaseFaculty[];
}

export declare type DatabaseGetMetroStationsByIdResponse = Objects.DatabaseStation[];

export interface DatabaseGetMetroStationsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.DatabaseStation[];
}

export interface DatabaseGetRegionsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.DatabaseRegion[];
}

export declare type DatabaseGetSchoolClassesNewResponse = Objects.DatabaseSchoolClass[];

export interface DatabaseGetSchoolsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.DatabaseSchool[];
}

export interface DatabaseGetUniversitiesResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.DatabaseUniversity[];
}

export declare type DocsAddResponse = number;

export interface DocsDocUploadResponse {
    /**
     * Uploaded file data
     */
    file: string;
    [key: string]: any;
}

export declare type DocsGetByIdResponse = Objects.DocsDoc[];

export interface DocsGetTypesResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.DocsDocTypes[];
}

export declare type DocsGetUploadServerResponse = Objects.BaseUploadServer;

export interface DocsGetResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.DocsDoc[];
}

export interface DocsSaveResponse {
    [key: string]: any;
}

export interface DocsSearchResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.DocsDoc[];
}

export declare type DonutGetSubscriptionResponse = Objects.DonutDonatorSubscriptionInfo;

export interface DonutGetSubscriptionsResponse {
    [key: string]: any;
    subscriptions: Objects.DonutDonatorSubscriptionInfo[];
    count: number;
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface DownloadedGamesPaidStatusResponse {
    /**
     * Game has been paid
     */
    is_paid: boolean | number;
    [key: string]: any;
}

export declare type FaveAddTagResponse = Objects.FaveTag;

export interface FaveGetPagesResponse {
    [key: string]: any;
    count: number;
    items: Objects.FavePage[];
}

export interface FaveGetTagsResponse {
    [key: string]: any;
    count: number;
    items: Objects.FaveTag[];
}

export interface FaveGetExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.FaveBookmark[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroup[];
}

export interface FaveGetResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.FaveBookmark[];
}

export interface FriendsAddListResponse {
    /**
     * List ID
     */
    list_id: number;
    [key: string]: any;
}

export declare type FriendsAddResponse = 1 | 2 | 4;

export declare type FriendsAreFriendsExtendedResponse = Objects.FriendsFriendExtendedStatus[];

export declare type FriendsAreFriendsResponse = Objects.FriendsFriendStatus[];

export interface FriendsDeleteResponse {
    /**
     * Returns 1 if friend has been deleted
     */
    friend_deleted: 1;
    /**
     * Returns 1 if out request has been canceled
     */
    out_request_deleted: 1;
    /**
     * Returns 1 if incoming request has been declined
     */
    in_request_deleted: 1;
    /**
     * Returns 1 if suggestion has been declined
     */
    suggestion_deleted: 1;
    [key: string]: any;
    success: number;
}

export declare type FriendsGetAppUsersResponse = number[];

export declare type FriendsGetByPhonesResponse = Objects.FriendsUserXtrPhone[];

export interface FriendsGetListsResponse {
    /**
     * Total number of friends lists
     */
    count: number;
    [key: string]: any;
    items: Objects.FriendsFriendsList[];
}

export declare type FriendsGetMutualResponse = number[];

export declare type FriendsGetMutualTargetUidsResponse = Objects.FriendsMutualFriend[];

export interface FriendsGetOnlineOnlineMobileResponse {
    /**
     * User ID
     */
    online: number[];
    /**
     * User ID
     */
    online_mobile: number[];
    [key: string]: any;
}

export declare type FriendsGetOnlineResponse = number[];

export declare type FriendsGetRecentResponse = number[];

export interface FriendsGetRequestsExtendedResponse {
    /**
     * Total requests number
     */
    count: number;
    /**
     * Total unread requests number
     */
    count_unread: number;
    /**
     * Friend requests last viewed timestamp
     */
    last_viewed: number;
    [key: string]: any;
    items: Objects.FriendsRequestsXtrMessage[];
}

export interface FriendsGetRequestsNeedMutualResponse {
    /**
     * Total requests number
     */
    count: number;
    /**
     * Total unread requests number
     */
    count_unread: number;
    /**
     * Friend requests last viewed timestamp
     */
    last_viewed: number;
    [key: string]: any;
    items: Objects.FriendsRequestsXtrMutual[];
}

export interface FriendsGetRequestsResponse {
    /**
     * Total requests number
     */
    count: number;
    /**
     * User ID
     */
    items: number[];
    /**
     * Total unread requests number
     */
    count_unread: number;
    /**
     * Friend requests last viewed timestamp
     */
    last_viewed: number;
    [key: string]: any;
}

export interface FriendsGetSuggestionsResponse {
    /**
     * Total results number
     */
    count: number;
    [key: string]: any;
    items: Objects.UsersUserFull[];
}

export interface FriendsGetFieldsResponse {
    /**
     * Total friends number
     */
    count: number;
    [key: string]: any;
    items: Objects.UsersUserFull[];
    profiles: Objects.UsersUserFull[];
}

export interface FriendsGetResponse {
    /**
     * Total friends number
     */
    count: number;
    /**
     * User ID
     */
    items: number[];
    [key: string]: any;
}

export interface FriendsSearchResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.UsersUserFull[];
}

export interface GiftsGetResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.GiftsGift[];
}

export declare type GroupsAddAddressResponse = Objects.GroupsAddress;

export interface GroupsAddCallbackServerResponse {
    [key: string]: any;
    server_id: number;
}

export declare type GroupsAddLinkResponse = Objects.GroupsLinksItem;

export declare type GroupsCreateResponse = Objects.GroupsGroupFull;

export declare type GroupsEditAddressResponse = Objects.GroupsAddress;

export interface GroupsGetAddressesResponse {
    /**
     * Total count of addresses
     */
    count: number;
    [key: string]: any;
    items: Objects.GroupsAddress[];
}

export interface GroupsGetBannedResponse {
    /**
     * Total users number
     */
    count: number;
    [key: string]: any;
    items: Objects.GroupsBannedItem[];
}

export interface GroupsGetByIdObjectResponse {
    [key: string]: any;
    groups: Objects.GroupsGroupFull[];
    profiles: Objects.GroupsProfileItem[];
}

export interface GroupsGetCallbackConfirmationCodeResponse {
    /**
     * Confirmation code
     */
    code: string;
    [key: string]: any;
}

export interface GroupsGetCallbackServersResponse {
    [key: string]: any;
    count: number;
    items: Objects.GroupsCallbackServer[];
}

export declare type GroupsGetCallbackSettingsResponse = Objects.GroupsCallbackSettings;

export interface GroupsGetCatalogInfoExtendedResponse {
    [key: string]: any;
    categories: Objects.GroupsGroupCategoryFull[];
}

export interface GroupsGetCatalogInfoResponse {
    [key: string]: any;
    categories: Objects.GroupsGroupCategory[];
}

export interface GroupsGetInvitedUsersResponse {
    /**
     * Total communities number
     */
    count: number;
    [key: string]: any;
    items: Objects.UsersUserFull[];
}

export interface GroupsGetInvitesExtendedResponse {
    /**
     * Total communities number
     */
    count: number;
    [key: string]: any;
    items: Objects.GroupsGroupFull[];
    profiles: Objects.UsersUserMin[];
    groups: Objects.GroupsGroupFull[];
}

export interface GroupsGetInvitesResponse {
    /**
     * Total communities number
     */
    count: number;
    [key: string]: any;
    items: Objects.GroupsGroupFull[];
}

export declare type GroupsGetLongPollServerResponse = Objects.GroupsLongPollServer;

export declare type GroupsGetLongPollSettingsResponse = Objects.GroupsLongPollSettings;

export interface GroupsGetMembersFieldsResponse {
    /**
     * Total members number
     */
    count: number;
    /**
     * Encoded string for a next page
     */
    next_from: string;
    [key: string]: any;
    items: Objects.GroupsUserXtrRole[];
}

export interface GroupsGetMembersFilterResponse {
    /**
     * Total members number
     */
    count: number;
    /**
     * Encoded string for a next page
     */
    next_from: string;
    [key: string]: any;
    items: Objects.GroupsMemberRole[];
}

export interface GroupsGetMembersResponse {
    /**
     * Total members number
     */
    count: number;
    /**
     * User ID
     */
    items: number[];
    /**
     * Encoded string for a next page
     */
    next_from: string;
    [key: string]: any;
}

export interface GroupsGetOnlineStatusResponse {
    /**
     * Estimated time of answer (for status = answer_mark)
     */
    minutes: number;
    [key: string]: any;
}

export interface GroupsGetRequestsFieldsResponse {
    /**
     * Total communities number
     */
    count: number;
    [key: string]: any;
    items: Objects.UsersUserFull[];
}

export interface GroupsGetRequestsResponse {
    /**
     * Total communities number
     */
    count: number;
    /**
     * User ID
     */
    items: number[];
    [key: string]: any;
}

export interface GroupsGetSettingsResponse {
    /**
     * Community's page domain
     */
    address: string;
    /**
     * Articles settings
     */
    articles: number;
    /**
     * Photo suggests setting
     */
    recognize_photo: number;
    /**
     * City id of group
     */
    city_id: number;
    /**
     * City name of group
     */
    city_name: string;
    /**
     * Country id of group
     */
    country_id: number;
    /**
     * Country name of group
     */
    country_name: string;
    /**
     * Community description
     */
    description: string;
    /**
     * Information about the group category
     */
    public_category: number;
    /**
     * Information about the group subcategory
     */
    public_subcategory: number;
    /**
     * URL of the RSS feed
     */
    rss: string;
    /**
     * Start date
     */
    start_date: number;
    /**
     * Finish date in Unix-time format
     */
    finish_date: number;
    /**
     * Community subject ID
     */
    subject: number;
    /**
     * Community title
     */
    title: string;
    /**
     * Community website
     */
    website: string;
    /**
     * Community phone
     */
    phone: string;
    /**
     * Community email
     */
    email: string;
    [key: string]: any;
    sections_list: Objects.GroupsSectionsListItem[];
    addresses: boolean | number;
    obscene_words: string[];
    event_group_id: number;
    public_category_list: Objects.GroupsGroupPublicCategoryList[];
    public_date: string;
    public_date_label: string;
    subject_list: Objects.GroupsSubjectItem[];
}

export declare type GroupsGetTagListResponse = Objects.GroupsGroupTag[];

export interface GroupsGetTokenPermissionsResponse {
    [key: string]: any;
    mask: number;
    permissions: Objects.GroupsTokenPermissionSetting[];
}

export interface GroupsGetObjectExtendedResponse {
    /**
     * Total communities number
     */
    count: number;
    [key: string]: any;
    items: Objects.GroupsGroupFull[];
}

export interface GroupsGetResponse {
    /**
     * Total communities number
     */
    count: number;
    /**
     * Community ID
     */
    items: number[];
    [key: string]: any;
}

export interface GroupsInviteUserIdsListResponse {
    /**
     * Total invited users number
     */
    invites_send_count: number;
    [key: string]: any;
}

export interface GroupsIsMemberExtendedResponse {
    [key: string]: any;
}

export declare type GroupsIsMemberUserIdsExtendedResponse = Objects.GroupsMemberStatusFull[];

export declare type GroupsIsMemberUserIdsResponse = Objects.GroupsMemberStatus[];

export interface GroupsSearchResponse {
    /**
     * Total communities number
     */
    count: number;
    [key: string]: any;
    items: Objects.GroupsGroupFull[];
}

export interface LeadFormsCreateResponse {
    [key: string]: any;
    form_id: number;
    url: string;
}

export interface LeadFormsDeleteResponse {
    [key: string]: any;
    form_id: number;
}

export interface LeadFormsGetLeadsResponse {
    [key: string]: any;
    leads: Objects.LeadFormsLead[];
    next_page_token: string;
}

export declare type LeadFormsGetResponse = Objects.LeadFormsForm;

export declare type LeadFormsListResponse = Objects.LeadFormsForm[];

export declare type LeadFormsUploadUrlResponse = string;

export interface LikesAddResponse {
    /**
     * Total likes number
     */
    likes: number;
    [key: string]: any;
}

export interface LikesDeleteResponse {
    /**
     * Total likes number
     */
    likes: number;
    [key: string]: any;
}

export interface LikesGetListExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.UsersSubscriptionsItem[];
}

export interface LikesGetListResponse {
    /**
     * Total number
     */
    count: number;
    /**
     * User ID
     */
    items: number[];
    [key: string]: any;
}

export interface LikesIsLikedResponse {
    [key: string]: any;
}

export interface MarketAddAlbumResponse {
    /**
     * Album ID
     */
    market_album_id: number;
    /**
     * Albums count
     */
    albums_count: number;
    [key: string]: any;
}

export interface MarketAddResponse {
    /**
     * Item ID
     */
    market_item_id: number;
    [key: string]: any;
}

export declare type MarketCreateCommentResponse = number;

export interface MarketGetAlbumByIdResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MarketMarketAlbum[];
}

export interface MarketGetAlbumsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MarketMarketAlbum[];
}

export interface MarketGetByIdExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MarketMarketItemFull[];
}

export interface MarketGetByIdResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MarketMarketItem[];
}

export interface MarketGetCategoriesNewResponse {
    [key: string]: any;
    items: Objects.MarketMarketCategoryTree[];
}

export interface MarketGetCommentsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.WallWallComment[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface MarketGetGroupOrdersResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MarketOrder[];
}

export interface MarketGetOrderByIdResponse {
    [key: string]: any;
}

export interface MarketGetOrderItemsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MarketOrderItem[];
}

export interface MarketGetOrdersExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MarketOrder[];
    groups: Objects.GroupsGroupFull[];
}

export interface MarketGetOrdersResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MarketOrder[];
}

export interface MarketGetExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MarketMarketItemFull[];
    variants: Objects.MarketMarketItemFull[];
}

export interface MarketGetResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MarketMarketItem[];
    variants: Objects.MarketMarketItem[];
}

export interface MarketSearchBasicResponse {
    /**
     * Current chunk size
     */
    count: number;
    /**
     * Total size
     */
    total: number;
    /**
     * Next chunk present
     */
    has_more: boolean | number;
    [key: string]: any;
    items: Objects.MarketMarketItemBasicWithGroup[];
}

export interface MarketSearchExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MarketMarketItemFull[];
    variants: Objects.MarketMarketItemFull[];
}

export interface MarketSearchResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MarketMarketItem[];
    variants: Objects.MarketMarketItem[];
    groups: Objects.GroupsGroupFull[];
}

export interface MessagesAddChatUsersResponse {
    [key: string]: any;
    failed_peer_ids: number[];
    failed_phone_numbers: string[];
    invitees: number[];
}

export interface MessagesCreateChatWithPeerIdsResponse {
    /**
     * Chat ID
     */
    chat_id: number;
    [key: string]: any;
}

export interface MessagesDeleteChatPhotoResponse {
    /**
     * Service message ID
     */
    message_id: number;
    [key: string]: any;
}

export interface MessagesDeleteConversationResponse {
    /**
     * Id of the last message, that was deleted
     */
    last_deleted_id: number;
    [key: string]: any;
}

export declare type MessagesDeleteFullResponse = Objects.MessagesDeleteFullResponseItem[];

export interface MessagesGetByConversationMessageIdExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesMessage[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface MessagesGetByConversationMessageIdResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesMessage[];
}

export interface MessagesGetByIdExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesMessage[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface MessagesGetByIdResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesMessage[];
}

export interface MessagesGetChatPreviewResponse {
    [key: string]: any;
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export declare type MessagesGetChatChatIdsFieldsResponse = Objects.MessagesChatFull[];

export declare type MessagesGetChatChatIdsResponse = Objects.MessagesChat[];

export declare type MessagesGetChatFieldsResponse = Objects.MessagesChatFull;

export declare type MessagesGetChatResponse = Objects.MessagesChat;

export declare type MessagesGetConversationMembersResponse = Objects.MessagesGetConversationMembers;

export declare type MessagesGetConversationsByIdExtendedResponse = Objects.MessagesGetConversationByIdExtended;

export declare type MessagesGetConversationsByIdResponse = Objects.MessagesGetConversationById;

export interface MessagesGetConversationsResponse {
    /**
     * Total number
     */
    count: number;
    /**
     * Unread dialogs number
     */
    unread_count: number;
    [key: string]: any;
    items: Objects.MessagesConversationWithMessage[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface MessagesGetHistoryAttachmentsResponse {
    /**
     * Value for pagination
     */
    next_from: string;
    [key: string]: any;
    items: Objects.MessagesHistoryAttachment[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface MessagesGetHistoryExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesMessage[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
    conversations: Objects.MessagesConversation[];
}

export interface MessagesGetHistoryResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesMessage[];
}

export interface MessagesGetImportantMessagesExtendedResponse {
    [key: string]: any;
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
    conversations: Objects.MessagesConversation[];
}

export interface MessagesGetImportantMessagesResponse {
    [key: string]: any;
    profiles: Objects.UsersUser[];
    groups: Objects.GroupsGroupFull[];
    conversations: Objects.MessagesConversation[];
}

export interface MessagesGetIntentUsersResponse {
    [key: string]: any;
    count: number;
    items: number[];
    profiles: Objects.UsersUserFull[];
}

export interface MessagesGetInviteLinkResponse {
    [key: string]: any;
    link: string;
}

export declare type MessagesGetLastActivityResponse = Objects.MessagesLastActivity;

export interface MessagesGetLongPollHistoryResponse {
    /**
     * Persistence timestamp
     */
    new_pts: number;
    /**
     * Has more
     */
    more: boolean | number;
    [key: string]: any;
    history: any[][];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
    chats: Objects.MessagesChat[];
    from_pts: number;
    conversations: Objects.MessagesConversation[];
}

export declare type MessagesGetLongPollServerResponse = Objects.MessagesLongpollParams;

export interface MessagesGetMessagesReactionsResponse {
    [key: string]: any;
    items: Objects.MessagesReactionCountersResponseItem[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface MessagesGetReactedPeersResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    reactions: Objects.MessagesReactionResponseItem[];
    counters: Objects.MessagesReactionCounterResponseItem[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface MessagesGetReactionsAssetsResponse {
    /**
     * Current reactions assets version
     */
    version: number;
    [key: string]: any;
    assets: Objects.MessagesReactionAssetItem[];
    override_assets: Objects.MessagesReactionAssetItem[];
}

export interface MessagesIsMessagesFromGroupAllowedResponse {
    [key: string]: any;
}

export interface MessagesJoinChatByInviteLinkResponse {
    [key: string]: any;
    chat_id: number;
}

export declare type MessagesMarkAsImportantDeprecatedResponse = number[];

export declare type MessagesPinResponse = Objects.MessagesPinnedMessage;

export interface MessagesSearchConversationsExtendedResponse {
    /**
     * Total results number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesConversation[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface MessagesSearchConversationsResponse {
    /**
     * Total results number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesConversation[];
}

export interface MessagesSearchExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesMessage[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
    conversations: Objects.MessagesConversation[];
}

export interface MessagesSearchResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesMessage[];
}

export declare type MessagesSendDeprecatedResponse = number;

export declare type MessagesSendUserIdsResponse = Objects.MessagesSendUserIdsResponseItem[];

export interface MessagesSetChatPhotoResponse {
    /**
     * Service message ID
     */
    message_id: number;
    [key: string]: any;
}

export interface NewsfeedGenericResponse {
    [key: string]: any;
    items: Objects.NewsfeedNewsfeedItem[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
    lives_items: Objects.NewsfeedNewsfeedItem[];
}

export interface NewsfeedGetBannedExtendedResponse {
    [key: string]: any;
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface NewsfeedGetBannedResponse {
    /**
     * Community ID
     */
    groups: number[];
    /**
     * User ID
     */
    members: number[];
    [key: string]: any;
}

export interface NewsfeedGetCommentsResponse {
    /**
     * Next from value
     */
    next_from: string;
    [key: string]: any;
    items: Objects.NewsfeedCommentsItem[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface NewsfeedGetListsExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.NewsfeedListFull[];
}

export interface NewsfeedGetListsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.NewsfeedList[];
}

export interface NewsfeedGetMentionsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.WallWallpostFull[];
}

export interface NewsfeedGetSuggestedSourcesResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.UsersSubscriptionsItem[];
}

export interface NewsfeedIgnoreItemResponse {
    [key: string]: any;
    status: boolean | number;
}

export declare type NewsfeedSaveListResponse = number;

export interface NewsfeedSearchExtendedResponse {
    /**
     * Filtered number
     */
    count: number;
    /**
     * Total number
     */
    total_count: number;
    [key: string]: any;
    items: Objects.WallWallpostFull[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
    suggested_queries: string[];
    next_from: string;
}

export interface NewsfeedSearchExtendedStrictResponse {
    /**
     * Filtered number
     */
    count: number;
    /**
     * Total number
     */
    total_count: number;
    [key: string]: any;
    items: Objects.WallWallpostFull[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
    suggested_queries: string[];
    next_from: string;
}

export interface NewsfeedSearchResponse {
    /**
     * Filtered number
     */
    count: number;
    /**
     * Total number
     */
    total_count: number;
    [key: string]: any;
    items: Objects.WallWallpostFull[];
    suggested_queries: string[];
    next_from: string;
}

export interface NewsfeedSearchStrictResponse {
    /**
     * Filtered number
     */
    count: number;
    /**
     * Total number
     */
    total_count: number;
    [key: string]: any;
    items: Objects.WallWallpostFull[];
    suggested_queries: string[];
    next_from: string;
}

export declare type NotesAddResponse = number;

export declare type NotesCreateCommentResponse = number;

export declare type NotesGetByIdResponse = Objects.NotesNote;

export interface NotesGetCommentsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.NotesNoteComment[];
}

export interface NotesGetResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.NotesNote[];
}

export interface NotificationsGetResponse {
    /**
     * Total number
     */
    count: number;
    /**
     * Time when user has been checked notifications last time
     */
    last_viewed: number;
    [key: string]: any;
    items: Objects.NotificationsNotificationItem[];
    profiles: Objects.UsersUser[];
    groups: Objects.GroupsGroup[];
    photos: Objects.PhotosPhoto[];
    videos: Objects.VideoVideo[];
    apps: Objects.AppsApp[];
    next_from: string;
    ttl: number;
}

export declare type NotificationsSendMessageResponse = Objects.NotificationsSendMessageItem[];

export declare type OrdersChangeStateResponse = string;

export declare type OrdersGetAmountResponse = Objects.OrdersAmount[];

export declare type OrdersGetByIdResponse = Objects.OrdersOrder[];

export declare type OrdersGetUserSubscriptionByIdResponse = Objects.OrdersSubscription;

export interface OrdersGetUserSubscriptionsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.OrdersSubscription[];
}

export declare type OrdersGetResponse = Objects.OrdersOrder[];

export declare type PagesGetHistoryResponse = Objects.PagesWikipageHistory[];

export declare type PagesGetTitlesResponse = Objects.PagesWikipage[];

export declare type PagesGetVersionResponse = Objects.PagesWikipageFull;

export declare type PagesGetResponse = Objects.PagesWikipageFull;

export declare type PagesParseWikiResponse = string;

export declare type PagesSaveAccessResponse = number;

export declare type PagesSaveResponse = number;

export declare type PhotosCopyResponse = number;

export declare type PhotosCreateAlbumResponse = Objects.PhotosPhotoAlbumFull;

export declare type PhotosCreateCommentResponse = number;

export declare type PhotosGetAlbumsCountResponse = number;

export interface PhotosGetAlbumsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.PhotosPhotoAlbumFull[];
}

export interface PhotosGetAllCommentsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.WallWallComment[];
}

export interface PhotosGetAllResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.PhotosPhoto[];
}

export declare type PhotosGetByIdResponse = Objects.PhotosPhoto[];

export interface PhotosGetCommentsExtendedResponse {
    /**
     * Total number
     */
    count: number;
    /**
     * Real offset of the comments
     */
    real_offset: number;
    [key: string]: any;
    items: Objects.WallWallComment[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface PhotosGetCommentsResponse {
    /**
     * Total number
     */
    count: number;
    /**
     * Real offset of the comments
     */
    real_offset: number;
    [key: string]: any;
    items: Objects.WallWallComment[];
}

export declare type PhotosGetMarketUploadServerResponse = Objects.BaseUploadServer;

export declare type PhotosGetMessagesUploadServerResponse = Objects.PhotosPhotoUpload;

export interface PhotosGetNewTagsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.PhotosPhotoXtrTagInfo[];
}

export declare type PhotosGetTagsResponse = Objects.PhotosPhotoTag[];

export declare type PhotosGetUploadServerResponse = Objects.PhotosPhotoUpload;

export interface PhotosGetUserPhotosResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.PhotosPhoto[];
}

export declare type PhotosGetWallUploadServerResponse = Objects.PhotosPhotoUpload;

export interface PhotosGetResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.PhotosPhoto[];
}

export interface PhotosMarketAlbumUploadResponse {
    /**
     * Community ID
     */
    gid: number;
    /**
     * Uploading hash
     */
    hash: string;
    /**
     * Uploaded photo data
     */
    photo: string;
    /**
     * Upload server number
     */
    server: number;
    [key: string]: any;
}

export interface PhotosMarketUploadResponse {
    /**
     * Crop data
     */
    crop_data: string;
    /**
     * Crop hash
     */
    crop_hash: string;
    /**
     * Community ID
     */
    group_id: number;
    /**
     * Uploading hash
     */
    hash: string;
    /**
     * Uploaded photo data
     */
    photo: string;
    /**
     * Upload server number
     */
    server: number;
    [key: string]: any;
}

export interface PhotosMessageUploadResponse {
    /**
     * Uploading hash
     */
    hash: string;
    /**
     * Uploaded photo data
     */
    photo: string;
    /**
     * Upload server number
     */
    server: number;
    [key: string]: any;
}

export interface PhotosOwnerCoverUploadResponse {
    /**
     * Uploading hash
     */
    hash: string;
    /**
     * Uploaded photo data
     */
    photo: string;
    [key: string]: any;
}

export interface PhotosOwnerUploadResponse {
    /**
     * Uploading hash
     */
    hash: string;
    /**
     * Uploaded photo data
     */
    photo: string;
    /**
     * Upload server number
     */
    server: number;
    [key: string]: any;
}

export interface PhotosPhotoUploadResponse {
    /**
     * Album ID
     */
    aid: number;
    /**
     * Uploading hash
     */
    hash: string;
    /**
     * Uploaded photo data
     */
    photo: string;
    /**
     * Uploaded photos data
     */
    photos_list: string;
    /**
     * Upload server number
     */
    server: number;
    [key: string]: any;
}

export declare type PhotosPutTagResponse = number;

export declare type PhotosSaveMarketAlbumPhotoResponse = Objects.PhotosPhoto[];

export declare type PhotosSaveMarketPhotoResponse = Objects.PhotosPhoto[];

export declare type PhotosSaveMessagesPhotoResponse = Objects.PhotosPhoto[];

export interface PhotosSaveOwnerCoverPhotoResponse {
    [key: string]: any;
    images: Objects.BaseImage[];
}

export interface PhotosSaveOwnerPhotoResponse {
    /**
     * Photo hash
     */
    photo_hash: string;
    /**
     * Uploaded image url
     */
    photo_src: string;
    /**
     * Uploaded image url
     */
    photo_src_big: string;
    /**
     * Uploaded image url
     */
    photo_src_small: string;
    /**
     * Returns 1 if profile photo is saved
     */
    saved: number;
    /**
     * Created post ID
     */
    post_id: number;
    [key: string]: any;
}

export declare type PhotosSaveWallPhotoResponse = Objects.PhotosPhoto[];

export declare type PhotosSaveResponse = Objects.PhotosPhoto[];

export interface PhotosSearchResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.PhotosPhoto[];
}

export interface PhotosWallUploadResponse {
    /**
     * Uploading hash
     */
    hash: string;
    /**
     * Uploaded photo data
     */
    photo: string;
    /**
     * Upload server number
     */
    server: number;
    [key: string]: any;
}

export interface PodcastsSearchPodcastResponse {
    /**
     * Total amount of found results
     */
    results_total: number;
    [key: string]: any;
    podcasts: Objects.PodcastExternalData[];
}

export declare type PollsCreateResponse = Objects.PollsPoll;

export declare type PollsGetBackgroundsResponse = Objects.PollsBackground[];

export declare type PollsGetByIdResponse = Objects.PollsPoll;

export declare type PollsGetVotersFieldsResponse = Objects.PollsFieldsVoters[];

export declare type PollsGetVotersResponse = Objects.PollsVoters[];

export declare type PollsSavePhotoResponse = Objects.PollsBackground;

export interface PrettyCardsCreateResponse {
    /**
     * Owner ID of created pretty card
     */
    owner_id: number;
    /**
     * Card ID of created pretty card
     */
    card_id: string;
    [key: string]: any;
}

export interface PrettyCardsDeleteResponse {
    /**
     * Owner ID of deleted pretty card
     */
    owner_id: number;
    /**
     * Card ID of deleted pretty card
     */
    card_id: string;
    /**
     * Error reason if error happened
     */
    error: string;
    [key: string]: any;
}

export interface PrettyCardsEditResponse {
    /**
     * Owner ID of edited pretty card
     */
    owner_id: number;
    /**
     * Card ID of edited pretty card
     */
    card_id: string;
    [key: string]: any;
}

export declare type PrettyCardsGetByIdResponse = Objects.PrettyCardsPrettyCardOrError[];

export declare type PrettyCardsGetUploadURLResponse = string;

export interface PrettyCardsGetResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.PrettyCardsPrettyCard[];
}

export interface SearchGetHintsResponse {
    [key: string]: any;
    count: number;
    items: Objects.SearchHint[];
    suggested_queries: string[];
}

export declare type SecureCheckTokenResponse = Objects.SecureTokenChecked;

export declare type SecureGetAppBalanceResponse = number;

export declare type SecureGetSmsHistoryResponse = Objects.SecureSmsNotification[];

export declare type SecureGetTransactionsHistoryResponse = Objects.SecureTransaction[];

export declare type SecureGetUserLevelResponse = Objects.SecureLevel[];

export declare type SecureGiveEventStickerResponse = Objects.SecureGiveEventStickerItem[];

export declare type SecureSendNotificationResponse = number[];

export declare type SecureSetCounterArrayResponse = Objects.SecureSetCounterItem[];

export declare type StatsGetPostReachResponse = Objects.StatsWallpostStat[];

export declare type StatsGetResponse = Objects.StatsPeriod[];

export declare type StatusGetResponse = Objects.StatusStatus;

export declare type StorageGetKeysResponse = string[];

export declare type StorageGetResponse = Objects.StorageValue[];

export interface StoreGetFavoriteStickersResponse {
    /**
     * Count of favorite stickers
     */
    count: number;
    [key: string]: any;
    items: Objects.BaseStickerNew[];
}

export interface StoreGetProductsResponse {
    [key: string]: any;
    items: Objects.StoreProduct[];
    count: number;
}

export interface StoreGetStickersKeywordsResponse {
    /**
     * Total count of chunks to load
     */
    chunks_count: number;
    /**
     * Chunks version hash
     */
    chunks_hash: string;
    [key: string]: any;
    count: number;
    dictionary: Objects.StoreStickersKeyword[];
}

export interface StoriesGetBannedExtendedResponse {
    /**
     * Stories count
     */
    count: number;
    /**
     * Owner ID
     */
    items: number[];
    [key: string]: any;
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface StoriesGetBannedResponse {
    /**
     * Stories count
     */
    count: number;
    /**
     * Owner ID
     */
    items: number[];
    [key: string]: any;
}

export interface StoriesGetByIdExtendedResponse {
    /**
     * Stories count
     */
    count: number;
    [key: string]: any;
    items: Objects.StoriesStory[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface StoriesGetPhotoUploadServerResponse {
    /**
     * Upload URL
     */
    upload_url: string;
    [key: string]: any;
    user_ids: number[];
}

export interface StoriesGetStatsV5200Response {
    [key: string]: any;
    preview: string;
    achievement: string;
    achievement_subtitle: string;
    categories: Objects.StoriesStatCategory[];
    need_privacy_block: boolean | number;
}

export declare type StoriesGetStatsResponse = Objects.StoriesStoryStats;

export interface StoriesGetVideoUploadServerResponse {
    /**
     * Upload URL
     */
    upload_url: string;
    [key: string]: any;
    user_ids: number[];
}

export interface StoriesGetViewersExtendedV5115Response {
    /**
     * Viewers count
     */
    count: number;
    [key: string]: any;
    items: Objects.StoriesViewersItem[];
    hidden_reason: string;
    next_from: string;
}

export interface StoriesGetV5113Response {
    [key: string]: any;
    count: number;
    items: Objects.StoriesFeedItem[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
    need_upload_screen: boolean | number;
    track_code: string;
    next_from: string;
}

export interface StoriesSaveResponse {
    [key: string]: any;
    count: number;
    items: Objects.StoriesStory[];
    profiles: Objects.UsersUser[];
    groups: Objects.GroupsGroupFull[];
}

export interface StoriesUploadResponse {
    /**
     * A string hash that is used in the stories.save method
     */
    upload_result: string;
    [key: string]: any;
}

export interface StreamingGetServerUrlResponse {
    /**
     * Server host
     */
    endpoint: string;
    /**
     * Access key
     */
    key: string;
    [key: string]: any;
}

export interface StreamingGetSettingsResponse {
    /**
     * streaming monthly tier
     */
    monthly_limit: "tier_1" | "tier_2" | "tier_3" | "tier_4" | "tier_5" | "tier_6" | "unlimited";
    [key: string]: any;
}

export declare type StreamingGetStatsResponse = Objects.StreamingStats[];

export interface StreamingGetStemResponse {
    /**
     * part of a word responsible for its lexical meaning
     */
    stem: string;
    [key: string]: any;
}

export interface UsersGetFollowersFieldsResponse {
    /**
     * Total number of available results
     */
    count: number;
    [key: string]: any;
    friends_count: number;
    items: Objects.UsersUserFull[];
}

export interface UsersGetFollowersResponse {
    /**
     * Total friends number
     */
    count: number;
    /**
     * User ID
     */
    items: number[];
    [key: string]: any;
}

export interface UsersGetSubscriptionsExtendedResponse {
    /**
     * Total number of available results
     */
    count: number;
    [key: string]: any;
    items: Objects.UsersSubscriptionsItem[];
}

export interface UsersGetSubscriptionsResponse {
    [key: string]: any;
}

export declare type UsersGetResponse = Objects.UsersUserFull[];

export interface UsersSearchResponse {
    /**
     * Total number of available results
     */
    count: number;
    [key: string]: any;
    items: Objects.UsersUserFull[];
}

export declare type UtilsCheckLinkResponse = Objects.UtilsLinkChecked;

export interface UtilsGetLastShortenedLinksResponse {
    /**
     * Total number of available results
     */
    count: number;
    [key: string]: any;
    items: Objects.UtilsLastShortenedLink[];
}

export declare type UtilsGetLinkStatsExtendedResponse = Objects.UtilsLinkStatsExtended;

export declare type UtilsGetLinkStatsResponse = Objects.UtilsLinkStats;

export declare type UtilsGetServerTimeResponse = number;

export declare type UtilsGetShortLinkResponse = Objects.UtilsShortLink;

export declare type UtilsResolveScreenNameResponse = Objects.UtilsDomainResolved;

export interface VideoAddAlbumResponse {
    /**
     * Created album ID
     */
    album_id: number;
    [key: string]: any;
}

export declare type VideoChangeVideoAlbumsResponse = number[];

export declare type VideoCreateCommentResponse = number;

export interface VideoEditResponse {
    /**
     * Access key for access link
     */
    access_key: string;
    [key: string]: any;
}

export declare type VideoGetAlbumByIdResponse = Objects.VideoVideoAlbumFull;

export interface VideoGetAlbumsByVideoExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideoAlbumFull[];
}

export declare type VideoGetAlbumsByVideoResponse = number[];

export interface VideoGetAlbumsExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideoAlbumFull[];
}

export interface VideoGetAlbumsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideoAlbum[];
}

export interface VideoGetCommentsExtendedResponse {
    /**
     * Total number
     */
    count: number;
    /**
     * Count of replies of current level
     */
    current_level_count: number;
    /**
     * Information whether current user can comment the post
     */
    can_post: boolean | number;
    /**
     * Information whether groups can comment the post
     */
    groups_can_post: boolean | number;
    [key: string]: any;
    items: Objects.WallWallComment[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
    show_reply_button: boolean | number;
    real_offset: number;
}

export interface VideoGetCommentsResponse {
    /**
     * Total number
     */
    count: number;
    /**
     * Count of replies of current level
     */
    current_level_count: number;
    /**
     * Information whether current user can comment the post
     */
    can_post: boolean | number;
    /**
     * Information whether groups can comment the post
     */
    groups_can_post: boolean | number;
    [key: string]: any;
    items: Objects.WallWallComment[];
    show_reply_button: boolean | number;
    real_offset: number;
}

export interface VideoGetLongPollServerResponse {
    [key: string]: any;
    url: string;
}

export interface VideoGetResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideoFull[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export declare type VideoLiveGetCategoriesResponse = Objects.VideoLiveCategory[];

export declare type VideoSaveResponse = Objects.VideoSaveResult;

export interface VideoSearchExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideoFull[];
    profiles: Objects.UsersUser[];
    groups: Objects.GroupsGroupFull[];
}

export interface VideoSearchResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideoFull[];
}

export interface VideoStartStreamingResponse {
    /**
     * Owner ID of created video object
     */
    owner_id: number;
    /**
     * Video ID of created video object
     */
    video_id: number;
    /**
     * Video title
     */
    name: string;
    /**
     * Video description
     */
    description: string;
    /**
     * Video access key
     */
    access_key: string;
    [key: string]: any;
    post_id: number;
}

export interface VideoStopStreamingResponse {
    [key: string]: any;
    unique_viewers: number;
}

export interface VideoUploadResponse {
    /**
     * Video size
     */
    size: number;
    /**
     * Video ID
     */
    video_id: number;
    [key: string]: any;
}

export interface WallCreateCommentResponse {
    /**
     * Created comment ID
     */
    comment_id: number;
    [key: string]: any;
    parents_stack: number[];
}

export interface WallEditResponse {
    /**
     * Edited post ID
     */
    post_id: number;
    [key: string]: any;
}

export interface WallGetByIdExtendedResponse {
    [key: string]: any;
    items: Objects.WallWallItem[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface WallGetByIdResponse {
    [key: string]: any;
    items: Objects.WallWallItem[];
}

export interface WallGetCommentExtendedResponse {
    /**
     * Information whether current user can comment the post
     */
    can_post: boolean | number;
    /**
     * Information whether groups can comment the post
     */
    groups_can_post: boolean | number;
    [key: string]: any;
    items: Objects.WallWallComment[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
    show_reply_button: boolean | number;
}

export interface WallGetCommentResponse {
    /**
     * Information whether current user can comment the post
     */
    can_post: boolean | number;
    /**
     * Information whether groups can comment the post
     */
    groups_can_post: boolean | number;
    [key: string]: any;
    items: Objects.WallWallComment[];
    show_reply_button: boolean | number;
}

export interface WallGetCommentsExtendedResponse {
    /**
     * Total number
     */
    count: number;
    /**
     * Count of replies of current level
     */
    current_level_count: number;
    /**
     * Information whether current user can comment the post
     */
    can_post: boolean | number;
    /**
     * Information whether groups can comment the post
     */
    groups_can_post: boolean | number;
    [key: string]: any;
    items: Objects.WallWallComment[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
    show_reply_button: boolean | number;
}

export interface WallGetCommentsResponse {
    /**
     * Total number
     */
    count: number;
    /**
     * Count of replies of current level
     */
    current_level_count: number;
    /**
     * Information whether current user can comment the post
     */
    can_post: boolean | number;
    /**
     * Information whether groups can comment the post
     */
    groups_can_post: boolean | number;
    [key: string]: any;
    items: Objects.WallWallComment[];
    show_reply_button: boolean | number;
}

export interface WallGetRepostsResponse {
    [key: string]: any;
    items: Objects.WallWallpostFull[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface WallGetExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.WallWallItem[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface WallGetResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.WallWallItem[];
}

export interface WallPostAdsStealthResponse {
    /**
     * Created post ID
     */
    post_id: number;
    [key: string]: any;
}

export interface WallPostResponse {
    /**
     * Created post ID
     */
    post_id: number;
    [key: string]: any;
}

export interface WallRepostResponse {
    /**
     * Created post ID
     */
    post_id: number;
    /**
     * Reposts number
     */
    reposts_count: number;
    /**
     * Reposts to wall number
     */
    wall_repost_count: number;
    /**
     * Reposts to mail number
     */
    mail_repost_count: number;
    /**
     * Reposts number
     */
    likes_count: number;
    [key: string]: any;
    success: number;
}

export interface WallSearchExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.WallWallItem[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface WallSearchResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.WallWallItem[];
}

export interface WidgetsGetCommentsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    posts: Objects.WidgetsWidgetComment[];
}

export interface WidgetsGetPagesResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    pages: Objects.WidgetsWidgetPage[];
}

