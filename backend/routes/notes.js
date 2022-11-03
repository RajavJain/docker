const express = require("express");
const router =express.Router();//
const fetchuser= require('../middleware/fetchuser')



//ROUTE-----------1-----------


//Create a User using POST: ENDPOINT:"/api/auth/createuser"    NO LOGIN REQUIRED        <<<<<<<<<-------------------------->>>>>>>>>>>>
router.get('/fetchallnotes',fetchuser, (req,res) =>{
    res.json([])
})

module.exports =router;