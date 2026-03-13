const monogoose = require('mongoose'); 

const foodPatnerSchema = new monogoose.Schema({
    Name :{
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
})

module.exports = monogoose.model('foodPatner', foodPatnerSchema );