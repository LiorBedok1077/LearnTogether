import { User } from "./User"

export interface LearningGroup {
    group_id: string
    // creator relation
    creator_id: string
    creator: User
    // participants
    participants: User[]
    // group_tags
    tags: string[]
    // data
    thumbnail_src: string
    title: string
    description: string
    goals: string[]
    progress: number
}