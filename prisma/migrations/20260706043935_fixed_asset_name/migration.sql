/*
  Warnings:

  - Added the required column `name` to the `FixedAsset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FixedAsset" ADD COLUMN     "name" TEXT NOT NULL;
