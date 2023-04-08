/*
  Warnings:

  - A unique constraint covering the columns `[title,parent_id]` on the table `productCategories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `productCategories_title_parent_id_key` ON `productCategories`(`title`, `parent_id`);
