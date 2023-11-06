import React,{useState} from "react";
import {toast} from "react-toastify";
import ResponsiveAppBar from "../../components/Navbar/ResponsiveAppBar";
import { useNavigate } from "react-router-dom";
import Pdfdisplay from "../../components/Pdfdisplay/Pdfdisplay";

function Pdfeditpage () {

    let navigate = useNavigate();

    if(!localStorage.getItem('currPdf'))
    {
      navigate('/pdfupload')
    }

    return (<>
       <div>
         <ResponsiveAppBar/>
         <Pdfdisplay/>
       </div>
    </>)
}


export default Pdfeditpage;
