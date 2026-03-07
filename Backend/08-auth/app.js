const cookieParse = require('cookie-parser'); 
const express = require('express'); 
const app = express(); 

app.use(cookieParse()); 

app.get('/' , ((req , res) => {
    res.cookie("name" , "gaurav"); 
    res.send("this is a page main page...")
}))

app.get('/read' , ((req , res) => {
    console.log(req.cookies);
    
    res.send("this is a page read page...")
}))

app.listen(3000 , () =>{
    console.log('Server is running on http://localhost:3000');
})