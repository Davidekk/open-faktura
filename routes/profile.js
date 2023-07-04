import express from "express";
import {getProfile, updateProfile} from "../controllers/profile.js";



const route = express.Router()

route.route("/").get(getProfile)
route.route("/update").post(updateProfile)

export default route