/* eslint-disable */
export interface AccountAccountCounters {
    /**
     * New app requests number
     */
    app_requests: number;
    /**
     * New events number
     */
    events: number;
    /**
     * New faves number
     */
    faves: number;
    /**
     * New friends requests number
     */
    friends: number;
    /**
     * New friends recommendations number
     */
    friends_recommendations: number;
    /**
     * New gifts number
     */
    gifts: number;
    /**
     * New groups number
     */
    groups: number;
    /**
     * New messages number
     */
    messages: number;
    /**
     * New memories number
     */
    memories: number;
    /**
     * New notes number
     */
    notes: number;
    /**
     * New notifications number
     */
    notifications: number;
    /**
     * New photo tags number
     */
    photos: number;
    [key: string]: any;
}

export type AccountCountersFilter = "app_requests" | "events" | "friends" | "friends_recommendations" | "gifts" | "groups" | "messages" | "notes" | "notifications" | "photos" | "faves" | "memories";

export interface AccountInfo {
    /**
     * Country code
     */
    country: string;
    /**
     * Language ID
     */
    lang: number;
    [key: string]: any;
}

export interface AccountNameRequest {
    /**
     * First name in request
     */
    first_name: string;
    /**
     * Request ID needed to cancel the request
     */
    id: number;
    /**
     * Last name in request
     */
    last_name: string;
    /**
     * Text to display to user
     */
    lang: string;
    /**
     * href for link in lang field
     */
    link_href: string;
    /**
     * label to display for link in lang field
     */
    link_label: string;
    [key: string]: any;
}

export type AccountNameRequestStatus = "success" | "processing" | "declined" | "was_accepted" | "was_declined" | "declined_with_link" | "response" | "response_with_link";

export interface AccountOffer {
    /**
     * Offer description
     */
    description: string;
    /**
     * Offer ID
     */
    id: number;
    /**
     * URL of the preview image
     */
    img: string;
    /**
     * Instruction how to process the offer
     */
    instruction: string;
    /**
     * Instruction how to process the offer (HTML format)
     */
    instruction_html: string;
    /**
     * Offer price
     */
    price: number;
    /**
     * Offer short description
     */
    short_description: string;
    /**
     * Offer tag
     */
    tag: string;
    /**
     * Offer title
     */
    title: string;
    /**
     * Currency amount
     */
    currency_amount: number;
    /**
     * Link id
     */
    link_id: number;
    /**
     * Link type
     */
    link_type: "profile" | "group" | "app";
    [key: string]: any;
}

export interface AccountPushConversations {
    /**
     * Items count
     */
    count: number;
    [key: string]: any;
    items: AccountPushConversationsItem[];
}

export interface AccountPushConversationsItem {
    /**
     * Time until that notifications are disabled in seconds
     */
    disabled_until: number;
    /**
     * Peer ID
     */
    peer_id: number;
    [key: string]: any;
}

export interface AccountPushParams {
    [key: string]: any;
    msg: AccountPushParamsMode[];
    chat: AccountPushParamsMode[];
    like: AccountPushParamsSettings[];
    repost: AccountPushParamsSettings[];
    comment: AccountPushParamsSettings[];
    mention: AccountPushParamsSettings[];
    reply: AccountPushParamsOnoff[];
    new_post: AccountPushParamsOnoff[];
    wall_post: AccountPushParamsOnoff[];
    wall_publish: AccountPushParamsOnoff[];
    friend: AccountPushParamsOnoff[];
    friend_found: AccountPushParamsOnoff[];
    friend_accepted: AccountPushParamsOnoff[];
    group_invite: AccountPushParamsOnoff[];
    group_accepted: AccountPushParamsOnoff[];
    birthday: AccountPushParamsOnoff[];
    event_soon: AccountPushParamsOnoff[];
    app_request: AccountPushParamsOnoff[];
    sdk_open: AccountPushParamsOnoff[];
}

export type AccountPushParamsMode = "on" | "off" | "no_sound" | "no_text";

export type AccountPushParamsOnoff = "on" | "off";

export type AccountPushParamsSettings = "on" | "off" | "fr_of_fr";

export interface AccountPushSettings {
    /**
     * Time until that notifications are disabled in Unixtime
     */
    disabled_until: number;
    [key: string]: any;
}

export interface AccountUserSettings1 {
    /**
     * URL of square photo of the user with 200 pixels in width
     */
    photo_200: string;
    /**
     * flag about service account
     */
    is_service_account: boolean | number;
}

export type AccountUserSettings = UsersUserMin & UsersUserSettingsXtr & AccountUserSettings1;

export interface AccountUserSettingsInterest {
    [key: string]: any;
    title: string;
    value: string;
}

export interface AccountUserSettingsInterests {
    [key: string]: any;
}

export type AddressesFields = "id" | "title" | "address" | "additional_address" | "country_id" | "city_id" | "metro_station_id" | "latitude" | "longitude" | "distance" | "work_info_status" | "timetable" | "phone" | "time_offset";

export type AddressFields = "id" | "title" | "address" | "additional_address" | "country_id" | "country" | "city_id" | "city" | "metro_station_id" | "metro_station" | "latitude" | "longitude" | "distance" | "work_info_status" | "timetable" | "phone" | "time_offset";

export type AdsAccessRole = "admin" | "manager" | "reports";

export type AdsAccessRolePublic = "manager" | "reports";

export interface AdsAccesses {
    /**
     * Client ID
     */
    client_id: string;
    [key: string]: any;
}

export interface AdsAccount {
    /**
     * Account ID
     */
    account_id: number;
    /**
     * Account name
     */
    account_name: string;
    /**
     * Can user view account budget
     */
    can_view_budget: boolean | number;
    [key: string]: any;
}

export type AdsAccountType = "general" | "agency";

export interface AdsAd {
    /**
     * Ad format
     */
    ad_format: number;
    /**
     * Total limit
     */
    all_limit: string;
    /**
     * Campaign ID
     */
    campaign_id: number;
    /**
     * Category ID
     */
    category1_id: number;
    /**
     * Additional category ID
     */
    category2_id: number;
    /**
     * Cost of a click, kopecks
     */
    cpc: string;
    /**
     * Cost of 1000 impressions, kopecks
     */
    cpm: string;
    /**
     * Cost of an action, kopecks
     */
    cpa: string;
    /**
     * Cost of 1000 impressions optimized, kopecks
     */
    ocpm: string;
    /**
     * Max cost of target actions for autobidding, kopecks
     */
    autobidding_max_cost: string;
    /**
     * Ad ID
     */
    id: number;
    /**
     * Impressions limit
     */
    impressions_limit: number;
    /**
     * Impressions limit period
     */
    impressions_limit_period: number;
    /**
     * Ad title
     */
    name: string;
    /**
     * Day limit
     */
    day_limit: string;
    /**
     * Goal type
     */
    goal_type: number;
    /**
     * User goal type
     */
    user_goal_type: number;
    /**
     * Age restriction
     */
    age_restriction: number;
    /**
     * Conversion pixel id
     */
    conversion_pixel_id: number;
    /**
     * Conversion event id
     */
    conversion_event_id: number;
    /**
     * Create time
     */
    create_time: number;
    /**
     * Update time
     */
    update_time: number;
    /**
     * Start time
     */
    start_time: number;
    /**
     * Stop time
     */
    stop_time: number;
    /**
     * Publisher platforms
     */
    publisher_platforms: string;
    /**
     * Link url
     */
    link_url: string;
    /**
     * Link owner id
     */
    link_owner_id: number;
    /**
     * Link id
     */
    link_id: number;
    /**
     * Has campaign budget optimization
     */
    has_campaign_budget_optimization: boolean | number;
    /**
     * Weekly schedule use holidays
     */
    weekly_schedule_use_holidays: number;
    /**
     * Ad platform no ad network
     */
    ad_platform_no_ad_network: number;
    /**
     * Ad platform no wall
     */
    ad_platform_no_wall: number;
    /**
     * Disclaimer finance
     */
    disclaimer_finance: number;
    /**
     * Disclaimer finance name
     */
    disclaimer_finance_name: string;
    /**
     * Disclaimer finance license no
     */
    disclaimer_finance_license_no: string;
    /**
     * is promo
     */
    is_promo: boolean | number;
    /**
     * Suggested criteria
     */
    suggested_criteria: number;
    [key: string]: any;
    events_retargeting_groups: AdsEventsRetargetingGroup[];
    weekly_schedule_hours: string[];
}

export type AdsAdApproved = 0 | 1 | 2 | 3;

export type AdsAdCostType = 0 | 1 | 2 | 3;

export interface AdsAdLayout {
    /**
     * Ad format
     */
    ad_format: number;
    /**
     * Campaign ID
     */
    campaign_id: number;
    /**
     * Ad description
     */
    description: string;
    /**
     * Ad ID
     */
    id: number;
    /**
     * Image URL
     */
    image_src: string;
    /**
     * URL of the preview image in double size
     */
    image_src_2x: string;
    /**
     * Domain of advertised object
     */
    link_domain: string;
    /**
     * URL of advertised object
     */
    link_url: string;
    /**
     * Type of advertised object
     */
    link_type: number;
    /**
     * link to preview an ad as it is shown on the website
     */
    preview_link: string;
    /**
     * Ad title
     */
    title: string;
    /**
     * Social
     */
    social: boolean | number;
    /**
     * Okved
     */
    okved: string;
    /**
     * Age restriction
     */
    age_restriction: number;
    /**
     * Goal type
     */
    goal_type: number;
    /**
     * Link title
     */
    link_title: string;
    /**
     * Link button
     */
    link_button: string;
    /**
     * Repeat video
     */
    repeat_video: number;
    /**
     * Video source 240p
     */
    video_src_240: string;
    /**
     * Video source 360p
     */
    video_src_360: string;
    /**
     * Video source 480p
     */
    video_src_480: string;
    /**
     * Video source 720p
     */
    video_src_720: string;
    /**
     * Video source 1080p
     */
    video_src_1080: string;
    /**
     * Video image source
     */
    video_image_src: string;
    /**
     * Video image source 2x
     */
    video_image_src_2x: string;
    /**
     * Video duration
     */
    video_duration: number;
    /**
     * Icon source
     */
    icon_src: string;
    /**
     * Icon source 2x
     */
    icon_src_2x: string;
    [key: string]: any;
    clips_list: AdsClipItem[];
}

export type AdsAdStatus = 0 | 1 | 2;

export interface AdsCampaign {
    /**
     * Amount of active ads in campaign
     */
    ads_count: number;
    /**
     * Campaign's total limit, rubles
     */
    all_limit: string;
    /**
     * Campaign create time, as Unixtime
     */
    create_time: number;
    /**
     * Campaign goal type
     */
    goal_type: number;
    /**
     * Campaign user goal type
     */
    user_goal_type: number;
    /**
     * Shows if Campaign Budget Optimization is on
     */
    is_cbo_enabled: boolean | number;
    /**
     * Campaign's day limit, rubles
     */
    day_limit: string;
    /**
     * Campaign ID
     */
    id: number;
    /**
     * Campaign title
     */
    name: string;
    /**
     * Campaign start time, as Unixtime
     */
    start_time: number;
    /**
     * Campaign stop time, as Unixtime
     */
    stop_time: number;
    /**
     * Campaign update time, as Unixtime
     */
    update_time: number;
    /**
     * Limit of views per user per campaign
     */
    views_limit: number;
    [key: string]: any;
}

export type AdsCampaignStatus = 0 | 1 | 2;

export type AdsCampaignType = "normal" | "vk_apps_managed" | "mobile_apps" | "promoted_posts" | "adaptive_ads" | "stories";

export interface AdsCategory {
    /**
     * Category ID
     */
    id: number;
    /**
     * Category name
     */
    name: string;
    [key: string]: any;
    subcategories: AdsCategory[];
}

export interface AdsClient {
    /**
     * Client's total limit, rubles
     */
    all_limit: string;
    /**
     * Client's day limit, rubles
     */
    day_limit: string;
    /**
     * Client ID
     */
    id: number;
    /**
     * Client name
     */
    name: string;
    [key: string]: any;
}

export interface AdsClipItem {
    /**
     * Video id
     */
    video_id: number;
    /**
     * Preview url
     */
    preview_url: string;
    [key: string]: any;
}

/*Link*/
export interface AdsClipItemLink {
    /**
     * Text
     */
    text: string;
    /**
     * Key
     */
    key: string;
    /**
     * Url
     */
    url: string;
    [key: string]: any;
}

export interface AdsCreateAdStatus {
    /**
     * Ad ID
     */
    id: number;
    /**
     * Stealth Post ID
     */
    post_id: number;
    /**
     * Error code
     */
    error_code: number;
    /**
     * Error description
     */
    error_desc: string;
    [key: string]: any;
}

export interface AdsCreateCampaignStatus {
    /**
     * Campaign ID
     */
    id: number;
    /**
     * Error code
     */
    error_code: number;
    /**
     * Error description
     */
    error_desc: string;
    [key: string]: any;
}

export interface AdsCreateClientsStatus {
    /**
     * Client ID
     */
    id: number;
    /**
     * Error code
     */
    error_code: number;
    /**
     * Error description
     */
    error_desc: string;
    [key: string]: any;
}

export interface AdsCriteria {
    /**
     * Age from
     */
    age_from: string;
    /**
     * Age to
     */
    age_to: string;
    /**
     * Apps IDs
     */
    apps: string;
    /**
     * Apps IDs to except
     */
    apps_not: string;
    /**
     * Days to birthday
     */
    birthday: string;
    /**
     * Cities IDs
     */
    cities: string;
    /**
     * Cities IDs to except
     */
    cities_not: string;
    /**
     * Country ID
     */
    country: string;
    /**
     * Districts IDs
     */
    districts: string;
    /**
     * Communities IDs
     */
    groups: string;
    /**
     * Interests categories IDs
     */
    interest_categories: string;
    /**
     * Interests
     */
    interests: string;
    /**
     * Information whether the user has proceeded VK payments before
     */
    paying: string;
    /**
     * Positions IDs
     */
    positions: string;
    /**
     * Religions IDs
     */
    religions: string;
    /**
     * Retargeting groups ids
     */
    retargeting_groups: string;
    /**
     * Retargeting groups NOT ids
     */
    retargeting_groups_not: string;
    /**
     * School graduation year from
     */
    school_from: string;
    /**
     * School graduation year to
     */
    school_to: string;
    /**
     * Schools IDs
     */
    schools: string;
    /**
     * Stations IDs
     */
    stations: string;
    /**
     * Relationship statuses
     */
    statuses: string;
    /**
     * Streets IDs
     */
    streets: string;
    /**
     * Travellers
     */
    travellers: string;
    /**
     * AB test
     */
    ab_test: string;
    /**
     * University graduation year from
     */
    uni_from: string;
    /**
     * University graduation year to
     */
    uni_to: string;
    /**
     * Browsers
     */
    user_browsers: string;
    /**
     * Devices
     */
    user_devices: string;
    /**
     * Operating systems
     */
    user_os: string;
    /**
     * Suggested criteria
     */
    suggested_criteria: string;
    /**
     * Group not
     */
    groups_not: string;
    /**
     * Price list audience type
     */
    price_list_audience_type: string;
    /**
     * Count
     */
    count: string;
    /**
     * Group active formula
     */
    groups_active_formula: string;
    /**
     * Interest categories formula
     */
    interest_categories_formula: string;
    /**
     * Groups formula
     */
    groups_formula: string;
    /**
     * Groups active
     */
    groups_active: string;
    /**
     * Group types
     */
    group_types: string;
    /**
     * Key phrases
     */
    key_phrases: string;
    /**
     * Key phrases days
     */
    key_phrases_days: string;
    /**
     * Geo near
     */
    geo_near: string;
    /**
     * Geo point type
     */
    geo_point_type: string;
    /**
     * Price list id
     */
    price_list_id: string;
    /**
     * Groups recommended ids
     */
    groups_recommended: string;
    /**
     * Groups active recommended ids
     */
    groups_active_recommended: string;
    /**
     * Music artists formula
     */
    music_artists_formula: string;
    /**
     * Price list retargeting formula
     */
    price_list_retargeting_formula: string;
    /**
     * Tags
     */
    tags: string;
    /**
     * Browsers
     */
    browsers: string;
    /**
     * Mobile os min version
     */
    mobile_os_min_version: string;
    /**
     * Mobile apps events formula
     */
    mobile_apps_events_formula: string;
    /**
     * Mobile os max version
     */
    mobile_os_max_version: string;
    /**
     * operators
     */
    operators: string;
    /**
     * wifi_only
     */
    wifi_only: string;
    /**
     * mobile_manufacturers
     */
    mobile_manufacturers: string;
    [key: string]: any;
}

export type AdsCriteriaSex = "0" | "1" | "2";

export interface AdsDemoStats {
    /**
     * Object ID
     */
    id: number;
    [key: string]: any;
    stats: AdsDemostatsFormat[];
}

export interface AdsDemographicStatsPeriodItemBase {
    /**
     * Clicks rate
     */
    clicks_rate: number;
    /**
     * Impressions rate
     */
    impressions_rate: number;
    [key: string]: any;
}

export interface AdsDemostatsFormat {
    /**
     * Day as YYYY-MM-DD
     */
    day: string;
    /**
     * Month as YYYY-MM
     */
    month: string;
    /**
     * 1 if period=overall
     */
    overall: number;
    [key: string]: any;
    age: AdsStatsAge[];
    cities: AdsStatsCities[];
    day_from: string;
    day_to: string;
    sex: AdsStatsSex[];
    sex_age: AdsStatsSexAge[];
}

export interface AdsEventsRetargetingGroup {
    [key: string]: any;
    id: number;
    value: number[];
}

export interface AdsFloodStats {
    /**
     * Requests left
     */
    left: number;
    /**
     * Time to refresh in seconds
     */
    refresh: number;
    [key: string]: any;
    stats_by_user: AdsFloodStatsByUserItem[];
}

export interface AdsFloodStatsByUserItem {
    /**
     * User ID
     */
    user_id: number;
    /**
     * Used requests
     */
    requests_count: number;
    [key: string]: any;
}

export interface AdsLinkStatus {
    /**
     * Reject reason
     */
    description: string;
    /**
     * URL
     */
    redirect_url: string;
    /**
     * Link status
     */
    status: string;
    [key: string]: any;
}

export interface AdsLookalikeRequest {
    /**
     * Lookalike request ID
     */
    id: number;
    /**
     * Lookalike request create time, as Unixtime
     */
    create_time: number;
    /**
     * Lookalike request update time, as Unixtime
     */
    update_time: number;
    /**
     * Time by which lookalike request would be deleted, as Unixtime
     */
    scheduled_delete_time: number;
    /**
     * Lookalike request status
     */
    status: "search_in_progress" | "search_failed" | "search_done" | "save_in_progress" | "save_failed" | "save_done";
    /**
     * Lookalike request source type
     */
    source_type: "retargeting_group";
    /**
     * Retargeting group id, which was used as lookalike seed
     */
    source_retargeting_group_id: number;
    /**
     * Lookalike request seed name (retargeting group name)
     */
    source_name: string;
    /**
     * Lookalike request seed audience size
     */
    audience_count: number;
    [key: string]: any;
    save_audience_levels: AdsLookalikeRequestSaveAudienceLevel[];
}

export interface AdsLookalikeRequestSaveAudienceLevel {
    /**
     * Save audience level id, which is used in save audience queries
     */
    level: number;
    /**
     * Saved audience audience size for according level
     */
    audience_count: number;
    [key: string]: any;
}

export interface AdsMobileStatItem {
    [key: string]: any;
    key: string;
    value: number;
}

export interface AdsMusician {
    /**
     * Targeting music artist ID
     */
    id: number;
    /**
     * Music artist name
     */
    name: string;
    /**
     * Music artist photo
     */
    avatar: string;
    [key: string]: any;
}

export type AdsObjectType = "ad" | "campaign" | "client" | "office";

export type AdsOrdClientType = "person" | "individual" | "legal" | "foreign" | "unknown";

export interface AdsOrdData {
    [key: string]: any;
    client_name: string;
    inn: string;
    phone: string;
    contract_number: string;
    contract_date: string;
    contract_type: string;
    contract_object: string;
    with_vat: boolean | number;
}

export interface AdsOrdSubagent {
    [key: string]: any;
    name: string;
    inn: string;
    phone: string;
}

export interface AdsPost {
    /**
     * Post id
     */
    id: number;
    /**
     * From id
     */
    from_id: number;
    /**
     * Owner id
     */
    owner_id: number;
    /**
     * Date
     */
    date: number;
    /**
     * Edited date
     */
    edited: number;
    /**
     * Is pinned
     */
    is_pinned: number;
    /**
     * Marked as ads
     */
    marked_as_ads: number;
    /**
     * Short text rate
     */
    short_text_rate: number;
    /**
     * Type
     */
    type: string;
    /**
     * Is favorite
     */
    is_favorite: boolean | number;
    /**
     * Post type
     */
    post_type: string;
    /**
     * Text
     */
    text: string;
    /**
     * Is promoted post stealth
     */
    is_promoted_post_stealth: boolean | number;
    /**
     * Hash
     */
    hash: string;
    /**
     * Created by
     */
    created_by: number;
    /**
     * Carousel offset
     */
    carousel_offset: number;
    /**
     * Can edit
     */
    can_edit: number;
    /**
     * Can delete
     */
    can_delete: number;
    /**
     * Can pin
     */
    can_pin: number;
    [key: string]: any;
    attachments: WallWallpostAttachment[];
}

/*Comments*/
export interface AdsPostComments {
    /**
     * Count
     */
    count: number;
    [key: string]: any;
}

/*Donut*/
export interface AdsPostDonut {
    /**
     * Is donut
     */
    is_donut: boolean | number;
    [key: string]: any;
}

/*Ads easy promote*/
export interface AdsPostEasyPromote {
    /**
     * Type
     */
    type: number;
    /**
     * Text
     */
    text: string;
    /**
     * Label text
     */
    label_text: string;
    /**
     * Button text
     */
    button_text: string;
    /**
     * Is ad not easy
     */
    is_ad_not_easy: boolean | number;
    /**
     * Ad id
     */
    ad_id: number;
    /**
     * Top union id
     */
    top_union_id: number;
    [key: string]: any;
}

/*Likes*/
export interface AdsPostLikes {
    /**
     * Can like
     */
    can_like: number;
    /**
     * Count
     */
    count: number;
    /**
     * User likes
     */
    user_likes: number;
    [key: string]: any;
}

/*Owner*/
export interface AdsPostOwner {
    /**
     * Owner id
     */
    id: number;
    /**
     * Name
     */
    name: string;
    /**
     * Photo url
     */
    photo: string;
    /**
     * Profile url
     */
    url: string;
    [key: string]: any;
}

/*Reposts*/
export interface AdsPostReposts {
    /**
     * Count
     */
    count: number;
    /**
     * Wall count
     */
    wall_count: number;
    /**
     * Mail count
     */
    mail_count: number;
    [key: string]: any;
}

/*Views*/
export interface AdsPostViews {
    /**
     * Count
     */
    count: number;
    [key: string]: any;
}

export interface AdsPromotedPostReach {
    /**
     * Hides amount
     */
    hide: number;
    /**
     * Object ID from 'ids' parameter
     */
    id: number;
    /**
     * Community joins
     */
    join_group: number;
    /**
     * Link clicks
     */
    links: number;
    /**
     * Subscribers reach
     */
    reach_subscribers: number;
    /**
     * Total reach
     */
    reach_total: number;
    /**
     * Reports amount
     */
    report: number;
    /**
     * Community clicks
     */
    to_group: number;
    /**
     * 'Unsubscribe' events amount
     */
    unsubscribe: number;
    /**
     * Video views for 100 percent
     */
    video_views_100p: number;
    /**
     * Video views for 25 percent
     */
    video_views_25p: number;
    /**
     * Video views for 3 seconds
     */
    video_views_3s: number;
    /**
     * Video views for 10 seconds
     */
    video_views_10s: number;
    /**
     * Video views for 50 percent
     */
    video_views_50p: number;
    /**
     * Video views for 75 percent
     */
    video_views_75p: number;
    /**
     * Video starts
     */
    video_views_start: number;
    /**
     * Pretty cards clicks
     */
    pretty_cards_clicks: number;
    [key: string]: any;
}

