// Global (constants) file

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