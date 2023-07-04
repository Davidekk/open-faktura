import React from 'react';
import ClientList from "./ClientList";
import ClientAdd from "./ClientAdd";
import Loading from "../../../components/Loading";

function Clients() {


    return (
        <>
            <ClientAdd/>
            <ClientList/>
        </>
    );
}

export default Clients;