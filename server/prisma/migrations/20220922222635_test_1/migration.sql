-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_user_id_fkey";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "star_id" STRING;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_star_id_fkey" FOREIGN KEY ("star_id") REFERENCES "Users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
