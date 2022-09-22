import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller({
    path: 'auth',
    version: '1'
})
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Get()
    getAll() {
        return this.authService.readAll()
    }

    @Get('/new')
    writeNew() {
        return this.authService.writeNew()
    }

    /**
     * @description Endpoint for signing in users.
     */
    @Post('signin')
    signin(@Body() dto /* signin payload */) {
        return this.authService.signin(dto)
    }

    /**
     * @description Endpoint for creating users.
     */
    @Post('signup')
    signup(@Body() dto /* signup payload */) {
        return this.authService.signup(dto)
    }
}