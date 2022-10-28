const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017";

const connectToMongo= () =>{   //made the function using mongoose to connect to mongodb
    mongoose.connect(mongoURI,() =>{
        console.log("Connected to mongoDB succesfully");
    })
}

module.exports = connectToMongo;