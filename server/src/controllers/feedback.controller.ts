import { Request, Response } from "express";
import { Resend } from "resend";
import prisma from "../lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export const submitFeedback = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Feedback message is required",
      });
    }

    const feedback = await prisma.feedback.create({
      data: {
        userId: user.userId,
        message: message.trim(),
      },
    });

    const userRecord = await prisma.user.findUnique({
      where: { id: user.userId },
      select: { firstName: true, lastName: true, email: true },
    });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "kbenavid@bcodesystems.com",
      subject: "New TruWork Feedback",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h2 style="color:#0b1f3b;">New Feedback Received</h2>
          <p style="color:#6b7280;font-size:14px;">Submitted via TruWork app</p>
          <div style="background:#f9fafb;border-radius:8px;padding:16px;margin:16px 0;">
            <p style="margin:0;font-size:15px;color:#111827;">${message.trim()}</p>
          </div>
          <p style="font-size:13px;color:#6b7280;">
            From: ${userRecord?.firstName} ${userRecord?.lastName} (${userRecord?.email})
          </p>
        </div>
      `,
    });

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    console.error("Feedback error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
