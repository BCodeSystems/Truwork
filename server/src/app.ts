import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import jobsRoutes from "./routes/jobs.routes";
import invoiceRoutes from "./routes/invoice.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import photoRoutes from "./routes/photo.routes";
import feedbackRoutes from "./routes/feedback.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", photoRoutes);
app.use("/api/feedback", feedbackRoutes);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "TruWork API is running",
  });
});

export default app;