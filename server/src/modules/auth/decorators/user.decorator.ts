import { createParamDecorator, ExecutionContext } from '@nestjs/common'

/**
 * Decorator extracts the user from the request (assuming it passed the jwt-guard)
 */
export const GetUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    if (data) {
        return req.user?.[data]
    }
    return req.user
})