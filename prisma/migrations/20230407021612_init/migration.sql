-- DropForeignKey
ALTER TABLE `JopTitle` DROP FOREIGN KEY `JopTitle_parent_id_fkey`;

-- CreateTable
CREATE TABLE `JopTitleChild` (
    `id` INTEGER NOT NULL,
    `parent_id` INTEGER NULL,

    UNIQUE INDEX `JopTitleChild_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JopTitleChild` ADD CONSTRAINT `JopTitleChild_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `JopTitle`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
