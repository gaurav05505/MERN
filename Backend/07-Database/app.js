const express  = require('express'); 
const app = express(); 
const path = require('path'); 
const user = require('./Models/User'); 


app.set('view engine' , 'ejs'); 
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 
app.use(express.static(path.join(__dirname , 'public'))); 

app.get('/' , (req , res) => {
    res.render('index' ); 
})

app.post('/create' , async (req , res) => {
    
    let {image , Uname , email } = req.body; 

    let Createduser =  await user.create({
        image: image,
        email: email, 
        Uname: Uname 
    })

    res.render('index'); 

})

app.get('/read' , async (req , res) => {
    let allUser = await user.find()
    res.render('read' , {user: allUser}); 
})

app.get('/delete/:id' , async (req , res) => {
    await user.findOneAndDelete({ _id: req.params.id })
    res.redirect('/read'); 
})

app.post('/update/:id' , async (req , res) => {

    let {image , Uname , email} = req.body

    await user.findOneAndUpdate({ _id: req.params.id } , {image , Uname , email}); 
    res.redirect('/read'); 
})

app.get('/edit/:id' , async (req , res) => {
    let users = await user.findOne({ _id: req.params.id })
    res.render('edit' , {users}); 
})

app.listen(3000 , () => {
    console.log('Server is running on http://localhost:3000')
});