let express = require('express')
  , router = express.Router()

router.get('/', function (req, res, next) {
  res.send('OK')
})

module.exports = router
