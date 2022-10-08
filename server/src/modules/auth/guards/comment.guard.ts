import { ExecutionContext, ForbiddenException } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { UserFullData } from "../../../interfaces/db"

/**
 * Guard - checks if a comment is owned by the user.
 */
export class CommentGuard extends AuthGuard('jwt') {
    constructor() {
        super()
    }
    handleRequest<TUser extends UserFullData>(err: any, user: TUser, info: any, ctx: ExecutionContext): TUser {
        const comment_id: string = ctx.switchToHttp().getRequest().params['comment_id']
        if (!user.comments.some(comment => comment.comment_id === comment_id)) {
            throw new ForbiddenException('Cannot access foreign comments')
        }
        else return user
    }
}