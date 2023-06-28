const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '$agar1';


// Step 1 : signup endpoint 

router.post('/signup', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        const findUser = await User.findOne({ email: req.body.email })

        if (findUser) {
            return res.status(400).json({ error: "email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);


        const user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })

        const data = {
            user: {
                id: user.id
            }
        }

        console.log(data);
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });

    } catch (error) {
        console.log("There was an error", error)
    }

})


// Authenticate endpoint
router.post('/login', [
    body('email','please enter a valid email').isEmail(),
    body('password','Password cannot be blank').isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
        const user = User.findOne({
            email
        })

        if(!user){
            return res.status(400).json({error:'Please enter valid credentials'})
        }

        const passwordCompare = bcrypt.compare(password, user.password);

        if(!passwordCompare){
            return res.status(400).json({error:'Please enter valid credentials'})
        }

        const data = {
            user:{
                id:user.id,
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken});

    } catch (error) {
     
        
    }



})



module.exports = router;