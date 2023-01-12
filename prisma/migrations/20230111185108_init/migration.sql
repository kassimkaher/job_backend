/*
  Warnings:

  - Made the column `post_id` on table `Requsets` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Requsets` DROP FOREIGN KEY `Requsets_post_id_fkey`;

-- AlterTable
ALTER TABLE `Requsets` MODIFY `post_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Requsets` ADD CONSTRAINT `Requsets_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
