import { Request, Response } from "express";
import prisma from "../lib/prisma";

// creating a new invoice
// this will be used on POST /api/invoices
export const createInvoice = async (req: Request, res: Response) => {
  try {
    // get the logged in user from middleware
    // this comes from req.user
    const user = (req as any).user;

    // get the data from the frontend
    // jobId is which job this invoice belongs to
    // documentNumber is the invoice number
    // subtotal, tax, total, depositPaid, and balanceDue are money fields
    // type and status use the enums from the schema
    // lineItems are the items on the invoice
    const {
      jobId,
      documentNumber,
      description,
      issuedAt,
      dueDate,
      subtotal,
      tax,
      total,
      depositPaid,
      balanceDue,
      paymentMethods,
      type,
      status,
      lineItems,
    } = req.body;

    if (!jobId || !documentNumber || subtotal === undefined || total === undefined || balanceDue === undefined) {
      return res.status(400).json({
        success: false,
        message: "Job, document number, subtotal, total, and balance due are required",
      });
    }

    // make sure the job exists and belongs to this user
    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        userId: user.userId,
      },
    });

    // if no job found stop here
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // create the invoice
    const invoice = await prisma.invoice.create({
      data: {
        // tie this invoice to the logged in user
        userId: user.userId,

        // tie invoice to the job
        jobId,

        // store invoice fields that match the schema
        documentNumber,
        description: description || null,
        issuedAt: issuedAt ? new Date(issuedAt) : undefined,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        subtotal,
        tax: tax ?? 0,
        total,
        depositPaid: depositPaid ?? 0,
        balanceDue,
        paymentMethods: paymentMethods || [],
        type: type || "invoice",
        status: status || "draft",

        // if there are line items create them here
        lineItems: lineItems
          ? {
              create: lineItems.map((item: any) => ({
                // each item has description, quantity, unitPrice, and lineTotal
                description: item.description,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                lineTotal: item.lineTotal,
              })),
            }
          : undefined,
      },

      // include line items so frontend gets everything back
      include: {
        lineItems: true,
      },
    });

    // send success response
    return res.status(201).json({
      success: true,
      invoice,
    });
  } catch (error) {
    // catch any errors
    console.error("Create invoice error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// get all invoices for the logged in user
export const getInvoices = async (req: Request, res: Response) => {
    try {
      // get user from middleware
      const user = (req as any).user;
  
      // get all invoices for this user
      const invoices = await prisma.invoice.findMany({
        where: {
          userId: user.userId,
        },
        include: {
          lineItems: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
  
      return res.status(200).json({
        success: true,
        invoices,
      });
    } catch (error) {
      console.error("Get invoices error:", error);
  
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

  export const getInvoiceById = async (req: Request, res: Response) => {
    try {
        // Get the logged-in user from JWT middleware
    const user = (req as any).user;

    // Get the invoice id from the URL params
    const id = String(req.params.id);

    // Find one invoice that matches both the id and logged-in user
    const invoice = await prisma.invoice.findFirst({
      where: {
        id,
        userId: user.userId,
      },
      include: {
        lineItems: true,
        job: true,
      },
    });

    if (!invoice) {
        return res.status(404).json({
          success: false,
          message: "Invoice not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        invoice,
      });
    } catch (error) {
      console.error("Get invoice by id error:", error);
  
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

  export const updateInvoice = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const id = String(req.params.id);
        const {
            jobId,
            documentNumber,
            description,
            issuedAt,
            dueDate,
            subtotal,
            tax,
            total,
            depositPaid,
            balanceDue,
            paymentMethods,
            type,
            status,
            
        } = req.body;

        const existingInvoice = await prisma.invoice.findFirst({
            where: {
              id,
              userId: user.userId,
            },
          });
      
          if (!existingInvoice) { 
            return res.status(404).json({
              success: false,
              message: "Invoice not found",
            });
          }
          const updateData: Record<string, string | number | string[] | Date | null> = {};
          if (documentNumber !== undefined) updateData.documentNumber = documentNumber;
          if (description !== undefined) updateData.description = description || null;
          if (issuedAt !== undefined) updateData.issuedAt = issuedAt ? new Date(issuedAt) : null;
          if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;
          if (subtotal !== undefined) updateData.subtotal = subtotal;
          if (tax !== undefined) updateData.tax = tax;
          if (total !== undefined) updateData.total = total;
          if (depositPaid !== undefined) updateData.depositPaid = depositPaid;
          if (balanceDue !== undefined) updateData.balanceDue = balanceDue;
          if (paymentMethods !== undefined) updateData.paymentMethods = paymentMethods;
          if (type !== undefined) updateData.type = type;
          if (status !== undefined) updateData.status = status;

          // if no fields were provided to update
          if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
              success: false,
              message: "No fields provided to update",
            });
          }

          // update the invoice
          const updatedInvoice = await prisma.invoice.update({
            where: {
              id: existingInvoice.id,
            },
            data: updateData,
            include: {
              lineItems: true,
              job: true,
            },
          });

          return res.status(200).json({
            success: true,
            message: "Invoice updated successfully",
            invoice: updatedInvoice,
          });

    } catch (error) {
      console.error("Update invoice error:", error);

      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }

// delete an invoice
export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    // get the logged in user
    const user = (req as any).user;

    // get invoice id from params
    const id = String(req.params.id);

    // make sure the invoice exists and belongs to the user
    const existingInvoice = await prisma.invoice.findFirst({
      where: {
        id,
        userId: user.userId,
      },
    });

    // if not found, stop
    if (!existingInvoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    // delete the invoice
    await prisma.invoice.delete({
      where: {
        id: existingInvoice.id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (error) {
    console.error("Delete invoice error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};