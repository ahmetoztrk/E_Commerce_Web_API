const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');
const productRouter = require('./routers/productRoter');

const app = express();

//env variables
require('dotenv/config');
const api = process.env.API_URL;

//Connecting DB
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('Database connection is ready..');
  })
  .catch((err) => {
    console.log(err);
  });

//Middlewares
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('tiny'));

//Routes
app.use(`${api}/products`, productRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
