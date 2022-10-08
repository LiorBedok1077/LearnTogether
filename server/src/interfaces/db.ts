import { Articles, Learning_groups, Users } from "@prisma/client";

export type UserFullData = Users & {
    articles: Articles[],
    groups: Learning_groups[]
}