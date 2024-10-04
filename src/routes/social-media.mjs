import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/api/v1/social-media", async (req, res) => {
    const socialMediaProfiles = await prisma.socialmedia.findMany();
    res.json(socialMediaProfiles);
});

router.get("/api/v1/social-media/:id", (req, res) => {});

router.post("/api/v1/social-media", (req, res) => {});

router.patch("/api/v1/social-media/:id", (req, res) => {});

router.delete("/api/v1/social-media/:id", (req, res) => {});

export default router;
