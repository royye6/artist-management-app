import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { newAccoladeValidationSchema } from "../utils/validationSchemas.mjs";

const router = Router();
const prisma = new PrismaClient();

const findAccoladeById = async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid award ID" });
    }

    try {
        const accolade = await prisma.accolade.findUnique({
            where: { id: id },
        });

        if (!accolade) {
            return res.status(404).json({ error: "Award not found" });
        }

        req.accoladeId = accolade.id;
        req.accolade = accolade;
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

/**
 * @swagger
 * /api/v1/accolades:
 *   get:
 *     tags: [Accolades]
 *     summary: Retrieve a list of accolades
 *     description: Fetches all accolades from the database.
 *     responses:
 *       '200':
 *         description: A list of accolades.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Accolade'
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/accolades", async (req, res) => {
    const accolades = await prisma.accolade.findMany();
    return res.json(accolades);
});

/**
 * @swagger
 * /api/v1/accolades/{id}:
 *   get:
 *     tags: [Accolades]
 *     summary: Retrieve an accolade by ID
 *     description: Fetches an accolade from the database using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the accolade to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: An accolade object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Accolade'
 *       '404':
 *         description: Accolade not found.
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/accolades/:id", findAccoladeById, (req, res) => {
    res.status(200).json(req.accolade);
});

/**
 * @swagger
 * /api/v1/accolades:
 *   post:
 *     tags: [Accolades]
 *     summary: Create a new accolade
 *     description: Adds a new accolade to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               artist_id:
 *                 type: integer
 *               award_name:
 *                 type: string
 *               award_category:
 *                 type: string
 *                 example: "Freshman of The Year"
 *               award_date:
 *                 type: string
 *                 example: "2025-03-15T00:00:00Z"
 *     responses:
 *       '201':
 *         description: Accolade created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Accolade'
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Internal server error.
 */

router.post(
    "/api/v1/accolades",
    checkSchema(newAccoladeValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            const newAccolade = await prisma.accolade.create({ data: data });
            return res.status(201).json(newAccolade);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

/**
 * @swagger
 * /api/v1/accolades/{id}:
 *   patch:
 *     tags: [Accolades]
 *     summary: Update an existing accolade
 *     description: Modifies an existing accolade in the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the accolade to update.
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
 *               award_name:
 *                 type: string
 *               award_category:
 *                 type: string
 *                 example: "Freshman of The Year"
 *               award_date:
 *                 type: string
 *                 example: "2025-03-15T00:00:00Z"
 *     responses:
 *       '200':
 *         description: Accolade updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Accolade'
 *       '400':
 *         description: Invalid input.
 *       '404':
 *         description: Accolade not found.
 *       '500':
 *         description: Internal server error.
 */

router.patch(
    "/api/v1/accolades/:id",
    findAccoladeById,
    checkSchema(newAccoladeValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array()})
        }

        try {
            const data = matchedData(req);
            const accoladeId = req.accoladeId

            const updateAccolade = await prisma.accolade.update({
                where: {id: accoladeId},
                data,
            });
            return res.status(201).json(updateAccolade);
        } catch (err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }
);

/**
 * @swagger
 * /api/v1/accolades/{id}:
 *   delete:
 *     tags: [Accolades]
 *     summary: Delete an accolade
 *     description: Removes an accolade from the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the accolade to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Accolade deleted successfully.
 *       '404':
 *         description: Accolade not found.
 *       '500':
 *         description: Internal server error.
 */

router.delete("/api/v1/accolades/:id", findAccoladeById, async (req, res) => {
    try {
        const accoladeId = req.accoladeId;
        const accolade = await prisma.accolade.delete({
            where: { id: accoladeId },
        });
        return res.status(201).send({ message: "Accolade deleted successfully." });
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
});

export default router;
