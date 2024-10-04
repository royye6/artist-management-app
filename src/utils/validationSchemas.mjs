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
            errorMessage:
                "Email must be at between 12 and 225 characters long",
        },
        isString: {
            errorMessage: "Email must be a string",
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
            errorMessage:
                "Email must be at between 8 and 225 characters long",
        },
    },
};