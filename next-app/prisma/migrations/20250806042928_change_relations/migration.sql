/*
  Warnings:

  - You are about to drop the column `formImageId` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `recommendImageId` on the `Recommend` table. All the data in the column will be lost.
  - You are about to drop the column `storeImageId` on the `Store` table. All the data in the column will be lost.
  - Added the required column `formId` to the `FormImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recommendId` to the `RecommendImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `StoreImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Form" DROP CONSTRAINT "Form_formImageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Recommend" DROP CONSTRAINT "Recommend_recommendImageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Store" DROP CONSTRAINT "Store_storeImageId_fkey";

-- AlterTable
ALTER TABLE "public"."Form" DROP COLUMN "formImageId";

-- AlterTable
ALTER TABLE "public"."FormImage" ADD COLUMN     "formId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Recommend" DROP COLUMN "recommendImageId";

-- AlterTable
ALTER TABLE "public"."RecommendImage" ADD COLUMN     "recommendId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Store" DROP COLUMN "storeImageId";

-- AlterTable
ALTER TABLE "public"."StoreImage" ADD COLUMN     "storeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."StoreImage" ADD CONSTRAINT "StoreImage_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FormImage" ADD CONSTRAINT "FormImage_formId_fkey" FOREIGN KEY ("formId") REFERENCES "public"."Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecommendImage" ADD CONSTRAINT "RecommendImage_recommendId_fkey" FOREIGN KEY ("recommendId") REFERENCES "public"."Recommend"("id") ON DELETE CASCADE ON UPDATE CASCADE;
