require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const boolParser = require('express-query-boolean')
const schedule = require('node-schedule')
const port = 3001
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app = express()
app.use(cors())
app.use(express.json())
app.use(boolParser())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

const authRoutes = require('./routes/auth')
app.use('/', authRoutes)
const userRoutes = require('./routes/users')
app.use('/', userRoutes)
const noteRoutes = require('./routes/notes')
app.use('/', noteRoutes)

const deleteTrash = require('./scripts/deleteTrash')

app.listen(port || process.env.PORT, () => {
  console.log(`API running on port ${port}`)
  schedule.scheduleJob('0 0 * * *', () => {
    deleteTrash()
  })
})