import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const createJob = async (req: Request, res: Response) => {
  try {
    // Get the logged-in user from the JWT middleware
    const user = (req as any).user;

    // Pull submitted job values from the request body
    const {
      title,
      customerName,
      serviceAddress,
      scheduledAt: scheduledAtRaw,
      clientPhone,
      clientEmail,
      description,
    } = req.body;

    if (!title || !customerName || !serviceAddress || !scheduledAtRaw) {
      return res.status(400).json({
        success: false,
        message: "Job name, client name, address, date, and time are required",
      });
    }

    const scheduledAt = new Date(scheduledAtRaw);

    // Save the job to the database
    const job = await prisma.job.create({
      data: {
        userId: user.userId,
        title,
        customerName,
        serviceAddress,
        scheduledAt,
        customerPhone: clientPhone || null,
        customerEmail: clientEmail || null,
        description: description || null,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error("Create job error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getJobs = async (req: Request, res: Response) => {
  try {
    // Get the logged-in user from JWT middleware
    const user = (req as any).user;

    // Fetch jobs that belong to this user
    const jobs = await prisma.job.findMany({
      where: {
        userId: user.userId,
      },
      orderBy: {
        scheduledAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("Get jobs error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    // Get the logged-in user from JWT middleware
    const user = (req as any).user;

    // Get the job id from the URL params
    const id = String(req.params.id);

    // Find one job that matches both the id and logged-in user
    const job = await prisma.job.findFirst({
      where: {
        id,
        userId: user.userId,
      },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("Get job by id error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const id = String(req.params.id);
    const {
      title,
      customerName,
      serviceAddress,
      scheduledAt: scheduledAtRaw,
      clientPhone,
      clientEmail,
      description,
    } = req.body;
    const existingJob = await prisma.job.findFirst({
      where: {
        id,
        userId: user.userId,
      },
    });

    if (!existingJob) { 
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    const updateData: Record<string, string | Date | null> = {};
    if (title !== undefined) updateData.title = title;
    if (customerName !== undefined) updateData.customerName = customerName;
    if (serviceAddress !== undefined) updateData.serviceAddress = serviceAddress;
    if (clientPhone !== undefined) updateData.customerPhone = clientPhone || null;
    if (clientEmail !== undefined) updateData.customerEmail = clientEmail || null;
    if (description !== undefined) updateData.description = description || null;

    if (scheduledAtRaw) {
      updateData.scheduledAt = new Date(scheduledAtRaw);
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
      });
    }

    const updatedJob = await prisma.job.update({
      where: {
        id: existingJob.id,
      },
      data: updateData,
    });

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("Update job error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const id = String(req.params.id);

    const existingJob = await prisma.job.findFirst({
      where: {
        id,
        userId: user.userId,
      },
    });

    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await prisma.job.delete({
      where: {
        id: existingJob.id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Delete job error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};