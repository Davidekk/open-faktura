import express from "express";
import {register, login, update} from '../controllers/auth.js'
import authJWT from "../middleware/authJWT.js";

const route = express.Router()

route.route("/register").post(register)
route.route("/login").post(login)
route.route("/update").post(authJWT, update)

export default route