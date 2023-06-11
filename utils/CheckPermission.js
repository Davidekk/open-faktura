import {AuthorizationError} from "../error/index.js";


const checkPermission = (userID, profileID) => {

    if (userID !== profileID)
        throw new AuthorizationError('Not authorized to this route')


}


export default checkPermission