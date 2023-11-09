const express = require('express');  //importing express framework
const app = express();
require('dotenv').config();
const cors = require('cors'); //Cross origin resource sharing,used to regulate access for API calls
const mongoose = require('mongoose'); //import ODM mongoose library for MongoDB
const docactions = require('./routes/docactions');
const useractions = require('./routes/useractions');

app.use(cors({origin:'*'})); //Make the server accessible throught all the domains

app.use(express.json());  //Middleware to conver the http data format to JSON from API
app.use(express.urlencoded({ extended: true }));



app.use('/actions',docactions);

app.use('/user',useractions);

app.get('/',(req,res)=>{
    res.send("This is a backend server of PDF Editor Website");
    })

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{console.log("MongoDB Database Connected")})
.catch((error)=>{console.log("Error in connecting to MongoDb Database",error)});

app.listen(process.env.PORT,()=>{
    console.log("The node server is running in PORT",process.env.PORT);
})