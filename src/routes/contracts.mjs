import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { newContractValidationSchema } from "../utils/validationSchemas.mjs";

const router = Router();
const prisma = new PrismaClient();

const findContractById = async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid contract ID" });
    }

    try {
        const contract = await prisma.user.findUnique({
            where: { id: id },
        });

        if (!contract) {
            return res.status(404).json({ error: "Contract not found" });
        }

        req.contractId = contract.id;
        req.contract = contract;
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

router.get("/api/v1/contracts", async (req, res) => {
    const contracts = await prisma.contract.findMany();
    res.json(contracts);
});

router.get("/api/v1/contracts/:id", findContractById, (req, res) => {
    return res.status(200).json(req.contract);
});

router.post(
    "/api/v1/contracts",
    checkSchema(newContractValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            console.log(data);
            const newContract = await prisma.contract.create({ data: data });
            return res.status(201).json(newContract);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

router.patch(
    "/api/v1/contracts/:id",
    findContractById,
    checkSchema(newContractValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            const contractId = req.contractId;

            const updateContract = await prisma.contract.update({
                where: { id: contractId },
                data,
            });

            return res.status(201).json(updateContract);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

router.delete("/api/v1/contracts/:id", findContractById, async (req, res) => {
    try {
        const contractId = req.contractId;
        const contract = await prisma.contract.delete({
            where: { id: contractId },
        });
        return res
            .status(201)
            .send({ message: "Contract deleted successfully." });
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

export default router;
