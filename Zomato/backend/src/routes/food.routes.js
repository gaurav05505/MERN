const express = require('express'); 
const routers = express.Router(); 
const foodControl = require('../controller/food.controller')
const authMiddleware = require('../middleware/auth.middleware')
const multer = require('multer'); 

const upload = multer({
    storage: multer.memoryStorage(),
})

// post method --> also protected by middleware 
routers.post('/' , authMiddleware.authFoodPatnerMiddleware , upload.single("video") ,   foodControl.createFood)

// get method --> also protected by middleware 
routers.get('/' , authMiddleware.authUserMiddleware , foodControl.getFoodItem  )


module.exports = routers