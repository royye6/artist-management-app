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

router.get("/api/v1/tracks", async (req, res) => {
    const tracks = await prisma.track.findMany();
    res.json(tracks);
});

router.get("/api/v1/tracks/:id", findTrackById, (req, res) => {
    return res.status(200).json(req.track);
});

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
