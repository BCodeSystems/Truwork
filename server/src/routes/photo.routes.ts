import { Router } from "express";
import multer from "multer";
import {
  deleteJobPhotoController,
  getJobPhotosController,
  updateJobPhotoCategoryController,
  uploadJobPhotoController,
} from "../controllers/photo.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB max per photo for mobile uploads
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, and WEBP images are allowed"));
    }

    cb(null, true);
  },
});

router.post(
  "/jobs/:jobId/photos",
  protect,
  upload.single("photo"),
  uploadJobPhotoController
);

router.get(
  "/jobs/:jobId/photos",
  protect,
  getJobPhotosController
);

router.delete(
  "/jobs/:jobId/photos/:photoId",
  protect,
  deleteJobPhotoController
);

router.patch(
  "/jobs/:jobId/photos/:photoId",
  protect,
  updateJobPhotoCategoryController
);

export default router;