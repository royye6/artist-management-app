import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { newTrackValidationSchema } from "../utils/validationSchemas.mjs";

const router = Router();
const prisma = new PrismaClient();

const findTrackById = async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid track ID" });
    }

    try {
        const track = await prisma.track.findUnique({
            where: { id: id },
        });

        if (!track) {
            return res.status(404).json({ error: "Track not found" });
        }

        req.trackId = track.id;
        req.track = track;
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

/**
 * @swagger
 * /api/v1/tracks:
 *   get:
 *     tags: [Tracks]
 *     summary: Retrieve a list of tracks
 *     description: Fetches all tracks from the database.
 *     responses:
 *       '200':
 *         description: A list of tracks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Track'
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/tracks", async (req, res) => {
    const tracks = await prisma.track.findMany();
    res.json(tracks);
});

/**
 * @swagger
 * /api/v1/tracks/{id}:
 *   get:
 *     tags: [Tracks]
 *     summary: Retrieve a track by ID
 *     description: Fetches a track from the database using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the track to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A track object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Track'
 *       '404':
 *         description: Track not found.
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/tracks/:id", findTrackById, (req, res) => {
    return res.status(200).json(req.track);
});

/**
 * @swagger
 * /api/v1/tracks:
 *   post:
 *     tags: [Tracks]
 *     summary: Create a new track
 *     description: Adds a new track to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               duration:
 *                 type: integer
 *                 example: "380"
 *               filename:
 *                 type: string
 *                 example: "track1.mp3"
 *               album_id:
 *                 type: integer
 *               artist_id:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Track created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Track'
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Internal server error.
 */

router.post(
    "/api/v1/tracks",
    checkSchema(newTrackValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            console.log(data);
            const newTrack = await prisma.track.create({ data: data });
            return res.status(201).json(newTrack);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

/**
 * @swagger
 * /api/v1/tracks/{id}:
 *   patch:
 *     tags: [Tracks]
 *     summary: Update an existing track
 *     description: Modifies an existing track in the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the track to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               duration:
 *                 type: integer
 *                 example: "380"
 *               filename:
 *                 type: string
 *                 example: "track1.mp3"
 *               album_id:
 *                 type: integer
 *               artist_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Track updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Track'
 *       '400':
 *         description: Invalid input.
 *       '404':
 *         description: Track not found.
 *       '500':
 *         description: Internal server error.
 */

router.patch(
    "/api/v1/tracks/:id",
    findTrackById,
    checkSchema(newTrackValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            const trackId = req.trackId;

            const updateTrack = await prisma.user.update({
                where: { id: trackId },
                data,
            });

            return res.status(201).json(updateTrack);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

/**
 * @swagger
 * /api/v1/tracks/{id}:
 *   delete:
 *     tags: [Tracks]
 *     summary: Delete a track
 *     description: Removes a track from the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the track to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Track deleted successfully.
 *       '404':
 *         description: Track not found.
 *       '500':
 *         description: Internal server error.
 */

router.delete("/api/v1/tracks/:id", findTrackById, async (req, res) => {
    try {
        const trackId = req.trackId;
        const track = await prisma.track.delete({
            where: { id: trackId },
        });
        return res.status(201).send({ message: "Track deleted successfully." });
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

export default router;
