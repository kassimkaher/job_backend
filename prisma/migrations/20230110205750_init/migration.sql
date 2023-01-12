/*
  Warnings:

  - You are about to drop the column `addressId` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `jopTitleId` on the `Posts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Expereance` DROP FOREIGN KEY `Expereance_postsId_fkey`;

-- DropForeignKey
ALTER TABLE `Files` DROP FOREIGN KEY `Files_postsId_fkey`;

-- DropForeignKey
ALTER TABLE `Posts` DROP FOREIGN KEY `Posts_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `Posts` DROP FOREIGN KEY `Posts_jopTitleId_fkey`;

-- DropForeignKey
ALTER TABLE `Token` DROP FOREIGN KEY `Token_postsId_fkey`;

-- AlterTable
ALTER TABLE `Posts` DROP COLUMN `addressId`,
    DROP COLUMN `jopTitleId`,
    ADD COLUMN `jop_title_id` INTEGER NULL;
