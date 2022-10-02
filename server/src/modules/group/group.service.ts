import { Injectable, BadRequestException } from '@nestjs/common'
// types
import { CreateGroupDto, JoinGroupDto } from './dto'
import { Users } from '../../interfaces/db-models'
// services
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '../jwt/jwt.service'
import { MailService } from '../mail/mail.service'

/**
 * (Group) Service handles learning-group crud operations (e.g. create-group, edit-group, etc.)
 */
@Injectable()
export class GroupService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private mailer: MailService
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
        catch (err) { }
    }

    async requestJoinGroup(user: Users, group_id: string) {
        try {
            // find group with it's creator
            const group = await this.prisma.learning_groups.findUnique({
                where: { group_id },
                include: { creator: { select: { email: true, username: true } } }
            })
            // check if requested group is not owned by the requesting user
            if (group.creator.username === user.username) {
                throw new BadRequestException('Cannot join your own group')
            }
            // -- push notification (later)
            // send mail request to the creator (asynchronously, with token as temporary return value)
            const email_token = await this.mailer.sendRequestJoinGroupMail(
                group.creator.email,
                { username: group.creator.username, group_title: group.title, requesting_username: user.username },
                { group_id, user_id: user.user_id }
            )
            return {
                msg: (`A request has been sent to "${group.creator.email}"`),
                // temp response field - simulating email verification - testing change-password (step 2)
                EMAIL_TOKEN__FOR_TESTING_ONLY: email_token
            }
        }
        catch (err) {
            throw new BadRequestException({ err })
        }
    }

    async joinGroup(dto: JoinGroupDto) {
        try {
            // validate email-token
            const { group_id, user_id } = await this.jwt.verifyToken(dto.verification_token, 'request-join-group')
            // update database with the hashed password 
            const result = await this.prisma.learning_groups.update({
                where: { group_id },
                data: { participants: { connect: { user_id } } },
            })
            return `Joined successfully to group "${result.title}"`
        }
        catch (err) {
            throw new BadRequestException({ err })
        }
    }
}
