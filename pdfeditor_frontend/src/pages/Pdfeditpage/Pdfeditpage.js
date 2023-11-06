import React,{useState} from "react";
import {toast} from "react-toastify";
import ResponsiveAppBar from "../../components/Navbar/ResponsiveAppBar";
import { useNavigate } from "react-router-dom";
import Pdfdisplay from "../../components/Pdfdisplay/Pdfdisplay";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

function Pdfeditpage () {

    let navigate = useNavigate();

    if(!localStorage.getItem('token'))
    {
      // toast.info("Please Login to your account")
      navigate('/login')
    }

    if(!localStorage.getItem('currPdf'))
    {
      navigate('/pdfupload')
    }

    return (<>
       <div>
         <ResponsiveAppBar/>
         <div style={{"backgroundColor":"whitesmoke"}}>
         <h2 style={{textAlign:"center",color:"black"}}>--Please Select the required pages to create a New PDF--</h2>
         <h3 style={{textAlign:"center",color:"black"}}>--PDF pages order will be as per the selection order--</h3>
         </div>
         <Pdfdisplay/>
       </div>
    </>)
}


export default Pdfeditpage;
