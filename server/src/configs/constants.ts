
// enviroment-variables file path
export const ROOT_ENV_FILE = {
    test: '.env.test',
    prod: '.env.prod'
}

// enviroment-variables keys
export const ENV_VARS = {
    JWT_SECRET: 'JWT_SECRET',
    SERVER_PORT: 'SERVER_PORT'
}


// jwt-token expiration times (enum)
export enum JWT_EXPIRES_AT {
    AUTH = '7d',
    AUTH__TEST = '15m',
    FORGOT_PASSWORD = '2m',
}