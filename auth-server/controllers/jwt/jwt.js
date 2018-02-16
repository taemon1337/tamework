let express = require('express')
  , router = express.Router()
  , jwt = require('jsonwebtoken')
  , JWT_SECRET_OR_KEY = process.env.JWT_SECRET_OR_KEY || 'secret-or-key-default'
  , JWT_SIGN_TOKEN = process.env.JWT_SIGN_TOKEN || 'this-token-is-required-to-match-to-sign-jwt-tokens'

let jwtOptions = {
  expiresIn: '24hr'
}

let parseToken = function (req) {
  if (req.headers && req.headers.authorization) {
    let hdr = req.headers.authorization

    if (hdr) {
      let parts = hdr.split(' ')
      if (parts.length === 2 && parts[0] === 'Bearer') {
        return parts[1]
      } else {
        return ''
      }
    } else {
      return ''
    }
  } else if (req.query && req.query.token) {
    return req.query.token
  } else {
    return ''
  }
}

let verify = function (token, cb) {
  jwt.verify(token, JWT_SECRET_OR_KEY, jwtOptions, cb)
}

// Parse JWT Token from request
router.use(function (req, res, next) {
  let jwt_token = parseToken(req)
  if (jwt_token) {
    console.log('[JWT] Parsing JWT token: ', jwt_token)
    verify(jwt_token, function (err, decoded) {
      if (err) {
        console.log('[ERROR] Error verifying jwt token: ', err)
        req.user = null
      } else {
        console.log('[JWT] Verified jwt token for: ', decoded)
        req.user = decoded
      }
      next()
    })
  } else {
    next()
  }
})

module.exports = router