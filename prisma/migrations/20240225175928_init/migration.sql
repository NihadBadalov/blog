/*
  Warnings:

  - You are about to drop the column `title` on the `Article` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contents" TEXT NOT NULL,
    "publication_date" DATETIME NOT NULL
);
INSERT INTO "new_Article" ("contents", "id", "publication_date") SELECT "contents", "id", "publication_date" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
