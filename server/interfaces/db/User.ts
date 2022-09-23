import { GenderEnum, PreferedLanguagesEnum } from "./enums"
import { Article } from "./Article"
import { FavoriteTags } from "./FavoriteTag"
import { LearningGroup } from "./LearningGroup"
import { Roles } from "./Role"

// User model interface
export interface User {
    user_id: string
    username: string
    email: string
    full_name: string
    password: string
    role?: Roles
    profile_pic_src?: string
    // personal data:
    phone_number?: string
    gender: GenderEnum
    bio?: string
    interests: string[]
    prefered_langs: PreferedLanguagesEnum[]
    favorite_tags: FavoriteTags[]
    // stars for user
    num_stars: number
    star_id: string
    stars_given: User[]
    // articles, liked_articles
    articles: Article[]
    liked_article_user: Article[]
    // comments, liked_comments
    comments: Comment[]
    liked_comments: Comment[]
    // groups, participating_groups
    groups: LearningGroup[]
    participating_groups: LearningGroup[]
    // notifications
    notifications: Notification[]
    // roles data (according to role access–modifier):
    // — (teacher_data, admin_data, etc) — 
    // cms
    num_viewed_profile: number
    num_edited_profile: number
}