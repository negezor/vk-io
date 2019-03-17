/* tslint:disable */
export interface AccountAccountCounters {
    /**
     * New friends requests number
     */
    friends?: number;
    /**
     * New messages number
     */
    messages?: number;
    /**
     * New photo tags number
     */
    photos?: number;
    /**
     * New video tags number
     */
    videos?: number;
    /**
     * New gifts number
     */
    gifts?: number;
    /**
     * New events number
     */
    events?: number;
    /**
     * New groups number
     */
    groups?: number;
    /**
     * New notifications number
     */
    notifications?: number;
    /**
     * New app requests number
     */
    app_requests?: number;
    /**
     * New friends suggestions number
     */
    friends_suggestions?: number;
    [key: string]: any;
}

export interface AccountLookupResult {
    [key: string]: any;
    found?: AccountUserXtrContact[];
    other?: AccountOtherContact[];
}

export type AccountNameRequestStatus = "success" | "processing" | "declined" | "was_accepted" | "was_declined";

export interface AccountNameRequest {
    /**
     * Request ID needed to cancel the request
     */
    id?: number;
    /**
     * First name in request
     */
    first_name?: string;
    /**
     * Last name in request
     */
    last_name?: string;
    [key: string]: any;
}

export interface AccountOffer {
    /**
     * Offer ID
     */
    id?: number;
    /**
     * Offer title
     */
    title?: string;
    /**
     * Instruction how to process the offer
     */
    instruction?: string;
    /**
     * Instruction how to process the offer (HTML format)
     */
    instruction_html?: string;
    /**
     * Offer short description
     */
    short_description?: string;
    /**
     * Offer description
     */
    description?: string;
    /**
     * URL of the preview image
     */
    img?: string;
    /**
     * Offer tag
     */
    tag?: string;
    /**
     * Offer price
     */
    price?: number;
    [key: string]: any;
}

export type AccountOnoffOptions = "on" | "off";

export interface AccountOtherContact {
    /**
     * Contact
     */
    contact?: string;
    /**
     * Mutual friends count
     */
    common_count?: number;
    [key: string]: any;
}

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
     * Peer ID
     */
    peer_id?: number;
    /**
     * Time until that notifications are disabled in seconds
     */
    disabled_until?: number;
    [key: string]: any;
}

export type AccountPushParamsMode = "on" | "off" | "no_sound" | "no_text";

export type AccountPushParamsSettings = "on" | "off" | "fr_of_fr";

export interface AccountPushParams {
    [key: string]: any;
    msg?: AccountPushParamsMode[];
    chat?: AccountPushParamsMode[];
    friend?: AccountOnoffOptions[];
    friend_found?: AccountOnoffOptions[];
    friend_accepted?: AccountOnoffOptions[];
    reply?: AccountOnoffOptions[];
    comment?: AccountPushParamsSettings[];
    mention?: AccountPushParamsSettings[];
    like?: AccountPushParamsSettings[];
    repost?: AccountPushParamsSettings[];
    wall_post?: AccountOnoffOptions[];
    wall_publish?: AccountOnoffOptions[];
    group_invite?: AccountOnoffOptions[];
    group_accepted?: AccountOnoffOptions[];
    event_soon?: AccountOnoffOptions[];
    photos_tag?: AccountPushParamsSettings[];
    app_request?: AccountOnoffOptions[];
    sdk_open?: AccountOnoffOptions[];
    new_post?: AccountOnoffOptions[];
    birthday?: AccountOnoffOptions[];
}

export interface AccountPushSettings {
    /**
     * Time until that notifications are disabled in Unixtime
     */
    disabled_until?: number;
    [key: string]: any;
}

export interface AccountUserSettings {
    /**
     * User first name
     */
    first_name?: string;
    /**
     * User last name
     */
    last_name?: string;
    /**
     * User maiden name
     */
    maiden_name?: string;
    /**
     * Domain name of the user's page
     */
    screen_name?: string;
    /**
     * User relationship status
     */
    relation?: number;
    /**
     * Information whether relation status is pending
     */
    relation_pending?: number;
    /**
     * User's date of birth
     */
    bdate?: string;
    /**
     * Information whether user's birthdate are hidden
     */
    bdate_visibility?: number;
    /**
     * User's hometown
     */
    home_town?: string;
    /**
     * User status
     */
    status?: string;
    /**
     * User phone number with some hidden digits
     */
    phone?: string;
    [key: string]: any;
    relation_requests?: UsersUserMin[];
}

export interface AccountUserXtrContact1 {
    contact?: string;
    request_sent?: number;
    sort_num?: number;
}

export type AccountUserXtrContact = UsersUserFull & AccountUserXtrContact1;

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

export type AdsAccessRole = "admin" | "manager" | "reports";

export interface AdsAccesses {
    /**
     * Client ID
     */
    client_id?: string;
    [key: string]: any;
}

export type AdsAccountType = "general" | "agency";

export interface AdsAccount {
    /**
     * Account ID
     */
    account_id: number;
    [key: string]: any;
}

export type AdsAdCostType = 0 | 1;

export type AdsAdStatus = 0 | 1 | 2;

export type AdsAdApproved = 0 | 1 | 2 | 3;

export interface AdsAd {
    /**
     * Ad ID
     */
    id: number;
    /**
     * Campaign ID
     */
    campaign_id: number;
    /**
     * Ad format
     */
    ad_format: number;
    /**
     * Cost of a click, kopecks
     */
    cpc?: number;
    /**
     * Cost of 1000 impressions, kopecks
     */
    cpm?: number;
    /**
     * Impressions limit
     */
    impressions_limit?: number;
    /**
     * Total limit
     */
    all_limit: number;
    /**
     * Category ID
     */
    category1_id?: number;
    /**
     * Additional category ID
     */
    category2_id?: number;
    /**
     * Ad title
     */
    name: string;
    [key: string]: any;
}

export type AdsAdLayoutCostType = 0 | 1;

export interface AdsAdLayout {
    /**
     * Ad ID
     */
    id: number;
    /**
     * Campaign ID
     */
    campaign_id: number;
    /**
     * Ad format
     */
    ad_format: number;
    /**
     * Ad title
     */
    title: string;
    /**
     * Ad description
     */
    description: string;
    /**
     * URL of advertised object
     */
    link_url: string;
    /**
     * Domain of advertised object
     */
    link_domain?: string;
    /**
     * Image URL
     */
    image_src: number;
    /**
     * URL of the preview image in double size
     */
    image_src_2x?: number;
    [key: string]: any;
}

export type AdsCampaignType = "normal" | "vk_apps_managed" | "mobile_apps" | "promoted_posts";

export type AdsCampaignStatus = 0 | 1 | 2;

export interface AdsCampaign {
    /**
     * Campaign ID
     */
    id: number;
    /**
     * Campaign title
     */
    name: string;
    /**
     * Campaign's day limit, rubles
     */
    day_limit: string;
    /**
     * Campaign's total limit, rubles
     */
    all_limit: string;
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
     * Client ID
     */
    id: number;
    /**
     * Client name
     */
    name: string;
    /**
     * Client's day limit, rubles
     */
    day_limit: string;
    /**
     * Client's total limit, rubles
     */
    all_limit: string;
    [key: string]: any;
}

export type AdsCriteriaSex = 0 | 1 | 2;

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
     * Days to birthday
     */
    birthday?: number;
    /**
     * Country ID
     */
    country?: number;
    /**
     * Cities IDs
     */
    cities?: string;
    /**
     * Cities IDs to except
     */
    cities_not?: string;
    /**
     * Relationship statuses
     */
    statuses?: string;
    /**
     * Communities IDs
     */
    groups?: string;
    /**
     * Apps IDs
     */
    apps?: string;
    /**
     * Apps IDs to except
     */
    apps_not?: string;
    /**
     * Districts IDs
     */
    districts?: string;
    /**
     * Stations IDs
     */
    stations?: string;
    /**
     * Streets IDs
     */
    streets?: string;
    /**
     * Schools IDs
     */
    schools?: string;
    /**
     * Positions IDs
     */
    positions?: string;
    /**
     * Religions IDs
     */
    religions?: string;
    /**
     * Interests
     */
    interests?: string;
    /**
     * Interests categories IDs
     */
    interest_categories?: string;
    /**
     * Devices
     */
    user_devices?: string;
    /**
     * Operating systems
     */
    user_os?: string;
    /**
     * Browsers
     */
    user_browsers?: string;
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
     * University graduation year from
     */
    uni_from?: number;
    /**
     * University graduation year to
     */
    uni_to?: number;
    [key: string]: any;
}

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
    sex?: AdsStatsSex[];
    age?: AdsStatsAge[];
    sex_age?: AdsStatsSexAge[];
    cities?: AdsStatsCities[];
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
     * Link status
     */
    status: string;
    /**
     * Reject reason
     */
    description: string;
    /**
     * URL
     */
    redirect_url: string;
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

export interface AdsStatsFormat {
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
    /**
     * Spent funds
     */
    spent?: number;
    /**
     * Impressions number
     */
    impressions?: number;
    /**
     * Clicks number
     */
    clicks?: number;
    /**
     * Reach
     */
    reach?: number;
    /**
     * Video views number
     */
    video_views?: number;
    /**
     * Video views (half of video)
     */
    video_views_half?: number;
    /**
     * Video views (full video)
     */
    video_views_full?: number;
    /**
     * Clickthoughs to the advertised site
     */
    video_clicks_site?: number;
    /**
     * Events number
     */
    join_rate?: number;
    [key: string]: any;
}

export interface AdsStatsAge {
    /**
     * Impressions rate
     */
    impressions_rate?: number;
    /**
     * Clicks rate
     */
    clicks_rate?: number;
    /**
     * Age interval
     */
    value?: string;
    [key: string]: any;
}

export interface AdsStatsCities {
    /**
     * Impressions rate
     */
    impressions_rate?: number;
    /**
     * Clicks rate
     */
    clicks_rate?: number;
    /**
     * City ID
     */
    value?: number;
    /**
     * City name
     */
    name?: string;
    [key: string]: any;
}

export type AdsStatsSexValue = "f" | "m";

export interface AdsStatsSex {
    /**
     * Impressions rate
     */
    impressions_rate?: number;
    /**
     * Clicks rate
     */
    clicks_rate?: number;
    [key: string]: any;
}

