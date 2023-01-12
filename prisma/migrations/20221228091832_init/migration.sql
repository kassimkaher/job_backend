-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_image_id_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `image_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `Files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
