const userModel = require('../models/user')
const foodPatnerModel = require('../models/foodPatner')
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

// register --> user 
async function registerUser(req , res) { 

    const {fullName , email , password} = req.body; 
    const alreadyExistUser = await userModel.findOne({
        email
    })

    if(alreadyExistUser){
        return res.status(400).json({
            Message: "User Already present"
        })
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName, 
        email, 
        password: hashpassword
    })

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET)

    res.cookie('token' , token)

    res.status(201).json({
        Message: "User Register successfull",
        user:{
            _id: user._id, 
            email: user.email, 
            fullName: user.fullName, 
        }
    })


}

// login --> user  
async function loginUser(req , res ){
    const { email , password} = req.body;
    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            Message: "Invaild Email or password"
        })
    }

    const IsMatch = await bcrypt.compare(password , user.password); 
    
    if(!IsMatch){
        return res.status(400).json({
            Message: "Invaild Email or password"
        })
    }

    const token = jwt.sign({
        id: user._id, 
    },process.env.JWT_SECRET)

    res.cookie('token' , token); 
    
    res.status(200).json({
        Message: "User Register successfull",
        user:{
            _id: user._id, 
            email: user.email, 
            fullName: user.fullName, 
        }
    })



} 


// logout --> user 
function logoutUser(req , res ){
    res.clearCookie('token');
    res.status(200).json({
        Message: "User Successfully logout"
    })
}


// register --> food patner
async function registerfoodPatner(req , res ){
    let {Name , email , password} = req.body; 

    let alreadyExist = await foodPatnerModel.findOne({
        email
    })

    if(alreadyExist){
        return res.status(400).json({
            Message: "Patner program Already present"
        })
    }

    let hashpassword = await bcrypt.hash(password , 10 )

    const foodpatner = await foodPatnerModel.create({
        Name, 
        email, 
        password: hashpassword
    })

    const token = jwt.sign({
        id: foodpatner._id
    },process.env.JWT_SECRET)

    res.cookie('token' , token)

    res.status(201).json({
        Message: "Patner program Register successfull",
        foodpatner:{
            _id: foodpatner._id, 
            email: foodpatner.email, 
            Name: foodpatner.Name, 
        }
    })



}

// login --> food patner
async function loginfoodPatner(req , res ){
    const { Name , email , password} = req.body;
    const foodpatner = await foodPatnerModel.findOne({email})

    if(!foodpatner){
        return res.status(400).json({
            Message: "Invaild Email or password"
        })
    }

    const IsMatch = await bcrypt.compare(password , foodpatner.password);

    if(!IsMatch){
        return res.status(400).json({
            Message: "Invaild Email or password"
        })
    }

    const token = jwt.sign({
        id: foodpatner._id, 
    },process.env.JWT_SECRET)

    res.cookie('token' , token); 
    
    res.status(200).json({
        Message: "food Patner Register successfull",
        foodpatner:{
            _id: foodpatner._id, 
            email: foodpatner.email, 
            Name: foodpatner.Name, 
        }
    })

}

// logout --> food patner
function logoutfoodPatner(req , res ){
    res.clearCookie('token');
    res.status(200).json({
        Message: "foodpatner Successfully logout"
    })
}

module.exports = {
    registerUser,
    loginUser,  
    logoutUser,
    registerfoodPatner,
    loginfoodPatner, 
    logoutfoodPatner,
}
