import {CustomAPIError} from "./index.js";
import {UNAUTHORIZED} from "http-status-codes";


class AuthorizationError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = UNAUTHORIZED
    }
}

export default AuthorizationError