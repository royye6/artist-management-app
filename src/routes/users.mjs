import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import {
    body,
    validationResult,
    checkSchema,
    matchedData,
} from "express-validator";
import { newUserValidationSchema } from "../utils/validationSchemas.mjs";

const router = Router();
const prisma = new PrismaClient();

const findUserById = async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: id },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.userId = user.id;
        req.user = user
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

router.get("/api/v1/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
});

router.get("/api/v1/users/:id", findUserById, (req, res) => {
    return res.status(200).json(req.user)
});

router.post(
    "/api/v1/users",
    checkSchema(newUserValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
           return res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            console.log(data);
            const newUser = await prisma.user.create({ data: data });
            return res.status(201).json(newUser);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

router.patch(
    "/api/v1/users/:id",
    findUserById,
    checkSchema(newUserValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            const userId = req.userId;
            console.log(`from matchedData ${data}`);

            const updateUser = await prisma.user.update({
                where: { id: userId },
                data,
            });
            console.log(`from updateUser ${updateUser}`);
            return res.status(201).json(updateUser);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

router.delete("/api/v1/users/:id", findUserById, async (req, res) => {
    try {
        const userId = req.userId;
        const user = await prisma.user.delete({
            where: { id: userId },
        });
        return res.status(201).send({ message: "User deleted successfully." });
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

export default router;

