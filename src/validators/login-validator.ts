import { checkSchema } from "express-validator"

export default checkSchema({
    email: {
        errorMessage: "Email is required!",
        notEmpty: true,
        trim: true,
    },
    password: {
        trim: true,
        errorMessage: "Last name is required",
        notEmpty: true,
    },
})

// export const registerValidators = [
//     body('email').isEmail().withMessage('Invalid email address'),

// ]
