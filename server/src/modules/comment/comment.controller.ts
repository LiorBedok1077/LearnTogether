import { Delete, HttpCode, HttpStatus, UseGuards, Controller } from '@nestjs/common'
// guards
import { CommentGuard, JwtGuard } from "../auth/guards"
// decorators
import { IdParam } from '../auth/decorators'
// services
import { CommentService } from './comment.service'

@Controller({
    path: 'comment',
    version: '1'
})
export class CommentController {
    constructor(
        private commentService: CommentService
    ) { }

    /**
     * @description Endpoint for deleting comments.
     */
    @Delete('/:comment_id')
    @UseGuards(JwtGuard, CommentGuard)
    @HttpCode(HttpStatus.OK)
    async deleteComment(@IdParam('comment_id') comment_id: string) {
        return await this.commentService.deleteComment(comment_id)
    }
}
