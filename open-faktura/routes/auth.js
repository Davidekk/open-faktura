import express from "express";
import {register, login, update} from '../controllers/auth.js'
import authJWT from "../middleware/authJWT.js";
import rateLimit from "express-rate-limit";
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


const route = express.Router()

route.route("/register").post(limiter,register)
route.route("/login").post(limiter,login)
route.route("/update").post(authJWT, update)

export default route