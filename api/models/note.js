const mongoose = require('mongoose')  

const NoteSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  createdAt: {type: Date, required: true, default: new Date()},
  archived: {type: Boolean, required: true, default: false},
  deleted: {type: Boolean, required: true, default: false},
  pinned: {type: Boolean, required: true, default: false},
  deletedAt: {type: Date, required: false},
  contents: {type: String, required: true},
})

module.exports = mongoose.model('Note', NoteSchema, 'notes')