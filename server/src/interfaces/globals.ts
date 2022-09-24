
// Auth jwt-Token payload
export type JwtAuthTokenPayload = { user_id: string, username: string, email: string }

// Forgot-password jwt-token payload
export type JwtForgotPasswordTokenPayload = { user_id: string }