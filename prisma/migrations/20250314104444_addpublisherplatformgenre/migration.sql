/*
  Warnings:

  - You are about to drop the column `genre` on the `VideoGameProduct` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `VideoGameProduct` table. All the data in the column will be lost.
  - You are about to drop the column `publisher` on the `VideoGameProduct` table. All the data in the column will be lost.
  - Added the required column `genreId` to the `VideoGameProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platformId` to the `VideoGameProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisherId` to the `VideoGameProduct` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Platform" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Publisher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VideoGameProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    "publisherId" TEXT NOT NULL,
    "playerCount" INTEGER NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    "price" REAL NOT NULL,
    "developer" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "coverImageUrl" TEXT,
    "trailerUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "VideoGameProduct_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VideoGameProduct_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VideoGameProduct_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VideoGameProduct" ("coverImageUrl", "createdAt", "description", "developer", "id", "playerCount", "price", "rating", "releaseDate", "title", "trailerUrl", "updatedAt") SELECT "coverImageUrl", "createdAt", "description", "developer", "id", "playerCount", "price", "rating", "releaseDate", "title", "trailerUrl", "updatedAt" FROM "VideoGameProduct";
DROP TABLE "VideoGameProduct";
ALTER TABLE "new_VideoGameProduct" RENAME TO "VideoGameProduct";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Platform_name_key" ON "Platform"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_name_key" ON "Publisher"("name");
