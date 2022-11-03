const express = require("express");
const router = express.Router();//used as we have used app.use in index.js for mounting it
const { body, validationResult } = require('express-validator');//used for validating the input, syntax from express-validator site
const User = require('../models/User')//imported user schema
const bcrypt = require('bcryptjs');//imported from bcrptjs for decrpting the password
var jwt = require('jsonwebtoken');//imported from jwt web token, use to sign the password follwed by salt

const JWT_SECRET = 'Signedby@RajavJain'//made the signed string which will be added in the password of the user
const fetchuser= require('../middleware/fetchuser')
//used router as we have used app.use in index.js for mounting it, ye bss code ko neat dikhne k liye kiya hai...



//-----------------------------------------------------/////--------------------------------------------------

//ROUTE-----------1-----------

//Create a User using POST: ENDPOINT:"/api/auth/createuser"    NO LOGIN REQUIRED        <<<<<<<<<-------------------------->>>>>>>>>>>>
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
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET)//for the signing the password of the user, and will be used in further verification of the user

            // res.json(user)
            res.json({ authtoken })//it will send the signed token in body....
        }
        catch (error) {
            console.error(error.message)
            res.status(500).send("Some Error occured from our side!");
        }
    })



//-----------------------------------------------------/////--------------------------------------------------

//ROUTE-----------2-----------

//Authenticate a User using POST: ENDPOINT:"/api/auth/login"  NO LOGIN REQUIRED       <<<<<<<<<-------------------------->>>>>>>>>>>>
router.post('/login',
    [    //isme ek array mai saari conditions hi paas kr di hai... with the use of express-validator from it's site
        body('email', 'Enter correct email').isEmail(),
        body('password', 'Password cannot be blank').exists(),
    ]
    , async (req, res) => {
        const errors = validationResult(req);//took the code from express-validator, more optimized one, if errors then it will return error
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json("Please try to login with correct credentials!!");
            }

            const passwordCompare = await bcrypt.compare(password, user.password);//it will compare the hashed password to password given by the user and this will be done using bcrptjs compare function...
            if (!passwordCompare) {
                return res.status(400).json("Please try to login with correct credentials!!");
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET)//for the signing the password of the user, and will be used in further verification of the user

            res.json({ authtoken })//it will send the signed token in body....

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Some Error occured from our side!");
        }
    })




//-----------------------------------------------------/////--------------------------------------------------

//ROUTE-----------3-----------

// Getting information of loggedIN User using POST: ENDPOINT:"/api/auth/getuser"  LOGIN REQUIRED    <<<<<<<<<-------------------------->>>>>>>>>>>>
router.post('/getuser', fetchuser, async (req, res) => { // for more details about fetchuser check out middle ware fetchuser.js... 
        try {
            userId= req.user.id;
            const user= await User.findById(userId).select("-password");
            res.send(user)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Some Error occured from our side!");
        }
    })




module.exports = router;