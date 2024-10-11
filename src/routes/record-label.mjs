import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { newRecordLabelValidationSchema } from "../utils/validationSchemas.mjs";

const router = Router();
const prisma = new PrismaClient();

const findLabelById = async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid record label ID" });
    }

    try {
        const label = await prisma.recordLabel.findUnique({
            where: { id: id },
        });

        if (!label) {
            return res.status(404).json({ error: "Record label not found" });
        }

        req.labelId = label.id;
        req.label = label;
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

/**
 * @swagger
 * /api/v1/record-labels:
 *   get:
 *     tags: [Record Labels]
 *     summary: Retrieve a list of record labels
 *     description: Fetches all record labels from the database.
 *     responses:
 *       '200':
 *         description: A list of record labels.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RecordLabel'
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/record-labels", async (req, res) => {
    const labels = await prisma.recordLabel.findMany();
    return res.json(labels);
});

/**
 * @swagger
 * /api/v1/record-labels/{id}:
 *   get:
 *     tags: [Record Labels]
 *     summary: Retrieve record label by ID
 *     description: Fetches a record label from the database using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the record label to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A record label object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecordLabel'
 *       '404':
 *         description: Record label not found.
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/record-labels/:id", findLabelById, (req, res) => {
    res.status(200).json(req.label);
});

/**
 * @swagger
 * /api/v1/record-labels:
 *   post:
 *     tags: [Record Labels]
 *     summary: Create new record label
 *     description: Adds a new record label to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               website_url:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Record label created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecordLabel'
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Internal server error.
 */

router.post(
    "/api/v1/record-labels",
    checkSchema(newRecordLabelValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            console.log(data.signed_artists);
            const newLabel = await prisma.recordLabel.create({ data: data });
            return res.status(201).json(newLabel);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

/**
 * @swagger
 * /api/v1/record-labels/{id}:
 *   patch:
 *     tags: [Record Labels]
 *     summary: Update an existing record label
 *     description: Modifies an existing record label in the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the record label to update.
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
 *               website_url:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Record label updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecordLabel'
 *       '400':
 *         description: Invalid input.
 *       '404':
 *         description: Record label not found.
 *       '500':
 *         description: Internal server error.
 */

router.patch(
    "/api/v1/record-labels/:id",
    findLabelById,
    checkSchema(newRecordLabelValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            const labelId = req.labelId;

            console.log(data.signed_artists);

            const updateData = {
                ...data,
                signed_artists: data.signed_artists
                    ? {
                          connect: data.signed_artists.map((id) => ({ id })),
                      }
                    : undefined,
                in_house_albums: data.in_house_albums
                    ? {
                          connect: data.in_house_albums.map((id) => ({ id })),
                      }
                    : undefined,
                contracts: data.contracts
                    ? {
                          connect: data.contracts.map((id) => ({ id })),
                      }
                    : undefined,
            };

            console.log(updateData);

            const updateLabel = await prisma.recordLabel.update({
                where: { id: labelId },
                data: updateData,
            });
            return res.status(201).json(updateLabel);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

/**
 * @swagger
 * /api/v1/record-labels/{id}:
 *   delete:
 *     tags: [Record Labels]
 *     summary: Delete a record label
 *     description: Removes a record label from the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the record label to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Record label deleted successfully.
 *       '404':
 *         description: Record label not found.
 *       '500':
 *         description: Internal server error.
 */

router.delete("/api/v1/record-labels/:id", findLabelById, async (req, res) => {
    try {
        const labelId = req.labelId;
        const label = await prisma.recordLabel.delete({
            where: { id: labelId },
        });
        return res
            .status(201)
            .send({ message: "Record Label deleted successfully." });
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

export default router;

