/*
  Warnings:

  - Made the column `parent_id` on table `JopTitle` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `JopTitle` DROP FOREIGN KEY `JopTitle_parent_id_fkey`;

-- AlterTable
ALTER TABLE `JopTitle` MODIFY `parent_id` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `JopTitle` ADD CONSTRAINT `JopTitle_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `JopTitle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
