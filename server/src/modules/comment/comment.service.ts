import { BadRequestException, Injectable } from '@nestjs/common'
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
     * Method deletes comments.
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