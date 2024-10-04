import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/api/v1/contracts", async (req, res) => {
    const contracts = await prisma.contract.findMany();
    res.json(contracts);
});

router.get("/api/v1/contracts/:id", (req, res) => {});

router.post("/api/v1/contracts", (req, res) => {});

router.patch("/api/v1/contracts/:id", (req, res) => {});

router.delete("/api/v1/contracts/:id", (req, res) => {});

export default router;
