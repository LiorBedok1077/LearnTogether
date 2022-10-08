import { BadRequestException, Injectable } from '@nestjs/common'
// types
import { CreateArticleDto, UpdateArticleDto } from './dto'
// services
import { PrismaService } from '../prisma/prisma.service'
import { likeOrDislikeEnum } from '../../interfaces/dto'
import { CommentDto } from './dto/comment.dto'

/**
 * (Article) Service handles article crud operations (e.g. create-article, edit-article, etc.)
 */
@Injectable()
export class ArticleService {
    constructor(
        private prisma: PrismaService
    ) { }

    /**
     * Method creates new articles.
     * @param user_id the user id.
     * @param dto the new article data.
     */
    async createArticle(user_id: string, { content, tags, title }: CreateArticleDto) {
        try {
            const result = await this.prisma.articles.create({
                data: {
                    creator: { connect: { user_id } },
                    content, title, tags, num_views: 0, thumbnail_src: ''
                }
            })
            return result
        }
        catch (err) { }
    }

    /**
     * Method returns an article's data by a given id.
     * @param article_id the article id.
     */
    async getArticleData(article_id: string) {
        try {
            return await this.prisma.articles.findUniqueOrThrow({ where: { article_id } })
        }
        catch (err) {
            throw new BadRequestException('Article does not exist')
        }
    }

    /**
     * Method updates an article.
     * @param article_id the article id.
     * @param dto the data to update.
     */
    async updateArticle(article_id: string, dto: UpdateArticleDto) {
        try {
            return await this.prisma.articles.update({ where: { article_id }, data: dto })
        }
        catch (err) {
            throw new BadRequestException('Article does not exist')
        }
    }

    /**
     * Method deletes an article.
     * @param article_id the article id.
     */
    async deleteArticle(article_id: string) {
        try {
            // delete article & it's comments
            await this.prisma.comments.deleteMany({ where: { article_id } })
            await this.prisma.articles.delete({ where: { article_id } })
            return ('Article deleted successfully')
        }
        catch (err) {
            throw new BadRequestException('Article does not exist')
        }
    }

    /**
     * Method allows users to like/dislike articles.
     * @param user_id the user id.
     * @param article_id the article id.
     * @param like "like" / "dislike"
     */
    async likeArticle(user_id: string, article_id: string, like: likeOrDislikeEnum) {
        try {
            const method = (like === likeOrDislikeEnum.like) ? 'connect' : 'disconnect'
            await this.prisma.articles.update({
                where: { article_id },
                data: { likes: { [method]: { user_id } } }
            })
            return (`article ${like}d successfully`)
        }
        catch (err) {
            throw new BadRequestException('Article does ont exist')
        }
    }

    /**
     * Method adds comments to an article.
     * @param user_id the user id.
     * @param article_id the article id.
     * @param dto the comment payload.
     */
    async comment(user_id: string, article_id: string, dto: CommentDto) {
        try {
            const result = await this.prisma.comments.create({
                data: {
                    author: { connect: { user_id } },
                    article: { connect: { article_id } },
                    data: dto.data
                }
            })
            return result
        }
        catch (err) {
            throw new BadRequestException('Article does not exist')
        }
    }

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