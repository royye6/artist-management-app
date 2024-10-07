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

router.get("/api/v1/venues", async (req, res) => {
    const venues = await prisma.venue.findMany();
    res.json(venues);
});

router.get("/api/v1/venues/:id", findVenueById, (req, res) => {
    return res.status(200).json(req.venue);
});

router.post(
    "/api/v1/venues",
    checkSchema(newVenueValidationSchema),
    async (req, res) => {
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
