import React from 'react';
import {HashLoader} from "react-spinners";

function Loading() {
    return (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"40vh"}}><HashLoader color="#36d7b7"/></div>
    );
}

export default Loading;