const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Product = require('./models/Product');

require('dotenv/config');
const api = process.env.API_URL;

const app = express();

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('Database connection is ready..');
  })
  .catch((err) => {
    console.log(err);
  });

//Middlewares
app.use(express.json());
app.use(morgan('tiny'));

app.get(`${api}/products`, async (req, res) => {
  const products = await Product.find();

  if (!products) {
    res.status(500).json({
      success: false,
    });
  }
  res.status(200).send(products);
});

app.post(`${api}/products`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });
  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
