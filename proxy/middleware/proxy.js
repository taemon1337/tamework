let express = require('express')
  , router = express.Router()
  , proxy = require('http-proxy-middleware')
  , AUTH_LOGIN_SERVER = process.env.AUTH_LOGIN_SERVER || 'http://authserver:8080'
  , DEFAULT_TARGET_SERVER = process.env.DEFAULT_TARGET_SERVER || 'http://localhost:8080'

let log = function (req, res, next) {
  console.log('[PROXY] ' + req.method.toUpperCase() + ' -> ' + req.originalUrl)
  next()
}

router.use('*', proxy({
  target: DEFAULT_TARGET_SERVER,
  ws: true,
  router: function (req) {
    let target = req.target || DEFAULT_TARGET_SERVER
    console.log('[ROUTER] Routing to ' + target)
    return target
  }
}))

module.exports = router
