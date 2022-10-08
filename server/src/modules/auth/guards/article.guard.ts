import { ExecutionContext, ForbiddenException, UnauthorizedException } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { UserFullData } from "../../../interfaces/db"

/**
 * Guard - checks if the article is owned by the user.
 */
export class ArticleGuard extends AuthGuard('jwt') {
    constructor() {
        super()
    }
    handleRequest<TUser extends UserFullData>(err: any, user: TUser, info: any, ctx: ExecutionContext): TUser {
        const article_id: string = ctx.switchToHttp().getRequest().params['article_id']
        if (!user.articles.some(article => article.article_id === article_id)) {
            throw new ForbiddenException('Cannot access foreign articles')
        }
        else return user
    }
}