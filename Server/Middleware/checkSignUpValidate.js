import { check } from "express-validator";
import pool from "../db.js";
import bcrypt from "bcrypt";
import { checkemailexists, adduser } from "../queries/auth.js";
const signupValidation = [
    check('firstname', "Please enter first name").notEmpty(),
    check('lastname', "Please enter last name").notEmpty(),
    check('email', "Please enter an Email").notEmpty(),
    check('email', "Email is invalid").isEmail(),
    check('password', "").custom((value) => {
        if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value) || value.length < 6) {
            throw new Error('Password must be at least 6 characters long with at least one letter and one number');
        }
        return true;
    }),
    check('email', "").custom(async (value) => {
        try {
            const { rows } = await pool.query(checkemailexists, [value]);
            if (rows.length > 0) {
                throw new Error("Email already exists");
            }
        } catch (err) {
            throw new Error(err.message); // Propagate the error message
        }
    })
];



export default signupValidation;
