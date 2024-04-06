const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(morgan('tiny'));

app.use(cors());
app.options('*', cors());

//Routes
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');
const categoriesRoutes = require('./routes/categories');

const api = process.env.API_URL;

app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/categories`, categoriesRoutes);

//DB
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('Database connection is ready.');
  })
  .catch((err) => {
    console.log(err);
  });

//Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running http:localhost:${process.env.PORT}`);
});
