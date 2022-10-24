// Jwt (constants) file

// jwt expiration times for tokens with different purposes
export const JWT_EXPIRE_TOKEN = {
    AUTH__TEST: '15m',  // use while testing
    AUTH: '7d',
    FORGOT_PASSWORD: '5m',
    REQUEST_JOIN_GROUP: '7d'
}
