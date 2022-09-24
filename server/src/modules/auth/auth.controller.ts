import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
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
    @Get()
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    getUserData(@GetUser() user: Users) {
        return user
    }

    /**
     * @description Endpoint for signing in users.
     */
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() dto: SigninDto) {
        return this.authService.signin(dto)
    }

    /**
     * @description Endpoint for creating users.
     */
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto: SignupDto) {
        return this.authService.signup(dto)
    }
}