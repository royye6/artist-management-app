import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/api/v1/tracks", async (req, res) => {
    const tracks = await prisma.track.findMany();
    res.json(tracks);
});

router.get("/api/v1/tracks/:id", (req, res) => {});

router.post("/api/v1/tracks", (req, res) => {});

router.patch("/api/v1/tracks/:id", (req, res) => {});

router.delete("/api/v1/tracks/:id", (req, res) => {});

export default router;
