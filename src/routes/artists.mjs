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

router.get("/api/v1/artists", async (req, res) => {
    const artists = await prisma.artist.findMany();
    res.json(artists);
});

router.get("/api/v1/artists/:id", findArtistById, (req, res) => {
    res.status(200).json(req.artist);
});

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
