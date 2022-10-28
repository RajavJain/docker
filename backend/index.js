const connectToMongo = require("./db") //imported server through db.js
const express = require('express')

connectToMongo();

const app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

