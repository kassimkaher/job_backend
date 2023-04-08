-- AddForeignKey
ALTER TABLE `JopTitle` ADD CONSTRAINT `JopTitle_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `JopTitle`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
