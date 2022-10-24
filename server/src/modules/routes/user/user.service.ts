import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common"
import { hash, verify } from 'argon2'
// types
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { ChangePasswordDto, UpdateUserDto } from "./dto"
// services
import { PrismaService } from "../../db/prisma/prisma.service"

/**
 * (User) Service handles user operations (e.g. get-data, update-data, etc.)
 */
@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) { }

    /**
     * Method gets a user id and returns the corresponding user's data.
     * @param user_id the user id (from url params).
     * @param isForeign the user id is the same as the requested user id (boolean).
     * @returns The user's data (by the given id).
     */
    async getForeignUserData(user_id: string, isForeign: boolean) {
        try {
            // find user & udpate cms fields synchronously
            return await this.prisma.findUserById(user_id, { isForeign })
        }
        catch (err) {
            throw new BadRequestException('User does not exist')
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
                throw new BadRequestException('User does not exist')
            }
            return result
        }
        catch (err) {
            throw new BadRequestException('User does not exist')
        }
    }

    /**
     * Method updates user-data by a given id (param) and data (body).
     * @param user_id the user id.
     * @param dto an object with the (optional) values ti update.
     */
    async updateUser(user_id: string, dto: UpdateUserDto) {
        if (Object.keys(dto).length === 0) {
            // check dto length
            throw new BadRequestException('No data was provided')
        }
        try {
            return await this.prisma.updateUserById(user_id, dto)
        }
        catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                throw new BadRequestException('User does not exist')
            }
            throw err
        }
    }

    /**
     * Method changes a user's password.
     * @param user_id the user id.
     * @param dto the new password to udpate.
     */
    async changePassword(user_id: string, original_password: string, dto: ChangePasswordDto) {
        try {
            // compare passwords
            const pwmatches = await verify(original_password, dto.old_password)
            if (!pwmatches) {
                throw new ForbiddenException('Old password is incorrect')
            }
            // generate pw
            const hashed = await hash(dto.new_password)
            const result = await this.prisma.updateUserById(user_id, { password: hashed })
            return ('Password changed successfully')
        }
        catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                throw new BadRequestException('User does not exist')
            }
            // throw new ForbiddenException('Old password is incorrect')
            throw new ForbiddenException({ original_password, dto })
        }
    }
}