import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/api/v1/albums", async (req, res) => {
    const albums = await prisma.album.findMany()
    res.json(albums)
});

router.get("/api/v1/albums/:id", (req, res) => {});

router.post("/api/v1/albums", (req, res) => {});

router.patch("/api/v1/albums/:id", (req, res) => {});

router.delete("/api/v1/albums/:id", (req, res) => {});

export default router;
