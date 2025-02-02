-- DropForeignKey
ALTER TABLE `userprofile` DROP FOREIGN KEY `UserProfile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `userprofile` DROP FOREIGN KEY `UserProfile_userId_user_fkey`;

-- AlterTable
ALTER TABLE `userprofile` MODIFY `userId` INTEGER NULL,
    MODIFY `userId2` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `userprofile` ADD CONSTRAINT `UserProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user1`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userprofile` ADD CONSTRAINT `UserProfile_userId2_user_fkey` FOREIGN KEY (`userId2`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
