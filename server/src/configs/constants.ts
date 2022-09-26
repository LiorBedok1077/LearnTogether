
// enviroment-variables file path
export const ROOT_ENV_FILE = {
    test: '.env.test',
    prod: '.env.prod'
}

// enviroment-variables keys
export const ENV_VARS = {
    JWT_SECRET: 'JWT_SECRET',
    SERVER_PORT: 'SERVER_PORT',
    // mailer related
    MAIL_HOST: 'MAIL_HOST',
    MAIL_USER: 'MAIL_USER',
    MAIL_FROM: 'MAIL_FROM',
    MAIL_PASS: 'MAIL_PASS'
}

// jwt-token expiration times (enum)
export enum JWT_EXPIRES_AT {
    AUTH = '7d',
    AUTH__TEST = '15m',
    FORGOT_PASSWORD = '5m',
}

// reset-password client url - with a dynamic token param
export const RESET_PASSWORD_CLIENT_URL = (token: string) => `http://localhost:3000/reset-password/${token}`