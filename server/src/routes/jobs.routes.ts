import { Router } from "express";
import { updateJob, deleteJob, createJob, getJobById, getJobs } from "../controllers/jobs.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Get all jobs for the logged-in user
router.get("/", protect, getJobs);

// Create a new job for the logged-in user
router.post("/", protect, createJob);

// Get one job by id for the logged-in user
router.get("/:id", protect, getJobById);

// Update a job for the logged-in user
router.patch("/:id", protect, updateJob);

// Delete a job for the logged-in user
router.delete("/:id", protect, deleteJob);

export default router;