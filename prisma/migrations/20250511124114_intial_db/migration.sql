-- CreateTable
CREATE TABLE "pages" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER,
    "type" TEXT NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "study_program_pages" (
    "page_id" INTEGER NOT NULL,
    "study_program_id" INTEGER NOT NULL,
    "title_id" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "cover_photo" TEXT NOT NULL,

    CONSTRAINT "study_program_pages_pkey" PRIMARY KEY ("page_id")
);

-- CreateTable
CREATE TABLE "backlink_pages" (
    "page_id" INTEGER NOT NULL,
    "redirect_link" TEXT NOT NULL,

    CONSTRAINT "backlink_pages_pkey" PRIMARY KEY ("page_id")
);

-- CreateTable
CREATE TABLE "regular_pages" (
    "page_id" INTEGER NOT NULL,
    "photo" TEXT NOT NULL,
    "content_id" TEXT NOT NULL,
    "content_en" TEXT NOT NULL,
    "has_line_above" BOOLEAN NOT NULL,

    CONSTRAINT "regular_pages_pkey" PRIMARY KEY ("page_id")
);

-- CreateTable
CREATE TABLE "gallery_pages" (
    "page_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "cover_photo" TEXT NOT NULL,

    CONSTRAINT "gallery_pages_pkey" PRIMARY KEY ("page_id")
);

-- CreateTable
CREATE TABLE "gallery_images" (
    "id" SERIAL NOT NULL,
    "gallery_page_id" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "gallery_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "study_programs" (
    "id" SERIAL NOT NULL,
    "photo" TEXT NOT NULL,
    "name_id" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "head_name" TEXT NOT NULL,
    "head_photo" TEXT NOT NULL,
    "description_id" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "graduate_profile_id" TEXT NOT NULL,
    "graduate_profile_en" TEXT NOT NULL,
    "website_link" TEXT NOT NULL,

    CONSTRAINT "study_programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news" (
    "id" SERIAL NOT NULL,
    "title_id" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "content_id" TEXT NOT NULL,
    "content_en" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "announcements" (
    "id" SERIAL NOT NULL,
    "title_id" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "content_id" TEXT NOT NULL,
    "content_en" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "announcements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carousel_items" (
    "id" SERIAL NOT NULL,
    "title_id" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "carousel_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department_info" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "vision_id" TEXT NOT NULL,
    "vision_en" TEXT NOT NULL,
    "mission_id" TEXT NOT NULL,
    "mission_en" TEXT NOT NULL,
    "goals_id" TEXT NOT NULL,
    "goals_en" TEXT NOT NULL,
    "total_students" INTEGER NOT NULL,
    "alumni" INTEGER NOT NULL,
    "lecturers" INTEGER NOT NULL,
    "staff" INTEGER NOT NULL,
    "contact_email" TEXT NOT NULL,
    "contact_email_link" TEXT NOT NULL,
    "contact_phone" TEXT NOT NULL,
    "contact_phone_link" TEXT NOT NULL,

    CONSTRAINT "department_info_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "pages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study_program_pages" ADD CONSTRAINT "study_program_pages_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "backlink_pages" ADD CONSTRAINT "backlink_pages_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regular_pages" ADD CONSTRAINT "regular_pages_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery_pages" ADD CONSTRAINT "gallery_pages_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_gallery_page_id_fkey" FOREIGN KEY ("gallery_page_id") REFERENCES "gallery_pages"("page_id") ON DELETE CASCADE ON UPDATE CASCADE;
