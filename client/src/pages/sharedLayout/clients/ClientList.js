import React, {useEffect, useState} from 'react';
import Wrapper from '../../../assets/wrappers/ClientsContainer'
import {useAppContext} from "../../../context/AppContext";
import Client from "./Client";
import Loading from "../../../components/Loading";

function ClientList() {
    const {getClients, clients,isLoading} = useAppContext()

    useEffect(() => {
        getClients()
    }, [])

    if (isLoading)
        return <Loading/>

    return (
        <Wrapper>
            <div className="client">
                {clients.map(val => <Client {...val} key={val._id}>{val.city}</Client>)}
            </div>

        </Wrapper>
    );
}

export default ClientList;