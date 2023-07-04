import React from 'react';
import Wrapper from '../../../assets/wrappers/Client'
import {AiOutlineCheck} from 'react-icons/ai'
import {BiTrashAlt} from 'react-icons/bi'
import {useAppContext} from "../../../context/AppContext";

function Client({name, lastName, street, city, zip, _id: id, email, businessID, taxID, phone, active, ZIP}) {
    const {removeClient, activeClient, setActiveClient} = useAppContext()

    const handleClick = (id) => {
        setActiveClient(id)
    }

    return (
        <Wrapper className={active ? "active" : 'un-active'}>
            <div className={active ? "module" : ''} onClick={() => handleClick(id)}>
                {active ? <AiOutlineCheck className="client-info"/> : ''}
                <h4>{name} {lastName}</h4>
                <div className="content">
                    <div>
                        <p>{phone}</p>
                        <p>{street}</p>
                        <p>{zip} {city}</p>
                    </div>
                    <div>
                        <p>{email}</p>
                        <p>{businessID}</p>
                        <p>{taxID}</p>

                    </div>
                </div>
                <BiTrashAlt className="remove-icon" onClick={() => removeClient(id)}/>
            </div>
        </Wrapper>
    );
}

export default Client;