export interface AdsRejectReason {
    /**
     * Comment text
     */
    comment: string;
    [key: string]: any;
    rules: AdsRules[];
}

export interface AdsRules {
    /**
     * Label
     */
    help_label: string;
    /**
     * Content Html
     */
    content_html: string;
    /**
     * Help chat
     */
    help_chat: boolean | number;
    [key: string]: any;
}

export type AdsRulesHelpUrl = any;

export interface AdsStatisticClickAction {
    [key: string]: any;
    type: "load" | "impression" | "click_deeplink" | "click" | "click_post_owner" | "click_post_link" | "click_pretty_card" | "like_post" | "share_post" | "video_start" | "video_pause" | "video_resume" | "video_play_3s" | "video_play_10s" | "video_play_25" | "video_play_50" | "video_play_75" | "video_play_95" | "video_play_100" | "video_volume_on" | "video_volume_off" | "video_fullscreen_on" | "video_fullscreen_off" | "hide";
    url: string;
}

export interface AdsStats {
    /**
     * Object ID
     */
    id: number;
    [key: string]: any;
    stats: AdsStatsFormat[];
}

export interface AdsStatsAge1 {
    /**
     * Age interval
     */
    value: string;
}

export type AdsStatsAge = AdsStatsAge1 & AdsDemographicStatsPeriodItemBase;

export interface AdsStatsCities1 {
    /**
     * City name
     */
    name: string;
}

export type AdsStatsCities = AdsStatsCities1 & AdsDemographicStatsPeriodItemBase;

export interface AdsStatsFormat {
    /**
     * Clicks number
     */
    clicks: number;
    /**
     * External clicks number
     */
    link_external_clicks: number;
    /**
     * Day as YYYY-MM-DD
     */
    day: string;
    /**
     * Impressions number
     */
    impressions: number;
    /**
     * Events number
     */
    join_rate: number;
    /**
     * Month as YYYY-MM
     */
    month: string;
    /**
     * Year as YYYY
     */
    year: number;
    /**
     * 1 if period=overall
     */
    overall: number;
    /**
     * Reach
     */
    reach: number;
    /**
     * Spent funds
     */
    spent: string;
    /**
     * Video plays unique started count
     */
    video_plays_unique_started: number;
    /**
     * Video plays unique 3 seconds count
     */
    video_plays_unique_3_seconds: number;
    /**
     * Video plays unique 10 seconds count
     */
    video_plays_unique_10_seconds: number;
    /**
     * Video plays unique 25 percents count
     */
    video_plays_unique_25_percents: number;
    /**
     * Video plays unique 50 percents count
     */
    video_plays_unique_50_percents: number;
    /**
     * Video plays unique 75 percents count
     */
    video_plays_unique_75_percents: number;
    /**
     * Video plays unique 100 percents count
     */
    video_plays_unique_100_percents: number;
    /**
     * Effective cost per click
     */
    effective_cost_per_click: string;
    /**
     * Effective cost per mille
     */
    effective_cost_per_mille: string;
    /**
     * Effective cpf
     */
    effective_cpf: string;
    /**
     * Effective cost per message
     */
    effective_cost_per_message: string;
    /**
     * Message sends count
     */
    message_sends: number;
    /**
     * Message sends by anu user
     */
    message_sends_by_any_user: number;
    /**
     * Conversions external
     */
    conversions_external: number;
    /**
     * Conversions count
     */
    conversion_count: number;
    /**
     * Conversions CR
     */
    conversion_cr: string;
    /**
     * Day from
     */
    day_from: string;
    /**
     * Day to
     */
    day_to: string;
    /**
     * Ctr
     */
    ctr: string;
    /**
     * Unique views count
     */
    uniq_views_count: number;
    [key: string]: any;
    mobile_app_stat: AdsMobileStatItem[];
}

export interface AdsStatsSex1 {
    value: AdsStatsSexValue;
}

export type AdsStatsSex = AdsStatsSex1 & AdsDemographicStatsPeriodItemBase;

export interface AdsStatsSexAge1 {
    /**
     * Sex and age interval
     */
    value: string;
}

export type AdsStatsSexAge = AdsStatsSexAge1 & AdsDemographicStatsPeriodItemBase;

export type AdsStatsSexValue = "f" | "m";

export interface AdsStatsViewsTimes {
    [key: string]: any;
    views_ads_times_1: number;
    views_ads_times_2: number;
    views_ads_times_3: number;
    views_ads_times_4: number;
    views_ads_times_5: string;
    views_ads_times_6: number;
    views_ads_times_7: number;
    views_ads_times_8: number;
    views_ads_times_9: number;
    views_ads_times_10: number;
    views_ads_times_11_plus: number;
}

export interface AdsStories {
    /**
     * Stories disclaimers text
     */
    stories_disclaimers_text: string;
    [key: string]: any;
    stories: AdsStoryItem[];
}

export interface AdsStoriesOwner {
    /**
     * Owner id
     */
    id: number;
    /**
     * Href
     */
    href: string;
    /**
     * Name
     */
    name: string;
    /**
     * Photo
     */
    photo: string;
    /**
     * Verify
     */
    verify: string;
    /**
     * Gender
     */
    gender: string;
    /**
     * Name get
     */
    name_get: string;
    /**
     * First name
     */
    firstName: string;
    /**
     * First name gen
     */
    first_name_gen: string;
    /**
     * First name ins
     */
    first_name_ins: string;
    /**
     * Can follow
     */
    can_follow: boolean | number;
    [key: string]: any;
}

export interface AdsStoryItem {
    /**
     * Story id
     */
    id: number;
    /**
     * Owner id
     */
    owner_id: number;
    /**
     * Story raw id
     */
    raw_id: string;
    /**
     * Date
     */
    date: string;
    /**
     * Time
     */
    time: number;
    /**
     * Type
     */
    type: string;
    /**
     * Is unread
     */
    unread: boolean | number;
    /**
     * Can like
     */
    canLike: boolean | number;
    /**
     * Can comment
     */
    can_comment: boolean | number;
    /**
     * Can share
     */
    can_share: boolean | number;
    /**
     * Can remove
     */
    can_remove: boolean | number;
    /**
     * Can manage
     */
    can_manage: boolean | number;
    /**
     * Can ask
     */
    can_ask: boolean | number;
    /**
     * Can ask anonymous
     */
    can_ask_anonymous: boolean | number;
    /**
     * Is profile question
     */
    isProfileQuestion: boolean | number;
    /**
     * Photo url
     */
    photo_url: string;
    /**
     * Preview url
     */
    preview_url: string;
    /**
     * Track code
     */
    track_code: string;
    /**
     * Is part of narrative
     */
    isPartOfNarrative: boolean | number;
    /**
     * Is ads
     */
    isAds: boolean | number;
    /**
     * Video url
     */
    video_url: string;
    /**
     * First frame
     */
    first_frame: string;
    /**
     * Small preview
     */
    small_preview: string;
    /**
     * Is liked
     */
    isLiked: boolean | number;
    [key: string]: any;
}

export interface AdsStoryItemLink {
    /**
     * Key
     */
    key: string;
    /**
     * Text
     */
    text: string;
    /**
     * Url
     */
    url: string;
    /**
     * Raw url
     */
    raw_url: string;
    [key: string]: any;
}

export interface AdsStoryItemStats {
    [key: string]: any;
}

/*Follow event stats*/
export interface AdsStoryItemStatsFollow {
    /**
     * Event type
     */
    event_type: string;
    /**
     * Event hash
     */
    rhash: string;
    [key: string]: any;
}

/*Url view event stats*/
export interface AdsStoryItemStatsUrlView {
    /**
     * Event type
     */
    event_type: string;
    /**
     * Event hash
     */
    rhash: string;
    [key: string]: any;
}

export interface AdsTargSettings1 {
    /**
     * Ad ID
     */
    id: string;
    /**
     * Campaign ID
     */
    campaign_id: string;
}

export type AdsTargSettings = AdsTargSettings1 & AdsCriteria;

export interface AdsTargStats {
    /**
     * Audience
     */
    audience_count: number;
    /**
     * Recommended CPC value for 50% reach (old format)
     */
    recommended_cpc: string;
    /**
     * Recommended CPM value for 50% reach (old format)
     */
    recommended_cpm: string;
    /**
     * Recommended CPC value for 50% reach
     */
    recommended_cpc_50: string;
    /**
     * Recommended CPM value for 50% reach
     */
    recommended_cpm_50: string;
    /**
     * Recommended CPC value for 70% reach
     */
    recommended_cpc_70: string;
    /**
     * Recommended CPM value for 70% reach
     */
    recommended_cpm_70: string;
    /**
     * Recommended CPC value for 90% reach
     */
    recommended_cpc_90: string;
    /**
     * Recommended CPM value for 90% reach
     */
    recommended_cpm_90: string;
    /**
     * Total alive audience
     */
    total_alive_audience: number;
    [key: string]: any;
}

export interface AdsTargSuggestions {
    /**
     * Object ID
     */
    id: number;
    /**
     * Object name
     */
    name: string;
    /**
     * Object type
     */
    type: string;
    /**
     * Parent
     */
    parent: string;
    [key: string]: any;
}

export interface AdsTargSuggestionsCities {
    /**
     * Object ID
     */
    id: number;
    /**
     * Object name
     */
    name: string;
    /**
     * Parent object
     */
    parent: string;
    [key: string]: any;
}

export interface AdsTargSuggestionsRegions {
    /**
     * Object ID
     */
    id: number;
    /**
     * Object name
     */
    name: string;
    /**
     * Object type
     */
    type: string;
    [key: string]: any;
}

export interface AdsTargSuggestionsSchools {
    /**
     * Full school title
     */
    desc: string;
    /**
     * School ID
     */
    id: number;
    /**
     * School title
     */
    name: string;
    /**
     * City name
     */
    parent: string;
    [key: string]: any;
}

export type AdsTargSuggestionsSchoolsType = "school" | "university" | "faculty" | "chair";

export interface AdsTargetGroup {
    /**
     * Group ID
     */
    id: number;
    /**
     * Group name
     */
    name: string;
    /**
     * Is audience
     */
    is_audience: boolean | number;
    /**
     * Is shared
     */
    is_shared: boolean | number;
    /**
     * File source
     */
    file_source: boolean | number;
    /**
     * API source
     */
    api_source: boolean | number;
    /**
     * File source
     */
    lookalike_source: boolean | number;
    /**
     * Audience
     */
    audience_count: number;
    /**
     * Site domain
     */
    domain: string;
    /**
     * Number of days for user to be in group
     */
    lifetime: number;
    /**
     * Pixel code
     */
    pixel: string;
    /**
     * Target Pixel id
     */
    target_pixel_id: number;
    /**
     * Last updated
     */
    last_updated: number;
    [key: string]: any;
    target_pixel_rules: AdsTargetGroupTargetPixelRule[];
}

export interface AdsTargetGroupTargetPixelRule {
    [key: string]: any;
    url_full_match: string;
    event_full_match: string;
    url_substrings_match: string[];
    event_substrings_match: string[];
    url_regex_match: string;
    event_regex_match: string;
}

export interface AdsTargetPixelInfo {
    [key: string]: any;
    target_pixel_id: number;
    name: string;
    domain: string;
    category_id: number;
    last_updated: number;
    pixel: string;
}

export interface AdsUpdateOfficeUsersResult {
    [key: string]: any;
    user_id: number;
    is_success: boolean | number;
}

export interface AdsUpdateAdsStatus {
    /**
     * Ad ID
     */
    id: number;
    /**
     * Error code
     */
    error_code: number;
    /**
     * Error description
     */
    error_desc: string;
    [key: string]: any;
}

export interface AdsUpdateClientsStatus {
    /**
     * Client ID
     */
    id: number;
    /**
     * Error code
     */
    error_code: number;
    /**
     * Error description
     */
    error_desc: string;
    [key: string]: any;
}

export interface AdsUserSpecification {
    [key: string]: any;
    user_id: number;
    grant_access_to_all_clients: boolean | number;
    client_ids: number[];
    view_budget: boolean | number;
}

export interface AdsUserSpecificationCutted {
    [key: string]: any;
    user_id: number;
    client_id: number;
    view_budget: boolean | number;
}

export interface AdsUsers {
    /**
     * User ID
     */
    user_id: number;
    [key: string]: any;
    accesses: AdsAccesses[];
}

export interface AdswebGetAdCategoriesResponseCategoriesCategory {
    [key: string]: any;
    id: number;
    name: string;
}

export interface AdswebGetAdUnitsResponseAdUnitsAdUnit {
    [key: string]: any;
    id: number;
    site_id: number;
    name: string;
}

export interface AdswebGetFraudHistoryResponseEntriesEntry {
    [key: string]: any;
    site_id: number;
    day: string;
}

export interface AdswebGetSitesResponseSitesSite {
    [key: string]: any;
    id: number;
    status_user: string;
    status_moder: string;
    domains: string;
}

export interface AdswebGetStatisticsResponseItemsItem {
    [key: string]: any;
    site_id: number;
    ad_unit_id: number;
    overall_count: number;
    months_count: number;
    month_min: string;
    month_max: string;
    days_count: number;
    day_min: string;
    day_max: string;
    hours_count: number;
    hour_min: string;
    hour_max: string;
}

export interface AppsApp1 {
    /**
     * Application author's URL
     */
    author_url: string;
    /**
     * URL of the app banner with 1120 px in width
     */
    banner_1120: string;
    /**
     * URL of the app banner with 560 px in width
     */
    banner_560: string;
    /**
     * URL of the app icon with 16 px in width
     */
    icon_16: string;
    /**
     * Catalog position
     */
    catalog_position: number;
    /**
     * Application description
     */
    description: string;
    /**
     * Genre name
     */
    genre: string;
    /**
     * Genre ID
     */
    genre_id: number;
    /**
     * Information whether the application is multilanguage
     */
    international: boolean | number;
    /**
     * Information whether application is in mobile catalog
     */
    is_in_catalog: number;
    /**
     * Members number
     */
    members_count: number;
    /**
     * Application ID in store
     */
    platform_id: string;
    /**
     * Date when the application has been published in Unixtime
     */
    published_date: number;
    /**
     * Screen name
     */
    screen_name: string;
    /**
     * Application section name
     */
    section: string;
    is_new: BaseBoolInt;
    push_enabled: BaseBoolInt;
    friends: number[];
    leaderboard_type: AppsAppLeaderboardType;
}

export type AppsApp = AppsAppMin & AppsApp1;

export type AppsAppFields = "author_group" | "author_id" | "author_url" | "banner_1120" | "banner_560" | "banner_186" | "banner_896" | "icon_16" | "icon_25" | "icon_50" | "icon_100" | "icon_200" | "icon_128" | "icon_256" | "is_new" | "new" | "is_html5_app" | "push_enabled" | "catalog_banner" | "friends" | "catalog_position" | "description" | "genre" | "genre_id" | "international" | "is_in_catalog" | "installed" | "leaderboard_type" | "members_count" | "platform_id" | "published_date" | "screen_name" | "section" | "type" | "id" | "title" | "author_owner_id" | "is_installed" | "icon_139" | "icon_150" | "icon_278" | "icon_576" | "background_loader_color" | "loader_icon" | "icon_75" | "open_in_external_browser" | "ad_config" | "screen_orientation";

export type AppsAppLeaderboardType = 0 | 1 | 2;

export interface AppsAppMin {
    /**
     * Application ID
     */
    id: number;
    /**
     * Application title
     */
    title: string;
    /**
     * Application author's ID
     */
    author_owner_id: number;
    /**
     * Is application installed
     */
    is_installed: boolean | number;
    /**
     * URL of the app icon with 139 px in width
     */
    icon_139: string;
    /**
     * URL of the app icon with 150 px in width
     */
    icon_150: string;
    /**
     * URL of the app icon with 278 px in width
     */
    icon_278: string;
    /**
     * URL of the app icon with 576 px in width
     */
    icon_576: string;
    /**
     * Hex color code without hash sign
     */
    background_loader_color: string;
    /**
     * SVG data
     */
    loader_icon: string;
    /**
     * URL of the app icon with 75 px in width
     */
    icon_75: string;
    /**
     * Screen orientation
     */
    screen_orientation: number;
    [key: string]: any;
}

export type AppsAppType = "app" | "game" | "site" | "standalone" | "vk_app" | "community_app" | "html5_game" | "mini_app";

export interface AppsCatalogList {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: AppsApp[];
    profiles: UsersUserMin[];
}

export interface AppsLeaderboard {
    /**
     * Level
     */
    level: number;
    /**
     * Points number
     */
    points: number;
    /**
     * Score number
     */
    score: number;
    /**
     * User ID
     */
    user_id: number;
    [key: string]: any;
}

/*Scope description*/
export interface AppsScope {
    /**
     * Scope name
     */
    name: "friends" | "photos" | "video" | "pages" | "status" | "notes" | "wall" | "docs" | "groups" | "stats" | "market" | "stories" | "app_widget" | "messages" | "manage" | "notify" | "audio" | "support" | "menu" | "wallmenu" | "ads" | "offline" | "notifications" | "email" | "adsweb" | "leads" | "group_messages" | "exchange" | "phone";
    /**
     * Scope title
     */
    title: string;
    [key: string]: any;
}

export interface AppsTestingGroup {
    [key: string]: any;
    user_ids: number[];
    group_id: number;
    name: string;
    webview: string;
    platforms: ("mobile" | "web" | "mvk")[];
}

export interface AppWidgetsPhoto {
    /**
     * Image ID
     */
    id: string;
    [key: string]: any;
    images: BaseImage[];
}

export interface AppWidgetsPhotos {
    [key: string]: any;
    count: number;
    items: AppWidgetsPhoto[];
}

export interface AsrTask {
    /**
     * Task ID in UUID format.
     */
    id: string;
    /**
     * Status of the task.
     */
    status: "processing" | "finished" | "internal_error" | "transcoding_error" | "recognition_error";
    /**
     * Recognised text, if task is `finished`.
     */
    text: string;
    [key: string]: any;
}

export interface AudioAudio {
    /**
     * Access key for the audio
     */
    access_key: string;
    /**
     * Artist name
     */
    artist: string;
    /**
     * Audio ID
     */
    id: number;
    /**
     * Audio owner's ID
     */
    owner_id: number;
    /**
     * Title
     */
    title: string;
    /**
     * URL of mp3 file
     */
    url: string;
    /**
     * Duration in seconds
     */
    duration: number;
    /**
     * Date when uploaded
     */
    date: number;
    /**
     * Album ID
     */
    album_id: number;
    /**
     * Performer name
     */
    performer: string;
    [key: string]: any;
}

export type BaseBoolInt = 0 | 1;

export interface BaseCity {
    /**
     * City ID
     */
    id: number;
    /**
     * City title
     */
    title: string;
    [key: string]: any;
}

export interface BaseCommentsInfo {
    /**
     * Comments number
     */
    count: number;
    /**
     * Information whether groups can comment the post
     */
    groups_can_post: boolean | number;
    [key: string]: any;
    list: WallWallComment[];
}

export interface BaseCountry {
    /**
     * Country ID
     */
    id: number;
    /**
     * Country title
     */
    title: string;
    [key: string]: any;
}

export interface BaseCropPhoto {
    [key: string]: any;
}

export interface BaseCropPhotoCrop {
    /**
     * Coordinate X of the left upper corner
     */
    x: number;
    /**
     * Coordinate Y of the left upper corner
     */
    y: number;
    /**
     * Coordinate X of the right lower corner
     */
    x2: number;
    /**
     * Coordinate Y of the right lower corner
     */
    y2: number;
    [key: string]: any;
}

export interface BaseCropPhotoRect {
    /**
     * Coordinate X of the left upper corner
     */
    x: number;
    /**
     * Coordinate Y of the left upper corner
     */
    y: number;
    /**
     * Coordinate X of the right lower corner
     */
    x2: number;
    /**
     * Coordinate Y of the right lower corner
     */
    y2: number;
    [key: string]: any;
}

export interface BaseError {
    /**
     * Error code
     */
    error_code: number;
    /**
     * Error subcode
     */
    error_subcode: number;
    /**
     * Error message
     */
    error_msg: string;
    /**
     * Localized error message
     */
    error_text: string;
    [key: string]: any;
    request_params: BaseRequestParam[];
}

export interface BaseGeo {
    /**
     * Information whether a map is showed
     */
    showmap: number;
    /**
     * Place type
     */
    type: string;
    [key: string]: any;
}

export interface BaseGeoCoordinates {
    [key: string]: any;
    latitude: number;
    longitude: number;
}

export interface BaseGradientPoint {
    /**
     * Hex color code without #
     */
    color: string;
    /**
     * Point position
     */
    position: number;
    [key: string]: any;
}

export interface BaseImage {
    /**
     * Image url
     */
    url: string;
    /**
     * Image width
     */
    width: number;
    /**
     * Image height
     */
    height: number;
    [key: string]: any;
    id: string;
    theme: "light" | "dark";
}

export type BaseLang = "ru" | "ua" | "be" | "en" | "es" | "fi" | "de" | "it";

export interface BaseLikes {
    /**
     * Likes number
     */
    count: number;
    [key: string]: any;
}

export interface BaseLikesInfo {
    /**
     * Likes number
     */
    count: number;
    /**
     * Remove repost feature for post
     */
    repost_disabled: boolean | number;
    [key: string]: any;
}

export interface BaseLink1 {
    text: string;
    product: BaseLinkProduct;
}

export type BaseLink = BaseLinkNoProduct & BaseLink1;

export interface BaseLinkApplication {
    /**
     * Application Id
     */
    app_id: number;
    [key: string]: any;
}

export interface BaseLinkApplicationStore {
    /**
     * Store Id
     */
    id: number;
    /**
     * Store name
     */
    name: string;
    [key: string]: any;
}

export interface BaseLinkButton {
    /**
     * Button title
     */
    title: string;
    /**
     * Target block id
     */
    block_id: string;
    /**
     * Target section id
     */
    section_id: string;
    /**
     * artist id
     */
    artist_id: string;
    /**
     * curator id
     */
    curator_id: number;
    /**
     * Video album id
     */
    album_id: number;
    /**
     * Owner id
     */
    owner_id: number;
    /**
     * Button icon name, e.g. 'phone' or 'gift'
     */
    icon: string;
    [key: string]: any;
    audio_id: number;
    hashtag: string;
}

export interface BaseLinkButtonAction {
    /**
     * Action URL
     */
    url: string;
    [key: string]: any;
    consume_reason: string;
}

export type BaseLinkButtonActionType = "open_url" | "market_clear_recent_queries" | "close_web_app" | "open_search_tab" | "import_contacts" | "add_friends" | "onboarding";

export type BaseLinkButtonStyle = "primary" | "secondary";

export interface BaseLinkNoProduct {
    /**
     * Link caption
     */
    caption: string;
    /**
     * Link description
     */
    description: string;
    /**
     * Link ID
     */
    id: string;
    /**
     * String ID of the page with article preview
     */
    preview_page: string;
    /**
     * URL of the page with article preview
     */
    preview_url: string;
    /**
     * Link title
     */
    title: string;
    /**
     * Link URL
     */
    url: string;
    /**
     * Information whether the current link is external
     */
    is_external: boolean | number;
    [key: string]: any;
    is_favorite: boolean | number;
}

export interface BaseLinkProduct {
    [key: string]: any;
    merchant: string;
    distance: number;
    city: string;
    orders_count: number;
    type: "product";
}

export type BaseLinkProductCategory = any;

export type BaseLinkProductStatus = "active" | "blocked" | "sold" | "deleted" | "archived";

export interface BaseLinkRating {
    /**
     * Count of reviews
     */
    reviews_count: number;
    /**
     * Count of stars
     */
    stars: number;
    [key: string]: any;
    type: "rating";
}

export interface BaseMessageError {
    /**
     * Error code
     */
    code: number;
    /**
     * Error message
     */
    description: string;
    [key: string]: any;
}

export type BaseNameCase = "Nom" | "Gen" | "Dat" | "Acc" | "Ins" | "Abl";

export interface BaseObject {
    /**
     * Object ID
     */
    id: number;
    /**
     * Object title
     */
    title: string;
    [key: string]: any;
}

export interface BaseObjectCount {
    /**
     * Items count
     */
    count: number;
    [key: string]: any;
}

