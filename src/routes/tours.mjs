import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/api/v1/tours", async (req, res) => {
    const tours = await prisma.tour.findMany();
    res.json(tours);
});

router.get("/api/v1/tours/:id", (req, res) => {});

router.post("/api/v1/tours", (req, res) => {});

router.patch("/api/v1/tours/:id", (req, res) => {});

router.delete("/api/v1/tours/:id", (req, res) => {});

export default router;
