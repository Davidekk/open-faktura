import Wrapper from "../../../assets/wrappers/FormDashboard";

import React, {useEffect} from 'react';
import FormRow from "../../../components/FormRow";
import {useAppContext} from "../../../context/AppContext";
import Loading from "../../../components/Loading";

function Profile() {

    const {
        handleChange, getProfile, user, phone,
        businessID,
        taxID,
        street,
        city,
        district,
        iban,
        lastName,
        name,
        updateAccount,
        isLoading
    } = useAppContext()

    const handleChangeInput = (e) => {
        const {name, value} = e.target
        handleChange({name, value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateAccount()

    }

    useEffect(() => {
        getProfile()

    }, [])

    if (isLoading)
        return <Loading/>

    return (
        <Wrapper>
            <h2>Profil</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-center">
                    <FormRow type="text" name="name" labelText="Meno" handleChange={handleChangeInput}
                             value={name || ""}/>
                    <FormRow type="text" name="lastName" labelText="Priezvisko" handleChange={handleChangeInput}
                             value={lastName || ""}/>
                    <FormRow type="text" name="phone" labelText="Telefón" handleChange={handleChangeInput}
                             value={phone || ""}/>
                    <FormRow type="text" name="businessID" labelText="IČO" handleChange={handleChangeInput}
                             value={businessID || ""}/>
                    <FormRow type="text" name="taxID" labelText="DIČ" handleChange={handleChangeInput} value={taxID}/>

                </div>
                <h4>Adresa:</h4>
                <div className="form-center">
                    <FormRow name="street" labelText="Ulica" handleChange={handleChangeInput} value={street || ""}/>
                    <FormRow name="city" labelText="Mesto" handleChange={handleChangeInput} value={city || ""}/>
                    <FormRow name="district" labelText="Okres" handleChange={handleChangeInput} value={district || ""}/>
                </div>
                <h4></h4>
                <div className="form-center-solo">
                    <FormRow type="text" name="iban" labelText="IBAN" handleChange={handleChangeInput}
                             value={iban || ""}/>
                </div>

                <button type="submit" className="btn btn-block">Nastaviť</button>
            </form>

        </Wrapper>
    );
}

export default Profile;