-- CreateTable
CREATE TABLE "Article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "contents" TEXT NOT NULL,
    "publication_date" DATETIME NOT NULL
);
