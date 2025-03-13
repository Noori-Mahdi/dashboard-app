/*
  Warnings:

  - Added the required column `playerCount` to the `VideoGameProduct` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VideoGameProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "playerCount" INTEGER NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    "price" REAL NOT NULL,
    "publisher" TEXT NOT NULL,
    "developer" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "coverImageUrl" TEXT,
    "trailerUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_VideoGameProduct" ("coverImageUrl", "createdAt", "description", "developer", "genre", "id", "platform", "price", "publisher", "rating", "releaseDate", "title", "trailerUrl", "updatedAt") SELECT "coverImageUrl", "createdAt", "description", "developer", "genre", "id", "platform", "price", "publisher", "rating", "releaseDate", "title", "trailerUrl", "updatedAt" FROM "VideoGameProduct";
DROP TABLE "VideoGameProduct";
ALTER TABLE "new_VideoGameProduct" RENAME TO "VideoGameProduct";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
