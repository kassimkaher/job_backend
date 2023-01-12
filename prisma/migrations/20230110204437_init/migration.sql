-- AlterTable
ALTER TABLE `Expereance` ADD COLUMN `postsId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Files` ADD COLUMN `postsId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Token` ADD COLUMN `postsId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Posts` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `salary` INTEGER NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `number_of_person` INTEGER NOT NULL,
    `work_location` ENUM('ONSITE', 'REMOTLY', 'HYPRID') NULL,
    `work_time` ENUM('FULL', 'HALF', 'PERPROJECT') NULL,
    `expire` DATETIME(3) NOT NULL,
    `week_end` INTEGER NOT NULL,
    `day_hour` INTEGER NOT NULL,
    `person_level` ENUM('BEGINEER', 'MEDIUM', 'JUNIUR', 'SENIOR', 'PROF', 'EXPERT') NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `addressId` VARCHAR(191) NULL,
    `jopTitleId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Requsets` (
    `id` VARCHAR(191) NOT NULL,
    `cover_letter` VARCHAR(191) NOT NULL,
    `post_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `attachment` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL,
    `expect_salary` INTEGER NOT NULL,
    `meeting_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_postsId_fkey` FOREIGN KEY (`postsId`) REFERENCES `Posts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expereance` ADD CONSTRAINT `Expereance_postsId_fkey` FOREIGN KEY (`postsId`) REFERENCES `Posts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Files` ADD CONSTRAINT `Files_postsId_fkey` FOREIGN KEY (`postsId`) REFERENCES `Posts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_jopTitleId_fkey` FOREIGN KEY (`jopTitleId`) REFERENCES `JopTitle`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Requsets` ADD CONSTRAINT `Requsets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Requsets` ADD CONSTRAINT `Requsets_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
