/*
  Warnings:

  - You are about to drop the `modulos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles_permisos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "roles_permisos" DROP CONSTRAINT "roles_permisos_modulo_id_fkey";

-- DropForeignKey
ALTER TABLE "roles_permisos" DROP CONSTRAINT "roles_permisos_rol_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_rol_id_fkey";

-- DropTable
DROP TABLE "modulos";

-- DropTable
DROP TABLE "roles";

-- DropTable
DROP TABLE "roles_permisos";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Modulo" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "permisos _pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "ROLES_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolesOnModulos" (
    "rolId" UUID NOT NULL,
    "moduloId" UUID NOT NULL,

    CONSTRAINT "RolesOnModulos_pkey" PRIMARY KEY ("rolId","moduloId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "password" VARCHAR(50) NOT NULL,
    "rolId" UUID NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fki_rol_fkey" ON "User"("rolId");

-- CreateIndex
CREATE INDEX "fki_rol_id" ON "User"("rolId");

-- AddForeignKey
ALTER TABLE "RolesOnModulos" ADD CONSTRAINT "RolesOnModulos_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesOnModulos" ADD CONSTRAINT "RolesOnModulos_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "Modulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
