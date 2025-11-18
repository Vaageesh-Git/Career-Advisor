-- CreateTable
CREATE TABLE `UserRecommendation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `careerPathSummary` VARCHAR(191) NOT NULL,
    `recommendedJobs` JSON NOT NULL,
    `recommendedLearning` JSON NOT NULL,
    `progressInsights` JSON NOT NULL,
    `scholarshipMatches` JSON NOT NULL,
    `topPicks` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserRecommendation_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserRecommendation` ADD CONSTRAINT `UserRecommendation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
