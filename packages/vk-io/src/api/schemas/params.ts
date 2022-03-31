// @ts-ignore
/* eslint-disable */
// @ts-ignore
import * as Objects from "./objects";
// @ts-ignore

// @ts-ignore
export interface AccountBanParams {
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountChangePasswordParams {
// @ts-ignore
    /**
// @ts-ignore
     * Session id received after the [vk.com/dev/auth.restore|auth.restore] method is executed. (If the password is changed right after the access was restored)
// @ts-ignore
     */
// @ts-ignore
    restore_sid?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Hash received after a successful OAuth authorization with a code got by SMS. (If the password is changed right after the access was restored)
// @ts-ignore
     */
// @ts-ignore
    change_password_hash?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Current user password.
// @ts-ignore
     */
// @ts-ignore
    old_password?: string;
// @ts-ignore
    /**
// @ts-ignore
     * New password that will be set as a current
// @ts-ignore
     */
// @ts-ignore
    new_password: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountGetActiveOffersParams {
// @ts-ignore
    /**
// @ts-ignore
     * Number of results to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    offset?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountGetAppPermissionsParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID whose settings information shall be got. By default: current user.
// @ts-ignore
     */
// @ts-ignore
    user_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountGetBannedParams {
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of results.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of results to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountGetCountersParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    filter?: ("friends" | "messages" | "photos" | "notes" | "gifts" | "events" | "groups" | "sdk" | "friends_suggestions" | "notifications" | "app_requests" | "friends_recommendations")[] | ("friends" | "messages" | "photos" | "notes" | "gifts" | "events" | "groups" | "sdk" | "friends_suggestions" | "notifications" | "app_requests" | "friends_recommendations");
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountGetInfoParams {
// @ts-ignore
    fields?: ("country" | "https_required" | "own_posts_default" | "no_wall_replies" | "intro" | "lang")[] | ("country" | "https_required" | "own_posts_default" | "no_wall_replies" | "intro" | "lang");
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountGetProfileInfoParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountGetPushSettingsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Unique device ID.
// @ts-ignore
     */
// @ts-ignore
    device_id?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountRegisterDeviceParams {
// @ts-ignore
    /**
// @ts-ignore
     * Device token used to send notifications. (for mpns, the token shall be URL for sending of notifications)
// @ts-ignore
     */
// @ts-ignore
    token: string;
// @ts-ignore
    /**
// @ts-ignore
     * String name of device model.
// @ts-ignore
     */
// @ts-ignore
    device_model?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Device year.
// @ts-ignore
     */
// @ts-ignore
    device_year?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Unique device ID.
// @ts-ignore
     */
// @ts-ignore
    device_id: string;
// @ts-ignore
    /**
// @ts-ignore
     * String version of device operating system.
// @ts-ignore
     */
// @ts-ignore
    system_version?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Push settings in a [vk.com/dev/push_settings|special format].
// @ts-ignore
     */
// @ts-ignore
    settings?: string;
// @ts-ignore
    sandbox?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountSaveProfileInfoParams {
// @ts-ignore
    /**
// @ts-ignore
     * User first name.
// @ts-ignore
     */
// @ts-ignore
    first_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User last name.
// @ts-ignore
     */
// @ts-ignore
    last_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User maiden name (female only)
// @ts-ignore
     */
// @ts-ignore
    maiden_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User screen name.
// @ts-ignore
     */
// @ts-ignore
    screen_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the name change request to be canceled. If this parameter is sent, all the others are ignored.
// @ts-ignore
     */
// @ts-ignore
    cancel_request_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * User sex. Possible values: , * '1' - female,, * '2' - male.
// @ts-ignore
     */
// @ts-ignore
    sex?: 0 | 1 | 2;
// @ts-ignore
    /**
// @ts-ignore
     * User relationship status. Possible values: , * '1' - single,, * '2' - in a relationship,, * '3' - engaged,, * '4' - married,, * '5' - it's complicated,, * '6' - actively searching,, * '7' - in love,, * '0' - not specified.
// @ts-ignore
     */
// @ts-ignore
    relation?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 0;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the relationship partner.
// @ts-ignore
     */
// @ts-ignore
    relation_partner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * User birth date, format: DD.MM.YYYY.
// @ts-ignore
     */
// @ts-ignore
    bdate?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Birth date visibility. Returned values: , * '1' - show birth date,, * '2' - show only month and day,, * '0' - hide birth date.
// @ts-ignore
     */
// @ts-ignore
    bdate_visibility?: 1 | 2 | 0;
// @ts-ignore
    /**
// @ts-ignore
     * User home town.
// @ts-ignore
     */
// @ts-ignore
    home_town?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User country.
// @ts-ignore
     */
// @ts-ignore
    country_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * User city.
// @ts-ignore
     */
// @ts-ignore
    city_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Status text.
// @ts-ignore
     */
// @ts-ignore
    status?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountSetInfoParams {
// @ts-ignore
    /**
// @ts-ignore
     * Setting name.
// @ts-ignore
     */
// @ts-ignore
    name?: "intro" | "no_wall_replies" | "own_posts_default";
// @ts-ignore
    /**
// @ts-ignore
     * Setting value.
// @ts-ignore
     */
// @ts-ignore
    value?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountSetOfflineParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountSetOnlineParams {
// @ts-ignore
    /**
// @ts-ignore
     * '1' if videocalls are available for current device.
// @ts-ignore
     */
// @ts-ignore
    voip?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountSetPushSettingsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Unique device ID.
// @ts-ignore
     */
// @ts-ignore
    device_id: string;
// @ts-ignore
    /**
// @ts-ignore
     * Push settings in a [vk.com/dev/push_settings|special format].
// @ts-ignore
     */
// @ts-ignore
    settings?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Notification key.
// @ts-ignore
     */
// @ts-ignore
    key?: string;
// @ts-ignore
    value?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountSetSilenceModeParams {
// @ts-ignore
    /**
// @ts-ignore
     * Unique device ID.
// @ts-ignore
     */
// @ts-ignore
    device_id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Time in seconds for what notifications should be disabled. '-1' to disable forever.
// @ts-ignore
     */
// @ts-ignore
    time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'Chat ID', e.g. '2000000001'. For community: '- Community ID', e.g. '-12345'. "
// @ts-ignore
     */
// @ts-ignore
    peer_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to enable sound in this dialog, '0' — to disable sound. Only if 'peer_id' contains user or community ID.
// @ts-ignore
     */
// @ts-ignore
    sound?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountUnbanParams {
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountUnregisterDeviceParams {
// @ts-ignore
    /**
// @ts-ignore
     * Unique device ID.
// @ts-ignore
     */
// @ts-ignore
    device_id?: string;
// @ts-ignore
    sandbox?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsAddOfficeUsersParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Serialized JSON array of objects that describe added managers. Description of 'user_specification' objects see below.
// @ts-ignore
     */
// @ts-ignore
    data: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsCheckLinkParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Object type: *'community' — community,, *'post' — community post,, *'application' — VK application,, *'video' — video,, *'site' — external site.
// @ts-ignore
     */
// @ts-ignore
    link_type: "community" | "post" | "application" | "video" | "site";
// @ts-ignore
    /**
// @ts-ignore
     * Object URL.
// @ts-ignore
     */
// @ts-ignore
    link_url: string;
// @ts-ignore
    /**
// @ts-ignore
     * Campaign ID
// @ts-ignore
     */
// @ts-ignore
    campaign_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsCreateAdsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Serialized JSON array of objects that describe created ads. Description of 'ad_specification' objects see below.
// @ts-ignore
     */
// @ts-ignore
    data: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsCreateCampaignsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Serialized JSON array of objects that describe created campaigns. Description of 'campaign_specification' objects see below.
// @ts-ignore
     */
// @ts-ignore
    data: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsCreateClientsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Serialized JSON array of objects that describe created campaigns. Description of 'client_specification' objects see below.
// @ts-ignore
     */
// @ts-ignore
    data: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsCreateTargetGroupParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * 'Only for advertising agencies.', ID of the client with the advertising account where the group will be created.
// @ts-ignore
     */
// @ts-ignore
    client_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Name of the target group — a string up to 64 characters long.
// @ts-ignore
     */
// @ts-ignore
    name: string;
// @ts-ignore
    /**
// @ts-ignore
     * 'For groups with auditory created with pixel code only.', , Number of days after that users will be automatically removed from the group.
// @ts-ignore
     */
// @ts-ignore
    lifetime: number;
// @ts-ignore
    target_pixel_id?: number;
// @ts-ignore
    target_pixel_rules?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsDeleteAdsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Serialized JSON array with ad IDs.
// @ts-ignore
     */
// @ts-ignore
    ids: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsDeleteCampaignsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Serialized JSON array with IDs of deleted campaigns.
// @ts-ignore
     */
// @ts-ignore
    ids: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsDeleteClientsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Serialized JSON array with IDs of deleted clients.
// @ts-ignore
     */
// @ts-ignore
    ids: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsDeleteTargetGroupParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * 'Only for advertising agencies.' , ID of the client with the advertising account where the group will be created.
// @ts-ignore
     */
// @ts-ignore
    client_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID.
// @ts-ignore
     */
// @ts-ignore
    target_group_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetAccountsParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetAdsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Filter by ads. Serialized JSON array with ad IDs. If the parameter is null, all ads will be shown.
// @ts-ignore
     */
// @ts-ignore
    ad_ids?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Filter by advertising campaigns. Serialized JSON array with campaign IDs. If the parameter is null, ads of all campaigns will be shown.
// @ts-ignore
     */
// @ts-ignore
    campaign_ids?: string;
// @ts-ignore
    /**
// @ts-ignore
     * 'Available and required for advertising agencies.' ID of the client ads are retrieved from.
// @ts-ignore
     */
// @ts-ignore
    client_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Flag that specifies whether archived ads shall be shown: *0 — show only active ads,, *1 — show all ads.
// @ts-ignore
     */
// @ts-ignore
    include_deleted?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Flag that specifies whether to show only archived ads: *0 — show all ads,, *1 — show only archived ads. Available when include_deleted flag is *1
// @ts-ignore
     */
// @ts-ignore
    only_deleted?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Limit of number of returned ads. Used only if ad_ids parameter is null, and 'campaign_ids' parameter contains ID of only one campaign.
// @ts-ignore
     */
// @ts-ignore
    limit?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset. Used in the same cases as 'limit' parameter.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetAdsLayoutParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * 'For advertising agencies.' ID of the client ads are retrieved from.
// @ts-ignore
     */
// @ts-ignore
    client_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Flag that specifies whether archived ads shall be shown. *0 — show only active ads,, *1 — show all ads.
// @ts-ignore
     */
// @ts-ignore
    include_deleted?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Flag that specifies whether to show only archived ads: *0 — show all ads,, *1 — show only archived ads. Available when include_deleted flag is *1
// @ts-ignore
     */
// @ts-ignore
    only_deleted?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Filter by advertising campaigns. Serialized JSON array with campaign IDs. If the parameter is null, ads of all campaigns will be shown.
// @ts-ignore
     */
// @ts-ignore
    campaign_ids?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Filter by ads. Serialized JSON array with ad IDs. If the parameter is null, all ads will be shown.
// @ts-ignore
     */
// @ts-ignore
    ad_ids?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Limit of number of returned ads. Used only if 'ad_ids' parameter is null, and 'campaign_ids' parameter contains ID of only one campaign.
// @ts-ignore
     */
// @ts-ignore
    limit?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset. Used in the same cases as 'limit' parameter.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetAdsTargetingParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Filter by ads. Serialized JSON array with ad IDs. If the parameter is null, all ads will be shown.
// @ts-ignore
     */
// @ts-ignore
    ad_ids?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Filter by advertising campaigns. Serialized JSON array with campaign IDs. If the parameter is null, ads of all campaigns will be shown.
// @ts-ignore
     */
// @ts-ignore
    campaign_ids?: string;
// @ts-ignore
    /**
// @ts-ignore
     * 'For advertising agencies.' ID of the client ads are retrieved from.
// @ts-ignore
     */
// @ts-ignore
    client_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * flag that specifies whether archived ads shall be shown: *0 — show only active ads,, *1 — show all ads.
// @ts-ignore
     */
// @ts-ignore
    include_deleted?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Limit of number of returned ads. Used only if 'ad_ids' parameter is null, and 'campaign_ids' parameter contains ID of only one campaign.
// @ts-ignore
     */
// @ts-ignore
    limit?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of results.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetBudgetParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetCampaignsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * 'For advertising agencies'. ID of the client advertising campaigns are retrieved from.
// @ts-ignore
     */
// @ts-ignore
    client_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Flag that specifies whether archived ads shall be shown. *0 — show only active campaigns,, *1 — show all campaigns.
// @ts-ignore
     */
// @ts-ignore
    include_deleted?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Filter of advertising campaigns to show. Serialized JSON array with campaign IDs. Only campaigns that exist in 'campaign_ids' and belong to the specified advertising account will be shown. If the parameter is null, all campaigns will be shown.
// @ts-ignore
     */
// @ts-ignore
    campaign_ids?: string;
// @ts-ignore
    fields?: ("ads_count")[] | ("ads_count");
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetCategoriesParams {
// @ts-ignore
    /**
// @ts-ignore
     * Language. The full list of supported languages is [vk.com/dev/api_requests|here].
// @ts-ignore
     */
// @ts-ignore
    lang?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetClientsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetDemographicsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Type of requested objects listed in 'ids' parameter: *ad — ads,, *campaign — campaigns.
// @ts-ignore
     */
// @ts-ignore
    ids_type: "ad" | "campaign";
// @ts-ignore
    /**
// @ts-ignore
     * IDs requested ads or campaigns, separated with a comma, depending on the value set in 'ids_type'. Maximum 2000 objects.
// @ts-ignore
     */
// @ts-ignore
    ids: string;
// @ts-ignore
    /**
// @ts-ignore
     * Data grouping by dates: *day — statistics by days,, *month — statistics by months,, *overall — overall statistics. 'date_from' and 'date_to' parameters set temporary limits.
// @ts-ignore
     */
// @ts-ignore
    period: "day" | "month" | "overall";
// @ts-ignore
    /**
// @ts-ignore
     * Date to show statistics from. For different value of 'period' different date format is used: *day: YYYY-MM-DD, example: 2011-09-27 — September 27, 2011, **0 — day it was created on,, *month: YYYY-MM, example: 2011-09 — September 2011, **0 — month it was created in,, *overall: 0.
// @ts-ignore
     */
// @ts-ignore
    date_from: string;
// @ts-ignore
    /**
// @ts-ignore
     * Date to show statistics to. For different value of 'period' different date format is used: *day: YYYY-MM-DD, example: 2011-09-27 — September 27, 2011, **0 — current day,, *month: YYYY-MM, example: 2011-09 — September 2011, **0 — current month,, *overall: 0.
// @ts-ignore
     */
// @ts-ignore
    date_to: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetFloodStatsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetLookalikeRequestsParams {
// @ts-ignore
    account_id: number;
// @ts-ignore
    client_id?: number;
// @ts-ignore
    requests_ids?: string;
// @ts-ignore
    offset?: number;
// @ts-ignore
    limit?: number;
// @ts-ignore
    sort_by?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetMusiciansParams {
// @ts-ignore
    artist_name: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetMusiciansByIdsParams {
// @ts-ignore
    ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetOfficeUsersParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetPostsReachParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Type of requested objects listed in 'ids' parameter: *ad — ads,, *campaign — campaigns.
// @ts-ignore
     */
// @ts-ignore
    ids_type: "ad" | "campaign";
// @ts-ignore
    /**
// @ts-ignore
     * IDs requested ads or campaigns, separated with a comma, depending on the value set in 'ids_type'. Maximum 100 objects.
// @ts-ignore
     */
// @ts-ignore
    ids: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetRejectionReasonParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Ad ID.
// @ts-ignore
     */
// @ts-ignore
    ad_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetStatisticsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Type of requested objects listed in 'ids' parameter: *ad — ads,, *campaign — campaigns,, *client — clients,, *office — account.
// @ts-ignore
     */
// @ts-ignore
    ids_type: "ad" | "campaign" | "client" | "office";
// @ts-ignore
    /**
// @ts-ignore
     * IDs requested ads, campaigns, clients or account, separated with a comma, depending on the value set in 'ids_type'. Maximum 2000 objects.
// @ts-ignore
     */
// @ts-ignore
    ids: string;
// @ts-ignore
    /**
// @ts-ignore
     * Data grouping by dates: *day — statistics by days,, *month — statistics by months,, *overall — overall statistics. 'date_from' and 'date_to' parameters set temporary limits.
// @ts-ignore
     */
// @ts-ignore
    period: "day" | "month" | "overall";
// @ts-ignore
    /**
// @ts-ignore
     * Date to show statistics from. For different value of 'period' different date format is used: *day: YYYY-MM-DD, example: 2011-09-27 — September 27, 2011, **0 — day it was created on,, *month: YYYY-MM, example: 2011-09 — September 2011, **0 — month it was created in,, *overall: 0.
// @ts-ignore
     */
// @ts-ignore
    date_from: string;
// @ts-ignore
    /**
// @ts-ignore
     * Date to show statistics to. For different value of 'period' different date format is used: *day: YYYY-MM-DD, example: 2011-09-27 — September 27, 2011, **0 — current day,, *month: YYYY-MM, example: 2011-09 — September 2011, **0 — current month,, *overall: 0.
// @ts-ignore
     */
// @ts-ignore
    date_to: string;
// @ts-ignore
    stats_fields?: ("views_times")[] | ("views_times");
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetSuggestionsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Section, suggestions are retrieved in. Available values: *countries — request of a list of countries. If q is not set or blank, a short list of countries is shown. Otherwise, a full list of countries is shown. *regions — requested list of regions. 'country' parameter is required. *cities — requested list of cities. 'country' parameter is required. *districts — requested list of districts. 'cities' parameter is required. *stations — requested list of subway stations. 'cities' parameter is required. *streets — requested list of streets. 'cities' parameter is required. *schools — requested list of educational organizations. 'cities' parameter is required. *interests — requested list of interests. *positions — requested list of positions (professions). *group_types — requested list of group types. *religions — requested list of religious commitments. *browsers — requested list of browsers and mobile devices.
// @ts-ignore
     */
// @ts-ignore
    section: "countries" | "regions" | "cities" | "districts" | "stations" | "streets" | "schools" | "interests" | "positions" | "group_types" | "religions" | "browsers";
// @ts-ignore
    /**
// @ts-ignore
     * Objects IDs separated by commas. If the parameter is passed, 'q, country, cities' should not be passed.
// @ts-ignore
     */
// @ts-ignore
    ids?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Filter-line of the request (for countries, regions, cities, streets, schools, interests, positions).
// @ts-ignore
     */
// @ts-ignore
    q?: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the country objects are searched in.
// @ts-ignore
     */
// @ts-ignore
    country?: number;
// @ts-ignore
    /**
// @ts-ignore
     * IDs of cities where objects are searched in, separated with a comma.
// @ts-ignore
     */
// @ts-ignore
    cities?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Language of the returned string values. Supported languages: *ru — Russian,, *ua — Ukrainian,, *en — English.
// @ts-ignore
     */
// @ts-ignore
    lang?: "ru" | "ua" | "en";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetTargetGroupsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * 'Only for advertising agencies.', ID of the client with the advertising account where the group will be created.
// @ts-ignore
     */
// @ts-ignore
    client_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return pixel code.
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetTargetingStatsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Serialized JSON object that describes targeting parameters. Description of 'criteria' object see below.
// @ts-ignore
     */
// @ts-ignore
    criteria?: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of an ad which targeting parameters shall be analyzed.
// @ts-ignore
     */
// @ts-ignore
    ad_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Ad format. Possible values: *'1' — image and text,, *'2' — big image,, *'3' — exclusive format,, *'4' — community, square image,, *'7' — special app format,, *'8' — special community format,, *'9' — post in community,, *'10' — app board.
// @ts-ignore
     */
// @ts-ignore
    ad_format?: 1 | 2 | 3 | 4 | 7 | 8 | 9 | 10;
// @ts-ignore
    /**
// @ts-ignore
     * Platforms to use for ad showing. Possible values: (for 'ad_format' = '1'), *'0' — VK and partner sites,, *'1' — VK only. (for 'ad_format' = '9'), *'all' — all platforms,, *'desktop' — desktop version,, *'mobile' — mobile version and apps.
// @ts-ignore
     */
// @ts-ignore
    ad_platform?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL for the advertised object.
// @ts-ignore
     */
// @ts-ignore
    link_url: string;
// @ts-ignore
    /**
// @ts-ignore
     * Domain of the advertised object.
// @ts-ignore
     */
// @ts-ignore
    link_domain?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Additionally return recommended cpc and cpm to reach 5,10..95 percents of audience.
// @ts-ignore
     */
// @ts-ignore
    need_precise?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Impressions limit period in seconds, must be a multiple of 86400(day)
// @ts-ignore
     */
// @ts-ignore
    impressions_limit_period?: number;
// @ts-ignore
    client_id?: number;
// @ts-ignore
    ad_platform_no_wall?: string;
// @ts-ignore
    ad_platform_no_ad_network?: string;
// @ts-ignore
    publisher_platforms?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetUploadURLParams {
// @ts-ignore
    /**
// @ts-ignore
     * Ad format: *1 — image and text,, *2 — big image,, *3 — exclusive format,, *4 — community, square image,, *7 — special app format.
// @ts-ignore
     */
// @ts-ignore
    ad_format: 1 | 2 | 3 | 4 | 7;
// @ts-ignore
    icon?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsGetVideoUploadURLParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsImportTargetContactsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * 'Only for advertising agencies.' , ID of the client with the advertising account where the group will be created.
// @ts-ignore
     */
// @ts-ignore
    client_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Target group ID.
// @ts-ignore
     */
// @ts-ignore
    target_group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * List of phone numbers, emails or user IDs separated with a comma.
// @ts-ignore
     */
// @ts-ignore
    contacts: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsRemoveOfficeUsersParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Serialized JSON array with IDs of deleted managers.
// @ts-ignore
     */
// @ts-ignore
    ids: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsUpdateAdsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Serialized JSON array of objects that describe changes in ads. Description of 'ad_edit_specification' objects see below.
// @ts-ignore
     */
// @ts-ignore
    data: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsUpdateCampaignsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Serialized JSON array of objects that describe changes in campaigns. Description of 'campaign_mod' objects see below.
// @ts-ignore
     */
// @ts-ignore
    data: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsUpdateClientsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Serialized JSON array of objects that describe changes in clients. Description of 'client_mod' objects see below.
// @ts-ignore
     */
// @ts-ignore
    data: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsUpdateOfficeUsersParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Serialized JSON array of objects that describe added managers. Description of 'user_specification' objects see below.
// @ts-ignore
     */
// @ts-ignore
    data: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsUpdateTargetGroupParams {
// @ts-ignore
    /**
// @ts-ignore
     * Advertising account ID.
// @ts-ignore
     */
// @ts-ignore
    account_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * 'Only for advertising agencies.' , ID of the client with the advertising account where the group will be created.
// @ts-ignore
     */
// @ts-ignore
    client_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID.
// @ts-ignore
     */
// @ts-ignore
    target_group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * New name of the target group — a string up to 64 characters long.
// @ts-ignore
     */
// @ts-ignore
    name: string;
// @ts-ignore
    /**
// @ts-ignore
     * Domain of the site where user accounting code will be placed.
// @ts-ignore
     */
// @ts-ignore
    domain?: string;
// @ts-ignore
    /**
// @ts-ignore
     * 'Only for the groups that get audience from sites with user accounting code.', Time in days when users added to a retarget group will be automatically excluded from it. '0' - automatic exclusion is off.
// @ts-ignore
     */
// @ts-ignore
    lifetime: number;
// @ts-ignore
    target_pixel_id?: number;
// @ts-ignore
    target_pixel_rules?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdswebGetAdCategoriesParams {
// @ts-ignore
    office_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdswebGetAdUnitCodeParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdswebGetAdUnitsParams {
// @ts-ignore
    office_id: number;
// @ts-ignore
    sites_ids?: string;
// @ts-ignore
    ad_units_ids?: string;
// @ts-ignore
    fields?: string;
// @ts-ignore
    limit?: number;
// @ts-ignore
    offset?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdswebGetFraudHistoryParams {
// @ts-ignore
    office_id: number;
// @ts-ignore
    sites_ids?: string;
// @ts-ignore
    limit?: number;
// @ts-ignore
    offset?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdswebGetSitesParams {
// @ts-ignore
    office_id: number;
// @ts-ignore
    sites_ids?: string;
// @ts-ignore
    fields?: string;
// @ts-ignore
    limit?: number;
// @ts-ignore
    offset?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdswebGetStatisticsParams {
// @ts-ignore
    office_id: number;
// @ts-ignore
    ids_type: string;
// @ts-ignore
    ids: string;
// @ts-ignore
    period: string;
// @ts-ignore
    date_from: string;
// @ts-ignore
    date_to: string;
// @ts-ignore
    fields?: string;
// @ts-ignore
    limit?: number;
// @ts-ignore
    page_id?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppWidgetsGetAppImageUploadServerParams {
// @ts-ignore
    image_type: "160x160" | "160x240" | "24x24" | "50x50" | "510x128";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppWidgetsGetAppImagesParams {
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of images.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Maximum count of results.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    image_type?: "160x160" | "160x240" | "24x24" | "50x50" | "510x128";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppWidgetsGetGroupImageUploadServerParams {
// @ts-ignore
    image_type: "160x160" | "160x240" | "24x24" | "50x50" | "510x128";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppWidgetsGetGroupImagesParams {
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of images.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Maximum count of results.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    image_type?: "160x160" | "160x240" | "24x24" | "50x50" | "510x128";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppWidgetsGetImagesByIdParams {
// @ts-ignore
    images?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppWidgetsSaveAppImageParams {
// @ts-ignore
    /**
// @ts-ignore
     * Parameter returned when photo is uploaded to server
// @ts-ignore
     */
// @ts-ignore
    hash: string;
// @ts-ignore
    /**
// @ts-ignore
     * Parameter returned when photo is uploaded to server
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
export interface AppWidgetsSaveGroupImageParams {
// @ts-ignore
    /**
// @ts-ignore
     * Parameter returned when photo is uploaded to server
// @ts-ignore
     */
// @ts-ignore
    hash: string;
// @ts-ignore
    /**
// @ts-ignore
     * Parameter returned when photo is uploaded to server
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
export interface AppWidgetsUpdateParams {
// @ts-ignore
    code: string;
// @ts-ignore
    type: "compact_list" | "cover_list" | "donation" | "list" | "match" | "matches" | "table" | "text" | "tiles";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppsDeleteAppRequestsParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppsGetParams {
// @ts-ignore
    /**
// @ts-ignore
     * Application ID
// @ts-ignore
     */
// @ts-ignore
    app_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * platform. Possible values: *'ios' — iOS,, *'android' — Android,, *'winphone' — Windows Phone,, *'web' — приложения на vk.com. By default: 'web'.
// @ts-ignore
     */
// @ts-ignore
    platform?: "android" | "ios" | "web" | "winphone";
// @ts-ignore
    /**
// @ts-ignore
     * Case for declension of user name and surname: 'nom' — nominative (default),, 'gen' — genitive,, 'dat' — dative,, 'acc' — accusative,, 'ins' — instrumental,, 'abl' — prepositional. (only if 'return_friends' = '1')
// @ts-ignore
     */
// @ts-ignore
    name_case?: "nom" | "gen" | "dat" | "acc" | "ins" | "abl";
// @ts-ignore
    app_ids?: string[] | string;
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    return_friends?: boolean | number;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppsGetCatalogParams {
// @ts-ignore
    /**
// @ts-ignore
     * Sort order: 'popular_today' — popular for one day (default), 'visitors' — by visitors number , 'create_date' — by creation date, 'growth_rate' — by growth rate, 'popular_week' — popular for one week
// @ts-ignore
     */
// @ts-ignore
    sort?: "popular_today" | "visitors" | "create_date" | "growth_rate" | "popular_week";
// @ts-ignore
    /**
// @ts-ignore
     * Offset required to return a specific subset of apps.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of apps to return.
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return additional fields 'screenshots', 'MAU', 'catalog_position', and 'international'. If set, 'count' must be less than or equal to '100'. '0' — not to return additional fields (default).
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Search query string.
// @ts-ignore
     */
// @ts-ignore
    q?: string;
// @ts-ignore
    /**
// @ts-ignore
     * 'installed' — to return list of installed apps (only for mobile platform).
// @ts-ignore
     */
// @ts-ignore
    filter?: "favorite" | "featured" | "installed" | "new";
// @ts-ignore
    platform?: string;
// @ts-ignore
    return_friends?: boolean | number;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    name_case?: string;
// @ts-ignore
    genre_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppsGetFriendsListParams {
// @ts-ignore
    /**
// @ts-ignore
     * List size.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * List type. Possible values: * 'invite' — available for invites (don't play the game),, * 'request' — available for request (play the game). By default: 'invite'.
// @ts-ignore
     */
// @ts-ignore
    type?: "invite" | "request";
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    offset?: number;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppsGetLeaderboardParams {
// @ts-ignore
    /**
// @ts-ignore
     * Leaderboard type. Possible values: *'level' — by level,, *'points' — by mission points,, *'score' — by score ().
// @ts-ignore
     */
// @ts-ignore
    type: "level" | "points" | "score";
// @ts-ignore
    /**
// @ts-ignore
     * Rating type. Possible values: *'1' — global rating among all players,, *'0' — rating among user friends.
// @ts-ignore
     */
// @ts-ignore
    global?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * 1 — to return additional info about users
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppsGetMiniAppPoliciesParams {
// @ts-ignore
    /**
// @ts-ignore
     * Mini App ID
// @ts-ignore
     */
// @ts-ignore
    app_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppsGetScopesParams {
// @ts-ignore
    type?: "group" | "user";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppsGetScoreParams {
// @ts-ignore
    user_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppsPromoHasActiveGiftParams {
// @ts-ignore
    /**
// @ts-ignore
     * Id of game promo action
// @ts-ignore
     */
// @ts-ignore
    promo_id: number;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppsPromoUseGiftParams {
// @ts-ignore
    /**
// @ts-ignore
     * Id of game promo action
// @ts-ignore
     */
// @ts-ignore
    promo_id: number;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppsSendRequestParams {
// @ts-ignore
    /**
// @ts-ignore
     * id of the user to send a request
// @ts-ignore
     */
// @ts-ignore
    user_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * request text
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * request type. Values: 'invite' - if the request is sent to a user who does not have the app installed,, 'request' - if a user has already installed the app
// @ts-ignore
     */
// @ts-ignore
    type?: "invite" | "request";
// @ts-ignore
    /**
// @ts-ignore
     * special string key to be sent with the request
// @ts-ignore
     */
// @ts-ignore
    key?: string;
// @ts-ignore
    name?: string;
// @ts-ignore
    separate?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AuthRestoreParams {
// @ts-ignore
    /**
// @ts-ignore
     * User phone number.
// @ts-ignore
     */
// @ts-ignore
    phone: string;
// @ts-ignore
    /**
// @ts-ignore
     * User last name.
// @ts-ignore
     */
// @ts-ignore
    last_name: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BoardAddTopicParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community that owns the discussion board.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Topic title.
// @ts-ignore
     */
// @ts-ignore
    title: string;
// @ts-ignore
    /**
// @ts-ignore
     * Text of the topic.
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * For a community: '1' — to post the topic as by the community, '0' — to post the topic as by the user (default)
// @ts-ignore
     */
// @ts-ignore
    from_group?: boolean | number;
// @ts-ignore
    attachments?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BoardCloseTopicParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community that owns the discussion board.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Topic ID.
// @ts-ignore
     */
// @ts-ignore
    topic_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BoardCreateCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community that owns the discussion board.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the topic to be commented on.
// @ts-ignore
     */
// @ts-ignore
    topic_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * (Required if 'attachments' is not set.) Text of the comment.
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to post the comment as by the community, '0' — to post the comment as by the user (default)
// @ts-ignore
     */
// @ts-ignore
    from_group?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Sticker ID.
// @ts-ignore
     */
// @ts-ignore
    sticker_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Unique identifier to avoid repeated comments.
// @ts-ignore
     */
// @ts-ignore
    guid?: string;
// @ts-ignore
    attachments?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BoardDeleteCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community that owns the discussion board.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Topic ID.
// @ts-ignore
     */
// @ts-ignore
    topic_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID.
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
export interface BoardDeleteTopicParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community that owns the discussion board.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Topic ID.
// @ts-ignore
     */
// @ts-ignore
    topic_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BoardEditCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community that owns the discussion board.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Topic ID.
// @ts-ignore
     */
// @ts-ignore
    topic_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the comment on the topic.
// @ts-ignore
     */
// @ts-ignore
    comment_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * (Required if 'attachments' is not set). New comment text.
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    attachments?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BoardEditTopicParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community that owns the discussion board.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Topic ID.
// @ts-ignore
     */
// @ts-ignore
    topic_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * New title of the topic.
// @ts-ignore
     */
// @ts-ignore
    title: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BoardFixTopicParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community that owns the discussion board.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Topic ID.
// @ts-ignore
     */
// @ts-ignore
    topic_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BoardGetCommentsParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community that owns the discussion board.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Topic ID.
// @ts-ignore
     */
// @ts-ignore
    topic_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return the 'likes' field, '0' — not to return the 'likes' field (default)
// @ts-ignore
     */
// @ts-ignore
    need_likes?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of comments.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of comments to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return information about users who posted comments, '0' — to return no additional fields (default)
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Sort order: 'asc' — by creation date in chronological order, 'desc' — by creation date in reverse chronological order,
// @ts-ignore
     */
// @ts-ignore
    sort?: "asc" | "desc";
// @ts-ignore
    start_comment_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BoardGetTopicsParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community that owns the discussion board.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Sort order: '1' — by date updated in reverse chronological order. '2' — by date created in reverse chronological order. '-1' — by date updated in chronological order. '-2' — by date created in chronological order. If no sort order is specified, topics are returned in the order specified by the group administrator. Pinned topics are returned first, regardless of the sorting.
// @ts-ignore
     */
// @ts-ignore
    order?: 1 | 2 | -1 | -2 | 0;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of topics.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of topics to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return information about users who created topics or who posted there last, '0' — to return no additional fields (default)
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return the first comment in each topic,, '2' — to return the last comment in each topic,, '0' — to return no comments. By default: '0'.
// @ts-ignore
     */
// @ts-ignore
    preview?: 1 | 2 | 0;
// @ts-ignore
    /**
// @ts-ignore
     * Number of characters after which to truncate the previewed comment. To preview the full comment, specify '0'.
// @ts-ignore
     */
// @ts-ignore
    preview_length?: number;
// @ts-ignore
    topic_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BoardOpenTopicParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community that owns the discussion board.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Topic ID.
// @ts-ignore
     */
// @ts-ignore
    topic_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BoardRestoreCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community that owns the discussion board.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Topic ID.
// @ts-ignore
     */
// @ts-ignore
    topic_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID.
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
export interface BoardUnfixTopicParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community that owns the discussion board.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Topic ID.
// @ts-ignore
     */
// @ts-ignore
    topic_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DatabaseGetChairsParams {
// @ts-ignore
    /**
// @ts-ignore
     * id of the faculty to get chairs from
// @ts-ignore
     */
// @ts-ignore
    faculty_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * offset required to get a certain subset of chairs
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * amount of chairs to get
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DatabaseGetCitiesParams {
// @ts-ignore
    /**
// @ts-ignore
     * Country ID.
// @ts-ignore
     */
// @ts-ignore
    country_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Region ID.
// @ts-ignore
     */
// @ts-ignore
    region_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Search query.
// @ts-ignore
     */
// @ts-ignore
    q?: string;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return all cities in the country, '0' — to return major cities in the country (default),
// @ts-ignore
     */
// @ts-ignore
    need_all?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of cities.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of cities to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DatabaseGetCitiesByIdParams {
// @ts-ignore
    city_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DatabaseGetCountriesParams {
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return a full list of all countries, '0' — to return a list of countries near the current user's country (default).
// @ts-ignore
     */
// @ts-ignore
    need_all?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Country codes in [vk.com/dev/country_codes|ISO 3166-1 alpha-2] standard.
// @ts-ignore
     */
// @ts-ignore
    code?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of countries.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of countries to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DatabaseGetCountriesByIdParams {
// @ts-ignore
    country_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DatabaseGetFacultiesParams {
// @ts-ignore
    /**
// @ts-ignore
     * University ID.
// @ts-ignore
     */
// @ts-ignore
    university_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of faculties.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of faculties to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DatabaseGetMetroStationsParams {
// @ts-ignore
    city_id: number;
// @ts-ignore
    offset?: number;
// @ts-ignore
    count?: number;
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DatabaseGetMetroStationsByIdParams {
// @ts-ignore
    station_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DatabaseGetRegionsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Country ID, received in [vk.com/dev/database.getCountries|database.getCountries] method.
// @ts-ignore
     */
// @ts-ignore
    country_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Search query.
// @ts-ignore
     */
// @ts-ignore
    q?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return specific subset of regions.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of regions to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DatabaseGetSchoolClassesParams {
// @ts-ignore
    /**
// @ts-ignore
     * Country ID.
// @ts-ignore
     */
// @ts-ignore
    country_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DatabaseGetSchoolsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Search query.
// @ts-ignore
     */
// @ts-ignore
    q?: string;
// @ts-ignore
    /**
// @ts-ignore
     * City ID.
// @ts-ignore
     */
// @ts-ignore
    city_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of schools.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of schools to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DatabaseGetUniversitiesParams {
// @ts-ignore
    /**
// @ts-ignore
     * Search query.
// @ts-ignore
     */
// @ts-ignore
    q?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Country ID.
// @ts-ignore
     */
// @ts-ignore
    country_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * City ID.
// @ts-ignore
     */
// @ts-ignore
    city_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of universities.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of universities to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DocsAddParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the document. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Document ID.
// @ts-ignore
     */
// @ts-ignore
    doc_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Access key. This parameter is required if 'access_key' was returned with the document's data.
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DocsDeleteParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the document. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Document ID.
// @ts-ignore
     */
// @ts-ignore
    doc_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DocsEditParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID or community ID. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Document ID.
// @ts-ignore
     */
// @ts-ignore
    doc_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Document title.
// @ts-ignore
     */
// @ts-ignore
    title: string;
// @ts-ignore
    tags?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DocsGetParams {
// @ts-ignore
    /**
// @ts-ignore
     * Number of documents to return. By default, all documents.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of documents.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the documents. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    type?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
// @ts-ignore
    return_tags?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DocsGetByIdParams {
// @ts-ignore
    docs?: string[] | string;
// @ts-ignore
    return_tags?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DocsGetMessagesUploadServerParams {
// @ts-ignore
    /**
// @ts-ignore
     * Document type.
// @ts-ignore
     */
// @ts-ignore
    type?: "audio_message" | "doc" | "graffiti";
// @ts-ignore
    /**
// @ts-ignore
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'Chat ID', e.g. '2000000001'. For community: '- Community ID', e.g. '-12345'. "
// @ts-ignore
     */
// @ts-ignore
    peer_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DocsGetTypesParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the documents. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DocsGetUploadServerParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID (if the document will be uploaded to the community).
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DocsGetWallUploadServerParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID (if the document will be uploaded to the community).
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DocsSaveParams {
// @ts-ignore
    /**
// @ts-ignore
     * This parameter is returned when the file is [vk.com/dev/upload_files_2|uploaded to the server].
// @ts-ignore
     */
// @ts-ignore
    file: string;
// @ts-ignore
    /**
// @ts-ignore
     * Document title.
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Document tags.
// @ts-ignore
     */
// @ts-ignore
    tags?: string;
// @ts-ignore
    return_tags?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DocsSearchParams {
// @ts-ignore
    /**
// @ts-ignore
     * Search query string.
// @ts-ignore
     */
// @ts-ignore
    q: string;
// @ts-ignore
    /**
// @ts-ignore
     * Number of results to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of results.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    search_own?: boolean | number;
// @ts-ignore
    return_tags?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DonutGetFriendsParams {
// @ts-ignore
    owner_id: number;
// @ts-ignore
    offset?: number;
// @ts-ignore
    count?: number;
// @ts-ignore
    fields?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DonutGetSubscriptionParams {
// @ts-ignore
    owner_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DonutGetSubscriptionsParams {
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    offset?: number;
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DonutIsDonParams {
// @ts-ignore
    owner_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DownloadedGamesGetPaidStatusParams {
// @ts-ignore
    user_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveAddArticleParams {
// @ts-ignore
    url: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveAddLinkParams {
// @ts-ignore
    /**
// @ts-ignore
     * Link URL.
// @ts-ignore
     */
// @ts-ignore
    link: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveAddPageParams {
// @ts-ignore
    user_id?: number;
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveAddPostParams {
// @ts-ignore
    owner_id: number;
// @ts-ignore
    id: number;
// @ts-ignore
    access_key?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveAddProductParams {
// @ts-ignore
    owner_id: number;
// @ts-ignore
    id: number;
// @ts-ignore
    access_key?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveAddTagParams {
// @ts-ignore
    name?: string;
// @ts-ignore
    position?: "back" | "front";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveAddVideoParams {
// @ts-ignore
    owner_id: number;
// @ts-ignore
    id: number;
// @ts-ignore
    access_key?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveEditTagParams {
// @ts-ignore
    id: number;
// @ts-ignore
    name: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveGetParams {
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return additional 'wall', 'profiles', and 'groups' fields. By default: '0'.
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Tag ID.
// @ts-ignore
     */
// @ts-ignore
    tag_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of users.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of users to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    item_type?: "article" | "clip" | "link" | "narrative" | "page" | "podcast" | "post" | "product" | "video" | "youla_product";
// @ts-ignore
    fields?: string;
// @ts-ignore
    is_from_snackbar?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveGetPagesParams {
// @ts-ignore
    offset?: number;
// @ts-ignore
    count?: number;
// @ts-ignore
    type?: "groups" | "hints" | "users";
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    tag_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveGetTagsParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveMarkSeenParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveRemoveArticleParams {
// @ts-ignore
    owner_id: number;
// @ts-ignore
    article_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveRemoveLinkParams {
// @ts-ignore
    /**
// @ts-ignore
     * Link ID (can be obtained by [vk.com/dev/faves.getLinks|faves.getLinks] method).
// @ts-ignore
     */
// @ts-ignore
    link_id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link URL
// @ts-ignore
     */
// @ts-ignore
    link?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveRemovePageParams {
// @ts-ignore
    user_id?: number;
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveRemovePostParams {
// @ts-ignore
    owner_id: number;
// @ts-ignore
    id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveRemoveProductParams {
// @ts-ignore
    owner_id: number;
// @ts-ignore
    id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveRemoveTagParams {
// @ts-ignore
    id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveRemoveVideoParams {
// @ts-ignore
    owner_id: number;
// @ts-ignore
    id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveReorderTagsParams {
// @ts-ignore
    ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveSetPageTagsParams {
// @ts-ignore
    user_id?: number;
// @ts-ignore
    group_id?: number;
// @ts-ignore
    tag_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveSetTagsParams {
// @ts-ignore
    item_type?: "article" | "clip" | "link" | "narrative" | "page" | "podcast" | "post" | "product" | "video" | "youla_product";
// @ts-ignore
    item_owner_id?: number;
// @ts-ignore
    item_id?: number;
// @ts-ignore
    tag_ids?: number[] | number;
// @ts-ignore
    link_id?: string;
// @ts-ignore
    link_url?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveTrackPageInteractionParams {
// @ts-ignore
    user_id?: number;
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsAddParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user whose friend request will be approved or to whom a friend request will be sent.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Text of the message (up to 500 characters) for the friend request, if any.
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * '1' to pass an incoming request to followers list.
// @ts-ignore
     */
// @ts-ignore
    follow?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsAddListParams {
// @ts-ignore
    /**
// @ts-ignore
     * Name of the friend list.
// @ts-ignore
     */
// @ts-ignore
    name: string;
// @ts-ignore
    user_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsAreFriendsParams {
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return 'sign' field. 'sign' is md5("{id}_{user_id}_{friends_status}_{application_secret}"), where id is current user ID. This field allows to check that data has not been modified by the client. By default: '0'.
// @ts-ignore
     */
// @ts-ignore
    need_sign?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Return friend request read_state field
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    user_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsDeleteParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user whose friend request is to be declined or who is to be deleted from the current user's friend list.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsDeleteAllRequestsParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsDeleteListParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the friend list to delete.
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
export interface FriendsEditParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user whose friend list is to be edited.
// @ts-ignore
     */
// @ts-ignore
    user_id: number;
// @ts-ignore
    list_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsEditListParams {
// @ts-ignore
    /**
// @ts-ignore
     * Name of the friend list.
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Friend list ID.
// @ts-ignore
     */
// @ts-ignore
    list_id: number;
// @ts-ignore
    user_ids?: number[] | number;
// @ts-ignore
    add_user_ids?: number[] | number;
// @ts-ignore
    delete_user_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsGetParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID. By default, the current user ID.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Sort order: , 'name' — by name (enabled only if the 'fields' parameter is used), 'hints' — by rating, similar to how friends are sorted in My friends section, , This parameter is available only for [vk.com/dev/standalone|desktop applications].
// @ts-ignore
     */
// @ts-ignore
    order?: "hints" | "random" | "mobile" | "name" | "smart";
// @ts-ignore
    /**
// @ts-ignore
     * ID of the friend list returned by the [vk.com/dev/friends.getLists|friends.getLists] method to be used as the source. This parameter is taken into account only when the uid parameter is set to the current user ID. This parameter is available only for [vk.com/dev/standalone|desktop applications].
// @ts-ignore
     */
// @ts-ignore
    list_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of friends to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of friends.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Case for declension of user name and surname: , 'nom' — nominative (default) , 'gen' — genitive , 'dat' — dative , 'acc' — accusative , 'ins' — instrumental , 'abl' — prepositional
// @ts-ignore
     */
// @ts-ignore
    name_case?: "nom" | "gen" | "dat" | "acc" | "ins" | "abl";
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    ref?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsGetAppUsersParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsGetByPhonesParams {
// @ts-ignore
    phones?: string[] | string;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsGetListsParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return system friend lists. By default: '0'.
// @ts-ignore
     */
// @ts-ignore
    return_system?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsGetMutualParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user whose friends will be checked against the friends of the user specified in 'target_uid'.
// @ts-ignore
     */
// @ts-ignore
    source_uid?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user whose friends will be checked against the friends of the user specified in 'source_uid'.
// @ts-ignore
     */
// @ts-ignore
    target_uid?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Sort order: 'random' — random order
// @ts-ignore
     */
// @ts-ignore
    order?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Number of mutual friends to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of mutual friends.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    target_uids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsGetOnlineParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Friend list ID. If this parameter is not set, information about all online friends is returned.
// @ts-ignore
     */
// @ts-ignore
    list_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return an additional 'online_mobile' field, '0' — (default),
// @ts-ignore
     */
// @ts-ignore
    online_mobile?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Sort order: 'random' — random order
// @ts-ignore
     */
// @ts-ignore
    order?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Number of friends to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of friends.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsGetRecentParams {
// @ts-ignore
    /**
// @ts-ignore
     * Number of recently added friends to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsGetRequestsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of friend requests.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of friend requests to return (default 100, maximum 1000).
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return response messages from users who have sent a friend request or, if 'suggested' is set to '1', to return a list of suggested friends
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return a list of mutual friends (up to 20), if any
// @ts-ignore
     */
// @ts-ignore
    need_mutual?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return outgoing requests, '0' — to return incoming requests (default)
// @ts-ignore
     */
// @ts-ignore
    out?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Sort order: '1' — by number of mutual friends, '0' — by date
// @ts-ignore
     */
// @ts-ignore
    sort?: 0 | 1 | 2;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return a list of suggested friends, '0' — to return friend requests (default)
// @ts-ignore
     */
// @ts-ignore
    suggested?: boolean | number;
// @ts-ignore
    need_viewed?: boolean | number;
// @ts-ignore
    ref?: string;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsGetSuggestionsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Number of suggestions to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of suggestions.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Case for declension of user name and surname: , 'nom' — nominative (default) , 'gen' — genitive , 'dat' — dative , 'acc' — accusative , 'ins' — instrumental , 'abl' — prepositional
// @ts-ignore
     */
// @ts-ignore
    name_case?: "nom" | "gen" | "dat" | "acc" | "ins" | "abl";
// @ts-ignore
    filter?: ("mutual" | "contacts" | "mutual_contacts")[] | ("mutual" | "contacts" | "mutual_contacts");
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsSearchParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Search query string (e.g., 'Vasya Babich').
// @ts-ignore
     */
// @ts-ignore
    q?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Case for declension of user name and surname: 'nom' — nominative (default), 'gen' — genitive , 'dat' — dative, 'acc' — accusative , 'ins' — instrumental , 'abl' — prepositional
// @ts-ignore
     */
// @ts-ignore
    name_case?: "Nom" | "Gen" | "Dat" | "Acc" | "Ins" | "Abl";
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of friends.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of friends to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GiftsGetParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of gifts to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of results.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsAddAddressParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    title: string;
// @ts-ignore
    address: string;
// @ts-ignore
    additional_address?: string;
// @ts-ignore
    country_id: number;
// @ts-ignore
    city_id: number;
// @ts-ignore
    metro_id?: number;
// @ts-ignore
    latitude: number;
// @ts-ignore
    longitude: number;
// @ts-ignore
    phone?: string;
// @ts-ignore
    work_info_status?: Objects.GroupsAddressWorkInfoStatus;
// @ts-ignore
    timetable?: string;
// @ts-ignore
    is_main_address?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsAddCallbackServerParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    url: string;
// @ts-ignore
    title: string;
// @ts-ignore
    secret_key?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsAddLinkParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Link URL.
// @ts-ignore
     */
// @ts-ignore
    link: string;
// @ts-ignore
    /**
// @ts-ignore
     * Description text for the link.
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsApproveRequestParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * User ID.
// @ts-ignore
     */
// @ts-ignore
    user_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsBanParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    end_date?: number;
// @ts-ignore
    reason?: number;
// @ts-ignore
    comment?: string;
// @ts-ignore
    comment_visible?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsCreateParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community title.
// @ts-ignore
     */
// @ts-ignore
    title: string;
// @ts-ignore
    /**
// @ts-ignore
     * Community description (ignored for 'type' = 'public').
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Community type. Possible values: *'group' - group,, *'event' - event,, *'public' - public page
// @ts-ignore
     */
// @ts-ignore
    type?: "event" | "group" | "public";
// @ts-ignore
    /**
// @ts-ignore
     * Category ID (for 'type' = 'public' only).
// @ts-ignore
     */
// @ts-ignore
    public_category?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Public page subcategory ID.
// @ts-ignore
     */
// @ts-ignore
    public_subcategory?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Public page subtype. Possible values: *'1' - place or small business,, *'2' - company, organization or website,, *'3' - famous person or group of people,, *'4' - product or work of art.
// @ts-ignore
     */
// @ts-ignore
    subtype?: 1 | 2 | 3 | 4;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsDeleteAddressParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    address_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsDeleteCallbackServerParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    server_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsDeleteLinkParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Link ID.
// @ts-ignore
     */
// @ts-ignore
    link_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsDisableOnlineParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsEditParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Community title.
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Community description.
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Community screen name.
// @ts-ignore
     */
// @ts-ignore
    screen_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Website that will be displayed in the community information field.
// @ts-ignore
     */
// @ts-ignore
    website?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Organizer email (for events).
// @ts-ignore
     */
// @ts-ignore
    email?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Organizer phone number (for events).
// @ts-ignore
     */
// @ts-ignore
    phone?: string;
// @ts-ignore
    /**
// @ts-ignore
     * RSS feed address for import (available only to communities with special permission. Contact vk.com/support to get it.
// @ts-ignore
     */
// @ts-ignore
    rss?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Event start date in Unixtime format.
// @ts-ignore
     */
// @ts-ignore
    event_start_date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Event finish date in Unixtime format.
// @ts-ignore
     */
// @ts-ignore
    event_finish_date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Organizer community ID (for events only).
// @ts-ignore
     */
// @ts-ignore
    event_group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Public page category ID.
// @ts-ignore
     */
// @ts-ignore
    public_category?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Public page subcategory ID.
// @ts-ignore
     */
// @ts-ignore
    public_subcategory?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Founding date of a company or organization owning the community in "dd.mm.YYYY" format.
// @ts-ignore
     */
// @ts-ignore
    public_date?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Links settings (for public pages only). Possible values: *'0' - disabled,, *'1' - enabled.
// @ts-ignore
     */
// @ts-ignore
    links?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Events settings (for public pages only). Possible values: *'0' - disabled,, *'1' - enabled.
// @ts-ignore
     */
// @ts-ignore
    events?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Places settings (for public pages only). Possible values: *'0' - disabled,, *'1' - enabled.
// @ts-ignore
     */
// @ts-ignore
    places?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Contacts settings (for public pages only). Possible values: *'0' - disabled,, *'1' - enabled.
// @ts-ignore
     */
// @ts-ignore
    contacts?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Community messages. Possible values: *'0' — disabled,, *'1' — enabled.
// @ts-ignore
     */
// @ts-ignore
    messages?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Market settings. Possible values: *'0' - disabled,, *'1' - enabled.
// @ts-ignore
     */
// @ts-ignore
    market?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * market comments settings. Possible values: *'0' - disabled,, *'1' - enabled.
// @ts-ignore
     */
// @ts-ignore
    market_comments?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Seller contact for market. Set '0' for community messages.
// @ts-ignore
     */
// @ts-ignore
    market_contact?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of a wiki page with market description.
// @ts-ignore
     */
// @ts-ignore
    market_wiki?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Obscene expressions filter in comments. Possible values: , *'0' - disabled,, *'1' - enabled.
// @ts-ignore
     */
// @ts-ignore
    obscene_filter?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Stopwords filter in comments. Possible values: , *'0' - disabled,, *'1' - enabled.
// @ts-ignore
     */
// @ts-ignore
    obscene_stopwords?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Country of the community.
// @ts-ignore
     */
// @ts-ignore
    country?: number;
// @ts-ignore
    /**
// @ts-ignore
     * City of the community.
// @ts-ignore
     */
// @ts-ignore
    city?: number;
// @ts-ignore
    access?: Objects.GroupsGroupAccess;
// @ts-ignore
    subject?: Objects.GroupsGroupSubject;
// @ts-ignore
    wall?: Objects.GroupsGroupWall;
// @ts-ignore
    topics?: Objects.GroupsGroupTopics;
// @ts-ignore
    photos?: Objects.GroupsGroupPhotos;
// @ts-ignore
    video?: Objects.GroupsGroupVideo;
// @ts-ignore
    audio?: Objects.GroupsGroupAudio;
// @ts-ignore
    docs?: Objects.GroupsGroupDocs;
// @ts-ignore
    wiki?: Objects.GroupsGroupWiki;
// @ts-ignore
    articles?: boolean | number;
// @ts-ignore
    addresses?: boolean | number;
// @ts-ignore
    age_limits?: Objects.GroupsGroupAgeLimits;
// @ts-ignore
    market_country?: number[] | number;
// @ts-ignore
    market_city?: number[] | number;
// @ts-ignore
    market_currency?: Objects.GroupsGroupMarketCurrency;
// @ts-ignore
    obscene_words?: string[] | string;
// @ts-ignore
    main_section?: number;
// @ts-ignore
    secondary_section?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsEditAddressParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    address_id: number;
// @ts-ignore
    title?: string;
// @ts-ignore
    address?: string;
// @ts-ignore
    additional_address?: string;
// @ts-ignore
    country_id?: number;
// @ts-ignore
    city_id?: number;
// @ts-ignore
    metro_id?: number;
// @ts-ignore
    latitude?: number;
// @ts-ignore
    longitude?: number;
// @ts-ignore
    phone?: string;
// @ts-ignore
    work_info_status?: Objects.GroupsAddressWorkInfoStatus;
// @ts-ignore
    timetable?: string;
// @ts-ignore
    is_main_address?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsEditCallbackServerParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    server_id: number;
// @ts-ignore
    url: string;
// @ts-ignore
    title: string;
// @ts-ignore
    secret_key?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsEditLinkParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Link ID.
// @ts-ignore
     */
// @ts-ignore
    link_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * New description text for the link.
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsEditManagerParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * User ID.
// @ts-ignore
     */
// @ts-ignore
    user_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to show the manager in Contacts block of the community.
// @ts-ignore
     */
// @ts-ignore
    is_contact?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Position to show in Contacts block.
// @ts-ignore
     */
// @ts-ignore
    contact_position?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Contact phone.
// @ts-ignore
     */
// @ts-ignore
    contact_phone?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Contact e-mail.
// @ts-ignore
     */
// @ts-ignore
    contact_email?: string;
// @ts-ignore
    role?: Objects.GroupsGroupRole;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsEnableOnlineParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return complete information about a user's communities, '0' — to return a list of community IDs without any additional fields (default),
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of communities.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of communities to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    filter?: Objects.GroupsFilter[];
// @ts-ignore
    fields?: Objects.GroupsFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetAddressesParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID or screen name of the community.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Latitude of  the user geo position.
// @ts-ignore
     */
// @ts-ignore
    latitude?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Longitude of the user geo position.
// @ts-ignore
     */
// @ts-ignore
    longitude?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of community addresses.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of community addresses to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    address_ids?: number[] | number;
// @ts-ignore
    fields?: Objects.AddressesFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetBannedParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of users.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of users to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetByIdParams {
// @ts-ignore
    group_ids?: any[];
// @ts-ignore
    group_id?: any;
// @ts-ignore
    fields?: Objects.GroupsFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetCallbackConfirmationCodeParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetCallbackServersParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    server_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetCallbackSettingsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Server ID.
// @ts-ignore
     */
// @ts-ignore
    server_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetCatalogParams {
// @ts-ignore
    /**
// @ts-ignore
     * Category id received from [vk.com/dev/groups.getCatalogInfo|groups.getCatalogInfo].
// @ts-ignore
     */
// @ts-ignore
    category_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Subcategory id received from [vk.com/dev/groups.getCatalogInfo|groups.getCatalogInfo].
// @ts-ignore
     */
// @ts-ignore
    subcategory_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetCatalogInfoParams {
// @ts-ignore
    /**
// @ts-ignore
     * 1 - to return communities count and three communities for preview. By default: 0.
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * 1 - to return subcategories info. By default: 0.
// @ts-ignore
     */
// @ts-ignore
    subcategories?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetInvitedUsersParams {
// @ts-ignore
    /**
// @ts-ignore
     * Group ID to return invited users for.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of results.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of results to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Case for declension of user name and surname. Possible values: *'nom' — nominative (default),, *'gen' — genitive,, *'dat' — dative,, *'acc' — accusative, , *'ins' — instrumental,, *'abl' — prepositional.
// @ts-ignore
     */
// @ts-ignore
    name_case?: "nom" | "gen" | "dat" | "acc" | "ins" | "abl";
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetInvitesParams {
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of invitations.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of invitations to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return additional [vk.com/dev/fields_groups|fields] for communities..
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetLongPollServerParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetLongPollSettingsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetMembersParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID or screen name of the community.
// @ts-ignore
     */
// @ts-ignore
    group_id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Sort order. Available values: 'id_asc', 'id_desc', 'time_asc', 'time_desc'. 'time_asc' and 'time_desc' are availavle only if the method is called by the group's 'moderator'.
// @ts-ignore
     */
// @ts-ignore
    sort?: "id_asc" | "id_desc" | "time_asc" | "time_desc";
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of community members.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of community members to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * *'friends' - only friends in this community will be returned,, *'unsure' - only those who pressed 'I may attend' will be returned (if it's an event).
// @ts-ignore
     */
// @ts-ignore
    filter?: "friends" | "unsure" | "managers" | "donut";
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetRequestsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of results.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of results to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetSettingsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetTagListParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGetTokenPermissionsParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsInviteParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * User ID.
// @ts-ignore
     */
// @ts-ignore
    user_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsIsMemberParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID or screen name of the community.
// @ts-ignore
     */
// @ts-ignore
    group_id: string;
// @ts-ignore
    /**
// @ts-ignore
     * User ID.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return an extended response with additional fields. By default: '0'.
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    user_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsJoinParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID or screen name of the community.
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Optional parameter which is taken into account when 'gid' belongs to the event: '1' — Perhaps I will attend, '0' — I will be there for sure (default), ,
// @ts-ignore
     */
// @ts-ignore
    not_sure?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsLeaveParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID or screen name of the community.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsRemoveUserParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * User ID.
// @ts-ignore
     */
// @ts-ignore
    user_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsReorderLinkParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Link ID.
// @ts-ignore
     */
// @ts-ignore
    link_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the link after which to place the link with 'link_id'.
// @ts-ignore
     */
// @ts-ignore
    after?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsSearchParams {
// @ts-ignore
    /**
// @ts-ignore
     * Search query string.
// @ts-ignore
     */
// @ts-ignore
    q: string;
// @ts-ignore
    /**
// @ts-ignore
     * Community type. Possible values: 'group, page, event.'
// @ts-ignore
     */
// @ts-ignore
    type?: "group" | "page" | "event";
// @ts-ignore
    /**
// @ts-ignore
     * Country ID.
// @ts-ignore
     */
// @ts-ignore
    country_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * City ID. If this parameter is transmitted, country_id is ignored.
// @ts-ignore
     */
// @ts-ignore
    city_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return only upcoming events. Works with the 'type' = 'event' only.
// @ts-ignore
     */
// @ts-ignore
    future?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return communities with enabled market only.
// @ts-ignore
     */
// @ts-ignore
    market?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Sort order. Possible values: *'0' — default sorting (similar the full version of the site),, *'1' — by growth speed,, *'2'— by the "day attendance/members number" ratio,, *'3' — by the "Likes number/members number" ratio,, *'4' — by the "comments number/members number" ratio,, *'5' — by the "boards entries number/members number" ratio.
// @ts-ignore
     */
// @ts-ignore
    sort?: 0 | 1 | 2 | 3 | 4 | 5;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of results.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of communities to return. "Note that you can not receive more than first thousand of results, regardless of 'count' and 'offset' values."
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsSetCallbackSettingsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Server ID.
// @ts-ignore
     */
// @ts-ignore
    server_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * A new incoming message has been received ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    message_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A new outcoming message has been received ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    message_reply?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Allowed messages notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    message_allow?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Denied messages notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    message_deny?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New photos notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    photo_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New audios notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    audio_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New videos notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    video_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New wall replies notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    wall_reply_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Wall replies edited notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    wall_reply_edit?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A wall comment has been deleted ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    wall_reply_delete?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A wall comment has been restored ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    wall_reply_restore?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New wall posts notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    wall_post_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New wall posts notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    wall_repost?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New board posts notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    board_post_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Board posts edited notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    board_post_edit?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Board posts restored notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    board_post_restore?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Board posts deleted notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    board_post_delete?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New comment to photo notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    photo_comment_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A photo comment has been edited ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    photo_comment_edit?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A photo comment has been deleted ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    photo_comment_delete?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A photo comment has been restored ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    photo_comment_restore?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New comment to video notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    video_comment_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A video comment has been edited ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    video_comment_edit?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A video comment has been deleted ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    video_comment_delete?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A video comment has been restored ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    video_comment_restore?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New comment to market item notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    market_comment_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A market comment has been edited ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    market_comment_edit?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A market comment has been deleted ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    market_comment_delete?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A market comment has been restored ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    market_comment_restore?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A vote in a public poll has been added ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    poll_vote_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Joined community notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    group_join?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Left community notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    group_leave?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * User added to community blacklist
// @ts-ignore
     */
// @ts-ignore
    user_block?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * User removed from community blacklist
// @ts-ignore
     */
// @ts-ignore
    user_unblock?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New form in lead forms
// @ts-ignore
     */
// @ts-ignore
    lead_forms_new?: boolean | number;
// @ts-ignore
    api_version?: string;
// @ts-ignore
    message_edit?: boolean | number;
// @ts-ignore
    message_typing_state?: boolean | number;
// @ts-ignore
    market_order_new?: boolean | number;
// @ts-ignore
    market_order_edit?: boolean | number;
// @ts-ignore
    group_change_settings?: boolean | number;
// @ts-ignore
    group_change_photo?: boolean | number;
// @ts-ignore
    group_officers_edit?: boolean | number;
// @ts-ignore
    like_add?: boolean | number;
// @ts-ignore
    like_remove?: boolean | number;
// @ts-ignore
    message_event?: boolean | number;
// @ts-ignore
    donut_subscription_create?: boolean | number;
// @ts-ignore
    donut_subscription_prolonged?: boolean | number;
// @ts-ignore
    donut_subscription_cancelled?: boolean | number;
// @ts-ignore
    donut_subscription_price_changed?: boolean | number;
// @ts-ignore
    donut_subscription_expired?: boolean | number;
// @ts-ignore
    donut_money_withdraw?: boolean | number;
// @ts-ignore
    donut_money_withdraw_error?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsSetLongPollSettingsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Sets whether Long Poll is enabled ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    enabled?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A new incoming message has been received ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    message_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A new outcoming message has been received ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    message_reply?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Allowed messages notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    message_allow?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Denied messages notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    message_deny?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A message has been edited ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    message_edit?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New photos notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    photo_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New audios notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    audio_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New videos notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    video_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New wall replies notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    wall_reply_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Wall replies edited notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    wall_reply_edit?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A wall comment has been deleted ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    wall_reply_delete?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A wall comment has been restored ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    wall_reply_restore?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New wall posts notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    wall_post_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New wall posts notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    wall_repost?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New board posts notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    board_post_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Board posts edited notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    board_post_edit?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Board posts restored notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    board_post_restore?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Board posts deleted notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    board_post_delete?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New comment to photo notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    photo_comment_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A photo comment has been edited ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    photo_comment_edit?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A photo comment has been deleted ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    photo_comment_delete?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A photo comment has been restored ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    photo_comment_restore?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New comment to video notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    video_comment_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A video comment has been edited ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    video_comment_edit?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A video comment has been deleted ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    video_comment_delete?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A video comment has been restored ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    video_comment_restore?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * New comment to market item notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    market_comment_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A market comment has been edited ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    market_comment_edit?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A market comment has been deleted ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    market_comment_delete?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A market comment has been restored ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    market_comment_restore?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * A vote in a public poll has been added ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    poll_vote_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Joined community notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    group_join?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Left community notifications ('0' — disabled, '1' — enabled).
// @ts-ignore
     */
// @ts-ignore
    group_leave?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * User added to community blacklist
// @ts-ignore
     */
// @ts-ignore
    user_block?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * User removed from community blacklist
// @ts-ignore
     */
// @ts-ignore
    user_unblock?: boolean | number;
// @ts-ignore
    api_version?: string;
// @ts-ignore
    message_typing_state?: boolean | number;
// @ts-ignore
    group_change_settings?: boolean | number;
// @ts-ignore
    group_change_photo?: boolean | number;
// @ts-ignore
    group_officers_edit?: boolean | number;
// @ts-ignore
    like_add?: boolean | number;
// @ts-ignore
    like_remove?: boolean | number;
// @ts-ignore
    message_event?: boolean | number;
// @ts-ignore
    donut_subscription_create?: boolean | number;
// @ts-ignore
    donut_subscription_prolonged?: boolean | number;
// @ts-ignore
    donut_subscription_cancelled?: boolean | number;
// @ts-ignore
    donut_subscription_price_changed?: boolean | number;
// @ts-ignore
    donut_subscription_expired?: boolean | number;
// @ts-ignore
    donut_money_withdraw?: boolean | number;
// @ts-ignore
    donut_money_withdraw_error?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsSetSettingsParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    messages?: boolean | number;
// @ts-ignore
    bots_capabilities?: boolean | number;
// @ts-ignore
    bots_start_button?: boolean | number;
// @ts-ignore
    bots_add_to_chat?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsSetUserNoteParams {
// @ts-ignore
    /**
// @ts-ignore
     * Note body
// @ts-ignore
     */
// @ts-ignore
    note?: string;
// @ts-ignore
    group_id: number;
// @ts-ignore
    user_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsTagAddParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    tag_name: string;
// @ts-ignore
    tag_color?: "454647" | "45678f" | "4bb34b" | "5181b8" | "539b9c" | "5c9ce6" | "63b9ba" | "6bc76b" | "76787a" | "792ec0" | "7a6c4f" | "7ececf" | "9e8d6b" | "a162de" | "aaaeb3" | "bbaa84" | "e64646" | "ff5c5c" | "ffa000" | "ffc107";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsTagBindParams {
// @ts-ignore
    /**
// @ts-ignore
     * Describe the action
// @ts-ignore
     */
// @ts-ignore
    act: "bind" | "unbind";
// @ts-ignore
    group_id: number;
// @ts-ignore
    tag_id: number;
// @ts-ignore
    user_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsTagDeleteParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    tag_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsTagUpdateParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    tag_id: number;
// @ts-ignore
    tag_name: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsToggleMarketParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    state?: Objects.GroupsMarketState;
// @ts-ignore
    ref?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsUnbanParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LeadFormsCreateParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    name: string;
// @ts-ignore
    title: string;
// @ts-ignore
    description: string;
// @ts-ignore
    questions: string;
// @ts-ignore
    policy_link_url: string;
// @ts-ignore
    photo?: string;
// @ts-ignore
    confirmation?: string;
// @ts-ignore
    site_link_url?: string;
// @ts-ignore
    active?: boolean | number;
// @ts-ignore
    once_per_user?: boolean | number;
// @ts-ignore
    pixel_code?: string;
// @ts-ignore
    notify_admins?: number[] | number;
// @ts-ignore
    notify_emails?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LeadFormsDeleteParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    form_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LeadFormsGetParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    form_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LeadFormsGetLeadsParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    form_id: number;
// @ts-ignore
    limit?: number;
// @ts-ignore
    next_page_token?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LeadFormsGetUploadURLParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LeadFormsListParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LeadFormsUpdateParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    form_id: number;
// @ts-ignore
    name: string;
// @ts-ignore
    title: string;
// @ts-ignore
    description: string;
// @ts-ignore
    questions: string;
// @ts-ignore
    policy_link_url: string;
// @ts-ignore
    photo?: string;
// @ts-ignore
    confirmation?: string;
// @ts-ignore
    site_link_url?: string;
// @ts-ignore
    active?: boolean | number;
// @ts-ignore
    once_per_user?: boolean | number;
// @ts-ignore
    pixel_code?: string;
// @ts-ignore
    notify_admins?: number[] | number;
// @ts-ignore
    notify_emails?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LikesAddParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the object.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Object ID.
// @ts-ignore
     */
// @ts-ignore
    item_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Access key required for an object owned by a private entity.
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    type?: Objects.LikesType;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LikesDeleteParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the object.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Object ID.
// @ts-ignore
     */
// @ts-ignore
    item_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Access key required for an object owned by a private entity.
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    type?: Objects.LikesType;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LikesGetListParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user, community, or application that owns the object. If the 'type' parameter is set as 'sitepage', the application ID is passed as 'owner_id'. Use negative value for a community id. If the 'type' parameter is not set, the 'owner_id' is assumed to be either the current user or the same application ID as if the 'type' parameter was set to 'sitepage'.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Object ID. If 'type' is set as 'sitepage', 'item_id' can include the 'page_id' parameter value used during initialization of the [vk.com/dev/Like|Like widget].
// @ts-ignore
     */
// @ts-ignore
    item_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the page where the [vk.com/dev/Like|Like widget] is installed. Used instead of the 'item_id' parameter.
// @ts-ignore
     */
// @ts-ignore
    page_url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Filters to apply: 'likes' — returns information about all users who liked the object (default), 'copies' — returns information only about users who told their friends about the object
// @ts-ignore
     */
// @ts-ignore
    filter?: "likes" | "copies";
// @ts-ignore
    /**
// @ts-ignore
     * Specifies which users are returned: '1' — to return only the current user's friends, '0' — to return all users (default)
// @ts-ignore
     */
// @ts-ignore
    friends_only?: 0 | 1 | 2 | 3;
// @ts-ignore
    /**
// @ts-ignore
     * Specifies whether extended information will be returned. '1' — to return extended information about users and communities from the 'Likes' list, '0' — to return no additional information (default)
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to select a specific subset of users.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of user IDs to return (maximum '1000'). Default is '100' if 'friends_only' is set to '0', otherwise, the default is '10' if 'friends_only' is set to '1'.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    type?: Objects.LikesType;
// @ts-ignore
    skip_own?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LikesIsLikedParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the object.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Object ID.
// @ts-ignore
     */
// @ts-ignore
    item_id: number;
// @ts-ignore
    type?: Objects.LikesType;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketAddParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of an item owner community.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Item name.
// @ts-ignore
     */
// @ts-ignore
    name: string;
// @ts-ignore
    /**
// @ts-ignore
     * Item description.
// @ts-ignore
     */
// @ts-ignore
    description: string;
// @ts-ignore
    /**
// @ts-ignore
     * Item category ID.
// @ts-ignore
     */
// @ts-ignore
    category_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Item price.
// @ts-ignore
     */
// @ts-ignore
    price?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Item status ('1' — deleted, '0' — not deleted).
// @ts-ignore
     */
// @ts-ignore
    deleted?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Cover photo ID.
// @ts-ignore
     */
// @ts-ignore
    main_photo_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Url for button in market item.
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    old_price?: number;
// @ts-ignore
    photo_ids?: number[] | number;
// @ts-ignore
    dimension_width?: number;
// @ts-ignore
    dimension_height?: number;
// @ts-ignore
    dimension_length?: number;
// @ts-ignore
    weight?: number;
// @ts-ignore
    sku?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketAddAlbumParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of an item owner community.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Collection title.
// @ts-ignore
     */
// @ts-ignore
    title: string;
// @ts-ignore
    /**
// @ts-ignore
     * Cover photo ID.
// @ts-ignore
     */
// @ts-ignore
    photo_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Set as main ('1' - set, '0' - no).
// @ts-ignore
     */
// @ts-ignore
    main_album?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Set as hidden
// @ts-ignore
     */
// @ts-ignore
    is_hidden?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketAddToAlbumParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of an item owner community.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    item_ids?: number[] | number;
// @ts-ignore
    album_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketCreateCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of an item owner community.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Item ID.
// @ts-ignore
     */
// @ts-ignore
    item_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment text (required if 'attachments' parameter is not specified)
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    /**
// @ts-ignore
     * '1' - comment will be published on behalf of a community, '0' - on behalf of a user (by default).
// @ts-ignore
     */
// @ts-ignore
    from_group?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of a comment to reply with current comment to.
// @ts-ignore
     */
// @ts-ignore
    reply_to_comment?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Sticker ID.
// @ts-ignore
     */
// @ts-ignore
    sticker_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Random value to avoid resending one comment.
// @ts-ignore
     */
// @ts-ignore
    guid?: string;
// @ts-ignore
    attachments?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketDeleteParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of an item owner community.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Item ID.
// @ts-ignore
     */
// @ts-ignore
    item_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketDeleteAlbumParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of an collection owner community.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Collection ID.
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
export interface MarketDeleteCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * identifier of an item owner community, "Note that community id in the 'owner_id' parameter should be negative number. For example 'owner_id'=-1 matches the [vk.com/apiclub|VK API] community "
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * comment id
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
export interface MarketEditParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of an item owner community.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Item ID.
// @ts-ignore
     */
// @ts-ignore
    item_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Item name.
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Item description.
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Item category ID.
// @ts-ignore
     */
// @ts-ignore
    category_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Item price.
// @ts-ignore
     */
// @ts-ignore
    price?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Item status ('1' — deleted, '0' — not deleted).
// @ts-ignore
     */
// @ts-ignore
    deleted?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Cover photo ID.
// @ts-ignore
     */
// @ts-ignore
    main_photo_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Url for button in market item.
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    old_price?: number;
// @ts-ignore
    photo_ids?: number[] | number;
// @ts-ignore
    dimension_width?: number;
// @ts-ignore
    dimension_height?: number;
// @ts-ignore
    dimension_length?: number;
// @ts-ignore
    weight?: number;
// @ts-ignore
    sku?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketEditAlbumParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of an collection owner community.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Collection ID.
// @ts-ignore
     */
// @ts-ignore
    album_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Collection title.
// @ts-ignore
     */
// @ts-ignore
    title: string;
// @ts-ignore
    /**
// @ts-ignore
     * Cover photo id
// @ts-ignore
     */
// @ts-ignore
    photo_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Set as main ('1' - set, '0' - no).
// @ts-ignore
     */
// @ts-ignore
    main_album?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Set as hidden
// @ts-ignore
     */
// @ts-ignore
    is_hidden?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketEditCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of an item owner community.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID.
// @ts-ignore
     */
// @ts-ignore
    comment_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * New comment text (required if 'attachments' are not specified), , 2048 symbols maximum.
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    attachments?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketEditOrderParams {
// @ts-ignore
    user_id: number;
// @ts-ignore
    order_id: number;
// @ts-ignore
    merchant_comment?: string;
// @ts-ignore
    status?: number;
// @ts-ignore
    track_number?: string;
// @ts-ignore
    payment_status?: "not_paid" | "paid" | "returned";
// @ts-ignore
    delivery_price?: number;
// @ts-ignore
    width?: number;
// @ts-ignore
    length?: number;
// @ts-ignore
    height?: number;
// @ts-ignore
    weight?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of an item owner community, "Note that community id in the 'owner_id' parameter should be negative number. For example 'owner_id'=-1 matches the [vk.com/apiclub|VK API] community "
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of items to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of results.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' - method will return additional fields: 'likes, can_comment, car_repost, photos'. These parameters are not returned by default.
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Items update date from (format: yyyy-mm-dd)
// @ts-ignore
     */
// @ts-ignore
    date_from?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Items update date to (format: yyyy-mm-dd)
// @ts-ignore
     */
// @ts-ignore
    date_to?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Add variants to response if exist
// @ts-ignore
     */
// @ts-ignore
    need_variants?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Add disabled items to response
// @ts-ignore
     */
// @ts-ignore
    with_disabled?: boolean | number;
// @ts-ignore
    album_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetAlbumByIdParams {
// @ts-ignore
    /**
// @ts-ignore
     * identifier of an album owner community, "Note that community id in the 'owner_id' parameter should be negative number. For example 'owner_id'=-1 matches the [vk.com/apiclub|VK API] community "
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    album_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetAlbumsParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of an items owner community.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of results.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of items to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetByIdParams {
// @ts-ignore
    /**
// @ts-ignore
     * '1' - to return additional fields: 'likes, can_comment, car_repost, photos'. By default: '0'.
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    item_ids?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetCategoriesParams {
// @ts-ignore
    /**
// @ts-ignore
     * Number of results to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of results.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetCommentsParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of an item owner community
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Item ID.
// @ts-ignore
     */
// @ts-ignore
    item_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return likes info.
// @ts-ignore
     */
// @ts-ignore
    need_likes?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of a comment to start a list from (details below).
// @ts-ignore
     */
// @ts-ignore
    start_comment_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of results to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Sort order ('asc' — from old to new, 'desc' — from new to old)
// @ts-ignore
     */
// @ts-ignore
    sort?: "asc" | "desc";
// @ts-ignore
    /**
// @ts-ignore
     * '1' — comments will be returned as numbered objects, in addition lists of 'profiles' and 'groups' objects will be returned.
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    offset?: number;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetGroupOrdersParams {
// @ts-ignore
    group_id: number;
// @ts-ignore
    offset?: number;
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetOrderByIdParams {
// @ts-ignore
    user_id?: number;
// @ts-ignore
    order_id: number;
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetOrderItemsParams {
// @ts-ignore
    user_id?: number;
// @ts-ignore
    order_id: number;
// @ts-ignore
    offset?: number;
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketGetOrdersParams {
// @ts-ignore
    /**
// @ts-ignore
     * Orders status updated date from (format: yyyy-mm-dd)
// @ts-ignore
     */
// @ts-ignore
    date_from?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Orders status updated date to (format: yyyy-mm-dd)
// @ts-ignore
     */
// @ts-ignore
    date_to?: string;
// @ts-ignore
    offset?: number;
// @ts-ignore
    count?: number;
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketRemoveFromAlbumParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of an item owner community.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Item ID.
// @ts-ignore
     */
// @ts-ignore
    item_id: number;
// @ts-ignore
    album_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketReorderAlbumsParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of an item owner community.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Collection ID.
// @ts-ignore
     */
// @ts-ignore
    album_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of a collection to place current collection before it.
// @ts-ignore
     */
// @ts-ignore
    before?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of a collection to place current collection after it.
// @ts-ignore
     */
// @ts-ignore
    after?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketReorderItemsParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of an item owner community.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of a collection to reorder items in. Set 0 to reorder full items list.
// @ts-ignore
     */
// @ts-ignore
    album_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Item ID.
// @ts-ignore
     */
// @ts-ignore
    item_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of an item to place current item before it.
// @ts-ignore
     */
// @ts-ignore
    before?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of an item to place current item after it.
// @ts-ignore
     */
// @ts-ignore
    after?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketReportParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of an item owner community.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Item ID.
// @ts-ignore
     */
// @ts-ignore
    item_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Complaint reason. Possible values: *'0' — spam,, *'1' — child porn,, *'2' — extremism,, *'3' — violence,, *'4' — drugs propaganda,, *'5' — adult materials,, *'6' — insult.
// @ts-ignore
     */
// @ts-ignore
    reason?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketReportCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of an item owner community.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID.
// @ts-ignore
     */
// @ts-ignore
    comment_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Complaint reason. Possible values: *'0' — spam,, *'1' — child porn,, *'2' — extremism,, *'3' — violence,, *'4' — drugs propaganda,, *'5' — adult materials,, *'6' — insult.
// @ts-ignore
     */
// @ts-ignore
    reason: 0 | 1 | 2 | 3 | 4 | 5 | 6;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketRestoreParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of an item owner community.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Deleted item ID.
// @ts-ignore
     */
// @ts-ignore
    item_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketRestoreCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * identifier of an item owner community, "Note that community id in the 'owner_id' parameter should be negative number. For example 'owner_id'=-1 matches the [vk.com/apiclub|VK API] community "
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * deleted comment id
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
export interface MarketSearchParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of an items owner community.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Search query, for example "pink slippers".
// @ts-ignore
     */
// @ts-ignore
    q?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Minimum item price value.
// @ts-ignore
     */
// @ts-ignore
    price_from?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Maximum item price value.
// @ts-ignore
     */
// @ts-ignore
    price_to?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '0' — do not use reverse order, '1' — use reverse order
// @ts-ignore
     */
// @ts-ignore
    rev?: 0 | 1;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of results.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of items to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' - to return additional fields: 'likes, can_comment, car_repost, photos'. By default: '0'.
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Add variants to response if exist
// @ts-ignore
     */
// @ts-ignore
    need_variants?: boolean | number;
// @ts-ignore
    album_id?: number;
// @ts-ignore
    sort?: 0 | 1 | 2 | 3;
// @ts-ignore
    status?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketSearchItemsParams {
// @ts-ignore
    q: string;
// @ts-ignore
    offset?: number;
// @ts-ignore
    count?: number;
// @ts-ignore
    category_id?: number;
// @ts-ignore
    price_from?: number;
// @ts-ignore
    price_to?: number;
// @ts-ignore
    sort_by?: 1 | 2 | 3;
// @ts-ignore
    sort_direction?: 0 | 1;
// @ts-ignore
    country?: number;
// @ts-ignore
    city?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesAddChatUserParams {
// @ts-ignore
    /**
// @ts-ignore
     * Chat ID.
// @ts-ignore
     */
// @ts-ignore
    chat_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user to be added to the chat.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    visible_messages_count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesAllowMessagesFromGroupParams {
// @ts-ignore
    /**
// @ts-ignore
     * Group ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    key?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesCreateChatParams {
// @ts-ignore
    /**
// @ts-ignore
     * Chat title.
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    user_ids?: number[] | number;
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesDeleteParams {
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to mark message as spam.
// @ts-ignore
     */
// @ts-ignore
    spam?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with user access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — delete message for for all.
// @ts-ignore
     */
// @ts-ignore
    delete_for_all?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'chat_id', e.g. '2000000001'. For community: '- community ID', e.g. '-12345'. "
// @ts-ignore
     */
// @ts-ignore
    peer_id?: number;
// @ts-ignore
    message_ids?: number[] | number;
// @ts-ignore
    cmids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesDeleteChatPhotoParams {
// @ts-ignore
    /**
// @ts-ignore
     * Chat ID.
// @ts-ignore
     */
// @ts-ignore
    chat_id: number;
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesDeleteConversationParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID. To clear a chat history use 'chat_id'
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'chat_id', e.g. '2000000001'. For community: '- community ID', e.g. '-12345'. "
// @ts-ignore
     */
// @ts-ignore
    peer_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with user access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesDenyMessagesFromGroupParams {
// @ts-ignore
    /**
// @ts-ignore
     * Group ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesEditParams {
// @ts-ignore
    /**
// @ts-ignore
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'chat_id', e.g. '2000000001'. For community: '- community ID', e.g. '-12345'. "
// @ts-ignore
     */
// @ts-ignore
    peer_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * (Required if 'attachments' is not set.) Text of the message.
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Geographical latitude of a check-in, in degrees (from -90 to 90).
// @ts-ignore
     */
// @ts-ignore
    lat?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Geographical longitude of a check-in, in degrees (from -180 to 180).
// @ts-ignore
     */
// @ts-ignore
    long?: number;
// @ts-ignore
    /**
// @ts-ignore
     * (Required if 'message' is not set.) List of objects attached to the message, separated by commas, in the following format: "<owner_id>_<media_id>", '' — Type of media attachment: 'photo' — photo, 'video' — video, 'audio' — audio, 'doc' — document, 'wall' — wall post, '<owner_id>' — ID of the media attachment owner. '<media_id>' — media attachment ID. Example: "photo100172_166443618"
// @ts-ignore
     */
// @ts-ignore
    attachment?: string;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to keep forwarded, messages.
// @ts-ignore
     */
// @ts-ignore
    keep_forward_messages?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to keep attached snippets.
// @ts-ignore
     */
// @ts-ignore
    keep_snippets?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with user access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    dont_parse_links?: boolean | number;
// @ts-ignore
    disable_mentions?: boolean | number;
// @ts-ignore
    message_id?: number;
// @ts-ignore
    conversation_message_id?: number;
// @ts-ignore
    template?: string;
// @ts-ignore
    keyboard?: any;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesEditChatParams {
// @ts-ignore
    /**
// @ts-ignore
     * Chat ID.
// @ts-ignore
     */
// @ts-ignore
    chat_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * New title of the chat.
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetByConversationMessageIdParams {
// @ts-ignore
    /**
// @ts-ignore
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'chat_id', e.g. '2000000001'. For community: '- community ID', e.g. '-12345'. "
// @ts-ignore
     */
// @ts-ignore
    peer_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether the response should be extended
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with group access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    conversation_message_ids?: number[] | number;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetByIdParams {
// @ts-ignore
    /**
// @ts-ignore
     * Number of characters after which to truncate a previewed message. To preview the full message, specify '0'. "NOTE: Messages are not truncated by default. Messages are truncated by words."
// @ts-ignore
     */
// @ts-ignore
    preview_length?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether the response should be extended
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with group access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    message_ids?: number[] | number;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetChatPreviewParams {
// @ts-ignore
    /**
// @ts-ignore
     * Invitation link.
// @ts-ignore
     */
// @ts-ignore
    link?: string;
// @ts-ignore
    peer_id?: number;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetConversationMembersParams {
// @ts-ignore
    /**
// @ts-ignore
     * Peer ID.
// @ts-ignore
     */
// @ts-ignore
    peer_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with group access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetConversationsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of conversations.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of conversations to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Filter to apply: 'all' — all conversations, 'unread' — conversations with unread messages, 'important' — conversations, marked as important (only for community messages), 'unanswered' — conversations, marked as unanswered (only for community messages)
// @ts-ignore
     */
// @ts-ignore
    filter?: "all" | "archive" | "important" | "unanswered" | "unread";
// @ts-ignore
    /**
// @ts-ignore
     * '1' — return extra information about users and communities
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the message from what to return dialogs.
// @ts-ignore
     */
// @ts-ignore
    start_message_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with group access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetConversationsByIdParams {
// @ts-ignore
    /**
// @ts-ignore
     * Return extended properties
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with group access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    peer_ids?: number[] | number;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetHistoryParams {
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of messages.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of messages to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user whose message history you want to return.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Starting message ID from which to return history.
// @ts-ignore
     */
// @ts-ignore
    start_message_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Sort order: '1' — return messages in chronological order. '0' — return messages in reverse chronological order.
// @ts-ignore
     */
// @ts-ignore
    rev?: 1 | 0;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether the response should be extended
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with group access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    peer_id?: number;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetHistoryAttachmentsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Peer ID. ", For group chat: '2000000000 + chat ID' , , For community: '-community ID'"
// @ts-ignore
     */
// @ts-ignore
    peer_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Type of media files to return: *'photo',, *'video',, *'audio',, *'doc',, *'link'.,*'market'.,*'wall'.,*'share'
// @ts-ignore
     */
// @ts-ignore
    media_type?: "audio" | "audio_message" | "doc" | "graffiti" | "link" | "market" | "photo" | "share" | "video" | "wall";
// @ts-ignore
    /**
// @ts-ignore
     * Message ID to start return results from.
// @ts-ignore
     */
// @ts-ignore
    start_from?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Number of objects to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return photo sizes in a
// @ts-ignore
     */
// @ts-ignore
    photo_sizes?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with group access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    preserve_order?: boolean | number;
// @ts-ignore
    max_forwards_level?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetImportantMessagesParams {
// @ts-ignore
    /**
// @ts-ignore
     * Amount of needed important messages.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Maximum length of messages body.
// @ts-ignore
     */
// @ts-ignore
    preview_length?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Return extended properties
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with group access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    offset?: number;
// @ts-ignore
    start_message_id?: number;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetIntentUsersParams {
// @ts-ignore
    intent: "confirmed_notification" | "non_promo_newsletter" | "promo_newsletter";
// @ts-ignore
    subscribe_id?: number;
// @ts-ignore
    offset?: number;
// @ts-ignore
    count?: number;
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    name_case?: string[] | string;
// @ts-ignore
    fields?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetInviteLinkParams {
// @ts-ignore
    /**
// @ts-ignore
     * Destination ID.
// @ts-ignore
     */
// @ts-ignore
    peer_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * 1 — to generate new link (revoke previous), 0 — to return previous link.
// @ts-ignore
     */
// @ts-ignore
    reset?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetLastActivityParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID.
// @ts-ignore
     */
// @ts-ignore
    user_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetLongPollHistoryParams {
// @ts-ignore
    /**
// @ts-ignore
     * Last value of the 'ts' parameter returned from the Long Poll server or by using [vk.com/dev/messages.getLongPollHistory|messages.getLongPollHistory] method.
// @ts-ignore
     */
// @ts-ignore
    ts?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Last value of 'pts' parameter returned from the Long Poll server or by using [vk.com/dev/messages.getLongPollHistory|messages.getLongPollHistory] method.
// @ts-ignore
     */
// @ts-ignore
    pts?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of characters after which to truncate a previewed message. To preview the full message, specify '0'. "NOTE: Messages are not truncated by default. Messages are truncated by words."
// @ts-ignore
     */
// @ts-ignore
    preview_length?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return history with online users only.
// @ts-ignore
     */
// @ts-ignore
    onlines?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Maximum number of events to return.
// @ts-ignore
     */
// @ts-ignore
    events_limit?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Maximum number of messages to return.
// @ts-ignore
     */
// @ts-ignore
    msgs_limit?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Maximum ID of the message among existing ones in the local copy. Both messages received with API methods (for example, , ), and data received from a Long Poll server (events with code 4) are taken into account.
// @ts-ignore
     */
// @ts-ignore
    max_msg_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with user access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    lp_version?: number;
// @ts-ignore
    last_n?: number;
// @ts-ignore
    credentials?: boolean | number;
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetLongPollServerParams {
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return the 'pts' field, needed for the [vk.com/dev/messages.getLongPollHistory|messages.getLongPollHistory] method.
// @ts-ignore
     */
// @ts-ignore
    need_pts?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with user access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Long poll version
// @ts-ignore
     */
// @ts-ignore
    lp_version?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesIsMessagesFromGroupAllowedParams {
// @ts-ignore
    /**
// @ts-ignore
     * Group ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * User ID.
// @ts-ignore
     */
// @ts-ignore
    user_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesJoinChatByInviteLinkParams {
// @ts-ignore
    /**
// @ts-ignore
     * Invitation link.
// @ts-ignore
     */
// @ts-ignore
    link: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesMarkAsAnsweredConversationParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of conversation to mark as important.
// @ts-ignore
     */
// @ts-ignore
    peer_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to mark as answered, '0' — to remove the mark
// @ts-ignore
     */
// @ts-ignore
    answered?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with group access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesMarkAsImportantParams {
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to add a star (mark as important), '0' — to remove the star
// @ts-ignore
     */
// @ts-ignore
    important?: number;
// @ts-ignore
    message_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesMarkAsImportantConversationParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of conversation to mark as important.
// @ts-ignore
     */
// @ts-ignore
    peer_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to add a star (mark as important), '0' — to remove the star
// @ts-ignore
     */
// @ts-ignore
    important?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with group access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesMarkAsReadParams {
// @ts-ignore
    /**
// @ts-ignore
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'chat_id', e.g. '2000000001'. For community: '- community ID', e.g. '-12345'. "
// @ts-ignore
     */
// @ts-ignore
    peer_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Message ID to start from.
// @ts-ignore
     */
// @ts-ignore
    start_message_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with user access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    message_ids?: number[] | number;
// @ts-ignore
    mark_conversation_as_read?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesPinParams {
// @ts-ignore
    /**
// @ts-ignore
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'Chat ID', e.g. '2000000001'. For community: '- Community ID', e.g. '-12345'. "
// @ts-ignore
     */
// @ts-ignore
    peer_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Message ID
// @ts-ignore
     */
// @ts-ignore
    message_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Conversation message ID
// @ts-ignore
     */
// @ts-ignore
    conversation_message_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesRemoveChatUserParams {
// @ts-ignore
    /**
// @ts-ignore
     * Chat ID.
// @ts-ignore
     */
// @ts-ignore
    chat_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user to be removed from the chat.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    member_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesRestoreParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of a previously-deleted message to restore.
// @ts-ignore
     */
// @ts-ignore
    message_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with user access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesSearchParams {
// @ts-ignore
    /**
// @ts-ignore
     * Search query string.
// @ts-ignore
     */
// @ts-ignore
    q?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'chat_id', e.g. '2000000001'. For community: '- community ID', e.g. '-12345'. "
// @ts-ignore
     */
// @ts-ignore
    peer_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date to search message before in Unixtime.
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of characters after which to truncate a previewed message. To preview the full message, specify '0'. "NOTE: Messages are not truncated by default. Messages are truncated by words."
// @ts-ignore
     */
// @ts-ignore
    preview_length?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of messages.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of messages to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with group access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    fields?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesSearchConversationsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Search query string.
// @ts-ignore
     */
// @ts-ignore
    q?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Maximum number of results.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — return extra information about users and communities
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with user access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesSendParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID (by default — current user).
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Unique identifier to avoid resending the message.
// @ts-ignore
     */
// @ts-ignore
    random_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'chat_id', e.g. '2000000001'. For community: '- community ID', e.g. '-12345'. "
// @ts-ignore
     */
// @ts-ignore
    peer_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * User's short address (for example, 'illarionov').
// @ts-ignore
     */
// @ts-ignore
    domain?: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of conversation the message will relate to.
// @ts-ignore
     */
// @ts-ignore
    chat_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * (Required if 'attachments' is not set.) Text of the message.
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Geographical latitude of a check-in, in degrees (from -90 to 90).
// @ts-ignore
     */
// @ts-ignore
    lat?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Geographical longitude of a check-in, in degrees (from -180 to 180).
// @ts-ignore
     */
// @ts-ignore
    long?: number;
// @ts-ignore
    /**
// @ts-ignore
     * (Required if 'message' is not set.) List of objects attached to the message, separated by commas, in the following format: "<owner_id>_<media_id>", '' — Type of media attachment: 'photo' — photo, 'video' — video, 'audio' — audio, 'doc' — document, 'wall' — wall post, '<owner_id>' — ID of the media attachment owner. '<media_id>' — media attachment ID. Example: "photo100172_166443618"
// @ts-ignore
     */
// @ts-ignore
    attachment?: any;
// @ts-ignore
    /**
// @ts-ignore
     * Sticker id.
// @ts-ignore
     */
// @ts-ignore
    sticker_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with group access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * JSON describing the content source in the message
// @ts-ignore
     */
// @ts-ignore
    content_source?: string;
// @ts-ignore
    peer_ids?: number[] | number;
// @ts-ignore
    user_ids?: number[] | number;
// @ts-ignore
    reply_to?: number;
// @ts-ignore
    forward_messages?: number[] | number;
// @ts-ignore
    forward?: any;
// @ts-ignore
    keyboard?: any;
// @ts-ignore
    template?: string;
// @ts-ignore
    payload?: any;
// @ts-ignore
    dont_parse_links?: boolean | number;
// @ts-ignore
    disable_mentions?: boolean | number;
// @ts-ignore
    intent?: "account_update" | "bot_ad_invite" | "bot_ad_promo" | "confirmed_notification" | "customer_support" | "default" | "game_notification" | "moderated_newsletter" | "non_promo_newsletter" | "promo_newsletter" | "purchase_update";
// @ts-ignore
    subscribe_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesSendMessageEventAnswerParams {
// @ts-ignore
    event_id: string;
// @ts-ignore
    user_id: number;
// @ts-ignore
    peer_id: number;
// @ts-ignore
    event_data?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesSetActivityParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * 'typing' — user has started to type.
// @ts-ignore
     */
// @ts-ignore
    type?: "audiomessage" | "file" | "photo" | "typing" | "video";
// @ts-ignore
    /**
// @ts-ignore
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'chat_id', e.g. '2000000001'. For community: '- community ID', e.g. '-12345'. "
// @ts-ignore
     */
// @ts-ignore
    peer_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID (for group messages with group access token)
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesSetChatPhotoParams {
// @ts-ignore
    /**
// @ts-ignore
     * Upload URL from the 'response' field returned by the [vk.com/dev/photos.getChatUploadServer|photos.getChatUploadServer] method upon successfully uploading an image.
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
export interface MessagesUnpinParams {
// @ts-ignore
    peer_id: number;
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedAddBanParams {
// @ts-ignore
    user_ids?: number[] | number;
// @ts-ignore
    group_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedDeleteBanParams {
// @ts-ignore
    user_ids?: number[] | number;
// @ts-ignore
    group_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedDeleteListParams {
// @ts-ignore
    list_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedGetParams {
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return news items from banned sources
// @ts-ignore
     */
// @ts-ignore
    return_banned?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Earliest timestamp (in Unix time) of a news item to return. By default, 24 hours ago.
// @ts-ignore
     */
// @ts-ignore
    start_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Latest timestamp (in Unix time) of a news item to return. By default, the current time.
// @ts-ignore
     */
// @ts-ignore
    end_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Maximum number of photos to return. By default, '5'.
// @ts-ignore
     */
// @ts-ignore
    max_photos?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Sources to obtain news from, separated by commas. User IDs can be specified in formats '' or 'u' , where '' is the user's friend ID. Community IDs can be specified in formats '-' or 'g' , where '' is the community ID. If the parameter is not set, all of the user's friends and communities are returned, except for banned sources, which can be obtained with the [vk.com/dev/newsfeed.getBanned|newsfeed.getBanned] method.
// @ts-ignore
     */
// @ts-ignore
    source_ids?: string;
// @ts-ignore
    /**
// @ts-ignore
     * identifier required to get the next page of results. Value for this parameter is returned in 'next_from' field in a reply.
// @ts-ignore
     */
// @ts-ignore
    start_from?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Number of news items to return (default 50, maximum 100). For auto feed, you can use the 'new_offset' parameter returned by this method.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    filters?: Objects.NewsfeedNewsfeedItemType[];
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    section?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedGetBannedParams {
// @ts-ignore
    /**
// @ts-ignore
     * '1' — return extra information about users and communities
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Case for declension of user name and surname: 'nom' — nominative (default), 'gen' — genitive , 'dat' — dative, 'acc' — accusative , 'ins' — instrumental , 'abl' — prepositional
// @ts-ignore
     */
// @ts-ignore
    name_case?: "nom" | "gen" | "dat" | "acc" | "ins" | "abl";
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedGetCommentsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Number of comments to return. For auto feed, you can use the 'new_offset' parameter returned by this method.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Object ID, comments on repost of which shall be returned, e.g. 'wall1_45486'. (If the parameter is set, the 'filters' parameter is optional.),
// @ts-ignore
     */
// @ts-ignore
    reposts?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Earliest timestamp (in Unix time) of a comment to return. By default, 24 hours ago.
// @ts-ignore
     */
// @ts-ignore
    start_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Latest timestamp (in Unix time) of a comment to return. By default, the current time.
// @ts-ignore
     */
// @ts-ignore
    end_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Identificator needed to return the next page with results. Value for this parameter returns in 'next_from' field.
// @ts-ignore
     */
// @ts-ignore
    start_from?: string;
// @ts-ignore
    filters?: Objects.NewsfeedCommentsFilters[];
// @ts-ignore
    last_comments_count?: number;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedGetListsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Return additional list info
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    list_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedGetMentionsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Owner ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Earliest timestamp (in Unix time) of a post to return. By default, 24 hours ago.
// @ts-ignore
     */
// @ts-ignore
    start_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Latest timestamp (in Unix time) of a post to return. By default, the current time.
// @ts-ignore
     */
// @ts-ignore
    end_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of posts.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of posts to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedGetRecommendedParams {
// @ts-ignore
    /**
// @ts-ignore
     * Earliest timestamp (in Unix time) of a news item to return. By default, 24 hours ago.
// @ts-ignore
     */
// @ts-ignore
    start_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Latest timestamp (in Unix time) of a news item to return. By default, the current time.
// @ts-ignore
     */
// @ts-ignore
    end_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Maximum number of photos to return. By default, '5'.
// @ts-ignore
     */
// @ts-ignore
    max_photos?: number;
// @ts-ignore
    /**
// @ts-ignore
     * 'new_from' value obtained in previous call.
// @ts-ignore
     */
// @ts-ignore
    start_from?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Number of news items to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedGetSuggestedSourcesParams {
// @ts-ignore
    /**
// @ts-ignore
     * offset required to choose a particular subset of communities or users.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * amount of communities or users to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * shuffle the returned list or not.
// @ts-ignore
     */
// @ts-ignore
    shuffle?: boolean | number;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedIgnoreItemParams {
// @ts-ignore
    /**
// @ts-ignore
     * Item owner's identifier (user or community), "Note that community id must be negative. 'owner_id=1' - user , 'owner_id=-1' - community "
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Item identifier
// @ts-ignore
     */
// @ts-ignore
    item_id?: number;
// @ts-ignore
    type?: Objects.NewsfeedIgnoreItemType;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedSaveListParams {
// @ts-ignore
    /**
// @ts-ignore
     * numeric list identifier (if not sent, will be set automatically).
// @ts-ignore
     */
// @ts-ignore
    list_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * list name.
// @ts-ignore
     */
// @ts-ignore
    title: string;
// @ts-ignore
    /**
// @ts-ignore
     * reposts display on and off ('1' is for off).
// @ts-ignore
     */
// @ts-ignore
    no_reposts?: boolean | number;
// @ts-ignore
    source_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedSearchParams {
// @ts-ignore
    /**
// @ts-ignore
     * Search query string (e.g., 'New Year').
// @ts-ignore
     */
// @ts-ignore
    q?: string;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return additional information about the user or community that placed the post.
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of posts to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Geographical latitude point (in degrees, -90 to 90) within which to search.
// @ts-ignore
     */
// @ts-ignore
    latitude?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Geographical longitude point (in degrees, -180 to 180) within which to search.
// @ts-ignore
     */
// @ts-ignore
    longitude?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Earliest timestamp (in Unix time) of a news item to return. By default, 24 hours ago.
// @ts-ignore
     */
// @ts-ignore
    start_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Latest timestamp (in Unix time) of a news item to return. By default, the current time.
// @ts-ignore
     */
// @ts-ignore
    end_time?: number;
// @ts-ignore
    start_from?: string;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedUnignoreItemParams {
// @ts-ignore
    /**
// @ts-ignore
     * Item owner's identifier (user or community), "Note that community id must be negative. 'owner_id=1' - user , 'owner_id=-1' - community "
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Item identifier
// @ts-ignore
     */
// @ts-ignore
    item_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Track code of unignored item
// @ts-ignore
     */
// @ts-ignore
    track_code?: string;
// @ts-ignore
    type?: Objects.NewsfeedIgnoreItemType;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedUnsubscribeParams {
// @ts-ignore
    /**
// @ts-ignore
     * Type of object from which to unsubscribe: 'note' — note, 'photo' — photo, 'post' — post on user wall or community wall, 'topic' — topic, 'video' — video
// @ts-ignore
     */
// @ts-ignore
    type: "note" | "photo" | "post" | "topic" | "video";
// @ts-ignore
    /**
// @ts-ignore
     * Object owner ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Object ID.
// @ts-ignore
     */
// @ts-ignore
    item_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotesAddParams {
// @ts-ignore
    /**
// @ts-ignore
     * Note title.
// @ts-ignore
     */
// @ts-ignore
    title: string;
// @ts-ignore
    /**
// @ts-ignore
     * Note text.
// @ts-ignore
     */
// @ts-ignore
    text: string;
// @ts-ignore
    privacy_view?: string[] | string;
// @ts-ignore
    privacy_comment?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotesCreateCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * Note ID.
// @ts-ignore
     */
// @ts-ignore
    note_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Note owner ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user to whom the reply is addressed (if the comment is a reply to another comment).
// @ts-ignore
     */
// @ts-ignore
    reply_to?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment text.
// @ts-ignore
     */
// @ts-ignore
    message: string;
// @ts-ignore
    guid?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotesDeleteParams {
// @ts-ignore
    /**
// @ts-ignore
     * Note ID.
// @ts-ignore
     */
// @ts-ignore
    note_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotesDeleteCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID.
// @ts-ignore
     */
// @ts-ignore
    comment_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Note owner ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotesEditParams {
// @ts-ignore
    /**
// @ts-ignore
     * Note ID.
// @ts-ignore
     */
// @ts-ignore
    note_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Note title.
// @ts-ignore
     */
// @ts-ignore
    title: string;
// @ts-ignore
    /**
// @ts-ignore
     * Note text.
// @ts-ignore
     */
// @ts-ignore
    text: string;
// @ts-ignore
    privacy_view?: string[] | string;
// @ts-ignore
    privacy_comment?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotesEditCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID.
// @ts-ignore
     */
// @ts-ignore
    comment_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Note owner ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * New comment text.
// @ts-ignore
     */
// @ts-ignore
    message: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotesGetParams {
// @ts-ignore
    /**
// @ts-ignore
     * Note owner ID.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of notes to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    note_ids?: number[] | number;
// @ts-ignore
    offset?: number;
// @ts-ignore
    sort?: 0 | 1;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotesGetByIdParams {
// @ts-ignore
    /**
// @ts-ignore
     * Note ID.
// @ts-ignore
     */
// @ts-ignore
    note_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Note owner ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    need_wiki?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotesGetCommentsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Note ID.
// @ts-ignore
     */
// @ts-ignore
    note_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Note owner ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of comments to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    sort?: 0 | 1;
// @ts-ignore
    offset?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotesRestoreCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID.
// @ts-ignore
     */
// @ts-ignore
    comment_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Note owner ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotificationsGetParams {
// @ts-ignore
    /**
// @ts-ignore
     * Number of notifications to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Earliest timestamp (in Unix time) of a notification to return. By default, 24 hours ago.
// @ts-ignore
     */
// @ts-ignore
    start_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Latest timestamp (in Unix time) of a notification to return. By default, the current time.
// @ts-ignore
     */
// @ts-ignore
    end_time?: number;
// @ts-ignore
    start_from?: string;
// @ts-ignore
    filters?: ("wall" | "mentions" | "comments" | "likes" | "reposted" | "followers" | "friends")[] | ("wall" | "mentions" | "comments" | "likes" | "reposted" | "followers" | "friends");
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotificationsMarkAsViewedParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotificationsSendMessageParams {
// @ts-ignore
    /**
// @ts-ignore
     * Type of sending (delivering) notifications: 'immediately' — push and bell notifications will be delivered as soon as possible, 'delayed' — push and bell notifications will be delivered in the most comfortable time for the user, 'delayed_push' — only push notifications will be delivered in the most comfortable time, while the bell notifications will be delivered as soon as possible
// @ts-ignore
     */
// @ts-ignore
    sending_mode?: "delayed" | "delayed_push" | "immediately";
// @ts-ignore
    user_ids?: number[] | number;
// @ts-ignore
    message: string;
// @ts-ignore
    fragment?: string;
// @ts-ignore
    group_id?: number;
// @ts-ignore
    random_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface OrdersCancelSubscriptionParams {
// @ts-ignore
    user_id: number;
// @ts-ignore
    subscription_id: number;
// @ts-ignore
    pending_cancel?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface OrdersChangeStateParams {
// @ts-ignore
    /**
// @ts-ignore
     * order ID.
// @ts-ignore
     */
// @ts-ignore
    order_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * action to be done with the order. Available actions: *cancel — to cancel unconfirmed order. *charge — to confirm unconfirmed order. Applies only if processing of [vk.com/dev/payments_status|order_change_state] notification failed. *refund — to cancel confirmed order.
// @ts-ignore
     */
// @ts-ignore
    action: "cancel" | "charge" | "refund";
// @ts-ignore
    /**
// @ts-ignore
     * internal ID of the order in the application.
// @ts-ignore
     */
// @ts-ignore
    app_order_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * if this parameter is set to 1, this method returns a list of test mode orders. By default — 0.
// @ts-ignore
     */
// @ts-ignore
    test_mode?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface OrdersGetParams {
// @ts-ignore
    /**
// @ts-ignore
     * number of returned orders.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * if this parameter is set to 1, this method returns a list of test mode orders. By default — 0.
// @ts-ignore
     */
// @ts-ignore
    test_mode?: boolean | number;
// @ts-ignore
    offset?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface OrdersGetAmountParams {
// @ts-ignore
    user_id: number;
// @ts-ignore
    votes?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface OrdersGetByIdParams {
// @ts-ignore
    /**
// @ts-ignore
     * order ID.
// @ts-ignore
     */
// @ts-ignore
    order_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * if this parameter is set to 1, this method returns a list of test mode orders. By default — 0.
// @ts-ignore
     */
// @ts-ignore
    test_mode?: boolean | number;
// @ts-ignore
    order_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface OrdersGetUserSubscriptionByIdParams {
// @ts-ignore
    user_id: number;
// @ts-ignore
    subscription_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface OrdersGetUserSubscriptionsParams {
// @ts-ignore
    user_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface OrdersUpdateSubscriptionParams {
// @ts-ignore
    user_id: number;
// @ts-ignore
    subscription_id: number;
// @ts-ignore
    price: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PagesClearCacheParams {
// @ts-ignore
    /**
// @ts-ignore
     * Address of the page where you need to refesh the cached version
// @ts-ignore
     */
// @ts-ignore
    url: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PagesGetParams {
// @ts-ignore
    /**
// @ts-ignore
     * Page owner ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Wiki page ID.
// @ts-ignore
     */
// @ts-ignore
    page_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return information about a global wiki page
// @ts-ignore
     */
// @ts-ignore
    global?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — resulting wiki page is a preview for the attached link
// @ts-ignore
     */
// @ts-ignore
    site_preview?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Wiki page title.
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return the page as HTML,
// @ts-ignore
     */
// @ts-ignore
    need_html?: boolean | number;
// @ts-ignore
    need_source?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PagesGetHistoryParams {
// @ts-ignore
    /**
// @ts-ignore
     * Wiki page ID.
// @ts-ignore
     */
// @ts-ignore
    page_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community that owns the wiki page.
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PagesGetTitlesParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community that owns the wiki page.
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PagesGetVersionParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community that owns the wiki page.
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return the page as HTML
// @ts-ignore
     */
// @ts-ignore
    need_html?: boolean | number;
// @ts-ignore
    version_id: number;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PagesParseWikiParams {
// @ts-ignore
    /**
// @ts-ignore
     * Text of the wiki page.
// @ts-ignore
     */
// @ts-ignore
    text: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the group in the context of which this markup is interpreted.
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PagesSaveParams {
// @ts-ignore
    /**
// @ts-ignore
     * Text of the wiki page in wiki-format.
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Wiki page ID. The 'title' parameter can be passed instead of 'pid'.
// @ts-ignore
     */
// @ts-ignore
    page_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community that owns the wiki page.
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Wiki page title.
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PagesSaveAccessParams {
// @ts-ignore
    /**
// @ts-ignore
     * Wiki page ID.
// @ts-ignore
     */
// @ts-ignore
    page_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community that owns the wiki page.
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Who can view the wiki page: '1' — only community members, '2' — all users can view the page, '0' — only community managers
// @ts-ignore
     */
// @ts-ignore
    view?: 0 | 1 | 2;
// @ts-ignore
    /**
// @ts-ignore
     * Who can edit the wiki page: '1' — only community members, '2' — all users can edit the page, '0' — only community managers
// @ts-ignore
     */
// @ts-ignore
    edit?: 0 | 1 | 2;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosConfirmTagParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the photo.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo ID.
// @ts-ignore
     */
// @ts-ignore
    photo_id: string;
// @ts-ignore
    /**
// @ts-ignore
     * Tag ID.
// @ts-ignore
     */
// @ts-ignore
    tag_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosCopyParams {
// @ts-ignore
    /**
// @ts-ignore
     * photo's owner ID
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * photo ID
// @ts-ignore
     */
// @ts-ignore
    photo_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * for private photos
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosCreateAlbumParams {
// @ts-ignore
    /**
// @ts-ignore
     * Album title.
// @ts-ignore
     */
// @ts-ignore
    title: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community in which the album will be created.
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Album description.
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    privacy_view?: string[] | string;
// @ts-ignore
    privacy_comment?: string[] | string;
// @ts-ignore
    upload_by_admins_only?: boolean | number;
// @ts-ignore
    comments_disabled?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosCreateCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the photo.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo ID.
// @ts-ignore
     */
// @ts-ignore
    photo_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment text.
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to post a comment from the community
// @ts-ignore
     */
// @ts-ignore
    from_group?: boolean | number;
// @ts-ignore
    attachments?: string[] | string;
// @ts-ignore
    reply_to_comment?: number;
// @ts-ignore
    sticker_id?: number;
// @ts-ignore
    access_key?: string;
// @ts-ignore
    guid?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosDeleteParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the photo.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo ID.
// @ts-ignore
     */
// @ts-ignore
    photo_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosDeleteAlbumParams {
// @ts-ignore
    /**
// @ts-ignore
     * Album ID.
// @ts-ignore
     */
// @ts-ignore
    album_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community that owns the album.
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosDeleteCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the photo.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID.
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
export interface PhotosEditParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the photo.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo ID.
// @ts-ignore
     */
// @ts-ignore
    photo_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * New caption for the photo. If this parameter is not set, it is considered to be equal to an empty string.
// @ts-ignore
     */
// @ts-ignore
    caption?: string;
// @ts-ignore
    latitude?: number;
// @ts-ignore
    longitude?: number;
// @ts-ignore
    place_str?: string;
// @ts-ignore
    foursquare_id?: string;
// @ts-ignore
    delete_place?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosEditAlbumParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the photo album to be edited.
// @ts-ignore
     */
// @ts-ignore
    album_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * New album title.
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * New album description.
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the album.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    privacy_view?: string[] | string;
// @ts-ignore
    privacy_comment?: string[] | string;
// @ts-ignore
    upload_by_admins_only?: boolean | number;
// @ts-ignore
    comments_disabled?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosEditCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the photo.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID.
// @ts-ignore
     */
// @ts-ignore
    comment_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * New text of the comment.
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    attachments?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the photos. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo album ID. To return information about photos from service albums, use the following string values: 'profile, wall, saved'.
// @ts-ignore
     */
// @ts-ignore
    album_id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Sort order: '1' — reverse chronological, '0' — chronological
// @ts-ignore
     */
// @ts-ignore
    rev?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return additional 'likes', 'comments', and 'tags' fields, '0' — (default)
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Type of feed obtained in 'feed' field of the method.
// @ts-ignore
     */
// @ts-ignore
    feed_type?: string;
// @ts-ignore
    /**
// @ts-ignore
     * unixtime, that can be obtained with [vk.com/dev/newsfeed.get|newsfeed.get] method in date field to get all photos uploaded by the user on a specific day, or photos the user has been tagged on. Also, 'uid' parameter of the user the event happened with shall be specified.
// @ts-ignore
     */
// @ts-ignore
    feed?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return photo sizes in a [vk.com/dev/photo_sizes|special format]
// @ts-ignore
     */
// @ts-ignore
    photo_sizes?: boolean | number;
// @ts-ignore
    photo_ids?: string[] | string;
// @ts-ignore
    offset?: number;
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetAlbumsParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the albums.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of albums.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of albums to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return system albums with negative IDs
// @ts-ignore
     */
// @ts-ignore
    need_system?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return an additional 'thumb_src' field, '0' — (default)
// @ts-ignore
     */
// @ts-ignore
    need_covers?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return photo sizes in a
// @ts-ignore
     */
// @ts-ignore
    photo_sizes?: boolean | number;
// @ts-ignore
    album_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetAlbumsCountParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetAllParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of a user or community that owns the photos. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return detailed information about photos
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of photos. By default, '0'.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of photos to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' - to return image sizes in [vk.com/dev/photo_sizes|special format].
// @ts-ignore
     */
// @ts-ignore
    photo_sizes?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' - to return photos only from standard albums, '0' - to return all photos including those in service albums, e.g., 'My wall photos' (default)
// @ts-ignore
     */
// @ts-ignore
    no_service_albums?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' - to show information about photos being hidden from the block above the wall.
// @ts-ignore
     */
// @ts-ignore
    need_hidden?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' - not to return photos being hidden from the block above the wall. Works only with owner_id>0, no_service_albums is ignored.
// @ts-ignore
     */
// @ts-ignore
    skip_hidden?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetAllCommentsParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the album(s).
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Album ID. If the parameter is not set, comments on all of the user's albums will be returned.
// @ts-ignore
     */
// @ts-ignore
    album_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return an additional 'likes' field, '0' — (default)
// @ts-ignore
     */
// @ts-ignore
    need_likes?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of comments. By default, '0'.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of comments to return. By default, '20'. Maximum value, '100'.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetByIdParams {
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return additional fields, '0' — (default)
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return photo sizes in a
// @ts-ignore
     */
// @ts-ignore
    photo_sizes?: boolean | number;
// @ts-ignore
    photos?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetChatUploadServerParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the chat for which you want to upload a cover photo.
// @ts-ignore
     */
// @ts-ignore
    chat_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Width (in pixels) of the photo after cropping.
// @ts-ignore
     */
// @ts-ignore
    crop_width?: number;
// @ts-ignore
    crop_x?: number;
// @ts-ignore
    crop_y?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetCommentsParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the photo.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo ID.
// @ts-ignore
     */
// @ts-ignore
    photo_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return an additional 'likes' field, '0' — (default)
// @ts-ignore
     */
// @ts-ignore
    need_likes?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of comments. By default, '0'.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of comments to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Sort order: 'asc' — old first, 'desc' — new first
// @ts-ignore
     */
// @ts-ignore
    sort?: "asc" | "desc";
// @ts-ignore
    start_comment_id?: number;
// @ts-ignore
    access_key?: string;
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetMarketAlbumUploadServerParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetMarketUploadServerParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' if you want to upload the main item photo.
// @ts-ignore
     */
// @ts-ignore
    main_photo?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * X coordinate of the crop left upper corner.
// @ts-ignore
     */
// @ts-ignore
    crop_x?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Y coordinate of the crop left upper corner.
// @ts-ignore
     */
// @ts-ignore
    crop_y?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Width of the cropped photo in px.
// @ts-ignore
     */
// @ts-ignore
    crop_width?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetMessagesUploadServerParams {
// @ts-ignore
    /**
// @ts-ignore
     * Destination ID. "For user: 'User ID', e.g. '12345'. For chat: '2000000000' + 'Chat ID', e.g. '2000000001'. For community: '- Community ID', e.g. '-12345'. "
// @ts-ignore
     */
// @ts-ignore
    peer_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetNewTagsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of photos.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of photos to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetOwnerCoverPhotoUploadServerParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of community that owns the album (if the photo will be uploaded to a community album).
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * X coordinate of the left-upper corner
// @ts-ignore
     */
// @ts-ignore
    crop_x?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Y coordinate of the left-upper corner
// @ts-ignore
     */
// @ts-ignore
    crop_y?: number;
// @ts-ignore
    /**
// @ts-ignore
     * X coordinate of the right-bottom corner
// @ts-ignore
     */
// @ts-ignore
    crop_x2?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Y coordinate of the right-bottom corner
// @ts-ignore
     */
// @ts-ignore
    crop_y2?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetOwnerPhotoUploadServerParams {
// @ts-ignore
    /**
// @ts-ignore
     * identifier of a community or current user. "Note that community id must be negative. 'owner_id=1' - user, 'owner_id=-1' - community, "
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetTagsParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the photo.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo ID.
// @ts-ignore
     */
// @ts-ignore
    photo_id: number;
// @ts-ignore
    access_key?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetUploadServerParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of community that owns the album (if the photo will be uploaded to a community album).
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    album_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetUserPhotosParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of photos. By default, '0'.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of photos to return. Maximum value is 1000.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return an additional 'likes' field, '0' — (default)
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Sort order: '1' — by date the tag was added in ascending order, '0' — by date the tag was added in descending order
// @ts-ignore
     */
// @ts-ignore
    sort?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosGetWallUploadServerParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of community to whose wall the photo will be uploaded.
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosMakeCoverParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the photo.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo ID.
// @ts-ignore
     */
// @ts-ignore
    photo_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Album ID.
// @ts-ignore
     */
// @ts-ignore
    album_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosMoveParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the photo.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the album to which the photo will be moved.
// @ts-ignore
     */
// @ts-ignore
    target_album_id: number;
// @ts-ignore
    photo_ids: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosPutTagParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the photo.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo ID.
// @ts-ignore
     */
// @ts-ignore
    photo_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user to be tagged.
// @ts-ignore
     */
// @ts-ignore
    user_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Upper left-corner coordinate of the tagged area (as a percentage of the photo's width).
// @ts-ignore
     */
// @ts-ignore
    x?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Upper left-corner coordinate of the tagged area (as a percentage of the photo's height).
// @ts-ignore
     */
// @ts-ignore
    y?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Lower right-corner coordinate of the tagged area (as a percentage of the photo's width).
// @ts-ignore
     */
// @ts-ignore
    x2?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Lower right-corner coordinate of the tagged area (as a percentage of the photo's height).
// @ts-ignore
     */
// @ts-ignore
    y2?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosRemoveTagParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the photo.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo ID.
// @ts-ignore
     */
// @ts-ignore
    photo_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Tag ID.
// @ts-ignore
     */
// @ts-ignore
    tag_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosReorderAlbumsParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the album.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Album ID.
// @ts-ignore
     */
// @ts-ignore
    album_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the album before which the album in question shall be placed.
// @ts-ignore
     */
// @ts-ignore
    before?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the album after which the album in question shall be placed.
// @ts-ignore
     */
// @ts-ignore
    after?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosReorderPhotosParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the photo.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo ID.
// @ts-ignore
     */
// @ts-ignore
    photo_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the photo before which the photo in question shall be placed.
// @ts-ignore
     */
// @ts-ignore
    before?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the photo after which the photo in question shall be placed.
// @ts-ignore
     */
// @ts-ignore
    after?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosReportParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the photo.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo ID.
// @ts-ignore
     */
// @ts-ignore
    photo_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Reason for the complaint: '0' - spam, '1' - child pornography, '2' - extremism, '3' - violence, '4' - drug propaganda, '5' - adult material, '6' - insult, abuse
// @ts-ignore
     */
// @ts-ignore
    reason?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosReportCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the photo.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the comment being reported.
// @ts-ignore
     */
// @ts-ignore
    comment_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Reason for the complaint: '0' - spam, '1' - child pornography, '2' - extremism, '3' - violence, '4' - drug propaganda, '5' - adult material, '6' - insult, abuse
// @ts-ignore
     */
// @ts-ignore
    reason?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosRestoreParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the photo.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo ID.
// @ts-ignore
     */
// @ts-ignore
    photo_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosRestoreCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the photo.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the deleted comment.
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
export interface PhotosSaveParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the album to save photos to.
// @ts-ignore
     */
// @ts-ignore
    album_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community to save photos to.
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
// @ts-ignore
     */
// @ts-ignore
    server?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
// @ts-ignore
     */
// @ts-ignore
    photos_list?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
// @ts-ignore
     */
// @ts-ignore
    hash?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Geographical latitude, in degrees (from '-90' to '90').
// @ts-ignore
     */
// @ts-ignore
    latitude?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Geographical longitude, in degrees (from '-180' to '180').
// @ts-ignore
     */
// @ts-ignore
    longitude?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Text describing the photo. 2048 digits max.
// @ts-ignore
     */
// @ts-ignore
    caption?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosSaveMarketAlbumPhotoParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
// @ts-ignore
     */
// @ts-ignore
    photo: string;
// @ts-ignore
    /**
// @ts-ignore
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
// @ts-ignore
     */
// @ts-ignore
    server: number;
// @ts-ignore
    /**
// @ts-ignore
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
// @ts-ignore
     */
// @ts-ignore
    hash: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosSaveMarketPhotoParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
// @ts-ignore
     */
// @ts-ignore
    photo: string;
// @ts-ignore
    /**
// @ts-ignore
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
// @ts-ignore
     */
// @ts-ignore
    server: number;
// @ts-ignore
    /**
// @ts-ignore
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
// @ts-ignore
     */
// @ts-ignore
    hash: string;
// @ts-ignore
    /**
// @ts-ignore
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
// @ts-ignore
     */
// @ts-ignore
    crop_data?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
// @ts-ignore
     */
// @ts-ignore
    crop_hash?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosSaveMessagesPhotoParams {
// @ts-ignore
    /**
// @ts-ignore
     * Parameter returned when the photo is [vk.com/dev/upload_files|uploaded to the server].
// @ts-ignore
     */
// @ts-ignore
    photo: string;
// @ts-ignore
    server?: number;
// @ts-ignore
    hash?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosSaveOwnerCoverPhotoParams {
// @ts-ignore
    /**
// @ts-ignore
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
// @ts-ignore
     */
// @ts-ignore
    hash: string;
// @ts-ignore
    /**
// @ts-ignore
     * Parameter returned when photos are [vk.com/dev/upload_files|uploaded to server].
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
export interface PhotosSaveOwnerPhotoParams {
// @ts-ignore
    /**
// @ts-ignore
     * parameter returned after [vk.com/dev/upload_files|photo upload].
// @ts-ignore
     */
// @ts-ignore
    server?: string;
// @ts-ignore
    /**
// @ts-ignore
     * parameter returned after [vk.com/dev/upload_files|photo upload].
// @ts-ignore
     */
// @ts-ignore
    hash?: string;
// @ts-ignore
    /**
// @ts-ignore
     * parameter returned after [vk.com/dev/upload_files|photo upload].
// @ts-ignore
     */
// @ts-ignore
    photo?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosSaveWallPhotoParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user on whose wall the photo will be saved.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of community on whose wall the photo will be saved.
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Parameter returned when the the photo is [vk.com/dev/upload_files|uploaded to the server].
// @ts-ignore
     */
// @ts-ignore
    photo: string;
// @ts-ignore
    /**
// @ts-ignore
     * Geographical latitude, in degrees (from '-90' to '90').
// @ts-ignore
     */
// @ts-ignore
    latitude?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Geographical longitude, in degrees (from '-180' to '180').
// @ts-ignore
     */
// @ts-ignore
    longitude?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Text describing the photo. 2048 digits max.
// @ts-ignore
     */
// @ts-ignore
    caption?: string;
// @ts-ignore
    server?: number;
// @ts-ignore
    hash?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosSearchParams {
// @ts-ignore
    /**
// @ts-ignore
     * Search query string.
// @ts-ignore
     */
// @ts-ignore
    q?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Geographical latitude, in degrees (from '-90' to '90').
// @ts-ignore
     */
// @ts-ignore
    lat?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Geographical longitude, in degrees (from '-180' to '180').
// @ts-ignore
     */
// @ts-ignore
    long?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Sort order:
// @ts-ignore
     */
// @ts-ignore
    sort?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of photos.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of photos to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Radius of search in meters (works very approximately). Available values: '10', '100', '800', '6000', '50000'.
// @ts-ignore
     */
// @ts-ignore
    radius?: number;
// @ts-ignore
    start_time?: number;
// @ts-ignore
    end_time?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PodcastsSearchPodcastParams {
// @ts-ignore
    search_string: string;
// @ts-ignore
    offset?: number;
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PollsAddVoteParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the poll. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Poll ID.
// @ts-ignore
     */
// @ts-ignore
    poll_id: number;
// @ts-ignore
    answer_ids?: number[] | number;
// @ts-ignore
    is_board?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PollsCreateParams {
// @ts-ignore
    /**
// @ts-ignore
     * question text
// @ts-ignore
     */
// @ts-ignore
    question?: string;
// @ts-ignore
    /**
// @ts-ignore
     * '1' - anonymous poll, participants list is hidden,, '0' - public poll, participants list is available,, Default value is '0'.
// @ts-ignore
     */
// @ts-ignore
    is_anonymous?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * If a poll will be added to a communty it is required to send a negative group identifier. Current user by default.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * available answers list, for example: " ["yes","no","maybe"]", There can be from 1 to 10 answers.
// @ts-ignore
     */
// @ts-ignore
    add_answers?: string;
// @ts-ignore
    is_multiple?: boolean | number;
// @ts-ignore
    end_date?: number;
// @ts-ignore
    app_id?: number;
// @ts-ignore
    photo_id?: number;
// @ts-ignore
    background_id?: "1" | "2" | "3" | "4" | "6" | "8" | "9";
// @ts-ignore
    disable_unvote?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PollsDeleteVoteParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the poll. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Poll ID.
// @ts-ignore
     */
// @ts-ignore
    poll_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Answer ID.
// @ts-ignore
     */
// @ts-ignore
    answer_id: number;
// @ts-ignore
    is_board?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PollsEditParams {
// @ts-ignore
    /**
// @ts-ignore
     * poll owner id
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * edited poll's id
// @ts-ignore
     */
// @ts-ignore
    poll_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * new question text
// @ts-ignore
     */
// @ts-ignore
    question?: string;
// @ts-ignore
    /**
// @ts-ignore
     * answers list, for example: , "["yes","no","maybe"]"
// @ts-ignore
     */
// @ts-ignore
    add_answers?: string;
// @ts-ignore
    /**
// @ts-ignore
     * object containing answers that need to be edited,, key - answer id, value - new answer text. Example: {"382967099":"option1", "382967103":"option2"}"
// @ts-ignore
     */
// @ts-ignore
    edit_answers?: string;
// @ts-ignore
    /**
// @ts-ignore
     * list of answer ids to be deleted. For example: "[382967099, 382967103]"
// @ts-ignore
     */
// @ts-ignore
    delete_answers?: string;
// @ts-ignore
    end_date?: number;
// @ts-ignore
    photo_id?: number;
// @ts-ignore
    background_id?: "0" | "1" | "2" | "3" | "4" | "6" | "8" | "9";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PollsGetBackgroundsParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PollsGetByIdParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the poll. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' - poll is in a board, '0' - poll is on a wall. '0' by default.
// @ts-ignore
     */
// @ts-ignore
    is_board?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Poll ID.
// @ts-ignore
     */
// @ts-ignore
    poll_id: number;
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    friends_count?: number;
// @ts-ignore
    fields?: string[] | string;
// @ts-ignore
    name_case?: "abl" | "acc" | "dat" | "gen" | "ins" | "nom";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PollsGetPhotoUploadServerParams {
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PollsGetVotersParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the poll. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Poll ID.
// @ts-ignore
     */
// @ts-ignore
    poll_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return only current user's friends, '0' — to return all users (default),
// @ts-ignore
     */
// @ts-ignore
    friends_only?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of voters. '0' — (default)
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of user IDs to return (if the 'friends_only' parameter is not set, maximum '1000', otherwise '10'). '100' — (default)
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Case for declension of user name and surname: , 'nom' — nominative (default) , 'gen' — genitive , 'dat' — dative , 'acc' — accusative , 'ins' — instrumental , 'abl' — prepositional
// @ts-ignore
     */
// @ts-ignore
    name_case?: "nom" | "gen" | "dat" | "acc" | "ins" | "abl";
// @ts-ignore
    answer_ids?: number[] | number;
// @ts-ignore
    is_board?: boolean | number;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PollsSavePhotoParams {
// @ts-ignore
    photo: string;
// @ts-ignore
    hash: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PrettyCardsCreateParams {
// @ts-ignore
    owner_id: number;
// @ts-ignore
    photo: string;
// @ts-ignore
    title: string;
// @ts-ignore
    link: string;
// @ts-ignore
    price?: string;
// @ts-ignore
    price_old?: string;
// @ts-ignore
    button?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PrettyCardsDeleteParams {
// @ts-ignore
    owner_id: number;
// @ts-ignore
    card_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PrettyCardsEditParams {
// @ts-ignore
    owner_id: number;
// @ts-ignore
    card_id: number;
// @ts-ignore
    photo?: string;
// @ts-ignore
    title?: string;
// @ts-ignore
    link?: string;
// @ts-ignore
    price?: string;
// @ts-ignore
    price_old?: string;
// @ts-ignore
    button?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PrettyCardsGetParams {
// @ts-ignore
    owner_id: number;
// @ts-ignore
    offset?: number;
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PrettyCardsGetByIdParams {
// @ts-ignore
    owner_id: number;
// @ts-ignore
    card_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PrettyCardsGetUploadURLParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface SearchGetHintsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Search query string.
// @ts-ignore
     */
// @ts-ignore
    q?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Offset for querying specific result subset
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Maximum number of results to return.
// @ts-ignore
     */
// @ts-ignore
    limit?: number;
// @ts-ignore
    filters?: string[] | string;
// @ts-ignore
    fields?: string[] | string;
// @ts-ignore
    search_global?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface SecureAddAppEventParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of a user to save the data
// @ts-ignore
     */
// @ts-ignore
    user_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * there are 2 default activities: , * 1 - level. Works similar to ,, * 2 - points, saves points amount, Any other value is for saving completed missions
// @ts-ignore
     */
// @ts-ignore
    activity_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * depends on activity_id: * 1 - number, current level number,, * 2 - number, current user's points amount, , Any other value is ignored
// @ts-ignore
     */
// @ts-ignore
    value?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface SecureCheckTokenParams {
// @ts-ignore
    /**
// @ts-ignore
     * client 'access_token'
// @ts-ignore
     */
// @ts-ignore
    token?: string;
// @ts-ignore
    /**
// @ts-ignore
     * user 'ip address'. Note that user may access using the 'ipv6' address, in this case it is required to transmit the 'ipv6' address. If not transmitted, the address will not be checked.
// @ts-ignore
     */
// @ts-ignore
    ip?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface SecureGetAppBalanceParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface SecureGetSMSHistoryParams {
// @ts-ignore
    /**
// @ts-ignore
     * filter by start date. It is set as UNIX-time.
// @ts-ignore
     */
// @ts-ignore
    date_from?: number;
// @ts-ignore
    /**
// @ts-ignore
     * filter by end date. It is set as UNIX-time.
// @ts-ignore
     */
// @ts-ignore
    date_to?: number;
// @ts-ignore
    /**
// @ts-ignore
     * number of returned posts. By default — 1000.
// @ts-ignore
     */
// @ts-ignore
    limit?: number;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface SecureGetTransactionsHistoryParams {
// @ts-ignore
    type?: number;
// @ts-ignore
    uid_from?: number;
// @ts-ignore
    uid_to?: number;
// @ts-ignore
    date_from?: number;
// @ts-ignore
    date_to?: number;
// @ts-ignore
    limit?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface SecureGetUserLevelParams {
// @ts-ignore
    user_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface SecureGiveEventStickerParams {
// @ts-ignore
    user_ids?: number[] | number;
// @ts-ignore
    achievement_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface SecureSendNotificationParams {
// @ts-ignore
    /**
// @ts-ignore
     * notification text which should be sent in 'UTF-8' encoding ('254' characters maximum).
// @ts-ignore
     */
// @ts-ignore
    message: string;
// @ts-ignore
    user_ids?: number[] | number;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface SecureSendSMSNotificationParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user to whom SMS notification is sent. The user shall allow the application to send him/her notifications (, +1).
// @ts-ignore
     */
// @ts-ignore
    user_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * 'SMS' text to be sent in 'UTF-8' encoding. Only Latin letters and numbers are allowed. Maximum size is '160' characters.
// @ts-ignore
     */
// @ts-ignore
    message: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface SecureSetCounterParams {
// @ts-ignore
    /**
// @ts-ignore
     * counter value.
// @ts-ignore
     */
// @ts-ignore
    counter?: number;
// @ts-ignore
    counters?: string[] | string;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    increment?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StatsGetParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID.
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Application ID.
// @ts-ignore
     */
// @ts-ignore
    app_id?: number;
// @ts-ignore
    timestamp_from?: number;
// @ts-ignore
    timestamp_to?: number;
// @ts-ignore
    interval?: "all" | "day" | "month" | "week" | "year";
// @ts-ignore
    intervals_count?: number;
// @ts-ignore
    filters?: string[] | string;
// @ts-ignore
    stats_groups?: string[] | string;
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StatsGetPostReachParams {
// @ts-ignore
    /**
// @ts-ignore
     * post owner community id. Specify with "-" sign.
// @ts-ignore
     */
// @ts-ignore
    owner_id: string;
// @ts-ignore
    post_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StatsTrackVisitorParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StatusGetParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID or community ID. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StatusSetParams {
// @ts-ignore
    /**
// @ts-ignore
     * Text of the new status.
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Identifier of a community to set a status in. If left blank the status is set to current user.
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StorageGetParams {
// @ts-ignore
    key?: string;
// @ts-ignore
    keys?: string[] | string;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StorageGetKeysParams {
// @ts-ignore
    /**
// @ts-ignore
     * user id, whose variables names are returned if they were requested with a server method.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * amount of variable names the info needs to be collected from.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    offset?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StorageSetParams {
// @ts-ignore
    key: string;
// @ts-ignore
    value?: string;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoreAddStickersToFavoriteParams {
// @ts-ignore
    sticker_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoreGetFavoriteStickersParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoreGetProductsParams {
// @ts-ignore
    type?: string;
// @ts-ignore
    merchant?: string;
// @ts-ignore
    section?: string;
// @ts-ignore
    product_ids?: number[] | number;
// @ts-ignore
    filters?: string[] | string;
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoreGetStickersKeywordsParams {
// @ts-ignore
    stickers_ids?: number[] | number;
// @ts-ignore
    products_ids?: number[] | number;
// @ts-ignore
    aliases?: boolean | number;
// @ts-ignore
    all_products?: boolean | number;
// @ts-ignore
    need_stickers?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoreRemoveStickersFromFavoriteParams {
// @ts-ignore
    sticker_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesBanOwnerParams {
// @ts-ignore
    owners_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesDeleteParams {
// @ts-ignore
    /**
// @ts-ignore
     * Story owner's ID. Current user id is used by default.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Story ID.
// @ts-ignore
     */
// @ts-ignore
    story_id?: number;
// @ts-ignore
    stories?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesGetParams {
// @ts-ignore
    /**
// @ts-ignore
     * Owner ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return additional fields for users and communities. Default value is 0.
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesGetBannedParams {
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return additional fields for users and communities. Default value is 0.
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesGetByIdParams {
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return additional fields for users and communities. Default value is 0.
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    stories?: string[] | string;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesGetPhotoUploadServerParams {
// @ts-ignore
    /**
// @ts-ignore
     * 1 — to add the story to friend's feed.
// @ts-ignore
     */
// @ts-ignore
    add_to_news?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the story to reply with the current.
// @ts-ignore
     */
// @ts-ignore
    reply_to_story?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link URL. Internal links on https://vk.com only.
// @ts-ignore
     */
// @ts-ignore
    link_url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community to upload the story (should be verified or with the "fire" icon).
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    user_ids?: number[] | number;
// @ts-ignore
    link_text?: Objects.StoriesUploadLinkText;
// @ts-ignore
    clickable_stickers?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesGetRepliesParams {
// @ts-ignore
    /**
// @ts-ignore
     * Story owner ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Story ID.
// @ts-ignore
     */
// @ts-ignore
    story_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Access key for the private object.
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return additional fields for users and communities. Default value is 0.
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesGetStatsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Story owner ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Story ID.
// @ts-ignore
     */
// @ts-ignore
    story_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesGetVideoUploadServerParams {
// @ts-ignore
    /**
// @ts-ignore
     * 1 — to add the story to friend's feed.
// @ts-ignore
     */
// @ts-ignore
    add_to_news?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the story to reply with the current.
// @ts-ignore
     */
// @ts-ignore
    reply_to_story?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link URL. Internal links on https://vk.com only.
// @ts-ignore
     */
// @ts-ignore
    link_url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community to upload the story (should be verified or with the "fire" icon).
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    user_ids?: number[] | number;
// @ts-ignore
    link_text?: Objects.StoriesUploadLinkText;
// @ts-ignore
    clickable_stickers?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesGetViewersParams {
// @ts-ignore
    /**
// @ts-ignore
     * Story owner ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Story ID.
// @ts-ignore
     */
// @ts-ignore
    story_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Maximum number of results.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of results.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return detailed information about photos
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesHideAllRepliesParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user whose replies should be hidden.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    group_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesHideReplyParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user whose replies should be hidden.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Story ID.
// @ts-ignore
     */
// @ts-ignore
    story_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesSaveParams {
// @ts-ignore
    upload_results?: string[] | string;
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesSearchParams {
// @ts-ignore
    q?: string;
// @ts-ignore
    place_id?: number;
// @ts-ignore
    latitude?: number;
// @ts-ignore
    longitude?: number;
// @ts-ignore
    radius?: number;
// @ts-ignore
    mentioned_id?: number;
// @ts-ignore
    count?: number;
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesSendInteractionParams {
// @ts-ignore
    access_key: string;
// @ts-ignore
    message?: string;
// @ts-ignore
    is_broadcast?: boolean | number;
// @ts-ignore
    is_anonymous?: boolean | number;
// @ts-ignore
    unseen_marker?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesUnbanOwnerParams {
// @ts-ignore
    owners_ids?: number[] | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StreamingGetServerUrlParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StreamingSetSettingsParams {
// @ts-ignore
    monthly_tier?: "tier_1" | "tier_2" | "tier_3" | "tier_4" | "tier_5" | "tier_6" | "unlimited";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UsersGetParams {
// @ts-ignore
    /**
// @ts-ignore
     * Case for declension of user name and surname: 'nom' — nominative (default), 'gen' — genitive , 'dat' — dative, 'acc' — accusative , 'ins' — instrumental , 'abl' — prepositional
// @ts-ignore
     */
// @ts-ignore
    name_case?: "nom" | "gen" | "dat" | "acc" | "ins" | "abl";
// @ts-ignore
    user_ids?: any[];
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UsersGetFollowersParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of followers.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of followers to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Case for declension of user name and surname: 'nom' — nominative (default), 'gen' — genitive , 'dat' — dative, 'acc' — accusative , 'ins' — instrumental , 'abl' — prepositional
// @ts-ignore
     */
// @ts-ignore
    name_case?: "nom" | "gen" | "dat" | "acc" | "ins" | "abl";
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UsersGetSubscriptionsParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID.
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return a combined list of users and communities, '0' — to return separate lists of users and communities (default)
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of subscriptions.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of users and communities to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UsersReportParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user about whom a complaint is being made.
// @ts-ignore
     */
// @ts-ignore
    user_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Type of complaint: 'porn' - pornography, 'spam' - spamming, 'insult' - abusive behavior, 'advertisement' - disruptive advertisements
// @ts-ignore
     */
// @ts-ignore
    type: "porn" | "spam" | "insult" | "advertisement";
// @ts-ignore
    /**
// @ts-ignore
     * Comment describing the complaint.
// @ts-ignore
     */
// @ts-ignore
    comment?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UsersSearchParams {
// @ts-ignore
    /**
// @ts-ignore
     * Search query string (e.g., 'Vasya Babich').
// @ts-ignore
     */
// @ts-ignore
    q?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Sort order: '1' — by date registered, '0' — by rating
// @ts-ignore
     */
// @ts-ignore
    sort?: 0 | 1;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of users.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of users to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * City ID.
// @ts-ignore
     */
// @ts-ignore
    city?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Country ID.
// @ts-ignore
     */
// @ts-ignore
    country?: number;
// @ts-ignore
    /**
// @ts-ignore
     * City name in a string.
// @ts-ignore
     */
// @ts-ignore
    hometown?: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the country where the user graduated.
// @ts-ignore
     */
// @ts-ignore
    university_country?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the institution of higher education.
// @ts-ignore
     */
// @ts-ignore
    university?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Year of graduation from an institution of higher education.
// @ts-ignore
     */
// @ts-ignore
    university_year?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Faculty ID.
// @ts-ignore
     */
// @ts-ignore
    university_faculty?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Chair ID.
// @ts-ignore
     */
// @ts-ignore
    university_chair?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — female, '2' — male, '0' — any (default)
// @ts-ignore
     */
// @ts-ignore
    sex?: 0 | 1 | 2;
// @ts-ignore
    /**
// @ts-ignore
     * Relationship status: '1' — Not married, '2' — In a relationship, '3' — Engaged, '4' — Married, '5' — It's complicated, '6' — Actively searching, '7' — In love
// @ts-ignore
     */
// @ts-ignore
    status?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
// @ts-ignore
    /**
// @ts-ignore
     * Minimum age.
// @ts-ignore
     */
// @ts-ignore
    age_from?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Maximum age.
// @ts-ignore
     */
// @ts-ignore
    age_to?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Day of birth.
// @ts-ignore
     */
// @ts-ignore
    birth_day?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Month of birth.
// @ts-ignore
     */
// @ts-ignore
    birth_month?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Year of birth.
// @ts-ignore
     */
// @ts-ignore
    birth_year?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — online only, '0' — all users
// @ts-ignore
     */
// @ts-ignore
    online?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — with photo only, '0' — all users
// @ts-ignore
     */
// @ts-ignore
    has_photo?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the country where users finished school.
// @ts-ignore
     */
// @ts-ignore
    school_country?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the city where users finished school.
// @ts-ignore
     */
// @ts-ignore
    school_city?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the school.
// @ts-ignore
     */
// @ts-ignore
    school?: number;
// @ts-ignore
    /**
// @ts-ignore
     * School graduation year.
// @ts-ignore
     */
// @ts-ignore
    school_year?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Users' religious affiliation.
// @ts-ignore
     */
// @ts-ignore
    religion?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Name of the company where users work.
// @ts-ignore
     */
// @ts-ignore
    company?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Job position.
// @ts-ignore
     */
// @ts-ignore
    position?: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of a community to search in communities.
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    school_class?: number;
// @ts-ignore
    from_list?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UtilsCheckLinkParams {
// @ts-ignore
    /**
// @ts-ignore
     * Link to check (e.g., 'http://google.com').
// @ts-ignore
     */
// @ts-ignore
    url: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UtilsDeleteFromLastShortenedParams {
// @ts-ignore
    /**
// @ts-ignore
     * Link key (characters after vk.cc/).
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
export interface UtilsGetLastShortenedLinksParams {
// @ts-ignore
    /**
// @ts-ignore
     * Number of links to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of links.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UtilsGetLinkStatsParams {
// @ts-ignore
    /**
// @ts-ignore
     * Link key (characters after vk.cc/).
// @ts-ignore
     */
// @ts-ignore
    key: string;
// @ts-ignore
    /**
// @ts-ignore
     * Source of scope
// @ts-ignore
     */
// @ts-ignore
    source?: "vk_cc" | "vk_link";
// @ts-ignore
    /**
// @ts-ignore
     * Access key for private link stats.
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Interval.
// @ts-ignore
     */
// @ts-ignore
    interval?: "day" | "forever" | "hour" | "month" | "week";
// @ts-ignore
    /**
// @ts-ignore
     * Number of intervals to return.
// @ts-ignore
     */
// @ts-ignore
    intervals_count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * 1 — to return extended stats data (sex, age, geo). 0 — to return views number only.
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UtilsGetServerTimeParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UtilsGetShortLinkParams {
// @ts-ignore
    /**
// @ts-ignore
     * URL to be shortened.
// @ts-ignore
     */
// @ts-ignore
    url: string;
// @ts-ignore
    /**
// @ts-ignore
     * 1 — private stats, 0 — public stats.
// @ts-ignore
     */
// @ts-ignore
    private?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UtilsResolveScreenNameParams {
// @ts-ignore
    /**
// @ts-ignore
     * Screen name of the user, community (e.g., 'apiclub,' 'andrew', or 'rules_of_war'), or application.
// @ts-ignore
     */
// @ts-ignore
    screen_name: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoAddParams {
// @ts-ignore
    /**
// @ts-ignore
     * identifier of a user or community to add a video to. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    target_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Video ID.
// @ts-ignore
     */
// @ts-ignore
    video_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the video. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoAddAlbumParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID (if the album will be created in a community).
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Album title.
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    privacy?: ("0" | "1" | "2" | "3")[] | ("0" | "1" | "2" | "3");
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoAddToAlbumParams {
// @ts-ignore
    target_id?: number;
// @ts-ignore
    album_id?: number;
// @ts-ignore
    album_ids?: number[] | number;
// @ts-ignore
    owner_id: number;
// @ts-ignore
    video_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoCreateCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the video.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Video ID.
// @ts-ignore
     */
// @ts-ignore
    video_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * New comment text.
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to post the comment from a community name (only if 'owner_id'<0)
// @ts-ignore
     */
// @ts-ignore
    from_group?: boolean | number;
// @ts-ignore
    attachments?: string[] | string;
// @ts-ignore
    reply_to_comment?: number;
// @ts-ignore
    sticker_id?: number;
// @ts-ignore
    guid?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoDeleteParams {
// @ts-ignore
    /**
// @ts-ignore
     * Video ID.
// @ts-ignore
     */
// @ts-ignore
    video_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the video.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    target_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoDeleteAlbumParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID (if the album is owned by a community).
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Album ID.
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
export interface VideoDeleteCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the video.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the comment to be deleted.
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
export interface VideoEditParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the video.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Video ID.
// @ts-ignore
     */
// @ts-ignore
    video_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * New video title.
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * New video description.
// @ts-ignore
     */
// @ts-ignore
    desc?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Disable comments for the group video.
// @ts-ignore
     */
// @ts-ignore
    no_comments?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to repeat the playback of the video, '0' — to play the video once,
// @ts-ignore
     */
// @ts-ignore
    repeat?: boolean | number;
// @ts-ignore
    privacy_view?: string[] | string;
// @ts-ignore
    privacy_comment?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoEditAlbumParams {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID (if the album edited is owned by a community).
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Album ID.
// @ts-ignore
     */
// @ts-ignore
    album_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * New album title.
// @ts-ignore
     */
// @ts-ignore
    title: string;
// @ts-ignore
    privacy?: ("0" | "1" | "2" | "3")[] | ("0" | "1" | "2" | "3");
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoEditCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the video.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID.
// @ts-ignore
     */
// @ts-ignore
    comment_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * New comment text.
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    attachments?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoGetParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the video(s).
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the album containing the video(s).
// @ts-ignore
     */
// @ts-ignore
    album_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of videos to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of videos.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return an extended response with additional fields
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    videos?: string[] | string;
// @ts-ignore
    fields?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoGetAlbumByIdParams {
// @ts-ignore
    /**
// @ts-ignore
     * identifier of a user or community to add a video to. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Album ID.
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
export interface VideoGetAlbumsParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the video album(s).
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of video albums.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of video albums to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return additional information about album privacy settings for the current user
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    need_system?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoGetAlbumsByVideoParams {
// @ts-ignore
    target_id?: number;
// @ts-ignore
    owner_id: number;
// @ts-ignore
    video_id: number;
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoGetCommentsParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the video.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Video ID.
// @ts-ignore
     */
// @ts-ignore
    video_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return an additional 'likes' field
// @ts-ignore
     */
// @ts-ignore
    need_likes?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of comments.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of comments to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Sort order: 'asc' — oldest comment first, 'desc' — newest comment first
// @ts-ignore
     */
// @ts-ignore
    sort?: "asc" | "desc";
// @ts-ignore
    start_comment_id?: number;
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    fields?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoRemoveFromAlbumParams {
// @ts-ignore
    target_id?: number;
// @ts-ignore
    album_id?: number;
// @ts-ignore
    album_ids?: number[] | number;
// @ts-ignore
    owner_id: number;
// @ts-ignore
    video_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoReorderAlbumsParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the albums..
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Album ID.
// @ts-ignore
     */
// @ts-ignore
    album_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the album before which the album in question shall be placed.
// @ts-ignore
     */
// @ts-ignore
    before?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the album after which the album in question shall be placed.
// @ts-ignore
     */
// @ts-ignore
    after?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoReorderVideosParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the album with videos.
// @ts-ignore
     */
// @ts-ignore
    target_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the video album.
// @ts-ignore
     */
// @ts-ignore
    album_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the video.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the video.
// @ts-ignore
     */
// @ts-ignore
    video_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the video before which the video in question shall be placed.
// @ts-ignore
     */
// @ts-ignore
    before_owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the video before which the video in question shall be placed.
// @ts-ignore
     */
// @ts-ignore
    before_video_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the video after which the photo in question shall be placed.
// @ts-ignore
     */
// @ts-ignore
    after_owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the video after which the photo in question shall be placed.
// @ts-ignore
     */
// @ts-ignore
    after_video_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoReportParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the video.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Video ID.
// @ts-ignore
     */
// @ts-ignore
    video_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Reason for the complaint: '0' - spam, '1' - child pornography, '2' - extremism, '3' - violence, '4' - drug propaganda, '5' - adult material, '6' - insult, abuse
// @ts-ignore
     */
// @ts-ignore
    reason?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
// @ts-ignore
    /**
// @ts-ignore
     * Comment describing the complaint.
// @ts-ignore
     */
// @ts-ignore
    comment?: string;
// @ts-ignore
    /**
// @ts-ignore
     * (If the video was found in search results.) Search query string.
// @ts-ignore
     */
// @ts-ignore
    search_query?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoReportCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the video.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the comment being reported.
// @ts-ignore
     */
// @ts-ignore
    comment_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Reason for the complaint: , 0 - spam , 1 - child pornography , 2 - extremism , 3 - violence , 4 - drug propaganda , 5 - adult material , 6 - insult, abuse
// @ts-ignore
     */
// @ts-ignore
    reason?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoRestoreParams {
// @ts-ignore
    /**
// @ts-ignore
     * Video ID.
// @ts-ignore
     */
// @ts-ignore
    video_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the video.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoRestoreCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the video.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the deleted comment.
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
export interface VideoSaveParams {
// @ts-ignore
    /**
// @ts-ignore
     * Name of the video.
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Description of the video.
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to designate the video as private (send it via a private message), the video will not appear on the user's video list and will not be available by ID for other users, '0' — not to designate the video as private
// @ts-ignore
     */
// @ts-ignore
    is_private?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to post the saved video on a user's wall, '0' — not to post the saved video on a user's wall
// @ts-ignore
     */
// @ts-ignore
    wallpost?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * URL for embedding the video from an external website.
// @ts-ignore
     */
// @ts-ignore
    link?: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the community in which the video will be saved. By default, the current user's page.
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the album to which the saved video will be added.
// @ts-ignore
     */
// @ts-ignore
    album_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to repeat the playback of the video, '0' — to play the video once,
// @ts-ignore
     */
// @ts-ignore
    repeat?: boolean | number;
// @ts-ignore
    privacy_view?: string[] | string;
// @ts-ignore
    privacy_comment?: string[] | string;
// @ts-ignore
    no_comments?: boolean | number;
// @ts-ignore
    compression?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoSearchParams {
// @ts-ignore
    /**
// @ts-ignore
     * Search query string (e.g., 'The Beatles').
// @ts-ignore
     */
// @ts-ignore
    q?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Sort order: '1' — by duration, '2' — by relevance, '0' — by date added
// @ts-ignore
     */
// @ts-ignore
    sort?: 1 | 2 | 0;
// @ts-ignore
    /**
// @ts-ignore
     * If not null, only searches for high-definition videos.
// @ts-ignore
     */
// @ts-ignore
    hd?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to disable the Safe Search filter, '0' — to enable the Safe Search filter
// @ts-ignore
     */
// @ts-ignore
    adult?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of videos.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of videos to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    live?: boolean | number;
// @ts-ignore
    filters?: ("youtube" | "vimeo" | "short" | "long")[] | ("youtube" | "vimeo" | "short" | "long");
// @ts-ignore
    search_own?: boolean | number;
// @ts-ignore
    longer?: number;
// @ts-ignore
    shorter?: number;
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallCheckCopyrightLinkParams {
// @ts-ignore
    link: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallCloseCommentsParams {
// @ts-ignore
    owner_id: number;
// @ts-ignore
    post_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallCreateCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID or community ID. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Post ID.
// @ts-ignore
     */
// @ts-ignore
    post_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID.
// @ts-ignore
     */
// @ts-ignore
    from_group?: number;
// @ts-ignore
    /**
// @ts-ignore
     * (Required if 'attachments' is not set.) Text of the comment.
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of comment to reply.
// @ts-ignore
     */
// @ts-ignore
    reply_to_comment?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Sticker ID.
// @ts-ignore
     */
// @ts-ignore
    sticker_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Unique identifier to avoid repeated comments.
// @ts-ignore
     */
// @ts-ignore
    guid?: string;
// @ts-ignore
    attachments?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallDeleteParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID or community ID. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the post to be deleted.
// @ts-ignore
     */
// @ts-ignore
    post_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallDeleteCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID or community ID. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID.
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
export interface WallEditParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID or community ID. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * (Required if 'attachments' is not set.) Text of the post.
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Topic ID. Allowed values can be obtained from newsfeed.getPostTopics method
// @ts-ignore
     */
// @ts-ignore
    topic_id?: 0 | 1 | 7 | 12 | 16 | 19 | 21 | 23 | 25 | 26 | 32 | 43;
// @ts-ignore
    post_id: number;
// @ts-ignore
    friends_only?: boolean | number;
// @ts-ignore
    attachments?: string[] | string;
// @ts-ignore
    services?: string;
// @ts-ignore
    signed?: boolean | number;
// @ts-ignore
    publish_date?: number;
// @ts-ignore
    lat?: number;
// @ts-ignore
    long?: number;
// @ts-ignore
    place_id?: number;
// @ts-ignore
    mark_as_ads?: boolean | number;
// @ts-ignore
    close_comments?: boolean | number;
// @ts-ignore
    donut_paid_duration?: number;
// @ts-ignore
    poster_bkg_id?: number;
// @ts-ignore
    poster_bkg_owner_id?: number;
// @ts-ignore
    poster_bkg_access_hash?: string;
// @ts-ignore
    copyright?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallEditAdsStealthParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID or community ID. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Post ID. Used for publishing of scheduled and suggested posts.
// @ts-ignore
     */
// @ts-ignore
    post_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * (Required if 'attachments' is not set.) Text of the post.
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Only for posts in communities with 'from_group' set to '1': '1' — post will be signed with the name of the posting user, '0' — post will not be signed (default)
// @ts-ignore
     */
// @ts-ignore
    signed?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Geographical latitude of a check-in, in degrees (from -90 to 90).
// @ts-ignore
     */
// @ts-ignore
    lat?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Geographical longitude of a check-in, in degrees (from -180 to 180).
// @ts-ignore
     */
// @ts-ignore
    long?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the location where the user was tagged.
// @ts-ignore
     */
// @ts-ignore
    place_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Link button ID
// @ts-ignore
     */
// @ts-ignore
    link_button?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link title
// @ts-ignore
     */
// @ts-ignore
    link_title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link image url
// @ts-ignore
     */
// @ts-ignore
    link_image?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link video ID in format "<owner_id>_<media_id>"
// @ts-ignore
     */
// @ts-ignore
    link_video?: string;
// @ts-ignore
    attachments?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallEditCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID or community ID. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID.
// @ts-ignore
     */
// @ts-ignore
    comment_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * New comment text.
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    attachments?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallGetParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the wall. By default, current user ID. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * User or community short address.
// @ts-ignore
     */
// @ts-ignore
    domain?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of posts.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of posts to return (maximum 100).
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return 'wall', 'profiles', and 'groups' fields, '0' — to return no additional fields (default)
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    filter?: Objects.WallGetFilter;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallGetByIdParams {
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return user and community objects needed to display posts, '0' — no additional fields are returned (default)
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Sets the number of parent elements to include in the array 'copy_history' that is returned if the post is a repost from another wall.
// @ts-ignore
     */
// @ts-ignore
    copy_history_depth?: number;
// @ts-ignore
    posts?: string[] | string;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallGetCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID or community ID. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID.
// @ts-ignore
     */
// @ts-ignore
    comment_id: number;
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallGetCommentsParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID or community ID. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Post ID.
// @ts-ignore
     */
// @ts-ignore
    post_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — to return the 'likes' field, '0' — not to return the 'likes' field (default)
// @ts-ignore
     */
// @ts-ignore
    need_likes?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of comments.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of comments to return (maximum 100).
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Sort order: 'asc' — chronological, 'desc' — reverse chronological
// @ts-ignore
     */
// @ts-ignore
    sort?: "asc" | "desc";
// @ts-ignore
    /**
// @ts-ignore
     * Number of characters at which to truncate comments when previewed. By default, '90'. Specify '0' if you do not want to truncate comments.
// @ts-ignore
     */
// @ts-ignore
    preview_length?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID.
// @ts-ignore
     */
// @ts-ignore
    comment_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Count items in threads.
// @ts-ignore
     */
// @ts-ignore
    thread_items_count?: number;
// @ts-ignore
    start_comment_id?: number;
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallGetRepostsParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID or community ID. By default, current user ID. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Post ID.
// @ts-ignore
     */
// @ts-ignore
    post_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of reposts.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of reposts to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallOpenCommentsParams {
// @ts-ignore
    owner_id: number;
// @ts-ignore
    post_id: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallPinParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the wall. By default, current user ID. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Post ID.
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
export interface WallPostParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID or community ID. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * '1' — post will be available to friends only, '0' — post will be available to all users (default)
// @ts-ignore
     */
// @ts-ignore
    friends_only?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * For a community: '1' — post will be published by the community, '0' — post will be published by the user (default)
// @ts-ignore
     */
// @ts-ignore
    from_group?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * (Required if 'attachments' is not set.) Text of the post.
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    /**
// @ts-ignore
     * List of services or websites the update will be exported to, if the user has so requested. Sample values: 'twitter', 'facebook'.
// @ts-ignore
     */
// @ts-ignore
    services?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Only for posts in communities with 'from_group' set to '1': '1' — post will be signed with the name of the posting user, '0' — post will not be signed (default)
// @ts-ignore
     */
// @ts-ignore
    signed?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Publication date (in Unix time). If used, posting will be delayed until the set time.
// @ts-ignore
     */
// @ts-ignore
    publish_date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Geographical latitude of a check-in, in degrees (from -90 to 90).
// @ts-ignore
     */
// @ts-ignore
    lat?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Geographical longitude of a check-in, in degrees (from -180 to 180).
// @ts-ignore
     */
// @ts-ignore
    long?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the location where the user was tagged.
// @ts-ignore
     */
// @ts-ignore
    place_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Post ID. Used for publishing of scheduled and suggested posts.
// @ts-ignore
     */
// @ts-ignore
    post_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Topic ID. Allowed values can be obtained from newsfeed.getPostTopics method
// @ts-ignore
     */
// @ts-ignore
    topic_id?: 0 | 1 | 7 | 12 | 16 | 19 | 21 | 23 | 25 | 26 | 32 | 43;
// @ts-ignore
    attachments?: string[] | string;
// @ts-ignore
    guid?: string;
// @ts-ignore
    mark_as_ads?: boolean | number;
// @ts-ignore
    close_comments?: boolean | number;
// @ts-ignore
    donut_paid_duration?: number;
// @ts-ignore
    mute_notifications?: boolean | number;
// @ts-ignore
    copyright?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallPostAdsStealthParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID or community ID. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * (Required if 'attachments' is not set.) Text of the post.
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Only for posts in communities with 'from_group' set to '1': '1' — post will be signed with the name of the posting user, '0' — post will not be signed (default)
// @ts-ignore
     */
// @ts-ignore
    signed?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Geographical latitude of a check-in, in degrees (from -90 to 90).
// @ts-ignore
     */
// @ts-ignore
    lat?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Geographical longitude of a check-in, in degrees (from -180 to 180).
// @ts-ignore
     */
// @ts-ignore
    long?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the location where the user was tagged.
// @ts-ignore
     */
// @ts-ignore
    place_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Unique identifier to avoid duplication the same post.
// @ts-ignore
     */
// @ts-ignore
    guid?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link button ID
// @ts-ignore
     */
// @ts-ignore
    link_button?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link title
// @ts-ignore
     */
// @ts-ignore
    link_title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link image url
// @ts-ignore
     */
// @ts-ignore
    link_image?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link video ID in format "<owner_id>_<media_id>"
// @ts-ignore
     */
// @ts-ignore
    link_video?: string;
// @ts-ignore
    attachments?: string[] | string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallReportCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the wall.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID.
// @ts-ignore
     */
// @ts-ignore
    comment_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Reason for the complaint: '0' - spam, '1' - child pornography, '2' - extremism, '3' - violence, '4' - drug propaganda, '5' - adult material, '6' - insult, abuse
// @ts-ignore
     */
// @ts-ignore
    reason?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallReportPostParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the wall.
// @ts-ignore
     */
// @ts-ignore
    owner_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Post ID.
// @ts-ignore
     */
// @ts-ignore
    post_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Reason for the complaint: '0' - spam, '1' - child pornography, '2' - extremism, '3' - violence, '4' - drug propaganda, '5' - adult material, '6' - insult, abuse
// @ts-ignore
     */
// @ts-ignore
    reason?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallRepostParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the object to be reposted on the wall. Example: "wall66748_3675"
// @ts-ignore
     */
// @ts-ignore
    object: string;
// @ts-ignore
    /**
// @ts-ignore
     * Comment to be added along with the reposted object.
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Target community ID when reposting to a community.
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    mark_as_ads?: boolean | number;
// @ts-ignore
    mute_notifications?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallRestoreParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID or community ID from whose wall the post was deleted. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the post to be restored.
// @ts-ignore
     */
// @ts-ignore
    post_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallRestoreCommentParams {
// @ts-ignore
    /**
// @ts-ignore
     * User ID or community ID. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID.
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
export interface WallSearchParams {
// @ts-ignore
    /**
// @ts-ignore
     * user or community id. "Remember that for a community 'owner_id' must be negative."
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * user or community screen name.
// @ts-ignore
     */
// @ts-ignore
    domain?: string;
// @ts-ignore
    /**
// @ts-ignore
     * search query string.
// @ts-ignore
     */
// @ts-ignore
    query?: string;
// @ts-ignore
    /**
// @ts-ignore
     * '1' - returns only page owner's posts.
// @ts-ignore
     */
// @ts-ignore
    owners_only?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * count of posts to return.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offset needed to return a specific subset of posts.
// @ts-ignore
     */
// @ts-ignore
    offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * show extended post info.
// @ts-ignore
     */
// @ts-ignore
    extended?: boolean | number;
// @ts-ignore
    fields?: Objects.BaseUserGroupFields[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallUnpinParams {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user or community that owns the wall. By default, current user ID. Use a negative value to designate a community ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Post ID.
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
export interface WidgetsGetCommentsParams {
// @ts-ignore
    widget_api_id?: number;
// @ts-ignore
    url?: string;
// @ts-ignore
    page_id?: string;
// @ts-ignore
    order?: string;
// @ts-ignore
    fields?: Objects.UsersFields[];
// @ts-ignore
    offset?: number;
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WidgetsGetPagesParams {
// @ts-ignore
    widget_api_id?: number;
// @ts-ignore
    order?: string;
// @ts-ignore
    period?: string;
// @ts-ignore
    offset?: number;
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

