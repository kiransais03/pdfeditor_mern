const bcrypt = require('bcrypt');
const joi = require('joi');
const Userschema = require('../models/Userschema');
const {addUsertoDB,getUserdata,findUseralreadyexists} = require('./userDbfunctions');


const BCRYPT_SALTS = Number(process.env.BCRYPT_SALTS);  //No of passes the password should go through in bcrypt algorithm


//Singup user account
const usersingnup =async (req,res)=>{

    //To check if the input form is in correct format
    const isValid = joi.object({
        name: joi.string().required(),
        email : joi.email().required(),
        password : joi.string().min(8).required(),
        repeatpassword : joi.ref(password) 
    }).validate(req.body);

    if(isValid.error)
    {
        res.status(400).send({
            status : 400,
            message : "Please fill in correct format",
        })
    }

    //To check if the user already exists with this emailId
    const verifyAlreadyexists = findUseralreadyexists(req.body.email);

    if(verifyAlreadyexists === "TRUE")
    {
        res.status(400).send({
            status :400,
            message : "User account with this email already exists",
        })
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
   }
   else if(addUser === "FALSE")
   {
    res.status(400).send({
        status : 400,
        message : "DB error:User account creation failed",
    })
   }
}



//Login User 
const userlogin = async (req,res)=>{
   
}



module.exports = {usersingnup,userlogin}