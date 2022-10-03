import { Controller, UseGuards, HttpCode, HttpStatus, Param, Post, Put, Body } from '@nestjs/common'
import { JwtGuard } from "../auth/guards"
// types
import { GetUser } from '../auth/decorators'
import { CreateGroupDto, JoinGroupDto } from './dto'
// services
import { GroupService } from './group.service'

@Controller({
    path: 'group',
    version: '1'
})
export class GroupController {
    constructor(
        private groupService: GroupService
    ) { }

    /**
     * @description Endpoint for creating new learning-groups.
     */
    @Post()
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.CREATED)
    async createGroup(@GetUser('user_id') user_id: string, @Body() dto: CreateGroupDto) {
        return await this.groupService.createGroup(user_id, dto)
    }

    /**
     * @description Endpoint for sending group-join-requests (step 1 - send notification & email).
     */
    @Put('/request-join/:group_id')
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async requestJoinGroup(@GetUser() user, @Param('group_id') group_id: string) {
        return this.groupService.requestJoinGroup(user, group_id)
    }

    /**
     * @description Endpoing for allowing group-join-requests (step 2 - verify an email-token).
     */
    @Post('/request-join')
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async joinGroup(@Body() dto: JoinGroupDto) {
        return await this.groupService.joinGroup(dto)
    }
}
