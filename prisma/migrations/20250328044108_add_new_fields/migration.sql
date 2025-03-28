/*
  Warnings:

  - You are about to drop the column `price` on the `VideoGameProduct` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `VideoGameProduct` table. All the data in the column will be lost.
  - You are about to drop the column `trailerUrl` on the `VideoGameProduct` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VideoGameProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "playerCount" INTEGER NOT NULL,
    "releaseDate" TEXT NOT NULL,
    "developer" TEXT NOT NULL,
    "coverImageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_VideoGameProduct" ("coverImageUrl", "createdAt", "description", "developer", "id", "playerCount", "releaseDate", "title", "updatedAt") SELECT "coverImageUrl", "createdAt", "description", "developer", "id", "playerCount", "releaseDate", "title", "updatedAt" FROM "VideoGameProduct";
DROP TABLE "VideoGameProduct";
ALTER TABLE "new_VideoGameProduct" RENAME TO "VideoGameProduct";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
