import React from 'react';
import Wrapper from "../assets/wrappers/BigSideBar";
import {CgProfile} from 'react-icons/cg'
import NavLinks from "./NavLinks";
import {useAppContext} from "../context/AppContext";
import logo from '../assets/icons/logo.png'
import {useNavigate} from "react-router-dom";

function BigSideBar() {
    const {showSideBar, user} = useAppContext()
    const navigate = useNavigate()

    return (
        <Wrapper>
            <div className={showSideBar ? "sidebar-container" : "sidebar-container show-sidebar"}>
                <div className="content">
                    <header onClick={() => navigate('/profile')}>
                        <CgProfile className='sidebar-icon'/>
                        <p className="sidebar-name">{user.name} {user.lastName.charAt(0)}.</p>
                    </header>
                    <NavLinks/>
                </div>
            </div>
        </Wrapper>
    );
}

export default BigSideBar;