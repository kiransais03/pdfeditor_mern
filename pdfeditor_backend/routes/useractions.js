const express = require('express');
const app = express();
const {usersingnup,userlogin} = require('../functions/userAccountfunc');


app.post('/signup',usersingnup);

app.post('/login',userlogin);


module.exports = app;