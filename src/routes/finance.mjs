import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/api/v1/finance", async (req, res) => {
    const finance = await prisma.finance.findMany();
    res.json(finance);
});

router.get("/api/v1/finance/:id", (req, res) => {});

router.post("/api/v1/finance", (req, res) => {});

router.patch("/api/v1/finance/:id", (req, res) => {});

router.delete("/api/v1/finance/:id", (req, res) => {});

export default router;
