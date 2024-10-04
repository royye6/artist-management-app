import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/api/v1/merch", async (req, res) => {
    const merch = await prisma.merchandise.findMany();
    res.json(merch);
});

router.get("/api/v1/merch/:id", (req, res) => {});

router.post("/api/v1/merch", (req, res) => {});

router.patch("/api/v1/merch/:id", (req, res) => {});

router.delete("/api/v1/merch/:id", (req, res) => {});

export default router;
