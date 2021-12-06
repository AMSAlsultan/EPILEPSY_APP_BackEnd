const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();


router.get(`/`, async (req, res) =>{
    const categoryList = await Category.find();

    if (!categoryList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(categoryList);
})

router.get(`/:id`, async(req,res)=>{
    const category = await Category.findById(req.params.id);

    if(!category) {
        res.status(500).json({message: 'The category with the given ID was not fount.'})
    }
    res.status(200).send(category);
})

router.post(`/`, async (req,res)=>{
    let category = new Category({
        name: req.body.name,
        color: req.body.color
    })
    category = await category.save();

    if (!category)
    return res.status(404).send('the category cannot be created!')

    res.send(category);
})
 
module.exports =router;