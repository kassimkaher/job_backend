/*
  Warnings:

  - You are about to drop the `JopTitleChild` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `JopTitleChild` DROP FOREIGN KEY `JopTitleChild_parentId_fkey`;

-- DropIndex
DROP INDEX `JopTitle_parent_id_fkey` ON `JopTitle`;

-- DropTable
DROP TABLE `JopTitleChild`;

-- AddForeignKey
ALTER TABLE `JopTitle` ADD CONSTRAINT `JopTitle_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `JopTitle`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
