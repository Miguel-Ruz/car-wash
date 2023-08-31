/*
  Warnings:

  - You are about to drop the `WasherOnWash` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `washerId` to the `Wash` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WasherOnWash" DROP CONSTRAINT "WasherOnWash_washId_fkey";

-- DropForeignKey
ALTER TABLE "WasherOnWash" DROP CONSTRAINT "WasherOnWash_washerId_fkey";

-- AlterTable
ALTER TABLE "Wash" ADD COLUMN     "washerId" UUID NOT NULL;

-- DropTable
DROP TABLE "WasherOnWash";

-- AddForeignKey
ALTER TABLE "Wash" ADD CONSTRAINT "Wash_washerId_fkey" FOREIGN KEY ("washerId") REFERENCES "Washer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
