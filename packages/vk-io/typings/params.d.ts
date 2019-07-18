/* eslint-disable */
import * as Objects from "./objects.d";

export interface AccountBanParams {
    owner_id?: number;
    [key: string]: any;
}

export interface AccountChangePasswordParams {
    /**
     * Session id received after the [vk.com/dev/auth.restore|auth.restore] method is executed. (If the password is changed right after the access was restored)
     */
    restore_sid?: string;
    /**
     * Hash received after a successful OAuth authorization with a code got by SMS. (If the password is changed right after the access was restored)
     */
    change_password_hash?: string;
    /**
     * Current user password.
     */
    old_password?: string;
    /**
     * New password that will be set as a current
     */
    new_password: string;
    [key: string]: any;
}

export interface AccountGetActiveOffersParams {
    /**
     * Number of results to return.
     */
    count?: number;
    offset?: number;
    [key: string]: any;
}

export interface AccountGetAppPermissionsParams {
    /**
     * User ID whose settings information shall be got. By default: current user.
     */
    user_id: number;
    [key: string]: any;
}

export interface AccountGetBannedParams {
    /**
     * Offset needed to return a specific subset of results.
     */
    offset?: number;
    /**
     * Number of results to return.
     */
    count?: number;
    [key: string]: any;
}

export interface AccountGetCountersParams {
    filter?: ("friends" | "messages" | "photos" | "videos" | "notes" | "gifts" | "events" | "groups" | "sdk" | "friends_suggestions")[] | ("friends" | "messages" | "photos" | "videos" | "notes" | "gifts" | "events" | "groups" | "sdk" | "friends_suggestions");
    [key: string]: any;
}

export interface AccountGetInfoParams {
    fields?: ("country" | "https_required" | "own_posts_default" | "no_wall_replies" | "intro" | "lang")[] | ("country" | "https_required" | "own_posts_default" | "no_wall_replies" | "intro" | "lang");
    [key: string]: any;
}

export interface AccountGetProfileInfoParams {
    [key: string]: any;
}

export interface AccountGetPushSettingsParams {
    /**
     * Unique device ID.
     */
    device_id?: string;
    [key: string]: any;
}

export interface AccountRegisterDeviceParams {
    /**
     * Device token used to send notifications. (for mpns, the token shall be URL for sending of notifications)
     */
    token: string;
    /**
     * String name of device model.
     */
    device_model?: string;
    /**
     * Device year.
     */
    device_year?: number;
    /**
     * Unique device ID.
     */
    device_id: string;
    /**
     * String version of device operating system.
     */
    system_version?: string;
    /**
     * Push settings in a [vk.com/dev/push_settings|special format].
     */
    settings?: string;
    sandbox?: boolean;
    [key: string]: any;
}

export interface AccountSaveProfileInfoParams {
    /**
     * User first name.
     */
    first_name?: string;
    /**
     * User last name.
     */
    last_name?: string;
    /**
     * User maiden name (female only)
     */
    maiden_name?: string;
    /**
     * User screen name.
     */
    screen_name?: string;
    /**
     * ID of the name change request to be canceled. If this parameter is sent, all the others are ignored.
     */
    cancel_request_id?: number;
    /**
     * User sex. Possible values: , * '1' – female,, * '2' – male.
     */
    sex?: 0 | 1 | 2;
    /**
     * User relationship status. Possible values: , * '1' – single,, * '2' – in a relationship,, * '3' – engaged,, * '4' – married,, * '5' – it's complicated,, * '6' – actively searching,, * '7' – in love,, * '0' – not specified.
     */
    relation?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 0;
    /**
     * ID of the relationship partner.
     */
    relation_partner_id?: number;
    /**
     * User birth date, format: DD.MM.YYYY.
     */
    bdate?: string;
    /**
     * Birth date visibility. Returned values: , * '1' – show birth date,, * '2' – show only month and day,, * '0' – hide birth date.
     */
    bdate_visibility?: 1 | 2 | 0;
    /**
     * User home town.
     */
    home_town?: string;
    /**
     * User country.
     */
    country_id?: number;
    /**
     * User city.
     */
    city_id?: number;
    /**
     * Status text.
     */
    status?: string;
    [key: string]: any;
}

export interface AccountSetInfoParams {
    /**
     * Setting name.
     */
    name?: string;
    /**
     * Setting value.
     */
    value?: string;
    [key: string]: any;
}

export interface AccountSetNameInMenuParams {
    /**
     * User ID.
     */
    user_id: number;
    /**
     * Application screen name.
     */
    name?: string;
    [key: string]: any;
}

export interface AccountSetOfflineParams {
    [key: string]: any;
}

export interface AccountSetOnlineParams {
    /**
     * '1' if videocalls are available for current device.
     */
    voip?: boolean;
    [key: string]: any;
}

export interface AccountSetPushSettingsParams {
    /**
     * Unique device ID.
     */
    device_id: string;
    /**
     * Push settings in a [vk.com/dev/push_settings|special format].
     */
    settings?: string;
    /**
     * Notification key.
     */
    key?: string;
    value?: string[] | string;
    [key: string]: any;
}

export interface AccountSetSilenceModeParams {
    /**
     * Unique device ID.
     */
    device_id?: string;
    /**
     * Time in seconds for what notifications should be disabled. '-1' to disable forever.
     */
    time?: number;
    /**
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'Chat ID', e.g. '2000000001'. For community: '- Community ID', e.g. '-12345'. "
     */
    peer_id?: number;
    /**
     * '1' — to enable sound in this dialog, '0' — to disable sound. Only if 'peer_id' contains user or community ID.
     */
    sound?: number;
    [key: string]: any;
}

export interface AccountUnbanParams {
    owner_id?: number;
    [key: string]: any;
}

export interface AccountUnregisterDeviceParams {
    /**
     * Unique device ID.
     */
    device_id?: string;
    sandbox?: boolean;
    [key: string]: any;
}

export interface AdsAddOfficeUsersParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Serialized JSON array of objects that describe added managers. Description of 'user_specification' objects see below.
     */
    data: string;
    [key: string]: any;
}

export interface AdsCheckLinkParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Object type: *'community' — community,, *'post' — community post,, *'application' — VK application,, *'video' — video,, *'site' — external site.
     */
    link_type: "community" | "post" | "application" | "video" | "site";
    /**
     * Object URL.
     */
    link_url: string;
    /**
     * Campaign ID
     */
    campaign_id?: number;
    [key: string]: any;
}

export interface AdsCreateAdsParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Serialized JSON array of objects that describe created ads. Description of 'ad_specification' objects see below.
     */
    data: string;
    [key: string]: any;
}

export interface AdsCreateCampaignsParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Serialized JSON array of objects that describe created campaigns. Description of 'campaign_specification' objects see below.
     */
    data: string;
    [key: string]: any;
}

export interface AdsCreateClientsParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Serialized JSON array of objects that describe created campaigns. Description of 'client_specification' objects see below.
     */
    data: string;
    [key: string]: any;
}

export interface AdsCreateTargetGroupParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * 'Only for advertising agencies.', ID of the client with the advertising account where the group will be created.
     */
    client_id?: number;
    /**
     * Name of the target group — a string up to 64 characters long.
     */
    name: string;
    /**
     * 'For groups with auditory created with pixel code only.', , Number of days after that users will be automatically removed from the group. '0' — not to remove users.
     */
    lifetime?: number;
    target_pixel_id?: number;
    target_pixel_rules?: string;
    [key: string]: any;
}

export interface AdsDeleteAdsParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Serialized JSON array with ad IDs.
     */
    ids: string;
    [key: string]: any;
}

export interface AdsDeleteCampaignsParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Serialized JSON array with IDs of deleted campaigns.
     */
    ids: string;
    [key: string]: any;
}

export interface AdsDeleteClientsParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Serialized JSON array with IDs of deleted clients.
     */
    ids: string;
    [key: string]: any;
}

export interface AdsDeleteTargetGroupParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * 'Only for advertising agencies.' , ID of the client with the advertising account where the group will be created.
     */
    client_id?: number;
    /**
     * Group ID.
     */
    target_group_id: number;
    [key: string]: any;
}

export interface AdsGetAccountsParams {
    [key: string]: any;
}

export interface AdsGetAdsParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Filter by ads. Serialized JSON array with ad IDs. If the parameter is null, all ads will be shown.
     */
    ad_ids?: string;
    /**
     * Filter by advertising campaigns. Serialized JSON array with campaign IDs. If the parameter is null, ads of all campaigns will be shown.
     */
    campaign_ids?: string;
    /**
     * 'Available and required for advertising agencies.' ID of the client ads are retrieved from.
     */
    client_id?: number;
    /**
     * Flag that specifies whether archived ads shall be shown: *0 — show only active ads,, *1 — show all ads.
     */
    include_deleted?: boolean;
    /**
     * Limit of number of returned ads. Used only if ad_ids parameter is null, and 'campaign_ids' parameter contains ID of only one campaign.
     */
    limit?: number;
    /**
     * Offset. Used in the same cases as 'limit' parameter.
     */
    offset?: number;
    [key: string]: any;
}

export interface AdsGetAdsLayoutParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Filter by ads. Serialized JSON array with ad IDs. If the parameter is null, all ads will be shown.
     */
    ad_ids?: string;
    /**
     * Filter by advertising campaigns. Serialized JSON array with campaign IDs. If the parameter is null, ads of all campaigns will be shown.
     */
    campaign_ids?: string;
    /**
     * 'For advertising agencies.' ID of the client ads are retrieved from.
     */
    client_id?: number;
    /**
     * Flag that specifies whether archived ads shall be shown. *0 — show only active ads,, *1 — show all ads.
     */
    include_deleted?: boolean;
    /**
     * Limit of number of returned ads. Used only if 'ad_ids' parameter is null, and 'campaign_ids' parameter contains ID of only one campaign.
     */
    limit?: number;
    /**
     * Offset. Used in the same cases as 'limit' parameter.
     */
    offset?: number;
    [key: string]: any;
}

export interface AdsGetAdsTargetingParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Filter by ads. Serialized JSON array with ad IDs. If the parameter is null, all ads will be shown.
     */
    ad_ids?: string;
    /**
     * Filter by advertising campaigns. Serialized JSON array with campaign IDs. If the parameter is null, ads of all campaigns will be shown.
     */
    campaign_ids?: string;
    /**
     * 'For advertising agencies.' ID of the client ads are retrieved from.
     */
    client_id?: number;
    /**
     * flag that specifies whether archived ads shall be shown: *0 — show only active ads,, *1 — show all ads.
     */
    include_deleted?: boolean;
    /**
     * Limit of number of returned ads. Used only if 'ad_ids' parameter is null, and 'campaign_ids' parameter contains ID of only one campaign.
     */
    limit?: number;
    /**
     * Offset needed to return a specific subset of results.
     */
    offset?: number;
    [key: string]: any;
}

export interface AdsGetBudgetParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    [key: string]: any;
}

export interface AdsGetCampaignsParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * 'For advertising agencies'. ID of the client advertising campaigns are retrieved from.
     */
    client_id?: number;
    /**
     * Flag that specifies whether archived ads shall be shown. *0 — show only active campaigns,, *1 — show all campaigns.
     */
    include_deleted?: boolean;
    /**
     * Filter of advertising campaigns to show. Serialized JSON array with campaign IDs. Only campaigns that exist in 'campaign_ids' and belong to the specified advertising account will be shown. If the parameter is null, all campaigns will be shown.
     */
    campaign_ids?: string;
    [key: string]: any;
}

export interface AdsGetCategoriesParams {
    /**
     * Language. The full list of supported languages is [vk.com/dev/api_requests|here].
     */
    lang?: string;
    [key: string]: any;
}

export interface AdsGetClientsParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    [key: string]: any;
}

export interface AdsGetDemographicsParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Type of requested objects listed in 'ids' parameter: *ad — ads,, *campaign — campaigns.
     */
    ids_type: "ad" | "campaign";
    /**
     * IDs requested ads or campaigns, separated with a comma, depending on the value set in 'ids_type'. Maximum 2000 objects.
     */
    ids: string;
    /**
     * Data grouping by dates: *day — statistics by days,, *month — statistics by months,, *overall — overall statistics. 'date_from' and 'date_to' parameters set temporary limits.
     */
    period: "day" | "month" | "overall";
    /**
     * Date to show statistics from. For different value of 'period' different date format is used: *day: YYYY-MM-DD, example: 2011-09-27 — September 27, 2011, **0 — day it was created on,, *month: YYYY-MM, example: 2011-09 — September 2011, **0 — month it was created in,, *overall: 0.
     */
    date_from: string;
    /**
     * Date to show statistics to. For different value of 'period' different date format is used: *day: YYYY-MM-DD, example: 2011-09-27 — September 27, 2011, **0 — current day,, *month: YYYY-MM, example: 2011-09 — September 2011, **0 — current month,, *overall: 0.
     */
    date_to: string;
    [key: string]: any;
}

export interface AdsGetFloodStatsParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    [key: string]: any;
}

export interface AdsGetOfficeUsersParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    [key: string]: any;
}

export interface AdsGetPostsReachParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Type of requested objects listed in 'ids' parameter: *ad — ads,, *campaign — campaigns.
     */
    ids_type: "ad" | "campaign";
    /**
     * IDs requested ads or campaigns, separated with a comma, depending on the value set in 'ids_type'. Maximum 100 objects.
     */
    ids: string;
    [key: string]: any;
}

export interface AdsGetRejectionReasonParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Ad ID.
     */
    ad_id: number;
    [key: string]: any;
}

export interface AdsGetStatisticsParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Type of requested objects listed in 'ids' parameter: *ad — ads,, *campaign — campaigns,, *client — clients,, *office — account.
     */
    ids_type: "ad" | "campaign" | "client" | "office";
    /**
     * IDs requested ads, campaigns, clients or account, separated with a comma, depending on the value set in 'ids_type'. Maximum 2000 objects.
     */
    ids: string;
    /**
     * Data grouping by dates: *day — statistics by days,, *month — statistics by months,, *overall — overall statistics. 'date_from' and 'date_to' parameters set temporary limits.
     */
    period: "day" | "month" | "overall";
    /**
     * Date to show statistics from. For different value of 'period' different date format is used: *day: YYYY-MM-DD, example: 2011-09-27 — September 27, 2011, **0 — day it was created on,, *month: YYYY-MM, example: 2011-09 — September 2011, **0 — month it was created in,, *overall: 0.
     */
    date_from: string;
    /**
     * Date to show statistics to. For different value of 'period' different date format is used: *day: YYYY-MM-DD, example: 2011-09-27 — September 27, 2011, **0 — current day,, *month: YYYY-MM, example: 2011-09 — September 2011, **0 — current month,, *overall: 0.
     */
    date_to: string;
    [key: string]: any;
}

export interface AdsGetSuggestionsParams {
    /**
     * Section, suggestions are retrieved in. Available values: *countries — request of a list of countries. If q is not set or blank, a short list of countries is shown. Otherwise, a full list of countries is shown. *regions — requested list of regions. 'country' parameter is required. *cities — requested list of cities. 'country' parameter is required. *districts — requested list of districts. 'cities' parameter is required. *stations — requested list of subway stations. 'cities' parameter is required. *streets — requested list of streets. 'cities' parameter is required. *schools — requested list of educational organizations. 'cities' parameter is required. *interests — requested list of interests. *positions — requested list of positions (professions). *group_types — requested list of group types. *religions — requested list of religious commitments. *browsers — requested list of browsers and mobile devices.
     */
    section: "countries" | "regions" | "cities" | "districts" | "stations" | "streets" | "schools" | "interests" | "positions" | "group_types" | "religions" | "browsers";
    /**
     * Objects IDs separated by commas. If the parameter is passed, 'q, country, cities' should not be passed.
     */
    ids?: string;
    /**
     * Filter-line of the request (for countries, regions, cities, streets, schools, interests, positions).
     */
    q?: string;
    /**
     * ID of the country objects are searched in.
     */
    country?: number;
    /**
     * IDs of cities where objects are searched in, separated with a comma.
     */
    cities?: string;
    /**
     * Language of the returned string values. Supported languages: *ru — Russian,, *ua — Ukrainian,, *en — English.
     */
    lang?: "ru" | "ua" | "en";
    [key: string]: any;
}

export interface AdsGetTargetGroupsParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * 'Only for advertising agencies.', ID of the client with the advertising account where the group will be created.
     */
    client_id?: number;
    /**
     * '1' — to return pixel code.
     */
    extended?: boolean;
    [key: string]: any;
}

export interface AdsGetTargetingStatsParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Serialized JSON object that describes targeting parameters. Description of 'criteria' object see below.
     */
    criteria?: string;
    /**
     * ID of an ad which targeting parameters shall be analyzed.
     */
    ad_id?: number;
    /**
     * Ad format. Possible values: *'1' — image and text,, *'2' — big image,, *'3' — exclusive format,, *'4' — community, square image,, *'7' — special app format,, *'8' — special community format,, *'9' — post in community,, *'10' — app board.
     */
    ad_format?: 1 | 2 | 3 | 4 | 7 | 8 | 9 | 10;
    /**
     * Platforms to use for ad showing. Possible values: (for 'ad_format' = '1'), *'0' — VK and partner sites,, *'1' — VK only. (for 'ad_format' = '9'), *'all' — all platforms,, *'desktop' — desktop version,, *'mobile' — mobile version and apps.
     */
    ad_platform?: string;
    /**
     * URL for the advertised object.
     */
    link_url: string;
    /**
     * Domain of the advertised object.
     */
    link_domain?: string;
    client_id?: number;
    ad_platform_no_wall?: string;
    ad_platform_no_ad_network?: string;
    [key: string]: any;
}

export interface AdsGetUploadURLParams {
    /**
     * Ad format: *1 — image and text,, *2 — big image,, *3 — exclusive format,, *4 — community, square image,, *7 — special app format.
     */
    ad_format: 1 | 2 | 3 | 4 | 7;
    icon?: number;
    [key: string]: any;
}

export interface AdsGetVideoUploadURLParams {
    [key: string]: any;
}

export interface AdsImportTargetContactsParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * 'Only for advertising agencies.' , ID of the client with the advertising account where the group will be created.
     */
    client_id?: number;
    /**
     * Target group ID.
     */
    target_group_id: number;
    /**
     * List of phone numbers, emails or user IDs separated with a comma.
     */
    contacts: string;
    [key: string]: any;
}

export interface AdsRemoveOfficeUsersParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Serialized JSON array with IDs of deleted managers.
     */
    ids: string;
    [key: string]: any;
}

export interface AdsUpdateAdsParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Serialized JSON array of objects that describe changes in ads. Description of 'ad_edit_specification' objects see below.
     */
    data: string;
    [key: string]: any;
}

export interface AdsUpdateCampaignsParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Serialized JSON array of objects that describe changes in campaigns. Description of 'campaign_mod' objects see below.
     */
    data: string;
    [key: string]: any;
}

export interface AdsUpdateClientsParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * Serialized JSON array of objects that describe changes in clients. Description of 'client_mod' objects see below.
     */
    data: string;
    [key: string]: any;
}

export interface AdsUpdateTargetGroupParams {
    /**
     * Advertising account ID.
     */
    account_id: number;
    /**
     * 'Only for advertising agencies.' , ID of the client with the advertising account where the group will be created.
     */
    client_id?: number;
    /**
     * Group ID.
     */
    target_group_id: number;
    /**
     * New name of the target group — a string up to 64 characters long.
     */
    name: string;
    /**
     * Domain of the site where user accounting code will be placed.
     */
    domain?: string;
    /**
     * 'Only for the groups that get audience from sites with user accounting code.', Time in days when users added to a retarget group will be automatically excluded from it. '0' – automatic exclusion is off.
     */
    lifetime?: number;
    target_pixel_id?: number;
    target_pixel_rules?: string;
    [key: string]: any;
}

export interface AppsDeleteAppRequestsParams {
    [key: string]: any;
}

