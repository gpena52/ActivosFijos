/*
  Warnings:

  - A unique constraint covering the columns `[accountNumber]` on the table `AccountingAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "AccountingAccount_accountNumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "AccountingAccount_accountNumber_key" ON "AccountingAccount"("accountNumber") WHERE ("status" = true);
