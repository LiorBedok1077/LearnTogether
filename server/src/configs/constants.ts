
// enviroment-variables file path
export const ROOT_ENV_FILE = {
    test: '.env.test',
    prod: '.env.prod'
}

// enviroment-variables keys
export const ENV_VARS = {
    DATABASE_URL: 'DATABASE_URL',
    SERVER_PORT: 'SERVER_PORT',
    // jwt
    JWT_SECRET_AUTH: 'JWT_SECRET_AUTH',
    JWT_SECRET_EMAIL: 'JWT_SECRET_EMAIL',
    // mailer related
    MAIL_HOST: 'MAIL_HOST',
    MAIL_USER: 'MAIL_USER',
    MAIL_FROM: 'MAIL_FROM',
    MAIL_PASS: 'MAIL_PASS'
}

// jwt expiration times for tokens with different purposes
export const JWT_EXPIRE_TOKEN = {
    AUTH__TEST: '15m',  // use while testing
    AUTH: '7d',
    FORGOT_PASSWORD: '5m'
}

// reset-password client url - with a dynamic token param
export const RESET_PASSWORD_CLIENT_URL = (token: string) => `http://localhost:3000/reset-password/${token}`