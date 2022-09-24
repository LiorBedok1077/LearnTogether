import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
// types
import { UpdateUserDto } from "./dto"
// services
import { PrismaService } from "../prisma/prisma.service"
import { ConfigService } from '@nestjs/config'


/**
 * (User) Service handles user operations (e.g. get-data, update-data, etc.)
 */
@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private config: ConfigService
    ) { }

    /**
     * Method gets a user id and returns the corresponding user's data.
     * @param user_id the user id (from url params).
     * @returns The user's data (by the given id).
     */
    async getForeignUserData(user_id: string) {
        try {
            // const result = await this.prisma.users.findUnique({ where: { user_id } })
            const result = await this.prisma.users.update({
                where: { user_id },
                data: { num_viewed_profile: { increment: 1 } }
            })
            if (!result) {
                throw new NotFoundException('User does not exist')
            }
            return result
        }
        catch (err) {
            throw new NotFoundException('User does not exist')
        }
    }

    /**
     * Method removes a user by a given id.
     * @param user_id the user id (from url params)
     */
    async deleteUser(user_id: string) {
        try {
            const result = await this.prisma.users.delete({ where: { user_id } })
            if (!result) {
                throw new NotFoundException('User does not exist')
            }
            return result
        }
        catch (err) {
            throw new NotFoundException('User does not exist')
        }
    }

    /**
     * Method updates user-data by a given id (param) and data (body).
     * @param user_id the user id (from url params)
     */
    async updateUser(user_id: string, dto: UpdateUserDto) {
        if (Object.keys(dto).length === 0) {
            // check dto length
            throw new BadRequestException('No data was provided')
        }
        try {
            const result = await this.prisma.users.update({
                where: { user_id },
                data: {
                    ...dto, num_edited_profile: { increment: 1 }
                }
            })
            return result
        }
        catch (err) {
            console.log({ err })
            throw err
        }
    }
}