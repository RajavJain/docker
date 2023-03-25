const connectToMongo = require("./db") //imported server through db.js
const express = require('express')
var cors = require('cors')//use to install to access data through API hits from the server....  


connectToMongo();


const app = express();
const port = 2000;
app.use(cors());


app.use(express.json());//middle-ware used for receiving the response send through req.body, so that we can send data through json file


//Available Routes for sample
app.use('/api/auth', require('./routes/auth'))//use to mount any file at the given endpoint and isko isliye app.use kiya hai taki hamara code clean dikhe and in auth.js mai hamne same tarekke se (req,res) hi send kiya hai 
app.use('/api/notes', require('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Hello World! ') // Just for the testing purpose... so that we can run the localhost:2000 and give some response for verifying.
})

app.listen(port, () => {
  console.log(`Docket App listening on port ${port}`)
})
