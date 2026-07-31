-- AlterTable
ALTER TABLE "JobVacancy" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'ACTIVE';

-- Backfill: keep existing rows consistent with their current isActive value
UPDATE "JobVacancy" SET "status" = 'CLOSED' WHERE "isActive" = false;

-- CreateIndex
CREATE INDEX "JobVacancy_status_idx" ON "JobVacancy"("status");
