import { BadRequestException, Injectable } from '@nestjs/common'
import { likeOrDislikeEnum } from '../../interfaces/dto'
import { CommentDto } from '../article/dto'
// types
// services
import { PrismaService } from '../prisma/prisma.service'

/**
 * (Comment) Service handles comment crud operations (e.g. edit-comment, delete-comment, etc.)
 */
@Injectable()
export class CommentService {
    constructor(
        private prisma: PrismaService
    ) { }

    /**
     * Method allows users to like/dislike comments.
     * @param user_id the user id.
     * @param comment_id the comment id.
     * @param like "like" / "dislike".
     */
    async likeComment(user_id: string, comment_id: string, like: likeOrDislikeEnum) {
        try {
            const method = (like === likeOrDislikeEnum.like) ? 'connect' : 'disconnect'
            await this.prisma.comments.update({
                where: { comment_id },
                data: { likes: { [method]: { user_id } } }
            })
            return (`Comment ${like}d successfully`)
        }
        catch (err) {
            throw new BadRequestException('Comment does not exist')
        }
    }

    /**
     * Method updates a comment.
     * @param comment_id the comment id.
     * @param dto the new comment data.
     */
    async editComment(comment_id: string, { data }: CommentDto) {
        try {
            return await this.prisma.comments.update({ where: { comment_id }, data: { data } })
        }
        catch (err) {
            throw new BadRequestException('Comment does not exist')
        }
    }

    /**
     * Method deletes a comment.
     * @param comment_id the comment id.
     */
    async deleteComment(comment_id: string) {
        try {
            await this.prisma.comments.delete({ where: { comment_id } })
            return ('Comment deleted successfully')
        }
        catch (err) {
            throw new BadRequestException('Comment does not exist')
        }
    }
}