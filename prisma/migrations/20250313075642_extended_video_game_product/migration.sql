-- CreateTable
CREATE TABLE "VideoGameProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
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
