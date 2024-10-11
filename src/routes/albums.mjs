import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { newAlbumValidationSchema } from "../utils/validationSchemas.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";

const router = Router();
const prisma = new PrismaClient();

const findAlbumById = async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
        const album = await prisma.album.findUnique({
            where: { id: id },
        });

        if (!album) {
            return res.status(404).json({ error: "Album not found" });
        }

        req.albumId = album.id;
        req.album = album;
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

/**
 * @swagger
 * /api/v1/albums:
 *   get:
 *     tags: [Albums]
 *     summary: Retrieve a list of albums
 *     description: Fetches all albums from the database.
 *     responses:
 *       '200':
 *         description: A list of albums.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Album'
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/albums", async (req, res) => {
    const albums = await prisma.album.findMany();
    res.json(albums);
});

/**
 * @swagger
 * /api/v1/albums/{id}:
 *   get:
 *     tags: [Albums]
 *     summary: Retrieve an album by ID
 *     description: Fetches an album from the database using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the album to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: An album object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Album'
 *       '404':
 *         description: Album not found.
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/albums/:id", findAlbumById, (req, res) => {
    return res.status(200).json(req.album);
});

/**
 * @swagger
 * /api/v1/albums:
 *   post:
 *     tags: [Albums]
 *     summary: Create a new album
 *     description: Adds a new album to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               release_date:
 *                 type: string
 *               cover_art:
 *                 type: string
 *               artist_id:
 *                 type: integer
 *               record_label_id:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Album created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Album'
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Internal server error.
 */

router.post(
    "/api/v1/albums",
    checkSchema(newAlbumValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            const postData = {
                ...data,
                soundtracks: data.soundtracks
                    ? {
                          connect: data.soundtracks.map((id) => ({ id })),
                      }
                    : undefined,
                artist_id: data.artist_id,
                record_label: data.record_label
            };

            const newAlbum = await prisma.album.create({ data: postData });
            return res.status(201).json(newAlbum);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

/**
 * @swagger
 * /api/v1/albums/{id}:
 *   patch:
 *     tags: [Albums]
 *     summary: Update an existing album
 *     description: Modifies an existing album in the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the album to update.
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
 *               release_date:
 *                 type: string
 *               cover_art:
 *                 type: string
 *               artist_id:
 *                 type: integer
 *               record_label_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Album updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Album'
 *       '400':
 *         description: Invalid input.
 *       '404':
 *         description: Album not found.
 *       '500':
 *         description: Internal server error.
 */

router.patch(
    "/api/v1/albums/:id",
    findAlbumById,
    checkSchema(newAlbumValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            const albumId = req.albumId;
            const patchData = {
                ...data,
                soundtracks: data.soundtracks
                    ? {
                          connect: data.soundtracks.map((id) => ({ id })),
                      }
                    : undefined,
                artist_id: data.artist_id,
                record_label: data.record_label,
            };

            const updateAlbum = await prisma.album.update({
                where: { id: albumId },
                data: patchData
            });
            return res.status(201).json(updateAlbum);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

/**
 * @swagger
 * /api/v1/albums/{id}:
 *   delete:
 *     tags: [Albums]
 *     summary: Delete an album
 *     description: Removes an album from the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the album to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Album deleted successfully.
 *       '404':
 *         description: Album not found.
 *       '500':
 *         description: Internal server error.
 */

router.delete("/api/v1/albums/:id", findAlbumById, async (req, res) => {
    try {
        const albumId = req.albumId;
        const album = await prisma.user.delete({
            where: { id: albumId },
        });
        return res.status(201).send({ message: "Album deleted successfully." });
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

export default router;
