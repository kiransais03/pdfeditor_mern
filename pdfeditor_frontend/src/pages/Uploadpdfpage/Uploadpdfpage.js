import React,{useEffect, useState} from 'react'
import "./uploadpdfpage-styles.css";
import { useNavigate } from 'react-router-dom';
import Fileinput from '../../components/Fileinput/Fileinput';
import { toast } from 'react-toastify';
import ResponsiveAppBar from '../../components/Navbar/ResponsiveAppBar';
import axios from 'axios';

function Uploadpdfpage() {

  let navigate= useNavigate();

  let [pdffile,setPdffile]=useState("");

  let [loading,setLoading]=useState(false);
  let [loading2,setLoading2]=useState(false);
  let [isDisabled,setisDisabled]= useState(false);

  function pdffileupload(files) {
    setPdffile(files);
  }

  async function uploadpdf () {
    if(!pdffile) {
      toast.error("Plese Select the File to upload");
      return ;
    }
   try {
    console.log("Uploading doc...")
         setLoading(true);

         const formData = new FormData();
           formData.append('pdffile',pdffile[0] );

           console.log(formData,"pdffile",pdffile[0])

         let uploadresponse = await axios.post(`${process.env.REACT_APP_URL}/actions/uploadpdf`,formData,{headers:{'Content-Type': 'multipart/form-data',"token-pdfeditor":`Bearer ${localStorage.getItem('token')}`}})

           setLoading(false);
           toast.success('Document Uploading Completed');
           console.log("Document Uploading Completed.")
           localStorage.setItem('currPdf',pdffile[0].name)
           setisDisabled(true);
           navigate('/pdfedit')
   }
   catch(error) {
    setLoading(false);
    console.log("Some Error Occured :",error)
    if(!error.response)
    {
      toast.error(`Error:${error.message}`);
    }
    else {
    toast.error(`Error:${error.response.data.message}`);
    } 
  }
  }

  useEffect(()=>{
    if(!localStorage.getItem('token'))
    {
      toast.info("Please Login to go to PDF Editor")
      navigate('/login')
    }
  },[])

  

  return (<>

    <div className='uploadpdfpagecontents'>
    <ResponsiveAppBar/>
    <div style={{fontFamily:"fantasy","backgroundColor":"green","textAlign":"center","width":"100%"}}>
    <h1>Format Pdf For Free</h1>
    <h2>Users trust to manage documents on pdfeditor platform</h2>
    </div>
      <Fileinput text="Click To Select PDF File"  accept="application/pdf" id="banner-img" filehandlingfunc={pdffileupload}/>
     {localStorage.getItem('currPdf') && <span className='colchange' style={{fontSize:"15px",display:"flex",justifyContent:"center",alignItems:"center"}}>Current Loaded File:{localStorage.getItem('currPdf')}</span> }
<div>
      {/* //Upload Button */}
      
<button onClick={uploadpdf} style={{marginTop:"5px"}} type="button" className="btn btn-primary">{loading ? <div><div className="spinner-border spinner-border-sm" role="status" disabled={isDisabled}>
  <span className="visually-hidden">Uploading...</span>
</div>
<div className="spinner-grow spinner-grow-sm" role="status">
  <span className="visually-hidden">Uploading...</span>
</div></div>: "Upload PDF"}</button>
</div>

</div>

    </>
  )
}

export default Uploadpdfpage