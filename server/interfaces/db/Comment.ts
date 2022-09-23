import { Article } from "./Article"
import { User } from "./User"

export interface Comment {
    comment_id: string,
    // creator relation
    author: User,
    // article relation
    article: Article,
    // users_liked relation
    likes: User[],
    // data
    created_at: string,
    updated_at: string,
    data: String
}