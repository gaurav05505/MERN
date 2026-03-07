const cookieParser = require('cookie-parser');
const express = require('express'); 
const app = express(); 
const jwt = require('jsonwebtoken'); 

app.use(cookieParser())

app.get('/' , ((req , res) => {
    let token = jwt.sign({email: "gaurav@gmail.com"} , "gaurav"); 
    res.cookie("token" , token); 
    res.send("hey")
    
    
}))

app.get('/read' , ((req , res) =>{
    let data = jwt.verify(req.cookies.token , "gaurav")
    console.log(data);
    
}))

app.listen(3000 , () =>{
    console.log('Server is running on http://localhost:3000');
})