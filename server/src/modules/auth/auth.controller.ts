import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SigninDto, SignupDto } from "./dto";
import { AuthGuard } from '@nestjs/passport'
import { Request } from "express";

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
    @UseGuards(AuthGuard('jwt'))
    getUserData(@Req() req: Request) {
        return req.user
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