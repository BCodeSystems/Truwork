import { Request, Response } from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import prisma from "../lib/prisma";
import r2 from "../lib/r2";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const profile = await prisma.businessProfile.findUnique({
      where: { userId: user.userId },
    });

    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    return res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { businessName, contactName, phone, email, address, invoiceFooterNote } = req.body;

    const profile = await prisma.businessProfile.update({
      where: { userId: user.userId },
      data: {
        ...(businessName !== undefined && { businessName }),
        ...(contactName !== undefined && { contactName }),
        ...(phone !== undefined && { phone }),
        ...(email !== undefined && { email }),
        ...(address !== undefined && { address }),
        ...(invoiceFooterNote !== undefined && { invoiceFooterNote }),
      },
    });

    return res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const uploadLogo = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Logo file is required" });
    }

    const fileExtension = req.file.originalname.split(".").pop();
    const storageKey = `logos/${user.userId}/${randomUUID()}.${fileExtension}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: storageKey,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    );

    const logoUrl = `${process.env.R2_PUBLIC_BASE_URL}/${storageKey}`;

    const profile = await prisma.businessProfile.update({
      where: { userId: user.userId },
      data: { logoUrl },
    });

    return res.status(200).json({ success: true, logoUrl: profile.logoUrl });
  } catch (error) {
    console.error("Upload logo error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
