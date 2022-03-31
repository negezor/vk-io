// @ts-ignore
/* eslint-disable */
// @ts-ignore
export enum APIErrorCode {
// @ts-ignore
    /**
// @ts-ignore
     * Unknown error occurred
// @ts-ignore
     *
// @ts-ignore
     * Code: `1`
// @ts-ignore
     */
// @ts-ignore
    UNKNOWN = 1,
// @ts-ignore
    /**
// @ts-ignore
     * Application is disabled. Enable your application or use test mode
// @ts-ignore
     *
// @ts-ignore
     * Code: `2`
// @ts-ignore
     */
// @ts-ignore
    DISABLED = 2,
// @ts-ignore
    /**
// @ts-ignore
     * Unknown method passed
// @ts-ignore
     *
// @ts-ignore
     * Code: `3`
// @ts-ignore
     */
// @ts-ignore
    METHOD = 3,
// @ts-ignore
    /**
// @ts-ignore
     * Incorrect signature
// @ts-ignore
     *
// @ts-ignore
     * Code: `4`
// @ts-ignore
     */
// @ts-ignore
    SIGNATURE = 4,
// @ts-ignore
    /**
// @ts-ignore
     * User authorization failed
// @ts-ignore
     *
// @ts-ignore
     * Code: `5`
// @ts-ignore
     */
// @ts-ignore
    AUTH = 5,
// @ts-ignore
    /**
// @ts-ignore
     * Too many requests per second
// @ts-ignore
     *
// @ts-ignore
     * Code: `6`
// @ts-ignore
     */
// @ts-ignore
    TOO_MANY = 6,
// @ts-ignore
    /**
// @ts-ignore
     * Permission to perform this action is denied
// @ts-ignore
     *
// @ts-ignore
     * Code: `7`
// @ts-ignore
     */
// @ts-ignore
    PERMISSION = 7,
// @ts-ignore
    /**
// @ts-ignore
     * Invalid request
// @ts-ignore
     *
// @ts-ignore
     * Code: `8`
// @ts-ignore
     */
// @ts-ignore
    REQUEST = 8,
// @ts-ignore
    /**
// @ts-ignore
     * Flood control
// @ts-ignore
     *
// @ts-ignore
     * Code: `9`
// @ts-ignore
     */
// @ts-ignore
    FLOOD = 9,
// @ts-ignore
    /**
// @ts-ignore
     * Internal server error
// @ts-ignore
     *
// @ts-ignore
     * Code: `10`
// @ts-ignore
     */
// @ts-ignore
    SERVER = 10,
// @ts-ignore
    /**
// @ts-ignore
     * In test mode application should be disabled or user should be authorized
// @ts-ignore
     *
// @ts-ignore
     * Code: `11`
// @ts-ignore
     */
// @ts-ignore
    ENABLED_IN_TEST = 11,
// @ts-ignore
    /**
// @ts-ignore
     * Unable to compile code
// @ts-ignore
     *
// @ts-ignore
     * Code: `12`
// @ts-ignore
     */
// @ts-ignore
    COMPILE = 12,
// @ts-ignore
    /**
// @ts-ignore
     * Runtime error occurred during code invocation
// @ts-ignore
     *
// @ts-ignore
     * Code: `13`
// @ts-ignore
     */
// @ts-ignore
    RUNTIME = 13,
// @ts-ignore
    /**
// @ts-ignore
     * Captcha needed
// @ts-ignore
     *
// @ts-ignore
     * Code: `14`
// @ts-ignore
     */
// @ts-ignore
    CAPTCHA = 14,
// @ts-ignore
    /**
// @ts-ignore
     * Access denied
// @ts-ignore
     *
// @ts-ignore
     * Code: `15`
// @ts-ignore
     */
// @ts-ignore
    ACCESS = 15,
// @ts-ignore
    /**
// @ts-ignore
     * HTTP authorization failed
// @ts-ignore
     *
// @ts-ignore
     * Code: `16`
// @ts-ignore
     */
// @ts-ignore
    AUTH_HTTPS = 16,
// @ts-ignore
    /**
// @ts-ignore
     * Validation required
// @ts-ignore
     *
// @ts-ignore
     * Code: `17`
// @ts-ignore
     */
// @ts-ignore
    AUTH_VALIDATION = 17,
// @ts-ignore
    /**
// @ts-ignore
     * User was deleted or banned
// @ts-ignore
     *
// @ts-ignore
     * Code: `18`
// @ts-ignore
     */
// @ts-ignore
    USER_DELETED = 18,
// @ts-ignore
    /**
// @ts-ignore
     * Content blocked
// @ts-ignore
     *
// @ts-ignore
     * Code: `19`
// @ts-ignore
     */
// @ts-ignore
    BLOCKED = 19,
// @ts-ignore
    /**
// @ts-ignore
     * Permission to perform this action is denied for non-standalone applications
// @ts-ignore
     *
// @ts-ignore
     * Code: `20`
// @ts-ignore
     */
// @ts-ignore
    METHOD_PERMISSION = 20,
// @ts-ignore
    /**
// @ts-ignore
     * Permission to perform this action is allowed only for standalone and OpenAPI applications
// @ts-ignore
     *
// @ts-ignore
     * Code: `21`
// @ts-ignore
     */
// @ts-ignore
    METHOD_ADS = 21,
// @ts-ignore
    /**
// @ts-ignore
     * Upload error
// @ts-ignore
     *
// @ts-ignore
     * Code: `22`
// @ts-ignore
     */
// @ts-ignore
    UPLOAD = 22,
// @ts-ignore
    /**
// @ts-ignore
     * This method was disabled
// @ts-ignore
     *
// @ts-ignore
     * Code: `23`
// @ts-ignore
     */
// @ts-ignore
    METHOD_DISABLED = 23,
// @ts-ignore
    /**
// @ts-ignore
     * Confirmation required
// @ts-ignore
     *
// @ts-ignore
     * Code: `24`
// @ts-ignore
     */
// @ts-ignore
    NEED_CONFIRMATION = 24,
// @ts-ignore
    /**
// @ts-ignore
     * Token confirmation required
// @ts-ignore
     *
// @ts-ignore
     * Code: `25`
// @ts-ignore
     */
// @ts-ignore
    NEED_TOKEN_CONFIRMATION = 25,
// @ts-ignore
    /**
// @ts-ignore
     * Group authorization failed
// @ts-ignore
     *
// @ts-ignore
     * Code: `27`
// @ts-ignore
     */
// @ts-ignore
    GROUP_AUTH = 27,
// @ts-ignore
    /**
// @ts-ignore
     * Application authorization failed
// @ts-ignore
     *
// @ts-ignore
     * Code: `28`
// @ts-ignore
     */
// @ts-ignore
    APP_AUTH = 28,
// @ts-ignore
    /**
// @ts-ignore
     * Rate limit reached
// @ts-ignore
     *
// @ts-ignore
     * Code: `29`
// @ts-ignore
     */
// @ts-ignore
    RATE_LIMIT = 29,
// @ts-ignore
    /**
// @ts-ignore
     * This profile is private
// @ts-ignore
     *
// @ts-ignore
     * Code: `30`
// @ts-ignore
     */
// @ts-ignore
    PRIVATE_PROFILE = 30,
// @ts-ignore
    /**
// @ts-ignore
     * Not implemented yet
// @ts-ignore
     *
// @ts-ignore
     * Code: `33`
// @ts-ignore
     */
// @ts-ignore
    NOT_IMPLEMENTED_YET = 33,
// @ts-ignore
    /**
// @ts-ignore
     * Client version deprecated
// @ts-ignore
     *
// @ts-ignore
     * Code: `34`
// @ts-ignore
     */
// @ts-ignore
    CLIENT_VERSION_DEPRECATED = 34,
// @ts-ignore
    /**
// @ts-ignore
     * Client update needed
// @ts-ignore
     *
// @ts-ignore
     * Code: `35`
// @ts-ignore
     */
// @ts-ignore
    CLIENT_UPDATE_NEEDED = 35,
// @ts-ignore
    /**
// @ts-ignore
     * Method execution was interrupted due to timeout
// @ts-ignore
     *
// @ts-ignore
     * Code: `36`
// @ts-ignore
     */
// @ts-ignore
    TIMEOUT = 36,
// @ts-ignore
    /**
// @ts-ignore
     * User was banned
// @ts-ignore
     *
// @ts-ignore
     * Code: `37`
// @ts-ignore
     */
// @ts-ignore
    USER_BANNED = 37,
// @ts-ignore
    /**
// @ts-ignore
     * Unknown application
// @ts-ignore
     *
// @ts-ignore
     * Code: `38`
// @ts-ignore
     */
// @ts-ignore
    UNKNOWN_APPLICATION = 38,
// @ts-ignore
    /**
// @ts-ignore
     * Unknown user
// @ts-ignore
     *
// @ts-ignore
     * Code: `39`
// @ts-ignore
     */
// @ts-ignore
    UNKNOWN_USER = 39,
// @ts-ignore
    /**
// @ts-ignore
     * Unknown group
// @ts-ignore
     *
// @ts-ignore
     * Code: `40`
// @ts-ignore
     */
// @ts-ignore
    UNKNOWN_GROUP = 40,
// @ts-ignore
    /**
// @ts-ignore
     * Additional signup required
// @ts-ignore
     *
// @ts-ignore
     * Code: `41`
// @ts-ignore
     */
// @ts-ignore
    ADDITIONAL_SIGNUP_REQUIRED = 41,
// @ts-ignore
    /**
// @ts-ignore
     * IP is not allowed
// @ts-ignore
     *
// @ts-ignore
     * Code: `42`
// @ts-ignore
     */
// @ts-ignore
    IP_IS_NOT_ALLOWED = 42,
// @ts-ignore
    /**
// @ts-ignore
     * One of the parameters specified was missing or invalid
// @ts-ignore
     *
// @ts-ignore
     * Code: `100`
// @ts-ignore
     */
// @ts-ignore
    PARAM = 100,
// @ts-ignore
    /**
// @ts-ignore
     * Invalid application API ID
// @ts-ignore
     *
// @ts-ignore
     * Code: `101`
// @ts-ignore
     */
// @ts-ignore
    PARAM_API_ID = 101,
// @ts-ignore
    /**
// @ts-ignore
     * Out of limits
// @ts-ignore
     *
// @ts-ignore
     * Code: `103`
// @ts-ignore
     */
// @ts-ignore
    LIMITS = 103,
// @ts-ignore
    /**
// @ts-ignore
     * Not found
// @ts-ignore
     *
// @ts-ignore
     * Code: `104`
// @ts-ignore
     */
// @ts-ignore
    NOT_FOUND = 104,
// @ts-ignore
    /**
// @ts-ignore
     * Couldn't save file
// @ts-ignore
     *
// @ts-ignore
     * Code: `105`
// @ts-ignore
     */
// @ts-ignore
    SAVE_FILE = 105,
// @ts-ignore
    /**
// @ts-ignore
     * Unable to process action
// @ts-ignore
     *
// @ts-ignore
     * Code: `106`
// @ts-ignore
     */
// @ts-ignore
    ACTION_FAILED = 106,
// @ts-ignore
    /**
// @ts-ignore
     * Invalid user id
// @ts-ignore
     *
// @ts-ignore
     * Code: `113`
// @ts-ignore
     */
// @ts-ignore
    PARAM_USER_ID = 113,
// @ts-ignore
    /**
// @ts-ignore
     * Invalid album id
// @ts-ignore
     *
// @ts-ignore
     * Code: `114`
// @ts-ignore
     */
// @ts-ignore
    PARAM_ALBUM_ID = 114,
// @ts-ignore
    /**
// @ts-ignore
     * Invalid server
// @ts-ignore
     *
// @ts-ignore
     * Code: `118`
// @ts-ignore
     */
// @ts-ignore
    PARAM_SERVER = 118,
// @ts-ignore
    /**
// @ts-ignore
     * Invalid title
// @ts-ignore
     *
// @ts-ignore
     * Code: `119`
// @ts-ignore
     */
// @ts-ignore
    PARAM_TITLE = 119,
// @ts-ignore
    /**
// @ts-ignore
     * Invalid hash
// @ts-ignore
     *
// @ts-ignore
     * Code: `121`
// @ts-ignore
     */
// @ts-ignore
    PARAM_HASH = 121,
// @ts-ignore
    /**
// @ts-ignore
     * Invalid photos
// @ts-ignore
     *
// @ts-ignore
     * Code: `122`
// @ts-ignore
     */
// @ts-ignore
    PARAM_PHOTOS = 122,
// @ts-ignore
    /**
// @ts-ignore
     * Invalid group id
// @ts-ignore
     *
// @ts-ignore
     * Code: `125`
// @ts-ignore
     */
// @ts-ignore
    PARAM_GROUP_ID = 125,
// @ts-ignore
    /**
// @ts-ignore
     * Invalid photo
// @ts-ignore
     *
// @ts-ignore
     * Code: `129`
// @ts-ignore
     */
// @ts-ignore
    PARAM_PHOTO = 129,
// @ts-ignore
    /**
// @ts-ignore
     * Page not found
// @ts-ignore
     *
// @ts-ignore
     * Code: `140`
// @ts-ignore
     */
// @ts-ignore
    PARAM_PAGE_ID = 140,
// @ts-ignore
    /**
// @ts-ignore
     * Access to page denied
// @ts-ignore
     *
// @ts-ignore
     * Code: `141`
// @ts-ignore
     */
// @ts-ignore
    ACCESS_PAGE = 141,
// @ts-ignore
    /**
// @ts-ignore
     * The mobile number of the user is unknown
// @ts-ignore
     *
// @ts-ignore
     * Code: `146`
// @ts-ignore
     */
// @ts-ignore
    MOBILE_NOT_ACTIVATED = 146,
// @ts-ignore
    /**
// @ts-ignore
     * Application has insufficient funds
// @ts-ignore
     *
// @ts-ignore
     * Code: `147`
// @ts-ignore
     */
// @ts-ignore
    INSUFFICIENT_FUNDS = 147,
// @ts-ignore
    /**
// @ts-ignore
     * Invalid timestamp
// @ts-ignore
     *
// @ts-ignore
     * Code: `150`
// @ts-ignore
     */
// @ts-ignore
    PARAM_TIMESTAMP = 150,
// @ts-ignore
    /**
// @ts-ignore
     * Invalid list id
// @ts-ignore
     *
// @ts-ignore
     * Code: `171`
// @ts-ignore
     */
// @ts-ignore
    FRIENDS_LIST_ID = 171,
// @ts-ignore
    /**
// @ts-ignore
     * Reached the maximum number of lists
// @ts-ignore
     *
// @ts-ignore
     * Code: `173`
// @ts-ignore
     */
// @ts-ignore
    FRIENDS_LIST_LIMIT = 173,
// @ts-ignore
    /**
// @ts-ignore
     * Cannot add user himself as friend
// @ts-ignore
     *
// @ts-ignore
     * Code: `174`
// @ts-ignore
     */
// @ts-ignore
    FRIENDS_ADD_YOURSELF = 174,
// @ts-ignore
    /**
// @ts-ignore
     * Cannot add this user to friends as they have put you on their blacklist
// @ts-ignore
     *
// @ts-ignore
     * Code: `175`
// @ts-ignore
     */
// @ts-ignore
    FRIENDS_ADD_IN_ENEMY = 175,
// @ts-ignore
    /**
// @ts-ignore
     * Cannot add this user to friends as you put him on blacklist
// @ts-ignore
     *
// @ts-ignore
     * Code: `176`
// @ts-ignore
     */
// @ts-ignore
    FRIENDS_ADD_ENEMY = 176,
// @ts-ignore
    /**
// @ts-ignore
     * Cannot add this user to friends as user not found
// @ts-ignore
     *
// @ts-ignore
     * Code: `177`
// @ts-ignore
     */
// @ts-ignore
    FRIENDS_ADD_NOT_FOUND = 177,
// @ts-ignore
    /**
// @ts-ignore
     * Note not found
// @ts-ignore
     *
// @ts-ignore
     * Code: `180`
// @ts-ignore
     */
// @ts-ignore
    PARAM_NOTE_ID = 180,
// @ts-ignore
    /**
// @ts-ignore
     * Access to note denied
// @ts-ignore
     *
// @ts-ignore
     * Code: `181`
// @ts-ignore
     */
// @ts-ignore
    ACCESS_NOTE = 181,
// @ts-ignore
    /**
// @ts-ignore
     * You can't comment this note
// @ts-ignore
     *
// @ts-ignore
     * Code: `182`
// @ts-ignore
     */
// @ts-ignore
    ACCESS_NOTE_COMMENT = 182,
// @ts-ignore
    /**
// @ts-ignore
     * Access to comment denied
// @ts-ignore
     *
// @ts-ignore
     * Code: `183`
// @ts-ignore
     */
// @ts-ignore
    ACCESS_COMMENT = 183,
// @ts-ignore
    /**
// @ts-ignore
     * Access denied
// @ts-ignore
     *
// @ts-ignore
     * Code: `200`
// @ts-ignore
     */
// @ts-ignore
    ACCESS_ALBUM = 200,
// @ts-ignore
    /**
// @ts-ignore
     * Access denied
// @ts-ignore
     *
// @ts-ignore
     * Code: `201`
// @ts-ignore
     */
// @ts-ignore
    ACCESS_AUDIO = 201,
// @ts-ignore
    /**
// @ts-ignore
     * Access to group denied
// @ts-ignore
     *
// @ts-ignore
     * Code: `203`
// @ts-ignore
     */
// @ts-ignore
    ACCESS_GROUP = 203,
// @ts-ignore
    /**
// @ts-ignore
     * Access denied
// @ts-ignore
     *
// @ts-ignore
     * Code: `204`
// @ts-ignore
     */
// @ts-ignore
    ACCESS_VIDEO = 204,
// @ts-ignore
    /**
// @ts-ignore
     * Access denied
// @ts-ignore
     *
// @ts-ignore
     * Code: `205`
// @ts-ignore
     */
// @ts-ignore
    ACCESS_MARKET = 205,
// @ts-ignore
    /**
// @ts-ignore
     * Access to wall's post denied
// @ts-ignore
     *
// @ts-ignore
     * Code: `210`
// @ts-ignore
     */
// @ts-ignore
    WALL_ACCESS_POST = 210,
// @ts-ignore
    /**
// @ts-ignore
     * Access to wall's comment denied
// @ts-ignore
     *
// @ts-ignore
     * Code: `211`
// @ts-ignore
     */
// @ts-ignore
    WALL_ACCESS_COMMENT = 211,
// @ts-ignore
    /**
// @ts-ignore
     * Access to post comments denied
// @ts-ignore
     *
// @ts-ignore
     * Code: `212`
// @ts-ignore
     */
// @ts-ignore
    WALL_ACCESS_REPLIES = 212,
// @ts-ignore
    /**
// @ts-ignore
     * Access to status replies denied
// @ts-ignore
     *
// @ts-ignore
     * Code: `213`
// @ts-ignore
     */
// @ts-ignore
    WALL_ACCESS_ADD_REPLY = 213,
// @ts-ignore
    /**
// @ts-ignore
     * Access to adding post denied
// @ts-ignore
     *
// @ts-ignore
     * Code: `214`
// @ts-ignore
     */
// @ts-ignore
    WALL_ADD_POST = 214,
// @ts-ignore
    /**
// @ts-ignore
     * Advertisement post was recently added
// @ts-ignore
     *
// @ts-ignore
     * Code: `219`
// @ts-ignore
     */
// @ts-ignore
    WALL_ADS_PUBLISHED = 219,
// @ts-ignore
    /**
// @ts-ignore
     * Too many recipients
// @ts-ignore
     *
// @ts-ignore
     * Code: `220`
// @ts-ignore
     */
// @ts-ignore
    WALL_TOO_MANY_RECIPIENTS = 220,
// @ts-ignore
    /**
// @ts-ignore
     * User disabled track name broadcast
// @ts-ignore
     *
// @ts-ignore
     * Code: `221`
// @ts-ignore
     */
// @ts-ignore
    STATUS_NO_AUDIO = 221,
// @ts-ignore
    /**
// @ts-ignore
     * Hyperlinks are forbidden
// @ts-ignore
     *
// @ts-ignore
     * Code: `222`
// @ts-ignore
     */
// @ts-ignore
    WALL_LINKS_FORBIDDEN = 222,
// @ts-ignore
    /**
// @ts-ignore
     * Too many replies
// @ts-ignore
     *
// @ts-ignore
     * Code: `223`
// @ts-ignore
     */
// @ts-ignore
    WALL_REPLY_OWNER_FLOOD = 223,
// @ts-ignore
    /**
// @ts-ignore
     * Too many ads posts
// @ts-ignore
     *
// @ts-ignore
     * Code: `224`
// @ts-ignore
     */
// @ts-ignore
    WALL_ADS_POST_LIMIT_REACHED = 224,
// @ts-ignore
    /**
// @ts-ignore
     * Donut is disabled
// @ts-ignore
     *
// @ts-ignore
     * Code: `225`
// @ts-ignore
     */
// @ts-ignore
    WALL_DONUT = 225,
// @ts-ignore
    /**
// @ts-ignore
     * Reaction can not be applied to the object
// @ts-ignore
     *
// @ts-ignore
     * Code: `232`
// @ts-ignore
     */
// @ts-ignore
    LIKES_REACTION_CAN_NOT_BE_APPLIED = 232,
// @ts-ignore
    /**
// @ts-ignore
     * Access to poll denied
// @ts-ignore
     *
// @ts-ignore
     * Code: `250`
// @ts-ignore
     */
// @ts-ignore
    POLLS_ACCESS = 250,
// @ts-ignore
    /**
// @ts-ignore
     * Invalid poll id
// @ts-ignore
     *
// @ts-ignore
     * Code: `251`
// @ts-ignore
     */
// @ts-ignore
    POLLS_POLL_ID = 251,
// @ts-ignore
    /**
// @ts-ignore
     * Invalid answer id
// @ts-ignore
     *
// @ts-ignore
     * Code: `252`
// @ts-ignore
     */
// @ts-ignore
    POLLS_ANSWER_ID = 252,
// @ts-ignore
    /**
// @ts-ignore
     * Access denied, please vote first
// @ts-ignore
     *
// @ts-ignore
     * Code: `253`
// @ts-ignore
     */
// @ts-ignore
    POLLS_ACCESS_WITHOUT_VOTE = 253,
// @ts-ignore
    /**
// @ts-ignore
     * Access to the groups list is denied due to the user's privacy settings
// @ts-ignore
     *
// @ts-ignore
     * Code: `260`
// @ts-ignore
     */
// @ts-ignore
    ACCESS_GROUPS = 260,
// @ts-ignore
    /**
// @ts-ignore
     * This album is full
// @ts-ignore
     *
// @ts-ignore
     * Code: `300`
// @ts-ignore
     */
// @ts-ignore
    ALBUM_FULL = 300,
// @ts-ignore
    /**
// @ts-ignore
     * Albums number limit is reached
// @ts-ignore
     *
// @ts-ignore
     * Code: `302`
// @ts-ignore
     */
// @ts-ignore
    ALBUMS_LIMIT = 302,
// @ts-ignore
    /**
// @ts-ignore
     * Permission denied. You must enable votes processing in application settings
// @ts-ignore
     *
// @ts-ignore
     * Code: `500`
// @ts-ignore
     */
// @ts-ignore
    VOTES_PERMISSION = 500,
// @ts-ignore
    /**
// @ts-ignore
     * Permission denied. You have no access to operations specified with given object(s)
// @ts-ignore
     *
// @ts-ignore
     * Code: `600`
// @ts-ignore
     */
// @ts-ignore
    ADS_PERMISSION = 600,
// @ts-ignore
    /**
// @ts-ignore
     * Permission denied. You have requested too many actions this day. Try later.
// @ts-ignore
     *
// @ts-ignore
     * Code: `601`
// @ts-ignore
     */
// @ts-ignore
    WEIGHTED_FLOOD = 601,
// @ts-ignore
    /**
// @ts-ignore
     * Some part of the request has not been completed
// @ts-ignore
     *
// @ts-ignore
     * Code: `602`
// @ts-ignore
     */
// @ts-ignore
    ADS_PARTIAL_SUCCESS = 602,
// @ts-ignore
    /**
// @ts-ignore
     * Some ads error occurs
// @ts-ignore
     *
// @ts-ignore
     * Code: `603`
// @ts-ignore
     */
// @ts-ignore
    ADS_SPECIFIC = 603,
// @ts-ignore
    /**
// @ts-ignore
     * Object deleted
// @ts-ignore
     *
// @ts-ignore
     * Code: `629`
// @ts-ignore
     */
// @ts-ignore
    ADS_OBJECT_DELETED = 629,
// @ts-ignore
    /**
// @ts-ignore
     * Cannot edit creator role
// @ts-ignore
     *
// @ts-ignore
     * Code: `700`
// @ts-ignore
     */
// @ts-ignore
    GROUP_CHANGE_CREATOR = 700,
// @ts-ignore
    /**
// @ts-ignore
     * User should be in club
// @ts-ignore
     *
// @ts-ignore
     * Code: `701`
// @ts-ignore
     */
// @ts-ignore
    GROUP_NOT_IN_CLUB = 701,
// @ts-ignore
    /**
// @ts-ignore
     * Too many officers in club
// @ts-ignore
     *
// @ts-ignore
     * Code: `702`
// @ts-ignore
     */
// @ts-ignore
    GROUP_TOO_MANY_OFFICERS = 702,
// @ts-ignore
    /**
// @ts-ignore
     * You need to enable 2FA for this action
// @ts-ignore
     *
// @ts-ignore
     * Code: `703`
// @ts-ignore
     */
// @ts-ignore
    GROUP_NEED_2FA = 703,
// @ts-ignore
    /**
// @ts-ignore
     * User needs to enable 2FA for this action
// @ts-ignore
     *
// @ts-ignore
     * Code: `704`
// @ts-ignore
     */
// @ts-ignore
    GROUP_HOST_NEED_2FA = 704,
// @ts-ignore
    /**
// @ts-ignore
     * Too many addresses in club
// @ts-ignore
     *
// @ts-ignore
     * Code: `706`
// @ts-ignore
     */
// @ts-ignore
    GROUP_TOO_MANY_ADDRESSES = 706,
// @ts-ignore
    /**
// @ts-ignore
     * Application is not installed in community
// @ts-ignore
     *
// @ts-ignore
     * Code: `711`
// @ts-ignore
     */
// @ts-ignore
    GROUP_APP_IS_NOT_INSTALLED_IN_COMMUNITY = 711,
// @ts-ignore
    /**
// @ts-ignore
     * Invite link is invalid - expired, deleted or not exists
// @ts-ignore
     *
// @ts-ignore
     * Code: `714`
// @ts-ignore
     */
// @ts-ignore
    GROUP_INVITE_LINKS_NOT_VALID = 714,
// @ts-ignore
    /**
// @ts-ignore
     * This video is already added
// @ts-ignore
     *
// @ts-ignore
     * Code: `800`
// @ts-ignore
     */
// @ts-ignore
    VIDEO_ALREADY_ADDED = 800,
// @ts-ignore
    /**
// @ts-ignore
     * Comments for this video are closed
// @ts-ignore
     *
// @ts-ignore
     * Code: `801`
// @ts-ignore
     */
// @ts-ignore
    VIDEO_COMMENTS_CLOSED = 801,
// @ts-ignore
    /**
// @ts-ignore
     * Can't send messages for users from blacklist
// @ts-ignore
     *
// @ts-ignore
     * Code: `900`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_USER_BLOCKED = 900,
// @ts-ignore
    /**
// @ts-ignore
     * Can't send messages for users without permission
// @ts-ignore
     *
// @ts-ignore
     * Code: `901`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_DENY_SEND = 901,
// @ts-ignore
    /**
// @ts-ignore
     * Can't send messages to this user due to their privacy settings
// @ts-ignore
     *
// @ts-ignore
     * Code: `902`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_PRIVACY = 902,
// @ts-ignore
    /**
// @ts-ignore
     * Value of ts or pts is too old
// @ts-ignore
     *
// @ts-ignore
     * Code: `907`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_TOO_OLD_PTS = 907,
// @ts-ignore
    /**
// @ts-ignore
     * Value of ts or pts is too new
// @ts-ignore
     *
// @ts-ignore
     * Code: `908`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_TOO_NEW_PTS = 908,
// @ts-ignore
    /**
// @ts-ignore
     * Can't edit this message, because it's too old
// @ts-ignore
     *
// @ts-ignore
     * Code: `909`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_EDIT_EXPIRED = 909,
// @ts-ignore
    /**
// @ts-ignore
     * Can't sent this message, because it's too big
// @ts-ignore
     *
// @ts-ignore
     * Code: `910`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_TOO_BIG = 910,
// @ts-ignore
    /**
// @ts-ignore
     * Keyboard format is invalid
// @ts-ignore
     *
// @ts-ignore
     * Code: `911`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_KEYBOARD_INVALID = 911,
// @ts-ignore
    /**
// @ts-ignore
     * This is a chat bot feature, change this status in settings
// @ts-ignore
     *
// @ts-ignore
     * Code: `912`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_CHAT_BOT_FEATURE = 912,
// @ts-ignore
    /**
// @ts-ignore
     * Too many forwarded messages
// @ts-ignore
     *
// @ts-ignore
     * Code: `913`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_TOO_LONG_FORWARDS = 913,
// @ts-ignore
    /**
// @ts-ignore
     * Message is too long
// @ts-ignore
     *
// @ts-ignore
     * Code: `914`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_TOO_LONG_MESSAGE = 914,
// @ts-ignore
    /**
// @ts-ignore
     * You don't have access to this chat
// @ts-ignore
     *
// @ts-ignore
     * Code: `917`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_CHAT_USER_NO_ACCESS = 917,
// @ts-ignore
    /**
// @ts-ignore
     * You can't see invite link for this chat
// @ts-ignore
     *
// @ts-ignore
     * Code: `919`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_CANT_SEE_INVITE_LINK = 919,
// @ts-ignore
    /**
// @ts-ignore
     * Can't edit this kind of message
// @ts-ignore
     *
// @ts-ignore
     * Code: `920`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_EDIT_KIND_DISALLOWED = 920,
// @ts-ignore
    /**
// @ts-ignore
     * Can't forward these messages
// @ts-ignore
     *
// @ts-ignore
     * Code: `921`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_CANT_FWD = 921,
// @ts-ignore
    /**
// @ts-ignore
     * Can't delete this message for everybody
// @ts-ignore
     *
// @ts-ignore
     * Code: `924`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_CANT_DELETE_FOR_ALL = 924,
// @ts-ignore
    /**
// @ts-ignore
     * You are not admin of this chat
// @ts-ignore
     *
// @ts-ignore
     * Code: `925`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_CHAT_NOT_ADMIN = 925,
// @ts-ignore
    /**
// @ts-ignore
     * Chat does not exist
// @ts-ignore
     *
// @ts-ignore
     * Code: `927`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_CHAT_NOT_EXIST = 927,
// @ts-ignore
    /**
// @ts-ignore
     * You can't change invite link for this chat
// @ts-ignore
     *
// @ts-ignore
     * Code: `931`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_CANT_CHANGE_INVITE_LINK = 931,
// @ts-ignore
    /**
// @ts-ignore
     * Your community can't interact with this peer
// @ts-ignore
     *
// @ts-ignore
     * Code: `932`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_GROUP_PEER_ACCESS = 932,
// @ts-ignore
    /**
// @ts-ignore
     * User not found in chat
// @ts-ignore
     *
// @ts-ignore
     * Code: `935`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_CHAT_USER_NOT_IN_CHAT = 935,
// @ts-ignore
    /**
// @ts-ignore
     * Contact not found
// @ts-ignore
     *
// @ts-ignore
     * Code: `936`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_CONTACT_NOT_FOUND = 936,
// @ts-ignore
    /**
// @ts-ignore
     * Message request already sent
// @ts-ignore
     *
// @ts-ignore
     * Code: `939`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_MESSAGE_REQUEST_ALREADY_SENT = 939,
// @ts-ignore
    /**
// @ts-ignore
     * Too many posts in messages
// @ts-ignore
     *
// @ts-ignore
     * Code: `940`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_TOO_MANY_POSTS = 940,
// @ts-ignore
    /**
// @ts-ignore
     * Cannot pin one-time story
// @ts-ignore
     *
// @ts-ignore
     * Code: `942`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_CANT_PIN_ONE_TIME_STORY = 942,
// @ts-ignore
    /**
// @ts-ignore
     * Cannot use this intent
// @ts-ignore
     *
// @ts-ignore
     * Code: `943`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_INTENT_CANT_USE = 943,
// @ts-ignore
    /**
// @ts-ignore
     * Limits overflow for this intent
// @ts-ignore
     *
// @ts-ignore
     * Code: `944`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_INTENT_LIMIT_OVERFLOW = 944,
// @ts-ignore
    /**
// @ts-ignore
     * Chat was disabled
// @ts-ignore
     *
// @ts-ignore
     * Code: `945`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_CHAT_DISABLED = 945,
// @ts-ignore
    /**
// @ts-ignore
     * Chat not supported
// @ts-ignore
     *
// @ts-ignore
     * Code: `946`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_CHAT_UNSUPPORTED = 946,
// @ts-ignore
    /**
// @ts-ignore
     * Can't add user to chat, because user has no access to group
// @ts-ignore
     *
// @ts-ignore
     * Code: `947`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_MEMBER_ACCESS_TO_GROUP_DENIED = 947,
// @ts-ignore
    /**
// @ts-ignore
     * Can't edit pinned message yet
// @ts-ignore
     *
// @ts-ignore
     * Code: `949`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_CANT_EDIT_PINNED_YET = 949,
// @ts-ignore
    /**
// @ts-ignore
     * Can't send message, reply timed out
// @ts-ignore
     *
// @ts-ignore
     * Code: `950`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_PEER_BLOCKED_REASON_BY_TIME = 950,
// @ts-ignore
    /**
// @ts-ignore
     * You can't access donut chat without subscription
// @ts-ignore
     *
// @ts-ignore
     * Code: `962`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_USER_NOT_DON = 962,
// @ts-ignore
    /**
// @ts-ignore
     * Message cannot be forwarded
// @ts-ignore
     *
// @ts-ignore
     * Code: `969`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_MESSAGE_CANNOT_BE_FORWARDED = 969,
// @ts-ignore
    /**
// @ts-ignore
     * Cannot pin an expiring message
// @ts-ignore
     *
// @ts-ignore
     * Code: `970`
// @ts-ignore
     */
// @ts-ignore
    MESSAGES_CANT_PIN_EXPIRING_MESSAGE = 970,
// @ts-ignore
    /**
// @ts-ignore
     * Too many auth attempts, try again later
// @ts-ignore
     *
// @ts-ignore
     * Code: `1105`
// @ts-ignore
     */
// @ts-ignore
    AUTH_FLOOD_ERROR = 1105,
// @ts-ignore
    /**
// @ts-ignore
     * Anonymous token has expired
// @ts-ignore
     *
// @ts-ignore
     * Code: `1114`
// @ts-ignore
     */
// @ts-ignore
    AUTH_ANONYMOUS_TOKEN_HAS_EXPIRED = 1114,
// @ts-ignore
    /**
// @ts-ignore
     * Anonymous token is invalid
// @ts-ignore
     *
// @ts-ignore
     * Code: `1116`
// @ts-ignore
     */
// @ts-ignore
    AUTH_ANONYMOUS_TOKEN_IS_INVALID = 1116,
// @ts-ignore
    /**
// @ts-ignore
     * Invalid document id
// @ts-ignore
     *
// @ts-ignore
     * Code: `1150`
// @ts-ignore
     */
// @ts-ignore
    PARAM_DOC_ID = 1150,
// @ts-ignore
    /**
// @ts-ignore
     * Access to document deleting is denied
// @ts-ignore
     *
// @ts-ignore
     * Code: `1151`
// @ts-ignore
     */
// @ts-ignore
    PARAM_DOC_DELETE_ACCESS = 1151,
// @ts-ignore
    /**
// @ts-ignore
     * Invalid document title
// @ts-ignore
     *
// @ts-ignore
     * Code: `1152`
// @ts-ignore
     */
// @ts-ignore
    PARAM_DOC_TITLE = 1152,
// @ts-ignore
    /**
// @ts-ignore
     * Access to document is denied
// @ts-ignore
     *
// @ts-ignore
     * Code: `1153`
// @ts-ignore
     */
// @ts-ignore
    PARAM_DOC_ACCESS = 1153,
// @ts-ignore
    /**
// @ts-ignore
     * Original photo was changed
// @ts-ignore
     *
// @ts-ignore
     * Code: `1160`
// @ts-ignore
     */
// @ts-ignore
    PHOTO_CHANGED = 1160,
// @ts-ignore
    /**
// @ts-ignore
     * Too many feed lists
// @ts-ignore
     *
// @ts-ignore
     * Code: `1170`
// @ts-ignore
     */
// @ts-ignore
    TOO_MANY_LISTS = 1170,
// @ts-ignore
    /**
// @ts-ignore
     * This achievement is already unlocked
// @ts-ignore
     *
// @ts-ignore
     * Code: `1251`
// @ts-ignore
     */
// @ts-ignore
    APPS_ALREADY_UNLOCKED = 1251,
// @ts-ignore
    /**
// @ts-ignore
     * Subscription not found
// @ts-ignore
     *
// @ts-ignore
     * Code: `1256`
// @ts-ignore
     */
// @ts-ignore
    APPS_SUBSCRIPTION_NOT_FOUND = 1256,
// @ts-ignore
    /**
// @ts-ignore
     * Subscription is in invalid status
// @ts-ignore
     *
// @ts-ignore
     * Code: `1257`
// @ts-ignore
     */
// @ts-ignore
    APPS_SUBSCRIPTION_INVALID_STATUS = 1257,
// @ts-ignore
    /**
// @ts-ignore
     * Invalid screen name
// @ts-ignore
     *
// @ts-ignore
     * Code: `1260`
// @ts-ignore
     */
// @ts-ignore
    INVALID_ADDRESS = 1260,
// @ts-ignore
    /**
// @ts-ignore
     * Catalog is not available for this user
// @ts-ignore
     *
// @ts-ignore
     * Code: `1310`
// @ts-ignore
     */
// @ts-ignore
    COMMUNITIES_CATALOG_DISABLED = 1310,
// @ts-ignore
    /**
// @ts-ignore
     * Catalog categories are not available for this user
// @ts-ignore
     *
// @ts-ignore
     * Code: `1311`
// @ts-ignore
     */
// @ts-ignore
    COMMUNITIES_CATEGORIES_DISABLED = 1311,
// @ts-ignore
    /**
// @ts-ignore
     * Too late for restore
// @ts-ignore
     *
// @ts-ignore
     * Code: `1400`
// @ts-ignore
     */
// @ts-ignore
    MARKET_RESTORE_TOO_LATE = 1400,
// @ts-ignore
    /**
// @ts-ignore
     * Comments for this market are closed
// @ts-ignore
     *
// @ts-ignore
     * Code: `1401`
// @ts-ignore
     */
// @ts-ignore
    MARKET_COMMENTS_CLOSED = 1401,
// @ts-ignore
    /**
// @ts-ignore
     * Album not found
// @ts-ignore
     *
// @ts-ignore
     * Code: `1402`
// @ts-ignore
     */
// @ts-ignore
    MARKET_ALBUM_NOT_FOUND = 1402,
// @ts-ignore
    /**
// @ts-ignore
     * Item not found
// @ts-ignore
     *
// @ts-ignore
     * Code: `1403`
// @ts-ignore
     */
// @ts-ignore
    MARKET_ITEM_NOT_FOUND = 1403,
// @ts-ignore
    /**
// @ts-ignore
     * Item already added to album
// @ts-ignore
     *
// @ts-ignore
     * Code: `1404`
// @ts-ignore
     */
// @ts-ignore
    MARKET_ITEM_ALREADY_ADDED = 1404,
// @ts-ignore
    /**
// @ts-ignore
     * Too many items
// @ts-ignore
     *
// @ts-ignore
     * Code: `1405`
// @ts-ignore
     */
// @ts-ignore
    MARKET_TOO_MANY_ITEMS = 1405,
// @ts-ignore
    /**
// @ts-ignore
     * Too many items in album
// @ts-ignore
     *
// @ts-ignore
     * Code: `1406`
// @ts-ignore
     */
// @ts-ignore
    MARKET_TOO_MANY_ITEMS_IN_ALBUM = 1406,
// @ts-ignore
    /**
// @ts-ignore
     * Too many albums
// @ts-ignore
     *
// @ts-ignore
     * Code: `1407`
// @ts-ignore
     */
// @ts-ignore
    MARKET_TOO_MANY_ALBUMS = 1407,
// @ts-ignore
    /**
// @ts-ignore
     * Item has bad links in description
// @ts-ignore
     *
// @ts-ignore
     * Code: `1408`
// @ts-ignore
     */
// @ts-ignore
    MARKET_ITEM_HAS_BAD_LINKS = 1408,
// @ts-ignore
    /**
// @ts-ignore
     * Extended market not enabled
// @ts-ignore
     *
// @ts-ignore
     * Code: `1409`
// @ts-ignore
     */
// @ts-ignore
    MARKET_EXTENDED_NOT_ENABLED = 1409,
// @ts-ignore
    /**
// @ts-ignore
     * Grouping items with different properties
// @ts-ignore
     *
// @ts-ignore
     * Code: `1412`
// @ts-ignore
     */
// @ts-ignore
    MARKET_GROUPING_ITEMS_WITH_DIFFERENT_PROPERTIES = 1412,
// @ts-ignore
    /**
// @ts-ignore
     * Grouping already has such variant
// @ts-ignore
     *
// @ts-ignore
     * Code: `1413`
// @ts-ignore
     */
// @ts-ignore
    MARKET_GROUPING_ALREADY_HAS_SUCH_VARIANT = 1413,
// @ts-ignore
    /**
// @ts-ignore
     * Variant not found
// @ts-ignore
     *
// @ts-ignore
     * Code: `1416`
// @ts-ignore
     */
// @ts-ignore
    MARKET_VARIANT_NOT_FOUND = 1416,
// @ts-ignore
    /**
// @ts-ignore
     * Property not found
// @ts-ignore
     *
// @ts-ignore
     * Code: `1417`
// @ts-ignore
     */
// @ts-ignore
    MARKET_PROPERTY_NOT_FOUND = 1417,
// @ts-ignore
    /**
// @ts-ignore
     * Grouping must have two or more items
// @ts-ignore
     *
// @ts-ignore
     * Code: `1425`
// @ts-ignore
     */
// @ts-ignore
    MARKET_GROUPING_MUST_CONTAIN_MORE_THAN_ONE_ITEM = 1425,
// @ts-ignore
    /**
// @ts-ignore
     * Item must have distinct properties
// @ts-ignore
     *
// @ts-ignore
     * Code: `1426`
// @ts-ignore
     */
// @ts-ignore
    MARKET_GROUPING_ITEMS_MUST_HAVE_DISTINCT_PROPERTIES = 1426,
// @ts-ignore
    /**
// @ts-ignore
     * Cart is empty
// @ts-ignore
     *
// @ts-ignore
     * Code: `1427`
// @ts-ignore
     */
// @ts-ignore
    MARKET_ORDERS_NO_CART_ITEMS = 1427,
// @ts-ignore
    /**
// @ts-ignore
     * Specify width, length, height and weight all together
// @ts-ignore
     *
// @ts-ignore
     * Code: `1429`
// @ts-ignore
     */
// @ts-ignore
    MARKET_INVALID_DIMENSIONS = 1429,
// @ts-ignore
    /**
// @ts-ignore
     * VK Pay status can not be changed
// @ts-ignore
     *
// @ts-ignore
     * Code: `1430`
// @ts-ignore
     */
// @ts-ignore
    MARKET_CANT_CHANGE_VKPAY_STATUS = 1430,
// @ts-ignore
    /**
// @ts-ignore
     * Market was already enabled in this group
// @ts-ignore
     *
// @ts-ignore
     * Code: `1431`
// @ts-ignore
     */
// @ts-ignore
    MARKET_SHOP_ALREADY_ENABLED = 1431,
// @ts-ignore
    /**
// @ts-ignore
     * Market was already disabled in this group
// @ts-ignore
     *
// @ts-ignore
     * Code: `1432`
// @ts-ignore
     */
// @ts-ignore
    MARKET_SHOP_ALREADY_DISABLED = 1432,
// @ts-ignore
    /**
// @ts-ignore
     * Invalid image crop format
// @ts-ignore
     *
// @ts-ignore
     * Code: `1433`
// @ts-ignore
     */
// @ts-ignore
    MARKET_PHOTOS_CROP_INVALID_FORMAT = 1433,
// @ts-ignore
    /**
// @ts-ignore
     * Crop bottom right corner is outside of the image
// @ts-ignore
     *
// @ts-ignore
     * Code: `1434`
// @ts-ignore
     */
// @ts-ignore
    MARKET_PHOTOS_CROP_OVERFLOW = 1434,
// @ts-ignore
    /**
// @ts-ignore
     * Crop size is less than the minimum
// @ts-ignore
     *
// @ts-ignore
     * Code: `1435`
// @ts-ignore
     */
// @ts-ignore
    MARKET_PHOTOS_CROP_SIZE_TOO_LOW = 1435,
// @ts-ignore
    /**
// @ts-ignore
     * Market not enabled
// @ts-ignore
     *
// @ts-ignore
     * Code: `1438`
// @ts-ignore
     */
// @ts-ignore
    MARKET_NOT_ENABLED = 1438,
// @ts-ignore
    /**
// @ts-ignore
     * Main album can not be hidden
// @ts-ignore
     *
// @ts-ignore
     * Code: `1446`
// @ts-ignore
     */
// @ts-ignore
    MARKET_ALBUM_MAIN_HIDDEN = 1446,
// @ts-ignore
    /**
// @ts-ignore
     * Story has already expired
// @ts-ignore
     *
// @ts-ignore
     * Code: `1600`
// @ts-ignore
     */
// @ts-ignore
    STORY_EXPIRED = 1600,
// @ts-ignore
    /**
// @ts-ignore
     * Incorrect reply privacy
// @ts-ignore
     *
// @ts-ignore
     * Code: `1602`
// @ts-ignore
     */
// @ts-ignore
    STORY_INCORRECT_REPLY_PRIVACY = 1602,
// @ts-ignore
    /**
// @ts-ignore
     * Card not found
// @ts-ignore
     *
// @ts-ignore
     * Code: `1900`
// @ts-ignore
     */
// @ts-ignore
    PRETTY_CARDS_CARD_NOT_FOUND = 1900,
// @ts-ignore
    /**
// @ts-ignore
     * Too many cards
// @ts-ignore
     *
// @ts-ignore
     * Code: `1901`
// @ts-ignore
     */
// @ts-ignore
    PRETTY_CARDS_TOO_MANY_CARDS = 1901,
// @ts-ignore
    /**
// @ts-ignore
     * Card is connected to post
// @ts-ignore
     *
// @ts-ignore
     * Code: `1902`
// @ts-ignore
     */
// @ts-ignore
    PRETTY_CARDS_CARD_IS_CONNECTED_TO_POST = 1902,
// @ts-ignore
    /**
// @ts-ignore
     * Servers number limit is reached
// @ts-ignore
     *
// @ts-ignore
     * Code: `2000`
// @ts-ignore
     */
// @ts-ignore
    CALLBACK_API_SERVERS_LIMIT = 2000,
// @ts-ignore
    /**
// @ts-ignore
     * Stickers are not purchased
// @ts-ignore
     *
// @ts-ignore
     * Code: `2100`
// @ts-ignore
     */
// @ts-ignore
    STICKERS_NOT_PURCHASED = 2100,
// @ts-ignore
    /**
// @ts-ignore
     * Too many favorite stickers
// @ts-ignore
     *
// @ts-ignore
     * Code: `2101`
// @ts-ignore
     */
// @ts-ignore
    STICKERS_TOO_MANY_FAVORITES = 2101,
// @ts-ignore
    /**
// @ts-ignore
     * Stickers are not favorite
// @ts-ignore
     *
// @ts-ignore
     * Code: `2102`
// @ts-ignore
     */
// @ts-ignore
    STICKERS_NOT_FAVORITE = 2102,
// @ts-ignore
    /**
// @ts-ignore
     * Specified link is incorrect (can't find source)
// @ts-ignore
     *
// @ts-ignore
     * Code: `3102`
// @ts-ignore
     */
// @ts-ignore
    WALL_CHECK_LINK_CANT_DETERMINE_SOURCE = 3102,
// @ts-ignore
    /**
// @ts-ignore
     * Recaptcha needed
// @ts-ignore
     *
// @ts-ignore
     * Code: `3300`
// @ts-ignore
     */
// @ts-ignore
    RECAPTCHA = 3300,
// @ts-ignore
    /**
// @ts-ignore
     * Phone validation needed
// @ts-ignore
     *
// @ts-ignore
     * Code: `3301`
// @ts-ignore
     */
// @ts-ignore
    PHONE_VALIDATION_NEED = 3301,
// @ts-ignore
    /**
// @ts-ignore
     * Password validation needed
// @ts-ignore
     *
// @ts-ignore
     * Code: `3302`
// @ts-ignore
     */
// @ts-ignore
    PASSWORD_VALIDATION_NEED = 3302,
// @ts-ignore
    /**
// @ts-ignore
     * Otp app validation needed
// @ts-ignore
     *
// @ts-ignore
     * Code: `3303`
// @ts-ignore
     */
// @ts-ignore
    OTP_VALIDATION_NEED = 3303,
// @ts-ignore
    /**
// @ts-ignore
     * Email confirmation needed
// @ts-ignore
     *
// @ts-ignore
     * Code: `3304`
// @ts-ignore
     */
// @ts-ignore
    EMAIL_CONFIRMATION_NEED = 3304,
// @ts-ignore
    /**
// @ts-ignore
     * Assert votes
// @ts-ignore
     *
// @ts-ignore
     * Code: `3305`
// @ts-ignore
     */
// @ts-ignore
    ASSERT_VOTES = 3305,
// @ts-ignore
    /**
// @ts-ignore
     * Token extension required
// @ts-ignore
     *
// @ts-ignore
     * Code: `3609`
// @ts-ignore
     */
// @ts-ignore
    TOKEN_EXTENSION_REQUIRED = 3609,
// @ts-ignore
    /**
// @ts-ignore
     * User is deactivated
// @ts-ignore
     *
// @ts-ignore
     * Code: `3610`
// @ts-ignore
     */
// @ts-ignore
    USER_DEACTIVATED = 3610,
// @ts-ignore
    /**
// @ts-ignore
     * Service is deactivated for user
// @ts-ignore
     *
// @ts-ignore
     * Code: `3611`
// @ts-ignore
     */
// @ts-ignore
    USER_SERVICE_DEACTIVATED = 3611,
// @ts-ignore
    /**
// @ts-ignore
     * Can't set AliExpress tag to this type of object
// @ts-ignore
     *
// @ts-ignore
     * Code: `3800`
// @ts-ignore
     */
// @ts-ignore
    FAVE_ALIEXPRESS_TAG = 3800
// @ts-ignore
}
// @ts-ignore

