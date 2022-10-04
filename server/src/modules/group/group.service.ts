import { Injectable, BadRequestException } from '@nestjs/common'
// types
import { CreateGroupDto, JoinGroupDto, UpdateGroupDto, UpdateParticipantsDto } from './dto'
import { Users } from '@prisma/client'
import { listActionsEnum } from '../../interfaces/dto'
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
    async createGroup(user_id: string, { description, members, tags, title }: CreateGroupDto) {
        try {
            const result = await this.prisma.learning_groups.create({
                data: {
                    title, description, tags,
                    creator: { connect: { user_id } },
                    participants: { connect: members.map(user_id => ({ user_id })) },
                    thumbnail_src: null,
                    progress: 0,
                }
            })
            return result
        }
        catch (err) { }
    }

    /**
     * Method sends a notification & email in the background - request join group.
     * @param user the request user.
     * @param group_id the group id (url param).
     */
    async requestJoinGroup({ user_id, username }: Users, group_id: string) {
        try {
            // find group with it's creator
            const group = await this.prisma.learning_groups.findUnique({
                where: { group_id },
                include: { creator: { select: { email: true, username: true } } }
            })
            // check if requested group is not owned by the requesting user
            if (group.creator.username === username) {
                throw new BadRequestException('Cannot join your own group')
            }
            // -- push notification (later)
            // send mail request to the creator (asynchronously, with token as temporary return value)
            const email_token = await this.mailer.sendRequestJoinGroupMail(
                group.creator.email,
                { username: group.creator.username, group_title: group.title, requesting_username: username },
                { group_id, user_id }
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

    /**
     * Method accepts group join-requests from users with a valid link.
     * @param dto the body with the verification token.
     */
    async joinGroup({ verification_token }: JoinGroupDto) {
        try {
            // validate email-token
            const { group_id, user_id } = await this.jwt.verifyToken(verification_token, 'join-group')
            // update database with the hashed password 
            const result = await this.prisma.learning_groups.update({
                where: { group_id },
                data: { participants: { connect: { user_id } } },
            })
            return `Joined successfully to group "${result.title}"`
        }
        catch (err) {
            throw new BadRequestException('Link is invalid or expired')
        }
    }

    /**
     * Method adds/removes/modifies a participant in a group.
     * @param dto the group id, the user to add/modify/remove, his role (when modifying/adding)
     */
    async updateParticipants({ action, user_id, group_id }: UpdateParticipantsDto) {
        try {
            switch (action) {
                // -- remove user from a group
                case listActionsEnum.remove: {
                    const result = await this.prisma.learning_groups.update({
                        where: { group_id }, data: { participants: { disconnect: { user_id } } }
                    })
                    if (!result) {
                        throw new BadRequestException('User not found')
                    }
                    return ('User removed successfully')
                }
                // -- invite user to a group
                case listActionsEnum.invite: {
                    // find target user & group
                    const user = await this.prisma.users.findUnique({ where: { user_id }, select: { username: true, email: true } })
                    const group = await this.prisma.learning_groups.findUniqueOrThrow({
                        where: { group_id }, include: { creator: { select: { username: true } } }
                    })
                    // -- push notification (later)
                    // send 'invite-to-group' email
                    const email_token = await this.mailer.sendInviteToGroupMail(
                        user.email,
                        { group_title: group.title, invitor_username: group.creator.username, target_username: user.username },
                        { group_id, user_id }
                    )
                    return ({
                        msg: `User has been invited to group "${group.title}"`,
                        // temp response field - simulating email verification - testing invite-to-group (step 2)
                        EMAIL_TOKEN__FOR_TESTING_ONLY: email_token
                    })
                }
                // -- modify user roles in a group (implement later)
                case listActionsEnum.modify:
                default: {
                    // -- `dto.roles` will be implemented later
                }
            }
        }
        catch (err) {
            throw new BadRequestException('User not found')
        }
    }

    /**
     * Method returns a group's data by a given group id.
     * @param group_id the group id.
     */
    async getGroupData(group_id: string) {
        try {
            return await this.prisma.learning_groups.findUniqueOrThrow({ where: { group_id } })
        }
        catch (err) {
            throw new BadRequestException('Group does not exist')
        }
    }

    /**
     * Method updates group data given a group-id and the new data.
     * @param group_id the group id.
     * @param dto the new data.
     */
    async updateGroupData(group_id: string, dto: UpdateGroupDto) {
        try {
            return await this.prisma.learning_groups.update({ where: { group_id }, data: dto })
        }
        catch (err) {
            throw new BadRequestException('Group does not exist')
        }
    }
}