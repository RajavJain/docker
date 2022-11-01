const express = require("express");
const router = express.Router();//used as we have used app.use in index.js for mounting it
const { body, validationResult } = require('express-validator');//used for validating the input, syntax from express-validator site
const User = require('../models/User')//imported user schema
const bcrypt = require('bcryptjs');//imported from bcrptjs for decrpting the password
var jwt = require('jsonwebtoken');//imported from jwt web token, use to sign the password follwed by salt

const JWT_SECRET = 'Signedby@RajavJain'//made the signed string which will be added in the password of the user

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
            let user = await User.findOne({ email: req.body.email })//it will search out the data with similar email id, and ye isliye kiya hai takki data mai duplicacy naa aa jaae---
            if (user) {
                return res.status(400).json({ error: "Sorry this user is already registered" })
            }

            //isme bcrptjs ka use kiya hai so that password mai ek salt add ho jaae to avoid the hacking of the data...
            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)//ye function bcryptjs ki site mai diye hue hai pehle se...
            user = await User.create({  // in sab ko await krana jaruri tha, warna execution mai error aaeya
                name: req.body.name,
                password: secPass,
                email: req.body.email
            });

            // .then(user => res.json(user)) -------- used async-await instead of .then
            //     .catch(err => {
            //         console.log(err)
            //         res.json({ error: 'This email is already registered' })
            //     });
            const data={
                user:{
                    id: user.id
                }
            }
            const authtoken= jwt.sign(data,JWT_SECRET)

            // res.json(user)
            res.json({authtoken})
        }
        catch (error) {
            console.error(error.message)
            res.status(500).send("Some Error occured");
        }
    })


module.exports = router;