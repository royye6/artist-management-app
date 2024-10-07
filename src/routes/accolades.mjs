import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { newAccoladeValidationSchema } from "../utils/validationSchemas.mjs";

const router = Router();
const prisma = new PrismaClient();

const findAccoladeById = async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid award ID" });
    }

    try {
        const accolade = await prisma.accolade.findUnique({
            where: { id: id },
        });

        if (!accolade) {
            return res.status(404).json({ error: "Award not found" });
        }

        req.accoladeId = accolade.id;
        req.accolade = accolade;
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

router.get("/api/v1/accolades", async (req, res) => {
    const accolades = await prisma.accolade.findMany();
    res.json(accolades);
});

router.get("/api/v1/accolades/:id", findAccoladeById, (req, res) => {
    res.status(200).json(accolade);
});

router.post(
    "/api/v1/accolades",
    checkSchema(newAccoladeValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            const newAccolade = await prisma.accolade.create({ data: data });
            return res.status(201).json(newAccolade);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

router.patch(
    "/api/v1/accolades/:id",
    findAccoladeById,
    checkSchema(newAccoladeValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array()})
        }

        try {
            const data = matchedData(req);
            const accoladeId = req.accoladeId

            const updateAccolade = await prisma.accolade.update({
                where: {id: accoladeId},
                data,
            });
            return res.status(201).json(updateAccolade);
        } catch (err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }
);

router.delete("/api/v1/accolades/:id", findAccoladeById, async (req, res) => {
    try {
        const accoladeId = req.accoladeId;
        const accolade = await prisma.accolade.delete({
            where: { id: accoladeId },
        });
        return res.status(201).send({ message: "Accolade deleted successfully." });
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
});

export default router;
