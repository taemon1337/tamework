let express = require('express')
  , http = require('http')
  , https = require('https')
  , fs = require('fs')
  , app = express()
  , proxy = require('http-proxy-middleware')
  , tls_on = process.env.TLS_ENABLE || false
  , tls_cert_file = process.env.TLS_CERT_FILE || '/etc/ssl/server.pem'
  , tls_key_file = process.env.TLS_KEY_FILE || '/etc/ssl/server.key'
  , tls_ca_file = process.env.TLS_CA_FILE || '/etc/ssl/ca.pem'
  , port = (process.env.PORT ? process.env.PORT : process.env.HTTPS ? 8443 : 8080)
  , server = null
  , NoAuthHandler = require('./middleware/noauth')
  , JwtCheckHandler = require('./middleware/jwtcheck')
  , CanCheckHandler = require('./middleware/cancheck')
  , GuardHandler = require('./middleware/guard')
  , ProxyHandler = require('./middleware/proxy')

/*
 * NoAuthHandler: Checks to see if path do not require authentication and if not, proxies it directly
 * JwtHandler:    Checks for valid JWT token and adds req.user from a valid token
 * CanCanHandler: Checks that a valid user is authorized to access route
 * GuardHandler:  Makes final decision based upon req.can as provided by above middlewares
 */
app.use('*', NoAuthHandler)
app.use('*', JwtCheckHandler)
app.use('*', CanCheckHandler)
app.use('*', GuardHandler)
app.use('*', ProxyHandler)

if (tls_on) {
  let credentials = { cert: fs.readFileSync(tls_cert_file), key: fs.readFileSync(tls_key_file), ca: fs.readFileSync(tls_ca_file) }
  server = https.createServer(credentials, app);
} else {
  server = http.createServer(app);
}

server.listen(port, function() { console.log('Starting ' + (tls_on ? 'https' : 'http') + ' server on port ' + port) })
