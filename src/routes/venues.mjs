import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { newVenueValidationSchema } from "../utils/validationSchemas.mjs";

const router = Router();
const prisma = new PrismaClient();

const findVenueById = async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid venue ID" });
    }

    try {
        const venue = await prisma.venue.findUnique({
            where: { id: id },
        });

        if (!venue) {
            return res.status(404).json({ error: "Venue not found" });
        }

        req.venueId = venue.id;
        req.venue = venue;
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

/**
 * @swagger
 * /api/v1/venues:
 *   get:
 *     tags: [Venues]
 *     summary: Retrieve a list of venues
 *     description: Fetches all venues from the database.
 *     responses:
 *       '200':
 *         description: A list of venues.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venue'
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/venues", async (req, res) => {
    const venues = await prisma.venue.findMany();
    res.json(venues);
});

/**
 * @swagger
 * /api/v1/venues/{id}:
 *   get:
 *     tags: [Venues]
 *     summary: Retrieve a venue by ID
 *     description: Fetches a venue from the database using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the venue to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A venue object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venue'
 *       '404':
 *         description: Venue not found.
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/venues/:id", findVenueById, (req, res) => {
    return res.status(200).json(req.venue);
});

/**
 * @swagger
 * /api/v1/venues:
 *   post:
 *     tags: [Venues]
 *     summary: Create a new venue
 *     description: Adds a new venue to the database.
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
 *         description: Venue created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venue'
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Internal server error.
 */

router.post(
    "/api/v1/venues",
    checkSchema(newVenueValidationSchema),
    async (req, res) => {
        const result = validationResult(req);
        
        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            console.log(data);
            const newVenue = await prisma.venue.create({ data: data });
            return res.status(201).json(newVenue);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

/**
 * @swagger
 * /api/v1/venues/{id}:
 *   patch:
 *     tags: [Venues]
 *     summary: Update an existing venue
 *     description: Modifies an existing venue in the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the venue to update.
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
 *         description: Venue updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venue'
 *       '400':
 *         description: Invalid input.
 *       '404':
 *         description: Venue not found.
 *       '500':
 *         description: Internal server error.
 */

router.patch(
    "/api/v1/venues/:id",
    findVenueById,
    checkSchema(newVenueValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            const venueId = req.venueId;

            const updateVenue = await prisma.venue.update({
                where: { id: venueId },
                data,
            });

            return res.status(201).json(updateVenue);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

/**
 * @swagger
 * /api/v1/venues/{id}:
 *   delete:
 *     tags: [Venues]
 *     summary: Delete a venue
 *     description: Removes a venue from the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the venue to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Venue deleted successfully.
 *       '404':
 *         description: Venue not found.
 *       '500':
 *         description: Internal server error.
 */

router.delete("/api/v1/venues/:id", findVenueById, async (req, res) => {
    try {
        const venueId = req.venueId;
        const venue = await prisma.venue.delete({
            where: { id: venueId },
        });
        return res.status(201).send({ message: "Venue deleted successfully." });
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

export default router;
