const express = require('express');
const { Category } = require('../models/category');

const router = express.Router();

router.get('/', (req, res) => {
  const categoryList = Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});

module.exports = router;
