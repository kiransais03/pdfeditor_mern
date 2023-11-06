const {TRUE,FALSE,ERROR,NOT_EXIST} = require('../constants');
const Userschema = require('../models/Userschema');
const fs = require('fs')

//Saving userObject to database
const addUsertoDB = async (userObj)=>{
   try {
     userObj.save();
     return TRUE;
   }
   catch(error) {
    return ERROR;
   }
}

//Finding userData from db
const getUserdata = async (email)=>{
    const userData = {
        data : null,
        error : null,
    }

    try {
        userData.data = await Userschema.findOne({"email":email});

        console.log(userData,"this is userObj from DB");

        return userData;
    }
    catch(error) {
        userData.error = error;
        return userData;
    }
}

//To check if user already exists
const findUseralreadyexists = async (email)=>{
    const userData = {
        data : null,
        error : null,
    }

    try {
   const verifyAccount =await getUserdata(email);

   console.log("Verification obj",verifyAccount)

   if(verifyAccount.data.email) {
      return "TRUE";
   }
   else if(verifyAccount.error)
   {
    return "TRUE";
   }
   else {
    console.log("false")
    return FALSE;
   }
}
catch (error) {
   userData.error = error;
   return "ERROR";
 }
}

//Add pdflocation to Db of particular user
const addPdflocation = async (pdflocationstring,email)=>{
   
    try {
        const isaddedPdflocation = await Userschema.findOneAndUpdate({email :email},{pdflocation : pdflocationstring,});
        
        if(isaddedPdflocation) {
        return TRUE;
        }
        else {
            return FALSE;
        }
    }
    catch (error) {
        return ERROR;
    }
}


//Get pdflocation from DB
const getPdflocation = async (email)=>{
    try {
          const userObj = await Userschema.findOne({email : email});
 
          if(!userObj)
          {
            return NOT_EXIST;
          }

          const pdflocation = userObj.pdflocation;

          return pdflocation;
    }
    catch(error) {
        return ERROR;
    }
}


//Update or Replace the original pdf with new pdf
const replaceOldpdf = async (email,newFilepath)=>{
    try {
         const userObj = await Userschema.findOne({email:email});

         if(!userObj)
         {
            return ERROR;
         }

         fs.copyFileSync(newFilepath,userObj.pdflocation)
         return TRUE;
    }
    catch(error)
    {
        return ERROR;
    }
}

module.exports = {addUsertoDB,getUserdata,findUseralreadyexists,addPdflocation,getPdflocation,replaceOldpdf};