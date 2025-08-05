/*
  Warnings:

  - The primary key for the `StoreLike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StoreSupport` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Form" DROP CONSTRAINT "Form_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StoreLike" DROP CONSTRAINT "StoreLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StoreSupport" DROP CONSTRAINT "StoreSupport_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Comment" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Form" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."StoreLike" DROP CONSTRAINT "StoreLike_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "StoreLike_pkey" PRIMARY KEY ("userId", "storeId");

-- AlterTable
ALTER TABLE "public"."StoreSupport" DROP CONSTRAINT "StoreSupport_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "StoreSupport_pkey" PRIMARY KEY ("userId", "storeId");

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Form" ADD CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StoreLike" ADD CONSTRAINT "StoreLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StoreSupport" ADD CONSTRAINT "StoreSupport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
