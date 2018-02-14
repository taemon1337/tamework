let Sequelize = require('sequelize-cockroachdb')
  , crypto = require('crypto')
  , jwt = require('jsonwebtoken')
  , JWT_SECRET_OR_KEY = process.env.JWT_SECRET_OR_KEY || 'secret-or-key-default'
  , dbhost = process.env.COCKROACH_HOST || 'localhost'
  , dbname = process.env.COCKROACH_DATABASE || 'db'
  , dbuser = process.env.COCKROACH_USER || 'root'
  , dbport = process.env.COCKROACH_PORT || 26257

let generateSessionToken = function (account) {
  return new Promise(function (resolve, reject) {
    crypto.randomBytes(128, function (err, buf) {
      err ? reject(err) : resolve(buf.toString('hex'))
    })
  })
}

let generateJwtToken = function (account) {
  return jwt.sign({
    id: account.id,
    displayName: account.displayName,
    email: account.email,
    gender: account.gender,
    photo: account.photo
  }, JWT_SECRET_OR_KEY)
}

let sequelize = new Sequelize(dbname, dbuser, '', {
  dialect: 'postgres',
  host: dbhost,
  port: dbport,
  logging: false
})

const Account = sequelize.define('accounts', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
  displayName: { type: Sequelize.STRING, unique: true, allowNull: false },
  email: { type: Sequelize.STRING, unique: true, allowNull: false },
  gender: { type: Sequelize.STRING },
  photo: { type: Sequelize.STRING, unique: true },
  sessionToken: { type: Sequelize.STRING(256), unique: true },
  jwtToken: { type: Sequelize.TEXT }
})

Account.beforeCreate(function (account, options) {
  return generateSessionToken(account).then(function (token) {
    account.sessionToken = token
    account.jwtToken = generateJwtToken(account)
  }).catch(function (err) {
    throw err
  })
})

Account.sync({ force: true })
.then(function () {
  console.log('[ROACH] Initialized.')
})
.catch(function (err) {
  console.warn('[ERROR] Cockroachdb initialization failed: ', err)
})

module.exports = {
  sequelize: sequelize,
  account: Account
}
