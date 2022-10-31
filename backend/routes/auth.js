const express = require("express");
const router = express.Router();//used as we have used app.use in index.js for mounting it
const { body, validationResult } = require('express-validator');//used for validating the input


const User = require('../models/User')//imported user schema

//used router as we have used app.use in index.js for mounting it, ye bss code ko neat dikhne k liye kiya hai...
router.post('/createuser',
    [    //isme ek array mai saari conditions hi paas kr di hai... with the use of express-validator from it's site
        body('email').isEmail(),
        body('name').isLength({ min: 3 }),
        body('password').isLength({ min: 5 })
    ]
    , async (req, res) => { //post is used to create the data in CRUD like operation
        const errors = validationResult(req);//took the code from express-validator, more optimized one, if errors then it will return error
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //res.send(req.body); or we can use the below syntax through express-validator site


        //Checking whether this user is registed or not----
        //Rapped it in to simple try catch block-----
        try {
            let user = await User.findOne({ email: req.body.email })//it will search out the data with similar email id---
            if (user) {
                return res.status(400).json({ error: "Sorry this user is already registered" })
            }
            user = await User.create({  // in sab ko await krana jaruri tha, warna execution mai error aaeya
                name: req.body.name,
                password: req.body.password,
                email: req.body.email
            })

            // .then(user => res.json(user)) -------- used async-await instead of .then
            //     .catch(err => {
            //         console.log(err)
            //         res.json({ error: 'This email is already registered' })
            //     });

            res.json({ "Nice": "nice" })
        } 
        catch (error) {
            console.error(error.message)
            res.status(500).send("Some Error occured");
        }
    })


module.exports = router;