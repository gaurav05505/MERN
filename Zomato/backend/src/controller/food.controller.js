const foodModel = require('../models/food.model'); 
const strogeService = require('../services/storage.service')
const {v4: uuid} = require('uuid')


async function createFood(req , res){ 

    console.log("controller started");

    console.time("imagekit");

    const fileUplaodResult = await strogeService.uploadFile(
        req.file.buffer,
        uuid()
    );

    console.timeEnd("imagekit");

    console.log("upload finished");

    const foodItem = await foodModel.create({
        name: req.body.name, 
        description: req.body.description, 
        video: fileUplaodResult.url,
        foodPatner: req.foodPatner._id, 
    })

    res.status(201).json({
        message: "food Created successfully", 
        food: foodItem
    })
}

async function getFoodItem(req , res ){
    const foodItem = await foodModel.find({})
    res.status(201).json({
        message: "Food item fetched successfully",
        foodItem
    })
}

module.exports = {
    createFood,
    getFoodItem, 
}