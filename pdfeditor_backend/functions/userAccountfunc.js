const bcrypt = require('bcrypt');
const joi = require('joi');
const jsonwebtoken = require('jsonwebtoken');
const Userschema = require('../models/Userschema');
const {TRUE,FALSE,ERROR,NOT_EXIST} = require('../constants');
const {addUsertoDB,getUserdata,findUseralreadyexists} = require('./userDbfunctions');

//No of passes the password should go through in bcrypt algorithm
const BCRYPT_SALTS = Number(process.env.BCRYPT_SALTS);  


//Singup user account
const usersingnup =async (req,res)=>{

    console.log(req.body.email);

    //To check if the input form is in correct format
    const isValid = joi.object({
        name: joi.string().required(),
        email : joi.string().email().required(),
        password : joi.string().min(8).required(),
        repeatpassword : joi.ref('password'), 
    }).validate(req.body);

    if(isValid.error)
    {
        res.status(400).send({
            status : 400,
            message : "Please fill in correct format",
            errormsg : isValid.error,
        })

        return ;
    }

    //To check if the user already exists with this emailId
    const verifyAlreadyexists =await findUseralreadyexists(req.body.email);
    if(verifyAlreadyexists === "TRUE")
    {
        res.status(400).send({
            status :400,
            message : "User account with this email already exists",
        })

        return ;
    }
    else if(verifyAlreadyexists ==="ERROR")
    {
        res.status(400).send({
        status : 400,
        message : "Error at Verifying Useraccount",
        errormsg : error,
    })

    return ;
    }


    //creating an object to save deatils of user to MongoDb
    const hashedPassword =await bcrypt.hash(req.body.password,BCRYPT_SALTS);

    const userObj =new Userschema({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword,
    })

   const addUser = await addUsertoDB(userObj);  //Saving user data to DB
   
   if(addUser === "TRUE")
   {
    res.status(201).send({
        status : 201,
        message : "User account created successfully",
    })

    return ;
   }
   else if(addUser === "ERROR")
   {
    res.status(400).send({
        status : 400,
        message : "DB error:User account creation failed",
    })

    return ;
   }
}



//Login User 
const userlogin = async (req,res)=>{
   const {email,password} = req.body;

   const isEmail = joi.object({
      email : joi.string().email(),
   }).validate(email);

   if(!isEmail)
   {
    res.status(400).send({
        status : 400,
        message : "Please check email format",
    })

    return ;
   }

   const userData = await getUserdata(email);

   if(userData.error)
   {
    res.status(400).send({
        status : 400,
        message : "DB error :Getting userdata failed ",
        errormsg : userData.error,
    })

    return ;
   }
   else if(!userData.data)
   {
    res.status(404).send({
        status : 404,
        message : "Useraccount with this emailId not exists.Please signup",
        error : userData,
    })
    return ;
   }

   //Checking for the password match
   const isPassword =await bcrypt.compare(password,userData.data.password);

   if(!isPassword)
   {
    res.status(401).send({
        status : 401,
        message : "Please enter correct password",
    })

    return ;
   }

   //To store object as Base64 format in JWT token used for auth validation
   const payload = {
    name : userData.data.name,
    email : userData.data.email,
   }

   //Creating jwt token to authrize the user as LoggedIn
   const token =await jsonwebtoken.sign(payload,process.env.JWT_SECRETKEY);

   res.status(200).send({
    status : 200,
    message : "User Loging Successfull",
    data : {
        token : token,
    }
   })

}


module.exports = {usersingnup,userlogin}