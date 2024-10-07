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

router.get("/api/v1/tours", async (req, res) => {
    const tours = await prisma.tour.findMany();
    res.json(tours);
});

router.get("/api/v1/tours/:id", findTourById, (req, res) => {
    return res.status(200).json(req.tour);
});

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
