import mongoose from "mongoose";


const profileSchema = new mongoose.Schema({
    phone: {type: String, default: ""},
    businessID: {type: String, maxlength: 20, trim: true, default: ""},
    taxID: {type: String, maxlength: 20, trim: true, default: ""},
    street: {type: String, maxlength: 20, trim: true, default: ""},
    city: {type: String, maxlength: 20, trim: true, default: "Mesto"},
    ZIP: {type: String, maxlength: 20, trim: true, default: ""},
    iban: {type: String, trim: true, default: ""},
    swift: {type: String, trim: true, default: ""},
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "Please provide user"]
    },

}, {timestamps: true})

export default mongoose.model("Profile", profileSchema)