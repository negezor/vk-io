/* tslint:disable */
import * as Objects from "./objects.d";

export type OkResponse = Objects.BaseOkResponse;

export type BaseGetUploadServerResponse = Objects.BaseUploadServer;

export interface AccountChangePasswordResponse {
    /**
     * New token
     */
    token?: string;
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
    items: Objects.UsersUserMin[];
}

export type AccountGetCountersResponse = Objects.AccountAccountCounters;

export type AccountGetInfoResponse = Objects.AccountInfo;

export type AccountGetProfileInfoResponse = Objects.AccountUserSettings;

export type AccountGetPushSettingsResponse = Objects.AccountPushSettings;

export type AccountLookupContactsResponse = Objects.AccountLookupResult;

export interface AccountSaveProfileInfoResponse {
    [key: string]: any;
}

export type AdsAddOfficeUsersResponse = boolean;

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

export type AdsGetAdsResponse = Objects.AdsAd[];

export type AdsGetAdsLayoutResponse = Objects.AdsAdLayout[];

export type AdsGetAdsPostsReachResponse = Objects.AdsPostStats[];

export type AdsGetAdsTargetingResponse = Objects.AdsTargSettings[];

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

export type AdsGetOfficeUsersResponse = Objects.AdsUsers[];

export type AdsGetRejectionReasonResponse = Objects.AdsRejectReason;

export type AdsGetStatisticsResponse = Objects.AdsStats[];

export type AdsGetSuggestionsResponse = Objects.AdsTargSuggestions[];

export type AdsGetSuggestionsRegionsResponse = Objects.AdsTargSuggestionsRegions[];

export type AdsGetSuggestionsCitiesResponse = Objects.AdsTargSuggestionsCities[];

export type AdsGetSuggestionsSchoolsResponse = Objects.AdsTargSuggestionsSchools[];

export type AdsGetTargetGroupsResponse = Objects.AdsTargetGroup[];

export type AdsGetTargetingStatsResponse = Objects.AdsTargStats;

export type AdsGetUploadURLResponse = string;

export type AdsGetVideoUploadURLResponse = string;

export type AdsImportTargetContactsResponse = number;

export type AdsRemoveOfficeUsersResponse = boolean;

export type AdsUpdateAdsResponse = number[];

export type AdsUpdateCampaignsResponse = number;

export type AdsUpdateClientsResponse = number;

export interface AppsGetCatalogResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.AppsApp[];
}

export interface AppsGetLeaderboardResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.AppsLeaderboard[];
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

export interface AppsGetResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.AppsApp[];
}

export type AppsGetScoreResponse = number;

export type AppsSendRequestResponse = number;

export interface AppsGetFriendsListResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.UsersUserFull[];
}

export interface AuthSignupResponse {
    /**
     * Parameter to retry
     */
    sid?: string;
    [key: string]: any;
}

export interface AuthConfirmResponse {
    /**
     * 1 if success
     */
    success?: 1;
    /**
     * User ID
     */
    user_id?: number;
    [key: string]: any;
}

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

export interface BoardGetTopicsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.BoardTopic[];
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

export interface BoardGetCommentsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.BoardTopicComment[];
}

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

export type BoardAddTopicResponse = number;

export type BoardCreateCommentResponse = number;

export interface DatabaseGetCountriesResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.BaseCountry[];
}

export interface DatabaseGetRegionsResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.DatabaseRegion[];
}

export type DatabaseGetStreetsByIdResponse = Objects.DatabaseStreet[];

export type DatabaseGetCountriesByIdResponse = Objects.BaseCountry[];

export interface DatabaseGetChairsResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.BaseObject[];
}

export interface DatabaseGetCitiesResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.DatabaseCity[];
}

export type DatabaseGetCitiesByIdResponse = Objects.BaseObject[];

export interface DatabaseGetUniversitiesResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.DatabaseUniversity[];
}

export interface DatabaseGetSchoolsResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.DatabaseSchool[];
}

export type DatabaseGetSchoolClassesResponse = any[][];

export interface DatabaseGetFacultiesResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.DatabaseFaculty[];
}

export interface DocsGetResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.DocsDoc[];
}

export type DocsGetByIdResponse = Objects.DocsDoc[];

export type DocsSaveResponse = Objects.DocsDoc[];

export interface DocsAddResponse {
    /**
     * Doc ID
     */
    id?: number;
    [key: string]: any;
}

export interface DocsGetTypesResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.DocsDocTypes[];
}

export interface DocsSearchResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.DocsDoc[];
}

