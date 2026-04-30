-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "paymentMethods" TEXT[] DEFAULT ARRAY[]::TEXT[];
