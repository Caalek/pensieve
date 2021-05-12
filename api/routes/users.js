const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const User = require('../models/user')

router.get('/user', middleware.verifyToken, async (req, res) => {
  const foundUser = await User.findOne({_id: req._id})
  if (!foundUser) return res.send({message: 'User not found.'})
  const user = {
    username: foundUser.username,
    email: foundUser.email,
  }
  res.send(user)
})

router.patch('/user', middleware.verifyToken, middleware.reacherEmailVerify, async (req, res) => {
  const foundUser = await User.findOne({_id: req._id})
  if (!foundUser) return res.send({message: 'User not found.'})
  await User.updateOne({_id: req._id}, req.body)
  res.send({message: 'success'})
})

router.delete('/user', middleware.verifyToken, async (req, res) => {
  const foundUser = await User.findOne({_id: req._id})
  if (!foundUser) return res.send({message: 'User not found.'})
  await User.deleteOne({_id: req._id})
  res.send({message: 'success'})
})  

module.exports = router