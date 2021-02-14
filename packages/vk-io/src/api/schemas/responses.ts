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
    secret?: string;
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

export type AccountGetAppPermissionsResponse = number;

export interface AccountGetBannedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: number[];
    profiles?: Objects.UsersUserMin[];
    groups?: Objects.GroupsGroup[];
}

export type AccountGetCountersResponse = Objects.AccountAccountCounters;

export type AccountGetInfoResponse = Objects.AccountInfo;

export type AccountGetProfileInfoResponse = Objects.AccountUserSettings;

export type AccountGetPushSettingsResponse = Objects.AccountPushSettings;

export interface AccountSaveProfileInfoResponse {
    [key: string]: any;
}

export type AdsAddOfficeUsersResponse = boolean | number;

export type AdsCheckLinkResponse = Objects.AdsLinkStatus;

export type AdsCreateAdsResponse = number[];

export type AdsCreateCampaignsResponse = number[];

export type AdsCreateClientsResponse = number[];

export interface AdsCreateTargetGroupResponse {
    /**
     * Group ID
     */
    id?: number;
    /**
     * Pixel code
     */
    pixel?: string;
    [key: string]: any;
}

export type AdsDeleteAdsResponse = number[];

export type AdsDeleteCampaignsResponse = number;

export type AdsDeleteClientsResponse = number;

export type AdsGetAccountsResponse = Objects.AdsAccount[];

export type AdsGetAdsLayoutResponse = Objects.AdsAdLayout[];

export type AdsGetAdsTargetingResponse = Objects.AdsTargSettings[];

export type AdsGetAdsResponse = Objects.AdsAd[];

export type AdsGetBudgetResponse = number;

export type AdsGetCampaignsResponse = Objects.AdsCampaign[];

export interface AdsGetCategoriesResponse {
    [key: string]: any;
    v1?: Objects.AdsCategory[];
    v2?: Objects.AdsCategory[];
}

export type AdsGetClientsResponse = Objects.AdsClient[];

export type AdsGetDemographicsResponse = Objects.AdsDemoStats[];

export type AdsGetFloodStatsResponse = Objects.AdsFloodStats;

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

export type AdsGetOfficeUsersResponse = Objects.AdsUsers[];

export type AdsGetPostsReachResponse = Objects.AdsPromotedPostReach[];

export type AdsGetRejectionReasonResponse = Objects.AdsRejectReason;

export type AdsGetStatisticsResponse = Objects.AdsStats[];

export type AdsGetSuggestionsCitiesResponse = Objects.AdsTargSuggestionsCities[];

export type AdsGetSuggestionsRegionsResponse = Objects.AdsTargSuggestionsRegions[];

export type AdsGetSuggestionsResponse = Objects.AdsTargSuggestions[];

export type AdsGetSuggestionsSchoolsResponse = Objects.AdsTargSuggestionsSchools[];

export type AdsGetTargetGroupsResponse = Objects.AdsTargetGroup[];

export type AdsGetTargetingStatsResponse = Objects.AdsTargStats;

export type AdsGetUploadURLResponse = string;

export type AdsGetVideoUploadURLResponse = string;

export type AdsImportTargetContactsResponse = number;

export type AdsRemoveOfficeUsersResponse = boolean | number;

export type AdsUpdateAdsResponse = number[];

export type AdsUpdateCampaignsResponse = number;

export type AdsUpdateClientsResponse = number;

export type AdsUpdateOfficeUsersResponse = Objects.AdsUpdateOfficeUsersResult[];

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
    ad_units?: Objects.AdswebGetAdUnitsResponseAdUnitsAdUnit[];
}

export interface AdswebGetFraudHistoryResponse {
    [key: string]: any;
    count: number;
    entries?: Objects.AdswebGetFraudHistoryResponseEntriesEntry[];
}

export interface AdswebGetSitesResponse {
    [key: string]: any;
    count: number;
    sites?: Objects.AdswebGetSitesResponseSitesSite[];
}

export interface AdswebGetStatisticsResponse {
    [key: string]: any;
    next_page_id?: string;
    items: Objects.AdswebGetStatisticsResponseItemsItem[];
}

export interface AppWidgetsGetAppImageUploadServerResponse {
    /**
     * To upload an image, generate POST-request to upload_url with a file in photo field. Then call appWidgets.saveAppImage method
     */
    upload_url?: string;
    [key: string]: any;
}

export type AppWidgetsGetAppImagesResponse = Objects.AppWidgetsPhotos;

export interface AppWidgetsGetGroupImageUploadServerResponse {
    /**
     * To upload an image, generate POST-request to upload_url with a file in photo field. Then call appWidgets.saveAppImage method
     */
    upload_url?: string;
    [key: string]: any;
}

