import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { newFinanceValidationSchema } from "../utils/validationSchemas.mjs";

const router = Router();
const prisma = new PrismaClient();

const findFinanceById = async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
        const finance = await prisma.finance.findUnique({
            where: { id: id },
        });

        if (!finance) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        req.financeId = finance.id;
        req.finance = finance;
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

router.get("/api/v1/finance", async (req, res) => {
    const finance = await prisma.finance.findMany();
    res.json(finance);
});

router.get("/api/v1/finance/:id", findFinanceById, (req, res) => {
    return res.status(200).json(req.finance);
});

router.post(
    "/api/v1/finance",
    checkSchema(newFinanceValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            console.log(data);
            const newTransaction = await prisma.finance.create({ data: data });
            return res.status(201).json(newTransaction);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

router.patch(
    "/api/v1/finance/:id",
    findFinanceById,
    checkSchema(newFinanceValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            const financeId = req.financeId;

            const updateTransaction = await prisma.finance.update({
                where: { id: financeId },
                data,
            });

            return res.status(201).json(updateTransaction);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

router.delete("/api/v1/finance/:id", findFinanceById, async (req, res) => {
    try {
        const financeId = req.financeId;
        const transaction = await prisma.finance.delete({
            where: { id: financeId },
        });
        return res
            .status(201)
            .send({ message: "Transaction deleted successfully." });
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

export default router;
