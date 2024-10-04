import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/api/v1/accolades", async (req, res) => {
    const accolades = await prisma.accolade.findMany()
    res.json(accolades)
});

router.get("/api/v1/accolades/:id", (req, res) => {});

router.post("/api/v1/accolades", (req, res) => {});

router.patch("/api/v1/accolades/:id", (req, res) => {});

router.delete("/api/v1/accolades/:id", (req, res) => {});

export default router;
