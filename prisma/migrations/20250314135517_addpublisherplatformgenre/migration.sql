/*
  Warnings:

  - You are about to drop the column `genreId` on the `VideoGameProduct` table. All the data in the column will be lost.
  - You are about to drop the column `platformId` on the `VideoGameProduct` table. All the data in the column will be lost.
  - You are about to drop the column `publisherId` on the `VideoGameProduct` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "VideoGameProductGenre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "videoGameProductId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,
    CONSTRAINT "VideoGameProductGenre_videoGameProductId_fkey" FOREIGN KEY ("videoGameProductId") REFERENCES "VideoGameProduct" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VideoGameProductGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VideoGameProductPlatform" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "videoGameProductId" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    CONSTRAINT "VideoGameProductPlatform_videoGameProductId_fkey" FOREIGN KEY ("videoGameProductId") REFERENCES "VideoGameProduct" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VideoGameProductPlatform_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VideoGameProductPublisher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "videoGameProductId" TEXT NOT NULL,
    "publisherId" TEXT NOT NULL,
    CONSTRAINT "VideoGameProductPublisher_videoGameProductId_fkey" FOREIGN KEY ("videoGameProductId") REFERENCES "VideoGameProduct" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VideoGameProductPublisher_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VideoGameProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "playerCount" INTEGER NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    "price" REAL NOT NULL,
    "developer" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "coverImageUrl" TEXT,
    "trailerUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_VideoGameProduct" ("coverImageUrl", "createdAt", "description", "developer", "id", "playerCount", "price", "rating", "releaseDate", "title", "trailerUrl", "updatedAt") SELECT "coverImageUrl", "createdAt", "description", "developer", "id", "playerCount", "price", "rating", "releaseDate", "title", "trailerUrl", "updatedAt" FROM "VideoGameProduct";
DROP TABLE "VideoGameProduct";
ALTER TABLE "new_VideoGameProduct" RENAME TO "VideoGameProduct";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
