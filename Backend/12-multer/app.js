const express = require('express'); 
const app  = express(); 
const multerconfig = require('./config/multer');




app.set('view engine' , 'ejs'); 
app.use(express.urlencoded({extended:true})); 
app.use(express.json()); 




app.get('/' , ((req , res) => {
    res.render("index")
}))

app.post('/upload',  ((req , res) => {
    console.log(req.file);
}))




app.listen(3000 , () => {
    console.log("http://localhost:3000");
    
})