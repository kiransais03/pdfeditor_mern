import React,{useEffect, useState,useRef} from "react";
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import axios from "axios";
import { toast } from "react-toastify";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import "./pdfdisplay-styles.css"
import Loader from "../Loader/Loader"
import { useNavigate } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function Pdfdisplay () {
    const [numPages, setNumPages] = useState(null);
    const [pdffile,setPdffile] = useState(null);

    let navigate = useNavigate();

    if(!localStorage.getItem('currPdf'))
    {
      navigate('/login')
    }

    if(!localStorage.getItem('currPdf'))
    {
      navigate('/pdfupload')
    }

    let ref1 = useRef();

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
      console.log("Hi onclIck")
    }

   
  
useEffect(()=>{

    const getpdffile = async ()=>{
            console.log("Getting pdf file")
            try {
        let pdf = await axios.get(`${process.env.REACT_APP_URL}/actions/getpdf`,{headers:{"token-pdfeditor":`Bearer ${localStorage.getItem('token')}`,"Content-Type":"application/pdf"},  responseType: 'arraybuffer' })
        
        console.log(pdf.data,"pdf file object")

      //Converting received file to blob format
        const blob = new Blob([pdf.data], { type: 'application/pdf' });
        setPdffile(blob);

            }
            catch(error) {
              toast.error("Error",error.response?.data?.message)
              console.log("Error1",error)
            }
    }

    if(localStorage.getItem('token')) {
    getpdffile();
    }
    else {
      navigate('/login')
    }

},[])

let [pagenostring,setPagenostring] = useState("");

function addPageno(e) {
  console.log(e.target.id);
  makepagestring(""+e.target.id);
  if(e.target.classList.contains('green'))
  {
    e.target.classList.remove('green')
  }
  else {
    e.target.classList.add("green")
  }
}

//Selected Pdf Pages numbers to string
const makepagestring = (pageno)=>{
  if(pagenostring.includes(pageno))
  {
    let tempstr = pagenostring.replace(pageno+",","");
    setPagenostring(tempstr);
    console.log("remove",pagenostring);

  }
  else {
    let tempstr = pagenostring+pageno+","
    setPagenostring(tempstr);
    console.log("add",pagenostring)
  }
}

useEffect(()=>{
  console.log(pagenostring)
},[pagenostring])


let [loading,setLoading] = useState(false);


async function exportpdf() {
  try {
    setLoading(true);
    let tempstring = pagenostring.slice(pagenostring.length-1)
    let bodyObj = {"pagenosstring":tempstring};
    console.log("new string",tempstring,pagenostring)
  let exportpdf = await axios.post(`${process.env.REACT_APP_URL}/actions/exportpdf`,bodyObj,{headers:{'Content-Type': 'application/pdf',"token-pdfeditor":`Bearer ${localStorage.getItem('token')}`}})

  console.log(exportpdf.data)
    setLoading(false);
  toast.success('Download started');
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
 

    return (<>
    <div className="d-flex justify-content-center" style={{margin:"10px"}}>
     <button type="button" class="btn btn-primary btn-lg" onClick={exportpdf}>{loading? <div><div className="spinner-border spinner-border-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow spinner-grow-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div></div>:"Export & Download PDF"}</button>
     </div>
      <Document
        file={pdffile}
        onLoadSuccess={onDocumentLoadSuccess}
        noData={<Loader/>}
        loading={<Loader/>}
        className={"d-flex flex-wrap justify-content-center"}
        inputRef ={ref1}
      >
        {Array.from(
          new Array(numPages),
          (el, index) => (<div className="pdfpagedisp" >
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              height={400}
              renderAnnotationLayer={true}
            />
            <button type="button" class="btn active" aria-pressed="true" style={{textAlign:"center","width":"100%","backgroundColor":"grey"}} onClick={addPageno} id={index}>{index+1}</button>
            </div>
          ),
        )}
      </Document>
       
      </>
    );
}

export default Pdfdisplay;