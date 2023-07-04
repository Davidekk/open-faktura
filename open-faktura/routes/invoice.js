import express from "express";
import {addInvoice, copyInvoice, deleteInvoice, getInvoice} from "../controllers/invoice.js";

const route = express.Router()

route.route("/").post(addInvoice).get(getInvoice)
route.route('/copy').post(copyInvoice)
route.route('/:id').delete(deleteInvoice)

export default route