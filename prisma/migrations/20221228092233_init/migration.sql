-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_jop_title_id_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `jop_title_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_jop_title_id_fkey` FOREIGN KEY (`jop_title_id`) REFERENCES `JopTitle`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