export type AppWidgetsGetGroupImagesResponse = Objects.AppWidgetsPhotos;

export type AppWidgetsGetImagesByIdResponse = Objects.AppWidgetsPhoto[];

export type AppWidgetsSaveAppImageResponse = Objects.AppWidgetsPhoto;

export type AppWidgetsSaveGroupImageResponse = Objects.AppWidgetsPhoto;

export interface AppsGetCatalogResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.AppsApp[];
    profiles?: Objects.UsersUserMin[];
}

export interface AppsGetFriendsListResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.UsersUserFull[];
}

export interface AppsGetLeaderboardExtendedResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.AppsLeaderboard[];
    profiles?: Objects.UsersUserMin[];
}

export interface AppsGetLeaderboardResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.AppsLeaderboard[];
}

export interface AppsGetMiniAppPoliciesResponse {
    /**
     * URL of the app's privacy policy
     */
    privacy_policy?: string;
    /**
     * URL of the app's terms
     */
    terms?: string;
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

export type AppsGetScoreResponse = number;

export interface AppsGetResponse {
    /**
     * Total number of applications
     */
    count?: number;
    [key: string]: any;
    items?: Objects.AppsApp[];
}

export interface AppsImageUploadResponse {
    /**
     * Uploading hash
     */
    hash?: string;
    /**
     * Uploaded photo data
     */
    image?: string;
    [key: string]: any;
}

export type AppsSendRequestResponse = number;

export interface AuthRestoreResponse {
    /**
     * 1 if success
     */
    success?: 1;
    /**
     * Parameter needed to grant access by code
     */
    sid?: string;
    [key: string]: any;
}

export type BaseBoolResponse = Objects.BaseBoolInt;

export type BaseGetUploadServerResponse = Objects.BaseUploadServer;

export type BaseOkResponse = 1;

export type BoardAddTopicResponse = number;

export type BoardCreateCommentResponse = number;

export interface BoardGetCommentsExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.BoardTopicComment[];
    profiles: Objects.UsersUser[];
    groups: Objects.GroupsGroup[];
}

export interface BoardGetCommentsResponse {
    /**
     * Total number
     */
    count: number;
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
    profiles: Objects.UsersUserMin[];
}

export interface BoardGetTopicsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.BoardTopic[];
}

export interface DatabaseGetChairsResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.BaseObject[];
}

export type DatabaseGetCitiesByIdResponse = Objects.BaseObject[];

export interface DatabaseGetCitiesResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.DatabaseCity[];
}

export type DatabaseGetCountriesByIdResponse = Objects.BaseCountry[];

export interface DatabaseGetCountriesResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.BaseCountry[];
}

export interface DatabaseGetFacultiesResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.DatabaseFaculty[];
}

export type DatabaseGetMetroStationsByIdResponse = Objects.DatabaseStation[];

export interface DatabaseGetMetroStationsResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.DatabaseStation[];
}

export interface DatabaseGetRegionsResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.DatabaseRegion[];
}

export type DatabaseGetSchoolClassesResponse = any[][];

export interface DatabaseGetSchoolsResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.DatabaseSchool[];
}

export interface DatabaseGetUniversitiesResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.DatabaseUniversity[];
}

export type DocsAddResponse = number;

export interface DocsDocUploadResponse {
    /**
     * Uploaded file data
     */
    file?: string;
    [key: string]: any;
}

export type DocsGetByIdResponse = Objects.DocsDoc[];

export interface DocsGetTypesResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.DocsDocTypes[];
}

export type DocsGetUploadServer = Objects.BaseUploadServer;

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

export type DonutGetSubscriptionResponse = Objects.DonutDonatorSubscriptionInfo;

export interface DonutGetSubscriptionsResponse {
    [key: string]: any;
    subscriptions: Objects.DonutDonatorSubscriptionInfo[];
    count?: number;
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroupFull[];
}

export interface DownloadedGamesPaidStatusResponse {
    /**
     * Game has been paid
     */
    is_paid: boolean | number;
    [key: string]: any;
}

export type FaveAddTagResponse = Objects.FaveTag;

export interface FaveGetPagesResponse {
    [key: string]: any;
    count?: number;
    items?: Objects.FavePage[];
}

export interface FaveGetTagsResponse {
    [key: string]: any;
    count?: number;
    items?: Objects.FaveTag[];
}

export interface FaveGetExtendedResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.FaveBookmark[];
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroup[];
}

export interface FaveGetResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.FaveBookmark[];
}

export interface FriendsAddListResponse {
    /**
     * List ID
     */
    list_id: number;
    [key: string]: any;
}

export type FriendsAddResponse = 1 | 2 | 4;

