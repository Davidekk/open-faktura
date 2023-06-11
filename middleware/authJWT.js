import jwt from "jsonwebtoken";
import {AuthorizationError} from '../error/index.js'

const authJWT = async (req, res, next) => {
    const {authorization} = req.headers

    if (!authorization || !authorization.startsWith("Bearer"))
        throw new AuthorizationError("Authentication Invalid")

    const token = authorization.split(" ")[1]

    try {
        const tokenUser = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: tokenUser.userID}

    } catch (e) {
        throw new AuthorizationError("Authentication Invalid")
    }
    //return jwt.verify(token, process.env.JWT_SECRET)
    next()

}

export default authJWT