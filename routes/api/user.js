const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/User')

//@route POST api/users
//@desc  Register user
//@access  Public

router.post('/',
[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please incluse a valid email').isEmail(),
    check('password', 'please enter a password with 6 or more characters').isLength({ min:6 })
],

async (req,res) => { 
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name,email,password } = req.body

    try {
        let user = await User.findOne({ email }); //findoone returns a promise

       if(user) {
           return res.status(400).json({ errors: [{ msg: 'User already exists'}] })
       }

       //Get users gravatar
        const avatar = gravatar.url(email, {
            s: '200', //default size
            r: 'pg', //rating
            d: 'mm' //default image
        })

        //create an instance of user
        user = new User({
            name,
            email,
            avatar,
            password
        })

    //Encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
        user: {
            id: user.id
        }
    }
    // get token while signup
     const token = jwt.sign(payload, config.get('jwtSecret')) 
     user.tokens = user.tokens.concat({ token })
     await user.save()
     
    res.status(201).send({ token })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error !')
    }

    
})

module.exports = router