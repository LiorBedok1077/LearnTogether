import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from "@nestjs/common";
import { GetUser } from "./decorators";
import { AuthService } from "./auth.service";
import { JwtGuard } from "./guards";
// types
import { Users } from "prisma/prisma-client";
import { SigninDto, SignupDto } from "./dto";

@Controller({
    path: 'auth',
    version: '1'
})
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    /**
     * @description Endpoint for sending back user-data.
     */
    @Get('user')
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    getUserData(@GetUser() user: Users) {
        return user
    }

    /**
     * @description Endpoint for visiting user-data.
     */
    @Get('user/:user_id')
    @HttpCode(HttpStatus.OK)
    async getForeignUserData(@Param('user_id') user_id: string) {
        return await this.authService.getForeignUserData(user_id)
    }

    /**
     * @description Endpoint for signing in users.
     */
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signin(@Body() dto: SigninDto) {
        return await this.authService.signin(dto)
    }

    /**
     * @description Endpoint for creating users.
     */
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() dto: SignupDto) {
        return await this.authService.signup(dto)
    }
}