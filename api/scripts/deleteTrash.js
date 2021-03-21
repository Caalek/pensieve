const Note = require('../models/note')

async function deleteTrash() {
  const allNotes = await Note.find()
  const weekInMiliseconds = 1000 * 60 * 60 * 24 * 7
  for (let note in allNotes) {
    if (allNotes[note].deleted && new Date() - allNotes[note].deletedAt >= weekInMiliseconds) {
      await Note.deleteOne({_id: allNotes[note]._id})
    }
  }
}

module.exports = deleteTrash