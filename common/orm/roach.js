let Sequelize = require('sequelize-cockroachdb')
  , dbhost = process.env.COCKROACH_HOST || 'localhost'
  , dbname = process.env.COCKROACH_DATABASE || 'db'
  , dbuser = process.env.COCKROACH_USER || 'root'
  , dbport = process.env.COCKROACH_PORT || 26257
  
module.exports = new Sequelize(dbname, dbuser, '', {
  dialect: 'postgres',
  host: dbhost,
  port: dbport,
  logging: false
})
