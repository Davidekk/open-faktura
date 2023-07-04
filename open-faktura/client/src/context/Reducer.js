import {
    CLEAN_ERROR,
    CLIENT_DELETE_BEGIN,
    CLIENT_SET_ACTIVE,
    CLIENTS_CREATE_BEGIN,
    CLIENTS_CREATE_ERROR,
    CLIENTS_CREATE_SUCCESSFUL,
    CLIENTS_GET_BEGIN,
    CLIENTS_GET_SUCCESSFUL,
    EDITING_BEGIN, EDITING_END,
    HANDLE_CHANGE,
    INVOICE_ADD,
    INVOICE_ADD_BEGIN,
    INVOICE_ADD_ERROR,
    INVOICE_ADD_SUCCESS, INVOICE_COPY_BEGIN, INVOICE_COPY_SUCCESS,
    INVOICE_GET_BEGIN,
    INVOICE_GET_ERROR,
    INVOICE_GET_SUCCESS,
    TOGGLE_SIDEBAR,
    USER_LOGOUT,
    USER_PROFILE_BEGIN,
    USER_PROFILE_ERROR,
    USER_PROFILE_SUCCESSFUL,
    USER_SETUP_BEGIN,
    USER_SETUP_ERROR,
    USER_SETUP_SUCCESSFUL
} from "./Action";

const reducer = (state, action) => {

    switch (action.type) {
        case USER_SETUP_BEGIN:
            return {...state, isLoading: true}
        case USER_SETUP_SUCCESSFUL:
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                token: action.payload.token || state.token,
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
                ZIP: action.payload.ZIP,
                iban: action.payload.iban,
                name: action.payload.name,
                lastName: action.payload.lastName,
                swift: action.payload.swift
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
        case INVOICE_ADD:
            return {...state, invoiceToAdd: action.payload.invoice}
        case INVOICE_ADD_BEGIN:
            return {...state, isLoading: true}
        case INVOICE_ADD_SUCCESS:
            return {...state, isLoading: false}
        case INVOICE_ADD_ERROR:
            return {...state, errorShow: true, error: "Nastala chyba", isLoading: false}
        case INVOICE_GET_BEGIN:
            return {...state, isLoading: false}
        case INVOICE_GET_SUCCESS:
            return {...state, invoices: action.payload.invoices}
        case INVOICE_GET_ERROR:
            return {...state, errorShow: true, error: "Nastala chyba", isLoading: false}
        case EDITING_BEGIN:
            return {...state, invoiceEdit: action.payload.invoice, isEditing: true}
        case EDITING_END :
            return {...state,isEditing: false}
        case INVOICE_COPY_BEGIN:
            return {...state,isLoading: true}
        case INVOICE_COPY_SUCCESS:
            return {...state,isLoading: false}

    }

}


export default reducer