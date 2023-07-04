import {useAppContext} from "../context/AppContext";
import {Navigate, useNavigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {user} = useAppContext()

    if (!user)
        return <Navigate to="/landing"></Navigate>

    return children

}

export default ProtectedRoute