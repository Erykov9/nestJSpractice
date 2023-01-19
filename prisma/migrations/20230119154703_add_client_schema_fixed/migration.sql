/*
  Warnings:

  - You are about to drop the column `createdAt` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `client` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `client` DROP FOREIGN KEY `Client_orderId_fkey`;

-- AlterTable
ALTER TABLE `client` DROP COLUMN `createdAt`,
    DROP COLUMN `orderId`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `clientId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
