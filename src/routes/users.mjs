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

// const findUserById = async (req, res, next) => {
//     const id = parseInt(req.params.id);

//     if (isNaN(id)) {
//         return res.status(400).json({ error: "Invalid user ID!!" });
//     }

//     try {
//         const user = await prisma.user.findUnique({
//             where: { id: id },
//         });

//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         res.userId = user.id;
//         next();
//     } catch (err) {
//         console.log(err);
//         return res.sendStatus(500);
//     }
// };

router.get("/api/v1/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
});

router.get("/api/v1/users/:id", async (req, res) => {
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

        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

router.post(
    "/api/v1/users",
    checkSchema(newUserValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
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
            console.log(`from matchedData ${data}`);

            const updateUser = await prisma.user.update({
                where: { id: userId },
                data
            });
            console.log(`from updateUser ${updateUser}`);
            return res.status(201).json(updateUser);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

router.delete("/api/v1/users/:id", (req, res) => {});

export default router;

// router.patch(
//     "/api/v1/users/:id",
//     checkSchema(newUserValidationSchema),
//     async (req, res) => {
//         const result = validationResult(req);

//         if (!result.isEmpty()) {
//             res.status(400).send({ errors: result.array() });
//         }

//         try {
//             const data = matchedData(req);
//             console.log(data);
//             const updateUser = await prisma.user.update({
//                 where: { id: data.id },
//             });
//         } catch (err) {
//             console.log(err);
//             return res.sendStatus(500);
//         }
//     }
// );
