/*
  Warnings:

  - Added the required column `rate` to the `Wash` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wash" ADD COLUMN     "rate" TEXT NOT NULL;
