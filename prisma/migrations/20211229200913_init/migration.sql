-- CreateEnum
CREATE TYPE "locales" AS ENUM ('zh', 'en', 'ja', 'ko');

-- CreateEnum
CREATE TYPE "provinces" AS ENUM ('NL', 'PE', 'NS', 'NB', 'QC', 'ON', 'MB', 'SK', 'AB', 'BC', 'YT', 'NT', 'NU');

-- CreateEnum
CREATE TYPE "weekdays" AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');

-- CreateEnum
CREATE TYPE "program_formats" AS ENUM ('online', 'in-person', 'blended');

-- CreateEnum
CREATE TYPE "roles" AS ENUM ('PARENT', 'PROGRAM_ADMIN', 'TEACHER', 'VOLUNTEER');

-- CreateEnum
CREATE TYPE "difficulties" AS ENUM ('LEARNING', 'PHYSICAL', 'SENSORY', 'OTHER');

-- CreateEnum
CREATE TYPE "heard_from" AS ENUM ('FRIENDS_FAMILY', 'FLYERS', 'EMAIL', 'SOCIAL_MEDIA', 'OTHER');

-- CreateEnum
CREATE TYPE "therapy" AS ENUM ('PHYSIO', 'SPEECH_LANG', 'OCCUPATIONAL', 'COUNSELING', 'ART', 'OTHER');

-- CreateTable
CREATE TABLE "parents" (
    "id" SERIAL NOT NULL,
    "phone_number" VARCHAR(50) NOT NULL,
    "is_low_income" BOOLEAN,
    "preferred_language" "locales" NOT NULL,
    "proof_of_income_link" TEXT,
    "proof_of_income_submitted_at" TIMESTAMPTZ(6),
    "heard_from" "heard_from"[],
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "parents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programs" (
    "id" SERIAL NOT NULL,
    "online_format" "program_formats" NOT NULL,
    "tag" TEXT NOT NULL,
    "image_link" TEXT,
    "start_date" TIMESTAMPTZ(6) NOT NULL,
    "end_date" TIMESTAMPTZ(6) NOT NULL,
    "is_archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "program_translations" (
    "program_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "language" "locales" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "program_translations_pkey" PRIMARY KEY ("program_id","language")
);

-- CreateTable
CREATE TABLE "teachers" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher_regs" (
    "teacher_id" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "teacher_regs_pkey" PRIMARY KEY ("class_id","teacher_id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMPTZ(6),
    "role" "roles",
    "image" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_requests" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "verification_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteers" (
    "id" SERIAL NOT NULL,
    "phone_number" VARCHAR(50),
    "date_of_birth" TIMESTAMPTZ(6) NOT NULL,
    "address_line1" TEXT,
    "criminal_record_check_link" TEXT,
    "criminal_check_approved" BOOLEAN,
    "criminal_check_expired" BOOLEAN DEFAULT false,
    "criminal_check_submitted_at" TIMESTAMPTZ(6),
    "postal_code" VARCHAR(10),
    "city_name" TEXT,
    "province" "provinces",
    "school" TEXT,
    "preferred_language" "locales",
    "skills" TEXT,
    "hear_about_us" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "volunteers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_regs" (
    "volunteer_id" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "volunteer_regs_pkey" PRIMARY KEY ("volunteer_id","class_id")
);

-- CreateTable
CREATE TABLE "program_admins" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "program_admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_translations" (
    "class_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "language" "locales" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "class_translations_pkey" PRIMARY KEY ("class_id","language")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "border_age" INTEGER NOT NULL,
    "is_age_minimal" BOOLEAN NOT NULL DEFAULT false,
    "image_link" TEXT,
    "program_id" INTEGER NOT NULL,
    "stripe_price_id" VARCHAR(50) NOT NULL,
    "space_total" INTEGER NOT NULL,
    "volunteer_space_total" INTEGER NOT NULL,
    "is_archived" BOOLEAN NOT NULL DEFAULT false,
    "start_date" TIMESTAMPTZ(6) NOT NULL,
    "end_date" TIMESTAMPTZ(6) NOT NULL,
    "weekday" "weekdays" NOT NULL,
    "start_time_minutes" INTEGER NOT NULL,
    "duration_minutes" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "waitlists" (
    "class_id" INTEGER NOT NULL,
    "parent_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "waitlists_pkey" PRIMARY KEY ("parent_id","class_id")
);

-- CreateTable
CREATE TABLE "parent_regs" (
    "parent_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "parent_regs_pkey" PRIMARY KEY ("parent_id","student_id","class_id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "date_of_birth" TIMESTAMPTZ(6) NOT NULL,
    "address_line1" TEXT NOT NULL,
    "address_line2" TEXT,
    "postal_code" VARCHAR(10),
    "city_name" TEXT,
    "province" "provinces",
    "school" TEXT,
    "grade" INTEGER,
    "difficulties" "difficulties"[],
    "other_difficulties" TEXT,
    "therapy" "therapy"[],
    "other_therapy" TEXT,
    "special_education" BOOLEAN DEFAULT false,
    "guardian_expectations" TEXT,
    "medication" TEXT,
    "allergies" TEXT,
    "additional_info" TEXT,
    "emerg_first_name" TEXT NOT NULL,
    "emerg_last_name" TEXT NOT NULL,
    "emerg_number" VARCHAR(50) NOT NULL,
    "emerg_relation_to_student" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verification_requests_token_key" ON "verification_requests"("token");

-- AddForeignKey
ALTER TABLE "parents" ADD CONSTRAINT "parents_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "program_translations" ADD CONSTRAINT "program_translations_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teacher_regs" ADD CONSTRAINT "teacher_regs_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teacher_regs" ADD CONSTRAINT "teacher_regs_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "volunteers" ADD CONSTRAINT "volunteers_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "volunteer_regs" ADD CONSTRAINT "volunteer_regs_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "volunteer_regs" ADD CONSTRAINT "volunteer_regs_volunteer_id_fkey" FOREIGN KEY ("volunteer_id") REFERENCES "volunteers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "program_admins" ADD CONSTRAINT "program_admins_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "class_translations" ADD CONSTRAINT "class_translations_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "waitlists" ADD CONSTRAINT "waitlists_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "waitlists" ADD CONSTRAINT "waitlists_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "parents"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "parent_regs" ADD CONSTRAINT "parent_regs_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "parent_regs" ADD CONSTRAINT "parent_regs_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "parents"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "parent_regs" ADD CONSTRAINT "parent_regs_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "parents"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
