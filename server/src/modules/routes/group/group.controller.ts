import { Controller, Delete, ForbiddenException, UseGuards, Get, HttpCode, HttpStatus, Patch, Post, Put, Body } from '@nestjs/common'
// guards
import { JwtGuard, GroupGuard } from "../auth/guards"
// decorators
import { GetUser, IdParam } from '../auth/decorators'
// types
import { CreateGroupDto, JoinGroupDto, UpdateParticipantsDto, UpdateGroupDto } from './dto'
import { Users } from '@prisma/client'
import { UserFullData } from '../../../common/interfaces/db'
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
    @Delete('/:group_id')
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async deleteGroup(@IdParam('group_id') group_id: string) {
        return await this.groupService.deleteGroup(group_id)
    }

    /**
     * @description Endpoint for updating the participants list in a group (invite/remove/modify participants).
     */
    @Patch('/participants')
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async updateParticipantsList(@Body() dto: UpdateParticipantsDto) {
        return await this.groupService.updateParticipants(dto)
    }

    /**
     * @description Endpoint for updating group data.
     */
    @Patch('/:group_id')
    @UseGuards(JwtGuard, GroupGuard)
    @HttpCode(HttpStatus.OK)
    async updateGroupData(@IdParam('group_id') group_id: string, @Body() dto: UpdateGroupDto) {
        return await this.groupService.updateGroupData(group_id, dto)
    }

    /**
     * @description Endpoint for sending group-join-requests (sends notification & email).
     */
    @Put('/request-join/:group_id')
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async requestJoinGroup(@IdParam('group_id') group_id: string, @GetUser() user: Users) {
        return this.groupService.requestJoinGroup(user, group_id)
    }

    /**
     * @description Endpoing for allowing group-join-requests (verifies a given email-token).
     */
    @Post('/join')
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async joinGroup(@GetUser() user: Users, @Body() dto: JoinGroupDto) {
        return await this.groupService.joinGroup(user, dto)
    }
}