export type FriendsAreFriendsExtendedResponse = Objects.FriendsFriendExtendedStatus[];

export type FriendsAreFriendsResponse = Objects.FriendsFriendStatus[];

export interface FriendsDeleteResponse {
    /**
     * Returns 1 if friend has been deleted
     */
    friend_deleted?: 1;
    /**
     * Returns 1 if out request has been canceled
     */
    out_request_deleted?: 1;
    /**
     * Returns 1 if incoming request has been declined
     */
    in_request_deleted?: 1;
    /**
     * Returns 1 if suggestion has been declined
     */
    suggestion_deleted?: 1;
    [key: string]: any;
    success: number;
}

export type FriendsGetAppUsersResponse = number[];

export type FriendsGetByPhonesResponse = Objects.FriendsUserXtrPhone[];

export interface FriendsGetListsResponse {
    /**
     * Total number of friends lists
     */
    count: number;
    [key: string]: any;
    items: Objects.FriendsFriendsList[];
}

export type FriendsGetMutualResponse = number[];

export type FriendsGetMutualTargetUidsResponse = Objects.FriendsMutualFriend[];

export interface FriendsGetOnlineOnlineMobileResponse {
    /**
     * User ID
     */
    online?: number[];
    /**
     * User ID
     */
    online_mobile?: number[];
    [key: string]: any;
}

export type FriendsGetOnlineResponse = number[];

export type FriendsGetRecentResponse = number[];

export interface FriendsGetRequestsExtendedResponse {
    /**
     * Total requests number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.FriendsRequestsXtrMessage[];
}

export interface FriendsGetRequestsNeedMutualResponse {
    /**
     * Total requests number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.FriendsRequests[];
}

export interface FriendsGetRequestsResponse {
    /**
     * Total requests number
     */
    count?: number;
    /**
     * User ID
     */
    items?: number[];
    /**
     * Total unread requests number
     */
    count_unread?: number;
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
    items: Objects.FriendsUserXtrLists[];
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
    count?: number;
    [key: string]: any;
    items?: Objects.GiftsGift[];
}

export type GroupsAddAddressResponse = Objects.GroupsAddress;

export interface GroupsAddCallbackServerResponse {
    [key: string]: any;
    server_id: number;
}

export type GroupsAddLinkResponse = Objects.GroupsGroupLink;

export type GroupsCreateResponse = Objects.GroupsGroup;

export type GroupsEditAddressResponse = Objects.GroupsAddress;

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

export type GroupsGetByIdLegacyResponse = Objects.GroupsGroupFull[];

export interface GroupsGetByIdResponse {
    [key: string]: any;
    groups?: Objects.GroupsGroupFull[];
    profiles?: Objects.GroupsProfileItem[];
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

export type GroupsGetCallbackSettingsResponse = Objects.GroupsCallbackSettings;

export interface GroupsGetCatalogInfoExtendedResponse {
    /**
     * Information whether catalog is enabled for current user
     */
    enabled: number;
    [key: string]: any;
    categories?: Objects.GroupsGroupCategoryFull[];
}

export interface GroupsGetCatalogInfoResponse {
    /**
     * Information whether catalog is enabled for current user
     */
    enabled: number;
    [key: string]: any;
    categories?: Objects.GroupsGroupCategory[];
}

export interface GroupsGetCatalogResponse {
    /**
     * Total communities number
     */
    count: number;
    [key: string]: any;
    items: Objects.GroupsGroup[];
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

export type GroupsGetLongPollServerResponse = Objects.GroupsLongPollServer;

export type GroupsGetLongPollSettingsResponse = Objects.GroupsLongPollSettings;

export interface GroupsGetMembersFieldsResponse {
    /**
     * Total members number
     */
    count: number;
    [key: string]: any;
    items: Objects.GroupsUserXtrRole[];
}

export interface GroupsGetMembersFilterResponse {
    /**
     * Total members number
     */
    count: number;
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
    address?: string;
    /**
     * Articles settings
     */
    articles: number;
    /**
     * Photo suggests setting
     */
    recognize_photo?: number;
    /**
     * City id of group
     */
    city_id: number;
    /**
     * Country id of group
     */
    country_id: number;
    /**
     * Community description
     */
    description: string;
    /**
     * Information about the group category
     */
    public_category?: number;
    /**
     * Information about the group subcategory
     */
    public_subcategory?: number;
    /**
     * URL of the RSS feed
     */
    rss?: string;
    /**
     * Start date
     */
    start_date?: number;
    /**
     * Finish date in Unix-time format
     */
    finish_date?: number;
    /**
     * Community subject ID
     */
    subject?: number;
    /**
     * Community title
     */
    title: string;
    /**
     * Community website
     */
    website?: string;
    /**
     * Community phone
     */
    phone?: string;
    /**
     * Community email
     */
    email?: string;
    [key: string]: any;
    sections_list?: Objects.GroupsSectionsListItem[];
    secondary_section?: number;
    obscene_words: string[];
    event_group_id?: number;
    public_category_list?: Objects.GroupsGroupPublicCategoryList[];
    public_date?: string;
    public_date_label?: string;
    subject_list?: Objects.GroupsSubjectItem[];
}

export type GroupsGetTagListResponse = Objects.GroupsGroupTag[];

export interface GroupsGetTokenPermissionsResponse {
    [key: string]: any;
    mask: number;
    permissions: Objects.GroupsTokenPermissionSetting[];
}

export interface GroupsGetExtendedResponse {
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

export interface GroupsIsMemberExtendedResponse {
    [key: string]: any;
}

export type GroupsIsMemberResponse = Objects.BaseBoolInt;

export type GroupsIsMemberUserIdsExtendedResponse = Objects.GroupsMemberStatusFull[];

export type GroupsIsMemberUserIdsResponse = Objects.GroupsMemberStatus[];

export interface GroupsSearchResponse {
    /**
     * Total communities number
     */
    count: number;
    [key: string]: any;
    items: Objects.GroupsGroup[];
}

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
    items: Objects.UsersUserMin[];
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
    market_album_id?: number;
    [key: string]: any;
}

export interface MarketAddResponse {
    /**
     * Item ID
     */
    market_item_id?: number;
    [key: string]: any;
}

export type MarketCreateCommentResponse = number;

export type MarketDeleteCommentResponse = Objects.BaseBoolInt;

export interface MarketGetAlbumByIdResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.MarketMarketAlbum[];
}

export interface MarketGetAlbumsResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.MarketMarketAlbum[];
}

export interface MarketGetByIdExtendedResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.MarketMarketItemFull[];
}

export interface MarketGetByIdResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.MarketMarketItem[];
}

export interface MarketGetCategoriesNewResponse {
    [key: string]: any;
    items: Objects.MarketMarketCategoryTree[];
}

export interface MarketGetCategoriesResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.MarketMarketCategory[];
}

export interface MarketGetCommentsResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.WallWallComment[];
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
    groups?: Objects.GroupsGroupFull[];
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
    count?: number;
    [key: string]: any;
    items?: Objects.MarketMarketItemFull[];
}

export interface MarketGetResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.MarketMarketItem[];
}

export type MarketRestoreCommentResponse = Objects.BaseBoolInt;

export interface MarketSearchExtendedResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.MarketMarketItemFull[];
}

export interface MarketSearchResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.MarketMarketItem[];
}

export type MessagesCreateChatResponse = number;

export interface MessagesDeleteChatPhotoResponse {
    /**
     * Service message ID
     */
    message_id?: number;
    [key: string]: any;
}

export interface MessagesDeleteConversationResponse {
    /**
     * Id of the last message, that was deleted
     */
    last_deleted_id: number;
    [key: string]: any;
}

export type MessagesDeleteResponse = any;

export type MessagesEditResponse = Objects.BaseBoolInt;

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
    groups?: Objects.GroupsGroupFull[];
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
    profiles?: Objects.UsersUserFull[];
}

export type MessagesGetChatChatIdsFieldsResponse = Objects.MessagesChatFull[];

export type MessagesGetChatChatIdsResponse = Objects.MessagesChat[];

export type MessagesGetChatFieldsResponse = Objects.MessagesChatFull;

export type MessagesGetChatResponse = Objects.MessagesChat;

export interface MessagesGetConversationMembersResponse {
    /**
     * Chat members count
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesConversationMember[];
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroupFull[];
}

export interface MessagesGetConversationsByIdExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesConversation[];
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroupFull[];
}

export interface MessagesGetConversationsByIdResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesConversation[];
}

export interface MessagesGetConversationsResponse {
    /**
     * Total number
     */
    count: number;
    /**
     * Unread dialogs number
     */
    unread_count?: number;
    [key: string]: any;
    items: Objects.MessagesConversationWithMessage[];
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroupFull[];
}

export interface MessagesGetHistoryAttachmentsResponse {
    /**
     * Value for pagination
     */
    next_from?: string;
    [key: string]: any;
    items?: Objects.MessagesHistoryAttachment[];
}

export interface MessagesGetHistoryExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesMessage[];
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroupFull[];
    conversations?: Objects.MessagesConversation[];
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
    profiles?: Objects.UsersUser[];
    groups?: Objects.GroupsGroup[];
    conversations?: Objects.MessagesConversation[];
}

