import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes";
import jobsRoutes from "./routes/jobs.routes";
import invoiceRoutes from "./routes/invoice.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import photoRoutes from "./routes/photo.routes";
import feedbackRoutes from "./routes/feedback.routes";
import profileRoutes from "./routes/profile.routes";

const app = express();

// Comma-separated list of origins allowed to call the API, e.g.
// CORS_ORIGINS=https://truworkapp.com,https://www.truworkapp.com
const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  "http://localhost:3000,https://truworkapp.com,https://www.truworkapp.com"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Set TRUST_PROXY=1 when running behind a load balancer (Render, Railway, Fly, etc.)
// so rate limiting keys on the real client IP instead of the proxy's.
if (process.env.TRUST_PROXY) {
  app.set("trust proxy", Number(process.env.TRUST_PROXY) || process.env.TRUST_PROXY);
}

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many attempts. Please wait a few minutes and try again.",
  },
});

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", photoRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/profile", profileRoutes);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "TruWork API is running",
  });
});

export default app;