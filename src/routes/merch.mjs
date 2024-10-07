import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { newMerchValidationSchema } from "../utils/validationSchemas.mjs";

const router = Router();
const prisma = new PrismaClient();

const findMerchById = async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid merch ID" });
    }

    try {
        const merch = await prisma.user.findUnique({
            where: { id: id },
        });

        if (!merch) {
            return res.status(404).json({ error: "Merch not found" });
        }

        req.merchId = merch.id;
        req.merch = merch;
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

router.get("/api/v1/merch", async (req, res) => {
    const merch = await prisma.merchandise.findMany();
    res.json(merch);
});

router.get("/api/v1/merch/:id", findMerchById, (req, res) => {
    return res.status(200).json(req.merch);
});

router.post(
    "/api/v1/merch",
    checkSchema(newMerchValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            console.log(data);
            const newMerch = await prisma.merchandise.create({ data: data });
            return res.status(201).json(newMerch);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

router.patch(
    "/api/v1/merch/:id",
    findMerchById,
    checkSchema(newMerchValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            const merchId = req.merchId;

            const updateMerch = await prisma.merchandise.update({
                where: { id: merchId },
                data,
            });

            return res.status(201).json(updateMerch);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

router.delete("/api/v1/merch/:id", findMerchById, async (req, res) => {
    try {
        const merchId = req.merchId;
        const merch = await prisma.merchandise.delete({
            where: { id: merchId },
        });
        return res.status(201).send({ message: "Merch deleted successfully." });
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

export default router;
