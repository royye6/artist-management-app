import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { newRecordLabelValidationSchema } from "../utils/validationSchemas.mjs";

const router = Router();
const prisma = new PrismaClient();

const findLabelById = async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid record label ID" });
    }

    try {
        const label = await prisma.recordLabel.findUnique({
            where: { id: id },
        });

        if (!label) {
            return res.status(404).json({ error: "Record label not found" });
        }

        req.labelId = label.id;
        req.label = label;
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

router.get("/api/v1/record-labels", async (req, res) => {
    const labels = await prisma.recordLabel.findMany();
    return res.json(labels);
});

router.get("/api/v1/record-labels/:id", findLabelById, (req, res) => {
    res.status(200).json(req.label);
});

router.post(
    "/api/v1/record-labels",
    checkSchema(newRecordLabelValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            console.log(data.signed_artists);
            const newLabel = await prisma.recordLabel.create({ data: data });
            return res.status(201).json(newLabel);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

router.patch(
    "/api/v1/record-labels/:id",
    findLabelById,
    checkSchema(newRecordLabelValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            const labelId = req.labelId;

            console.log(data.signed_artists);

            const updateData = {
                ...data,
                signed_artists: data.signed_artists
                    ? {
                          connect: data.signed_artists.map((id) => ({ id })),
                      }
                    : undefined,
                in_house_albums: data.in_house_albums
                    ? {
                          connect: data.in_house_albums.map((id) => ({ id })),
                      }
                    : undefined,
                contracts: data.contracts
                    ? {
                          connect: data.contracts.map((id) => ({ id })),
                      }
                    : undefined,
            };

            console.log(updateData);

            const updateLabel = await prisma.recordLabel.update({
                where: { id: labelId },
                data: updateData,
            });
            return res.status(201).json(updateLabel);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

router.delete("/api/v1/record-labels/:id", findLabelById, async (req, res) => {
    try {
        const labelId = req.labelId;
        const label = await prisma.recordLabel.delete({
            where: { id: labelId },
        });
        return res
            .status(201)
            .send({ message: "Record Label deleted successfully." });
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

export default router;

// router.post(
//     "/api/v1/record-labels",
//     checkSchema(newRecordLabelValidationSchema),
//     async (req, res) => {
//         const result = validationResult(req);

//         if (!result.isEmpty()) {
//             return res.status(400).send({ errors: result.array() });
//         }

//         try {
//             const data = matchedData(req);
//             console.log(data.signed_artists);
//             if (data.signed_artists) {
//                 signedArtists = data.signed_artists;
//             }

//             if (data.in_house_albums) {
//                 inHouseAlbums = data.in_house_albums;
//             }

//             if (data.contracts) {
//                 contracts = data.in_house_albums;
//             }

//             const newLabel = await prisma.recordLabel.create({
//                 data: {
//                     ...data,
//                     signed_artists: signedArtists,
//                 },
//             });
//             return res.status(201).json(newLabel);
//         } catch (err) {
//             console.log(err);
//             return res.sendStatus(500);
//         }
//     }
// );
