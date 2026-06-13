/*
  Warnings:

  - You are about to drop the `Venue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_owner_id_fkey";

-- DropTable
DROP TABLE "Venue";
