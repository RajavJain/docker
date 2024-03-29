const express = require("express");
const router = express.Router();//
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')//imported notes schema
const { body, validationResult } = require('express-validator');//used for validating the input, syntax from express-validator site



//-----------------------------------------------------/////--------------------------------------------------


//ROUTE-----------I-----------

//Get all the notes using GET : ENDPOINT:"/api/note/fetchallnotes"    LOGIN REQUIRED        <<<<<<<<<-------------------------->>>>>>>>>>>>
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        //it will find the user using ID
        const notes = await Note.find({ user: req.user.id })//ye islye kr paaye kyuki isme hamne fetchuser ko import kr liya h
        res.json(notes);
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error occured from our side!");
    }
})



//-----------------------------------------------------/////--------------------------------------------------

//ROUTE-----------II-----------

//Adding new notes using POST : ENDPOINT:"/api/note/addnote"     LOGIN REQUIRED        <<<<<<<<<-------------------------->>>>>>>>>>>>
router.post('/addnote', fetchuser, [
    //isme ek array mai saari conditions hi paas kr di hai... with the use of express-validator from it's site
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 character').isLength({ min: 5 })
],
    async (req, res) => {
        try {

            const { title, description, tag } = req.body;//ye teen cheeze daalna hoga code mai... jab hum body ko response denge api k through
            const errors = validationResult(req);//took the code from express-validator, more optimized one, if errors then it will return error
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            //It will create a new Note to the database
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();//this mongodb command will save the notes to the DB...

            res.json(savedNote);
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Some Error occured from our side!");
        }
    })


//-----------------------------------------------------/////--------------------------------------------------

//ROUTE-----------III-----------

//Updating new notes using PUT : ENDPOINT:"/api/note/updatenote"     LOGIN REQUIRED        <<<<<<<<<-------------------------->>>>>>>>>>>>
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;//destructured all the inputs given by the user
    //Creating a newNote object----
    try {
        let newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        //Finding the note to be updated and updating it....
        let note = await Note.findById(req.params.id);
        //ye sab to pehle ye dekhne k liye kr rhe hai ki user apne hi notes access kr rha hai ki nhi...
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error occured from our side!");
    }

})


//-----------------------------------------------------/////--------------------------------------------------

//ROUTE-----------IV-----------

//Deleting new notes using DELETE : ENDPOINT:"/api/note/updatenote"     LOGIN REQUIRED        <<<<<<<<<-------------------------->>>>>>>>>>>>
//Similar to update route
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Finding the note to be delete and deleting it....
        let note = await Note.findById(req.params.id);
        //ye sab to pehle ye dekhne k liye kr rhe hai ki user apne hi notes access kr rha hai ki nhi...
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error occured from our side!");
    }
})


module.exports = router;
