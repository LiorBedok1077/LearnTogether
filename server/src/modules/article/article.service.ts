import { BadRequestException, Injectable } from '@nestjs/common'
// types
import { CreateArticleDto, UpdateArticleDto } from './dto'
// services
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '../jwt/jwt.service'
import { MailService } from '../mail/mail.service'

/**
 * (Article) Service handles article crud operations (e.g. create-article, edit-article, etc.)
 */
@Injectable()
export class ArticleService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private mailer: MailService
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
            return await this.prisma.articles.findUnique({ where: { article_id } })
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
            const result = await this.prisma.articles.delete({ where: { article_id } })
            return ('Article deleted successfully')
        }
        catch (err) {
            throw new BadRequestException('Article does not exist')
        }
    }
}