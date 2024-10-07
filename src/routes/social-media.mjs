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

router.get("/api/v1/social-media", async (req, res) => {
    const socialMediaProfiles = await prisma.socialmedia.findMany();
    res.json(socialMediaProfiles);
});

router.get("/api/v1/social-media/:id", findProfileById, (req, res) => {
    return res.status(200).json(req.profile);
});

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
