let express = require('express')
  , router = express.Router()
  , jwt = require('jsonwebtoken')
  , JWT_SECRET_OR_KEY = process.env.JWT_SECRET_OR_KEY || 'secret-or-key-default'
  , JWT_SIGN_TOKEN = process.env.JWT_SIGN_TOKEN || 'this-token-is-required-to-match-to-sign-jwt-tokens'

let jwtOptions = {
  expiresIn: '24hr'
}

let decode = function (token) {
  try {
    return jwt.decode(token, { complete: true })
  } catch (err) {
    console.warn('Error parsing JWT token: ', token, err)
    return null
  }
}

// GET /decode - return decoded jwt payload (not verified)
router.get('/:token', function (req, res, next) {
  res.send(decode(req.params.token))
})

module.exports = router