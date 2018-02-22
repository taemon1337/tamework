let express = require('express')
  , router = express.Router()
  , Applet = require('/common/orm/Applet')

router.get('/', function (req, res, next) {
  Applet.findAll()
  .then(function (records) {
    res.send(records)
  })
  .catch(function (err) {
    res.status(501).send(err)
  })
})

module.exports = router

