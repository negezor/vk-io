/* eslint-disable */
export enum APIErrorCode {
    /**
     * Unknown error occurred
     *
     * Code: `1`
     */
    UNKNOWN = 1,
    /**
     * Application is disabled. Enable your application or use test mode
     *
     * Code: `2`
     */
    DISABLED = 2,
    /**
     * Unknown method passed
     *
     * Code: `3`
     */
    METHOD = 3,
    /**
     * Incorrect signature
     *
     * Code: `4`
     */
    SIGNATURE = 4,
    /**
     * User authorization failed
     *
     * Code: `5`
     */
    AUTH = 5,
    /**
     * Too many requests per second
     *
     * Code: `6`
     */
    TOO_MANY = 6,
    /**
     * Permission to perform this action is denied
     *
     * Code: `7`
     */
    PERMISSION = 7,
    /**
     * Invalid request
     *
     * Code: `8`
     */
    REQUEST = 8,
    /**
     * Flood control
     *
     * Code: `9`
     */
    FLOOD = 9,
    /**
     * Internal server error
     *
     * Code: `10`
     */
    SERVER = 10,
    /**
     * In test mode application should be disabled or user should be authorized
     *
     * Code: `11`
     */
    ENABLED_IN_TEST = 11,
    /**
     * Unable to compile code
     *
     * Code: `12`
     */
    COMPILE = 12,
    /**
     * Runtime error occurred during code invocation
     *
     * Code: `13`
     */
    RUNTIME = 13,
    /**
     * Captcha needed
     *
     * Code: `14`
     */
    CAPTCHA = 14,
    /**
     * Access denied
     *
     * Code: `15`
     */
    ACCESS = 15,
    /**
     * HTTP authorization failed
     *
     * Code: `16`
     */
    AUTH_HTTPS = 16,
    /**
     * Validation required
     *
     * Code: `17`
     */
    AUTH_VALIDATION = 17,
    /**
     * User was deleted or banned
     *
     * Code: `18`
     */
    USER_DELETED = 18,
    /**
     * Content blocked
     *
     * Code: `19`
     */
    BLOCKED = 19,
    /**
     * Permission to perform this action is denied for non-standalone applications
     *
     * Code: `20`
     */
    METHOD_PERMISSION = 20,
    /**
     * Permission to perform this action is allowed only for standalone and OpenAPI applications
     *
     * Code: `21`
     */
    METHOD_ADS = 21,
    /**
     * Upload error
     *
     * Code: `22`
     */
    UPLOAD = 22,
    /**
     * This method was disabled
     *
     * Code: `23`
     */
    METHOD_DISABLED = 23,
    /**
     * Confirmation required
     *
     * Code: `24`
     */
    NEED_CONFIRMATION = 24,
    /**
     * Token confirmation required
     *
     * Code: `25`
     */
    NEED_TOKEN_CONFIRMATION = 25,
    /**
     * Group authorization failed
     *
     * Code: `27`
     */
    GROUP_AUTH = 27,
    /**
     * Application authorization failed
     *
     * Code: `28`
     */
    APP_AUTH = 28,
    /**
     * Rate limit reached
     *
     * Code: `29`
     */
    RATE_LIMIT = 29,
    /**
     * This profile is private
     *
     * Code: `30`
     */
    PRIVATE_PROFILE = 30,
    /**
     * Not implemented yet
     *
     * Code: `33`
     */
    NOT_IMPLEMENTED_YET = 33,
    /**
     * Client update needed
     *
     * Code: `35`
     */
    CLIENT_UPDATE_NEEDED = 35,
    /**
     * Method execution was interrupted due to timeout
     *
     * Code: `36`
     */
    TIMEOUT = 36,
    /**
     * User was banned
     *
     * Code: `37`
     */
    USER_BANNED = 37,
    /**
     * Unknown application
     *
     * Code: `38`
     */
    UNKNOWN_APPLICATION = 38,
    /**
     * Unknown user
     *
     * Code: `39`
     */
    UNKNOWN_USER = 39,
    /**
     * Unknown group
     *
     * Code: `40`
     */
    UNKNOWN_GROUP = 40,
    /**
     * Additional signup required
     *
     * Code: `41`
     */
    ADDITIONAL_SIGNUP_REQUIRED = 41,
    /**
     * One of the parameters specified was missing or invalid
     *
     * Code: `100`
     */
    PARAM = 100,
    /**
     * Invalid application API ID
     *
     * Code: `101`
     */
    PARAM_API_ID = 101,
    /**
     * Out of limits
     *
     * Code: `103`
     */
    LIMITS = 103,
    /**
     * Not found
     *
     * Code: `104`
     */
    NOT_FOUND = 104,
    /**
     * Couldn't save file
     *
     * Code: `105`
     */
    SAVE_FILE = 105,
    /**
     * Unable to process action
     *
     * Code: `106`
     */
    ACTION_FAILED = 106,
    /**
     * Invalid user id
     *
     * Code: `113`
     */
    PARAM_USER_ID = 113,
    /**
     * Invalid album id
     *
     * Code: `114`
     */
    PARAM_ALBUM_ID = 114,
    /**
     * Invalid server
     *
     * Code: `118`
     */
    PARAM_SERVER = 118,
    /**
     * Invalid title
     *
     * Code: `119`
     */
    PARAM_TITLE = 119,
    /**
     * Invalid hash
     *
     * Code: `121`
     */
    PARAM_HASH = 121,
    /**
     * Invalid photos
     *
     * Code: `122`
     */
    PARAM_PHOTOS = 122,
    /**
     * Invalid group id
     *
     * Code: `125`
     */
    PARAM_GROUP_ID = 125,
    /**
     * Invalid photo
     *
     * Code: `129`
     */
    PARAM_PHOTO = 129,
    /**
     * Page not found
     *
     * Code: `140`
     */
    PARAM_PAGE_ID = 140,
    /**
     * Access to page denied
     *
     * Code: `141`
     */
    ACCESS_PAGE = 141,
    /**
     * The mobile number of the user is unknown
     *
     * Code: `146`
     */
    MOBILE_NOT_ACTIVATED = 146,
    /**
     * Application has insufficient funds
     *
     * Code: `147`
     */
    INSUFFICIENT_FUNDS = 147,
    /**
     * Access to the menu of the user denied
     *
     * Code: `148`
     */
    ACCESS_MENU = 148,
    /**
     * Invalid timestamp
     *
     * Code: `150`
     */
    PARAM_TIMESTAMP = 150,
    /**
     * Invalid list id
     *
     * Code: `171`
     */
    FRIENDS_LIST_ID = 171,
    /**
     * Reached the maximum number of lists
     *
     * Code: `173`
     */
    FRIENDS_LIST_LIMIT = 173,
    /**
     * Cannot add user himself as friend
     *
     * Code: `174`
     */
    FRIENDS_ADD_YOURSELF = 174,
    /**
     * Cannot add this user to friends as they have put you on their blacklist
     *
     * Code: `175`
     */
    FRIENDS_ADD_IN_ENEMY = 175,
    /**
     * Cannot add this user to friends as you put him on blacklist
     *
     * Code: `176`
     */
    FRIENDS_ADD_ENEMY = 176,
    /**
     * Cannot add this user to friends as user not found
     *
     * Code: `177`
     */
    FRIENDS_ADD_NOT_FOUND = 177,
    /**
     * Note not found
     *
     * Code: `180`
     */
    PARAM_NOTE_ID = 180,
    /**
     * Access to note denied
     *
     * Code: `181`
     */
    ACCESS_NOTE = 181,
    /**
     * You can't comment this note
     *
     * Code: `182`
     */
    ACCESS_NOTE_COMMENT = 182,
    /**
     * Access to comment denied
     *
     * Code: `183`
     */
    ACCESS_COMMENT = 183,
    /**
     * Access denied
     *
     * Code: `200`
     */
    ACCESS_ALBUM = 200,
    /**
     * Access denied
     *
     * Code: `201`
     */
    ACCESS_AUDIO = 201,
    /**
     * Access to group denied
     *
     * Code: `203`
     */
    ACCESS_GROUP = 203,
    /**
     * Access denied
     *
     * Code: `204`
     */
    ACCESS_VIDEO = 204,
    /**
     * Access denied
     *
     * Code: `205`
     */
    ACCESS_MARKET = 205,
    /**
     * Access to wall's post denied
     *
     * Code: `210`
     */
    WALL_ACCESS_POST = 210,
    /**
     * Access to wall's comment denied
     *
     * Code: `211`
     */
    WALL_ACCESS_COMMENT = 211,
    /**
     * Access to post comments denied
     *
     * Code: `212`
     */
    WALL_ACCESS_REPLIES = 212,
    /**
     * Access to status replies denied
     *
     * Code: `213`
     */
    WALL_ACCESS_ADD_REPLY = 213,
    /**
     * Access to adding post denied
     *
     * Code: `214`
     */
    WALL_ADD_POST = 214,
    /**
     * Advertisement post was recently added
     *
     * Code: `219`
     */
    WALL_ADS_PUBLISHED = 219,
    /**
     * Too many recipients
     *
     * Code: `220`
     */
    WALL_TOO_MANY_RECIPIENTS = 220,
    /**
     * User disabled track name broadcast
     *
     * Code: `221`
     */
    STATUS_NO_AUDIO = 221,
    /**
     * Hyperlinks are forbidden
     *
     * Code: `222`
     */
    WALL_LINKS_FORBIDDEN = 222,
    /**
     * Too many replies
     *
     * Code: `223`
     */
    WALL_REPLY_OWNER_FLOOD = 223,
    /**
     * Too many ads posts
     *
     * Code: `224`
     */
    WALL_ADS_POST_LIMIT_REACHED = 224,
    /**
     * Donut is disabled
     *
     * Code: `225`
     */
    WALL_DONUT = 225,
    /**
     * Reaction can not be applied to the object
     *
     * Code: `232`
     */
    LIKES_REACTION_CAN_NOT_BE_APPLIED = 232,
    /**
     * Access to poll denied
     *
     * Code: `250`
     */
    POLLS_ACCESS = 250,
    /**
     * Invalid poll id
     *
     * Code: `251`
     */
    POLLS_POLL_ID = 251,
    /**
     * Invalid answer id
     *
     * Code: `252`
     */
    POLLS_ANSWER_ID = 252,
    /**
     * Access denied, please vote first
     *
     * Code: `253`
     */
    POLLS_ACCESS_WITHOUT_VOTE = 253,
    /**
     * Access to the groups list is denied due to the user's privacy settings
     *
     * Code: `260`
     */
    ACCESS_GROUPS = 260,
    /**
     * This album is full
     *
     * Code: `300`
     */
    ALBUM_FULL = 300,
    /**
     * Albums number limit is reached
     *
     * Code: `302`
     */
    ALBUMS_LIMIT = 302,
    /**
     * Permission denied. You must enable votes processing in application settings
     *
     * Code: `500`
     */
    VOTES_PERMISSION = 500,
    /**
     * Permission denied. You have no access to operations specified with given object(s)
     *
     * Code: `600`
     */
    ADS_PERMISSION = 600,
    /**
     * Permission denied. You have requested too many actions this day. Try later.
     *
     * Code: `601`
     */
    WEIGHTED_FLOOD = 601,
    /**
     * Some part of the request has not been completed
     *
     * Code: `602`
     */
    ADS_PARTIAL_SUCCESS = 602,
    /**
     * Some ads error occurs
     *
     * Code: `603`
     */
    ADS_SPECIFIC = 603,
    /**
     * Object deleted
     *
     * Code: `629`
     */
    ADS_OBJECT_DELETED = 629,
    /**
     * Cannot edit creator role
     *
     * Code: `700`
     */
    GROUP_CHANGE_CREATOR = 700,
    /**
     * User should be in club
     *
     * Code: `701`
     */
    GROUP_NOT_IN_CLUB = 701,
    /**
     * Too many officers in club
     *
     * Code: `702`
     */
    GROUP_TOO_MANY_OFFICERS = 702,
    /**
     * You need to enable 2FA for this action
     *
     * Code: `703`
     */
    GROUP_NEED_2FA = 703,
    /**
     * User needs to enable 2FA for this action
     *
     * Code: `704`
     */
    GROUP_HOST_NEED_2FA = 704,
    /**
     * Too many addresses in club
     *
     * Code: `706`
     */
    GROUP_TOO_MANY_ADDRESSES = 706,
    /**
     * Application is not installed in community
     *
     * Code: `711`
     */
    GROUP_APP_IS_NOT_INSTALLED_IN_COMMUNITY = 711,
    /**
     * Invite link is invalid - expired, deleted or not exists
     *
     * Code: `714`
     */
    GROUP_INVITE_LINKS_NOT_VALID = 714,
    /**
     * This video is already added
     *
     * Code: `800`
     */
    VIDEO_ALREADY_ADDED = 800,
    /**
     * Comments for this video are closed
     *
     * Code: `801`
     */
    VIDEO_COMMENTS_CLOSED = 801,
    /**
     * Can't send messages for users from blacklist
     *
     * Code: `900`
     */
    MESSAGES_USER_BLOCKED = 900,
    /**
     * Can't send messages for users without permission
     *
     * Code: `901`
     */
    MESSAGES_DENY_SEND = 901,
    /**
     * Can't send messages to this user due to their privacy settings
     *
     * Code: `902`
     */
    MESSAGES_PRIVACY = 902,
    /**
     * Value of ts or pts is too old
     *
     * Code: `907`
     */
    MESSAGES_TOO_OLD_PTS = 907,
    /**
     * Value of ts or pts is too new
     *
     * Code: `908`
     */
    MESSAGES_TOO_NEW_PTS = 908,
    /**
     * Can't edit this message, because it's too old
     *
     * Code: `909`
     */
    MESSAGES_EDIT_EXPIRED = 909,
    /**
     * Can't sent this message, because it's too big
     *
     * Code: `910`
     */
    MESSAGES_TOO_BIG = 910,
    /**
     * Keyboard format is invalid
     *
     * Code: `911`
     */
    MESSAGES_KEYBOARD_INVALID = 911,
    /**
     * This is a chat bot feature, change this status in settings
     *
     * Code: `912`
     */
    MESSAGES_CHAT_BOT_FEATURE = 912,
    /**
     * Too many forwarded messages
     *
     * Code: `913`
     */
    MESSAGES_TOO_LONG_FORWARDS = 913,
    /**
     * Message is too long
     *
     * Code: `914`
     */
    MESSAGES_TOO_LONG_MESSAGE = 914,
    /**
     * You don't have access to this chat
     *
     * Code: `917`
     */
    MESSAGES_CHAT_USER_NO_ACCESS = 917,
    /**
     * You can't see invite link for this chat
     *
     * Code: `919`
     */
    MESSAGES_CANT_SEE_INVITE_LINK = 919,
    /**
     * Can't edit this kind of message
     *
     * Code: `920`
     */
    MESSAGES_EDIT_KIND_DISALLOWED = 920,
    /**
     * Can't forward these messages
     *
     * Code: `921`
     */
    MESSAGES_CANT_FWD = 921,
    /**
     * Can't delete this message for everybody
     *
     * Code: `924`
     */
    MESSAGES_CANT_DELETE_FOR_ALL = 924,
    /**
     * You are not admin of this chat
     *
     * Code: `925`
     */
    MESSAGES_CHAT_NOT_ADMIN = 925,
    /**
     * Chat does not exist
     *
     * Code: `927`
     */
    MESSAGES_CHAT_NOT_EXIST = 927,
    /**
     * You can't change invite link for this chat
     *
     * Code: `931`
     */
    MESSAGES_CANT_CHANGE_INVITE_LINK = 931,
    /**
     * Your community can't interact with this peer
     *
     * Code: `932`
     */
    MESSAGES_GROUP_PEER_ACCESS = 932,
    /**
     * User not found in chat
     *
     * Code: `935`
     */
    MESSAGES_CHAT_USER_NOT_IN_CHAT = 935,
    /**
     * Contact not found
     *
     * Code: `936`
     */
    MESSAGES_CONTACT_NOT_FOUND = 936,
    /**
     * Message request already sent
     *
     * Code: `939`
     */
    MESSAGES_MESSAGE_REQUEST_ALREADY_SENT = 939,
    /**
     * Too many posts in messages
     *
     * Code: `940`
     */
    MESSAGES_TOO_MANY_POSTS = 940,
    /**
     * Cannot pin one-time story
     *
     * Code: `942`
     */
    MESSAGES_CANT_PIN_ONE_TIME_STORY = 942,
    /**
     * Cannot use this intent
     *
     * Code: `943`
     */
    MESSAGES_INTENT_CANT_USE = 943,
    /**
     * Limits overflow for this intent
     *
     * Code: `944`
     */
    MESSAGES_INTENT_LIMIT_OVERFLOW = 944,
    /**
     * Chat was disabled
     *
     * Code: `945`
     */
    MESSAGES_CHAT_DISABLED = 945,
    /**
     * Chat not supported
     *
     * Code: `946`
     */
    MESSAGES_CHAT_UNSUPPORTED = 946,
    /**
     * Can't add user to chat, because user has no access to group
     *
     * Code: `947`
     */
    MESSAGES_MEMBER_ACCESS_TO_GROUP_DENIED = 947,
    /**
     * Can't edit pinned message yet
     *
     * Code: `949`
     */
    MESSAGES_CANT_EDIT_PINNED_YET = 949,
    /**
     * Can't send message, reply timed out
     *
     * Code: `950`
     */
    MESSAGES_PEER_BLOCKED_REASON_BY_TIME = 950,
    /**
     * You can't access donut chat without subscription
     *
     * Code: `962`
     */
    MESSAGES_USER_NOT_DON = 962,
    /**
     * Too many auth attempts, try again later
     *
     * Code: `1105`
     */
    AUTH_FLOOD_ERROR = 1105,
    /**
     * Anonymous token has expired
     *
     * Code: `1114`
     */
    AUTH_ANONYMOUS_TOKEN_HAS_EXPIRED = 1114,
    /**
     * Anonymous token is invalid
     *
     * Code: `1116`
     */
    AUTH_ANONYMOUS_TOKEN_IS_INVALID = 1116,
    /**
     * Invalid document id
     *
     * Code: `1150`
     */
    PARAM_DOC_ID = 1150,
    /**
     * Access to document deleting is denied
     *
     * Code: `1151`
     */
    PARAM_DOC_DELETE_ACCESS = 1151,
    /**
     * Invalid document title
     *
     * Code: `1152`
     */
    PARAM_DOC_TITLE = 1152,
    /**
     * Access to document is denied
     *
     * Code: `1153`
     */
    PARAM_DOC_ACCESS = 1153,
    /**
     * Original photo was changed
     *
     * Code: `1160`
     */
    PHOTO_CHANGED = 1160,
    /**
     * Too many feed lists
     *
     * Code: `1170`
     */
    TOO_MANY_LISTS = 1170,
    /**
     * This achievement is already unlocked
     *
     * Code: `1251`
     */
    APPS_ALREADY_UNLOCKED = 1251,
    /**
     * Subscription not found
     *
     * Code: `1256`
     */
    APPS_SUBSCRIPTION_NOT_FOUND = 1256,
    /**
     * Subscription is in invalid status
     *
     * Code: `1257`
     */
    APPS_SUBSCRIPTION_INVALID_STATUS = 1257,
    /**
     * Invalid screen name
     *
     * Code: `1260`
     */
    INVALID_ADDRESS = 1260,
    /**
     * Catalog is not available for this user
     *
     * Code: `1310`
     */
    COMMUNITIES_CATALOG_DISABLED = 1310,
    /**
     * Catalog categories are not available for this user
     *
     * Code: `1311`
     */
    COMMUNITIES_CATEGORIES_DISABLED = 1311,
    /**
     * Too late for restore
     *
     * Code: `1400`
     */
    MARKET_RESTORE_TOO_LATE = 1400,
    /**
     * Comments for this market are closed
     *
     * Code: `1401`
     */
    MARKET_COMMENTS_CLOSED = 1401,
    /**
     * Album not found
     *
     * Code: `1402`
     */
    MARKET_ALBUM_NOT_FOUND = 1402,
    /**
     * Item not found
     *
     * Code: `1403`
     */
    MARKET_ITEM_NOT_FOUND = 1403,
    /**
     * Item already added to album
     *
     * Code: `1404`
     */
    MARKET_ITEM_ALREADY_ADDED = 1404,
    /**
     * Too many items
     *
     * Code: `1405`
     */
    MARKET_TOO_MANY_ITEMS = 1405,
    /**
     * Too many items in album
     *
     * Code: `1406`
     */
    MARKET_TOO_MANY_ITEMS_IN_ALBUM = 1406,
    /**
     * Too many albums
     *
     * Code: `1407`
     */
    MARKET_TOO_MANY_ALBUMS = 1407,
    /**
     * Item has bad links in description
     *
     * Code: `1408`
     */
    MARKET_ITEM_HAS_BAD_LINKS = 1408,
    /**
     * Extended market not enabled
     *
     * Code: `1409`
     */
    MARKET_EXTENDED_NOT_ENABLED = 1409,
    /**
     * Grouping items with different properties
     *
     * Code: `1412`
     */
    MARKET_GROUPING_ITEMS_WITH_DIFFERENT_PROPERTIES = 1412,
    /**
     * Grouping already has such variant
     *
     * Code: `1413`
     */
    MARKET_GROUPING_ALREADY_HAS_SUCH_VARIANT = 1413,
    /**
     * Variant not found
     *
     * Code: `1416`
     */
    MARKET_VARIANT_NOT_FOUND = 1416,
    /**
     * Property not found
     *
     * Code: `1417`
     */
    MARKET_PROPERTY_NOT_FOUND = 1417,
    /**
     * Grouping must have two or more items
     *
     * Code: `1425`
     */
    MARKET_GROUPING_MUST_CONTAIN_MORE_THAN_ONE_ITEM = 1425,
    /**
     * Item must have distinct properties
     *
     * Code: `1426`
     */
    MARKET_GROUPING_ITEMS_MUST_HAVE_DISTINCT_PROPERTIES = 1426,
    /**
     * Cart is empty
     *
     * Code: `1427`
     */
    MARKET_ORDERS_NO_CART_ITEMS = 1427,
    /**
     * Specify width, length, height and weight all together
     *
     * Code: `1429`
     */
    MARKET_INVALID_DIMENSIONS = 1429,
    /**
     * VK Pay status can not be changed
     *
     * Code: `1430`
     */
    MARKET_CANT_CHANGE_VKPAY_STATUS = 1430,
    /**
     * Market was already enabled in this group
     *
     * Code: `1431`
     */
    MARKET_SHOP_ALREADY_ENABLED = 1431,
    /**
     * Market was already disabled in this group
     *
     * Code: `1432`
     */
    MARKET_SHOP_ALREADY_DISABLED = 1432,
    /**
     * Invalid image crop format
     *
     * Code: `1433`
     */
    MARKET_PHOTOS_CROP_INVALID_FORMAT = 1433,
    /**
     * Crop bottom right corner is outside of the image
     *
     * Code: `1434`
     */
    MARKET_PHOTOS_CROP_OVERFLOW = 1434,
    /**
     * Crop size is less than the minimum
     *
     * Code: `1435`
     */
    MARKET_PHOTOS_CROP_SIZE_TOO_LOW = 1435,
    /**
     * Market not enabled
     *
     * Code: `1438`
     */
    MARKET_NOT_ENABLED = 1438,
    /**
     * Main album can not be hidden
     *
     * Code: `1446`
     */
    MARKET_ALBUM_MAIN_HIDDEN = 1446,
    /**
     * Story has already expired
     *
     * Code: `1600`
     */
    STORY_EXPIRED = 1600,
    /**
     * Incorrect reply privacy
     *
     * Code: `1602`
     */
    STORY_INCORRECT_REPLY_PRIVACY = 1602,
    /**
     * Card not found
     *
     * Code: `1900`
     */
    PRETTY_CARDS_CARD_NOT_FOUND = 1900,
    /**
     * Too many cards
     *
     * Code: `1901`
     */
    PRETTY_CARDS_TOO_MANY_CARDS = 1901,
    /**
     * Card is connected to post
     *
     * Code: `1902`
     */
    PRETTY_CARDS_CARD_IS_CONNECTED_TO_POST = 1902,
    /**
     * Servers number limit is reached
     *
     * Code: `2000`
     */
    CALLBACK_API_SERVERS_LIMIT = 2000,
    /**
     * Stickers are not purchased
     *
     * Code: `2100`
     */
    STICKERS_NOT_PURCHASED = 2100,
    /**
     * Too many favorite stickers
     *
     * Code: `2101`
     */
    STICKERS_TOO_MANY_FAVORITES = 2101,
    /**
     * Stickers are not favorite
     *
     * Code: `2102`
     */
    STICKERS_NOT_FAVORITE = 2102,
    /**
     * Specified link is incorrect (can't find source)
     *
     * Code: `3102`
     */
    WALL_CHECK_LINK_CANT_DETERMINE_SOURCE = 3102,
    /**
     * Recaptcha needed
     *
     * Code: `3300`
     */
    RECAPTCHA = 3300,
    /**
     * Phone validation needed
     *
     * Code: `3301`
     */
    PHONE_VALIDATION_NEED = 3301,
    /**
     * Password validation needed
     *
     * Code: `3302`
     */
    PASSWORD_VALIDATION_NEED = 3302,
    /**
     * Otp app validation needed
     *
     * Code: `3303`
     */
    OTP_VALIDATION_NEED = 3303,
    /**
     * Email confirmation needed
     *
     * Code: `3304`
     */
    EMAIL_CONFIRMATION_NEED = 3304,
    /**
     * Assert votes
     *
     * Code: `3305`
     */
    ASSERT_VOTES = 3305,
    /**
     * Token extension required
     *
     * Code: `3609`
     */
    TOKEN_EXTENSION_REQUIRED = 3609,
    /**
     * User is deactivated
     *
     * Code: `3610`
     */
    USER_DEACTIVATED = 3610,
    /**
     * Service is deactivated for user
     *
     * Code: `3611`
     */
    USER_SERVICE_DEACTIVATED = 3611,
    /**
     * Can't set AliExpress tag to this type of object
     *
     * Code: `3800`
     */
    FAVE_ALIEXPRESS_TAG = 3800
}

