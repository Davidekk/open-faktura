import mongoose from "mongoose";


const clientsSchema = new mongoose.Schema({
    street: {type: String, maxlength: 20, trim: true, default: ""},
    city: {type: String, maxlength: 20, trim: true, default: "Mesto"},
    zip: {type: String, maxlength: 20, trim: true, default: ""},
    active: {type: Boolean, default: false},
    email: {
        type: String,
        require: [true, "Please provide email"]
    },
    phone: {type: String, default: ""},
    businessID: {type: String, maxlength: 20, trim: true, default: ""},
    taxID: {type: String, maxlength: 20, trim: true, default: ""},
    name: {
        type: String,
        require: [true, "Please provide user name"],
        maxLength: 20
    },
    lastName: {
        type: String,
        require: [true, "Please provide last name"],
        maxLength: 20,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "Please provide user"]
    },

}, {timestamps: true})


export default mongoose.model("Clients", clientsSchema)