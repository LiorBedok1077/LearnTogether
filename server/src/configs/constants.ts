
// enviroment-variables file path
export const ROOT_ENV_FILE = {
    test: '.env.test',
    prod: '.env.prod'
}

// enviroment-variables keys
export const ENV_VARS = {
    DATABASE_URL: 'DATABASE_URL',
    // jwt
    JWT_SECRET_AUTH: 'JWT_SECRET_AUTH',
    JWT_SECRET_EMAIL: 'JWT_SECRET_EMAIL',
    SERVER_PORT: 'SERVER_PORT',
    // mailer related
    MAIL_HOST: 'MAIL_HOST',
    MAIL_USER: 'MAIL_USER',
    MAIL_FROM: 'MAIL_FROM',
    MAIL_PASS: 'MAIL_PASS'
}

// reset-password client url - with a dynamic token param
export const RESET_PASSWORD_CLIENT_URL = (token: string) => `http://localhost:3000/reset-password/${token}`