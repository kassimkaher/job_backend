-- DropForeignKey
ALTER TABLE `JopTitle` DROP FOREIGN KEY `JopTitle_parent_id_fkey`;

-- CreateTable
CREATE TABLE `JopTitleChild` (
    `parentId` INTEGER NOT NULL,

    PRIMARY KEY (`parentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JopTitleChild` ADD CONSTRAINT `JopTitleChild_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `JopTitle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
