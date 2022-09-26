import { Injectable, InternalServerErrorException } from '@nestjs/common';
// types
import { CreateGroupDto } from './dto';
// services
import { PrismaService } from '../prisma/prisma.service';

/**
 * (Group) Service handles learning-group crud operations (e.g. create-group, edit-group, etc.)
 */
@Injectable()
export class GroupService {
    constructor(
        private prisma: PrismaService
    ) { }

    /**
     * Creates a new learning-group for one user.
     * @param user_id the user id.
     * @param dto the new group data.
     * @returns the new group data.
     */
    async createGroup(user_id: string, dto: CreateGroupDto) {
        try {
            const result = await this.prisma.learning_groups.create({
                data: {
                    creator: { connect: { user_id } },
                    participants: { connect: dto.members.map(user_id => ({ user_id })) },
                    title: dto.title,
                    thumbnail_src: null,
                    description: dto.description,
                    tags: dto.tags,
                    progress: 0,
                }
            })
            return result
        }
        catch (err) {
            throw new InternalServerErrorException(err)
        }
    }
}
