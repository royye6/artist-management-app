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

router.get("/api/v1/albums", async (req, res) => {
    const albums = await prisma.album.findMany();
    res.json(albums);
});

router.get("/api/v1/albums/:id", findAlbumById, (req, res) => {
    return res.status(200).json(req.album);
});

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
