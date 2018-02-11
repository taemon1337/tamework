let express = require('express')
  , router = express.Router()
  , proxy = require('http-proxy-middleware')
  , USER_INTERFACE_SERVER = process.env.USER_INTERFACE_SERVER || 'http://userinterface:8080'
  , USER_INTERFACE_PREFIX = process.env.USER_INTERFACE_PREFIX || '/ui'
  , ACCOUNT_API_SERVER = process.env.ACCOUNT_API_SERVER || 'http://authserver:8080'
  , ACCOUNT_API_PREFIX = process.env.ACCOUNT_API_PREFIX || '/api/account'
  , AUTH_API_SERVER = process.env.AUTH_API_SERVER || 'http://authserver:8080'
  , AUTH_API_PREFIX = process.env.AUTH_API_PREFIX || '/api/auth'

router.all('*', function (req, res, next) {
  if (req.originalUrl.startsWith(USER_INTERFACE_PREFIX) || req.originalUrl.startsWith('/sockjs') || req.originalUrl.startsWith('/favicon')) {
    console.log('[NOAUTH] ' + req.originalUrl)
    req.target = USER_INTERFACE_SERVER
    req.can = "public"
  }
  
  if (req.originalUrl.startsWith(ACCOUNT_API_PREFIX)) {
    console.log('[NOAUTH] ' + req.originalUrl)
    req.target = ACCOUNT_API_SERVER
    req.can = "public"
  }

  if (req.originalUrl.startsWith(AUTH_API_PREFIX)) {
    console.log('[NOAUTH] ' + req.originalUrl)
    req.target = AUTH_API_SERVER
    req.can = "public"
  }

  next()
})

module.exports = router
