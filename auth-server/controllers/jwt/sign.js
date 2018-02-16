let express = require('express')
  , router = express.Router()
  , jwt = require('jsonwebtoken')
  , JWT_SECRET_OR_KEY = process.env.JWT_SECRET_OR_KEY || 'secret-or-key-default'
  , JWT_SIGN_TOKEN = process.env.JWT_SIGN_TOKEN || 'this-token-is-required-to-match-to-sign-jwt-tokens'

let jwtOptions = {
  expiresIn: '24hr'
}

let sign = function (payload, signing_token) {
  return jwt.sign(payload, JWT_SECRET_OR_KEY, jwtOptions)
}

// POST /sign - request signing of provided data, returns signed JWT token
router.post('/', function (req, res, next) {
  if (req.jwt_token === JWT_SIGN_TOKEN) {
    res.send(sign(req.body))
  } else {
    res.status(401).send("Unauthorized. You must provide a valid JWT Signing Token to sign JWT tokens.")
  }
})

module.exports = router