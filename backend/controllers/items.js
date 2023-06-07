const mongoose = require("mongoose");
const Items = require("../models/items");

const getItems = (req, res) => {
    try{
        Items.find().lean().sort({ created_at: -1 })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({message: err})
        });
    } catch(err){
        res.status(500).json({message: err})
    }
}


const addItems = async (req, res) => {
    try{
         const { name, img_url } = req.body
 
         //Store new user in DB
         const newItem = new Items({
            _id: new mongoose.Types.ObjectId(),
             name: name,
             img_url: img_url,
           });
 
         //Adding new document to DB
         await newItem.save()
 
         //Sucess
         res.status(200).json(newItem)
    }catch(err){
        res.status(500).json({message: err})
    }
}

module.exports = { getItems, addItems }