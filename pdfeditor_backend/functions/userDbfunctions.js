const {TRUE,FALSE,ERR,NOT_EXIST} = require('../constants');
const Userschema = require('../models/Userschema');

//Saving userObject to database
const addUsertoDB = async (userObj)=>{
   try {
     userObj.save();
     return TRUE;
   }
   catch(error) {
    return ERR;
   }
}

//Finding userData from db
const getUserdata = async (email)=>{
    const userData = {
        data : null,
        error : null,
    }

    try {
        userData.data = await Userschema.findOne({email:email});
        return userData;
    }
    catch(error) {
        userData.error = error;
        return userData;
    }
}

//To check if user already exists
const findUseralreadyexists = async (email)=>{
    try {
   const verifyAccount = getUserdata(email);

   if(verifyAccount.data.length !== 0) {
      return TRUE;
   }
   else {
    return FALSE;
   }
}
catch (error) {
    res.status(400).send({
        status : 400,
        message : "Error at Verify Useraccount",
        errormsg : error,
    })
 }
}

module.exports = {addUsertoDB,getUserdata,findUseralreadyexists};