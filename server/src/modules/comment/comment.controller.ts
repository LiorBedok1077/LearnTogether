import { Body, Patch, Delete, HttpCode, HttpStatus, UseGuards, Controller } from '@nestjs/common'
// guards
import { CommentGuard, JwtGuard } from "../auth/guards"
// decorators
import { IdParam } from '../auth/decorators'
// types
import { CommentDto } from '../article/dto' // same dto as creating a comment (@ articles service)
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
     * @description Endpoint for updating comments.
     */
    @Patch('/:comment_id')
    @UseGuards(JwtGuard, CommentGuard)
    @HttpCode(HttpStatus.OK)
    async editComment(@IdParam('comment_id') comment_id: string, @Body() dto: CommentDto) {
        return await this.commentService.editComment(comment_id, dto)
    }

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
