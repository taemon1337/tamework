let express = require('express')
  , router = express.Router()

router.use('/applets', require('./applets'))

module.exports = router