export interface AppsGetParams {
    /**
     * Application ID
     */
    app_id?: number;
    /**
     * platform. Possible values: *'ios' — iOS,, *'android' — Android,, *'winphone' — Windows Phone,, *'web' — приложения на vk.com. By default: 'web'.
     */
    platform?: "android" | "ios" | "web" | "winphone";
    /**
     * Case for declension of user name and surname: 'nom' — nominative (default),, 'gen' — genitive,, 'dat' — dative,, 'acc' — accusative,, 'ins' — instrumental,, 'abl' — prepositional. (only if 'return_friends' = '1')
     */
    name_case?: "nom" | "gen" | "dat" | "acc" | "ins" | "abl";
    app_ids?: string[] | string;
    extended?: boolean;
    return_friends?: boolean;
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface AppsGetCatalogParams {
    /**
     * Sort order: 'popular_today' — popular for one day (default), 'visitors' — by visitors number , 'create_date' — by creation date, 'growth_rate' — by growth rate, 'popular_week' — popular for one week
     */
    sort?: "popular_today" | "visitors" | "create_date" | "growth_rate" | "popular_week";
    /**
     * Offset required to return a specific subset of apps.
     */
    offset?: number;
    /**
     * Number of apps to return.
     */
    count: number;
    /**
     * '1' — to return additional fields 'screenshots', 'MAU', 'catalog_position', and 'international'. If set, 'count' must be less than or equal to '100'. '0' — not to return additional fields (default).
     */
    extended?: boolean;
    /**
     * Search query string.
     */
    q?: string;
    /**
     * 'installed' — to return list of installed apps (only for mobile platform).
     */
    filter?: "favorite" | "featured" | "installed" | "new";
    platform?: string;
    return_friends?: boolean;
    fields?: Objects.UsersFields[];
    name_case?: string;
    genre_id?: number;
    [key: string]: any;
}

export interface AppsGetFriendsListParams {
    /**
     * List size.
     */
    count?: number;
    /**
     * List type. Possible values: * 'invite' — available for invites (don't play the game),, * 'request' — available for request (play the game). By default: 'invite'.
     */
    type?: "invite" | "request";
    extended?: boolean;
    offset?: number;
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface AppsGetLeaderboardParams {
    /**
     * Leaderboard type. Possible values: *'level' — by level,, *'points' — by mission points,, *'score' — by score ().
     */
    type: "level" | "points" | "score";
    /**
     * Rating type. Possible values: *'1' — global rating among all players,, *'0' — rating among user friends.
     */
    global?: boolean;
    /**
     * 1 — to return additional info about users
     */
    extended?: boolean;
    [key: string]: any;
}

export interface AppsGetScopesParams {
    type?: "group" | "user";
    [key: string]: any;
}

export interface AppsGetScoreParams {
    user_id: number;
    [key: string]: any;
}

export interface AppsSendRequestParams {
    /**
     * id of the user to send a request
     */
    user_id: number;
    /**
     * request text
     */
    text?: string;
    /**
     * request type. Values: 'invite' – if the request is sent to a user who does not have the app installed,, 'request' – if a user has already installed the app
     */
    type?: "invite" | "request";
    /**
     * special string key to be sent with the request
     */
    key?: string;
    name?: string;
    separate?: boolean;
    [key: string]: any;
}

export interface AuthCheckPhoneParams {
    /**
     * Phone number.
     */
    phone: string;
    /**
     * User ID.
     */
    client_id?: number;
    client_secret?: string;
    auth_by_phone?: boolean;
    [key: string]: any;
}

export interface AuthRestoreParams {
    /**
     * User phone number.
     */
    phone: string;
    /**
     * User last name.
     */
    last_name: string;
    [key: string]: any;
}

export interface BoardAddTopicParams {
    /**
     * ID of the community that owns the discussion board.
     */
    group_id: number;
    /**
     * Topic title.
     */
    title: string;
    /**
     * Text of the topic.
     */
    text?: string;
    /**
     * For a community: '1' — to post the topic as by the community, '0' — to post the topic as by the user (default)
     */
    from_group?: boolean;
    attachments?: string[] | string;
    [key: string]: any;
}

export interface BoardCloseTopicParams {
    /**
     * ID of the community that owns the discussion board.
     */
    group_id: number;
    /**
     * Topic ID.
     */
    topic_id: number;
    [key: string]: any;
}

export interface BoardCreateCommentParams {
    /**
     * ID of the community that owns the discussion board.
     */
    group_id: number;
    /**
     * ID of the topic to be commented on.
     */
    topic_id: number;
    /**
     * (Required if 'attachments' is not set.) Text of the comment.
     */
    message?: string;
    /**
     * '1' — to post the comment as by the community, '0' — to post the comment as by the user (default)
     */
    from_group?: boolean;
    /**
     * Sticker ID.
     */
    sticker_id?: number;
    /**
     * Unique identifier to avoid repeated comments.
     */
    guid?: string;
    attachments?: string[] | string;
    [key: string]: any;
}

export interface BoardDeleteCommentParams {
    /**
     * ID of the community that owns the discussion board.
     */
    group_id: number;
    /**
     * Topic ID.
     */
    topic_id: number;
    /**
     * Comment ID.
     */
    comment_id: number;
    [key: string]: any;
}

export interface BoardDeleteTopicParams {
    /**
     * ID of the community that owns the discussion board.
     */
    group_id: number;
    /**
     * Topic ID.
     */
    topic_id: number;
    [key: string]: any;
}

export interface BoardEditCommentParams {
    /**
     * ID of the community that owns the discussion board.
     */
    group_id: number;
    /**
     * Topic ID.
     */
    topic_id: number;
    /**
     * ID of the comment on the topic.
     */
    comment_id: number;
    /**
     * (Required if 'attachments' is not set). New comment text.
     */
    message?: string;
    attachments?: string[] | string;
    [key: string]: any;
}

export interface BoardEditTopicParams {
    /**
     * ID of the community that owns the discussion board.
     */
    group_id: number;
    /**
     * Topic ID.
     */
    topic_id: number;
    /**
     * New title of the topic.
     */
    title: string;
    [key: string]: any;
}

export interface BoardFixTopicParams {
    /**
     * ID of the community that owns the discussion board.
     */
    group_id: number;
    /**
     * Topic ID.
     */
    topic_id: number;
    [key: string]: any;
}

export interface BoardGetCommentsParams {
    /**
     * ID of the community that owns the discussion board.
     */
    group_id: number;
    /**
     * Topic ID.
     */
    topic_id: number;
    /**
     * '1' — to return the 'likes' field, '0' — not to return the 'likes' field (default)
     */
    need_likes?: boolean;
    /**
     * Offset needed to return a specific subset of comments.
     */
    offset?: number;
    /**
     * Number of comments to return.
     */
    count?: number;
    /**
     * '1' — to return information about users who posted comments, '0' — to return no additional fields (default)
     */
    extended?: boolean;
    /**
     * Sort order: 'asc' — by creation date in chronological order, 'desc' — by creation date in reverse chronological order,
     */
    sort?: "asc" | "desc";
    start_comment_id?: number;
    [key: string]: any;
}

export interface BoardGetTopicsParams {
    /**
     * ID of the community that owns the discussion board.
     */
    group_id: number;
    /**
     * Sort order: '1' — by date updated in reverse chronological order. '2' — by date created in reverse chronological order. '-1' — by date updated in chronological order. '-2' — by date created in chronological order. If no sort order is specified, topics are returned in the order specified by the group administrator. Pinned topics are returned first, regardless of the sorting.
     */
    order?: 1 | 2 | -1 | -2 | 0;
    /**
     * Offset needed to return a specific subset of topics.
     */
    offset?: number;
    /**
     * Number of topics to return.
     */
    count?: number;
    /**
     * '1' — to return information about users who created topics or who posted there last, '0' — to return no additional fields (default)
     */
    extended?: boolean;
    /**
     * '1' — to return the first comment in each topic,, '2' — to return the last comment in each topic,, '0' — to return no comments. By default: '0'.
     */
    preview?: 1 | 2 | 0;
    /**
     * Number of characters after which to truncate the previewed comment. To preview the full comment, specify '0'.
     */
    preview_length?: number;
    topic_ids?: number[] | number;
    [key: string]: any;
}

export interface BoardOpenTopicParams {
    /**
     * ID of the community that owns the discussion board.
     */
    group_id: number;
    /**
     * Topic ID.
     */
    topic_id: number;
    [key: string]: any;
}

export interface BoardRestoreCommentParams {
    /**
     * ID of the community that owns the discussion board.
     */
    group_id: number;
    /**
     * Topic ID.
     */
    topic_id: number;
    /**
     * Comment ID.
     */
    comment_id: number;
    [key: string]: any;
}

export interface BoardUnfixTopicParams {
    /**
     * ID of the community that owns the discussion board.
     */
    group_id: number;
    /**
     * Topic ID.
     */
    topic_id: number;
    [key: string]: any;
}

export interface DatabaseGetChairsParams {
    /**
     * id of the faculty to get chairs from
     */
    faculty_id: number;
    /**
     * offset required to get a certain subset of chairs
     */
    offset?: number;
    /**
     * amount of chairs to get
     */
    count?: number;
    [key: string]: any;
}

export interface DatabaseGetCitiesParams {
    /**
     * Country ID.
     */
    country_id: number;
    /**
     * Region ID.
     */
    region_id?: number;
    /**
     * Search query.
     */
    q?: string;
    /**
     * '1' — to return all cities in the country, '0' — to return major cities in the country (default),
     */
    need_all?: boolean;
    /**
     * Offset needed to return a specific subset of cities.
     */
    offset?: number;
    /**
     * Number of cities to return.
     */
    count?: number;
    [key: string]: any;
}

export interface DatabaseGetCitiesByIdParams {
    city_ids?: number[] | number;
    [key: string]: any;
}

export interface DatabaseGetCountriesParams {
    /**
     * '1' — to return a full list of all countries, '0' — to return a list of countries near the current user's country (default).
     */
    need_all?: boolean;
    /**
     * Country codes in [vk.com/dev/country_codes|ISO 3166-1 alpha-2] standard.
     */
    code?: string;
    /**
     * Offset needed to return a specific subset of countries.
     */
    offset?: number;
    /**
     * Number of countries to return.
     */
    count?: number;
    [key: string]: any;
}

export interface DatabaseGetCountriesByIdParams {
    country_ids?: number[] | number;
    [key: string]: any;
}

export interface DatabaseGetFacultiesParams {
    /**
     * University ID.
     */
    university_id: number;
    /**
     * Offset needed to return a specific subset of faculties.
     */
    offset?: number;
    /**
     * Number of faculties to return.
     */
    count?: number;
    [key: string]: any;
}

export interface DatabaseGetMetroStationsParams {
    city_id: number;
    offset?: number;
    count?: number;
    extended?: boolean;
    [key: string]: any;
}

export interface DatabaseGetMetroStationsByIdParams {
    station_ids?: number[] | number;
    [key: string]: any;
}

export interface DatabaseGetRegionsParams {
    /**
     * Country ID, received in [vk.com/dev/database.getCountries|database.getCountries] method.
     */
    country_id: number;
    /**
     * Search query.
     */
    q?: string;
    /**
     * Offset needed to return specific subset of regions.
     */
    offset?: number;
    /**
     * Number of regions to return.
     */
    count?: number;
    [key: string]: any;
}

export interface DatabaseGetSchoolClassesParams {
    /**
     * Country ID.
     */
    country_id?: number;
    [key: string]: any;
}

export interface DatabaseGetSchoolsParams {
    /**
     * Search query.
     */
    q?: string;
    /**
     * City ID.
     */
    city_id: number;
    /**
     * Offset needed to return a specific subset of schools.
     */
    offset?: number;
    /**
     * Number of schools to return.
     */
    count?: number;
    [key: string]: any;
}

export interface DatabaseGetUniversitiesParams {
    /**
     * Search query.
     */
    q?: string;
    /**
     * Country ID.
     */
    country_id?: number;
    /**
     * City ID.
     */
    city_id?: number;
    /**
     * Offset needed to return a specific subset of universities.
     */
    offset?: number;
    /**
     * Number of universities to return.
     */
    count?: number;
    [key: string]: any;
}

export interface DocsAddParams {
    /**
     * ID of the user or community that owns the document. Use a negative value to designate a community ID.
     */
    owner_id: number;
    /**
     * Document ID.
     */
    doc_id: number;
    /**
     * Access key. This parameter is required if 'access_key' was returned with the document's data.
     */
    access_key?: string;
    [key: string]: any;
}

export interface DocsDeleteParams {
    /**
     * ID of the user or community that owns the document. Use a negative value to designate a community ID.
     */
    owner_id: number;
    /**
     * Document ID.
     */
    doc_id: number;
    [key: string]: any;
}

export interface DocsEditParams {
    /**
     * User ID or community ID. Use a negative value to designate a community ID.
     */
    owner_id: number;
    /**
     * Document ID.
     */
    doc_id: number;
    /**
     * Document title.
     */
    title?: string;
    tags?: string[] | string;
    [key: string]: any;
}

export interface DocsGetParams {
    /**
     * Number of documents to return. By default, all documents.
     */
    count?: number;
    /**
     * Offset needed to return a specific subset of documents.
     */
    offset?: number;
    /**
     * ID of the user or community that owns the documents. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    type?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    [key: string]: any;
}

export interface DocsGetByIdParams {
    docs?: string[] | string;
    [key: string]: any;
}

export interface DocsGetMessagesUploadServerParams {
    /**
     * Document type.
     */
    type?: "audio_message" | "doc" | "graffiti";
    /**
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'Chat ID', e.g. '2000000001'. For community: '- Community ID', e.g. '-12345'. "
     */
    peer_id?: number;
    [key: string]: any;
}

export interface DocsGetTypesParams {
    /**
     * ID of the user or community that owns the documents. Use a negative value to designate a community ID.
     */
    owner_id: number;
    [key: string]: any;
}

export interface DocsGetUploadServerParams {
    /**
     * Community ID (if the document will be uploaded to the community).
     */
    group_id?: number;
    [key: string]: any;
}

export interface DocsGetWallUploadServerParams {
    /**
     * Community ID (if the document will be uploaded to the community).
     */
    group_id?: number;
    [key: string]: any;
}

export interface DocsSaveParams {
    /**
     * This parameter is returned when the file is [vk.com/dev/upload_files_2|uploaded to the server].
     */
    file: string;
    /**
     * Document title.
     */
    title?: string;
    /**
     * Document tags.
     */
    tags?: string;
    [key: string]: any;
}

export interface DocsSearchParams {
    /**
     * Search query string.
     */
    q: string;
    /**
     * Number of results to return.
     */
    count?: number;
    /**
     * Offset needed to return a specific subset of results.
     */
    offset?: number;
    search_own?: boolean;
    [key: string]: any;
}

export interface FaveAddGroupParams {
    /**
     * Community ID.
     */
    group_id: number;
    [key: string]: any;
}

export interface FaveAddLinkParams {
    /**
     * Link URL.
     */
    link: string;
    [key: string]: any;
}

export interface FaveAddUserParams {
    /**
     * Profile ID.
     */
    user_id: number;
    [key: string]: any;
}

export interface FaveGetLinksParams {
    /**
     * Offset needed to return a specific subset of users.
     */
    offset?: number;
    /**
     * Number of results to return.
     */
    count?: number;
    [key: string]: any;
}

export interface FaveGetMarketItemsParams {
    /**
     * Number of results to return.
     */
    count?: number;
    /**
     * '1' – to return additional fields 'likes, can_comment, can_repost, photos'. By default: '0'.
     */
    extended?: boolean;
    offset?: number;
    [key: string]: any;
}

export interface FaveGetPhotosParams {
    /**
     * Offset needed to return a specific subset of photos.
     */
    offset?: number;
    /**
     * Number of photos to return.
     */
    count?: number;
    [key: string]: any;
}

export interface FaveGetPostsParams {
    /**
     * Offset needed to return a specific subset of posts.
     */
    offset?: number;
    /**
     * Number of posts to return.
     */
    count?: number;
    /**
     * '1' — to return additional 'wall', 'profiles', and 'groups' fields. By default: '0'.
     */
    extended?: boolean;
    [key: string]: any;
}

export interface FaveGetUsersParams {
    /**
     * Offset needed to return a specific subset of users.
     */
    offset?: number;
    /**
     * Number of users to return.
     */
    count?: number;
    [key: string]: any;
}

export interface FaveGetVideosParams {
    /**
     * Offset needed to return a specific subset of videos.
     */
    offset?: number;
    /**
     * Number of videos to return.
     */
    count?: number;
    /**
     * Return an additional information about videos. Also returns all owners profiles and groups.
     */
    extended?: boolean;
    [key: string]: any;
}

export interface FaveRemoveGroupParams {
    /**
     * Community ID.
     */
    group_id: number;
    [key: string]: any;
}

export interface FaveRemoveLinkParams {
    /**
     * Link ID (can be obtained by [vk.com/dev/faves.getLinks|faves.getLinks] method).
     */
    link_id?: string;
    [key: string]: any;
}

export interface FaveRemoveUserParams {
    /**
     * Profile ID.
     */
    user_id: number;
    [key: string]: any;
}

export interface FriendsAddParams {
    /**
     * ID of the user whose friend request will be approved or to whom a friend request will be sent.
     */
    user_id?: number;
    /**
     * Text of the message (up to 500 characters) for the friend request, if any.
     */
    text?: string;
    /**
     * '1' to pass an incoming request to followers list.
     */
    follow?: boolean;
    [key: string]: any;
}

export interface FriendsAddListParams {
    /**
     * Name of the friend list.
     */
    name: string;
    user_ids?: number[] | number;
    [key: string]: any;
}

export interface FriendsAreFriendsParams {
    /**
     * '1' — to return 'sign' field. 'sign' is md5("{id}_{user_id}_{friends_status}_{application_secret}"), where id is current user ID. This field allows to check that data has not been modified by the client. By default: '0'.
     */
    need_sign?: boolean;
    user_ids?: number[] | number;
    [key: string]: any;
}

export interface FriendsDeleteParams {
    /**
     * ID of the user whose friend request is to be declined or who is to be deleted from the current user's friend list.
     */
    user_id?: number;
    [key: string]: any;
}

export interface FriendsDeleteAllRequestsParams {
    [key: string]: any;
}

export interface FriendsDeleteListParams {
    /**
     * ID of the friend list to delete.
     */
    list_id: number;
    [key: string]: any;
}

export interface FriendsEditParams {
    /**
     * ID of the user whose friend list is to be edited.
     */
    user_id: number;
    list_ids?: number[] | number;
    [key: string]: any;
}

export interface FriendsEditListParams {
    /**
     * Name of the friend list.
     */
    name?: string;
    /**
     * Friend list ID.
     */
    list_id: number;
    user_ids?: number[] | number;
    add_user_ids?: number[] | number;
    delete_user_ids?: number[] | number;
    [key: string]: any;
}

export interface FriendsGetParams {
    /**
     * User ID. By default, the current user ID.
     */
    user_id?: number;
    /**
     * Sort order: , 'name' — by name (enabled only if the 'fields' parameter is used), 'hints' — by rating, similar to how friends are sorted in My friends section, , This parameter is available only for [vk.com/dev/standalone|desktop applications].
     */
    order?: "name" | "hints";
    /**
     * ID of the friend list returned by the [vk.com/dev/friends.getLists|friends.getLists] method to be used as the source. This parameter is taken into account only when the uid parameter is set to the current user ID. This parameter is available only for [vk.com/dev/standalone|desktop applications].
     */
    list_id?: number;
    /**
     * Number of friends to return.
     */
    count?: number;
    /**
     * Offset needed to return a specific subset of friends.
     */
    offset?: number;
    /**
     * Case for declension of user name and surname: , 'nom' — nominative (default) , 'gen' — genitive , 'dat' — dative , 'acc' — accusative , 'ins' — instrumental , 'abl' — prepositional
     */
    name_case?: "nom" | "gen" | "dat" | "acc" | "ins" | "abl";
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface FriendsGetAppUsersParams {
    [key: string]: any;
}

export interface FriendsGetByPhonesParams {
    phones?: string[] | string;
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface FriendsGetListsParams {
    /**
     * User ID.
     */
    user_id?: number;
    /**
     * '1' — to return system friend lists. By default: '0'.
     */
    return_system?: boolean;
    [key: string]: any;
}

export interface FriendsGetMutualParams {
    /**
     * ID of the user whose friends will be checked against the friends of the user specified in 'target_uid'.
     */
    source_uid?: number;
    /**
     * ID of the user whose friends will be checked against the friends of the user specified in 'source_uid'.
     */
    target_uid?: number;
    /**
     * Sort order: 'random' — random order
     */
    order?: string;
    /**
     * Number of mutual friends to return.
     */
    count?: number;
    /**
     * Offset needed to return a specific subset of mutual friends.
     */
    offset?: number;
    target_uids?: number[] | number;
    [key: string]: any;
}

export interface FriendsGetOnlineParams {
    /**
     * User ID.
     */
    user_id?: number;
    /**
     * Friend list ID. If this parameter is not set, information about all online friends is returned.
     */
    list_id?: number;
    /**
     * '1' — to return an additional 'online_mobile' field, '0' — (default),
     */
    online_mobile?: boolean;
    /**
     * Sort order: 'random' — random order
     */
    order?: string;
    /**
     * Number of friends to return.
     */
    count?: number;
    /**
     * Offset needed to return a specific subset of friends.
     */
    offset?: number;
    [key: string]: any;
}

export interface FriendsGetRecentParams {
    /**
     * Number of recently added friends to return.
     */
    count?: number;
    [key: string]: any;
}

export interface FriendsGetRequestsParams {
    /**
     * Offset needed to return a specific subset of friend requests.
     */
    offset?: number;
    /**
     * Number of friend requests to return (default 100, maximum 1000).
     */
    count?: number;
    /**
     * '1' — to return response messages from users who have sent a friend request or, if 'suggested' is set to '1', to return a list of suggested friends
     */
    extended?: boolean;
    /**
     * '1' — to return a list of mutual friends (up to 20), if any
     */
    need_mutual?: boolean;
    /**
     * '1' — to return outgoing requests, '0' — to return incoming requests (default)
     */
    out?: boolean;
    /**
     * Sort order: '1' — by number of mutual friends, '0' — by date
     */
    sort?: 0 | 1;
    /**
     * '1' — to return a list of suggested friends, '0' — to return friend requests (default)
     */
    suggested?: boolean;
    need_viewed?: boolean;
    [key: string]: any;
}

export interface FriendsGetSuggestionsParams {
    /**
     * Number of suggestions to return.
     */
    count?: number;
    /**
     * Offset needed to return a specific subset of suggestions.
     */
    offset?: number;
    /**
     * Case for declension of user name and surname: , 'nom' — nominative (default) , 'gen' — genitive , 'dat' — dative , 'acc' — accusative , 'ins' — instrumental , 'abl' — prepositional
     */
    name_case?: "nom" | "gen" | "dat" | "acc" | "ins" | "abl";
    filter?: ("mutual" | "contacts" | "mutual_contacts")[] | ("mutual" | "contacts" | "mutual_contacts");
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface FriendsSearchParams {
    /**
     * User ID.
     */
    user_id: number;
    /**
     * Search query string (e.g., 'Vasya Babich').
     */
    q?: string;
    /**
     * Case for declension of user name and surname: 'nom' — nominative (default), 'gen' — genitive , 'dat' — dative, 'acc' — accusative , 'ins' — instrumental , 'abl' — prepositional
     */
    name_case?: "nom" | "gen" | "dat" | "acc" | "ins" | "abl";
    /**
     * Offset needed to return a specific subset of friends.
     */
    offset?: number;
    /**
     * Number of friends to return.
     */
    count?: number;
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface GiftsGetParams {
    /**
     * User ID.
     */
    user_id?: number;
    /**
     * Number of gifts to return.
     */
    count?: number;
    /**
     * Offset needed to return a specific subset of results.
     */
    offset?: number;
    [key: string]: any;
}

export interface GroupsAddAddressParams {
    group_id: number;
    title: string;
    address: string;
    additional_address?: string;
    country_id: number;
    city_id: number;
    metro_id?: number;
    latitude: number;
    longitude: number;
    phone?: string;
    work_info_status?: Objects.GroupsAddressWorkInfoStatus;
    timetable?: string;
    is_main_address?: boolean;
    [key: string]: any;
}

export interface GroupsAddCallbackServerParams {
    group_id: number;
    url: string;
    title: string;
    secret_key?: string;
    [key: string]: any;
}

export interface GroupsAddLinkParams {
    /**
     * Community ID.
     */
    group_id: number;
    /**
     * Link URL.
     */
    link: string;
    /**
     * Description text for the link.
     */
    text?: string;
    [key: string]: any;
}

export interface GroupsApproveRequestParams {
    /**
     * Community ID.
     */
    group_id: number;
    /**
     * User ID.
     */
    user_id: number;
    [key: string]: any;
}

export interface GroupsBanParams {
    group_id: number;
    owner_id?: number;
    end_date?: number;
    reason?: number;
    comment?: string;
    comment_visible?: boolean;
    [key: string]: any;
}

export interface GroupsCreateParams {
    /**
     * Community title.
     */
    title: string;
    /**
     * Community description (ignored for 'type' = 'public').
     */
    description?: string;
    /**
     * Community type. Possible values: *'group' – group,, *'event' – event,, *'public' – public page
     */
    type?: "event" | "group" | "public";
    /**
     * Category ID (for 'type' = 'public' only).
     */
    public_category?: number;
    /**
     * Public page subtype. Possible values: *'1' – place or small business,, *'2' – company, organization or website,, *'3' – famous person or group of people,, *'4' – product or work of art.
     */
    subtype?: 1 | 2 | 3 | 4;
    [key: string]: any;
}

export interface GroupsDeleteCallbackServerParams {
    group_id: number;
    server_id: number;
    [key: string]: any;
}

export interface GroupsDeleteLinkParams {
    /**
     * Community ID.
     */
    group_id: number;
    /**
     * Link ID.
     */
    link_id: number;
    [key: string]: any;
}

export interface GroupsDisableOnlineParams {
    group_id: number;
    [key: string]: any;
}

export interface GroupsEditParams {
    /**
     * Community ID.
     */
    group_id: number;
    /**
     * Community title.
     */
    title?: string;
    /**
     * Community description.
     */
    description?: string;
    /**
     * Community screen name.
     */
    screen_name?: string;
    /**
     * Website that will be displayed in the community information field.
     */
    website?: string;
    /**
     * Organizer email (for events).
     */
    email?: string;
    /**
     * Organizer phone number (for events).
     */
    phone?: string;
    /**
     * RSS feed address for import (available only to communities with special permission. Contact vk.com/support to get it.
     */
    rss?: string;
    /**
     * Event start date in Unixtime format.
     */
    event_start_date?: number;
    /**
     * Event finish date in Unixtime format.
     */
    event_finish_date?: number;
    /**
     * Organizer community ID (for events only).
     */
    event_group_id?: number;
    /**
     * Public page category ID.
     */
    public_category?: number;
    /**
     * Public page subcategory ID.
     */
    public_subcategory?: number;
    /**
     * Founding date of a company or organization owning the community in "dd.mm.YYYY" format.
     */
    public_date?: string;
    /**
     * Links settings (for public pages only). Possible values: *'0' – disabled,, *'1' – enabled.
     */
    links?: boolean;
    /**
     * Events settings (for public pages only). Possible values: *'0' – disabled,, *'1' – enabled.
     */
    events?: boolean;
    /**
     * Places settings (for public pages only). Possible values: *'0' – disabled,, *'1' – enabled.
     */
    places?: boolean;
    /**
     * Contacts settings (for public pages only). Possible values: *'0' – disabled,, *'1' – enabled.
     */
    contacts?: boolean;
    /**
     * Community messages. Possible values: *'0' — disabled,, *'1' — enabled.
     */
    messages?: boolean;
    /**
     * Market settings. Possible values: *'0' – disabled,, *'1' – enabled.
     */
    market?: boolean;
    /**
     * market comments settings. Possible values: *'0' – disabled,, *'1' – enabled.
     */
    market_comments?: boolean;
    /**
     * Seller contact for market. Set '0' for community messages.
     */
    market_contact?: number;
    /**
     * ID of a wiki page with market description.
     */
    market_wiki?: number;
    /**
     * Obscene expressions filter in comments. Possible values: , *'0' – disabled,, *'1' – enabled.
     */
    obscene_filter?: boolean;
    /**
     * Stopwords filter in comments. Possible values: , *'0' – disabled,, *'1' – enabled.
     */
    obscene_stopwords?: boolean;
    /**
     * Country of the community.
     */
    country?: number;
    /**
     * City of the community.
     */
    city?: number;
    access?: Objects.GroupsGroupAccess;
    subject?: Objects.GroupsGroupSubject;
    wall?: Objects.GroupsGroupWall;
    topics?: Objects.GroupsGroupTopics;
    photos?: Objects.GroupsGroupPhotos;
    video?: Objects.GroupsGroupVideo;
    audio?: Objects.GroupsGroupAudio;
    docs?: Objects.GroupsGroupDocs;
    wiki?: Objects.GroupsGroupWiki;
    articles?: boolean;
    addresses?: boolean;
    age_limits?: Objects.GroupsGroupAgeLimits;
    market_country?: number[] | number;
    market_city?: number[] | number;
    market_currency?: Objects.GroupsGroupMarketCurrency;
    obscene_words?: string[] | string;
    main_section?: number;
    secondary_section?: number;
    [key: string]: any;
}

export interface GroupsEditAddressParams {
    group_id: number;
    address_id: number;
    title?: string;
    address?: string;
    additional_address?: string;
    country_id?: number;
    city_id?: number;
    metro_id?: number;
    latitude?: number;
    longitude?: number;
    phone?: string;
    work_info_status?: Objects.GroupsAddressWorkInfoStatus;
    timetable?: string;
    is_main_address?: boolean;
    [key: string]: any;
}

export interface GroupsEditCallbackServerParams {
    group_id: number;
    server_id: number;
    url: string;
    title: string;
    secret_key?: string;
    [key: string]: any;
}

export interface GroupsEditLinkParams {
    /**
     * Community ID.
     */
    group_id: number;
    /**
     * Link ID.
     */
    link_id: number;
    /**
     * New description text for the link.
     */
    text?: string;
    [key: string]: any;
}

export interface GroupsEditManagerParams {
    /**
     * Community ID.
     */
    group_id: number;
    /**
     * User ID.
     */
    user_id: number;
    /**
     * '1' — to show the manager in Contacts block of the community.
     */
    is_contact?: boolean;
    /**
     * Position to show in Contacts block.
     */
    contact_position?: string;
    /**
     * Contact phone.
     */
    contact_phone?: string;
    /**
     * Contact e-mail.
     */
    contact_email?: string;
    role?: Objects.GroupsGroupRole;
    [key: string]: any;
}

export interface GroupsEnableOnlineParams {
    group_id: number;
    [key: string]: any;
}

export interface GroupsGetParams {
    /**
     * User ID.
     */
    user_id?: number;
    /**
     * '1' — to return complete information about a user's communities, '0' — to return a list of community IDs without any additional fields (default),
     */
    extended?: boolean;
    /**
     * Offset needed to return a specific subset of communities.
     */
    offset?: number;
    /**
     * Number of communities to return.
     */
    count?: number;
    filter?: Objects.GroupsFilter[];
    fields?: Objects.GroupsFields[];
    [key: string]: any;
}

export interface GroupsGetAddressesParams {
    /**
     * ID or screen name of the community.
     */
    group_id: number;
    /**
     * Latitude of  the user geo position.
     */
    latitude?: number;
    /**
     * Longitude of the user geo position.
     */
    longitude?: number;
    /**
     * Offset needed to return a specific subset of community addresses.
     */
    offset?: number;
    /**
     * Number of community addresses to return.
     */
    count?: number;
    address_ids?: number[] | number;
    fields?: Objects.AddressesFields[];
    [key: string]: any;
}

export interface GroupsGetBannedParams {
    /**
     * Community ID.
     */
    group_id: number;
    /**
     * Offset needed to return a specific subset of users.
     */
    offset?: number;
    /**
     * Number of users to return.
     */
    count?: number;
    fields?: Objects.BaseUserGroupFields[];
    owner_id?: number;
    [key: string]: any;
}

export interface GroupsGetByIdParams {
    /**
     * ID or screen name of the community.
     */
    group_id?: string;
    group_ids?: string[] | string;
    fields?: Objects.GroupsFields[];
    [key: string]: any;
}

export interface GroupsGetCallbackConfirmationCodeParams {
    /**
     * Community ID.
     */
    group_id: number;
    [key: string]: any;
}

export interface GroupsGetCallbackServersParams {
    group_id: number;
    server_ids?: number[] | number;
    [key: string]: any;
}

export interface GroupsGetCallbackSettingsParams {
    /**
     * Community ID.
     */
    group_id: number;
    /**
     * Server ID.
     */
    server_id?: number;
    [key: string]: any;
}

export interface GroupsGetCatalogParams {
    /**
     * Category id received from [vk.com/dev/groups.getCatalogInfo|groups.getCatalogInfo].
     */
    category_id?: number;
    /**
     * Subcategory id received from [vk.com/dev/groups.getCatalogInfo|groups.getCatalogInfo].
     */
    subcategory_id?: number;
    [key: string]: any;
}

export interface GroupsGetCatalogInfoParams {
    /**
     * 1 – to return communities count and three communities for preview. By default: 0.
     */
    extended?: boolean;
    /**
     * 1 – to return subcategories info. By default: 0.
     */
    subcategories?: boolean;
    [key: string]: any;
}

export interface GroupsGetInvitedUsersParams {
    /**
     * Group ID to return invited users for.
     */
    group_id: number;
    /**
     * Offset needed to return a specific subset of results.
     */
    offset?: number;
    /**
     * Number of results to return.
     */
    count?: number;
    /**
     * Case for declension of user name and surname. Possible values: *'nom' — nominative (default),, *'gen' — genitive,, *'dat' — dative,, *'acc' — accusative, , *'ins' — instrumental,, *'abl' — prepositional.
     */
    name_case?: "nom" | "gen" | "dat" | "acc" | "ins" | "abl";
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface GroupsGetInvitesParams {
    /**
     * Offset needed to return a specific subset of invitations.
     */
    offset?: number;
    /**
     * Number of invitations to return.
     */
    count?: number;
    /**
     * '1' — to return additional [vk.com/dev/fields_groups|fields] for communities..
     */
    extended?: boolean;
    [key: string]: any;
}

export interface GroupsGetLongPollServerParams {
    /**
     * Community ID
     */
    group_id: number;
    [key: string]: any;
}

export interface GroupsGetLongPollSettingsParams {
    /**
     * Community ID.
     */
    group_id: number;
    [key: string]: any;
}

export interface GroupsGetMembersParams {
    /**
     * ID or screen name of the community.
     */
    group_id?: string;
    /**
     * Sort order. Available values: 'id_asc', 'id_desc', 'time_asc', 'time_desc'. 'time_asc' and 'time_desc' are availavle only if the method is called by the group's 'moderator'.
     */
    sort?: "id_asc" | "id_desc" | "time_asc" | "time_desc";
    /**
     * Offset needed to return a specific subset of community members.
     */
    offset?: number;
    /**
     * Number of community members to return.
     */
    count?: number;
    /**
     * *'friends' – only friends in this community will be returned,, *'unsure' – only those who pressed 'I may attend' will be returned (if it's an event).
     */
    filter?: "friends" | "unsure" | "managers";
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface GroupsGetRequestsParams {
    /**
     * Community ID.
     */
    group_id: number;
    /**
     * Offset needed to return a specific subset of results.
     */
    offset?: number;
    /**
     * Number of results to return.
     */
    count?: number;
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface GroupsGetSettingsParams {
    /**
     * Community ID.
     */
    group_id: number;
    [key: string]: any;
}

export interface GroupsGetTokenPermissionsParams {
    [key: string]: any;
}

export interface GroupsInviteParams {
    /**
     * Community ID.
     */
    group_id: number;
    /**
     * User ID.
     */
    user_id: number;
    [key: string]: any;
}

export interface GroupsIsMemberParams {
    /**
     * ID or screen name of the community.
     */
    group_id: string;
    /**
     * User ID.
     */
    user_id?: number;
    /**
     * '1' — to return an extended response with additional fields. By default: '0'.
     */
    extended?: boolean;
    user_ids?: number[] | number;
    [key: string]: any;
}

export interface GroupsJoinParams {
    /**
     * ID or screen name of the community.
     */
    group_id?: number;
    /**
     * Optional parameter which is taken into account when 'gid' belongs to the event: '1' — Perhaps I will attend, '0' — I will be there for sure (default), ,
     */
    not_sure?: string;
    [key: string]: any;
}

export interface GroupsLeaveParams {
    /**
     * ID or screen name of the community.
     */
    group_id: number;
    [key: string]: any;
}

export interface GroupsRemoveUserParams {
    /**
     * Community ID.
     */
    group_id: number;
    /**
     * User ID.
     */
    user_id: number;
    [key: string]: any;
}

export interface GroupsReorderLinkParams {
    /**
     * Community ID.
     */
    group_id: number;
    /**
     * Link ID.
     */
    link_id: number;
    /**
     * ID of the link after which to place the link with 'link_id'.
     */
    after?: number;
    [key: string]: any;
}

export interface GroupsSearchParams {
    /**
     * Search query string.
     */
    q: string;
    /**
     * Community type. Possible values: 'group, page, event.'
     */
    type?: "group" | "page" | "event";
    /**
     * Country ID.
     */
    country_id?: number;
    /**
     * City ID. If this parameter is transmitted, country_id is ignored.
     */
    city_id?: number;
    /**
     * '1' — to return only upcoming events. Works with the 'type' = 'event' only.
     */
    future?: boolean;
    /**
     * '1' — to return communities with enabled market only.
     */
    market?: boolean;
    /**
     * Sort order. Possible values: *'0' — default sorting (similar the full version of the site),, *'1' — by growth speed,, *'2'— by the "day attendance/members number" ratio,, *'3' — by the "Likes number/members number" ratio,, *'4' — by the "comments number/members number" ratio,, *'5' — by the "boards entries number/members number" ratio.
     */
    sort?: 0 | 1 | 2 | 3 | 4 | 5;
    /**
     * Offset needed to return a specific subset of results.
     */
    offset?: number;
    /**
     * Number of communities to return. "Note that you can not receive more than first thousand of results, regardless of 'count' and 'offset' values."
     */
    count?: number;
    [key: string]: any;
}

export interface GroupsSetCallbackSettingsParams {
    /**
     * Community ID.
     */
    group_id: number;
    /**
     * Server ID.
     */
    server_id?: number;
    /**
     * A new incoming message has been received ('0' — disabled, '1' — enabled).
     */
    message_new?: boolean;
    /**
     * A new outcoming message has been received ('0' — disabled, '1' — enabled).
     */
    message_reply?: boolean;
    /**
     * Allowed messages notifications ('0' — disabled, '1' — enabled).
     */
    message_allow?: boolean;
    /**
     * Denied messages notifications ('0' — disabled, '1' — enabled).
     */
    message_deny?: boolean;
    /**
     * New photos notifications ('0' — disabled, '1' — enabled).
     */
    photo_new?: boolean;
    /**
     * New audios notifications ('0' — disabled, '1' — enabled).
     */
    audio_new?: boolean;
    /**
     * New videos notifications ('0' — disabled, '1' — enabled).
     */
    video_new?: boolean;
    /**
     * New wall replies notifications ('0' — disabled, '1' — enabled).
     */
    wall_reply_new?: boolean;
    /**
     * Wall replies edited notifications ('0' — disabled, '1' — enabled).
     */
    wall_reply_edit?: boolean;
    /**
     * A wall comment has been deleted ('0' — disabled, '1' — enabled).
     */
    wall_reply_delete?: boolean;
    /**
     * A wall comment has been restored ('0' — disabled, '1' — enabled).
     */
    wall_reply_restore?: boolean;
    /**
     * New wall posts notifications ('0' — disabled, '1' — enabled).
     */
    wall_post_new?: boolean;
    /**
     * New wall posts notifications ('0' — disabled, '1' — enabled).
     */
    wall_repost?: boolean;
    /**
     * New board posts notifications ('0' — disabled, '1' — enabled).
     */
    board_post_new?: boolean;
    /**
     * Board posts edited notifications ('0' — disabled, '1' — enabled).
     */
    board_post_edit?: boolean;
    /**
     * Board posts restored notifications ('0' — disabled, '1' — enabled).
     */
    board_post_restore?: boolean;
    /**
     * Board posts deleted notifications ('0' — disabled, '1' — enabled).
     */
    board_post_delete?: boolean;
    /**
     * New comment to photo notifications ('0' — disabled, '1' — enabled).
     */
    photo_comment_new?: boolean;
    /**
     * A photo comment has been edited ('0' — disabled, '1' — enabled).
     */
    photo_comment_edit?: boolean;
    /**
     * A photo comment has been deleted ('0' — disabled, '1' — enabled).
     */
    photo_comment_delete?: boolean;
    /**
     * A photo comment has been restored ('0' — disabled, '1' — enabled).
     */
    photo_comment_restore?: boolean;
    /**
     * New comment to video notifications ('0' — disabled, '1' — enabled).
     */
    video_comment_new?: boolean;
    /**
     * A video comment has been edited ('0' — disabled, '1' — enabled).
     */
    video_comment_edit?: boolean;
    /**
     * A video comment has been deleted ('0' — disabled, '1' — enabled).
     */
    video_comment_delete?: boolean;
    /**
     * A video comment has been restored ('0' — disabled, '1' — enabled).
     */
    video_comment_restore?: boolean;
    /**
     * New comment to market item notifications ('0' — disabled, '1' — enabled).
     */
    market_comment_new?: boolean;
    /**
     * A market comment has been edited ('0' — disabled, '1' — enabled).
     */
    market_comment_edit?: boolean;
    /**
     * A market comment has been deleted ('0' — disabled, '1' — enabled).
     */
    market_comment_delete?: boolean;
    /**
     * A market comment has been restored ('0' — disabled, '1' — enabled).
     */
    market_comment_restore?: boolean;
    /**
     * A vote in a public poll has been added ('0' — disabled, '1' — enabled).
     */
    poll_vote_new?: boolean;
    /**
     * Joined community notifications ('0' — disabled, '1' — enabled).
     */
    group_join?: boolean;
    /**
     * Left community notifications ('0' — disabled, '1' — enabled).
     */
    group_leave?: boolean;
    /**
     * User added to community blacklist
     */
    user_block?: boolean;
    /**
     * User removed from community blacklist
     */
    user_unblock?: boolean;
    /**
     * New form in lead forms
     */
    lead_forms_new?: boolean;
    api_version?: string;
    message_typing_state?: boolean;
    group_change_settings?: boolean;
    group_change_photo?: boolean;
    group_officers_edit?: boolean;
    [key: string]: any;
}

export interface GroupsSetLongPollSettingsParams {
    /**
     * Community ID.
     */
    group_id: number;
    /**
     * Sets whether Long Poll is enabled ('0' — disabled, '1' — enabled).
     */
    enabled?: boolean;
    /**
     * A new incoming message has been received ('0' — disabled, '1' — enabled).
     */
    message_new?: boolean;
    /**
     * A new outcoming message has been received ('0' — disabled, '1' — enabled).
     */
    message_reply?: boolean;
    /**
     * Allowed messages notifications ('0' — disabled, '1' — enabled).
     */
    message_allow?: boolean;
    /**
     * Denied messages notifications ('0' — disabled, '1' — enabled).
     */
    message_deny?: boolean;
    /**
     * A message has been edited ('0' — disabled, '1' — enabled).
     */
    message_edit?: boolean;
    /**
     * New photos notifications ('0' — disabled, '1' — enabled).
     */
    photo_new?: boolean;
    /**
     * New audios notifications ('0' — disabled, '1' — enabled).
     */
    audio_new?: boolean;
    /**
     * New videos notifications ('0' — disabled, '1' — enabled).
     */
    video_new?: boolean;
    /**
     * New wall replies notifications ('0' — disabled, '1' — enabled).
     */
    wall_reply_new?: boolean;
    /**
     * Wall replies edited notifications ('0' — disabled, '1' — enabled).
     */
    wall_reply_edit?: boolean;
    /**
     * A wall comment has been deleted ('0' — disabled, '1' — enabled).
     */
    wall_reply_delete?: boolean;
    /**
     * A wall comment has been restored ('0' — disabled, '1' — enabled).
     */
    wall_reply_restore?: boolean;
    /**
     * New wall posts notifications ('0' — disabled, '1' — enabled).
     */
    wall_post_new?: boolean;
    /**
     * New wall posts notifications ('0' — disabled, '1' — enabled).
     */
    wall_repost?: boolean;
    /**
     * New board posts notifications ('0' — disabled, '1' — enabled).
     */
    board_post_new?: boolean;
    /**
     * Board posts edited notifications ('0' — disabled, '1' — enabled).
     */
    board_post_edit?: boolean;
    /**
     * Board posts restored notifications ('0' — disabled, '1' — enabled).
     */
    board_post_restore?: boolean;
    /**
     * Board posts deleted notifications ('0' — disabled, '1' — enabled).
     */
    board_post_delete?: boolean;
    /**
     * New comment to photo notifications ('0' — disabled, '1' — enabled).
     */
    photo_comment_new?: boolean;
    /**
     * A photo comment has been edited ('0' — disabled, '1' — enabled).
     */
    photo_comment_edit?: boolean;
    /**
     * A photo comment has been deleted ('0' — disabled, '1' — enabled).
     */
    photo_comment_delete?: boolean;
    /**
     * A photo comment has been restored ('0' — disabled, '1' — enabled).
     */
    photo_comment_restore?: boolean;
    /**
     * New comment to video notifications ('0' — disabled, '1' — enabled).
     */
    video_comment_new?: boolean;
    /**
     * A video comment has been edited ('0' — disabled, '1' — enabled).
     */
    video_comment_edit?: boolean;
    /**
     * A video comment has been deleted ('0' — disabled, '1' — enabled).
     */
    video_comment_delete?: boolean;
    /**
     * A video comment has been restored ('0' — disabled, '1' — enabled).
     */
    video_comment_restore?: boolean;
    /**
     * New comment to market item notifications ('0' — disabled, '1' — enabled).
     */
    market_comment_new?: boolean;
    /**
     * A market comment has been edited ('0' — disabled, '1' — enabled).
     */
    market_comment_edit?: boolean;
    /**
     * A market comment has been deleted ('0' — disabled, '1' — enabled).
     */
    market_comment_delete?: boolean;
    /**
     * A market comment has been restored ('0' — disabled, '1' — enabled).
     */
    market_comment_restore?: boolean;
    /**
     * A vote in a public poll has been added ('0' — disabled, '1' — enabled).
     */
    poll_vote_new?: boolean;
    /**
     * Joined community notifications ('0' — disabled, '1' — enabled).
     */
    group_join?: boolean;
    /**
     * Left community notifications ('0' — disabled, '1' — enabled).
     */
    group_leave?: boolean;
    /**
     * User added to community blacklist
     */
    user_block?: boolean;
    /**
     * User removed from community blacklist
     */
    user_unblock?: boolean;
    api_version?: string;
    message_typing_state?: boolean;
    group_change_settings?: boolean;
    group_change_photo?: boolean;
    group_officers_edit?: boolean;
    [key: string]: any;
}

export interface GroupsUnbanParams {
    group_id: number;
    owner_id?: number;
    [key: string]: any;
}

export interface LeadsCheckUserParams {
    /**
     * Lead ID.
     */
    lead_id: number;
    /**
     * Value to be return in 'result' field when test mode is used.
     */
    test_result?: number;
    /**
     * User age.
     */
    age?: number;
    /**
     * User country code.
     */
    country?: string;
    test_mode?: boolean;
    auto_start?: boolean;
    [key: string]: any;
}

export interface LeadsCompleteParams {
    /**
     * Session obtained as GET parameter when session started.
     */
    vk_sid: string;
    /**
     * Secret key from the lead testing interface.
     */
    secret: string;
    /**
     * Comment text.
     */
    comment?: string;
    [key: string]: any;
}

export interface LeadsGetStatsParams {
    /**
     * Lead ID.
     */
    lead_id: number;
    /**
     * Secret key obtained from the lead testing interface.
     */
    secret?: string;
    /**
     * Day to start stats from (YYYY_MM_DD, e.g.2011-09-17).
     */
    date_start?: string;
    /**
     * Day to finish stats (YYYY_MM_DD, e.g.2011-09-17).
     */
    date_end?: string;
    [key: string]: any;
}

export interface LeadsGetUsersParams {
    /**
     * Offer ID.
     */
    offer_id: number;
    /**
     * Secret key obtained in the lead testing interface.
     */
    secret: string;
    /**
     * Offset needed to return a specific subset of results.
     */
    offset?: number;
    /**
     * Number of results to return.
     */
    count?: number;
    /**
     * Action type. Possible values: *'0' — start,, *'1' — finish,, *'2' — blocking users,, *'3' — start in a test mode,, *'4' — finish in a test mode.
     */
    status?: 0 | 1 | 2 | 3 | 4;
    /**
     * Sort order. Possible values: *'1' — chronological,, *'0' — reverse chronological.
     */
    reverse?: boolean;
    [key: string]: any;
}

export interface LeadsMetricHitParams {
    /**
     * Metric data obtained in the lead interface.
     */
    data: string;
    [key: string]: any;
}

export interface LeadsStartParams {
    /**
     * Lead ID.
     */
    lead_id: number;
    /**
     * Secret key from the lead testing interface.
     */
    secret: string;
    uid?: number;
    aid?: number;
    test_mode?: boolean;
    force?: boolean;
    [key: string]: any;
}

export interface LikesAddParams {
    /**
     * ID of the user or community that owns the object.
     */
    owner_id?: number;
    /**
     * Object ID.
     */
    item_id: number;
    /**
     * Access key required for an object owned by a private entity.
     */
    access_key?: string;
    type?: Objects.LikesType;
    [key: string]: any;
}

export interface LikesDeleteParams {
    /**
     * ID of the user or community that owns the object.
     */
    owner_id?: number;
    /**
     * Object ID.
     */
    item_id: number;
    type?: Objects.LikesType;
    [key: string]: any;
}

export interface LikesGetListParams {
    /**
     * ID of the user, community, or application that owns the object. If the 'type' parameter is set as 'sitepage', the application ID is passed as 'owner_id'. Use negative value for a community id. If the 'type' parameter is not set, the 'owner_id' is assumed to be either the current user or the same application ID as if the 'type' parameter was set to 'sitepage'.
     */
    owner_id?: number;
    /**
     * Object ID. If 'type' is set as 'sitepage', 'item_id' can include the 'page_id' parameter value used during initialization of the [vk.com/dev/Like|Like widget].
     */
    item_id?: number;
    /**
     * URL of the page where the [vk.com/dev/Like|Like widget] is installed. Used instead of the 'item_id' parameter.
     */
    page_url?: string;
    /**
     * Filters to apply: 'likes' — returns information about all users who liked the object (default), 'copies' — returns information only about users who told their friends about the object
     */
    filter?: "likes" | "copies";
    /**
     * Specifies which users are returned: '1' — to return only the current user's friends, '0' — to return all users (default)
     */
    friends_only?: 0 | 1 | 2 | 3;
    /**
     * Specifies whether extended information will be returned. '1' — to return extended information about users and communities from the 'Likes' list, '0' — to return no additional information (default)
     */
    extended?: boolean;
    /**
     * Offset needed to select a specific subset of users.
     */
    offset?: number;
    /**
     * Number of user IDs to return (maximum '1000'). Default is '100' if 'friends_only' is set to '0', otherwise, the default is '10' if 'friends_only' is set to '1'.
     */
    count?: number;
    type?: Objects.LikesType;
    skip_own?: boolean;
    [key: string]: any;
}

export interface LikesIsLikedParams {
    /**
     * User ID.
     */
    user_id?: number;
    /**
     * ID of the user or community that owns the object.
     */
    owner_id?: number;
    /**
     * Object ID.
     */
    item_id: number;
    type?: Objects.LikesType;
    [key: string]: any;
}

export interface MarketAddParams {
    /**
     * ID of an item owner community.
     */
    owner_id: number;
    /**
     * Item name.
     */
    name: string;
    /**
     * Item description.
     */
    description: string;
    /**
     * Item category ID.
     */
    category_id: number;
    /**
     * Item price.
     */
    price: number;
    /**
     * Item status ('1' — deleted, '0' — not deleted).
     */
    deleted?: boolean;
    /**
     * Cover photo ID.
     */
    main_photo_id: number;
    /**
     * Url for button in market item.
     */
    url?: string;
    photo_ids?: number[] | number;
    [key: string]: any;
}

export interface MarketAddAlbumParams {
    /**
     * ID of an item owner community.
     */
    owner_id: number;
    /**
     * Collection title.
     */
    title: string;
    /**
     * Cover photo ID.
     */
    photo_id?: number;
    /**
     * Set as main ('1' – set, '0' – no).
     */
    main_album?: boolean;
    [key: string]: any;
}

export interface MarketAddToAlbumParams {
    /**
     * ID of an item owner community.
     */
    owner_id: number;
    /**
     * Item ID.
     */
    item_id: number;
    album_ids?: number[] | number;
    [key: string]: any;
}

export interface MarketCreateCommentParams {
    /**
     * ID of an item owner community.
     */
    owner_id: number;
    /**
     * Item ID.
     */
    item_id: number;
    /**
     * Comment text (required if 'attachments' parameter is not specified)
     */
    message?: string;
    /**
     * '1' - comment will be published on behalf of a community, '0' - on behalf of a user (by default).
     */
    from_group?: boolean;
    /**
     * ID of a comment to reply with current comment to.
     */
    reply_to_comment?: number;
    /**
     * Sticker ID.
     */
    sticker_id?: number;
    /**
     * Random value to avoid resending one comment.
     */
    guid?: string;
    attachments?: string[] | string;
    [key: string]: any;
}

export interface MarketDeleteParams {
    /**
     * ID of an item owner community.
     */
    owner_id: number;
    /**
     * Item ID.
     */
    item_id: number;
    [key: string]: any;
}

export interface MarketDeleteAlbumParams {
    /**
     * ID of an collection owner community.
     */
    owner_id: number;
    /**
     * Collection ID.
     */
    album_id: number;
    [key: string]: any;
}

export interface MarketDeleteCommentParams {
    /**
     * identifier of an item owner community, "Note that community id in the 'owner_id' parameter should be negative number. For example 'owner_id'=-1 matches the [vk.com/apiclub|VK API] community "
     */
    owner_id: number;
    /**
     * comment id
     */
    comment_id: number;
    [key: string]: any;
}

export interface MarketEditParams {
    /**
     * ID of an item owner community.
     */
    owner_id: number;
    /**
     * Item ID.
     */
    item_id: number;
    /**
     * Item name.
     */
    name: string;
    /**
     * Item description.
     */
    description: string;
    /**
     * Item category ID.
     */
    category_id: number;
    /**
     * Item price.
     */
    price: number;
    /**
     * Item status ('1' — deleted, '0' — not deleted).
     */
    deleted?: boolean;
    /**
     * Cover photo ID.
     */
    main_photo_id: number;
    /**
     * Url for button in market item.
     */
    url?: string;
    photo_ids?: number[] | number;
    [key: string]: any;
}

export interface MarketEditAlbumParams {
    /**
     * ID of an collection owner community.
     */
    owner_id: number;
    /**
     * Collection ID.
     */
    album_id: number;
    /**
     * Collection title.
     */
    title: string;
    /**
     * Cover photo id
     */
    photo_id?: number;
    /**
     * Set as main ('1' – set, '0' – no).
     */
    main_album?: boolean;
    [key: string]: any;
}

export interface MarketEditCommentParams {
    /**
     * ID of an item owner community.
     */
    owner_id: number;
    /**
     * Comment ID.
     */
    comment_id: number;
    /**
     * New comment text (required if 'attachments' are not specified), , 2048 symbols maximum.
     */
    message?: string;
    attachments?: string[] | string;
    [key: string]: any;
}

export interface MarketGetParams {
    /**
     * ID of an item owner community, "Note that community id in the 'owner_id' parameter should be negative number. For example 'owner_id'=-1 matches the [vk.com/apiclub|VK API] community "
     */
    owner_id: number;
    /**
     * Number of items to return.
     */
    count?: number;
    /**
     * Offset needed to return a specific subset of results.
     */
    offset?: number;
    /**
     * '1' – method will return additional fields: 'likes, can_comment, car_repost, photos'. These parameters are not returned by default.
     */
    extended?: boolean;
    album_id?: number;
    [key: string]: any;
}

export interface MarketGetAlbumByIdParams {
    /**
     * identifier of an album owner community, "Note that community id in the 'owner_id' parameter should be negative number. For example 'owner_id'=-1 matches the [vk.com/apiclub|VK API] community "
     */
    owner_id: number;
    album_ids?: number[] | number;
    [key: string]: any;
}

export interface MarketGetAlbumsParams {
    /**
     * ID of an items owner community.
     */
    owner_id: number;
    /**
     * Offset needed to return a specific subset of results.
     */
    offset?: number;
    /**
     * Number of items to return.
     */
    count?: number;
    [key: string]: any;
}

export interface MarketGetByIdParams {
    /**
     * '1' – to return additional fields: 'likes, can_comment, car_repost, photos'. By default: '0'.
     */
    extended?: boolean;
    item_ids?: string[] | string;
    [key: string]: any;
}

export interface MarketGetCategoriesParams {
    /**
     * Number of results to return.
     */
    count?: number;
    /**
     * Offset needed to return a specific subset of results.
     */
    offset?: number;
    [key: string]: any;
}

export interface MarketGetCommentsParams {
    /**
     * ID of an item owner community
     */
    owner_id: number;
    /**
     * Item ID.
     */
    item_id: number;
    /**
     * '1' — to return likes info.
     */
    need_likes?: boolean;
    /**
     * ID of a comment to start a list from (details below).
     */
    start_comment_id?: number;
    /**
     * Number of results to return.
     */
    count?: number;
    /**
     * Sort order ('asc' — from old to new, 'desc' — from new to old)
     */
    sort?: "asc" | "desc";
    /**
     * '1' — comments will be returned as numbered objects, in addition lists of 'profiles' and 'groups' objects will be returned.
     */
    extended?: boolean;
    offset?: number;
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface MarketRemoveFromAlbumParams {
    /**
     * ID of an item owner community.
     */
    owner_id: number;
    /**
     * Item ID.
     */
    item_id: number;
    album_ids?: number[] | number;
    [key: string]: any;
}

export interface MarketReorderAlbumsParams {
    /**
     * ID of an item owner community.
     */
    owner_id: number;
    /**
     * Collection ID.
     */
    album_id: number;
    /**
     * ID of a collection to place current collection before it.
     */
    before?: number;
    /**
     * ID of a collection to place current collection after it.
     */
    after?: number;
    [key: string]: any;
}

export interface MarketReorderItemsParams {
    /**
     * ID of an item owner community.
     */
    owner_id: number;
    /**
     * ID of a collection to reorder items in. Set 0 to reorder full items list.
     */
    album_id?: number;
    /**
     * Item ID.
     */
    item_id: number;
    /**
     * ID of an item to place current item before it.
     */
    before?: number;
    /**
     * ID of an item to place current item after it.
     */
    after?: number;
    [key: string]: any;
}

export interface MarketReportParams {
    /**
     * ID of an item owner community.
     */
    owner_id: number;
    /**
     * Item ID.
     */
    item_id: number;
    /**
     * Complaint reason. Possible values: *'0' — spam,, *'1' — child porn,, *'2' — extremism,, *'3' — violence,, *'4' — drugs propaganda,, *'5' — adult materials,, *'6' — insult.
     */
    reason?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    [key: string]: any;
}

export interface MarketReportCommentParams {
    /**
     * ID of an item owner community.
     */
    owner_id: number;
    /**
     * Comment ID.
     */
    comment_id: number;
    /**
     * Complaint reason. Possible values: *'0' — spam,, *'1' — child porn,, *'2' — extremism,, *'3' — violence,, *'4' — drugs propaganda,, *'5' — adult materials,, *'6' — insult.
     */
    reason: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    [key: string]: any;
}

export interface MarketRestoreParams {
    /**
     * ID of an item owner community.
     */
    owner_id: number;
    /**
     * Deleted item ID.
     */
    item_id: number;
    [key: string]: any;
}

export interface MarketRestoreCommentParams {
    /**
     * identifier of an item owner community, "Note that community id in the 'owner_id' parameter should be negative number. For example 'owner_id'=-1 matches the [vk.com/apiclub|VK API] community "
     */
    owner_id: number;
    /**
     * deleted comment id
     */
    comment_id: number;
    [key: string]: any;
}

export interface MarketSearchParams {
    /**
     * ID of an items owner community.
     */
    owner_id: number;
    /**
     * Search query, for example "pink slippers".
     */
    q?: string;
    /**
     * Minimum item price value.
     */
    price_from?: number;
    /**
     * Maximum item price value.
     */
    price_to?: number;
    /**
     * '0' — do not use reverse order, '1' — use reverse order
     */
    rev?: 0 | 1;
    /**
     * Offset needed to return a specific subset of results.
     */
    offset?: number;
    /**
     * Number of items to return.
     */
    count?: number;
    /**
     * '1' – to return additional fields: 'likes, can_comment, car_repost, photos'. By default: '0'.
     */
    extended?: boolean;
    album_id?: number;
    tags?: number[] | number;
    sort?: 0 | 1 | 2 | 3;
    status?: 0 | 2;
    [key: string]: any;
}

export interface MessagesAddChatUserParams {
    /**
     * Chat ID.
     */
    chat_id: number;
    /**
     * ID of the user to be added to the chat.
     */
    user_id?: number;
    [key: string]: any;
}

export interface MessagesAllowMessagesFromGroupParams {
    /**
     * Group ID.
     */
    group_id: number;
    key?: string;
    [key: string]: any;
}

export interface MessagesCreateChatParams {
    /**
     * Chat title.
     */
    title?: string;
    user_ids?: number[] | number;
    [key: string]: any;
}

export interface MessagesDeleteParams {
    /**
     * '1' — to mark message as spam.
     */
    spam?: boolean;
    /**
     * Group ID (for group messages with user access token)
     */
    group_id?: number;
    /**
     * '1' — delete message for for all.
     */
    delete_for_all?: boolean;
    message_ids?: number[] | number;
    [key: string]: any;
}

export interface MessagesDeleteChatPhotoParams {
    /**
     * Chat ID.
     */
    chat_id: number;
    group_id?: number;
    [key: string]: any;
}

export interface MessagesDeleteConversationParams {
    /**
     * User ID. To clear a chat history use 'chat_id'
     */
    user_id?: number;
    /**
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'chat_id', e.g. '2000000001'. For community: '- community ID', e.g. '-12345'. "
     */
    peer_id?: number;
    /**
     * Offset needed to delete a specific subset of conversations.
     */
    offset?: number;
    /**
     * Number of conversations to delete. "NOTE: If the number of messages exceeds the maximum, the method shall be called several times."
     */
    count?: number;
    /**
     * Group ID (for group messages with user access token)
     */
    group_id?: number;
    [key: string]: any;
}

export interface MessagesDenyMessagesFromGroupParams {
    /**
     * Group ID.
     */
    group_id: number;
    [key: string]: any;
}

export interface MessagesEditParams {
    /**
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'chat_id', e.g. '2000000001'. For community: '- community ID', e.g. '-12345'. "
     */
    peer_id: number;
    /**
     * (Required if 'attachments' is not set.) Text of the message.
     */
    message?: string;
    /**
     * Geographical latitude of a check-in, in degrees (from -90 to 90).
     */
    lat?: number;
    /**
     * Geographical longitude of a check-in, in degrees (from -180 to 180).
     */
    long?: number;
    /**
     * (Required if 'message' is not set.) List of objects attached to the message, separated by commas, in the following format: "<owner_id>_<media_id>", '' — Type of media attachment: 'photo' — photo, 'video' — video, 'audio' — audio, 'doc' — document, 'wall' — wall post, '<owner_id>' — ID of the media attachment owner. '<media_id>' — media attachment ID. Example: "photo100172_166443618"
     */
    attachment?: string;
    /**
     * '1' — to keep forwarded, messages.
     */
    keep_forward_messages?: boolean;
    /**
     * '1' — to keep attached snippets.
     */
    keep_snippets?: boolean;
    /**
     * Group ID (for group messages with user access token)
     */
    group_id?: number;
    message_id: number;
    dont_parse_links?: boolean;
    [key: string]: any;
}

export interface MessagesEditChatParams {
    /**
     * Chat ID.
     */
    chat_id: number;
    /**
     * New title of the chat.
     */
    title: string;
    [key: string]: any;
}

export interface MessagesGetByConversationMessageIdParams {
    /**
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'chat_id', e.g. '2000000001'. For community: '- community ID', e.g. '-12345'. "
     */
    peer_id: number;
    /**
     * Information whether the response should be extended
     */
    extended?: boolean;
    /**
     * Group ID (for group messages with group access token)
     */
    group_id?: number;
    conversation_message_ids?: number[] | number;
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface MessagesGetByIdParams {
    /**
     * Number of characters after which to truncate a previewed message. To preview the full message, specify '0'. "NOTE: Messages are not truncated by default. Messages are truncated by words."
     */
    preview_length?: number;
    /**
     * Information whether the response should be extended
     */
    extended?: boolean;
    /**
     * Group ID (for group messages with group access token)
     */
    group_id?: number;
    message_ids?: number[] | number;
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface MessagesGetChatPreviewParams {
    /**
     * Invitation link.
     */
    link?: string;
    peer_id?: number;
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface MessagesGetConversationMembersParams {
    /**
     * Peer ID.
     */
    peer_id: number;
    /**
     * Group ID (for group messages with group access token)
     */
    group_id?: number;
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface MessagesGetConversationsParams {
    /**
     * Offset needed to return a specific subset of conversations.
     */
    offset?: number;
    /**
     * Number of conversations to return.
     */
    count?: number;
    /**
     * Filter to apply: 'all' — all conversations, 'unread' — conversations with unread messages, 'important' — conversations, marked as important (only for community messages), 'unanswered' — conversations, marked as unanswered (only for community messages)
     */
    filter?: "all" | "important" | "message_request" | "unanswered" | "unread";
    /**
     * '1' — return extra information about users and communities
     */
    extended?: boolean;
    /**
     * ID of the message from what to return dialogs.
     */
    start_message_id?: number;
    /**
     * Group ID (for group messages with group access token)
     */
    group_id?: number;
    fields?: Objects.BaseUserGroupFields[];
    [key: string]: any;
}

export interface MessagesGetConversationsByIdParams {
    /**
     * Return extended properties
     */
    extended?: boolean;
    /**
     * Group ID (for group messages with group access token)
     */
    group_id?: number;
    peer_ids?: number[] | number;
    fields?: Objects.BaseUserGroupFields[];
    [key: string]: any;
}

export interface MessagesGetHistoryParams {
    /**
     * Offset needed to return a specific subset of messages.
     */
    offset?: number;
    /**
     * Number of messages to return.
     */
    count?: number;
    /**
     * ID of the user whose message history you want to return.
     */
    user_id?: number;
    /**
     * Starting message ID from which to return history.
     */
    start_message_id?: number;
    /**
     * Sort order: '1' — return messages in chronological order. '0' — return messages in reverse chronological order.
     */
    rev?: 1 | 0;
    /**
     * Information whether the response should be extended
     */
    extended?: boolean;
    /**
     * Group ID (for group messages with group access token)
     */
    group_id?: number;
    peer_id?: number;
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface MessagesGetHistoryAttachmentsParams {
    /**
     * Peer ID. ", For group chat: '2000000000 + chat ID' , , For community: '-community ID'"
     */
    peer_id: number;
    /**
     * Type of media files to return: *'photo',, *'video',, *'audio',, *'doc',, *'link'.,*'market'.,*'wall'.,*'share'
     */
    media_type?: "audio" | "audio_message" | "doc" | "graffiti" | "link" | "market" | "photo" | "share" | "video" | "wall";
    /**
     * Message ID to start return results from.
     */
    start_from?: string;
    /**
     * Number of objects to return.
     */
    count?: number;
    /**
     * '1' — to return photo sizes in a
     */
    photo_sizes?: boolean;
    /**
     * Group ID (for group messages with group access token)
     */
    group_id?: number;
    fields?: Objects.UsersFields[];
    preserve_order?: boolean;
    max_forwards_level?: number;
    [key: string]: any;
}

export interface MessagesGetInviteLinkParams {
    /**
     * Destination ID.
     */
    peer_id: number;
    /**
     * 1 — to generate new link (revoke previous), 0 — to return previous link.
     */
    reset?: boolean;
    /**
     * Group ID
     */
    group_id?: number;
    [key: string]: any;
}

export interface MessagesGetLastActivityParams {
    /**
     * User ID.
     */
    user_id: number;
    [key: string]: any;
}

export interface MessagesGetLongPollHistoryParams {
    /**
     * Last value of the 'ts' parameter returned from the Long Poll server or by using [vk.com/dev/messages.getLongPollHistory|messages.getLongPollHistory] method.
     */
    ts?: number;
    /**
     * Lsat value of 'pts' parameter returned from the Long Poll server or by using [vk.com/dev/messages.getLongPollHistory|messages.getLongPollHistory] method.
     */
    pts?: number;
    /**
     * Number of characters after which to truncate a previewed message. To preview the full message, specify '0'. "NOTE: Messages are not truncated by default. Messages are truncated by words."
     */
    preview_length?: number;
    /**
     * '1' — to return history with online users only.
     */
    onlines?: boolean;
    /**
     * Maximum number of events to return.
     */
    events_limit?: number;
    /**
     * Maximum number of messages to return.
     */
    msgs_limit?: number;
    /**
     * Maximum ID of the message among existing ones in the local copy. Both messages received with API methods (for example, , ), and data received from a Long Poll server (events with code 4) are taken into account.
     */
    max_msg_id?: number;
    /**
     * Group ID (for group messages with user access token)
     */
    group_id?: number;
    fields?: Objects.UsersFields[];
    lp_version?: number;
    last_n?: number;
    credentials?: boolean;
    [key: string]: any;
}

export interface MessagesGetLongPollServerParams {
    /**
     * '1' — to return the 'pts' field, needed for the [vk.com/dev/messages.getLongPollHistory|messages.getLongPollHistory] method.
     */
    need_pts?: boolean;
    /**
     * Group ID (for group messages with user access token)
     */
    group_id?: number;
    /**
     * Long poll version
     */
    lp_version?: number;
    [key: string]: any;
}

export interface MessagesIsMessagesFromGroupAllowedParams {
    /**
     * Group ID.
     */
    group_id: number;
    /**
     * User ID.
     */
    user_id: number;
    [key: string]: any;
}

export interface MessagesJoinChatByInviteLinkParams {
    /**
     * Invitation link.
     */
    link: string;
    [key: string]: any;
}

export interface MessagesMarkAsAnsweredConversationParams {
    /**
     * ID of conversation to mark as important.
     */
    peer_id: number;
    /**
     * '1' — to mark as answered, '0' — to remove the mark
     */
    answered?: boolean;
    /**
     * Group ID (for group messages with group access token)
     */
    group_id?: number;
    [key: string]: any;
}

export interface MessagesMarkAsImportantParams {
    /**
     * '1' — to add a star (mark as important), '0' — to remove the star
     */
    important?: number;
    message_ids?: number[] | number;
    [key: string]: any;
}

export interface MessagesMarkAsImportantConversationParams {
    /**
     * ID of conversation to mark as important.
     */
    peer_id: number;
    /**
     * '1' — to add a star (mark as important), '0' — to remove the star
     */
    important?: boolean;
    /**
     * Group ID (for group messages with group access token)
     */
    group_id?: number;
    [key: string]: any;
}

export interface MessagesMarkAsReadParams {
    /**
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'chat_id', e.g. '2000000001'. For community: '- community ID', e.g. '-12345'. "
     */
    peer_id?: number;
    /**
     * Message ID to start from.
     */
    start_message_id?: number;
    /**
     * Group ID (for group messages with user access token)
     */
    group_id?: number;
    [key: string]: any;
}

export interface MessagesPinParams {
    /**
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'Chat ID', e.g. '2000000001'. For community: '- Community ID', e.g. '-12345'. "
     */
    peer_id: number;
    message_id?: number;
    [key: string]: any;
}

export interface MessagesRemoveChatUserParams {
    /**
     * Chat ID.
     */
    chat_id: number;
    /**
     * ID of the user to be removed from the chat.
     */
    user_id?: number;
    member_id?: number;
    [key: string]: any;
}

export interface MessagesRestoreParams {
    /**
     * ID of a previously-deleted message to restore.
     */
    message_id: number;
    /**
     * Group ID (for group messages with user access token)
     */
    group_id?: number;
    [key: string]: any;
}

export interface MessagesSearchParams {
    /**
     * Search query string.
     */
    q?: string;
    /**
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'chat_id', e.g. '2000000001'. For community: '- community ID', e.g. '-12345'. "
     */
    peer_id?: number;
    /**
     * Date to search message before in Unixtime.
     */
    date?: number;
    /**
     * Number of characters after which to truncate a previewed message. To preview the full message, specify '0'. "NOTE: Messages are not truncated by default. Messages are truncated by words."
     */
    preview_length?: number;
    /**
     * Offset needed to return a specific subset of messages.
     */
    offset?: number;
    /**
     * Number of messages to return.
     */
    count?: number;
    /**
     * Group ID (for group messages with group access token)
     */
    group_id?: number;
    extended?: boolean;
    fields?: string[] | string;
    [key: string]: any;
}

export interface MessagesSearchConversationsParams {
    /**
     * Search query string.
     */
    q?: string;
    /**
     * Maximum number of results.
     */
    count?: number;
    /**
     * '1' — return extra information about users and communities
     */
    extended?: boolean;
    /**
     * Group ID (for group messages with user access token)
     */
    group_id?: number;
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface MessagesSendParams {
    /**
     * User ID (by default — current user).
     */
    user_id?: number;
    /**
     * Unique identifier to avoid resending the message.
     */
    random_id?: number;
    /**
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'chat_id', e.g. '2000000001'. For community: '- community ID', e.g. '-12345'. "
     */
    peer_id?: number;
    /**
     * User's short address (for example, 'illarionov').
     */
    domain?: string;
    /**
     * ID of conversation the message will relate to.
     */
    chat_id?: number;
    /**
     * (Required if 'attachments' is not set.) Text of the message.
     */
    message?: string;
    /**
     * Geographical latitude of a check-in, in degrees (from -90 to 90).
     */
    lat?: number;
    /**
     * Geographical longitude of a check-in, in degrees (from -180 to 180).
     */
    long?: number;
    /**
     * (Required if 'message' is not set.) List of objects attached to the message, separated by commas, in the following format: "<owner_id>_<media_id>", '' — Type of media attachment: 'photo' — photo, 'video' — video, 'audio' — audio, 'doc' — document, 'wall' — wall post, '<owner_id>' — ID of the media attachment owner. '<media_id>' — media attachment ID. Example: "photo100172_166443618"
     */
    attachment?: string;
    /**
     * ID of forwarded messages, separated with a comma. Listed messages of the sender will be shown in the message body at the recipient's. Example: "123,431,544"
     */
    forward_messages?: string;
    /**
     * Sticker id.
     */
    sticker_id?: number;
    /**
     * Group ID (for group messages with group access token)
     */
    group_id?: number;
    user_ids?: number[] | number;
    reply_to?: number;
    keyboard?: Objects.MessagesKeyboard;
    payload?: string;
    dont_parse_links?: boolean;
    disable_mentions?: boolean;
    [key: string]: any;
}

export interface MessagesSetActivityParams {
    /**
     * User ID.
     */
    user_id?: number;
    /**
     * 'typing' — user has started to type.
     */
    type?: string;
    /**
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'chat_id', e.g. '2000000001'. For community: '- community ID', e.g. '-12345'. "
     */
    peer_id?: number;
    /**
     * Group ID (for group messages with group access token)
     */
    group_id?: number;
    [key: string]: any;
}

export interface MessagesSetChatPhotoParams {
    /**
     * Upload URL from the 'response' field returned by the [vk.com/dev/photos.getChatUploadServer|photos.getChatUploadServer] method upon successfully uploading an image.
     */
    file: string;
    [key: string]: any;
}

export interface MessagesUnpinParams {
    peer_id: number;
    group_id?: number;
    [key: string]: any;
}

export interface NewsfeedAddBanParams {
    user_ids?: number[] | number;
    group_ids?: number[] | number;
    [key: string]: any;
}

export interface NewsfeedDeleteBanParams {
    user_ids?: number[] | number;
    group_ids?: number[] | number;
    [key: string]: any;
}

export interface NewsfeedDeleteListParams {
    list_id: number;
    [key: string]: any;
}

export interface NewsfeedGetParams {
    /**
     * '1' — to return news items from banned sources
     */
    return_banned?: boolean;
    /**
     * Earliest timestamp (in Unix time) of a news item to return. By default, 24 hours ago.
     */
    start_time?: number;
    /**
     * Latest timestamp (in Unix time) of a news item to return. By default, the current time.
     */
    end_time?: number;
    /**
     * Maximum number of photos to return. By default, '5'.
     */
    max_photos?: number;
    /**
     * Sources to obtain news from, separated by commas. User IDs can be specified in formats '' or 'u' , where '' is the user's friend ID. Community IDs can be specified in formats '-' or 'g' , where '' is the community ID. If the parameter is not set, all of the user's friends and communities are returned, except for banned sources, which can be obtained with the [vk.com/dev/newsfeed.getBanned|newsfeed.getBanned] method.
     */
    source_ids?: string;
    /**
     * identifier required to get the next page of results. Value for this parameter is returned in 'next_from' field in a reply.
     */
    start_from?: string;
    /**
     * Number of news items to return (default 50, maximum 100). For auto feed, you can use the 'new_offset' parameter returned by this method.
     */
    count?: number;
    filters?: Objects.NewsfeedFilters[];
    fields?: Objects.BaseUserGroupFields[];
    section?: string;
    [key: string]: any;
}

export interface NewsfeedGetBannedParams {
    /**
     * '1' — return extra information about users and communities
     */
    extended?: boolean;
    /**
     * Case for declension of user name and surname: 'nom' — nominative (default), 'gen' — genitive , 'dat' — dative, 'acc' — accusative , 'ins' — instrumental , 'abl' — prepositional
     */
    name_case?: "nom" | "gen" | "dat" | "acc" | "ins" | "abl";
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface NewsfeedGetCommentsParams {
    /**
     * Number of comments to return. For auto feed, you can use the 'new_offset' parameter returned by this method.
     */
    count?: number;
    /**
     * Object ID, comments on repost of which shall be returned, e.g. 'wall1_45486'. (If the parameter is set, the 'filters' parameter is optional.),
     */
    reposts?: string;
    /**
     * Earliest timestamp (in Unix time) of a comment to return. By default, 24 hours ago.
     */
    start_time?: number;
    /**
     * Latest timestamp (in Unix time) of a comment to return. By default, the current time.
     */
    end_time?: number;
    /**
     * Identificator needed to return the next page with results. Value for this parameter returns in 'next_from' field.
     */
    start_from?: string;
    filters?: Objects.NewsfeedCommentsFilters[];
    last_comments_count?: number;
    fields?: Objects.BaseUserGroupFields[];
    [key: string]: any;
}

export interface NewsfeedGetListsParams {
    /**
     * Return additional list info
     */
    extended?: boolean;
    list_ids?: number[] | number;
    [key: string]: any;
}

export interface NewsfeedGetMentionsParams {
    /**
     * Owner ID.
     */
    owner_id?: number;
    /**
     * Earliest timestamp (in Unix time) of a post to return. By default, 24 hours ago.
     */
    start_time?: number;
    /**
     * Latest timestamp (in Unix time) of a post to return. By default, the current time.
     */
    end_time?: number;
    /**
     * Offset needed to return a specific subset of posts.
     */
    offset?: number;
    /**
     * Number of posts to return.
     */
    count?: number;
    [key: string]: any;
}

export interface NewsfeedGetRecommendedParams {
    /**
     * Earliest timestamp (in Unix time) of a news item to return. By default, 24 hours ago.
     */
    start_time?: number;
    /**
     * Latest timestamp (in Unix time) of a news item to return. By default, the current time.
     */
    end_time?: number;
    /**
     * Maximum number of photos to return. By default, '5'.
     */
    max_photos?: number;
    /**
     * 'new_from' value obtained in previous call.
     */
    start_from?: string;
    /**
     * Number of news items to return.
     */
    count?: number;
    fields?: Objects.BaseUserGroupFields[];
    [key: string]: any;
}

export interface NewsfeedGetSuggestedSourcesParams {
    /**
     * offset required to choose a particular subset of communities or users.
     */
    offset?: number;
    /**
     * amount of communities or users to return.
     */
    count?: number;
    /**
     * shuffle the returned list or not.
     */
    shuffle?: boolean;
    fields?: Objects.BaseUserGroupFields[];
    [key: string]: any;
}

export interface NewsfeedIgnoreItemParams {
    /**
     * Item owner's identifier (user or community), "Note that community id must be negative. 'owner_id=1' – user , 'owner_id=-1' – community "
     */
    owner_id: number;
    /**
     * Item identifier
     */
    item_id: number;
    type?: Objects.NewsfeedIgnoreItemType;
    [key: string]: any;
}

export interface NewsfeedSaveListParams {
    /**
     * numeric list identifier (if not sent, will be set automatically).
     */
    list_id?: number;
    /**
     * list name.
     */
    title: string;
    /**
     * reposts display on and off ('1' is for off).
     */
    no_reposts?: boolean;
    source_ids?: number[] | number;
    [key: string]: any;
}

export interface NewsfeedSearchParams {
    /**
     * Search query string (e.g., 'New Year').
     */
    q?: string;
    /**
     * '1' — to return additional information about the user or community that placed the post.
     */
    extended?: boolean;
    /**
     * Number of posts to return.
     */
    count?: number;
    /**
     * Geographical latitude point (in degrees, -90 to 90) within which to search.
     */
    latitude?: number;
    /**
     * Geographical longitude point (in degrees, -180 to 180) within which to search.
     */
    longitude?: number;
    /**
     * Earliest timestamp (in Unix time) of a news item to return. By default, 24 hours ago.
     */
    start_time?: number;
    /**
     * Latest timestamp (in Unix time) of a news item to return. By default, the current time.
     */
    end_time?: number;
    start_from?: string;
    fields?: Objects.BaseUserGroupFields[];
    [key: string]: any;
}

export interface NewsfeedUnignoreItemParams {
    /**
     * Item owner's identifier (user or community), "Note that community id must be negative. 'owner_id=1' – user , 'owner_id=-1' – community "
     */
    owner_id: number;
    /**
     * Item identifier
     */
    item_id: number;
    type?: Objects.NewsfeedIgnoreItemType;
    [key: string]: any;
}

export interface NewsfeedUnsubscribeParams {
    /**
     * Type of object from which to unsubscribe: 'note' — note, 'photo' — photo, 'post' — post on user wall or community wall, 'topic' — topic, 'video' — video
     */
    type: "note" | "photo" | "post" | "topic" | "video";
    /**
     * Object owner ID.
     */
    owner_id?: number;
    /**
     * Object ID.
     */
    item_id: number;
    [key: string]: any;
}

export interface NotesAddParams {
    /**
     * Note title.
     */
    title: string;
    /**
     * Note text.
     */
    text: string;
    privacy_view?: string[] | string;
    privacy_comment?: string[] | string;
    [key: string]: any;
}

export interface NotesCreateCommentParams {
    /**
     * Note ID.
     */
    note_id: number;
    /**
     * Note owner ID.
     */
    owner_id?: number;
    /**
     * ID of the user to whom the reply is addressed (if the comment is a reply to another comment).
     */
    reply_to?: number;
    /**
     * Comment text.
     */
    message: string;
    guid?: string;
    [key: string]: any;
}

export interface NotesDeleteParams {
    /**
     * Note ID.
     */
    note_id: number;
    [key: string]: any;
}

export interface NotesDeleteCommentParams {
    /**
     * Comment ID.
     */
    comment_id: number;
    /**
     * Note owner ID.
     */
    owner_id?: number;
    [key: string]: any;
}

export interface NotesEditParams {
    /**
     * Note ID.
     */
    note_id: number;
    /**
     * Note title.
     */
    title: string;
    /**
     * Note text.
     */
    text: string;
    privacy_view?: string[] | string;
    privacy_comment?: string[] | string;
    [key: string]: any;
}

export interface NotesEditCommentParams {
    /**
     * Comment ID.
     */
    comment_id: number;
    /**
     * Note owner ID.
     */
    owner_id?: number;
    /**
     * New comment text.
     */
    message: string;
    [key: string]: any;
}

export interface NotesGetParams {
    /**
     * Note owner ID.
     */
    user_id?: number;
    /**
     * Number of notes to return.
     */
    count?: number;
    note_ids?: number[] | number;
    offset?: number;
    sort?: 0 | 1;
    [key: string]: any;
}

export interface NotesGetByIdParams {
    /**
     * Note ID.
     */
    note_id: number;
    /**
     * Note owner ID.
     */
    owner_id?: number;
    need_wiki?: boolean;
    [key: string]: any;
}

export interface NotesGetCommentsParams {
    /**
     * Note ID.
     */
    note_id: number;
    /**
     * Note owner ID.
     */
    owner_id?: number;
    /**
     * Number of comments to return.
     */
    count?: number;
    sort?: 0 | 1;
    offset?: number;
    [key: string]: any;
}

export interface NotesRestoreCommentParams {
    /**
     * Comment ID.
     */
    comment_id: number;
    /**
     * Note owner ID.
     */
    owner_id?: number;
    [key: string]: any;
}

export interface NotificationsGetParams {
    /**
     * Number of notifications to return.
     */
    count?: number;
    /**
     * Earliest timestamp (in Unix time) of a notification to return. By default, 24 hours ago.
     */
    start_time?: number;
    /**
     * Latest timestamp (in Unix time) of a notification to return. By default, the current time.
     */
    end_time?: number;
    start_from?: string;
    filters?: ("wall" | "mentions" | "comments" | "likes" | "reposted" | "followers" | "friends")[] | ("wall" | "mentions" | "comments" | "likes" | "reposted" | "followers" | "friends");
    [key: string]: any;
}

export interface NotificationsMarkAsViewedParams {
    [key: string]: any;
}

export interface OrdersCancelSubscriptionParams {
    user_id: number;
    subscription_id: number;
    pending_cancel?: boolean;
    [key: string]: any;
}

export interface OrdersChangeStateParams {
    /**
     * order ID.
     */
    order_id: number;
    /**
     * action to be done with the order. Available actions: *cancel — to cancel unconfirmed order. *charge — to confirm unconfirmed order. Applies only if processing of [vk.com/dev/payments_status|order_change_state] notification failed. *refund — to cancel confirmed order.
     */
    action: "cancel" | "charge" | "refund";
    /**
     * internal ID of the order in the application.
     */
    app_order_id?: number;
    /**
     * if this parameter is set to 1, this method returns a list of test mode orders. By default — 0.
     */
    test_mode?: boolean;
    [key: string]: any;
}

export interface OrdersGetParams {
    /**
     * number of returned orders.
     */
    count?: number;
    /**
     * if this parameter is set to 1, this method returns a list of test mode orders. By default — 0.
     */
    test_mode?: boolean;
    offset?: number;
    [key: string]: any;
}

export interface OrdersGetAmountParams {
    user_id: number;
    votes?: string[] | string;
    [key: string]: any;
}

export interface OrdersGetByIdParams {
    /**
     * order ID.
     */
    order_id?: number;
    /**
     * if this parameter is set to 1, this method returns a list of test mode orders. By default — 0.
     */
    test_mode?: boolean;
    order_ids?: number[] | number;
    [key: string]: any;
}

export interface OrdersGetUserSubscriptionByIdParams {
    user_id: number;
    subscription_id: number;
    [key: string]: any;
}

export interface OrdersGetUserSubscriptionsParams {
    user_id: number;
    [key: string]: any;
}

export interface OrdersUpdateSubscriptionParams {
    user_id: number;
    subscription_id: number;
    price: number;
    [key: string]: any;
}

export interface PagesClearCacheParams {
    /**
     * Address of the page where you need to refesh the cached version
     */
    url: string;
    [key: string]: any;
}

export interface PagesGetParams {
    /**
     * Page owner ID.
     */
    owner_id?: number;
    /**
     * Wiki page ID.
     */
    page_id?: number;
    /**
     * '1' — to return information about a global wiki page
     */
    global?: boolean;
    /**
     * '1' — resulting wiki page is a preview for the attached link
     */
    site_preview?: boolean;
    /**
     * Wiki page title.
     */
    title?: string;
    /**
     * '1' — to return the page as HTML,
     */
    need_html?: boolean;
    need_source?: boolean;
    [key: string]: any;
}

export interface PagesGetHistoryParams {
    /**
     * Wiki page ID.
     */
    page_id: number;
    /**
     * ID of the community that owns the wiki page.
     */
    group_id?: number;
    user_id?: number;
    [key: string]: any;
}

export interface PagesGetTitlesParams {
    /**
     * ID of the community that owns the wiki page.
     */
    group_id?: number;
    [key: string]: any;
}

export interface PagesGetVersionParams {
    /**
     * ID of the community that owns the wiki page.
     */
    group_id?: number;
    /**
     * '1' — to return the page as HTML
     */
    need_html?: boolean;
    version_id: number;
    user_id?: number;
    [key: string]: any;
}

export interface PagesParseWikiParams {
    /**
     * Text of the wiki page.
     */
    text: string;
    /**
     * ID of the group in the context of which this markup is interpreted.
     */
    group_id?: number;
    [key: string]: any;
}

export interface PagesSaveParams {
    /**
     * Text of the wiki page in wiki-format.
     */
    text?: string;
    /**
     * Wiki page ID. The 'title' parameter can be passed instead of 'pid'.
     */
    page_id?: number;
    /**
     * ID of the community that owns the wiki page.
     */
    group_id?: number;
    /**
     * User ID
     */
    user_id?: number;
    /**
     * Wiki page title.
     */
    title?: string;
    [key: string]: any;
}

export interface PagesSaveAccessParams {
    /**
     * Wiki page ID.
     */
    page_id: number;
    /**
     * ID of the community that owns the wiki page.
     */
    group_id?: number;
    /**
     * Who can view the wiki page: '1' — only community members, '2' — all users can view the page, '0' — only community managers
     */
    view?: 0 | 1 | 2;
    /**
     * Who can edit the wiki page: '1' — only community members, '2' — all users can edit the page, '0' — only community managers
     */
    edit?: 0 | 1 | 2;
    user_id?: number;
    [key: string]: any;
}

export interface PhotosConfirmTagParams {
    /**
     * ID of the user or community that owns the photo.
     */
    owner_id?: number;
    /**
     * Photo ID.
     */
    photo_id: string;
    /**
     * Tag ID.
     */
    tag_id: number;
    [key: string]: any;
}

export interface PhotosCopyParams {
    /**
     * photo's owner ID
     */
    owner_id: number;
    /**
     * photo ID
     */
    photo_id: number;
    /**
     * for private photos
     */
    access_key?: string;
    [key: string]: any;
}

export interface PhotosCreateAlbumParams {
    /**
     * Album title.
     */
    title: string;
    /**
     * ID of the community in which the album will be created.
     */
    group_id?: number;
    /**
     * Album description.
     */
    description?: string;
    privacy_view?: string[] | string;
    privacy_comment?: string[] | string;
    upload_by_admins_only?: boolean;
    comments_disabled?: boolean;
    [key: string]: any;
}

export interface PhotosCreateCommentParams {
    /**
     * ID of the user or community that owns the photo.
     */
    owner_id?: number;
    /**
     * Photo ID.
     */
    photo_id: number;
    /**
     * Comment text.
     */
    message?: string;
    /**
     * '1' — to post a comment from the community
     */
    from_group?: boolean;
    attachments?: string[] | string;
    reply_to_comment?: number;
    sticker_id?: number;
    access_key?: string;
    guid?: string;
    [key: string]: any;
}

export interface PhotosDeleteParams {
    /**
     * ID of the user or community that owns the photo.
     */
    owner_id?: number;
    /**
     * Photo ID.
     */
    photo_id: number;
    [key: string]: any;
}

export interface PhotosDeleteAlbumParams {
    /**
     * Album ID.
     */
    album_id: number;
    /**
     * ID of the community that owns the album.
     */
    group_id?: number;
    [key: string]: any;
}

export interface PhotosDeleteCommentParams {
    /**
     * ID of the user or community that owns the photo.
     */
    owner_id?: number;
    /**
     * Comment ID.
     */
    comment_id: number;
    [key: string]: any;
}

export interface PhotosEditParams {
    /**
     * ID of the user or community that owns the photo.
     */
    owner_id?: number;
    /**
     * Photo ID.
     */
    photo_id: number;
    /**
     * New caption for the photo. If this parameter is not set, it is considered to be equal to an empty string.
     */
    caption?: string;
    latitude?: number;
    longitude?: number;
    place_str?: string;
    foursquare_id?: string;
    delete_place?: boolean;
    [key: string]: any;
}

export interface PhotosEditAlbumParams {
    /**
     * ID of the photo album to be edited.
     */
    album_id: number;
    /**
     * New album title.
     */
    title?: string;
    /**
     * New album description.
     */
    description?: string;
    /**
     * ID of the user or community that owns the album.
     */
    owner_id?: number;
    privacy_view?: string[] | string;
    privacy_comment?: string[] | string;
    upload_by_admins_only?: boolean;
    comments_disabled?: boolean;
    [key: string]: any;
}

export interface PhotosEditCommentParams {
    /**
     * ID of the user or community that owns the photo.
     */
    owner_id?: number;
    /**
     * Comment ID.
     */
    comment_id: number;
    /**
     * New text of the comment.
     */
    message?: string;
    attachments?: string[] | string;
    [key: string]: any;
}

export interface PhotosGetParams {
    /**
     * ID of the user or community that owns the photos. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * Photo album ID. To return information about photos from service albums, use the following string values: 'profile, wall, saved'.
     */
    album_id?: string;
    /**
     * Sort order: '1' — reverse chronological, '0' — chronological
     */
    rev?: boolean;
    /**
     * '1' — to return additional 'likes', 'comments', and 'tags' fields, '0' — (default)
     */
    extended?: boolean;
    /**
     * Type of feed obtained in 'feed' field of the method.
     */
    feed_type?: string;
    /**
     * unixtime, that can be obtained with [vk.com/dev/newsfeed.get|newsfeed.get] method in date field to get all photos uploaded by the user on a specific day, or photos the user has been tagged on. Also, 'uid' parameter of the user the event happened with shall be specified.
     */
    feed?: number;
    /**
     * '1' — to return photo sizes in a [vk.com/dev/photo_sizes|special format]
     */
    photo_sizes?: boolean;
    photo_ids?: string[] | string;
    offset?: number;
    count?: number;
    [key: string]: any;
}

export interface PhotosGetAlbumsParams {
    /**
     * ID of the user or community that owns the albums.
     */
    owner_id?: number;
    /**
     * Offset needed to return a specific subset of albums.
     */
    offset?: number;
    /**
     * Number of albums to return.
     */
    count?: number;
    /**
     * '1' — to return system albums with negative IDs
     */
    need_system?: boolean;
    /**
     * '1' — to return an additional 'thumb_src' field, '0' — (default)
     */
    need_covers?: boolean;
    /**
     * '1' — to return photo sizes in a
     */
    photo_sizes?: boolean;
    album_ids?: number[] | number;
    [key: string]: any;
}

export interface PhotosGetAlbumsCountParams {
    /**
     * User ID.
     */
    user_id?: number;
    /**
     * Community ID.
     */
    group_id?: number;
    [key: string]: any;
}

export interface PhotosGetAllParams {
    /**
     * ID of a user or community that owns the photos. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * '1' — to return detailed information about photos
     */
    extended?: boolean;
    /**
     * Offset needed to return a specific subset of photos. By default, '0'.
     */
    offset?: number;
    /**
     * Number of photos to return.
     */
    count?: number;
    /**
     * '1' – to return image sizes in [vk.com/dev/photo_sizes|special format].
     */
    photo_sizes?: boolean;
    /**
     * '1' – to return photos only from standard albums, '0' – to return all photos including those in service albums, e.g., 'My wall photos' (default)
     */
    no_service_albums?: boolean;
    /**
     * '1' – to show information about photos being hidden from the block above the wall.
     */
    need_hidden?: boolean;
    /**
     * '1' – not to return photos being hidden from the block above the wall. Works only with owner_id>0, no_service_albums is ignored.
     */
    skip_hidden?: boolean;
    [key: string]: any;
}

export interface PhotosGetAllCommentsParams {
    /**
     * ID of the user or community that owns the album(s).
     */
    owner_id?: number;
    /**
     * Album ID. If the parameter is not set, comments on all of the user's albums will be returned.
     */
    album_id?: number;
    /**
     * '1' — to return an additional 'likes' field, '0' — (default)
     */
    need_likes?: boolean;
    /**
     * Offset needed to return a specific subset of comments. By default, '0'.
     */
    offset?: number;
    /**
     * Number of comments to return. By default, '20'. Maximum value, '100'.
     */
    count?: number;
    [key: string]: any;
}

export interface PhotosGetByIdParams {
    /**
     * '1' — to return additional fields, '0' — (default)
     */
    extended?: boolean;
    /**
     * '1' — to return photo sizes in a
     */
    photo_sizes?: boolean;
    photos?: string[] | string;
    [key: string]: any;
}

export interface PhotosGetChatUploadServerParams {
    /**
     * ID of the chat for which you want to upload a cover photo.
     */
    chat_id: number;
    /**
     * Width (in pixels) of the photo after cropping.
     */
    crop_width?: number;
    crop_x?: number;
    crop_y?: number;
    [key: string]: any;
}

export interface PhotosGetCommentsParams {
    /**
     * ID of the user or community that owns the photo.
     */
    owner_id?: number;
    /**
     * Photo ID.
     */
    photo_id: number;
    /**
     * '1' — to return an additional 'likes' field, '0' — (default)
     */
    need_likes?: boolean;
    /**
     * Offset needed to return a specific subset of comments. By default, '0'.
     */
    offset?: number;
    /**
     * Number of comments to return.
     */
    count?: number;
    /**
     * Sort order: 'asc' — old first, 'desc' — new first
     */
    sort?: "asc" | "desc";
    start_comment_id?: number;
    access_key?: string;
    extended?: boolean;
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface PhotosGetMarketAlbumUploadServerParams {
    /**
     * Community ID.
     */
    group_id: number;
    [key: string]: any;
}

export interface PhotosGetMarketUploadServerParams {
    /**
     * Community ID.
     */
    group_id: number;
    /**
     * '1' if you want to upload the main item photo.
     */
    main_photo?: boolean;
    /**
     * X coordinate of the crop left upper corner.
     */
    crop_x?: number;
    /**
     * Y coordinate of the crop left upper corner.
     */
    crop_y?: number;
    /**
     * Width of the cropped photo in px.
     */
    crop_width?: number;
    [key: string]: any;
}

export interface PhotosGetMessagesUploadServerParams {
    /**
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'Chat ID', e.g. '2000000001'. For community: '- Community ID', e.g. '-12345'. "
     */
    peer_id?: number;
    [key: string]: any;
}

export interface PhotosGetNewTagsParams {
    /**
     * Offset needed to return a specific subset of photos.
     */
    offset?: number;
    /**
     * Number of photos to return.
     */
    count?: number;
    [key: string]: any;
}

export interface PhotosGetOwnerCoverPhotoUploadServerParams {
    /**
     * ID of community that owns the album (if the photo will be uploaded to a community album).
     */
    group_id: number;
    /**
     * X coordinate of the left-upper corner
     */
    crop_x?: number;
    /**
     * Y coordinate of the left-upper corner
     */
    crop_y?: number;
    /**
     * X coordinate of the right-bottom corner
     */
    crop_x2?: number;
    /**
     * Y coordinate of the right-bottom corner
     */
    crop_y2?: number;
    [key: string]: any;
}

export interface PhotosGetOwnerPhotoUploadServerParams {
    /**
     * identifier of a community or current user. "Note that community id must be negative. 'owner_id=1' – user, 'owner_id=-1' – community, "
     */
    owner_id?: number;
    [key: string]: any;
}

export interface PhotosGetTagsParams {
    /**
     * ID of the user or community that owns the photo.
     */
    owner_id?: number;
    /**
     * Photo ID.
     */
    photo_id: number;
    access_key?: string;
    [key: string]: any;
}

export interface PhotosGetUploadServerParams {
    /**
     * ID of community that owns the album (if the photo will be uploaded to a community album).
     */
    group_id?: number;
    album_id?: number;
    [key: string]: any;
}

export interface PhotosGetUserPhotosParams {
    /**
     * User ID.
     */
    user_id?: number;
    /**
     * Offset needed to return a specific subset of photos. By default, '0'.
     */
    offset?: number;
    /**
     * Number of photos to return. Maximum value is 1000.
     */
    count?: number;
    /**
     * '1' — to return an additional 'likes' field, '0' — (default)
     */
    extended?: boolean;
    /**
     * Sort order: '1' — by date the tag was added in ascending order, '0' — by date the tag was added in descending order
     */
    sort?: string;
    [key: string]: any;
}

export interface PhotosGetWallUploadServerParams {
    /**
     * ID of community to whose wall the photo will be uploaded.
     */
    group_id?: number;
    [key: string]: any;
}

export interface PhotosMakeCoverParams {
    /**
     * ID of the user or community that owns the photo.
     */
    owner_id?: number;
    /**
     * Photo ID.
     */
    photo_id: number;
    /**
     * Album ID.
     */
    album_id?: number;
    [key: string]: any;
}

export interface PhotosMoveParams {
    /**
     * ID of the user or community that owns the photo.
     */
    owner_id?: number;
    /**
     * ID of the album to which the photo will be moved.
     */
    target_album_id: number;
    /**
     * Photo ID.
     */
    photo_id: number;
    [key: string]: any;
}

export interface PhotosPutTagParams {
    /**
     * ID of the user or community that owns the photo.
     */
    owner_id?: number;
    /**
     * Photo ID.
     */
    photo_id: number;
    /**
     * ID of the user to be tagged.
     */
    user_id: number;
    /**
     * Upper left-corner coordinate of the tagged area (as a percentage of the photo's width).
     */
    x?: number;
    /**
     * Upper left-corner coordinate of the tagged area (as a percentage of the photo's height).
     */
    y?: number;
    /**
     * Lower right-corner coordinate of the tagged area (as a percentage of the photo's width).
     */
    x2?: number;
    /**
     * Lower right-corner coordinate of the tagged area (as a percentage of the photo's height).
     */
    y2?: number;
    [key: string]: any;
}

export interface PhotosRemoveTagParams {
    /**
     * ID of the user or community that owns the photo.
     */
    owner_id?: number;
    /**
     * Photo ID.
     */
    photo_id: number;
    /**
     * Tag ID.
     */
    tag_id: number;
    [key: string]: any;
}

export interface PhotosReorderAlbumsParams {
    /**
     * ID of the user or community that owns the album.
     */
    owner_id?: number;
    /**
     * Album ID.
     */
    album_id: number;
    /**
     * ID of the album before which the album in question shall be placed.
     */
    before?: number;
    /**
     * ID of the album after which the album in question shall be placed.
     */
    after?: number;
    [key: string]: any;
}

export interface PhotosReorderPhotosParams {
    /**
     * ID of the user or community that owns the photo.
     */
    owner_id?: number;
    /**
     * Photo ID.
     */
    photo_id: number;
    /**
     * ID of the photo before which the photo in question shall be placed.
     */
    before?: number;
    /**
     * ID of the photo after which the photo in question shall be placed.
     */
    after?: number;
    [key: string]: any;
}

export interface PhotosReportParams {
    /**
     * ID of the user or community that owns the photo.
     */
    owner_id: number;
    /**
     * Photo ID.
     */
    photo_id: number;
    /**
     * Reason for the complaint: '0' – spam, '1' – child pornography, '2' – extremism, '3' – violence, '4' – drug propaganda, '5' – adult material, '6' – insult, abuse
     */
    reason?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    [key: string]: any;
}

export interface PhotosReportCommentParams {
    /**
     * ID of the user or community that owns the photo.
     */
    owner_id: number;
    /**
     * ID of the comment being reported.
     */
    comment_id: number;
    /**
     * Reason for the complaint: '0' – spam, '1' – child pornography, '2' – extremism, '3' – violence, '4' – drug propaganda, '5' – adult material, '6' – insult, abuse
     */
    reason?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    [key: string]: any;
}

export interface PhotosRestoreParams {
    /**
     * ID of the user or community that owns the photo.
     */
    owner_id?: number;
    /**
     * Photo ID.
     */
    photo_id: number;
    [key: string]: any;
}

export interface PhotosRestoreCommentParams {
    /**
     * ID of the user or community that owns the photo.
     */
    owner_id?: number;
    /**
     * ID of the deleted comment.
     */
    comment_id: number;
    [key: string]: any;
}

export interface PhotosSaveParams {
    /**
     * ID of the album to save photos to.
     */
    album_id?: number;
    /**
     * ID of the community to save photos to.
     */
    group_id?: number;
    /**
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
     */
    server?: number;
    /**
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
     */
    photos_list?: string;
    /**
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
     */
    hash?: string;
    /**
     * Geographical latitude, in degrees (from '-90' to '90').
     */
    latitude?: number;
    /**
     * Geographical longitude, in degrees (from '-180' to '180').
     */
    longitude?: number;
    /**
     * Text describing the photo. 2048 digits max.
     */
    caption?: string;
    [key: string]: any;
}

export interface PhotosSaveMarketAlbumPhotoParams {
    /**
     * Community ID.
     */
    group_id: number;
    /**
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
     */
    photo: string;
    /**
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
     */
    server: number;
    /**
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
     */
    hash: string;
    [key: string]: any;
}

export interface PhotosSaveMarketPhotoParams {
    /**
     * Community ID.
     */
    group_id?: number;
    /**
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
     */
    photo: string;
    /**
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
     */
    server: number;
    /**
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
     */
    hash: string;
    /**
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
     */
    crop_data?: string;
    /**
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
     */
    crop_hash?: string;
    [key: string]: any;
}

export interface PhotosSaveMessagesPhotoParams {
    /**
     * Parameter returned when the photo is [vk.com/dev/upload_files|uploaded to the server].
     */
    photo: string;
    server?: number;
    hash?: string;
    [key: string]: any;
}

export interface PhotosSaveOwnerCoverPhotoParams {
    /**
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
     */
    hash: string;
    /**
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
     */
    photo: string;
    [key: string]: any;
}

export interface PhotosSaveOwnerPhotoParams {
    /**
     * parameter returned after [vk.com/dev/upload_files|photo upload].
     */
    server?: string;
    /**
     * parameter returned after [vk.com/dev/upload_files|photo upload].
     */
    hash?: string;
    /**
     * parameter returned after [vk.com/dev/upload_files|photo upload].
     */
    photo?: string;
    [key: string]: any;
}

export interface PhotosSaveWallPhotoParams {
    /**
     * ID of the user on whose wall the photo will be saved.
     */
    user_id?: number;
    /**
     * ID of community on whose wall the photo will be saved.
     */
    group_id?: number;
    /**
     * Parameter returned when the the photo is [vk.com/dev/upload_files|uploaded to the server].
     */
    photo: string;
    /**
     * Geographical latitude, in degrees (from '-90' to '90').
     */
    latitude?: number;
    /**
     * Geographical longitude, in degrees (from '-180' to '180').
     */
    longitude?: number;
    /**
     * Text describing the photo. 2048 digits max.
     */
    caption?: string;
    server?: number;
    hash?: string;
    [key: string]: any;
}

export interface PhotosSearchParams {
    /**
     * Search query string.
     */
    q?: string;
    /**
     * Geographical latitude, in degrees (from '-90' to '90').
     */
    lat?: number;
    /**
     * Geographical longitude, in degrees (from '-180' to '180').
     */
    long?: number;
    /**
     * Sort order:
     */
    sort?: number;
    /**
     * Offset needed to return a specific subset of photos.
     */
    offset?: number;
    /**
     * Number of photos to return.
     */
    count?: number;
    /**
     * Radius of search in meters (works very approximately). Available values: '10', '100', '800', '6000', '50000'.
     */
    radius?: number;
    start_time?: number;
    end_time?: number;
    [key: string]: any;
}

export interface PollsAddVoteParams {
    /**
     * ID of the user or community that owns the poll. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * Poll ID.
     */
    poll_id: number;
    answer_ids?: number[] | number;
    is_board?: boolean;
    [key: string]: any;
}

export interface PollsCreateParams {
    /**
     * question text
     */
    question?: string;
    /**
     * '1' – anonymous poll, participants list is hidden,, '0' – public poll, participants list is available,, Default value is '0'.
     */
    is_anonymous?: boolean;
    /**
     * If a poll will be added to a communty it is required to send a negative group identifier. Current user by default.
     */
    owner_id?: number;
    /**
     * available answers list, for example: " ["yes","no","maybe"]", There can be from 1 to 10 answers.
     */
    add_answers?: string;
    is_multiple?: boolean;
    end_date?: number;
    photo_id?: number;
    background_id?: "1" | "2" | "3" | "4" | "6" | "8" | "9";
    [key: string]: any;
}

export interface PollsDeleteVoteParams {
    /**
     * ID of the user or community that owns the poll. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * Poll ID.
     */
    poll_id: number;
    /**
     * Answer ID.
     */
    answer_id: number;
    is_board?: boolean;
    [key: string]: any;
}

export interface PollsEditParams {
    /**
     * poll owner id
     */
    owner_id?: number;
    /**
     * edited poll's id
     */
    poll_id: number;
    /**
     * new question text
     */
    question?: string;
    /**
     * answers list, for example: , "["yes","no","maybe"]"
     */
    add_answers?: string;
    /**
     * object containing answers that need to be edited,, key – answer id, value – new answer text. Example: {"382967099":"option1", "382967103":"option2"}"
     */
    edit_answers?: string;
    /**
     * list of answer ids to be deleted. For example: "[382967099, 382967103]"
     */
    delete_answers?: string;
    end_date?: number;
    photo_id?: number;
    background_id?: "0" | "1" | "2" | "3" | "4" | "6" | "8" | "9";
    [key: string]: any;
}

export interface PollsGetByIdParams {
    /**
     * ID of the user or community that owns the poll. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * '1' – poll is in a board, '0' – poll is on a wall. '0' by default.
     */
    is_board?: boolean;
    /**
     * Poll ID.
     */
    poll_id: number;
    extended?: boolean;
    friends_count?: number;
    fields?: string[] | string;
    name_case?: "abl" | "acc" | "dat" | "gen" | "ins" | "nom";
    [key: string]: any;
}

export interface PollsGetVotersParams {
    /**
     * ID of the user or community that owns the poll. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * Poll ID.
     */
    poll_id: number;
    /**
     * '1' — to return only current user's friends, '0' — to return all users (default),
     */
    friends_only?: boolean;
    /**
     * Offset needed to return a specific subset of voters. '0' — (default)
     */
    offset?: number;
    /**
     * Number of user IDs to return (if the 'friends_only' parameter is not set, maximum '1000', otherwise '10'). '100' — (default)
     */
    count?: number;
    /**
     * Case for declension of user name and surname: , 'nom' — nominative (default) , 'gen' — genitive , 'dat' — dative , 'acc' — accusative , 'ins' — instrumental , 'abl' — prepositional
     */
    name_case?: "nom" | "gen" | "dat" | "acc" | "ins" | "abl";
    answer_ids?: number[] | number;
    is_board?: boolean;
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface PrettyCardsCreateParams {
    owner_id: number;
    photo: string;
    title: string;
    link: string;
    price?: string;
    price_old?: string;
    button?: string;
    [key: string]: any;
}

export interface PrettyCardsDeleteParams {
    owner_id: number;
    card_id: number;
    [key: string]: any;
}

export interface PrettyCardsEditParams {
    owner_id: number;
    card_id: number;
    photo?: string;
    title?: string;
    link?: string;
    price?: string;
    price_old?: string;
    button?: string;
    [key: string]: any;
}

export interface PrettyCardsGetParams {
    owner_id: number;
    offset?: number;
    count?: number;
    [key: string]: any;
}

export interface PrettyCardsGetByIdParams {
    owner_id: number;
    card_ids?: number[] | number;
    [key: string]: any;
}

export interface PrettyCardsGetUploadURLParams {
    [key: string]: any;
}

export interface SearchGetHintsParams {
    /**
     * Search query string.
     */
    q?: string;
    /**
     * Offset for querying specific result subset
     */
    offset?: number;
    /**
     * Maximum number of results to return.
     */
    limit?: number;
    filters?: string[] | string;
    fields?: string[] | string;
    search_global?: boolean;
    [key: string]: any;
}

export interface SecureAddAppEventParams {
    /**
     * ID of a user to save the data
     */
    user_id: number;
    /**
     * there are 2 default activities: , * 1 – level. Works similar to ,, * 2 – points, saves points amount, Any other value is for saving completed missions
     */
    activity_id: number;
    /**
     * depends on activity_id: * 1 – number, current level number,, * 2 – number, current user's points amount, , Any other value is ignored
     */
    value?: number;
    [key: string]: any;
}

export interface SecureCheckTokenParams {
    /**
     * client 'access_token'
     */
    token?: string;
    /**
     * user 'ip address'. Note that user may access using the 'ipv6' address, in this case it is required to transmit the 'ipv6' address. If not transmitted, the address will not be checked.
     */
    ip?: string;
    [key: string]: any;
}

export interface SecureGetAppBalanceParams {
    [key: string]: any;
}

export interface SecureGetSMSHistoryParams {
    /**
     * filter by start date. It is set as UNIX-time.
     */
    date_from?: number;
    /**
     * filter by end date. It is set as UNIX-time.
     */
    date_to?: number;
    /**
     * number of returned posts. By default — 1000.
     */
    limit?: number;
    user_id?: number;
    [key: string]: any;
}

export interface SecureGetTransactionsHistoryParams {
    type?: number;
    uid_from?: number;
    uid_to?: number;
    date_from?: number;
    date_to?: number;
    limit?: number;
    [key: string]: any;
}

export interface SecureGetUserLevelParams {
    user_ids?: number[] | number;
    [key: string]: any;
}

export interface SecureGiveEventStickerParams {
    user_ids?: number[] | number;
    achievement_id: number;
    [key: string]: any;
}

export interface SecureSendNotificationParams {
    /**
     * notification text which should be sent in 'UTF-8' encoding ('254' characters maximum).
     */
    message: string;
    user_ids?: number[] | number;
    user_id?: number;
    [key: string]: any;
}

export interface SecureSendSMSNotificationParams {
    /**
     * ID of the user to whom SMS notification is sent. The user shall allow the application to send him/her notifications (, +1).
     */
    user_id: number;
    /**
     * 'SMS' text to be sent in 'UTF-8' encoding. Only Latin letters and numbers are allowed. Maximum size is '160' characters.
     */
    message: string;
    [key: string]: any;
}

export interface SecureSetCounterParams {
    /**
     * counter value.
     */
    counter?: number;
    counters?: string[] | string;
    user_id?: number;
    increment?: boolean;
    [key: string]: any;
}

export interface StatsGetParams {
    /**
     * Community ID.
     */
    group_id?: number;
    /**
     * Application ID.
     */
    app_id?: number;
    timestamp_from?: number;
    timestamp_to?: number;
    interval?: string;
    intervals_count?: number;
    filters?: string[] | string;
    stats_groups?: string[] | string;
    extended?: boolean;
    [key: string]: any;
}

export interface StatsGetPostReachParams {
    /**
     * post owner community id. Specify with "-" sign.
     */
    owner_id: string;
    /**
     * wall post id. Note that stats are available only for '300' last (newest) posts on a community wall.
     */
    post_id: number;
    [key: string]: any;
}

export interface StatsTrackVisitorParams {
    id: string;
    [key: string]: any;
}

export interface StatusGetParams {
    /**
     * User ID or community ID. Use a negative value to designate a community ID.
     */
    user_id?: number;
    group_id?: number;
    [key: string]: any;
}

export interface StatusSetParams {
    /**
     * Text of the new status.
     */
    text?: string;
    /**
     * Identifier of a community to set a status in. If left blank the status is set to current user.
     */
    group_id?: number;
    [key: string]: any;
}

export interface StorageGetParams {
    key?: string;
    keys?: string[] | string;
    user_id?: number;
    global?: boolean;
    [key: string]: any;
}

export interface StorageGetKeysParams {
    /**
     * user id, whose variables names are returned if they were requested with a server method.
     */
    user_id?: number;
    /**
     * amount of variable names the info needs to be collected from.
     */
    count?: number;
    global?: boolean;
    offset?: number;
    [key: string]: any;
}

export interface StorageSetParams {
    key: string;
    value?: string;
    user_id?: number;
    global?: boolean;
    [key: string]: any;
}

export interface StoriesBanOwnerParams {
    owners_ids?: number[] | number;
    [key: string]: any;
}

export interface StoriesDeleteParams {
    /**
     * Story owner's ID. Current user id is used by default.
     */
    owner_id: number;
    /**
     * Story ID.
     */
    story_id: number;
    [key: string]: any;
}

export interface StoriesGetParams {
    /**
     * Owner ID.
     */
    owner_id?: number;
    /**
     * '1' — to return additional fields for users and communities. Default value is 0.
     */
    extended?: boolean;
    [key: string]: any;
}

export interface StoriesGetBannedParams {
    /**
     * '1' — to return additional fields for users and communities. Default value is 0.
     */
    extended?: boolean;
    fields?: Objects.BaseUserGroupFields[];
    [key: string]: any;
}

export interface StoriesGetByIdParams {
    /**
     * '1' — to return additional fields for users and communities. Default value is 0.
     */
    extended?: boolean;
    stories?: string[] | string;
    fields?: Objects.BaseUserGroupFields[];
    [key: string]: any;
}

export interface StoriesGetPhotoUploadServerParams {
    /**
     * 1 — to add the story to friend's feed.
     */
    add_to_news?: boolean;
    /**
     * ID of the story to reply with the current.
     */
    reply_to_story?: string;
    /**
     * Link URL. Internal links on https://vk.com only.
     */
    link_url?: string;
    /**
     * ID of the community to upload the story (should be verified or with the "fire" icon).
     */
    group_id?: number;
    user_ids?: number[] | number;
    link_text?: Objects.StoriesUploadLinkText;
    [key: string]: any;
}

export interface StoriesGetRepliesParams {
    /**
     * Story owner ID.
     */
    owner_id: number;
    /**
     * Story ID.
     */
    story_id: number;
    /**
     * Access key for the private object.
     */
    access_key?: string;
    /**
     * '1' — to return additional fields for users and communities. Default value is 0.
     */
    extended?: boolean;
    fields?: Objects.BaseUserGroupFields[];
    [key: string]: any;
}

export interface StoriesGetStatsParams {
    /**
     * Story owner ID.
     */
    owner_id: number;
    /**
     * Story ID.
     */
    story_id: number;
    [key: string]: any;
}

export interface StoriesGetVideoUploadServerParams {
    /**
     * 1 — to add the story to friend's feed.
     */
    add_to_news?: boolean;
    /**
     * ID of the story to reply with the current.
     */
    reply_to_story?: string;
    /**
     * Link URL. Internal links on https://vk.com only.
     */
    link_url?: string;
    /**
     * ID of the community to upload the story (should be verified or with the "fire" icon).
     */
    group_id?: number;
    user_ids?: number[] | number;
    link_text?: Objects.StoriesUploadLinkText;
    [key: string]: any;
}

export interface StoriesGetViewersParams {
    /**
     * Story owner ID.
     */
    owner_id: number;
    /**
     * Story ID.
     */
    story_id: number;
    /**
     * Maximum number of results.
     */
    count?: number;
    /**
     * Offset needed to return a specific subset of results.
     */
    offset?: number;
    /**
     * '1' — to return detailed information about photos
     */
    extended?: boolean;
    [key: string]: any;
}

export interface StoriesHideAllRepliesParams {
    /**
     * ID of the user whose replies should be hidden.
     */
    owner_id: number;
    group_id?: number;
    [key: string]: any;
}

export interface StoriesHideReplyParams {
    /**
     * ID of the user whose replies should be hidden.
     */
    owner_id: number;
    /**
     * Story ID.
     */
    story_id: number;
    /**
     * Access key for the private object.
     */
    access_key?: string;
    [key: string]: any;
}

export interface StoriesUnbanOwnerParams {
    owners_ids?: number[] | number;
    [key: string]: any;
}

export interface StreamingGetServerUrlParams {
    [key: string]: any;
}

export interface StreamingSetSettingsParams {
    monthly_tier?: "tier_1" | "tier_2" | "tier_3" | "tier_4" | "tier_5" | "tier_6" | "unlimited";
    [key: string]: any;
}

export interface UsersGetParams {
    /**
     * Case for declension of user name and surname: 'nom' — nominative (default), 'gen' — genitive , 'dat' — dative, 'acc' — accusative , 'ins' — instrumental , 'abl' — prepositional
     */
    name_case?: "nom" | "gen" | "dat" | "acc" | "ins" | "abl";
    user_ids?: string[] | string;
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface UsersGetFollowersParams {
    /**
     * User ID.
     */
    user_id?: number;
    /**
     * Offset needed to return a specific subset of followers.
     */
    offset?: number;
    /**
     * Number of followers to return.
     */
    count?: number;
    /**
     * Case for declension of user name and surname: 'nom' — nominative (default), 'gen' — genitive , 'dat' — dative, 'acc' — accusative , 'ins' — instrumental , 'abl' — prepositional
     */
    name_case?: "nom" | "gen" | "dat" | "acc" | "ins" | "abl";
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface UsersGetSubscriptionsParams {
    /**
     * User ID.
     */
    user_id?: number;
    /**
     * '1' — to return a combined list of users and communities, '0' — to return separate lists of users and communities (default)
     */
    extended?: boolean;
    /**
     * Offset needed to return a specific subset of subscriptions.
     */
    offset?: number;
    /**
     * Number of users and communities to return.
     */
    count?: number;
    fields?: Objects.UsersFields[];
    [key: string]: any;
}

export interface UsersIsAppUserParams {
    user_id?: number;
    [key: string]: any;
}

export interface UsersReportParams {
    /**
     * ID of the user about whom a complaint is being made.
     */
    user_id: number;
    /**
     * Type of complaint: 'porn' – pornography, 'spam' – spamming, 'insult' – abusive behavior, 'advertisment' – disruptive advertisements
     */
    type: "porn" | "spam" | "insult" | "advertisment";
    /**
     * Comment describing the complaint.
     */
    comment?: string;
    [key: string]: any;
}

export interface UsersSearchParams {
    /**
     * Search query string (e.g., 'Vasya Babich').
     */
    q?: string;
    /**
     * Sort order: '1' — by date registered, '0' — by rating
     */
    sort?: 0 | 1;
    /**
     * Offset needed to return a specific subset of users.
     */
    offset?: number;
    /**
     * Number of users to return.
     */
    count?: number;
    /**
     * City ID.
     */
    city?: number;
    /**
     * Country ID.
     */
    country?: number;
    /**
     * City name in a string.
     */
    hometown?: string;
    /**
     * ID of the country where the user graduated.
     */
    university_country?: number;
    /**
     * ID of the institution of higher education.
     */
    university?: number;
    /**
     * Year of graduation from an institution of higher education.
     */
    university_year?: number;
    /**
     * Faculty ID.
     */
    university_faculty?: number;
    /**
     * Chair ID.
     */
    university_chair?: number;
    /**
     * '1' — female, '2' — male, '0' — any (default)
     */
    sex?: 0 | 1 | 2;
    /**
     * Relationship status: '1' — Not married, '2' — In a relationship, '3' — Engaged, '4' — Married, '5' — It's complicated, '6' — Actively searching, '7' — In love
     */
    status?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    /**
     * Minimum age.
     */
    age_from?: number;
    /**
     * Maximum age.
     */
    age_to?: number;
    /**
     * Day of birth.
     */
    birth_day?: number;
    /**
     * Month of birth.
     */
    birth_month?: number;
    /**
     * Year of birth.
     */
    birth_year?: number;
    /**
     * '1' — online only, '0' — all users
     */
    online?: boolean;
    /**
     * '1' — with photo only, '0' — all users
     */
    has_photo?: boolean;
    /**
     * ID of the country where users finished school.
     */
    school_country?: number;
    /**
     * ID of the city where users finished school.
     */
    school_city?: number;
    /**
     * ID of the school.
     */
    school?: number;
    /**
     * School graduation year.
     */
    school_year?: number;
    /**
     * Users' religious affiliation.
     */
    religion?: string;
    /**
     * Users' interests.
     */
    interests?: string;
    /**
     * Name of the company where users work.
     */
    company?: string;
    /**
     * Job position.
     */
    position?: string;
    /**
     * ID of a community to search in communities.
     */
    group_id?: number;
    fields?: Objects.UsersFields[];
    school_class?: number;
    from_list?: string[] | string;
    [key: string]: any;
}

export interface UtilsCheckLinkParams {
    /**
     * Link to check (e.g., 'http://google.com').
     */
    url: string;
    [key: string]: any;
}

export interface UtilsDeleteFromLastShortenedParams {
    /**
     * Link key (characters after vk.cc/).
     */
    key: string;
    [key: string]: any;
}

export interface UtilsGetLastShortenedLinksParams {
    /**
     * Number of links to return.
     */
    count?: number;
    /**
     * Offset needed to return a specific subset of links.
     */
    offset?: number;
    [key: string]: any;
}

export interface UtilsGetLinkStatsParams {
    /**
     * Link key (characters after vk.cc/).
     */
    key: string;
    /**
     * Source of scope
     */
    source?: "vk_cc" | "vk_link";
    /**
     * Access key for private link stats.
     */
    access_key?: string;
    /**
     * Interval.
     */
    interval?: "day" | "forever" | "hour" | "month" | "week";
    /**
     * Number of intervals to return.
     */
    intervals_count?: number;
    /**
     * 1 — to return extended stats data (sex, age, geo). 0 — to return views number only.
     */
    extended?: boolean;
    [key: string]: any;
}

export interface UtilsGetServerTimeParams {
    [key: string]: any;
}

export interface UtilsGetShortLinkParams {
    /**
     * URL to be shortened.
     */
    url: string;
    /**
     * 1 — private stats, 0 — public stats.
     */
    private?: boolean;
    [key: string]: any;
}

export interface UtilsResolveScreenNameParams {
    /**
     * Screen name of the user, community (e.g., 'apiclub,' 'andrew', or 'rules_of_war'), or application.
     */
    screen_name: string;
    [key: string]: any;
}

export interface VideoAddParams {
    /**
     * identifier of a user or community to add a video to. Use a negative value to designate a community ID.
     */
    target_id?: number;
    /**
     * Video ID.
     */
    video_id: number;
    /**
     * ID of the user or community that owns the video. Use a negative value to designate a community ID.
     */
    owner_id: number;
    [key: string]: any;
}

export interface VideoAddAlbumParams {
    /**
     * Community ID (if the album will be created in a community).
     */
    group_id?: number;
    /**
     * Album title.
     */
    title?: string;
    privacy?: ("0" | "1" | "2" | "3")[] | ("0" | "1" | "2" | "3");
    [key: string]: any;
}

export interface VideoAddToAlbumParams {
    target_id?: number;
    album_id?: number;
    album_ids?: number[] | number;
    owner_id: number;
    video_id: number;
    [key: string]: any;
}

export interface VideoCreateCommentParams {
    /**
     * ID of the user or community that owns the video.
     */
    owner_id?: number;
    /**
     * Video ID.
     */
    video_id: number;
    /**
     * New comment text.
     */
    message?: string;
    /**
     * '1' — to post the comment from a community name (only if 'owner_id'<0)
     */
    from_group?: boolean;
    attachments?: string[] | string;
    reply_to_comment?: number;
    sticker_id?: number;
    guid?: string;
    [key: string]: any;
}

export interface VideoDeleteParams {
    /**
     * Video ID.
     */
    video_id: number;
    /**
     * ID of the user or community that owns the video.
     */
    owner_id?: number;
    target_id?: number;
    [key: string]: any;
}

export interface VideoDeleteAlbumParams {
    /**
     * Community ID (if the album is owned by a community).
     */
    group_id?: number;
    /**
     * Album ID.
     */
    album_id: number;
    [key: string]: any;
}

export interface VideoDeleteCommentParams {
    /**
     * ID of the user or community that owns the video.
     */
    owner_id?: number;
    /**
     * ID of the comment to be deleted.
     */
    comment_id: number;
    [key: string]: any;
}

export interface VideoEditParams {
    /**
     * ID of the user or community that owns the video.
     */
    owner_id?: number;
    /**
     * Video ID.
     */
    video_id: number;
    /**
     * New video title.
     */
    name?: string;
    /**
     * New video description.
     */
    desc?: string;
    /**
     * Disable comments for the group video.
     */
    no_comments?: boolean;
    /**
     * '1' — to repeat the playback of the video, '0' — to play the video once,
     */
    repeat?: boolean;
    privacy_view?: string[] | string;
    privacy_comment?: string[] | string;
    [key: string]: any;
}

export interface VideoEditAlbumParams {
    /**
     * Community ID (if the album edited is owned by a community).
     */
    group_id?: number;
    /**
     * Album ID.
     */
    album_id: number;
    /**
     * New album title.
     */
    title: string;
    privacy?: ("0" | "1" | "2" | "3")[] | ("0" | "1" | "2" | "3");
    [key: string]: any;
}

export interface VideoEditCommentParams {
    /**
     * ID of the user or community that owns the video.
     */
    owner_id?: number;
    /**
     * Comment ID.
     */
    comment_id: number;
    /**
     * New comment text.
     */
    message?: string;
    attachments?: string[] | string;
    [key: string]: any;
}

export interface VideoGetParams {
    /**
     * ID of the user or community that owns the video(s).
     */
    owner_id?: number;
    /**
     * ID of the album containing the video(s).
     */
    album_id?: number;
    /**
     * Number of videos to return.
     */
    count?: number;
    /**
     * Offset needed to return a specific subset of videos.
     */
    offset?: number;
    /**
     * '1' — to return an extended response with additional fields
     */
    extended?: boolean;
    videos?: string[] | string;
    [key: string]: any;
}

export interface VideoGetAlbumByIdParams {
    /**
     * identifier of a user or community to add a video to. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * Album ID.
     */
    album_id: number;
    [key: string]: any;
}

export interface VideoGetAlbumsParams {
    /**
     * ID of the user or community that owns the video album(s).
     */
    owner_id?: number;
    /**
     * Offset needed to return a specific subset of video albums.
     */
    offset?: number;
    /**
     * Number of video albums to return.
     */
    count?: number;
    /**
     * '1' — to return additional information about album privacy settings for the current user
     */
    extended?: boolean;
    need_system?: boolean;
    [key: string]: any;
}

export interface VideoGetAlbumsByVideoParams {
    target_id?: number;
    owner_id: number;
    video_id: number;
    extended?: boolean;
    [key: string]: any;
}

export interface VideoGetCommentsParams {
    /**
     * ID of the user or community that owns the video.
     */
    owner_id?: number;
    /**
     * Video ID.
     */
    video_id: number;
    /**
     * '1' — to return an additional 'likes' field
     */
    need_likes?: boolean;
    /**
     * Offset needed to return a specific subset of comments.
     */
    offset?: number;
    /**
     * Number of comments to return.
     */
    count?: number;
    /**
     * Sort order: 'asc' — oldest comment first, 'desc' — newest comment first
     */
    sort?: "asc" | "desc";
    start_comment_id?: number;
    extended?: boolean;
    fields?: string[] | string;
    [key: string]: any;
}

export interface VideoRemoveFromAlbumParams {
    target_id?: number;
    album_id?: number;
    album_ids?: number[] | number;
    owner_id: number;
    video_id: number;
    [key: string]: any;
}

export interface VideoReorderAlbumsParams {
    /**
     * ID of the user or community that owns the albums..
     */
    owner_id?: number;
    /**
     * Album ID.
     */
    album_id: number;
    /**
     * ID of the album before which the album in question shall be placed.
     */
    before?: number;
    /**
     * ID of the album after which the album in question shall be placed.
     */
    after?: number;
    [key: string]: any;
}

export interface VideoReorderVideosParams {
    /**
     * ID of the user or community that owns the album with videos.
     */
    target_id?: number;
    /**
     * ID of the video album.
     */
    album_id?: number;
    /**
     * ID of the user or community that owns the video.
     */
    owner_id: number;
    /**
     * ID of the video.
     */
    video_id: number;
    /**
     * ID of the user or community that owns the video before which the video in question shall be placed.
     */
    before_owner_id?: number;
    /**
     * ID of the video before which the video in question shall be placed.
     */
    before_video_id?: number;
    /**
     * ID of the user or community that owns the video after which the photo in question shall be placed.
     */
    after_owner_id?: number;
    /**
     * ID of the video after which the photo in question shall be placed.
     */
    after_video_id?: number;
    [key: string]: any;
}

export interface VideoReportParams {
    /**
     * ID of the user or community that owns the video.
     */
    owner_id: number;
    /**
     * Video ID.
     */
    video_id: number;
    /**
     * Reason for the complaint: '0' – spam, '1' – child pornography, '2' – extremism, '3' – violence, '4' – drug propaganda, '5' – adult material, '6' – insult, abuse
     */
    reason?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * Comment describing the complaint.
     */
    comment?: string;
    /**
     * (If the video was found in search results.) Search query string.
     */
    search_query?: string;
    [key: string]: any;
}

export interface VideoReportCommentParams {
    /**
     * ID of the user or community that owns the video.
     */
    owner_id: number;
    /**
     * ID of the comment being reported.
     */
    comment_id: number;
    /**
     * Reason for the complaint: , 0 – spam , 1 – child pornography , 2 – extremism , 3 – violence , 4 – drug propaganda , 5 – adult material , 6 – insult, abuse
     */
    reason?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    [key: string]: any;
}

export interface VideoRestoreParams {
    /**
     * Video ID.
     */
    video_id: number;
    /**
     * ID of the user or community that owns the video.
     */
    owner_id?: number;
    [key: string]: any;
}

export interface VideoRestoreCommentParams {
    /**
     * ID of the user or community that owns the video.
     */
    owner_id?: number;
    /**
     * ID of the deleted comment.
     */
    comment_id: number;
    [key: string]: any;
}

export interface VideoSaveParams {
    /**
     * Name of the video.
     */
    name?: string;
    /**
     * Description of the video.
     */
    description?: string;
    /**
     * '1' — to designate the video as private (send it via a private message), the video will not appear on the user's video list and will not be available by ID for other users, '0' — not to designate the video as private
     */
    is_private?: boolean;
    /**
     * '1' — to post the saved video on a user's wall, '0' — not to post the saved video on a user's wall
     */
    wallpost?: boolean;
    /**
     * URL for embedding the video from an external website.
     */
    link?: string;
    /**
     * ID of the community in which the video will be saved. By default, the current user's page.
     */
    group_id?: number;
    /**
     * ID of the album to which the saved video will be added.
     */
    album_id?: number;
    /**
     * '1' — to repeat the playback of the video, '0' — to play the video once,
     */
    repeat?: boolean;
    privacy_view?: string[] | string;
    privacy_comment?: string[] | string;
    no_comments?: boolean;
    compression?: boolean;
    [key: string]: any;
}

export interface VideoSearchParams {
    /**
     * Search query string (e.g., 'The Beatles').
     */
    q: string;
    /**
     * Sort order: '1' — by duration, '2' — by relevance, '0' — by date added
     */
    sort?: 1 | 2 | 0;
    /**
     * If not null, only searches for high-definition videos.
     */
    hd?: number;
    /**
     * '1' — to disable the Safe Search filter, '0' — to enable the Safe Search filter
     */
    adult?: boolean;
    /**
     * Offset needed to return a specific subset of videos.
     */
    offset?: number;
    /**
     * Number of videos to return.
     */
    count?: number;
    filters?: ("youtube" | "vimeo" | "short" | "long")[] | ("youtube" | "vimeo" | "short" | "long");
    search_own?: boolean;
    longer?: number;
    shorter?: number;
    extended?: boolean;
    [key: string]: any;
}

export interface WallCloseCommentsParams {
    owner_id: number;
    post_id: number;
    [key: string]: any;
}

export interface WallCreateCommentParams {
    /**
     * User ID or community ID. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * Post ID.
     */
    post_id: number;
    /**
     * Group ID.
     */
    from_group?: number;
    /**
     * (Required if 'attachments' is not set.) Text of the comment.
     */
    message?: string;
    /**
     * ID of comment to reply.
     */
    reply_to_comment?: number;
    /**
     * Sticker ID.
     */
    sticker_id?: number;
    /**
     * Unique identifier to avoid repeated comments.
     */
    guid?: string;
    attachments?: string[] | string;
    [key: string]: any;
}

export interface WallDeleteParams {
    /**
     * User ID or community ID. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * ID of the post to be deleted.
     */
    post_id?: number;
    [key: string]: any;
}

export interface WallDeleteCommentParams {
    /**
     * User ID or community ID. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * Comment ID.
     */
    comment_id: number;
    [key: string]: any;
}

export interface WallEditParams {
    /**
     * User ID or community ID. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * (Required if 'attachments' is not set.) Text of the post.
     */
    message?: string;
    post_id: number;
    friends_only?: boolean;
    attachments?: string[] | string;
    services?: string;
    signed?: boolean;
    publish_date?: number;
    lat?: number;
    long?: number;
    place_id?: number;
    mark_as_ads?: boolean;
    close_comments?: boolean;
    poster_bkg_id?: number;
    poster_bkg_owner_id?: number;
    poster_bkg_access_hash?: string;
    [key: string]: any;
}

export interface WallEditAdsStealthParams {
    /**
     * User ID or community ID. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * Post ID. Used for publishing of scheduled and suggested posts.
     */
    post_id: number;
    /**
     * (Required if 'attachments' is not set.) Text of the post.
     */
    message?: string;
    /**
     * Only for posts in communities with 'from_group' set to '1': '1' — post will be signed with the name of the posting user, '0' — post will not be signed (default)
     */
    signed?: boolean;
    /**
     * Geographical latitude of a check-in, in degrees (from -90 to 90).
     */
    lat?: number;
    /**
     * Geographical longitude of a check-in, in degrees (from -180 to 180).
     */
    long?: number;
    /**
     * ID of the location where the user was tagged.
     */
    place_id?: number;
    /**
     * Link button ID
     */
    link_button?: string;
    /**
     * Link title
     */
    link_title?: string;
    /**
     * Link image url
     */
    link_image?: string;
    /**
     * Link video ID in format "<owner_id>_<media_id>"
     */
    link_video?: string;
    attachments?: string[] | string;
    [key: string]: any;
}

export interface WallEditCommentParams {
    /**
     * User ID or community ID. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * Comment ID.
     */
    comment_id: number;
    /**
     * New comment text.
     */
    message?: string;
    attachments?: string[] | string;
    [key: string]: any;
}

export interface WallGetParams {
    /**
     * ID of the user or community that owns the wall. By default, current user ID. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * User or community short address.
     */
    domain?: string;
    /**
     * Offset needed to return a specific subset of posts.
     */
    offset?: number;
    /**
     * Number of posts to return (maximum 100).
     */
    count?: number;
    /**
     * Filter to apply: 'owner' — posts by the wall owner, 'others' — posts by someone else, 'all' — posts by the wall owner and others (default), 'postponed' — timed posts (only available for calls with an 'access_token'), 'suggests' — suggested posts on a community wall
     */
    filter?: "owner" | "others" | "all" | "postponed" | "suggests";
    /**
     * '1' — to return 'wall', 'profiles', and 'groups' fields, '0' — to return no additional fields (default)
     */
    extended?: boolean;
    fields?: Objects.BaseUserGroupFields[];
    [key: string]: any;
}

export interface WallGetByIdParams {
    /**
     * '1' — to return user and community objects needed to display posts, '0' — no additional fields are returned (default)
     */
    extended?: boolean;
    /**
     * Sets the number of parent elements to include in the array 'copy_history' that is returned if the post is a repost from another wall.
     */
    copy_history_depth?: number;
    posts?: string[] | string;
    fields?: Objects.BaseUserGroupFields[];
    [key: string]: any;
}

export interface WallGetCommentsParams {
    /**
     * User ID or community ID. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * Post ID.
     */
    post_id?: number;
    /**
     * '1' — to return the 'likes' field, '0' — not to return the 'likes' field (default)
     */
    need_likes?: boolean;
    /**
     * Offset needed to return a specific subset of comments.
     */
    offset?: number;
    /**
     * Number of comments to return (maximum 100).
     */
    count?: number;
    /**
     * Sort order: 'asc' — chronological, 'desc' — reverse chronological
     */
    sort?: "asc" | "desc";
    /**
     * Number of characters at which to truncate comments when previewed. By default, '90'. Specify '0' if you do not want to truncate comments.
     */
    preview_length?: number;
    /**
     * Comment ID.
     */
    comment_id?: number;
    /**
     * Count items in threads.
     */
    thread_items_count?: number;
    start_comment_id?: number;
    extended?: boolean;
    fields?: Objects.BaseUserGroupFields[];
    [key: string]: any;
}

export interface WallGetRepostsParams {
    /**
     * User ID or community ID. By default, current user ID. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * Post ID.
     */
    post_id?: number;
    /**
     * Offset needed to return a specific subset of reposts.
     */
    offset?: number;
    /**
     * Number of reposts to return.
     */
    count?: number;
    [key: string]: any;
}

export interface WallOpenCommentsParams {
    owner_id: number;
    post_id: number;
    [key: string]: any;
}

export interface WallPinParams {
    /**
     * ID of the user or community that owns the wall. By default, current user ID. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * Post ID.
     */
    post_id: number;
    [key: string]: any;
}

export interface WallPostParams {
    /**
     * User ID or community ID. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * '1' — post will be available to friends only, '0' — post will be available to all users (default)
     */
    friends_only?: boolean;
    /**
     * For a community: '1' — post will be published by the community, '0' — post will be published by the user (default)
     */
    from_group?: boolean;
    /**
     * (Required if 'attachments' is not set.) Text of the post.
     */
    message?: string;
    /**
     * List of services or websites the update will be exported to, if the user has so requested. Sample values: 'twitter', 'facebook'.
     */
    services?: string;
    /**
     * Only for posts in communities with 'from_group' set to '1': '1' — post will be signed with the name of the posting user, '0' — post will not be signed (default)
     */
    signed?: boolean;
    /**
     * Publication date (in Unix time). If used, posting will be delayed until the set time.
     */
    publish_date?: number;
    /**
     * Geographical latitude of a check-in, in degrees (from -90 to 90).
     */
    lat?: number;
    /**
     * Geographical longitude of a check-in, in degrees (from -180 to 180).
     */
    long?: number;
    /**
     * ID of the location where the user was tagged.
     */
    place_id?: number;
    /**
     * Post ID. Used for publishing of scheduled and suggested posts.
     */
    post_id?: number;
    attachments?: string[] | string;
    guid?: string;
    mark_as_ads?: boolean;
    close_comments?: boolean;
    mute_notifications?: boolean;
    [key: string]: any;
}

export interface WallPostAdsStealthParams {
    /**
     * User ID or community ID. Use a negative value to designate a community ID.
     */
    owner_id: number;
    /**
     * (Required if 'attachments' is not set.) Text of the post.
     */
    message?: string;
    /**
     * Only for posts in communities with 'from_group' set to '1': '1' — post will be signed with the name of the posting user, '0' — post will not be signed (default)
     */
    signed?: boolean;
    /**
     * Geographical latitude of a check-in, in degrees (from -90 to 90).
     */
    lat?: number;
    /**
     * Geographical longitude of a check-in, in degrees (from -180 to 180).
     */
    long?: number;
    /**
     * ID of the location where the user was tagged.
     */
    place_id?: number;
    /**
     * Unique identifier to avoid duplication the same post.
     */
    guid?: string;
    /**
     * Link button ID
     */
    link_button?: string;
    /**
     * Link title
     */
    link_title?: string;
    /**
     * Link image url
     */
    link_image?: string;
    /**
     * Link video ID in format "<owner_id>_<media_id>"
     */
    link_video?: string;
    attachments?: string[] | string;
    [key: string]: any;
}

export interface WallReportCommentParams {
    /**
     * ID of the user or community that owns the wall.
     */
    owner_id: number;
    /**
     * Comment ID.
     */
    comment_id: number;
    /**
     * Reason for the complaint: '0' – spam, '1' – child pornography, '2' – extremism, '3' – violence, '4' – drug propaganda, '5' – adult material, '6' – insult, abuse
     */
    reason?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    [key: string]: any;
}

export interface WallReportPostParams {
    /**
     * ID of the user or community that owns the wall.
     */
    owner_id: number;
    /**
     * Post ID.
     */
    post_id: number;
    /**
     * Reason for the complaint: '0' – spam, '1' – child pornography, '2' – extremism, '3' – violence, '4' – drug propaganda, '5' – adult material, '6' – insult, abuse
     */
    reason?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    [key: string]: any;
}

export interface WallRepostParams {
    /**
     * ID of the object to be reposted on the wall. Example: "wall66748_3675"
     */
    object: string;
    /**
     * Comment to be added along with the reposted object.
     */
    message?: string;
    /**
     * Target community ID when reposting to a community.
     */
    group_id?: number;
    mark_as_ads?: boolean;
    mute_notifications?: boolean;
    [key: string]: any;
}

export interface WallRestoreParams {
    /**
     * User ID or community ID from whose wall the post was deleted. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * ID of the post to be restored.
     */
    post_id?: number;
    [key: string]: any;
}

export interface WallRestoreCommentParams {
    /**
     * User ID or community ID. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * Comment ID.
     */
    comment_id: number;
    [key: string]: any;
}

export interface WallSearchParams {
    /**
     * user or community id. "Remember that for a community 'owner_id' must be negative."
     */
    owner_id?: number;
    /**
     * user or community screen name.
     */
    domain?: string;
    /**
     * search query string.
     */
    query?: string;
    /**
     * '1' – returns only page owner's posts.
     */
    owners_only?: boolean;
    /**
     * count of posts to return.
     */
    count?: number;
    /**
     * Offset needed to return a specific subset of posts.
     */
    offset?: number;
    /**
     * show extended post info.
     */
    extended?: boolean;
    fields?: Objects.BaseUserGroupFields[];
    [key: string]: any;
}

export interface WallUnpinParams {
    /**
     * ID of the user or community that owns the wall. By default, current user ID. Use a negative value to designate a community ID.
     */
    owner_id?: number;
    /**
     * Post ID.
     */
    post_id: number;
    [key: string]: any;
}

export interface WidgetsGetCommentsParams {
    widget_api_id?: number;
    url?: string;
    page_id?: string;
    order?: string;
    fields?: Objects.UsersFields[];
    offset?: number;
    count?: number;
    [key: string]: any;
}

export interface WidgetsGetPagesParams {
    widget_api_id?: number;
    order?: string;
    period?: string;
    offset?: number;
    count?: number;
    [key: string]: any;
}

