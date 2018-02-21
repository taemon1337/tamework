let express = require('express')
  , axios = require('axios')
  , CAN_SCHEME = process.env.CAN_SCHEME || 'http://'
  , CAN_SERVER = process.env.CAN_SERVER || 'localhost'
  , CAN_PORT = process.env.CAN_PORT || '8080'
  , CAN_PATH = process.env.CAN_PATH || '/can'
  , CAN_TOKEN = process.env.CAN_TOKEN || null
  , LOGIN_URL = process.env.LOGIN_URL || '/ui/sign-in'

let canapi = axios.create({
  baseUrl: CAN_SCHEME + CAN_SERVER + CAN_PORT + CAN_PATH,
  timeout: 5000
})

let can = function (req, user) {
  let querystring = '?token=' + new Buffer(CAN_TOKEN).toString('base64') + '&url=' + new Buffer(req.originalUrl).toString('base64')
  return canapi.get('/user/' + user.id + '/' + req.method.toLowerCase() + querystring)
}

module.exports = function (req, res, next) {
  if (req.can === 'public') {
    console.log('[CAN] Allow public asset ', req.originalUrl)
  } else if (req.user) {
    can(req, req.user).then(function (resp) {
      console.log('[CAN] ', !!resp.data.can, req.user)
      req.can = !!resp.data.can
    })
    .catch(function (err) {
      console.log('[ERROR] Failure querying authorization server: ', err)
      req.can = false
    })
  } else {
    req.can = false
    req.redirect = LOGIN_URL + '?callback=' + new Buffer(req.originalUrl).toString('base64')
  }

  next()
}
