let express = require('express')
  , http = require('http')
  , https = require('https')
  , fs = require('fs')
  , app = express()
  , bodyParser = require('body-parser')
  , tls_on = process.env.TLS_ENABLE || false
  , tls_cert_file = process.env.TLS_CERT_FILE || '/etc/ssl/server.pem'
  , tls_key_file = process.env.TLS_KEY_FILE || '/etc/ssl/server.key'
  , tls_ca_file = process.env.TLS_CA_FILE || '/etc/ssl/ca.pem'
  , port = (process.env.PORT ? process.env.PORT : process.env.HTTPS ? 8443 : 8080)
  , server = null
  , JwtCheckHandler = require('/common/middleware/jwtcheck')

app.use('*', function (req, res, next) { console.log('[RBAC] ' + req.originalUrl); next() })
app.use('*', JwtCheckHandler)
app.use(bodyParser.json({ limit: '1mb', type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 100, limit: '1mb' }))
app.use('/api/rbac/v1', require('./controllers'))

if (tls_on) {
  let credentials = { cert: fs.readFileSync(tls_cert_file), key: fs.readFileSync(tls_key_file), ca: fs.readFileSync(tls_ca_file) }
  server = https.createServer(credentials, app);
} else {
  server = http.createServer(app);
}

server.listen(port, function() { console.log('Starting ' + (tls_on ? 'https' : 'http') + ' server on port ' + port) })
