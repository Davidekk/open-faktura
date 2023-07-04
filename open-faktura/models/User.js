import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
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
    email: {
        type: String,
        validate: {validator: validator.isEmail, message: "Please provide valid email"},
        require: [true, "Please provide email"],
        unique: true
    },
    password: {
        type: String,
        minLength: 6,
        select: false,
        require: [true, "Please provide user password"]
    },
})

UserSchema.pre("save", async function (next) {

    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10))

    next()

})

UserSchema.methods.createJWT = async function () {
    return await jwt.sign({userID: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXP})
}

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export default mongoose.model("User", UserSchema)