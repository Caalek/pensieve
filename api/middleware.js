require('dotenv').config()

const jwt = require("jsonwebtoken")
const reacher = require('@reacherhq/api')

function verifyToken(req, res, next) {
  let token = req.headers['authorization']
  if (!token) return res.send({message: "Token ivalid or expired."})
  token = token.replace('Bearer ', '')

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) return res.send({message: "Token invalid or expired."})
    req._id = decoded.id
    next()
  })
}

async function reacherEmailVerify(req, res, next) {
  if (req.body.email) {
    const reacherResponse = await reacher.checkSingle({to_email: req.body.email}, {apiToken: process.env.REACHER_TOKEN})
    if (reacherResponse['is_reachable'] === 'invalid') {
      return res.send({message: 'That email adress does not exist.'})
    } else if (reacherResponse['is_reachable'] === 'risky') {
      return res.send({message: 'Do not use disposable email adresses.'})
    } else {
      next()
    } 
  } else {
    next()
  }
}

module.exports = {
  verifyToken: verifyToken,
  reacherEmailVerify: reacherEmailVerify
}