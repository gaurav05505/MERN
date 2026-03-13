const mongoose = require('mongoose'); 

const foodItem = new mongoose.Schema({
    name: {
        type: String, 
        required : true, 
    },
    video: {
        type: String, 
        required : true
    },
    description: {
        type:String, 
    },
    foodPatner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "foodPatner"
    }

}); 

module.exports = mongoose.model("item" , foodItem ); 