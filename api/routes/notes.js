const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware')
const Note = require('../models/note')

router.get('/notes', verifyToken, async (req, res) => {
  const queryObject = Object.assign({userId: req._id}, req.query)
  notes = await Note.find(queryObject)
  res.send(notes)
})

router.post('/note', verifyToken, async (req, res) => {
  const noteObject = Object.assign({userId: req._id}, req.body)
  await Note.create(noteObject)
  res.send({message: 'sucess'})
})

router.patch('/note/:noteId', verifyToken, async (req, res) => {
  await Note.updateOne({_id: req.params.noteId}, req.body)
  res.send({message: 'success'})
})

router.delete('/note/:noteId', verifyToken, async (req, res) => {
  await Note.deleteOne({_id: req.params.noteId})
  res.send({message: 'success'})
})

module.exports = router