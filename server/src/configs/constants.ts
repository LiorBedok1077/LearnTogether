
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

// jwt-token expiration time
export const JWT_EXPIRATION_TIME = '7d'
export const TEST__JWT_EXPIRATION_TIME = '15m'