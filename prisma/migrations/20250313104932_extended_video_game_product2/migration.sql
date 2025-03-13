/*
  Warnings:

  - The primary key for the `VideoGameProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VideoGameProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
INSERT INTO "new_VideoGameProduct" ("coverImageUrl", "createdAt", "description", "developer", "genre", "id", "platform", "playerCount", "price", "publisher", "rating", "releaseDate", "title", "trailerUrl", "updatedAt") SELECT "coverImageUrl", "createdAt", "description", "developer", "genre", "id", "platform", "playerCount", "price", "publisher", "rating", "releaseDate", "title", "trailerUrl", "updatedAt" FROM "VideoGameProduct";
DROP TABLE "VideoGameProduct";
ALTER TABLE "new_VideoGameProduct" RENAME TO "VideoGameProduct";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
