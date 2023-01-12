-- DropForeignKey
ALTER TABLE `Company` DROP FOREIGN KEY `Company_image_certificate_id_fkey`;

-- AlterTable
ALTER TABLE `Company` MODIFY `image_certificate_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_image_certificate_id_fkey` FOREIGN KEY (`image_certificate_id`) REFERENCES `Files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
