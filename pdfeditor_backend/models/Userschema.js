const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Userschema = new Schema({
    name : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        require : true,
        unique : String,
    },
    password : {
        type : String,
        require : true,
    },
    pdflocation : {
        type : String,
        require : false,
        default : "nofile"
    }
},{collection : "userdetails"});


module.exports = mongoose.model('userdetails',Userschema);