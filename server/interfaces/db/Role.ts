import { PagesEnum } from "./enums";

export interface Roles {
    role_id: string,
    role_name: String,
    min_rate?: number,
    accessable_pages: PagesEnum[],
    accessable_routes: PagesEnum[]
}