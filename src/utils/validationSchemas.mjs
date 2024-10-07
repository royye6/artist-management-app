export const newUserValidationSchema = {
    first_name: {
        notEmpty: {
            errorMessage: "First Name is required",
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
        isLength: {
            options: {
                min: 2,
                max: 225,
            },
            errorMessage:
                "Username must be at between 2 and 225 characters long",
        },
    },
    email: {
        notEmpty: {
            errorMessage: "Email is required",
        },
        isLength: {
            options: {
                min: 12,
                max: 225,
            },
            errorMessage: "Email must be at between 12 and 225 characters long",
        },
        isEmail: {
            errorMessage: "Invalid email format",
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
            errorMessage: "Email must be at between 8 and 225 characters long",
        },
    },
};

export const newArtistValidationSchema = {
    first_name: {
        notEmpty: {
            errorMessage: "First Name is required",
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
        isString: {
            errorMessage: "Biography must be a string value",
        },
    },
    image: {
        isString: {
            errorMessage: "Image path must be a string value",
        },
    },
    genre: {
        isString: {
            errorMessage: "Genre must be a string value",
        },
    },
    albums: {
        isString: {
            errorMessage: "Album names must be string values",
        },
    },
    tracks: {
        isString: {
            errorMessage: "Track names must be string values",
        },
    },
    contract: {
        isString: {
            errorMessage: "Contract name must be a string value",
        },
    },
    music_tours: {
        isString: {
            errorMessage: "Music tour names must be string values",
        },
    },
    transactions: {
        isString: {
            errorMessage: "Transaction type must be a string value",
        },
    },
    accolades: {
        isString: {
            errorMessage: "Accolade names must be string values",
        },
    },
    social_media_profiles: {
        notEmpty: {
            errorMessage: "Social-media profile urls are required",
        },
        isString: "Social-media profile urls must be string values",
    },
    record_label_id: {
        isNumeric: "Record label ID must be an integer value",
    },
};

export const newAlbumValidationSchema = {
    title: {
        notEmpty: {
            errorMessage: "Album title is required",
        },
        isString: {
            errorMessage: "Album title must be a string value",
        },
    },
    release_date: {
        notEmpty: {
            errorMessage: "Release date is required",
        },
        isString: {
            errorMessage: "Date format must be string value YYYY/MM/DD",
        },
    },
    cover_art: {
        isString: {
            errorMessage: "File path must be a string value",
        },
    },
    artist_id: {
        notEmpty: {
            errorMessage: "Artist ID is required",
        },
        isNumeric: {
            errorMessage: "Artist ID must be an integer value",
        },
    },
    soundtracks: {
        notEmpty: {
            errorMessage: "Track title is required",
        },
        isString: {
            errorMessage: "Track titles must be string values",
        },
    },
    record_label_id: {
        notEmpty: {
            errorMessage: "Record label name is required",
        },
        isString: {
            errorMessage: "Record label name must be a string value",
        },
    },
};

export const newContractValidationSchema = {
    artist_id: {
        notEmpty: {
            errorMessage: "Artist ID is required",
        },
        isNumeric: {
            errorMessage: "Artist ID must be an integer value",
        },
    },
    record_label_id: {
        notEmpty: {
            errorMessage: "Record label name is required",
        },
        isString: {
            errorMessage: "Record label name must be a string value",
        },
    },
    start_date: {
        notEmpty: {
            errorMessage: "Start date is required",
        },
        isString: {
            errorMessage: "Date format must be string value YYYY/MM/DD",
        },
    },
    end_date: {
        notEmpty: {
            errorMessage: "End date is required",
        },
        isString: {
            errorMessage: "Date format must be string value YYYY/MM/DD",
        },
    },
    contract_terms: {
        notEmpty: {
            errorMessage: "End date is required",
        },
        isString: {
            errorMessage: "Contract terms must be a string value",
        },
    },
};

export const newFinanceValidationSchema = {
    artist_id: {
        notEmpty: {
            errorMessage: "Artist ID is required",
        },
        isNumeric: {
            errorMessage: "Artist ID must be an integer value",
        },
    },
    transaction_type: {
        notEmpty: {
            errorMessage: "Transaction type is required",
        },
        isString: {
            errorMessage: "Transaction type must be a string value",
        },
    },
    amount: {
        notEmpty: {
            errorMessage: "Artist ID is required",
        },
        isNumeric: {
            errorMessage: "Artist ID must be an integer value",
        },
    },
    description: {
        notEmpty: {
            errorMessage: "Description is required",
        },
        isString: {
            errorMessage: "Desctiption must be a string value",
        },
    },
};

export const newMerchValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: "Merch name is required",
        },
        isString: {
            errorMessage: "Merch name must be a string value",
        },
    },
    description: {
        notEmpty: {
            errorMessage: "Description is required",
        },
        isString: {
            errorMessage: "Description must be a string value",
        },
    },
    price: {
        notEmpty: {
            errorMessage: "Price is required",
        },
        isNumeric: {
            errorMessage: "Price must be an integer value",
        },
    },
    image: {
        isString: {
            errorMessage: "Image path must be a string value",
        },
    },
};

