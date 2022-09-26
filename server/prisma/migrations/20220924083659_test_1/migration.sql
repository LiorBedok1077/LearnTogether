-- CreateEnum
CREATE TYPE "GenderEnum" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'RATHER_NOT_TO_SAY', 'HELICOPTER');

-- CreateEnum
CREATE TYPE "PreferedLanguagesEnum" AS ENUM ('ARABIC', 'ENGLISH', 'FRENCH', 'HEBREW', 'KOREAN', 'RUSSIAN', 'SPANISH');

-- CreateEnum
CREATE TYPE "PagesEnum" AS ENUM ('ONE', 'TWO', 'FOUR');

-- CreateTable
CREATE TABLE "Users" (
    "user_id" STRING NOT NULL,
    "username" STRING NOT NULL,
    "email" STRING NOT NULL,
    "full_name" STRING NOT NULL,
    "password" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profile_pic_src" STRING,
    "phone_number" STRING,
    "gender" "GenderEnum" NOT NULL DEFAULT 'MALE',
    "bio" STRING,
    "interests" STRING[],
    "prefered_langs" "PreferedLanguagesEnum"[],
    "num_stars" INT4 NOT NULL DEFAULT 0,
    "star_id" STRING,
    "num_viewed_profile" INT4 NOT NULL DEFAULT 0,
    "num_edited_profile" INT4 NOT NULL DEFAULT 0,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Learning_groups" (
    "group_id" STRING NOT NULL,
    "creator_id" STRING NOT NULL,
    "tags" STRING[],
    "thumbnail_src" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING NOT NULL,
    "goals" STRING[],
    "progress" INT4 NOT NULL,

    CONSTRAINT "Learning_groups_pkey" PRIMARY KEY ("group_id")
);

-- CreateTable
CREATE TABLE "Articles" (
    "article_id" STRING NOT NULL,
    "creator_id" STRING NOT NULL,
    "tags" STRING[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "thumbnail_src" STRING NOT NULL,
    "title" STRING NOT NULL,
    "content" STRING NOT NULL,
    "num_views" INT4 NOT NULL,

    CONSTRAINT "Articles_pkey" PRIMARY KEY ("article_id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "comment_id" STRING NOT NULL,
    "author_id" STRING NOT NULL,
    "article_id" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "data" STRING NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" STRING NOT NULL,
    "user_id" STRING NOT NULL,
    "role_name" STRING NOT NULL,
    "min_rate" INT4,
    "accessable_pages" "PagesEnum"[],
    "accessable_routes" "PagesEnum"[],

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite_tags" (
    "id" STRING NOT NULL,
    "user_id" STRING NOT NULL,
    "tag_name" STRING NOT NULL,
    "num_viewed" INT4 NOT NULL DEFAULT 0,

    CONSTRAINT "Favorite_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" STRING NOT NULL,
    "user_id" STRING NOT NULL,
    "user_pic_src" STRING,
    "thumbnail_src" STRING,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" STRING NOT NULL,
    "description" STRING NOT NULL,
    "link" STRING,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Participants" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "_UsersLiked" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "_LikedComments" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_user_id_key" ON "Roles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_tags_user_id_key" ON "Favorite_tags"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_Participants_AB_unique" ON "_Participants"("A", "B");

-- CreateIndex
CREATE INDEX "_Participants_B_index" ON "_Participants"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UsersLiked_AB_unique" ON "_UsersLiked"("A", "B");

-- CreateIndex
CREATE INDEX "_UsersLiked_B_index" ON "_UsersLiked"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LikedComments_AB_unique" ON "_LikedComments"("A", "B");

-- CreateIndex
CREATE INDEX "_LikedComments_B_index" ON "_LikedComments"("B");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_star_id_fkey" FOREIGN KEY ("star_id") REFERENCES "Users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Learning_groups" ADD CONSTRAINT "Learning_groups_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Articles" ADD CONSTRAINT "Articles_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Articles"("article_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite_tags" ADD CONSTRAINT "Favorite_tags_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Participants" ADD CONSTRAINT "_Participants_A_fkey" FOREIGN KEY ("A") REFERENCES "Learning_groups"("group_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Participants" ADD CONSTRAINT "_Participants_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersLiked" ADD CONSTRAINT "_UsersLiked_A_fkey" FOREIGN KEY ("A") REFERENCES "Articles"("article_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersLiked" ADD CONSTRAINT "_UsersLiked_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedComments" ADD CONSTRAINT "_LikedComments_A_fkey" FOREIGN KEY ("A") REFERENCES "Comments"("comment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedComments" ADD CONSTRAINT "_LikedComments_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;