export interface MessagesGetImportantMessagesResponse {
    [key: string]: any;
    profiles?: Objects.UsersUser[];
    groups?: Objects.GroupsGroup[];
    conversations?: Objects.MessagesConversation[];
}

export interface MessagesGetIntentUsersResponse {
    [key: string]: any;
    count: number;
    items: number[];
    profiles?: Objects.UsersUserFull[];
}

export interface MessagesGetInviteLinkResponse {
    [key: string]: any;
    link?: string;
}

export type MessagesGetLastActivityResponse = Objects.MessagesLastActivity;

export interface MessagesGetLongPollHistoryResponse {
    /**
     * Longpoll event value
     */
    history?: number[][];
    /**
     * Persistence timestamp
     */
    new_pts?: number;
    /**
     * Has more
     */
    more?: boolean | number;
    [key: string]: any;
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroup[];
    chats?: Objects.MessagesChat[];
    from_pts?: number;
    conversations?: Objects.MessagesConversation[];
}

export type MessagesGetLongPollServerResponse = Objects.MessagesLongpollParams;

export interface MessagesIsMessagesFromGroupAllowedResponse {
    [key: string]: any;
}

export interface MessagesJoinChatByInviteLinkResponse {
    [key: string]: any;
    chat_id?: number;
}

export type MessagesMarkAsImportantResponse = number[];

export type MessagesPinResponse = Objects.MessagesPinnedMessage;

export interface MessagesSearchConversationsExtendedResponse {
    /**
     * Total results number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesConversation[];
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroupFull[];
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
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroupFull[];
    conversations?: Objects.MessagesConversation[];
}

export interface MessagesSearchResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesMessage[];
}

export type MessagesSendResponse = number;

export type MessagesSendUserIdsResponse = any[];

export interface MessagesSetChatPhotoResponse {
    /**
     * Service message ID
     */
    message_id?: number;
    [key: string]: any;
}

export interface NewsfeedGetBannedExtendedResponse {
    [key: string]: any;
    groups?: Objects.UsersUserFull[];
    profiles?: Objects.GroupsGroupFull[];
}

export interface NewsfeedGetBannedResponse {
    /**
     * Community ID
     */
    groups?: number[];
    /**
     * User ID
     */
    members?: number[];
    [key: string]: any;
}

export interface NewsfeedGetCommentsResponse {
    /**
     * Next from value
     */
    next_from?: string;
    [key: string]: any;
    items: Objects.NewsfeedNewsfeedItem[];
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
    items: Objects.WallWallpostToId[];
}

export interface NewsfeedGetRecommendedResponse {
    /**
     * Next from value
     */
    next_from?: string;
    [key: string]: any;
    items?: Objects.NewsfeedNewsfeedItem[];
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroupFull[];
}

export interface NewsfeedGetSuggestedSourcesResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.UsersSubscriptionsItem[];
}

export interface NewsfeedGetResponse {
    /**
     * New from value
     */
    next_from?: string;
    [key: string]: any;
    items?: Objects.NewsfeedNewsfeedItem[];
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroupFull[];
}

export interface NewsfeedIgnoreItemResponse {
    [key: string]: any;
    status: boolean | number;
}

export type NewsfeedSaveListResponse = number;

export interface NewsfeedSearchExtendedResponse {
    /**
     * Filtered number
     */
    count?: number;
    /**
     * Total number
     */
    total_count?: number;
    [key: string]: any;
    items?: Objects.WallWallpostFull[];
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroupFull[];
    suggested_queries?: string[];
    next_from?: string;
}

export interface NewsfeedSearchResponse {
    /**
     * Filtered number
     */
    count?: number;
    /**
     * Total number
     */
    total_count?: number;
    [key: string]: any;
    items?: Objects.WallWallpostFull[];
    suggested_queries?: string[];
    next_from?: string;
}

export type NotesAddResponse = number;

export type NotesCreateCommentResponse = number;

export type NotesGetByIdResponse = Objects.NotesNote;

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
    count?: number;
    /**
     * Time when user has been checked notifications last time
     */
    last_viewed?: number;
    [key: string]: any;
    items?: Objects.NotificationsNotificationItem[];
    profiles?: Objects.UsersUser[];
    groups?: Objects.GroupsGroup[];
    photos?: Objects.PhotosPhoto[];
    videos?: Objects.VideoVideo[];
    apps?: Objects.AppsApp[];
    next_from?: string;
    ttl?: number;
}

export type NotificationsMarkAsViewedResponse = Objects.BaseBoolInt;

export type NotificationsSendMessageResponse = Objects.NotificationsSendMessageItem[];

export type OrdersCancelSubscriptionResponse = Objects.BaseBoolInt;

export type OrdersChangeStateResponse = string;

