/* eslint-disable */
export interface AccountAccountCounters {
    /**
     * New app requests number
     */
    app_requests?: number;
    /**
     * New events number
     */
    events?: number;
    /**
     * New friends requests number
     */
    friends?: number;
    /**
     * New friends suggestions number
     */
    friends_suggestions?: number;
    /**
     * New gifts number
     */
    gifts?: number;
    /**
     * New groups number
     */
    groups?: number;
    /**
     * New messages number
     */
    messages?: number;
    /**
     * New notifications number
     */
    notifications?: number;
    /**
     * New photo tags number
     */
    photos?: number;
    /**
     * New video tags number
     */
    videos?: number;
    [key: string]: any;
}

export interface AccountInfo {
    /**
     * Country code
     */
    country?: string;
    /**
     * Language ID
     */
    lang?: number;
    [key: string]: any;
}

export interface AccountNameRequest {
    /**
     * First name in request
     */
    first_name?: string;
    /**
     * Request ID needed to cancel the request
     */
    id?: number;
    /**
     * Last name in request
     */
    last_name?: string;
    [key: string]: any;
}

export type AccountNameRequestStatus = "success" | "processing" | "declined" | "was_accepted" | "was_declined";

export interface AccountOffer {
    /**
     * Offer description
     */
    description?: string;
    /**
     * Offer ID
     */
    id?: number;
    /**
     * URL of the preview image
     */
    img?: string;
    /**
     * Instruction how to process the offer
     */
    instruction?: string;
    /**
     * Instruction how to process the offer (HTML format)
     */
    instruction_html?: string;
    /**
     * Offer price
     */
    price?: number;
    /**
     * Offer short description
     */
    short_description?: string;
    /**
     * Offer tag
     */
    tag?: string;
    /**
     * Offer title
     */
    title?: string;
    [key: string]: any;
}

export type AccountOnoffOptions = "on" | "off";

export interface AccountPushConversations {
    /**
     * Items count
     */
    count?: number;
    [key: string]: any;
    items?: AccountPushConversationsItem[];
}

export interface AccountPushConversationsItem {
    /**
     * Time until that notifications are disabled in seconds
     */
    disabled_until?: number;
    /**
     * Peer ID
     */
    peer_id?: number;
    [key: string]: any;
}

export interface AccountPushParams {
    [key: string]: any;
    app_request?: AccountOnoffOptions[];
    birthday?: AccountOnoffOptions[];
    chat?: AccountPushParamsMode[];
    comment?: AccountPushParamsSettings[];
    event_soon?: AccountOnoffOptions[];
    friend?: AccountOnoffOptions[];
    friend_accepted?: AccountOnoffOptions[];
    friend_found?: AccountOnoffOptions[];
    group_accepted?: AccountOnoffOptions[];
    group_invite?: AccountOnoffOptions[];
    like?: AccountPushParamsSettings[];
    mention?: AccountPushParamsSettings[];
    msg?: AccountPushParamsMode[];
    new_post?: AccountOnoffOptions[];
    photos_tag?: AccountPushParamsSettings[];
    reply?: AccountOnoffOptions[];
    repost?: AccountPushParamsSettings[];
    sdk_open?: AccountOnoffOptions[];
    wall_post?: AccountOnoffOptions[];
    wall_publish?: AccountOnoffOptions[];
}

export type AccountPushParamsMode = "on" | "off" | "no_sound" | "no_text";

export type AccountPushParamsSettings = "on" | "off" | "fr_of_fr";

export interface AccountPushSettings {
    /**
     * Time until that notifications are disabled in Unixtime
     */
    disabled_until?: number;
    [key: string]: any;
}

export interface AccountUserSettings {
    /**
     * User's date of birth
     */
    bdate?: string;
    /**
     * Information whether user's birthdate are hidden
     */
    bdate_visibility?: number;
    /**
     * User first name
     */
    first_name?: string;
    /**
     * User's hometown
     */
    home_town?: string;
    /**
     * User last name
     */
    last_name?: string;
    /**
     * User maiden name
     */
    maiden_name?: string;
    /**
     * User phone number with some hidden digits
     */
    phone?: string;
    /**
     * User relationship status
     */
    relation?: number;
    /**
     * Information whether relation status is pending
     */
    relation_pending?: number;
    /**
     * Domain name of the user's page
     */
    screen_name?: string;
    /**
     * User status
     */
    status?: string;
    [key: string]: any;
    relation_requests?: UsersUserMin[];
}

export type AddressesFields = "id" | "title" | "address" | "additional_address" | "country_id" | "city_id" | "metro_station_id" | "latitude" | "longitude" | "distance" | "work_info_status" | "timetable" | "phone" | "time_offset";

export type AdsAccessRole = "admin" | "manager" | "reports";

export interface AdsAccesses {
    /**
     * Client ID
     */
    client_id?: string;
    [key: string]: any;
}

export interface AdsAccount {
    /**
     * Account ID
     */
    account_id: number;
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
    all_limit: number;
    /**
     * Campaign ID
     */
    campaign_id: number;
    /**
     * Category ID
     */
    category1_id?: number;
    /**
     * Additional category ID
     */
    category2_id?: number;
    /**
     * Cost of a click, kopecks
     */
    cpc?: number;
    /**
     * Cost of 1000 impressions, kopecks
     */
    cpm?: number;
    /**
     * Ad ID
     */
    id: number;
    /**
     * Impressions limit
     */
    impressions_limit?: number;
    /**
     * Ad title
     */
    name: string;
    [key: string]: any;
}

export type AdsAdApproved = 0 | 1 | 2 | 3;

export type AdsAdCostType = 0 | 1;

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
    image_src_2x?: string;
    /**
     * Domain of advertised object
     */
    link_domain?: string;
    /**
     * URL of advertised object
     */
    link_url: string;
    /**
     * Ad title
     */
    title: string;
    [key: string]: any;
}

export type AdsAdLayoutCostType = 0 | 1;

export type AdsAdStatus = 0 | 1 | 2;

export interface AdsCampaign {
    /**
     * Campaign's total limit, rubles
     */
    all_limit: string;
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
    [key: string]: any;
}

export type AdsCampaignStatus = 0 | 1 | 2;

export type AdsCampaignType = "normal" | "vk_apps_managed" | "mobile_apps" | "promoted_posts";

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
    subcategories?: BaseObjectWithName[];
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

export interface AdsCriteria {
    /**
     * Age from
     */
    age_from?: number;
    /**
     * Age to
     */
    age_to?: number;
    /**
     * Apps IDs
     */
    apps?: string;
    /**
     * Apps IDs to except
     */
    apps_not?: string;
    /**
     * Days to birthday
     */
    birthday?: number;
    /**
     * Cities IDs
     */
    cities?: string;
    /**
     * Cities IDs to except
     */
    cities_not?: string;
    /**
     * Country ID
     */
    country?: number;
    /**
     * Districts IDs
     */
    districts?: string;
    /**
     * Communities IDs
     */
    groups?: string;
    /**
     * Interests categories IDs
     */
    interest_categories?: string;
    /**
     * Interests
     */
    interests?: string;
    /**
     * Positions IDs
     */
    positions?: string;
    /**
     * Religions IDs
     */
    religions?: string;
    /**
     * Retargeting groups IDs
     */
    retargeting_groups?: string;
    /**
     * Retargeting groups IDs to except
     */
    retargeting_groups_not?: string;
    /**
     * School graduation year from
     */
    school_from?: number;
    /**
     * School graduation year to
     */
    school_to?: number;
    /**
     * Schools IDs
     */
    schools?: string;
    /**
     * Stations IDs
     */
    stations?: string;
    /**
     * Relationship statuses
     */
    statuses?: string;
    /**
     * Streets IDs
     */
    streets?: string;
    /**
     * University graduation year from
     */
    uni_from?: number;
    /**
     * University graduation year to
     */
    uni_to?: number;
    /**
     * Browsers
     */
    user_browsers?: string;
    /**
     * Devices
     */
    user_devices?: string;
    /**
     * Operating systems
     */
    user_os?: string;
    [key: string]: any;
}

export type AdsCriteriaSex = 0 | 1 | 2;

export interface AdsDemoStats {
    /**
     * Object ID
     */
    id?: number;
    [key: string]: any;
}

