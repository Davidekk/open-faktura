import React from 'react';
import {BsLayoutTextSidebarReverse} from 'react-icons/bs'
import {BiLogOutCircle} from 'react-icons/bi'
import Wrapper from "../assets/wrappers/NavBar";
import {useAppContext} from "../context/AppContext";
import logo from "../assets/icons/logo.png";


function NavBar() {
    const {toggleSidebar, logoutUser} = useAppContext()

    return (
        <Wrapper>
            <div className="nav-center">
                <BsLayoutTextSidebarReverse className="icon-sidebar" onClick={toggleSidebar}/>
                <div className="title-navbar"><img src={logo} alt=""/>OpenFaktúra</div>
                <button className="nav-button" onClick={logoutUser}>Odhlásiť sa <BiLogOutCircle
                    className="icon-sidebar"/></button>
            </div>
        </Wrapper>
    );
}

export default NavBar;