export interface AdsStatsSexAge {
    /**
     * Impressions rate
     */
    impressions_rate?: number;
    /**
     * Clicks rate
     */
    clicks_rate?: number;
    /**
     * Sex and age interval
     */
    value?: string;
    [key: string]: any;
}

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

export type AdsTargSuggestionsSchoolsType = "school" | "university" | "faculty" | "chair";

export interface AdsTargSuggestionsSchools {
    /**
     * School ID
     */
    id?: number;
    /**
     * School title
     */
    name?: string;
    /**
     * Full school title
     */
    desc?: string;
    /**
     * City name
     */
    parent?: string;
    [key: string]: any;
}

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

export interface AdsTargetGroup {
    /**
     * Group ID
     */
    id?: number;
    /**
     * Group name
     */
    name?: string;
    /**
     * Site domain
     */
    domain?: string;
    /**
     * Audience
     */
    audience_count?: number;
    /**
     * Number of days for user to be in group
     */
    lifetime?: number;
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

export interface AdsPostStats1 {
    /**
     * Object ID
     */
    ad_id?: number;
}

export type AdsPostStats = AdsPostStats1 & StatsWallpostStat;

export type AppsAppType = "app" | "game" | "site" | "standalone";

export type AppsAppLeaderboardType = 0 | 1 | 2;

export interface AppsApp {
    /**
     * Application ID
     */
    id: number;
    /**
     * Application title
     */
    title: string;
    /**
     * Screen name
     */
    screen_name?: string;
    /**
     * Application description
     */
    description?: string;
    /**
     * URL of the app icon with 279 px in width
     */
    icon_278?: string;
    /**
     * URL of the app icon with 150 px in width
     */
    icon_150?: string;
    /**
     * URL of the app icon with 139 px in width
     */
    icon_139?: string;
    /**
     * URL of the app icon with 75 px in width
     */
    icon_75?: string;
    /**
     * URL of the app banner with 560 px in width
     */
    banner_560?: string;
    /**
     * URL of the app banner with 1120 px in width
     */
    banner_1120?: string;
    /**
     * Application section name
     */
    section?: string;
    /**
     * Application author's URL
     */
    author_url?: string;
    /**
     * Application author's ID
     */
    author_id?: number;
    /**
     * Official community's ID
     */
    author_group?: number;
    /**
     * Members number
     */
    members_count?: number;
    /**
     * Date when the application has been published in Unixtime
     */
    published_date?: number;
    /**
     * Catalog position
     */
    catalog_position?: number;
    /**
     * Information whether the application is multilanguage
     */
    international?: number;
    /**
     * Genre ID
     */
    genre_id?: number;
    /**
     * Genre name
     */
    genre?: string;
    /**
     * Application ID in store
     */
    platform_id?: number;
    /**
     * Information whether application is in mobile catalog
     */
    is_in_catalog?: number;
    [key: string]: any;
    screenshots?: PhotosPhoto[];
}

export interface AppsLeaderboard {
    /**
     * Score number
     */
    score?: number;
    /**
     * Level
     */
    level?: number;
    /**
     * Points number
     */
    points?: number;
    /**
     * User ID
     */
    user_id: number;
    [key: string]: any;
}

export interface AudioAudio {
    /**
     * Audio ID
     */
    id: number;
    /**
     * Audio owner's ID
     */
    owner_id: number;
    /**
     * Artist name
     */
    artist: string;
    /**
     * Title
     */
    title: string;
    /**
     * URL of mp3 file
     */
    url?: string;
    /**
     * Access key for the audio
     */
    access_key?: string;
    [key: string]: any;
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
    is_hq?: BaseBoolInt;
}

export type AudioAudioFull = AudioAudio & AudioAudioFull1;

export interface AudioLyrics {
    /**
     * Lyrics ID
     */
    lyrics_id: number;
    /**
     * Lyrics text
     */
    text: string;
    [key: string]: any;
}

export interface AudioAudioUploadResponse {
    /**
     * Redirect URL
     */
    redirect?: string;
    /**
     * Upload server number
     */
    server?: number;
    /**
     * Uploaded aduio data
     */
    audio?: string;
    /**
     * Uploading hash
     */
    hash?: string;
    [key: string]: any;
}

export type BaseBoolInt = 0 | 1;

export interface BaseUploadServer {
    /**
     * Upload URL
     */
    upload_url: string;
    [key: string]: any;
}

export interface BaseCommentsInfo {
    /**
     * Comments number
     */
    count?: number;
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

export interface BaseGeo {
    /**
     * Place type
     */
    type?: string;
    /**
     * Information whether a map is showed
     */
    showmap?: number;
    [key: string]: any;
}

export interface BaseGeoCoordinates {
    [key: string]: any;
    latitude: number;
    longitude: number;
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

export interface BaseLikes {
    /**
     * Likes number
     */
    count?: number;
    [key: string]: any;
}

export interface BaseLink {
    /**
     * Link URL
     */
    url: string;
    /**
     * Link title
     */
    title?: string;
    /**
     * Link caption
     */
    caption?: string;
    /**
     * Link description
     */
    description?: string;
    /**
     * URL of the page with article preview
     */
    preview_url?: string;
    /**
     * String ID of the page with article preview
     */
    preview_page?: string;
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

export interface BaseLinkRating {
    /**
     * Count of stars
     */
    stars?: number;
    /**
     * Count of reviews
     */
    reviews_count?: number;
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

export interface BaseObjectCount {
    /**
     * Items count
     */
    count?: number;
    [key: string]: any;
}

export type BaseOkResponse = 1;

export interface BasePlace {
    /**
     * Place ID
     */
    id?: number;
    /**
     * Place title
     */
    title?: string;
    /**
     * Place latitude
     */
    latitude?: number;
    /**
     * Place longitude
     */
    longitude?: number;
    /**
     * Date of the place creation in Unixtime
     */
    created?: number;
    /**
     * URL of the place's icon
     */
    icon?: string;
    /**
     * Checkins number
     */
    checkins?: number;
    /**
     * Place type
     */
    type?: string;
    /**
     * Country name
     */
    country?: string;
    /**
     * City name
     */
    city?: string;
    /**
     * Place address
     */
    address?: string;
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

export interface BaseSticker {
    /**
     * Sticker ID
     */
    sticker_id?: number;
    /**
     * Collection ID
     */
    product_id?: number;
    [key: string]: any;
    images?: BaseImage[];
    images_with_background?: BaseImage[];
}

export interface BaseUserId {
    /**
     * User ID
     */
    user_id?: number;
    [key: string]: any;
}

export type BaseSex = 0 | 1 | 2;

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
}

export type BoardDefaultOrder = 1 | 2 | -1 | -2;

export interface BoardTopicPoll {
    /**
     * Poll ID
     */
    poll_id: number;
    /**
     * Poll owner's ID
     */
    owner_id: number;
    /**
     * Date when poll has been created in Unixtime
     */
    created: number;
    /**
     * Poll question
     */
    question: string;
    /**
     * Votes number
     */
    votes: string;
    /**
     * Current user's answer ID
     */
    answer_id: number;
    [key: string]: any;
    answers: PollsAnswer[];
}

export interface BoardTopic {
    /**
     * Topic ID
     */
    id?: number;
    /**
     * Topic title
     */
    title?: string;
    /**
     * Date when the topic has been created in Unixtime
     */
    created?: number;
    /**
     * Creator ID
     */
    created_by?: number;
    /**
     * Date when the topic has been updated in Unixtime
     */
    updated?: number;
    /**
     * ID of user who updated the topic
     */
    updated_by?: number;
    /**
     * Comments number
     */
    comments?: number;
    [key: string]: any;
}

export interface BoardTopicComment {
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
    real_offset?: number;
    [key: string]: any;
    attachments?: WallCommentAttachment[];
}

export interface MessagesConversation {
    /**
     * ID of the last read incoming message
     */
    in_read?: number;
    /**
     * ID of the last read outcoming message
     */
    out_read?: number;
    /**
     * Number of unread messages
     */
    unread_count?: number;
    /**
     * True, if the conversation marked as important (only for community messages)
     */
    important?: boolean;
    /**
     * True, if the conversation marked as unanswered (only for community messages)
     */
    unanswered?: boolean;
    [key: string]: any;
}

export interface MessagesConversationCanWrite {
    /**
     * True, if the user can send message to the conversation
     */
    allowed?: boolean;
    /**
     * Error code for allowed = false
     */
    reason?: 18 | 203 | 900 | 901 | 902 | 915 | 916 | 917 | 918;
    [key: string]: any;
}

export interface MessagesConversationChatSettings {
    /**
     * Conversation members number
     */
    members_count?: number;
    /**
     * Conversation title
     */
    title?: string;
    [key: string]: any;
}

export interface MessagesConversationPeer {
    /**
     * Destination ID
     */
    id?: number;
    /**
     * Conversation type. possible values: user, chat, group, email
     */
    type?: string;
    /**
     * Local destination ID. For conversations — id - 2000000000, for community — -id, for e-mail — -(id+2000000000)
     */
    local_id?: number;
    [key: string]: any;
}

export interface MessagesConversationPushSettings {
    /**
     * Timestamp, to which notification are disables
     */
    disabled_until?: number;
    /**
     * True, if notifications are disabled totally
     */
    disabled_forever?: boolean;
    /**
     * True, if notification alert sound is disabled
     */
    no_sound?: boolean;
    [key: string]: any;
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

export interface DatabaseStreet {
    /**
     * Street ID
     */
    id?: number;
    /**
     * Street title
     */
    title?: string;
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
    url?: string;
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
    access_key?: string;
    [key: string]: any;
}

export interface DocsDocTypes {
    /**
     * Doc type ID
     */
    id?: number;
    /**
     * Doc type title
     */
    title?: string;
    /**
     * Number of docs
     */
    count?: number;
    [key: string]: any;
}

export interface DocsDocUploadResponse {
    /**
     * Uploaded file data
     */
    file?: string;
    [key: string]: any;
}

export interface DocsDocPreview {
    [key: string]: any;
}

export interface DocsDocPreviewPhoto {
    [key: string]: any;
    sizes?: PhotosPhotoSizes[];
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
    filesize: number;
    [key: string]: any;
}

export interface FaveFavesLink {
    /**
     * Link ID
     */
    id?: number;
    /**
     * Link URL
     */
    url?: string;
    /**
     * Link title
     */
    title?: string;
    /**
     * Link description
     */
    description?: string;
    /**
     * URL of the preview image with 50 px in width
     */
    photo_50?: string;
    /**
     * URL of the preview image with 100 px in width
     */
    photo_100?: string;
    /**
     * URL of the preview image with 200 px in width
     */
    photo_200?: string;
    [key: string]: any;
}

export interface FriendsFriendsList {
    /**
     * List title
     */
    name: string;
    /**
     * List ID
     */
    id: number;
    [key: string]: any;
}

export interface FriendsRequests {
    /**
     * User ID
     */
    user_id?: number;
    /**
     * ID of the user by whom friend has been suggested
     */
    from?: string;
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
     * User ID
     */
    user_id?: number;
    /**
     * ID of the user by whom friend has been suggested
     */
    from?: string;
    /**
     * Message sent with a request
     */
    message?: string;
    [key: string]: any;
}

export interface FriendsMutualFriend {
    /**
     * User ID
     */
    id?: number;
    /**
     * Total mutual friends number
     */
    common_count?: number;
    /**
     * User ID
     */
    common_friends?: number[];
    [key: string]: any;
}

export type FriendsFriendStatusStatus = 0 | 1 | 2 | 3;

export interface FriendsFriendStatus {
    /**
     * User ID
     */
    user_id: number;
    /**
     * Message sent with request
     */
    request_message?: string;
    /**
     * MD5 hash for the result validation
     */
    sign?: string;
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
     * URL of the preview image with 96 px in width
     */
    thumb_96?: string;
    /**
     * URL of the preview image with 48 px in width
     */
    thumb_48?: string;
    [key: string]: any;
}

export type GiftsGiftPrivacy = 0 | 1 | 2;

export interface GiftsGift {
    /**
     * Gift ID
     */
    id?: number;
    /**
     * Gift sender ID
     */
    from_id?: number;
    /**
     * Comment text
     */
    message?: string;
    /**
     * Date when gist has been sent in Unixtime
     */
    date?: number;
    /**
     * Hash
     */
    gift_hash?: string;
    [key: string]: any;
}

export type GroupsBanInfoReason = 0 | 1 | 2 | 3 | 4;

export interface GroupsBanInfo {
    /**
     * Administrator ID
     */
    admin_id?: number;
    /**
     * Date when user has been added to blacklist in Unixtime
     */
    date?: number;
    /**
     * Comment for a ban
     */
    comment?: string;
    /**
     * Date when user will be removed from blacklist in Unixtime
     */
    end_date?: number;
    [key: string]: any;
}

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
    subcategories?: GroupsGroupCategory[];
    page_previews: GroupsGroup[];
}

export interface GroupsContactsItem {
    /**
     * User ID
     */
    user_id?: number;
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
    [key: string]: any;
}

export interface GroupsCountersGroup {
    /**
     * Photos number
     */
    photos?: number;
    /**
     * Photo albums number
     */
    albums?: number;
    /**
     * Topics number
     */
    topics?: number;
    /**
     * Videos number
     */
    videos?: number;
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
    [key: string]: any;
}

export interface GroupsCover {
    [key: string]: any;
    images?: BaseImage[];
}

export interface GroupsGroupBanInfo {
    /**
     * End date of ban in Unixtime
     */
    end_date?: number;
    /**
     * Ban comment
     */
    comment?: string;
    [key: string]: any;
}

export type GroupsGroupIsClosed = 0 | 1 | 2;

export type GroupsGroupType = "group" | "page" | "event";

export type GroupsGroupAdminLevel = 1 | 2 | 3;

export interface GroupsGroup {
    /**
     * Community ID
     */
    id?: number;
    /**
     * Community name
     */
    name?: string;
    /**
     * Domain of the community page
     */
    screen_name?: string;
    /**
     * Information whether community is banned
     */
    deactivated?: string;
    /**
     * URL of square photo of the community with 50 pixels in width
     */
    photo_50?: string;
    /**
     * URL of square photo of the community with 100 pixels in width
     */
    photo_100?: string;
    /**
     * URL of square photo of the community with 200 pixels in width
     */
    photo_200?: string;
    [key: string]: any;
}

export type GroupsGroupFullMemberStatus = 0 | 1 | 2 | 3 | 4 | 5;

export type GroupsGroupFullMainSection = 0 | 1 | 2 | 3 | 4 | 5;

export type GroupsGroupFullAgeLimits = 1 | 2 | 3;

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
     * Start date of event in Unixtime
     */
    start_date?: number;
    /**
     * Finish date of event in Unixtime
     */
    finish_date?: number;
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
    online_status?: GroupsOnlineStatus;
    age_limits?: GroupsGroupFullAgeLimits;
    ban_info?: GroupsGroupBanInfo;
}

export type GroupsGroupFull = GroupsGroup & GroupsGroupFull1;

export type GroupsGroupXtrInvitedByType = "group" | "page" | "event";

export type GroupsGroupXtrInvitedByAdminLevel = 1 | 2 | 3;

export interface GroupsGroupXtrInvitedBy {
    /**
     * Community ID
     */
    id?: string;
    /**
     * Community name
     */
    name?: string;
    /**
     * Domain of the community page
     */
    screen_name?: string;
    /**
     * URL of square photo of the community with 50 pixels in width
     */
    photo_50?: string;
    /**
     * URL of square photo of the community with 100 pixels in width
     */
    photo_100?: string;
    /**
     * URL of square photo of the community with 200 pixels in width
     */
    photo_200?: string;
    /**
     * Inviter ID
     */
    invited_by?: number;
    [key: string]: any;
}

export interface GroupsGroupLink {
    /**
     * Link ID
     */
    id?: number;
    /**
     * Link URL
     */
    url?: string;
    /**
     * Link description
     */
    desc?: string;
    [key: string]: any;
}

export interface GroupsLinksItem {
    /**
     * Link ID
     */
    id?: number;
    /**
     * Link URL
     */
    url?: string;
    /**
     * Link title
     */
    name?: string;
    /**
     * Link description
     */
    desc?: string;
    /**
     * URL of square image of the link with 50 pixels in width
     */
    photo_50?: string;
    /**
     * URL of square image of the link with 100 pixels in width
     */
    photo_100?: string;
    [key: string]: any;
}

export interface GroupsMarketInfo {
    /**
     * Minimum price
     */
    price_min?: number;
    /**
     * Maximum price
     */
    price_max?: number;
    /**
     * Main market album ID
     */
    main_album_id?: number;
    /**
     * Contact person ID
     */
    contact_id?: number;
    /**
     * Currency name
     */
    currency_text?: string;
    [key: string]: any;
}

export type GroupsMemberRoleStatus = "moderator" | "editor" | "administrator" | "creator";

export interface GroupsMemberRole {
    /**
     * User ID
     */
    id?: number;
    [key: string]: any;
}

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

export interface GroupsGroupCategoryType {
    [key: string]: any;
    id?: number;
    name?: string;
}

export interface GroupsGroupPublicCategoryList {
    [key: string]: any;
    id?: number;
    name?: string;
    subtypes_list?: GroupsGroupCategoryType[];
}

export interface GroupsGroupSettings {
    /**
     * Community title
     */
    title?: string;
    /**
     * Community description
     */
    description?: string;
    /**
     * Community's page domain
     */
    address?: string;
    /**
     * Wall settings
     */
    wall?: number;
    /**
     * Photos settings
     */
    photos?: number;
    /**
     * Video settings
     */
    video?: number;
    /**
     * Audio settings
     */
    audio?: number;
    /**
     * Docs settings
     */
    docs?: number;
    /**
     * Topics settings
     */
    topics?: number;
    /**
     * Wiki settings
     */
    wiki?: number;
    /**
     * Information about the group category
     */
    public_category?: number;
    /**
     * Information about the group subcategory
     */
    public_subcategory?: number;
    /**
     * The list of stop words
     */
    obscene_words?: string;
    /**
     * Community access settings
     */
    access?: number;
    /**
     * Community subject ID
     */
    subject?: number;
    /**
     * URL of the RSS feed
     */
    rss?: string;
    /**
     * Community website
     */
    website?: string;
    [key: string]: any;
    public_category_list?: GroupsGroupPublicCategoryList[];
    subject_list?: GroupsSubjectItem[];
}

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

export type GroupsOwnerXtrBanInfoType = "group" | "profile";

export interface GroupsOwnerXtrBanInfo {
    [key: string]: any;
}

export type GroupsRoleOptions = "moderator" | "editor" | "administrator" | "creator";

export interface GroupsUserXtrRole1 {
    role?: GroupsRoleOptions;
}

export type GroupsUserXtrRole = UsersUserFull & GroupsUserXtrRole1;

export interface GroupsTokenPermissionSetting {
    [key: string]: any;
    setting: number;
    name: string;
}

export interface GroupsTokenPermissions {
    [key: string]: any;
    mask: number;
    permissions?: GroupsTokenPermissionSetting[];
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
    ts: number;
    [key: string]: any;
}

export interface GroupsLongPollSettings {
    /**
     * Shows whether Long Poll is enabled
     */
    is_enabled: boolean;
    /**
     * API version used for the events
     */
    api_version?: string;
    [key: string]: any;
}

export interface GroupsCallbackSettings {
    /**
     * API version used for the events
     */
    api_version?: string;
    [key: string]: any;
}

export interface GroupsLongPollEvents {
    [key: string]: any;
}

export type GroupsOnlineStatusType = "none" | "online" | "answer_mark";

/*Online status of group*/
export interface GroupsOnlineStatus {
    /**
     * Estimated time of answer (for status = answer_mark)
     */
    minutes?: number;
    [key: string]: any;
}

export interface LeadsLead {
    /**
     * Lead limit
     */
    limit?: number;
    /**
     * Amount of spent votes
     */
    spent?: number;
    /**
     * Offer cost
     */
    cost?: number;
    /**
     * Impressions number
     */
    impressions?: number;
    /**
     * Started offers number
     */
    started?: number;
    /**
     * Completed offers number
     */
    completed?: number;
    [key: string]: any;
}

export interface LeadsLeadDays {
    /**
     * Impressions number
     */
    impressions?: number;
    /**
     * Started offers number
     */
    started?: number;
    /**
     * Completed offers number
     */
    completed?: number;
    /**
     * Amount of spent votes
     */
    spent?: number;
    [key: string]: any;
}

export interface LeadsStart {
    /**
     * Session data
     */
    vk_sid?: string;
    [key: string]: any;
}

export type LeadsCheckedResult = "true" | "false";

export interface LeadsChecked {
    /**
     * Reason why user can't start the lead
     */
    reason?: string;
    /**
     * URL user should open to start the lead
     */
    start_link?: string;
    /**
     * Session ID
     */
    sid?: string;
    [key: string]: any;
}

export interface LeadsComplete {
    /**
     * Offer limit
     */
    limit?: number;
    /**
     * Amount of spent votes
     */
    spent?: number;
    /**
     * Offer cost
     */
    cost?: number;
    [key: string]: any;
}

export interface LeadsEntry {
    /**
     * User ID
     */
    uid?: number;
    /**
     * Application ID
     */
    aid?: number;
    /**
     * Session string ID
     */
    sid?: string;
    /**
     * Date when the action has been started in Unixtime
     */
    date?: number;
    /**
     * Action type
     */
    status?: number;
    /**
     * Start date in Unixtime (for status=2)
     */
    start_date?: number;
    /**
     * Comment text
     */
    comment?: string;
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

export type MarketMarketItemAvailability = 0 | 1 | 2;

export interface MarketMarketItem {
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
     * Item description
     */
    description: string;
    /**
     * Date when the item has been created in Unixtime
     */
    date: number;
    /**
     * URL of the preview image
     */
    thumb_photo: string;
    [key: string]: any;
}

export interface MarketMarketItemFull1 {
    /**
     * Views number
     */
    views_count?: number;
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

export interface MessagesHistoryAttachment {
    /**
     * Message ID
     */
    message_id?: number;
    [key: string]: any;
}

export type MessagesHistoryMessageAttachmentType = "photo" | "video" | "audio" | "doc" | "link" | "market" | "wall" | "share";

export interface MessagesHistoryMessageAttachment {
    [key: string]: any;
}

export type MessagesMessageAttachmentType = "photo" | "audio" | "video" | "doc" | "link" | "market" | "market_market_album" | "gift" | "sticker" | "wall" | "wall_reply";

export interface MessagesMessageAttachment {
    [key: string]: any;
}

export interface MessagesChat {
    /**
     * Chat ID
     */
    id: number;
    /**
     * Chat type
     */
    type: string;
    /**
     * Chat title
     */
    title?: string;
    /**
     * Chat creator ID
     */
    admin_id: number;
    /**
     * User ID
     */
    users: number[];
    /**
     * URL of the preview image with 50 px in width
     */
    photo_50?: string;
    /**
     * URL of the preview image with 100 px in width
     */
    photo_100?: string;
    /**
     * URL of the preview image with 200 px in width
     */
    photo_200?: string;
    [key: string]: any;
}

export interface MessagesChatFull {
    /**
     * Chat ID
     */
    id: number;
    /**
     * Chat type
     */
    type: string;
    /**
     * Chat title
     */
    title?: string;
    /**
     * Chat creator ID
     */
    admin_id: number;
    /**
     * URL of the preview image with 50 px in width
     */
    photo_50?: string;
    /**
     * URL of the preview image with 100 px in width
     */
    photo_100?: string;
    /**
     * URL of the preview image with 200 px in width
     */
    photo_200?: string;
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

export interface MessagesDialog {
    /**
     * Information whether unread messages are in the dialog
     */
    unread?: number;
    /**
     * ID of the last message read by current user
     */
    in_read?: number;
    /**
     * ID of the last message read by the others
     */
    out_read?: number;
    [key: string]: any;
}

export interface MessagesLastActivity {
    /**
     * Time when user was online in Unixtime
     */
    time: number;
    [key: string]: any;
}

export interface MessagesLongpollParams {
    /**
     * Key
     */
    key?: string;
    /**
     * Server URL
     */
    server?: string;
    /**
     * Timestamp
     */
    ts?: number;
    /**
     * Persistent timestamp
     */
    pts?: number;
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

/*Description of the action, that should be performed on button click*/
export interface MessagesKeyboardButtonAction {
    /**
     * Button type
     */
    type: "text" | "start";
    /**
     * Additional data sent along with message for developer convenience
     */
    payload?: string;
    /**
     * Label for button
     */
    label?: string;
    [key: string]: any;
}

export interface MessagesKeyboardButton {
    /**
     * Button color
     */
    color: "default" | "positive" | "negative" | "primary";
    [key: string]: any;
}

export interface MessagesKeyboard {
    /**
     * Should this keyboard disappear on first use
     */
    one_time: boolean;
    /**
     * Community or bot, which set this keyboard
     */
    author_id?: number;
    [key: string]: any;
    buttons: MessagesKeyboardButton[][];
}

export type MessagesMessageActionStatus = "chat_photo_update" | "chat_photo_remove" | "chat_create" | "chat_title_update" | "chat_invite_user" | "chat_kick_user" | "chat_pin_message" | "chat_unpin_message" | "chat_invite_user_by_link";

export interface MessagesMessage {
    /**
     * Message ID
     */
    id: number;
    /**
     * Unique auto-incremented number for all messages with this peer
     */
    conversation_message_id?: number;
    /**
     * Date when the message has been sent in Unixtime
     */
    date: number;
    /**
     * Peer ID
     */
    peer_id: number;
    /**
     * Message author's ID
     */
    from_id: number;
    /**
     * Date when the message has been updated in Unixtime
     */
    update_time?: number;
    /**
     * ID used for sending messages. It returned only for outgoing messages
     */
    random_id?: number;
    /**
     * Is it an important message
     */
    important?: boolean;
    /**
     * Message text
     */
    text: string;
    [key: string]: any;
    payload?: string;
    fwd_messages?: MessagesFwdMessage[];
    attachments?: MessagesMessageAttachment[];
}

export interface MessagesPinnedMessage {
    /**
     * Message ID
     */
    id: number;
    /**
     * Unique auto-incremented number for all messages with this peer
     */
    conversation_message_id?: number;
    /**
     * Date when the message has been sent in Unixtime
     */
    date: number;
    /**
     * Peer ID
     */
    peer_id: number;
    /**
     * Message author's ID
     */
    from_id: number;
    /**
     * Message text
     */
    text: string;
    [key: string]: any;
    fwd_messages?: MessagesFwdMessage[];
    attachments?: MessagesMessageAttachment[];
}

export interface MessagesFwdMessage {
    /**
     * Date when the message has been sent in Unixtime
     */
    date?: number;
    /**
     * Message author's ID
     */
    from_id?: number;
    /**
     * Date when the message has been updated in Unixtime
     */
    update_time?: number;
    /**
     * Message text
     */
    text?: string;
    [key: string]: any;
    fwd_messages?: MessagesFwdMessage[];
    attachments?: MessagesMessageAttachment[];
}

export interface MessagesMessageAction {
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
    /**
     * Message ID
     */
    conversation_message_id?: number;
    /**
     * Email address for chat_invite_user or chat_kick_user actions
     */
    email?: string;
    [key: string]: any;
}

export interface MessagesMessageActionPhoto {
    /**
     * Image URL 50x50px
     */
    photo_50?: string;
    /**
     * Image URL 100x100px
     */
    photo_100?: string;
    /**
     * Image URL 200x200px
     */
    photo_200?: string;
    [key: string]: any;
}

export interface MessagesConversationWithMessage {
    [key: string]: any;
}

export interface MessagesConversationMember {
    /**
     * Conversation participant id
     */
    member_id?: number;
    /**
     * ID of the user who invited the member
     */
    invited_by?: number;
    /**
     * Date added to conversation
     */
    join_date?: number;
    /**
     * Is the user an administrator
     */
    is_admin?: boolean;
    /**
     * Can current user exclude member
     */
    can_kick?: boolean;
    [key: string]: any;
}

export interface MessagesChatSettingsPhoto {
    /**
     * URL of the preview image with 50px in width
     */
    photo_50?: string;
    /**
     * URL of the preview image with 100px in width
     */
    photo_100?: string;
    /**
     * URL of the preview image with 200px in width
     */
    photo_200?: string;
    [key: string]: any;
}

export type MessagesChatSettingsState = "in" | "kicked" | "left";

export interface MessagesUserXtrInvitedBy1 {
    /**
     * ID of the inviter
     */
    invited_by?: number;
}

export type MessagesUserXtrInvitedBy = UsersUserXtrType & MessagesUserXtrInvitedBy1;

export type NewsfeedNewsfeedItemType = "post" | "photo" | "photo_tag" | "wall_photo" | "friend" | "note" | "audio" | "video" | "topic";

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

export interface NewsfeedItemFriendFriends {
    /**
     * Number of friends has been added
     */
    count?: number;
    [key: string]: any;
    items?: BaseUserId[];
}

export interface NewsfeedItemFriend {
    [key: string]: any;
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

export type NewsfeedItemWallpostType = "post" | "copy" | "reply";

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
    copy_history?: WallWallpost[];
    attachments?: WallWallpostAttachment[];
}

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

export interface NewsfeedNewsfeedNote {
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
    /**
     * Comments Number
     */
    comments?: number;
    [key: string]: any;
}

export interface NewsfeedNewsfeedPhoto1 {
    likes?: BaseLikes;
    comments?: BaseObjectCount;
    can_comment?: BaseBoolInt;
    can_repost?: BaseBoolInt;
}

export type NewsfeedNewsfeedPhoto = PhotosPhoto & NewsfeedNewsfeedPhoto1;

export interface NotesNoteComment {
    /**
     * Comment ID
     */
    id: number;
    /**
     * Comment author's ID
     */
    uid: number;
    /**
     * Note ID
     */
    nid: number;
    /**
     * Note ID
     */
    oid: number;
    /**
     * Date when the comment has beed added in Unixtime
     */
    date: number;
    /**
     * Comment text
     */
    message: string;
    /**
     * ID of replied comment
     */
    reply_to?: number;
    [key: string]: any;
}

export interface NotesNote {
    /**
     * Note ID
     */
    id: number;
    /**
     * Note owner's ID
     */
    owner_id: number;
    /**
     * Comments number
     */
    comments: number;
    /**
     * Date when the note has been created in Unixtime
     */
    date: number;
    /**
     * Note title
     */
    title: string;
    /**
     * Note text
     */
    text?: string;
    /**
     * Note text in wiki format
     */
    text_wiki?: string;
    /**
     * URL of the page with note preview
     */
    view_url: string;
    [key: string]: any;
}

export interface NotificationsNotificationsComment {
    /**
     * Comment ID
     */
    id?: number;
    /**
     * Author ID
     */
    owner_id?: number;
    /**
     * Date when the comment has been added in Unixtime
     */
    date?: number;
    /**
     * Comment text
     */
    text?: string;
    [key: string]: any;
}

export type NotificationsNotificationParent = WallWallpostToId & PhotosPhoto & BoardTopic & VideoVideo & NotificationsNotificationsComment;

export interface NotificationsNotification {
    /**
     * Notification type
     */
    type?: string;
    /**
     * Date when the event has been occured
     */
    date?: number;
    [key: string]: any;
}

export interface NotificationsFeedback {
    /**
     * Item ID
     */
    id?: number;
    /**
     * Wall owner's ID
     */
    to_id?: number;
    /**
     * Reply author's ID
     */
    from_id?: number;
    /**
     * Reply text
     */
    text?: string;
    [key: string]: any;
    attachments?: WallWallpostAttachment[];
}

export interface NotificationsReply {
    /**
     * Reply ID
     */
    id?: number;
    /**
     * Date when the reply has been created in Unixtime
     */
    date?: number;
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

export interface OrdersOrder {
    /**
     * Order ID
     */
    id?: number;
    /**
     * App order ID
     */
    app_order_id?: number;
    /**
     * Order status
     */
    status?: string;
    /**
     * User ID
     */
    user_id?: number;
    /**
     * Receiver ID
     */
    receiver_id?: number;
    /**
     * Order item
     */
    item?: string;
    /**
     * Amount
     */
    amount?: number;
    /**
     * Date of creation in Unixtime
     */
    date?: number;
    /**
     * Transaction ID
     */
    transaction_id?: number;
    /**
     * Cancel transaction ID
     */
    cancel_transaction_id?: number;
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
     * Votes number
     */
    votes?: string;
    /**
     * Votes amount in user's currency
     */
    amount?: number;
    /**
     * Amount description
     */
    description?: string;
    [key: string]: any;
}

export type PagesPrivacySettings = 0 | 1 | 2;

export interface PagesWikipage {
    /**
     * Page ID
     */
    id: number;
    /**
     * Community ID
     */
    group_id: number;
    /**
     * Page title
     */
    title: string;
    /**
     * Views number
     */
    views: number;
    /**
     * Last editor ID
     */
    editor_id?: number;
    /**
     * Last editor name
     */
    editor_name?: string;
    /**
     * Page creator ID
     */
    creator_id?: number;
    /**
     * Page creator name
     */
    creator_name?: number;
    [key: string]: any;
}

export interface PagesWikipageFull {
    /**
     * Page ID
     */
    id: number;
    /**
     * Community ID
     */
    group_id: number;
    /**
     * Page title
     */
    title: string;
    /**
     * Date when the page has been edited in Unixtime
     */
    edited: number;
    /**
     * Date when the page has been created in Unixtime
     */
    created: number;
    /**
     * Views number
     */
    views: number;
    /**
     * Last editor ID
     */
    editor_id?: number;
    /**
     * Page creator ID
     */
    creator_id?: number;
    /**
     * Page content, wiki
     */
    source?: string;
    /**
     * Page content, HTML
     */
    html?: string;
    /**
     * URL of the page preview
     */
    view_url: string;
    [key: string]: any;
}

export interface PagesWikipageVersion {
    /**
     * Version ID
     */
    id?: number;
    /**
     * Page size in bytes
     */
    length?: number;
    /**
     * Date when the page has been edited in Unixtime
     */
    edited?: number;
    /**
     * Last editor ID
     */
    editor_id?: number;
    /**
     * Last editor name
     */
    editor_name?: string;
    [key: string]: any;
}

export interface PhotosPhotoAlbum {
    /**
     * Photo album ID
     */
    id: number;
    /**
     * Album owner's ID
     */
    owner_id: number;
    /**
     * Photo album title
     */
    title: string;
    /**
     * Photo album description
     */
    description?: string;
    /**
     * Date when the album has been created in Unixtime
     */
    created: number;
    /**
     * Date when the album has been updated last time in Unixtime
     */
    updated: number;
    /**
     * Photos number
     */
    size: number;
    [key: string]: any;
}

export interface PhotosPhotoAlbumFull {
    /**
     * Photo album ID
     */
    id: number;
    /**
     * Thumb photo ID
     */
    thumb_id?: number;
    /**
     * URL of the thumb image
     */
    thumb_src?: string;
    /**
     * Album owner's ID
     */
    owner_id: number;
    /**
     * Photo album title
     */
    title: string;
    /**
     * Photo album description
     */
    description?: string;
    /**
     * Date when the album has been created in Unixtime
     */
    created: number;
    /**
     * Date when the album has been updated last time in Unixtime
     */
    updated: number;
    /**
     * Photos number
     */
    size: number;
    /**
     * Privacy view
     */
    privacy_view?: string[];
    /**
     * Privacy comment
     */
    privacy_comment?: string[];
    [key: string]: any;
    sizes?: PhotosPhotoSizes[];
}

export interface PhotosCommentXtrPid {
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
     * Replied user ID
     */
    reply_to_user?: number;
    /**
     * Replied comment ID
     */
    reply_to_comment?: number;
    /**
     * Photo ID
     */
    pid: number;
    [key: string]: any;
    attachments?: WallCommentAttachment[];
}

export interface PhotosMarketAlbumUploadResponse {
    /**
     * Community ID
     */
    gid?: number;
    /**
     * Upload server number
     */
    server?: number;
    /**
     * Uploaded photo data
     */
    photo?: string;
    /**
     * Uploading hash
     */
    hash?: string;
    [key: string]: any;
}

export interface PhotosMarketUploadResponse {
    /**
     * Community ID
     */
    group_id?: number;
    /**
     * Upload server number
     */
    server?: number;
    /**
     * Uploaded photo data
     */
    photo?: string;
    /**
     * Uploading hash
     */
    hash?: string;
    /**
     * Crop data
     */
    crop_data?: string;
    /**
     * Crop hash
     */
    crop_hash?: string;
    [key: string]: any;
}

export interface PhotosMessageUploadResponse {
    /**
     * Upload server number
     */
    server?: number;
    /**
     * Uploaded photo data
     */
    photo?: string;
    /**
     * Uploading hash
     */
    hash?: string;
    [key: string]: any;
}

export interface PhotosOwnerUploadResponse {
    /**
     * Upload server number
     */
    server?: number;
    /**
     * Uploaded photo data
     */
    photo?: string;
    /**
     * Uploading hash
     */
    hash?: string;
    [key: string]: any;
}

export type PhotosImageType = "s" | "m" | "x" | "o" | "p" | "q" | "r" | "y" | "z" | "w" | "k";

export interface PhotosImage {
    /**
     * Photo URL.
     */
    url?: string;
    /**
     * Width of the photo in px.
     */
    width?: number;
    /**
     * Height of the photo in px.
     */
    height?: number;
    [key: string]: any;
}

export interface PhotosPhoto {
    /**
     * Photo ID
     */
    id: number;
    /**
     * Album ID
     */
    album_id: number;
    /**
     * Photo owner's ID
     */
    owner_id: number;
    /**
     * ID of the user who have uploaded the photo
     */
    user_id?: number;
    /**
     * Post ID
     */
    post_id?: number;
    /**
     * Original photo width
     */
    width?: number;
    /**
     * Original photo height
     */
    height?: number;
    /**
     * Photo caption
     */
    text?: string;
    /**
     * Date when uploaded
     */
    date: number;
    /**
     * Latitude
     */
    lat?: number;
    /**
     * Longitude
     */
    long?: number;
    /**
     * Access key for the photo
     */
    access_key?: string;
    [key: string]: any;
    images?: PhotosImage[];
}

export interface PhotosPhotoFull {
    /**
     * Photo ID
     */
    id: number;
    /**
     * Album ID
     */
    album_id: number;
    /**
     * Photo owner's ID
     */
    owner_id: number;
    /**
     * ID of the user who have uploaded the photo
     */
    user_id?: number;
    /**
     * Post ID
     */
    post_id?: number;
    /**
     * Original photo width
     */
    width?: number;
    /**
     * Original photo height
     */
    height?: number;
    /**
     * Photo caption
     */
    text?: string;
    /**
     * Date when uploaded
     */
    date: number;
    /**
     * Latitude
     */
    lat?: number;
    /**
     * Longitude
     */
    long?: number;
    /**
     * Access key for the photo
     */
    access_key?: string;
    [key: string]: any;
    images?: PhotosImage[];
}

export interface PhotosPhotoFullXtrRealOffset {
    /**
     * Photo ID
     */
    id: number;
    /**
     * Album ID
     */
    album_id: number;
    /**
     * Photo owner's ID
     */
    owner_id: number;
    /**
     * ID of the user who have uploaded the photo
     */
    user_id?: number;
    /**
     * URL of image with 75 px width
     */
    photo_75?: string;
    /**
     * URL of image with 130 px width
     */
    photo_130?: string;
    /**
     * URL of image with 604 px width
     */
    photo_604?: string;
    /**
     * URL of image with 807 px width
     */
    photo_807?: string;
    /**
     * URL of image with 1280 px width
     */
    photo_1280?: string;
    /**
     * URL of image with 2560 px width
     */
    photo_2560?: string;
    /**
     * Post ID
     */
    post_id?: number;
    /**
     * Original photo width
     */
    width?: number;
    /**
     * Original photo height
     */
    height?: number;
    /**
     * Photo caption
     */
    text?: string;
    /**
     * Date when uploaded
     */
    date: number;
    /**
     * Latitude
     */
    lat?: number;
    /**
     * Longitude
     */
    long?: number;
    /**
     * Access key for the photo
     */
    access_key?: string;
    /**
     * Real position of the photo
     */
    real_offset?: number;
    [key: string]: any;
    sizes?: PhotosPhotoSizes[];
}

export interface PhotosPhotoXtrRealOffset {
    /**
     * Photo ID
     */
    id: number;
    /**
     * Album ID
     */
    album_id: number;
    /**
     * Photo owner's ID
     */
    owner_id: number;
    /**
     * ID of the user who have uploaded the photo
     */
    user_id?: number;
    /**
     * URL of image with 75 px width
     */
    photo_75?: string;
    /**
     * URL of image with 130 px width
     */
    photo_130?: string;
    /**
     * URL of image with 604 px width
     */
    photo_604?: string;
    /**
     * URL of image with 807 px width
     */
    photo_807?: string;
    /**
     * URL of image with 1280 px width
     */
    photo_1280?: string;
    /**
     * URL of image with 2560 px width
     */
    photo_2560?: string;
    /**
     * Post ID
     */
    post_id?: number;
    /**
     * Original photo width
     */
    width?: number;
    /**
     * Original photo height
     */
    height?: number;
    /**
     * Photo caption
     */
    text?: string;
    /**
     * Date when uploaded
     */
    date: number;
    /**
     * Latitude
     */
    lat?: number;
    /**
     * Longitude
     */
    long?: number;
    /**
     * Access key for the photo
     */
    access_key?: string;
    /**
     * Real position of the photo
     */
    real_offset?: number;
    [key: string]: any;
    sizes?: PhotosPhotoSizes[];
}

export interface PhotosPhotoXtrTagInfo {
    /**
     * Photo ID
     */
    id: number;
    /**
     * Album ID
     */
    album_id: number;
    /**
     * Photo owner's ID
     */
    owner_id: number;
    /**
     * ID of the user who have uploaded the photo
     */
    user_id?: number;
    /**
     * URL of image with 75 px width
     */
    photo_75?: string;
    /**
     * URL of image with 130 px width
     */
    photo_130?: string;
    /**
     * URL of image with 604 px width
     */
    photo_604?: string;
    /**
     * URL of image with 807 px width
     */
    photo_807?: string;
    /**
     * URL of image with 1280 px width
     */
    photo_1280?: string;
    /**
     * URL of image with 2560 px width
     */
    photo_2560?: string;
    /**
     * Post ID
     */
    post_id?: number;
    /**
     * Original photo width
     */
    width?: number;
    /**
     * Original photo height
     */
    height?: number;
    /**
     * Photo caption
     */
    text?: string;
    /**
     * Date when uploaded
     */
    date: number;
    /**
     * Latitude
     */
    lat?: number;
    /**
     * Longitude
     */
    long?: number;
    /**
     * Access key for the photo
     */
    access_key?: string;
    /**
     * ID of the tag creator
     */
    placer_id?: number;
    /**
     * Date when tag has been added in Unixtime
     */
    tag_created?: number;
    /**
     * Tag ID
     */
    tag_id?: number;
    [key: string]: any;
    sizes?: PhotosPhotoSizes[];
}

export type PhotosPhotoSizesType = "s" | "m" | "x" | "o" | "p" | "q" | "r" | "y" | "z" | "w";

export interface PhotosPhotoSizes {
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

export interface PhotosPhotoTag {
    /**
     * Tagged user ID
     */
    user_id: number;
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
     * Date when tag has been added in Unixtime
     */
    date: number;
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

export interface PhotosPhotoUpload {
    /**
     * URL to upload photo
     */
    upload_url: string;
    /**
     * Album ID
     */
    album_id: number;
    /**
     * User ID
     */
    user_id: number;
    [key: string]: any;
}

export interface PhotosPhotoUploadResponse {
    /**
     * Upload server number
     */
    server?: number;
    /**
     * Uploaded photos data
     */
    photos_list?: string;
    /**
     * Album ID
     */
    aid?: number;
    /**
     * Uploading hash
     */
    hash?: string;
    [key: string]: any;
}

export interface PhotosWallUploadResponse {
    /**
     * Upload server number
     */
    server?: number;
    /**
     * Uploaded photo data
     */
    photo?: string;
    /**
     * Uploading hash
     */
    hash?: string;
    [key: string]: any;
}

export interface PlacesCheckin {
    /**
     * Checkin ID
     */
    id: number;
    /**
     * User ID
     */
    user_id: number;
    /**
     * Date when the checkin has been added in Unixtime
     */
    date: number;
    /**
     * Place latitude
     */
    latitude?: number;
    /**
     * Place longitude
     */
    longitude?: number;
    /**
     * Place ID
     */
    place_id?: number;
    /**
     * Comment text
     */
    text?: string;
    /**
     * Distance to the place
     */
    distance?: number;
    /**
     * Place title
     */
    place_title?: string;
    /**
     * Country ID
     */
    place_country?: number;
    /**
     * City ID
     */
    place_city?: number;
    /**
     * Place type
     */
    place_type?: string;
    /**
     * URL of the place's icon
     */
    place_icon?: string;
    [key: string]: any;
}

export interface PlacesPlaceMin {
    /**
     * Place ID
     */
    id?: number;
    /**
     * Place title
     */
    title?: string;
    /**
     * Place latitude
     */
    latitude?: number;
    /**
     * Place longitude
     */
    longitude?: number;
    /**
     * Date of the place creation in Unixtime
     */
    created?: number;
    /**
     * URL of the place's icon
     */
    icon?: string;
    /**
     * Checkins number
     */
    checkins?: number;
    /**
     * Place type
     */
    type?: string;
    /**
     * Country ID
     */
    country?: number;
    /**
     * City ID
     */
    city?: number;
    /**
     * Place address
     */
    address?: string;
    [key: string]: any;
}

export interface PlacesPlaceFull {
    /**
     * Place ID
     */
    id?: number;
    /**
     * Place title
     */
    title?: string;
    /**
     * Place latitude
     */
    latitude?: number;
    /**
     * Place longitude
     */
    longitude?: number;
    /**
     * Date of the place creation in Unixtime
     */
    created?: number;
    /**
     * URL of the place's icon
     */
    icon?: string;
    /**
     * Checkins number
     */
    checkins?: number;
    /**
     * Place type
     */
    type?: string;
    /**
     * Country ID
     */
    country?: number;
    /**
     * City ID
     */
    city?: number;
    /**
     * Place address
     */
    address?: string;
    /**
     * Distance to the place
     */
    distance?: number;
    /**
     * Community ID
     */
    group_id?: number;
    /**
     * URL of the community's photo
     */
    group_photo?: string;
    [key: string]: any;
}

export interface PlacesTypes {
    /**
     * Place type ID
     */
    id?: number;
    /**
     * Place type title
     */
    title?: string;
    /**
     * URL of the place's icon
     */
    icon?: string;
    [key: string]: any;
}

export interface PollsAnswer {
    /**
     * Answer ID
     */
    id: number;
    /**
     * Answer text
     */
    text: string;
    /**
     * Votes number
     */
    votes: number;
    /**
     * Answer rate in percents
     */
    rate: number;
    [key: string]: any;
}

export interface PollsPoll {
    /**
     * Poll ID
     */
    id: number;
    /**
     * Poll owner's ID
     */
    owner_id: number;
    /**
     * Date when poll has been created in Unixtime
     */
    created: number;
    /**
     * Poll question
     */
    question: string;
    /**
     * Votes number
     */
    votes: string;
    /**
     * Current user's answer ID
     */
    answer_id: number;
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

export type SearchHintType = "group" | "profile";

export type SearchHintSection = "groups" | "events" | "publics" | "correspondents" | "people" | "friends" | "mutual_friends";

export interface SearchHint {
    /**
     * Object description
     */
    description: string;
    [key: string]: any;
}

export interface SecureLevel {
    /**
     * User ID
     */
    uid?: number;
    /**
     * Level
     */
    level?: number;
    [key: string]: any;
}

export interface SecureSmsNotification {
    /**
     * Notification ID
     */
    id?: number;
    /**
     * Application ID
     */
    app_id?: number;
    /**
     * User ID
     */
    user_id?: number;
    /**
     * Date when message has been sent in Unixtime
     */
    date?: number;
    /**
     * Messsage text
     */
    message?: string;
    [key: string]: any;
}

export interface SecureTokenChecked {
    /**
     * User ID
     */
    user_id?: number;
    /**
     * Date when access_token has been generated in Unixtime
     */
    date?: number;
    /**
     * Date when access_token will expire in Unixtime
     */
    expire?: number;
    [key: string]: any;
}

export interface SecureTransaction {
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
    /**
     * Transaction date in Unixtime
     */
    date?: number;
    [key: string]: any;
}

export interface StatsPeriod {
    /**
     * Day (YYYY-MM-DD)
     */
    period_from?: string;
    /**
     * Day (YYYY-MM-DD)
     */
    period_to?: string;
    [key: string]: any;
}

/*Views stats*/
export interface StatsViews {
    /**
     * Views number
     */
    views?: number;
    /**
     * Visitors number
     */
    visitors?: number;
    /**
     * Number of views from mobile devices
     */
    mobile_views?: number;
    [key: string]: any;
    sex?: StatsSexAge[];
    age?: StatsSexAge[];
    sex_age?: StatsSexAge[];
    countries?: StatsCountry[];
    cities?: StatsCity[];
}

/*Reach stats*/
export interface StatsReach {
    /**
     * Reach count
     */
    reach?: number;
    /**
     * Subscribers reach count
     */
    reach_subscribers?: number;
    /**
     * Reach count from mobile devices
     */
    mobile_reach?: number;
    [key: string]: any;
    sex?: StatsSexAge[];
    age?: StatsSexAge[];
    sex_age?: StatsSexAge[];
    countries?: StatsCountry[];
    cities?: StatsCity[];
}

/*Activity stats*/
export interface StatsActivity {
    /**
     * Likes number
     */
    likes?: number;
    /**
     * Comments number
     */
    comments?: number;
    /**
     * Reposts number
     */
    copies?: number;
    /**
     * New subscribers count
     */
    subscribed?: number;
    /**
     * Unsubscribed count
     */
    unsubscribed?: number;
    /**
     * Hidden from news count
     */
    hidden?: number;
    [key: string]: any;
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

export interface StatsCountry {
    /**
     * Visitors number
     */
    count?: number;
    /**
     * Country ID
     */
    value?: number;
    /**
     * Country code
     */
    code?: string;
    /**
     * Country name
     */
    name?: string;
    [key: string]: any;
}

export interface StatsCity {
    /**
     * Visitors number
     */
    count?: number;
    /**
     * City ID
     */
    value?: number;
    /**
     * City name
     */
    name?: string;
    [key: string]: any;
}

export interface StatsWallpostStat {
    /**
     * Subscribers reach
     */
    reach_subscribers?: number;
    /**
     * Total reach
     */
    reach_total?: number;
    /**
     * Link clickthrough
     */
    links?: number;
    /**
     * Clickthrough to community
     */
    to_group?: number;
    /**
     * People have joined the group
     */
    join_group?: number;
    /**
     * Reports number
     */
    report?: number;
    /**
     * Hidings number
     */
    hide?: number;
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

export type StoriesStoryStatsState = "on" | "off" | "hidden";

export interface StoriesStoryStatsStat {
    /**
     * Stat value
     */
    count?: number;
    [key: string]: any;
}

export interface StoriesStoryStats {
    [key: string]: any;
}

export interface StoriesStoryVideo1 {
    /**
     * URL of the first frame for the corresponding width.
     */
    first_frame_800?: string;
    /**
     * URL of the first frame for the corresponding width.
     */
    first_frame_320?: string;
    /**
     * URL of the first frame for the corresponding width.
     */
    first_frame_160?: string;
    /**
     * URL of the first frame for the corresponding width.
     */
    first_frame_130?: string;
    is_private?: BaseBoolInt;
}

export type StoriesStoryVideo = VideoVideo & StoriesStoryVideo1;

export type StoriesStoryType = "photo" | "video";

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

export interface StoriesStory {
    /**
     * Story ID.
     */
    id: number;
    /**
     * Story owner's ID.
     */
    owner_id: number;
    /**
     * Date when story has been added in Unixtime.
     */
    date?: number;
    /**
     * Views number.
     */
    views?: number;
    /**
     * Information whether the story is deleted (false - no, true - yes).
     */
    is_deleted?: boolean;
    /**
     * Information whether the story is expired (false - no, true - yes).
     */
    is_expired?: boolean;
    /**
     * Access key for private object.
     */
    access_key?: string;
    /**
     * Parent story owner's ID.
     */
    parent_story_owner_id?: number;
    /**
     * Parent story ID.
     */
    parent_story_id?: number;
    /**
     * Access key for private object.
     */
    parent_story_access_key?: string;
    [key: string]: any;
    replies?: StoriesReplies[];
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

export interface UtilsShortLink {
    /**
     * Short link URL
     */
    short_url?: string;
    /**
     * Access key for private stats
     */
    access_key?: string;
    /**
     * Link key (characters after vk.cc/)
     */
    key?: string;
    /**
     * Full URL
     */
    url?: string;
    [key: string]: any;
}

export interface UtilsLastShortenedLink {
    /**
     * Creation time in Unixtime
     */
    timestamp?: number;
    /**
     * Full URL
     */
    url?: string;
    /**
     * Short link URL
     */
    short_url?: string;
    /**
     * Link key (characters after vk.cc/)
     */
    key?: string;
    /**
     * Total views number
     */
    views?: number;
    /**
     * Access key for private stats
     */
    access_key?: string;
    [key: string]: any;
}

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
    sex_age?: UtilsStatsSexAge[];
    countries?: UtilsStatsCountry[];
    cities?: UtilsStatsCity[];
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

export type UtilsDomainResolvedType = "user" | "group" | "application" | "page";

export interface UtilsDomainResolved {
    /**
     * Object ID
     */
    object_id?: number;
    [key: string]: any;
}

export type UtilsLinkCheckedStatus = "not_banned" | "banned" | "processing";

export interface UtilsLinkChecked {
    /**
     * Link URL
     */
    link?: string;
    [key: string]: any;
}

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

export interface UsersUserCounters {
    /**
     * Albums number
     */
    albums?: number;
    /**
     * Videos number
     */
    videos?: number;
    /**
     * Audios number
     */
    audios?: number;
    /**
     * Notes number
     */
    notes?: number;
    /**
     * Photos number
     */
    photos?: number;
    /**
     * Communities number
     */
    groups?: number;
    /**
     * Gifts number
     */
    gifts?: number;
    /**
     * Friends number
     */
    friends?: number;
    /**
     * Online friends number
     */
    online_friends?: number;
    /**
     * Number of photos with user
     */
    user_photos?: number;
    /**
     * Number of videos with user
     */
    user_videos?: number;
    /**
     * Followers number
     */
    followers?: number;
    /**
     * Subscriptions number
     */
    subscriptions?: number;
    /**
     * Public pages number
     */
    pages?: number;
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

export type UsersUserType = "profile";

export interface UsersUserFullXtrType1 {
    type?: UsersUserType;
}

export type UsersUserFullXtrType = UsersUserFull & UsersUserFullXtrType1;

export interface UsersUserXtrType1 {
    type?: UsersUserType;
}

export type UsersUserXtrType = UsersUser & UsersUserXtrType1;

export interface UsersUserMin {
    /**
     * User ID
     */
    id: number;
    /**
     * User first name
     */
    first_name: string;
    /**
     * User last name
     */
    last_name: string;
    /**
     * Returns if a profile is deleted or blocked
     */
    deactivated?: string;
    /**
     * Returns if a profile is hidden.
     */
    hidden?: number;
    [key: string]: any;
}

export interface UsersUserBroadcast1 {
    status_audio?: AudioAudioFull;
}

export type UsersUserBroadcast = UsersUserMin & UsersUserBroadcast1;

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

export interface UsersCareer {
    /**
     * Community ID
     */
    group_id?: number;
    /**
     * Company name
     */
    company?: string;
    /**
     * Country ID
     */
    country_id?: number;
    /**
     * City ID
     */
    city_id?: number;
    /**
     * From year
     */
    from?: number;
    /**
     * Till year
     */
    until?: number;
    /**
     * Position
     */
    position?: string;
    [key: string]: any;
}

export interface UsersExports {
    [key: string]: any;
    twitter?: number;
    facebook?: number;
    livejournal?: number;
}

export interface UsersMilitary {
    /**
     * Unit name
     */
    unit?: string;
    /**
     * Unit ID
     */
    unit_id?: number;
    /**
     * Country ID
     */
    country_id?: number;
    /**
     * From year
     */
    from?: number;
    /**
     * Till year
     */
    until?: number;
    [key: string]: any;
}

export interface UsersRelative {
    /**
     * Relative ID
     */
    id?: number;
    /**
     * Relative type
     */
    type?: string;
    [key: string]: any;
}

export interface UsersUserLim {
    /**
     * User ID
     */
    id?: number;
    /**
     * URL of square photo of the user with 50 pixels in width
     */
    photo?: string;
    /**
     * User name and last name
     */
    name?: string;
    /**
     * User name in genitive declension
     */
    name_gen?: string;
    [key: string]: any;
}

export interface UsersLastSeen {
    /**
     * Last visit date (in Unix time)
     */
    time?: number;
    /**
     * Type of the platform that used for the last authorization
     */
    platform?: number;
    [key: string]: any;
}

export interface UsersUniversity {
    /**
     * University ID
     */
    id?: number;
    /**
     * Country ID
     */
    country?: number;
    /**
     * City ID
     */
    city?: number;
    /**
     * University name
     */
    name?: string;
    /**
     * Faculty ID
     */
    faculty?: number;
    /**
     * Faculty name
     */
    faculty_name?: string;
    /**
     * Chair ID
     */
    chair?: number;
    /**
     * Chair name
     */
    chair_name?: string;
    /**
     * Graduation year
     */
    graduation?: number;
    /**
     * Education form
     */
    education_form?: string;
    /**
     * Education status
     */
    education_status?: string;
    [key: string]: any;
}

export interface UsersSchool {
    /**
     * School ID
     */
    id?: string;
    /**
     * Country ID
     */
    country?: number;
    /**
     * City ID
     */
    city?: number;
    /**
     * School name
     */
    name?: string;
    /**
     * Year the user started to study
     */
    year_from?: number;
    /**
     * Year the user finished to study
     */
    year_to?: number;
    /**
     * Graduation year
     */
    year_graduated?: number;
    /**
     * School class letter
     */
    class?: string;
    /**
     * School type ID
     */
    type?: number;
    /**
     * School type name
     */
    type_str?: string;
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
     * Coordinate Y of the left upper corner
     */
    y?: number;
    /**
     * Coordinate X of the right lower corner
     */
    x2?: number;
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
     * Coordinate Y of the left upper corner
     */
    y?: number;
    /**
     * Coordinate X of the right lower corner
     */
    x2?: number;
    /**
     * Coordinate Y of the right lower corner
     */
    y2?: number;
    [key: string]: any;
}

export interface UsersOccupation {
    /**
     * Type of occupation
     */
    type?: string;
    /**
     * ID of school, university, company group
     */
    id?: number;
    /**
     * Name of occupation
     */
    name?: string;
    [key: string]: any;
}

export interface UsersPersonal {
    /**
     * User's political views
     */
    political?: number;
    /**
     * User's languages
     */
    langs?: string[];
    /**
     * User's religion
     */
    religion?: string;
    /**
     * User's inspired by
     */
    inspired_by?: string;
    /**
     * User's personal priority in people
     */
    people_main?: number;
    /**
     * User's personal priority in life
     */
    life_main?: number;
    /**
     * User's views on smoking
     */
    smoking?: number;
    /**
     * User's views on alcohol
     */
    alcohol?: number;
    [key: string]: any;
}

export interface UsersUserXtrCounters1 {
    counters?: UsersUserCounters;
}

export type UsersUserXtrCounters = UsersUserFull & UsersUserXtrCounters1;

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
    [key: string]: any;
}

export interface VideoVideoAlbumFull {
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
     * Total number of videos in album
     */
    count: number;
    /**
     * URL of the preview image with 160px in width
     */
    photo_160?: string;
    /**
     * URL of the preview image with 320px in width
     */
    photo_320?: string;
    /**
     * Date when the album has been updated last time in Unixtime
     */
    updated_time: number;
    /**
     * Information whether album is system
     */
    is_system?: number;
    [key: string]: any;
}

export type VideoCatBlockView = "horizontal" | "horizontal_compact" | "vertical" | "vertical_compact";

export interface VideoCatBlock {
    /**
     * New value for _from_ parameter
     */
    next: string;
    /**
     * Block name
     */
    name: string;
    /**
     * Block ID
     */
    id: number;
    [key: string]: any;
    items: VideoCatElement[];
}

export type VideoCatElementType = "video" | "album";

export interface VideoCatElement {
    /**
     * Element ID
     */
    id: number;
    /**
     * Element owner's ID
     */
    owner_id: number;
    /**
     * Element title
     */
    title: string;
    /**
     * Element description
     */
    description?: string;
    /**
     * Duration in seconds
     */
    duration?: number;
    /**
     * URL of the preview image with 130 px in width
     */
    photo_130?: string;
    /**
     * URL of the preview image with 160 px in width
     */
    photo_160?: string;
    /**
     * URL of the preview image with 320 px in width
     */
    photo_320?: string;
    /**
     * URL of the preview image with 640 px in width
     */
    photo_640?: string;
    /**
     * URL of the preview image with 800 px in width
     */
    photo_800?: string;
    /**
     * Date when the element has been created
     */
    date?: number;
    /**
     * Views number
     */
    views?: number;
    /**
     * Comments number
     */
    comments?: number;
    /**
     * Videos number (for album)
     */
    count?: number;
    /**
     * Date of last update (for album) in Unixtime
     */
    updated_time?: number;
    [key: string]: any;
}

export interface VideoSaveResult {
    /**
     * URL for the video uploading
     */
    upload_url?: string;
    /**
     * Video ID
     */
    video_id?: number;
    /**
     * Video owner ID
     */
    owner_id?: number;
    /**
     * Video title
     */
    title?: string;
    /**
     * Video description
     */
    description?: string;
    [key: string]: any;
}

export interface VideoVideoTag {
    /**
     * Tagged user ID
     */
    user_id: number;
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
     * Date when tag has been added in Unixtime
     */
    date: number;
    [key: string]: any;
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

export interface VideoVideo {
    /**
     * Video ID
     */
    id?: number;
    /**
     * Video owner ID
     */
    owner_id?: number;
    /**
     * Video title
     */
    title?: string;
    /**
     * Video duration in seconds
     */
    duration?: number;
    /**
     * Video description
     */
    description?: string;
    /**
     * Date when video has been uploaded in Unixtime
     */
    date?: number;
    /**
     * Number of views
     */
    views?: number;
    /**
     * Number of comments
     */
    comments?: number;
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
     * Video access key
     */
    access_key?: string;
    /**
     * Date when the video has been added in Unixtime
     */
    adding_date?: number;
    /**
     * URL of the page with a player that can be used to play the video in the browser.
     */
    player?: string;
    [key: string]: any;
}

export interface VideoVideoFiles {
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
    /**
     * URL of the mpeg4 file with 1080p quality
     */
    mp_1080?: string;
    /**
     * URL of the external player
     */
    external?: string;
    [key: string]: any;
}

export interface VideoVideoTagInfo {
    /**
     * Video ID
     */
    id?: number;
    /**
     * Video owner ID
     */
    owner_id?: number;
    /**
     * Video title
     */
    title?: string;
    /**
     * Video duration in seconds
     */
    duration?: number;
    /**
     * Video description
     */
    description?: string;
    /**
     * Date when video has been uploaded in Unixtime
     */
    date?: number;
    /**
     * Number of views
     */
    views?: number;
    /**
     * Number of comments
     */
    comments?: number;
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
     * Video access key
     */
    access_key?: string;
    /**
     * Date when the video has been added in Unixtime
     */
    adding_date?: number;
    /**
     * URL of the page with a player that can be used to play the video in the browser.
     */
    player?: string;
    /**
     * ID of the tag creator
     */
    placer_id?: number;
    /**
     * Date when tag has been added in Unixtime
     */
    tag_created?: number;
    /**
     * Tag ID
     */
    tag_id?: number;
    [key: string]: any;
}

export interface VideoVideoFull {
    /**
     * Video ID
     */
    id?: number;
    /**
     * Video owner ID
     */
    owner_id?: number;
    /**
     * Video title
     */
    title?: string;
    /**
     * Video duration in seconds
     */
    duration?: number;
    /**
     * Video description
     */
    description?: string;
    /**
     * Date when video has been uploaded in Unixtime
     */
    date?: number;
    /**
     * Number of views
     */
    views?: number;
    /**
     * Number of comments
     */
    comments?: number;
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
     * Video access key
     */
    access_key?: string;
    /**
     * Date when the video has been added in Unixtime
     */
    adding_date?: number;
    /**
     * URL of the page with a player that can be used to play the video in the browser.
     */
    player?: string;
    /**
     * Privacy view
     */
    privacy_view?: string[];
    /**
     * Privacy comment
     */
    privacy_comment?: string[];
    [key: string]: any;
}

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
     * Note ID
     */
    id: number;
    /**
     * Note owner's ID
     */
    owner_id: number;
    /**
     * Comments number
     */
    comments: number;
    /**
     * Read comments number
     */
    read_comments: number;
    /**
     * Date when the note has been created in Unixtime
     */
    date: number;
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

export type WallCommentAttachmentType = "photo" | "audio" | "video" | "doc" | "link" | "note" | "page" | "market_market_album" | "market" | "sticker";

export interface WallCommentAttachment {
    [key: string]: any;
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

export type WallPostSourceType = "vk" | "widget" | "api" | "rss" | "sms";

export interface WallPostSource {
    /**
     * Platform name
     */
    platform?: string;
    /**
     * Additional data
     */
    data?: string;
    /**
     * URL to an external site used to publish the post
     */
    url?: string;
    [key: string]: any;
}

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

export type WallPostType = "post" | "copy" | "reply" | "postpone" | "suggest";

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
     * Replied user ID
     */
    reply_to_user?: number;
    /**
     * Replied comment ID
     */
    reply_to_comment?: number;
    /**
     * Real position of the comment
     */
    real_offset?: number;
    [key: string]: any;
    attachments?: WallCommentAttachment[];
}

export interface WallViews {
    /**
     * Count
     */
    count?: number;
    [key: string]: any;
}

export interface WallWallpost {
    /**
     * Post ID
     */
    id?: number;
    /**
     * Post author ID
     */
    from_id?: number;
    /**
     * Wall owner's ID
     */
    owner_id?: number;
    /**
     * Date of publishing in Unixtime
     */
    date?: number;
    /**
     * Access key to private object
     */
    access_key?: string;
    /**
     * Post text
     */
    text?: string;
    /**
     * Post signer ID
     */
    signer_id?: number;
    [key: string]: any;
    attachments?: WallWallpostAttachment[];
}

export interface WallWallpostAttached {
    /**
     * Post ID
     */
    id?: number;
    /**
     * Post author ID
     */
    from_id?: number;
    /**
     * Post addresse
     */
    to_id?: number;
    /**
     * Date of publishing in Unixtime
     */
    date?: number;
    /**
     * Post text
     */
    text?: string;
    /**
     * Post signer ID
     */
    signer_id?: number;
    /**
     * Source post owner's ID
     */
    copy_owner_id?: number;
    /**
     * Source post ID
     */
    copy_post_id?: number;
    /**
     * Repost comment
     */
    copy_text?: string;
    [key: string]: any;
    attachments?: WallWallpostAttachment[];
}

export type WallWallpostAttachmentType = "photo" | "posted_photo" | "audio" | "video" | "doc" | "link" | "graffiti" | "note" | "app" | "poll" | "page" | "album" | "photos_list" | "market_market_album" | "market";

export interface WallWallpostAttachment {
    /**
     * String ID of photo
     */
    photos_list?: string[];
    [key: string]: any;
}

export interface WallWallpostToId {
    /**
     * Post ID
     */
    id?: number;
    /**
     * Post author ID
     */
    from_id?: number;
    /**
     * Wall owner's ID
     */
    to_id?: number;
    /**
     * Date of publishing in Unixtime
     */
    date?: number;
    /**
     * wall post ID (if comment)
     */
    post_id?: number;
    /**
     * Post text
     */
    text?: string;
    /**
     * Post signer ID
     */
    signer_id?: number;
    /**
     * ID of the source post owner
     */
    copy_owner_id?: number;
    /**
     * ID of the source post
     */
    copy_post_id?: number;
    [key: string]: any;
    attachments?: WallWallpostAttachment[];
}

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
    likes?: BaseLikesInfo;
    reposts?: BaseRepostsInfo;
    marked_as_ads?: BaseBoolInt;
}

export type WallWallpostFull = WallWallpost & WallWallpostFull1;

export interface WidgetsWidgetComment {
    /**
     * Comment ID
     */
    id: number;
    /**
     * Comment author ID
     */
    from_id: number;
    /**
     * Wall owner
     */
    to_id: number;
    /**
     * Date when the comment has been added in Unixtime
     */
    date: number;
    /**
     * Post type
     */
    post_type: number;
    /**
     * Comment text
     */
    text: string;
    [key: string]: any;
    attachments?: WallCommentAttachment[];
}

export type WidgetsCommentMediaType = "audio" | "photo" | "video";

export interface WidgetsCommentMedia {
    /**
     * Media owner's ID
     */
    owner_id?: number;
    /**
     * Media item ID
     */
    item_id?: number;
    /**
     * URL of the preview image (type=photo only)
     */
    thumb_src?: string;
    [key: string]: any;
}

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
     * User ID
     */
    uid?: number;
    /**
     * Date when the comment has been added in Unixtime
     */
    date?: number;
    /**
     * Comment text
     */
    text?: string;
    [key: string]: any;
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
     * Page ID
     */
    id?: number;
    /**
     * Page title
     */
    title?: string;
    /**
     * Page description
     */
    description?: string;
    /**
     * URL of the preview image
     */
    photo?: string;
    /**
     * Page absolute URL
     */
    url?: string;
    /**
     * Date when widgets on the page has been initialized firstly in Unixtime
     */
    date?: number;
    /**
     * page_id parameter value
     */
    page_id?: string;
    [key: string]: any;
}

