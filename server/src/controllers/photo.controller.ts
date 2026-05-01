import { Request, Response } from "express";
import {
  deleteJobPhoto,
  getPhotosByJob,
  uploadJobPhoto,
  updateJobPhotoCategory,
} from "../services/photo.service";

export async function uploadJobPhotoController(req: Request, res: Response) {
  try {
    const jobId = String(req.params.jobId);
    const { category, caption } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Photo file is required" });
    }

    const photo = await uploadJobPhoto({
      jobId,
      file: req.file,
      category,
      caption,
    });

    return res.status(201).json(photo);
  } catch (error) {
    console.error("Upload job photo error:", error);
    return res.status(500).json({ message: "Failed to upload photo" });
  }
}

export async function getJobPhotosController(req: Request, res: Response) {
  try {
    const jobId = String(req.params.jobId);

    const photos = await getPhotosByJob(jobId);

    return res.json(photos);
  } catch (error) {
    console.error("Get job photos error:", error);
    return res.status(500).json({ message: "Failed to get photos" });
  }
}

export async function deleteJobPhotoController(req: Request, res: Response) {
  try {
    const photoId = String(req.params.photoId);

    await deleteJobPhoto(photoId);

    return res.json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.error("Delete job photo error:", error);
    return res.status(500).json({ message: "Failed to delete photo" });
  }
}


export async function updateJobPhotoCategoryController(
  req: Request,
  res: Response
) {
  try {
    const photoId = String(req.params.photoId);
    const { category } = req.body;

    const allowedCategories = [
      "before",
      "during",
      "after",
      "receipt",
      "other",
    ];

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid photo category" });
    }

    const photo = await updateJobPhotoCategory(photoId, category);

    return res.json(photo);
  } catch (error) {
    console.error("Update photo category error:", error);
    return res
      .status(500)
      .json({ message: "Failed to update photo category" });
  }
}