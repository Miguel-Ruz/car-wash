/*
  Warnings:

  - Added the required column `address` to the `Washer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exp_id_date` to the `Washer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `Washer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Washer" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "exp_id_date" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL;
