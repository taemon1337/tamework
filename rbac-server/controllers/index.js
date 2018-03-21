let express = require('express')
  , router = express.Router()

router.use('/health', require('./health'))
router.use('/users', require('./users'))
router.use('/groups', require('./groups'))

module.exports = router