export interface FaveGetUsersResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.UsersUserMin[];
}

export interface FaveGetPhotosResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.PhotosPhoto[];
}

export interface FaveGetPostsResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.WallWallpostFull[];
}

export interface FaveGetVideosResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.VideoVideo[];
}

export interface FaveGetLinksResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.FaveFavesLink[];
}

export interface FaveGetMarketItemsResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.MarketMarketItem[];
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

export interface FriendsGetFieldsResponse {
    /**
     * Total friends number
     */
    count: number;
    [key: string]: any;
    items: Objects.FriendsUserXtrLists[];
}

export type FriendsGetOnlineResponse = number[];

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

export type FriendsGetMutualResponse = number[];

export type FriendsGetMutualTargetUidsResponse = Objects.FriendsMutualFriend[];

export type FriendsGetRecentResponse = number[];

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

export interface FriendsGetRequestsNeedMutualResponse {
    /**
     * Total requests number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.FriendsRequests[];
}

export interface FriendsGetRequestsExtendedResponse {
    /**
     * Total requests number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.FriendsRequestsXtrMessage[];
}

export type FriendsAddResponse = 1 | 2 | 4;

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
}

export interface FriendsGetListsResponse {
    /**
     * Total communities number
     */
    count: number;
    [key: string]: any;
    items: Objects.FriendsFriendsList[];
}

export interface FriendsAddListResponse {
    /**
     * List ID
     */
    list_id: number;
    [key: string]: any;
}

export type FriendsGetAppUsersResponse = number[];

export type FriendsGetByPhonesResponse = Objects.FriendsUserXtrPhone[];

export interface FriendsGetSuggestionsResponse {
    /**
     * Total results number
     */
    count: number;
    [key: string]: any;
    items: Objects.UsersUserFull[];
}

export type FriendsAreFriendsResponse = Objects.FriendsFriendStatus[];

export interface FriendsGetAvailableForCallResponse {
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

export interface FriendsGetAvailableForCallFieldsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.UsersUserFull[];
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

export type GroupsIsMemberResponse = Objects.BaseBoolInt;

export type GroupsIsMemberUserIdsResponse = Objects.GroupsMemberStatus[];

export interface GroupsIsMemberExtendedResponse {
    [key: string]: any;
}

export type GroupsIsMemberUserIdsExtendedResponse = Objects.GroupsMemberStatusFull[];

export type GroupsGetByIdResponse = Objects.GroupsGroupFull[];

export interface GroupsGetCallbackConfirmationCodeResponse {
    /**
     * Confirmation code
     */
    code?: string;
    [key: string]: any;
}

export type GroupsGetCallbackSettingsResponse = Objects.GroupsCallbackSettings;

export type GroupsGetLongPollServerResponse = Objects.GroupsLongPollServer;

export type GroupsGetLongPollSettingsResponse = Objects.GroupsLongPollSettings;

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

export interface GroupsGetExtendedResponse {
    /**
     * Total communities number
     */
    count: number;
    [key: string]: any;
    items: Objects.GroupsGroupFull[];
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

export interface GroupsSearchResponse {
    /**
     * Total communities number
     */
    count: number;
    [key: string]: any;
    items: Objects.GroupsGroup[];
}

export interface GroupsGetCatalogResponse {
    /**
     * Total communities number
     */
    count: number;
    [key: string]: any;
    items: Objects.GroupsGroup[];
}

export interface GroupsGetCatalogInfoResponse {
    /**
     * Information whether catalog is enabled for current user
     */
    enabled: number;
    [key: string]: any;
    categories?: Objects.GroupsGroupCategory[];
}

export interface GroupsGetCatalogInfoExtendedResponse {
    /**
     * Information whether catalog is enabled for current user
     */
    enabled: number;
    [key: string]: any;
    categories?: Objects.GroupsGroupCategoryFull[];
}

export interface GroupsGetInvitesResponse {
    /**
     * Total communities number
     */
    count: number;
    [key: string]: any;
    items: Objects.GroupsGroupXtrInvitedBy[];
}

export interface GroupsGetInvitesExtendedResponse {
    /**
     * Total communities number
     */
    count: number;
    [key: string]: any;
    items: Objects.GroupsGroupXtrInvitedBy[];
    profiles: Objects.UsersUserMin[];
}

export interface GroupsGetInvitedUsersResponse {
    /**
     * Total communities number
     */
    count: number;
    [key: string]: any;
    items: Objects.UsersUserFull[];
}

export interface GroupsGetBannedResponse {
    /**
     * Total users number
     */
    count: number;
    [key: string]: any;
    items: Objects.GroupsOwnerXtrBanInfo[];
}

export type GroupsCreateResponse = Objects.GroupsGroup;

export interface GroupsEditPlaceResponse {
    /**
     * Place address
     */
    address?: string;
    [key: string]: any;
}

export type GroupsGetSettingsResponse = Objects.GroupsGroupSettings;

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

export interface GroupsGetRequestsFieldsResponse {
    /**
     * Total communities number
     */
    count: number;
    [key: string]: any;
    items: Objects.UsersUserFull[];
}

export type GroupsAddLinkResponse = Objects.GroupsGroupLink;

export type LeadsCompleteResponse = Objects.LeadsComplete;

export type LeadsStartResponse = Objects.LeadsStart;

export type LeadsGetStatsResponse = Objects.LeadsLead;

export type LeadsGetUsersResponse = Objects.LeadsEntry[];

export type LeadsCheckUserResponse = Objects.LeadsChecked;

export interface LeadsMetricHitResponse {
    /**
     * Information whether request has been processed successfully
     */
    result?: boolean;
    /**
     * Redirect link
     */
    redirect_link?: string;
    [key: string]: any;
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

export interface LikesGetListExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.UsersUserMin[];
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

export interface LikesIsLikedResponse {
    [key: string]: any;
}

export interface MarketGetResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.MarketMarketItem[];
}

export interface MarketGetExtendedResponse {
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

export interface MarketGetByIdExtendedResponse {
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

export interface MarketSearchExtendedResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.MarketMarketItemFull[];
}

export interface MarketGetAlbumsResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.MarketMarketAlbum[];
}

export interface MarketGetAlbumByIdResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.MarketMarketAlbum[];
}

export type MarketCreateCommentResponse = number;

export interface MarketGetCommentsResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.WallWallComment[];
}

