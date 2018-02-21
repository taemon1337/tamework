let express = require('express')
  , router = express.Router()
  , jwt = require('jsonwebtoken')
  , JWT_SECRET_OR_KEY = process.env.JWT_SECRET_OR_KEY || 'secret-or-key-default'
  , JWT_SIGN_TOKEN = process.env.JWT_SIGN_TOKEN || 'this-token-is-required-to-match-to-sign-jwt-tokens'

let jwtOptions = {
  expiresIn: '24hr'
}

let verify = function (token, cb) {
  if (token) {
    jwt.verify(token, JWT_SECRET_OR_KEY, jwtOptions, cb)
  } else {
    cb(true, null)
  }
}

// GET /verify/:token - return verified decoded jwt payload
router.get('/:token', function (req, res, next) {
  console.log('[JWT] Verifying JWT token ', req.params.token)
  verify(req.params.token, function (err, decoded) {
    if (err) {
      console.log('[ERROR] Error verifying jwt token: ', req.params.token)
      res.send(false)
    } else {
      console.log('[JWT] Verified JWT token: ', decoded)
      res.send(decoded)
    }
    next()
  })
})

module.exports = router