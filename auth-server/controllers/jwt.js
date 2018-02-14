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

let sign = function (payload, signing_token) {
  return jwt.sign(payload, JWT_SECRET_OR_KEY, jwtOptions)
}

let decode = function (token) {
  try {
    return jwt.decode(token, { complete: true })
  } catch (err) {
    console.warn('Error parsing JWT token: ', token, err)
    return null
  }
}

let verify = function (token, cb) {
  jwt.verify(token, JWT_SECRET_OR_KEY, jwtOptions, cb)
}

// Parse JWT Token from request
router.use(function (req, res, next) {
  req.jwt_token = parseToken(req)
})

// GET /jwt
router.get('/', function (req, res, next) {
  res.send(req.jwt_token)
})

// POST /sign - request signing of provided data, returns signed JWT token
router.post('/sign', function (req, res, next) {
  if (req.jwt_token === JWT_SIGN_TOKEN) {
    res.send(sign(req.body))
  } else {
    res.status(401).send("Unauthorized. You must provide a valid JWT Signing Token to sign JWT tokens.")
  }
})

// GET /decode - return decoded jwt payload (not verified)
router.get('/decode', function (req, res, next) {
  res.send(decode(req.jwt_token))
})

// GET /decode - return verified decoded jwt payload
router.get('/verify', function (req, res, next) {
  verify(req.jwt_token, function (err, decoded) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(decoded)
    }
  })
})

module.exports = router