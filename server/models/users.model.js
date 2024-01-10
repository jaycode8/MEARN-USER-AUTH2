const mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
    FirstName : {
        type : String
    },
    LastName : {
        type : String
    },
    Email : {
        type : String
    },
    Password : {
        type : String
    }
}, {timestamps : true});

module.exports = { usersSchema }


