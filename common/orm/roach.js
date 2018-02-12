let Sequelize = require('sequelize-cockroachdb')
  , dbhost = process.env.COCKROACH_HOST || 'localhost'
  , dbname = process.env.COCKROACH_DATABASE || 'db'
  , dbuser = process.env.COCKROACH_USER || 'root'
  , dbport = process.env.COCKROACH_PORT || 26257

let sequelize = new Sequelize(dbname, dbuser, '', {
  dialect: 'postgres',
  host: dbhost,
  port: dbport,
  logging: false
})

let Account = sequelize.define('accounts', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  displayName: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  gender: { type: Sequelize.STRING },
  photo: { type: Sequelize.STRING }
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
