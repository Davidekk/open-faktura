import {BAD_REQUEST} from "http-status-codes";
import CustomAPIError from "./custom-API-error.js"

class BadRequestError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = BAD_REQUEST
    }
}

export default BadRequestError