const express = require("express"); 
const app = express(); 
const cookieparser = require('cookie-parser')
const authRoutes = require('../src/routes/auth.routes'); 
const foodRoutes = require('../src/routes/food.routes'); 

app.use(express.json()); 
app.use(cookieparser()); 

app.get('/' , (req , res) => {
    res.send("hello budddy!")
})

app.use('/api/auth' , authRoutes); 
app.use('/api/food' , foodRoutes); 

module.exports = app; 