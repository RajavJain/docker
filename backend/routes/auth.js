const express = require("express");
const router =express.Router();//used as we have used app.use in index.js for mounting it

const User= require('../models/User')//imported user schema

router.post('/',(req,res) =>{
    console.log(req.body);
    const user=User(req.body);
    user.save();
    res.send(req.body);
})

module.exports =router;