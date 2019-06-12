/* eslint-disable */
import * as Objects from "./objects.d";

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
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.AppsApp[];
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

export interface DocsAddResponse {
    /**
     * Doc ID
     */
    id?: number;
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

export interface FaveGetUsersResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.UsersUserMin[];
}

export interface FaveGetVideosResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.VideoVideo[];
}

export interface FriendsAddListResponse {
    /**
     * List ID
     */
    list_id: number;
    [key: string]: any;
}

export type FriendsAddResponse = 1 | 2 | 4;

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
}

export type FriendsGetAppUsersResponse = number[];

export type FriendsGetByPhonesResponse = Objects.FriendsUserXtrPhone[];

export interface FriendsGetListsResponse {
    /**
     * Total communities number
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

export interface GroupsAddCallbackServerResponse {
    [key: string]: any;
    server_id?: number;
}

export type GroupsAddLinkResponse = Objects.GroupsGroupLink;

export type GroupsAddAddressResponse = Objects.GroupsAddress;

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
    items: Objects.GroupsOwnerXtrBanInfo[];
}

export type GroupsGetByIdResponse = Objects.GroupsGroupFull[];

export interface GroupsGetCallbackConfirmationCodeResponse {
    /**
     * Confirmation code
     */
    code?: string;
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
    items: Objects.GroupsGroupXtrInvitedBy[];
    profiles: Objects.UsersUserMin[];
}

export interface GroupsGetInvitesResponse {
    /**
     * Total communities number
     */
    count: number;
    [key: string]: any;
    items: Objects.GroupsGroupXtrInvitedBy[];
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

export type GroupsGetSettingsResponse = Objects.GroupsGroupSettings;

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

export type LeadsCheckUserResponse = Objects.LeadsChecked;

export type LeadsCompleteResponse = Objects.LeadsComplete;

export type LeadsGetStatsResponse = Objects.LeadsLead;

export type LeadsGetUsersResponse = Objects.LeadsEntry[];

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

export type LeadsStartResponse = Objects.LeadsStart;

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
    profiles?: Objects.UsersUser[];
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
    more?: boolean;
    [key: string]: any;
    groups?: Objects.GroupsGroup[];
    profiles?: Objects.UsersUserFull[];
    chats?: Objects.MessagesChat[];
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

export interface MessagesSearchConversationsResponse {
    /**
     * Total results number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.MessagesConversation[];
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroupFull[];
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
    members?: Objects.GroupsGroupFull[];
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
     * New from value
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

export interface NewsfeedGetSuggestedSourcesResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: any[];
}

export interface NewsfeedGetResponse {
    [key: string]: any;
    items?: Objects.NewsfeedNewsfeedItem[];
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroupFull[];
}

export type NewsfeedSaveListResponse = number;

export interface NewsfeedSearchExtendedResponse {
    [key: string]: any;
    items?: Objects.WallWallpostFull[];
    profiles?: Objects.UsersUserFull[];
    groups?: Objects.GroupsGroupFull[];
}

export interface NewsfeedSearchResponse {
    [key: string]: any;
    items?: Objects.WallWallpostFull[];
    suggested_queries?: string[];
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
    items?: any[];
    profiles?: Objects.UsersUser[];
    groups?: Objects.GroupsGroup[];
    photos?: Objects.PhotosPhoto[];
    videos?: Objects.VideoVideo[];
    apps?: Objects.AppsApp[];
    next_from?: string;
    ttl?: number;
}

export type NotificationsMarkAsViewedResponse = Objects.BaseBoolInt;

export type OkResponse = Objects.BaseOkResponse;

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

export type PhotosPutTagResponse = number;

export type PhotosRestoreCommentResponse = Objects.BaseBoolInt;

export type PhotosSaveMarketAlbumPhotoResponse = Objects.PhotosPhoto[];

export type PhotosSaveMarketPhotoResponse = Objects.PhotosPhoto[];

export type PhotosSaveMessagesPhotoResponse = Objects.PhotosPhoto[];

export type PhotosSaveOwnerCoverPhotoResponse = Objects.BaseImage[];

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

export type PhotosSaveResponse = Objects.PhotosPhoto[];

export interface PhotosSearchResponse {
    /**
     * Total number
     */
    count?: number;
    [key: string]: any;
    items?: Objects.PhotosPhoto[];
}

export type PollsAddVoteResponse = Objects.BaseBoolInt;

export type PollsCreateResponse = Objects.PollsPoll;

export type PollsDeleteVoteResponse = Objects.BaseBoolInt;

export type PollsGetByIdResponse = Objects.PollsPoll;

export type PollsGetVotersResponse = Objects.PollsVoters[];

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
    items?: Objects.SearchHint[];
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

export type StorageGetKeysResponse = Objects.StorageValue[];

export type StorageGetResponse = string;

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

export interface StoriesGetRepliesResponse {
    /**
     * Stories count
     */
    count: number;
    [key: string]: any;
    items: Objects.StoriesStory[][];
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

export interface StoriesGetViewersExtendedResponse {
    /**
     * Viewers count
     */
    count: number;
    [key: string]: any;
    items: Objects.UsersUserFull[];
}

export interface StoriesGetViewersResponse {
    /**
     * Viewers count
     */
    count: number;
    [key: string]: any;
    items: number[];
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

export interface StoriesGetResponse {
    /**
     * Stories count
     */
    count: number;
    [key: string]: any;
    items: Objects.StoriesStory[][];
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
    items: any[];
}

export interface UsersGetSubscriptionsResponse {
    [key: string]: any;
}

export type UsersGetResponse = Objects.UsersUserXtrCounters[];

export type UsersIsAppUserResponse = Objects.BaseBoolInt;

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

export interface VideoGetResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideo[];
}

export type VideoRestoreCommentResponse = Objects.BaseBoolInt;

export type VideoSaveResponse = Objects.VideoSaveResult;

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

export interface VideoSearchResponse {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: Objects.VideoVideo[];
}

export interface WallCreateCommentResponse {
    /**
     * Created comment ID
     */
    comment_id: number;
    [key: string]: any;
}

export interface WallGetByIdExtendedResponse {
    [key: string]: any;
    items: Objects.WallWallpostFull[];
    profiles: Objects.UsersUserFull[];
    groups: Objects.GroupsGroupFull[];
}

export type WallGetByIdResponse = Objects.WallWallpostFull[];

export interface WallGetCommentsExtendedResponse {
    /**
     * Total number
     */
    count: number;
    /**
     * Information whether groups can comment the post
     */
    groups_can_post?: boolean;
    /**
     * Count of replies of current level
     */
    current_level_count?: number;
    [key: string]: any;
    items: Objects.WallWallComment[];
    show_reply_button?: boolean;
    profiles: Objects.UsersUser[];
    groups: Objects.GroupsGroup[];
}

export interface WallGetCommentsResponse {
    /**
     * Total number
     */
    count: number;
    /**
     * Information whether groups can comment the post
     */
    groups_can_post?: boolean;
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
     * Reposts number
     */
    likes_count: number;
    [key: string]: any;
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

