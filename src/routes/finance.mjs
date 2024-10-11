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

/**
 * @swagger
 * /api/v1/finance:
 *   get:
 *     tags: [Finance]
 *     summary: Retrieve a list of finance records
 *     description: Fetches all finance records from the database.
 *     responses:
 *       '200':
 *         description: A list of finance records.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Finance'
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/finance", async (req, res) => {
    const finance = await prisma.finance.findMany();
    res.json(finance);
});

/**
 * @swagger
 * /api/v1/finance/{id}:
 *   get:
 *     tags: [Finance]
 *     summary: Retrieve a finance record by ID
 *     description: Fetches a finance record from the database using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the finance record to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A finance record object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Finance'
 *       '404':
 *         description: Finance record not found.
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/finance/:id", findFinanceById, (req, res) => {
    return res.status(200).json(req.finance);
});

/**
 * @swagger
 * /api/v1/finance:
 *   post:
 *     tags: [Finance]
 *     summary: Create a new finance record
 *     description: Adds a new finance record to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               artist_id:
 *                 type: number
 *               transaction_type:
 *                 type: string
 *                 example: Credit
 *               amount:
 *                 type: integer
 *                 example: "1000"
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Finance record created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Finance'
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Internal server error.
 */

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

/**
 * @swagger
 * /api/v1/finance/{id}:
 *   patch:
 *     tags: [Finance]
 *     summary: Update an existing finance record
 *     description: Modifies an existing finance record in the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the finance record to update.
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
 *                 type: number
 *               transaction_type:
 *                 type: string
 *                 example: Credit
 *               amount:
 *                 type: integer
 *                 example: "1000"
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Finance record updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Finance'
 *       '400':
 *         description: Invalid input.
 *       '404':
 *         description: Finance record not found.
 *       '500':
 *         description: Internal server error.
 */

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

/**
 * @swagger
 * /api/v1/finance/{id}:
 *   delete:
 *     tags: [Finance]
 *     summary: Delete a finance record
 *     description: Removes a finance record from the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the finance record to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Finance record deleted successfully.
 *       '404':
 *         description: Finance record not found.
 *       '500':
 *         description: Internal server error.
 */

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
