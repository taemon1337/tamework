let Sequelize = require('sequelize-cockroachdb')
  , dbhost = process.env.DB_HOST || 'localhost'
  , dbname = process.env.DB_NAME || 'db'
  , dbuser = process.env.DB_USER || 'root'

let sequelize = new Sequelize(dbname, dbuser, '', {
  host: dbhost,
  dialect: 'postgres',
  port: 26257,
  logging: false
})

let Account = sequelize.define('accounts', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  displayName: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  gender: { type: Sequelize.STRING },
  photo: { type: Sequelize.STRING }
})
.sync({ force: true })

module.exports = {
  sequelize: sequelize,
  account: Account
}
