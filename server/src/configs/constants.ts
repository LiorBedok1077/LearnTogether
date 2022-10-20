// Global constants file

// file-names (not paths!)
export const FILENAMES = {
    // environment-variable filenames
    env: {
        test: '.env.test',
        prod: '.env.prod'
    },
    // handlebars filenames
    hbs_template: {
        invite_to_group: 'invite-to-group',
        request_join_group: 'request-join-group',
        reset_password: 'reset-password',
        user_joined_group: 'user-joined-group',
    }
}

// notification types
export type NOTIFICATION_TYPES = keyof typeof NOTIFICATION_TYPES
export const NOTIFICATION_TYPES = {
    'invite-to-group': 'invite-to-group',
    'request-join-group': 'request-join-group',
    'reset-password': 'reset-password',
    'user-joined-group': 'user-joined-group'
}

// enviroment-variables keys
export const ENV_VARS = {
    DATABASE_URL: 'DATABASE_URL',
    SERVER_PORT: 'SERVER_PORT',
    // jwt
    JWT_SECRET: 'JWT_SECRET',
    // mailer
    MAIL_HOST: 'MAIL_HOST',
    MAIL_USER: 'MAIL_USER',
    MAIL_FROM: 'MAIL_FROM',
    MAIL_PASS: 'MAIL_PASS',
    // redis
    CACHE_REDIS_HOST: 'CACHE_REDIS_HOST',
    CACHE_REDIS_PORT: 'CACHE_REDIS_PORT',
    CACHE_REDIS_USERNAME: 'CACHE_REDIS_USERNAME',
    CACHE_REDIS_PASSWORD: 'CACHE_REDIS_PASSWORD'
}

// jwt expiration times for tokens with different purposes
export const JWT_EXPIRE_TOKEN = {
    AUTH__TEST: '15m',  // use while testing
    AUTH: '7d',
    FORGOT_PASSWORD: '5m',
    REQUEST_JOIN_GROUP: '7d'
}

// pagination value (skip)
export const DB_PAGINATE = {
    notification: 20
}

// user id (uuid) length, created by prisma
export const UUID_LENGTH = 36

// redis database indexes (0-15)
export enum REDIS_DB_INDEX {
    CACHE_LAYER, NOTIFICATIONS
}

// expiration date for redis:notifications (7 days)
export const REDIS_EXPIRE_NOTIFICATION_TIME = 604800

// generate redis:notification key
// export const GEN_REDIS_NOTIFICATION_KEY = (user_id: string) => `${user_id}:${new Date().getDate()}`
export const REDIS_KEYS = {
    notification: (user_id: string, date?: number) => `${user_id}:${date ?? new Date().getTime()}`,
    notifications_list: (user_id: string) => `${user_id}/list`,
    get_notification_date: (key: string) => parseInt(key.split(':').at(-1)),
}

// the client base-uri
export const CLIENT_URI = `http://localhost:3000`
export const CLIENT_URLS = {
    // reset-password client url - with a dynamic token param
    RESET_PASSWORD: (token: string) => `${CLIENT_URI}/reset-password/${token}`,
    // join-group client url - with a dynamic token param
    JOIN_GROUP: (token: string) => `${CLIENT_URI}/join-group/${token}`,
    // join-group client url - with a dynamic token param
    GROUP: (group_id: string) => `${CLIENT_URI}/group/${group_id}`,
}