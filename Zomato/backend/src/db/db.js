const mongoose = require('mongoose'); 

function connectDb(){
    mongoose.connect(process.env.MONGODB_URL)
        .then(()=>{
            console.log("database connected");
        })
        .catch((err) =>{
            console.log("there is some error while connecting db " , err );
        })
}

module.exports = connectDb; 