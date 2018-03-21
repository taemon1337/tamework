let express = require('express')
  , router = express.Router()
  , axios = require('axios')
  , AUTH_API_SERVER = process.env.AUTH_API_SERVER || 'http://authserver:8080'
  , AUTH_API_PREFIX = process.env.AUTH_API_PREFIX || '/api/auth/v1'

let client = axios.create({
  baseURL: AUTH_API_SERVER + AUTH_API_PREFIX,
  timeout: 2000
})

router.use(function (req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('[JWT-CHECK] Checking JWT authorization...', req.headers.authorization)
    let token = req.headers.authorization.replace('Bearer ', '')
    client.get('/jwt/verify/' + token)
    .then(function (resp) {
      console.log('[JWT-CHECK] User from auth server: ', resp.data.displayName)
      req.user = resp.data
      next()
    })
    .catch(function (err) {
      console.log('[ERROR] Bad response from JWT auth server: ', err)
      req.user = null
      next()
    })
  } else {
    next()
  }
})

module.exports = router