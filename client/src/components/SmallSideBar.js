import React from 'react';
import Wrapper from "../assets/wrappers/SmallSideBar";
import NavLinks from "./NavLinks";
import {useAppContext} from "../context/AppContext";
import {CgProfile} from "react-icons/cg";
import {useNavigate} from "react-router-dom";

function SmallSideBar() {
    const {showSideBar, toggleSidebar, user} = useAppContext()
    const navigate = useNavigate()

    return (
        <Wrapper>

            <div className={showSideBar ? "sidebar-container" : "sidebar-container show-sidebar"}
                 onClick={toggleSidebar}>
                <div className="content">
                    <header onClick={() => navigate('/profile')}>
                        <CgProfile className='sidebar-icon'/>
                        <p className="sidebar-name">{user.name}</p>
                    </header>
                    <NavLinks/>
                </div>
            </div>
        </Wrapper>
    );
}

export default SmallSideBar;