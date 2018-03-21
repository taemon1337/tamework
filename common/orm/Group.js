let Sequelize = require('sequelize-cockroachdb')
  , roach = require('./roach')

const Group = roach.define('applets', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
  name: { type: Sequelize.STRING, unique: true, allowNull: false },
  description: { type: Sequelize.STRING, defaultValue: '' }
})

Group.sync({})
.then(function () {
  console.log('[ROACH] Initialized.')
})
.catch(function (err) {
  console.warn('[ERROR] Cockroachdb initialization failed: ', err)
})

module.exports = Group