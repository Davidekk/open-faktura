import React, {useEffect, useState} from 'react';
import Wrapper from '../../../assets/wrappers/ClientsContainer'
import {useAppContext} from "../../../context/AppContext";
import Client from "./Client";

function ClientList() {
    const {getClients, clients, activeClient} = useAppContext()
    const [clientsArray,setClientsArray] = useState(clients)

    useEffect(() => {
        getClients()
    }, [])

    useEffect(()=>{
        setClientsArray(clients)
    },[activeClient])

    return (
        <Wrapper>
            <div className="client">
                {clientsArray.map(val => <Client {...val} active={true} key={val._id}>{val.city}</Client>)}
            </div>

        </Wrapper>
    );
}

export default ClientList;