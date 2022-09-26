import { JwtSignOptions } from "@nestjs/jwt"
import { token_types } from "../utils/jwt"

// Auth jwt-Token payload
export type JwtAuthTokenPayload = { user_id: string }

// Forgot-password jwt-token payload
export type JwtForgotPasswordTokenPayload = { user_id: string, num_edited_profile: number }

// all jwt-payload types
export type JwtPayloadTypes = JwtAuthTokenPayload | JwtForgotPasswordTokenPayload

// sign-token method type (AuthService::signToken)
export type signToken = <T extends JwtPayloadTypes>(payload: T, options?: token_types) => Promise<string>