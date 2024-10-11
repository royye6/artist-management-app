import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { newArtistValidationSchema } from "../utils/validationSchemas.mjs";

const router = Router();
const prisma = new PrismaClient();

const findArtistById = async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid artist ID" });
    }

    try {
        const artist = await prisma.artist.findUnique({
            where: { id: id },
        });

        if (!artist) {
            return res.status(404).json({ error: "Artist not found" });
        }

        req.artistId = artist.id;
        req.artist = artist;
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

/**
 * @swagger
 * /api/v1/artists:
 *   get:
 *     tags: [Artists]
 *     summary: Retrieve a list of artists
 *     description: Fetches all artists from the database.
 *     responses:
 *       '200':
 *         description: A list of artists.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artist'
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/artists", async (req, res) => {
    const artists = await prisma.artist.findMany();
    res.json(artists);
});

/**
 * @swagger
 * /api/v1/artists/{id}:
 *   get:
 *     tags: [Artists]
 *     summary: Retrieve an artist by ID
 *     description: Fetches an artist from the database using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the artist to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: An artist object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       '404':
 *         description: Artist not found.
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/artists/:id", findArtistById, (req, res) => {
    res.status(200).json(req.artist);
});

/**
 * @swagger
 * /api/v1/artists:
 *   post:
 *     tags: [Artists]
 *     summary: Create a new artist
 *     description: Adds a new artist to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               stage_name:
 *                 type: string
 *               bio:
 *                 type: string
 *               image:
 *                 type: string
 *               genre:
 *                 type: string
 *               record_label_id:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Artist created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Internal server error.
 */

router.post(
    "/api/v1/artists",
    checkSchema(newArtistValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            const newArtist = await prisma.artist.create({ data: data });
            return res.status(201).json(newArtist);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

/**
 * @swagger
 * /api/v1/artists/{id}:
 *   patch:
 *     tags: [Artists]
 *     summary: Update an existing artist
 *     description: Modifies an existing artist in the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the artist to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               stage_name:
 *                 type: string
 *               bio:
 *                 type: string
 *               image:
 *                 type: string
 *               genre:
 *                 type: string
 *               record_label_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Artist updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       '400':
 *         description: Invalid input.
 *       '404':
 *         description: Artist not found.
 *       '500':
 *         description: Internal server error.
 */

router.patch(
    "/api/v1/artists/:id",
    findArtistById,
    checkSchema(newArtistValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            const artistId = req.artistId;

            const updateArtist = await prisma.artist.update({
                where: { id: artistId },
                data,
            });
            return res.status(201).json(updateArtist);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

/**
 * @swagger
 * /api/v1/artists/{id}:
 *   delete:
 *     tags: [Artists]
 *     summary: Delete an artist
 *     description: Removes an artist from the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the artist to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Artist deleted successfully.
 *       '404':
 *         description: Artist not found.
 *       '500':
 *         description: Internal server error.
 */

router.delete("/api/v1/artists/:id", findArtistById, async (req, res) => {
    try {
        const artistId = req.artistId;
        const artist = await prisma.artist.delete({
            where: { id: artistId },
        });
        return res.status(201).send({ message: "Artist deleted successfully." });
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

export default router;
