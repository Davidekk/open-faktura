import mongoose from "mongoose";


const invoiceSchema = new mongoose.Schema({
    createdBy: {type: String, default: ""},
    invoices: {type: Object, maxlength: 20, trim: true, default: ""},

}, {timestamps: true})

export default mongoose.model("Invoice", invoiceSchema)