export type MarketDeleteCommentResponse = Objects.BaseBoolInt;

export type MarketRestoreCommentResponse = Objects.BaseBoolInt;

export interface MarketGetCategoriesResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.MarketMarketCategory[];
}

export interface MarketAddResponse {
    /**
     * Item ID
     */
    market_item_id?: number;
    [key: string]: any;
}

export interface MarketAddAlbumResponse {
    /**
     * Album ID
     */
    market_album_id?: number;
    [key: string]: any;
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

export interface MessagesGetConversationMembersResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesConversationMember[];
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroupFull[];
}

export interface MessagesSearchConversationsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesConversation[];
}

export interface MessagesGetConversationsByIdResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesConversationWithMessage[];
}

export interface MessagesGetImportantMessagesResponse {
    [key: string]: any;
    messages: Objects.MessagesMessage[];
    profiles?: Objects.UsersUser[];
    groups?: Objects.GroupsGroup[];
    conversations?: Objects.MessagesConversation[];
}

export interface MessagesGetResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesMessage[];
}

export type MessagesDeleteResponse = any;

export interface MessagesGetByConversationMessageIdResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesMessage[];
}

export interface MessagesGetByIdResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesMessage[];
}

export interface MessagesSearchResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesMessage[];
}

export interface MessagesGetHistoryResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.MessagesMessage[];
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

export type MessagesSendResponse = number;

export type MessagesEditResponse = Objects.BaseBoolInt;

export type MessagesMarkAsImportantResponse = number[];

export type MessagesGetLongPollServerResponse = Objects.MessagesLongpollParams;

export interface MessagesGetLongPollHistoryResponse {
    /**
     * Longpoll event value
     */
    history?: number[][];
    /**
     * Persistence timestamp
     */
    new_pts?: number;
    [key: string]: any;
    groups?: Objects.GroupsGroup[];
    profiles?: Objects.UsersUserFull[];
    chats?: Objects.MessagesChat[];
}

export type MessagesGetChatResponse = Objects.MessagesChat;

export type MessagesGetChatFieldsResponse = Objects.MessagesChatFull;

export type MessagesGetChatChatIdsResponse = Objects.MessagesChat[];

export type MessagesGetChatChatIdsFieldsResponse = Objects.MessagesChatFull[];

export type MessagesCreateChatResponse = number;

export type MessagesEditChatResponse = Objects.BaseOkResponse;

export type MessagesGetChatUsersResponse = number[];

export type MessagesGetLastActivityResponse = Objects.MessagesLastActivity;

export interface MessagesSetChatPhotoResponse {
    /**
     * Service message ID
     */
    message_id?: number;
    [key: string]: any;
}

