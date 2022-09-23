import { User } from "./User"

export interface Article {
    article_id: string,
    // creator relation
    creator: User,
    // users_liked relations
    likes: User[],
    // comments relations
    comments: Comment[],
    // data
    tags: string[],
    created_at: string,
    updated_at: string,
    thumbnail_src: string,
    title: string,
    content: string,
    num_views: number
}