export interface BaseObjectWithName {
    /**
     * Object ID
     */
    id: number;
    /**
     * Object name
     */
    name: string;
    [key: string]: any;
}

export interface BaseOwnerCover {
    [key: string]: any;
    images: BaseImage[];
    photo_id: number;
}

export interface BaseOwnerCoverCropParams {
    [key: string]: any;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface BasePlace {
    /**
     * Place address
     */
    address: string;
    /**
     * Checkins number
     */
    checkins: number;
    /**
     * City name
     */
    city: string;
    /**
     * Country name
     */
    country: string;
    /**
     * Date of the place creation in Unixtime
     */
    created: number;
    /**
     * URL of the place's icon
     */
    icon: string;
    /**
     * Place ID
     */
    id: number;
    /**
     * Place latitude
     */
    latitude: number;
    /**
     * Place longitude
     */
    longitude: number;
    /**
     * Place title
     */
    title: string;
    /**
     * Place type
     */
    type: string;
    [key: string]: any;
}

export type BasePropertyExists = 1;

/*Count of views*/
export interface BaseRepostsInfo {
    /**
     * Total reposts counter. Sum of wall and mail reposts counters
     */
    count: number;
    /**
     * Wall reposts counter
     */
    wall_count: number;
    /**
     * Mail reposts counter
     */
    mail_count: number;
    [key: string]: any;
}

export interface BaseRequestParam {
    /**
     * Parameter name
     */
    key: string;
    /**
     * Parameter value
     */
    value: string;
    [key: string]: any;
}

export type BaseSex = 0 | 1 | 2;

export type BaseSticker = any;

export interface BaseStickerAnimation {
    /**
     * Type of animation script
     */
    type: "light" | "dark";
    /**
     * URL of animation script
     */
    url: string;
    [key: string]: any;
}

export interface BaseStickerNew {
    /**
     * Sticker ID
     */
    sticker_id: number;
    /**
     * Pack ID
     */
    product_id: number;
    /**
     * URL of sticker animation script
     */
    animation_url: string;
    /**
     * Information whether the sticker is allowed
     */
    is_allowed: boolean | number;
    [key: string]: any;
    images: BaseImage[];
    images_with_background: BaseImage[];
    animations: BaseStickerAnimation[];
}

export interface BaseStickerOld {
    /**
     * Sticker ID
     */
    id: number;
    /**
     * Pack ID
     */
    product_id: number;
    /**
     * Width in px
     */
    width: number;
    /**
     * Height in px
     */
    height: number;
    /**
     * URL of the preview image with 128 px in height
     */
    photo_128: string;
    /**
     * URL of the preview image with 256 px in height
     */
    photo_256: string;
    /**
     * URL of the preview image with 352 px in height
     */
    photo_352: string;
    /**
     * URL of the preview image with 512 px in height
     */
    photo_512: string;
    /**
     * URL of the preview image with 64 px in height
     */
    photo_64: string;
    /**
     * Information whether the sticker is allowed
     */
    is_allowed: boolean | number;
    [key: string]: any;
}

export type BaseStickersList = BaseStickerNew[];

export interface BaseUploadServer {
    /**
     * Upload URL
     */
    upload_url: string;
    [key: string]: any;
}

export type BaseUserGroupFields = "about" | "action_button" | "activities" | "activity" | "addresses" | "admin_level" | "age_limits" | "author_id" | "ban_info" | "bdate" | "blacklisted" | "blacklisted_by_me" | "books" | "can_ban" | "can_create_topic" | "can_message" | "can_post" | "can_see_all_posts" | "can_see_audio" | "can_send_friend_request" | "can_upload_video" | "can_write_private_message" | "career" | "city" | "common_count" | "connections" | "contacts" | "counters" | "country" | "cover" | "crop_photo" | "deactivated" | "description" | "domain" | "education" | "exports" | "finish_date" | "fixed_post" | "followers_count" | "friend_status" | "games" | "has_market_app" | "has_mobile" | "has_photo" | "home_town" | "id" | "interests" | "is_admin" | "is_closed" | "is_favorite" | "is_friend" | "is_best_friend" | "is_hidden_from_feed" | "is_member" | "is_messages_blocked" | "can_send_notify" | "is_subscribed" | "last_seen" | "links" | "lists" | "maiden_name" | "main_album_id" | "main_section" | "market" | "member_status" | "members_count" | "military" | "movies" | "music" | "name" | "nickname" | "occupation" | "online" | "online_status" | "personal" | "phone" | "photo_100" | "photo_200" | "photo_200_orig" | "photo_400_orig" | "photo_50" | "photo_id" | "photo_max" | "photo_max_orig" | "photo_avg_color" | "quotes" | "relation" | "relatives" | "schools" | "screen_name" | "sex" | "site" | "start_date" | "status" | "timezone" | "trending" | "tv" | "type" | "universities" | "verified" | "wall_comments" | "wiki_page" | "first_name" | "first_name_acc" | "first_name_dat" | "first_name_gen" | "last_name" | "last_name_acc" | "last_name_dat" | "last_name_gen" | "can_subscribe_stories" | "is_subscribed_stories" | "vk_admin_status" | "can_upload_story" | "clips_count" | "image_status" | "is_nft" | "is_nft_photo";

export interface BaseUserId {
    /**
     * User ID
     */
    user_id: number;
    [key: string]: any;
}

export type BoardDefaultOrder = 1 | 2 | -1 | -2;

export interface BoardTopic {
    /**
     * Comments number
     */
    comments: number;
    /**
     * Date when the topic has been created in Unixtime
     */
    created: number;
    /**
     * Creator ID
     */
    created_by: number;
    /**
     * Topic ID
     */
    id: number;
    /**
     * Topic title
     */
    title: string;
    /**
     * Date when the topic has been updated in Unixtime
     */
    updated: number;
    /**
     * ID of user who updated the topic
     */
    updated_by: number;
    /**
     * First comment text
     */
    first_comment: string;
    /**
     * Last comment text
     */
    last_comment: string;
    [key: string]: any;
}

export interface BoardTopicComment {
    /**
     * Date when the comment has been added in Unixtime
     */
    date: number;
    /**
     * Author ID
     */
    from_id: number;
    /**
     * Comment ID
     */
    id: number;
    /**
     * Real position of the comment
     */
    real_offset: number;
    /**
     * Comment text
     */
    text: string;
    [key: string]: any;
    attachments: WallCommentAttachment[];
}

export interface BugtrackerAddCompanyGroupsMembersError {
    [key: string]: any;
    group_id: number;
    user_id: number;
}

export interface BugtrackerAttachment {
    [key: string]: any;
    type: "photo" | "doc";
}

export interface BugtrackerBugreportSubscribeState {
    [key: string]: any;
    can_set_subscribe: boolean | number;
    is_subscribed: boolean | number;
    set_subscribe_hash: string;
}

export interface BugtrackerComment {
    [key: string]: any;
    bugreport_id: number;
    comment_id: number;
    created: number;
    text: string;
    meta_text: string;
    from_id: number;
    author_name: string;
    author_photo: string;
    edit_hash: string;
    remove_hash: string;
    is_hidden: boolean | number;
    attachments: BugtrackerAttachment[];
    is_unread: boolean | number;
}

export interface BugtrackerCompanyMember {
    [key: string]: any;
    user_id: number;
    company_id: number;
    role: number;
    role_name: string;
    ts: number;
    groups_count: number;
    products_count: number;
    reporter_url: string;
    groups: number[];
    products: BugtrackerCompanyMemberProduct[];
}

export interface BugtrackerCompanyMemberProduct {
    [key: string]: any;
    id: number;
    title: string;
    photo_url: string;
    access: number;
    status: number;
    licence_status_text: string;
}

export interface CallbackBase {
    /**
     * Unique event id. If it passed twice or more - you should ignore it.
     */
    event_id: string;
    /**
     * API object version
     */
    v: string;
    [key: string]: any;
    group_id: number;
    secret: string;
}

export interface CallbackBoardPostDelete {
    [key: string]: any;
    topic_owner_id: number;
    topic_id: number;
    id: number;
}

export interface CallbackConfirmation1 {
    type: CallbackType;
}

export type CallbackConfirmation = CallbackBase & CallbackConfirmation1;

export interface CallbackDonutMoneyWithdraw {
    [key: string]: any;
    amount: number;
    amount_without_fee: number;
}

export interface CallbackDonutMoneyWithdrawError {
    [key: string]: any;
    reason: string;
}

export interface CallbackDonutSubscriptionCancelled {
    [key: string]: any;
    user_id: number;
}

export interface CallbackDonutSubscriptionCreate {
    [key: string]: any;
    user_id: number;
    amount: number;
    amount_without_fee: number;
}

export interface CallbackDonutSubscriptionExpired {
    [key: string]: any;
    user_id: number;
}

export interface CallbackDonutSubscriptionPriceChanged {
    [key: string]: any;
    user_id: number;
    amount_old: number;
    amount_new: number;
    amount_diff: number;
    amount_diff_without_fee: number;
}

export interface CallbackDonutSubscriptionProlonged {
    [key: string]: any;
    user_id: number;
    amount: number;
    amount_without_fee: number;
}

export interface CallbackGroupChangePhoto {
    [key: string]: any;
    user_id: number;
}

export interface CallbackGroupChangeSettings {
    [key: string]: any;
    user_id: number;
}

export interface CallbackGroupJoin {
    [key: string]: any;
    user_id: number;
}

export type CallbackGroupJoinType = "join" | "unsure" | "accepted" | "approved" | "request";

export interface CallbackGroupLeave {
    [key: string]: any;
    user_id: number;
}

export type CallbackGroupMarket = 0 | 1;

export type CallbackGroupOfficerRole = 0 | 1 | 2 | 3;

export interface CallbackGroupOfficersEdit {
    [key: string]: any;
    admin_id: number;
    user_id: number;
}

export interface CallbackGroupSettingsChanges {
    [key: string]: any;
    title: string;
    description: string;
    screen_name: string;
    public_category: number;
    public_subcategory: number;
    website: string;
}

export interface CallbackLikeAddRemove {
    [key: string]: any;
    liker_id: number;
    object_type: "video" | "photo" | "post" | "comment" | "note" | "topic_comment" | "photo_comment" | "video_comment" | "market" | "market_comment";
    object_owner_id: number;
    object_id: number;
    post_id: number;
    thread_reply_id: number;
}

export interface CallbackMarketComment {
    [key: string]: any;
    id: number;
    from_id: number;
    date: number;
    text: string;
    market_owner_id: number;
    photo_id: number;
}

export interface CallbackMarketCommentDelete {
    [key: string]: any;
    owner_id: number;
    id: number;
    user_id: number;
    item_id: number;
}

export interface CallbackMessageAllow1 {
    type: CallbackType;
    object: CallbackMessageAllowObject;
}

export type CallbackMessageAllow = CallbackBase & CallbackMessageAllow1;

export interface CallbackMessageAllowObject {
    [key: string]: any;
    user_id: number;
    key: string;
}

export interface CallbackMessageDeny {
    [key: string]: any;
    user_id: number;
}

export interface CallbackMessageEdit1 {
    type: CallbackType;
    object: MessagesMessage;
}

export type CallbackMessageEdit = CallbackBase & CallbackMessageEdit1;

export interface CallbackMessageNew1 {
    type: CallbackType;
    object: CallbackMessageObject;
}

export type CallbackMessageNew = CallbackBase & CallbackMessageNew1;

export interface CallbackMessageObject {
    [key: string]: any;
}

export interface CallbackMessageReply1 {
    type: CallbackType;
    object: MessagesMessage;
}

export type CallbackMessageReply = CallbackBase & CallbackMessageReply1;

export interface CallbackPhotoComment {
    [key: string]: any;
    id: number;
    from_id: number;
    date: number;
    text: string;
    photo_owner_id: number;
}

export interface CallbackPhotoCommentDelete {
    [key: string]: any;
    id: number;
    owner_id: number;
    user_id: number;
    photo_id: number;
}

export interface CallbackPollVoteNew {
    [key: string]: any;
    owner_id: number;
    poll_id: number;
    option_id: number;
    user_id: number;
}

export type CallbackType = "audio_new" | "board_post_new" | "board_post_edit" | "board_post_restore" | "board_post_delete" | "confirmation" | "group_leave" | "group_join" | "group_change_photo" | "group_change_settings" | "group_officers_edit" | "lead_forms_new" | "market_comment_new" | "market_comment_delete" | "market_comment_edit" | "market_comment_restore" | "market_order_new" | "market_order_edit" | "message_new" | "message_reply" | "message_edit" | "message_allow" | "message_deny" | "message_read" | "message_typing_state" | "messages_edit" | "message_reaction_event" | "photo_new" | "photo_comment_new" | "photo_comment_delete" | "photo_comment_edit" | "photo_comment_restore" | "poll_vote_new" | "user_block" | "user_unblock" | "video_new" | "video_comment_new" | "video_comment_delete" | "video_comment_edit" | "video_comment_restore" | "wall_post_new" | "wall_reply_new" | "wall_reply_edit" | "wall_reply_delete" | "wall_reply_restore" | "wall_repost";

export interface CallbackUserBlock {
    [key: string]: any;
    admin_id: number;
    user_id: number;
    unblock_date: number;
    reason: number;
    comment: string;
}

export interface CallbackUserUnblock {
    [key: string]: any;
    admin_id: number;
    user_id: number;
    by_end_date: number;
}

export interface CallbackVideoComment {
    [key: string]: any;
    id: number;
    from_id: number;
    date: number;
    text: string;
    video_owner_id: number;
}

export interface CallbackVideoCommentDelete {
    [key: string]: any;
    id: number;
    owner_id: number;
    user_id: number;
    video_id: number;
}

export interface CallbackWallCommentDelete {
    [key: string]: any;
    owner_id: number;
    id: number;
    user_id: number;
    post_id: number;
}

export interface CallsCall {
    /**
     * Call duration
     */
    duration: number;
    /**
     * Caller initiator
     */
    initiator_id: number;
    /**
     * Caller receiver
     */
    receiver_id: number;
    /**
     * Timestamp for call
     */
    time: number;
    /**
     * Was this call initiated as video call
     */
    video: boolean | number;
    [key: string]: any;
}

export type CallsEndState = "canceled_by_initiator" | "canceled_by_receiver" | "reached";

export interface CallsParticipants {
    /**
     * Participants count
     */
    count: number;
    [key: string]: any;
    list: number[];
}

export interface ClientInfoForBots {
    /**
     * client has support keyboard
     */
    keyboard: boolean | number;
    /**
     * client has support inline keyboard
     */
    inline_keyboard: boolean | number;
    /**
     * client has support carousel
     */
    carousel: boolean | number;
    /**
     * client or user language id
     */
    lang_id: number;
    [key: string]: any;
    button_actions: MessagesTemplateActionTypeNames[];
}

export interface CommentThread {
    /**
     * Comments number
     */
    count: number;
    /**
     * Information whether current user can comment the post
     */
    can_post: boolean | number;
    /**
     * Information whether recommended to display reply button
     */
    show_reply_button: boolean | number;
    /**
     * Information whether groups can comment the post
     */
    groups_can_post: boolean | number;
    [key: string]: any;
    items: WallWallComment[];
}

export interface DatabaseCity1 {
    /**
     * Area title
     */
    area: string;
    /**
     * Region title
     */
    region: string;
    /**
     * Country title
     */
    country: string;
    important: BaseBoolInt;
}

export type DatabaseCity = BaseObject & DatabaseCity1;

export type DatabaseCityById = BaseObject;

export interface DatabaseFaculty {
    /**
     * Faculty ID
     */
    id: number;
    /**
     * Faculty title
     */
    title: string;
    [key: string]: any;
}

export interface DatabaseLanguageFull {
    /**
     * Language ID
     */
    id: number;
    /**
     * Language native name
     */
    native_name: string;
    [key: string]: any;
}

export interface DatabaseRegion {
    /**
     * Region ID
     */
    id: number;
    /**
     * Region title
     */
    title: string;
    [key: string]: any;
}

export interface DatabaseSchool {
    /**
     * School ID
     */
    id: number;
    /**
     * School title
     */
    title: string;
    [key: string]: any;
}

export type DatabaseSchoolClass = BaseObject;

export interface DatabaseStation {
    /**
     * City ID
     */
    city_id: number;
    /**
     * Hex color code without #
     */
    color: string;
    /**
     * Station ID
     */
    id: number;
    /**
     * Station name
     */
    name: string;
    [key: string]: any;
}

export interface DatabaseUniversity {
    /**
     * University ID
     */
    id: number;
    /**
     * University title
     */
    title: string;
    [key: string]: any;
}

export interface DocsDoc {
    /**
     * Document ID
     */
    id: number;
    /**
     * Document owner ID
     */
    owner_id: number;
    /**
     * Document title
     */
    title: string;
    /**
     * File size in bites
     */
    size: number;
    /**
     * File extension
     */
    ext: string;
    /**
     * File URL
     */
    url: string;
    /**
     * Date when file has been uploaded in Unixtime
     */
    date: number;
    /**
     * Document type
     */
    type: number;
    /**
     * Access key for the document
     */
    access_key: string;
    [key: string]: any;
    tags: string[];
}

export type DocsDocAttachmentType = "doc" | "graffiti" | "audio_message";

export interface DocsDocPreview {
    [key: string]: any;
}

export interface DocsDocPreviewAudioMsg {
    /**
     * Audio message duration in seconds
     */
    duration: number;
    /**
     * MP3 file URL
     */
    link_mp3: string;
    /**
     * OGG file URL
     */
    link_ogg: string;
    /**
     * Sound visualisation
     */
    waveform: number[];
    [key: string]: any;
}

export interface DocsDocPreviewGraffiti {
    /**
     * Graffiti file URL
     */
    src: string;
    /**
     * Graffiti width
     */
    width: number;
    /**
     * Graffiti height
     */
    height: number;
    [key: string]: any;
}

export interface DocsDocPreviewPhoto {
    [key: string]: any;
    sizes: DocsDocPreviewPhotoSizes[];
}

export interface DocsDocPreviewPhotoSizes {
    /**
     * URL of the image
     */
    src: string;
    /**
     * Width in px
     */
    width: number;
    /**
     * Height in px
     */
    height: number;
    [key: string]: any;
}

export interface DocsDocPreviewVideo {
    /**
     * Video URL
     */
    src: string;
    /**
     * Video's width in pixels
     */
    width: number;
    /**
     * Video's height in pixels
     */
    height: number;
    /**
     * Video file size in bites
     */
    file_size: number;
    [key: string]: any;
}

export interface DocsDocTypes {
    /**
     * Doc type ID
     */
    id: number;
    /**
     * Doc type title
     */
    name: string;
    /**
     * Number of docs
     */
    count: number;
    [key: string]: any;
}

/*Info about user VK Donut subscription*/
export interface DonutDonatorSubscriptionInfo {
    [key: string]: any;
    owner_id: number;
    next_payment_date: number;
    amount: number;
    status: "active" | "expiring";
}

export interface EventsEventAttach {
    /**
     * address of event
     */
    address: string;
    /**
     * text of attach
     */
    button_text: string;
    /**
     * event ID
     */
    id: number;
    /**
     * is favorite
     */
    is_favorite: boolean | number;
    /**
     * text of attach
     */
    text: string;
    /**
     * event start time
     */
    time: number;
    [key: string]: any;
    friends: number[];
}

export interface FaveBookmark {
    /**
     * Timestamp, when this item was bookmarked
     */
    added_date: number;
    /**
     * Has user seen this item
     */
    seen: boolean | number;
    [key: string]: any;
    tags: FaveTag[];
}

export type FaveBookmarkType = "post" | "video" | "product" | "article" | "link" | "clip";

export interface FavePage {
    /**
     * Some info about user or group
     */
    description: string;
    /**
     * Timestamp, when this page was bookmarked
     */
    updated_date: number;
    [key: string]: any;
    tags: FaveTag[];
}

export type FavePageType = "user" | "group" | "hints";

export interface FaveTag {
    /**
     * Tag id
     */
    id: number;
    /**
     * Tag name
     */
    name: string;
    [key: string]: any;
}

export interface FriendsFriendExtendedStatus1 {
    /**
     * Is friend request from other user unread
     */
    is_request_unread: boolean | number;
}

export type FriendsFriendExtendedStatus = FriendsFriendStatus & FriendsFriendExtendedStatus1;

export interface FriendsFriendStatus {
    /**
     * MD5 hash for the result validation
     */
    sign: string;
    /**
     * User ID
     */
    user_id: number;
    [key: string]: any;
}

export type FriendsFriendStatusStatus = 0 | 1 | 2 | 3;

export interface FriendsFriendsList {
    /**
     * List ID
     */
    id: number;
    /**
     * List title
     */
    name: string;
    [key: string]: any;
}

export interface FriendsMutualFriend {
    /**
     * Total mutual friends number
     */
    common_count: number;
    /**
     * User ID
     */
    common_friends: number[];
    /**
     * User ID
     */
    id: number;
    [key: string]: any;
}

export interface FriendsRequestsMutual {
    /**
     * Total mutual friends number
     */
    count: number;
    /**
     * User ID
     */
    users: number[];
    [key: string]: any;
}

export interface FriendsRequestsXtrMessage1 {
    /**
     * Message sent with a request
     */
    message: string;
}

export type FriendsRequestsXtrMessage = FriendsRequestsXtrMutual & FriendsRequestsXtrMessage1;

export interface FriendsRequestsXtrMutual1 {
    /**
     * User ID
     */
    id: number;
    /**
     * User ID
     */
    user_id: number;
    /**
     * ID of the user by whom friend has been suggested
     */
    from: string;
    /**
     * Message sent with a request
     */
    message: string;
    /**
     * Request timestamp
     */
    timestamp: number;
    /**
     * Description
     */
    descriptions: string[];
    mutual: FriendsRequestsMutual;
    track_code: string;
}

export type FriendsRequestsXtrMutual = UsersUserFull & FriendsRequestsXtrMutual1;

export interface FriendsUserXtrPhone1 {
    /**
     * User phone
     */
    phone: string;
}

export type FriendsUserXtrPhone = UsersUserFull & FriendsUserXtrPhone1;

export interface GiftsGift {
    /**
     * Date when gist has been sent in Unixtime
     */
    date: number;
    /**
     * Gift sender ID
     */
    from_id: number;
    /**
     * Hash
     */
    gift_hash: string;
    /**
     * Gift ID
     */
    id: number;
    /**
     * Comment text
     */
    message: string;
    [key: string]: any;
}

export type GiftsGiftPrivacy = 0 | 1 | 2;

export interface GiftsLayout {
    /**
     * Gift ID
     */
    id: number;
    /**
     * URL of the preview image with 512 px in width
     */
    thumb_512: string;
    /**
     * URL of the preview image with 256 px in width
     */
    thumb_256: string;
    /**
     * URL of the preview image with 48 px in width
     */
    thumb_48: string;
    /**
     * URL of the preview image with 96 px in width
     */
    thumb_96: string;
    /**
     * ID of the sticker pack, if the gift is representing one
     */
    stickers_product_id: number;
    /**
     * Information whether gift represents a stickers style
     */
    is_stickers_style: boolean | number;
    /**
     * ID of the build of constructor gift
     */
    build_id: string;
    /**
     * Keywords used for search
     */
    keywords: string;
    [key: string]: any;
}

export interface GroupsAddress {
    /**
     * Additional address to the place (6 floor, left door)
     */
    additional_address: string;
    /**
     * String address to the place (Nevsky, 28)
     */
    address: string;
    /**
     * City id of address
     */
    city_id: number;
    /**
     * Country id of address
     */
    country_id: number;
    /**
     * Distance from the point
     */
    distance: number;
    /**
     * Address id
     */
    id: number;
    /**
     * Address latitude
     */
    latitude: number;
    /**
     * Address longitude
     */
    longitude: number;
    /**
     * Metro id of address
     */
    metro_station_id: number;
    /**
     * Address phone
     */
    phone: string;
    /**
     * Time offset int minutes from utc time
     */
    time_offset: number;
    /**
     * Title of the place (Zinger, etc)
     */
    title: string;
    [key: string]: any;
    place_id: number;
}

/*Timetable for a week*/
export interface GroupsAddressTimetable {
    [key: string]: any;
}

/*Timetable for one day*/
export interface GroupsAddressTimetableDay {
    /**
     * Close time of the break in minutes
     */
    break_close_time: number;
    /**
     * Start time of the break in minutes
     */
    break_open_time: number;
    /**
     * Close time in minutes
     */
    close_time: number;
    /**
     * Open time in minutes
     */
    open_time: number;
    [key: string]: any;
}

export type GroupsAddressWorkInfoStatus = "no_information" | "temporarily_closed" | "always_opened" | "timetable" | "forever_closed";

export interface GroupsAddressesInfo {
    /**
     * Information whether addresses is enabled
     */
    is_enabled: boolean | number;
    /**
     * Main address id for group
     */
    main_address_id: number;
    /**
     * Count of addresses
     */
    count: number;
    [key: string]: any;
}

export interface GroupsBanInfo {
    /**
     * Administrator ID
     */
    admin_id: number;
    /**
     * Comment for a ban
     */
    comment: string;
    /**
     * Show comment for user
     */
    comment_visible: boolean | number;
    /**
     * Date when user has been added to blacklist in Unixtime
     */
    date: number;
    /**
     * Date when user will be removed from blacklist in Unixtime
     */
    end_date: number;
    [key: string]: any;
    is_closed: boolean | number;
}

export type GroupsBanInfoReason = 0 | 1 | 2 | 3 | 4;

export type GroupsBannedItem = GroupsOwnerXtrBanInfo;

export interface GroupsCallbackServer {
    [key: string]: any;
    id: number;
    title: string;
    creator_id: number;
    url: string;
    secret_key: string;
    status: "unconfigured" | "failed" | "wait" | "ok";
}

export interface GroupsCallbackSettings {
    /**
     * API version used for the events
     */
    api_version: string;
    [key: string]: any;
}

export interface GroupsClassifiedsProperties {
    [key: string]: any;
}

export interface GroupsContactsItem {
    /**
     * User ID
     */
    user_id: number;
    /**
     * Contact description
     */
    desc: string;
    /**
     * Contact phone
     */
    phone: string;
    /**
     * Contact email
     */
    email: string;
    [key: string]: any;
}

export interface GroupsCountersGroup {
    /**
     * Addresses number
     */
    addresses: number;
    /**
     * Photo albums number
     */
    albums: number;
    /**
     * Audios number
     */
    audios: number;
    /**
     * Audio playlists number
     */
    audio_playlists: number;
    /**
     * Docs number
     */
    docs: number;
    /**
     * Market items number
     */
    market: number;
    /**
     * Photos number
     */
    photos: number;
    /**
     * Topics number
     */
    topics: number;
    /**
     * Videos number
     */
    videos: number;
    /**
     * Playlists number
     */
    video_playlists: number;
    /**
     * Market services number
     */
    market_services: number;
    /**
     * Podcasts number
     */
    podcasts: number;
    /**
     * Articles number
     */
    articles: number;
    /**
     * Narratives number
     */
    narratives: number;
    /**
     * Clips number
     */
    clips: number;
    /**
     * Clips followers number
     */
    clips_followers: number;
    /**
     * Videos followers number
     */
    videos_followers: number;
    /**
     * Clips views number
     */
    clips_views: number;
    /**
     * Clips likes number
     */
    clips_likes: number;
    [key: string]: any;
}

export type GroupsFields = "id" | "name" | "screen_name" | "is_closed" | "type" | "is_admin" | "admin_level" | "is_member" | "is_advertiser" | "start_date" | "finish_date" | "deactivated" | "photo_50" | "photo_100" | "photo_200" | "photo_200_orig" | "photo_400" | "photo_400_orig" | "photo_max" | "photo_max_orig" | "est_date" | "public_date_label" | "photo_max_size" | "is_video_live_notifications_blocked" | "video_live" | "market" | "member_status" | "is_adult" | "is_hidden_from_feed" | "is_favorite" | "is_subscribed" | "city" | "country" | "verified" | "description" | "wiki_page" | "members_count" | "members_count_text" | "requests_count" | "video_live_level" | "video_live_count" | "clips_count" | "textlives_count" | "counters" | "cover" | "can_post" | "can_suggest" | "can_upload_story" | "can_upload_doc" | "can_upload_video" | "can_upload_clip" | "can_see_all_posts" | "can_create_topic" | "activity" | "fixed_post" | "has_photo" | "crop_photo" | "status" | "status_audio" | "main_album_id" | "links" | "contacts" | "wall" | "site" | "main_section" | "secondary_section" | "trending" | "can_message" | "is_messages_blocked" | "can_send_notify" | "online_status" | "invited_by" | "age_limits" | "ban_info" | "has_market_app" | "using_vkpay_market_app" | "has_group_channel" | "addresses" | "is_subscribed_podcasts" | "can_subscribe_podcasts" | "can_subscribe_posts" | "live_covers" | "stories_archive_count" | "has_unseen_stories" | "rating";

export type GroupsFilter = "admin" | "editor" | "moder" | "advertiser" | "groups" | "publics" | "events" | "has_addresses";

export interface GroupsGroup {
    /**
     * Community ID
     */
    id: number;
    /**
     * Community name
     */
    name: string;
    /**
     * Domain of the community page
     */
    screen_name: string;
    /**
     * Start date in Unixtime format
     */
    start_date: number;
    /**
     * Finish date in Unixtime format
     */
    finish_date: number;
    /**
     * Information whether community is banned
     */
    deactivated: string;
    /**
     * URL of square photo of the community with 50 pixels in width
     */
    photo_50: string;
    /**
     * URL of square photo of the community with 100 pixels in width
     */
    photo_100: string;
    /**
     * URL of square photo of the community with 200 pixels in width
     */
    photo_200: string;
    /**
     * URL of square photo of the community with 200 pixels in width original
     */
    photo_200_orig: string;
    /**
     * URL of square photo of the community with 400 pixels in width
     */
    photo_400: string;
    /**
     * URL of square photo of the community with 400 pixels in width original
     */
    photo_400_orig: string;
    /**
     * URL of square photo of the community with max pixels in width
     */
    photo_max: string;
    /**
     * URL of square photo of the community with max pixels in width original
     */
    photo_max_orig: string;
    /**
     * Established date
     */
    est_date: string;
    /**
     * Public date label
     */
    public_date_label: string;
    [key: string]: any;
}

export type GroupsGroupAccess = 0 | 1 | 2;

export type GroupsGroupAdminLevel = 1 | 2 | 3;

export type GroupsGroupAgeLimits = 1 | 2 | 3;

export interface GroupsGroupAttach {
    /**
     * group ID
     */
    id: number;
    /**
     * text of attach
     */
    text: string;
    /**
     * activity or category of group
     */
    status: string;
    /**
     * size of group
     */
    size: number;
    /**
     * is favorite
     */
    is_favorite: boolean | number;
    [key: string]: any;
}

export type GroupsGroupAudio = 0 | 1 | 2;

export interface GroupsGroupBanInfo {
    /**
     * Ban comment
     */
    comment: string;
    /**
     * End date of ban in Unixtime
     */
    end_date: number;
    [key: string]: any;
}

export interface GroupsGroupCategory {
    /**
     * Category ID
     */
    id: number;
    /**
     * Category name
     */
    name: string;
    [key: string]: any;
    subcategories: GroupsGroupSubcategory[];
}

export interface GroupsGroupCategoryFull {
    /**
     * Category ID
     */
    id: number;
    /**
     * Category name
     */
    name: string;
    /**
     * Pages number
     */
    page_count: number;
    [key: string]: any;
    page_previews: GroupsGroup[];
    subcategories: GroupsGroupCategory[];
}

export interface GroupsGroupCategoryType {
    [key: string]: any;
    id: number;
    name: string;
}

export type GroupsGroupDocs = 0 | 1 | 2;

export interface GroupsGroupFull1 {
    /**
     * Community description
     */
    description: string;
    /**
     * Community's main wiki page title
     */
    wiki_page: string;
    /**
     * Community members number
     */
    members_count: number;
    /**
     * Info about number of users in group
     */
    members_count_text: string;
    /**
     * The number of incoming requests to the community
     */
    requests_count: number;
    /**
     * Community level live streams achievements
     */
    video_live_level: number;
    /**
     * Number of community's live streams
     */
    video_live_count: number;
    /**
     * Number of community's clips
     */
    clips_count: number;
    /**
     * Textlives number
     */
    textlives_count: number;
    /**
     * Information whether current user can call to community
     */
    can_call_to_community: boolean | number;
    /**
     * Type of group, start date of event or category of public page
     */
    activity: string;
    /**
     * Fixed post ID
     */
    fixed_post: number;
    /**
     * Community status
     */
    status: string;
    /**
     * Community's main photo album ID
     */
    main_album_id: number;
    /**
     * Information about wall status in community
     */
    wall: 0 | 1 | 2 | 3;
    /**
     * Community's website
     */
    site: string;
    /**
     * Inviter ID
     */
    invited_by: number;
    /**
     * Information whether current user is subscribed to podcasts
     */
    is_subscribed_podcasts: boolean | number;
    /**
     * Owner in whitelist or not
     */
    can_subscribe_podcasts: boolean | number;
    /**
     * Can subscribe to wall
     */
    can_subscribe_posts: boolean | number;
    member_status: GroupsGroupFullMemberStatus;
    is_adult: BaseBoolInt;
    is_hidden_from_feed: BaseBoolInt;
    is_favorite: BaseBoolInt;
    is_subscribed: BaseBoolInt;
    city: BaseObject;
    country: BaseCountry;
    counters: GroupsCountersGroup;
    cover: BaseOwnerCover;
    can_post: BaseBoolInt;
    can_suggest: BaseBoolInt;
    can_upload_story: BaseBoolInt;
    can_upload_doc: BaseBoolInt;
    can_upload_video: BaseBoolInt;
    can_upload_clip: BaseBoolInt;
    can_see_all_posts: BaseBoolInt;
    can_create_topic: BaseBoolInt;
    has_photo: BaseBoolInt;
    crop_photo: BaseCropPhoto;
    status_audio: AudioAudio;
    links: GroupsLinksItem[];
    contacts: GroupsContactsItem[];
    main_section: GroupsGroupFullSection;
    secondary_section: GroupsGroupFullSection;
    trending: BaseBoolInt;
    can_message: BaseBoolInt;
    is_messages_blocked: BaseBoolInt;
    can_send_notify: BaseBoolInt;
    online_status: GroupsOnlineStatus;
    age_limits: GroupsGroupFullAgeLimits;
    ban_info: GroupsGroupBanInfo;
    has_group_channel: boolean | number;
    addresses: GroupsAddressesInfo;
    live_covers: GroupsLiveCovers;
    stories_archive_count: number;
    has_unseen_stories: boolean | number;
}

export type GroupsGroupFull = GroupsGroup & GroupsMarketProperties & GroupsClassifiedsProperties & GroupsGroupFull1;

export type GroupsGroupFullAgeLimits = 1 | 2 | 3;

export type GroupsGroupFullMemberStatus = 0 | 1 | 2 | 3 | 4 | 5;

export type GroupsGroupFullSection = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 24 | 26 | 27 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 53 | 54 | 55 | 57 | 58 | 59 | 60 | 61 | 62;

export type GroupsGroupIsClosed = 0 | 1 | 2;

export type GroupsGroupMarketCurrency = 643 | 980 | 398 | 978 | 840;

export type GroupsGroupPhotos = 0 | 1 | 2;

export interface GroupsGroupPublicCategoryList {
    [key: string]: any;
    id: number;
    name: string;
    subcategories: GroupsGroupCategoryType[];
}

export type GroupsGroupRole = "moderator" | "editor" | "administrator" | "advertiser";

export interface GroupsGroupSubcategory {
    /**
     * Object ID
     */
    id: number;
    /**
     * Object name
     */
    name: string;
    [key: string]: any;
    genders: BaseObjectWithName[];
}

export type GroupsGroupSubject = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42;

export type GroupsGroupSuggestedPrivacy = 0 | 1 | 2;

export interface GroupsGroupTag {
    [key: string]: any;
    id: number;
    name: string;
    color: "454647" | "45678f" | "4bb34b" | "5181b8" | "539b9c" | "5c9ce6" | "63b9ba" | "6bc76b" | "76787a" | "792ec0" | "7a6c4f" | "7ececf" | "9e8d6b" | "a162de" | "aaaeb3" | "bbaa84" | "e64646" | "ff5c5c" | "ffa000" | "ffc107";
    uses: number;
}

export type GroupsGroupTopics = 0 | 1 | 2;

export type GroupsGroupType = "group" | "page" | "event";

export type GroupsGroupVideo = 0 | 1 | 2;

export type GroupsGroupWall = 0 | 1 | 2 | 3;

export type GroupsGroupWiki = 0 | 1 | 2;

export interface GroupsGroupsArray {
    /**
     * Communities number
     */
    count: number;
    /**
     * Community ID
     */
    items: number[];
    [key: string]: any;
}

export interface GroupsLinksItem {
    /**
     * Link title
     */
    name: string;
    /**
     * Link description
     */
    desc: string;
    /**
     * Link ID
     */
    id: number;
    /**
     * URL of square image of the link with 100 pixels in width
     */
    photo_100: string;
    /**
     * URL of square image of the link with 50 pixels in width
     */
    photo_50: string;
    /**
     * Link URL
     */
    url: string;
    [key: string]: any;
}

export interface GroupsLiveCovers {
    /**
     * Information whether live covers is enabled
     */
    is_enabled: boolean | number;
    /**
     * Information whether live covers photo scaling is enabled
     */
    is_scalable: boolean | number;
    [key: string]: any;
    story_ids: string[];
}

export interface GroupsLongPollEvents {
    [key: string]: any;
}

export interface GroupsLongPollServer {
    /**
     * Long Poll key
     */
    key: string;
    /**
     * Long Poll server address
     */
    server: string;
    /**
     * Number of the last event
     */
    ts: string;
    [key: string]: any;
}

export interface GroupsLongPollSettings {
    /**
     * API version used for the events
     */
    api_version: string;
    /**
     * Shows whether Long Poll is enabled
     */
    is_enabled: boolean | number;
    [key: string]: any;
}

export interface GroupsMarketInfo {
    /**
     * Market type
     */
    type: string;
    /**
     * Contact person ID
     */
    contact_id: number;
    /**
     * Currency name
     */
    currency_text: string;
    /**
     * Main market album ID
     */
    main_album_id: number;
    /**
     * Maximum price
     */
    price_max: string;
    /**
     * Minimum price
     */
    price_min: string;
    [key: string]: any;
}

export interface GroupsMarketProperties {
    /**
     * Information whether community has installed market app
     */
    has_market_app: boolean | number;
    [key: string]: any;
    using_vkpay_market_app: boolean | number;
}

export type GroupsMarketState = "none" | "basic" | "advanced";

export interface GroupsMemberRole {
    /**
     * User ID
     */
    id: number;
    /**
     * Allow the manager to accept community calls.
     */
    is_call_operator: boolean | number;
    [key: string]: any;
    permissions: GroupsMemberRolePermission[];
}

export type GroupsMemberRolePermission = "ads";

export type GroupsMemberRoleStatus = "moderator" | "editor" | "administrator" | "creator" | "advertiser";

export interface GroupsMemberStatus {
    /**
     * User ID
     */
    user_id: number;
    [key: string]: any;
}

export interface GroupsMemberStatusFull {
    /**
     * User ID
     */
    user_id: number;
    [key: string]: any;
}

/*Online status of group*/
export interface GroupsOnlineStatus {
    /**
     * Estimated time of answer (for status = answer_mark)
     */
    minutes: number;
    [key: string]: any;
}

export type GroupsOnlineStatusType = "none" | "online" | "answer_mark";

export interface GroupsOwnerXtrBanInfo {
    [key: string]: any;
}

export type GroupsOwnerXtrBanInfoType = "group" | "profile";

export interface GroupsPhotoSize {
    /**
     * Image height
     */
    height: number;
    /**
     * Image width
     */
    width: number;
    [key: string]: any;
}

export interface GroupsProfileItem {
    /**
     * User id
     */
    id: number;
    /**
     * Url for user photo
     */
    photo_50: string;
    /**
     * Url for user photo
     */
    photo_100: string;
    /**
     * User first name
     */
    first_name: string;
    [key: string]: any;
}

export type GroupsRoleOptions = "moderator" | "editor" | "administrator" | "creator";

export type GroupsSectionsListItem = BaseObject;

export interface GroupsSettingsTwitter {
    [key: string]: any;
    status: "loading" | "sync";
    name: string;
}

export interface GroupsSubjectItem {
    /**
     * Subject ID
     */
    id: number;
    /**
     * Subject title
     */
    name: string;
    [key: string]: any;
}

export interface GroupsTokenPermissionSetting {
    [key: string]: any;
    name: string;
    setting: number;
}

export interface GroupsUserXtrRole1 {
    permissions: GroupsMemberRolePermission[];
    role: GroupsRoleOptions;
}

export type GroupsUserXtrRole = UsersUserFull & GroupsUserXtrRole1;

export interface LeadFormsAnswer {
    [key: string]: any;
    key: string;
}

export interface LeadFormsAnswerItem {
    [key: string]: any;
    key: string;
    value: string;
}

export type LeadFormsAnswerOneOf = any;

export interface LeadFormsForm {
    [key: string]: any;
    form_id: number;
    group_id: number;
    photo: string;
    name: string;
    title: string;
    description: string;
    confirmation: string;
    site_link_url: string;
    policy_link_url: string;
    questions: LeadFormsQuestionItem[];
    leads_count: number;
    pixel_code: string;
    once_per_user: number;
    notify_admins: string;
    notify_emails: string;
    url: string;
}

export interface LeadFormsLead {
    [key: string]: any;
    lead_id: number;
    user_id: number;
    date: number;
    answers: LeadFormsAnswer[];
    ad_id: number;
}

export interface LeadFormsQuestionItem {
    [key: string]: any;
    key: string;
    type: "input" | "textarea" | "radio" | "checkbox" | "select";
    label: string;
    options: LeadFormsQuestionItemOption[];
}

export interface LeadFormsQuestionItemOption {
    [key: string]: any;
    key: string;
    label: string;
}

export type LikesType = "post" | "comment" | "photo" | "audio" | "video" | "note" | "market" | "photo_comment" | "video_comment" | "topic_comment" | "market_comment" | "sitepage" | "textpost" | "community_review" | "story" | "group_like";

export interface LinkTargetObject {
    /**
     * Object type
     */
    type: string;
    /**
     * Owner ID
     */
    owner_id: number;
    /**
     * Item ID
     */
    item_id: number;
    [key: string]: any;
}

export interface MarketCurrency {
    /**
     * Currency ID
     */
    id: number;
    /**
     * Currency sign
     */
    name: string;
    /**
     * Currency title
     */
    title: string;
    [key: string]: any;
}

export interface MarketGlobalSearchFilters {
    [key: string]: any;
}

/*Information about the group where the item is placed*/
export interface MarketItemOwnerInfo {
    /**
     * Name of the group
     */
    name: string;
    /**
     * Category of the item or description of the group
     */
    category: string;
    /**
     * Link to the section of the group
     */
    category_url: string;
    /**
     * Is the group is VK corporated market
     */
    is_corporated_market: boolean | number;
    [key: string]: any;
    avatar: BaseImage[];
}

/*Information about promotion of the market item*/
export interface MarketItemPromotionInfo {
    /**
     * Can the item be promoted?
     */
    is_available: boolean | number;
    [key: string]: any;
}

export interface MarketMarketAlbum {
    /**
     * Market album ID
     */
    id: number;
    /**
     * Market album owner's ID
     */
    owner_id: number;
    /**
     * Market album title
     */
    title: string;
    /**
     * Items number
     */
    count: number;
    /**
     * Is album main for owner
     */
    is_main: boolean | number;
    /**
     * Is album hidden
     */
    is_hidden: boolean | number;
    /**
     * Date when album has been updated last time in Unixtime
     */
    updated_time: number;
    /**
     * Type of album
     */
    type: 0 | 1;
    /**
     * Is album needed to be blurred (18+) or not
     */
    is_blur_enabled: boolean | number;
    [key: string]: any;
}

export type MarketMarketCategory = MarketMarketCategoryNested;

export interface MarketMarketCategoryNested {
    /**
     * Category ID
     */
    id: number;
    /**
     * Category name
     */
    name: string;
    /**
     * Is v2 category
     */
    is_v2: boolean | number;
    [key: string]: any;
}

export interface MarketMarketCategoryTree {
    /**
     * Category ID
     */
    id: number;
    /**
     * Category name
     */
    name: string;
    /**
     * Icon name
     */
    icon_name: string;
    /**
     * SEO-friendly URL to page with category's items
     */
    url: string;
    [key: string]: any;
    children: MarketMarketCategoryTree[];
}

export interface MarketMarketCategoryTreeView {
    /**
     * Category names from current category up to root category
     */
    root_path: string[];
    [key: string]: any;
    type: "tab_root";
    selected: boolean | number;
}

export interface MarketMarketItem {
    /**
     * Access key for the market item
     */
    access_key: string;
    /**
     * Title for button for url
     */
    button_title: string;
    /**
     * Date when the item has been created in Unixtime
     */
    date: number;
    /**
     * Item description
     */
    description: string;
    /**
     * Item ID
     */
    id: number;
    /**
     * Item owner's ID
     */
    owner_id: number;
    /**
     * URL of the preview image
     */
    thumb_photo: string;
    /**
     * Item title
     */
    title: string;
    /**
     * URL to item
     */
    url: string;
    /**
     * Inventory balances
     */
    stock_amount: number;
    /**
     * Attach for post id
     */
    post_id: number;
    /**
     * Attach for post owner id
     */
    post_owner_id: number;
    [key: string]: any;
    external_id: string;
    is_favorite: boolean | number;
    is_owner: boolean | number;
    is_adult: boolean | number;
    variants_grouping_id: number;
    is_main_variant: boolean | number;
    sku: string;
}

export type MarketMarketItemAvailability = 0 | 1 | 2;

export interface MarketMarketItemBasic {
    /**
     * Item ID
     */
    id: number;
    /**
     * Item owner's ID
     */
    owner_id: number;
    /**
     * Item title
     */
    title: string;
    /**
     * URL of the preview image
     */
    thumb_photo: string;
    [key: string]: any;
    is_favorite: boolean | number;
}

export interface MarketMarketItemBasicWithGroup1 {
    is_group_verified: boolean | number;
    group_name: string;
    group_link: string;
    is_owner: boolean | number;
    is_adult: boolean | number;
}

export type MarketMarketItemBasicWithGroup = MarketMarketItemBasic & MarketMarketItemBasicWithGroup1;

export interface MarketMarketItemFull1 {
    /**
     * Views number
     */
    views_count: number;
    /**
     * Object identifier in wishlist of viewer
     */
    wishlist_item_id: number;
    /**
     * Rating of product
     */
    rating: number;
    /**
     * Count of product orders
     */
    orders_count: number;
    /**
     * User agreement info
     */
    user_agreement_info: string;
    /**
     * Contains ad ID if it has
     */
    ad_id: number;
    /**
     * Can the item be updated by current user?
     */
    can_edit: boolean | number;
    /**
     * Can item be deleted by current user?
     */
    can_delete: boolean | number;
    /**
     * Can the item be converted from a product into a service?
     */
    can_show_convert_to_service: boolean | number;
    /**
     * The amount of the discount if VK Pay is used for payment
     */
    vk_pay_discount: number;
    albums_ids: number[];
    photos: PhotosPhoto[];
    can_comment: BaseBoolInt;
    can_repost: BaseBoolInt;
    likes: BaseLikes;
    reposts: BaseRepostsInfo;
    cancel_info: BaseLink;
    owner_info: MarketItemOwnerInfo;
    promotion: MarketItemPromotionInfo;
}

export type MarketMarketItemFull = MarketMarketItem & MarketMarketItemFull1;

export interface MarketOrder {
    /**
     * Seller comment for user
     */
    comment_for_user: string;
    /**
     * Extended field. Can current viewer add review for at least one item in this order
     */
    can_add_review: boolean | number;
    [key: string]: any;
    id: number;
    group_id: number;
    user_id: number;
    display_order_id: string;
    date: number;
    status: number;
    items_count: number;
    track_number: string;
    track_link: string;
    comment: string;
    address: string;
    merchant_comment: string;
    weight: number;
    preview_order_items: MarketOrderItem[];
    is_viewed_by_admin: boolean | number;
    date_viewed: number;
}

export interface MarketOrderItem {
    /**
     * Extended field. Can current viewer add review for this ordered item
     */
    can_add_review: boolean | number;
    [key: string]: any;
    owner_id: number;
    item_id: number;
    quantity: number;
    title: string;
    variants: string[];
}

export type MarketOwnerType = "base" | "pro" | "disabled";

export interface MarketPrice {
    /**
     * Amount
     */
    amount: string;
    /**
     * Amount to for price_type=2
     */
    amount_to: string;
    /**
     * Text
     */
    text: string;
    /**
     * Textual representation of old price
     */
    old_amount_text: string;
    [key: string]: any;
    price_type: 0 | 2 | 3;
    price_unit: 0 | 2 | 3 | 4;
    discount_rate: number;
    old_amount: string;
}

export type MarketServicesViewType = 1 | 2;

export type MessagesActionOneOf = MessagesMessageAction;

export interface MessagesAudioMessage {
    /**
     * Access key for audio message
     */
    access_key: string;
    /**
     * Audio message duration in seconds
     */
    duration: number;
    /**
     * Audio message ID
     */
    id: number;
    /**
     * MP3 file URL
     */
    link_mp3: string;
    /**
     * OGG file URL
     */
    link_ogg: string;
    /**
     * Audio message owner ID
     */
    owner_id: number;
    /**
     * Sound visualisation
     */
    waveform: number[];
    [key: string]: any;
    transcript_error: number;
}

export interface MessagesChat {
    /**
     * Chat creator ID
     */
    admin_id: number;
    /**
     * Chat ID
     */
    id: number;
    /**
     * URL of the preview image with 100 px in width
     */
    photo_100: string;
    /**
     * URL of the preview image with 200 px in width
     */
    photo_200: string;
    /**
     * URL of the preview image with 50 px in width
     */
    photo_50: string;
    /**
     * Chat title
     */
    title: string;
    /**
     * Chat type
     */
    type: string;
    /**
     * User ID
     */
    users: number[];
    /**
     * If provided photo is default
     */
    is_default_photo: boolean | number;
    /**
     * Count members in a chat
     */
    members_count: number;
    /**
     * If chat is group channel
     */
    is_group_channel: boolean | number;
    [key: string]: any;
}

export interface MessagesChatFull {
    /**
     * Chat creator ID
     */
    admin_id: number;
    /**
     * Chat ID
     */
    id: number;
    /**
     * URL of the preview image with 100 px in width
     */
    photo_100: string;
    /**
     * URL of the preview image with 200 px in width
     */
    photo_200: string;
    /**
     * URL of the preview image with 50 px in width
     */
    photo_50: string;
    /**
     * Chat title
     */
    title: string;
    /**
     * Chat type
     */
    type: string;
    /**
     * If provided photo is default
     */
    is_default_photo: boolean | number;
    /**
     * Count members in a chat
     */
    members_count: number;
    /**
     * If chat is group channel
     */
    is_group_channel: boolean | number;
    [key: string]: any;
    users: MessagesUserXtrInvitedBy[];
}

export interface MessagesChatPreview {
    [key: string]: any;
    admin_id: number;
    joined: boolean | number;
    local_id: number;
    members: number[];
    members_count: number;
    title: string;
    is_member: boolean | number;
    is_don: boolean | number;
    is_nft: boolean | number;
    is_group_channel: boolean | number;
}

export interface MessagesChatPushSettings {
    /**
     * Time until that notifications are disabled
     */
    disabled_until: number;
    [key: string]: any;
}

export interface MessagesChatRestrictions {
    /**
     * Only admins can promote users to admins
     */
    admins_promote_users: boolean | number;
    /**
     * Only admins can change chat info
     */
    only_admins_edit_info: boolean | number;
    /**
     * Only admins can edit pinned message
     */
    only_admins_edit_pin: boolean | number;
    /**
     * Only admins can invite users to this chat
     */
    only_admins_invite: boolean | number;
    /**
     * Only admins can kick users from this chat
     */
    only_admins_kick: boolean | number;
    [key: string]: any;
}

export interface MessagesChatSettings {
    /**
     * Chat title
     */
    title: string;
    /**
     * Admin id
     */
    admin_ids: number[];
    /**
     * Active member ID
     */
    active_ids: number[];
    [key: string]: any;
    members_count: number;
    friends_count: number;
    owner_id: number;
    is_group_channel: boolean | number;
    is_disappearing: boolean | number;
    theme: string;
    disappearing_chat_link: string;
    is_service: boolean | number;
}

export interface MessagesChatSettingsAcl {
    /**
     * Can you change photo, description and name
     */
    can_change_info: boolean | number;
    /**
     * Can you change invite link for this chat
     */
    can_change_invite_link: boolean | number;
    /**
     * Can you pin/unpin message for this chat
     */
    can_change_pin: boolean | number;
    /**
     * Can you invite other peers in chat
     */
    can_invite: boolean | number;
    /**
     * Can you promote simple users to chat admins
     */
    can_promote_users: boolean | number;
    /**
     * Can you see invite link for this chat
     */
    can_see_invite_link: boolean | number;
    /**
     * Can you moderate (delete) other users' messages
     */
    can_moderate: boolean | number;
    /**
     * Can you copy chat
     */
    can_copy_chat: boolean | number;
    /**
     * Can you init group call in the chat
     */
    can_call: boolean | number;
    /**
     * Can you use mass mentions
     */
    can_use_mass_mentions: boolean | number;
    /**
     * Can you change chat service type
     */
    can_change_service_type: boolean | number;
    [key: string]: any;
}

export interface MessagesChatSettingsPermissions {
    /**
     * Who can invite users to chat
     */
    invite: "owner" | "owner_and_admins" | "all";
    /**
     * Who can change chat info
     */
    change_info: "owner" | "owner_and_admins" | "all";
    /**
     * Who can change pinned message
     */
    change_pin: "owner" | "owner_and_admins" | "all";
    /**
     * Who can use mass mentions
     */
    use_mass_mentions: "owner" | "owner_and_admins" | "all";
    /**
     * Who can see invite link
     */
    see_invite_link: "owner" | "owner_and_admins" | "all";
    /**
     * Who can make calls
     */
    call: "owner" | "owner_and_admins" | "all";
    /**
     * Who can change admins
     */
    change_admins: "owner" | "owner_and_admins";
    [key: string]: any;
}

export interface MessagesChatSettingsPhoto {
    /**
     * URL of the preview image with 50px in width
     */
    photo_50: string;
    /**
     * URL of the preview image with 100px in width
     */
    photo_100: string;
    /**
     * URL of the preview image with 200px in width
     */
    photo_200: string;
    /**
     * If provided photo is default
     */
    is_default_photo: boolean | number;
    /**
     * If provided photo is default call photo
     */
    is_default_call_photo: boolean | number;
    [key: string]: any;
}

export type MessagesChatSettingsState = "in" | "kicked" | "left" | "out";

export interface MessagesConversation {
    /**
     * ID of the last message in conversation
     */
    last_message_id: number;
    /**
     * Conversation message ID of the last message in conversation
     */
    last_conversation_message_id: number;
    /**
     * Last message user have read
     */
    in_read: number;
    /**
     * Last outcoming message have been read by the opponent
     */
    out_read: number;
    /**
     * Unread messages number
     */
    unread_count: number;
    /**
     * Is this conversation uread
     */
    is_marked_unread: boolean | number;
    /**
     * Message id of message with mention
     */
    mentions: number[];
    [key: string]: any;
    important: boolean | number;
    unanswered: boolean | number;
    special_service_type: "business_notify";
}

export interface MessagesConversationCanWrite {
    [key: string]: any;
    allowed: boolean | number;
    reason: number;
}

export interface MessagesConversationMember {
    /**
     * Is it possible for user to kick this member
     */
    can_kick: boolean | number;
    /**
     * Message request date
     */
    request_date: number;
    [key: string]: any;
    invited_by: number;
    is_admin: boolean | number;
    is_owner: boolean | number;
    is_message_request: boolean | number;
    join_date: number;
    member_id: number;
}

export interface MessagesConversationPeer {
    [key: string]: any;
    id: number;
    local_id: number;
}

export type MessagesConversationPeerType = "chat" | "email" | "user" | "group";

export interface MessagesConversationSortId {
    /**
     * Major id for sorting conversations
     */
    major_id: number;
    /**
     * Minor id for sorting conversations
     */
    minor_id: number;
    [key: string]: any;
}

export interface MessagesConversationWithMessage {
    [key: string]: any;
}

export interface MessagesDeleteFullResponseItem {
    [key: string]: any;
    peer_id: number;
    message_id: number;
    conversation_message_id: number;
}

export interface MessagesForeignMessage {
    /**
     * Conversation message ID
     */
    conversation_message_id: number;
    /**
     * Date when the message was created
     */
    date: number;
    /**
     * Message author's ID
     */
    from_id: number;
    /**
     * Message ID
     */
    id: number;
    /**
     * Peer ID
     */
    peer_id: number;
    /**
     * Message text
     */
    text: string;
    /**
     * Date when the message has been updated in Unixtime
     */
    update_time: number;
    /**
     * Was the audio message inside already listened by you
     */
    was_listened: boolean | number;
    /**
     * Additional data sent along with message for developer convenience
     */
    payload: string;
    [key: string]: any;
    attachments: MessagesMessageAttachment[];
    fwd_messages: MessagesForeignMessage[];
}

export interface MessagesForward {
    /**
     * Messages owner_id
     */
    owner_id: number;
    /**
     * Messages peer_id
     */
    peer_id: number;
    /**
     * Message conversation_message_id
     */
    conversation_message_ids: number[];
    /**
     * Message message_id
     */
    message_ids: number[];
    /**
     * If you need to reply to a message
     */
    is_reply: boolean | number;
    [key: string]: any;
}

export type MessagesFwdMessages = MessagesForeignMessage[];

export interface MessagesGetConversationById {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: MessagesConversation[];
}

export interface MessagesGetConversationByIdExtended1 {
    profiles: UsersUserFull[];
    groups: GroupsGroupFull[];
}

export type MessagesGetConversationByIdExtended = MessagesGetConversationById & MessagesGetConversationByIdExtended1;

export interface MessagesGetConversationMembers {
    /**
     * Chat members count
     */
    count: number;
    [key: string]: any;
    items: MessagesConversationMember[];
    profiles: UsersUserFull[];
    groups: GroupsGroupFull[];
}

export interface MessagesGraffiti {
    /**
     * Access key for graffiti
     */
    access_key: string;
    /**
     * Graffiti ID
     */
    id: number;
    /**
     * Graffiti owner ID
     */
    owner_id: number;
    /**
     * Graffiti URL
     */
    url: string;
    /**
     * Graffiti width
     */
    width: number;
    /**
     * Graffiti height
     */
    height: number;
    [key: string]: any;
}

export interface MessagesHistoryAttachment {
    /**
     * Message sending time
     */
    date: number;
    /**
     * Message ID
     */
    message_id: number;
    /**
     * Message Exipire ttl
     */
    message_expire_ttl: number;
    /**
     * Conversation Message ID
     */
    cmid: number;
    /**
     * Message author's ID
     */
    from_id: number;
    /**
     * Forward level (optional)
     */
    forward_level: number;
    /**
     * Attachment position in the Message
     */
    position: number;
    [key: string]: any;
    was_listened: boolean | number;
}

export interface MessagesHistoryMessageAttachment {
    [key: string]: any;
}

export type MessagesHistoryMessageAttachmentType = "photo" | "video" | "audio" | "doc" | "link" | "market" | "wall" | "share" | "app_action" | "graffiti" | "audio_message";

export interface MessagesKeyboard {
    /**
     * Should this keyboard disappear on first use
     */
    one_time: boolean | number;
    /**
     * Community or bot, which set this keyboard
     */
    author_id: number;
    [key: string]: any;
    buttons: MessagesKeyboardButton[][];
    inline: boolean | number;
}

export interface MessagesKeyboardButton {
    /**
     * Button color
     */
    color: "default" | "positive" | "negative" | "primary";
    [key: string]: any;
}

/*Description of the action, that should be performed on button click*/
export interface MessagesKeyboardButtonActionCallback {
    /**
     * Label for button
     */
    label: string;
    /**
     * Additional data sent along with message for developer convenience
     */
    payload: string;
    [key: string]: any;
    type: "callback";
}

/*Description of the action, that should be performed on button click*/
export interface MessagesKeyboardButtonActionLocation {
    /**
     * Additional data sent along with message for developer convenience
     */
    payload: string;
    [key: string]: any;
    type: "location";
}

/*Description of the action, that should be performed on button click*/
export interface MessagesKeyboardButtonActionOpenApp {
    /**
     * Fragment value in app link like vk.com/app{app_id}_-654321#hash
     */
    app_id: number;
    /**
     * Fragment value in app link like vk.com/app123456_-654321#{hash}
     */
    hash: string;
    /**
     * Label for button
     */
    label: string;
    /**
     * Fragment value in app link like vk.com/app123456_{owner_id}#hash
     */
    owner_id: number;
    /**
     * Additional data sent along with message for developer convenience
     */
    payload: string;
    [key: string]: any;
    type: "open_app";
}

/*Description of the action, that should be performed on button click*/
export interface MessagesKeyboardButtonActionOpenLink {
    /**
     * Label for button
     */
    label: string;
    /**
     * link for button
     */
    link: string;
    /**
     * Additional data sent along with message for developer convenience
     */
    payload: string;
    [key: string]: any;
    type: "open_link";
}

/*Description of the action, that should be performed on button click*/
export interface MessagesKeyboardButtonActionOpenPhoto {
    [key: string]: any;
    type: "open_photo";
}

/*Description of the action, that should be performed on button click*/
export interface MessagesKeyboardButtonActionText {
    /**
     * Label for button
     */
    label: string;
    /**
     * Additional data sent along with message for developer convenience
     */
    payload: string;
    [key: string]: any;
    type: "text";
}

/*Description of the action, that should be performed on button click*/
export interface MessagesKeyboardButtonActionVkpay {
    /**
     * Fragment value in app link like vk.com/app123456_-654321#{hash}
     */
    hash: string;
    /**
     * Additional data sent along with message for developer convenience
     */
    payload: string;
    [key: string]: any;
    type: "vkpay";
}

export type MessagesKeyboardButtonPropertyAction = any;

export interface MessagesLastActivity {
    /**
     * Time when user was online in Unixtime
     */
    time: number;
    [key: string]: any;
}

export interface MessagesLongpollMessages {
    /**
     * Total number
     */
    count: number;
    [key: string]: any;
    items: MessagesMessage[];
}

export interface MessagesLongpollParams {
    /**
     * Server URL
     */
    server: string;
    /**
     * Key
     */
    key: string;
    /**
     * Timestamp
     */
    ts: number;
    /**
     * Persistent timestamp
     */
    pts: number;
    [key: string]: any;
}

export interface MessagesMessage {
    /**
     * Only for messages from community. Contains user ID of community admin, who sent this message.
     */
    admin_author_id: number;
    /**
     * Unique auto-incremented number for all messages with this peer
     */
    conversation_message_id: number;
    /**
     * Date when the message has been sent in Unixtime
     */
    date: number;
    /**
     * Message author's ID
     */
    from_id: number;
    /**
     * Message ID
     */
    id: number;
    /**
     * Is it an important message
     */
    important: boolean | number;
    /**
     * this message is cropped for bot
     */
    is_cropped: boolean | number;
    /**
     * Members number
     */
    members_count: number;
    /**
     * Peer ID
     */
    peer_id: number;
    /**
     * ID used for sending messages. It returned only for outgoing messages
     */
    random_id: number;
    /**
     * Reaction id set on message
     */
    reaction_id: number;
    /**
     * Last reaction id set on this message
     */
    last_reaction_id: number;
    /**
     * Message text
     */
    text: string;
    /**
     * Date when the message has been updated in Unixtime
     */
    update_time: number;
    /**
     * Was the audio message inside already listened by you
     */
    was_listened: boolean | number;
    /**
     * Date when the message has been pinned in Unixtime
     */
    pinned_at: number;
    /**
     * Is silent message, push without sound
     */
    is_silent: boolean | number;
    [key: string]: any;
    attachments: MessagesMessageAttachment[];
    is_hidden: boolean | number;
    payload: string;
    ref: string;
    ref_source: string;
    reactions: MessagesReactionCounterResponseItem[];
}

export interface MessagesMessageAction {
    /**
     * Message ID
     */
    conversation_message_id: number;
    /**
     * Email address for chat_invite_user or chat_kick_user actions
     */
    email: string;
    /**
     * User or email peer ID
     */
    member_id: number;
    /**
     * Message body of related message
     */
    message: string;
    /**
     * New chat title for chat_create and chat_title_update actions
     */
    text: string;
    [key: string]: any;
}

export interface MessagesMessageActionPhoto {
    /**
     * URL of the preview image with 50px in width
     */
    photo_50: string;
    /**
     * URL of the preview image with 100px in width
     */
    photo_100: string;
    /**
     * URL of the preview image with 200px in width
     */
    photo_200: string;
    [key: string]: any;
}

export type MessagesMessageActionStatus = "chat_photo_update" | "chat_photo_remove" | "chat_create" | "chat_title_update" | "chat_invite_user" | "chat_kick_user" | "chat_pin_message" | "chat_unpin_message" | "chat_invite_user_by_link" | "chat_invite_user_by_message_request" | "chat_screenshot";

export interface MessagesMessageAttachment {
    [key: string]: any;
}

export type MessagesMessageAttachmentType = "photo" | "audio" | "video" | "video_playlist" | "doc" | "link" | "market" | "market_album" | "gift" | "sticker" | "wall" | "wall_reply" | "article" | "poll" | "call" | "graffiti" | "audio_message";

export interface MessagesMessageRequestData {
    /**
     * Status of message request
     */
    status: string;
    /**
     * Message request sender id
     */
    inviter_id: number;
    /**
     * Message request date
     */
    request_date: number;
    [key: string]: any;
}

export interface MessagesMessagesArray {
    [key: string]: any;
    count: number;
    items: MessagesMessage[];
}

export interface MessagesOutReadBy {
    /**
     * Member IDs
     */
    member_ids: number[];
    [key: string]: any;
    count: number;
}

export interface MessagesPinnedMessage {
    /**
     * Unique auto-incremented number for all messages with this peer
     */
    conversation_message_id: number;
    /**
     * Message ID
     */
    id: number;
    /**
     * Date when the message has been sent in Unixtime
     */
    date: number;
    /**
     * Message author's ID
     */
    from_id: number;
    /**
     * Peer ID
     */
    peer_id: number;
    /**
     * Message text
     */
    text: string;
    [key: string]: any;
    attachments: MessagesMessageAttachment[];
    fwd_messages: MessagesForeignMessage[];
}

export interface MessagesPushSettings {
    /**
     * Information whether push notifications are disabled forever
     */
    disabled_forever: boolean | number;
    /**
     * Time until what notifications are disabled
     */
    disabled_until: number;
    /**
     * Information whether the sound is on
     */
    no_sound: boolean | number;
    /**
     * Information whether the mentions are disabled
     */
    disabled_mentions: boolean | number;
    /**
     * Information whether the mass mentions (like '@all', '@online') are disabled
     */
    disabled_mass_mentions: boolean | number;
    [key: string]: any;
}

export interface MessagesReactionAssetItem {
    [key: string]: any;
    reaction_id: number;
}

export interface MessagesReactionAssetItemLinks {
    /**
     * Big reaction animation json file
     */
    big_animation: string;
    /**
     * Small reaction animation json file
     */
    small_animation: string;
    /**
     * Reaction image file
     */
    static: string;
    [key: string]: any;
}

export interface MessagesReactionCounterResponseItem {
    [key: string]: any;
    reaction_id: number;
    count: number;
    user_ids: number[];
}

export interface MessagesReactionCountersResponseItem {
    [key: string]: any;
    cmid: number;
    counters: MessagesReactionCounterResponseItem[];
}

export interface MessagesReactionResponseItem {
    [key: string]: any;
    user_id: number;
    reaction_id: number;
}

export interface MessagesSendUserIdsResponseItem {
    [key: string]: any;
    peer_id: number;
    message_id: number;
    conversation_message_id: number;
}

export type MessagesTemplateActionTypeNames = "text" | "start" | "location" | "vkpay" | "open_app" | "open_photo" | "open_link" | "callback" | "intent_subscribe" | "intent_unsubscribe" | "open_modal_view";

export type MessagesUserTypeForXtrInvitedBy = "profile" | "group";

export interface MessagesUserXtrInvitedBy1 {
    /**
     * ID of the inviter
     */
    invited_by: number;
    /**
     * Name of group
     */
    name: string;
    type: MessagesUserTypeForXtrInvitedBy;
}

export type MessagesUserXtrInvitedBy = UsersUserXtrType & MessagesUserXtrInvitedBy1;

export interface NewsfeedCommentsBase1 {
    list: WallWallComment[];
}

export type NewsfeedCommentsBase = BaseCommentsInfo & NewsfeedCommentsBase1;

export type NewsfeedCommentsFilters = "post" | "photo" | "video" | "topic" | "note";

export type NewsfeedCommentsItem = any;

export interface NewsfeedCommentsItemBase {
    [key: string]: any;
    source_id: number;
    date: number;
    post_id: number;
}

export interface NewsfeedCommentsItemTypeMarket1 {
    comments: NewsfeedCommentsBase;
    likes: BaseLikes;
}

export type NewsfeedCommentsItemTypeMarket = MarketMarketItem & NewsfeedCommentsItemBase & NewsfeedCommentsItemTypeMarket1;

export interface NewsfeedCommentsItemTypeNotes1 {
    text: string;
    comments: NewsfeedCommentsBase;
    likes: BaseLikes;
}

export type NewsfeedCommentsItemTypeNotes = NewsfeedCommentsItemBase & NewsfeedCommentsItemTypeNotes1;

export interface NewsfeedCommentsItemTypePhoto1 {
    comments: NewsfeedCommentsBase;
    likes: BaseLikes;
}

export type NewsfeedCommentsItemTypePhoto = PhotosPhoto & NewsfeedCommentsItemBase & NewsfeedCommentsItemTypePhoto1;

export interface NewsfeedCommentsItemTypePost1 {
    from_id: number;
    comments: NewsfeedCommentsBase;
}

export type NewsfeedCommentsItemTypePost = WallWallpostFull & NewsfeedCommentsItemBase & NewsfeedCommentsItemTypePost1;

export interface NewsfeedCommentsItemTypeTopic1 {
    text: string;
    comments: NewsfeedCommentsBase;
    likes: BaseLikes;
}

export type NewsfeedCommentsItemTypeTopic = NewsfeedCommentsItemBase & NewsfeedCommentsItemTypeTopic1;

export interface NewsfeedCommentsItemTypeVideo1 {
    text: string;
    comments: NewsfeedCommentsBase;
    likes: BaseLikes;
    type: "video" | "music_video" | "movie" | "live" | "short_video";
}

export type NewsfeedCommentsItemTypeVideo = VideoVideo & NewsfeedCommentsItemBase & NewsfeedCommentsItemTypeVideo1;

export type NewsfeedIgnoreItemType = "wall" | "tag" | "profilephoto" | "video" | "photo" | "audio";

export interface NewsfeedItemAudio1 {
    /**
     * Post ID
     */
    post_id: number;
    audio: NewsfeedItemAudioAudio;
}

export type NewsfeedItemAudio = NewsfeedItemBase & NewsfeedItemAudio1;

export interface NewsfeedItemAudioAudio {
    /**
     * Audios number
     */
    count: number;
    [key: string]: any;
    items: AudioAudio[];
}

export interface NewsfeedItemBase {
    /**
     * Item source ID
     */
    source_id: number;
    /**
     * Date when item has been added in Unixtime
     */
    date: number;
    /**
     * Preview length control parameter
     */
    short_text_rate: number;
    [key: string]: any;
}

export interface NewsfeedItemDigest1 {
    /**
     * id of feed in digest
     */
    feed_id: string;
    /**
     * type of digest
     */
    template: "list" | "grid" | "single";
    items: NewsfeedItemDigestItem[];
    main_post_ids: string[];
    header: NewsfeedItemDigestHeader;
    footer: NewsfeedItemDigestFooter;
}

export type NewsfeedItemDigest = NewsfeedItemBase & NewsfeedItemDigest1;

export interface NewsfeedItemDigestButton {
    [key: string]: any;
    title: string;
    style: "primary";
}

export interface NewsfeedItemDigestFooter {
    /**
     * text for invite to enable smart feed
     */
    text: string;
    [key: string]: any;
    style: "text" | "button";
}

export interface NewsfeedItemDigestFullItem1 {
    /**
     * Optional red badge for posts in digest block
     */
    badge_text: string;
    text: string;
    source_name: string;
    attachment_index: number;
    attachment: WallWallpostAttachment;
    style: "default" | "inversed" | "spotlight";
    post: NewsfeedItemWallpost;
}

export type NewsfeedItemDigestFullItem = NewsfeedItemBase & NewsfeedItemDigestFullItem1;

export interface NewsfeedItemDigestHeader {
    /**
     * Title of the header
     */
    title: string;
    /**
     * Subtitle of the header, when title have two strings
     */
    subtitle: string;
    /**
     * Optional field for red badge in Trends feed blocks
     */
    badge_text: string;
    [key: string]: any;
    style: "singleline" | "multiline";
}

export type NewsfeedItemDigestItem = NewsfeedItemDigestFullItem;

export interface NewsfeedItemFriend1 {
    friends: NewsfeedItemFriendFriends;
}

export type NewsfeedItemFriend = NewsfeedItemBase & NewsfeedItemFriend1;

export interface NewsfeedItemFriendFriends {
    /**
     * Number of friends has been added
     */
    count: number;
    [key: string]: any;
    items: BaseUserId[];
}

export interface NewsfeedItemHolidayRecommendationsBlockHeader {
    /**
     * Title of the header
     */
    title: string;
    /**
     * Subtitle of the header
     */
    subtitle: string;
    [key: string]: any;
    image: BaseImage[];
}

export interface NewsfeedItemPhoto1 {
    /**
     * Post ID
     */
    post_id: number;
    photos: NewsfeedItemPhotoPhotos;
}

export type NewsfeedItemPhoto = WallCarouselBase & NewsfeedItemBase & NewsfeedItemPhoto1;

export interface NewsfeedItemPhotoPhotos {
    /**
     * Photos number
     */
    count: number;
    [key: string]: any;
    items: PhotosPhoto[];
}

export interface NewsfeedItemPhotoTag1 {
    /**
     * Post ID
     */
    post_id: number;
    photo_tags: NewsfeedItemPhotoTagPhotoTags;
}

export type NewsfeedItemPhotoTag = WallCarouselBase & NewsfeedItemBase & NewsfeedItemPhotoTag1;

export interface NewsfeedItemPhotoTagPhotoTags {
    /**
     * Tags number
     */
    count: number;
    [key: string]: any;
    items: PhotosPhoto[];
}

export interface NewsfeedItemPromoButton1 {
    text: string;
    title: string;
    action: NewsfeedItemPromoButtonAction;
    images: NewsfeedItemPromoButtonImage[];
}

export type NewsfeedItemPromoButton = NewsfeedItemBase & NewsfeedItemPromoButton1;

export interface NewsfeedItemPromoButtonAction {
    [key: string]: any;
    url: string;
    type: string;
    target: string;
}

export interface NewsfeedItemPromoButtonImage {
    [key: string]: any;
    width: number;
    height: number;
    url: string;
}

export interface NewsfeedItemTopic1 {
    /**
     * Topic post ID
     */
    post_id: number;
    /**
     * Post text
     */
    text: string;
    comments: BaseCommentsInfo;
    likes: BaseLikesInfo;
}

export type NewsfeedItemTopic = NewsfeedItemBase & NewsfeedItemTopic1;

export interface NewsfeedItemVideo1 {
    /**
     * Post ID
     */
    post_id: number;
    video: NewsfeedItemVideoVideo;
}

export type NewsfeedItemVideo = WallCarouselBase & NewsfeedItemBase & NewsfeedItemVideo1;

export interface NewsfeedItemVideoVideo {
    /**
     * Tags number
     */
    count: number;
    [key: string]: any;
    items: VideoVideoFull[];
}

export interface NewsfeedItemWallpost1 {
}

export type NewsfeedItemWallpost = WallCarouselBase & NewsfeedItemBase & WallWallpostFull & NewsfeedItemWallpost1;

export interface NewsfeedItemWallpostFeedback {
    [key: string]: any;
    question: string;
    answers: NewsfeedItemWallpostFeedbackAnswer[];
    stars_count: number;
    descriptions: string[];
    gratitude: string;
    track_code: string;
}

export interface NewsfeedItemWallpostFeedbackAnswer {
    [key: string]: any;
    title: string;
    id: string;
}

export type NewsfeedItemWallpostFeedbackType = "buttons" | "stars";

export interface NewsfeedList {
    /**
     * List ID
     */
    id: number;
    /**
     * List title
     */
    title: string;
    [key: string]: any;
}

export interface NewsfeedListFull1 {
    /**
     * Users and communities IDs
     */
    source_ids: number[];
    no_reposts: BaseBoolInt;
}

export type NewsfeedListFull = NewsfeedList & NewsfeedListFull1;

export type NewsfeedNewsfeedItem = any;

export type NewsfeedNewsfeedItemType = "post" | "photo" | "photo_tag" | "wall_photo" | "friend" | "audio" | "video" | "topic" | "digest" | "stories" | "note" | "audio_playlist" | "clip";

export interface NotesNote {
    /**
     * Comments number
     */
    comments: number;
    /**
     * Date when the note has been created in Unixtime
     */
    date: number;
    /**
     * Note ID
     */
    id: number;
    /**
     * Note owner's ID
     */
    owner_id: number;
    /**
     * Note text
     */
    text: string;
    /**
     * Note text in wiki format
     */
    text_wiki: string;
    /**
     * Note title
     */
    title: string;
    /**
     * URL of the page with note preview
     */
    view_url: string;
    [key: string]: any;
    read_comments: number;
    privacy_view: string[];
    privacy_comment: string[];
}

export interface NotesNoteComment {
    /**
     * Date when the comment has beed added in Unixtime
     */
    date: number;
    /**
     * Comment ID
     */
    id: number;
    /**
     * Comment text
     */
    message: string;
    /**
     * Note ID
     */
    nid: number;
    /**
     * Note ID
     */
    oid: number;
    /**
     * ID of replied comment
     */
    reply_to: number;
    /**
     * Comment author's ID
     */
    uid: number;
    [key: string]: any;
}

export interface NotificationsFeedback {
    /**
     * Reply author's ID
     */
    from_id: number;
    /**
     * Item ID
     */
    id: number;
    /**
     * Reply text
     */
    text: string;
    /**
     * Wall owner's ID
     */
    to_id: number;
    [key: string]: any;
    attachments: WallWallpostAttachment[];
}

export interface NotificationsNotification {
    /**
     * Date when the event has been occurred
     */
    date: number;
    /**
     * Notification type
     */
    type: string;
    [key: string]: any;
}

export type NotificationsNotificationItem = NotificationsNotification;

export interface NotificationsReply {
    /**
     * Date when the reply has been created in Unixtime
     */
    date: number;
    /**
     * Reply ID
     */
    id: number;
    /**
     * Reply text
     */
    text: number;
    [key: string]: any;
}

export interface NotificationsSendMessageError {
    /**
     * Error code
     */
    code: 1 | 2 | 3 | 4;
    /**
     * Error description
     */
    description: string;
    [key: string]: any;
}

export interface NotificationsSendMessageItem {
    /**
     * User ID
     */
    user_id: number;
    /**
     * Notification status
     */
    status: boolean | number;
    [key: string]: any;
}

export interface OauthError {
    /**
     * Error type
     */
    error: string;
    /**
     * Error description
     */
    error_description: string;
    /**
     * URI for validation
     */
    redirect_uri: string;
    [key: string]: any;
}

export interface OrdersAmount {
    /**
     * Currency name
     */
    currency: string;
    [key: string]: any;
    amounts: OrdersAmountItem[];
}

export interface OrdersAmountItem {
    /**
     * Votes amount in user's currency
     */
    amount: number;
    /**
     * Amount description
     */
    description: string;
    /**
     * Votes number
     */
    votes: string;
    [key: string]: any;
}

export interface OrdersOrder {
    /**
     * Amount
     */
    amount: string;
    /**
     * App order ID
     */
    app_order_id: string;
    /**
     * Cancel transaction ID
     */
    cancel_transaction_id: string;
    /**
     * Date of creation in Unixtime
     */
    date: string;
    /**
     * Order ID
     */
    id: string;
    /**
     * Order item
     */
    item: string;
    /**
     * Receiver ID
     */
    receiver_id: string;
    /**
     * Order status
     */
    status: "created" | "charged" | "refunded" | "chargeable" | "cancelled" | "declined";
    /**
     * Transaction ID
     */
    transaction_id: string;
    /**
     * User ID
     */
    user_id: string;
    [key: string]: any;
}

export interface OrdersSubscription {
    /**
     * Cancel reason
     */
    cancel_reason: string;
    /**
     * Date of creation in Unixtime
     */
    create_time: number;
    /**
     * Subscription ID
     */
    id: number;
    /**
     * Subscription order item
     */
    item_id: string;
    /**
     * Date of next bill in Unixtime
     */
    next_bill_time: number;
    /**
     * Subscription expiration time in Unixtime
     */
    expire_time: number;
    /**
     * Pending cancel state
     */
    pending_cancel: boolean | number;
    /**
     * Subscription period
     */
    period: number;
    /**
     * Date of last period start in Unixtime
     */
    period_start_time: number;
    /**
     * Subscription price
     */
    price: number;
    /**
     * Subscription name
     */
    title: string;
    /**
     * Subscription's application id
     */
    app_id: number;
    /**
     * Subscription's application name
     */
    application_name: string;
    /**
     * Item photo image url
     */
    photo_url: string;
    /**
     * Subscription status
     */
    status: string;
    /**
     * Is test subscription
     */
    test_mode: boolean | number;
    /**
     * Date of trial expire in Unixtime
     */
    trial_expire_time: number;
    /**
     * Date of last change in Unixtime
     */
    update_time: number;
    /**
     * Is game (not miniapp) subscription
     */
    is_game: boolean | number;
    [key: string]: any;
}

export interface OwnerState {
    /**
     * wiki text to describe user state
     */
    description: string;
    [key: string]: any;
    state: 1 | 2 | 3 | 4 | 5;
}

export type PagesPrivacySettings = 0 | 1 | 2;

export interface PagesWikipage {
    /**
     * Page creator ID
     */
    creator_id: number;
    /**
     * Page creator name
     */
    creator_name: string;
    /**
     * Last editor ID
     */
    editor_id: number;
    /**
     * Last editor name
     */
    editor_name: string;
    /**
     * Community ID
     */
    group_id: number;
    /**
     * Page ID
     */
    id: number;
    /**
     * Page title
     */
    title: string;
    /**
     * Views number
     */
    views: number;
    [key: string]: any;
}

export interface PagesWikipageFull {
    /**
     * Date when the page has been created in Unixtime
     */
    created: number;
    /**
     * Page creator ID
     */
    creator_id: number;
    /**
     * Date when the page has been edited in Unixtime
     */
    edited: number;
    /**
     * Last editor ID
     */
    editor_id: number;
    /**
     * Community ID
     */
    group_id: number;
    /**
     * Page content, HTML
     */
    html: string;
    /**
     * Page ID
     */
    id: number;
    /**
     * Page content, wiki
     */
    source: string;
    /**
     * Page title
     */
    title: string;
    /**
     * URL of the page preview
     */
    view_url: string;
    /**
     * Views number
     */
    views: number;
    /**
     * URL
     */
    url: string;
    /**
     * Parent
     */
    parent: string;
    /**
     * Parent2
     */
    parent2: string;
    /**
     * Owner ID
     */
    owner_id: number;
    [key: string]: any;
}

export interface PagesWikipageHistory {
    /**
     * Version ID
     */
    id: number;
    /**
     * Page size in bytes
     */
    length: number;
    /**
     * Date when the page has been edited in Unixtime
     */
    date: number;
    /**
     * Last editor ID
     */
    editor_id: number;
    /**
     * Last editor name
     */
    editor_name: string;
    [key: string]: any;
}

export interface PhotosImage {
    /**
     * Height of the photo in px.
     */
    height: number;
    /**
     * Photo URL.
     */
    url: string;
    /**
     * Width of the photo in px.
     */
    width: number;
    [key: string]: any;
}

export type PhotosImageType = "s" | "m" | "x" | "l" | "o" | "p" | "q" | "r" | "y" | "z" | "w" | "base";

export interface PhotosPhoto {
    /**
     * Access key for the photo
     */
    access_key: string;
    /**
     * Album ID
     */
    album_id: number;
    /**
     * Date when uploaded
     */
    date: number;
    /**
     * Original photo height
     */
    height: number;
    /**
     * Photo ID
     */
    id: number;
    /**
     * Latitude
     */
    lat: number;
    /**
     * Longitude
     */
    long: number;
    /**
     * Photo owner's ID
     */
    owner_id: number;
    /**
     * URL of image with 2560 px width
     */
    photo_256: string;
    /**
     * Post ID
     */
    post_id: number;
    /**
     * Photo caption
     */
    text: string;
    /**
     * ID of the user who have uploaded the photo
     */
    user_id: number;
    /**
     * Original photo width
     */
    width: number;
    /**
     * Whether photo has attached tag links
     */
    has_tags: boolean | number;
    /**
     * Real position of the photo
     */
    real_offset: number;
    /**
     * Sets vertical alignment of a photo
     */
    vertical_align: "top" | "middle" | "bottom";
    [key: string]: any;
    images: PhotosImage[];
    place: string;
    sizes: PhotosPhotoSizes[];
    square_crop: string;
}

export interface PhotosPhotoAlbum {
    /**
     * Date when the album has been created in Unixtime
     */
    created: number;
    /**
     * Photo album description
     */
    description: string;
    /**
     * Photo album ID
     */
    id: number;
    /**
     * Album owner's ID
     */
    owner_id: number;
    /**
     * Photos number
     */
    size: number;
    /**
     * Photo album title
     */
    title: string;
    /**
     * Date when the album has been updated last time in Unixtime
     */
    updated: number;
    [key: string]: any;
}

export interface PhotosPhotoAlbumFull {
    /**
     * Date when the album has been created in Unixtime, not set for system albums
     */
    created: number;
    /**
     * Photo album description
     */
    description: string;
    /**
     * album can delete
     */
    can_delete: boolean | number;
    /**
     * Photo album ID
     */
    id: number;
    /**
     * album can be selected to feed
     */
    can_include_to_feed: boolean | number;
    /**
     * Album owner's ID
     */
    owner_id: number;
    /**
     * Photos number
     */
    size: number;
    /**
     * Thumb photo ID
     */
    thumb_id: number;
    /**
     * URL of the thumb image
     */
    thumb_src: string;
    /**
     * Photo album title
     */
    title: string;
    /**
     * Date when the album has been updated last time in Unixtime, not set for system albums
     */
    updated: number;
    [key: string]: any;
    sizes: PhotosPhotoSizes[];
}

export type PhotosPhotoFalseable = any;

export interface PhotosPhotoSizes {
    /**
     * Height in px
     */
    height: number;
    /**
     * URL of the image
     */
    url: string;
    /**
     * URL of the image
     */
    src: string;
    /**
     * Width in px
     */
    width: number;
    [key: string]: any;
}

export type PhotosPhotoSizesType = "t" | "s" | "m" | "x" | "o" | "p" | "q" | "r" | "k" | "l" | "y" | "z" | "c" | "w" | "a" | "b" | "e" | "i" | "d" | "j" | "temp" | "h" | "g" | "n" | "f" | "max" | "base" | "u" | "v";

export interface PhotosPhotoTag {
    /**
     * Date when tag has been added in Unixtime
     */
    date: number;
    /**
     * Tag ID
     */
    id: number;
    /**
     * ID of the tag creator
     */
    placer_id: number;
    /**
     * Tag description
     */
    tagged_name: string;
    /**
     * Tagged description.
     */
    description: string;
    /**
     * Tagged user ID
     */
    user_id: number;
    /**
     * Coordinate X of the left upper corner
     */
    x: number;
    /**
     * Coordinate X of the right lower corner
     */
    x2: number;
    /**
     * Coordinate Y of the left upper corner
     */
    y: number;
    /**
     * Coordinate Y of the right lower corner
     */
    y2: number;
    [key: string]: any;
}

export interface PhotosPhotoUpload {
    /**
     * Album ID
     */
    album_id: number;
    /**
     * URL to upload photo
     */
    upload_url: string;
    /**
     * Fallback URL if upload_url returned error
     */
    fallback_upload_url: string;
    /**
     * User ID
     */
    user_id: number;
    /**
     * Group ID
     */
    group_id: number;
    [key: string]: any;
}

export interface PhotosPhotoXtrTagInfo {
    /**
     * Access key for the photo
     */
    access_key: string;
    /**
     * Album ID
     */
    album_id: number;
    /**
     * Date when uploaded
     */
    date: number;
    /**
     * Original photo height
     */
    height: number;
    /**
     * Photo ID
     */
    id: number;
    /**
     * Latitude
     */
    lat: number;
    /**
     * Longitude
     */
    long: number;
    /**
     * Photo owner's ID
     */
    owner_id: number;
    /**
     * URL of image with 1280 px width
     */
    photo_1280: string;
    /**
     * URL of image with 130 px width
     */
    photo_130: string;
    /**
     * URL of image with 2560 px width
     */
    photo_2560: string;
    /**
     * URL of image with 604 px width
     */
    photo_604: string;
    /**
     * URL of image with 75 px width
     */
    photo_75: string;
    /**
     * URL of image with 807 px width
     */
    photo_807: string;
    /**
     * ID of the tag creator
     */
    placer_id: number;
    /**
     * Post ID
     */
    post_id: number;
    /**
     * Date when tag has been added in Unixtime
     */
    tag_created: number;
    /**
     * Tag ID
     */
    tag_id: number;
    /**
     * Photo caption
     */
    text: string;
    /**
     * ID of the user who have uploaded the photo
     */
    user_id: number;
    /**
     * Original photo width
     */
    width: number;
    /**
     * Whether photo has attached tag links
     */
    has_tags: boolean | number;
    [key: string]: any;
    sizes: PhotosPhotoSizes[];
}

export interface PhotosTagsSuggestionItem {
    [key: string]: any;
    title: string;
    caption: string;
    type: string;
    buttons: PhotosTagsSuggestionItemButton[];
    tags: PhotosPhotoTag[];
    track_code: string;
}

export interface PhotosTagsSuggestionItemButton {
    [key: string]: any;
    title: string;
    action: "confirm" | "decline" | "show_tags";
    style: "primary" | "secondary";
}

export interface PodcastCover {
    [key: string]: any;
    sizes: PhotosPhotoSizes[];
}

export interface PodcastExternalData {
    /**
     * Url of the podcast page
     */
    url: string;
    /**
     * Url of the podcasts owner community
     */
    owner_url: string;
    /**
     * Podcast title
     */
    title: string;
    /**
     * Name of the podcasts owner community
     */
    owner_name: string;
    [key: string]: any;
}

export interface PollsAnswer {
    /**
     * Answer ID
     */
    id: number;
    /**
     * Answer rate in percents
     */
    rate: number;
    /**
     * Answer text
     */
    text: string;
    /**
     * Votes number
     */
    votes: number;
    [key: string]: any;
}

export interface PollsBackground {
    /**
     * Gradient angle with 0 on positive X axis
     */
    angle: number;
    /**
     * Hex color code without #
     */
    color: string;
    /**
     * Original height of pattern tile
     */
    height: number;
    /**
     * Original with of pattern tile
     */
    width: number;
    [key: string]: any;
    id: number;
    name: string;
    images: BaseImage[];
    points: BaseGradientPoint[];
    type: "gradient" | "tile";
}

export interface PollsFieldsVoters {
    /**
     * Answer ID
     */
    answer_id: number;
    /**
     * Answer offset
     */
    answer_offset: string;
    [key: string]: any;
}

export interface PollsFriend {
    [key: string]: any;
    id: number;
}

export interface PollsPoll {
    /**
     * Information whether the poll with multiple choices
     */
    multiple: boolean | number;
    /**
     * Current user's answer ID
     */
    answer_id: number;
    /**
     * Date when poll has been created in Unixtime
     */
    created: number;
    /**
     * Poll ID
     */
    id: number;
    /**
     * Poll owner's ID
     */
    owner_id: number;
    /**
     * Poll author's ID
     */
    author_id: number;
    /**
     * Poll question
     */
    question: string;
    /**
     * Votes number
     */
    votes: number;
    [key: string]: any;
    friends: PollsFriend[];
    end_date: number;
    answer_ids: number[];
    closed: boolean | number;
    is_board: boolean | number;
    can_edit: boolean | number;
    can_vote: boolean | number;
    can_report: boolean | number;
    can_share: boolean | number;
    embed_hash: string;
    answers: PollsAnswer[];
    disable_unvote: boolean | number;
}

export type PollsPollAnonymous = boolean | number;

export interface PollsVoters {
    /**
     * Answer ID
     */
    answer_id: number;
    /**
     * Answer offset
     */
    answer_offset: string;
    [key: string]: any;
}

export interface PollsVotersFieldsUsers {
    /**
     * Votes number
     */
    count: number;
    [key: string]: any;
    items: UsersUserFull[];
}

export interface PollsVotersUsers {
    /**
     * Votes number
     */
    count: number;
    /**
     * User ID
     */
    items: number[];
    [key: string]: any;
}

export type PrettyCardsButtonOneOf = any;

export interface PrettyCardsPrettyCard {
    /**
     * Button text in current language
     */
    button_text: string;
    /**
     * Card ID (long int returned as string)
     */
    card_id: string;
    /**
     * Link URL
     */
    link_url: string;
    /**
     * Photo ID (format "<owner_id>_<media_id>")
     */
    photo: string;
    /**
     * Price if set (decimal number returned as string)
     */
    price: string;
    /**
     * Old price if set (decimal number returned as string)
     */
    price_old: string;
    /**
     * Title
     */
    title: string;
    [key: string]: any;
    images: BaseImage[];
}

export type PrettyCardsPrettyCardOrError = any;

export interface SearchHint {
    /**
     * Object description
     */
    description: string;
    [key: string]: any;
}

export type SearchHintSection = "groups" | "events" | "publics" | "correspondents" | "people" | "friends" | "mutual_friends" | "promo";

export type SearchHintType = "group" | "profile" | "vk_app" | "app" | "html5_game" | "link";

export interface SecureGiveEventStickerItem {
    [key: string]: any;
    user_id: number;
    status: string;
}

export interface SecureLevel {
    /**
     * Level
     */
    level: number;
    /**
     * User ID
     */
    uid: number;
    [key: string]: any;
}

export interface SecureSetCounterItem {
    /**
     * User ID
     */
    id: number;
    [key: string]: any;
}

export interface SecureSmsNotification {
    /**
     * Application ID
     */
    app_id: string;
    /**
     * Date when message has been sent in Unixtime
     */
    date: string;
    /**
     * Notification ID
     */
    id: string;
    /**
     * Messsage text
     */
    message: string;
    /**
     * User ID
     */
    user_id: string;
    [key: string]: any;
}

export interface SecureTokenChecked {
    /**
     * Date when access_token has been generated in Unixtime
     */
    date: number;
    /**
     * Date when access_token will expire in Unixtime
     */
    expire: number;
    /**
     * Returns if successfully processed
     */
    success: number;
    /**
     * User ID
     */
    user_id: number;
    [key: string]: any;
}

export interface SecureTransaction {
    /**
     * Transaction date in Unixtime
     */
    date: number;
    /**
     * Transaction ID
     */
    id: number;
    /**
     * From ID
     */
    uid_from: number;
    /**
     * To ID
     */
    uid_to: number;
    /**
     * Votes number
     */
    votes: number;
    [key: string]: any;
}

/*Activity stats*/
export interface StatsActivity {
    /**
     * Comments number
     */
    comments: number;
    /**
     * Reposts number
     */
    copies: number;
    /**
     * Hidden from news count
     */
    hidden: number;
    /**
     * Likes number
     */
    likes: number;
    /**
     * New subscribers count
     */
    subscribed: number;
    /**
     * Unsubscribed count
     */
    unsubscribed: number;
    [key: string]: any;
}

export interface StatsCity {
    /**
     * Visitors number
     */
    count: number;
    /**
     * City name
     */
    name: string;
    /**
     * City ID
     */
    value: number;
    [key: string]: any;
}

export interface StatsCountry {
    /**
     * Country code
     */
    code: string;
    /**
     * Visitors number
     */
    count: number;
    /**
     * Country name
     */
    name: string;
    /**
     * Country ID
     */
    value: number;
    [key: string]: any;
}

export interface StatsPeriod {
    [key: string]: any;
}

export type StatsPeriodFromOneOf = number;

export type StatsPeriodToOneOf = number;

/*Reach stats*/
export interface StatsReach {
    /**
     * Reach count from mobile devices
     */
    mobile_reach: number;
    /**
     * Reach count
     */
    reach: number;
    /**
     * Subscribers reach count
     */
    reach_subscribers: number;
    [key: string]: any;
    age: StatsSexAge[];
    cities: StatsCity[];
    countries: StatsCountry[];
    sex: StatsSexAge[];
    sex_age: StatsSexAge[];
}

export type StatsReachOneOf = StatsReach;

export interface StatsSexAge {
    /**
     * Visitors number
     */
    count: number;
    /**
     * Sex/age value
     */
    value: string;
    [key: string]: any;
    reach: number;
    reach_subscribers: number;
    count_subscribers: number;
}

/*Views stats*/
export interface StatsViews {
    /**
     * Number of views from mobile devices
     */
    mobile_views: number;
    /**
     * Views number
     */
    views: number;
    /**
     * Visitors number
     */
    visitors: number;
    [key: string]: any;
    age: StatsSexAge[];
    cities: StatsCity[];
    countries: StatsCountry[];
    sex: StatsSexAge[];
    sex_age: StatsSexAge[];
}

export type StatsVisitorsOneOf = StatsViews;

export interface StatsWallpostStat {
    /**
     * Hidings number
     */
    hide: number;
    /**
     * People have joined the group
     */
    join_group: number;
    /**
     * Link clickthrough
     */
    links: number;
    /**
     * Subscribers reach
     */
    reach_subscribers: number;
    /**
     * Total reach
     */
    reach_total: number;
    /**
     * Reports number
     */
    report: number;
    /**
     * Clickthrough to community
     */
    to_group: number;
    /**
     * Unsubscribed members
     */
    unsubscribe: number;
    [key: string]: any;
    post_id: number;
    reach_subscribers_count: number;
    reach_total_count: number;
    reach_viral: number;
    reach_ads: number;
    sex_age: StatsSexAge[];
}

export interface StatusStatus {
    /**
     * Status text
     */
    text: string;
    [key: string]: any;
}

export interface StickersImageSet {
    /**
     * Base URL for images in set
     */
    base_url: string;
    /**
     * Version number to be appended to the image URL
     */
    version: number;
    [key: string]: any;
    images: BaseImage[];
}

export interface StorageValue {
    [key: string]: any;
    key: string;
    value: string;
}

export interface StoreProduct {
    /**
     * Id of the product
     */
    id: number;
    /**
     * Product type
     */
    type: "stickers";
    /**
     * Information whether sticker product wasn't used after being purchased
     */
    is_new: boolean | number;
    /**
     * Product copyright information
     */
    copyright: string;
    /**
     * Id of the base pack (for sticker pack styles)
     */
    base_id: number;
    /**
     * Date (Unix time) when the product was purchased
     */
    purchase_date: number;
    /**
     * Title of the product
     */
    title: string;
    /**
     * Information whether the product is an animated sticker pack (for stickers product type)
     */
    has_animation: boolean | number;
    /**
     * Subtitle of the product
     */
    subtitle: string;
    /**
     * Information whether sticker pack is a vmoji pack
     */
    is_vmoji: boolean | number;
    [key: string]: any;
    style_ids: number[];
    style_sticker_ids: number[];
    previews: BaseImage[];
    payment_region: string;
    title_lang_key: string;
    description_lang_key: string;
    url: string;
}

export type StoreProductIcon = StickersImageSet;

export interface StoreStickersKeyword {
    [key: string]: any;
    words: string[];
    stickers: StoreStickersKeywordSticker[];
}

export interface StoreStickersKeywordSticker {
    /**
     * Pack id
     */
    pack_id: number;
    /**
     * Sticker id
     */
    sticker_id: number;
    [key: string]: any;
}

export type StoreStickersKeywordStickers = BaseStickersList;

export interface StoriesClickableArea {
    [key: string]: any;
    x: number;
    y: number;
}

export interface StoriesClickableSticker {
    /**
     * Clickable sticker ID
     */
    id: number;
    /**
     * Color, hex format
     */
    color: string;
    /**
     * Sticker ID
     */
    sticker_id: number;
    /**
     * Sticker pack ID
     */
    sticker_pack_id: number;
    /**
     * Additional context for app sticker
     */
    app_context: string;
    /**
     * Whether current user has unread interaction with this app
     */
    has_new_interactions: boolean | number;
    /**
     * Whether current user allowed broadcast notify from this app
     */
    is_broadcast_notify_allowed: boolean | number;
    [key: string]: any;
    clickable_area: StoriesClickableArea[];
    hashtag: string;
    mention: string;
    tooltip_text: string;
    owner_id: number;
    story_id: number;
    clip_id: number;
    question: string;
    question_button: string;
    place_id: number;
    audio_start_time: number;
    style: "transparent" | "blue_gradient" | "red_gradient" | "underline" | "blue" | "green" | "white" | "question_reply" | "light" | "impressive";
    type: "hashtag" | "mention" | "link" | "question" | "place" | "market_item" | "music" | "story_reply" | "owner" | "post" | "poll" | "sticker" | "app" | "situational_theme" | "playlist" | "clip";
    subtype: "market_item" | "aliexpress_product";
    post_owner_id: number;
    post_id: number;
    situational_theme_id: number;
    situational_app_url: string;
}

export interface StoriesClickableStickers {
    [key: string]: any;
    clickable_stickers: StoriesClickableSticker[];
    original_height: number;
    original_width: number;
}

export interface StoriesFeedItem {
    /**
     * Type of Feed Item
     */
    type: "promo_stories" | "stories" | "live_active" | "live_finished" | "app_grouped_stories" | "discover";
    [key: string]: any;
    id: string;
    owner_id: number;
    stories: StoriesStory[];
    grouped: StoriesFeedItem[];
    track_code: string;
    has_unseen: boolean | number;
    name: string;
}

/*Additional data for promo stories*/
export interface StoriesPromoBlock {
    /**
     * Promo story title
     */
    name: string;
    /**
     * RL of square photo of the story with 50 pixels in width
     */
    photo_50: string;
    /**
     * RL of square photo of the story with 100 pixels in width
     */
    photo_100: string;
    /**
     * Hide animation for promo story
     */
    not_animated: boolean | number;
    /**
     * Promo story from advice
     */
    is_advice: boolean | number;
    [key: string]: any;
}

export interface StoriesReplies {
    /**
     * Replies number.
     */
    count: number;
    /**
     * New replies number.
     */
    new: number;
    [key: string]: any;
}

export interface StoriesStatCategory {
    [key: string]: any;
    header: string;
    lines: StoriesStatLine[];
}

export interface StoriesStatLine {
    [key: string]: any;
    name: string;
    counter: number;
    is_unavailable: boolean | number;
}

export interface StoriesStory {
    /**
     * Access key for private object.
     */
    access_key: string;
    /**
     * Information whether current user can like the story.
     */
    can_like: boolean | number;
    /**
     * Date when story has been added in Unixtime.
     */
    date: number;
    /**
     * Story expiration time. Unixtime.
     */
    expires_at: number;
    /**
     * Story ID.
     */
    id: number;
    /**
     * Information whether the story is deleted (false - no, true - yes).
     */
    is_deleted: boolean | number;
    /**
     * Information whether the story is expired (false - no, true - yes).
     */
    is_expired: boolean | number;
    /**
     * Story owner's ID.
     */
    owner_id: number;
    /**
     * Access key for private object.
     */
    parent_story_access_key: string;
    /**
     * Parent story ID.
     */
    parent_story_id: number;
    /**
     * Parent story owner's ID.
     */
    parent_story_owner_id: number;
    /**
     * Views number.
     */
    views: number;
    [key: string]: any;
    narratives_count: number;
    first_narrative_title: string;
    can_use_in_narrative: boolean | number;
}

export interface StoriesStoryLink {
    /**
     * Link text
     */
    text: string;
    /**
     * Link URL
     */
    url: string;
    /**
     * How to open url
     */
    link_url_target: string;
    [key: string]: any;
}

export interface StoriesStoryStats {
    [key: string]: any;
}

export interface StoriesStoryStatsStat {
    /**
     * Stat value
     */
    count: number;
    [key: string]: any;
}

export type StoriesStoryStatsState = "on" | "off" | "hidden";

export type StoriesStoryType = "photo" | "video" | "live_active" | "live_finished";

export type StoriesUploadLinkText = "to_store" | "vote" | "more" | "book" | "order" | "enroll" | "fill" | "signup" | "buy" | "ticket" | "write" | "open" | "learn_more" | "view" | "go_to" | "contact" | "watch" | "play" | "install" | "read" | "calendar";

export interface StoriesUploadResult {
    [key: string]: any;
    upload_result: string;
}

export interface StoriesViewersItem {
    /**
     * user has like for this object
     */
    is_liked: boolean | number;
    /**
     * user id
     */
    user_id: number;
    [key: string]: any;
}

export interface StreamingStats {
    /**
     * Events type
     */
    event_type: "post" | "comment" | "share";
    [key: string]: any;
    stats: StreamingStatsPoint[];
}

export interface StreamingStatsPoint {
    [key: string]: any;
    timestamp: number;
    value: number;
}

export interface SupportUnblockScreenButtonFields {
    /**
     * Надпись на кнопке
     */
    text: string;
    [key: string]: any;
    id: number;
    type: "button";
}

export interface SupportUnblockScreenButtonSubmitFields {
    /**
     * Надпись на кнопке
     */
    text: string;
    /**
     * Индекс экрана для перехода
     */
    target_screen: string;
    [key: string]: any;
    type: "button_submit";
    id: number;
    disabled: boolean | number;
}

export interface SupportUnblockScreenButtonSupportFields {
    [key: string]: any;
    type: "support_button";
    id: number;
    text: string;
}

export interface SupportUnblockScreenButtonUnblockFields {
    /**
     * Надпись на кнопке
     */
    text: string;
    [key: string]: any;
    type: "unblock_button";
    id: number;
}

export interface SupportUnblockScreenContentBlockFields {
    /**
     * Тип контента
     */
    content_type: "post" | "message";
    [key: string]: any;
    type: "ban_reason_content";
}

export interface SupportUnblockScreenEventsListFields {
    /**
     * Заголовок над пунктами
     */
    header: string;
    [key: string]: any;
    type: "events_list";
    items: SupportUnblockScreenEventsListFieldsItem[];
}

export interface SupportUnblockScreenEventsListFieldsItem {
    /**
     * Дата блокировки
     */
    date: string;
    /**
     * Причина блокировки
     */
    reason: string;
    [key: string]: any;
}

export interface SupportUnblockScreenHeaderFields {
    /**
     * Текст заголовка
     */
    text: string;
    /**
     * Текст подзаголовка
     */
    subheader: string;
    /**
     * Картинка над текстом
     */
    image: string;
    /**
     * Нужен ли градиент  на фоне заголовка
     */
    gradient: boolean | number;
    /**
     * Нужна ли кнопка выхода
     */
    exit_btn: boolean | number;
    [key: string]: any;
    type: "header";
}

export type SupportUnblockScreenItem = any;

export interface SupportUnblockScreenModalButtonFields {
    /**
     * Надпись на кнопке
     */
    label: string;
    [key: string]: any;
    id: number;
    type: "modal_button";
}

export interface SupportUnblockScreenModalButtonModalContent {
    [key: string]: any;
    title: string;
    text: string;
}

export interface SupportUnblockScreenSlidersFields {
    [key: string]: any;
    type: "sliders";
    items: SupportUnblockScreenSlidersFieldsItem[];
}

export interface SupportUnblockScreenSlidersFieldsItem {
    /**
     * Краткое описание, выпадающее при нажатии
     */
    short_desc: string;
    /**
     * Экран, на который происходит переход; обычно содержимое другого экрана - просто заголовок с текстом и кнопкой
     */
    target_screen: string;
    [key: string]: any;
    title: string;
}

export interface SupportUnblockScreenStepperFields {
    /**
     * Экран, на который происходит переход после ответа на все вопросы
     */
    target: string;
    [key: string]: any;
    type: "stepper";
    questions: SupportUnblockScreenStepperQuestions[];
}

export interface SupportUnblockScreenStepperQuestions {
    /**
     * Текст вопроса
     */
    title: string;
    /**
     * Текст, отображаемый при нажатии на да
     */
    yes_desc: string;
    /**
     * Текст, отображаемый при нажатии на нет
     */
    no_desc: string;
    /**
     * Экран, на который происходит переход; обычно содержимое другого экрана - просто заголовок с текстом и кнопкой
     */
    target_screen: string;
    [key: string]: any;
    step: number;
}

export interface SupportUnblockScreenTextBackgroundFields {
    /**
     * Текст
     */
    text: string;
    /**
     * Полный URL фонового изображения
     */
    bg_image: string;
    [key: string]: any;
    type: "text_background";
}

export interface SupportUnblockScreenTextBorderedFields {
    /**
     * Текст
     */
    text: string;
    /**
     * Нужна ли кнопка 'Получить уведомление'
     */
    notify_btn: boolean | number;
    [key: string]: any;
    type: "text_bordered";
}

export interface SupportUnblockScreenTutorialAnswers {
    /**
     * Текст ответа
     */
    title: string;
    /**
     * Является ли вариант ответа правильным
     */
    is_right: boolean | number;
    /**
     * Текст, который отображается при выборе этого варианта
     */
    explanation: string;
    [key: string]: any;
    id: string;
}

export interface SupportUnblockScreenTutorialFields {
    /**
     * Экран, на который происходит переход после ответа на все вопросы
     */
    target: string;
    [key: string]: any;
    type: "tutorial";
    questions: SupportUnblockScreenTutorialQuestions[];
}

export interface SupportUnblockScreenTutorialQuestions {
    /**
     * Текст вопроса
     */
    title: string;
    [key: string]: any;
    id: string;
    answers: SupportUnblockScreenTutorialAnswers[];
}

export interface UsersCareer {
    /**
     * City ID
     */
    city_id: number;
    /**
     * City name
     */
    city_name: string;
    /**
     * Company name
     */
    company: string;
    /**
     * Country ID
     */
    country_id: number;
    /**
     * From year
     */
    from: number;
    /**
     * Community ID
     */
    group_id: number;
    /**
     * Career ID
     */
    id: number;
    /**
     * Position
     */
    position: string;
    /**
     * Till year
     */
    until: number;
    [key: string]: any;
}

export interface UsersExports {
    [key: string]: any;
    facebook: number;
    livejournal: number;
    twitter: number;
}

export type UsersFields = "first_name_nom" | "first_name_gen" | "first_name_dat" | "first_name_acc" | "first_name_ins" | "first_name_abl" | "last_name_nom" | "last_name_gen" | "last_name_dat" | "last_name_acc" | "last_name_ins" | "last_name_abl" | "photo_id" | "verified" | "sex" | "bdate" | "bdate_visibility" | "city" | "country" | "home_town" | "has_photo" | "photo" | "photo_rec" | "photo_50" | "photo_100" | "photo_200_orig" | "photo_200" | "photo_400" | "photo_400_orig" | "photo_big" | "photo_medium" | "photo_medium_rec" | "photo_max" | "photo_max_orig" | "photo_max_size" | "third_party_buttons" | "online" | "lists" | "domain" | "has_mobile" | "contacts" | "language" | "site" | "education" | "universities" | "schools" | "status" | "last_seen" | "followers_count" | "counters" | "common_count" | "online_info" | "occupation" | "nickname" | "relatives" | "relation" | "personal" | "connections" | "exports" | "wall_comments" | "wall_default" | "activities" | "activity" | "interests" | "music" | "movies" | "tv" | "books" | "is_no_index" | "no_index" | "games" | "about" | "quotes" | "can_post" | "can_see_all_posts" | "can_see_audio" | "can_see_gifts" | "work" | "places" | "can_write_private_message" | "can_send_friend_request" | "can_upload_doc" | "can_ban" | "is_favorite" | "is_hidden_from_feed" | "timezone" | "screen_name" | "maiden_name" | "crop_photo" | "is_friend" | "is_best_friend" | "friend_status" | "career" | "military" | "blacklisted" | "blacklisted_by_me" | "can_subscribe_posts" | "descriptions" | "trending" | "mutual" | "friendship_weeks" | "can_invite_to_chats" | "stories_archive_count" | "has_unseen_stories" | "video_live" | "video_live_level" | "video_live_count" | "clips_count" | "service_description" | "can_see_wishes" | "is_subscribed_podcasts" | "can_subscribe_podcasts" | "animated_avatar" | "owner_state" | "is_esia_verified" | "is_esia_linked" | "is_tinkoff_linked" | "is_tinkoff_verified" | "is_sber_verified" | "oauth_linked" | "oauth_verification" | "is_sber_linked";

export interface UsersLastSeen {
    /**
     * Type of the platform that used for the last authorization
     */
    platform: number;
    /**
     * Last visit date (in Unix time)
     */
    time: number;
    [key: string]: any;
}

export interface UsersMilitary {
    /**
     * Country ID
     */
    country_id: number;
    /**
     * From year
     */
    from: number;
    /**
     * Military ID
     */
    id: number;
    /**
     * Unit name
     */
    unit: string;
    /**
     * Unit ID
     */
    unit_id: number;
    /**
     * Till year
     */
    until: number;
    [key: string]: any;
}

export interface UsersOccupation {
    /**
     * ID of school, university, company group
     */
    id: number;
    /**
     * Name of occupation
     */
    name: string;
    /**
     * Type of occupation
     */
    type: "school" | "university" | "work";
    [key: string]: any;
    graduate_year: number;
    country_id: number;
    city_id: number;
}

export interface UsersOnlineInfo {
    /**
     * Whether you can see real online status of user or not
     */
    visible: boolean | number;
    /**
     * Last time we saw user being active
     */
    last_seen: number;
    /**
     * Whether user is currently online or not
     */
    is_online: boolean | number;
    /**
     * Application id from which user is currently online or was last seen online
     */
    app_id: number;
    /**
     * Is user online from desktop app or mobile app
     */
    is_mobile: boolean | number;
    /**
     * In case user online is not visible, it indicates approximate timeframe of user online
     */
    status: "recently" | "last_week" | "last_month" | "long_ago" | "not_show";
    [key: string]: any;
}

export interface UsersPersonal {
    /**
     * User's views on alcohol
     */
    alcohol: number;
    /**
     * User's inspired by
     */
    inspired_by: string;
    /**
     * User's languages
     */
    langs: string[];
    /**
     * User's personal priority in life
     */
    life_main: number;
    /**
     * User's personal priority in people
     */
    people_main: number;
    /**
     * User's political views
     */
    political: number;
    /**
     * User's religion
     */
    religion: string;
    /**
     * User's religion id
     */
    religion_id: number;
    /**
     * User's views on smoking
     */
    smoking: number;
    [key: string]: any;
    langs_full: DatabaseLanguageFull[];
}

export interface UsersRelative {
    /**
     * Date of child birthday (format dd.mm.yyyy)
     */
    birth_date: string;
    /**
     * Relative ID
     */
    id: number;
    /**
     * Name of relative
     */
    name: string;
    /**
     * Relative type
     */
    type: "parent" | "child" | "grandparent" | "grandchild" | "sibling";
    [key: string]: any;
}

export interface UsersSchool {
    /**
     * City ID
     */
    city: number;
    /**
     * School class letter
     */
    class: string;
    /**
     * School class id
     */
    class_id: number;
    /**
     * Country ID
     */
    country: number;
    /**
     * School ID
     */
    id: string;
    /**
     * School name
     */
    name: string;
    /**
     * School type ID
     */
    type: number;
    /**
     * School type name
     */
    type_str: string;
    /**
     * Year the user started to study
     */
    year_from: number;
    /**
     * Graduation year
     */
    year_graduated: number;
    /**
     * Year the user finished to study
     */
    year_to: number;
    [key: string]: any;
    speciality: string;
}

export type UsersSubscriptionsItem = any;

export interface UsersUniversity {
    /**
     * Chair ID
     */
    chair: number;
    /**
     * Chair name
     */
    chair_name: string;
    /**
     * City ID
     */
    city: number;
    /**
     * Country ID
     */
    country: number;
    /**
     * Education form
     */
    education_form: string;
    /**
     * Education form id
     */
    education_form_id: number;
    /**
     * Education status
     */
    education_status: string;
    /**
     * Education status id
     */
    education_status_id: number;
    /**
     * Faculty ID
     */
    faculty: number;
    /**
     * Faculty name
     */
    faculty_name: string;
    /**
     * Graduation year
     */
    graduation: number;
    /**
     * University ID
     */
    id: number;
    /**
     * University name
     */
    name: string;
    [key: string]: any;
    university_group_id: number;
}

export interface UsersUser1 {
    /**
     * Domain name of the user's page
     */
    screen_name: string;
    /**
     * URL of square photo of the user with 50 pixels in width
     */
    photo_50: string;
    /**
     * URL of square photo of the user with 100 pixels in width
     */
    photo_100: string;
    /**
     * Application ID
     */
    online_app: number;
    sex: BaseSex;
    online_info: UsersOnlineInfo;
    online: BaseBoolInt;
    online_mobile: BaseBoolInt;
    verified: BaseBoolInt;
    trending: BaseBoolInt;
    friend_status: FriendsFriendStatusStatus;
    mutual: FriendsRequestsMutual;
}

export type UsersUser = UsersUserMin & UsersUser1;

export interface UsersUserConnections {
    /**
     * User's Skype nickname
     */
    skype: string;
    /**
     * User's Facebook account
     */
    facebook: string;
    /**
     * User's Facebook name
     */
    facebook_name: string;
    /**
     * User's Twitter account
     */
    twitter: string;
    /**
     * User's Livejournal account
     */
    livejournal: string;
    /**
     * User's Instagram account
     */
    instagram: string;
    [key: string]: any;
}

export interface UsersUserCounters {
    /**
     * Albums number
     */
    albums: number;
    /**
     * Badges number
     */
    badges: number;
    /**
     * Audios number
     */
    audios: number;
    /**
     * Followers number
     */
    followers: number;
    /**
     * Friends number
     */
    friends: number;
    /**
     * Gifts number
     */
    gifts: number;
    /**
     * Communities number
     */
    groups: number;
    /**
     * Notes number
     */
    notes: number;
    /**
     * Online friends number
     */
    online_friends: number;
    /**
     * Public pages number
     */
    pages: number;
    /**
     * Photos number
     */
    photos: number;
    /**
     * Subscriptions number
     */
    subscriptions: number;
    /**
     * Number of photos with user
     */
    user_photos: number;
    /**
     * Number of videos with user
     */
    user_videos: number;
    /**
     * Videos number
     */
    videos: number;
    /**
     * Playlists number
     */
    video_playlists: number;
    /**
     * Videos followers number
     */
    videos_followers: number;
    [key: string]: any;
    new_photo_tags: number;
    new_recognition_tags: number;
    mutual_friends: number;
    friends_followers: number;
    posts: number;
    articles: number;
    wishes: number;
    podcasts: number;
    clips: number;
    clips_followers: number;
    clips_views: number;
    clips_likes: number;
}

export interface UsersUserFull1 {
    /**
     * User's first name in nominative case
     */
    first_name_nom: string;
    /**
     * User's first name in genitive case
     */
    first_name_gen: string;
    /**
     * User's first name in dative case
     */
    first_name_dat: string;
    /**
     * User's first name in accusative case
     */
    first_name_acc: string;
    /**
     * User's first name in instrumental case
     */
    first_name_ins: string;
    /**
     * User's first name in prepositional case
     */
    first_name_abl: string;
    /**
     * User's last name in nominative case
     */
    last_name_nom: string;
    /**
     * User's last name in genitive case
     */
    last_name_gen: string;
    /**
     * User's last name in dative case
     */
    last_name_dat: string;
    /**
     * User's last name in accusative case
     */
    last_name_acc: string;
    /**
     * User's last name in instrumental case
     */
    last_name_ins: string;
    /**
     * User's last name in prepositional case
     */
    last_name_abl: string;
    /**
     * User nickname
     */
    nickname: string;
    /**
     * User maiden name
     */
    maiden_name: string;
    /**
     * User contact name
     */
    contact_name: string;
    /**
     * Domain name of the user's page
     */
    domain: string;
    /**
     * User's date of birth
     */
    bdate: string;
    /**
     * User's timezone
     */
    timezone: number;
    /**
     * URL of square photo of the user with 200 pixels in width
     */
    photo_200: string;
    /**
     * URL of square photo of the user with maximum width
     */
    photo_max: string;
    /**
     * URL of user's photo with 200 pixels in width
     */
    photo_200_orig: string;
    /**
     * URL of user's photo with 400 pixels in width
     */
    photo_400_orig: string;
    /**
     * URL of user's photo of maximum size
     */
    photo_max_orig: string;
    /**
     * ID of the user's main photo
     */
    photo_id: string;
    /**
     * Information whether the user is a best friend of current user
     */
    is_best_friend: boolean | number;
    /**
     * Information whether current user can call
     */
    can_call: boolean | number;
    /**
     * Information whether group can call user
     */
    can_call_from_group: boolean | number;
    /**
     * Information whether current user can see the user's wishes
     */
    can_see_wishes: boolean | number;
    /**
     * Information whether current user can be invited to the community
     */
    can_be_invited_group: boolean | number;
    /**
     * User's mobile phone number
     */
    mobile_phone: string;
    /**
     * User's additional phone number
     */
    home_phone: string;
    /**
     * User's website
     */
    site: string;
    /**
     * User's status
     */
    status: string;
    /**
     * User's status
     */
    activity: string;
    /**
     * Number of user's followers
     */
    followers_count: number;
    /**
     * User level in live streams achievements
     */
    video_live_level: number;
    /**
     * Number of user's live streams
     */
    video_live_count: number;
    /**
     * Number of user's clips
     */
    clips_count: number;
    /**
     * Number of common friends with current user
     */
    common_count: number;
    /**
     * University ID
     */
    university: number;
    /**
     * University name
     */
    university_name: string;
    /**
     * Faculty ID
     */
    faculty: number;
    /**
     * Faculty name
     */
    faculty_name: string;
    /**
     * Graduation year
     */
    graduation: number;
    /**
     * Education form
     */
    education_form: string;
    /**
     * User's education status
     */
    education_status: string;
    /**
     * User hometown
     */
    home_town: string;
    /**
     * Information whether current user is subscribed to podcasts
     */
    is_subscribed_podcasts: boolean | number;
    /**
     * Owner in whitelist or not
     */
    can_subscribe_podcasts: boolean | number;
    /**
     * Can subscribe to wall
     */
    can_subscribe_posts: boolean | number;
    /**
     * Information whether the user can be baned (added to black list) by me
     */
    can_ban: boolean | number;
    /**
     * Access to user profile is restricted for search engines
     */
    is_no_index: boolean | number;
    /**
     * Contact person ID
     */
    contact_id: number;
    /**
     * IDs of friend lists with user
     */
    lists: number[];
    city: BaseCity;
    country: BaseCountry;
    owner_state: OwnerState;
    has_photo: BaseBoolInt;
    has_mobile: BaseBoolInt;
    is_friend: BaseBoolInt;
    wall_comments: BaseBoolInt;
    can_post: BaseBoolInt;
    can_see_all_posts: BaseBoolInt;
    can_see_audio: BaseBoolInt;
    type: UsersUserType;
    email: string;
    skype: string;
    facebook: string;
    facebook_name: string;
    twitter: string;
    livejournal: string;
    instagram: string;
    test: BaseBoolInt;
    video_live: VideoLiveInfo;
    is_video_live_notifications_blocked: BaseBoolInt;
    is_service: boolean | number;
    service_description: string;
    photo_rec: PhotosPhotoFalseable;
    photo_medium: PhotosPhotoFalseable;
    photo_medium_rec: PhotosPhotoFalseable;
    photo: string;
    photo_big: string;
    photo_400: string;
    photo_max_size: PhotosPhoto;
    language: string;
    stories_archive_count: number;
    has_unseen_stories: boolean | number;
    wall_default: "owner" | "all";
    can_see_gifts: BaseBoolInt;
    interests: string;
    books: string;
    tv: string;
    quotes: string;
    about: string;
    games: string;
    movies: string;
    activities: string;
    music: string;
    can_write_private_message: BaseBoolInt;
    can_send_friend_request: BaseBoolInt;
    status_audio: AudioAudio;
    status_app: AppsAppMin;
    last_seen: UsersLastSeen;
    exports: UsersExports;
    crop_photo: BaseCropPhoto;
    blacklisted: BaseBoolInt;
    blacklisted_by_me: BaseBoolInt;
    is_favorite: BaseBoolInt;
    is_hidden_from_feed: BaseBoolInt;
    occupation: UsersOccupation;
    career: UsersCareer[];
    military: UsersMilitary[];
    university_group_id: number;
    relation: UsersUserRelation;
    relation_partner: UsersUserMin;
    personal: UsersPersonal;
    universities: UsersUniversity[];
    schools: UsersSchool[];
    relatives: UsersRelative[];
    counters: UsersUserCounters;
    access_key: string;
    can_upload_doc: BaseBoolInt;
    hash: string;
    is_message_request: boolean | number;
    descriptions: string[];
}

export type UsersUserFull = UsersUser & UsersUserFull1;

export interface UsersUserMin {
    /**
     * Returns if a profile is deleted or blocked
     */
    deactivated: string;
    /**
     * User first name
     */
    first_name: string;
    /**
     * Returns if a profile is hidden.
     */
    hidden: number;
    /**
     * User ID
     */
    id: number;
    /**
     * User last name
     */
    last_name: string;
    [key: string]: any;
    can_access_closed: boolean | number;
    is_closed: boolean | number;
}

export type UsersUserRelation = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface UsersUserSettingsXtr {
    /**
     * User's date of birth
     */
    bdate: string;
    /**
     * Information whether user's birthdate are hidden
     */
    bdate_visibility: number;
    /**
     * User first name
     */
    first_name: string;
    /**
     * User's hometown
     */
    home_town: string;
    /**
     * User last name
     */
    last_name: string;
    /**
     * User maiden name
     */
    maiden_name: string;
    /**
     * User phone number with some hidden digits
     */
    phone: string;
    /**
     * Domain name of the user's page
     */
    screen_name: string;
    /**
     * User status
     */
    status: string;
    [key: string]: any;
    relation_requests: UsersUserMin[];
    languages: string[];
}

export type UsersUserType = "profile";

export interface UsersUserXtrType1 {
    type: UsersUserType;
}

export type UsersUserXtrType = UsersUserFull & UsersUserXtrType1;

export interface UsersUsersArray {
    /**
     * Users number
     */
    count: number;
    /**
     * User ID
     */
    items: number[];
    [key: string]: any;
}

export interface UtilsDomainResolved {
    /**
     * Object ID
     */
    object_id: number;
    /**
     * Group ID
     */
    group_id: number;
    [key: string]: any;
}

export type UtilsDomainResolvedType = "user" | "group" | "application" | "page" | "vk_app" | "community_application";

export interface UtilsLastShortenedLink {
    /**
     * Access key for private stats
     */
    access_key: string;
    /**
     * Link key (characters after vk.cc/)
     */
    key: string;
    /**
     * Short link URL
     */
    short_url: string;
    /**
     * Creation time in Unixtime
     */
    timestamp: number;
    /**
     * Full URL
     */
    url: string;
    /**
     * Total views number
     */
    views: number;
    [key: string]: any;
}

export interface UtilsLinkChecked {
    /**
     * Link URL
     */
    link: string;
    [key: string]: any;
}

export type UtilsLinkCheckedStatus = "not_banned" | "banned" | "processing";

export interface UtilsLinkStats {
    /**
     * Link key (characters after vk.cc/)
     */
    key: string;
    [key: string]: any;
    stats: UtilsStats[];
}

export interface UtilsLinkStatsExtended {
    /**
     * Link key (characters after vk.cc/)
     */
    key: string;
    [key: string]: any;
    stats: UtilsStatsExtended[];
}

export interface UtilsShortLink {
    /**
     * Access key for private stats
     */
    access_key: string;
    /**
     * Link key (characters after vk.cc/)
     */
    key: string;
    /**
     * Short link URL
     */
    short_url: string;
    /**
     * Full URL
     */
    url: string;
    [key: string]: any;
}

export interface UtilsStats {
    /**
     * Start time
     */
    timestamp: number;
    /**
     * Total views number
     */
    views: number;
    [key: string]: any;
}

export interface UtilsStatsCity {
    /**
     * City ID
     */
    city_id: number;
    /**
     * Views number
     */
    views: number;
    [key: string]: any;
}

export interface UtilsStatsCountry {
    /**
     * Country ID
     */
    country_id: number;
    /**
     * Views number
     */
    views: number;
    [key: string]: any;
}

export interface UtilsStatsExtended {
    /**
     * Start time
     */
    timestamp: number;
    /**
     * Total views number
     */
    views: number;
    [key: string]: any;
    cities: UtilsStatsCity[];
    countries: UtilsStatsCountry[];
    sex_age: UtilsStatsSexAge[];
}

export interface UtilsStatsSexAge {
    /**
     * Age denotation
     */
    age_range: string;
    /**
     * Views by female users
     */
    female: number;
    /**
     * Views by male users
     */
    male: number;
    [key: string]: any;
}

export interface VideoEpisode {
    /**
     * Seconds from start of the video
     */
    time: number;
    /**
     * Description of episode
     */
    text: string;
    [key: string]: any;
}

export interface VideoLiveCategory {
    [key: string]: any;
    id: number;
    label: string;
    sublist: VideoLiveCategory[];
}

export interface VideoLiveInfo {
    [key: string]: any;
}

/*Video live settings*/
export interface VideoLiveSettings {
    /**
     * Max possible time for rewind
     */
    max_duration: number;
    [key: string]: any;
}

export interface VideoSaveResult {
    /**
     * Video access key
     */
    access_key: string;
    /**
     * Video description
     */
    description: string;
    /**
     * Video owner ID
     */
    owner_id: number;
    /**
     * Video title
     */
    title: string;
    /**
     * URL for the video uploading
     */
    upload_url: string;
    /**
     * Video ID
     */
    video_id: number;
    [key: string]: any;
}

export interface VideoStreamInputParams {
    [key: string]: any;
    url: string;
    key: string;
    okmp_url: string;
    webrtc_url: string;
}

export interface VideoVideo {
    /**
     * Video access key
     */
    access_key: string;
    /**
     * Date when the video has been added in Unixtime
     */
    adding_date: number;
    /**
     * Information whether current user can repost the video
     */
    can_repost: number;
    /**
     * Number of comments
     */
    comments: number;
    /**
     * Date when video has been uploaded in Unixtime
     */
    date: number;
    /**
     * Video description
     */
    description: string;
    /**
     * Video duration in seconds
     */
    duration: number;
    /**
     * Video width
     */
    width: number;
    /**
     * Video height
     */
    height: number;
    /**
     * Video ID
     */
    id: number;
    /**
     * Video owner ID
     */
    owner_id: number;
    /**
     * Id of the user who uploaded the video if it was uploaded to a group by member
     */
    user_id: number;
    /**
     * Video title
     */
    title: string;
    /**
     * Whether video is added to bookmarks
     */
    is_favorite: boolean | number;
    /**
     * Video embed URL
     */
    player: string;
    /**
     * Number of views
     */
    views: number;
    /**
     * If video is external, number of views on vk
     */
    local_views: number;
    /**
     * Restriction code
     */
    content_restricted: number;
    /**
     * Restriction text
     */
    content_restricted_message: string;
    /**
     * Live donations balance
     */
    balance: number;
    /**
     * Date in Unixtime when the live stream is scheduled to start by the author
     */
    live_start_time: number;
    /**
     * Number of spectators of the stream
     */
    spectators: number;
    /**
     * External platform
     */
    platform: string;
    [key: string]: any;
    response_type: "min" | "full";
    image: VideoVideoImage[];
    first_frame: VideoVideoImage[];
    track_code: string;
    type: "video" | "music_video" | "movie" | "live" | "short_video";
}

export interface VideoVideoAlbum {
    /**
     * Album ID
     */
    id: number;
    /**
     * Album owner's ID
     */
    owner_id: number;
    /**
     * Album title
     */
    title: string;
    /**
     * Album trackcode
     */
    track_code: string;
    [key: string]: any;
    response_type: "min" | "full";
}

export interface VideoVideoAlbumFull1 {
    /**
     * Total number of videos in album
     */
    count: number;
    /**
     * Date when the album has been updated last time in Unixtime
     */
    updated_time: number;
    image: VideoVideoImage[];
    image_blur: BasePropertyExists;
    is_system: BasePropertyExists;
    can_edit: BaseBoolInt;
    can_delete: BaseBoolInt;
    can_upload: BaseBoolInt;
}

export type VideoVideoAlbumFull = VideoVideoAlbum & VideoVideoAlbumFull1;

export interface VideoVideoFiles {
    /**
     * URL of the external player
     */
    external: string;
    /**
     * URL of the mpeg4 file with 144p quality
     */
    mp4_144: string;
    /**
     * URL of the mpeg4 file with 240p quality
     */
    mp4_240: string;
    /**
     * URL of the mpeg4 file with 360p quality
     */
    mp4_360: string;
    /**
     * URL of the mpeg4 file with 480p quality
     */
    mp4_480: string;
    /**
     * URL of the mpeg4 file with 720p quality
     */
    mp4_720: string;
    /**
     * URL of the mpeg4 file with 1080p quality
     */
    mp4_1080: string;
    /**
     * URL of the mpeg4 file with 2K quality
     */
    mp4_1440: string;
    /**
     * URL of the mpeg4 file with 4K quality
     */
    mp4_2160: string;
    /**
     * URL of the flv file with 320p quality
     */
    flv_320: string;
    [key: string]: any;
}

export interface VideoVideoFull1 {
    files: VideoVideoFiles;
    trailer: VideoVideoFiles;
    episodes: VideoEpisode[];
    live_settings: VideoLiveSettings;
}

export type VideoVideoFull = VideoVideo & VideoVideoFull1;

export interface VideoVideoImage1 {
    with_padding: BasePropertyExists;
}

export type VideoVideoImage = BaseImage & VideoVideoImage1;

export interface WallAppPost {
    /**
     * Application ID
     */
    id: number;
    /**
     * Application name
     */
    name: string;
    /**
     * URL of the preview image with 130 px in width
     */
    photo_130: string;
    /**
     * URL of the preview image with 604 px in width
     */
    photo_604: string;
    [key: string]: any;
}

export interface WallAttachedNote {
    /**
     * Comments number
     */
    comments: number;
    /**
     * Date when the note has been created in Unixtime
     */
    date: number;
    /**
     * Note ID
     */
    id: number;
    /**
     * Note owner's ID
     */
    owner_id: number;
    /**
     * Read comments number
     */
    read_comments: number;
    /**
     * Note title
     */
    title: string;
    /**
     * Note text
     */
    text: string;
    /**
     * Note wiki text
     */
    text_wiki: string;
    /**
     * URL of the page with note preview
     */
    view_url: string;
    [key: string]: any;
    privacy_view: string[];
    privacy_comment: string[];
    can_comment: number;
}

export interface WallCarouselBase {
    /**
     * Index of current carousel element
     */
    carousel_offset: number;
    [key: string]: any;
}

export interface WallCommentAttachment {
    [key: string]: any;
}

export type WallCommentAttachmentType = "photo" | "audio" | "audio_playlist" | "video" | "doc" | "link" | "note" | "page" | "market_market_album" | "market" | "sticker" | "graffiti";

export interface WallGeo {
    /**
     * Coordinates as string. <latitude> <longtitude>
     */
    coordinates: string;
    /**
     * Information whether a map is showed
     */
    showmap: number;
    /**
     * Place type
     */
    type: "place" | "point";
    [key: string]: any;
}

export type WallGetFilter = "owner" | "others" | "all" | "postponed" | "suggests" | "archived" | "donut";

export interface WallGraffiti {
    /**
     * Graffiti ID
     */
    id: number;
    /**
     * Graffiti owner's ID
     */
    owner_id: number;
    /**
     * URL of the preview image with 200 px in width
     */
    photo_200: string;
    /**
     * URL of the preview image with 586 px in width
     */
    photo_586: string;
    /**
     * Graffiti height
     */
    height: number;
    /**
     * Graffiti URL
     */
    url: string;
    /**
     * Graffiti width
     */
    width: number;
    /**
     * Access key for graffiti
     */
    access_key: string;
    [key: string]: any;
}

export interface WallPostCopyright {
    [key: string]: any;
    id: number;
    link: string;
    name: string;
    type: string;
}

export interface WallPostSource {
    /**
     * Additional data
     */
    data: string;
    /**
     * Platform name
     */
    platform: string;
    /**
     * URL to an external site used to publish the post
     */
    url: string;
    [key: string]: any;
}

export type WallPostSourceType = "vk" | "widget" | "api" | "rss" | "sms" | "mvk";

export type WallPostType = "post" | "copy" | "reply" | "postpone" | "suggest" | "post_ads" | "photo" | "video";

export interface WallPostedPhoto {
    /**
     * Photo ID
     */
    id: number;
    /**
     * Photo owner's ID
     */
    owner_id: number;
    /**
     * URL of the preview image with 130 px in width
     */
    photo_130: string;
    /**
     * URL of the preview image with 604 px in width
     */
    photo_604: string;
    [key: string]: any;
}

export interface WallViews {
    /**
     * Count
     */
    count: number;
    [key: string]: any;
}

export interface WallWallComment {
    /**
     * Comment ID
     */
    id: number;
    /**
     * Author ID
     */
    from_id: number;
    /**
     * Date when the comment has been added in Unixtime
     */
    date: number;
    /**
     * Comment text
     */
    text: string;
    /**
     * Real position of the comment
     */
    real_offset: number;
    /**
     * Replied user ID
     */
    reply_to_user: number;
    /**
     * Replied comment ID
     */
    reply_to_comment: number;
    /**
     * Photo ID
     */
    pid: number;
    [key: string]: any;
    post_id: number;
    owner_id: number;
    parents_stack: number[];
    photo_id: number;
    video_id: number;
    attachments: WallWallpostAttachment[];
    deleted: boolean | number;
}

export interface WallWallCommentDonut {
    /**
     * Means commentator is donator
     */
    is_don: boolean | number;
    [key: string]: any;
}

export interface WallWallCommentDonutPlaceholder {
    [key: string]: any;
    text: string;
}

export type WallWallItem = WallWallpostFull;

export interface WallWallpost {
    /**
     * Access key to private object
     */
    access_key: string;
    /**
     * Date of publishing in Unixtime
     */
    date: number;
    /**
     * Date of editing in Unixtime
     */
    edited: number;
    /**
     * Post author ID
     */
    from_id: number;
    /**
     * Post ID
     */
    id: number;
    /**
     * Is post archived, only for post owners
     */
    is_archived: boolean | number;
    /**
     * Information whether the post in favorites list
     */
    is_favorite: boolean | number;
    /**
     * Wall owner's ID
     */
    owner_id: number;
    /**
     * If post type 'reply', contains original post ID
     */
    post_id: number;
    /**
     * Post signer ID
     */
    signer_id: number;
    /**
     * Post text
     */
    text: string;
    [key: string]: any;
    is_deleted: boolean | number;
    deleted_reason: string;
    deleted_details: string;
    attachments: WallWallpostAttachment[];
    parents_stack: number[];
}

export interface WallWallpostAttachment {
    /**
     * Access key for the audio
     */
    access_key: string;
    [key: string]: any;
}

export type WallWallpostAttachmentType = "photo" | "photos_list" | "posted_photo" | "audio" | "audio_playlist" | "video" | "video_playlist" | "doc" | "link" | "graffiti" | "note" | "app" | "poll" | "page" | "album" | "market_album" | "market" | "event" | "donut_link" | "article" | "textlive" | "textpost" | "textpost_publish" | "situational_theme" | "group" | "sticker" | "podcast";

export interface WallWallpostCommentsDonut {
    [key: string]: any;
}

/*Info about paid comments feature*/
export interface WallWallpostCommentsDonutPlaceholder {
    [key: string]: any;
    text: string;
}

/*Info about paid wall post*/
export interface WallWallpostDonut {
    /**
     * Post only for dons
     */
    is_donut: boolean | number;
    /**
     * Value of this field need to pass in wall.post/edit in donut_paid_duration
     */
    paid_duration: number;
    /**
     * Says whether group admin can post free copy of this donut post
     */
    can_publish_free_copy: boolean | number;
    /**
     * Says what user can edit in post about donut properties
     */
    edit_mode: "all" | "duration";
    [key: string]: any;
}

export interface WallWallpostDonutPlaceholder {
    [key: string]: any;
    text: string;
}

export interface WallWallpostFull1 {
    /**
     * Post creator ID (if post still can be edited)
     */
    created_by: number;
    /**
     * Topic ID. Allowed values can be obtained from newsfeed.getPostTopics method
     */
    topic_id: 0 | 1 | 7 | 12 | 16 | 19 | 21 | 23 | 25 | 26 | 32 | 43;
    /**
     * Preview length control parameter
     */
    short_text_rate: number;
    /**
     * Hash for sharing
     */
    hash: string;
    copy_history: WallWallpostFull[];
    can_edit: BaseBoolInt;
    can_delete: BaseBoolInt;
    can_pin: BaseBoolInt;
    donut: WallWallpostDonut;
    is_pinned: BaseBoolInt;
    comments: BaseCommentsInfo;
    marked_as_ads: BaseBoolInt;
    type: WallPostType;
    feedback: NewsfeedItemWallpostFeedback;
    to_id: number;
}

export type WallWallpostFull = WallCarouselBase & WallWallpost & WallWallpostFull1;

export interface WidgetsCommentMedia {
    /**
     * Media item ID
     */
    item_id: number;
    /**
     * Media owner's ID
     */
    owner_id: number;
    /**
     * URL of the preview image (type=photo only)
     */
    thumb_src: string;
    [key: string]: any;
}

export type WidgetsCommentMediaType = "audio" | "photo" | "video";

export interface WidgetsCommentReplies {
    /**
     * Comments number
     */
    count: number;
    [key: string]: any;
    replies: WidgetsCommentRepliesItem[];
}

export interface WidgetsCommentRepliesItem {
    /**
     * Comment ID
     */
    cid: number;
    /**
     * Date when the comment has been added in Unixtime
     */
    date: number;
    /**
     * Comment text
     */
    text: string;
    /**
     * User ID
     */
    uid: number;
    [key: string]: any;
}

export interface WidgetsWidgetComment {
    /**
     * Wall owner's ID
     */
    owner_id: number;
    /**
     * Date when the comment has been added in Unixtime
     */
    date: number;
    /**
     * Comment author ID
     */
    from_id: number;
    /**
     * Comment ID
     */
    id: number;
    /**
     * Post type
     */
    post_type: string;
    /**
     * Comment text
     */
    text: string;
    /**
     * Wall owner
     */
    to_id: number;
    /**
     * Preview length control parameter
     */
    short_text_rate: number;
    [key: string]: any;
    attachments: WallCommentAttachment[];
}

export interface WidgetsWidgetLikes {
    /**
     * Likes number
     */
    count: number;
    [key: string]: any;
}

export interface WidgetsWidgetPage {
    /**
     * Date when widgets on the page has been initialized firstly in Unixtime
     */
    date: number;
    /**
     * Page description
     */
    description: string;
    /**
     * Page ID
     */
    id: number;
    /**
     * page_id parameter value
     */
    page_id: string;
    /**
     * URL of the preview image
     */
    photo: string;
    /**
     * Page title
     */
    title: string;
    /**
     * Page absolute URL
     */
    url: string;
    [key: string]: any;
}

