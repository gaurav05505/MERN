import express from 'express'; 

const app = express(); 


app.use(express.json())
app.use(express.urlencoded({extended : true})); // both the parts are to convert back to hexadec to readble format.  

app.get('/' , ((req , res , next) => {
    res.send("this is home page!!"); 
}))


app.get('/profile' , ((req , res , next) => {
    res.send("this is profile page!!"); 
}))


app.get('/about' , ((req , res , next) => {
    res.send("this is about page!!"); 
}))