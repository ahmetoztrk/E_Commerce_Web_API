const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(morgan('tiny'));

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('Database connection is ready.');
  })
  .catch((err) => {
    console.log(err);
  });

const api = process.env.API_URL;

app.get(`${api}/products`, async (req, res) => {
  const productList = await Product.find()
  res.send(productList);
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
        success: false
      });
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running http:localhost:${process.env.PORT}`);
});