export interface MessagesDeleteChatPhotoResponse {
    /**
     * Service message ID
     */
    message_id?: number;
    [key: string]: any;
}

export interface MessagesIsMessagesFromGroupAllowedResponse {
    [key: string]: any;
}

export interface NewsfeedGetResponse {
    [key: string]: any;
    items?: Objects.NewsfeedNewsfeedItem[];
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroupFull[];
}

export interface NewsfeedGetRecommendedResponse {
    /**
     * New offset value
     */
    new_offset?: string;
    /**
     * New from value
     */
    new_from?: string;
    [key: string]: any;
    items?: Objects.NewsfeedNewsfeedItem[];
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroupFull[];
}

export interface NewsfeedGetCommentsResponse {
    /**
     * New from value
     */
    next_from?: string;
    [key: string]: any;
    items?: Objects.NewsfeedNewsfeedItem[];
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroupFull[];
}

export interface NewsfeedGetMentionsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.WallWallpostToId[];
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

export interface NewsfeedGetBannedExtendedResponse {
    [key: string]: any;
    groups?: Objects.UsersUserFull[];
    members?: Objects.GroupsGroupFull[];
}

export interface NewsfeedSearchResponse {
    [key: string]: any;
    items?: Objects.WallWallpostFull[];
    suggested_queries?: string[];
}

export interface NewsfeedSearchExtendedResponse {
    [key: string]: any;
    items?: Objects.WallWallpostFull[];
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroupFull[];
}

export interface NewsfeedGetListsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.NewsfeedList[];
}

export interface NewsfeedGetListsExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.NewsfeedListFull[];
}

export type NewsfeedSaveListResponse = number;

export interface NewsfeedGetSuggestedSourcesResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: any[];
}

export interface NotesGetResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.NotesNote[];
}

export type NotesGetByIdResponse = Objects.NotesNote;

export type NotesAddResponse = number;

export interface NotesGetCommentsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.NotesNoteComment[];
}

export type NotesCreateCommentResponse = number;

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
    items?: Objects.NotificationsNotification[];
    profiles?: Objects.UsersUser[];
    groups?: Objects.GroupsGroup[];
}

export type NotificationsMarkAsViewedResponse = Objects.BaseBoolInt;

export type OrdersGetResponse = Objects.OrdersOrder[];

export type OrdersGetByIdResponse = Objects.OrdersOrder[];

export type OrdersChangeStateResponse = string;

export type OrdersGetAmountResponse = Objects.OrdersAmount;

export type PagesGetResponse = Objects.PagesWikipageFull;

export type PagesSaveResponse = number;

export type PagesSaveAccessResponse = number;

export type PagesGetHistoryResponse = Objects.PagesWikipageVersion[];

export type PagesGetTitlesResponse = Objects.PagesWikipage[];

export type PagesGetVersionResponse = Objects.PagesWikipageFull;

export type PagesParseWikiResponse = string;

export type PhotosCreateAlbumResponse = Objects.PhotosPhotoAlbumFull;

export interface PhotosGetAlbumsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.PhotosPhotoAlbumFull[];
}

export interface PhotosGetResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.PhotosPhoto[];
}

export interface PhotosGetExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.PhotosPhotoFull[];
}

export type PhotosGetAlbumsCountResponse = number;

export type PhotosGetByIdResponse = Objects.PhotosPhoto[];

export type PhotosGetByIdExtendedResponse = Objects.PhotosPhotoFull[];

export type PhotosGetUploadServerResponse = Objects.PhotosPhotoUpload;

export type PhotosSaveOwnerCoverPhotoResponse = Objects.BaseImage[];

export type PhotosSaveMarketPhotoResponse = Objects.PhotosPhoto[];

export type PhotosSaveMarketAlbumPhotoResponse = Objects.PhotosPhoto[];

export interface PhotosSaveOwnerPhotoResponse {
    /**
     * Parameter for saveProfilePhoto method
     */
    photo_hash: string;
    /**
     * Uploaded image url
     */
    photo_src: string;
    [key: string]: any;
}

export type PhotosSaveWallPhotoResponse = Objects.PhotosPhoto[];

export type PhotosGetWallUploadServerResponse = Objects.PhotosPhotoUpload;

export type PhotosGetMessagesUploadServerResponse = Objects.PhotosPhotoUpload;

export type PhotosSaveMessagesPhotoResponse = Objects.PhotosPhoto[];

export interface PhotosSearchResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.PhotosPhoto[];
}

