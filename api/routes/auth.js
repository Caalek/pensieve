require('dotenv').config()
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const router = express.Router()
const jwtSecret = process.env.JWT_SECRET

router.post('/register', async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8)
  const userOfSameEmailExists = await User.findOne({email: req.body.email})
  if (userOfSameEmailExists) return res.send({message: "A user with this email adress already exists."})
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  }, (error, user) =>
  {
    if (error) return res.send({message: "Internal server error."})
    console.log(error)
    const token = jwt.sign({id: user._id}, jwtSecret, {expiresIn: 900})
    res.send({message: 'sucess', token: token})
  })
})

router.post('/login', (req, res) => {
  User.findOne({username: req.body.username}, (error, user) => {

    if (error) return res.send({auth: false, message: 'Internal server error.'})
    if (!user) return res.send({auth: false, message: 'Invalid username or password.'})

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

    if (!passwordIsValid) return res.send({auth: false, message: 'Invalid username or password.'})

    const token = jwt.sign({id: user._id}, jwtSecret, {expiresIn: 900})
    res.send({auth: true, token: token})
  })
})

module.exports = router 