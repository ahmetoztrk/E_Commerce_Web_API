const express = require('express');
const morgan = require('morgan');

require('dotenv/config');
const api = process.env.API_URL;

const app = express();

//Middlewares
app.use(express.json());
app.use(morgan('tiny'));

app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    title: 'lenovo thinkpad',
    price: 3000,
  };
  res.status(200).send(product);
});

app.post(`${api}/products`, (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);
  res.status(200).send(newProduct);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
