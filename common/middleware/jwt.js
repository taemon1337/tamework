let express = require('express')
  , router = express.Router()
  , jwt = require('jsonwebtoken')

let decode = function (token) {
  try {
    return jwt.decode(token, { complete: true })
  } catch (err) {
    console.warn('Error parsing JWT token: ', token, err)
    return null
  }
}

let parseToken = function (req) {
  if (req.headers && req.headers.authorization) {
    return req.headers.authorization
  } else if (req.query && req.query.token) {
    return req.query.token
  } else {
    return ''
  }
}

// Adapted from https://github.com/auth0/express-jwt/blob/master/lib/index.js
module.exports = function (req, res, next) {
  let token = parseToken(req)
  
  if (token) {
    console.log('[JWT] ' + req.originalUrl)
    var parts = token.split(' ')
    if (parts.length === 2 && parts[0] === 'Bearer') {
      req.user = decode(parts[1])
      if (req.user) {
        console.log('[JWT] User information: ', req.user.payload)
        next()
      } else {
        console.log('[JWT] Unable to parse Authorization Token.')
        res.status(401).send('Unable to parse Authorization Token.')
      }
    } else {
      console.log('[JWT] Invalid Authorization Token format: Expected "Bearer <token>"')
      res.status(401).send('Invalid Authorization Token format: Expected "Bearer <token>"')
    }
  } else {
    next()
  }
}