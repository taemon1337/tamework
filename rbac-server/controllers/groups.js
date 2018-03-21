let express = require('express')
  , router = express.Router()
  , Group = require('/common/orm/Group')

router.get('/', function (req, res, next) {
  Group.findAll()
  .then(function (records) {
    res.send(records)
  })
  .catch(function (err) {
    res.status(501).send(err)
  })
})

module.exports = router

