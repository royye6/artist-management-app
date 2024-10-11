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
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a list of users
 *     description: Fetches all users from the database.
 *     responses:
 *       '200':
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error
 */

router.get("/api/v1/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
});

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a user by ID
 *     description: Fetches a user from the database using their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/users/:id", findUserById, (req, res) => {
    return res.status(200).json(req.user);
});

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     description: Adds a new user to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Internal server error.
 */

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

/**
 * @swagger
 * /api/v1/users/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Update an existing user
 *     description: Modifies an existing user in the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid input.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */

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

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user
 *     description: Removes a user from the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User deleted successfully.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */

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
