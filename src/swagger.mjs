import swaggerJsdoc from "swagger-jsdoc";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @swagger
 * components:
 *  schemas:
 *      Artist:
 *          type: object
 *          required:
 *              - first name
 *              - last name
 *              - stage name
 *          properies:
 *              first name:
 *                  type: string
 *                  description: Artist first name
 *              last name:
 *                  type: string
 *                  description: Artist last name
 *              stage name:
 *                  type: string
 *                  description: Artist stage name
 *          optional:
 *              - bio
 *              - image
 *              - genre
 *              - record label
 *          properies:
 *              bio:
 *                  type: string
 *                  description: Artist biography
 *              image:
 *                  type: string
 *                  description: Artist image
 *              genre:
 *                  type: string
 *                  description: Artist music genre
 *          example:
 *              first_name: Leo
 *              last_name: Rivers
 *              stage_name: Leor
 *              bio: A versatile artist who seamlessly blends pop and R&B influences.
 *              first_name: Leo
 *  
 */

const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Artist Management API",
            version: "1.0.0",
            description: "The backend for an artist management platform",
        },
    },
    apis: [`${__dirname}/routes/*.mjs`, `${__dirname}/swagger.mjs`],
});

export default swaggerSpec;
