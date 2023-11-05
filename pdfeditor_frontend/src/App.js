import './App.css';
import React from "react";
import {Routes,Route} from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loginpage from "./pages/Loginpage/Loginpage";
import Signuppage from "./pages/Signuppage/Signuppage";


function App() {
  return (
    <>
      <ToastContainer/>
       <Routes>
        <Route path="/user/login" element={<Loginpage/>}/>
        <Route path="/user/signup" element={<Signuppage/>}/>
       </Routes>
    </>
  );
}

export default App;
