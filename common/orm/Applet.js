let Sequelize = require('sequelize-cockroachdb')
  , roach = require('./roach')

const Applet = roach.define('applets', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
  name: { type: Sequelize.STRING, unique: true, allowNull: false },
  basePath: { type: Sequelize.STRING, unique: true, allowNull: false },
  description: { type: Sequelize.STRING, defaultValue: '' }
})

Applet.sync({ force: true })
.then(function () {
  console.log('[ROACH] Initialized.')
})
.catch(function (err) {
  console.warn('[ERROR] Cockroachdb initialization failed: ', err)
})

module.exports = Applet