-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `image_id` INTEGER NOT NULL,
    `image_certificate_id` INTEGER NULL,
    `password` VARCHAR(191) NOT NULL,
    `gander` VARCHAR(191) NOT NULL,
    `jop_title_id` INTEGER NOT NULL,
    `onesignal_id` VARCHAR(191) NULL,
    `address_id` INTEGER NOT NULL,
    `role_id` ENUM('ADMIN', 'COMPANY', 'USER') NOT NULL,
    `company_id` INTEGER NULL,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `code` VARCHAR(191) NOT NULL,
    `verified_date` DATETIME(3) NOT NULL,
    `parthday` DATETIME(3) NOT NULL,
    `enable` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    UNIQUE INDEX `User_image_id_key`(`image_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
