import { validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = {};
        errors.array().forEach(error => {
            formattedErrors[error.path] = error.msg;
        });
        return res.status(400).json(formattedErrors);
    }
    next();
};

export default validateRequest;