export interface AdsDemostatsFormat {
    /**
     * Day as YYYY-MM-DD
     */
    day?: string;
    /**
     * Month as YYYY-MM
     */
    month?: string;
    /**
     * 1 if period=overall
     */
    overall?: number;
    [key: string]: any;
    age?: AdsStatsAge[];
    cities?: AdsStatsCities[];
    sex?: AdsStatsSex[];
    sex_age?: AdsStatsSexAge[];
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

export type AdsObjectType = "ad" | "campaign" | "client" | "office";

export interface AdsParagraphs {
    /**
     * Rules paragraph
     */
    paragraph?: string;
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
    video_views_100p?: number;
    /**
     * Video views for 25 percent
     */
    video_views_25p?: number;
    /**
     * Video views for 3 seconds
     */
    video_views_3s?: number;
    /**
     * Video views for 50 percent
     */
    video_views_50p?: number;
    /**
     * Video views for 75 percent
     */
    video_views_75p?: number;
    /**
     * Video starts
     */
    video_views_start?: number;
    [key: string]: any;
}

export interface AdsRejectReason {
    /**
     * Comment text
     */
    comment?: string;
    [key: string]: any;
    rules?: AdsRules[];
}

export interface AdsRules {
    /**
     * Comment
     */
    title?: string;
    [key: string]: any;
    paragraphs?: AdsParagraphs[];
}

export interface AdsStats {
    /**
     * Object ID
     */
    id?: number;
    [key: string]: any;
}

export interface AdsStatsAge {
    /**
     * Clicks rate
     */
    clicks_rate?: number;
    /**
     * Impressions rate
     */
    impressions_rate?: number;
    /**
     * Age interval
     */
    value?: string;
    [key: string]: any;
}

export interface AdsStatsCities {
    /**
     * Clicks rate
     */
    clicks_rate?: number;
    /**
     * Impressions rate
     */
    impressions_rate?: number;
    /**
     * City name
     */
    name?: string;
    /**
     * City ID
     */
    value?: number;
    [key: string]: any;
}

export interface AdsStatsFormat {
    /**
     * Clicks number
     */
    clicks?: number;
    /**
     * Day as YYYY-MM-DD
     */
    day?: string;
    /**
     * Impressions number
     */
    impressions?: number;
    /**
     * Events number
     */
    join_rate?: number;
    /**
     * Month as YYYY-MM
     */
    month?: string;
    /**
     * 1 if period=overall
     */
    overall?: number;
    /**
     * Reach
     */
    reach?: number;
    /**
     * Spent funds
     */
    spent?: number;
    /**
     * Clickthoughs to the advertised site
     */
    video_clicks_site?: number;
    /**
     * Video views number
     */
    video_views?: number;
    /**
     * Video views (full video)
     */
    video_views_full?: number;
    /**
     * Video views (half of video)
     */
    video_views_half?: number;
    [key: string]: any;
}

export interface AdsStatsSex {
    /**
     * Clicks rate
     */
    clicks_rate?: number;
    /**
     * Impressions rate
     */
    impressions_rate?: number;
    [key: string]: any;
}

export interface AdsStatsSexAge {
    /**
     * Clicks rate
     */
    clicks_rate?: number;
    /**
     * Impressions rate
     */
    impressions_rate?: number;
    /**
     * Sex and age interval
     */
    value?: string;
    [key: string]: any;
}

export type AdsStatsSexValue = "f" | "m";

export interface AdsTargSettings1 {
    /**
     * Ad ID
     */
    id?: number;
    /**
     * Campaign ID
     */
    campaign_id?: number;
}

export type AdsTargSettings = AdsTargSettings1 & AdsCriteria;

export interface AdsTargStats {
    /**
     * Audience
     */
    audience_count: number;
    /**
     * Recommended CPC value
     */
    recommended_cpc?: number;
    /**
     * Recommended CPM value
     */
    recommended_cpm?: number;
    [key: string]: any;
}

export interface AdsTargSuggestions {
    /**
     * Object ID
     */
    id?: number;
    /**
     * Object name
     */
    name?: string;
    [key: string]: any;
}

export interface AdsTargSuggestionsCities {
    /**
     * Object ID
     */
    id?: number;
    /**
     * Object name
     */
    name?: string;
    /**
     * Parent object
     */
    parent?: string;
    [key: string]: any;
}

export interface AdsTargSuggestionsRegions {
    /**
     * Object ID
     */
    id?: number;
    /**
     * Object name
     */
    name?: string;
    /**
     * Object type
     */
    type?: string;
    [key: string]: any;
}

export interface AdsTargSuggestionsSchools {
    /**
     * Full school title
     */
    desc?: string;
    /**
     * School ID
     */
    id?: number;
    /**
     * School title
     */
    name?: string;
    /**
     * City name
     */
    parent?: string;
    [key: string]: any;
}

export type AdsTargSuggestionsSchoolsType = "school" | "university" | "faculty" | "chair";

export interface AdsTargetGroup {
    /**
     * Audience
     */
    audience_count?: number;
    /**
     * Site domain
     */
    domain?: string;
    /**
     * Group ID
     */
    id?: number;
    /**
     * Number of days for user to be in group
     */
    lifetime?: number;
    /**
     * Group name
     */
    name?: string;
    /**
     * Pixel code
     */
    pixel?: string;
    [key: string]: any;
}

export interface AdsUsers {
    /**
     * User ID
     */
    user_id: number;
    [key: string]: any;
    accesses: AdsAccesses[];
}

export interface AppsApp {
    /**
     * Official community's ID
     */
    author_group?: number;
    /**
     * Application author's ID
     */
    author_id?: number;
    /**
     * Application author's URL
     */
    author_url?: string;
    /**
     * URL of the app banner with 1120 px in width
     */
    banner_1120?: string;
    /**
     * URL of the app banner with 560 px in width
     */
    banner_560?: string;
    /**
     * Catalog position
     */
    catalog_position?: number;
    /**
     * Application description
     */
    description?: string;
    /**
     * Genre name
     */
    genre?: string;
    /**
     * Genre ID
     */
    genre_id?: number;
    /**
     * URL of the app icon with 139 px in width
     */
    icon_139?: string;
    /**
     * URL of the app icon with 150 px in width
     */
    icon_150?: string;
    /**
     * URL of the app icon with 279 px in width
     */
    icon_278?: string;
    /**
     * URL of the app icon with 75 px in width
     */
    icon_75?: string;
    /**
     * Application ID
     */
    id: number;
    /**
     * Information whether the application is multilanguage
     */
    international?: number;
    /**
     * Information whether application is in mobile catalog
     */
    is_in_catalog?: number;
    /**
     * Members number
     */
    members_count?: number;
    /**
     * Application ID in store
     */
    platform_id?: number;
    /**
     * Date when the application has been published in Unixtime
     */
    published_date?: number;
    /**
     * Screen name
     */
    screen_name?: string;
    /**
     * Application section name
     */
    section?: string;
    /**
     * Application title
     */
    title: string;
    [key: string]: any;
    friends?: number[];
    screenshots?: PhotosPhoto[];
}

export type AppsAppLeaderboardType = 0 | 1 | 2;

export type AppsAppType = "app" | "game" | "site" | "standalone" | "vk_app" | "community_app" | "html5_game";

export interface AppsLeaderboard {
    /**
     * Level
     */
    level?: number;
    /**
     * Points number
     */
    points?: number;
    /**
     * Score number
     */
    score?: number;
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
    name: string;
    /**
     * Scope title
     */
    title?: string;
    [key: string]: any;
}

export interface AudioAudio {
    /**
     * Access key for the audio
     */
    access_key?: string;
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
    url?: string;
    [key: string]: any;
    is_explicit: boolean;
    is_focus_track: boolean;
    is_licensed: boolean;
}

export interface AudioAudioFull1 {
    /**
     * Duration in seconds
     */
    duration?: number;
    /**
     * Date when uploaded
     */
    date?: number;
    /**
     * Album ID
     */
    album_id?: number;
    /**
     * Lyrics ID
     */
    lyrics_id?: number;
    /**
     * Genre ID
     */
    genre_id?: number;
    no_search?: BaseBoolInt;
    is_hq?: boolean;
}

export type AudioAudioFull = AudioAudio & AudioAudioFull1;

export type BaseBoolInt = 0 | 1;

export interface BaseCommentsInfo {
    /**
     * Comments number
     */
    count?: number;
    /**
     * Information whether groups can comment the post
     */
    groups_can_post?: boolean;
    [key: string]: any;
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

export interface BaseError {
    /**
     * Error code
     */
    error_code?: number;
    /**
     * Error message
     */
    error_msg?: string;
    [key: string]: any;
    request_params?: BaseRequestParam[];
}

export interface BaseGeo {
    /**
     * Information whether a map is showed
     */
    showmap?: number;
    /**
     * Place type
     */
    type?: string;
    [key: string]: any;
    coordinates?: string;
}

export interface BaseImage {
    /**
     * Image height
     */
    height: number;
    /**
     * Image url
     */
    url: string;
    /**
     * Image width
     */
    width: number;
    [key: string]: any;
}

export interface BaseLikes {
    /**
     * Likes number
     */
    count?: number;
    [key: string]: any;
}

export interface BaseLikesInfo {
    /**
     * Likes number
     */
    count: number;
    /**
     * Information whether current uer has liked the post
     */
    user_likes: number;
    [key: string]: any;
}

export interface BaseLink {
    /**
     * Link caption
     */
    caption?: string;
    /**
     * Link description
     */
    description?: string;
    /**
     * Link ID
     */
    id?: number;
    /**
     * String ID of the page with article preview
     */
    preview_page?: string;
    /**
     * URL of the page with article preview
     */
    preview_url?: string;
    /**
     * Link title
     */
    title?: string;
    /**
     * Link URL
     */
    url: string;
    [key: string]: any;
    is_favorite?: boolean;
}

export interface BaseLinkApplication {
    /**
     * Application Id
     */
    app_id?: number;
    [key: string]: any;
}

export interface BaseLinkApplicationStore {
    /**
     * Store Id
     */
    id?: number;
    /**
     * Store name
     */
    name?: string;
    [key: string]: any;
}

export interface BaseLinkButton {
    /**
     * Button title
     */
    title?: string;
    [key: string]: any;
}

export interface BaseLinkButtonAction {
    /**
     * Action URL
     */
    url?: string;
    [key: string]: any;
}

export type BaseLinkButtonActionType = "open_url";

export interface BaseLinkProduct {
    [key: string]: any;
}

export interface BaseLinkRating {
    /**
     * Count of reviews
     */
    reviews_count?: number;
    /**
     * Count of stars
     */
    stars?: number;
    [key: string]: any;
}

export interface BaseMessageError {
    /**
     * Error code
     */
    code?: number;
    /**
     * Error message
     */
    description?: string;
    [key: string]: any;
}

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
    count?: number;
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

export type BaseOkResponse = 1;

export interface BasePlace {
    /**
     * Place address
     */
    address?: string;
    /**
     * Checkins number
     */
    checkins?: number;
    /**
     * City name
     */
    city?: string;
    /**
     * Country name
     */
    country?: string;
    /**
     * Date of the place creation in Unixtime
     */
    created?: number;
    /**
     * URL of the place's icon
     */
    icon?: string;
    /**
     * Place ID
     */
    id?: number;
    /**
     * Place latitude
     */
    latitude?: number;
    /**
     * Place longitude
     */
    longitude?: number;
    /**
     * Place title
     */
    title?: string;
    /**
     * Place type
     */
    type?: string;
    [key: string]: any;
}

export type BasePropertyExists = 1;

export interface BaseRepostsInfo {
    /**
     * Reposts number
     */
    count?: number;
    /**
     * Information whether current user has reposted the post
     */
    user_reposted?: number;
    [key: string]: any;
}

export interface BaseRequestParam {
    /**
     * Parameter name
     */
    key?: string;
    /**
     * Parameter value
     */
    value?: string;
    [key: string]: any;
}

export type BaseSex = 0 | 1 | 2;

export interface BaseSticker {
    /**
     * Collection ID
     */
    product_id?: number;
    /**
     * Sticker ID
     */
    sticker_id?: number;
    [key: string]: any;
    images?: BaseImage[];
    images_with_background?: BaseImage[];
}

export interface BaseUploadServer {
    /**
     * Upload URL
     */
    upload_url: string;
    [key: string]: any;
}

export type BaseUserGroupFields = "about" | "action_button" | "activities" | "activity" | "addresses" | "admin_level" | "age_limits" | "author_id" | "ban_info" | "bdate" | "blacklisted" | "blacklisted_by_me" | "books" | "can_create_topic" | "can_message" | "can_post" | "can_see_all_posts" | "can_see_audio" | "can_send_friend_request" | "can_upload_video" | "can_write_private_message" | "career" | "city" | "common_count" | "connections" | "contacts" | "counters" | "country" | "cover" | "crop_photo" | "deactivated" | "description" | "domain" | "education" | "exports" | "finish_date" | "fixed_post" | "followers_count" | "friend_status" | "games" | "has_market_app" | "has_mobile" | "has_photo" | "home_town" | "id" | "interests" | "is_admin" | "is_closed" | "is_favorite" | "is_friend" | "is_hidden_from_feed" | "is_member" | "is_messages_blocked" | "can_send_notify" | "is_subscribed" | "last_seen" | "links" | "lists" | "maiden_name" | "main_album_id" | "main_section" | "market" | "member_status" | "members_count" | "military" | "movies" | "music" | "name" | "nickname" | "occupation" | "online" | "online_status" | "personal" | "phone" | "photo_100" | "photo_200" | "photo_200_orig" | "photo_400_orig" | "photo_50" | "photo_id" | "photo_max" | "photo_max_orig" | "quotes" | "relation" | "relatives" | "schools" | "screen_name" | "sex" | "site" | "start_date" | "status" | "timezone" | "trending" | "tv" | "type" | "universities" | "verified" | "wall_comments" | "wiki_page" | "vk_admin_status";

export interface BaseUserId {
    /**
     * User ID
     */
    user_id?: number;
    [key: string]: any;
}

export type BoardDefaultOrder = 1 | 2 | -1 | -2;

export interface BoardTopic {
    /**
     * Comments number
     */
    comments?: number;
    /**
     * Date when the topic has been created in Unixtime
     */
    created?: number;
    /**
     * Creator ID
     */
    created_by?: number;
    /**
     * Topic ID
     */
    id?: number;
    /**
     * Topic title
     */
    title?: string;
    /**
     * Date when the topic has been updated in Unixtime
     */
    updated?: number;
    /**
     * ID of user who updated the topic
     */
    updated_by?: number;
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
    real_offset?: number;
    /**
     * Comment text
     */
    text: string;
    [key: string]: any;
    attachments?: WallCommentAttachment[];
}

export interface BoardTopicPoll {
    /**
     * Current user's answer ID
     */
    answer_id: number;
    /**
     * Date when poll has been created in Unixtime
     */
    created: number;
    /**
     * Poll owner's ID
     */
    owner_id: number;
    /**
     * Poll ID
     */
    poll_id: number;
    /**
     * Poll question
     */
    question: string;
    /**
     * Votes number
     */
    votes: string;
    [key: string]: any;
    answers: PollsAnswer[];
}

export interface CallbackBoardPostDelete {
    [key: string]: any;
    topic_owner_id: number;
    topic_id: number;
    id: number;
}

export interface CallbackConfirmationMessage {
    [key: string]: any;
    group_id: number;
    secret: string;
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
    user_id?: number;
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
    title?: string;
    description?: string;
    screen_name?: string;
    public_category?: number;
    public_subcategory?: number;
    website?: string;
}

export interface CallbackMarketComment {
    [key: string]: any;
    id: number;
    from_id: number;
    date: number;
    text?: string;
    market_owner_od?: number;
    photo_id?: number;
}

export interface CallbackMarketCommentDelete {
    [key: string]: any;
    owner_id: number;
    id: number;
    user_id: number;
    item_id: number;
}

export interface CallbackMessageAllow {
    [key: string]: any;
    user_id: number;
    key: string;
}

export interface CallbackMessageBase {
    [key: string]: any;
    group_id: number;
}

export interface CallbackMessageDeny {
    [key: string]: any;
    user_id: number;
}

export type CallbackMessageType = "confirmation" | "group_change_photo" | "group_change_settings" | "group_officers_edit" | "lead_forms_new" | "market_comment_delete" | "market_comment_edit" | "market_comment_restore" | "message_allow" | "message_deny" | "message_read" | "message_reply" | "message_typing_state" | "messages_edit" | "photo_comment_delete" | "photo_comment_edit" | "photo_comment_restore" | "poll_vote_new" | "user_block" | "user_unblock" | "video_comment_delete" | "video_comment_edit" | "video_comment_restore" | "wall_reply_delete" | "wall_reply_restore" | "wall_repost";

export interface CallbackPhotoComment {
    [key: string]: any;
    id: number;
    from_id: number;
    date: number;
    text: string;
    photo_owner_od: number;
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

export interface CallbackUserBlock {
    [key: string]: any;
    admin_id: number;
    user_id: number;
    unblock_date: number;
    reason: number;
    comment?: string;
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
    video_owner_od: number;
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

export interface DatabaseCity1 {
    /**
     * Area title
     */
    area?: string;
    /**
     * Region title
     */
    region?: string;
    important?: BaseBoolInt;
}

export type DatabaseCity = BaseObject & DatabaseCity1;

export interface DatabaseFaculty {
    /**
     * Faculty ID
     */
    id?: number;
    /**
     * Faculty title
     */
    title?: string;
    [key: string]: any;
}

export interface DatabaseRegion {
    /**
     * Region ID
     */
    id?: number;
    /**
     * Region title
     */
    title?: string;
    [key: string]: any;
}

export interface DatabaseSchool {
    /**
     * School ID
     */
    id?: number;
    /**
     * School title
     */
    title?: string;
    [key: string]: any;
}

export interface DatabaseStation {
    /**
     * City ID
     */
    city_id?: number;
    /**
     * Hex color code without #
     */
    color?: string;
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
    id?: number;
    /**
     * University title
     */
    title?: string;
    [key: string]: any;
}

export interface DocsDoc {
    /**
     * Access key for the document
     */
    access_key?: string;
    /**
     * Date when file has been uploaded in Unixtime
     */
    date: number;
    /**
     * File extension
     */
    ext: string;
    /**
     * Document ID
     */
    id: number;
    /**
     * Document owner ID
     */
    owner_id: number;
    /**
     * File size in bites
     */
    size: number;
    /**
     * Document title
     */
    title: string;
    /**
     * Document type
     */
    type: number;
    /**
     * File URL
     */
    url?: string;
    [key: string]: any;
}

export type DocsDocAttachmentType = "doc" | "graffiti" | "audio_message";

export interface DocsDocPreview {
    [key: string]: any;
}

export interface DocsDocPreviewPhoto {
    [key: string]: any;
    sizes?: PhotosPhotoSizes[];
}

export interface DocsDocPreviewVideo {
    /**
     * Video file size in bites
     */
    filesize: number;
    /**
     * Video's height in pixels
     */
    height: number;
    /**
     * Video URL
     */
    src: string;
    /**
     * Video's width in pixels
     */
    width: number;
    [key: string]: any;
}

export interface DocsDocTypes {
    /**
     * Number of docs
     */
    count?: number;
    /**
     * Doc type ID
     */
    id?: number;
    /**
     * Doc type title
     */
    title?: string;
    [key: string]: any;
}

export interface DocsDocUploadResponse {
    /**
     * Uploaded file data
     */
    file?: string;
    [key: string]: any;
}

export interface EventsEventAttach {
    /**
     * address of event
     */
    address?: string;
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
    is_favorite: boolean;
    /**
     * text of attach
     */
    text: string;
    /**
     * event start time
     */
    time?: number;
    [key: string]: any;
    friends: number[];
}

export interface FaveFavesLink {
    /**
     * Link description
     */
    description?: string;
    /**
     * Link ID
     */
    id?: string;
    /**
     * URL of the preview image with 100 px in width
     */
    photo_100?: string;
    /**
     * URL of the preview image with 200 px in width
     */
    photo_200?: string;
    /**
     * URL of the preview image with 50 px in width
     */
    photo_50?: string;
    /**
     * Link title
     */
    title?: string;
    /**
     * Link URL
     */
    url?: string;
    [key: string]: any;
}

export interface FriendsFriendStatus {
    /**
     * Message sent with request
     */
    request_message?: string;
    /**
     * MD5 hash for the result validation
     */
    sign?: string;
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
    common_count?: number;
    /**
     * User ID
     */
    common_friends?: number[];
    /**
     * User ID
     */
    id?: number;
    [key: string]: any;
}

export interface FriendsRequests {
    /**
     * ID of the user by whom friend has been suggested
     */
    from?: string;
    /**
     * User ID
     */
    user_id?: number;
    [key: string]: any;
}

export interface FriendsRequestsMutual {
    /**
     * Total mutual friends number
     */
    count?: number;
    /**
     * User ID
     */
    users?: number[];
    [key: string]: any;
}

export interface FriendsRequestsXtrMessage {
    /**
     * ID of the user by whom friend has been suggested
     */
    from?: string;
    /**
     * Message sent with a request
     */
    message?: string;
    /**
     * User ID
     */
    user_id?: number;
    [key: string]: any;
}

export interface FriendsUserXtrLists1 {
    /**
     * IDs of friend lists with user
     */
    lists?: number[];
}

export type FriendsUserXtrLists = UsersUserFull & FriendsUserXtrLists1;

export interface FriendsUserXtrPhone1 {
    /**
     * User phone
     */
    phone?: string;
}

export type FriendsUserXtrPhone = UsersUserFull & FriendsUserXtrPhone1;

export interface GiftsGift {
    /**
     * Date when gist has been sent in Unixtime
     */
    date?: number;
    /**
     * Gift sender ID
     */
    from_id?: number;
    /**
     * Hash
     */
    gift_hash?: string;
    /**
     * Gift ID
     */
    id?: number;
    /**
     * Comment text
     */
    message?: string;
    [key: string]: any;
}

export type GiftsGiftPrivacy = 0 | 1 | 2;

export interface GiftsLayout {
    /**
     * Gift ID
     */
    id?: number;
    /**
     * URL of the preview image with 256 px in width
     */
    thumb_256?: string;
    /**
     * URL of the preview image with 48 px in width
     */
    thumb_48?: string;
    /**
     * URL of the preview image with 96 px in width
     */
    thumb_96?: string;
    [key: string]: any;
}

export interface GroupsAddress {
    /**
     * Additional address to the place (6 floor, left door)
     */
    additional_address?: string;
    /**
     * String address to the place (Nevsky, 28)
     */
    address?: string;
    /**
     * City id of address
     */
    city_id?: number;
    /**
     * Country id of address
     */
    country_id?: number;
    /**
     * Distance from the point
     */
    distance?: number;
    /**
     * Address id
     */
    id: number;
    /**
     * Address latitude
     */
    latitude?: number;
    /**
     * Address longitude
     */
    longitude?: number;
    /**
     * Metro id of address
     */
    metro_station_id?: number;
    /**
     * Address phone
     */
    phone?: string;
    /**
     * Time offset int minutes from utc time
     */
    time_offset?: number;
    /**
     * Title of the place (Zinger, etc)
     */
    title?: string;
    [key: string]: any;
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
    break_close_time?: number;
    /**
     * Start time of the break in minutes
     */
    break_open_time?: number;
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
    is_enabled: boolean;
    /**
     * Main address id for group
     */
    main_address_id?: number;
    [key: string]: any;
}

export interface GroupsBanInfo {
    /**
     * Administrator ID
     */
    admin_id?: number;
    /**
     * Comment for a ban
     */
    comment?: string;
    /**
     * Show comment for user
     */
    comment_visible?: boolean;
    /**
     * Date when user has been added to blacklist in Unixtime
     */
    date?: number;
    /**
     * Date when user will be removed from blacklist in Unixtime
     */
    end_date?: number;
    [key: string]: any;
    is_closed?: boolean;
}

export type GroupsBanInfoReason = 0 | 1 | 2 | 3 | 4;

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
    api_version?: string;
    [key: string]: any;
}

export interface GroupsContactsItem {
    /**
     * Contact description
     */
    desc?: string;
    /**
     * Contact email
     */
    email?: string;
    /**
     * Contact phone
     */
    phone?: string;
    /**
     * User ID
     */
    user_id?: number;
    [key: string]: any;
}

export interface GroupsCountersGroup {
    /**
     * Addresses number
     */
    addresses?: number;
    /**
     * Photo albums number
     */
    albums?: number;
    /**
     * Audios number
     */
    audios?: number;
    /**
     * Docs number
     */
    docs?: number;
    /**
     * Market items number
     */
    market?: number;
    /**
     * Photos number
     */
    photos?: number;
    /**
     * Topics number
     */
    topics?: number;
    /**
     * Videos number
     */
    videos?: number;
    [key: string]: any;
}

export interface GroupsCover {
    [key: string]: any;
    images?: BaseImage[];
}

export type GroupsFields = "market" | "member_status" | "is_favorite" | "is_subscribed" | "city" | "country" | "verified" | "description" | "wiki_page" | "members_count" | "counters" | "cover" | "can_post" | "can_see_all_posts" | "activity" | "fixed_post" | "can_create_topic" | "can_upload_video" | "has_photo" | "status" | "main_album_id" | "links" | "contacts" | "site" | "main_section" | "trending" | "can_message" | "is_messages_blocked" | "can_send_notify" | "online_status" | "start_date" | "finish_date" | "age_limits" | "ban_info" | "action_button" | "author_id" | "phone" | "has_market_app" | "addresses" | "live_covers" | "is_adult" | "can_subscribe_posts" | "menu";

export type GroupsFilter = "admin" | "editor" | "moder" | "groups" | "publics" | "events" | "has_addresses";

export interface GroupsGroup {
    /**
     * Information whether community is banned
     */
    deactivated?: string;
    /**
     * Finish date in Unixtime format
     */
    finish_date?: number;
    /**
     * Community ID
     */
    id?: number;
    /**
     * Community name
     */
    name?: string;
    /**
     * URL of square photo of the community with 100 pixels in width
     */
    photo_100?: string;
    /**
     * URL of square photo of the community with 200 pixels in width
     */
    photo_200?: string;
    /**
     * URL of square photo of the community with 50 pixels in width
     */
    photo_50?: string;
    /**
     * Domain of the community page
     */
    screen_name?: string;
    /**
     * Start date in Unixtime format
     */
    start_date?: number;
    [key: string]: any;
}

export type GroupsGroupAccess = 0 | 1 | 2;

export type GroupsGroupAdminLevel = 1 | 2 | 3;

export type GroupsGroupAgeLimits = 1 | 2 | 3;

export type GroupsGroupAudio = 0 | 1 | 2;

export interface GroupsGroupBanInfo {
    /**
     * Ban comment
     */
    comment?: string;
    /**
     * End date of ban in Unixtime
     */
    end_date?: number;
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
    subcategories?: BaseObjectWithName[];
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
    subcategories?: GroupsGroupCategory[];
}

export interface GroupsGroupCategoryType {
    [key: string]: any;
    id?: number;
    name?: string;
}

export type GroupsGroupDocs = 0 | 1 | 2;

export interface GroupsGroupFull1 {
    /**
     * Community description
     */
    description?: string;
    /**
     * Community's main wiki page title
     */
    wiki_page?: string;
    /**
     * Community members number
     */
    members_count?: number;
    /**
     * Type of group, start date of event or category of public page
     */
    activity?: string;
    /**
     * Fixed post ID
     */
    fixed_post?: number;
    /**
     * Community status
     */
    status?: string;
    /**
     * Community's main photo album ID
     */
    main_album_id?: number;
    /**
     * Community's website
     */
    site?: string;
    /**
     * Information whether current user is subscribed to podcasts
     */
    is_subscribed_podcasts?: boolean;
    /**
     * Owner in whitelist or not
     */
    can_subscribe_podcasts?: boolean;
    /**
     * Can subscribe to wall
     */
    can_subscribe_posts?: boolean;
    market?: GroupsMarketInfo;
    member_status?: GroupsGroupFullMemberStatus;
    is_favorite?: BaseBoolInt;
    is_subscribed?: BaseBoolInt;
    city?: BaseObject;
    country?: BaseCountry;
    verified?: BaseBoolInt;
    counters?: GroupsCountersGroup;
    cover?: GroupsCover;
    can_post?: BaseBoolInt;
    can_see_all_posts?: BaseBoolInt;
    can_create_topic?: BaseBoolInt;
    can_upload_video?: BaseBoolInt;
    has_photo?: BaseBoolInt;
    links?: GroupsLinksItem[];
    contacts?: GroupsContactsItem[];
    main_section?: GroupsGroupFullMainSection;
    trending?: BaseBoolInt;
    can_message?: BaseBoolInt;
    is_messages_blocked?: BaseBoolInt;
    can_send_notify?: BaseBoolInt;
    online_status?: GroupsOnlineStatus;
    age_limits?: GroupsGroupFullAgeLimits;
    ban_info?: GroupsGroupBanInfo;
    addresses?: GroupsAddressesInfo;
}

export type GroupsGroupFull = GroupsGroup & GroupsGroupFull1;

export type GroupsGroupFullAgeLimits = 1 | 2 | 3;

export type GroupsGroupFullMainSection = 0 | 1 | 2 | 3 | 4 | 5;

export type GroupsGroupFullMemberStatus = 0 | 1 | 2 | 3 | 4 | 5;

export type GroupsGroupIsClosed = 0 | 1 | 2;

export interface GroupsGroupLink {
    /**
     * Link label
     */
    name?: string;
    /**
     * Link description
     */
    desc?: string;
    /**
     * Link ID
     */
    id?: number;
    /**
     * Link URL
     */
    url?: string;
    [key: string]: any;
}

export type GroupsGroupMarketCurrency = 643 | 980 | 398 | 978 | 840;

export type GroupsGroupPhotos = 0 | 1 | 2;

export interface GroupsGroupPublicCategoryList {
    [key: string]: any;
    id?: number;
    name?: string;
    subtypes_list?: GroupsGroupCategoryType[];
}

export type GroupsGroupRole = "moderator" | "editor" | "administrator";

export interface GroupsGroupSettings {
    /**
     * Community access settings
     */
    access?: number;
    /**
     * Community's page domain
     */
    address?: string;
    /**
     * Audio settings
     */
    audio?: number;
    /**
     * Community description
     */
    description?: string;
    /**
     * Docs settings
     */
    docs?: number;
    /**
     * The list of stop words
     */
    obscene_words?: string;
    /**
     * Photos settings
     */
    photos?: number;
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
     * Community subject ID
     */
    subject?: number;
    /**
     * Community title
     */
    title?: string;
    /**
     * Topics settings
     */
    topics?: number;
    /**
     * Video settings
     */
    video?: number;
    /**
     * Wall settings
     */
    wall?: number;
    /**
     * Community website
     */
    website?: string;
    /**
     * Wiki settings
     */
    wiki?: number;
    [key: string]: any;
    public_category_list?: GroupsGroupPublicCategoryList[];
    subject_list?: GroupsSubjectItem[];
}

export type GroupsGroupSubject = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38" | "39" | "40" | "41" | "42";

export type GroupsGroupTopics = 0 | 1 | 2;

export type GroupsGroupType = "group" | "page" | "event";

export type GroupsGroupVideo = 0 | 1 | 2;

export type GroupsGroupWall = 0 | 1 | 2 | 3;

export type GroupsGroupWiki = 0 | 1 | 2;

export interface GroupsGroupXtrInvitedBy {
    /**
     * Community ID
     */
    id?: string;
    /**
     * Inviter ID
     */
    invited_by?: number;
    /**
     * Community name
     */
    name?: string;
    /**
     * URL of square photo of the community with 100 pixels in width
     */
    photo_100?: string;
    /**
     * URL of square photo of the community with 200 pixels in width
     */
    photo_200?: string;
    /**
     * URL of square photo of the community with 50 pixels in width
     */
    photo_50?: string;
    /**
     * Domain of the community page
     */
    screen_name?: string;
    [key: string]: any;
}

export type GroupsGroupXtrInvitedByAdminLevel = 1 | 2 | 3;

export type GroupsGroupXtrInvitedByType = "group" | "page" | "event";

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
     * Link description
     */
    desc?: string;
    /**
     * Link ID
     */
    id?: number;
    /**
     * Link title
     */
    name?: string;
    /**
     * URL of square image of the link with 100 pixels in width
     */
    photo_100?: string;
    /**
     * URL of square image of the link with 50 pixels in width
     */
    photo_50?: string;
    /**
     * Link URL
     */
    url?: string;
    [key: string]: any;
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
    api_version?: string;
    /**
     * Shows whether Long Poll is enabled
     */
    is_enabled: boolean;
    [key: string]: any;
}

export interface GroupsMarketInfo {
    /**
     * Contact person ID
     */
    contact_id?: number;
    /**
     * Currency name
     */
    currency_text?: string;
    /**
     * Main market album ID
     */
    main_album_id?: number;
    /**
     * Maximum price
     */
    price_max?: number;
    /**
     * Minimum price
     */
    price_min?: number;
    [key: string]: any;
}

export interface GroupsMemberRole {
    /**
     * User ID
     */
    id?: number;
    [key: string]: any;
}

export type GroupsMemberRoleStatus = "moderator" | "editor" | "administrator" | "creator";

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
    minutes?: number;
    [key: string]: any;
}

export type GroupsOnlineStatusType = "none" | "online" | "answer_mark";

export interface GroupsOwnerXtrBanInfo {
    [key: string]: any;
}

export type GroupsOwnerXtrBanInfoType = "group" | "profile";

export type GroupsRoleOptions = "moderator" | "editor" | "administrator" | "creator";

export interface GroupsSubjectItem {
    /**
     * Subject ID
     */
    id?: number;
    /**
     * Subject title
     */
    name?: string;
    [key: string]: any;
}

export interface GroupsTokenPermissionSetting {
    [key: string]: any;
    name: string;
    setting: number;
}

export interface GroupsUserXtrRole1 {
    role?: GroupsRoleOptions;
}

export type GroupsUserXtrRole = UsersUserFull & GroupsUserXtrRole1;

export interface LeadsChecked {
    /**
     * Reason why user can't start the lead
     */
    reason?: string;
    /**
     * Session ID
     */
    sid?: string;
    /**
     * URL user should open to start the lead
     */
    start_link?: string;
    [key: string]: any;
}

export type LeadsCheckedResult = "true" | "false";

export interface LeadsComplete {
    /**
     * Offer cost
     */
    cost?: number;
    /**
     * Offer limit
     */
    limit?: number;
    /**
     * Amount of spent votes
     */
    spent?: number;
    [key: string]: any;
}

export interface LeadsEntry {
    /**
     * Application ID
     */
    aid?: number;
    /**
     * Comment text
     */
    comment?: string;
    /**
     * Date when the action has been started in Unixtime
     */
    date?: number;
    /**
     * Session string ID
     */
    sid?: string;
    /**
     * Start date in Unixtime (for status=2)
     */
    start_date?: number;
    /**
     * Action type
     */
    status?: number;
    /**
     * User ID
     */
    uid?: number;
    [key: string]: any;
}

export interface LeadsLead {
    /**
     * Completed offers number
     */
    completed?: number;
    /**
     * Offer cost
     */
    cost?: number;
    /**
     * Impressions number
     */
    impressions?: number;
    /**
     * Lead limit
     */
    limit?: number;
    /**
     * Amount of spent votes
     */
    spent?: number;
    /**
     * Started offers number
     */
    started?: number;
    [key: string]: any;
}

export interface LeadsLeadDays {
    /**
     * Completed offers number
     */
    completed?: number;
    /**
     * Impressions number
     */
    impressions?: number;
    /**
     * Amount of spent votes
     */
    spent?: number;
    /**
     * Started offers number
     */
    started?: number;
    [key: string]: any;
}

export interface LeadsStart {
    /**
     * Session data
     */
    vk_sid?: string;
    [key: string]: any;
}

export type LikesType = "post" | "comment" | "photo" | "audio" | "video" | "note" | "market" | "photo_comment" | "video_comment" | "topic_comment" | "market_comment" | "sitepage";

export interface MarketCurrency {
    /**
     * Currency ID
     */
    id: number;
    /**
     * Currency sign
     */
    name: string;
    [key: string]: any;
}

export interface MarketMarketAlbum {
    /**
     * Items number
     */
    count: number;
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
     * Date when album has been updated last time in Unixtime
     */
    updated_time: number;
    [key: string]: any;
}

export interface MarketMarketCategory {
    /**
     * Category ID
     */
    id: number;
    /**
     * Category name
     */
    name: string;
    [key: string]: any;
}

export interface MarketMarketItem {
    /**
     * Access key for the market item
     */
    access_key?: string;
    /**
     * Title for button for url
     */
    button_title?: string;
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
    url?: string;
    [key: string]: any;
    is_favorite?: boolean;
}

export type MarketMarketItemAvailability = 0 | 1 | 2;

export interface MarketMarketItemFull1 {
    /**
     * Views number
     */
    views_count?: number;
    albums_ids?: number[];
    photos?: PhotosPhoto[];
    can_comment?: BaseBoolInt;
    can_repost?: BaseBoolInt;
    likes?: BaseLikes;
}

export type MarketMarketItemFull = MarketMarketItem & MarketMarketItemFull1;

export interface MarketPrice {
    /**
     * Amount
     */
    amount?: string;
    /**
     * Text
     */
    text?: string;
    [key: string]: any;
    discount_rate?: number;
    old_amount?: string;
}

export interface MarketSection {
    /**
     * Section ID
     */
    id: number;
    /**
     * Section name
     */
    name: string;
    [key: string]: any;
}

export interface MessageChatPreview {
    [key: string]: any;
    admin_id?: number;
    joined?: boolean;
    local_id?: number;
    members?: number[];
    members_count?: number;
    title?: string;
}

export interface MessagesAudioMessage {
    /**
     * Access key for audio message
     */
    access_key?: string;
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
    photo_100?: string;
    /**
     * URL of the preview image with 200 px in width
     */
    photo_200?: string;
    /**
     * URL of the preview image with 50 px in width
     */
    photo_50?: string;
    /**
     * Chat title
     */
    title?: string;
    /**
     * Chat type
     */
    type: string;
    /**
     * User ID
     */
    users: number[];
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
    photo_100?: string;
    /**
     * URL of the preview image with 200 px in width
     */
    photo_200?: string;
    /**
     * URL of the preview image with 50 px in width
     */
    photo_50?: string;
    /**
     * Chat title
     */
    title?: string;
    /**
     * Chat type
     */
    type: string;
    [key: string]: any;
    users: MessagesUserXtrInvitedBy[];
}

export interface MessagesChatPushSettings {
    /**
     * Time until that notifications are disabled
     */
    disabled_until?: number;
    [key: string]: any;
}

export interface MessagesChatRestrictions {
    /**
     * Only admins can promote users to admins
     */
    admins_promote_users?: boolean;
    /**
     * Only admins can change chat info
     */
    only_admins_edit_info?: boolean;
    /**
     * Only admins can edit pinned message
     */
    only_admins_edit_pin?: boolean;
    /**
     * Only admins can invite users to this chat
     */
    only_admins_invite?: boolean;
    /**
     * Only admins can kick users from this chat
     */
    only_admins_kick?: boolean;
    [key: string]: any;
}

export interface MessagesConversation {
    /**
     * Last message user have read
     */
    in_read: number;
    /**
     * ID of the last message in conversation
     */
    last_message_id: number;
    /**
     * Message id of message with mention
     */
    mentions?: number[];
    /**
     * Last outcoming message have been read by the opponent
     */
    out_read: number;
    /**
     * Unread messages number
     */
    unread_count?: number;
    [key: string]: any;
    important?: boolean;
    message_request?: "pending" | "rejected";
    unanswered?: boolean;
}

export interface MessagesConversationMember {
    /**
     * Is it possible for user to kick this member
     */
    can_kick?: boolean;
    [key: string]: any;
    invited_by?: number;
    is_admin?: boolean;
    is_owner?: boolean;
    join_date?: number;
    member_id: number;
}

export interface MessagesConversationPeer {
    [key: string]: any;
    id: number;
    local_id?: number;
}

export type MessagesConversationPeerType = "chat" | "email" | "user" | "group";

export interface MessagesConversationWithMessage {
    [key: string]: any;
}

export interface MessagesForeignMessage {
    /**
     * Conversation message ID
     */
    conversation_message_id?: number;
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
    id?: number;
    /**
     * Peer ID
     */
    peer_id?: number;
    /**
     * Message text
     */
    text: string;
    /**
     * Date when the message has been updated in Unixtime
     */
    update_time?: number;
    [key: string]: any;
    attachments?: MessagesMessageAttachment[];
    fwd_messages?: MessagesForeignMessage[];
}

export interface MessagesGraffiti {
    /**
     * Access key for graffiti
     */
    access_key?: string;
    /**
     * Graffiti height
     */
    height: number;
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
    [key: string]: any;
}

export interface MessagesHistoryAttachment {
    /**
     * Message ID
     */
    message_id?: number;
    [key: string]: any;
}

export interface MessagesHistoryMessageAttachment {
    [key: string]: any;
}

export type MessagesHistoryMessageAttachmentType = "photo" | "video" | "audio" | "doc" | "link" | "market" | "wall" | "share" | "graffiti" | "audio_message";

export interface MessagesKeyboard {
    /**
     * Community or bot, which set this keyboard
     */
    author_id?: number;
    /**
     * Should this keyboard disappear on first use
     */
    one_time: boolean;
    [key: string]: any;
    buttons: MessagesKeyboardButton[][];
}

export interface MessagesKeyboardButton {
    /**
     * Button color
     */
    color?: "default" | "positive" | "negative" | "primary";
    [key: string]: any;
}

/*Description of the action, that should be performed on button click*/
export interface MessagesKeyboardButtonAction {
    /**
     * Fragment value in app link like vk.com/app{app_id}_-654321#hash
     */
    app_id?: number;
    /**
     * Fragment value in app link like vk.com/app123456_-654321#{hash}
     */
    hash?: string;
    /**
     * Label for button
     */
    label?: string;
    /**
     * Fragment value in app link like vk.com/app123456_{owner_id}#hash
     */
    owner_id?: number;
    /**
     * Additional data sent along with message for developer convenience
     */
    payload?: string;
    /**
     * Button type
     */
    type: "text" | "start";
    [key: string]: any;
}

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
    count?: number;
    [key: string]: any;
    items?: MessagesMessage[];
}

