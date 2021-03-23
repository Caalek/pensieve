require('dotenv').config()

const axios = require('axios')
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization']
  if (!token) return res.send({message: "Token ivalid or expired."})
  token = token.replace('Bearer ', '')

  jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) return res.send({message: "Token invalid or expired."})
    req._id = decoded.id
    next()
  })
}

module.exports = verifyToken