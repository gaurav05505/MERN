const express = require('express');
const app = express();
const userModel=  require('./models/user');
const postModel=  require('./models/post');
const user = require('./models/user');

app.get('/' , ((req , res) => {
    res.send("hey!!"); 
}))

app.get('/create' , (async (req , res) => {
    const user = await userModel.create({
        username: "Gaurav01", 
        email: "Gaurav@gmail.com", 
        age: 19, 
    }) 

    res.send(user)
}))


app.get('/post/create' , (async(req , res) => {
    let post = await postModel.create({
        postdata: "Hey this is my first post ", 
        user: "69aec03c3557c25352cb668e",
    })
    
    let user  = await userModel.findOne({_id : "69aec03c3557c25352cb668e"})
    user.posts.push(post._id); 
    await user.save(); 
    res.send({post , user})


}))



app.listen(3000 , ()=>{
    console.log("http://localhost:3000");
})