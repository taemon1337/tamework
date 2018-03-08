let express = require('express')
  , router = express.Router()
  , proxy = require('http-proxy-middleware')
  , lookupService = require('./lookup')
  , AUTH_LOGIN_SERVER = process.env.AUTH_LOGIN_SERVER || 'http://authserver:8080'
  , DEFAULT_TARGET_SERVER = process.env.DEFAULT_TARGET_SERVER || 'http://localhost:8080'

let log = function (req, res, next) {
  console.log('[PROXY] ' + req.method.toUpperCase() + ' -> ' + req.originalUrl)
  next()
}

router.use('*', proxy({
  target: DEFAULT_TARGET_SERVER,
  ws: true,
  router: lookupService(DEFAULT_TARGET_SERVER)
  // onProxyReq: function (proxyReq, req, res) {
  //   // if (proxyReq.path.startsWith('/ui')) {
  //   //   proxyReq.path = proxyReq.path.replace('/ui', '')
  //   // }

  //   console.log('[PROXY] ', req.originalUrl, ' --> ', req.target + proxyReq.path)
  // }
}))

module.exports = router
