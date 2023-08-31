/*
  Warnings:

  - The primary key for the `modulos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `modulos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `roles_permisos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `roles_permisos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rol_id` column on the `roles_permisos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `modulo_id` column on the `roles_permisos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rol_id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "roles_permisos" DROP CONSTRAINT "roles_permisos_modulo_id_fkey";

-- DropForeignKey
ALTER TABLE "roles_permisos" DROP CONSTRAINT "roles_permisos_rol_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_rol_id_fkey";

-- AlterTable
ALTER TABLE "modulos" DROP CONSTRAINT "permisos _pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "permisos _pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "roles" DROP CONSTRAINT "ROLES_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "ROLES_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "roles_permisos" DROP CONSTRAINT "roles_permisos_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "rol_id",
ADD COLUMN     "rol_id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "modulo_id",
ADD COLUMN     "modulo_id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "roles_permisos_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "rol_id",
ADD COLUMN     "rol_id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "fki_permiso_id" ON "roles_permisos"("modulo_id");

-- CreateIndex
CREATE INDEX "fki_rol_id_module" ON "roles_permisos"("rol_id");

-- AddForeignKey
ALTER TABLE "roles_permisos" ADD CONSTRAINT "roles_permisos_modulo_id_fkey" FOREIGN KEY ("modulo_id") REFERENCES "modulos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "roles_permisos" ADD CONSTRAINT "roles_permisos_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
