import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common'
import { UUID_LENGTH } from '../../../../common/constants'

/**
 * Decorator extracts an id (e.g. user_id) frmo the request params and validates it.
 */
export const IdParam = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const param: string = ctx.switchToHttp().getRequest().params[data]
    if (param?.length !== UUID_LENGTH)
        throw new BadRequestException(`Invalid param ${param}`)
    else return param
})