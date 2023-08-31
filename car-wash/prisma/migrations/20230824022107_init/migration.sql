-- CreateTable
CREATE TABLE "modulos" (
    "id" BIGSERIAL NOT NULL,
    "modulo" VARCHAR(100) NOT NULL,

    CONSTRAINT "permisos _pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "rol" VARCHAR(50) NOT NULL,

    CONSTRAINT "ROLES_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles_permisos" (
    "id" BIGSERIAL NOT NULL,
    "rol_id" SERIAL NOT NULL,
    "modulo_id" BIGSERIAL NOT NULL,

    CONSTRAINT "roles_permisos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "password" VARCHAR(50),
    "rol_id" SERIAL NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fki_permiso_id" ON "roles_permisos"("modulo_id");

-- CreateIndex
CREATE INDEX "fki_rol_id_module" ON "roles_permisos"("rol_id");

-- CreateIndex
CREATE INDEX "fki_rol_fkey" ON "users"("rol_id");

-- CreateIndex
CREATE INDEX "fki_rol_id" ON "users"("rol_id");

-- AddForeignKey
ALTER TABLE "roles_permisos" ADD CONSTRAINT "roles_permisos_modulo_id_fkey" FOREIGN KEY ("modulo_id") REFERENCES "modulos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "roles_permisos" ADD CONSTRAINT "roles_permisos_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
