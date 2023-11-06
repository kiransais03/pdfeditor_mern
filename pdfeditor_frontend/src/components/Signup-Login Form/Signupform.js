import React,{useState} from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";

function Signupform () {

    let [fname,setFname]=useState("");
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    let [confirmpassword,setConfirmpassword]=useState("");


    let [loading,setLoading] = useState(false);

    let navigate1 = useNavigate();

    async function handleSingup() {
        if(fname && email && password && confirmpassword && email.includes('@') && password===confirmpassword && password.length>=8 ) {
            try {
            console.log("Signup in progress....");

            setLoading(true);

            let response = axios.post(`${process.env.REACT_APP_URL}/user/signup`,{
                "name": fname,
               "email": email,
               "password": password,
               "repeatpassword": confirmpassword,
           })
      
           console.log(response);
              setLoading(false);
              toast.success('Signup Successful');

              console.log("Signup Successfull.")
             navigate1("/");
              
    }
    catch(error){
    console.log("Some Error Occured :",error)
      if(!error.response)
      {
      toast.error(`Error:${error.message}`);
      }
    else {
        toast.error(`Some error occured ${error.message}`);
        console.log("Some Error Occured23 :",error.message);
        setLoading(false);
    }
    }
}
else {
    setLoading(false);
    if(!fname || !email || !password || !confirmpassword)
    {
        toast.error('All the fields are required!');
    }
    else if(!email.includes('@'))
    {
        toast.error("Please enter valid EmailId");
    }
    else if(password!==confirmpassword)
    {
        setPassword("");
        setConfirmpassword("");
       toast.error('Please make sure Password and Confirm Password are same');
    }
    else if(password.length<6)
    {
    toast.error('Password should have minimum of 6 characters');
    }
   
}
}


    return(<>
            <Input type="text" placeholder="Full Name" state={fname} setState={setFname} required={true}/>
            <Input type="text" placeholder="Email" state={email} setState={setEmail} required={true}/>
            <Input type="password" placeholder="Password" state={password} setState={setPassword} required={true}/>
            <Input type="password" placeholder="Confirm Password" state={confirmpassword} setState={setConfirmpassword} required={true}/>
            <Button text={loading ? <div><div className="spinner-border spinner-border-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow spinner-grow-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div></div> :"Signup"} onClick={handleSingup}/>
        </>
    )
}


export default Signupform;