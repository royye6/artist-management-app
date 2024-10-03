import express from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});
