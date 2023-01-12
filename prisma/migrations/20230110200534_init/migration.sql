/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Token_code_key` ON `Token`(`code`);
