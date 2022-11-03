const express = require("express");
const router =express.Router();//
const fetchuser= require('../middleware/fetchuser')
const Notes = require('../models/Notes')//imported notes schema



//ROUTE-----------1-----------


//Get all the notes using GET : ENDPOINT:"/api/auth/fetchallnotes"    NO LOGIN REQUIRED        <<<<<<<<<-------------------------->>>>>>>>>>>>
router.get('/fetchallnotes',fetchuser, async (req,res) =>{
    const notes= await Notes.find({user: req.user.id})//ye islye kr paaye kyuki isme hamne fetchuser ko import kr liya h
    
    res.json(notes);
})

module.exports =router;