export const newSocialMediaProfileValidationSchema = {
    artist_id: {
        notEmpty: {
            errorMessage: "Artist ID is required",
        },
        isNumeric: {
            errorMessage: "Artist ID must be an integer value",
        },
    },
    platform: {
        notEmpty: {
            errorMessage: "Platform name is required",
        },
        isString: {
            errorMessage: "Platform name must be a string value",
        },
    },
    profile_url: {
        isString: {
            errorMessage: "Profile URL must be a string value",
        },
    },
};

export const newTourValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: "Tour name is required",
        },
        isString: {
            errorMessage: "Tour name must be a string value",
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
            errorMessage: "Date format must be string value YYYY/MM/DD",
        },
    },
    end_date: {
        notEmpty: {
            errorMessage: "End date is required",
        },
        isString: {
            errorMessage: "Date format must be string value YYYY/MM/DD",
        },
    },
    venue_id: {
        notEmpty: {
            errorMessage: "Venue is required",
        },
        isNumeric: {
            errorMessage: "Venue ID must be an integer value",
        },
    },
    artist_id: {
        notEmpty: {
            errorMessage: "Artist ID is required",
        },
        isNumeric: {
            errorMessage: "Artist ID must be an integer value",
        },
    },
};

export const newTrackValidationSchema = {
    title: {
        notEmpty: {
            errorMessage: "Song title is required",
        },
        isString: {
            errorMessage: "Song title must be a string value",
        },
    },
    duration: {
        notEmpty: {
            errorMessage: "Duration is required",
        },
        isNumeric: {
            errorMessage: "Song duration must be an integer value (seconds)",
        },
    },
    filename: {
        notEmpty: {
            errorMessage: "Song title is required",
        },
        isString: {
            errorMessage: "Song title must be a string value",
        },
    },
    artist_id: {
        notEmpty: {
            errorMessage: "Artist ID is required",
        },
        isNumeric: {
            errorMessage: "Artist ID must be an integer value",
        },
    },
    album_id: {
        isNumeric: {
            errorMessage: "Album ID must be an integer value",
        },
    },
};

export const newVenueValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: "Name name is required",
        },
        isString: {
            errorMessage: "Venue name must be a string value",
        },
    },
    website_url: {
        isString: {
            errorMessage: "Website URL must be a string value",
        },
    },
    address: {
        notEmpty: {
            errorMessage: "Address is required",
        },
        isString: {
            errorMessage: "Address must be a string value",
        },
    },
    city: {
        notEmpty: {
            errorMessage: "City is required",
        },
        isString: {
            errorMessage: "City must be a string value",
        },
    },
    state: {
        notEmpty: {
            errorMessage: "State is required",
        },
        isString: {
            errorMessage: "State must be a string value",
        },
    },
    country: {
        notEmpty: {
            errorMessage: "Country is required",
        },
        isString: {
            errorMessage: "Country must be a string value",
        },
    },
    associated_tours: {
        notEmpty: {
            errorMessage: "Associated tour is required",
        },
        isNumeric: {
            errorMessage: "Tour ID must be an integer value",
        },
    },
};

export const newAccoladeValidationSchema = {
    award_name: {
        notEmpty: {
            errorMessage: "Award name is required",
        },
        isString: {
            errorMessage: "Award name must be a string value",
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
            errorMessage: "Category name must be a string value",
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
        isString: {
            errorMessage: "Date format must be string value YYYY/MM/DD",
        },
    },
};
