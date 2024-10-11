import swaggerJsdoc from "swagger-jsdoc";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - first_name
 *              - last_name
 *              - username
 *              - email
 *              - password
 *          properties:
 *              id:
 *                  type: integer
 *                  format: int64
 *                  description: Unique identifier for the user
 *              first_name:
 *                  type: string
 *                  description: User's first name
 *              last_name:
 *                  type: string
 *                  description: User's last name
 *              username:
 *                  type: string
 *                  description: Unique username for the user
 *              email:
 *                  type: string
 *                  format: email
 *                  description: Unique email address for the user
 *              password:
 *                  type: string
 *                  description: User's password
 *              image:
 *                  type: string
 *                  description: URL of the user's profile image
 *                  nullable: true
 *              created_at:
 *                  type: string
 *                  format: date-time
 *                  description: Timestamp when the user was created
 *              updated_at:
 *                  type: string
 *                  format: date-time
 *                  description: Timestamp when the user was last updated
 *                  nullable: true
 *          example:
 *              id: 1
 *              first_name: John
 *              last_name: Doe
 *              username: johndoe
 *              email: johndoe@example.com
 *              password: securepassword
 *              image: https://example.com/profile.jpg
 *              created_at: "2023-01-01T00:00:00Z"
 *              updated_at: "2023-01-10T00:00:00Z"
 *
 *      RecordLabel:
 *          type: object
 *          required:
 *              - name
 *              - address
 *              - city
 *              - state
 *              - country
 *          properties:
 *              id:
 *                  type: integer
 *                  format: int64
 *                  description: Unique identifier for the record label
 *              name:
 *                  type: string
 *                  description: Name of the record label
 *              website_url:
 *                  type: string
 *                  description: URL of the record label's website
 *                  nullable: true
 *              address:
 *                  type: string
 *                  description: Address of the record label
 *              city:
 *                  type: string
 *                  description: City where the record label is located
 *              state:
 *                  type: string
 *                  description: State where the record label is located
 *              country:
 *                  type: string
 *                  description: Country where the record label is located
 *              created_at:
 *                  type: string
 *                  format: date-time
 *              updated_at:
 *                  type: string
 *                  format: date-time
 *                  nullable: true
 *          example:
 *              id: 1
 *              name: Example Record Label
 *              website_url: https://examplelabel.com
 *              address: 123 Music St.
 *              city: Music City
 *              state: NY
 *              country: USA
 *
 *      Artist:
 *          type: object
 *          required:
 *              - first_name
 *              - last_name
 *              - stage_name
 *          properties:
 *              id:
 *                  type: integer
 *                  format: int64
 *              first_name:
 *                  type: string
 *              last_name:
 *                  type: string
 *              stage_name:
 *                  type: string
 *              bio:
 *                  type: string
 *                  nullable: true
 *              image:
 *                  type: string
 *                  nullable: true
 *              genre:
 *                  type: string
 *                  nullable: true
 *              record_label_id:
 *                  type: integer
 *                  nullable: true
 *              created_at:
 *                  type: string
 *                  format: date-time
 *              updated_at:
 *                  type: string
 *                  format: date-time
 *                  nullable: true
 *          example:
 *              id: 1
 *              first_name: Jane
 *              last_name: Smith
 *              stage_name: J-Smith
 *              bio: A talented pop artist.
 *              image: https://example.com/jane.jpg
 *              genre: Pop
 *              record_label_id: 1
 *              created_at: "2023-01-01T00:00:00Z"
 *              updated_at: "2023-01-10T00:00:00Z"
 *
 *      Album:
 *          type: object
 *          required:
 *              - title
 *              - release_date
 *              - artist_id
 *              - record_label_id
 *          properties:
 *              id:
 *                  type: integer
 *              title:
 *                  type: string
 *              release_date:
 *                  type: string
 *                  format: date-time
 *              cover_art:
 *                  type: string
 *                  nullable: true
 *              artist_id:
 *                  type: integer
 *              record_label_id:
 *                  type: integer
 *              created_at:
 *                  type: string
 *                  format: date-time
 *              updated_at:
 *                  type: string
 *                  format: date-time
 *                  nullable: true
 *          example:
 *              id: 1
 *              title: First Album
 *              release_date: "2023-02-01T00:00:00Z"
 *              cover_art: https://example.com/cover.jpg
 *              artist_id: 1
 *              record_label_id: 1
 *              created_at: "2023-01-01T00:00:00Z"
 *              updated_at: "2023-01-10T00:00:00Z"
 *
 *      Track:
 *          type: object
 *          required:
 *              - title
 *              - duration
 *              - filename
 *              - artist_id
 *          properties:
 *              id:
 *                  type: integer
 *              title:
 *                  type: string
 *              duration:
 *                  type: integer
 *                  description: Duration in seconds
 *              filename:
 *                  type: string
 *              artist_id:
 *                  type: integer
 *              album_id:
 *                  type: integer
 *                  nullable: true
 *              created_at:
 *                  type: string
 *                  format: date-time
 *              updated_at:
 *                  type: string
 *                  format: date-time
 *                  nullable: true
 *          example:
 *              id: 1
 *              title: First Track
 *              duration: 180
 *              filename: track1.mp3
 *              artist_id: 1
 *              album_id: 1
 *              created_at: "2023-01-01T00:00:00Z"
 *              updated_at: "2023-01-10T00:00:00Z"
 *
 *      Tour:
 *          type: object
 *          required:
 *              - name
 *              - start_date
 *              - end_date
 *              - venue_id
 *              - artist_id
 *          properties:
 *              id:
 *                  type: integer
 *              name:
 *                  type: string
 *              start_date:
 *                  type: string
 *                  format: date-time
 *              end_date:
 *                  type: string
 *                  format: date-time
 *              venue_id:
 *                  type: integer
 *              artist_id:
 *                  type: integer
 *              created_at:
 *                  type: string
 *                  format: date-time
 *              updated_at:
 *                  type: string
 *                  format: date-time
 *                  nullable: true
 *          example:
 *              id: 1
 *              name: Summer Tour
 *              start_date: "2023-06-01T00:00:00Z"
 *              end_date: "2023-09-01T00:00:00Z"
 *              venue_id: 1
 *              artist_id: 1
 *              created_at: "2023-01-01T00:00:00Z"
 *              updated_at: "2023-01-10T00:00:00Z"
 *
 *      Venue:
 *          type: object
 *          required:
 *              - name
 *              - address
 *              - city
 *              - state
 *              - country
 *          properties:
 *              id:
 *                  type: integer
 *              name:
 *                  type: string
 *              website_url:
 *                  type: string
 *                  nullable: true
 *              address:
 *                  type: string
 *              city:
 *                  type: string
 *              state:
 *                  type: string
 *              country:
 *                  type: string
 *              created_at:
 *                  type: string
 *                  format: date-time
 *              updated_at:
 *                  type: string
 *                  format: date-time
 *                  nullable: true
 *          example:
 *              id: 1
 *              name: Example Venue
 *              website_url: https://examplevenue.com
 *              address: 456 Concert Rd.
 *              city: Music City
 *              state: NY
 *              country: USA
 *              created_at: "2023-01-01T00:00:00Z"
 *              updated_at: "2023-01-10T00:00:00Z"
 *
 *      Contract:
 *          type: object
 *          required:
 *              - artist_id
 *              - record_label_id
 *              - start_date
 *              - end_date
 *              - contract_terms
 *          properties:
 *              id:
 *                  type: integer
 *              artist_id:
 *                  type: integer
 *              record_label_id:
 *                  type: integer
 *              start_date:
 *                  type: string
 *                  format: date-time
 *              end_date:
 *                  type: string
 *                  format: date-time
 *              contract_terms:
 *                  type: string
 *              created_at:
 *                  type: string
 *                  format: date-time
 *              updated_at:
 *                  type: string
 *                  format: date-time
 *                  nullable: true
 *          example:
 *              id: 1
 *              artist_id: 1
 *              record_label_id: 1
 *              start_date: "2023-01-01T00:00:00Z"
 *              end_date: "2024-01-01T00:00:00Z"
 *              contract_terms: Terms and conditions of the contract.
 *              created_at: "2023-01-01T00:00:00Z"
 *              updated_at: "2023-01-10T00:00:00Z"
 *
 *      Finance:
 *          type: object
 *          required:
 *              - artist_id
 *              - transaction_type
 *              - amount
 *              - description
 *          properties:
 *              id:
 *                  type: integer
 *              artist_id:
 *                  type: integer
 *              transaction_type:
 *                  type: string
 *              amount:
 *                  type: number
 *                  format: double
 *              description:
 *                  type: string
 *              created_at:
 *                  type: string
 *                  format: date-time
 *              updated_at:
 *                  type: string
 *                  format: date-time
 *                  nullable: true
 *          example:
 *              id: 1
 *              artist_id: 1
 *              transaction_type: Revenue
 *              amount: 1000.00
 *              description: Concert earnings.
 *              created_at: "2023-01-01T00:00:00Z"
 *              updated_at: "2023-01-10T00:00:00Z"
 *
 *      SocialMedia:
 *          type: object
 *          required:
 *              - artist_id
 *              - platform
 *              - profile_url
 *          properties:
 *              profile_id:
 *                  type: integer
 *              artist_id:
 *                  type: integer
 *              platform:
 *                  type: string
 *              profile_url:
 *                  type: string
 *              created_at:
 *                  type: string
 *                  format: date-time
 *              updated_at:
 *                  type: string
 *                  format: date-time
 *                  nullable: true
 *          example:
 *              profile_id: 1
 *              artist_id: 1
 *              platform: X
 *              profile_url: https://x.com/exampleartist
 *              created_at: "2023-01-01T00:00:00Z"
 *              updated_at: "2023-01-10T00:00:00Z"
 *
 *      Merchandise:
 *          type: object
 *          required:
 *              - name
 *              - price
 *          properties:
 *              id:
 *                  type: integer
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *                  nullable: true
 *              price:
 *                  type: number
 *                  format: double
 *              image:
 *                  type: string
 *                  nullable: true
 *              created_at:
 *                  type: string
 *                  format: date-time
 *              updated_at:
 *                  type: string
 *                  format: date-time
 *                  nullable: true
 *          example:
 *              id: 1
 *              name: Concert T-Shirt
 *              description: Official concert merchandise.
 *              price: 25.00
 *              image: https://example.com/tshirt.jpg
 *              created_at: "2023-01-01T00:00:00Z"
 *              updated_at: "2023-01-10T00:00:00Z"
 *
 *      Accolade:
 *          type: object
 *          required:
 *              - artist_id
 *              - award_name
 *              - award_category
 *          properties:
 *              id:
 *                  type: integer
 *              artist_id:
 *                  type: integer
 *              award_name:
 *                  type: string
 *              award_category:
 *                  type: string
 *              award_date:
 *                  type: string
 *                  format: date-time
 *                  nullable: true
 *              created_at:
 *                  type: string
 *                  format: date-time
 *              updated_at:
 *                  type: string
 *                  format: date-time
 *                  nullable: true
 *          example:
 *              id: 1
 *              artist_id: 1
 *              award_name: Best New Artist
 *              award_category: Music Awards
 *              award_date: "2023-10-01T00:00:00Z"
 *              created_at: "2023-01-01T00:00:00Z"
 *              updated_at: "2023-01-10T00:00:00Z"
 */


const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Artist Management API",
            version: "1.0.0",
            description: "The backend for an artist management platform",
        },
        tags: [
            {
                name: "Users",
                description: "Operations related to users",
            },
            {
                name: "Artists",
                description: "Operations related to artists",
            },
            {
                name: "Albums",
                description: "Operations related to albums",
            },
            {
                name: "Tracks",
                description: "Operations related to tracks",
            },
            {
                name: "Record Labels",
                description: "Operations related to record labels",
            },
            {
                name: "Tours",
                description: "Operations related to tours",
            },
            {
                name: "Venues",
                description: "Operations related to venues",
            },
            {
                name: "Contracts",
                description: "Operations related to contracts",
            },
            {
                name: "Finance",
                description: "Operations related to finance",
            },
            {
                name: "Social Media",
                description: "Operations related to social media",
            },
            {
                name: "Merch",
                description: "Operations related to merch",
            },
            {
                name: "Accolades",
                description: "Operations related to accolades",
            },
        ],
    },
    apis: [`${__dirname}/routes/*.mjs`, `${__dirname}/swagger.mjs`],
});

export default swaggerSpec;
