/*
  Warnings:

  - A unique constraint covering the columns `[nationalId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Employee_nationalId_key" ON "Employee"("nationalId") WHERE ("status" = true);
