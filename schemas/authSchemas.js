import Joi from "joi";

import { emailRegExp } from "../db/constants/authConstants.js";

export const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().pattern(emailRegExp).required(),
    password: Joi.string().min(6).required(),
});


export const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegExp).required(),
})

export const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegExp).required(),
    password: Joi.string().min(6).required(),
});