let express = require('express')
  , router = express.Router()
  , Account = require('/common/orm/Account')

router.get('/', function (req, res, next) {
  Account.findAll()
  .then(function (records) {
    console.log('USER ACCOUNTS: ', records)
    res.send(records)
  })
  .catch(function (err) {
    res.status(501).send(err)
  })
})

module.exports = router

