/*
  Warnings:

  - You are about to drop the column `rolId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Modulo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rol` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RolesOnModulos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WashStatus" AS ENUM ('WAITING', 'IN_PROGRESS', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "RolesOnModulos" DROP CONSTRAINT "RolesOnModulos_moduloId_fkey";

-- DropForeignKey
ALTER TABLE "RolesOnModulos" DROP CONSTRAINT "RolesOnModulos_rolId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_rolId_fkey";

-- DropIndex
DROP INDEX "fki_rol_fkey";

-- DropIndex
DROP INDEX "fki_rol_id";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "rolId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "Modulo";

-- DropTable
DROP TABLE "Rol";

-- DropTable
DROP TABLE "RolesOnModulos";

-- CreateTable
CREATE TABLE "Washer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Washer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wash" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "clientName" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "washType" TEXT NOT NULL,
    "paymentType" TEXT NOT NULL,
    "status" "WashStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WasherOnWash" (
    "washerId" UUID NOT NULL,
    "washId" UUID NOT NULL,

    CONSTRAINT "WasherOnWash_pkey" PRIMARY KEY ("washerId","washId")
);

-- AddForeignKey
ALTER TABLE "WasherOnWash" ADD CONSTRAINT "WasherOnWash_washerId_fkey" FOREIGN KEY ("washerId") REFERENCES "Washer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WasherOnWash" ADD CONSTRAINT "WasherOnWash_washId_fkey" FOREIGN KEY ("washId") REFERENCES "Wash"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
