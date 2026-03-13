const express = require('express'); 
const authcontroller = require('../controller/auth.controller')

const routers = express(); 

// user auth api 
routers.post("/user/register" , authcontroller.registerUser ) //we are creating this as a post method cause here we have to crate a new data.
routers.post("/user/login" , authcontroller.loginUser ) //here we have sensitive data like email and password that why post method. 
routers.get("/user/logout" , authcontroller.logoutUser ) //we create this as a get cause we dont have to create new data we just have to remove cookie and session. 


// food patner api 
routers.post("/foodpatner/register" , authcontroller.registerfoodPatner )
routers.post("/foodpatner/login" , authcontroller.loginfoodPatner )
routers.get("/foodpatner/logout" , authcontroller.logoutfoodPatner )

module.exports = routers; 