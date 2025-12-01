-- DropForeignKey
ALTER TABLE `UserRecommendation` DROP FOREIGN KEY `UserRecommendation_userId_fkey`;

-- AddForeignKey
ALTER TABLE `UserRecommendation` ADD CONSTRAINT `UserRecommendation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
