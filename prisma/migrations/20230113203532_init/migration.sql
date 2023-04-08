-- AlterTable
ALTER TABLE `Expereance` ADD COLUMN `company_id` VARCHAR(191) NULL,
    MODIFY `type` ENUM('STUDY', 'WORK', 'PROJECT') NULL;

-- AddForeignKey
ALTER TABLE `Expereance` ADD CONSTRAINT `Expereance_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
