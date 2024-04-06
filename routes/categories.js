const express = require('express');
const { Category } = require('../models/category');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categoryList = await Category.find();
    if (!categoryList) {
      return res.status(500).json({ success: false });
    }
    res.status(200).json(categoryList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id' ,async (req,res) => {
  try {
    const category = await Category.findById(req.params.id);
    if(!category)
      return res.status(500).json({message : "The category with the given ID was not found!!"})
    res.status(200).send(category)
  }catch(error) {
    res.status(500).json({success: false, error : error.message})
  }
  
})

router.post('/', async (req, res) => {
  try {
    const newCategory = new Category({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
    console.log("Category has been created : ", savedCategory);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (deletedCategory) {
      return res.status(200).json({
        success: true,
        message: 'The category is deleted!',
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'The category not found',
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
