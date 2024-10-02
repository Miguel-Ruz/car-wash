-- CreateTable
CREATE TABLE "WashType" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "WashType_pkey" PRIMARY KEY ("id")
);