export type OrdersGetAmountResponse = Objects.OrdersAmount;

export type OrdersGetByIdResponse = Objects.OrdersOrder[];

export type OrdersGetUserSubscriptionByIdResponse = Objects.OrdersSubscription;

export interface OrdersGetUserSubscriptionsResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.OrdersSubscription[];
}

export type OrdersGetResponse = Objects.OrdersOrder[];

export type OrdersUpdateSubscriptionResponse = Objects.BaseBoolInt;

export type PagesGetHistoryResponse = Objects.PagesWikipageHistory[];

export type PagesGetTitlesResponse = Objects.PagesWikipage[];

export type PagesGetVersionResponse = Objects.PagesWikipageFull;

export type PagesGetResponse = Objects.PagesWikipageFull;

export type PagesParseWikiResponse = string;

export type PagesSaveAccessResponse = number;

export type PagesSaveResponse = number;

export type PhotosCopyResponse = number;

export type PhotosCreateAlbumResponse = Objects.PhotosPhotoAlbumFull;

export type PhotosCreateCommentResponse = number;

export type PhotosDeleteCommentResponse = Objects.BaseBoolInt;

export type PhotosGetAlbumsCountResponse = number;

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
    count?: number;
    [key: string]: any;
    items?: Objects.PhotosCommentXtrPid[];
}

export interface PhotosGetAllExtendedResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.PhotosPhotoFullXtrRealOffset[];
}

export interface PhotosGetAllResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.PhotosPhotoXtrRealOffset[];
}

export type PhotosGetByIdExtendedResponse = Objects.PhotosPhotoFull[];

export type PhotosGetByIdResponse = Objects.PhotosPhoto[];

export interface PhotosGetCommentsExtendedResponse {
    /**
     * Total number
     */
    count: number;
    /**
     * Real offset of the comments
     */
    real_offset?: number;
    [key: string]: any;
    items: Objects.WallWallComment[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface PhotosGetCommentsResponse {
    /**
     * Total number
     */
    count?: number;
    /**
     * Real offset of the comments
     */
    real_offset?: number;
    [key: string]: any;
    items?: Objects.WallWallComment[];
}

export type PhotosGetMarketUploadServerResponse = Objects.BaseUploadServer;

export type PhotosGetMessagesUploadServerResponse = Objects.PhotosPhotoUpload;

export interface PhotosGetNewTagsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.PhotosPhotoXtrTagInfo[];
}

export type PhotosGetTagsResponse = Objects.PhotosPhotoTag[];

export type PhotosGetUploadServerResponse = Objects.PhotosPhotoUpload;

export interface PhotosGetUserPhotosExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.PhotosPhotoFull[];
}

export interface PhotosGetUserPhotosResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.PhotosPhoto[];
}

export type PhotosGetWallUploadServerResponse = Objects.PhotosPhotoUpload;

export interface PhotosGetExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.PhotosPhotoFull[];
}

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
    gid?: number;
    /**
     * Uploading hash
     */
    hash?: string;
    /**
     * Uploaded photo data
     */
    photo?: string;
    /**
     * Upload server number
     */
    server?: number;
    [key: string]: any;
}

export interface PhotosMarketUploadResponse {
    /**
     * Crop data
     */
    crop_data?: string;
    /**
     * Crop hash
     */
    crop_hash?: string;
    /**
     * Community ID
     */
    group_id?: number;
    /**
     * Uploading hash
     */
    hash?: string;
    /**
     * Uploaded photo data
     */
    photo?: string;
    /**
     * Upload server number
     */
    server?: number;
    [key: string]: any;
}

export interface PhotosMessageUploadResponse {
    /**
     * Uploading hash
     */
    hash?: string;
    /**
     * Uploaded photo data
     */
    photo?: string;
    /**
     * Upload server number
     */
    server?: number;
    [key: string]: any;
}

export interface PhotosOwnerCoverUploadResponse {
    /**
     * Uploading hash
     */
    hash?: string;
    /**
     * Uploaded photo data
     */
    photo?: string;
    [key: string]: any;
}

export interface PhotosOwnerUploadResponse {
    /**
     * Uploading hash
     */
    hash?: string;
    /**
     * Uploaded photo data
     */
    photo?: string;
    /**
     * Upload server number
     */
    server?: number;
    [key: string]: any;
}

export interface PhotosPhotoUploadResponse {
    /**
     * Album ID
     */
    aid?: number;
    /**
     * Uploading hash
     */
    hash?: string;
    /**
     * Uploaded photo data
     */
    photo?: string;
    /**
     * Uploaded photos data
     */
    photos_list?: string;
    /**
     * Upload server number
     */
    server?: number;
    [key: string]: any;
}