export interface MessagesLongpollParams {
    /**
     * Key
     */
    key?: string;
    /**
     * Persistent timestamp
     */
    pts?: number;
    /**
     * Server URL
     */
    server?: string;
    /**
     * Timestamp
     */
    ts?: number;
    [key: string]: any;
}

export interface MessagesMessage {
    /**
     * Only for messages from community. Contains user ID of community admin, who sent this message.
     */
    admin_author_id?: number;
    /**
     * Unique auto-incremented number for all messages with this peer
     */
    conversation_message_id?: number;
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
    important?: boolean;
    /**
     * Members number
     */
    members_count?: number;
    /**
     * Peer ID
     */
    peer_id: number;
    /**
     * ID used for sending messages. It returned only for outgoing messages
     */
    random_id?: number;
    /**
     * Message text
     */
    text: string;
    /**
     * Date when the message has been updated in Unixtime
     */
    update_time?: number;
    [key: string]: any;
    attachments?: MessagesMessageAttachment[];
    fwd_messages?: MessagesForeignMessage[];
    is_hidden?: boolean;
    payload?: string;
    ref?: string;
    ref_source?: string;
}

export interface MessagesMessageAction {
    /**
     * Message ID
     */
    conversation_message_id?: number;
    /**
     * Email address for chat_invite_user or chat_kick_user actions
     */
    email?: string;
    /**
     * User or email peer ID
     */
    member_id?: number;
    /**
     * Message body of related message
     */
    message?: string;
    /**
     * New chat title for chat_create and chat_title_update actions
     */
    text?: string;
    [key: string]: any;
}

