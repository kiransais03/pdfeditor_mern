const express = require('express');
const app = express();
const multer = require('multer');  //Using multer to handle the file from frontend


//Defining filename and location to store it on the server
const storage = multer.diskStorage({   
    destination:(req,file,cb)=>{
        cb(null,'./pdfstorage');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"_"+file.originalname);
    }
})

//This 
const upload = multer({storage})


//API to for Pdf file upload
app.post('/uploadpdf',upload.single('pdffile'),(req,res)=>{
    try {
       if(!req.file)
       {
         throw new Error("The file is not uploaded");
       }
       res.status(201).send({
        status : 201,
        message : "File uploaded successfully",
       })
    }
    catch(error) {
        res.status(400).send({
            status:400,
            message : "Uploading the pdf file failed",
            errormsg : error 
        })
    }
})


//API for retrieve the Uploaded pdf file
app.get('/getpdf',(req,res)=>{
   
})


module.exports = app;