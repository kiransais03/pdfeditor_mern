import './App.css';
import React from "react";
import {Routes,Route} from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loginpage from "./pages/Loginpage/Loginpage";
import Signuppage from "./pages/Signuppage/Signuppage";
import Uploadpdfpage from './pages/Uploadpdfpage/Uploadpdfpage';
import Pdfeditpage from "./pages/Pdfeditpage/Pdfeditpage"
import Test from './components/Loader/Loader';


function App() {
  return (
    <>
      <ToastContainer/>
       <Routes>
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="/signup" element={<Signuppage/>}/>
        <Route path="/pdfupload" element={<Uploadpdfpage/>}/>
        <Route path="/pdfedit" element={<Pdfeditpage/>}/>
        <Route path="*" element={<Loginpage/>}/>
       </Routes>
    </>
  );
}

export default App;
