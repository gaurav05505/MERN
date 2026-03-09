const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    postdata : String, 
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    data : {
        type: Date, 
        default : Date.now
    } 
})

module.exports = mongoose.model("Post" ,  PostSchema); 