export type PhotosSaveResponse = Objects.PhotosPhoto[];

export type PhotosCopyResponse = number;

export interface PhotosGetAllResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.PhotosPhotoXtrRealOffset[];
}

export interface PhotosGetAllExtendedResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.PhotosPhotoFullXtrRealOffset[];
}

export interface PhotosGetUserPhotosResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.PhotosPhoto[];
}

export interface PhotosGetUserPhotoExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.PhotosPhotoFull[];
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

export interface PhotosGetAllCommentsResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.PhotosCommentXtrPid[];
}

export type PhotosCreateCommentResponse = number;

export type PhotosDeleteCommentResponse = Objects.BaseBoolInt;

export type PhotosRestoreCommentResponse = Objects.BaseBoolInt;

export type PhotosGetTagsResponse = Objects.PhotosPhotoTag[];

export type PhotosPutTagResponse = number;

export interface PhotosGetNewTagsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.PhotosPhotoXtrTagInfo[];
}

export interface PlacesAddResponse {
    /**
     * Place ID
     */
    id?: number;
    [key: string]: any;
}

export type PlacesGetByIdResponse = Objects.PlacesPlaceMin[];

export interface PlacesSearchResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.PlacesPlaceFull[];
}

export interface PlacesCheckinResponse {
    /**
     * Checkin ID
     */
    id?: number;
    [key: string]: any;
}

export interface PlacesGetCheckinsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.PlacesCheckin[];
}

export type PlacesGetTypesResponse = Objects.PlacesTypes[];

export type PollsGetByIdResponse = Objects.PollsPoll;

export type PollsAddVoteResponse = Objects.BaseBoolInt;

export type PollsDeleteVoteResponse = Objects.BaseBoolInt;

export type PollsGetVotersResponse = Objects.PollsVoters[];

export type PollsCreateResponse = Objects.PollsPoll;

export interface SearchGetHintsResponse {
    [key: string]: any;
    items?: Objects.SearchHint[];
    suggested_queries?: string[];
}

export type SecureGetAppBalanceResponse = number;

export type SecureGetSmsHistoryResponse = Objects.SecureSmsNotification[];

export type SecureGetTransactionsHistoryResponse = Objects.SecureTransaction[];

export type SecureGetUserLevelResponse = Objects.SecureLevel[];

export type SecureSendNotificationResponse = number[];

export type SecureCheckTokenResponse = Objects.SecureTokenChecked;

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

export type StatsGetResponse = Objects.StatsPeriod[];

export type StatsGetPostReachResponse = Objects.StatsWallpostStat[];

export type StatusGetResponse = Objects.StatusStatus;

export type StorageGetResponse = string;

export type StorageGetKeysResponse = string[];

export type UsersGetResponse = Objects.UsersUserXtrCounters[];

export interface UsersSearchResponse {
    /**
     * Total number of available results
     */
    count?: number;
    [key: string]: any;
    items?: Objects.UsersUserFull[];
}

export type UsersIsAppUserResponse = Objects.BaseBoolInt;

export interface UsersGetSubscriptionsResponse {
    [key: string]: any;
}

export interface UsersGetSubscriptionsExtendedResponse {
    /**
     * Total number of available results
     */
    count: number;
    [key: string]: any;
    items: any[];
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

export interface UsersGetFollowersFieldsResponse {
    /**
     * Total number of available results
     */
    count: number;
    [key: string]: any;
    items: Objects.UsersUserFull[];
}

export interface UsersGetNearbyResponse {
    /**
     * Users number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.UsersUserFull[];
}

export type UtilsGetShortLinkResponse = Objects.UtilsShortLink;

export interface UtilsGetLastShortenedLinksResponse {
    /**
     * Total number of available results
     */
    count?: number;
    [key: string]: any;
    items?: Objects.UtilsLastShortenedLink[];
}

export type UtilsGetLinkStatsResponse = Objects.UtilsLinkStats;

export type UtilsGetLinkStatsExtendedResponse = Objects.UtilsLinkStatsExtended;

export type UtilsCheckLinkResponse = Objects.UtilsLinkChecked;

export type UtilsResolveScreenNameResponse = Objects.UtilsDomainResolved;

export type UtilsGetServerTimeResponse = number;

export interface VideoGetResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideo[];
}

export interface VideoGetExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideoFull[];
    profiles: Objects.UsersUserMin[];
    groups: Objects.GroupsGroupFull[];
}

export type VideoSaveResponse = Objects.VideoSaveResult;

