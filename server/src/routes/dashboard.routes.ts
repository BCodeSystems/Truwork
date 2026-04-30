import express from "express";
import { protect } from "../middleware/auth.middleware";
import { getDashboardSummary } from "../controllers/dashboard.controller";

const router = express.Router();

// GET /api/dashboard
router.get("/", protect, getDashboardSummary);

export default router;