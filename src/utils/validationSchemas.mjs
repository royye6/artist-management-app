export const newUserValidationSchema = {
    first_name: {
        notEmpty: {
            errorMessage: "First Name is required",
        },
        isString: {
            errorMessage: "First name must be a string",
        },
        isLength: {
            options: {
                min: 2,
                max: 225,
            },
            errorMessage:
                "First Name must be at between 2 and 225 characters long",
        },
    },
    last_name: {
        notEmpty: {
            errorMessage: "Last Name is required",
        },
        isString: {
            errorMessage: "Last name must be a string",
        },
        isLength: {
            options: {
                min: 2,
                max: 225,
            },
            errorMessage:
                "Last Name must be at between 2 and 225 characters long",
        },
    },
    username: {
        notEmpty: {
            errorMessage: "Username is required",
        },
        isString: {
            errorMessage: "Username must be a string",
        },
        isLength: {
            options: {
                min: 2,
                max: 225,
            },
            errorMessage:
                "Username must be between 2 and 225 characters long",
        },
    },
    email: {
        notEmpty: {
            errorMessage: "Email is required",
        },
        isString: {
            errorMessage: "Email must be a string",
        },
        isLength: {
            options: {
                min: 12,
                max: 225,
            },
            errorMessage: "Email must be at between 12 and 225 characters long",
        },
    },
    password: {
        notEmpty: {
            errorMessage: "Password is required",
        },
        isLength: {
            options: {
                min: 8,
                max: 225,
            },
            errorMessage: "Email must be between 8 and 225 characters long",
        },
    },
};

export const newArtistValidationSchema = {
    first_name: {
        notEmpty: {
            errorMessage: "First Name is required",
        },
        isString: {
            errorMessage: "First name must be a string",
        },
        isLength: {
            options: {
                min: 2,
                max: 225,
            },
            errorMessage:
                "First Name must be at between 2 and 225 characters long",
        },
    },
    last_name: {
        notEmpty: {
            errorMessage: "Last Name is required",
        },
        isString: {
            errorMessage: "Last name must be a string",
        },
        isLength: {
            options: {
                min: 2,
                max: 225,
            },
            errorMessage:
                "Last Name must be at between 2 and 225 characters long",
        },
    },
    stage_name: {
        notEmpty: {
            errorMessage: "Stage Name is required",
        },
        isString: {
            errorMessage: "Stage name must be a string",
        },
        isLength: {
            options: {
                min: 2,
                max: 225,
            },
            errorMessage:
                "Stage Name must be at between 2 and 225 characters long",
        },
    },
    bio: {
        optional: true,
        isString: {
            errorMessage: "Biography must be a string",
        },
    },
    image: {
        optional: true,
        isString: {
            errorMessage: "Image path must be a string",
        },
    },
    genre: {
        optional: true,
        isString: {
            errorMessage: "Genre must be a string",
        },
        isLength: {
            options: {
                max: 255,
            },
            errorMessage: "Genre must have a maximum of 255 characters",
        },
    },
    albums: {
        optional: true,
        isArray: {
            errorMessage: "Albums must be an array of integers",
        },
        custom: {
            options: (value) => {
                return (
                    Array.isArray(value) &&
                    value.every((item) => typeof item === "number")
                );
            },
            errorMessage: "All album IDs must be integers",
        },
    },
    tracks: {
        optional: true,
        isArray: {
            errorMessage: "Tracks must be an array of integers",
        },
        custom: {
            options: (value) => {
                return (
                    Array.isArray(value) &&
                    value.every((item) => typeof item === "number")
                );
            },
            errorMessage: "All track IDs must be integers",
        },
    },
    contract: {
        optional: true,
        isArray: {
            errorMessage: "Contracts must be an array of integers",
        },
        custom: {
            options: (value) => {
                return (
                    Array.isArray(value) &&
                    value.every((item) => typeof item === "number")
                );
            },
            errorMessage: "All contract IDs must be integers",
        },
    },
    music_tours: {
        optional: true,
        isArray: {
            errorMessage: "Music tours must be an array of integers",
        },
        custom: {
            options: (value) => {
                return (
                    Array.isArray(value) &&
                    value.every((item) => typeof item === "number")
                );
            },
            errorMessage: "All music tour IDs must be integers",
        },
    },
    transactions: {
        optional: true,
        isArray: {
            errorMessage: "Transactions must be an array of integers",
        },
        custom: {
            options: (value) => {
                return (
                    Array.isArray(value) &&
                    value.every((item) => typeof item === "number")
                );
            },
            errorMessage: "All transaction IDs must be integers",
        },
    },
    accolades: {
        optional: true,
        isArray: {
            errorMessage: "Accolades must be an array of integers",
        },
        custom: {
            options: (value) => {
                return (
                    Array.isArray(value) &&
                    value.every((item) => typeof item === "number")
                );
            },
            errorMessage: "All accolade IDs must be integers",
        },
    },
    social_media_profiles: {
        optional: true,
        isArray: {
            errorMessage: "Social media profiles must be an array of integers",
        },
        custom: {
            options: (value) => {
                return (
                    Array.isArray(value) &&
                    value.every((item) => typeof item === "number")
                );
            },
            errorMessage: "All social media profile IDs must be integers",
        },
    },
    record_label_id: {
        optional: true,
        isNumeric: {
            errorMessage: "Record label ID must be an integer",
        },
    },
};

