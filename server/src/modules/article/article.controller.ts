import { Body, Delete, Get, HttpCode, HttpStatus, UseGuards, Controller, Param, Patch, Post, Put } from '@nestjs/common'
import { ArticleGuard, JwtGuard } from "../auth/guards"
// decorators
import { GetUser, IdParam } from '../auth/decorators'
// types
import { CreateArticleDto, UpdateArticleDto, CommentDto, LikeArticleParam } from './dto'
// services
import { ArticleService } from './article.service'

@Controller({
    path: 'article',
    version: '1'
})
export class ArticleController {
    constructor(
        private articleService: ArticleService
    ) { }

    /**
     * @description Endpoint for creating new articles.
     */
    @Post()
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.CREATED)
    async createArticle(@GetUser('user_id') user_id: string, @Body() dto: CreateArticleDto) {
        return await this.articleService.createArticle(user_id, dto)
    }

    /**
     * @description Endpoint for sending article data.
     */
    @Get('/:article_id')
    @HttpCode(HttpStatus.OK)
    async getArticleData(@IdParam('article_id') article_id: string) {
        return await this.articleService.getArticleData(article_id)
    }

    /**
     * @description Endpoint for updating articles.
     */
    @Patch('/:article_id')
    @UseGuards(JwtGuard, ArticleGuard)
    @HttpCode(HttpStatus.OK)
    async updateArticle(@IdParam('article_id') article_id: string, @Body() dto: UpdateArticleDto) {
        return await this.articleService.updateArticle(article_id, dto)
    }

    /**
     * @description Endpoint for deleting articles.
     */
    @Delete('/:article_id')
    @UseGuards(JwtGuard, ArticleGuard)
    @HttpCode(HttpStatus.OK)
    async deleteArticle(@IdParam('article_id') article_id: string) {
        return await this.articleService.deleteArticle(article_id)
    }

    /**
     * @description Endpoint for adding comments to an article.
     */
    @Post('/:article_id/comment')
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async comment(@GetUser('user_id') user_id: string, @IdParam('article_id') article_id: string, @Body() dto: CommentDto) {
        return await this.articleService.comment(user_id, article_id, dto)
    }

    /**
     * @description Endpoint for liking/disliking articles.
     */
    @Put('/:article_id/:like')
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async likeArticle(
        @IdParam('article_id') article_id: string, @GetUser('user_id') user_id: string, @Param() { like }: LikeArticleParam
    ) {
        return await this.articleService.likeArticle(user_id, article_id, like)
    }
}
