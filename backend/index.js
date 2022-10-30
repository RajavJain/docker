const connectToMongo = require("./db") //imported server through db.js
const express = require('express')

connectToMongo();

const app = express();
const port = 3000;


//Available Routes for sample
app.use('/api/auth', require('./routes/auth'))//use to mount any file at the given endpoint and isko isliye app.use kiya hai taki hamara code clean dikhe and in auth.js mai hamne same tarekke se (req,res) hi send kiya hai 
app.use('/api/notes', require('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Hello World! ')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
