let express = require('express')
  , router = express.Router()
  , proxy = require('http-proxy-middleware')
  , USER_INTERFACE_SERVER = process.env.USER_INTERFACE_SERVER || 'http://v-ui:8080'
  , USER_INTERFACE_PREFIX = process.env.USER_INTERFACE_PREFIX || '/ui'
  , AUTH_API_SERVER = process.env.AUTH_API_SERVER || 'http://authserver:8080'
  , AUTH_API_PREFIX = process.env.AUTH_API_PREFIX || '/api/auth/v1'

router.all('*', function (req, res, next) {

  // ^/ui or ^/sockjs or ^/favicon
  if (req.originalUrl.startsWith(USER_INTERFACE_PREFIX) || req.originalUrl.startsWith('/sockjs') || req.originalUrl.startsWith('/favicon')) {
    req.target = USER_INTERFACE_SERVER
    req.can = "public"
  }

  // /api/auth/v1 ---> authserver
  if (req.originalUrl.startsWith(AUTH_API_PREFIX)) {
    req.target = AUTH_API_SERVER
    req.can = "public"
  }
  
  if (req.originalUrl.startsWith('/minio')) {
    if (req.originalUrl.startsWith('/minio/webrpc')) {
      req.target = 'http://minio:9000'
      req.can = "public"
    } else {
      req.target = 'http://minio:9000'
      req.can = "public"
    }
  }

  next()
})

module.exports = router