export interface MessagesMessageActionPhoto {
    /**
     * URL of the preview image with 100px in width
     */
    photo_100: string;
    /**
     * URL of the preview image with 200px in width
     */
    photo_200: string;
    /**
     * URL of the preview image with 50px in width
     */
    photo_50: string;
    [key: string]: any;
}

export type MessagesMessageActionStatus = "chat_photo_update" | "chat_photo_remove" | "chat_create" | "chat_title_update" | "chat_invite_user" | "chat_kick_user" | "chat_pin_message" | "chat_unpin_message" | "chat_invite_user_by_link";

export interface MessagesMessageAttachment {
    [key: string]: any;
}

export type MessagesMessageAttachmentType = "photo" | "audio" | "video" | "doc" | "link" | "market" | "market_album" | "gift" | "sticker" | "wall" | "wall_reply" | "graffiti" | "audio_message";

export interface MessagesPinnedMessage {
    /**
     * Unique auto-incremented number for all messages with this peer
     */
    conversation_message_id?: number;
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
     * Peer ID
     */
    peer_id: number;
    /**
     * Message text
     */
    text: string;
    [key: string]: any;
    attachments?: MessagesMessageAttachment[];
}

export interface MessagesUserXtrInvitedBy1 {
    /**
     * ID of the inviter
     */
    invited_by?: number;
}

