const express = require("express");
const router =express.Router();//used as we have used app.use in index.js for mounting it

router.get('/',(req,res) =>{
    obj={
        a:"this is Rajav",
        number:"76"
    }
    res.json(obj)
})

module.exports =router;