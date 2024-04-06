const express = require('express');
const { Order } = require('../models/order');

const router = express.Router();

router.get('/', (req, res) => {
  const orderList = Order.find();

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

module.exports = router;
