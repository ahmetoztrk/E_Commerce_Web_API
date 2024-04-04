const express = require('express');

require('dotenv/config');

const app = express();

//MIDDLEWARE
app.use(express.json());

const api = process.env.API_URL;

app.get(`${api}/products`, (req, res) => {
  const product = {
    id: '1',
    name: 'table',
    image: 'some_url',
  };
  console.log(product);
  res.send(product);
});

app.post(`${api}/products`, (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);
  res.send(newProduct);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running http:localhost:${process.env.PORT}/`);
});
