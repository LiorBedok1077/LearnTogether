import { User } from "./User"

// temporary
export interface FavoriteTags {
    id: string,
    // user relation
    user: User,
    // tag relation
    // tag        Tags   @relation(fields: [tag_name], references: [tag_name])
    // data
    tag_name: string,
    num_viewed: number
}