-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "sort" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Gift" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "short" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "amounts" JSONB NOT NULL,
    "tagline" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "loved" JSONB NOT NULL,
    "rank" INTEGER NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Gift_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Occasion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "sort" INTEGER NOT NULL,
    "giftId" TEXT NOT NULL,
    CONSTRAINT "Occasion_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gift" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "blurb" TEXT NOT NULL,
    "monthly" INTEGER NOT NULL,
    "yearly" INTEGER NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "trial" TEXT,
    "cta" TEXT NOT NULL,
    "features" JSONB NOT NULL,
    "sort" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "HelpTopic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "sort" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "HelpArticle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sort" INTEGER NOT NULL,
    "topicId" TEXT NOT NULL,
    CONSTRAINT "HelpArticle_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "HelpTopic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "group" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sort" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "Faq_group_idx" ON "Faq"("group");
