import {OK} from "http-status-codes";
import {AuthorizationError, BadRequestError} from "../error/index.js";
import Profile from "../models/Profile.js";
import checkPermission from "../utils/CheckPermission.js";
import User from "../models/User.js";


const getProfile = async (req, res) => {
    const profile = await Profile.findOne({userId: req.user.userId})


    if (!profile)
        throw new AuthorizationError("Uživateľ nenájdený")



    res.status(OK).json({profile})

}

const updateProfile = async (req, res) => {
    const {name, lastName} = req.body

    if (!name || !lastName)
        throw new BadRequestError("Zadajte aspoň meno a priezvisko")


    const profile = await Profile.findOne({userId: req.user.userId})

    if (!profile)
        throw new AuthorizationError("Uživateľ nenájdený")

    checkPermission(req.user.userId, profile.userId.toString())

    const updateProfile = await Profile.findOneAndUpdate({userId: req.user.userId}, req.body, {
        new: true,
        runValidators: true
    })

    const user = await User.findById({_id: req.user.userId})

    user.name = name
    user.lastName = lastName


    await user.save()

    res.status(OK).json({user, updateProfile})

}


export {getProfile, updateProfile}