export const newRecordLabelValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: "Record Label name is required",
        },
        isString: {
            errorMessage: "Record Label name must be a string",
        },
    },
    website_url: {
        optional: true,
        isString: {
            errorMessage: "Website URL must be a string",
        },
    },
    address: {
        notEmpty: {
            errorMessage: "Address is required",
        },
        isString: {
            errorMessage: "Address must be a string",
        },
    },
    city: {
        notEmpty: {
            errorMessage: "City is required",
        },
        isString: {
            errorMessage: "City must be a string",
        },
    },
    state: {
        notEmpty: {
            errorMessage: "State is required",
        },
        isString: {
            errorMessage: "State must be a string",
        },
    },
    country: {
        notEmpty: {
            errorMessage: "Country is required",
        },
        isString: {
            errorMessage: "Country must be a string",
        },
    },
    signed_artists: {
        optional: true,
        isArray: {
            errorMessage: "Signed artists must be an array of integers",
        },
        custom: {
            options: (value) => {
                return (
                    Array.isArray(value) &&
                    value.every((item) => typeof item === "number")
                );
            },
            errorMessage: "All artist IDs must be integers",
        },
    },
    in_house_albums: {
        optional: true,
        isArray: {
            errorMessage: "In-house albums must be an array of integers",
        },
        custom: {
            options: (value) => {
                return (
                    Array.isArray(value) &&
                    value.every((item) => typeof item === "number")
                );
            },
            errorMessage: "All album IDs must be integers",
        },
    },
    contracts: {
        optional: true,
        isArray: {
            errorMessage: "Contracts be an array of integers",
        },
        custom: {
            options: (value) => {
                return (
                    Array.isArray(value) &&
                    value.every((item) => typeof item === "number")
                );
            },
            errorMessage: "All contract IDs must be integers",
        },
    },
};

export const newAlbumValidationSchema = {
    title: {
        notEmpty: {
            errorMessage: "Album title is required",
        },
        isString: {
            errorMessage: "Album title must be a string",
        },
    },
    release_date: {
        notEmpty: {
            errorMessage: "Release date is required",
        },
        isString: {
            errorMessage: "Date format must be string YYYY-MM-DD HH-MM-SS",
        },
    },
    cover_art: {
        optional: true,
        isString: {
            errorMessage: "File path must be a string",
        },
    },
    artist_id: {
        notEmpty: {
            errorMessage: "Artist ID is required",
        },
        isNumeric: {
            errorMessage: "Artist ID must be an integer",
        },
    },
    soundtracks: {
        optional: true,
        isArray: {
            errorMessage: "Tracks must be an array of integers",
        },
        custom: {
            options: (value) => {
                return (
                    Array.isArray(value) &&
                    value.every((item) => typeof item === "number")
                );
            },
            errorMessage: "All track IDs must be integers",
        },
    },
    record_label_id: {
        optional: true,
        isNumeric: {
            errorMessage: "Record label ID must be an integer",
        },
    },
};

export const newContractValidationSchema = {
    artist_id: {
        notEmpty: {
            errorMessage: "Artist ID is required",
        },
        isNumeric: {
            errorMessage: "Artist ID must be an integer",
        },
    },
    record_label_id: {
        notEmpty: {
            errorMessage: "Record label is required",
        },
        isNumeric: {
            errorMessage: "Record label ID must be an integer",
        },
    },
    start_date: {
        notEmpty: {
            errorMessage: "Start date is required",
        },
        isString: {
            errorMessage: "Date format must be string YYYY-MM-DD HH-MM-SS",
        },
    },
    end_date: {
        notEmpty: {
            errorMessage: "End date is required",
        },
        isString: {
            errorMessage: "Date format must be string YYYY-MM-DD HH-MM-SS",
        },
    },
    contract_terms: {
        notEmpty: {
            errorMessage: "Contract terms are required",
        },
        isString: {
            errorMessage: "Contract terms must be a string",
        },
    },
};

export const newFinanceValidationSchema = {
    artist_id: {
        notEmpty: {
            errorMessage: "Artist ID is required",
        },
        isNumeric: {
            errorMessage: "Artist ID must be an integer",
        },
    },
    transaction_type: {
        notEmpty: {
            errorMessage: "Transaction type is required",
        },
        isString: {
            errorMessage: "Transaction type must be a string",
        },
    },
    amount: {
        notEmpty: {
            errorMessage: "Artist ID is required",
        },
        isNumeric: {
            errorMessage: "Artist ID must be an integer",
        },
    },
    description: {
        notEmpty: {
            errorMessage: "Description is required",
        },
        isString: {
            errorMessage: "Desctiption must be a string",
        },
    },
};

