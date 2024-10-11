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

/**
 * @swagger
 * /api/v1/contracts:
 *   get:
 *     tags: [Contracts]
 *     summary: Retrieve a list of contracts
 *     description: Fetches all contracts from the database.
 *     responses:
 *       '200':
 *         description: A list of contracts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contract'
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/contracts", async (req, res) => {
    const contracts = await prisma.contract.findMany();
    res.json(contracts);
});

/**
 * @swagger
 * /api/v1/contracts/{id}:
 *   get:
 *     tags: [Contracts]
 *     summary: Retrieve a contract by ID
 *     description: Fetches a contract from the database using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the contract to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A contract object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contract'
 *       '404':
 *         description: Contract not found.
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/contracts/:id", findContractById, (req, res) => {
    return res.status(200).json(req.contract);
});

/**
 * @swagger
 * /api/v1/contracts:
 *   post:
 *     tags: [Contracts]
 *     summary: Create a new contract
 *     description: Adds a new contract to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               artist_id:
 *                 type: integer
 *               record_label:
 *                 type: integer
 *               start_date:
 *                 type: string
 *                 example: "2024-03-01T00:00:00Z"
 *               end_date:
 *                 type: string
 *                 example: "2027-03-01T00:00:00Z"
 *               contract_terms:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Contract created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contract'
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Internal server error.
 */

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

/**
 * @swagger
 * /api/v1/contracts/{id}:
 *   patch:
 *     tags: [Contracts]
 *     summary: Update an existing contract
 *     description: Modifies an existing contract in the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the contract to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               artist_id:
 *                 type: integer
 *               record_label:
 *                 type: integer
 *               start_date:
 *                 type: string
 *                 example: "2024-03-01T00:00:00Z"
 *               end_date:
 *                 type: string
 *                 example: "2027-03-01T00:00:00Z"
 *               contract_terms:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Contract updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contract'
 *       '400':
 *         description: Invalid input.
 *       '404':
 *         description: Contract not found.
 *       '500':
 *         description: Internal server error.
 */

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

/**
 * @swagger
 * /api/v1/contracts/{id}:
 *   delete:
 *     tags: [Contracts]
 *     summary: Delete a contract
 *     description: Removes a contract from the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the contract to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Contract deleted successfully.
 *       '404':
 *         description: Contract not found.
 *       '500':
 *         description: Internal server error.
 */

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
