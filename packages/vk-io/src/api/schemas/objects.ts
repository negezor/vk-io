// @ts-ignore
/* eslint-disable */
// @ts-ignore
export interface AccountAccountCounters {
// @ts-ignore
    /**
// @ts-ignore
     * New app requests number
// @ts-ignore
     */
// @ts-ignore
    app_requests?: number;
// @ts-ignore
    /**
// @ts-ignore
     * New events number
// @ts-ignore
     */
// @ts-ignore
    events?: number;
// @ts-ignore
    /**
// @ts-ignore
     * New faves number
// @ts-ignore
     */
// @ts-ignore
    faves?: number;
// @ts-ignore
    /**
// @ts-ignore
     * New friends requests number
// @ts-ignore
     */
// @ts-ignore
    friends?: number;
// @ts-ignore
    /**
// @ts-ignore
     * New friends suggestions number
// @ts-ignore
     */
// @ts-ignore
    friends_suggestions?: number;
// @ts-ignore
    /**
// @ts-ignore
     * New friends recommendations number
// @ts-ignore
     */
// @ts-ignore
    friends_recommendations?: number;
// @ts-ignore
    /**
// @ts-ignore
     * New gifts number
// @ts-ignore
     */
// @ts-ignore
    gifts?: number;
// @ts-ignore
    /**
// @ts-ignore
     * New groups number
// @ts-ignore
     */
// @ts-ignore
    groups?: number;
// @ts-ignore
    /**
// @ts-ignore
     * New messages number
// @ts-ignore
     */
// @ts-ignore
    messages?: number;
// @ts-ignore
    /**
// @ts-ignore
     * New memories number
// @ts-ignore
     */
// @ts-ignore
    memories?: number;
// @ts-ignore
    /**
// @ts-ignore
     * New notes number
// @ts-ignore
     */
// @ts-ignore
    notes?: number;
// @ts-ignore
    /**
// @ts-ignore
     * New notifications number
// @ts-ignore
     */
// @ts-ignore
    notifications?: number;
// @ts-ignore
    /**
// @ts-ignore
     * New photo tags number
// @ts-ignore
     */
// @ts-ignore
    photos?: number;
// @ts-ignore
    /**
// @ts-ignore
     * New sdk number
// @ts-ignore
     */
// @ts-ignore
    sdk?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    menu_discover_badge?: number;
// @ts-ignore
    menu_clips_badge?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountInfo {
// @ts-ignore
    /**
// @ts-ignore
     * Country code
// @ts-ignore
     */
// @ts-ignore
    country?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Ads slot id for MyTarget
// @ts-ignore
     */
// @ts-ignore
    mini_apps_ads_slot_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Language ID
// @ts-ignore
     */
// @ts-ignore
    lang?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    show_vk_apps_intro?: boolean | number;
// @ts-ignore
    qr_promotion?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountNameRequest {
// @ts-ignore
    /**
// @ts-ignore
     * First name in request
// @ts-ignore
     */
// @ts-ignore
    first_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Request ID needed to cancel the request
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Last name in request
// @ts-ignore
     */
// @ts-ignore
    last_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Text to display to user
// @ts-ignore
     */
// @ts-ignore
    lang?: string;
// @ts-ignore
    /**
// @ts-ignore
     * href for link in lang field
// @ts-ignore
     */
// @ts-ignore
    link_href?: string;
// @ts-ignore
    /**
// @ts-ignore
     * label to display for link in lang field
// @ts-ignore
     */
// @ts-ignore
    link_label?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AccountNameRequestStatus = "success" | "processing" | "declined" | "was_accepted" | "was_declined" | "declined_with_link" | "response" | "response_with_link";
// @ts-ignore

// @ts-ignore
export interface AccountOffer {
// @ts-ignore
    /**
// @ts-ignore
     * Offer description
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Offer ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image
// @ts-ignore
     */
// @ts-ignore
    img?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Instruction how to process the offer
// @ts-ignore
     */
// @ts-ignore
    instruction?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Instruction how to process the offer (HTML format)
// @ts-ignore
     */
// @ts-ignore
    instruction_html?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Offer price
// @ts-ignore
     */
// @ts-ignore
    price?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Offer short description
// @ts-ignore
     */
// @ts-ignore
    short_description?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Offer tag
// @ts-ignore
     */
// @ts-ignore
    tag?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Offer title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Currency amount
// @ts-ignore
     */
// @ts-ignore
    currency_amount?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Link id
// @ts-ignore
     */
// @ts-ignore
    link_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Link type
// @ts-ignore
     */
// @ts-ignore
    link_type?: "profile" | "group" | "app";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountPushConversations {
// @ts-ignore
    /**
// @ts-ignore
     * Items count
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items?: AccountPushConversationsItem[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountPushConversationsItem {
// @ts-ignore
    /**
// @ts-ignore
     * Time until that notifications are disabled in seconds
// @ts-ignore
     */
// @ts-ignore
    disabled_until?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Peer ID
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
export interface AccountPushParams {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    msg?: AccountPushParamsMode[];
// @ts-ignore
    chat?: AccountPushParamsMode[];
// @ts-ignore
    like?: AccountPushParamsSettings[];
// @ts-ignore
    repost?: AccountPushParamsSettings[];
// @ts-ignore
    comment?: AccountPushParamsSettings[];
// @ts-ignore
    mention?: AccountPushParamsSettings[];
// @ts-ignore
    reply?: AccountPushParamsOnoff[];
// @ts-ignore
    new_post?: AccountPushParamsOnoff[];
// @ts-ignore
    wall_post?: AccountPushParamsOnoff[];
// @ts-ignore
    wall_publish?: AccountPushParamsOnoff[];
// @ts-ignore
    friend?: AccountPushParamsOnoff[];
// @ts-ignore
    friend_found?: AccountPushParamsOnoff[];
// @ts-ignore
    friend_accepted?: AccountPushParamsOnoff[];
// @ts-ignore
    group_invite?: AccountPushParamsOnoff[];
// @ts-ignore
    group_accepted?: AccountPushParamsOnoff[];
// @ts-ignore
    birthday?: AccountPushParamsOnoff[];
// @ts-ignore
    event_soon?: AccountPushParamsOnoff[];
// @ts-ignore
    app_request?: AccountPushParamsOnoff[];
// @ts-ignore
    sdk_open?: AccountPushParamsOnoff[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AccountPushParamsMode = "on" | "off" | "no_sound" | "no_text";
// @ts-ignore

// @ts-ignore
export type AccountPushParamsOnoff = "on" | "off";
// @ts-ignore

// @ts-ignore
export type AccountPushParamsSettings = "on" | "off" | "fr_of_fr";
// @ts-ignore

// @ts-ignore
export interface AccountPushSettings {
// @ts-ignore
    /**
// @ts-ignore
     * Time until that notifications are disabled in Unixtime
// @ts-ignore
     */
// @ts-ignore
    disabled_until?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AccountSubscriptions = number[];
// @ts-ignore

// @ts-ignore
export interface AccountUserSettings1 {
// @ts-ignore
    /**
// @ts-ignore
     * URL of square photo of the user with 200 pixels in width
// @ts-ignore
     */
// @ts-ignore
    photo_200: string;
// @ts-ignore
    /**
// @ts-ignore
     * flag about service account
// @ts-ignore
     */
// @ts-ignore
    is_service_account: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AccountUserSettings = UsersUserMin & UsersUserSettingsXtr & AccountUserSettings1;
// @ts-ignore

// @ts-ignore
export interface AccountUserSettingsInterest {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    title?: string;
// @ts-ignore
    value?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AccountUserSettingsInterests {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AddressesFields = "id" | "title" | "address" | "additional_address" | "country_id" | "city_id" | "metro_station_id" | "latitude" | "longitude" | "distance" | "work_info_status" | "timetable" | "phone" | "time_offset";
// @ts-ignore

// @ts-ignore
export type AdsAccessRole = "admin" | "manager" | "reports";
// @ts-ignore

// @ts-ignore
export type AdsAccessRolePublic = "manager" | "reports";
// @ts-ignore

// @ts-ignore
export interface AdsAccesses {
// @ts-ignore
    /**
// @ts-ignore
     * Client ID
// @ts-ignore
     */
// @ts-ignore
    client_id?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsAccount {
// @ts-ignore
    /**
// @ts-ignore
     * Account ID
// @ts-ignore
     */
// @ts-ignore
    account_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Account name
// @ts-ignore
     */
// @ts-ignore
    account_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Can user view account budget
// @ts-ignore
     */
// @ts-ignore
    can_view_budget?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AdsAccountType = "general" | "agency";
// @ts-ignore

// @ts-ignore
export interface AdsAd {
// @ts-ignore
    /**
// @ts-ignore
     * Ad format
// @ts-ignore
     */
// @ts-ignore
    ad_format?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Total limit
// @ts-ignore
     */
// @ts-ignore
    all_limit?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Campaign ID
// @ts-ignore
     */
// @ts-ignore
    campaign_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Category ID
// @ts-ignore
     */
// @ts-ignore
    category1_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Additional category ID
// @ts-ignore
     */
// @ts-ignore
    category2_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Cost of a click, kopecks
// @ts-ignore
     */
// @ts-ignore
    cpc?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Cost of 1000 impressions, kopecks
// @ts-ignore
     */
// @ts-ignore
    cpm?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Cost of an action, kopecks
// @ts-ignore
     */
// @ts-ignore
    cpa?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Cost of 1000 impressions optimized, kopecks
// @ts-ignore
     */
// @ts-ignore
    ocpm?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Max cost of target actions for autobidding, kopecks
// @ts-ignore
     */
// @ts-ignore
    autobidding_max_cost?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Ad ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Impressions limit
// @ts-ignore
     */
// @ts-ignore
    impressions_limit?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Ad title
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AdsAdApproved = 0 | 1 | 2 | 3;
// @ts-ignore

// @ts-ignore
export type AdsAdCostType = 0 | 1 | 2 | 3;
// @ts-ignore

// @ts-ignore
export interface AdsAdLayout {
// @ts-ignore
    /**
// @ts-ignore
     * Ad format
// @ts-ignore
     */
// @ts-ignore
    ad_format?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Campaign ID
// @ts-ignore
     */
// @ts-ignore
    campaign_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Ad description
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Ad ID
// @ts-ignore
     */
// @ts-ignore
    id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Image URL
// @ts-ignore
     */
// @ts-ignore
    image_src?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image in double size
// @ts-ignore
     */
// @ts-ignore
    image_src_2x?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Domain of advertised object
// @ts-ignore
     */
// @ts-ignore
    link_domain?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of advertised object
// @ts-ignore
     */
// @ts-ignore
    link_url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * link to preview an ad as it is shown on the website
// @ts-ignore
     */
// @ts-ignore
    preview_link?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Ad title
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
export type AdsAdStatus = 0 | 1 | 2;
// @ts-ignore

// @ts-ignore
export interface AdsCampaign {
// @ts-ignore
    /**
// @ts-ignore
     * Amount of active ads in campaign
// @ts-ignore
     */
// @ts-ignore
    ads_count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Campaign's total limit, rubles
// @ts-ignore
     */
// @ts-ignore
    all_limit?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Campaign create time, as Unixtime
// @ts-ignore
     */
// @ts-ignore
    create_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Campaign goal type
// @ts-ignore
     */
// @ts-ignore
    goal_type?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Campaign user goal type
// @ts-ignore
     */
// @ts-ignore
    user_goal_type?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Shows if Campaign Budget Optimization is on
// @ts-ignore
     */
// @ts-ignore
    is_cbo_enabled?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Campaign's day limit, rubles
// @ts-ignore
     */
// @ts-ignore
    day_limit?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Campaign ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Campaign title
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Campaign start time, as Unixtime
// @ts-ignore
     */
// @ts-ignore
    start_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Campaign stop time, as Unixtime
// @ts-ignore
     */
// @ts-ignore
    stop_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Campaign update time, as Unixtime
// @ts-ignore
     */
// @ts-ignore
    update_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Limit of views per user per campaign
// @ts-ignore
     */
// @ts-ignore
    views_limit?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AdsCampaignStatus = 0 | 1 | 2;
// @ts-ignore

// @ts-ignore
export type AdsCampaignType = "normal" | "vk_apps_managed" | "mobile_apps" | "promoted_posts" | "adaptive_ads" | "stories";
// @ts-ignore

// @ts-ignore
export interface AdsCategory {
// @ts-ignore
    /**
// @ts-ignore
     * Category ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Category name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    subcategories?: AdsCategory[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsClient {
// @ts-ignore
    /**
// @ts-ignore
     * Client's total limit, rubles
// @ts-ignore
     */
// @ts-ignore
    all_limit?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Client's day limit, rubles
// @ts-ignore
     */
// @ts-ignore
    day_limit?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Client ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Client name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsCreateAdStatus {
// @ts-ignore
    /**
// @ts-ignore
     * Ad ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Stealth Post ID
// @ts-ignore
     */
// @ts-ignore
    post_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Error code
// @ts-ignore
     */
// @ts-ignore
    error_code?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Error description
// @ts-ignore
     */
// @ts-ignore
    error_desc?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsCreateCampaignStatus {
// @ts-ignore
    /**
// @ts-ignore
     * Campaign ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Error code
// @ts-ignore
     */
// @ts-ignore
    error_code?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Error description
// @ts-ignore
     */
// @ts-ignore
    error_desc?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsCriteria {
// @ts-ignore
    /**
// @ts-ignore
     * Age from
// @ts-ignore
     */
// @ts-ignore
    age_from?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Age to
// @ts-ignore
     */
// @ts-ignore
    age_to?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Apps IDs
// @ts-ignore
     */
// @ts-ignore
    apps?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Apps IDs to except
// @ts-ignore
     */
// @ts-ignore
    apps_not?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Days to birthday
// @ts-ignore
     */
// @ts-ignore
    birthday?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Cities IDs
// @ts-ignore
     */
// @ts-ignore
    cities?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Cities IDs to except
// @ts-ignore
     */
// @ts-ignore
    cities_not?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Country ID
// @ts-ignore
     */
// @ts-ignore
    country?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Districts IDs
// @ts-ignore
     */
// @ts-ignore
    districts?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Communities IDs
// @ts-ignore
     */
// @ts-ignore
    groups?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Interests categories IDs
// @ts-ignore
     */
// @ts-ignore
    interest_categories?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Interests
// @ts-ignore
     */
// @ts-ignore
    interests?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Positions IDs
// @ts-ignore
     */
// @ts-ignore
    positions?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Religions IDs
// @ts-ignore
     */
// @ts-ignore
    religions?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Retargeting groups IDs
// @ts-ignore
     */
// @ts-ignore
    retargeting_groups?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Retargeting groups IDs to except
// @ts-ignore
     */
// @ts-ignore
    retargeting_groups_not?: string;
// @ts-ignore
    /**
// @ts-ignore
     * School graduation year from
// @ts-ignore
     */
// @ts-ignore
    school_from?: number;
// @ts-ignore
    /**
// @ts-ignore
     * School graduation year to
// @ts-ignore
     */
// @ts-ignore
    school_to?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Schools IDs
// @ts-ignore
     */
// @ts-ignore
    schools?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Stations IDs
// @ts-ignore
     */
// @ts-ignore
    stations?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Relationship statuses
// @ts-ignore
     */
// @ts-ignore
    statuses?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Streets IDs
// @ts-ignore
     */
// @ts-ignore
    streets?: string;
// @ts-ignore
    /**
// @ts-ignore
     * University graduation year from
// @ts-ignore
     */
// @ts-ignore
    uni_from?: number;
// @ts-ignore
    /**
// @ts-ignore
     * University graduation year to
// @ts-ignore
     */
// @ts-ignore
    uni_to?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Browsers
// @ts-ignore
     */
// @ts-ignore
    user_browsers?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Devices
// @ts-ignore
     */
// @ts-ignore
    user_devices?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Operating systems
// @ts-ignore
     */
// @ts-ignore
    user_os?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AdsCriteriaSex = 0 | 1 | 2;
// @ts-ignore

// @ts-ignore
export interface AdsDemoStats {
// @ts-ignore
    /**
// @ts-ignore
     * Object ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsDemostatsFormat {
// @ts-ignore
    /**
// @ts-ignore
     * Day as YYYY-MM-DD
// @ts-ignore
     */
// @ts-ignore
    day?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Month as YYYY-MM
// @ts-ignore
     */
// @ts-ignore
    month?: string;
// @ts-ignore
    /**
// @ts-ignore
     * 1 if period=overall
// @ts-ignore
     */
// @ts-ignore
    overall?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    age?: AdsStatsAge[];
// @ts-ignore
    cities?: AdsStatsCities[];
// @ts-ignore
    sex?: AdsStatsSex[];
// @ts-ignore
    sex_age?: AdsStatsSexAge[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsFloodStats {
// @ts-ignore
    /**
// @ts-ignore
     * Requests left
// @ts-ignore
     */
// @ts-ignore
    left?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Time to refresh in seconds
// @ts-ignore
     */
// @ts-ignore
    refresh?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsLinkStatus {
// @ts-ignore
    /**
// @ts-ignore
     * Reject reason
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL
// @ts-ignore
     */
// @ts-ignore
    redirect_url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link status
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
export interface AdsLookalikeRequest {
// @ts-ignore
    /**
// @ts-ignore
     * Lookalike request ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Lookalike request create time, as Unixtime
// @ts-ignore
     */
// @ts-ignore
    create_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Lookalike request update time, as Unixtime
// @ts-ignore
     */
// @ts-ignore
    update_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Time by which lookalike request would be deleted, as Unixtime
// @ts-ignore
     */
// @ts-ignore
    scheduled_delete_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Lookalike request status
// @ts-ignore
     */
// @ts-ignore
    status?: "search_in_progress" | "search_failed" | "search_done" | "save_in_progress" | "save_failed" | "save_done";
// @ts-ignore
    /**
// @ts-ignore
     * Lookalike request source type
// @ts-ignore
     */
// @ts-ignore
    source_type?: "retargeting_group";
// @ts-ignore
    /**
// @ts-ignore
     * Retargeting group id, which was used as lookalike seed
// @ts-ignore
     */
// @ts-ignore
    source_retargeting_group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Lookalike request seed name (retargeting group name)
// @ts-ignore
     */
// @ts-ignore
    source_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Lookalike request seed audience size
// @ts-ignore
     */
// @ts-ignore
    audience_count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    save_audience_levels?: AdsLookalikeRequestSaveAudienceLevel[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsLookalikeRequestSaveAudienceLevel {
// @ts-ignore
    /**
// @ts-ignore
     * Save audience level id, which is used in save audience queries
// @ts-ignore
     */
// @ts-ignore
    level?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Saved audience audience size for according level
// @ts-ignore
     */
// @ts-ignore
    audience_count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsMusician {
// @ts-ignore
    /**
// @ts-ignore
     * Targeting music artist ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Music artist name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Music artist photo
// @ts-ignore
     */
// @ts-ignore
    avatar?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AdsObjectType = "ad" | "campaign" | "client" | "office";
// @ts-ignore

// @ts-ignore
export interface AdsParagraphs {
// @ts-ignore
    /**
// @ts-ignore
     * Rules paragraph
// @ts-ignore
     */
// @ts-ignore
    paragraph?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsPromotedPostReach {
// @ts-ignore
    /**
// @ts-ignore
     * Hides amount
// @ts-ignore
     */
// @ts-ignore
    hide?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Object ID from 'ids' parameter
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Community joins
// @ts-ignore
     */
// @ts-ignore
    join_group?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Link clicks
// @ts-ignore
     */
// @ts-ignore
    links?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Subscribers reach
// @ts-ignore
     */
// @ts-ignore
    reach_subscribers?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Total reach
// @ts-ignore
     */
// @ts-ignore
    reach_total?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Reports amount
// @ts-ignore
     */
// @ts-ignore
    report?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Community clicks
// @ts-ignore
     */
// @ts-ignore
    to_group?: number;
// @ts-ignore
    /**
// @ts-ignore
     * 'Unsubscribe' events amount
// @ts-ignore
     */
// @ts-ignore
    unsubscribe?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Video views for 100 percent
// @ts-ignore
     */
// @ts-ignore
    video_views_100p?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Video views for 25 percent
// @ts-ignore
     */
// @ts-ignore
    video_views_25p?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Video views for 3 seconds
// @ts-ignore
     */
// @ts-ignore
    video_views_3s?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Video views for 50 percent
// @ts-ignore
     */
// @ts-ignore
    video_views_50p?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Video views for 75 percent
// @ts-ignore
     */
// @ts-ignore
    video_views_75p?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Video starts
// @ts-ignore
     */
// @ts-ignore
    video_views_start?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsRejectReason {
// @ts-ignore
    /**
// @ts-ignore
     * Comment text
// @ts-ignore
     */
// @ts-ignore
    comment?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    rules?: AdsRules[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsRules {
// @ts-ignore
    /**
// @ts-ignore
     * Comment
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    paragraphs?: AdsParagraphs[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsStats {
// @ts-ignore
    /**
// @ts-ignore
     * Object ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsStatsAge {
// @ts-ignore
    /**
// @ts-ignore
     * Clicks rate
// @ts-ignore
     */
// @ts-ignore
    clicks_rate?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Impressions rate
// @ts-ignore
     */
// @ts-ignore
    impressions_rate?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Age interval
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
export interface AdsStatsCities {
// @ts-ignore
    /**
// @ts-ignore
     * Clicks rate
// @ts-ignore
     */
// @ts-ignore
    clicks_rate?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Impressions rate
// @ts-ignore
     */
// @ts-ignore
    impressions_rate?: number;
// @ts-ignore
    /**
// @ts-ignore
     * City name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * City ID
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
export interface AdsStatsFormat {
// @ts-ignore
    /**
// @ts-ignore
     * Clicks number
// @ts-ignore
     */
// @ts-ignore
    clicks?: number;
// @ts-ignore
    /**
// @ts-ignore
     * External clicks number
// @ts-ignore
     */
// @ts-ignore
    link_external_clicks?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Day as YYYY-MM-DD
// @ts-ignore
     */
// @ts-ignore
    day?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Impressions number
// @ts-ignore
     */
// @ts-ignore
    impressions?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Events number
// @ts-ignore
     */
// @ts-ignore
    join_rate?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Month as YYYY-MM
// @ts-ignore
     */
// @ts-ignore
    month?: string;
// @ts-ignore
    /**
// @ts-ignore
     * 1 if period=overall
// @ts-ignore
     */
// @ts-ignore
    overall?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Reach
// @ts-ignore
     */
// @ts-ignore
    reach?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Spent funds
// @ts-ignore
     */
// @ts-ignore
    spent?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Clickthoughs to the advertised site
// @ts-ignore
     */
// @ts-ignore
    video_clicks_site?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Video views number
// @ts-ignore
     */
// @ts-ignore
    video_views?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Video views (full video)
// @ts-ignore
     */
// @ts-ignore
    video_views_full?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Video views (half of video)
// @ts-ignore
     */
// @ts-ignore
    video_views_half?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsStatsSex {
// @ts-ignore
    /**
// @ts-ignore
     * Clicks rate
// @ts-ignore
     */
// @ts-ignore
    clicks_rate?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Impressions rate
// @ts-ignore
     */
// @ts-ignore
    impressions_rate?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsStatsSexAge {
// @ts-ignore
    /**
// @ts-ignore
     * Clicks rate
// @ts-ignore
     */
// @ts-ignore
    clicks_rate?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Impressions rate
// @ts-ignore
     */
// @ts-ignore
    impressions_rate?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Sex and age interval
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
export type AdsStatsSexValue = "f" | "m";
// @ts-ignore

// @ts-ignore
export interface AdsStatsViewsTimes {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    views_ads_times_1?: number;
// @ts-ignore
    views_ads_times_2?: number;
// @ts-ignore
    views_ads_times_3?: number;
// @ts-ignore
    views_ads_times_4?: number;
// @ts-ignore
    views_ads_times_5?: string;
// @ts-ignore
    views_ads_times_6?: number;
// @ts-ignore
    views_ads_times_7?: number;
// @ts-ignore
    views_ads_times_8?: number;
// @ts-ignore
    views_ads_times_9?: number;
// @ts-ignore
    views_ads_times_10?: number;
// @ts-ignore
    views_ads_times_11_plus?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsTargSettings1 {
// @ts-ignore
    /**
// @ts-ignore
     * Ad ID
// @ts-ignore
     */
// @ts-ignore
    id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Campaign ID
// @ts-ignore
     */
// @ts-ignore
    campaign_id: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AdsTargSettings = AdsTargSettings1 & AdsCriteria;
// @ts-ignore

// @ts-ignore
export interface AdsTargStats {
// @ts-ignore
    /**
// @ts-ignore
     * Audience
// @ts-ignore
     */
// @ts-ignore
    audience_count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Recommended CPC value for 50% reach (old format)
// @ts-ignore
     */
// @ts-ignore
    recommended_cpc?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Recommended CPM value for 50% reach (old format)
// @ts-ignore
     */
// @ts-ignore
    recommended_cpm?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Recommended CPC value for 50% reach
// @ts-ignore
     */
// @ts-ignore
    recommended_cpc_50?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Recommended CPM value for 50% reach
// @ts-ignore
     */
// @ts-ignore
    recommended_cpm_50?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Recommended CPC value for 70% reach
// @ts-ignore
     */
// @ts-ignore
    recommended_cpc_70?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Recommended CPM value for 70% reach
// @ts-ignore
     */
// @ts-ignore
    recommended_cpm_70?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Recommended CPC value for 90% reach
// @ts-ignore
     */
// @ts-ignore
    recommended_cpc_90?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Recommended CPM value for 90% reach
// @ts-ignore
     */
// @ts-ignore
    recommended_cpm_90?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsTargSuggestions {
// @ts-ignore
    /**
// @ts-ignore
     * Object ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Object name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsTargSuggestionsCities {
// @ts-ignore
    /**
// @ts-ignore
     * Object ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Object name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Parent object
// @ts-ignore
     */
// @ts-ignore
    parent?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsTargSuggestionsRegions {
// @ts-ignore
    /**
// @ts-ignore
     * Object ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Object name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Object type
// @ts-ignore
     */
// @ts-ignore
    type?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsTargSuggestionsSchools {
// @ts-ignore
    /**
// @ts-ignore
     * Full school title
// @ts-ignore
     */
// @ts-ignore
    desc?: string;
// @ts-ignore
    /**
// @ts-ignore
     * School ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * School title
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * City name
// @ts-ignore
     */
// @ts-ignore
    parent?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AdsTargSuggestionsSchoolsType = "school" | "university" | "faculty" | "chair";
// @ts-ignore

// @ts-ignore
export interface AdsTargetGroup {
// @ts-ignore
    /**
// @ts-ignore
     * Audience
// @ts-ignore
     */
// @ts-ignore
    audience_count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Site domain
// @ts-ignore
     */
// @ts-ignore
    domain?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Group ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of days for user to be in group
// @ts-ignore
     */
// @ts-ignore
    lifetime?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Group name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Pixel code
// @ts-ignore
     */
// @ts-ignore
    pixel?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsUpdateOfficeUsersResult {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    is_success?: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsUserSpecification {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    grant_access_to_all_clients?: boolean | number;
// @ts-ignore
    client_ids?: number[];
// @ts-ignore
    view_budget?: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsUserSpecificationCutted {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    client_id?: number;
// @ts-ignore
    view_budget?: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdsUsers {
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    accesses?: AdsAccesses[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdswebGetAdCategoriesResponseCategoriesCategory {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    id?: number;
// @ts-ignore
    name?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdswebGetAdUnitsResponseAdUnitsAdUnit {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    id?: number;
// @ts-ignore
    site_id?: number;
// @ts-ignore
    name?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdswebGetFraudHistoryResponseEntriesEntry {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    site_id?: number;
// @ts-ignore
    day?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdswebGetSitesResponseSitesSite {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    id?: number;
// @ts-ignore
    status_user?: string;
// @ts-ignore
    status_moder?: string;
// @ts-ignore
    domains?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AdswebGetStatisticsResponseItemsItem {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    site_id?: number;
// @ts-ignore
    ad_unit_id?: number;
// @ts-ignore
    overall_count?: number;
// @ts-ignore
    months_count?: number;
// @ts-ignore
    month_min?: string;
// @ts-ignore
    month_max?: string;
// @ts-ignore
    days_count?: number;
// @ts-ignore
    day_min?: string;
// @ts-ignore
    day_max?: string;
// @ts-ignore
    hours_count?: number;
// @ts-ignore
    hour_min?: string;
// @ts-ignore
    hour_max?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppWidgetsPhoto {
// @ts-ignore
    /**
// @ts-ignore
     * Image ID
// @ts-ignore
     */
// @ts-ignore
    id?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    images?: BaseImage[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppWidgetsPhotos {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    count?: number;
// @ts-ignore
    items?: AppWidgetsPhoto[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppsApp1 {
// @ts-ignore
    /**
// @ts-ignore
     * Application author's URL
// @ts-ignore
     */
// @ts-ignore
    author_url: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the app banner with 1120 px in width
// @ts-ignore
     */
// @ts-ignore
    banner_1120: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the app banner with 560 px in width
// @ts-ignore
     */
// @ts-ignore
    banner_560: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the app icon with 16 px in width
// @ts-ignore
     */
// @ts-ignore
    icon_16: string;
// @ts-ignore
    /**
// @ts-ignore
     * Screen orientation
// @ts-ignore
     */
// @ts-ignore
    screen_orientation: number;
// @ts-ignore
    /**
// @ts-ignore
     * Catalog position
// @ts-ignore
     */
// @ts-ignore
    catalog_position: number;
// @ts-ignore
    /**
// @ts-ignore
     * Application description
// @ts-ignore
     */
// @ts-ignore
    description: string;
// @ts-ignore
    /**
// @ts-ignore
     * Genre name
// @ts-ignore
     */
// @ts-ignore
    genre: string;
// @ts-ignore
    /**
// @ts-ignore
     * Genre ID
// @ts-ignore
     */
// @ts-ignore
    genre_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether the application is multilanguage
// @ts-ignore
     */
// @ts-ignore
    international: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether application is in mobile catalog
// @ts-ignore
     */
// @ts-ignore
    is_in_catalog: number;
// @ts-ignore
    /**
// @ts-ignore
     * Members number
// @ts-ignore
     */
// @ts-ignore
    members_count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Application ID in store
// @ts-ignore
     */
// @ts-ignore
    platform_id: string;
// @ts-ignore
    /**
// @ts-ignore
     * Date when the application has been published in Unixtime
// @ts-ignore
     */
// @ts-ignore
    published_date: number;
// @ts-ignore
    /**
// @ts-ignore
     * Screen name
// @ts-ignore
     */
// @ts-ignore
    screen_name: string;
// @ts-ignore
    /**
// @ts-ignore
     * Application section name
// @ts-ignore
     */
// @ts-ignore
    section: string;
// @ts-ignore
    is_new: BaseBoolInt;
// @ts-ignore
    push_enabled: BaseBoolInt;
// @ts-ignore
    friends: number[];
// @ts-ignore
    leaderboard_type: AppsAppLeaderboardType;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AppsApp = AppsAppMin & AppsApp1;
// @ts-ignore

// @ts-ignore
export type AppsAppLeaderboardType = 0 | 1 | 2;
// @ts-ignore

// @ts-ignore
export interface AppsAppMin {
// @ts-ignore
    /**
// @ts-ignore
     * Application ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Application title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Application author's ID
// @ts-ignore
     */
// @ts-ignore
    author_owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Is application installed
// @ts-ignore
     */
// @ts-ignore
    is_installed?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the app icon with 139 px in width
// @ts-ignore
     */
// @ts-ignore
    icon_139?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the app icon with 150 px in width
// @ts-ignore
     */
// @ts-ignore
    icon_150?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the app icon with 278 px in width
// @ts-ignore
     */
// @ts-ignore
    icon_278?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the app icon with 576 px in width
// @ts-ignore
     */
// @ts-ignore
    icon_576?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Hex color code without hash sign
// @ts-ignore
     */
// @ts-ignore
    background_loader_color?: string;
// @ts-ignore
    /**
// @ts-ignore
     * SVG data
// @ts-ignore
     */
// @ts-ignore
    loader_icon?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the app icon with 75 px in width
// @ts-ignore
     */
// @ts-ignore
    icon_75?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AppsAppType = "app" | "game" | "site" | "standalone" | "vk_app" | "community_app" | "html5_game" | "mini_app";
// @ts-ignore

// @ts-ignore
export interface AppsCatalogList {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items?: AppsApp[];
// @ts-ignore
    profiles?: UsersUserMin[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface AppsLeaderboard {
// @ts-ignore
    /**
// @ts-ignore
     * Level
// @ts-ignore
     */
// @ts-ignore
    level?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Points number
// @ts-ignore
     */
// @ts-ignore
    points?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Score number
// @ts-ignore
     */
// @ts-ignore
    score?: number;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
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
/*Scope description*/
// @ts-ignore
export interface AppsScope {
// @ts-ignore
    /**
// @ts-ignore
     * Scope name
// @ts-ignore
     */
// @ts-ignore
    name?: "friends" | "photos" | "video" | "pages" | "status" | "notes" | "wall" | "docs" | "groups" | "stats" | "market";
// @ts-ignore
    /**
// @ts-ignore
     * Scope title
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
export interface AudioAudio {
// @ts-ignore
    /**
// @ts-ignore
     * Access key for the audio
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Artist name
// @ts-ignore
     */
// @ts-ignore
    artist?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Audio ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Audio owner's ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of mp3 file
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Duration in seconds
// @ts-ignore
     */
// @ts-ignore
    duration?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when uploaded
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Album ID
// @ts-ignore
     */
// @ts-ignore
    album_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Genre ID
// @ts-ignore
     */
// @ts-ignore
    genre_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Performer name
// @ts-ignore
     */
// @ts-ignore
    performer?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type BaseBoolInt = 0 | 1;
// @ts-ignore

// @ts-ignore
export interface BaseCity {
// @ts-ignore
    /**
// @ts-ignore
     * City ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * City title
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
export interface BaseCommentsInfo {
// @ts-ignore
    /**
// @ts-ignore
     * Comments number
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether groups can comment the post
// @ts-ignore
     */
// @ts-ignore
    groups_can_post?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BaseCountry {
// @ts-ignore
    /**
// @ts-ignore
     * Country ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Country title
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
export interface BaseCropPhoto {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BaseCropPhotoCrop {
// @ts-ignore
    /**
// @ts-ignore
     * Coordinate X of the left upper corner
// @ts-ignore
     */
// @ts-ignore
    x?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Coordinate Y of the left upper corner
// @ts-ignore
     */
// @ts-ignore
    y?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Coordinate X of the right lower corner
// @ts-ignore
     */
// @ts-ignore
    x2?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Coordinate Y of the right lower corner
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
export interface BaseCropPhotoRect {
// @ts-ignore
    /**
// @ts-ignore
     * Coordinate X of the left upper corner
// @ts-ignore
     */
// @ts-ignore
    x?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Coordinate Y of the left upper corner
// @ts-ignore
     */
// @ts-ignore
    y?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Coordinate X of the right lower corner
// @ts-ignore
     */
// @ts-ignore
    x2?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Coordinate Y of the right lower corner
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
export interface BaseError {
// @ts-ignore
    /**
// @ts-ignore
     * Error code
// @ts-ignore
     */
// @ts-ignore
    error_code?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Error subcode
// @ts-ignore
     */
// @ts-ignore
    error_subcode?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Error message
// @ts-ignore
     */
// @ts-ignore
    error_msg?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Localized error message
// @ts-ignore
     */
// @ts-ignore
    error_text?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    request_params?: BaseRequestParam[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BaseGeo {
// @ts-ignore
    /**
// @ts-ignore
     * Information whether a map is showed
// @ts-ignore
     */
// @ts-ignore
    showmap?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Place type
// @ts-ignore
     */
// @ts-ignore
    type?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BaseGeoCoordinates {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    latitude?: number;
// @ts-ignore
    longitude?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BaseGradientPoint {
// @ts-ignore
    /**
// @ts-ignore
     * Hex color code without #
// @ts-ignore
     */
// @ts-ignore
    color?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Point position
// @ts-ignore
     */
// @ts-ignore
    position?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BaseImage {
// @ts-ignore
    /**
// @ts-ignore
     * Image url
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Image width
// @ts-ignore
     */
// @ts-ignore
    width?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Image height
// @ts-ignore
     */
// @ts-ignore
    height?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    id?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BaseLikes {
// @ts-ignore
    /**
// @ts-ignore
     * Likes number
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
export interface BaseLikesInfo {
// @ts-ignore
    /**
// @ts-ignore
     * Likes number
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether current uer has liked the post
// @ts-ignore
     */
// @ts-ignore
    user_likes?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BaseLink {
// @ts-ignore
    /**
// @ts-ignore
     * Link caption
// @ts-ignore
     */
// @ts-ignore
    caption?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link description
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link ID
// @ts-ignore
     */
// @ts-ignore
    id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * String ID of the page with article preview
// @ts-ignore
     */
// @ts-ignore
    preview_page?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the page with article preview
// @ts-ignore
     */
// @ts-ignore
    preview_url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link URL
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether the current link is external
// @ts-ignore
     */
// @ts-ignore
    is_external?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    is_favorite?: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BaseLinkApplication {
// @ts-ignore
    /**
// @ts-ignore
     * Application Id
// @ts-ignore
     */
// @ts-ignore
    app_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BaseLinkApplicationStore {
// @ts-ignore
    /**
// @ts-ignore
     * Store Id
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Store name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BaseLinkButton {
// @ts-ignore
    /**
// @ts-ignore
     * Button title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Target block id
// @ts-ignore
     */
// @ts-ignore
    block_id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Target section id
// @ts-ignore
     */
// @ts-ignore
    section_id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * curator id
// @ts-ignore
     */
// @ts-ignore
    curator_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Video album id
// @ts-ignore
     */
// @ts-ignore
    album_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Owner id
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Button icon name, e.g. 'phone' or 'gift'
// @ts-ignore
     */
// @ts-ignore
    icon?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BaseLinkButtonAction {
// @ts-ignore
    /**
// @ts-ignore
     * Action URL
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    consume_reason?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type BaseLinkButtonActionType = "open_url";
// @ts-ignore

// @ts-ignore
export type BaseLinkButtonStyle = "primary" | "secondary";
// @ts-ignore

// @ts-ignore
export interface BaseLinkProduct {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    merchant?: string;
// @ts-ignore
    orders_count?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type BaseLinkProductCategory = string;
// @ts-ignore

// @ts-ignore
export type BaseLinkProductStatus = "active" | "blocked" | "sold" | "deleted" | "archived";
// @ts-ignore

// @ts-ignore
export interface BaseLinkRating {
// @ts-ignore
    /**
// @ts-ignore
     * Count of reviews
// @ts-ignore
     */
// @ts-ignore
    reviews_count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Count of stars
// @ts-ignore
     */
// @ts-ignore
    stars?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BaseMessageError {
// @ts-ignore
    /**
// @ts-ignore
     * Error code
// @ts-ignore
     */
// @ts-ignore
    code?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Error message
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BaseObject {
// @ts-ignore
    /**
// @ts-ignore
     * Object ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Object title
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
export interface BaseObjectCount {
// @ts-ignore
    /**
// @ts-ignore
     * Items count
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
export interface BaseObjectWithName {
// @ts-ignore
    /**
// @ts-ignore
     * Object ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Object name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BasePlace {
// @ts-ignore
    /**
// @ts-ignore
     * Place address
// @ts-ignore
     */
// @ts-ignore
    address?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Checkins number
// @ts-ignore
     */
// @ts-ignore
    checkins?: number;
// @ts-ignore
    /**
// @ts-ignore
     * City name
// @ts-ignore
     */
// @ts-ignore
    city?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Country name
// @ts-ignore
     */
// @ts-ignore
    country?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Date of the place creation in Unixtime
// @ts-ignore
     */
// @ts-ignore
    created?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the place's icon
// @ts-ignore
     */
// @ts-ignore
    icon?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Place ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Place latitude
// @ts-ignore
     */
// @ts-ignore
    latitude?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Place longitude
// @ts-ignore
     */
// @ts-ignore
    longitude?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Place title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Place type
// @ts-ignore
     */
// @ts-ignore
    type?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type BasePropertyExists = 1;
// @ts-ignore

// @ts-ignore
/*Count of views*/
// @ts-ignore
export interface BaseRepostsInfo {
// @ts-ignore
    /**
// @ts-ignore
     * Total reposts counter. Sum of wall and mail reposts counters
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Wall reposts counter
// @ts-ignore
     */
// @ts-ignore
    wall_count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Mail reposts counter
// @ts-ignore
     */
// @ts-ignore
    mail_count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether current user has reposted the post
// @ts-ignore
     */
// @ts-ignore
    user_reposted?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BaseRequestParam {
// @ts-ignore
    /**
// @ts-ignore
     * Parameter name
// @ts-ignore
     */
// @ts-ignore
    key?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Parameter value
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
export type BaseSex = 0 | 1 | 2;
// @ts-ignore

// @ts-ignore
export type BaseSticker = any;
// @ts-ignore

// @ts-ignore
export interface BaseStickerAnimation {
// @ts-ignore
    /**
// @ts-ignore
     * Type of animation script
// @ts-ignore
     */
// @ts-ignore
    type?: "light" | "dark";
// @ts-ignore
    /**
// @ts-ignore
     * URL of animation script
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BaseStickerNew {
// @ts-ignore
    /**
// @ts-ignore
     * Sticker ID
// @ts-ignore
     */
// @ts-ignore
    sticker_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Pack ID
// @ts-ignore
     */
// @ts-ignore
    product_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of sticker animation script
// @ts-ignore
     */
// @ts-ignore
    animation_url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether the sticker is allowed
// @ts-ignore
     */
// @ts-ignore
    is_allowed?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    images?: BaseImage[];
// @ts-ignore
    images_with_background?: BaseImage[];
// @ts-ignore
    animations?: BaseStickerAnimation[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BaseStickerOld {
// @ts-ignore
    /**
// @ts-ignore
     * Sticker ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Pack ID
// @ts-ignore
     */
// @ts-ignore
    product_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Width in px
// @ts-ignore
     */
// @ts-ignore
    width?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Height in px
// @ts-ignore
     */
// @ts-ignore
    height?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 128 px in height
// @ts-ignore
     */
// @ts-ignore
    photo_128?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 256 px in height
// @ts-ignore
     */
// @ts-ignore
    photo_256?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 352 px in height
// @ts-ignore
     */
// @ts-ignore
    photo_352?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 512 px in height
// @ts-ignore
     */
// @ts-ignore
    photo_512?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 64 px in height
// @ts-ignore
     */
// @ts-ignore
    photo_64?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether the sticker is allowed
// @ts-ignore
     */
// @ts-ignore
    is_allowed?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type BaseStickersList = BaseStickerNew[];
// @ts-ignore

// @ts-ignore
export interface BaseUploadServer {
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
}
// @ts-ignore

// @ts-ignore
export type BaseUserGroupFields = "about" | "action_button" | "activities" | "activity" | "addresses" | "admin_level" | "age_limits" | "author_id" | "ban_info" | "bdate" | "blacklisted" | "blacklisted_by_me" | "books" | "can_create_topic" | "can_message" | "can_post" | "can_see_all_posts" | "can_see_audio" | "can_send_friend_request" | "can_upload_video" | "can_write_private_message" | "career" | "city" | "common_count" | "connections" | "contacts" | "counters" | "country" | "cover" | "crop_photo" | "deactivated" | "description" | "domain" | "education" | "exports" | "finish_date" | "fixed_post" | "followers_count" | "friend_status" | "games" | "has_market_app" | "has_mobile" | "has_photo" | "home_town" | "id" | "interests" | "is_admin" | "is_closed" | "is_favorite" | "is_friend" | "is_hidden_from_feed" | "is_member" | "is_messages_blocked" | "can_send_notify" | "is_subscribed" | "last_seen" | "links" | "lists" | "maiden_name" | "main_album_id" | "main_section" | "market" | "member_status" | "members_count" | "military" | "movies" | "music" | "name" | "nickname" | "occupation" | "online" | "online_status" | "personal" | "phone" | "photo_100" | "photo_200" | "photo_200_orig" | "photo_400_orig" | "photo_50" | "photo_id" | "photo_max" | "photo_max_orig" | "quotes" | "relation" | "relatives" | "schools" | "screen_name" | "sex" | "site" | "start_date" | "status" | "timezone" | "trending" | "tv" | "type" | "universities" | "verified" | "wall_comments" | "wiki_page" | "first_name" | "first_name_acc" | "first_name_dat" | "first_name_gen" | "last_name" | "last_name_acc" | "last_name_dat" | "last_name_gen" | "can_subscribe_stories" | "is_subscribed_stories" | "vk_admin_status";
// @ts-ignore

// @ts-ignore
export interface BaseUserId {
// @ts-ignore
    /**
// @ts-ignore
     * User ID
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
export type BoardDefaultOrder = 1 | 2 | -1 | -2;
// @ts-ignore

// @ts-ignore
export interface BoardTopic {
// @ts-ignore
    /**
// @ts-ignore
     * Comments number
// @ts-ignore
     */
// @ts-ignore
    comments?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when the topic has been created in Unixtime
// @ts-ignore
     */
// @ts-ignore
    created?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Creator ID
// @ts-ignore
     */
// @ts-ignore
    created_by?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Topic ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Topic title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Date when the topic has been updated in Unixtime
// @ts-ignore
     */
// @ts-ignore
    updated?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of user who updated the topic
// @ts-ignore
     */
// @ts-ignore
    updated_by?: number;
// @ts-ignore
    /**
// @ts-ignore
     * First comment text
// @ts-ignore
     */
// @ts-ignore
    first_comment?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Last comment text
// @ts-ignore
     */
// @ts-ignore
    last_comment?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface BoardTopicComment {
// @ts-ignore
    /**
// @ts-ignore
     * Date when the comment has been added in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Author ID
// @ts-ignore
     */
// @ts-ignore
    from_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Real position of the comment
// @ts-ignore
     */
// @ts-ignore
    real_offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment text
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    attachments?: WallCommentAttachment[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackBase {
// @ts-ignore
    /**
// @ts-ignore
     * Unique event id. If it passed twice or more - you should ignore it.
// @ts-ignore
     */
// @ts-ignore
    event_id?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    type?: string;
// @ts-ignore
    group_id?: number;
// @ts-ignore
    secret?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackBoardPostDelete {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    topic_owner_id?: number;
// @ts-ignore
    topic_id?: number;
// @ts-ignore
    id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackConfirmation1 {
// @ts-ignore
    type: CallbackType;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type CallbackConfirmation = CallbackBase & CallbackConfirmation1;
// @ts-ignore

// @ts-ignore
export interface CallbackDonutMoneyWithdraw {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    amount?: number;
// @ts-ignore
    amount_without_fee?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackDonutMoneyWithdrawError {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    reason?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackDonutSubscriptionCancelled {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    user_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackDonutSubscriptionCreate {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    amount?: number;
// @ts-ignore
    amount_without_fee?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackDonutSubscriptionExpired {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    user_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackDonutSubscriptionPriceChanged {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    amount_old?: number;
// @ts-ignore
    amount_new?: number;
// @ts-ignore
    amount_diff?: number;
// @ts-ignore
    amount_diff_without_fee?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackDonutSubscriptionProlonged {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    amount?: number;
// @ts-ignore
    amount_without_fee?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackGroupChangePhoto {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    user_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackGroupChangeSettings {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    user_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackGroupJoin {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    user_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type CallbackGroupJoinType = "join" | "unsure" | "accepted" | "approved" | "request";
// @ts-ignore

// @ts-ignore
export interface CallbackGroupLeave {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    user_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type CallbackGroupMarket = 0 | 1;
// @ts-ignore

// @ts-ignore
export type CallbackGroupOfficerRole = 0 | 1 | 2 | 3;
// @ts-ignore

// @ts-ignore
export interface CallbackGroupOfficersEdit {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    admin_id?: number;
// @ts-ignore
    user_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackGroupSettingsChanges {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    title?: string;
// @ts-ignore
    description?: string;
// @ts-ignore
    screen_name?: string;
// @ts-ignore
    public_category?: number;
// @ts-ignore
    public_subcategory?: number;
// @ts-ignore
    website?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackLikeAddRemove {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    liker_id?: number;
// @ts-ignore
    object_type?: "video" | "photo" | "post" | "comment" | "note" | "topic_comment" | "photo_comment" | "video_comment" | "market" | "market_comment";
// @ts-ignore
    object_owner_id?: number;
// @ts-ignore
    object_id?: number;
// @ts-ignore
    post_id?: number;
// @ts-ignore
    thread_reply_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackMarketComment {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    id?: number;
// @ts-ignore
    from_id?: number;
// @ts-ignore
    date?: number;
// @ts-ignore
    text?: string;
// @ts-ignore
    market_owner_id?: number;
// @ts-ignore
    photo_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackMarketCommentDelete {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    id?: number;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    item_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackMessageAllow1 {
// @ts-ignore
    type: CallbackType;
// @ts-ignore
    object: CallbackMessageAllowObject;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type CallbackMessageAllow = CallbackBase & CallbackMessageAllow1;
// @ts-ignore

// @ts-ignore
export interface CallbackMessageAllowObject {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    key?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackMessageDeny {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    user_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackMessageEdit1 {
// @ts-ignore
    type: CallbackType;
// @ts-ignore
    object: MessagesMessage;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type CallbackMessageEdit = CallbackBase & CallbackMessageEdit1;
// @ts-ignore

// @ts-ignore
export interface CallbackMessageNew1 {
// @ts-ignore
    type: CallbackType;
// @ts-ignore
    object: CallbackMessageObject;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type CallbackMessageNew = CallbackBase & CallbackMessageNew1;
// @ts-ignore

// @ts-ignore
export interface CallbackMessageObject {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackMessageReply1 {
// @ts-ignore
    type: CallbackType;
// @ts-ignore
    object: MessagesMessage;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type CallbackMessageReply = CallbackBase & CallbackMessageReply1;
// @ts-ignore

// @ts-ignore
export interface CallbackPhotoComment {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    id?: number;
// @ts-ignore
    from_id?: number;
// @ts-ignore
    date?: number;
// @ts-ignore
    text?: string;
// @ts-ignore
    photo_owner_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackPhotoCommentDelete {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    id?: number;
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    photo_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackPollVoteNew {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    poll_id?: number;
// @ts-ignore
    option_id?: number;
// @ts-ignore
    user_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackQrScan {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    data?: string;
// @ts-ignore
    type?: string;
// @ts-ignore
    subtype?: string;
// @ts-ignore
    reread?: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type CallbackType = "audio_new" | "board_post_new" | "board_post_edit" | "board_post_restore" | "board_post_delete" | "confirmation" | "group_leave" | "group_join" | "group_change_photo" | "group_change_settings" | "group_officers_edit" | "lead_forms_new" | "market_comment_new" | "market_comment_delete" | "market_comment_edit" | "market_comment_restore" | "message_new" | "message_reply" | "message_edit" | "message_allow" | "message_deny" | "message_read" | "message_typing_state" | "messages_edit" | "photo_new" | "photo_comment_new" | "photo_comment_delete" | "photo_comment_edit" | "photo_comment_restore" | "poll_vote_new" | "user_block" | "user_unblock" | "video_new" | "video_comment_new" | "video_comment_delete" | "video_comment_edit" | "video_comment_restore" | "wall_post_new" | "wall_reply_new" | "wall_reply_edit" | "wall_reply_delete" | "wall_reply_restore" | "wall_repost";
// @ts-ignore

// @ts-ignore
export interface CallbackUserBlock {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    admin_id?: number;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    unblock_date?: number;
// @ts-ignore
    reason?: number;
// @ts-ignore
    comment?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackUserUnblock {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    admin_id?: number;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    by_end_date?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackVideoComment {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    id?: number;
// @ts-ignore
    from_id?: number;
// @ts-ignore
    date?: number;
// @ts-ignore
    text?: string;
// @ts-ignore
    video_owner_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackVideoCommentDelete {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    id?: number;
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    video_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallbackWallCommentDelete {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    id?: number;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    post_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CallsCall {
// @ts-ignore
    /**
// @ts-ignore
     * Call duration
// @ts-ignore
     */
// @ts-ignore
    duration?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Caller initiator
// @ts-ignore
     */
// @ts-ignore
    initiator_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Caller receiver
// @ts-ignore
     */
// @ts-ignore
    receiver_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Timestamp for call
// @ts-ignore
     */
// @ts-ignore
    time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Was this call initiated as video call
// @ts-ignore
     */
// @ts-ignore
    video?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type CallsEndState = "canceled_by_initiator" | "canceled_by_receiver" | "reached";
// @ts-ignore

// @ts-ignore
export interface CallsParticipants {
// @ts-ignore
    /**
// @ts-ignore
     * Participants count
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    list?: number[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface ClientInfoForBots {
// @ts-ignore
    /**
// @ts-ignore
     * client has support keyboard
// @ts-ignore
     */
// @ts-ignore
    keyboard?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * client has support inline keyboard
// @ts-ignore
     */
// @ts-ignore
    inline_keyboard?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * client has support carousel
// @ts-ignore
     */
// @ts-ignore
    carousel?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * client or user language id
// @ts-ignore
     */
// @ts-ignore
    lang_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    button_actions?: MessagesTemplateActionTypeNames[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface CommentThread {
// @ts-ignore
    /**
// @ts-ignore
     * Comments number
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether current user can comment the post
// @ts-ignore
     */
// @ts-ignore
    can_post?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether recommended to display reply button
// @ts-ignore
     */
// @ts-ignore
    show_reply_button?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether groups can comment the post
// @ts-ignore
     */
// @ts-ignore
    groups_can_post?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items?: WallWallComment[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DatabaseCity1 {
// @ts-ignore
    /**
// @ts-ignore
     * Area title
// @ts-ignore
     */
// @ts-ignore
    area: string;
// @ts-ignore
    /**
// @ts-ignore
     * Region title
// @ts-ignore
     */
// @ts-ignore
    region: string;
// @ts-ignore
    important: BaseBoolInt;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type DatabaseCity = BaseObject & DatabaseCity1;
// @ts-ignore

// @ts-ignore
export type DatabaseCityById = BaseObject;
// @ts-ignore

// @ts-ignore
export interface DatabaseFaculty {
// @ts-ignore
    /**
// @ts-ignore
     * Faculty ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Faculty title
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
export interface DatabaseRegion {
// @ts-ignore
    /**
// @ts-ignore
     * Region ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Region title
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
export interface DatabaseSchool {
// @ts-ignore
    /**
// @ts-ignore
     * School ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * School title
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
export interface DatabaseStation {
// @ts-ignore
    /**
// @ts-ignore
     * City ID
// @ts-ignore
     */
// @ts-ignore
    city_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Hex color code without #
// @ts-ignore
     */
// @ts-ignore
    color?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Station ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Station name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DatabaseUniversity {
// @ts-ignore
    /**
// @ts-ignore
     * University ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * University title
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
export interface DocsDoc {
// @ts-ignore
    /**
// @ts-ignore
     * Document ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Document owner ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Document title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * File size in bites
// @ts-ignore
     */
// @ts-ignore
    size?: number;
// @ts-ignore
    /**
// @ts-ignore
     * File extension
// @ts-ignore
     */
// @ts-ignore
    ext?: string;
// @ts-ignore
    /**
// @ts-ignore
     * File URL
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Date when file has been uploaded in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Document type
// @ts-ignore
     */
// @ts-ignore
    type?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Access key for the document
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    tags?: string[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type DocsDocAttachmentType = "doc" | "graffiti" | "audio_message";
// @ts-ignore

// @ts-ignore
export interface DocsDocPreview {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DocsDocPreviewAudioMsg {
// @ts-ignore
    /**
// @ts-ignore
     * Audio message duration in seconds
// @ts-ignore
     */
// @ts-ignore
    duration?: number;
// @ts-ignore
    /**
// @ts-ignore
     * MP3 file URL
// @ts-ignore
     */
// @ts-ignore
    link_mp3?: string;
// @ts-ignore
    /**
// @ts-ignore
     * OGG file URL
// @ts-ignore
     */
// @ts-ignore
    link_ogg?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Sound visualisation
// @ts-ignore
     */
// @ts-ignore
    waveform?: number[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DocsDocPreviewGraffiti {
// @ts-ignore
    /**
// @ts-ignore
     * Graffiti file URL
// @ts-ignore
     */
// @ts-ignore
    src?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Graffiti width
// @ts-ignore
     */
// @ts-ignore
    width?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Graffiti height
// @ts-ignore
     */
// @ts-ignore
    height?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DocsDocPreviewPhoto {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    sizes?: DocsDocPreviewPhotoSizes[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DocsDocPreviewPhotoSizes {
// @ts-ignore
    /**
// @ts-ignore
     * URL of the image
// @ts-ignore
     */
// @ts-ignore
    src?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Width in px
// @ts-ignore
     */
// @ts-ignore
    width?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Height in px
// @ts-ignore
     */
// @ts-ignore
    height?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DocsDocPreviewVideo {
// @ts-ignore
    /**
// @ts-ignore
     * Video URL
// @ts-ignore
     */
// @ts-ignore
    src?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Video's width in pixels
// @ts-ignore
     */
// @ts-ignore
    width?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Video's height in pixels
// @ts-ignore
     */
// @ts-ignore
    height?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Video file size in bites
// @ts-ignore
     */
// @ts-ignore
    file_size?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface DocsDocTypes {
// @ts-ignore
    /**
// @ts-ignore
     * Doc type ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Doc type title
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Number of docs
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
/*Info about user VK Donut subscription*/
// @ts-ignore
export interface DonutDonatorSubscriptionInfo {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    next_payment_date?: number;
// @ts-ignore
    amount?: number;
// @ts-ignore
    status?: "active" | "expiring";
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface EventsEventAttach {
// @ts-ignore
    /**
// @ts-ignore
     * address of event
// @ts-ignore
     */
// @ts-ignore
    address?: string;
// @ts-ignore
    /**
// @ts-ignore
     * text of attach
// @ts-ignore
     */
// @ts-ignore
    button_text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * event ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * is favorite
// @ts-ignore
     */
// @ts-ignore
    is_favorite?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * text of attach
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * event start time
// @ts-ignore
     */
// @ts-ignore
    time?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    friends?: number[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FaveBookmark {
// @ts-ignore
    /**
// @ts-ignore
     * Timestamp, when this item was bookmarked
// @ts-ignore
     */
// @ts-ignore
    added_date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Has user seen this item
// @ts-ignore
     */
// @ts-ignore
    seen?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    tags?: FaveTag[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type FaveBookmarkType = "post" | "video" | "product" | "article" | "link";
// @ts-ignore

// @ts-ignore
export interface FavePage {
// @ts-ignore
    /**
// @ts-ignore
     * Some info about user or group
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Timestamp, when this page was bookmarked
// @ts-ignore
     */
// @ts-ignore
    updated_date?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    tags?: FaveTag[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type FavePageType = "user" | "group" | "hints";
// @ts-ignore

// @ts-ignore
export interface FaveTag {
// @ts-ignore
    /**
// @ts-ignore
     * Tag id
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Tag name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsFriendExtendedStatus1 {
// @ts-ignore
    /**
// @ts-ignore
     * Is friend request from other user unread
// @ts-ignore
     */
// @ts-ignore
    is_request_unread: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type FriendsFriendExtendedStatus = FriendsFriendStatus & FriendsFriendExtendedStatus1;
// @ts-ignore

// @ts-ignore
export interface FriendsFriendStatus {
// @ts-ignore
    /**
// @ts-ignore
     * MD5 hash for the result validation
// @ts-ignore
     */
// @ts-ignore
    sign?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
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
export type FriendsFriendStatusStatus = 0 | 1 | 2 | 3;
// @ts-ignore

// @ts-ignore
export interface FriendsFriendsList {
// @ts-ignore
    /**
// @ts-ignore
     * List ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * List title
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsMutualFriend {
// @ts-ignore
    /**
// @ts-ignore
     * Total mutual friends number
// @ts-ignore
     */
// @ts-ignore
    common_count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    common_friends?: number[];
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsRequests {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user by whom friend has been suggested
// @ts-ignore
     */
// @ts-ignore
    from?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
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
export interface FriendsRequestsMutual {
// @ts-ignore
    /**
// @ts-ignore
     * Total mutual friends number
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    users?: number[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface FriendsRequestsXtrMessage {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user by whom friend has been suggested
// @ts-ignore
     */
// @ts-ignore
    from?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Message sent with a request
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
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
export interface FriendsUserXtrPhone1 {
// @ts-ignore
    /**
// @ts-ignore
     * User phone
// @ts-ignore
     */
// @ts-ignore
    phone: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type FriendsUserXtrPhone = UsersUserFull & FriendsUserXtrPhone1;
// @ts-ignore

// @ts-ignore
export interface GiftsGift {
// @ts-ignore
    /**
// @ts-ignore
     * Date when gist has been sent in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Gift sender ID
// @ts-ignore
     */
// @ts-ignore
    from_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Hash
// @ts-ignore
     */
// @ts-ignore
    gift_hash?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Gift ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment text
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GiftsGiftPrivacy = 0 | 1 | 2;
// @ts-ignore

// @ts-ignore
export interface GiftsLayout {
// @ts-ignore
    /**
// @ts-ignore
     * Gift ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 512 px in width
// @ts-ignore
     */
// @ts-ignore
    thumb_512?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 256 px in width
// @ts-ignore
     */
// @ts-ignore
    thumb_256?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 48 px in width
// @ts-ignore
     */
// @ts-ignore
    thumb_48?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 96 px in width
// @ts-ignore
     */
// @ts-ignore
    thumb_96?: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the sticker pack, if the gift is representing one
// @ts-ignore
     */
// @ts-ignore
    stickers_product_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether gift represents a stickers style
// @ts-ignore
     */
// @ts-ignore
    is_stickers_style?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the build of constructor gift
// @ts-ignore
     */
// @ts-ignore
    build_id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Keywords used for search
// @ts-ignore
     */
// @ts-ignore
    keywords?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsAddress {
// @ts-ignore
    /**
// @ts-ignore
     * Additional address to the place (6 floor, left door)
// @ts-ignore
     */
// @ts-ignore
    additional_address?: string;
// @ts-ignore
    /**
// @ts-ignore
     * String address to the place (Nevsky, 28)
// @ts-ignore
     */
// @ts-ignore
    address?: string;
// @ts-ignore
    /**
// @ts-ignore
     * City id of address
// @ts-ignore
     */
// @ts-ignore
    city_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Country id of address
// @ts-ignore
     */
// @ts-ignore
    country_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Distance from the point
// @ts-ignore
     */
// @ts-ignore
    distance?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Address id
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Address latitude
// @ts-ignore
     */
// @ts-ignore
    latitude?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Address longitude
// @ts-ignore
     */
// @ts-ignore
    longitude?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Metro id of address
// @ts-ignore
     */
// @ts-ignore
    metro_station_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Address phone
// @ts-ignore
     */
// @ts-ignore
    phone?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Time offset int minutes from utc time
// @ts-ignore
     */
// @ts-ignore
    time_offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Title of the place (Zinger, etc)
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    place_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/*Timetable for a week*/
// @ts-ignore
export interface GroupsAddressTimetable {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/*Timetable for one day*/
// @ts-ignore
export interface GroupsAddressTimetableDay {
// @ts-ignore
    /**
// @ts-ignore
     * Close time of the break in minutes
// @ts-ignore
     */
// @ts-ignore
    break_close_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Start time of the break in minutes
// @ts-ignore
     */
// @ts-ignore
    break_open_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Close time in minutes
// @ts-ignore
     */
// @ts-ignore
    close_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Open time in minutes
// @ts-ignore
     */
// @ts-ignore
    open_time?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsAddressWorkInfoStatus = "no_information" | "temporarily_closed" | "always_opened" | "timetable" | "forever_closed";
// @ts-ignore

// @ts-ignore
export interface GroupsAddressesInfo {
// @ts-ignore
    /**
// @ts-ignore
     * Information whether addresses is enabled
// @ts-ignore
     */
// @ts-ignore
    is_enabled?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Main address id for group
// @ts-ignore
     */
// @ts-ignore
    main_address_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsBanInfo {
// @ts-ignore
    /**
// @ts-ignore
     * Administrator ID
// @ts-ignore
     */
// @ts-ignore
    admin_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment for a ban
// @ts-ignore
     */
// @ts-ignore
    comment?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Show comment for user
// @ts-ignore
     */
// @ts-ignore
    comment_visible?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when user has been added to blacklist in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when user will be removed from blacklist in Unixtime
// @ts-ignore
     */
// @ts-ignore
    end_date?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    is_closed?: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsBanInfoReason = 0 | 1 | 2 | 3 | 4;
// @ts-ignore

// @ts-ignore
export type GroupsBannedItem = GroupsOwnerXtrBanInfo;
// @ts-ignore

// @ts-ignore
export interface GroupsCallbackServer {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    id?: number;
// @ts-ignore
    title?: string;
// @ts-ignore
    creator_id?: number;
// @ts-ignore
    url?: string;
// @ts-ignore
    secret_key?: string;
// @ts-ignore
    status?: "unconfigured" | "failed" | "wait" | "ok";
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsCallbackSettings {
// @ts-ignore
    /**
// @ts-ignore
     * API version used for the events
// @ts-ignore
     */
// @ts-ignore
    api_version?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsContactsItem {
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
     * Contact description
// @ts-ignore
     */
// @ts-ignore
    desc?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Contact phone
// @ts-ignore
     */
// @ts-ignore
    phone?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Contact email
// @ts-ignore
     */
// @ts-ignore
    email?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsCountersGroup {
// @ts-ignore
    /**
// @ts-ignore
     * Addresses number
// @ts-ignore
     */
// @ts-ignore
    addresses?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo albums number
// @ts-ignore
     */
// @ts-ignore
    albums?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Audios number
// @ts-ignore
     */
// @ts-ignore
    audios?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Audio playlists number
// @ts-ignore
     */
// @ts-ignore
    audio_playlists?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Docs number
// @ts-ignore
     */
// @ts-ignore
    docs?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Market items number
// @ts-ignore
     */
// @ts-ignore
    market?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photos number
// @ts-ignore
     */
// @ts-ignore
    photos?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Topics number
// @ts-ignore
     */
// @ts-ignore
    topics?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Videos number
// @ts-ignore
     */
// @ts-ignore
    videos?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Market services number
// @ts-ignore
     */
// @ts-ignore
    market_services?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Podcasts number
// @ts-ignore
     */
// @ts-ignore
    podcasts?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Articles number
// @ts-ignore
     */
// @ts-ignore
    articles?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Narratives number
// @ts-ignore
     */
// @ts-ignore
    narratives?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Clips number
// @ts-ignore
     */
// @ts-ignore
    clips?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Clips followers number
// @ts-ignore
     */
// @ts-ignore
    clips_followers?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsCover {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    images?: BaseImage[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsFields = "market" | "member_status" | "is_favorite" | "is_subscribed" | "is_subscribed_podcasts" | "can_subscribe_podcasts" | "city" | "country" | "verified" | "description" | "wiki_page" | "members_count" | "requests_count" | "counters" | "cover" | "can_post" | "can_suggest" | "can_upload_story" | "can_upload_doc" | "can_upload_video" | "can_upload_clip" | "can_see_all_posts" | "can_create_topic" | "crop_photo" | "activity" | "fixed_post" | "has_photo" | "status" | "main_album_id" | "links" | "contacts" | "site" | "main_section" | "secondary_section" | "wall" | "trending" | "can_message" | "is_market_cart_enabled" | "is_messages_blocked" | "can_send_notify" | "has_group_channel" | "group_channel" | "online_status" | "start_date" | "finish_date" | "age_limits" | "ban_info" | "action_button" | "author_id" | "phone" | "has_market_app" | "addresses" | "live_covers" | "is_adult" | "is_hidden_from_feed" | "can_subscribe_posts" | "warning_notification" | "msg_push_allowed" | "stories_archive_count" | "video_live_level" | "video_live_count" | "clips_count" | "has_unseen_stories" | "is_business" | "textlives_count" | "members_count_text";
// @ts-ignore

// @ts-ignore
export type GroupsFilter = "admin" | "editor" | "moder" | "advertiser" | "groups" | "publics" | "events" | "has_addresses";
// @ts-ignore

// @ts-ignore
export interface GroupsGroup {
// @ts-ignore
    /**
// @ts-ignore
     * Community ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Community name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Domain of the community page
// @ts-ignore
     */
// @ts-ignore
    screen_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Start date in Unixtime format
// @ts-ignore
     */
// @ts-ignore
    start_date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Finish date in Unixtime format
// @ts-ignore
     */
// @ts-ignore
    finish_date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether community is banned
// @ts-ignore
     */
// @ts-ignore
    deactivated?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of square photo of the community with 50 pixels in width
// @ts-ignore
     */
// @ts-ignore
    photo_50?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of square photo of the community with 100 pixels in width
// @ts-ignore
     */
// @ts-ignore
    photo_100?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of square photo of the community with 200 pixels in width
// @ts-ignore
     */
// @ts-ignore
    photo_200?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of square photo of the community with 200 pixels in width original
// @ts-ignore
     */
// @ts-ignore
    photo_200_orig?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of square photo of the community with 400 pixels in width
// @ts-ignore
     */
// @ts-ignore
    photo_400?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of square photo of the community with 400 pixels in width original
// @ts-ignore
     */
// @ts-ignore
    photo_400_orig?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of square photo of the community with max pixels in width
// @ts-ignore
     */
// @ts-ignore
    photo_max?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of square photo of the community with max pixels in width original
// @ts-ignore
     */
// @ts-ignore
    photo_max_orig?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Established date
// @ts-ignore
     */
// @ts-ignore
    est_date?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Public date label
// @ts-ignore
     */
// @ts-ignore
    public_date_label?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsGroupAccess = 0 | 1 | 2;
// @ts-ignore

// @ts-ignore
export type GroupsGroupAdminLevel = 1 | 2 | 3;
// @ts-ignore

// @ts-ignore
export type GroupsGroupAgeLimits = 1 | 2 | 3;
// @ts-ignore

// @ts-ignore
export interface GroupsGroupAttach {
// @ts-ignore
    /**
// @ts-ignore
     * group ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * text of attach
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * activity or category of group
// @ts-ignore
     */
// @ts-ignore
    status?: string;
// @ts-ignore
    /**
// @ts-ignore
     * size of group
// @ts-ignore
     */
// @ts-ignore
    size?: number;
// @ts-ignore
    /**
// @ts-ignore
     * is favorite
// @ts-ignore
     */
// @ts-ignore
    is_favorite?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsGroupAudio = 0 | 1 | 2;
// @ts-ignore

// @ts-ignore
export interface GroupsGroupBanInfo {
// @ts-ignore
    /**
// @ts-ignore
     * Ban comment
// @ts-ignore
     */
// @ts-ignore
    comment?: string;
// @ts-ignore
    /**
// @ts-ignore
     * End date of ban in Unixtime
// @ts-ignore
     */
// @ts-ignore
    end_date?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGroupCategory {
// @ts-ignore
    /**
// @ts-ignore
     * Category ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Category name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    subcategories?: BaseObjectWithName[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGroupCategoryFull {
// @ts-ignore
    /**
// @ts-ignore
     * Category ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Category name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Pages number
// @ts-ignore
     */
// @ts-ignore
    page_count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    page_previews?: GroupsGroup[];
// @ts-ignore
    subcategories?: GroupsGroupCategory[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsGroupCategoryType {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    id?: number;
// @ts-ignore
    name?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsGroupDocs = 0 | 1 | 2;
// @ts-ignore

// @ts-ignore
export interface GroupsGroupFull1 {
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
     * Community's main wiki page title
// @ts-ignore
     */
// @ts-ignore
    wiki_page: string;
// @ts-ignore
    /**
// @ts-ignore
     * Community members number
// @ts-ignore
     */
// @ts-ignore
    members_count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Info about number of users in group
// @ts-ignore
     */
// @ts-ignore
    members_count_text: string;
// @ts-ignore
    /**
// @ts-ignore
     * The number of incoming requests to the community
// @ts-ignore
     */
// @ts-ignore
    requests_count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Community level live streams achievements
// @ts-ignore
     */
// @ts-ignore
    video_live_level: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of community's live streams
// @ts-ignore
     */
// @ts-ignore
    video_live_count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of community's clips
// @ts-ignore
     */
// @ts-ignore
    clips_count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Type of group, start date of event or category of public page
// @ts-ignore
     */
// @ts-ignore
    activity: string;
// @ts-ignore
    /**
// @ts-ignore
     * Fixed post ID
// @ts-ignore
     */
// @ts-ignore
    fixed_post: number;
// @ts-ignore
    /**
// @ts-ignore
     * Community status
// @ts-ignore
     */
// @ts-ignore
    status: string;
// @ts-ignore
    /**
// @ts-ignore
     * Community's main photo album ID
// @ts-ignore
     */
// @ts-ignore
    main_album_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information about wall status in community
// @ts-ignore
     */
// @ts-ignore
    wall: 0 | 1 | 2 | 3;
// @ts-ignore
    /**
// @ts-ignore
     * Community's website
// @ts-ignore
     */
// @ts-ignore
    site: string;
// @ts-ignore
    /**
// @ts-ignore
     * Inviter ID
// @ts-ignore
     */
// @ts-ignore
    invited_by: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether community has installed market app
// @ts-ignore
     */
// @ts-ignore
    has_market_app: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether current user is subscribed to podcasts
// @ts-ignore
     */
// @ts-ignore
    is_subscribed_podcasts: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Owner in whitelist or not
// @ts-ignore
     */
// @ts-ignore
    can_subscribe_podcasts: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Can subscribe to wall
// @ts-ignore
     */
// @ts-ignore
    can_subscribe_posts: boolean | number;
// @ts-ignore
    market: GroupsMarketInfo;
// @ts-ignore
    member_status: GroupsGroupFullMemberStatus;
// @ts-ignore
    is_adult: BaseBoolInt;
// @ts-ignore
    is_hidden_from_feed: BaseBoolInt;
// @ts-ignore
    is_favorite: BaseBoolInt;
// @ts-ignore
    is_subscribed: BaseBoolInt;
// @ts-ignore
    city: BaseObject;
// @ts-ignore
    country: BaseCountry;
// @ts-ignore
    verified: BaseBoolInt;
// @ts-ignore
    counters: GroupsCountersGroup;
// @ts-ignore
    cover: GroupsCover;
// @ts-ignore
    can_post: BaseBoolInt;
// @ts-ignore
    can_suggest: BaseBoolInt;
// @ts-ignore
    can_upload_story: BaseBoolInt;
// @ts-ignore
    can_upload_doc: BaseBoolInt;
// @ts-ignore
    can_upload_video: BaseBoolInt;
// @ts-ignore
    can_see_all_posts: BaseBoolInt;
// @ts-ignore
    can_create_topic: BaseBoolInt;
// @ts-ignore
    has_photo: BaseBoolInt;
// @ts-ignore
    crop_photo: BaseCropPhoto;
// @ts-ignore
    status_audio: AudioAudio;
// @ts-ignore
    links: GroupsLinksItem[];
// @ts-ignore
    contacts: GroupsContactsItem[];
// @ts-ignore
    main_section: GroupsGroupFullSection;
// @ts-ignore
    secondary_section: GroupsGroupFullSection;
// @ts-ignore
    trending: BaseBoolInt;
// @ts-ignore
    can_message: BaseBoolInt;
// @ts-ignore
    is_messages_blocked: BaseBoolInt;
// @ts-ignore
    can_send_notify: BaseBoolInt;
// @ts-ignore
    online_status: GroupsOnlineStatus;
// @ts-ignore
    age_limits: GroupsGroupFullAgeLimits;
// @ts-ignore
    ban_info: GroupsGroupBanInfo;
// @ts-ignore
    using_vkpay_market_app: boolean | number;
// @ts-ignore
    has_group_channel: boolean | number;
// @ts-ignore
    addresses: GroupsAddressesInfo;
// @ts-ignore
    live_covers: GroupsLiveCovers;
// @ts-ignore
    stories_archive_count: number;
// @ts-ignore
    has_unseen_stories: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsGroupFull = GroupsGroup & GroupsGroupFull1;
// @ts-ignore

// @ts-ignore
export type GroupsGroupFullAgeLimits = 1 | 2 | 3;
// @ts-ignore

// @ts-ignore
export type GroupsGroupFullMemberStatus = 0 | 1 | 2 | 3 | 4 | 5;
// @ts-ignore

// @ts-ignore
export type GroupsGroupFullSection = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 24 | 26 | 27 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 53 | 54 | 55 | 57 | 58;
// @ts-ignore

// @ts-ignore
export type GroupsGroupIsClosed = 0 | 1 | 2;
// @ts-ignore

// @ts-ignore
export type GroupsGroupMarketCurrency = 643 | 980 | 398 | 978 | 840;
// @ts-ignore

// @ts-ignore
export type GroupsGroupPhotos = 0 | 1 | 2;
// @ts-ignore

// @ts-ignore
export interface GroupsGroupPublicCategoryList {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    id?: number;
// @ts-ignore
    name?: string;
// @ts-ignore
    subcategories?: GroupsGroupCategoryType[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsGroupRole = "moderator" | "editor" | "administrator" | "advertiser";
// @ts-ignore

// @ts-ignore
export type GroupsGroupSubject = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38" | "39" | "40" | "41" | "42";
// @ts-ignore

// @ts-ignore
export type GroupsGroupSuggestedPrivacy = 0 | 1 | 2;
// @ts-ignore

// @ts-ignore
export interface GroupsGroupTag {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    id?: number;
// @ts-ignore
    name?: string;
// @ts-ignore
    color?: "454647" | "45678f" | "4bb34b" | "5181b8" | "539b9c" | "5c9ce6" | "63b9ba" | "6bc76b" | "76787a" | "792ec0" | "7a6c4f" | "7ececf" | "9e8d6b" | "a162de" | "aaaeb3" | "bbaa84" | "e64646" | "ff5c5c" | "ffa000" | "ffc107";
// @ts-ignore
    uses?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsGroupTopics = 0 | 1 | 2;
// @ts-ignore

// @ts-ignore
export type GroupsGroupType = "group" | "page" | "event";
// @ts-ignore

// @ts-ignore
export type GroupsGroupVideo = 0 | 1 | 2;
// @ts-ignore

// @ts-ignore
export type GroupsGroupWall = 0 | 1 | 2 | 3;
// @ts-ignore

// @ts-ignore
export type GroupsGroupWiki = 0 | 1 | 2;
// @ts-ignore

// @ts-ignore
export interface GroupsGroupsArray {
// @ts-ignore
    /**
// @ts-ignore
     * Communities number
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Community ID
// @ts-ignore
     */
// @ts-ignore
    items?: number[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsLinksItem {
// @ts-ignore
    /**
// @ts-ignore
     * Link title
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link description
// @ts-ignore
     */
// @ts-ignore
    desc?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of square image of the link with 100 pixels in width
// @ts-ignore
     */
// @ts-ignore
    photo_100?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of square image of the link with 50 pixels in width
// @ts-ignore
     */
// @ts-ignore
    photo_50?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link URL
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsLiveCovers {
// @ts-ignore
    /**
// @ts-ignore
     * Information whether live covers is enabled
// @ts-ignore
     */
// @ts-ignore
    is_enabled?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether live covers photo scaling is enabled
// @ts-ignore
     */
// @ts-ignore
    is_scalable?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    story_ids?: string[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsLongPollEvents {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsLongPollServer {
// @ts-ignore
    /**
// @ts-ignore
     * Long Poll key
// @ts-ignore
     */
// @ts-ignore
    key: string;
// @ts-ignore
    /**
// @ts-ignore
     * Long Poll server address
// @ts-ignore
     */
// @ts-ignore
    server?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Number of the last event
// @ts-ignore
     */
// @ts-ignore
    ts?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsLongPollSettings {
// @ts-ignore
    /**
// @ts-ignore
     * API version used for the events
// @ts-ignore
     */
// @ts-ignore
    api_version?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Shows whether Long Poll is enabled
// @ts-ignore
     */
// @ts-ignore
    is_enabled?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsMarketInfo {
// @ts-ignore
    /**
// @ts-ignore
     * Market type
// @ts-ignore
     */
// @ts-ignore
    type?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Contact person ID
// @ts-ignore
     */
// @ts-ignore
    contact_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Currency name
// @ts-ignore
     */
// @ts-ignore
    currency_text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Main market album ID
// @ts-ignore
     */
// @ts-ignore
    main_album_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Maximum price
// @ts-ignore
     */
// @ts-ignore
    price_max?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Minimum price
// @ts-ignore
     */
// @ts-ignore
    price_min?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsMarketState = "none" | "basic" | "advanced";
// @ts-ignore

// @ts-ignore
export interface GroupsMemberRole {
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    permissions?: GroupsMemberRolePermission[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsMemberRolePermission = "ads";
// @ts-ignore

// @ts-ignore
export type GroupsMemberRoleStatus = "moderator" | "editor" | "administrator" | "creator" | "advertiser";
// @ts-ignore

// @ts-ignore
export interface GroupsMemberStatus {
// @ts-ignore
    /**
// @ts-ignore
     * User ID
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
export interface GroupsMemberStatusFull {
// @ts-ignore
    /**
// @ts-ignore
     * User ID
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
/*Online status of group*/
// @ts-ignore
export interface GroupsOnlineStatus {
// @ts-ignore
    /**
// @ts-ignore
     * Estimated time of answer (for status = answer_mark)
// @ts-ignore
     */
// @ts-ignore
    minutes?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsOnlineStatusType = "none" | "online" | "answer_mark";
// @ts-ignore

// @ts-ignore
export interface GroupsOwnerXtrBanInfo {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsOwnerXtrBanInfoType = "group" | "profile";
// @ts-ignore

// @ts-ignore
export interface GroupsPhotoSize {
// @ts-ignore
    /**
// @ts-ignore
     * Image height
// @ts-ignore
     */
// @ts-ignore
    height?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Image width
// @ts-ignore
     */
// @ts-ignore
    width?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsRoleOptions = "moderator" | "editor" | "administrator" | "creator";
// @ts-ignore

// @ts-ignore
export type GroupsSectionsListItem = any[];
// @ts-ignore

// @ts-ignore
export interface GroupsSettingsTwitter {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    status?: "loading" | "sync";
// @ts-ignore
    name?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsSubjectItem {
// @ts-ignore
    /**
// @ts-ignore
     * Subject ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Subject title
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsTokenPermissionSetting {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    name?: string;
// @ts-ignore
    setting?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface GroupsUserXtrRole1 {
// @ts-ignore
    role: GroupsRoleOptions;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupsUserXtrRole = UsersUserFull & GroupsUserXtrRole1;
// @ts-ignore

// @ts-ignore
export interface LeadFormsAnswer {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    key?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LeadFormsAnswerItem {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    key?: string;
// @ts-ignore
    value?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LeadFormsForm {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    form_id?: number;
// @ts-ignore
    group_id?: number;
// @ts-ignore
    photo?: string;
// @ts-ignore
    name?: string;
// @ts-ignore
    title?: string;
// @ts-ignore
    description?: string;
// @ts-ignore
    confirmation?: string;
// @ts-ignore
    site_link_url?: string;
// @ts-ignore
    policy_link_url?: string;
// @ts-ignore
    questions?: LeadFormsQuestionItem[];
// @ts-ignore
    leads_count?: number;
// @ts-ignore
    pixel_code?: string;
// @ts-ignore
    once_per_user?: number;
// @ts-ignore
    notify_admins?: string;
// @ts-ignore
    notify_emails?: string;
// @ts-ignore
    url?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LeadFormsLead {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    lead_id?: number;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    date?: number;
// @ts-ignore
    answers?: LeadFormsAnswer[];
// @ts-ignore
    ad_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LeadFormsQuestionItem {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    key?: string;
// @ts-ignore
    type?: "input" | "textarea" | "radio" | "checkbox" | "select";
// @ts-ignore
    label?: string;
// @ts-ignore
    options?: LeadFormsQuestionItemOption[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface LeadFormsQuestionItemOption {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    key?: string;
// @ts-ignore
    label?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type LikesType = "post" | "comment" | "photo" | "audio" | "video" | "note" | "market" | "photo_comment" | "video_comment" | "topic_comment" | "market_comment" | "sitepage" | "textpost";
// @ts-ignore

// @ts-ignore
export interface LinkTargetObject {
// @ts-ignore
    /**
// @ts-ignore
     * Object type
// @ts-ignore
     */
// @ts-ignore
    type?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Owner ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Item ID
// @ts-ignore
     */
// @ts-ignore
    item_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketCurrency {
// @ts-ignore
    /**
// @ts-ignore
     * Currency ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Currency sign
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Currency title
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
export interface MarketMarketAlbum {
// @ts-ignore
    /**
// @ts-ignore
     * Market album ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Market album owner's ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Market album title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Items number
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Is album main for owner
// @ts-ignore
     */
// @ts-ignore
    is_main?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Is album hidden
// @ts-ignore
     */
// @ts-ignore
    is_hidden?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when album has been updated last time in Unixtime
// @ts-ignore
     */
// @ts-ignore
    updated_time?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MarketMarketCategory = MarketMarketCategoryOld;
// @ts-ignore

// @ts-ignore
export interface MarketMarketCategoryNested {
// @ts-ignore
    /**
// @ts-ignore
     * Category ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Category name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketMarketCategoryOld {
// @ts-ignore
    /**
// @ts-ignore
     * Category ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Category name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketMarketCategoryTree {
// @ts-ignore
    /**
// @ts-ignore
     * Category ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Category name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    children?: MarketMarketCategoryTree[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketMarketItem {
// @ts-ignore
    /**
// @ts-ignore
     * Access key for the market item
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Title for button for url
// @ts-ignore
     */
// @ts-ignore
    button_title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Date when the item has been created in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Item description
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Item ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Item owner's ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image
// @ts-ignore
     */
// @ts-ignore
    thumb_photo?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Item title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL to item
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    external_id?: string;
// @ts-ignore
    is_favorite?: boolean | number;
// @ts-ignore
    variants_grouping_id?: number;
// @ts-ignore
    is_main_variant?: boolean | number;
// @ts-ignore
    sku?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MarketMarketItemAvailability = 0 | 1 | 2;
// @ts-ignore

// @ts-ignore
export interface MarketMarketItemFull1 {
// @ts-ignore
    /**
// @ts-ignore
     * Views number
// @ts-ignore
     */
// @ts-ignore
    views_count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Object identifier in wishlist of viewer
// @ts-ignore
     */
// @ts-ignore
    wishlist_item_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * User agreement info
// @ts-ignore
     */
// @ts-ignore
    user_agreement_info: string;
// @ts-ignore
    /**
// @ts-ignore
     * Contains ad ID if it has
// @ts-ignore
     */
// @ts-ignore
    ad_id: number;
// @ts-ignore
    albums_ids: number[];
// @ts-ignore
    photos: PhotosPhoto[];
// @ts-ignore
    can_comment: BaseBoolInt;
// @ts-ignore
    can_repost: BaseBoolInt;
// @ts-ignore
    likes: BaseLikes;
// @ts-ignore
    reposts: BaseRepostsInfo;
// @ts-ignore
    cancel_info: BaseLink;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MarketMarketItemFull = MarketMarketItem & MarketMarketItemFull1;
// @ts-ignore

// @ts-ignore
export interface MarketOrder {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    id?: number;
// @ts-ignore
    group_id?: number;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    display_order_id?: string;
// @ts-ignore
    date?: number;
// @ts-ignore
    status?: number;
// @ts-ignore
    items_count?: number;
// @ts-ignore
    track_number?: string;
// @ts-ignore
    track_link?: string;
// @ts-ignore
    comment?: string;
// @ts-ignore
    address?: string;
// @ts-ignore
    merchant_comment?: string;
// @ts-ignore
    weight?: number;
// @ts-ignore
    preview_order_items?: MarketOrderItem[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketOrderItem {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    item_id?: number;
// @ts-ignore
    quantity?: number;
// @ts-ignore
    title?: string;
// @ts-ignore
    variants?: string[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketPrice {
// @ts-ignore
    /**
// @ts-ignore
     * Amount
// @ts-ignore
     */
// @ts-ignore
    amount?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Text
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Textual representation of old price
// @ts-ignore
     */
// @ts-ignore
    old_amount_text?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    discount_rate?: number;
// @ts-ignore
    old_amount?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MarketSection {
// @ts-ignore
    /**
// @ts-ignore
     * Section ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Section name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MarketServicesViewType = 1 | 2;
// @ts-ignore

// @ts-ignore
export interface MessagesAudioMessage {
// @ts-ignore
    /**
// @ts-ignore
     * Access key for audio message
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Audio message duration in seconds
// @ts-ignore
     */
// @ts-ignore
    duration?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Audio message ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * MP3 file URL
// @ts-ignore
     */
// @ts-ignore
    link_mp3?: string;
// @ts-ignore
    /**
// @ts-ignore
     * OGG file URL
// @ts-ignore
     */
// @ts-ignore
    link_ogg?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Audio message owner ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Sound visualisation
// @ts-ignore
     */
// @ts-ignore
    waveform?: number[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    transcript_error?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesChat {
// @ts-ignore
    /**
// @ts-ignore
     * Chat creator ID
// @ts-ignore
     */
// @ts-ignore
    admin_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Chat ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 100 px in width
// @ts-ignore
     */
// @ts-ignore
    photo_100?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 200 px in width
// @ts-ignore
     */
// @ts-ignore
    photo_200?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 50 px in width
// @ts-ignore
     */
// @ts-ignore
    photo_50?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Chat title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Chat type
// @ts-ignore
     */
// @ts-ignore
    type?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    users?: number[];
// @ts-ignore
    /**
// @ts-ignore
     * If provided photo is default
// @ts-ignore
     */
// @ts-ignore
    is_default_photo?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Count members in a chat
// @ts-ignore
     */
// @ts-ignore
    members_count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * If chat is group channel
// @ts-ignore
     */
// @ts-ignore
    is_group_channel?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesChatFull {
// @ts-ignore
    /**
// @ts-ignore
     * Chat creator ID
// @ts-ignore
     */
// @ts-ignore
    admin_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Chat ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 100 px in width
// @ts-ignore
     */
// @ts-ignore
    photo_100?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 200 px in width
// @ts-ignore
     */
// @ts-ignore
    photo_200?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 50 px in width
// @ts-ignore
     */
// @ts-ignore
    photo_50?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Chat title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Chat type
// @ts-ignore
     */
// @ts-ignore
    type?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    users?: MessagesUserXtrInvitedBy[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesChatPreview {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    admin_id?: number;
// @ts-ignore
    joined?: boolean | number;
// @ts-ignore
    local_id?: number;
// @ts-ignore
    members?: number[];
// @ts-ignore
    members_count?: number;
// @ts-ignore
    title?: string;
// @ts-ignore
    is_member?: boolean | number;
// @ts-ignore
    is_don?: boolean | number;
// @ts-ignore
    is_group_channel?: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesChatPushSettings {
// @ts-ignore
    /**
// @ts-ignore
     * Time until that notifications are disabled
// @ts-ignore
     */
// @ts-ignore
    disabled_until?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesChatRestrictions {
// @ts-ignore
    /**
// @ts-ignore
     * Only admins can promote users to admins
// @ts-ignore
     */
// @ts-ignore
    admins_promote_users?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Only admins can change chat info
// @ts-ignore
     */
// @ts-ignore
    only_admins_edit_info?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Only admins can edit pinned message
// @ts-ignore
     */
// @ts-ignore
    only_admins_edit_pin?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Only admins can invite users to this chat
// @ts-ignore
     */
// @ts-ignore
    only_admins_invite?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Only admins can kick users from this chat
// @ts-ignore
     */
// @ts-ignore
    only_admins_kick?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesChatSettings {
// @ts-ignore
    /**
// @ts-ignore
     * Chat title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Admin id
// @ts-ignore
     */
// @ts-ignore
    admin_ids?: number[];
// @ts-ignore
    /**
// @ts-ignore
     * Active member ID
// @ts-ignore
     */
// @ts-ignore
    active_ids?: number[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    members_count?: number;
// @ts-ignore
    friends_count?: number;
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    is_group_channel?: boolean | number;
// @ts-ignore
    is_disappearing?: boolean | number;
// @ts-ignore
    theme?: string;
// @ts-ignore
    disappearing_chat_link?: string;
// @ts-ignore
    is_service?: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesChatSettingsAcl {
// @ts-ignore
    /**
// @ts-ignore
     * Can you change photo, description and name
// @ts-ignore
     */
// @ts-ignore
    can_change_info?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Can you change invite link for this chat
// @ts-ignore
     */
// @ts-ignore
    can_change_invite_link?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Can you pin/unpin message for this chat
// @ts-ignore
     */
// @ts-ignore
    can_change_pin?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Can you invite other peers in chat
// @ts-ignore
     */
// @ts-ignore
    can_invite?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Can you promote simple users to chat admins
// @ts-ignore
     */
// @ts-ignore
    can_promote_users?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Can you see invite link for this chat
// @ts-ignore
     */
// @ts-ignore
    can_see_invite_link?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Can you moderate (delete) other users' messages
// @ts-ignore
     */
// @ts-ignore
    can_moderate?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Can you copy chat
// @ts-ignore
     */
// @ts-ignore
    can_copy_chat?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Can you init group call in the chat
// @ts-ignore
     */
// @ts-ignore
    can_call?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Can you use mass mentions
// @ts-ignore
     */
// @ts-ignore
    can_use_mass_mentions?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Can you change chat service type
// @ts-ignore
     */
// @ts-ignore
    can_change_service_type?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesChatSettingsPermissions {
// @ts-ignore
    /**
// @ts-ignore
     * Who can invite users to chat
// @ts-ignore
     */
// @ts-ignore
    invite?: "owner" | "owner_and_admins" | "all";
// @ts-ignore
    /**
// @ts-ignore
     * Who can change chat info
// @ts-ignore
     */
// @ts-ignore
    change_info?: "owner" | "owner_and_admins" | "all";
// @ts-ignore
    /**
// @ts-ignore
     * Who can change pinned message
// @ts-ignore
     */
// @ts-ignore
    change_pin?: "owner" | "owner_and_admins" | "all";
// @ts-ignore
    /**
// @ts-ignore
     * Who can use mass mentions
// @ts-ignore
     */
// @ts-ignore
    use_mass_mentions?: "owner" | "owner_and_admins" | "all";
// @ts-ignore
    /**
// @ts-ignore
     * Who can see invite link
// @ts-ignore
     */
// @ts-ignore
    see_invite_link?: "owner" | "owner_and_admins" | "all";
// @ts-ignore
    /**
// @ts-ignore
     * Who can make calls
// @ts-ignore
     */
// @ts-ignore
    call?: "owner" | "owner_and_admins" | "all";
// @ts-ignore
    /**
// @ts-ignore
     * Who can change admins
// @ts-ignore
     */
// @ts-ignore
    change_admins?: "owner" | "owner_and_admins";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesChatSettingsPhoto {
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 50px in width
// @ts-ignore
     */
// @ts-ignore
    photo_50?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 100px in width
// @ts-ignore
     */
// @ts-ignore
    photo_100?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 200px in width
// @ts-ignore
     */
// @ts-ignore
    photo_200?: string;
// @ts-ignore
    /**
// @ts-ignore
     * If provided photo is default
// @ts-ignore
     */
// @ts-ignore
    is_default_photo?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * If provided photo is default call photo
// @ts-ignore
     */
// @ts-ignore
    is_default_call_photo?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessagesChatSettingsState = "in" | "kicked" | "left";
// @ts-ignore

// @ts-ignore
export interface MessagesConversation {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the last message in conversation
// @ts-ignore
     */
// @ts-ignore
    last_message_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Conversation message ID of the last message in conversation
// @ts-ignore
     */
// @ts-ignore
    last_conversation_message_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Last message user have read
// @ts-ignore
     */
// @ts-ignore
    in_read?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Last outcoming message have been read by the opponent
// @ts-ignore
     */
// @ts-ignore
    out_read?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Unread messages number
// @ts-ignore
     */
// @ts-ignore
    unread_count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Is this conversation uread
// @ts-ignore
     */
// @ts-ignore
    is_marked_unread?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Message id of message with mention
// @ts-ignore
     */
// @ts-ignore
    mentions?: number[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    important?: boolean | number;
// @ts-ignore
    unanswered?: boolean | number;
// @ts-ignore
    special_service_type?: "business_notify";
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesConversationCanWrite {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    allowed?: boolean | number;
// @ts-ignore
    reason?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesConversationMember {
// @ts-ignore
    /**
// @ts-ignore
     * Is it possible for user to kick this member
// @ts-ignore
     */
// @ts-ignore
    can_kick?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Message request date
// @ts-ignore
     */
// @ts-ignore
    request_date?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    invited_by?: number;
// @ts-ignore
    is_admin?: boolean | number;
// @ts-ignore
    is_owner?: boolean | number;
// @ts-ignore
    is_message_request?: boolean | number;
// @ts-ignore
    join_date?: number;
// @ts-ignore
    member_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesConversationPeer {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    id?: number;
// @ts-ignore
    local_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessagesConversationPeerType = "chat" | "email" | "user" | "group";
// @ts-ignore

// @ts-ignore
export interface MessagesConversationSortId {
// @ts-ignore
    /**
// @ts-ignore
     * Major id for sorting conversations
// @ts-ignore
     */
// @ts-ignore
    major_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Minor id for sorting conversations
// @ts-ignore
     */
// @ts-ignore
    minor_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesConversationWithMessage {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesForeignMessage {
// @ts-ignore
    /**
// @ts-ignore
     * Conversation message ID
// @ts-ignore
     */
// @ts-ignore
    conversation_message_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when the message was created
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Message author's ID
// @ts-ignore
     */
// @ts-ignore
    from_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Message ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Peer ID
// @ts-ignore
     */
// @ts-ignore
    peer_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Message text
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Date when the message has been updated in Unixtime
// @ts-ignore
     */
// @ts-ignore
    update_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Was the audio message inside already listened by you
// @ts-ignore
     */
// @ts-ignore
    was_listened?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Additional data sent along with message for developer convenience
// @ts-ignore
     */
// @ts-ignore
    payload?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    attachments?: MessagesMessageAttachment[];
// @ts-ignore
    fwd_messages?: MessagesForeignMessage[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesForward {
// @ts-ignore
    /**
// @ts-ignore
     * Messages owner_id
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Messages peer_id
// @ts-ignore
     */
// @ts-ignore
    peer_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Message conversation_message_id
// @ts-ignore
     */
// @ts-ignore
    conversation_message_ids?: number[];
// @ts-ignore
    /**
// @ts-ignore
     * Message message_id
// @ts-ignore
     */
// @ts-ignore
    message_ids?: number[];
// @ts-ignore
    /**
// @ts-ignore
     * If you need to reply to a message
// @ts-ignore
     */
// @ts-ignore
    is_reply?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetConversationById {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items?: MessagesConversation[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGetConversationByIdExtended1 {
// @ts-ignore
    profiles: UsersUserFull[];
// @ts-ignore
    groups: GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessagesGetConversationByIdExtended = MessagesGetConversationById & MessagesGetConversationByIdExtended1;
// @ts-ignore

// @ts-ignore
export interface MessagesGetConversationMembers {
// @ts-ignore
    /**
// @ts-ignore
     * Chat members count
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items?: MessagesConversationMember[];
// @ts-ignore
    profiles?: UsersUserFull[];
// @ts-ignore
    groups?: GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesGraffiti {
// @ts-ignore
    /**
// @ts-ignore
     * Access key for graffiti
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Graffiti ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Graffiti owner ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Graffiti URL
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Graffiti width
// @ts-ignore
     */
// @ts-ignore
    width?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Graffiti height
// @ts-ignore
     */
// @ts-ignore
    height?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesHistoryAttachment {
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
     * Message author's ID
// @ts-ignore
     */
// @ts-ignore
    from_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Forward level (optional)
// @ts-ignore
     */
// @ts-ignore
    forward_level?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    was_listened?: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesHistoryMessageAttachment {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessagesHistoryMessageAttachmentType = "photo" | "video" | "audio" | "doc" | "link" | "market" | "wall" | "share" | "graffiti" | "audio_message";
// @ts-ignore

// @ts-ignore
export interface MessagesKeyboard {
// @ts-ignore
    /**
// @ts-ignore
     * Should this keyboard disappear on first use
// @ts-ignore
     */
// @ts-ignore
    one_time?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Community or bot, which set this keyboard
// @ts-ignore
     */
// @ts-ignore
    author_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    buttons?: MessagesKeyboardButton[][];
// @ts-ignore
    inline?: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesKeyboardButton {
// @ts-ignore
    /**
// @ts-ignore
     * Button color
// @ts-ignore
     */
// @ts-ignore
    color?: "default" | "positive" | "negative" | "primary";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/*Description of the action, that should be performed on button click*/
// @ts-ignore
export interface MessagesKeyboardButtonActionCallback {
// @ts-ignore
    /**
// @ts-ignore
     * Label for button
// @ts-ignore
     */
// @ts-ignore
    label?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Additional data sent along with message for developer convenience
// @ts-ignore
     */
// @ts-ignore
    payload?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    type?: "callback";
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/*Description of the action, that should be performed on button click*/
// @ts-ignore
export interface MessagesKeyboardButtonActionLocation {
// @ts-ignore
    /**
// @ts-ignore
     * Additional data sent along with message for developer convenience
// @ts-ignore
     */
// @ts-ignore
    payload?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    type?: "location";
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/*Description of the action, that should be performed on button click*/
// @ts-ignore
export interface MessagesKeyboardButtonActionOpenApp {
// @ts-ignore
    /**
// @ts-ignore
     * Fragment value in app link like vk.com/app{app_id}_-654321#hash
// @ts-ignore
     */
// @ts-ignore
    app_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Fragment value in app link like vk.com/app123456_-654321#{hash}
// @ts-ignore
     */
// @ts-ignore
    hash?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Label for button
// @ts-ignore
     */
// @ts-ignore
    label?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Fragment value in app link like vk.com/app123456_{owner_id}#hash
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Additional data sent along with message for developer convenience
// @ts-ignore
     */
// @ts-ignore
    payload?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    type?: "open_app";
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/*Description of the action, that should be performed on button click*/
// @ts-ignore
export interface MessagesKeyboardButtonActionOpenLink {
// @ts-ignore
    /**
// @ts-ignore
     * Label for button
// @ts-ignore
     */
// @ts-ignore
    label?: string;
// @ts-ignore
    /**
// @ts-ignore
     * link for button
// @ts-ignore
     */
// @ts-ignore
    link?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Additional data sent along with message for developer convenience
// @ts-ignore
     */
// @ts-ignore
    payload?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    type?: "open_link";
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/*Description of the action, that should be performed on button click*/
// @ts-ignore
export interface MessagesKeyboardButtonActionOpenPhoto {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    type?: "open_photo";
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/*Description of the action, that should be performed on button click*/
// @ts-ignore
export interface MessagesKeyboardButtonActionText {
// @ts-ignore
    /**
// @ts-ignore
     * Label for button
// @ts-ignore
     */
// @ts-ignore
    label?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Additional data sent along with message for developer convenience
// @ts-ignore
     */
// @ts-ignore
    payload?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    type?: "text";
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/*Description of the action, that should be performed on button click*/
// @ts-ignore
export interface MessagesKeyboardButtonActionVkpay {
// @ts-ignore
    /**
// @ts-ignore
     * Fragment value in app link like vk.com/app123456_-654321#{hash}
// @ts-ignore
     */
// @ts-ignore
    hash?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Additional data sent along with message for developer convenience
// @ts-ignore
     */
// @ts-ignore
    payload?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    type?: "vkpay";
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessagesKeyboardButtonPropertyAction = any;
// @ts-ignore

// @ts-ignore
export interface MessagesLastActivity {
// @ts-ignore
    /**
// @ts-ignore
     * Time when user was online in Unixtime
// @ts-ignore
     */
// @ts-ignore
    time?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesLongpollMessages {
// @ts-ignore
    /**
// @ts-ignore
     * Total number
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items?: MessagesMessage[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesLongpollParams {
// @ts-ignore
    /**
// @ts-ignore
     * Server URL
// @ts-ignore
     */
// @ts-ignore
    server?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Key
// @ts-ignore
     */
// @ts-ignore
    key: string;
// @ts-ignore
    /**
// @ts-ignore
     * Timestamp
// @ts-ignore
     */
// @ts-ignore
    ts?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Persistent timestamp
// @ts-ignore
     */
// @ts-ignore
    pts?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesMessage {
// @ts-ignore
    /**
// @ts-ignore
     * Only for messages from community. Contains user ID of community admin, who sent this message.
// @ts-ignore
     */
// @ts-ignore
    admin_author_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Unique auto-incremented number for all messages with this peer
// @ts-ignore
     */
// @ts-ignore
    conversation_message_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when the message has been sent in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Message author's ID
// @ts-ignore
     */
// @ts-ignore
    from_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Message ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Is it an important message
// @ts-ignore
     */
// @ts-ignore
    important?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * this message is cropped for bot
// @ts-ignore
     */
// @ts-ignore
    is_cropped?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Members number
// @ts-ignore
     */
// @ts-ignore
    members_count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Peer ID
// @ts-ignore
     */
// @ts-ignore
    peer_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID used for sending messages. It returned only for outgoing messages
// @ts-ignore
     */
// @ts-ignore
    random_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Message text
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Date when the message has been updated in Unixtime
// @ts-ignore
     */
// @ts-ignore
    update_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Was the audio message inside already listened by you
// @ts-ignore
     */
// @ts-ignore
    was_listened?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when the message has been pinned in Unixtime
// @ts-ignore
     */
// @ts-ignore
    pinned_at?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Is silent message, push without sound
// @ts-ignore
     */
// @ts-ignore
    is_silent?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    attachments?: MessagesMessageAttachment[];
// @ts-ignore
    fwd_messages?: MessagesForeignMessage[];
// @ts-ignore
    is_hidden?: boolean | number;
// @ts-ignore
    payload?: string;
// @ts-ignore
    ref?: string;
// @ts-ignore
    ref_source?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesMessageAction {
// @ts-ignore
    /**
// @ts-ignore
     * Message ID
// @ts-ignore
     */
// @ts-ignore
    conversation_message_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Email address for chat_invite_user or chat_kick_user actions
// @ts-ignore
     */
// @ts-ignore
    email?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User or email peer ID
// @ts-ignore
     */
// @ts-ignore
    member_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Message body of related message
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    /**
// @ts-ignore
     * New chat title for chat_create and chat_title_update actions
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
export interface MessagesMessageActionPhoto {
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 50px in width
// @ts-ignore
     */
// @ts-ignore
    photo_50?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 100px in width
// @ts-ignore
     */
// @ts-ignore
    photo_100?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 200px in width
// @ts-ignore
     */
// @ts-ignore
    photo_200?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessagesMessageActionStatus = "chat_photo_update" | "chat_photo_remove" | "chat_create" | "chat_title_update" | "chat_invite_user" | "chat_kick_user" | "chat_pin_message" | "chat_unpin_message" | "chat_invite_user_by_link" | "chat_invite_user_by_message_request" | "chat_screenshot";
// @ts-ignore

// @ts-ignore
export interface MessagesMessageAttachment {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessagesMessageAttachmentType = "photo" | "audio" | "video" | "doc" | "link" | "market" | "market_album" | "gift" | "sticker" | "wall" | "wall_reply" | "article" | "poll" | "call" | "graffiti" | "audio_message";
// @ts-ignore

// @ts-ignore
export interface MessagesMessageRequestData {
// @ts-ignore
    /**
// @ts-ignore
     * Status of message request
// @ts-ignore
     */
// @ts-ignore
    status?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Message request sender id
// @ts-ignore
     */
// @ts-ignore
    inviter_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Message request date
// @ts-ignore
     */
// @ts-ignore
    request_date?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesMessagesArray {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    count?: number;
// @ts-ignore
    items?: MessagesMessage[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesOutReadBy {
// @ts-ignore
    /**
// @ts-ignore
     * Member IDs
// @ts-ignore
     */
// @ts-ignore
    member_ids?: number[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    count?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesPinnedMessage {
// @ts-ignore
    /**
// @ts-ignore
     * Unique auto-incremented number for all messages with this peer
// @ts-ignore
     */
// @ts-ignore
    conversation_message_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Message ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when the message has been sent in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Message author's ID
// @ts-ignore
     */
// @ts-ignore
    from_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Peer ID
// @ts-ignore
     */
// @ts-ignore
    peer_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Message text
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    attachments?: MessagesMessageAttachment[];
// @ts-ignore
    fwd_messages?: MessagesForeignMessage[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesPushSettings {
// @ts-ignore
    /**
// @ts-ignore
     * Information whether push notifications are disabled forever
// @ts-ignore
     */
// @ts-ignore
    disabled_forever?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Time until what notifications are disabled
// @ts-ignore
     */
// @ts-ignore
    disabled_until?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether the sound is on
// @ts-ignore
     */
// @ts-ignore
    no_sound?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether the mentions are disabled
// @ts-ignore
     */
// @ts-ignore
    disabled_mentions?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether the mass mentions (like '@all', '@online') are disabled
// @ts-ignore
     */
// @ts-ignore
    disabled_mass_mentions?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface MessagesSendUserIdsResponseItem {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    peer_id?: number;
// @ts-ignore
    message_id?: number;
// @ts-ignore
    conversation_message_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessagesTemplateActionTypeNames = "text" | "start" | "location" | "vkpay" | "open_app" | "open_photo" | "open_link" | "callback" | "intent_subscribe" | "intent_unsubscribe";
// @ts-ignore

// @ts-ignore
export interface MessagesUserXtrInvitedBy1 {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the inviter
// @ts-ignore
     */
// @ts-ignore
    invited_by: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessagesUserXtrInvitedBy = UsersUserXtrType & MessagesUserXtrInvitedBy1;
// @ts-ignore

// @ts-ignore
export type NewsfeedCommentsFilters = "post" | "photo" | "video" | "topic" | "note";
// @ts-ignore

// @ts-ignore
export type NewsfeedIgnoreItemType = "wall" | "tag" | "profilephoto" | "video" | "photo" | "audio";
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemAudio1 {
// @ts-ignore
    /**
// @ts-ignore
     * Post ID
// @ts-ignore
     */
// @ts-ignore
    post_id: number;
// @ts-ignore
    audio: NewsfeedItemAudioAudio;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type NewsfeedItemAudio = NewsfeedItemBase & NewsfeedItemAudio1;
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemAudioAudio {
// @ts-ignore
    /**
// @ts-ignore
     * Audios number
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items?: AudioAudio[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemBase {
// @ts-ignore
    /**
// @ts-ignore
     * Item source ID
// @ts-ignore
     */
// @ts-ignore
    source_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when item has been added in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemDigest1 {
// @ts-ignore
    /**
// @ts-ignore
     * id of feed in digest
// @ts-ignore
     */
// @ts-ignore
    feed_id: string;
// @ts-ignore
    /**
// @ts-ignore
     * type of digest
// @ts-ignore
     */
// @ts-ignore
    template: "list" | "grid" | "single";
// @ts-ignore
    items: NewsfeedItemDigestItem[];
// @ts-ignore
    main_post_ids: string[];
// @ts-ignore
    header: NewsfeedItemDigestHeader;
// @ts-ignore
    footer: NewsfeedItemDigestFooter;
// @ts-ignore
    track_code: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type NewsfeedItemDigest = NewsfeedItemBase & NewsfeedItemDigest1;
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemDigestButton {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    title?: string;
// @ts-ignore
    style?: "primary";
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemDigestFooter {
// @ts-ignore
    /**
// @ts-ignore
     * text for invite to enable smart feed
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    style?: "text" | "button";
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemDigestFullItem {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    text?: string;
// @ts-ignore
    source_name?: string;
// @ts-ignore
    attachment_index?: number;
// @ts-ignore
    style?: "default" | "inversed" | "spotlight";
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemDigestHeader {
// @ts-ignore
    /**
// @ts-ignore
     * Title of the header
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Subtitle of the header, when title have two strings
// @ts-ignore
     */
// @ts-ignore
    subtitle?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    style?: "singleline" | "multiline";
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type NewsfeedItemDigestItem = WallWallpost;
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemFriend1 {
// @ts-ignore
    friends: NewsfeedItemFriendFriends;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type NewsfeedItemFriend = NewsfeedItemBase & NewsfeedItemFriend1;
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemFriendFriends {
// @ts-ignore
    /**
// @ts-ignore
     * Number of friends has been added
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items?: BaseUserId[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemHolidayRecommendationsBlockHeader {
// @ts-ignore
    /**
// @ts-ignore
     * Title of the header
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Subtitle of the header
// @ts-ignore
     */
// @ts-ignore
    subtitle?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    image?: BaseImage[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemPhoto1 {
// @ts-ignore
    /**
// @ts-ignore
     * Post ID
// @ts-ignore
     */
// @ts-ignore
    post_id: number;
// @ts-ignore
    photos: NewsfeedItemPhotoPhotos;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type NewsfeedItemPhoto = WallCarouselBase & NewsfeedItemBase & NewsfeedItemPhoto1;
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemPhotoPhotos {
// @ts-ignore
    /**
// @ts-ignore
     * Photos number
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items?: NewsfeedNewsfeedPhoto[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemPhotoTag1 {
// @ts-ignore
    /**
// @ts-ignore
     * Post ID
// @ts-ignore
     */
// @ts-ignore
    post_id: number;
// @ts-ignore
    photo_tags: NewsfeedItemPhotoTagPhotoTags;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type NewsfeedItemPhotoTag = WallCarouselBase & NewsfeedItemBase & NewsfeedItemPhotoTag1;
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemPhotoTagPhotoTags {
// @ts-ignore
    /**
// @ts-ignore
     * Tags number
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items?: NewsfeedNewsfeedPhoto[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemPromoButton1 {
// @ts-ignore
    text: string;
// @ts-ignore
    title: string;
// @ts-ignore
    action: NewsfeedItemPromoButtonAction;
// @ts-ignore
    images: NewsfeedItemPromoButtonImage[];
// @ts-ignore
    track_code: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type NewsfeedItemPromoButton = NewsfeedItemBase & NewsfeedItemPromoButton1;
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemPromoButtonAction {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    url?: string;
// @ts-ignore
    type?: string;
// @ts-ignore
    target?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemPromoButtonImage {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    width?: number;
// @ts-ignore
    height?: number;
// @ts-ignore
    url?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemTopic1 {
// @ts-ignore
    /**
// @ts-ignore
     * Topic post ID
// @ts-ignore
     */
// @ts-ignore
    post_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * Post text
// @ts-ignore
     */
// @ts-ignore
    text: string;
// @ts-ignore
    comments: BaseCommentsInfo;
// @ts-ignore
    likes: BaseLikesInfo;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type NewsfeedItemTopic = NewsfeedItemBase & NewsfeedItemTopic1;
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemVideo1 {
// @ts-ignore
    video: NewsfeedItemVideoVideo;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type NewsfeedItemVideo = WallCarouselBase & NewsfeedItemBase & NewsfeedItemVideo1;
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemVideoVideo {
// @ts-ignore
    /**
// @ts-ignore
     * Tags number
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    items?: VideoVideo[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemWallpost1 {
// @ts-ignore
    feedback: NewsfeedItemWallpostFeedback;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type NewsfeedItemWallpost = WallCarouselBase & NewsfeedItemBase & WallWallpostFull & NewsfeedItemWallpost1;
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemWallpostFeedback {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    question?: string;
// @ts-ignore
    answers?: NewsfeedItemWallpostFeedbackAnswer[];
// @ts-ignore
    stars_count?: number;
// @ts-ignore
    gratitude?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NewsfeedItemWallpostFeedbackAnswer {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    title?: string;
// @ts-ignore
    id?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type NewsfeedItemWallpostFeedbackType = "buttons" | "stars";
// @ts-ignore

// @ts-ignore
export interface NewsfeedList {
// @ts-ignore
    /**
// @ts-ignore
     * List ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * List title
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
export interface NewsfeedListFull1 {
// @ts-ignore
    /**
// @ts-ignore
     * Users and communities IDs
// @ts-ignore
     */
// @ts-ignore
    source_ids: number[];
// @ts-ignore
    no_reposts: BaseBoolInt;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type NewsfeedListFull = NewsfeedList & NewsfeedListFull1;
// @ts-ignore

// @ts-ignore
export type NewsfeedNewsfeedItem = any;
// @ts-ignore

// @ts-ignore
export type NewsfeedNewsfeedItemType = "post" | "photo" | "photo_tag" | "wall_photo" | "friend" | "audio" | "video" | "topic" | "digest" | "stories" | "note" | "audio_playlist" | "clip";
// @ts-ignore

// @ts-ignore
export interface NewsfeedNewsfeedPhoto1 {
// @ts-ignore
    likes: BaseLikes;
// @ts-ignore
    comments: BaseObjectCount;
// @ts-ignore
    can_repost: BaseBoolInt;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type NewsfeedNewsfeedPhoto = PhotosPhoto & NewsfeedNewsfeedPhoto1;
// @ts-ignore

// @ts-ignore
export interface NotesNote {
// @ts-ignore
    /**
// @ts-ignore
     * Comments number
// @ts-ignore
     */
// @ts-ignore
    comments?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when the note has been created in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Note ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Note owner's ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Note text
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Note text in wiki format
// @ts-ignore
     */
// @ts-ignore
    text_wiki?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Note title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the page with note preview
// @ts-ignore
     */
// @ts-ignore
    view_url?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    read_comments?: number;
// @ts-ignore
    privacy_view?: string[];
// @ts-ignore
    privacy_comment?: string[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotesNoteComment {
// @ts-ignore
    /**
// @ts-ignore
     * Date when the comment has beed added in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment text
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Note ID
// @ts-ignore
     */
// @ts-ignore
    nid?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Note ID
// @ts-ignore
     */
// @ts-ignore
    oid?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of replied comment
// @ts-ignore
     */
// @ts-ignore
    reply_to?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment author's ID
// @ts-ignore
     */
// @ts-ignore
    uid?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotificationsFeedback {
// @ts-ignore
    /**
// @ts-ignore
     * Reply author's ID
// @ts-ignore
     */
// @ts-ignore
    from_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Item ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Reply text
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Wall owner's ID
// @ts-ignore
     */
// @ts-ignore
    to_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    attachments?: WallWallpostAttachment[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotificationsNotification {
// @ts-ignore
    /**
// @ts-ignore
     * Date when the event has been occurred
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Notification type
// @ts-ignore
     */
// @ts-ignore
    type?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type NotificationsNotificationItem = NotificationsNotification;
// @ts-ignore

// @ts-ignore
export type NotificationsNotificationParent = WallWallpostToId & PhotosPhoto & BoardTopic & VideoVideo & NotificationsNotificationsComment;
// @ts-ignore

// @ts-ignore
export interface NotificationsNotificationsComment {
// @ts-ignore
    /**
// @ts-ignore
     * Date when the comment has been added in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Author ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment text
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
export interface NotificationsReply {
// @ts-ignore
    /**
// @ts-ignore
     * Date when the reply has been created in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Reply ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Reply text
// @ts-ignore
     */
// @ts-ignore
    text?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotificationsSendMessageError {
// @ts-ignore
    /**
// @ts-ignore
     * Error code
// @ts-ignore
     */
// @ts-ignore
    code?: 1 | 2 | 3 | 4;
// @ts-ignore
    /**
// @ts-ignore
     * Error description
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface NotificationsSendMessageItem {
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
     * Notification status
// @ts-ignore
     */
// @ts-ignore
    status?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface OauthError {
// @ts-ignore
    /**
// @ts-ignore
     * Error type
// @ts-ignore
     */
// @ts-ignore
    error?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Error description
// @ts-ignore
     */
// @ts-ignore
    error_description?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URI for validation
// @ts-ignore
     */
// @ts-ignore
    redirect_uri?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface OrdersAmount {
// @ts-ignore
    /**
// @ts-ignore
     * Currency name
// @ts-ignore
     */
// @ts-ignore
    currency?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    amounts?: OrdersAmountItem[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface OrdersAmountItem {
// @ts-ignore
    /**
// @ts-ignore
     * Votes amount in user's currency
// @ts-ignore
     */
// @ts-ignore
    amount?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Amount description
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Votes number
// @ts-ignore
     */
// @ts-ignore
    votes?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface OrdersOrder {
// @ts-ignore
    /**
// @ts-ignore
     * Amount
// @ts-ignore
     */
// @ts-ignore
    amount?: string;
// @ts-ignore
    /**
// @ts-ignore
     * App order ID
// @ts-ignore
     */
// @ts-ignore
    app_order_id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Cancel transaction ID
// @ts-ignore
     */
// @ts-ignore
    cancel_transaction_id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Date of creation in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Order ID
// @ts-ignore
     */
// @ts-ignore
    id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Order item
// @ts-ignore
     */
// @ts-ignore
    item?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Receiver ID
// @ts-ignore
     */
// @ts-ignore
    receiver_id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Order status
// @ts-ignore
     */
// @ts-ignore
    status?: "created" | "charged" | "refunded" | "chargeable" | "cancelled" | "declined";
// @ts-ignore
    /**
// @ts-ignore
     * Transaction ID
// @ts-ignore
     */
// @ts-ignore
    transaction_id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    user_id?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface OrdersSubscription {
// @ts-ignore
    /**
// @ts-ignore
     * Cancel reason
// @ts-ignore
     */
// @ts-ignore
    cancel_reason?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Date of creation in Unixtime
// @ts-ignore
     */
// @ts-ignore
    create_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Subscription ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Subscription order item
// @ts-ignore
     */
// @ts-ignore
    item_id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Date of next bill in Unixtime
// @ts-ignore
     */
// @ts-ignore
    next_bill_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Subscription expiration time in Unixtime
// @ts-ignore
     */
// @ts-ignore
    expire_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Pending cancel state
// @ts-ignore
     */
// @ts-ignore
    pending_cancel?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Subscription period
// @ts-ignore
     */
// @ts-ignore
    period?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date of last period start in Unixtime
// @ts-ignore
     */
// @ts-ignore
    period_start_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Subscription price
// @ts-ignore
     */
// @ts-ignore
    price?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Subscription name
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Subscription's application id
// @ts-ignore
     */
// @ts-ignore
    app_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Subscription's application name
// @ts-ignore
     */
// @ts-ignore
    application_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Item photo image url
// @ts-ignore
     */
// @ts-ignore
    photo_url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Subscription status
// @ts-ignore
     */
// @ts-ignore
    status?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Is test subscription
// @ts-ignore
     */
// @ts-ignore
    test_mode?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Date of trial expire in Unixtime
// @ts-ignore
     */
// @ts-ignore
    trial_expire_time?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date of last change in Unixtime
// @ts-ignore
     */
// @ts-ignore
    update_time?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface OwnerState {
// @ts-ignore
    /**
// @ts-ignore
     * wiki text to describe user state
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    state?: 1 | 2 | 3 | 4 | 5;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type PagesPrivacySettings = 0 | 1 | 2;
// @ts-ignore

// @ts-ignore
export interface PagesWikipage {
// @ts-ignore
    /**
// @ts-ignore
     * Page creator ID
// @ts-ignore
     */
// @ts-ignore
    creator_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Page creator name
// @ts-ignore
     */
// @ts-ignore
    creator_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Last editor ID
// @ts-ignore
     */
// @ts-ignore
    editor_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Last editor name
// @ts-ignore
     */
// @ts-ignore
    editor_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Community ID
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Page ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Page title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Views number
// @ts-ignore
     */
// @ts-ignore
    views?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PagesWikipageFull {
// @ts-ignore
    /**
// @ts-ignore
     * Date when the page has been created in Unixtime
// @ts-ignore
     */
// @ts-ignore
    created?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Page creator ID
// @ts-ignore
     */
// @ts-ignore
    creator_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when the page has been edited in Unixtime
// @ts-ignore
     */
// @ts-ignore
    edited?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Last editor ID
// @ts-ignore
     */
// @ts-ignore
    editor_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Community ID
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Page content, HTML
// @ts-ignore
     */
// @ts-ignore
    html?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Page ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Page content, wiki
// @ts-ignore
     */
// @ts-ignore
    source?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Page title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the page preview
// @ts-ignore
     */
// @ts-ignore
    view_url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Views number
// @ts-ignore
     */
// @ts-ignore
    views?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Parent
// @ts-ignore
     */
// @ts-ignore
    parent?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Parent2
// @ts-ignore
     */
// @ts-ignore
    parent2?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Owner ID
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
export interface PagesWikipageHistory {
// @ts-ignore
    /**
// @ts-ignore
     * Version ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Page size in bytes
// @ts-ignore
     */
// @ts-ignore
    length?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when the page has been edited in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Last editor ID
// @ts-ignore
     */
// @ts-ignore
    editor_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Last editor name
// @ts-ignore
     */
// @ts-ignore
    editor_name?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosImage {
// @ts-ignore
    /**
// @ts-ignore
     * Height of the photo in px.
// @ts-ignore
     */
// @ts-ignore
    height?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo URL.
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Width of the photo in px.
// @ts-ignore
     */
// @ts-ignore
    width?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type PhotosImageType = "s" | "m" | "x" | "l" | "o" | "p" | "q" | "r" | "y" | "z" | "w";
// @ts-ignore

// @ts-ignore
export interface PhotosPhoto {
// @ts-ignore
    /**
// @ts-ignore
     * Access key for the photo
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Album ID
// @ts-ignore
     */
// @ts-ignore
    album_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when uploaded
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Original photo height
// @ts-ignore
     */
// @ts-ignore
    height?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Latitude
// @ts-ignore
     */
// @ts-ignore
    lat?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Longitude
// @ts-ignore
     */
// @ts-ignore
    long?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo owner's ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of image with 2560 px width
// @ts-ignore
     */
// @ts-ignore
    photo_256?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Post ID
// @ts-ignore
     */
// @ts-ignore
    post_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo caption
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user who have uploaded the photo
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Original photo width
// @ts-ignore
     */
// @ts-ignore
    width?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Whether photo has attached tag links
// @ts-ignore
     */
// @ts-ignore
    has_tags?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    images?: PhotosImage[];
// @ts-ignore
    place?: string;
// @ts-ignore
    sizes?: PhotosPhotoSizes[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosPhotoAlbum {
// @ts-ignore
    /**
// @ts-ignore
     * Date when the album has been created in Unixtime
// @ts-ignore
     */
// @ts-ignore
    created?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo album description
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Photo album ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Album owner's ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photos number
// @ts-ignore
     */
// @ts-ignore
    size?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo album title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Date when the album has been updated last time in Unixtime
// @ts-ignore
     */
// @ts-ignore
    updated?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosPhotoAlbumFull {
// @ts-ignore
    /**
// @ts-ignore
     * Date when the album has been created in Unixtime
// @ts-ignore
     */
// @ts-ignore
    created?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo album description
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    /**
// @ts-ignore
     * album can delete
// @ts-ignore
     */
// @ts-ignore
    can_delete?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo album ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Album owner's ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photos number
// @ts-ignore
     */
// @ts-ignore
    size?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Thumb photo ID
// @ts-ignore
     */
// @ts-ignore
    thumb_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the thumb image
// @ts-ignore
     */
// @ts-ignore
    thumb_src?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Photo album title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Date when the album has been updated last time in Unixtime
// @ts-ignore
     */
// @ts-ignore
    updated?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    sizes?: PhotosPhotoSizes[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type PhotosPhotoFalseable = any;
// @ts-ignore

// @ts-ignore
export interface PhotosPhotoFullXtrRealOffset {
// @ts-ignore
    /**
// @ts-ignore
     * Access key for the photo
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Album ID
// @ts-ignore
     */
// @ts-ignore
    album_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when uploaded
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Original photo height
// @ts-ignore
     */
// @ts-ignore
    height?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Latitude
// @ts-ignore
     */
// @ts-ignore
    lat?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Longitude
// @ts-ignore
     */
// @ts-ignore
    long?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo owner's ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of image with 1280 px width
// @ts-ignore
     */
// @ts-ignore
    photo_1280?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of image with 130 px width
// @ts-ignore
     */
// @ts-ignore
    photo_130?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of image with 2560 px width
// @ts-ignore
     */
// @ts-ignore
    photo_2560?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of image with 604 px width
// @ts-ignore
     */
// @ts-ignore
    photo_604?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of image with 75 px width
// @ts-ignore
     */
// @ts-ignore
    photo_75?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of image with 807 px width
// @ts-ignore
     */
// @ts-ignore
    photo_807?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Post ID
// @ts-ignore
     */
// @ts-ignore
    post_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Real position of the photo
// @ts-ignore
     */
// @ts-ignore
    real_offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo caption
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user who have uploaded the photo
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Original photo width
// @ts-ignore
     */
// @ts-ignore
    width?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    sizes?: PhotosPhotoSizes[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosPhotoSizes {
// @ts-ignore
    /**
// @ts-ignore
     * Height in px
// @ts-ignore
     */
// @ts-ignore
    height?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the image
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the image
// @ts-ignore
     */
// @ts-ignore
    src?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Width in px
// @ts-ignore
     */
// @ts-ignore
    width?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type PhotosPhotoSizesType = "s" | "m" | "x" | "o" | "p" | "q" | "r" | "k" | "l" | "y" | "z" | "c" | "w" | "a" | "b" | "e" | "i" | "d" | "j" | "temp" | "h" | "g" | "n" | "f" | "max";
// @ts-ignore

// @ts-ignore
export interface PhotosPhotoTag {
// @ts-ignore
    /**
// @ts-ignore
     * Date when tag has been added in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Tag ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the tag creator
// @ts-ignore
     */
// @ts-ignore
    placer_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Tag description
// @ts-ignore
     */
// @ts-ignore
    tagged_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Tagged description.
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Tagged user ID
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Coordinate X of the left upper corner
// @ts-ignore
     */
// @ts-ignore
    x?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Coordinate X of the right lower corner
// @ts-ignore
     */
// @ts-ignore
    x2?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Coordinate Y of the left upper corner
// @ts-ignore
     */
// @ts-ignore
    y?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Coordinate Y of the right lower corner
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
export interface PhotosPhotoUpload {
// @ts-ignore
    /**
// @ts-ignore
     * Album ID
// @ts-ignore
     */
// @ts-ignore
    album_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL to upload photo
// @ts-ignore
     */
// @ts-ignore
    upload_url: string;
// @ts-ignore
    /**
// @ts-ignore
     * Fallback URL if upload_url returned error
// @ts-ignore
     */
// @ts-ignore
    fallback_upload_url?: string;
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
export interface PhotosPhotoXtrRealOffset {
// @ts-ignore
    /**
// @ts-ignore
     * Access key for the photo
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Album ID
// @ts-ignore
     */
// @ts-ignore
    album_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when uploaded
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Original photo height
// @ts-ignore
     */
// @ts-ignore
    height?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Latitude
// @ts-ignore
     */
// @ts-ignore
    lat?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Longitude
// @ts-ignore
     */
// @ts-ignore
    long?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo owner's ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of image with 1280 px width
// @ts-ignore
     */
// @ts-ignore
    photo_1280?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of image with 130 px width
// @ts-ignore
     */
// @ts-ignore
    photo_130?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of image with 2560 px width
// @ts-ignore
     */
// @ts-ignore
    photo_2560?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of image with 604 px width
// @ts-ignore
     */
// @ts-ignore
    photo_604?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of image with 75 px width
// @ts-ignore
     */
// @ts-ignore
    photo_75?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of image with 807 px width
// @ts-ignore
     */
// @ts-ignore
    photo_807?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Post ID
// @ts-ignore
     */
// @ts-ignore
    post_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Real position of the photo
// @ts-ignore
     */
// @ts-ignore
    real_offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo caption
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user who have uploaded the photo
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Original photo width
// @ts-ignore
     */
// @ts-ignore
    width?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    sizes?: PhotosPhotoSizes[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosPhotoXtrTagInfo {
// @ts-ignore
    /**
// @ts-ignore
     * Access key for the photo
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Album ID
// @ts-ignore
     */
// @ts-ignore
    album_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when uploaded
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Original photo height
// @ts-ignore
     */
// @ts-ignore
    height?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Latitude
// @ts-ignore
     */
// @ts-ignore
    lat?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Longitude
// @ts-ignore
     */
// @ts-ignore
    long?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo owner's ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of image with 1280 px width
// @ts-ignore
     */
// @ts-ignore
    photo_1280?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of image with 130 px width
// @ts-ignore
     */
// @ts-ignore
    photo_130?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of image with 2560 px width
// @ts-ignore
     */
// @ts-ignore
    photo_2560?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of image with 604 px width
// @ts-ignore
     */
// @ts-ignore
    photo_604?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of image with 75 px width
// @ts-ignore
     */
// @ts-ignore
    photo_75?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of image with 807 px width
// @ts-ignore
     */
// @ts-ignore
    photo_807?: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the tag creator
// @ts-ignore
     */
// @ts-ignore
    placer_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Post ID
// @ts-ignore
     */
// @ts-ignore
    post_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when tag has been added in Unixtime
// @ts-ignore
     */
// @ts-ignore
    tag_created?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Tag ID
// @ts-ignore
     */
// @ts-ignore
    tag_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo caption
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user who have uploaded the photo
// @ts-ignore
     */
// @ts-ignore
    user_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Original photo width
// @ts-ignore
     */
// @ts-ignore
    width?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    sizes?: PhotosPhotoSizes[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosTagsSuggestionItem {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    title?: string;
// @ts-ignore
    caption?: string;
// @ts-ignore
    type?: string;
// @ts-ignore
    buttons?: PhotosTagsSuggestionItemButton[];
// @ts-ignore
    tags?: PhotosPhotoTag[];
// @ts-ignore
    track_code?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PhotosTagsSuggestionItemButton {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    title?: string;
// @ts-ignore
    action?: "confirm" | "decline" | "show_tags";
// @ts-ignore
    style?: "primary" | "secondary";
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PodcastCover {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    sizes?: PhotosPhotoSizes[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PodcastExternalData {
// @ts-ignore
    /**
// @ts-ignore
     * Url of the podcast page
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Url of the podcasts owner community
// @ts-ignore
     */
// @ts-ignore
    owner_url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Podcast title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Name of the podcasts owner community
// @ts-ignore
     */
// @ts-ignore
    owner_name?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PollsAnswer {
// @ts-ignore
    /**
// @ts-ignore
     * Answer ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Answer rate in percents
// @ts-ignore
     */
// @ts-ignore
    rate?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Answer text
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Votes number
// @ts-ignore
     */
// @ts-ignore
    votes?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PollsBackground {
// @ts-ignore
    /**
// @ts-ignore
     * Gradient angle with 0 on positive X axis
// @ts-ignore
     */
// @ts-ignore
    angle?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Hex color code without #
// @ts-ignore
     */
// @ts-ignore
    color?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Original height of pattern tile
// @ts-ignore
     */
// @ts-ignore
    height?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Original with of pattern tile
// @ts-ignore
     */
// @ts-ignore
    width?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    id?: number;
// @ts-ignore
    name?: string;
// @ts-ignore
    images?: BaseImage[];
// @ts-ignore
    points?: BaseGradientPoint[];
// @ts-ignore
    type?: "gradient" | "tile";
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PollsFriend {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PollsPoll {
// @ts-ignore
    /**
// @ts-ignore
     * Information whether the poll with multiple choices
// @ts-ignore
     */
// @ts-ignore
    multiple?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Current user's answer ID
// @ts-ignore
     */
// @ts-ignore
    answer_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when poll has been created in Unixtime
// @ts-ignore
     */
// @ts-ignore
    created?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Poll ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Poll owner's ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Poll author's ID
// @ts-ignore
     */
// @ts-ignore
    author_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Poll question
// @ts-ignore
     */
// @ts-ignore
    question?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Votes number
// @ts-ignore
     */
// @ts-ignore
    votes?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    friends?: PollsFriend[];
// @ts-ignore
    end_date?: number;
// @ts-ignore
    answer_ids?: number[];
// @ts-ignore
    closed?: boolean | number;
// @ts-ignore
    is_board?: boolean | number;
// @ts-ignore
    can_edit?: boolean | number;
// @ts-ignore
    can_vote?: boolean | number;
// @ts-ignore
    can_report?: boolean | number;
// @ts-ignore
    can_share?: boolean | number;
// @ts-ignore
    embed_hash?: string;
// @ts-ignore
    answers?: PollsAnswer[];
// @ts-ignore
    disable_unvote?: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type PollsPollAnonymous = boolean | number;
// @ts-ignore

// @ts-ignore
export interface PollsVoters {
// @ts-ignore
    /**
// @ts-ignore
     * Answer ID
// @ts-ignore
     */
// @ts-ignore
    answer_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PollsVotersUsers {
// @ts-ignore
    /**
// @ts-ignore
     * Votes number
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    items?: number[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface PrettyCardsPrettyCard {
// @ts-ignore
    /**
// @ts-ignore
     * Button text in current language
// @ts-ignore
     */
// @ts-ignore
    button_text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Card ID (long int returned as string)
// @ts-ignore
     */
// @ts-ignore
    card_id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link URL
// @ts-ignore
     */
// @ts-ignore
    link_url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Photo ID (format "<owner_id>_<media_id>")
// @ts-ignore
     */
// @ts-ignore
    photo?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Price if set (decimal number returned as string)
// @ts-ignore
     */
// @ts-ignore
    price?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Old price if set (decimal number returned as string)
// @ts-ignore
     */
// @ts-ignore
    price_old?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    images?: BaseImage[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type PrettyCardsPrettyCardOrError = any;
// @ts-ignore

// @ts-ignore
export interface SearchHint {
// @ts-ignore
    /**
// @ts-ignore
     * Object description
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type SearchHintSection = "groups" | "events" | "publics" | "correspondents" | "people" | "friends" | "mutual_friends" | "promo";
// @ts-ignore

// @ts-ignore
export type SearchHintType = "group" | "profile" | "vk_app" | "app" | "html5_game" | "link";
// @ts-ignore

// @ts-ignore
export interface SecureGiveEventStickerItem {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    user_id?: number;
// @ts-ignore
    status?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface SecureLevel {
// @ts-ignore
    /**
// @ts-ignore
     * Level
// @ts-ignore
     */
// @ts-ignore
    level?: number;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    uid?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface SecureSetCounterItem {
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface SecureSmsNotification {
// @ts-ignore
    /**
// @ts-ignore
     * Application ID
// @ts-ignore
     */
// @ts-ignore
    app_id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Date when message has been sent in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Notification ID
// @ts-ignore
     */
// @ts-ignore
    id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Messsage text
// @ts-ignore
     */
// @ts-ignore
    message?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    user_id?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface SecureTokenChecked {
// @ts-ignore
    /**
// @ts-ignore
     * Date when access_token has been generated in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when access_token will expire in Unixtime
// @ts-ignore
     */
// @ts-ignore
    expire?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Returns if successfully processed
// @ts-ignore
     */
// @ts-ignore
    success?: number;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
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
export interface SecureTransaction {
// @ts-ignore
    /**
// @ts-ignore
     * Transaction date in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Transaction ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * From ID
// @ts-ignore
     */
// @ts-ignore
    uid_from?: number;
// @ts-ignore
    /**
// @ts-ignore
     * To ID
// @ts-ignore
     */
// @ts-ignore
    uid_to?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Votes number
// @ts-ignore
     */
// @ts-ignore
    votes?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/*Activity stats*/
// @ts-ignore
export interface StatsActivity {
// @ts-ignore
    /**
// @ts-ignore
     * Comments number
// @ts-ignore
     */
// @ts-ignore
    comments?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Reposts number
// @ts-ignore
     */
// @ts-ignore
    copies?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Hidden from news count
// @ts-ignore
     */
// @ts-ignore
    hidden?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Likes number
// @ts-ignore
     */
// @ts-ignore
    likes?: number;
// @ts-ignore
    /**
// @ts-ignore
     * New subscribers count
// @ts-ignore
     */
// @ts-ignore
    subscribed?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Unsubscribed count
// @ts-ignore
     */
// @ts-ignore
    unsubscribed?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StatsCity {
// @ts-ignore
    /**
// @ts-ignore
     * Visitors number
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * City name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * City ID
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
export interface StatsCountry {
// @ts-ignore
    /**
// @ts-ignore
     * Country code
// @ts-ignore
     */
// @ts-ignore
    code?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Visitors number
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Country name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Country ID
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
export interface StatsPeriod {
// @ts-ignore
    /**
// @ts-ignore
     * Unix timestamp
// @ts-ignore
     */
// @ts-ignore
    period_from?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Unix timestamp
// @ts-ignore
     */
// @ts-ignore
    period_to?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/*Reach stats*/
// @ts-ignore
export interface StatsReach {
// @ts-ignore
    /**
// @ts-ignore
     * Reach count from mobile devices
// @ts-ignore
     */
// @ts-ignore
    mobile_reach?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Reach count
// @ts-ignore
     */
// @ts-ignore
    reach?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Subscribers reach count
// @ts-ignore
     */
// @ts-ignore
    reach_subscribers?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    age?: StatsSexAge[];
// @ts-ignore
    cities?: StatsCity[];
// @ts-ignore
    countries?: StatsCountry[];
// @ts-ignore
    sex?: StatsSexAge[];
// @ts-ignore
    sex_age?: StatsSexAge[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StatsSexAge {
// @ts-ignore
    /**
// @ts-ignore
     * Visitors number
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Sex/age value
// @ts-ignore
     */
// @ts-ignore
    value?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    reach?: number;
// @ts-ignore
    reach_subscribers?: number;
// @ts-ignore
    count_subscribers?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/*Views stats*/
// @ts-ignore
export interface StatsViews {
// @ts-ignore
    /**
// @ts-ignore
     * Number of views from mobile devices
// @ts-ignore
     */
// @ts-ignore
    mobile_views?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Views number
// @ts-ignore
     */
// @ts-ignore
    views?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Visitors number
// @ts-ignore
     */
// @ts-ignore
    visitors?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    age?: StatsSexAge[];
// @ts-ignore
    cities?: StatsCity[];
// @ts-ignore
    countries?: StatsCountry[];
// @ts-ignore
    sex?: StatsSexAge[];
// @ts-ignore
    sex_age?: StatsSexAge[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StatsWallpostStat {
// @ts-ignore
    /**
// @ts-ignore
     * Hidings number
// @ts-ignore
     */
// @ts-ignore
    hide?: number;
// @ts-ignore
    /**
// @ts-ignore
     * People have joined the group
// @ts-ignore
     */
// @ts-ignore
    join_group?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Link clickthrough
// @ts-ignore
     */
// @ts-ignore
    links?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Subscribers reach
// @ts-ignore
     */
// @ts-ignore
    reach_subscribers?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Total reach
// @ts-ignore
     */
// @ts-ignore
    reach_total?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Reports number
// @ts-ignore
     */
// @ts-ignore
    report?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Clickthrough to community
// @ts-ignore
     */
// @ts-ignore
    to_group?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Unsubscribed members
// @ts-ignore
     */
// @ts-ignore
    unsubscribe?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    post_id?: number;
// @ts-ignore
    reach_subscribers_count?: number;
// @ts-ignore
    reach_total_count?: number;
// @ts-ignore
    reach_viral?: number;
// @ts-ignore
    reach_ads?: number;
// @ts-ignore
    sex_age?: StatsSexAge[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StatusStatus {
// @ts-ignore
    /**
// @ts-ignore
     * Status text
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
export interface StickersImageSet {
// @ts-ignore
    /**
// @ts-ignore
     * Base URL for images in set
// @ts-ignore
     */
// @ts-ignore
    base_url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Version number to be appended to the image URL
// @ts-ignore
     */
// @ts-ignore
    version?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StorageValue {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    key?: string;
// @ts-ignore
    value?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoreProduct {
// @ts-ignore
    /**
// @ts-ignore
     * Id of the product
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Product type
// @ts-ignore
     */
// @ts-ignore
    type?: "stickers";
// @ts-ignore
    /**
// @ts-ignore
     * Information whether sticker product wasn't used after being purchased
// @ts-ignore
     */
// @ts-ignore
    is_new?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Date (Unix time) when the product was purchased
// @ts-ignore
     */
// @ts-ignore
    purchase_date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Title of the product
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether the product is an animated sticker pack (for stickers product type)
// @ts-ignore
     */
// @ts-ignore
    has_animation?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Subtitle of the product
// @ts-ignore
     */
// @ts-ignore
    subtitle?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    style_sticker_ids?: number[];
// @ts-ignore
    previews?: BaseImage[];
// @ts-ignore
    payment_region?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type StoreProductIcon = BaseImage[];
// @ts-ignore

// @ts-ignore
export interface StoreStickersKeyword {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    words?: string[];
// @ts-ignore
    stickers?: StoreStickersKeywordSticker[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoreStickersKeywordSticker {
// @ts-ignore
    /**
// @ts-ignore
     * Pack id
// @ts-ignore
     */
// @ts-ignore
    pack_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Sticker id
// @ts-ignore
     */
// @ts-ignore
    sticker_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type StoreStickersKeywordStickers = BaseStickersList;
// @ts-ignore

// @ts-ignore
export interface StoriesClickableArea {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    x?: number;
// @ts-ignore
    y?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesClickableSticker {
// @ts-ignore
    /**
// @ts-ignore
     * Clickable sticker ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Color, hex format
// @ts-ignore
     */
// @ts-ignore
    color?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Sticker ID
// @ts-ignore
     */
// @ts-ignore
    sticker_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Sticker pack ID
// @ts-ignore
     */
// @ts-ignore
    sticker_pack_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Additional context for app sticker
// @ts-ignore
     */
// @ts-ignore
    app_context?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Whether current user has unread interaction with this app
// @ts-ignore
     */
// @ts-ignore
    has_new_interactions?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Whether current user allowed broadcast notify from this app
// @ts-ignore
     */
// @ts-ignore
    is_broadcast_notify_allowed?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    clickable_area?: StoriesClickableArea[];
// @ts-ignore
    hashtag?: string;
// @ts-ignore
    mention?: string;
// @ts-ignore
    tooltip_text?: string;
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    story_id?: number;
// @ts-ignore
    question?: string;
// @ts-ignore
    question_button?: string;
// @ts-ignore
    place_id?: number;
// @ts-ignore
    audio_start_time?: number;
// @ts-ignore
    style?: "transparent" | "blue_gradient" | "red_gradient" | "underline" | "blue" | "green" | "white" | "question_reply" | "light" | "impressive";
// @ts-ignore
    type?: "hashtag" | "mention" | "link" | "question" | "place" | "market_item" | "music" | "story_reply" | "owner" | "post" | "poll" | "sticker" | "app" | "situational_theme";
// @ts-ignore
    subtype?: "market_item" | "aliexpress_product";
// @ts-ignore
    post_owner_id?: number;
// @ts-ignore
    post_id?: number;
// @ts-ignore
    situational_theme_id?: number;
// @ts-ignore
    situational_app_url?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesClickableStickers {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    clickable_stickers?: StoriesClickableSticker[];
// @ts-ignore
    original_height?: number;
// @ts-ignore
    original_width?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesFeedItem {
// @ts-ignore
    /**
// @ts-ignore
     * Type of Feed Item
// @ts-ignore
     */
// @ts-ignore
    type?: "promo_stories" | "stories" | "live_active" | "live_finished" | "community_grouped_stories" | "app_grouped_stories" | "birthday";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    id?: string;
// @ts-ignore
    stories?: StoriesStory[];
// @ts-ignore
    grouped?: StoriesFeedItem[];
// @ts-ignore
    birthday_user_id?: number;
// @ts-ignore
    track_code?: string;
// @ts-ignore
    has_unseen?: boolean | number;
// @ts-ignore
    name?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/*Additional data for promo stories*/
// @ts-ignore
export interface StoriesPromoBlock {
// @ts-ignore
    /**
// @ts-ignore
     * Promo story title
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * RL of square photo of the story with 50 pixels in width
// @ts-ignore
     */
// @ts-ignore
    photo_50?: string;
// @ts-ignore
    /**
// @ts-ignore
     * RL of square photo of the story with 100 pixels in width
// @ts-ignore
     */
// @ts-ignore
    photo_100?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Hide animation for promo story
// @ts-ignore
     */
// @ts-ignore
    not_animated?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesReplies {
// @ts-ignore
    /**
// @ts-ignore
     * Replies number.
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * New replies number.
// @ts-ignore
     */
// @ts-ignore
    new?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesStatLine {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    name?: string;
// @ts-ignore
    counter?: number;
// @ts-ignore
    is_unavailable?: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesStory {
// @ts-ignore
    /**
// @ts-ignore
     * Access key for private object.
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether current user can like the story.
// @ts-ignore
     */
// @ts-ignore
    can_like?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when story has been added in Unixtime.
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Story expiration time. Unixtime.
// @ts-ignore
     */
// @ts-ignore
    expires_at?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Story ID.
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether the story is deleted (false - no, true - yes).
// @ts-ignore
     */
// @ts-ignore
    is_deleted?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether the story is expired (false - no, true - yes).
// @ts-ignore
     */
// @ts-ignore
    is_expired?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Story owner's ID.
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Access key for private object.
// @ts-ignore
     */
// @ts-ignore
    parent_story_access_key?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Parent story ID.
// @ts-ignore
     */
// @ts-ignore
    parent_story_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Parent story owner's ID.
// @ts-ignore
     */
// @ts-ignore
    parent_story_owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Views number.
// @ts-ignore
     */
// @ts-ignore
    views?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    narratives_count?: number;
// @ts-ignore
    first_narrative_title?: string;
// @ts-ignore
    birthday_wish_user_id?: number;
// @ts-ignore
    can_use_in_narrative?: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesStoryLink {
// @ts-ignore
    /**
// @ts-ignore
     * Link text
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link URL
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * How to open url
// @ts-ignore
     */
// @ts-ignore
    link_url_target?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesStoryStats {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface StoriesStoryStatsStat {
// @ts-ignore
    /**
// @ts-ignore
     * Stat value
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
export type StoriesStoryStatsState = "on" | "off" | "hidden";
// @ts-ignore

// @ts-ignore
export type StoriesStoryType = "photo" | "video" | "live_active" | "live_finished" | "birthday_invite";
// @ts-ignore

// @ts-ignore
export type StoriesUploadLinkText = "to_store" | "vote" | "more" | "book" | "order" | "enroll" | "fill" | "signup" | "buy" | "ticket" | "write" | "open" | "learn_more" | "view" | "go_to" | "contact" | "watch" | "play" | "install" | "read" | "calendar";
// @ts-ignore

// @ts-ignore
export interface StoriesViewersItem {
// @ts-ignore
    /**
// @ts-ignore
     * user has like for this object
// @ts-ignore
     */
// @ts-ignore
    is_liked?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * user id
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
export interface UsersCareer {
// @ts-ignore
    /**
// @ts-ignore
     * City ID
// @ts-ignore
     */
// @ts-ignore
    city_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * City name
// @ts-ignore
     */
// @ts-ignore
    city_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Company name
// @ts-ignore
     */
// @ts-ignore
    company?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Country ID
// @ts-ignore
     */
// @ts-ignore
    country_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * From year
// @ts-ignore
     */
// @ts-ignore
    from?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Community ID
// @ts-ignore
     */
// @ts-ignore
    group_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Career ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Position
// @ts-ignore
     */
// @ts-ignore
    position?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Till year
// @ts-ignore
     */
// @ts-ignore
    until?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UsersExports {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    facebook?: number;
// @ts-ignore
    livejournal?: number;
// @ts-ignore
    twitter?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type UsersFields = "first_name_nom" | "first_name_gen" | "first_name_dat" | "first_name_acc" | "first_name_ins" | "first_name_abl" | "last_name_nom" | "last_name_gen" | "last_name_dat" | "last_name_acc" | "last_name_ins" | "last_name_abl" | "photo_id" | "verified" | "sex" | "bdate" | "bdate_visibility" | "city" | "country" | "home_town" | "has_photo" | "photo" | "photo_rec" | "photo_50" | "photo_100" | "photo_200_orig" | "photo_200" | "photo_400" | "photo_400_orig" | "photo_big" | "photo_medium" | "photo_medium_rec" | "photo_max" | "photo_max_orig" | "photo_max_size" | "third_party_buttons" | "online" | "lists" | "domain" | "has_mobile" | "contacts" | "language" | "site" | "education" | "universities" | "schools" | "status" | "last_seen" | "followers_count" | "counters" | "common_count" | "online_info" | "occupation" | "nickname" | "relatives" | "relation" | "personal" | "connections" | "exports" | "wall_comments" | "wall_default" | "activities" | "activity" | "interests" | "music" | "movies" | "tv" | "books" | "is_no_index" | "games" | "about" | "quotes" | "can_post" | "can_see_all_posts" | "can_see_audio" | "can_see_gifts" | "work" | "places" | "can_write_private_message" | "can_send_friend_request" | "can_upload_doc" | "is_favorite" | "is_hidden_from_feed" | "timezone" | "screen_name" | "maiden_name" | "crop_photo" | "is_friend" | "friend_status" | "career" | "military" | "blacklisted" | "blacklisted_by_me" | "can_subscribe_posts" | "descriptions" | "trending" | "mutual" | "friendship_weeks" | "can_invite_to_chats" | "stories_archive_count" | "has_unseen_stories" | "video_live" | "video_live_level" | "video_live_count" | "clips_count" | "service_description" | "can_see_wishes" | "is_subscribed_podcasts" | "can_subscribe_podcasts";
// @ts-ignore

// @ts-ignore
export interface UsersLastSeen {
// @ts-ignore
    /**
// @ts-ignore
     * Type of the platform that used for the last authorization
// @ts-ignore
     */
// @ts-ignore
    platform?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Last visit date (in Unix time)
// @ts-ignore
     */
// @ts-ignore
    time?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UsersMilitary {
// @ts-ignore
    /**
// @ts-ignore
     * Country ID
// @ts-ignore
     */
// @ts-ignore
    country_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * From year
// @ts-ignore
     */
// @ts-ignore
    from?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Military ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Unit name
// @ts-ignore
     */
// @ts-ignore
    unit?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Unit ID
// @ts-ignore
     */
// @ts-ignore
    unit_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Till year
// @ts-ignore
     */
// @ts-ignore
    until?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UsersOccupation {
// @ts-ignore
    /**
// @ts-ignore
     * ID of school, university, company group
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Name of occupation
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Type of occupation
// @ts-ignore
     */
// @ts-ignore
    type?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UsersOnlineInfo {
// @ts-ignore
    /**
// @ts-ignore
     * Whether you can see real online status of user or not
// @ts-ignore
     */
// @ts-ignore
    visible?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Last time we saw user being active
// @ts-ignore
     */
// @ts-ignore
    last_seen?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Whether user is currently online or not
// @ts-ignore
     */
// @ts-ignore
    is_online?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Application id from which user is currently online or was last seen online
// @ts-ignore
     */
// @ts-ignore
    app_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Is user online from desktop app or mobile app
// @ts-ignore
     */
// @ts-ignore
    is_mobile?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * In case user online is not visible, it indicates approximate timeframe of user online
// @ts-ignore
     */
// @ts-ignore
    status?: "recently" | "last_week" | "last_month" | "long_ago" | "not_show";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UsersPersonal {
// @ts-ignore
    /**
// @ts-ignore
     * User's views on alcohol
// @ts-ignore
     */
// @ts-ignore
    alcohol?: number;
// @ts-ignore
    /**
// @ts-ignore
     * User's inspired by
// @ts-ignore
     */
// @ts-ignore
    inspired_by?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's languages
// @ts-ignore
     */
// @ts-ignore
    langs?: string[];
// @ts-ignore
    /**
// @ts-ignore
     * User's personal priority in life
// @ts-ignore
     */
// @ts-ignore
    life_main?: number;
// @ts-ignore
    /**
// @ts-ignore
     * User's personal priority in people
// @ts-ignore
     */
// @ts-ignore
    people_main?: number;
// @ts-ignore
    /**
// @ts-ignore
     * User's political views
// @ts-ignore
     */
// @ts-ignore
    political?: number;
// @ts-ignore
    /**
// @ts-ignore
     * User's religion
// @ts-ignore
     */
// @ts-ignore
    religion?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's religion id
// @ts-ignore
     */
// @ts-ignore
    religion_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * User's views on smoking
// @ts-ignore
     */
// @ts-ignore
    smoking?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UsersRelative {
// @ts-ignore
    /**
// @ts-ignore
     * Date of child birthday (format dd.mm.yyyy)
// @ts-ignore
     */
// @ts-ignore
    birth_date?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Relative ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Name of relative
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Relative type
// @ts-ignore
     */
// @ts-ignore
    type?: "parent" | "child" | "grandparent" | "grandchild" | "sibling";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UsersSchool {
// @ts-ignore
    /**
// @ts-ignore
     * City ID
// @ts-ignore
     */
// @ts-ignore
    city?: number;
// @ts-ignore
    /**
// @ts-ignore
     * School class letter
// @ts-ignore
     */
// @ts-ignore
    class?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Country ID
// @ts-ignore
     */
// @ts-ignore
    country?: number;
// @ts-ignore
    /**
// @ts-ignore
     * School ID
// @ts-ignore
     */
// @ts-ignore
    id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * School name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * School type ID
// @ts-ignore
     */
// @ts-ignore
    type?: number;
// @ts-ignore
    /**
// @ts-ignore
     * School type name
// @ts-ignore
     */
// @ts-ignore
    type_str?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Year the user started to study
// @ts-ignore
     */
// @ts-ignore
    year_from?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Graduation year
// @ts-ignore
     */
// @ts-ignore
    year_graduated?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Year the user finished to study
// @ts-ignore
     */
// @ts-ignore
    year_to?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    speciality?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type UsersSubscriptionsItem = any;
// @ts-ignore

// @ts-ignore
export interface UsersUniversity {
// @ts-ignore
    /**
// @ts-ignore
     * Chair ID
// @ts-ignore
     */
// @ts-ignore
    chair?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Chair name
// @ts-ignore
     */
// @ts-ignore
    chair_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * City ID
// @ts-ignore
     */
// @ts-ignore
    city?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Country ID
// @ts-ignore
     */
// @ts-ignore
    country?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Education form
// @ts-ignore
     */
// @ts-ignore
    education_form?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Education status
// @ts-ignore
     */
// @ts-ignore
    education_status?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Faculty ID
// @ts-ignore
     */
// @ts-ignore
    faculty?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Faculty name
// @ts-ignore
     */
// @ts-ignore
    faculty_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Graduation year
// @ts-ignore
     */
// @ts-ignore
    graduation?: number;
// @ts-ignore
    /**
// @ts-ignore
     * University ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * University name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    university_group_id?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UsersUser1 {
// @ts-ignore
    /**
// @ts-ignore
     * Domain name of the user's page
// @ts-ignore
     */
// @ts-ignore
    screen_name: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of square photo of the user with 50 pixels in width
// @ts-ignore
     */
// @ts-ignore
    photo_50: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of square photo of the user with 100 pixels in width
// @ts-ignore
     */
// @ts-ignore
    photo_100: string;
// @ts-ignore
    /**
// @ts-ignore
     * Application ID
// @ts-ignore
     */
// @ts-ignore
    online_app: number;
// @ts-ignore
    sex: BaseSex;
// @ts-ignore
    online_info: UsersOnlineInfo;
// @ts-ignore
    online: BaseBoolInt;
// @ts-ignore
    online_mobile: BaseBoolInt;
// @ts-ignore
    verified: BaseBoolInt;
// @ts-ignore
    trending: BaseBoolInt;
// @ts-ignore
    friend_status: FriendsFriendStatusStatus;
// @ts-ignore
    mutual: FriendsRequestsMutual;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type UsersUser = UsersUserMin & UsersUser1;
// @ts-ignore

// @ts-ignore
export interface UsersUserConnections {
// @ts-ignore
    /**
// @ts-ignore
     * User's Skype nickname
// @ts-ignore
     */
// @ts-ignore
    skype?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's Facebook account
// @ts-ignore
     */
// @ts-ignore
    facebook?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's Facebook name
// @ts-ignore
     */
// @ts-ignore
    facebook_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's Twitter account
// @ts-ignore
     */
// @ts-ignore
    twitter?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's Livejournal account
// @ts-ignore
     */
// @ts-ignore
    livejournal?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's Instagram account
// @ts-ignore
     */
// @ts-ignore
    instagram?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UsersUserCounters {
// @ts-ignore
    /**
// @ts-ignore
     * Albums number
// @ts-ignore
     */
// @ts-ignore
    albums?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Badges number
// @ts-ignore
     */
// @ts-ignore
    badges?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Audios number
// @ts-ignore
     */
// @ts-ignore
    audios?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Followers number
// @ts-ignore
     */
// @ts-ignore
    followers?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Friends number
// @ts-ignore
     */
// @ts-ignore
    friends?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Gifts number
// @ts-ignore
     */
// @ts-ignore
    gifts?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Communities number
// @ts-ignore
     */
// @ts-ignore
    groups?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Notes number
// @ts-ignore
     */
// @ts-ignore
    notes?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Online friends number
// @ts-ignore
     */
// @ts-ignore
    online_friends?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Public pages number
// @ts-ignore
     */
// @ts-ignore
    pages?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photos number
// @ts-ignore
     */
// @ts-ignore
    photos?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Subscriptions number
// @ts-ignore
     */
// @ts-ignore
    subscriptions?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of photos with user
// @ts-ignore
     */
// @ts-ignore
    user_photos?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of videos with user
// @ts-ignore
     */
// @ts-ignore
    user_videos?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Videos number
// @ts-ignore
     */
// @ts-ignore
    videos?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    new_photo_tags?: number;
// @ts-ignore
    new_recognition_tags?: number;
// @ts-ignore
    mutual_friends?: number;
// @ts-ignore
    posts?: number;
// @ts-ignore
    articles?: number;
// @ts-ignore
    wishes?: number;
// @ts-ignore
    podcasts?: number;
// @ts-ignore
    clips?: number;
// @ts-ignore
    clips_followers?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UsersUserFull1 {
// @ts-ignore
    /**
// @ts-ignore
     * User's first name in nominative case
// @ts-ignore
     */
// @ts-ignore
    first_name_nom: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's first name in genitive case
// @ts-ignore
     */
// @ts-ignore
    first_name_gen: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's first name in dative case
// @ts-ignore
     */
// @ts-ignore
    first_name_dat: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's first name in accusative case
// @ts-ignore
     */
// @ts-ignore
    first_name_acc: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's first name in instrumental case
// @ts-ignore
     */
// @ts-ignore
    first_name_ins: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's first name in prepositional case
// @ts-ignore
     */
// @ts-ignore
    first_name_abl: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's last name in nominative case
// @ts-ignore
     */
// @ts-ignore
    last_name_nom: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's last name in genitive case
// @ts-ignore
     */
// @ts-ignore
    last_name_gen: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's last name in dative case
// @ts-ignore
     */
// @ts-ignore
    last_name_dat: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's last name in accusative case
// @ts-ignore
     */
// @ts-ignore
    last_name_acc: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's last name in instrumental case
// @ts-ignore
     */
// @ts-ignore
    last_name_ins: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's last name in prepositional case
// @ts-ignore
     */
// @ts-ignore
    last_name_abl: string;
// @ts-ignore
    /**
// @ts-ignore
     * User nickname
// @ts-ignore
     */
// @ts-ignore
    nickname: string;
// @ts-ignore
    /**
// @ts-ignore
     * User maiden name
// @ts-ignore
     */
// @ts-ignore
    maiden_name: string;
// @ts-ignore
    /**
// @ts-ignore
     * User contact name
// @ts-ignore
     */
// @ts-ignore
    contact_name: string;
// @ts-ignore
    /**
// @ts-ignore
     * Domain name of the user's page
// @ts-ignore
     */
// @ts-ignore
    domain: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's date of birth
// @ts-ignore
     */
// @ts-ignore
    bdate: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's timezone
// @ts-ignore
     */
// @ts-ignore
    timezone: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of square photo of the user with 200 pixels in width
// @ts-ignore
     */
// @ts-ignore
    photo_200: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of square photo of the user with maximum width
// @ts-ignore
     */
// @ts-ignore
    photo_max: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of user's photo with 200 pixels in width
// @ts-ignore
     */
// @ts-ignore
    photo_200_orig: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of user's photo with 400 pixels in width
// @ts-ignore
     */
// @ts-ignore
    photo_400_orig: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of user's photo of maximum size
// @ts-ignore
     */
// @ts-ignore
    photo_max_orig: string;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the user's main photo
// @ts-ignore
     */
// @ts-ignore
    photo_id: string;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether current user can call
// @ts-ignore
     */
// @ts-ignore
    can_call: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether group can call user
// @ts-ignore
     */
// @ts-ignore
    can_call_from_group: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether current user can see the user's wishes
// @ts-ignore
     */
// @ts-ignore
    can_see_wishes: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether current user can be invited to the community
// @ts-ignore
     */
// @ts-ignore
    can_be_invited_group: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * User's mobile phone number
// @ts-ignore
     */
// @ts-ignore
    mobile_phone: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's additional phone number
// @ts-ignore
     */
// @ts-ignore
    home_phone: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's website
// @ts-ignore
     */
// @ts-ignore
    site: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's status
// @ts-ignore
     */
// @ts-ignore
    status: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's status
// @ts-ignore
     */
// @ts-ignore
    activity: string;
// @ts-ignore
    /**
// @ts-ignore
     * Number of user's followers
// @ts-ignore
     */
// @ts-ignore
    followers_count: number;
// @ts-ignore
    /**
// @ts-ignore
     * User level in live streams achievements
// @ts-ignore
     */
// @ts-ignore
    video_live_level: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of user's live streams
// @ts-ignore
     */
// @ts-ignore
    video_live_count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of user's clips
// @ts-ignore
     */
// @ts-ignore
    clips_count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Number of common friends with current user
// @ts-ignore
     */
// @ts-ignore
    common_count: number;
// @ts-ignore
    /**
// @ts-ignore
     * University ID
// @ts-ignore
     */
// @ts-ignore
    university: number;
// @ts-ignore
    /**
// @ts-ignore
     * University name
// @ts-ignore
     */
// @ts-ignore
    university_name: string;
// @ts-ignore
    /**
// @ts-ignore
     * Faculty ID
// @ts-ignore
     */
// @ts-ignore
    faculty: number;
// @ts-ignore
    /**
// @ts-ignore
     * Faculty name
// @ts-ignore
     */
// @ts-ignore
    faculty_name: string;
// @ts-ignore
    /**
// @ts-ignore
     * Graduation year
// @ts-ignore
     */
// @ts-ignore
    graduation: number;
// @ts-ignore
    /**
// @ts-ignore
     * Education form
// @ts-ignore
     */
// @ts-ignore
    education_form: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's education status
// @ts-ignore
     */
// @ts-ignore
    education_status: string;
// @ts-ignore
    /**
// @ts-ignore
     * User hometown
// @ts-ignore
     */
// @ts-ignore
    home_town: string;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether current user is subscribed to podcasts
// @ts-ignore
     */
// @ts-ignore
    is_subscribed_podcasts: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Owner in whitelist or not
// @ts-ignore
     */
// @ts-ignore
    can_subscribe_podcasts: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Can subscribe to wall
// @ts-ignore
     */
// @ts-ignore
    can_subscribe_posts: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Access to user profile is restricted for search engines
// @ts-ignore
     */
// @ts-ignore
    is_no_index: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Contact person ID
// @ts-ignore
     */
// @ts-ignore
    contact_id: number;
// @ts-ignore
    /**
// @ts-ignore
     * IDs of friend lists with user
// @ts-ignore
     */
// @ts-ignore
    lists: number[];
// @ts-ignore
    city: BaseCity;
// @ts-ignore
    country: BaseCountry;
// @ts-ignore
    owner_state: OwnerState;
// @ts-ignore
    has_photo: BaseBoolInt;
// @ts-ignore
    has_mobile: BaseBoolInt;
// @ts-ignore
    is_friend: BaseBoolInt;
// @ts-ignore
    wall_comments: BaseBoolInt;
// @ts-ignore
    can_post: BaseBoolInt;
// @ts-ignore
    can_see_all_posts: BaseBoolInt;
// @ts-ignore
    can_see_audio: BaseBoolInt;
// @ts-ignore
    type: UsersUserType;
// @ts-ignore
    email: string;
// @ts-ignore
    skype: string;
// @ts-ignore
    facebook: string;
// @ts-ignore
    facebook_name: string;
// @ts-ignore
    twitter: string;
// @ts-ignore
    livejournal: string;
// @ts-ignore
    instagram: string;
// @ts-ignore
    test: BaseBoolInt;
// @ts-ignore
    video_live: VideoLiveInfo;
// @ts-ignore
    is_video_live_notifications_blocked: BaseBoolInt;
// @ts-ignore
    is_service: boolean | number;
// @ts-ignore
    service_description: string;
// @ts-ignore
    photo_rec: PhotosPhotoFalseable;
// @ts-ignore
    photo_medium: PhotosPhotoFalseable;
// @ts-ignore
    photo_medium_rec: PhotosPhotoFalseable;
// @ts-ignore
    photo: string;
// @ts-ignore
    photo_big: string;
// @ts-ignore
    photo_400: string;
// @ts-ignore
    photo_max_size: PhotosPhoto;
// @ts-ignore
    language: string;
// @ts-ignore
    stories_archive_count: number;
// @ts-ignore
    has_unseen_stories: boolean | number;
// @ts-ignore
    wall_default: "owner" | "all";
// @ts-ignore
    can_see_gifts: BaseBoolInt;
// @ts-ignore
    interests: string;
// @ts-ignore
    books: string;
// @ts-ignore
    tv: string;
// @ts-ignore
    quotes: string;
// @ts-ignore
    about: string;
// @ts-ignore
    games: string;
// @ts-ignore
    movies: string;
// @ts-ignore
    activities: string;
// @ts-ignore
    music: string;
// @ts-ignore
    can_write_private_message: BaseBoolInt;
// @ts-ignore
    can_send_friend_request: BaseBoolInt;
// @ts-ignore
    status_audio: AudioAudio;
// @ts-ignore
    last_seen: UsersLastSeen;
// @ts-ignore
    exports: UsersExports;
// @ts-ignore
    crop_photo: BaseCropPhoto;
// @ts-ignore
    blacklisted: BaseBoolInt;
// @ts-ignore
    blacklisted_by_me: BaseBoolInt;
// @ts-ignore
    is_favorite: BaseBoolInt;
// @ts-ignore
    is_hidden_from_feed: BaseBoolInt;
// @ts-ignore
    occupation: UsersOccupation;
// @ts-ignore
    career: UsersCareer[];
// @ts-ignore
    military: UsersMilitary[];
// @ts-ignore
    university_group_id: number;
// @ts-ignore
    relation: UsersUserRelation;
// @ts-ignore
    relation_partner: UsersUserMin;
// @ts-ignore
    personal: UsersPersonal;
// @ts-ignore
    universities: UsersUniversity[];
// @ts-ignore
    schools: UsersSchool[];
// @ts-ignore
    relatives: UsersRelative[];
// @ts-ignore
    counters: UsersUserCounters;
// @ts-ignore
    access_key: string;
// @ts-ignore
    can_upload_doc: BaseBoolInt;
// @ts-ignore
    hash: string;
// @ts-ignore
    is_message_request: boolean | number;
// @ts-ignore
    descriptions: string[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type UsersUserFull = UsersUser & UsersUserFull1;
// @ts-ignore

// @ts-ignore
export type UsersUserMin = any;
// @ts-ignore

// @ts-ignore
export type UsersUserRelation = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
// @ts-ignore

// @ts-ignore
export interface UsersUserSettingsXtr {
// @ts-ignore
    /**
// @ts-ignore
     * User's date of birth
// @ts-ignore
     */
// @ts-ignore
    bdate?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether user's birthdate are hidden
// @ts-ignore
     */
// @ts-ignore
    bdate_visibility?: number;
// @ts-ignore
    /**
// @ts-ignore
     * User first name
// @ts-ignore
     */
// @ts-ignore
    first_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User's hometown
// @ts-ignore
     */
// @ts-ignore
    home_town?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User last name
// @ts-ignore
     */
// @ts-ignore
    last_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User maiden name
// @ts-ignore
     */
// @ts-ignore
    maiden_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User phone number with some hidden digits
// @ts-ignore
     */
// @ts-ignore
    phone?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Domain name of the user's page
// @ts-ignore
     */
// @ts-ignore
    screen_name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User status
// @ts-ignore
     */
// @ts-ignore
    status?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    relation_requests?: UsersUserMin[];
// @ts-ignore
    languages?: string[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type UsersUserType = "profile";
// @ts-ignore

// @ts-ignore
export interface UsersUserXtrType1 {
// @ts-ignore
    type: UsersUserType;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type UsersUserXtrType = UsersUser & UsersUserXtrType1;
// @ts-ignore

// @ts-ignore
export interface UsersUsersArray {
// @ts-ignore
    /**
// @ts-ignore
     * Users number
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    items?: number[];
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UtilsDomainResolved {
// @ts-ignore
    /**
// @ts-ignore
     * Object ID
// @ts-ignore
     */
// @ts-ignore
    object_id?: number;
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
export type UtilsDomainResolvedType = "user" | "group" | "application" | "page" | "vk_app" | "community_application";
// @ts-ignore

// @ts-ignore
export interface UtilsLastShortenedLink {
// @ts-ignore
    /**
// @ts-ignore
     * Access key for private stats
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link key (characters after vk.cc/)
// @ts-ignore
     */
// @ts-ignore
    key?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Short link URL
// @ts-ignore
     */
// @ts-ignore
    short_url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Creation time in Unixtime
// @ts-ignore
     */
// @ts-ignore
    timestamp?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Full URL
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Total views number
// @ts-ignore
     */
// @ts-ignore
    views?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UtilsLinkChecked {
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
export type UtilsLinkCheckedStatus = "not_banned" | "banned" | "processing";
// @ts-ignore

// @ts-ignore
export interface UtilsLinkStats {
// @ts-ignore
    /**
// @ts-ignore
     * Link key (characters after vk.cc/)
// @ts-ignore
     */
// @ts-ignore
    key?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    stats?: UtilsStats[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UtilsLinkStatsExtended {
// @ts-ignore
    /**
// @ts-ignore
     * Link key (characters after vk.cc/)
// @ts-ignore
     */
// @ts-ignore
    key?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    stats?: UtilsStatsExtended[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UtilsShortLink {
// @ts-ignore
    /**
// @ts-ignore
     * Access key for private stats
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Link key (characters after vk.cc/)
// @ts-ignore
     */
// @ts-ignore
    key?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Short link URL
// @ts-ignore
     */
// @ts-ignore
    short_url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Full URL
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UtilsStats {
// @ts-ignore
    /**
// @ts-ignore
     * Start time
// @ts-ignore
     */
// @ts-ignore
    timestamp?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Total views number
// @ts-ignore
     */
// @ts-ignore
    views?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UtilsStatsCity {
// @ts-ignore
    /**
// @ts-ignore
     * City ID
// @ts-ignore
     */
// @ts-ignore
    city_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Views number
// @ts-ignore
     */
// @ts-ignore
    views?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UtilsStatsCountry {
// @ts-ignore
    /**
// @ts-ignore
     * Country ID
// @ts-ignore
     */
// @ts-ignore
    country_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Views number
// @ts-ignore
     */
// @ts-ignore
    views?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UtilsStatsExtended {
// @ts-ignore
    /**
// @ts-ignore
     * Start time
// @ts-ignore
     */
// @ts-ignore
    timestamp?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Total views number
// @ts-ignore
     */
// @ts-ignore
    views?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    cities?: UtilsStatsCity[];
// @ts-ignore
    countries?: UtilsStatsCountry[];
// @ts-ignore
    sex_age?: UtilsStatsSexAge[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface UtilsStatsSexAge {
// @ts-ignore
    /**
// @ts-ignore
     * Age denotation
// @ts-ignore
     */
// @ts-ignore
    age_range?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Views by female users
// @ts-ignore
     */
// @ts-ignore
    female?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Views by male users
// @ts-ignore
     */
// @ts-ignore
    male?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoLiveInfo {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/*Video live settings*/
// @ts-ignore
export interface VideoLiveSettings {
// @ts-ignore
    /**
// @ts-ignore
     * Max possible time for rewind
// @ts-ignore
     */
// @ts-ignore
    max_duration?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoSaveResult {
// @ts-ignore
    /**
// @ts-ignore
     * Video access key
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Video description
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Video owner ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Video title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL for the video uploading
// @ts-ignore
     */
// @ts-ignore
    upload_url: string;
// @ts-ignore
    /**
// @ts-ignore
     * Video ID
// @ts-ignore
     */
// @ts-ignore
    video_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type VideoVideo = any;
// @ts-ignore

// @ts-ignore
export interface VideoVideoAlbum {
// @ts-ignore
    /**
// @ts-ignore
     * Album ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Album owner's ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Album title
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
export interface VideoVideoAlbumFull1 {
// @ts-ignore
    /**
// @ts-ignore
     * Total number of videos in album
// @ts-ignore
     */
// @ts-ignore
    count: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when the album has been updated last time in Unixtime
// @ts-ignore
     */
// @ts-ignore
    updated_time: number;
// @ts-ignore
    image: VideoVideoImage[];
// @ts-ignore
    image_blur: BasePropertyExists;
// @ts-ignore
    is_system: BasePropertyExists;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type VideoVideoAlbumFull = VideoVideoAlbum & VideoVideoAlbumFull1;
// @ts-ignore

// @ts-ignore
export interface VideoVideoFiles {
// @ts-ignore
    /**
// @ts-ignore
     * URL of the external player
// @ts-ignore
     */
// @ts-ignore
    external?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the mpeg4 file with 144p quality
// @ts-ignore
     */
// @ts-ignore
    mp4_144?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the mpeg4 file with 240p quality
// @ts-ignore
     */
// @ts-ignore
    mp4_240?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the mpeg4 file with 360p quality
// @ts-ignore
     */
// @ts-ignore
    mp4_360?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the mpeg4 file with 480p quality
// @ts-ignore
     */
// @ts-ignore
    mp4_480?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the mpeg4 file with 720p quality
// @ts-ignore
     */
// @ts-ignore
    mp4_720?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the mpeg4 file with 1080p quality
// @ts-ignore
     */
// @ts-ignore
    mp4_1080?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the mpeg4 file with 2K quality
// @ts-ignore
     */
// @ts-ignore
    mp4_1440?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the mpeg4 file with 4K quality
// @ts-ignore
     */
// @ts-ignore
    mp4_2160?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the flv file with 320p quality
// @ts-ignore
     */
// @ts-ignore
    flv_320?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface VideoVideoFull1 {
// @ts-ignore
    files: VideoVideoFiles;
// @ts-ignore
    trailer: VideoVideoFiles;
// @ts-ignore
    live_settings: VideoLiveSettings;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type VideoVideoFull = VideoVideo & VideoVideoFull1;
// @ts-ignore

// @ts-ignore
export interface VideoVideoImage1 {
// @ts-ignore
    with_padding: BasePropertyExists;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type VideoVideoImage = BaseImage & VideoVideoImage1;
// @ts-ignore

// @ts-ignore
export interface WallAppPost {
// @ts-ignore
    /**
// @ts-ignore
     * Application ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Application name
// @ts-ignore
     */
// @ts-ignore
    name?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 130 px in width
// @ts-ignore
     */
// @ts-ignore
    photo_130?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 604 px in width
// @ts-ignore
     */
// @ts-ignore
    photo_604?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallAttachedNote {
// @ts-ignore
    /**
// @ts-ignore
     * Comments number
// @ts-ignore
     */
// @ts-ignore
    comments?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when the note has been created in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Note ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Note owner's ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Read comments number
// @ts-ignore
     */
// @ts-ignore
    read_comments?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Note title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Note text
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Note wiki text
// @ts-ignore
     */
// @ts-ignore
    text_wiki?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the page with note preview
// @ts-ignore
     */
// @ts-ignore
    view_url?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    privacy_view?: string[];
// @ts-ignore
    privacy_comment?: string[];
// @ts-ignore
    can_comment?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallCarouselBase {
// @ts-ignore
    /**
// @ts-ignore
     * Index of current carousel element
// @ts-ignore
     */
// @ts-ignore
    carousel_offset?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallCommentAttachment {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type WallCommentAttachmentType = "photo" | "audio" | "video" | "doc" | "link" | "note" | "page" | "market_market_album" | "market" | "sticker";
// @ts-ignore

// @ts-ignore
export interface WallGeo {
// @ts-ignore
    /**
// @ts-ignore
     * Coordinates as string. <latitude> <longtitude>
// @ts-ignore
     */
// @ts-ignore
    coordinates?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether a map is showed
// @ts-ignore
     */
// @ts-ignore
    showmap?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Place type
// @ts-ignore
     */
// @ts-ignore
    type?: "place" | "point";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type WallGetFilter = "owner" | "others" | "all" | "postponed" | "suggests" | "archived" | "donut";
// @ts-ignore

// @ts-ignore
export interface WallGraffiti {
// @ts-ignore
    /**
// @ts-ignore
     * Graffiti ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Graffiti owner's ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 200 px in width
// @ts-ignore
     */
// @ts-ignore
    photo_200?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 586 px in width
// @ts-ignore
     */
// @ts-ignore
    photo_586?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Graffiti height
// @ts-ignore
     */
// @ts-ignore
    height?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Graffiti URL
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Graffiti width
// @ts-ignore
     */
// @ts-ignore
    width?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Access key for graffiti
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
export interface WallPostCopyright {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    id?: number;
// @ts-ignore
    link?: string;
// @ts-ignore
    name?: string;
// @ts-ignore
    type?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallPostSource {
// @ts-ignore
    /**
// @ts-ignore
     * Additional data
// @ts-ignore
     */
// @ts-ignore
    data?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Platform name
// @ts-ignore
     */
// @ts-ignore
    platform?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL to an external site used to publish the post
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type WallPostSourceType = "vk" | "widget" | "api" | "rss" | "sms" | "mvk";
// @ts-ignore

// @ts-ignore
export type WallPostType = "post" | "copy" | "reply" | "postpone" | "suggest" | "post_ads" | "photo" | "video";
// @ts-ignore

// @ts-ignore
export interface WallPostedPhoto {
// @ts-ignore
    /**
// @ts-ignore
     * Photo ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo owner's ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 130 px in width
// @ts-ignore
     */
// @ts-ignore
    photo_130?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image with 604 px in width
// @ts-ignore
     */
// @ts-ignore
    photo_604?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallViews {
// @ts-ignore
    /**
// @ts-ignore
     * Count
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
export interface WallWallComment {
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Author ID
// @ts-ignore
     */
// @ts-ignore
    from_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when the comment has been added in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment text
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Real position of the comment
// @ts-ignore
     */
// @ts-ignore
    real_offset?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Replied user ID
// @ts-ignore
     */
// @ts-ignore
    reply_to_user?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Replied comment ID
// @ts-ignore
     */
// @ts-ignore
    reply_to_comment?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Photo ID
// @ts-ignore
     */
// @ts-ignore
    pid?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    post_id?: number;
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    parents_stack?: number[];
// @ts-ignore
    photo_id?: number;
// @ts-ignore
    video_id?: number;
// @ts-ignore
    attachments?: WallCommentAttachment[];
// @ts-ignore
    deleted?: boolean | number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallWallCommentDonut {
// @ts-ignore
    /**
// @ts-ignore
     * Means commentator is donator
// @ts-ignore
     */
// @ts-ignore
    is_don?: boolean | number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallWallCommentDonutPlaceholder {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    text?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallWallpost {
// @ts-ignore
    /**
// @ts-ignore
     * Access key to private object
// @ts-ignore
     */
// @ts-ignore
    access_key?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Date of publishing in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date of editing in Unixtime
// @ts-ignore
     */
// @ts-ignore
    edited?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Post author ID
// @ts-ignore
     */
// @ts-ignore
    from_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Post ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Is post archived, only for post owners
// @ts-ignore
     */
// @ts-ignore
    is_archived?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether the post in favorites list
// @ts-ignore
     */
// @ts-ignore
    is_favorite?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Wall owner's ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * If post type 'reply', contains original post ID
// @ts-ignore
     */
// @ts-ignore
    post_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Post signer ID
// @ts-ignore
     */
// @ts-ignore
    signer_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Post text
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    is_deleted?: boolean | number;
// @ts-ignore
    attachments?: WallWallpostAttachment[];
// @ts-ignore
    parents_stack?: number[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallWallpostAttachment {
// @ts-ignore
    /**
// @ts-ignore
     * Access key for the audio
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
export type WallWallpostAttachmentType = "photo" | "photos_list" | "posted_photo" | "audio" | "audio_playlist" | "video" | "doc" | "link" | "graffiti" | "note" | "app" | "poll" | "page" | "album" | "market_album" | "market" | "event" | "donut_link" | "article" | "textlive" | "textpost" | "textpost_publish" | "situational_theme" | "group" | "sticker" | "podcast";
// @ts-ignore

// @ts-ignore
export interface WallWallpostCommentsDonut {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/*Info about paid comments feature*/
// @ts-ignore
export interface WallWallpostCommentsDonutPlaceholder {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    text?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/*Info about paid wall post*/
// @ts-ignore
export interface WallWallpostDonut {
// @ts-ignore
    /**
// @ts-ignore
     * Post only for dons
// @ts-ignore
     */
// @ts-ignore
    is_donut?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Value of this field need to pass in wall.post/edit in donut_paid_duration
// @ts-ignore
     */
// @ts-ignore
    paid_duration?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Says whether group admin can post free copy of this donut post
// @ts-ignore
     */
// @ts-ignore
    can_publish_free_copy?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * Says what user can edit in post about donut properties
// @ts-ignore
     */
// @ts-ignore
    edit_mode?: "all" | "duration";
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallWallpostDonutPlaceholder {
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    text?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WallWallpostFull1 {
// @ts-ignore
    /**
// @ts-ignore
     * Post creator ID (if post still can be edited)
// @ts-ignore
     */
// @ts-ignore
    created_by: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether the post is pinned
// @ts-ignore
     */
// @ts-ignore
    is_pinned: number;
// @ts-ignore
    /**
// @ts-ignore
     * Topic ID. Allowed values can be obtained from newsfeed.getPostTopics method
// @ts-ignore
     */
// @ts-ignore
    topic_id: 0 | 1 | 7 | 12 | 16 | 19 | 21 | 23 | 25 | 26 | 32 | 43;
// @ts-ignore
    /**
// @ts-ignore
     * Preview length control parameter
// @ts-ignore
     */
// @ts-ignore
    short_text_rate: number;
// @ts-ignore
    /**
// @ts-ignore
     * Hash for sharing
// @ts-ignore
     */
// @ts-ignore
    hash: string;
// @ts-ignore
    copy_history: WallWallpostFull[];
// @ts-ignore
    can_edit: BaseBoolInt;
// @ts-ignore
    can_delete: BaseBoolInt;
// @ts-ignore
    can_pin: BaseBoolInt;
// @ts-ignore
    donut: WallWallpostDonut;
// @ts-ignore
    comments: BaseCommentsInfo;
// @ts-ignore
    marked_as_ads: BaseBoolInt;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type WallWallpostFull = WallCarouselBase & WallWallpost & WallWallpostFull1;
// @ts-ignore

// @ts-ignore
export interface WallWallpostToId {
// @ts-ignore
    /**
// @ts-ignore
     * ID of the source post owner
// @ts-ignore
     */
// @ts-ignore
    copy_owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * ID of the source post
// @ts-ignore
     */
// @ts-ignore
    copy_post_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date of publishing in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Post author ID
// @ts-ignore
     */
// @ts-ignore
    from_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Post ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Information whether the post in favorites list
// @ts-ignore
     */
// @ts-ignore
    is_favorite?: boolean | number;
// @ts-ignore
    /**
// @ts-ignore
     * wall post ID (if comment)
// @ts-ignore
     */
// @ts-ignore
    post_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Post signer ID
// @ts-ignore
     */
// @ts-ignore
    signer_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Post text
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Wall owner's ID
// @ts-ignore
     */
// @ts-ignore
    to_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    attachments?: WallWallpostAttachment[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WidgetsCommentMedia {
// @ts-ignore
    /**
// @ts-ignore
     * Media item ID
// @ts-ignore
     */
// @ts-ignore
    item_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Media owner's ID
// @ts-ignore
     */
// @ts-ignore
    owner_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image (type=photo only)
// @ts-ignore
     */
// @ts-ignore
    thumb_src?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type WidgetsCommentMediaType = "audio" | "photo" | "video";
// @ts-ignore

// @ts-ignore
export interface WidgetsCommentReplies {
// @ts-ignore
    /**
// @ts-ignore
     * Comments number
// @ts-ignore
     */
// @ts-ignore
    count?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    replies?: WidgetsCommentRepliesItem[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WidgetsCommentRepliesItem {
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID
// @ts-ignore
     */
// @ts-ignore
    cid?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Date when the comment has been added in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment text
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * User ID
// @ts-ignore
     */
// @ts-ignore
    uid?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WidgetsWidgetComment {
// @ts-ignore
    /**
// @ts-ignore
     * Date when the comment has been added in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment author ID
// @ts-ignore
     */
// @ts-ignore
    from_id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Post type
// @ts-ignore
     */
// @ts-ignore
    post_type?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Comment text
// @ts-ignore
     */
// @ts-ignore
    text?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Wall owner
// @ts-ignore
     */
// @ts-ignore
    to_id?: number;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
    attachments?: WallCommentAttachment[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface WidgetsWidgetLikes {
// @ts-ignore
    /**
// @ts-ignore
     * Likes number
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
export interface WidgetsWidgetPage {
// @ts-ignore
    /**
// @ts-ignore
     * Date when widgets on the page has been initialized firstly in Unixtime
// @ts-ignore
     */
// @ts-ignore
    date?: number;
// @ts-ignore
    /**
// @ts-ignore
     * Page description
// @ts-ignore
     */
// @ts-ignore
    description?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Page ID
// @ts-ignore
     */
// @ts-ignore
    id?: number;
// @ts-ignore
    /**
// @ts-ignore
     * page_id parameter value
// @ts-ignore
     */
// @ts-ignore
    page_id?: string;
// @ts-ignore
    /**
// @ts-ignore
     * URL of the preview image
// @ts-ignore
     */
// @ts-ignore
    photo?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Page title
// @ts-ignore
     */
// @ts-ignore
    title?: string;
// @ts-ignore
    /**
// @ts-ignore
     * Page absolute URL
// @ts-ignore
     */
// @ts-ignore
    url?: string;
// @ts-ignore
    [key: string]: any;
// @ts-ignore
}
// @ts-ignore