export const newMerchValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: "Merch name is required",
        },
        isString: {
            errorMessage: "Merch name must be a string",
        },
    },
    description: {
        notEmpty: {
            errorMessage: "Description is required",
        },
        isString: {
            errorMessage: "Description must be a string",
        },
    },
    price: {
        notEmpty: {
            errorMessage: "Price is required",
        },
        isNumeric: {
            errorMessage: "Price must be an integer",
        },
    },
    image: {
        optional: true,
        isString: {
            errorMessage: "Image path must be a string",
        },
    },
};

export const newSocialMediaProfileValidationSchema = {
    artist_id: {
        notEmpty: {
            errorMessage: "Artist ID is required",
        },
        isNumeric: {
            errorMessage: "Artist ID must be an integer",
        },
    },
    platform: {
        notEmpty: {
            errorMessage: "Platform name is required",
        },
        isString: {
            errorMessage: "Platform name must be a string",
        },
    },
    profile_url: {
        notEmpty: {
            errorMessage: "Profile URL is required",
        },
        isString: {
            errorMessage: "Profile URL must be a string",
        },
    },
};

export const newTourValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: "Tour name is required",
        },
        isString: {
            errorMessage: "Tour name must be a string",
        },
        isLength: {
            options: {
                min: 5,
                max: 255,
            },
            errorMessage:
                "Tour name must be at between 5 and 225 characters long",
        },
    },
    start_date: {
        notEmpty: {
            errorMessage: "Start date is required",
        },
        isString: {
            errorMessage: "Date format must be string YYYY-MM-DD HH-MM-SS",
        },
    },
    end_date: {
        notEmpty: {
            errorMessage: "End date is required",
        },
        isString: {
            errorMessage: "Date format must be string YYYY-MM-DD HH-MM-SS",
        },
    },
    venue_id: {
        notEmpty: {
            errorMessage: "Venue is required",
        },
        isNumeric: {
            errorMessage: "Venue ID must be an integer",
        },
    },
    artist_id: {
        notEmpty: {
            errorMessage: "Artist ID is required",
        },
        isNumeric: {
            errorMessage: "Artist ID must be an integer",
        },
    },
};

export const newTrackValidationSchema = {
    title: {
        notEmpty: {
            errorMessage: "Song title is required",
        },
        isString: {
            errorMessage: "Song title must be a string",
        },
    },
    duration: {
        notEmpty: {
            errorMessage: "Duration is required",
        },
        isNumeric: {
            errorMessage: "Song duration must be an integer (seconds)",
        },
    },
    filename: {
        notEmpty: {
            errorMessage: "Song title is required",
        },
        isString: {
            errorMessage: "Song title must be a string",
        },
    },
    artist_id: {
        notEmpty: {
            errorMessage: "Artist ID is required",
        },
        isNumeric: {
            errorMessage: "Artist ID must be an integer",
        },
    },
    album_id: {
        optional: true,
        isNumeric: {
            errorMessage: "Album ID must be an integer",
        },
    },
};

export const newVenueValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: "Name name is required",
        },
        isString: {
            errorMessage: "Venue name must be a string",
        },
    },
    website_url: {
        optional: true,
        isString: {
            errorMessage: "Website URL must be a string",
        },
    },
    address: {
        notEmpty: {
            errorMessage: "Address is required",
        },
        isString: {
            errorMessage: "Address must be a string",
        },
    },
    city: {
        notEmpty: {
            errorMessage: "City is required",
        },
        isString: {
            errorMessage: "City must be a string",
        },
    },
    state: {
        notEmpty: {
            errorMessage: "State is required",
        },
        isString: {
            errorMessage: "State must be a string",
        },
    },
    country: {
        notEmpty: {
            errorMessage: "Country is required",
        },
        isString: {
            errorMessage: "Country must be a string",
        },
    },
    associated_tours: {
        optional: true,
        isArray: {
            errorMessage: "Tours must be an array of integers",
        },
        custom: {
            options: (value) => {
                return (
                    Array.isArray(value) &&
                    value.every((item) => typeof item === "number")
                );
            },
            errorMessage: "All tour IDs must be integers",
        },
    },
};

export const newAccoladeValidationSchema = {
    award_name: {
        notEmpty: {
            errorMessage: "Award name is required",
        },
        isString: {
            errorMessage: "Award name must be a string",
        },
        isLength: {
            options: {
                min: 2,
                max: 255,
            },
            errorMessage:
                "Award name must be at between 2 and 225 characters long",
        },
    },
    award_category: {
        notEmpty: {
            errorMessage: "Category name is required",
        },
        isString: {
            errorMessage: "Category name must be a string",
        },
        isLength: {
            options: {
                min: 2,
                max: 255,
            },
            errorMessage:
                "Category name must be at between 2 and 225 characters long",
        },
    },
    artist_id: {
        notEmpty: {
            errorMessage: "Artist ID is required",
        },
        isNumeric: {
            errorMessage: "Artist ID must be an integer",
        },
    },
    award_date: {
        optional: true,
        isString: {
            errorMessage: "Date format must be string YYYY-MM-DD HH-MM-SS",
        },
    },
};
