import React from 'react';
import Wrapper from "../assets/wrappers/LandingContainer";
import {Link, Navigate} from "react-router-dom";
import image from '../assets/logo.png'
import {useAppContext} from "../context/AppContext";
import Loading from "../components/Loading";

function Landing() {
    const { user,isLoading } = useAppContext();

    if (isLoading)
        return <Loading/>

    return (
        <React.Fragment>
            {user && <Navigate to='/' />}
            <Wrapper>
                <div className='container page'>
                    {/* info */}
                    <div className='info'>
                        <h1>
                            Faktúry <span>online</span>
                        </h1>
                        <p>
                            OpenFaktura je výkonná fakturačná platforma, ktorá vám umožňuje jednoducho vytvárať a spravovať faktúry. S intuitívnym rozhraním a profesionálnymi šablónami môžete generovať faktúry s prehľadným a atraktívnym vzhľadom. OpenFaktura je ideálnym nástrojom pre efektívnu fakturáciu a riadenie financií vašej spoločnosti.
                        </p>
                        <Link to='/register' className='btn btn-hero'>
                            Login/Register
                        </Link>
                    </div>
                    <img src={image} alt='job hunt' className='img main-img' />
                </div>
            </Wrapper>
        </React.Fragment>
    );
}

export default Landing;