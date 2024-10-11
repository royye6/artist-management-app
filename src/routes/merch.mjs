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

/**
 * @swagger
 * /api/v1/merch:
 *   get:
 *     tags: [Merch]
 *     summary: Retrieve a list of merchandise
 *     description: Fetches all merchandise items from the database.
 *     responses:
 *       '200':
 *         description: A list of merchandise items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Merchandise'
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/merch", async (req, res) => {
    const merch = await prisma.merchandise.findMany();
    res.json(merch);
});

/**
 * @swagger
 * /api/v1/merch/{id}:
 *   get:
 *     tags: [Merch]
 *     summary: Retrieve merchandise by ID
 *     description: Fetches a merchandise item from the database using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the merchandise item to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A merchandise item object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Merchandise'
 *       '404':
 *         description: Merchandise item not found.
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/merch/:id", findMerchById, (req, res) => {
    return res.status(200).json(req.merch);
});

/**
 * @swagger
 * /api/v1/merch:
 *   post:
 *     tags: [Merch]
 *     summary: Create new merchandise
 *     description: Adds a new merchandise item to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: integer
 *               image:
 *                 type: string
 *                 example: "https://example.com/tshirt.jpg"
 *     responses:
 *       '201':
 *         description: Merchandise item created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Merchandise'
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Internal server error.
 */

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

/**
 * @swagger
 * /api/v1/merch/{id}:
 *   patch:
 *     tags: [Merch]
 *     summary: Update an existing merchandise item
 *     description: Modifies an existing merchandise item in the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the merchandise item to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: integer
 *               image:
 *                 type: string
 *                 example: "https://example.com/tshirt.jpg"
 *     responses:
 *       '200':
 *         description: Merchandise item updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Merchandise'
 *       '400':
 *         description: Invalid input.
 *       '404':
 *         description: Merchandise item not found.
 *       '500':
 *         description: Internal server error.
 */

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

/**
 * @swagger
 * /api/v1/merch/{id}:
 *   delete:
 *     tags: [Merch]
 *     summary: Delete a merchandise item
 *     description: Removes a merchandise item from the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the merchandise item to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Merchandise item deleted successfully.
 *       '404':
 *         description: Merchandise item not found.
 *       '500':
 *         description: Internal server error.
 */

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
