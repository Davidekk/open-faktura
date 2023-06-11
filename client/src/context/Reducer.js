import {
    CLEAN_ERROR,
    CLIENT_DELETE_BEGIN,
    CLIENT_SET_ACTIVE,
    CLIENTS_CREATE_BEGIN, CLIENTS_CREATE_ERROR, CLIENTS_CREATE_SUCCESSFUL,
    CLIENTS_GET_BEGIN,
    CLIENTS_GET_SUCCESSFUL,
    HANDLE_CHANGE,
    TOGGLE_SIDEBAR,
    USER_LOGOUT,
    USER_PROFILE_BEGIN,
    USER_PROFILE_ERROR,
    USER_PROFILE_SUCCESSFUL,
    USER_SETUP_BEGIN,
    USER_SETUP_ERROR,
    USER_SETUP_SUCCESSFUL
} from "./Action";
import {initialState} from "./AppContext";

const reducer = (state, action) => {


    switch (action.type) {
        case USER_SETUP_BEGIN:
            return {...state, isLoading: true}
        case USER_SETUP_SUCCESSFUL:
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                token: action.payload.token,
                name: action.payload.user.name,
                lastName: action.payload.user.lastName
            }
        case USER_SETUP_ERROR:
            return {...state, errorShow: true, error: action.payload.msg, isLoading: false}
        case CLEAN_ERROR:
            return {...state, errorShow: false, error: ''}
        case TOGGLE_SIDEBAR:
            return {...state, showSideBar: !state.showSideBar}
        case HANDLE_CHANGE:
            return {...state, [action.payload.name]: action.payload.value}
        case USER_LOGOUT:
            return {...state, user: null, token: null}
        case USER_PROFILE_BEGIN:
            return {...state, isLoading: true}
        case USER_PROFILE_SUCCESSFUL:
            return {
                ...state, isLoading: false,
                phone: action.payload.phone,
                businessID: action.payload.businessID,
                taxID: action.payload.taxID,
                street: action.payload.street,
                city: action.payload.city,
                district: action.payload.district,
                iban: action.payload.iban,
                name: action.payload.name,
                lastName: action.payload.lastName
            }
        case USER_PROFILE_ERROR:
            return {...state, errorShow: true, error: action.payload.msg, isLoading: false}
        case CLIENTS_GET_BEGIN:
            return {...state, isLoading: true}
        case CLIENTS_GET_SUCCESSFUL:
            return {...state, isLoading: false, clients: action.payload.clients}
        case CLIENT_DELETE_BEGIN:
            return {...state, isLoading: true}
        case CLIENT_SET_ACTIVE:
            return {...state, activeClient: action.payload}
        case CLIENTS_CREATE_BEGIN:
            return {...state, isLoading: true}
        case CLIENTS_CREATE_SUCCESSFUL:
            return {...state, isLoading: false}
        case CLIENTS_CREATE_ERROR:
            return {...state, errorShow: true, error: "Prosím zadajte všetky hodnoty", isLoading: false}


    }

}


export default reducer