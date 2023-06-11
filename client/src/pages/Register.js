import Wrapper from '../assets/wrappers/Register'
import FormRow from "../components/FormRow";
import {useEffect, useState} from "react";
import {useAppContext} from "../context/AppContext";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../components/Loading";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";


const initialState = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    isMember: false
}

function Register() {
    const [value, setValue] = useState(initialState)
    const navigate = useNavigate()
    const {registerUser, isLoading, user, loginUser, errorShow, error} = useAppContext()

    console.log(errorShow)
    const notify = () => toast(`${error}`);
    const handleChange = (e) => {

        setValue({...value, [e.target.name]: e.target.value})
    }

    const handleUser = (e) => {
        e.preventDefault()
        if (!value.isMember) {
            registerUser({name: value.name, lastName: value.lastName, email: value.email, password: value.password})
        } else {
            loginUser({email: value.email, password: value.password})
        }

    }

    useEffect(() => {
        if (user && user !== undefined) {
            navigate("/")
        }
    }, [user])

    useEffect(() => {
        if (errorShow)
            notify()
    }, [errorShow])

    if (isLoading)
        return <Loading/>


    return (
        <Wrapper className="full-page">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <form className="form" onSubmit={handleUser}>
                <h3> {value.isMember ? "Prihlásenie" : "Registrácia"}</h3>

                {!value.isMember ?
                    <div className='register-form'>
                        <FormRow type="text" name="name" labelText="meno"
                                 handleChange={(e) => handleChange(e)}
                                 value={value.name}/>
                        <FormRow type="text" name="lastName"
                                 labelText="Priezvisko"
                                 handleChange={(e) => handleChange(e)}
                                 value={value.lastName}/></div>
                    : ''}
                <FormRow type="email" name="email" handleChange={(e) => handleChange(e)} value={value.email}/>
                <FormRow type="password" name="password" labelText="heslo" handleChange={(e) => handleChange(e)}
                         value={value.password}/>

                <p> {value.isMember ? "Pre registráciu " : "Už zaregistrovaný? "} <span className="title-colored"
                                                                                        onClick={() => setValue({
                                                                                            ...value,
                                                                                            isMember: !value.isMember
                                                                                        })}>Klikni sem!</span></p>
                <button type="submit"
                        className="btn btn-block"> {!value.isMember ? "Registrovať" : "Prihlásiť"}</button>
            </form>
        </Wrapper>
    );
}

export default Register;