export type PhotosPutTagResponse = number;

export type PhotosRestoreCommentResponse = Objects.BaseBoolInt;

export type PhotosSaveMarketAlbumPhotoResponse = Objects.PhotosPhoto[];

export type PhotosSaveMarketPhotoResponse = Objects.PhotosPhoto[];

export type PhotosSaveMessagesPhotoResponse = Objects.PhotosPhoto[];

export type PhotosSaveOwnerCoverPhotoResponse = Objects.BaseImage[];

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
    photo_src_big?: string;
    /**
     * Uploaded image url
     */
    photo_src_small?: string;
    /**
     * Returns 1 if profile photo is saved
     */
    saved?: number;
    /**
     * Created post ID
     */
    post_id?: number;
    [key: string]: any;
}

export type PhotosSaveWallPhotoResponse = Objects.PhotosPhoto[];

export type PhotosSaveResponse = Objects.PhotosPhoto[];

export interface PhotosSearchResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.PhotosPhoto[];
}

export interface PhotosWallUploadResponse {
    /**
     * Uploading hash
     */
    hash?: string;
    /**
     * Uploaded photo data
     */
    photo?: string;
    /**
     * Upload server number
     */
    server?: number;
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

export type PollsAddVoteResponse = Objects.BaseBoolInt;

export type PollsCreateResponse = Objects.PollsPoll;

export type PollsDeleteVoteResponse = Objects.BaseBoolInt;

export type PollsGetBackgroundsResponse = Objects.PollsBackground[];

export type PollsGetByIdResponse = Objects.PollsPoll;

export type PollsGetVotersResponse = Objects.PollsVoters[];

export type PollsSavePhotoResponse = Objects.PollsBackground;

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
    error?: string;
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

export type PrettyCardsGetByIdResponse = Objects.PrettyCardsPrettyCard[];

export type PrettyCardsGetUploadURLResponse = string;

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
    suggested_queries?: string[];
}

export type SecureCheckTokenResponse = Objects.SecureTokenChecked;

export type SecureGetAppBalanceResponse = number;

export type SecureGetSmsHistoryResponse = Objects.SecureSmsNotification[];

export type SecureGetTransactionsHistoryResponse = Objects.SecureTransaction[];

export type SecureGetUserLevelResponse = Objects.SecureLevel[];

export type SecureGiveEventStickerResponse = any[];

export type SecureSendNotificationResponse = number[];

export type StatsGetPostReachResponse = Objects.StatsWallpostStat[];

export type StatsGetResponse = Objects.StatsPeriod[];

export type StatusGetResponse = Objects.StatusStatus;

export type StorageGetKeysResponse = string[];

export type StorageGetResponse = Objects.StorageValue[];

export type StoreGetFavoriteStickersResponse = Objects.BaseSticker[];

export type StoreGetProductsResponse = Objects.StoreProduct[];

export interface StoreGetStickersKeywordsResponse {
    /**
     * Total count of chunks to load
     */
    chunks_count?: number;
    /**
     * Chunks version hash
     */
    chunks_hash?: string;
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

export interface StoriesGetByIdResponse {
    /**
     * Stories count
     */
    count: number;
    [key: string]: any;
    items: Objects.StoriesStory[];
}

export interface StoriesGetPhotoUploadServerResponse {
    /**
     * Upload URL
     */
    upload_url: string;
    [key: string]: any;
    user_ids: number[];
}

export type StoriesGetStatsResponse = Objects.StoriesStoryStats;

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
    hidden_reason?: string;
}

export interface StoriesGetViewersExtendedResponse {
    /**
     * Viewers count
     */
    count: number;
    [key: string]: any;
    items: Objects.UsersUserFull[];
}

export interface StoriesGetV5113Response {
    [key: string]: any;
    count: number;
    items: Objects.StoriesFeedItem[];
    profiles?: Objects.UsersUser[];
    groups?: Objects.GroupsGroup[];
    need_upload_screen?: boolean | number;
}

export interface StoriesGetResponse {
    /**
     * Stories count
     */
    count: number;
    [key: string]: any;
    items: Objects.StoriesStory[][];
    profiles?: Objects.UsersUser[];
    groups?: Objects.GroupsGroup[];
    need_upload_screen?: boolean | number;
}

export interface StoriesSaveResponse {
    [key: string]: any;
    count: number;
    items: Objects.StoriesStory[];
}

export interface StoriesUploadResponse {
    /**
     * A string hash that is used in the stories.save method
     */
    upload_result?: string;
    [key: string]: any;
}

export interface StreamingGetServerUrlResponse {
    /**
     * Server host
     */
    endpoint?: string;
    /**
     * Access key
     */
    key?: string;
    [key: string]: any;
}

