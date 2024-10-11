import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { newTourValidationSchema } from "../utils/validationSchemas.mjs";

const router = Router();
const prisma = new PrismaClient();

const findTourById = async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid tour ID" });
    }

    try {
        const tour = await prisma.tour.findUnique({
            where: { id: id },
        });

        if (!tour) {
            return res.status(404).json({ error: "Tour not found" });
        }

        req.tourId = tour.id;
        req.tour = tour;
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

/**
 * @swagger
 * /api/v1/tours:
 *   get:
 *     tags: [Tours]
 *     summary: Retrieve a list of tours
 *     description: Fetches all tours from the database.
 *     responses:
 *       '200':
 *         description: A list of tours.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tour'
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/tours", async (req, res) => {
    const tours = await prisma.tour.findMany();
    res.json(tours);
});

/**
 * @swagger
 * /api/v1/tours/{id}:
 *   get:
 *     tags: [Tours]
 *     summary: Retrieve a tour by ID
 *     description: Fetches a tour from the database using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the tour to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A tour object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tour'
 *       '404':
 *         description: Tour not found.
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/tours/:id", findTourById, (req, res) => {
    return res.status(200).json(req.tour);
});

/**
 * @swagger
 * /api/v1/tours:
 *   post:
 *     tags: [Tours]
 *     summary: Create a new tour
 *     description: Adds a new tour to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 example: "2024-03-01T00:00:00Z"
 *               end_date:
 *                 type: string
 *                 example: "2024-08-30T00:00:00Z"
 *               venue_id:
 *                 type: integer
 *               artist_id:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Tour created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tour'
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Internal server error.
 */

router.post(
    "/api/v1/tours",
    checkSchema(newTourValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            console.log(data);
            const newTour = await prisma.tour.create({ data: data });
            return res.status(201).json(newTour);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

/**
 * @swagger
 * /api/v1/tours/{id}:
 *   patch:
 *     tags: [Tours]
 *     summary: Update an existing tour
 *     description: Modifies an existing tour in the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the tour to update.
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
 *               start_date:
 *                 type: string
 *                 example: "2024-03-01T00:00:00Z"
 *               end_date:
 *                 type: string
 *                 example: "2024-08-30T00:00:00Z"
 *               venue_id:
 *                 type: integer
 *               artist_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Tour updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tour'
 *       '400':
 *         description: Invalid input.
 *       '404':
 *         description: Tour not found.
 *       '500':
 *         description: Internal server error.
 */

router.patch(
    "/api/v1/tours/:id",
    findTourById,
    checkSchema(newTourValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            const tourId = req.tourId;

            const updateTour = await prisma.user.update({
                where: { id: tourId },
                data,
            });

            return res.status(201).json(updateTour);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

/**
 * @swagger
 * /api/v1/tours/{id}:
 *   delete:
 *     tags: [Tours]
 *     summary: Delete a tour
 *     description: Removes a tour from the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the tour to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Tour deleted successfully.
 *       '404':
 *         description: Tour not found.
 *       '500':
 *         description: Internal server error.
 */

router.delete("/api/v1/tours/:id", findTourById, async (req, res) => {
    try {
        const tourId = req.tourId;
        const tour = await prisma.tour.delete({
            where: { id: tourId },
        });
        return res.status(201).send({ message: "Tour deleted successfully." });
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

export default router;
