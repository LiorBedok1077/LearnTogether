import { Controller, UseGuards, Get, HttpCode, HttpStatus, Patch, Post, Put, Body } from '@nestjs/common'
import { JwtGuard } from "../auth/guards"
// decorators
import { GetUser, IdParam } from '../auth/decorators'
// types
import { CreateGroupDto, JoinGroupDto, UpdateParticipantsDto, UpdateGroupDto } from './dto'
import { Users } from '@prisma/client'
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
    async requestJoinGroup(@IdParam('group_id') group_id: string, @GetUser() user: Users) {
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

    /**
     * @description Endpoint for updating the participants list in a group.
     */
    @Patch('/participants')
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async updateParticipantsList(@Body() dto: UpdateParticipantsDto) {
        return await this.groupService.updateParticipants(dto)
    }

    /**
     * @description Endpoint for sending group data.
     */
    @Get('/:group_id')
    @HttpCode(HttpStatus.OK)
    async getGroupData(@IdParam('group_id') group_id: string) {
        return await this.groupService.getGroupData(group_id)
    }

    /**
     * @description Endpoint for updating group data.
     */
    @Patch('/:group_id')
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async updateGroupData(@IdParam('group_id') group_id: string, @Body() dto: UpdateGroupDto) {
        return await this.groupService.updateGroupData(group_id, dto)
    }

}
