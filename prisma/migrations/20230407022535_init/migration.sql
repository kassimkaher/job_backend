-- DropForeignKey
ALTER TABLE `JopTitleChild` DROP FOREIGN KEY `JopTitleChild_parent_id_fkey`;

-- DropIndex
DROP INDEX `JopTitle_parent_id_fkey` ON `JopTitle`;

-- AddForeignKey
ALTER TABLE `JopTitleChild` ADD CONSTRAINT `JopTitleChild_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `JopTitle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
