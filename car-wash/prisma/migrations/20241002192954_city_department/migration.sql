/*
  Warnings:

  - Added the required column `city` to the `Washer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Washer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Washer" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "department" TEXT NOT NULL;
