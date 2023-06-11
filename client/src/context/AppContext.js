import {createContext, useContext, useReducer} from "react";
import reducer from "./Reducer";
import {
    CLEAN_ERROR,
    CLIENT_DELETE_BEGIN,
    CLIENT_SET_ACTIVE,
    CLIENTS_CREATE_BEGIN, CLIENTS_CREATE_ERROR, CLIENTS_CREATE_SUCCESSFUL,
    CLIENTS_GET_BEGIN,
    CLIENTS_GET_ERROR,
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
    district: '',
    iban: '',
    clients: [],
    activeClient: null
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
        if (error.response.status === 401)
            logoutUser()
        return Promise.reject(error)
    })

    const cleanError = () => {
        setTimeout(() => {
            dispatch({type: CLEAN_ERROR})
        }, 3000)

    }

    const localStorageAdd = ({token, user}) => {
        console.log(token, user)
        if (token)
            localStorage.setItem("token", token)
        if (user)
            localStorage.setItem("user", JSON.stringify(user))

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
            localStorageAdd({token, user})
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
            localStorageAdd({user})
            dispatch({type: USER_SETUP_SUCCESSFUL, payload: {user, token}})

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
                phone,
                businessID,
                taxID,
                street,
                city,
                district,
                iban
            } = data.profile


            dispatch({
                type: USER_PROFILE_SUCCESSFUL, payload: {
                    phone,
                    businessID,
                    taxID,
                    street,
                    city,
                    district,
                    iban,
                    name: state.name,
                    lastName: state.lastName
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
                if (val.active)
                    dispatch({type: CLIENT_SET_ACTIVE, payload: val._id})
            })
            dispatch({type: CLIENTS_GET_SUCCESSFUL, payload: {clients}})

        } catch (e) {
            if (e.response.status === 401) return
            dispatch({type: CLIENTS_GET_ERROR, payload: {msg: e.response.data.msg}})
        }


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
                name,
                lastName,
                city,
                street,
                zip,
                phone,
                businessID,
                email,
                taxID
            } = client

            if (!name ||
                !lastName ||
                !city ||
                !street ||
                !zip ||
                !phone ||
                !businessID ||
                !email ||
                !taxID) {
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
            if (e.response.status === 401) return
            dispatch({type: CLIENTS_GET_ERROR, payload: {msg: e.response.data.msg}})
        }
    }

    const setActiveClient = async (id) => {
        dispatch({type: CLIENTS_CREATE_BEGIN})
        try {
            await authFetch.post('/clients/update', {
                setActive: id,
                setInActive: state.activeClient
            })
            dispatch({type: CLIENTS_CREATE_SUCCESSFUL})

        } catch (e) {
            if (e.response.status === 401) return
            dispatch({type: CLIENTS_GET_ERROR, payload: {msg: e.response.data.msg}})
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
            setActiveClient
        }}>
        {children}
    </AppContext.Provider>
}


const useAppContext = () => {
    return useContext(AppContext)
}

export {useAppContext, initialState, AppProvider}