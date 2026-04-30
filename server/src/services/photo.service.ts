import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import r2 from "../lib/r2";
import prisma from "../lib/prisma";

type UploadJobPhotoInput = {
  jobId: string;
  file: Express.Multer.File;
  category?: "before" | "during" | "after" | "receipt" | "other";
  caption?: string;
};

export async function uploadJobPhoto({
  jobId,
  file,
  category = "other",
  caption,
}: UploadJobPhotoInput) {
  const fileExtension = file.originalname.split(".").pop();
  const storageKey = `jobs/${jobId}/${randomUUID()}.${fileExtension}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: storageKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  const photoUrl = `${process.env.R2_PUBLIC_BASE_URL}/${storageKey}`;

  const photo = await prisma.photo.create({
    data: {
      jobId,
      photoUrl,
      storageKey,
      fileName: file.originalname,
      mimeType: file.mimetype,
      sizeBytes: file.size,
      category,
      caption,
    },
  });

  return photo;
}

export async function getPhotosByJob(jobId: string) {
  return prisma.photo.findMany({
    where: { jobId },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteJobPhoto(photoId: string) {
  // 1. Find the photo
  const photo = await prisma.photo.findUnique({
    where: { id: photoId },
  });

  if (!photo) {
    throw new Error("Photo not found");
  }

  // 2. Delete from R2
  await r2.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: photo.storageKey,
    })
  );

  // 3. Delete from database
  await prisma.photo.delete({
    where: { id: photoId },
  });

  return { success: true };
}

export async function updateJobPhotoCategory(
  photoId: string,
  category: "before" | "during" | "after" | "receipt" | "other"
) {
  return prisma.photo.update({
    where: { id: photoId },
    data: { category },
  });
}