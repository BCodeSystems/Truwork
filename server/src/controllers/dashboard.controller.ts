import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getDashboardSummary = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const now = new Date();

    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const todaysJobs = await prisma.job.count({
      where: {
        userId: user.userId,
        scheduledAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    const openInvoices = await prisma.invoice.count({
      where: {
        userId: user.userId,
        status: {
          in: ["draft", "sent", "partial"],
        },
      },
    });

    const outstandingBalance = await prisma.invoice.aggregate({
      _sum: {
        balanceDue: true,
      },
      where: {
        userId: user.userId,
        status: {
          in: ["draft", "sent", "partial"],
        },
      },
    });

    const paidThisMonth = await prisma.invoice.aggregate({
      _sum: {
        total: true,
      },
      where: {
        userId: user.userId,
        status: "paid",
        updatedAt: {
          gte: startOfMonth,
        },
      },
    });

    const recentJobs = await prisma.job.findMany({
      where: {
        userId: user.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
      select: {
        id: true,
        title: true,
        customerName: true,
        createdAt: true,
      },
    });

    const recentInvoices = await prisma.invoice.findMany({
      where: {
        userId: user.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
      select: {
        id: true,
        documentNumber: true,
        total: true,
        status: true,
        createdAt: true,
        job: {
          select: {
            title: true,
            customerName: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      summary: {
        todaysJobs,
        openInvoices,
        outstandingBalance: Number(outstandingBalance._sum.balanceDue || 0),
        paidThisMonth: Number(paidThisMonth._sum.total || 0),
      },
      recentActivity: {
        jobs: recentJobs,
        invoices: recentInvoices.map((invoice) => ({
          ...invoice,
          total: Number(invoice.total),
        })),
      },
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};