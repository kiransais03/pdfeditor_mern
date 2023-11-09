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


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Pdfdisplay () {
    const [numPages, setNumPages] = useState(null);
    const [pdffile,setPdffile] = useState(null);

    let navigate = useNavigate();

    let pagesstringref = useRef("");

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
        let pdf = await axios.get(`${process.env.REACT_APP_URL}/actions/getpdf`,{headers:{"token-pdfeditor":`Bearer ${localStorage.getItem('token')}`,"Content-Type":"application/pdf"},responseType: 'arraybuffer'})
        
        console.log("after getting api",pdf)
        console.log(pdf.data,"pdf file object")

      //Converting received file to blob format
        const blob = new Blob([pdf.data], { type: 'application/pdf' });

        console.log("blob file",blob)
        setPdffile(blob);

            }
            catch(error) {
              toast.error(`Error: ${error.response.data.message}`)
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
    e.target.classList.remove('green');
    e.target.parentElement.classList.remove("green");
  }
  else {
    e.target.classList.add("green")
    console.log(e.target.parentElement,"parent");
    e.target.parentElement.classList.add("green");
  }
}

//Selected Pdf Pages numbers to string
const makepagestring = (pageno)=>{
  if(pagenostring.includes(pageno))
  {
    let tempstr1 = pagenostring.replace(pageno+",","");
    setPagenostring(tempstr1);
    pagesstringref.current=tempstr1
    console.log("remove",pagesstringref.current);

  }
  else {
    let tempstr2 = pagenostring+pageno+","
    setPagenostring(tempstr2);
    pagesstringref.current = tempstr2;
    console.log("add",pagesstringref.current)
  }
}

useEffect(()=>{
  console.log(pagenostring)
},[pagenostring])


let [loading,setLoading] = useState(false);


async function exportpdf() {
  try {
    setLoading(true);

    let bodyObj = {"pagenosstring":pagesstringref.current};

    console.log("new string",pagesstringref.current)

  let exportpdf = await axios.post(`${process.env.REACT_APP_URL}/actions/exportpdf`,bodyObj,{headers:{ "token-pdfeditor":`Bearer ${localStorage.getItem('token')}`},responseType:"arraybuffer"})

  console.log(exportpdf)

  let data1 = exportpdf.data;

  // const arrayBuffer1 = data1.arrayBuffer();

  const blob = new Blob([data1], { type: 'application/pdf' });

  const url = window.URL.createObjectURL(blob);

  const atag = document.createElement('a');
  atag.href=url;
  atag.setAttribute(
    'download',
    `${"edited"+localStorage.getItem('currPdf')}`,
  );
  document.body.appendChild(atag);
  atag.click();

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
     <button type="button" className="btn btn-primary btn-lg" onClick={exportpdf}>{loading? <div><div className="spinner-border spinner-border-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow spinner-grow-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div></div>:"Export & Download PDF"}</button>
     </div>
<p style={{textAlign:"center"}}>Filename : {localStorage.getItem('currPdf')}</p>
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
          (el, index) => (<div key={`key_${index+1}`} className="pdfpagedisp" >
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              height={400}
              renderAnnotationLayer={true}
            />
            <button type="button" className="btn active" aria-pressed="true" style={{textAlign:"center","width":"100%","backgroundColor":"grey"}} onClick={addPageno} id={index}>Click Here To Select {index+1}</button>
            </div>
          ),
        )}
      </Document>
       
      </>
    );
}

export default Pdfdisplay;