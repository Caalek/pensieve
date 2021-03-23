const express = require('express')
const router = express.Router()
const {verifyToken} = require('../middleware')
const User = require('../models/user')

router.get('/user', verifyToken, async (req, res) => {
  const foundUser = await User.findOne({_id: req._id})
  if (!foundUser) return res.send({message: 'User not found.'})
  const user = {
    username: foundUser.username,
    email: foundUser.email,
  }
  res.send(user)
})

router.patch('/user', verifyToken, async (req, res) => {
  const foundUser = await User.findOne({_id: req._id})
  if (!foundUser) return res.send({message: 'User not found.'})
  await User.updateOne({_id: req._id}, req.body)
})

module.exports = router