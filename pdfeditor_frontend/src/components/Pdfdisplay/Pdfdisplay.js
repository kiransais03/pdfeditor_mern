import React,{useEffect, useState} from "react";
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function Pdfdisplay () {
    const [numPages, setNumPages] = useState(null);
    const [pdffile,setPdffile] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
  
useEffect(()=>{

    const getpdffile = async ()=>{

        let pdf = await axios.get(`${process.env.REACT_APP_URL}/actions/getpdf`,{headers:{"token-pdfeditor":`Bearer ${localStorage.getItem('token')}`}})
         setPdffile(pdf);
    }

    getpdffile();

},[])

    return (
      <Document
        file={pdffile}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(
          new Array(numPages),
          (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
            />
          ),
        )}
      </Document>
    );
}

export default Pdfdisplay;