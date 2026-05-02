import { Router } from "express";
import multer from "multer";
import { getProfile, updateProfile, uploadLogo } from "../controllers/profile.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, and WEBP images are allowed"));
    }
    cb(null, true);
  },
});

router.get("/", protect, getProfile);
router.patch("/", protect, updateProfile);
router.post("/logo", protect, upload.single("logo"), uploadLogo);

export default router;
