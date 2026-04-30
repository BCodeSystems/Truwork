import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, (req, res) => {
  return res.status(200).json({
    success: true,
    user: (req as any).user,
  });
});

export default router;