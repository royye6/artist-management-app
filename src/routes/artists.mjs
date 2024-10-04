import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/api/v1/artists", async (req, res) => {
    const artists = await prisma.artist.findMany();
    res.json(artists);
});

router.get("/api/v1/artists/:id", (req, res) => {});

router.post("/api/v1/artists", (req, res) => {});

router.patch("/api/v1/artists/:id", (req, res) => {});

router.delete("/api/v1/artists/:id", (req, res) => {});

export default router;
