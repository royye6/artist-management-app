import express, { json } from "express";
// import { PrismaClient } from "@prisma/client";
import accoladesRouter from "./routes/accolades.mjs";
import albumsRouter from "./routes/albums.mjs";
import artistsRouter from "./routes/artists.mjs";
import contractsRouter from "./routes/contracts.mjs";
import financeRouter from "./routes/finance.mjs";
import merchRouter from "./routes/merch.mjs";
import recordLabelsRouter from "./routes/record-label.mjs";
import socialMediaRouter from "./routes/social-media.mjs";
import toursRouter from "./routes/tours.mjs";
import tracksRouter from "./routes/tracks.mjs";
import usersRouter from "./routes/users.mjs";
import venuesRouter from "./routes/venues.mjs";
import swaggerSpec from "./swagger.mjs";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

// const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors("*"));

app.use(express.json());

app.use(accoladesRouter);
app.use(albumsRouter);
app.use(artistsRouter);
app.use(contractsRouter);
app.use(financeRouter);
app.use(merchRouter);
app.use(recordLabelsRouter);
app.use(socialMediaRouter);
app.use(toursRouter);
app.use(tracksRouter);
app.use(tracksRouter);
app.use(usersRouter);
app.use(venuesRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
    return res.send({ message: "App is live! Head on over to the /api-docs endpoint"})
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
