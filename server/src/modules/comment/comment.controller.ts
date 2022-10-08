import { Param, Body, Patch, Delete, HttpCode, HttpStatus, UseGuards, Controller } from '@nestjs/common'
// guards
import { CommentGuard, JwtGuard } from "../auth/guards"
// decorators
import { GetUser, IdParam } from '../auth/decorators'
// types
import { CommentDto, LikeArticleParam as LikeCommentParam } from '../article/dto' // same dto as creating a comment (@ articles service)
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
     * @description Endpoint for updating comments.
     */
    @Patch('/:comment_id/:like')
    @UseGuards(JwtGuard, CommentGuard)
    @HttpCode(HttpStatus.OK)
    async likeComment(
        @GetUser('user_id') user_id: string, @IdParam('comment_id') comment_id: string, @Param() { like }: LikeCommentParam
    ) {
        return await this.commentService.likeComment(user_id, comment_id, like)
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
