require('dotenv').config()

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization']
  if (!token) res.sendStatus(401)
  token = token.replace('Bearer ', '')

  jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) return res.sendStatus(500)
    req._id = decoded.id
    next()
  })
}

module.exports = verifyToken