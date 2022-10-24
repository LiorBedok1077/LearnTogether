import { AuthGuard } from '@nestjs/passport'

/**
 * Guard - checks if a user is signed-in.
 * @returns the user data.
 */
export class JwtGuard extends AuthGuard('jwt') {
    constructor() {
        super()
    }
}

/**
 * (Optional) guard - checks if a user is signed-in.
 * @returns the user data (if signed-in).
 */
export class JwtOptionalGuard extends AuthGuard('jwt') {
    constructor() {
        super()
    }
    handleRequest(err, user) {
        return user
    }
}