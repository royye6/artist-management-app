/*
  Warnings:

  - You are about to alter the column `genre` on the `Artist` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_record_label_id_fkey";

-- AlterTable
ALTER TABLE "Artist" ALTER COLUMN "genre" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "record_label_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_record_label_id_fkey" FOREIGN KEY ("record_label_id") REFERENCES "RecordLabel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
