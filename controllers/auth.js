import {OK} from "http-status-codes";
import {BadRequestError, CustomAPIError, AuthorizationError} from '../error/index.js'
import User from "../models/User.js";
import Profile from "../models/Profile.js";


const checkLength = (length, text, label) => {
    if (text.length < length)
        throw new BadRequestError(`Hodnota ${label} musí mať aspoň ${length} znaky`)
}


const register = async (req, res) => {
    const {name, lastName, email, password} = req.body

    if (!name || !lastName || !email || !password) {
        throw new BadRequestError("Prosím zadajte všetky hodnoty")
    }
    checkLength(3, name, "\"Meno\"")
    checkLength(6, password, "\"Heslo\"")

    const userExists = await User.findOne({email: email})

    if (userExists)
        throw new BadRequestError("Užívazeľ už existuje")

    const user = await User.create({name, lastName, email, password})
    const profile = await Profile.create({userId: user._id})
    const token = await user.createJWT()


    res.status(OK).json({user, profile, token})

}

const login = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password)
        throw new BadRequestError("Prosím zadajte meno a heslo")

    const user = await User.findOne({email: email}).select("+password")

    if (!user)
        throw new BadRequestError("Zlé heslo alebo email")

    const checkPassword = await user.comparePassword(password)

    if (!checkPassword)
        throw new BadRequestError("Zlé heslo alebo email")

    const token = await user.createJWT()

    user.password = undefined
    res.status(OK).json({user, token})

}

const update = async (req, res) => {
    const {name, lastName} = req.body

    if (!name || !lastName)
        throw new BadRequestError("Prosím zadajte aspoň meno a priezvisko")


    const user = await User.findOne({_id: req.user.userId})

    if (!user)
        throw new AuthorizationError("Uživateľ nenájdený")

    const userUpdate = await User.findOneAndUpdate({_id: req.user.userId}, req.body, {
        new: true,
        runValidators: true
    })
    const token = await userUpdate.createJWT()


    res.status(OK).json({userUpdate, token})

}

export {register, login, update}