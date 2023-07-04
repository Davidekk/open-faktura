import express from "express";
import {createClient, deleteClient, getClients, updateClient} from "../controllers/clients.js";

const route = express.Router()

route.route("/").get(getClients).post(createClient)
route.route("/:id").delete(deleteClient)
route.route('/update').post(updateClient)


export default route