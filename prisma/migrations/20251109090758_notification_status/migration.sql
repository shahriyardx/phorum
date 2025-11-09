-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('UNREAD', 'READ');

-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "status" "NotificationStatus" NOT NULL DEFAULT 'UNREAD';
