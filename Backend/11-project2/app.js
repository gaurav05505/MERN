const express = require('express'); 
const app  = express(); 
const userModel = require('./models/user'); 
const postModel = require('./models/post'); 
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

app.set('view engine' , 'ejs'); 
app.use(express.urlencoded({extended:true})); 
app.use(express.json()); 
app.use(cookieParser()); 

app.get('/' , ((req , res) => {
    res.render("index")
}))

app.get('/login' , ((req , res) => {
    res.render("login")
}))

app.get('/logout' , ((req , res) => {
    res.cookie("token" , ""); 
    res.redirect("/login")
}))

app.post('/register' , (async(req , res) => {
    let {email , password , username , age , name } = req.body ;

    let user = await userModel.findOne({email})

    if(user){
        return res.status(500).send("You already have an account!"); 
    }

    bcrypt.genSalt(10 , (err , salt) => {
        bcrypt.hash(password , salt ,  async (err , hash) =>{
            let user = await userModel.create({
                name, 
                username, 
                email, 
                age, 
                password: hash, 
            })

            let token = jwt.sign({email: email , userid: user._id} , "shhhh"); 
            res.cookie("token" , token); 
            res.send("sucesss")
        })

        

    }) 




}))

app.post('/login' , (async(req , res) => {
    let {email , password} = req.body ;

    let user = await userModel.findOne({email})

    if(!user){
        return res.status(500).send("somthing went worng"); 
    }

    bcrypt.compare(password , user.password , (err , result) => {
        if(result){
            let token = jwt.sign({email: email , userid: user._id} , "shhhh"); 
            res.cookie("token" , token); 
            res.status(200).redirect("/profile")
        } 
        else res.redirect('login'); 
    })




}))

app.get('/profile' , isLoggedin ,  async (req, res ) => {
    let user = await userModel.findOne({email: req.user.email}).populate('posts') ;
    res.render("profile" , {user} )
})

app.get('/like/:id' , isLoggedin ,  async (req, res ) => {
    let post = await postModel.findOne({_id: req.params.id}).populate('user') ;

    if(post.likes.indexOf(req.user.userid) === -1){
        post.likes.push(req.user.userid);
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid), 1); 
    }

    await post.save();
    res.redirect("/profile");
})


app.get('/edit/:id' , isLoggedin ,  async (req, res ) => {
    let post = await postModel.findOne({_id: req.params.id}).populate('user') ;

    res.render("edit" , {post})

})

app.post('/update/:id' , isLoggedin ,  async (req, res ) => {
    let post = await postModel.findOneAndUpdate({_id: req.params.id} , {content: req.body.content});
    res.redirect("/profile")

})



app.post('/post' , isLoggedin ,  async (req, res ) => {
    let {content} = req.body; 

    if(!content || content.trim() === ""){
        return res.redirect("/profile");
    }

    let user = await userModel.findOne({email: req.user.email}); 
    let post = await postModel.create({
        user: user._id,
        content, 
    })

    user.posts.push(post._id); 
    await user.save(); 
    res.redirect('/profile'); 
})

function isLoggedin(req , res , next){
    if(!req.cookies.token){
        return res.redirect("/login");
    }

    try{
        let data = jwt.verify(req.cookies.token , "shhhh");
        req.user = data; 
        next();
    }
    catch(err){
        return res.redirect("/login");
    }
}


app.listen(3000 , () => {
    console.log("http://localhost:3000");
    
})