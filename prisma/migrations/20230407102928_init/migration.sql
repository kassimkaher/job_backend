/*
  Warnings:

  - You are about to drop the `productCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_jop_title_id_fkey`;

-- DropForeignKey
ALTER TABLE `productCategories` DROP FOREIGN KEY `productCategories_parent_id_fkey`;

-- DropTable
DROP TABLE `productCategories`;

-- CreateTable
CREATE TABLE `JopTitle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `parent_id` INTEGER NOT NULL,

    UNIQUE INDEX `JopTitle_title_parent_id_key`(`title`, `parent_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_jop_title_id_fkey` FOREIGN KEY (`jop_title_id`) REFERENCES `JopTitle`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JopTitle` ADD CONSTRAINT `JopTitle_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `JopTitle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
