import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto";

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
    signup(@Body() dto: SignupDto) {
        return this.authService.signup(dto)
    }
}