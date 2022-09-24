import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from "@nestjs/common"
import { Users } from "prisma/prisma-client"
import { GetUser } from "../auth/decorators"
import { JwtGuard } from "../auth/guards"
// types
// services
import { UserService } from "./user.service"

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
     * @description Endpoint for visiting foreign user-data.
     */
    @Get(':user_id')
    @HttpCode(HttpStatus.OK)
    async getForeignUserData(@Param('user_id') user_id: string) {
        return await this.userService.getForeignUserData(user_id)
    }

}