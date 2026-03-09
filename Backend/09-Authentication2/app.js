const cookieParser = require('cookie-parser');
const express = require('express'); 
const Path  = require('path');
const app = express();
const userModel = require('./models/user')
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 



app.set('view engine' , 'ejs'); 
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 
app.use(express.static(Path.join(__dirname , 'public'))); 
app.use(cookieParser()); 

app.get('/' , ((req , res) => {
    res.render('index'); 
}))

app.get('/login' , ((req , res) => {
    res.render('login'); 
}))

app.post('/login' , (async(req , res) => {
    let user = await userModel.findOne({email : req.body.email});
    if(!user) return res.send("Somthing went worng!")
    
    bcrypt.compare(req.body.password , user.password , ((err , result) => {
        if(result) {
            const token = jwt.sign({email : user.email} , "shhhhhh")
            res.cookie('token' , token); 
            res.send("you can login")
        }
        else return res.send("somthing went worng! "); 
    }))

}))

app.post('/create' ,  ((req , res) => {

    let {username , email , age , password} = req.body;

    bcrypt.genSalt(10 , (err , salt) => {
        bcrypt.hash(password , salt, async(err , hash) => {
            let createdUser = await userModel.create({
                username, 
                email, 
                age, 
                password: hash
            })

            const token = jwt.sign({email} , "shhhhhh")
            res.cookie('token' , token); 
            res.send(createdUser);
            
        })
        
    })

     

}))


app.get('/logout' , ((req , res) => {
    res.cookie('token' , ""); 
    res.redirect('/')
}))


app.listen(3000 , ()=>{
    console.log('Server is running on http://localhost:3000');
})