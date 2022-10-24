import { ExecutionContext, ForbiddenException } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { UserFullData } from "../../../../common/interfaces/db"

/**
 * Guard - checks if the group is owned by the user.
 */
export class GroupGuard extends AuthGuard('jwt') {
    constructor() {
        super()
    }
    handleRequest<TUser extends UserFullData>(err: any, user: TUser, info: any, ctx: ExecutionContext): TUser {
        const group_id: string = ctx.switchToHttp().getRequest().params['group_id']
        if (!user.groups.some(group => group.group_id === group_id)) {
            throw new ForbiddenException('Cannot access foreign groups')
        }
        else return user
    }
}