export type MessagesUserXtrInvitedBy = UsersUserXtrType & MessagesUserXtrInvitedBy1;

export type NewsfeedCommentsFilters = "post" | "photo" | "video" | "topic" | "note";

export interface NewsfeedEventActivity {
    /**
     * address of event
     */
    address?: string;
    /**
     * text of attach
     */
    button_text: string;
    /**
     * text of attach
     */
    text: string;
    /**
     * event start time
     */
    time?: number;
    [key: string]: any;
    friends: number[];
}

export type NewsfeedFilters = "post" | "photo" | "photo_tag" | "wall_photo" | "friend" | "note" | "audio" | "video";

export type NewsfeedIgnoreItemType = "wall" | "tag" | "profilephoto" | "video" | "photo" | "audio";

export interface NewsfeedItemAudio {
    /**
     * Post ID
     */
    post_id?: number;
    [key: string]: any;
}

export interface NewsfeedItemAudioAudio {
    /**
     * Audios number
     */
    count?: number;
    [key: string]: any;
    items?: AudioAudioFull[];
}

export interface NewsfeedItemDigest {
    /**
     * id of feed in digest
     */
    feed_id?: string;
    /**
     * type of digest
     */
    template?: "list" | "grid";
    /**
     * type of digest
     */
    type?: "digest";
    [key: string]: any;
    button_text?: string;
    items?: WallWallpost[];
    main_post_ids?: string[];
    title?: string;
    track_code?: string;
}

export interface NewsfeedItemFriend {
    [key: string]: any;
}

export interface NewsfeedItemFriendFriends {
    /**
     * Number of friends has been added
     */
    count?: number;
    [key: string]: any;
    items?: BaseUserId[];
}

export interface NewsfeedItemNote {
    [key: string]: any;
}

export interface NewsfeedItemNoteNotes {
    /**
     * Notes number
     */
    count?: number;
    [key: string]: any;
    items?: NewsfeedNewsfeedNote[];
}

export interface NewsfeedItemPhoto {
    /**
     * Post ID
     */
    post_id?: number;
    [key: string]: any;
}

export interface NewsfeedItemPhotoPhotos {
    /**
     * Photos number
     */
    count?: number;
    [key: string]: any;
    items?: NewsfeedNewsfeedPhoto[];
}

export interface NewsfeedItemPhotoTag {
    /**
     * Post ID
     */
    post_id?: number;
    [key: string]: any;
}

export interface NewsfeedItemPhotoTagPhotoTags {
    /**
     * Tags number
     */
    count?: number;
    [key: string]: any;
    items?: NewsfeedNewsfeedPhoto[];
}

export interface NewsfeedItemStoriesBlock {
    [key: string]: any;
    block_type?: "local" | "remote";
    stories?: StoriesStory[];
    title?: string;
    track_code?: string;
    type?: "stories";
}

export interface NewsfeedItemTopic {
    /**
     * Topic post ID
     */
    post_id: number;
    /**
     * Post text
     */
    text: string;
    [key: string]: any;
}

export interface NewsfeedItemVideo {
    [key: string]: any;
}

export interface NewsfeedItemVideoVideo {
    /**
     * Tags number
     */
    count?: number;
    [key: string]: any;
    items?: VideoVideo[];
}

export interface NewsfeedItemWallpost {
    /**
     * Post ID
     */
    post_id?: number;
    /**
     * Post text
     */
    text?: string;
    [key: string]: any;
    attachments?: WallWallpostAttachment[];
    copy_history?: WallWallpost[];
}

export type NewsfeedItemWallpostType = "post" | "copy" | "reply";

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
    source_ids?: number[];
    no_reposts?: BaseBoolInt;
}

export type NewsfeedListFull = NewsfeedList & NewsfeedListFull1;

export interface NewsfeedNewsfeedItem1 {
    /**
     * Item source ID
     */
    source_id?: number;
    /**
     * Date when item has been added in Unixtime
     */
    date?: number;
    type?: NewsfeedNewsfeedItemType;
}

export type NewsfeedNewsfeedItem = NewsfeedNewsfeedItem1;

export type NewsfeedNewsfeedItemType = "post" | "photo" | "photo_tag" | "wall_photo" | "friend" | "note" | "audio" | "video" | "topic";

export interface NewsfeedNewsfeedNote {
    /**
     * Comments Number
     */
    comments?: number;
    /**
     * Note ID
     */
    id?: number;
    /**
     * integer
     */
    owner_id?: number;
    /**
     * Note title
     */
    title?: string;
    [key: string]: any;
}

export interface NewsfeedNewsfeedPhoto1 {
    likes?: BaseLikes;
    comments?: BaseObjectCount;
    can_comment?: BaseBoolInt;
    can_repost?: BaseBoolInt;
}

export type NewsfeedNewsfeedPhoto = PhotosPhoto & NewsfeedNewsfeedPhoto1;

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
    text?: string;
    /**
     * Note text in wiki format
     */
    text_wiki?: string;
    /**
     * Note title
     */
    title: string;
    /**
     * URL of the page with note preview
     */
    view_url: string;
    [key: string]: any;
    read_comments?: number;
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
    reply_to?: number;
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
    from_id?: number;
    /**
     * Item ID
     */
    id?: number;
    /**
     * Reply text
     */
    text?: string;
    /**
     * Wall owner's ID
     */
    to_id?: number;
    [key: string]: any;
    attachments?: WallWallpostAttachment[];
}

export interface NotificationsNotification {
    /**
     * Date when the event has been occured
     */
    date?: number;
    /**
     * Notification type
     */
    type?: string;
    [key: string]: any;
}

export type NotificationsNotificationParent = WallWallpostToId & PhotosPhoto & BoardTopic & VideoVideo & NotificationsNotificationsComment;

export interface NotificationsNotificationsComment {
    /**
     * Date when the comment has been added in Unixtime
     */
    date?: number;
    /**
     * Comment ID
     */
    id?: number;
    /**
     * Author ID
     */
    owner_id?: number;
    /**
     * Comment text
     */
    text?: string;
    [key: string]: any;
}

export interface NotificationsReply {
    /**
     * Date when the reply has been created in Unixtime
     */
    date?: number;
    /**
     * Reply ID
     */
    id?: number;
    /**
     * Reply text
     */
    text?: number;
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
    redirect_uri?: string;
    [key: string]: any;
}

export interface OrdersAmount {
    /**
     * Currency name
     */
    currency?: string;
    [key: string]: any;
    amounts?: OrdersAmountItem[];
}

export interface OrdersAmountItem {
    /**
     * Votes amount in user's currency
     */
    amount?: number;
    /**
     * Amount description
     */
    description?: string;
    /**
     * Votes number
     */
    votes?: string;
    [key: string]: any;
}

export interface OrdersOrder {
    /**
     * Amount
     */
    amount?: number;
    /**
     * App order ID
     */
    app_order_id?: number;
    /**
     * Cancel transaction ID
     */
    cancel_transaction_id?: number;
    /**
     * Date of creation in Unixtime
     */
    date?: number;
    /**
     * Order ID
     */
    id?: number;
    /**
     * Order item
     */
    item?: string;
    /**
     * Receiver ID
     */
    receiver_id?: number;
    /**
     * Order status
     */
    status?: string;
    /**
     * Transaction ID
     */
    transaction_id?: number;
    /**
     * User ID
     */
    user_id?: number;
    [key: string]: any;
}

export interface OrdersSubscription {
    /**
     * Cancel reason
     */
    cancel_reason?: string;
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
    next_bill_time?: number;
    /**
     * Pending cancel state
     */
    pending_cancel?: boolean;
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
     * Subscription status
     */
    status: string;
    /**
     * Is test subscription
     */
    test_mode?: boolean;
    /**
     * Date of trial expire in Unixtime
     */
    trial_expire_time?: number;
    /**
     * Date of last change in Unixtime
     */
    update_time: number;
    [key: string]: any;
}

export type PagesPrivacySettings = 0 | 1 | 2;

