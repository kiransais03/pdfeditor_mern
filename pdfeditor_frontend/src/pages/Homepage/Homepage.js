import React,{useState,useEffect} from "react";
import ResponsiveAppBar from "../../components/Navbar/ResponsiveAppBar";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import img1 from "../../images/111.jpg"
import img2 from "../../images/222.jpeg"
import img3 from "../../images/333.webp"
import img4 from "../../images/444.jpeg"
import "./homepage-styles.css";

function Homepage() {

    let navigate = useNavigate();
    
    return (<>
    <ResponsiveAppBar/>
    <div className="landdiv d-flex justify-content-around"> 
        <div className="App-header">
              <h1>Welcome to PDF Editor</h1>
              <p>Create new PDF with selected pages from existing PDF</p>
             <div className='buttons'>
               <button type="button" style={{margin:"20px"}} className="buttons btn btn-primary btn-lg" onClick={()=>{navigate("/signup")}}>Sign Up</button> <br/>
               <button type="button" style={{margin:"20px"}} className="buttons btn btn-primary btn-lg"  onClick={()=>{navigate("/login")}}>Login</button>
             </div>
         </div> 

{/* //Carousal */}
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={img1} className="d-block w-100" alt="img1"/>
    </div>
    <div className="carousel-item">
      <img src={img2} className="d-block w-100" alt="img2"/>
    </div>
    <div className="carousel-item">
      <img src={img3} className="d-block w-100" alt="img3"/>
    </div>
    <div className="carousel-item">
      <img src={img4} className="d-block w-100" alt="img4"/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>


    </div>
    </>)
    }
  
  
  
  export default Homepage;