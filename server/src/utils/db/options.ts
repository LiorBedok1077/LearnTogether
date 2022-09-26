import { Users } from "prisma/prisma-client";

type updateUserByIdOptions = (user_id: string, data?: Partial<Users>) => ({
    where: { user_id: string },
    data: Object
})

/**
 * Function returns an options-object containing the given data and some cms options for updating a user.
 * @param user_id The user id.
 * @param data The udpated data.
 * @returns an formatted object to update the user.
 */
export const updateUserByIdOptions: updateUserByIdOptions = (user_id, data) => ({
    where: { user_id },
    data: { ...data, num_edited_profile: { increment: 1 } }
})

/**
 * Function returns an options-object containing the given data and some cms options for updating a user.
 * @param user_id The user id.
 * @param data The udpated data.
 * @returns an formatted object to update the user.
 */
export const getUserByIdOptions: updateUserByIdOptions = (user_id, data = {}) => ({
    where: { user_id },
    data: { ...data, num_viewed_profile: { increment: 1 } }
})