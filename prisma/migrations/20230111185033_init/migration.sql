-- DropForeignKey
ALTER TABLE `Requsets` DROP FOREIGN KEY `Requsets_post_id_fkey`;

-- AlterTable
ALTER TABLE `Requsets` MODIFY `post_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Requsets` ADD CONSTRAINT `Requsets_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Posts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
