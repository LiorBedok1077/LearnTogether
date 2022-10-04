import { Body, Controller, HttpCode, HttpStatus, Patch, Post } from "@nestjs/common";
// types
import { ChangeForgottenPasswordDto, ForgotPasswordDto, SigninDto, SignupDto } from "./dto";
// services
import { AuthService } from "./auth.service";

@Controller({
    path: 'auth',
    version: '1'
})
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

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

    /**
     * @description Endpoint for changing (forgotten) password (step 1) - sends verification email.
     */
    @Post('forgot-password')
    @HttpCode(HttpStatus.OK)
    async forgotPassword(@Body() dto: ForgotPasswordDto) {
        return await this.authService.forgotPassword(dto)
    }

    /**
     * @description Endpoint for changing (forgotten) password (step 2) - verifies email-token and changes the password.
     */
    @Patch('forgot-password')
    @HttpCode(HttpStatus.OK)
    async changeForgottenPassword(@Body() dto: ChangeForgottenPasswordDto) {
        return await this.authService.changeForgottenPassword(dto)
    }
}