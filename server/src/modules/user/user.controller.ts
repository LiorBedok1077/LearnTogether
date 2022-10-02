import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common"
import { JwtGuard } from "../auth/guards"
import { GetUser } from "../auth/decorators"
// types
import { Users } from "@prisma/client"
import { ChangePasswordDto, UpdateUserDto } from "./dto"
// services
import { UserService } from "./user.service"
import { JwtOptionalGuard } from "../auth/guards/jwt.guard"

@Controller({
    path: 'user',
    version: '1'
})
export class UserController {
    constructor(
        private userService: UserService
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
     * @description Endpoint for updating user-data.
     */
    @Patch()
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async updateUser(@GetUser('user_id') user_id: string, @Body() dto: UpdateUserDto) {
        return await this.userService.updateUser(user_id, dto)
    }

    /**
     * @description Endpoint for changing password (if the email-token verification succeeded)
     */
    @Post('change-password')
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async changePassword(@GetUser() user: Users, @Body() dto: ChangePasswordDto) {
        return await this.userService.changePassword(user.user_id, user.password, dto)
    }

    /**
     * @description Endpoint for visiting foreign user-data.
     */
    @Get(':user_id')
    @UseGuards(JwtOptionalGuard)
    @HttpCode(HttpStatus.OK)
    async getForeignUserData(@Param('user_id') user_id: string, @GetUser('user_id') my_id: string) {
        return await this.userService.getForeignUserData(user_id, my_id && user_id !== my_id)
    }

    /**
     * @description Endpoint for deleting users.
     */
    @Delete(':user_id')
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Param('user_id') user_id: string) {
        return await this.userService.deleteUser(user_id)
    }

}