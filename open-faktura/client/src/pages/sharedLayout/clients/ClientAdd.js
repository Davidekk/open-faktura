import React, {useEffect, useState} from 'react';
import Wrapper from "../../../assets/wrappers/FormDashboard";
import FormRow from "../../../components/FormRow";
import {useAppContext} from "../../../context/AppContext";
import Loading from "../../../components/Loading";
import {toast, ToastContainer} from "react-toastify";
import {printFormat} from "iban";


const initialState = {
    name: '',
    lastName: '',
    city: '',
    street: '',
    zip: '',
    phone: '',
    businessID: '',
    email: '',
    taxID: '',
    swift:'',
    iban:'',
    bankName:'',
}

function ClientAdd() {
    const [state, setState] = useState(initialState)
    const {addClient, isLoading, errorShow, error} = useAppContext()

    const notify = () => toast(`${error}`);

    const handleChange = e => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        addClient(state)
    }

    useEffect(() => {
        if (errorShow)
            notify()
    }, [errorShow])

    if (isLoading)
        return <Loading/>

    return (
        <Wrapper>
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

            <form className="form" onSubmit={handleSubmit}>
                <div className="form-center">
                    <FormRow type="text" name="name" labelText="Meno" handleChange={handleChange}
                             value={state.name || ""}/>
                    <FormRow type="text" name="lastName" labelText="Priezvisko" handleChange={handleChange}
                             value={state.lastName || ""}/>
                    <FormRow type="text" name="phone" labelText="Telefón" handleChange={handleChange}
                             value={state.phone || ""}/>
                    <FormRow type="text" name="businessID" labelText="IČO" handleChange={handleChange}
                             value={state.businessID || ""}/>
                    <FormRow type="text" name="taxID" labelText="DIČ" handleChange={handleChange} value={state.taxID}/>
                    <FormRow type="text" name="email" labelText="email" handleChange={handleChange}
                             value={state.email || ""}/>

                </div>
                <h4>Adresa:</h4>
                <div className="form-center">
                    <FormRow name="street" labelText="Ulica" handleChange={handleChange} value={state.street || ""}/>
                    <FormRow name="city" labelText="Mesto" handleChange={handleChange} value={state.city || ""}/>
                    <FormRow name="zip" labelText="PSČ" handleChange={handleChange} value={state.zip || ""}/>
                </div>
                <div className="form-center-duo">
                    <FormRow type="text" name="iban" labelText="IBAN" handleChange={handleChange}
                             value={printFormat(state.iban) || ""}/>
                    <FormRow name="swift" labelText="SWIFT/BIC" handleChange={handleChange} value={state.swift || ""}/>
                </div>
                <h4></h4>
                <button type="submit" className="btn btn-block">Nastaviť</button>
            </form>
        </Wrapper>
    );
}

export default ClientAdd;