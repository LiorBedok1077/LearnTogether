import { Controller, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { Post, Body } from '@nestjs/common'
import { JwtGuard } from "../auth/guards"
// types
import { GetUser } from '../auth/decorators';
import { CreateGroupDto } from './dto';
// services
import { GroupService } from './group.service';

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
}