export interface UsersGetFollowersFieldsResponse {
    /**
     * Total number of available results
     */
    count: number;
    [key: string]: any;
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

export type UsersGetResponse = Objects.UsersUserXtrCounters[];

export interface UsersSearchResponse {
    /**
     * Total number of available results
     */
    count?: number;
    [key: string]: any;
    items?: Objects.UsersUserFull[];
}

export type UtilsCheckLinkResponse = Objects.UtilsLinkChecked;

export interface UtilsGetLastShortenedLinksResponse {
    /**
     * Total number of available results
     */
    count?: number;
    [key: string]: any;
    items?: Objects.UtilsLastShortenedLink[];
}

export type UtilsGetLinkStatsExtendedResponse = Objects.UtilsLinkStatsExtended;

export type UtilsGetLinkStatsResponse = Objects.UtilsLinkStats;

export type UtilsGetServerTimeResponse = number;

export type UtilsGetShortLinkResponse = Objects.UtilsShortLink;

export type UtilsResolveScreenNameResponse = Objects.UtilsDomainResolved;

export interface VideoAddAlbumResponse {
    /**
     * Created album ID
     */
    album_id: number;
    [key: string]: any;
}

export type VideoCreateCommentResponse = number;

export type VideoGetAlbumByIdResponse = Objects.VideoVideoAlbumFull;

export interface VideoGetAlbumsByVideoExtendedResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.VideoVideoAlbumFull[];
}

export type VideoGetAlbumsByVideoResponse = number[];

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
    items: Objects.VideoVideoAlbumFull[];
}

export interface VideoGetCommentsExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.WallWallComment[];
    profiles: Objects.UsersUserMin[];
    groups: Objects.GroupsGroupFull[];
}

export interface VideoGetCommentsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.WallWallComment[];
}

export interface VideoGetExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideoFull[];
    profiles?: Objects.UsersUserMin[];
    groups?: Objects.GroupsGroupFull[];
}

export interface VideoGetResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideoFull[];
}

export type VideoRestoreCommentResponse = Objects.BaseBoolInt;

export type VideoSaveResponse = Objects.VideoSaveResult;

export interface VideoSearchExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideoFull[];
    profiles: Objects.UsersUserMin[];
    groups: Objects.GroupsGroupFull[];
}

export interface VideoSearchResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideo[];
}

export interface VideoUploadResponse {
    /**
     * Video size
     */
    size?: number;
    /**
     * Video ID
     */
    video_id?: number;
    [key: string]: any;
}

export interface WallCreateCommentResponse {
    /**
     * Created comment ID
     */
    comment_id: number;
    [key: string]: any;
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
    items: Objects.WallWallpostFull[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export type WallGetByIdLegacyResponse = Objects.WallWallpostFull[];

export interface WallGetByIdResponse {
    [key: string]: any;
    items?: Objects.WallWallpostFull[];
}

export interface WallGetCommentExtendedResponse {
    [key: string]: any;
    items: Objects.WallWallComment[];
    profiles: Objects.UsersUser[];
    groups: Objects.GroupsGroup[];
}

export interface WallGetCommentResponse {
    [key: string]: any;
    items: Objects.WallWallComment[];
}

export interface WallGetCommentsExtendedResponse {
    /**
     * Total number
     */
    count: number;
    /**
     * Information whether current user can comment the post
     */
    can_post?: boolean | number;
    /**
     * Information whether groups can comment the post
     */
    groups_can_post?: boolean | number;
    /**
     * Count of replies of current level
     */
    current_level_count?: number;
    [key: string]: any;
    items: Objects.WallWallComment[];
    show_reply_button?: boolean | number;
    profiles: Objects.UsersUser[];
    groups: Objects.GroupsGroup[];
}

export interface WallGetCommentsResponse {
    /**
     * Total number
     */
    count: number;
    /**
     * Information whether current user can comment the post
     */
    can_post?: boolean | number;
    /**
     * Information whether groups can comment the post
     */
    groups_can_post?: boolean | number;
    /**
     * Count of replies of current level
     */
    current_level_count?: number;
    [key: string]: any;
    items: Objects.WallWallComment[];
}

export interface WallGetRepostsResponse {
    [key: string]: any;
    items: Objects.WallWallpostFull[];
    profiles: Objects.UsersUser[];
    groups: Objects.GroupsGroup[];
}

export interface WallGetExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.WallWallpostFull[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface WallGetResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.WallWallpostFull[];
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
    wall_repost_count?: number;
    /**
     * Reposts to mail number
     */
    mail_repost_count?: number;
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
    items: Objects.WallWallpostFull[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface WallSearchResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.WallWallpostFull[];
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

