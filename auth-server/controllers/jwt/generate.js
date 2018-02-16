let express = require('express')
  , router = express.Router()
  , jwt = require('jsonwebtoken')
  , JWT_SECRET_OR_KEY = process.env.JWT_SECRET_OR_KEY || 'secret-or-key-default'
  , JWT_SIGN_TOKEN = process.env.JWT_SIGN_TOKEN || 'this-token-is-required-to-match-to-sign-jwt-tokens'

let jwtOptions = {
  expiresIn: '24hr'
}

let generate = function () {
  try {
    return jwt.sign({ foo: 'bar' }, JWT_SECRET_OR_KEY)
  } catch (err) {
    console.warn('Error generating JWT token: ', err)
    return null
  }
}

// GET /decode - return decoded jwt payload (not verified)
router.get('/', function (req, res, next) {
  res.send(generate())
})

module.exports = router