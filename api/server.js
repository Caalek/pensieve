require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const boolParser = require('express-query-boolean')
const schedule = require('node-schedule')
const path = require('path')
const port = 3001
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app = express()
app.use(express.json())
app.use(boolParser())
app.use(cors())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.static(path.join(__dirname, '../client/build')))

// api routes
const authRoutes = require('./routes/auth')
app.use('/api', authRoutes)
const userRoutes = require('./routes/users')
app.use('/api', userRoutes)
const noteRoutes = require('./routes/notes')
app.use('/api', noteRoutes)

// catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

const deleteTrash = require('./scripts/deleteTrash')

app.listen(port || process.env.PORT, () => {
  console.log(`API running on port ${port}`)
  schedule.scheduleJob('0 0 * * *', () => {
    deleteTrash()
  })
})