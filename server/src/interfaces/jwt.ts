
// Auth jwt-Token payload
export type JwtAuthTokenPayload = { user_id: string }

// Forgot-password jwt-token payload
export type JwtForgotPasswordTokenPayload = { user_id: string, num_edited_profile: number }

// request-join-group jwt-token payload
export type JwtRequestJoinGroupPayload = { user_id: string, group_id: string }

// jwt payload types as key-value pairs
export type JwtPayloadTypes = {
    'auth': JwtAuthTokenPayload
    'forgot-password': JwtForgotPasswordTokenPayload
    'request-join-group': JwtRequestJoinGroupPayload
}