import mongoose from "mongoose";
import validator from "validator";


const clientsSchema = new mongoose.Schema({
    street: {type: String, maxlength: 20, trim: true, default: ""},
    city: {type: String, maxlength: 20, trim: true, default: "Mesto"},
    zip: {type: String, maxlength: 20, trim: true, default: ""},
    active: {type: Boolean, default: false},
    email: {
        type: String,
        validate: {validator: validator.isEmail, message: "Please provide valid email"},
        require: [true, "Please provide email"],
        unique: true
    },
    phone: {type: String, default: ""},
    businessID: {type: String, maxlength: 20, trim: true, default: ""},
    taxID: {type: String, maxlength: 20, trim: true, default: ""},
    name: {
        type: String,
        require: [true, "Please provide user name"],
        maxLength: 20,
        minLength: 3
    },
    lastName: {
        type: String,
        require: [true, "Please provide last name"],
        maxLength: 20,
        minLength: 3
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "Please provide user"]
    },

}, {timestamps: true})


export default mongoose.model("Clients", clientsSchema)