/*
  Warnings:

  - You are about to drop the column `company_id` on the `Expereance` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Expereance_company_id_key` ON `Expereance`;

-- AlterTable
ALTER TABLE `Expereance` DROP COLUMN `company_id`;
