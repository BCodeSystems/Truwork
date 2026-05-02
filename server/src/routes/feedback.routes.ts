import { Router } from "express";
import { submitFeedback } from "../controllers/feedback.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticateToken, submitFeedback);

export default router;
