import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { newSocialMediaProfileValidationSchema } from "../utils/validationSchemas.mjs";

const router = Router();
const prisma = new PrismaClient();

const findProfileById = async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid profile ID" });
    }

    try {
        const profile = await prisma.socialMedia.findUnique({
            where: { id: id },
        });

        if (!profile) {
            return res.status(404).json({ error: "Profile not found" });
        }

        req.profileId = profile.id;
        req.profile = profile;
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

/**
 * @swagger
 * /api/v1/social-media:
 *   get:
 *     tags: [Social Media]
 *     summary: Retrieve a list of social media profiles
 *     description: Fetches all social media profiles from the database.
 *     responses:
 *       '200':
 *         description: A list of social media profiles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SocialMedia'
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/social-media", async (req, res) => {
    const socialMediaProfiles = await prisma.socialmedia.findMany();
    res.json(socialMediaProfiles);
});

/**
 * @swagger
 * /api/v1/social-media/{id}:
 *   get:
 *     tags: [Social Media]
 *     summary: Retrieve social media profile by ID
 *     description: Fetches a social media profile from the database using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the social media profile to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A social media profile object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocialMedia'
 *       '404':
 *         description: Social media profile not found.
 *       '500':
 *         description: Internal server error.
 */

router.get("/api/v1/social-media/:id", findProfileById, (req, res) => {
    return res.status(200).json(req.profile);
});

/**
 * @swagger
 * /api/v1/social-media:
 *   post:
 *     tags: [Social Media]
 *     summary: Create new social media profile
 *     description: Adds a new social media profile to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               artist_id:
 *                 type: integer
 *               platform:
 *                 type: string
 *               profile_url:
 *                 type: string
 *                 example: "https://x.com/exampleartist"
 *     responses:
 *       '201':
 *         description: Social media profile created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocialMedia'
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Internal server error.
 */

router.post(
    "/api/v1/social-media",
    checkSchema(newSocialMediaProfileValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            console.log(data);
            const newProfile = await prisma.socialMedia.create({ data: data });
            return res.status(201).json(newProfile);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

/**
 * @swagger
 * /api/v1/social-media/{id}:
 *   patch:
 *     tags: [Social Media]
 *     summary: Update an existing social media profile
 *     description: Modifies an existing social media profile in the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the social media profile to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               artist_id:
 *                 type: integer
 *               platform:
 *                 type: string
 *               profile_url:
 *                 type: string
 *                 example: "https://x.com/exampleartist"
 *     responses:
 *       '200':
 *         description: Social media profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocialMedia'
 *       '400':
 *         description: Invalid input.
 *       '404':
 *         description: Social media profile not found.
 *       '500':
 *         description: Internal server error.
 */

router.patch(
    "/api/v1/social-media/:id",
    findProfileById,
    checkSchema(newSocialMediaProfileValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
        }

        try {
            const data = matchedData(req);
            const profileId = req.profileId;

            const updateProfile = await prisma.socialMedia.update({
                where: { id: profileId },
                data,
            });

            return res.status(201).json(updateProfile);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
);

/**
 * @swagger
 * /api/v1/social-media/{id}:
 *   delete:
 *     tags: [Social Media]
 *     summary: Delete a social media profile
 *     description: Removes a social media profile from the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the social media profile to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Social media profile deleted successfully.
 *       '404':
 *         description: Social media profile not found.
 *       '500':
 *         description: Internal server error.
 */

router.delete("/api/v1/social-media/:id", findProfileById, async (req, res) => {
    try {
        const profileId = req.profileId;
        const profile = await prisma.socialMedia.delete({
            where: { id: profileId },
        });
        return res
            .status(201)
            .send({ message: "Social media profile deleted successfully." });
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

export default router;