export interface VideoSearchResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideo[];
}

export interface VideoSearchExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideo[];
    profiles: Objects.UsersUserMin[];
    groups: Objects.GroupsGroupFull[];
}

export interface VideoGetUserVideosResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideo[];
}

export interface VideoGetUserVideosExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideo[];
    profiles: Objects.UsersUserMin[];
    groups: Objects.GroupsGroupFull[];
}

export interface VideoGetAlbumsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideoAlbumFull[];
}

export interface VideoGetAlbumsExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideoAlbumFull[];
}

export type VideoGetAlbumByIdResponse = Objects.VideoVideoAlbumFull;

export interface VideoAddAlbumResponse {
    /**
     * Created album ID
     */
    album_id: number;
    [key: string]: any;
}

export type VideoGetAlbumsByVideoResponse = number[];

export interface VideoGetAlbumsByVideoExtendedResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.VideoVideoAlbumFull[];
}

export interface VideoGetCommentsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.WallWallComment[];
    profiles: Objects.UsersUserMin[];
    groups: Objects.GroupsGroupFull[];
}

export interface VideoGetCommentsExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.WallWallComment[];
}

export type VideoCreateCommentResponse = number;

export type VideoRestoreCommentResponse = Objects.BaseBoolInt;

export type VideoGetTagsResponse = Objects.VideoVideoTag[];

export type VideoPutTagResponse = number;

export interface VideoGetNewTagsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideoTagInfo[];
}

export interface VideoGetCatalogResponse {
    /**
     * New value for _from_ parameter
     */
    next: string;
    [key: string]: any;
    items: Objects.VideoCatBlock[];
}

export interface VideoGetCatalogExtendedResponse {
    /**
     * New value for _from_ parameter
     */
    next: string;
    [key: string]: any;
    items: Objects.VideoCatBlock[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface VideoGetCatalogSectionResponse {
    /**
     * New value for _from_ parameter
     */
    next: string;
    [key: string]: any;
    items: Objects.VideoCatElement[];
}

export interface VideoGetCatalogSectionExtendedResponse {
    /**
     * New value for _from_ parameter
     */
    next: string;
    [key: string]: any;
    items: Objects.VideoCatElement[];
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

export interface WallSearchResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.WallWallpostFull[];
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

export type WallGetByIdResponse = Objects.WallWallpostFull[];

export interface WallGetByIdExtendedResponse {
    [key: string]: any;
    items: Objects.WallWallpostFull[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export interface WallPostResponse {
    /**
     * Created post ID
     */
    post_id: number;
    [key: string]: any;
}

export interface WallPostAdsStealthResponse {
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
     * Reposts number
     */
    likes_count: number;
    [key: string]: any;
}

export interface WallGetRepostsResponse {
    [key: string]: any;
    items: Objects.WallWallpostFull[];
    profiles: Objects.UsersUser[];
    groups: Objects.GroupsGroup[];
}

export interface WallGetCommentsResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.WallWallComment[];
}

export interface WallGetCommentsExtendedResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.WallWallComment[];
    profiles: Objects.UsersUser[];
    groups: Objects.GroupsGroup[];
}

export interface WallCreateCommentResponse {
    /**
     * Created comment ID
     */
    comment_id: number;
    [key: string]: any;
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

export interface StoriesGetResponse {
    /**
     * Stories count
     */
    count: number;
    [key: string]: any;
    items: Objects.StoriesStory[][];
}

export interface StoriesGetExtendedResponse {
    /**
     * Stories count
     */
    count: number;
    [key: string]: any;
    items: Objects.StoriesStory[][];
    profiles: Objects.UsersUser[];
    groups: Objects.GroupsGroup[];
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

export interface StoriesGetByIdResponse {
    /**
     * Stories count
     */
    count: number;
    [key: string]: any;
    items: Objects.StoriesStory[];
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

export interface StoriesGetRepliesResponse {
    /**
     * Stories count
     */
    count: number;
    [key: string]: any;
    items: Objects.StoriesStory[][];
}

export interface StoriesGetRepliesExtendedResponse {
    /**
     * Stories count
     */
    count: number;
    [key: string]: any;
    items: Objects.StoriesStory[][];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
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

export interface StoriesGetViewersResponse {
    /**
     * Viewers count
     */
    count: number;
    [key: string]: any;
    items: number[];
}

export interface StoriesGetViewersExtendedResponse {
    /**
     * Viewers count
     */
    count: number;
    [key: string]: any;
    items: Objects.UsersUserFull[];
}

