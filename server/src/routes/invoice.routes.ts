import { Router } from "express";
import { createInvoice, getInvoices, getInvoiceById, updateInvoice, deleteInvoice } from "../controllers/invoices.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// create a new invoice for the logged in user
router.post("/", protect, createInvoice);

router.get("/", protect, getInvoices);

router.get("/:id", protect, getInvoiceById);

router.patch("/:id", protect, updateInvoice);

router.delete("/:id", protect, deleteInvoice);

export default router;
