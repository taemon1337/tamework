let express = require('express')
  , router = express.Router()

router.use('/decode', require('./decode'))
router.use('/verify', require('./verify'))
router.use('/sign', require('./sign'))
router.use('/generate', require('./generate'))

module.exports = router