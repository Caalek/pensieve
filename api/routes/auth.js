require('dotenv').config()
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const User = require('../models/user')
const {verifyToken, hcaptcha} = require('../middleware')
const router = express.Router()
const jwtSecret = process.env.JWT_SECRET

router.post('/register', async (req, res) => {
  if (!req.body.password || !req.body.email || !req.body.username) return res.send({message: 'Please fill in all the form fields.'})
  if (req.body.password.length < 8) return res.send({message: 'Password must be at least 8 characters long.'})
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
    const token = jwt.sign({id: user._id}, jwtSecret, {expiresIn: 900})
    res.send({message: 'sucess', token: token})
  })
})

router.post('/login', (req, res) => {
  if (!req.body.password || !req.body.username) return res.send({message: 'Please fill in all the form fields.'})
  User.findOne({username: req.body.username}, (error, user) => {

    if (error) return res.send({auth: false, message: 'Internal server error.'})
    if (!user) return res.send({auth: false, message: 'Invalid username or password.'})

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

    if (!passwordIsValid) return res.send({auth: false, message: 'Invalid username or password.'})

    const token = jwt.sign({id: user._id}, jwtSecret, {expiresIn: 900}) // expires in 15 minutes
    res.send({auth: true, token: token})
  })
})

// sends reset password email
router.post('/send-reset-email', async (req, res) => {
  const user = await User.findOne({email: req.body.email})
  if (!user) return res.send({message: "No user found with this email."})
  const token = jwt.sign({id: user._id}, jwtSecret, {expiresIn: 300}) // expires in 5 minutes

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    }
  })

  await transporter.sendMail({
    from: '"Pensieve" <pensieveappmail@gmail.com>',
    to: req.body.email,
    subject: "Pensieve Password Reset",
    html: `
    <head>
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca&display=swap" rel="stylesheet">
    </head>
    <body style="font-family: 'Lexend Deca', sans-serif; text-align: center; font-size: 16px; color: black;">
      <img src="https://i.imgur.com/kpH9KZZ.png" alt="logo" height="80"/>
      <h1>Hello ${user.username},</h1>
      <p>
        To reset your password, click the button below.
        <br>
        <a href="https://pensieveapp.herokuapp.com/reset-password-page/${token}">
          <img style="margin-top: 10px" src="https://i.imgur.com/2SBHYAe.png" alt="reset password">
        </a>
        <br>
        <strong>The password reset link will expire in 5 minutes.</strong>
        <br>
        If you didn't request a password reset, ignore this message.
      </p>
    </body>`,
  })

  res.send({message: "success"})
})

router.post('/change-password', verifyToken, async (req, res) => {
  if (req.body.password.length < 8) return res.send({message: 'Password must be at least 8 characters long.'})
  const hashedPassword = bcrypt.hashSync(req.body.password, 8)
  await User.updateOne({_id: req._id}, {password: hashedPassword})
  res.send({message: "success"})
})

module.exports = router 