-- AlterTable
ALTER TABLE "AccountingAccount" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "AssetType" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Department" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DepreciationRecord" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "FixedAsset" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "JournalEntry" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;
