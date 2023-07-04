import {createContext, useContext, useReducer} from "react";
import reducer from "./Reducer";
import {
    CLEAN_ERROR,
    CLIENT_DELETE_BEGIN,
    CLIENT_SET_ACTIVE,
    CLIENTS_CREATE_BEGIN,
    CLIENTS_CREATE_ERROR,
    CLIENTS_CREATE_SUCCESSFUL,
    CLIENTS_GET_BEGIN,
    CLIENTS_GET_ERROR,
    CLIENTS_GET_SUCCESSFUL,
    EDITING_BEGIN,
    EDITING_END,
    HANDLE_CHANGE,
    INVOICE_ADD,
    INVOICE_ADD_BEGIN,
    INVOICE_ADD_ERROR,
    INVOICE_ADD_SUCCESS,
    INVOICE_COPY_BEGIN,
    INVOICE_COPY_ERROR,
    INVOICE_COPY_SUCCESS,
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
import axios from "axios";

const user = JSON.parse(localStorage.getItem('user'))
const token = localStorage.getItem('token')

const initialState = {
    isMember: false,
    isLoading: false,
    token: token || "",
    user: user,
    error: '',
    errorShow: false,
    showSideBar: false,
    lastName: user?.lastName || '',
    name: user?.name || '',
    phone: '',
    businessID: '',
    taxID: '',
    street: '',
    city: '',
    ZIP: '',
    iban: '',
    swift: '',
    clients: [],
    activeClient: null,
    invoiceToAdd: [],
    invoices: [],
    isEditing: false,
    invoiceEdit: [],
}


const AppContext = createContext()


const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)


    const authFetch = axios.create({
        baseURL: '/api/v1/',

    })
    authFetch.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${state.token}`
        return config
    }, (error) => {
        return Promise.reject(error)
    })

    authFetch.interceptors.response.use((response) => {
        return response

    }, (error) => {
        if (error.response.status === 401) logoutUser()
        return Promise.reject(error)
    })

    const cleanError = () => {
        setTimeout(() => {
            dispatch({type: CLEAN_ERROR})
        }, 3000)

    }

    const localStorageAdd = ({token, user}) => {
        if (token) localStorage.setItem("token", token)
        if (user) localStorage.setItem("user", JSON.stringify(user))

    }
    const localStorageRemove = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")

    }

    const registerUser = async ({name, lastName, email, password}) => {
        dispatch({type: USER_SETUP_BEGIN})

        try {
            const response = await axios.post('/api/v1/auth/register', {
                name, lastName, email, password
            })
            const {token, user} = response.data
            localStorageAdd({token, user})
            dispatch({type: USER_SETUP_SUCCESSFUL, payload: {user, token}})

        } catch (e) {
            dispatch({type: USER_SETUP_ERROR, payload: {msg: e.response.data.msg}})

        }
        cleanError()


    }

    const loginUser = async ({email, password}) => {
        dispatch({type: USER_SETUP_BEGIN})

        try {
            const response = await axios.post('/api/v1/auth/login', {
                email, password
            })
            const {token, user} = response.data
            await localStorageAdd({token, user})
            dispatch({type: USER_SETUP_SUCCESSFUL, payload: {user, token}})


        } catch (e) {
            dispatch({type: USER_SETUP_ERROR, payload: {msg: e.response.data.msg}})
        }
        cleanError()

    }
    const logoutUser = () => {
        localStorageRemove()
        dispatch({type: USER_LOGOUT})

    }

    const toggleSidebar = () => {
        dispatch({type: TOGGLE_SIDEBAR})
    }

    const handleChange = ({name, value}) => {
        dispatch({type: HANDLE_CHANGE, payload: {name, value}})

    }

    const updateAccount = async () => {
        dispatch({type: USER_SETUP_BEGIN})

        try {
            const response = await authFetch.post("/profile/update", {...state})
            const {user} = response.data
            localStorageAdd({token: null, user})
            dispatch({type: USER_SETUP_SUCCESSFUL, payload: {user}})
        } catch (e) {
            if (e.response.status === 401) return
            dispatch({type: USER_SETUP_ERROR})

        }
    }

    const getProfile = async () => {
        dispatch({type: USER_PROFILE_BEGIN})

        try {
            const {data} = await authFetch.get("/profile")

            const {
                phone, businessID, taxID, street, city, ZIP, iban, swift
            } = data.profile


            dispatch({
                type: USER_PROFILE_SUCCESSFUL, payload: {
                    phone, businessID, taxID, street, city, ZIP, iban, name: state.name, lastName: state.lastName, swift
                }
            })
        } catch (e) {
            if (e.response.status === 401) return
            dispatch({type: USER_PROFILE_ERROR, payload: {msg: e.response.data.msg}})
        }

    }

    const getClients = async () => {
        dispatch({type: CLIENTS_GET_BEGIN})

        try {
            const response = await authFetch.get('/clients')
            const {clients} = response.data
            clients.map(val => {
                if (val.active) dispatch({type: CLIENT_SET_ACTIVE, payload: val})
            })
            dispatch({type: CLIENTS_GET_SUCCESSFUL, payload: {clients}})

        } catch (e) {
            if (e.response.status === 401) return
            dispatch({type: CLIENTS_GET_ERROR, payload: {msg: e.response.data.msg}})
        }
    }

    const setActive = async (client) => {
        dispatch({type: CLIENT_SET_ACTIVE, payload: client})
    }

    const removeClient = async (id) => {
        dispatch({type: CLIENT_DELETE_BEGIN})

        try {
            await authFetch.delete(`clients/${id}`)
            await getClients()

        } catch (e) {

            if (e.response.status === 401) return
            dispatch({type: CLIENTS_GET_ERROR, payload: {msg: e.response.data.msg}})

        }

    }

    const addClient = async (client) => {
        dispatch({type: CLIENTS_CREATE_BEGIN})

        try {
            const {
                name, lastName, city, street, zip, phone, businessID, email, taxID
            } = client

            if (!name || !lastName || !city || !street || !zip || !phone || !businessID || !email || !taxID) {
                dispatch({type: CLIENTS_CREATE_ERROR})
                cleanError()
                return
            }

            await authFetch.post('clients', {
                ...client
            })
            await getClients()
            dispatch({type: CLIENTS_CREATE_SUCCESSFUL})
        } catch (e) {
            console.log(e)
            if (e.response.status === 401) return
            dispatch({type: CLIENTS_GET_ERROR, payload: {msg: e.response.data.msg}})
        }
    }

    const setActiveClient = async (id) => {
        dispatch({type: CLIENTS_CREATE_BEGIN})
        try {
            await authFetch.post('/clients/update', {
                setActive: id, setInActive: state.activeClient
            })
            await getClients()
            dispatch({type: CLIENTS_CREATE_SUCCESSFUL})

        } catch (e) {
            if (e.response.status === 401) return
            dispatch({type: CLIENTS_GET_ERROR, payload: {msg: e.response.data.msg}})
        }

    }

    const addInvoiceToDB = async (invoiceObj) => {
        dispatch({type: INVOICE_ADD_BEGIN})
        try {
            await authFetch.post('/invoice', {
                invoiceObj
            })
            dispatch({type: INVOICE_ADD_SUCCESS})

        } catch (e) {
            console.log(e)
            if (e.response.status === 401) return
            dispatch({type: INVOICE_ADD_ERROR, payload: {msg: e.response.data.msg}})
        }

    }

    const getInvoices = async () => {
        dispatch({type: INVOICE_GET_BEGIN})
        try {
            const response = await authFetch.get('/invoice')
            const {invoices} = response.data
            dispatch({type: INVOICE_GET_SUCCESS, payload: {invoices}})

        } catch (e) {
            if (e.response.status === 401) return
            dispatch({type: INVOICE_GET_ERROR, payload: {msg: e.response.data.msg}})
        }

    }

    const addInvoice = (invoice) => {
        dispatch({type: INVOICE_ADD, payload: {invoice}})

    }

    const editInvoice = (invoice) => {
        dispatch({type: EDITING_BEGIN, payload: {invoice}})

    }
    const removeEdit = () => {
        dispatch({type: EDITING_END})
    }

    const handleInvoice = async (id, deleteInvoice = false) => {
        console.log(deleteInvoice)
        dispatch({type: INVOICE_COPY_BEGIN})
        try {
            if (!deleteInvoice)
                await authFetch.post("/invoice/copy", {
                    invoiceId: id
                })
            else {
                await authFetch.delete( `invoice/${id}`)
            }
            await getInvoices()
            dispatch({type: INVOICE_COPY_SUCCESS})
        } catch (e) {

            dispatch({type: INVOICE_COPY_ERROR, payload: {msg: e.response.data.msg}})

        }
    }


    return <AppContext.Provider
        value={{
            ...state,
            registerUser,
            loginUser,
            toggleSidebar,
            handleChange,
            logoutUser,
            getProfile,
            updateAccount,
            getClients,
            removeClient,
            addClient,
            setActiveClient,
            addInvoice,
            addInvoiceToDB,
            getInvoices,
            editInvoice,
            removeEdit,
            handleInvoice,
            setActive
        }}>
        {children}
    </AppContext.Provider>
}


const useAppContext = () => {
    return useContext(AppContext)
}

export {useAppContext, initialState, AppProvider}