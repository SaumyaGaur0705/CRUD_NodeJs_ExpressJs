import { check } from "express-validator";
import pool from "../db.js";
import bcrypt from "bcrypt";
const loginValidation = [
    
    check('email', "Please enter an Email").notEmpty(),
    check('password',  "Please enter password").notEmpty()
];



export default loginValidation;
