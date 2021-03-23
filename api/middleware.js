require('dotenv').config()

const axios = require('axios')
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET
const hcaptchaSecret = process.env.HCAPTCHA_SECRET

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

const hcaptcha = async (req, res, next) => {
  const data = `response=${req.body['h-captcha-response']}&secret=${hcaptchaSecret}`
  const url = 'https://hcaptcha.com/siteverify'

  const response = await axios.post(url, data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        console.log(response['data'])
      if (response['data']['success']) {
          next()
      } else {
        return res.send({'message': 'hcaptcha failed'})
      }
}

module.exports = {verifyToken, hcaptcha}