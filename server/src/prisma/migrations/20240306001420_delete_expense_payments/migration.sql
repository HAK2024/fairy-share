/*
  Warnings:

  - You are about to drop the `ExpensePayment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[expenseId,payerId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ExpensePayment" DROP CONSTRAINT "ExpensePayment_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "ExpensePayment" DROP CONSTRAINT "ExpensePayment_paymentId_fkey";

-- DropTable
DROP TABLE "ExpensePayment";

-- CreateIndex
CREATE UNIQUE INDEX "Payment_expenseId_payerId_key" ON "Payment"("expenseId", "payerId");
