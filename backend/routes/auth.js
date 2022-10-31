const express = require("express");
const router =express.Router();//used as we have used app.use in index.js for mounting it
const { body, validationResult } = require('express-validator');//used for validating the input


const User= require('../models/User')//imported user schema

//used router as we have used app.use in index.js for mounting it, ye bss code ko neat dikhne k liye kiya hai...
router.post('/',(req,res) =>{ //post is used to create the data in CRUD like operation
    console.log(req.body);
    const user=User(req.body);
    user.save();
    res.send(req.body);
})


module.exports =router;