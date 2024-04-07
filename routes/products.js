const express = require('express');
const { Product } = require('../models/product');
const { Category } = require('../models/category');
const mongoose = require('mongoose');

const router = express.Router();

router.get(`/`, async (req, res) => {
  const productList = await Product.find()
    .select('name description -_id')
    .populate('category');

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category');

  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});

router.post(`/`, async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send('Invalid category!');

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    images: req.body.images,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });
  const savedProduct = await product.save();

  if (!product) return res.status(500).send('The Product cannot be created');

  res.send(savedProduct);
});

router.put('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Invalid Product ID');
  }
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(500).send('Invalid category!');

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    {
      new: true,
    }
  );

  if (!product) return res.status(500).send('The product cannot be updated!');

  res.status(200).send(product);
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      return res.status(200).json({
        success: true,
        message: 'The product is deleted!',
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'The product not found',
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get('/get/count', async (req, res) => {
  try {
    const productCount = await Product.countDocuments();

    if (!productCount) {
      return res.status(500).json({ success: false });
    }

    res.status(200).send({
      productCount: productCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
