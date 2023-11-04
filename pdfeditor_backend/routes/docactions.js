const express = require('express');
const app = express();
const fs = require('fs');
const {PDFDocument, pdfDocEncodingDecode} = require('pdf-lib');
const multer = require('multer');  //Using multer to handle the file from frontend
const {addPdflocation,getPdflocation,replaceOldpdf} = require('../functions/userDbfunctions');
const {isAuth} = require('../middlewares/isAuthmiddlewares');
const path = require('path');


//Defining filename and location to store it on the server
const storage = multer.diskStorage({   
    destination:(req,file,cb)=>{
        cb(null,'./pdfstorage');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"_"+file.originalname);
    }
})

const upload = multer({storage})

//API to Upload Pdf file
app.post('/uploadpdf',isAuth,upload.single('pdffile'),async (req,res)=>{
    try {
       if(!req.file)
       {
         throw new Error("The file is not uploaded,Please try again");
       }
     const isaddedPdflocation = await addPdflocation("./pdfstorage/"+req.file.filename,req.locals.email);
     
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


//API to retrieve the Uploaded pdf file
app.get('/getpdf',isAuth,async (req,res)=>{

    try {

    const pdflocation = await getPdflocation(req.locals.email);
    // const pdfFile = fs.readFileSync(pdflocation);

    console.log(pdflocation,"this is pdf location")
    res.set('Content-Type','application/pdf');

    //Note : create 'temppdfstorage' folder in the parent folder of current code file(here docactions.js) that is inside 'routes' folder
    let temppath = path.resolve(__dirname,'temppdfstorage','tempdoc.pdf')   //written to convert the 'Relative' path to 'Absolute path'

   fs.copyFileSync(pdflocation,temppath)

    res.status(200).sendFile(temppath,(error)=>{
        fs.unlinkSync(temppath);

        if(error) 
        {
            res.status(400).status({
                status : 400,
                message : "Failed to get the pdf file",
            })
        }
    })
}
catch(error) {
    res.status(400).send({
        status : 400,
        message : "Error while retriving file.Pls try again",
        errormsg : error,
    })
}
})



//Export the selected pages into pdf and download using 'pdf-lib' npm package
app.post('/exportpdf',isAuth,async (req,res)=>{

  const newpdfDoc = await PDFDocument.create();  //created a new pdf

  const pagenosstring = req.body.pagenosstring;
  const pagenoarr = pagenosstring.split(',');

  const pdflocation = await getPdflocation(req.locals.email);

  const originalPdfBytes = fs.readFileSync(pdflocation);
 
  const loadedoriginalPdf = await PDFDocument.load(originalPdfBytes);

  const copiedPagesarr = await newpdfDoc.copyPages(loadedoriginalPdf,pagenoarr);

  copiedPagesarr.forEach((currpage)=>{
     newpdfDoc.addPage(currpage)
  })

  const newPdfexportfile =await newpdfDoc.save();   //Exported as New Pdffile

  fs.writeFileSync("./routes/temppdfstorage/newPdffile.pdf",newPdfexportfile,);

    res.set("Content-Type","application/pdf");

    //Note : create 'temppdfstorage' folder in the parent folder of current code file(here docactions.js) that is inside 'routes' folder
    let temppath = path.resolve(__dirname,'temppdfstorage','tempdoc.pdf')   //written to convert the 'Relative' path to 'Absolute path'

    fs.copyFileSync('./routes/temppdfstorage/newPdffile.pdf',temppath);

    res.status(200).sendFile(temppath,(error)=>{

        fs.unlinkSync(temppath);

        if(error)
        {
            res.status(404).send({
                status : 404,
                message : "File exportfailed.Please try again",
            })
        }
    })
})


app.get('/replaceoriginalfile',isAuth,async (req,res)=>{
    
    const isReplace = req.query.isreplace;

    if(isReplace)
    {
        const replacefunc =await replaceOldpdf(req.locals.email,"./routes/temppdfstorage/newPdffile.pdf");
        if(replacefunc === "TRUE")
        {
            res.status(201).send({
                status : 200,
                message : "File replaced successfully",
            })
        }
        else if(replacefunc === "ERROR")
        {
            res.status(400).send({
                status : 400,
                message : "Failed to replace file.Please try again",
            })
        }
    }else {
        return ; 
    }
})


module.exports = app;