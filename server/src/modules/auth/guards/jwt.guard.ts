import { AuthGuard } from '@nestjs/passport'

export class JwtGuard extends AuthGuard('jwt') {
    constructor() {
        super()
    }
}

export class JwtOptionalGuard extends AuthGuard('jwt') {
    constructor() {
        super()
    }
    handleRequest(err, user) {
        return user
    }
}