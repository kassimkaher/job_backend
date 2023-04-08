-- DropForeignKey
ALTER TABLE `JopTitle` DROP FOREIGN KEY `JopTitle_parent_id_fkey`;

-- AlterTable
ALTER TABLE `JopTitle` MODIFY `parent_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `JopTitle` ADD CONSTRAINT `JopTitle_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `JopTitle`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
