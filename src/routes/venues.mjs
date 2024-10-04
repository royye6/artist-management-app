import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/api/v1/venues", async (req, res) => {
    const venues = await prisma.venue.findMany();
    res.json(venues);
});

router.get("/api/v1/venues/:id", (req, res) => {});

router.post("/api/v1/venues", (req, res) => {});

router.patch("/api/v1/venues/:id", (req, res) => {});

router.delete("/api/v1/venues/:id", (req, res) => {});

export default router;
