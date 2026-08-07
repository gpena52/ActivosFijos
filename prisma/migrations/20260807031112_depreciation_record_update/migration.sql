/*
  Warnings:

  - You are about to drop the column `assetId` on the `DepreciationRecord` table. All the data in the column will be lost.
  - You are about to drop the column `depreciationAccountId` on the `DepreciationRecord` table. All the data in the column will be lost.
  - You are about to drop the column `processMonth` on the `DepreciationRecord` table. All the data in the column will be lost.
  - You are about to drop the column `processYear` on the `DepreciationRecord` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseAccountId` on the `DepreciationRecord` table. All the data in the column will be lost.
  - Added the required column `fixedAssetId` to the `DepreciationRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DepreciationRecord" DROP CONSTRAINT "DepreciationRecord_assetId_fkey";

-- DropForeignKey
ALTER TABLE "DepreciationRecord" DROP CONSTRAINT "DepreciationRecord_depreciationAccountId_fkey";

-- DropForeignKey
ALTER TABLE "DepreciationRecord" DROP CONSTRAINT "DepreciationRecord_purchaseAccountId_fkey";

-- AlterTable
ALTER TABLE "DepreciationRecord" DROP COLUMN "assetId",
DROP COLUMN "depreciationAccountId",
DROP COLUMN "processMonth",
DROP COLUMN "processYear",
DROP COLUMN "purchaseAccountId",
ADD COLUMN     "fixedAssetId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "DepreciationRecord" ADD CONSTRAINT "DepreciationRecord_fixedAssetId_fkey" FOREIGN KEY ("fixedAssetId") REFERENCES "FixedAsset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
