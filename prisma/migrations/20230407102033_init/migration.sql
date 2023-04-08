/*
  Warnings:

  - You are about to drop the `JopTitle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `joptitlechild` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_jop_title_id_fkey`;

-- DropForeignKey
ALTER TABLE `joptitlechild` DROP FOREIGN KEY `JopTitleChild_parent_id_fkey`;

-- DropTable
DROP TABLE `JopTitle`;

-- DropTable
DROP TABLE `joptitlechild`;

-- CreateTable
CREATE TABLE `productCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `parent_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_jop_title_id_fkey` FOREIGN KEY (`jop_title_id`) REFERENCES `productCategories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productCategories` ADD CONSTRAINT `productCategories_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `productCategories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
