import express from "express";
import { authsignup, authlogin, usernamedata } from "../logic/auth.js";
import signupValidation from "../Middleware/checkSignUpValidate.js"
import loginValidation from "../Middleware/checkLogInValidate.js";
import validateRequest from "../validation/signUpValidationresult.js"
import validateLoginRequest from "../validation/logInValidationresult.js";
const router=express.Router();

//router.post('/signup',validate(register), authsignup);
router.post('/signup',signupValidation,validateRequest,authsignup)
router.post('/login',loginValidation,validateLoginRequest,authlogin);
router.get('/usernames',usernamedata);
export default router;