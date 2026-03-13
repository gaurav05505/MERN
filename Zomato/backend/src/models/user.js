const mongoose = require('mongoose'); 
const { TimestampQuery } = require('three/src/constants.js');

const userSchema = new mongoose.Schema({
    fullName :{
        type: String, 
        required: true,
    }, 
    email: {
        type: String, 
        required: true,
        unique: true, 
    },
    password: {
        type: String, 
    }
} ,
    {
        Timestamps: true
    }
)

module.exports = mongoose.model("user" , userSchema);