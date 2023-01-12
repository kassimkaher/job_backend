-- DropIndex
DROP INDEX `Expereance_postsId_fkey` ON `Expereance`;

-- DropIndex
DROP INDEX `Files_postsId_fkey` ON `Files`;

-- DropIndex
DROP INDEX `Token_postsId_fkey` ON `Token`;

-- AlterTable
ALTER TABLE `Posts` ADD COLUMN `is_open` BOOLEAN NOT NULL DEFAULT true;
