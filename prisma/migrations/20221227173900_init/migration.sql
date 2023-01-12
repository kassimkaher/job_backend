/*
  Warnings:

  - You are about to drop the column `address_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image_certificate_id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `address_id`,
    DROP COLUMN `company_id`,
    DROP COLUMN `image_certificate_id`;

-- CreateTable
CREATE TABLE `Address` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `discription` VARCHAR(191) NULL,
    `latitude` DOUBLE NOT NULL DEFAULT 0.0,
    `longitude` DOUBLE NOT NULL DEFAULT 0.0,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Address_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `id` VARCHAR(191) NOT NULL,
    `brand_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `company_type_id` INTEGER NOT NULL,
    `history` VARCHAR(191) NULL,
    `image_certificate_id` INTEGER NOT NULL,

    UNIQUE INDEX `Company_user_id_key`(`user_id`),
    UNIQUE INDEX `Company_image_certificate_id_key`(`image_certificate_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompanyType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Expereance` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `from` DATETIME(3) NOT NULL,
    `to` DATETIME(3) NOT NULL,
    `type` ENUM('STUDY', 'WORK') NULL,
    `rate` DOUBLE NOT NULL DEFAULT 0.0,
    `rate_text` VARCHAR(191) NULL,

    UNIQUE INDEX `Expereance_company_id_key`(`company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,
    `type` ENUM('IMAGE', 'PDF', 'VIDEO', 'DOC') NOT NULL DEFAULT 'IMAGE',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JopTitle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `Files`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_jop_title_id_fkey` FOREIGN KEY (`jop_title_id`) REFERENCES `JopTitle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_company_type_id_fkey` FOREIGN KEY (`company_type_id`) REFERENCES `CompanyType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_image_certificate_id_fkey` FOREIGN KEY (`image_certificate_id`) REFERENCES `Files`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expereance` ADD CONSTRAINT `Expereance_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expereance` ADD CONSTRAINT `Expereance_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