export interface PagesWikipage {
    /**
     * Page creator ID
     */
    creator_id?: number;
    /**
     * Page creator name
     */
    creator_name?: number;
    /**
     * Last editor ID
     */
    editor_id?: number;
    /**
     * Last editor name
     */
    editor_name?: string;
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
    creator_id?: number;
    /**
     * Date when the page has been edited in Unixtime
     */
    edited: number;
    /**
     * Last editor ID
     */
    editor_id?: number;
    /**
     * Community ID
     */
    group_id: number;
    /**
     * Page content, HTML
     */
    html?: string;
    /**
     * Page ID
     */
    id: number;
    /**
     * Page content, wiki
     */
    source?: string;
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

export interface PhotosCommentXtrPid {
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
     * Photo ID
     */
    pid: number;
    /**
     * Replied comment ID
     */
    reply_to_comment?: number;
    /**
     * Replied user ID
     */
    reply_to_user?: number;
    /**
     * Comment text
     */
    text: string;
    [key: string]: any;
    attachments?: WallCommentAttachment[];
}

export interface PhotosImage {
    /**
     * Height of the photo in px.
     */
    height?: number;
    /**
     * Photo URL.
     */
    url?: string;
    /**
     * Width of the photo in px.
     */
    width?: number;
    [key: string]: any;
}

export type PhotosImageType = "s" | "m" | "x" | "o" | "p" | "q" | "r" | "y" | "z" | "w";

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

export interface PhotosPhoto {
    /**
     * Access key for the photo
     */
    access_key?: string;
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
    height?: number;
    /**
     * Photo ID
     */
    id: number;
    /**
     * Latitude
     */
    lat?: number;
    /**
     * Longitude
     */
    long?: number;
    /**
     * Photo owner's ID
     */
    owner_id: number;
    /**
     * Post ID
     */
    post_id?: number;
    /**
     * Photo caption
     */
    text?: string;
    /**
     * ID of the user who have uploaded the photo
     */
    user_id?: number;
    /**
     * Original photo width
     */
    width?: number;
    [key: string]: any;
    images?: PhotosImage[];
}

export interface PhotosPhotoAlbum {
    /**
     * Date when the album has been created in Unixtime
     */
    created: number;
    /**
     * Photo album description
     */
    description?: string;
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
     * Date when the album has been created in Unixtime
     */
    created: number;
    /**
     * Photo album description
     */
    description?: string;
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
     * Thumb photo ID
     */
    thumb_id?: number;
    /**
     * URL of the thumb image
     */
    thumb_src?: string;
    /**
     * Photo album title
     */
    title: string;
    /**
     * Date when the album has been updated last time in Unixtime
     */
    updated: number;
    [key: string]: any;
    sizes?: PhotosPhotoSizes[];
}

export interface PhotosPhotoFull {
    /**
     * Access key for the photo
     */
    access_key?: string;
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
    height?: number;
    /**
     * Photo ID
     */
    id: number;
    /**
     * Latitude
     */
    lat?: number;
    /**
     * Longitude
     */
    long?: number;
    /**
     * Photo owner's ID
     */
    owner_id: number;
    /**
     * Post ID
     */
    post_id?: number;
    /**
     * Photo caption
     */
    text?: string;
    /**
     * ID of the user who have uploaded the photo
     */
    user_id?: number;
    /**
     * Original photo width
     */
    width?: number;
    [key: string]: any;
    images?: PhotosImage[];
}

export interface PhotosPhotoFullXtrRealOffset {
    /**
     * Access key for the photo
     */
    access_key?: string;
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
    height?: number;
    /**
     * Photo ID
     */
    id: number;
    /**
     * Latitude
     */
    lat?: number;
    /**
     * Longitude
     */
    long?: number;
    /**
     * Photo owner's ID
     */
    owner_id: number;
    /**
     * URL of image with 1280 px width
     */
    photo_1280?: string;
    /**
     * URL of image with 130 px width
     */
    photo_130?: string;
    /**
     * URL of image with 2560 px width
     */
    photo_2560?: string;
    /**
     * URL of image with 604 px width
     */
    photo_604?: string;
    /**
     * URL of image with 75 px width
     */
    photo_75?: string;
    /**
     * URL of image with 807 px width
     */
    photo_807?: string;
    /**
     * Post ID
     */
    post_id?: number;
    /**
     * Real position of the photo
     */
    real_offset?: number;
    /**
     * Photo caption
     */
    text?: string;
    /**
     * ID of the user who have uploaded the photo
     */
    user_id?: number;
    /**
     * Original photo width
     */
    width?: number;
    [key: string]: any;
    sizes?: PhotosPhotoSizes[];
}

export interface PhotosPhotoSizes {
    /**
     * Height in px
     */
    height: number;
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

export type PhotosPhotoSizesType = "s" | "m" | "x" | "o" | "p" | "q" | "r" | "y" | "z" | "w";

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
     * User ID
     */
    user_id: number;
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
     * Uploaded photos data
     */
    photos_list?: string;
    /**
     * Upload server number
     */
    server?: number;
    [key: string]: any;
}

export interface PhotosPhotoXtrRealOffset {
    /**
     * Access key for the photo
     */
    access_key?: string;
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
    height?: number;
    /**
     * Photo ID
     */
    id: number;
    /**
     * Latitude
     */
    lat?: number;
    /**
     * Longitude
     */
    long?: number;
    /**
     * Photo owner's ID
     */
    owner_id: number;
    /**
     * URL of image with 1280 px width
     */
    photo_1280?: string;
    /**
     * URL of image with 130 px width
     */
    photo_130?: string;
    /**
     * URL of image with 2560 px width
     */
    photo_2560?: string;
    /**
     * URL of image with 604 px width
     */
    photo_604?: string;
    /**
     * URL of image with 75 px width
     */
    photo_75?: string;
    /**
     * URL of image with 807 px width
     */
    photo_807?: string;
    /**
     * Post ID
     */
    post_id?: number;
    /**
     * Real position of the photo
     */
    real_offset?: number;
    /**
     * Photo caption
     */
    text?: string;
    /**
     * ID of the user who have uploaded the photo
     */
    user_id?: number;
    /**
     * Original photo width
     */
    width?: number;
    [key: string]: any;
    sizes?: PhotosPhotoSizes[];
}

export interface PhotosPhotoXtrTagInfo {
    /**
     * Access key for the photo
     */
    access_key?: string;
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
    height?: number;
    /**
     * Photo ID
     */
    id: number;
    /**
     * Latitude
     */
    lat?: number;
    /**
     * Longitude
     */
    long?: number;
    /**
     * Photo owner's ID
     */
    owner_id: number;
    /**
     * URL of image with 1280 px width
     */
    photo_1280?: string;
    /**
     * URL of image with 130 px width
     */
    photo_130?: string;
    /**
     * URL of image with 2560 px width
     */
    photo_2560?: string;
    /**
     * URL of image with 604 px width
     */
    photo_604?: string;
    /**
     * URL of image with 75 px width
     */
    photo_75?: string;
    /**
     * URL of image with 807 px width
     */
    photo_807?: string;
    /**
     * ID of the tag creator
     */
    placer_id?: number;
    /**
     * Post ID
     */
    post_id?: number;
    /**
     * Date when tag has been added in Unixtime
     */
    tag_created?: number;
    /**
     * Tag ID
     */
    tag_id?: number;
    /**
     * Photo caption
     */
    text?: string;
    /**
     * ID of the user who have uploaded the photo
     */
    user_id?: number;
    /**
     * Original photo width
     */
    width?: number;
    [key: string]: any;
    sizes?: PhotosPhotoSizes[];
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

export interface PollsPoll {
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
     * Poll question
     */
    question: string;
    /**
     * Votes number
     */
    votes: string;
    [key: string]: any;
    answers: PollsAnswer[];
}

export interface PollsVoters {
    /**
     * Answer ID
     */
    answer_id?: number;
    [key: string]: any;
}

export interface PollsVotersUsers {
    /**
     * Votes number
     */
    count?: number;
    /**
     * User ID
     */
    items?: number[];
    [key: string]: any;
}

export interface PrettyCardsPrettyCard {
    /**
     * Button key
     */
    button?: string;
    /**
     * Button text in current language
     */
    button_text?: string;
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
    price?: string;
    /**
     * Old price if set (decimal number returned as string)
     */
    price_old?: string;
    /**
     * Title
     */
    title: string;
    [key: string]: any;
    images?: BaseImage[];
}

export interface SearchHint {
    /**
     * Object description
     */
    description: string;
    [key: string]: any;
}

export type SearchHintSection = "groups" | "events" | "publics" | "correspondents" | "people" | "friends" | "mutual_friends";

export type SearchHintType = "group" | "profile";

export interface SecureLevel {
    /**
     * Level
     */
    level?: number;
    /**
     * User ID
     */
    uid?: number;
    [key: string]: any;
}

export interface SecureSmsNotification {
    /**
     * Application ID
     */
    app_id?: number;
    /**
     * Date when message has been sent in Unixtime
     */
    date?: number;
    /**
     * Notification ID
     */
    id?: number;
    /**
     * Messsage text
     */
    message?: string;
    /**
     * User ID
     */
    user_id?: number;
    [key: string]: any;
}

export interface SecureTokenChecked {
    /**
     * Date when access_token has been generated in Unixtime
     */
    date?: number;
    /**
     * Date when access_token will expire in Unixtime
     */
    expire?: number;
    /**
     * User ID
     */
    user_id?: number;
    [key: string]: any;
}

export interface SecureTransaction {
    /**
     * Transaction date in Unixtime
     */
    date?: number;
    /**
     * Transaction ID
     */
    id?: number;
    /**
     * From ID
     */
    uid_from?: number;
    /**
     * To ID
     */
    uid_to?: number;
    /**
     * Votes number
     */
    votes?: number;
    [key: string]: any;
}

/*Activity stats*/
export interface StatsActivity {
    /**
     * Comments number
     */
    comments?: number;
    /**
     * Reposts number
     */
    copies?: number;
    /**
     * Hidden from news count
     */
    hidden?: number;
    /**
     * Likes number
     */
    likes?: number;
    /**
     * New subscribers count
     */
    subscribed?: number;
    /**
     * Unsubscribed count
     */
    unsubscribed?: number;
    [key: string]: any;
}

export interface StatsCity {
    /**
     * Visitors number
     */
    count?: number;
    /**
     * City name
     */
    name?: string;
    /**
     * City ID
     */
    value?: number;
    [key: string]: any;
}

export interface StatsCountry {
    /**
     * Country code
     */
    code?: string;
    /**
     * Visitors number
     */
    count?: number;
    /**
     * Country name
     */
    name?: string;
    /**
     * Country ID
     */
    value?: number;
    [key: string]: any;
}

export interface StatsPeriod {
    /**
     * Unix timestamp
     */
    period_from?: number;
    /**
     * Unix timestamp
     */
    period_to?: number;
    [key: string]: any;
}

/*Reach stats*/
export interface StatsReach {
    /**
     * Reach count from mobile devices
     */
    mobile_reach?: number;
    /**
     * Reach count
     */
    reach?: number;
    /**
     * Subscribers reach count
     */
    reach_subscribers?: number;
    [key: string]: any;
    age?: StatsSexAge[];
    cities?: StatsCity[];
    countries?: StatsCountry[];
    sex?: StatsSexAge[];
    sex_age?: StatsSexAge[];
}

export interface StatsSexAge {
    /**
     * Visitors number
     */
    count?: number;
    /**
     * Sex/age value
     */
    value?: string;
    [key: string]: any;
}

/*Views stats*/
export interface StatsViews {
    /**
     * Number of views from mobile devices
     */
    mobile_views?: number;
    /**
     * Views number
     */
    views?: number;
    /**
     * Visitors number
     */
    visitors?: number;
    [key: string]: any;
    age?: StatsSexAge[];
    cities?: StatsCity[];
    countries?: StatsCountry[];
    sex?: StatsSexAge[];
    sex_age?: StatsSexAge[];
}

export interface StatsWallpostStat {
    /**
     * Hidings number
     */
    hide?: number;
    /**
     * People have joined the group
     */
    join_group?: number;
    /**
     * Link clickthrough
     */
    links?: number;
    /**
     * Subscribers reach
     */
    reach_subscribers?: number;
    /**
     * Total reach
     */
    reach_total?: number;
    /**
     * Reports number
     */
    report?: number;
    /**
     * Clickthrough to community
     */
    to_group?: number;
    /**
     * Unsubscribed members
     */
    unsubscribe?: number;
    [key: string]: any;
}

export interface StatusStatus {
    /**
     * Status text
     */
    text?: string;
    [key: string]: any;
}

export interface StorageValue {
    [key: string]: any;
    key: string;
    value: string;
}

export interface StoriesReplies {
    /**
     * Replies number.
     */
    count: number;
    /**
     * New replies number.
     */
    new?: number;
    [key: string]: any;
}

export interface StoriesStory {
    /**
     * Access key for private object.
     */
    access_key?: string;
    /**
     * Date when story has been added in Unixtime.
     */
    date?: number;
    /**
     * Story ID.
     */
    id: number;
    /**
     * Information whether the story is deleted (false - no, true - yes).
     */
    is_deleted?: boolean;
    /**
     * Information whether the story is expired (false - no, true - yes).
     */
    is_expired?: boolean;
    /**
     * Story owner's ID.
     */
    owner_id: number;
    /**
     * Access key for private object.
     */
    parent_story_access_key?: string;
    /**
     * Parent story ID.
     */
    parent_story_id?: number;
    /**
     * Parent story owner's ID.
     */
    parent_story_owner_id?: number;
    /**
     * Views number.
     */
    views?: number;
    [key: string]: any;
    replies?: StoriesReplies[];
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
    [key: string]: any;
}

export interface StoriesStoryStats {
    [key: string]: any;
}

export interface StoriesStoryStatsStat {
    /**
     * Stat value
     */
    count?: number;
    [key: string]: any;
}

export type StoriesStoryStatsState = "on" | "off" | "hidden";

export type StoriesStoryType = "photo" | "video";

export interface StoriesStoryVideo1 {
    is_private?: BaseBoolInt;
}

export type StoriesStoryVideo = VideoVideo & StoriesStoryVideo1;

export type StoriesUploadLinkText = "to_store" | "vote" | "more" | "book" | "order" | "enroll" | "fill" | "signup" | "buy" | "ticket" | "write" | "open" | "learn_more" | "view" | "go_to" | "contact" | "watch" | "play" | "install" | "read";

export interface UsersCareer {
    /**
     * City ID
     */
    city_id?: number;
    /**
     * Company name
     */
    company?: string;
    /**
     * Country ID
     */
    country_id?: number;
    /**
     * From year
     */
    from?: number;
    /**
     * Community ID
     */
    group_id?: number;
    /**
     * Career ID
     */
    id?: number;
    /**
     * Position
     */
    position?: string;
    /**
     * Till year
     */
    until?: number;
    [key: string]: any;
}

export interface UsersCropPhoto {
    [key: string]: any;
}

export interface UsersCropPhotoCrop {
    /**
     * Coordinate X of the left upper corner
     */
    x?: number;
    /**
     * Coordinate X of the right lower corner
     */
    x2?: number;
    /**
     * Coordinate Y of the left upper corner
     */
    y?: number;
    /**
     * Coordinate Y of the right lower corner
     */
    y2?: number;
    [key: string]: any;
}

export interface UsersCropPhotoRect {
    /**
     * Coordinate X of the left upper corner
     */
    x?: number;
    /**
     * Coordinate X of the right lower corner
     */
    x2?: number;
    /**
     * Coordinate Y of the left upper corner
     */
    y?: number;
    /**
     * Coordinate Y of the right lower corner
     */
    y2?: number;
    [key: string]: any;
}

export interface UsersExports {
    [key: string]: any;
    facebook?: number;
    livejournal?: number;
    twitter?: number;
}

export type UsersFields = "photo_id" | "verified" | "sex" | "bdate" | "city" | "country" | "home_town" | "has_photo" | "photo_50" | "photo_100" | "photo_200_orig" | "photo_200" | "photo_400_orig" | "photo_max" | "photo_max_orig" | "online" | "lists" | "domain" | "has_mobile" | "contacts" | "site" | "education" | "universities" | "schools" | "status" | "last_seen" | "followers_count" | "counters" | "common_count" | "occupation" | "nickname" | "relatives" | "relation" | "personal" | "connections" | "exports" | "wall_comments" | "activities" | "interests" | "music" | "movies" | "tv" | "books" | "games" | "about" | "quotes" | "can_post" | "can_see_all_posts" | "can_see_audio" | "can_write_private_message" | "can_send_friend_request" | "is_favorite" | "is_hidden_from_feed" | "timezone" | "screen_name" | "maiden_name" | "crop_photo" | "is_friend" | "friend_status" | "career" | "military" | "blacklisted" | "blacklisted_by_me" | "can_subscribe_posts";

export interface UsersLastSeen {
    /**
     * Type of the platform that used for the last authorization
     */
    platform?: number;
    /**
     * Last visit date (in Unix time)
     */
    time?: number;
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
    from?: number;
    /**
     * Military ID
     */
    id?: number;
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
    until?: number;
    [key: string]: any;
}

export interface UsersOccupation {
    /**
     * ID of school, university, company group
     */
    id?: number;
    /**
     * Name of occupation
     */
    name?: string;
    /**
     * Type of occupation
     */
    type?: string;
    [key: string]: any;
}

export interface UsersPersonal {
    /**
     * User's views on alcohol
     */
    alcohol?: number;
    /**
     * User's inspired by
     */
    inspired_by?: string;
    /**
     * User's languages
     */
    langs?: string[];
    /**
     * User's personal priority in life
     */
    life_main?: number;
    /**
     * User's personal priority in people
     */
    people_main?: number;
    /**
     * User's political views
     */
    political?: number;
    /**
     * User's religion
     */
    religion?: string;
    /**
     * User's views on smoking
     */
    smoking?: number;
    [key: string]: any;
}

export interface UsersRelative {
    /**
     * Date of child birthday (format dd.mm.yyyy)
     */
    birth_date?: string;
    /**
     * Relative ID
     */
    id?: number;
    /**
     * Name of relative
     */
    name?: string;
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
    city?: number;
    /**
     * School class letter
     */
    class?: string;
    /**
     * Country ID
     */
    country?: number;
    /**
     * School ID
     */
    id?: string;
    /**
     * School name
     */
    name?: string;
    /**
     * School type ID
     */
    type?: number;
    /**
     * School type name
     */
    type_str?: string;
    /**
     * Year the user started to study
     */
    year_from?: number;
    /**
     * Graduation year
     */
    year_graduated?: number;
    /**
     * Year the user finished to study
     */
    year_to?: number;
    [key: string]: any;
}

export interface UsersUniversity {
    /**
     * Chair ID
     */
    chair?: number;
    /**
     * Chair name
     */
    chair_name?: string;
    /**
     * City ID
     */
    city?: number;
    /**
     * Country ID
     */
    country?: number;
    /**
     * Education form
     */
    education_form?: string;
    /**
     * Education status
     */
    education_status?: string;
    /**
     * Faculty ID
     */
    faculty?: number;
    /**
     * Faculty name
     */
    faculty_name?: string;
    /**
     * Graduation year
     */
    graduation?: number;
    /**
     * University ID
     */
    id?: number;
    /**
     * University name
     */
    name?: string;
    [key: string]: any;
}

export interface UsersUser1 {
    /**
     * Domain name of the user's page
     */
    screen_name?: string;
    /**
     * URL of square photo of the user with 50 pixels in width
     */
    photo_50?: string;
    /**
     * URL of square photo of the user with 100 pixels in width
     */
    photo_100?: string;
    /**
     * Application ID
     */
    online_app?: number;
    sex?: BaseSex;
    online?: BaseBoolInt;
    online_mobile?: BaseBoolInt;
}

export type UsersUser = UsersUserMin & UsersUser1;

export interface UsersUserCounters {
    /**
     * Albums number
     */
    albums?: number;
    /**
     * Audios number
     */
    audios?: number;
    /**
     * Followers number
     */
    followers?: number;
    /**
     * Friends number
     */
    friends?: number;
    /**
     * Gifts number
     */
    gifts?: number;
    /**
     * Communities number
     */
    groups?: number;
    /**
     * Notes number
     */
    notes?: number;
    /**
     * Online friends number
     */
    online_friends?: number;
    /**
     * Public pages number
     */
    pages?: number;
    /**
     * Photos number
     */
    photos?: number;
    /**
     * Subscriptions number
     */
    subscriptions?: number;
    /**
     * Number of photos with user
     */
    user_photos?: number;
    /**
     * Number of videos with user
     */
    user_videos?: number;
    /**
     * Videos number
     */
    videos?: number;
    [key: string]: any;
}

export interface UsersUserFull1 {
    /**
     * User nickname
     */
    nickname?: string;
    /**
     * User maiden name
     */
    maiden_name?: string;
    /**
     * Domain name of the user's page
     */
    domain?: string;
    /**
     * User's date of birth
     */
    bdate?: string;
    /**
     * User's timezone
     */
    timezone?: number;
    /**
     * URL of square photo of the user with 200 pixels in width
     */
    photo_200?: string;
    /**
     * URL of square photo of the user with maximum width
     */
    photo_max?: string;
    /**
     * URL of user's photo with 200 pixels in width
     */
    photo_200_orig?: string;
    /**
     * URL of user's photo with 400 pixels in width
     */
    photo_400_orig?: string;
    /**
     * URL of user's photo of maximum size
     */
    photo_max_orig?: string;
    /**
     * ID of the user's main photo
     */
    photo_id?: string;
    /**
     * Friend status for current user
     */
    friend_status?: number;
    /**
     * Information whether current user can see
     */
    mobile_phone?: string;
    /**
     * User's mobile phone number
     */
    home_phone?: string;
    /**
     * User's Skype nickname
     */
    skype?: string;
    /**
     * User's Facebook account
     */
    facebook?: string;
    /**
     * User's Facebook name
     */
    facebook_name?: string;
    /**
     * User's Twitter account
     */
    twitter?: string;
    /**
     * User's Livejournal account
     */
    livejournal?: string;
    /**
     * User's Instagram account
     */
    instagram?: string;
    /**
     * User's website
     */
    site?: string;
    /**
     * User's status
     */
    status?: string;
    /**
     * User's status
     */
    activity?: string;
    /**
     * Number of user's followers
     */
    followers_count?: number;
    /**
     * Number of common friends with current user
     */
    common_count?: number;
    /**
     * University ID
     */
    university?: number;
    /**
     * University name
     */
    university_name?: string;
    /**
     * Faculty ID
     */
    faculty?: number;
    /**
     * Faculty name
     */
    faculty_name?: string;
    /**
     * Graduation year
     */
    graduation?: number;
    /**
     * Education form
     */
    education_form?: string;
    /**
     * User's education status
     */
    education_status?: string;
    /**
     * User hometown
     */
    home_town?: string;
    /**
     * User relationship status
     */
    relation?: number;
    /**
     * User's interests
     */
    interests?: string;
    /**
     * User's favorite music
     */
    music?: string;
    /**
     * User's activities
     */
    activities?: string;
    /**
     * User's favorite movies
     */
    movies?: string;
    /**
     * User's favorite tv shows
     */
    tv?: string;
    /**
     * User's favorite books
     */
    books?: string;
    /**
     * User's favorite games
     */
    games?: string;
    /**
     * About me field
     */
    about?: string;
    /**
     * Favorite quotes
     */
    quotes?: string;
    /**
     * Information whether current user is subscribed to podcasts
     */
    is_subscribed_podcasts?: boolean;
    /**
     * Owner in whitelist or not
     */
    can_subscribe_podcasts?: boolean;
    /**
     * Can subscribe to wall
     */
    can_subscribe_posts?: boolean;
    city?: BaseObject;
    country?: BaseCountry;
    has_photo?: BaseBoolInt;
    trending?: BaseBoolInt;
    has_mobile?: BaseBoolInt;
    is_friend?: BaseBoolInt;
    wall_comments?: BaseBoolInt;
    can_post?: BaseBoolInt;
    can_see_all_posts?: BaseBoolInt;
    can_see_audio?: BaseBoolInt;
    can_write_private_message?: BaseBoolInt;
    can_send_friend_request?: BaseBoolInt;
    status_audio?: AudioAudioFull;
    last_seen?: UsersLastSeen;
    exports?: UsersExports;
    crop_photo?: UsersCropPhoto;
    verified?: BaseBoolInt;
    blacklisted?: BaseBoolInt;
    blacklisted_by_me?: BaseBoolInt;
    is_favorite?: BaseBoolInt;
    is_hidden_from_feed?: BaseBoolInt;
    occupation?: UsersOccupation;
    career?: UsersCareer[];
    military?: UsersMilitary[];
    relation_partner?: UsersUserMin;
    personal?: UsersPersonal;
    universities?: UsersUniversity[];
    schools?: UsersSchool[];
    relatives?: UsersRelative[];
}

export type UsersUserFull = UsersUser & UsersUserFull1;

export interface UsersUserMin {
    /**
     * Returns if a profile is deleted or blocked
     */
    deactivated?: string;
    /**
     * User first name
     */
    first_name: string;
    /**
     * Returns if a profile is hidden.
     */
    hidden?: number;
    /**
     * User ID
     */
    id: number;
    /**
     * User last name
     */
    last_name: string;
    [key: string]: any;
}

export type UsersUserType = "profile";

export interface UsersUserXtrCounters1 {
    counters?: UsersUserCounters;
}

export type UsersUserXtrCounters = UsersUserFull & UsersUserXtrCounters1;

export interface UsersUserXtrType1 {
    type?: UsersUserType;
}

export type UsersUserXtrType = UsersUser & UsersUserXtrType1;

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
    object_id?: number;
    [key: string]: any;
}

export type UtilsDomainResolvedType = "user" | "group" | "application" | "page";

export interface UtilsLastShortenedLink {
    /**
     * Access key for private stats
     */
    access_key?: string;
    /**
     * Link key (characters after vk.cc/)
     */
    key?: string;
    /**
     * Short link URL
     */
    short_url?: string;
    /**
     * Creation time in Unixtime
     */
    timestamp?: number;
    /**
     * Full URL
     */
    url?: string;
    /**
     * Total views number
     */
    views?: number;
    [key: string]: any;
}

export interface UtilsLinkChecked {
    /**
     * Link URL
     */
    link?: string;
    [key: string]: any;
}

export type UtilsLinkCheckedStatus = "not_banned" | "banned" | "processing";

export interface UtilsLinkStats {
    /**
     * Link key (characters after vk.cc/)
     */
    key?: string;
    [key: string]: any;
    stats?: UtilsStats[];
}

export interface UtilsLinkStatsExtended {
    /**
     * Link key (characters after vk.cc/)
     */
    key?: string;
    [key: string]: any;
    stats?: UtilsStatsExtended[];
}

export interface UtilsShortLink {
    /**
     * Access key for private stats
     */
    access_key?: string;
    /**
     * Link key (characters after vk.cc/)
     */
    key?: string;
    /**
     * Short link URL
     */
    short_url?: string;
    /**
     * Full URL
     */
    url?: string;
    [key: string]: any;
}

export interface UtilsStats {
    /**
     * Start time
     */
    timestamp?: number;
    /**
     * Total views number
     */
    views?: number;
    [key: string]: any;
}

export interface UtilsStatsCity {
    /**
     * City ID
     */
    city_id?: number;
    /**
     * Views number
     */
    views?: number;
    [key: string]: any;
}

export interface UtilsStatsCountry {
    /**
     * Country ID
     */
    country_id?: number;
    /**
     * Views number
     */
    views?: number;
    [key: string]: any;
}

export interface UtilsStatsExtended {
    /**
     * Start time
     */
    timestamp?: number;
    /**
     * Total views number
     */
    views?: number;
    [key: string]: any;
    cities?: UtilsStatsCity[];
    countries?: UtilsStatsCountry[];
    sex_age?: UtilsStatsSexAge[];
}

export interface UtilsStatsSexAge {
    /**
     * Age denotation
     */
    age_range?: string;
    /**
     * Views by female users
     */
    female?: number;
    /**
     * Views by male users
     */
    male?: number;
    [key: string]: any;
}

export interface VideoSaveResult {
    /**
     * Video description
     */
    description?: string;
    /**
     * Video owner ID
     */
    owner_id?: number;
    /**
     * Video title
     */
    title?: string;
    /**
     * URL for the video uploading
     */
    upload_url?: string;
    /**
     * Video ID
     */
    video_id?: number;
    [key: string]: any;
}

export interface VideoVideo {
    /**
     * Video access key
     */
    access_key?: string;
    /**
     * Date when the video has been added in Unixtime
     */
    adding_date?: number;
    /**
     * Number of comments
     */
    comments?: number;
    /**
     * Date when video has been uploaded in Unixtime
     */
    date?: number;
    /**
     * Video description
     */
    description?: string;
    /**
     * Video duration in seconds
     */
    duration?: number;
    /**
     * URL of the first frame for the corresponding width.
     */
    first_frame_130?: string;
    /**
     * URL of the first frame for the corresponding width.
     */
    first_frame_160?: string;
    /**
     * URL of the first frame for the corresponding width.
     */
    first_frame_320?: string;
    /**
     * URL of the first frame for the corresponding width.
     */
    first_frame_800?: string;
    /**
     * Video height
     */
    height?: number;
    /**
     * Video ID
     */
    id?: number;
    /**
     * Video owner ID
     */
    owner_id?: number;
    /**
     * URL of the preview image with 130 px in width
     */
    photo_130?: string;
    /**
     * URL of the preview image with 320 px in width
     */
    photo_320?: string;
    /**
     * URL of the preview image with 800 px in width
     */
    photo_800?: string;
    /**
     * URL of the page with a player that can be used to play the video in the browser.
     */
    player?: string;
    /**
     * Video title
     */
    title?: string;
    /**
     * Number of views
     */
    views?: number;
    /**
     * Video width
     */
    width?: number;
    [key: string]: any;
    is_favorite?: boolean;
    type?: "video";
}

export interface VideoVideoAlbumFull {
    /**
     * Total number of videos in album
     */
    count: number;
    /**
     * Album ID
     */
    id?: number;
    /**
     * Information whether album is system
     */
    is_system?: number;
    /**
     * Album owner's ID
     */
    owner_id: number;
    /**
     * URL of the preview image with 160px in width
     */
    photo_160?: string;
    /**
     * URL of the preview image with 320px in width
     */
    photo_320?: string;
    /**
     * Album title
     */
    title: string;
    /**
     * Date when the album has been updated last time in Unixtime
     */
    updated_time: number;
    [key: string]: any;
    image?: VideoVideoImage[];
}

export interface VideoVideoFiles {
    /**
     * URL of the external player
     */
    external?: string;
    /**
     * URL of the mpeg4 file with 1080p quality
     */
    mp_1080?: string;
    /**
     * URL of the mpeg4 file with 240p quality
     */
    mp_240?: string;
    /**
     * URL of the mpeg4 file with 360p quality
     */
    mp_360?: string;
    /**
     * URL of the mpeg4 file with 480p quality
     */
    mp_480?: string;
    /**
     * URL of the mpeg4 file with 720p quality
     */
    mp_720?: string;
    [key: string]: any;
}

export interface VideoVideoFull {
    /**
     * Video access key
     */
    access_key?: string;
    /**
     * Date when the video has been added in Unixtime
     */
    adding_date?: number;
    /**
     * Number of comments
     */
    comments?: number;
    /**
     * Date when video has been uploaded in Unixtime
     */
    date?: number;
    /**
     * Video description
     */
    description?: string;
    /**
     * Video duration in seconds
     */
    duration?: number;
    /**
     * URL of the first frame for the corresponding width.
     */
    first_frame_130?: string;
    /**
     * URL of the first frame for the corresponding width.
     */
    first_frame_160?: string;
    /**
     * URL of the first frame for the corresponding width.
     */
    first_frame_320?: string;
    /**
     * URL of the first frame for the corresponding width.
     */
    first_frame_800?: string;
    /**
     * Video ID
     */
    id?: number;
    /**
     * Video owner ID
     */
    owner_id?: number;
    /**
     * URL of the preview image with 130 px in width
     */
    photo_130?: string;
    /**
     * URL of the preview image with 320 px in width
     */
    photo_320?: string;
    /**
     * URL of the preview image with 800 px in width
     */
    photo_800?: string;
    /**
     * URL of the page with a player that can be used to play the video in the browser.
     */
    player?: string;
    /**
     * Video title
     */
    title?: string;
    /**
     * Number of views
     */
    views?: number;
    [key: string]: any;
}

export interface VideoVideoImage1 {
    with_padding?: BaseBoolInt;
}

export type VideoVideoImage = BaseImage & VideoVideoImage1;

export interface WallAppPost {
    /**
     * Application ID
     */
    id?: number;
    /**
     * Application name
     */
    name?: string;
    /**
     * URL of the preview image with 130 px in width
     */
    photo_130?: string;
    /**
     * URL of the preview image with 604 px in width
     */
    photo_604?: string;
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
     * URL of the page with note preview
     */
    view_url: string;
    [key: string]: any;
}

export interface WallCommentAttachment {
    [key: string]: any;
}

export type WallCommentAttachmentType = "photo" | "audio" | "video" | "doc" | "link" | "note" | "page" | "market_market_album" | "market" | "sticker";

export interface WallCommentThread {
    /**
     * Information whether current user can comment the post
     */
    can_post?: boolean;
    /**
     * Comments number
     */
    count: number;
    /**
     * Information whether groups can comment the post
     */
    groups_can_post?: boolean;
    [key: string]: any;
    items?: WallWallComment[];
}

export interface WallGraffiti {
    /**
     * Graffiti ID
     */
    id?: number;
    /**
     * Graffiti owner's ID
     */
    owner_id?: number;
    /**
     * URL of the preview image with 200 px in width
     */
    photo_200?: string;
    /**
     * URL of the preview image with 586 px in width
     */
    photo_586?: string;
    [key: string]: any;
}

export interface WallPostSource {
    /**
     * Additional data
     */
    data?: string;
    /**
     * Platform name
     */
    platform?: string;
    /**
     * URL to an external site used to publish the post
     */
    url?: string;
    [key: string]: any;
}

export type WallPostSourceType = "vk" | "widget" | "api" | "rss" | "sms";

export type WallPostType = "post" | "copy" | "reply" | "postpone" | "suggest";

export interface WallPostedPhoto {
    /**
     * Photo ID
     */
    id?: number;
    /**
     * Photo owner's ID
     */
    owner_id?: number;
    /**
     * URL of the preview image with 130 px in width
     */
    photo_130?: string;
    /**
     * URL of the preview image with 604 px in width
     */
    photo_604?: string;
    [key: string]: any;
}

export interface WallViews {
    /**
     * Count
     */
    count?: number;
    [key: string]: any;
}

export interface WallWallComment {
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
    real_offset?: number;
    /**
     * Replied comment ID
     */
    reply_to_comment?: number;
    /**
     * Replied user ID
     */
    reply_to_user?: number;
    /**
     * Comment text
     */
    text: string;
    [key: string]: any;
    attachments?: WallCommentAttachment[];
    post_id?: number;
    owner_id?: number;
    parents_stack?: number[];
    deleted?: boolean;
}

export interface WallWallpost {
    /**
     * Access key to private object
     */
    access_key?: string;
    /**
     * Date of publishing in Unixtime
     */
    date?: number;
    /**
     * Date of editing in Unixtime
     */
    edited?: number;
    /**
     * Post author ID
     */
    from_id?: number;
    /**
     * Post ID
     */
    id?: number;
    /**
     * Is post archived, only for post owners
     */
    is_archived?: boolean;
    /**
     * Information whether the post in favorites list
     */
    is_favorite?: boolean;
    /**
     * Wall owner's ID
     */
    owner_id?: number;
    /**
     * Post signer ID
     */
    signer_id?: number;
    /**
     * Post text
     */
    text?: string;
    [key: string]: any;
    attachments?: WallWallpostAttachment[];
}

export interface WallWallpostAttachment {
    /**
     * Access key for the audio
     */
    access_key?: string;
    /**
     * String ID of photo
     */
    photos_list?: string[];
    [key: string]: any;
}

export type WallWallpostAttachmentType = "photo" | "posted_photo" | "audio" | "video" | "doc" | "link" | "graffiti" | "note" | "app" | "poll" | "page" | "album" | "photos_list" | "market_market_album" | "market" | "event";

export interface WallWallpostFull1 {
    /**
     * Post creator ID (if post still can be edited)
     */
    created_by?: number;
    /**
     * Information whether the post is pinned
     */
    is_pinned?: number;
    copy_history?: WallWallpost[];
    can_edit?: BaseBoolInt;
    can_delete?: BaseBoolInt;
    can_pin?: BaseBoolInt;
    comments?: BaseCommentsInfo;
    marked_as_ads?: BaseBoolInt;
}

export type WallWallpostFull = WallWallpost & WallWallpostFull1;

export interface WallWallpostToId {
    /**
     * ID of the source post owner
     */
    copy_owner_id?: number;
    /**
     * ID of the source post
     */
    copy_post_id?: number;
    /**
     * Date of publishing in Unixtime
     */
    date?: number;
    /**
     * Post author ID
     */
    from_id?: number;
    /**
     * Post ID
     */
    id?: number;
    /**
     * wall post ID (if comment)
     */
    post_id?: number;
    /**
     * Post signer ID
     */
    signer_id?: number;
    /**
     * Post text
     */
    text?: string;
    /**
     * Wall owner's ID
     */
    to_id?: number;
    [key: string]: any;
    attachments?: WallWallpostAttachment[];
}

export interface WidgetsCommentMedia {
    /**
     * Media item ID
     */
    item_id?: number;
    /**
     * Media owner's ID
     */
    owner_id?: number;
    /**
     * URL of the preview image (type=photo only)
     */
    thumb_src?: string;
    [key: string]: any;
}

export type WidgetsCommentMediaType = "audio" | "photo" | "video";

export interface WidgetsCommentReplies {
    /**
     * Comments number
     */
    count?: number;
    [key: string]: any;
    replies?: WidgetsCommentRepliesItem[];
}

export interface WidgetsCommentRepliesItem {
    /**
     * Comment ID
     */
    cid?: number;
    /**
     * Date when the comment has been added in Unixtime
     */
    date?: number;
    /**
     * Comment text
     */
    text?: string;
    /**
     * User ID
     */
    uid?: number;
    [key: string]: any;
}

export interface WidgetsWidgetComment {
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
    post_type: number;
    /**
     * Comment text
     */
    text: string;
    /**
     * Wall owner
     */
    to_id: number;
    [key: string]: any;
    attachments?: WallCommentAttachment[];
}

export interface WidgetsWidgetLikes {
    /**
     * Likes number
     */
    count?: number;
    [key: string]: any;
}

export interface WidgetsWidgetPage {
    /**
     * Date when widgets on the page has been initialized firstly in Unixtime
     */
    date?: number;
    /**
     * Page description
     */
    description?: string;
    /**
     * Page ID
     */
    id?: number;
    /**
     * page_id parameter value
     */
    page_id?: string;
    /**
     * URL of the preview image
     */
    photo?: string;
    /**
     * Page title
     */
    title?: string;
    /**
     * Page absolute URL
     */
    url?: string;
    [key: string]: any;
}

